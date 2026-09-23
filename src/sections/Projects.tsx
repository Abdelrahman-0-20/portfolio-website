import { useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { DeparturesTable } from '../components/DeparturesTable'
import { featuredProjects, projectArchive, profile, STREAMLIT_URL } from '../data/profile'

/** PROJECTS — 4 featured builds + the full fleet manifest board */
export function Projects() {
  const [showManifest, setShowManifest] = useState(false)
  return (
    <section id="projects" aria-label="Projects" className="scroll-mt-24 pt-20">
      <Reveal>
        <div className="block-dark p-6 sm:p-10 lg:p-12">
          <SectionHeading
            overline="03 · Selected Work"
            title="My Projects"
            blurb="Four builds that show the range — from a containerized fraud-scoring API to a cited-answer PDF chatbot. Every repo is real and public."
            dark
          />
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href={STREAMLIT_URL} target="_blank" rel="noopener noreferrer" className="btn border-white/30 text-[color:var(--color-ink-inverse)] hover:bg-white/10 !py-2.5 !text-sm">
              ▶ See other projects via Streamlit ↗
            </a>
            <p className="muted text-xs">Live demo fleet — {projectArchive.filter((p) => p.live).length} Streamlit apps in the archive below.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.code} delay={i * 0.07}>
                <article className="proj-card flex h-full flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <span className="overline">{p.code}</span>
                    <span className="chip chip-gold tabular">{p.metric}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold leading-snug" style={{ color: 'var(--color-ink-inverse)' }}>
                      {p.name}
                    </h3>
                    <p className="muted font-mono text-[11px] uppercase tracking-[0.14em]">{p.tagline}</p>
                  </div>
                  <p className="text-sm leading-relaxed opacity-80">{p.description}</p>
                  <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
                    {p.tech.map((t) => (
                      <li
                        key={t}
                        className="chip !border-white/25 !bg-transparent"
                        style={{ color: 'var(--color-ink-inverse)' }}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    <a
                      className="mono-link"
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ borderColor: 'rgb(255 255 255 / 0.4)', color: 'var(--color-ink-inverse)' }}
                    >
                      VIEW REPO ↗
                    </a>
                    {p.demo ? (
                      <a
                        className="mono-link"
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ borderColor: 'rgb(255 255 255 / 0.4)', color: 'var(--color-ink-inverse)' }}
                      >
                        LIVE DEMO ↗
                      </a>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* full manifest */}
      <Reveal delay={0.1}>
        <div className="vp mt-6 p-6 sm:p-8">
          <button
            type="button"
            onClick={() => setShowManifest((v) => !v)}
            aria-expanded={showManifest}
            className="flex w-full items-center justify-between gap-4 text-left"
          >
            <span>
              <span className="overline">Full fleet manifest</span>
              <span className="block text-lg font-bold">
                All {profile.missions.length} missions — sortable board
              </span>
            </span>
            <span aria-hidden="true" className="text-2xl">
              {showManifest ? '−' : '+'}
            </span>
          </button>
          {showManifest ? (
            <div className="mt-6 border-t border-line pt-6">
              <DeparturesTable missions={profile.missions} expandAll={false} />
            </div>
          ) : (
            <p className="muted mt-3 text-sm">
              Departures board with all deployments, gates, statuses and repo links — click to expand.
            </p>
          )}
        </div>
      </Reveal>

      {/* verified project archive — every row is a real public repo */}
      <Reveal delay={0.14}>
        <div className="vp mt-6 p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <span>
              <span className="overline">Verified archive</span>
              <span className="block text-lg font-bold">
                {projectArchive.length} verified projects — every row is a real public repo
              </span>
            </span>
            <a href={STREAMLIT_URL} target="_blank" rel="noopener noreferrer" className="mono-link">
              ▶ RUN LIVE DEMOS ON STREAMLIT ↗
            </a>
          </div>
          <div className="mt-5 max-h-[460px] overflow-y-auto rounded-xl border border-line">
            <table className="dep-table min-w-[720px]" aria-label="Verified project archive">
              <thead>
                <tr>
                  <th scope="col" className="w-[8%]">Code</th>
                  <th scope="col">Project (repo)</th>
                  <th scope="col" className="w-[26%]">Focus</th>
                  <th scope="col" className="w-[24%]">Stack</th>
                  <th scope="col" className="w-[16%]">Links</th>
                </tr>
              </thead>
              <tbody>
                {projectArchive.map((p) => (
                  <tr key={`${p.code}-${p.name}`} >
                    <td className="dep-dim font-mono text-[11px] font-bold">{p.code}</td>
                    <td className="font-medium">{p.name}</td>
                    <td className="dep-dim text-[12.5px]">{p.focus}</td>
                    <td className="dep-dim font-mono text-[11.5px]">{p.stack}</td>
                    <td>
                      <div className="flex flex-wrap gap-1.5">
                        <a
                          className="mono-link !text-[9.5px]"
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          REPO ↗
                        </a>
                        {p.live ? (
                          <a
                            className="mono-link !text-[9.5px] !border-[color:var(--color-accent)] !text-[color:var(--color-accent)]"
                            href={STREAMLIT_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            LIVE ↗
                          </a>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted mt-3 text-xs">
            Verified live via the GitHub REST API — {projectArchive.filter((p) => p.live).length} apps are runnable on
            the Streamlit fleet hub; the rest run locally from their repos.
          </p>
        </div>
      </Reveal>
    </section>
  )
}