import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { services } from '../data/profile'

/** SERVICES — freelance offerings */
export function Services() {
  return (
    <section id="services" aria-label="Services" className="scroll-mt-24 pt-20">
      <Reveal>
        <SectionHeading
          overline="06 · What I Offer"
          title="Services"
          blurb="Freelance-ready engagements — scoped, measured and delivered with documentation."
        />
      </Reveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <Reveal key={s.code} delay={i * 0.06}>
            <article className="proj-card flex h-full flex-col gap-3 p-6">
              <span className="overline">{s.code}</span>
              <h3 className="text-lg font-bold leading-snug">{s.name}</h3>
              <p className="muted text-[13px] leading-relaxed">{s.description}</p>
              <ul className="mt-auto flex flex-col gap-1.5 border-t border-line pt-3 text-[13px]">
                {s.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-[color:var(--color-accent)]">
                      ▸
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}