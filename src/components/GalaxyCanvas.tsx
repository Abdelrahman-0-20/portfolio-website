import { useEffect, useRef } from 'react'
import { useActive, usePrefersReducedMotion } from '../hooks/useRuntime'

const W = 1200
const H = 750

interface Star {
  x: number
  y: number
  r: number
  a: number
}

/**
 * Procedural spiral galaxy — no image assets. Logarithmic-spiral arms of
 * particles around a glowing core, slow rotation, static under reduced motion.
 */
export function GalaxyCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const active = useActive(containerRef as unknown as React.RefObject<HTMLElement>)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = W * dpr
    canvas.height = H * dpr

    const bgStars: Star[] = Array.from({ length: 260 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.4 + Math.random() * 1.1,
      a: 0.2 + Math.random() * 0.6,
    }))

    // logarithmic spiral arms
    interface Particle {
      r: number
      theta: number
      size: number
      hue: number
      alpha: number
    }
    const arms = 2
    const particles: Particle[] = []
    for (let arm = 0; arm < arms; arm++) {
      for (let i = 0; i < 900; i++) {
        const t = (i / 900) * 3.4 * Math.PI
        const r = 26 * Math.exp(0.28 * t) * (0.72 + Math.random() * 0.56)
        if (r > 620) continue
        const theta = t + (arm * Math.PI) / 1 + (Math.random() - 0.5) * 0.55
        const dist = r / 620
        particles.push({
          r,
          theta,
          size: 0.6 + Math.random() * 1.7 * (1 - dist * 0.6),
          hue: 210 + Math.random() * 70 - dist * 40,
          alpha: (0.25 + Math.random() * 0.6) * (1 - dist * 0.55),
        })
      }
    }
    // core cluster
    for (let i = 0; i < 500; i++) {
      const a = Math.random() * Math.PI * 2
      const r = Math.pow(Math.random(), 2.2) * 120
      particles.push({
        r,
        theta: a,
        size: 0.5 + Math.random() * 1.4,
        hue: 40 + Math.random() * 30,
        alpha: 0.35 + Math.random() * 0.55 * (1 - r / 140),
      })
    }

    const draw = (rot: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = '#050508'
      ctx.fillRect(0, 0, W, H)
      for (const s of bgStars) {
        ctx.fillStyle = `rgba(235,238,255,${s.a})`
        ctx.fillRect(s.x, s.y, s.r, s.r)
      }
      const cx = W / 2
      const cy = H / 2
      // core glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 260)
      glow.addColorStop(0, 'rgba(255,250,235,0.95)')
      glow.addColorStop(0.18, 'rgba(255,238,200,0.55)')
      glow.addColorStop(0.45, 'rgba(150,170,255,0.16)')
      glow.addColorStop(1, 'rgba(20,20,40,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, W, H)
      // particles
      const cos = Math.cos(rot)
      const sin = Math.sin(rot)
      for (const p of particles) {
        // rotate the arm point, then flatten to an inclined disc
        const px0 = p.r * Math.cos(p.theta)
        const py0 = p.r * Math.sin(p.theta)
        const x = cx + (px0 * cos - py0 * sin)
        const y = cy + (px0 * sin + py0 * cos) * 0.58
        const light = p.hue < 120 ? '255,244,214' : p.hue < 200 ? '210,225,255' : '190,175,255'
        ctx.fillStyle = `rgba(${light},${Math.max(0.05, p.alpha)})`
        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      draw(((now - start) / 1000) * 0.05)
      raf = window.requestAnimationFrame(tick)
    }

    if (reduced) {
      draw(0.8)
    } else if (active) {
      raf = window.requestAnimationFrame(tick)
    } else {
      draw(0.8)
    }
    return () => window.cancelAnimationFrame(raf)
  }, [active, reduced])

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Procedurally rendered spiral galaxy — the operator's fleet chart"
        className="block h-auto w-full"
        style={{ aspectRatio: `${W} / ${H}` }}
      />
    </div>
  )
}