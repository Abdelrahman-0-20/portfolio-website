interface ProgressPipsProps {
  /** 0..1 */
  value: number
  segments?: number
  label?: string
  /** trailing state word, e.g. ONLINE */
  state?: string
  className?: string
}

/** `WEEGPL CORE STATUS ▓▓▓░░ ONLINE` */
export function ProgressPips({ value, segments = 5, label, state, className = '' }: ProgressPipsProps) {
  const filled = Math.round(value * segments)
  const bar = '▓'.repeat(Math.max(0, Math.min(segments, filled))) + '░'.repeat(Math.max(0, segments - filled))
  return (
    <span className={`inline-flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.12em] ${className}`}>
      {label ? <span className="opacity-80">{label}</span> : null}
      <span className="tabular" aria-hidden="true">
        {bar}
      </span>
      <span className="sr-only">{label ? `${label} ` : ''}{Math.round(value * 100)}%{state ? ` ${state}` : ''}</span>
      {state ? <span className="glow">{state}</span> : null}
    </span>
  )
}