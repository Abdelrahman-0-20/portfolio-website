import { useMemo } from 'react'
import { generatePortrait } from '../lib/ascii'

interface ASCIIPortraitProps {
  className?: string
  cols?: number
  lines?: number
  seed?: number
}

/**
 * Dot-matrix ASCII portrait of the operator — generated from a character
 * ramp over a deterministic silhouette (no stock photo, no asset download).
 * Ink color is inherited from the parent (paper ink or CRT phosphor).
 */
export function ASCIIPortrait({ className = '', cols = 64, lines = 30, seed = 7 }: ASCIIPortraitProps) {
  const art = useMemo(() => generatePortrait(cols, lines, seed), [cols, lines, seed])
  return (
    <pre
      role="img"
      aria-label="Dot-matrix ASCII portrait of the operator at his console, rendered from characters"
      className={`select-none font-mono text-[5px] leading-[1.08] tracking-[0.06em] sm:text-[7px] md:text-[8.5px] ${className}`}
    >
      {art.rows.join('\n')}
    </pre>
  )
}