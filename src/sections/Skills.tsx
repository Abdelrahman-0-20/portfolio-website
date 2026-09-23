import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { skillGroups } from '../data/profile'

/** TECH STACK — scannable grid of tools */
export function Skills() {
  return (
    <section id="skills" aria-label="Tech stack" className="scroll-mt-24 pt-20">
      <Reveal>
        <SectionHeading
          overline="02 · Capabilities"
          title="Tech Stack & Skills"
          blurb="The tools I reach for daily — from raw CSV to a containerized scoring endpoint."
        />
      </Reveal>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.06}>
            <div className="vp h-full p-6">
              <p className="overline mb-4">{group.label}</p>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="skill-chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}