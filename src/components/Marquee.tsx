interface MarqueeProps {
  items: string[]
  className?: string
}

/** Infinite tech-stack ticker: PYTHON ✦ PANDAS ✦ … */
export function Marquee({ items, className = '' }: MarqueeProps) {
  const run = (hidden: boolean) => (
    <span aria-hidden={hidden || undefined} className="marquee-track shrink-0 items-center">
      {items.map((item) => (
        <span key={`${item}-${hidden}`} className="flex items-center font-mono text-sm tracking-[0.22em]">
          {item}
          <span className="mx-6 text-[0.7em]" aria-hidden="true">
            ·
          </span>
        </span>
      ))}
    </span>
  )
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className="flex w-max">
        {run(false)}
        {run(true)}
      </div>
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}