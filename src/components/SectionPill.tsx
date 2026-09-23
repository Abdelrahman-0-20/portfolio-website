import { useEffect, useRef, useState } from 'react'
import { SECTIONS } from '../data/profile'

interface SectionPillProps {
  currentId: string
}

/** Fixed bottom-center pill — jump menu across all sections (keys 0–8 also work) */
export function SectionPill({ currentId }: SectionPillProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const current = SECTIONS.find((s) => s.id === currentId) ?? SECTIONS[0]

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onClick)
    }
  }, [open])

  return (
    <div ref={rootRef} className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
      {open ? (
        <div
          role="menu"
          aria-label="Jump to section"
          className="mb-3 flex flex-col gap-1 rounded-2xl border border-line bg-panel/95 p-2 shadow-2xl backdrop-blur"
        >
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              role="menuitem"
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              aria-current={s.id === currentId ? 'true' : undefined}
              className={`rounded-lg px-4 py-2 text-[13px] font-medium transition-colors ${
                s.id === currentId ? 'bg-ink text-bg' : 'text-ink hover:bg-ink/10'
              }`}
            >
              <span className="mr-3 font-mono text-[10px] opacity-60">{s.key}</span>
              {s.title}
            </a>
          ))}
        </div>
      ) : null}
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="btn btn-solid !rounded-full px-5! py-2.5! text-[13px]! shadow-black/40"
      >
        <span aria-hidden="true" className="opacity-60">
          {open ? '×' : '☰'}
        </span>
        {current.title}
      </button>
    </div>
  )
}