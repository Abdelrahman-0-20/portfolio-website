import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { aboutBio, profile } from '../data/profile'

/** OPERATOR // SYSTEM ARCHITECTURE — flow diagram replacing the ASCII render */
function SystemArchitecture() {
  return (
    <div aria-label="Operator system architecture diagram" className="flex flex-col gap-3">
      <p className="overline">Operator // System Architecture</p>

      <div className="rounded-xl border border-line bg-[color:var(--color-block)] p-4 text-[color:var(--color-ink-inverse)]">
        {/* row 1: sources */}
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em]">
          <span className="rounded-md border border-white/25 px-2 py-1">📁 Data Sources</span>
          <span className="opacity-60">→</span>
          <span className="rounded-md border border-white/25 px-2 py-1">🧮 Pandas ETL</span>
          <span className="opacity-60">→</span>
          <span className="rounded-md border border-[color:var(--color-accent)] px-2 py-1 font-bold text-[color:var(--color-accent)]">
            WEEGPL ML FLEET
          </span>
        </div>
        <div className="my-2 flex justify-center">
          <span aria-hidden="true" className="h-4 w-px bg-white/30" />
        </div>
        {/* row 2: training core */}
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em]">
          <span className="rounded-md border border-white/25 px-2 py-1">🧠 scikit-learn / CNN</span>
          <span className="opacity-60">→</span>
          <span className="rounded-md border border-white/25 px-2 py-1">✅ Validation · CV · ROC-AUC</span>
        </div>
        <div className="my-2 flex justify-center">
          <span aria-hidden="true" className="h-4 w-px bg-white/30" />
        </div>
        {/* row 3: deployment */}
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em]">
          <span className="rounded-md bg-[color:var(--color-accent)] px-2 py-1 font-bold text-black">⚡ FastAPI v1.31</span>
          <span className="rounded-md bg-white/15 px-2 py-1">🟢 Streamlit v1.31</span>
          <span className="rounded-md border border-white/25 px-2 py-1">🐳 Docker</span>
        </div>
        <p className="mt-3 text-center font-mono text-[9.5px] uppercase tracking-[0.16em] text-white/50">
          Data pipeline → model fleet → production deployment
        </p>
      </div>
    </div>
  )
}

/** ABOUT ME — bio + architecture & education card (ASCII removed in v4) */
export function About() {
  const edu = profile.education
  return (
    <section id="about" aria-label="About me" className="scroll-mt-24 pt-20">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <SectionHeading overline="01 · Who I Am" title="About Me" blurb={aboutBio} />
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="vp p-4">
              <dt className="overline">Base of operations</dt>
              <dd className="mt-1 text-sm font-medium">{profile.operator.location}</dd>
            </div>
            <div className="vp p-4">
              <dt className="overline">Degree</dt>
              <dd className="mt-1 text-sm font-medium">{edu[0].degree} — 2025</dd>
            </div>
            <div className="vp p-4">
              <dt className="overline">Languages</dt>
              <dd className="mt-1 text-sm font-medium">
                {profile.operator.languages.map((l) => `${l.language} (${l.level.split(' ')[0]})`).join(' · ')}
              </dd>
            </div>
            <div className="vp p-4">
              <dt className="overline">Approach</dt>
              <dd className="mt-1 text-sm font-medium">Honest metrics · clean splits · clear stories</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="vp flex h-full flex-col gap-5 p-6">
            <SystemArchitecture />
            <div className="border-t border-line pt-4">
              <p className="overline mb-3">Education</p>
              <ul className="flex flex-col gap-4 text-sm">
                <li>
                  <p className="font-bold leading-snug">B.S. in Computer Science</p>
                  <p className="muted text-xs">
                    Higher Institute of Information Technology Management (HIMIT), Kafr El-Sheikh · 2022–2025
                  </p>
                  <p className="muted mt-1 text-[12.5px] leading-relaxed">
                    Major: Data Science Department · Overall: Good+ · Capstone: End-to-End Scalable Image Recognition
                    Pipeline (graded Excellent). Added modules: Foundations of ML, Big Data Analytics, Cloud Computing,
                    Advanced Algorithms.
                  </p>
                </li>
                <li>
                  <p className="font-bold leading-snug">Foundation Year in Programming & Embedded Systems</p>
                  <p className="muted text-xs">Higher Future Institute for Engineering and Technology · 2021–2022</p>
                  <p className="muted mt-1 text-[12.5px] leading-relaxed">
                    C#, Data Structures, Algorithm Core, Digital Logic Design, IoT Node Development. Final project:
                    engineered a sensor-network node for environmental monitoring.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}