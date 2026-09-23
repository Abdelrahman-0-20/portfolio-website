/**
 * Procedural ASCII engine — deterministic, no external assets.
 * The portrait is generated from a character ramp over a mathematical
 * silhouette (bust + headset operator), exactly like dot-matrix reference art.
 */

/** mulberry32 — small deterministic PRNG so SSR/CSR render identical art */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Density ramp — dark→light ink */
export const RAMP = '@%#*+=-~:. '

export interface Grid {
  rows: string[]
  cols: number
  lineCount: number
}

/**
 * Operator portrait: a front-facing bust wearing a console headset,
 * rendered from a smooth density field sampled on a (cols × lines) grid.
 * Each output line is a row of the ramp; scanline rows thin out for CRT feel.
 */
export function generatePortrait(cols = 66, lines = 30, seed = 7): Grid {
  const rand = mulberry32(seed)
  // per-cell noise, generated once
  const noise: number[][] = []
  for (let y = 0; y < lines; y++) {
    noise[y] = []
    for (let x = 0; x < cols; x++) noise[y][x] = rand()
  }

  const rows: string[] = []
  for (let y = 0; y < lines; y++) {
    let row = ''
    const ny = y / lines
    for (let x = 0; x < cols; x++) {
      const nx = x / cols
      // coordinates in [-1,1]
      const px = nx * 2 - 1
      const py = ny * 2 - 1

      let d = 0
      // head ellipse (narrow, centered)
      const headDx = (px - 0.02) / 0.24
      const headDy = (py + 0.3) / 0.42
      const head = headDx * headDx + headDy * headDy
      if (head <= 1) d += 0.55 + 0.35 * (1 - head)
      // headset band: rim hugging the head, top half only
      if (head > 1 && head <= 1.3 && py < -0.08) d += 0.32
      // ear cups close to the head
      const cups = Math.max(Math.abs(Math.abs(px - 0.02) - 0.26) - 0.06, Math.abs((py + 0.14) - 0) - 0.12)
      if (cups <= 0 && py < 0.02) d += 0.3
      // mic boom from left cup toward mouth
      if (px < 0.02 && px > -0.24 && Math.abs(py + 0.06 + (px + 0.02) * 0.9) < 0.02) d += 0.22
      // neck
      if (Math.abs(px - 0.02) < 0.07 && py > 0.02 && py < 0.18) d += 0.5
      // shoulders / console chair back
      const shoulderTop = 0.12
      if (py > shoulderTop) {
        const spread = 0.28 + (py - shoulderTop) * 1.05
        const sd = Math.abs(px + 0.02) / spread
        if (sd <= 1) d += 0.42 + 0.3 * (1 - sd)
      }
      // collar line
      if (py > 0.14 && py < 0.18 && Math.abs(px + 0.02) < 0.16) d += 0.18

      // shading: light from upper-left
      const shade = 0.5 + 0.5 * Math.cos((nx - 0.2) * 2.4)
      d *= 0.55 + 0.55 * shade

      // scanline thinning + dithered edge
      const scan = y % 3 === 2 ? 0.62 : 1
      d *= scan
      if (d > 0.04) {
        const edge = d < 0.3 ? (rand() < d + 0.18 ? 1 : 0.45) : 1
        d *= edge
      }
      d += (rand() - 0.5) * 0.06

      const idx = Math.max(0, Math.min(RAMP.length - 1, Math.floor(d * RAMP.length)))
      row += d <= 0.035 ? ' ' : RAMP[idx]
    }
    rows.push(row.replace(/\s+$/g, ''))
  }
  return { rows, cols, lineCount: lines }
}

/** Small pre-rendered ship, used by the Bio-Dome sim (hand-drawn ASCII) */
export const SHIP_ASCII: string[] = [
  '   ▄▟▙▄   ',
  ' ▗▟█████▙▖ ',
  '▟██▤断▄██▙',
  '  ▜▙▄▄▟▛  ',
  '    ▀▀▀   ',
]

/** Terminal boot log — plays in the pre-flight overlay */
export function bootLines(deployed: number, inTransit: number): string[] {
  return [
    '> BOOT: MLV ABDELRAHMAN ......... OK',
    '> REGISTRY: DSP-77 // WEEGPL ML FLEET .... OK',
    '> LOADING MODEL WEIGHTS ......... OK',
    '> MOUNTING: PANDAS · SCIKIT-LEARN · RESNET .... OK',
    `> FLEET STATUS: ${deployed} DEPLOYED / ${inTransit} IN TRANSIT`,
    '> CRT PHOSPHOR: WARM. BOARDING OPEN.',
    '> USE YOUR KEYBOARD TO NAVIGATE — PRESS ANY KEY',
  ]
}