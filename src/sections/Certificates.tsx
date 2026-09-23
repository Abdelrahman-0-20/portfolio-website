import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { profile } from '../data/profile'

/** CERTIFICATES — credentials with dates and issuers */
export function Certificates() {
  return (
    <section id="certificates" aria-label="Certificates" className="scroll-mt-24 pt-20">
      <Reveal>
        <SectionHeading
          overline="04 · Credentials"
          title="My Certificates"
          blurb="Certified across AI, analytics and cloud — with the receipts."
        />
      </Reveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.certifications.map((cert, i) => (
          <Reveal key={cert.name} delay={i * 0.04}>
            <article className="proj-card flex h-full flex-col gap-3 p-5">
              <div className="flex items-center justify-between">
                <span className="overline">{cert.issuer}</span>
                <span className="chip chip-gold">{cert.status}</span>
              </div>
              <h3 className="text-[15px] font-bold leading-snug">{cert.name}</h3>
              {cert.date ? <p className="muted font-mono text-xs tabular">{cert.date}</p> : <p className="muted font-mono text-xs">—</p>}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}