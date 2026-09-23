import { useEffect, useRef, useState } from 'react'
import { useActive, usePrefersReducedMotion } from '../hooks/useRuntime'
import { mulberry32, SHIP_ASCII } from '../lib/ascii'

// logical canvas geometry
const W = 720
const H = 460
const CX = 360
const CY = 258
const RX = 300
const RY = 162
const TARGET_DOCKS = 10
const MAX_HULL = 3

type Phase = 'idle' | 'running' | 'paused' | 'won' | 'lost'

interface Floater {
  x: number
  y: number
  vy: number
  wob: number
  phase: number
}

interface GameState {
  phase: Phase
  ship: { x: number; y: number; tx: number; ty: number }
  keys: Set<string>
  weights: Floater[]
  debris: Floater[]
  docked: number
  hull: number
  score: number
  invulnUntil: number
  lastSpawn: number
  shakeUntil: number
  pointerActive: boolean
}

const inside = (x: number, y: number, pad = 0): boolean => {
  const nx = (x - CX) / (RX - pad)
  const ny = (y - CY) / (RY - pad)
  return nx * nx + ny * ny <= 1
}

const clampToDome = (x: number, y: number): { x: number; y: number } => {
  const nx = (x - CX) / RX
  const ny = (y - CY) / RY
  const f = nx * nx + ny * ny
  if (f <= 1) return { x, y }
  const s = 0.995 / Math.sqrt(f)
  return { x: CX + nx * s * RX, y: CY + ny * s * RY }
}

/** Uniform point inside the dome ellipse with a safety margin (40 tries, then center) */
const randPointInDome = (margin: number): { x: number; y: number } => {
  for (let i = 0; i < 40; i++) {
    const a = Math.random() * Math.PI * 2
    const r = Math.sqrt(Math.random())
    const x = CX + Math.cos(a) * r * (RX - margin)
    const y = CY + Math.sin(a) * r * (RY - margin)
    if (inside(x, y, margin)) return { x, y }
  }
  return { x: CX, y: CY }
}

const SCORE_PER_WEIGHT = 10

function freshState(phase: Phase = 'idle'): GameState {
  return {
    phase,
    ship: { x: CX, y: CY + RY * 0.4, tx: CX, ty: CY + RY * 0.4 },
    keys: new Set<string>(),
    weights: [],
    debris: [],
    docked: 0,
    hull: MAX_HULL,
    score: 0,
    invulnUntil: 0,
    lastSpawn: 0,
    shakeUntil: 0,
    pointerActive: false,
  }
}

/** Seed the arena so there are always points to collect the moment the sim starts */
function seedFloaters(state: GameState) {
  state.weights = []
  state.debris = []
  for (let i = 0; i < 4; i++) {
    const p = randPointInDome(64)
    state.weights.push({ x: p.x, y: p.y, vy: 16 + Math.random() * 16, wob: 6 + Math.random() * 10, phase: Math.random() * 6.28 })
  }
  for (let i = 0; i < 2; i++) {
    const p = randPointInDome(64)
    state.debris.push({ x: p.x, y: p.y, vy: 16 + Math.random() * 16, wob: 6 + Math.random() * 10, phase: Math.random() * 6.28 })
  }
}

const PAPER = '#E9E6DF'
const PHOSPHOR = '#7CFC9A'
const VIOLET = '#B44BFF'
const AMBER = '#FFB454'

const pips = (filled: number, total: number) => '▓'.repeat(Math.max(0, filled)) + '░'.repeat(Math.max(0, total - filled))

/**
 * BIO-DOME SIM — CRT mini-game on a single <canvas> ASCII renderer.
 * Fly the ASCII starship inside the violet neon dome; collect model-weight
 * glyphs ▓, dodge NaN debris ▒. Keyboard (while focused) + touch (drag).
 * Pauses on blur / hidden tab / offscreen; static poster under reduced motion.
 */
