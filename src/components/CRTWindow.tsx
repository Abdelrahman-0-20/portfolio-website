import type { ReactNode } from 'react'
import { useUptime } from '../hooks/useRuntime'

interface CRTWindowProps {
  title: string
  children: ReactNode
  /** amber = warning/log console variant */
  variant?: 'green' | 'amber'
  /** show the SYSTEM: Uvicorn-wpgpl-v1.2 status footer */
  statusFooter?: boolean
  footerNote?: string
  className?: string
  /** accessible role/label passthrough */
  ariaLabel?: string
}

/**
 * CRT monitor: thick bezel + title bar + phosphor screen with scanlines +
 * status footer with live uptime. Phosphor color lives ONLY in here.
 */
export function CRTWindow({
  title,
  children,
  variant = 'green',
  statusFooter = true,
  footerNote,
  className = '',
  ariaLabel,
}: CRTWindowProps) {
  const uptime = useUptime()
  return (
    <div className={`crt-bezel ${variant === 'amber' ? 'crt-amber' : ''} ${className}`} role="group" aria-label={ariaLabel ?? title}>
      <div className="flex items-center justify-between rounded-t-[10px] bg-black/60 px-3 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-phosphor glow">
          {title}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[9px] text-phosphor/70" aria-hidden="true">
          <span>▣</span>
          <span>▲</span>
          <span>⏻</span>
        </span>
      </div>
      <div className="crt-screen on-crt p-3 sm:p-4">
        {children}
      </div>
      {statusFooter ? (
        <div className="flex items-center justify-between gap-2 rounded-b-[10px] bg-black/55 px-3 py-1">
          <span className="font-mono text-[9px] tracking-[0.08em] text-phosphor/80 tabular glow">
            SYSTEM: Uvicorn-wpgpl-v1.2 // TEMP: 45C // Uptime: {uptime} // [LOSS] [HELP] [SHUTDOWN]
          </span>
          {footerNote ? (
            <span className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-phosphor/60 md:block">
              {footerNote}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}