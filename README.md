# Abdelrahman Shaban — Portfolio · SPACESHIP VERSION 3

The professional editorial rebuild: **Roboto everywhere** (all retro dot-matrix fonts removed), a
**live procedural galaxy** hero, light/dark **night toggle at the top**, and the full section set a
recruiter expects — with the Bio-Dome game kept as the recreational deck.

## What defines v3

- **Typography**: Roboto + Roboto Mono only. No Doto, no VT323, no dot-matrix.
- **Style**: the "full 3" reference — warm cream day mode, dark editorial blocks, gold accent,
  rounded panels, overline labels, a galaxy hero screen (pure `<canvas>`, no image assets).
- **Night mode**: ☀/☾ icon chip fixed at the top of every scroll position (`i` key also toggles);
  day is default, night is deep-space editorial.
- **Hero (Home)**: name, one-line title (`Computer Science Professional & Data Analyst`),
  **View Projects** and **Download CV** call-to-action buttons, live galaxy, ASCII operator card,
  stats (6 deployed / 4 in transit / 36 repos), tech-strip marquee.
- **About Me**: 3-sentence bio + dossier card (location, degree, languages, approach).
- **Tech Stack**: scannable 4-group chip grid.
- **Projects**: 4 featured builds (real verified repos) + expandable 10-mission sortable
  departures-board manifest.
- **Certificates**: all 7 credentials with dates + issuers.
- **Experience**: visual timeline (flight log + education rail).
- **Services**: 4 freelance offerings (Predictive Modeling, Dashboard Creation,
  Workflow Automation, ML App Deployment).
- **Bio-Dome Sim**: the canvas ASCII game with points, score (+10/weight), seeded arena.
- **Contact**: working form (mailto-compose, backend-swappable), plus **TELEGRAM and WHATSAPP
  listed as separate channels**, email, phone, GitHub, LinkedIn, and Download CV.

## Removed vs v2

- Boot-sequence scroll-block is now 3.2 s hard cap and skippable (any key).
- Coupons/boarding-pass ticket section, neural-array exploded diagram, server-logs wall,
  halftone dividers, and all retro fonts are gone.

## Run

```bash
npm install        # or reuse ../shaban-spacelines/node_modules (symlinked)
npm run dev        # port 5173 (QA ran on 4175)
npm run build      # tsc -b && vite build → dist/
```

> If `npm install` hits `EROFS` on `~/.npm` (sandboxed machines): `npm install --cache ./.npm-cache`.

## Keyboard

`0–8` sections · `i` invert theme · `j/k` or arrows scroll · `g` then `s` projects ·
game-focused canvas captures `P`/`R`/WASD.

## Deploy

Vercel/Netlify: build `npm run build`, output `dist`. GitHub Pages: set `base` in
`vite.config.ts` to the repo subpath. `public/manifest.pdf` is the CV.

## Data sources

`src/data/profile.ts` (CV contract + v3 content model) and `src/data/github.ts`
(GitHub REST API verification — 36 public repos; featured projects link to
`Fraud-Detection`, `ML-AutoV3`, `House-Predict`, `rag-chat`; no invented metrics).
