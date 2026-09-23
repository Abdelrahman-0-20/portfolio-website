import { CRTWindow } from '../components/CRTWindow'
import { SectionHeading } from '../components/SectionHeading'
import { BioDomeGame } from '../components/BioDomeGame'
import { ProgressPips } from '../components/ProgressPips'
import { Reveal } from '../components/Reveal'
import { SHIP_ASCII } from '../lib/ascii'

/** BIO-DOME SIM — the playable CRT mini-game (kept from v1/v2) */
export function Sim() {
  return (
    <section id="sim" aria-label="Bio-Dome simulator" className="scroll-mt-24 pt-20">
      <Reveal>
        <div className="block-dark p-6 sm:p-10">
          <SectionHeading
            overline="07 · Recreational Deck"
            title="Bio-Dome Sim"
            blurb="A playable break: fly the ASCII starship inside the neon dome. Collect model weights, dodge NaN debris."
            dark
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <Reveal delay={0.08}>
              <CRTWindow title="WEEGPL BIO-DOME SHIP — UVI-CORON INTERACTION" footerNote="FULL INTERACTIVE SIM">
                <BioDomeGame />
              </CRTWindow>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="flex flex-col gap-5">
                <div className="rounded-xl border border-white/15 p-4">
                  <p className="overline mb-3">UVI-Corons emitter</p>
                  <pre className="select-none text-center font-mono text-[11px] leading-[1.25] text-[#f2f1ec] glow" aria-hidden="true">
                    {SHIP_ASCII.join('\n')}
                  </pre>
                </div>
                <div className="rounded-xl border border-white/15 p-4">
                  <ProgressPips value={1} label="WEEGPL CORE STATUS" state="ONLINE" className="text-[#f2f1ec]" />
                  <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-[#f2f1ec]/70">
                    HATCH: CLICK THE DOME OR PRESS ENTER (FOCUSED) · FLY WITH ARROWS / WASD · DRAG ON TOUCH · P PAUSE · R REBOOT
                  </p>
                </div>
                <div className="rounded-xl border border-white/15 p-4">
                  <p className="overline mb-2">Mission rules</p>
                  <ul className="flex flex-col gap-1.5 font-mono text-[10.5px] leading-relaxed text-[#f2f1ec]/80">
                    <li>▸ Collect ▓ weights (+10 pts each) — 10 docked → CORE ONLINE</li>
                    <li>▸ Avoid ▒ NaN debris — hull holds 3 hits</li>
                    <li>▸ Leaving focus pauses the sim automatically</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Reveal>
    </section>
  )
}