import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { profile } from '../data/profile'

/** EXPERIENCE — visual timeline of roles + training */
export function Experience() {
  return (
    <section id="experience" aria-label="Experience timeline" className="scroll-mt-24 pt-20">
      <Reveal>
        <SectionHeading
          overline="05 · Flight Path"
          title="Experience & Training"
          blurb="From intensive academies to independent fleet operations — the timeline of how the models got built."
        />
      </Reveal>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1.35fr_1fr]">
        <Reveal delay={0.08}>
          <ol className="tl-rail">
            {profile.flightLog.map((entry) => (
              <li key={entry.role} className="tl-item">
                <p className="overline tabular">{entry.period}</p>
                <h3 className="mt-1 text-[15px] font-bold leading-snug">{entry.role}</h3>
                <p className="muted font-mono text-[11px] uppercase tracking-[0.12em]">{entry.org}</p>
                <p className="muted mt-2 max-w-xl text-[13.5px] leading-relaxed">{entry.detail}</p>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="vp h-fit p-6">
            <p className="overline mb-4">Education</p>
            <ul className="flex flex-col gap-5">
              {profile.education.map((edu) => (
                <li key={edu.degree}>
                  <p className="overline tabular">{edu.period}</p>
                  <h3 className="mt-1 text-[15px] font-bold leading-snug">{edu.degree}</h3>
                  <p className="muted text-xs">{edu.org}</p>
                  <p className="muted mt-2 text-[13px] leading-relaxed">{edu.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}