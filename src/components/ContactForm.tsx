import { useState } from 'react'
import type { FormEvent } from 'react'

const EMAIL = 'egydarknight10@gmail.com'

/**
 * Static-site contact form: composes a mailto: draft with the visitor's
 * message (no backend required). Swap `buildHref` for Formspree/Netlify
 * Forms when a backend is available.
 */
export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const buildHref = (): string => {
    const subject = encodeURIComponent(`Portfolio contact — ${name || 'visitor'}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
    return `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    window.location.href = buildHref()
    setSent(true)
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" aria-label="Contact form">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="overline">Your name</span>
          <input
            className="field"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            autoComplete="name"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="overline">Your email</span>
          <input
            className="field"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
            autoComplete="email"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="overline">Message</span>
        <textarea
          className="field min-h-32 resize-y"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your data problem — prediction, dashboard, automation…"
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-solid">
          Send transmission ↗
        </button>
        <p className="muted text-xs" role="status">
          {sent
            ? 'Your mail app should open with the message prefilled — just hit send.'
            : 'Opens your mail app with everything prefilled.'}
        </p>
      </div>
    </form>
  )
}