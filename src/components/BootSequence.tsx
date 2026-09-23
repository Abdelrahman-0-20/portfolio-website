import { useEffect, useRef, useState } from 'react'
import { bootLines } from '../lib/ascii'
import { fleetCounts } from '../data/profile'
import { usePrefersReducedMotion } from '../hooks/useRuntime'

interface BootSequenceProps {
  onDone: () => void
}

const LINE_INTERVAL = 180
const HOLD = 650

/**
 * Pre-flight boot sequence — types the self-test log, then releases.
 * Plays once per session, is skippable with any key/click, and never
 * blocks scrolling (overlay only; scroll lock is capped by the timeout).
 */
export function BootSequence({ onDone }: BootSequenceProps) {
  const lines = useRef(bootLines(fleetCounts.deployed, fleetCounts.inTransit))
  const [shown, setShown] = useState(0)
  const [done, setDone] = useState(false)
  const reduced = usePrefersReducedMotion()
  const finished = useRef(false)

  const finish = () => {
    if (finished.current) return
    finished.current = true
    setDone(true)
    onDone()
  }

  useEffect(() => {
    if (reduced) {
      finish()
      return
    }
    const timers: number[] = []
    lines.current.forEach((_, i) => {
      timers.push(window.setTimeout(() => setShown(i + 1), LINE_INTERVAL * (i + 1)))
    })
    timers.push(window.setTimeout(finish, LINE_INTERVAL * lines.current.length + HOLD))
    return () => timers.forEach((t) => window.clearTimeout(t))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  useEffect(() => {
    if (done) return
    const skip = () => finish()
    window.addEventListener('keydown', skip, { once: true })
    window.addEventListener('mousedown', skip, { once: true })
    return () => {
      window.removeEventListener('keydown', skip)
      window.removeEventListener('mousedown', skip)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done])

  if (done) return null

  return (
    <div
      className="crt-screen on-crt fixed inset-0 z-[100] flex items-center justify-center rounded-none p-6"
      role="status"
      aria-label="System boot sequence"
      onClick={finish}
    >
      <div className="w-full max-w-xl font-vt text-lg leading-relaxed text-phosphor glow sm:text-xl">
        {lines.current.slice(0, shown).map((line) => (
          <div key={line}>{line}</div>
        ))}
        <div>
          <span className="caret" aria-hidden="true" />
        </div>
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-[0.2em] text-phosphor/60">
        [ ANY KEY TO SKIP ]
      </div>
    </div>
  )
}