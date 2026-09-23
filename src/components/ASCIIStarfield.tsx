import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/useRuntime'
import { mulberry32 } from '../lib/ascii'

export type ThemeName = 'paper' | 'terminal'

interface ASCIIStarfieldProps {
  theme: ThemeName
}

interface Star {
  x: number
  y: number
  r: number
  speed: number
  phase: number
  alpha: number
}

/** Full-screen drifting starfield rendered on a fixed canvas behind the paper viewports */
export function ASCIIStarfield({ theme }: ASCIIStarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let stars: Star[] = []
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const seedStars = () => {
      const rand = mulberry32(42)
      const count = Math.min(220, Math.floor((window.innerWidth * window.innerHeight) / 14000))
      stars = Array.from({ length: count }, () => ({
        x: rand() * window.innerWidth,
        y: rand() * window.innerHeight,
        r: 0.5 + rand() * 1.1,
        speed: 4 + rand() * 10,
        phase: rand() * Math.PI * 2,
        alpha: 0.25 + rand() * 0.55,
      }))
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      seedStars()
      if (reduced) drawStatic()
    }

    const drawStatic = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      paint(0)
    }

    const paint = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      const color =
        theme === 'terminal' ? (a: number) => `rgba(242,241,236,${a})` : (a: number) => `rgba(22,22,26,${a})`
      for (const s of stars) {
        const twinkle = reduced ? 1 : 0.72 + 0.28 * Math.sin(t * 0.0009 * s.speed + s.phase)
        ctx.beginPath()
        ctx.fillStyle = color(s.alpha * twinkle)
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const tick = (t: number) => {
      for (const s of stars) {
        s.y += s.speed * 0.016
        s.x -= s.speed * 0.004
        if (s.y > window.innerHeight + 4) s.y = -4
        if (s.x < -4) s.x = window.innerWidth + 4
      }
      paint(t)
      raf = window.requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    if (reduced) {
      drawStatic()
    } else {
      raf = window.requestAnimationFrame(tick)
    }
    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [theme, reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  )
}