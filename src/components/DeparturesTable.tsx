import { useMemo, useState } from 'react'
import type { Mission } from '../data/profile'
import { missionRepoOverrides } from '../data/github'
import { StatusChip } from './StatusChip'

type SortKey = 'destination' | 'departing' | 'status'
type SortDir = 'asc' | 'desc'

const STATUS_RANK: Record<Mission['status'], number> = {
  DEPLOYED: 0,
  'IN TRANSIT': 1,
}

function compare(a: Mission, b: Mission, key: SortKey): number {
  switch (key) {
    case 'destination':
      return a.destination.localeCompare(b.destination)
    case 'departing':
      return Number(a.departing) - Number(b.departing)
    case 'status':
      return STATUS_RANK[a.status] - STATUS_RANK[b.status]
  }
}

interface DeparturesTableProps {
  missions: Mission[]
  /** pill-controlled "expand all details" */
  expandAll: boolean
}

/**
 * The centerpiece: SHABAN SPACELINES departures board. Oversized headers
 * with hairline vertical rules, live sort arrows, hover row-invert, and
 * stacked boarding-pass cards with visible field labels on mobile.
 */
export function DeparturesTable({ missions, expandAll }: DeparturesTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('destination')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [openRows, setOpenRows] = useState<Set<string>>(() => new Set())

  const sorted = useMemo(() => {
    const rows = [...missions]
    rows.sort((a, b) => {
      const primary = compare(a, b, sortKey)
      const signed = sortDir === 'asc' ? primary : -primary
      return signed !== 0 ? signed : compare(a, b, 'destination')
    })
    return rows
  }, [missions, sortKey, sortDir])

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const toggleRow = (id: string) =>
    setOpenRows((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const isOpen = (m: Mission) => expandAll || openRows.has(m.id)
  const repoUrl = (m: Mission) => missionRepoOverrides[m.id] ?? m.actions.repo

  const sortArrow = (key: SortKey) => (sortKey === key ? (sortDir === 'asc' ? '↑' : '↓') : '↕')
  const ariaSortValue = (key: SortKey) =>
    sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'

  return (
    <>
      {/* ===== desktop departures board ===== */}
      <div className="hidden overflow-x-auto md:block">
        <table className="dep-table min-w-[880px]" aria-label="Fleet departures board — sortable mission manifest">
          <thead>
            <tr>
              <th scope="col" className="w-[9%]">
                FLIGHT
              </th>
              <th scope="col" aria-sort={ariaSortValue('destination') as SortAria}>
                <button type="button" onClick={() => toggleSort('destination')}>
                  DESTINATION
                  <span className="dep-sort" aria-hidden="true">
                    {sortArrow('destination')}
                  </span>
                </button>
              </th>
              <th scope="col" className="w-[12%]" aria-sort={ariaSortValue('departing') as SortAria}>
                <button type="button" onClick={() => toggleSort('departing')}>
                  DEPARTING
                  <span className="dep-sort" aria-hidden="true">
                    {sortArrow('departing')}
                  </span>
                </button>
              </th>
              <th scope="col" className="w-[9%]">
                GATE
              </th>
              <th scope="col" className="w-[14%]" aria-sort={ariaSortValue('status') as SortAria}>
                <button type="button" onClick={() => toggleSort('status')}>
                  STATUS
                  <span className="dep-sort" aria-hidden="true">
                    {sortArrow('status')}
                  </span>
                </button>
              </th>
              <th scope="col" className="w-[20%]">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((m) => (
              <FragmentRow key={m.id} mission={m} open={isOpen(m)} onToggle={() => toggleRow(m.id)} repoUrl={repoUrl(m)} />
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== mobile boarding-pass cards ===== */}
      <ul className="flex flex-col gap-4 md:hidden">
        {sorted.map((m) => (
          <MobileCard key={m.id} mission={m} repoUrl={repoUrl(m)} />
        ))}
      </ul>
    </>
  )
}

type SortAria = 'ascending' | 'descending' | 'none'

function FragmentRow({
  mission,
  open,
  onToggle,
  repoUrl,
}: {
  mission: Mission
  open: boolean
  onToggle: () => void
  repoUrl: string | null
}) {
  const m = mission
  return (
    <>
      <tr className="dep-row" data-open={open} onClick={onToggle}>
        <td className="dep-dim font-bold">{m.id}</td>
        <td>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggle()
            }}
            aria-expanded={open}
            className="flex w-full items-baseline gap-2 text-left"
          >
            <span className="dep-dim text-[10px]" aria-hidden="true">
              {open ? '−' : '+'}
            </span>
            <span>
              {m.destination}
              <span className="dep-dim mt-0.5 block text-[10px] uppercase tracking-[0.14em] opacity-70">
                {m.name}
              </span>
            </span>
          </button>
        </td>
        <td className="dep-dim">{m.departing}</td>
        <td className="dep-dim">{m.gate}</td>
        <td>
          <StatusChip status={m.status} />
        </td>
        <td onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col items-start gap-1.5">
            {repoUrl ? (
              <a className="mono-btn" href={repoUrl} target="_blank" rel="noopener noreferrer">
                VIEW REPO ↗
              </a>
            ) : null}
            {m.actions.app ? (
              <a className="mono-btn" href={m.actions.app} target="_blank" rel="noopener noreferrer">
                OPEN STREAMLIT APP ↗
              </a>
            ) : null}
            {!repoUrl && !m.actions.app ? (
              <span className="dep-dim text-[10px] uppercase tracking-[0.14em]">— ground crew only —</span>
            ) : null}
          </div>
        </td>
      </tr>
      {open ? (
        <tr className="dep-detail" aria-label={`Mission log for ${m.name}`}>
          <td colSpan={6} className="border-l-0! bg-paper-2/60">
            <div className="max-w-3xl px-1 py-1 font-mono text-[12px] leading-relaxed">
              <span className="caption mr-2">[AGENT LOG]</span>
              {m.agentLog}
              <span className="caption mx-2">[STATS]</span>
              <span className="font-bold">{m.stats}</span>
            </div>
          </td>
        </tr>
      ) : null}
    </>
  )
}

function MobileCard({ mission, repoUrl }: { mission: Mission; repoUrl: string | null }) {
  const m = mission
  return (
    <li className="rounded-xl border border-ink/70 bg-paper-2/60">
      <div className="flex items-center justify-between border-b border-dashed border-ink/50 px-4 py-2.5">
        <span className="font-mono text-xs font-bold tracking-[0.18em]">{m.id}</span>
        <StatusChip status={m.status} />
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 px-4 py-3 font-mono text-[12px]">
        <dt className="caption">DESTINATION</dt>
        <dd className="font-bold">{m.destination}</dd>
        <dt className="caption">MISSION</dt>
        <dd>{m.name}</dd>
        <dt className="caption">DEPARTING</dt>
        <dd className="tabular">{m.departing}</dd>
        <dt className="caption">GATE</dt>
        <dd className="tabular">{m.gate}</dd>
        <dt className="caption">STATS</dt>
        <dd className="tabular font-bold">{m.stats}</dd>
        <dt className="caption">AGENT LOG</dt>
        <dd className="text-[11px] leading-relaxed opacity-80">{m.agentLog}</dd>
      </dl>
      <div className="flex flex-wrap gap-2 border-t border-dashed border-ink/50 px-4 py-3">
        {repoUrl ? (
          <a className="mono-btn" href={repoUrl} target="_blank" rel="noopener noreferrer">
            VIEW REPO ↗
          </a>
        ) : null}
        {m.actions.app ? (
          <a className="mono-btn" href={m.actions.app} target="_blank" rel="noopener noreferrer">
            OPEN STREAMLIT APP ↗
          </a>
        ) : null}
      </div>
    </li>
  )
}