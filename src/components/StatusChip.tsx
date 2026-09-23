import type { Mission } from '../data/profile'

const CHIP_CLASS: Record<Mission['status'], string> = {
  DEPLOYED: 'chip chip-solid',
  'IN TRANSIT': 'chip',
}

export function StatusChip({ status, className = '' }: { status: Mission['status']; className?: string }) {
  return (
    <span className={`${CHIP_CLASS[status]} ${className}`} data-status={status}>
      {status}
    </span>
  )
}

/** gold chip for certifications / highlights */
export function GoldChip({ children }: { children: string }) {
  return <span className="chip chip-gold">{children}</span>
}