export function BioDomeGame({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const active = useActive(containerRef as unknown as React.RefObject<HTMLElement>)
  const reduced = usePrefersReducedMotion()
  const g = useRef<GameState>(freshState())
  const [hud, setHud] = useState({ phase: 'idle' as Phase, docked: 0, hull: MAX_HULL, score: 0 })

  const syncHud = (s: GameState) =>
    setHud((prev) =>
      prev.phase === s.phase && prev.docked === s.docked && prev.hull === s.hull && prev.score === s.score
        ? prev
        : { phase: s.phase, docked: s.docked, hull: s.hull, score: s.score },
    )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = W * dpr
    canvas.height = H * dpr

    const state = g.current
    let raf = 0
    let last = performance.now()

    const drawDome = (t: number) => {
      const pulse = 0.9 + 0.1 * Math.sin(t * 0.0022)
      ctx.save()
      ctx.beginPath()
      ctx.ellipse(CX, CY, RX, RY, 0, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(180,75,255,0.055)'
      ctx.fill()
      ctx.restore()
      ctx.save()
      ctx.beginPath()
      ctx.ellipse(CX, CY, RX, RY, 0, 0, Math.PI * 2)
      ctx.lineWidth = 5
      ctx.strokeStyle = VIOLET
      ctx.shadowColor = VIOLET
      ctx.shadowBlur = 26 * pulse
      ctx.stroke()
      ctx.shadowBlur = 8
      ctx.lineWidth = 1.4
      ctx.strokeStyle = 'rgba(233,230,223,0.55)'
      ctx.stroke()
      ctx.restore()
      const sr = mulberry32(99)
      ctx.fillStyle = 'rgba(124,252,154,0.35)'
      for (let i = 0; i < 40; i++) {
        const px = CX + (sr() * 2 - 1) * (RX - 40)
        const py = CY + (sr() * 2 - 1) * (RY - 30)
        if (inside(px, py, 10)) ctx.fillRect(px, py, 1.5, 1.5)
      }
    }

    const drawShip = (x: number, y: number) => {
      ctx.font = 'bold 13px "Space Mono", monospace'
      ctx.textAlign = 'left'
      ctx.fillStyle = PAPER
      ctx.shadowColor = VIOLET
      ctx.shadowBlur = 9
      SHIP_ASCII.forEach((row, i) => ctx.fillText(row, x - 45, y - 16 + i * 13))
      ctx.shadowBlur = 0
      ctx.textAlign = 'center'
    }

    const drawHud = () => {
      ctx.font = '12px "Space Mono", monospace'
      ctx.textAlign = 'left'
      ctx.fillStyle = 'rgba(233,230,223,0.85)'
      const progress = Math.round((Math.min(state.docked, TARGET_DOCKS) / TARGET_DOCKS) * 5)
      const statusWord = state.phase === 'won' ? 'ONLINE' : 'IN PROGRESS'
      ctx.fillText(`WEEGPL CORE STATUS ${pips(progress, 5)} ${statusWord}`, 14, 24)
      ctx.fillText(`MODELS DOCKED: ${String(state.docked).padStart(2, '0')}/${TARGET_DOCKS}`, 14, 42)
      ctx.fillStyle = state.hull <= 1 ? AMBER : 'rgba(233,230,223,0.85)'
      ctx.fillText(`HULL ${pips(state.hull, MAX_HULL)}${state.hull <= 1 ? ' CRITICAL' : ''}`, 14, 60)
      // score — top right
      ctx.textAlign = 'right'
      ctx.fillStyle = 'rgba(233,230,223,0.85)'
      ctx.fillText(`SCORE ${String(state.score).padStart(4, '0')}`, W - 14, 24)
      ctx.textAlign = 'center'
    }

    const drawFrame = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const shake = performance.now() < state.shakeUntil ? (Math.random() - 0.5) * 6 : 0
      ctx.translate(shake, 0)
      ctx.fillStyle = '#000'
      ctx.fillRect(-8, -8, W + 16, H + 16)
      drawDome(now)
      ctx.font = 'bold 15px "Space Mono", monospace'
      ctx.textAlign = 'center'
      for (const w of state.weights) {
        ctx.fillStyle = PHOSPHOR
        ctx.shadowColor = PHOSPHOR
        ctx.shadowBlur = 9
        ctx.fillText('▓', w.x, w.y)
      }
      ctx.fillStyle = AMBER
      ctx.shadowColor = AMBER
      ctx.shadowBlur = 7
      for (const d of state.debris) ctx.fillText('▒', d.x, d.y)
      ctx.shadowBlur = 0
      drawShip(state.ship.x, state.ship.y)
      drawHud()
      if (state.phase !== 'running') {
        ctx.fillStyle = 'rgba(0,0,0,0.55)'
        ctx.fillRect(0, 0, W, H)
        ctx.fillStyle = PAPER
        ctx.textAlign = 'center'
        ctx.font = 'bold 30px "Archivo Black", "Space Mono", sans-serif'
        const title =
          state.phase === 'idle'
            ? 'CLICK TO START'
            : state.phase === 'paused'
              ? 'PAUSED — P TO RESUME'
              : state.phase === 'won'
                ? 'CORE ONLINE — ALL WEIGHTS DOCKED'
                : 'CORE RESET — NaN DEBRIS BREACH'
        ctx.fillText(title, CX, CY - 6)
        ctx.font = '12px "Space Mono", monospace'
        ctx.fillStyle = 'rgba(233,230,223,0.7)'
        const sub =
          state.phase === 'idle'
            ? 'ARROWS / WASD — FLY · COLLECT ▓ · DODGE ▒ · TOUCH: DRAG'
            : 'PRESS R TO REBOOT SIM'
        ctx.fillText(sub, CX, CY + 26)
      }
    }

    const drawPoster = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, W, H)
      drawDome(0)
      ctx.font = 'bold 15px "Space Mono", monospace'
      ctx.textAlign = 'center'
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = PHOSPHOR
        ctx.shadowColor = PHOSPHOR
        ctx.shadowBlur = 9
        ctx.fillText('▓', CX - 150 + i * 75, CY - 70 + (i % 2) * 30)
      }
      ctx.fillStyle = AMBER
      ctx.shadowColor = AMBER
      ctx.fillText('▒', CX + 130, CY + 40)
      ctx.shadowBlur = 0
      drawShip(CX, CY + RY * 0.4)
      drawHud()
      ctx.fillStyle = 'rgba(233,230,223,0.85)'
      ctx.textAlign = 'center'
      ctx.font = 'bold 28px "Archivo Black", "Space Mono", sans-serif'
      ctx.fillText('BIO-DOME SIM STANDBY', CX, CY - 4)
      ctx.font = '12px "Space Mono", monospace'
      ctx.fillStyle = 'rgba(233,230,223,0.6)'
      ctx.fillText(reduced ? 'ANIMATIONS REDUCED — STATIC POSTER' : 'SIM PAUSED', CX, CY + 24)
    }

    const start = () => {
      const fresh = freshState('running')
      state.phase = fresh.phase
      state.ship = fresh.ship
      state.docked = 0
      state.hull = MAX_HULL
      state.score = 0
      state.invulnUntil = 0
      state.lastSpawn = 0
      state.shakeUntil = 0
      state.pointerActive = false
      seedFloaters(state) // points on the board the moment the sim starts
      syncHud(state)
    }

    const spawn = (now: number) => {
      if (now - state.lastSpawn < 850) return
      state.lastSpawn = now
      // keep at least 3 collectible weights alive; otherwise 55/45 weight/debris
      const isWeight = state.weights.length < 3 || Math.random() < 0.55
      const p = randPointInDome(60)
      const f: Floater = { x: p.x, y: p.y, vy: 24 + Math.random() * 26, wob: 6 + Math.random() * 14, phase: Math.random() * 6.28 }
      if (isWeight && state.weights.length < 6) state.weights.push(f)
      else if (state.debris.length < 4) state.debris.push(f)
    }

    const step = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000)
      last = now
      if (state.phase === 'running') {
        spawn(now)
        let vx = 0
        let vy = 0
        if (state.keys.has('arrowleft') || state.keys.has('a')) vx -= 250
        if (state.keys.has('arrowright') || state.keys.has('d')) vx += 240
        if (state.keys.has('arrowup') || state.keys.has('w')) vy -= 240
        if (state.keys.has('arrowdown') || state.keys.has('s')) vy += 240
        if (vx !== 0 || vy !== 0) {
          // keyboard: direct velocity movement (lerp made the ship crawl ~8% speed)
          state.pointerActive = false
          state.ship.x += vx * dt
          state.ship.y += vy * dt
          state.ship.tx = state.ship.x
          state.ship.ty = state.ship.y
        } else {
          // touch/pointer: ease toward the held pointer
          state.ship.x += (state.ship.tx - state.ship.x) * Math.min(1, dt * 9)
          state.ship.y += (state.ship.ty - state.ship.y) * Math.min(1, dt * 9)
        }
        const clamped = clampToDome(state.ship.x, state.ship.y)
        state.ship.x = clamped.x
        state.ship.y = clamped.y

        const drift = (f: Floater) => {
          f.y += f.vy * dt
          f.x += Math.sin(now * 0.0012 + f.phase) * f.wob * dt
        }
        state.weights.forEach(drift)
        state.debris.forEach(drift)
        state.weights = state.weights.filter((w) => inside(w.x, w.y, -10))
        state.debris = state.debris.filter((d) => inside(d.x, d.y, -10))

        if (now > state.invulnUntil) {
          state.weights = state.weights.filter((w) => {
            if ((state.ship.x - w.x) ** 2 + (state.ship.y - w.y) ** 2 < 400) {
              state.docked += 1
              state.score += SCORE_PER_WEIGHT
              if (state.docked >= TARGET_DOCKS) state.phase = 'won'
              return false
            }
            return true
          })
        }
        if (state.phase === 'running' && now > state.invulnUntil) {
          state.debris = state.debris.filter((d) => {
            if ((state.ship.x - d.x) ** 2 + (state.ship.y - d.y) ** 2 < 324) {
              state.hull -= 1
              state.shakeUntil = now + 260
              state.invulnUntil = now + 900
              if (state.hull <= 0) state.phase = 'lost'
              return false
            }
            return true
          })
        }
      }
      drawFrame(now)
      syncHud(state)
      raf = window.requestAnimationFrame(step)
    }

    // ---------- input ----------
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key === 'arrowup' || key === 'arrowdown' || key === 'arrowleft' || key === 'arrowright' || key === ' ') {
        e.preventDefault()
      }
      if (key === 'p') {
        if (state.phase === 'running') state.phase = 'paused'
        else if (state.phase === 'paused') state.phase = 'running'
        syncHud(state)
        return
      }
      if (key === 'r') {
        start()
        return
      }
      if ((key === 'enter' || key === ' ') && state.phase !== 'running' && state.phase !== 'paused') {
        start()
        return
      }
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        state.keys.add(key)
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      state.keys.delete(e.key.toLowerCase())
    }
    const onBlur = () => {
      state.keys.clear()
      if (state.phase === 'running') {
        state.phase = 'paused'
        syncHud(state)
      }
    }
    const toLogical = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      return {
        x: ((e.clientX - rect.left) / rect.width) * W,
        y: ((e.clientY - rect.top) / rect.height) * H,
      }
    }
    let pointerId = -1
    const onPointerDown = (e: PointerEvent) => {
      canvas.focus()
      if (state.phase === 'idle' || state.phase === 'won' || state.phase === 'lost') start()
      if (state.phase === 'paused') state.phase = 'running'
      pointerId = e.pointerId
      state.pointerActive = true
      const p = toLogical(e)
      state.ship.tx = p.x
      state.ship.ty = p.y
      e.preventDefault()
    }
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerId !== pointerId || !state.pointerActive) return
      const p = toLogical(e)
      state.ship.tx = p.x
      state.ship.ty = p.y
    }
    const onPointerUp = () => {
      pointerId = -1
      state.pointerActive = false
    }

    canvas.addEventListener('keydown', onKeyDown)
    canvas.addEventListener('keyup', onKeyUp)
    canvas.addEventListener('blur', onBlur)
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointercancel', onPointerUp)

    if (reduced) {
      drawPoster()
    } else if (active) {
      raf = window.requestAnimationFrame(step)
    } else {
      drawPoster()
    }

    return () => {
      window.cancelAnimationFrame(raf)
      canvas.removeEventListener('keydown', onKeyDown)
      canvas.removeEventListener('keyup', onKeyUp)
      canvas.removeEventListener('blur', onBlur)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointercancel', onPointerUp)
    }
  }, [active, reduced])

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        tabIndex={0}
        role="application"
        aria-label="Bio-Dome simulator: fly the ASCII starship with arrow keys or WASD, collect model weights, dodge NaN debris. P pauses, R reboots."
        className="h-auto w-full cursor-crosshair rounded-md outline-none"
        style={{ aspectRatio: `${W} / ${H}`, touchAction: 'none' }}
      />
      <div className="sr-only" aria-live="polite">
        {hud.phase === 'running'
          ? `Simulator running — ${hud.docked} of ${TARGET_DOCKS} models docked, score ${hud.score}, hull ${hud.hull} of ${MAX_HULL}`
          : hud.phase === 'won'
            ? `Core online — all weights docked, final score ${hud.score}`
            : hud.phase === 'lost'
              ? `Core reset — NaN debris breach, final score ${hud.score}`
              : `Simulator ${hud.phase}`}
      </div>
    </div>
  )
}