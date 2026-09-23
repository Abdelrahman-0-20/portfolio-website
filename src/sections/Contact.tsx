import { SectionHeading } from '../components/SectionHeading'
import { ContactForm } from '../components/ContactForm'
import { Reveal } from '../components/Reveal'
import { contactChannels } from '../data/profile'

/** CONTACT — submission form + all channels (Telegram separate from WhatsApp) */
export function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="scroll-mt-24 pt-20">
      <Reveal>
        <SectionHeading
          overline="08 · Transmission"
          title="Contact Me"
          blurb="Have a dataset, a dashboard idea or an automation in mind? Send a transmission — I answer within a day."
        />
      </Reveal>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_1fr]">
        <Reveal delay={0.08}>
          <div className="vp p-6 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="flex h-full flex-col gap-4">
            <ul className="flex flex-col overflow-hidden rounded-2xl border border-line">
              {contactChannels.map((ch) => (
                <li key={ch.key} className="border-b border-line last:border-b-0">
                  <a
                    href={ch.href}
                    target={ch.href.startsWith('http') ? '_blank' : undefined}
                    rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-ink hover:text-[color:var(--color-bg)]"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line font-mono text-xs"
                    >
                      {ch.icon}
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="overline">{ch.label}</span>
                      <span className="truncate text-sm font-medium">{ch.value}</span>
                    </span>
                    <span className="ml-auto opacity-50" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a href="/manifest.pdf" download className="btn btn-ghost self-start">
              Download CV (manifest.pdf) ↓
            </a>
          </div>
        </Reveal>
      </div>

      {/* footer */}
      <footer className="mt-16 block-dark p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.14em] opacity-80">
          <span>© 2025 ABDELRAHMAN E. A. H. SHABAN · CAIRO, EGYPT</span>
          <span>SYSTEM: Uvicorn-wpgpl-v3 // TEMP: 45C // [LOSS] [HELP] [SHUTDOWN]</span>
        </div>
      </footer>
    </section>
  )
}