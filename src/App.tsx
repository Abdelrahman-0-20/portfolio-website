import { useCallback, useEffect, useRef, useState } from 'react'
import { ASCIIStarfield, type ThemeName } from './components/ASCIIStarfield'
import { BootSequence } from './components/BootSequence'
import { SectionPill } from './components/SectionPill'
import { ThemeToggle } from './components/ThemeToggle'
import { SECTIONS } from './data/profile'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Certificates } from './sections/Certificates'
import { Experience } from './sections/Experience'
import { Services } from './sections/Services'
import { Sim } from './sections/Sim'
import { Contact } from './sections/Contact'

const THEME_KEY = 'shaban-spacelines-theme'
const BOOT_KEY = 'shaban-spacelines-booted'

function readTheme(): ThemeName {
  try {
    const stored = window.localStorage.getItem(THEME_KEY)
    return stored === 'terminal' || stored === 'paper' ? stored : 'paper' // v3: day by default
  } catch {
    return 'paper'
  }
}

function readBooted(): boolean {
  try {
    return window.sessionStorage.getItem(BOOT_KEY) === '1'
  } catch {
    return false
  }
}

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function App() {
  const [theme, setTheme] = useState<ThemeName>(readTheme)
  const [booting, setBooting] = useState(() => !readBooted())
  const [justBooted, setJustBooted] = useState(false)
  const [currentId, setCurrentId] = useState('home')
  const pendingG = useRef(false)
  const gTimer = useRef(0)

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'paper' ? 'terminal' : 'paper')), [])

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      window.localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  useEffect(() => {
    if (!booting) {
      try {
        window.sessionStorage.setItem(BOOT_KEY, '1')
      } catch {
        /* ignore */
      }
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    const safety = window.setTimeout(() => setBooting(false), 3200)
    return () => window.clearTimeout(safety)
  }, [booting])

  const finishBoot = useCallback(() => {
    setBooting(false)
    setJustBooted(true)
  }, [])

  // keyboard: 0–8 sections · i invert · j/k scroll · g+s projects
  useEffect(() => {
    const clearPending = () => {
      pendingG.current = false
      window.clearTimeout(gTimer.current)
    }
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (
        t &&
        (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable || t.tagName === 'CANVAS')
      ) {
        return
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'i' || e.key === 'I') {
        toggleTheme()
        return
      }
      if (pendingG.current && (e.key === 's' || e.key === 'S')) {
        clearPending()
        scrollToSection('projects')
        return
      }
      clearPending()
      if (e.key === 'g' || e.key === 'G') {
        pendingG.current = true
        gTimer.current = window.setTimeout(clearPending, 900)
        return
      }
      if (e.key === 'j' || e.key === 'ArrowDown') {
        window.scrollBy({ top: window.innerHeight * 0.82, behavior: 'smooth' })
        return
      }
      if (e.key === 'k' || e.key === 'ArrowUp') {
        window.scrollBy({ top: -window.innerHeight * 0.82, behavior: 'smooth' })
        return
      }
      const idx = Number(e.key)
      if (Number.isInteger(idx) && idx >= 0 && idx < SECTIONS.length) {
        scrollToSection(SECTIONS[idx].id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(gTimer.current)
    }
  }, [toggleTheme, scrollToSection])

  // current-section tracking (nav highlight + pill)
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => el !== null)
    if (typeof IntersectionObserver === 'undefined' || els.length === 0) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrentId(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-[color:var(--color-bg)]"
      >
        Skip to content
      </a>
      <ASCIIStarfield theme={theme} />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      {booting ? <BootSequence onDone={finishBoot} /> : null}

      {/* top navigation */}
      <header className="sticky top-0 z-40 border-b border-line bg-[color:var(--color-bg)]/85 backdrop-blur">
        <div className="mx-auto flex h-14 w-[min(1240px,calc(100vw-2.5rem))] items-center justify-between gap-4">
          <a href="#home" className="flex items-baseline gap-2">
            <span className="text-[15px] font-black tracking-tight">ABDELRAHMAN SHABAN</span>
            <span className="overline hidden sm:block">ML FLEET // v4</span>
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-1 pr-28 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="nav-link"
                aria-current={currentId === link.id ? 'true' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <span className="w-24 md:hidden" aria-hidden="true" />
        </div>
      </header>

      <main className={justBooted ? 'crt-power-on' : undefined}>
        <div className="mx-auto w-[min(1240px,calc(100vw-2.5rem))] pb-16">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certificates />
          <Experience />
          <Services />
          <Sim />
          <Contact />
        </div>
      </main>

      <SectionPill currentId={currentId} />
    </div>
  )
}