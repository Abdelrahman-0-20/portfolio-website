import { GalaxyCanvas } from '../components/GalaxyCanvas'
import { Reveal } from '../components/Reveal'
import { Marquee } from '../components/Marquee'
import {
  fleetCounts,
  heroIntro,
  heroTitle,
  modelProduction,
  profile,
  reproducibility,
  techStrip,
} from '../data/profile'
import { githubProfile } from '../data/github'

/** HOME — galaxy hero screen + production/reproducibility card + tech strip */
export function Hero() {
  return (
    <section id="home" aria-label="Home" className="scroll-mt-24 pt-6">
      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
        {/* galaxy screen */}
        <Reveal>
          <div className="hero-screen block-dark">
            <div className="absolute inset-0">
              <GalaxyCanvas />
            </div>
            <div className="relative z-10 flex min-h-[420px] flex-col justify-between p-6 sm:p-10 lg:min-h-[520px]">
              <p className="overline">MLV ABDELRAHMAN // FLEET ONLINE</p>
              <div>
                <h1 className="hero-title text-4xl sm:text-6xl lg:text-[4.2rem]" style={{ color: 'var(--color-ink-inverse)' }}>
                  ABDELRAHMAN
                  <br />
                  SHABAN
                </h1>
                <p className="gold-line mt-4 font-mono text-xs tracking-[0.18em] uppercase sm:text-sm">
                  {heroTitle}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#projects" className="btn btn-gold">
                    View Projects ↗
                  </a>
                  <a
                    href="/manifest.pdf"
                    download
                    className="btn border-white/30 text-[color:var(--color-ink-inverse)] hover:bg-white/10"
                  >
                    Download CV ↓
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* operator card — production & reproducibility */}
        <Reveal delay={0.12}>
          <div className="vp flex h-full flex-col gap-5 p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-block font-mono text-lg font-bold text-[color:var(--color-ink-inverse)]">
                AS
              </div>
              <div>
                <p className="text-lg font-bold leading-tight">{profile.operator.displayName.replace(' ABDELRAHMAN', '')}</p>
                <p className="muted font-mono text-[11px] uppercase tracking-[0.14em]">{profile.operator.location}</p>
              </div>
            </div>

            <p className="text-[14.5px] leading-relaxed">{heroIntro}</p>

            {/* model production */}
            <div className="border-t border-line pt-4">
              <p className="overline mb-2">
                Model production ({fleetCounts.deployed} production)
              </p>
              <ul className="flex flex-col gap-1.5 text-[13.5px]">
                {modelProduction.map((m) => (
                  <li key={m.code} className="flex items-baseline gap-2">
                    <span aria-hidden="true" className="text-[color:var(--color-accent)]">
                      •
                    </span>
                    <span>
                      <a
                        href={m.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline decoration-line underline-offset-2 hover:decoration-ink"
                      >
                        {m.code} | {m.name}
                      </a>
                      <span className="muted"> ({m.stack})</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* reproducibility */}
            <div className="border-t border-line pt-4">
              <p className="overline mb-2">Reproducibility ({githubProfile.publicRepos} repos)</p>
              <ul className="flex flex-col gap-1.5 text-[13.5px]">
                {reproducibility.map((item) => (
                  <li key={item} className="flex items-baseline gap-2">
                    <span aria-hidden="true" className="text-[color:var(--color-accent)]">
                      •
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <dl className="grid grid-cols-3 gap-3 border-t border-line pt-4 text-center">
              <div>
                <dt className="overline">Deployed</dt>
                <dd className="text-xl font-black tabular">{fleetCounts.deployed}</dd>
              </div>
              <div>
                <dt className="overline">In transit</dt>
                <dd className="text-xl font-black tabular">{fleetCounts.inTransit}</dd>
              </div>
              <div>
                <dt className="overline">Repos</dt>
                <dd className="text-xl font-black tabular">{githubProfile.publicRepos}</dd>
              </div>
            </dl>
            <a href={`mailto:${profile.operator.contact.email}`} className="mono-link self-start">
              ✉ {profile.operator.contact.email}
            </a>
          </div>
        </Reveal>
      </div>

      {/* tech strip */}
      <Reveal delay={0.18}>
        <div className="mt-6 flex flex-col gap-2 border-y border-line py-4">
          <p className="overline">Stack & tools</p>
          <Marquee items={techStrip} className="text-ink" />
        </div>
      </Reveal>
    </section>
  )
}