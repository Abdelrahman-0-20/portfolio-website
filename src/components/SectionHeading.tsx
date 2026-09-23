interface SectionHeadingProps {
  overline: string
  title: string
  blurb?: string
  dark?: boolean
  id?: string
}

/** Consistent editorial heading: gold overline + Roboto 900 title + muted blurb */
export function SectionHeading({ overline, title, blurb, dark = false, id }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="overline">{overline}</p>
      <h2
        id={id}
        className="mt-2 text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.75rem]"
        style={dark ? { color: 'var(--color-ink-inverse)' } : undefined}
      >
        {title}
      </h2>
      {blurb ? <p className="muted mt-3 text-[15px] leading-relaxed">{blurb}</p> : null}
    </div>
  )
}