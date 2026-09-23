import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = 'http://127.0.0.1:4176/'
mkdirSync('_qa', { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.keyboard.press('a')
await page.waitForTimeout(700)
await page.screenshot({ path: '_qa/v4-00-hero.png' })

// night toggle green
await page.click('button[aria-pressed]')
await page.waitForTimeout(500)
await page.screenshot({ path: '_qa/v4-night-hero.png' })
const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'))
console.log('night theme:', theme)
await page.click('button[aria-pressed]') // back to day
await page.waitForTimeout(400)

// archive table
await page.keyboard.press('3')
await page.waitForTimeout(900)
await page.screenshot({ path: '_qa/v4-03-projects.png' })
const rows = await page.locator('table[aria-label="Verified project archive"] tbody tr').count()
console.log('archive rows:', rows)

// contact channels
await page.keyboard.press('8')
await page.waitForTimeout(800)
const channels = await page.locator('#contact ul a').allTextContents()
console.log('contact has LIVE DEMOS:', channels.some((c) => c.toUpperCase().includes('LIVE DEMOS')))
await page.screenshot({ path: '_qa/v4-08-contact.png' })

// certs count
const certs = await page.locator('#certificates article').count()
console.log('certificates:', certs)

console.log('errors:', errors.length ? errors : 'none')
await browser.close()
console.log('v4 QA done')