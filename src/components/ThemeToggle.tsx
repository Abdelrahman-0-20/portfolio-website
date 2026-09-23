import type { ThemeName } from './ASCIIStarfield'

interface ThemeToggleProps {
  theme: ThemeName
  onToggle: () => void
}

/**
 * Night-mode toggle — fixed to the top of the viewport on every section.
 * Icon-first chip: ☾ NIGHT (phosphor green when night is active) / ☀ DAY.
 */
export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const night = theme === 'terminal'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={night}
      aria-label={
        night ? 'Night mode is on — switch to day blueprint mode' : 'Day mode is on — switch to night terminal mode'
      }
      title={night ? 'Switch to DAY (blueprint) mode' : 'Switch to NIGHT (terminal) mode'}
      className={`fixed right-4 top-4 z-50 inline-flex items-center gap-2.5 rounded-full border py-2 pl-3 pr-4 font-mono text-[10px] uppercase tracking-[0.18em] shadow-lg shadow-black/30 backdrop-blur transition-colors ${
        night
          ? 'border-[#7cfc9a]/60 bg-[#7cfc9a]/10 text-[#7cfc9a] glow hover:bg-[#7cfc9a] hover:text-black'
          : 'border-ink/30 bg-paper/70 text-ink hover:bg-ink hover:text-paper'
      }`}
    >
      <span aria-hidden="true" className={`text-base leading-none ${night ? 'glow' : ''}`}>
        {night ? '☾' : '☀'}
      </span>
      <span>{night ? 'NIGHT' : 'DAY'}</span>
    </button>
  )
}