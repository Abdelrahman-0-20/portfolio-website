import { useEffect, useState } from 'react'

const BASE_SECONDS = 23 * 3600 + 58 * 60 + 11 // reference status line: 23:58:11

function format(total: number): string {
  const h = Math.floor(total / 3600) % 100
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

/** Live-updating uptime clock starting from the reference 23:58:11 */
export function useUptime(): string {
  const [seconds, setSeconds] = useState(BASE_SECONDS)
  useEffect(() => {
    const id = window.setInterval(() => setSeconds((v) => (v + 1) % 360000), 1000)
    return () => window.clearInterval(id)
  }, [])
  return format(seconds)
}

/** True once the given media query matches; updates on change */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', onChange)
    setMatches(mq.matches)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export const usePrefersReducedMotion = (): boolean =>
  useMediaQuery('(prefers-reduced-motion: reduce)')

/** Pause timers/canvases while the tab is hidden or the element is offscreen */
export function useActive(ref: React.RefObject<HTMLElement | null>): boolean {
  const [active, setActive] = useState(true)
  useEffect(() => {
    const onVisibility = () => setActive(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry) setActive(!document.hidden && entry.isIntersecting)
      },
      { threshold: 0.05 },
    )
    io.observe(el)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      io.disconnect()
    }
  }, [ref])
  return active
}

/** Fires true once the element has entered the viewport (stay-true reveal) */
export function useRevealed<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  rootMargin = '0px 0px -12% 0px',
): boolean {
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setRevealed(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin])
  return revealed
}