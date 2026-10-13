import { AnimatePresence, motion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { Arrow, EASE_OUT, Magnetic, Reveal, SplitText } from '../components/motion'
import { profile } from '../data/site'

// Web3Forms delivers form posts straight to the inbox tied to this key.
// Set VITE_WEB3FORMS_KEY in Vercel (and .env.local for dev). Without it the form
// falls back to opening a pre-filled email, so a lead is never lost.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    const next: Errors = {}
    if (!name) next.name = 'Please enter your full name.'
    if (!EMAIL_PATTERN.test(email)) next.email = 'Please enter a valid email address.'
    if (!message) next.message = 'Please write a short message.'
    setErrors(next)
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus()
      return
    }

    if (!WEB3FORMS_KEY) {
      const body = `${message}\n\n— ${name} (${email})`
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Project enquiry from ' + name)}&body=${encodeURIComponent(body)}`
      return
    }

    setStatus('sending')
    data.append('access_key', WEB3FORMS_KEY)
    data.append('subject', 'New message from your portfolio site')
    data.append('from_name', 'Portfolio Contact Form')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'Submission rejected')
      form.reset()
      setStatus('sent')
    } catch (err) {
      console.error('Contact form submission failed:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute -bottom-1/2 left-1/2 size-[80vw] -translate-x-1/2 rounded-full bg-accent/15 blur-[160px]" />

      <div className="container-x relative">
        <div className="flex items-center gap-4">
          <span className="eyebrow text-accent!">(07)</span>
          <span className="eyebrow">Contact</span>
        </div>

        <SplitText
          as="h2"
          text="Let’s make something worth launching."
          className="mt-8 block max-w-[13ch] font-display text-mega tracking-[-0.035em]"
        />

        <div className="mt-20 grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-paper-2">
              Whether you're launching a brand, need a Shopify store, or want a designer-developer on your project team —
              my inbox is always open.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 font-medium text-ink transition-colors hover:bg-paper"
                >
                  {profile.email}
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={copyEmail}
                className="relative rounded-full border border-line px-5 py-4 text-sm transition-colors hover:border-paper"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? 'copied' : 'copy'}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    {copied ? 'Copied ✓' : 'Copy email'}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
            <dl className="mt-12 space-y-3 text-sm">
              <div className="flex gap-6">
                <dt className="eyebrow w-20 pt-0.5">Viber</dt>
                <dd>{profile.viber}</dd>
              </div>
              <div className="flex gap-6">
                <dt className="eyebrow w-20 pt-0.5">Based in</dt>
                <dd>{profile.location}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className="relative md:col-span-7" delay={0.1}>
            <form onSubmit={onSubmit} noValidate className="space-y-10" aria-describedby={status === 'error' ? 'form-error' : undefined}>
              {/* Honeypot: bots fill this, humans never see it. Web3Forms drops those silently. */}
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
              <Field name="name" label="Your name" placeholder="John Doe" error={errors.name} />
              <Field name="email" type="email" label="Email address" placeholder="name@example.com" error={errors.email} />
              <Field name="message" label="Tell me about the project" placeholder="Hi Johnrick, I'd like to collaborate on…" error={errors.message} multiline />

              <div className="flex flex-wrap items-center justify-between gap-6">
                <p className="max-w-xs text-xs text-mute">I usually reply within a day. No newsletters, no spam — just a reply.</p>
                <Magnetic>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group inline-flex size-36 flex-col items-center justify-center gap-2 rounded-full bg-paper text-ink transition-colors hover:bg-accent disabled:opacity-60 md:size-40"
                  >
                    <Arrow className="size-5 transition-transform duration-500 group-hover:-rotate-45" />
                    <span className="text-sm font-medium">{status === 'sending' ? 'Sending…' : 'Send message'}</span>
                  </button>
                </Magnetic>
              </div>

              {status === 'error' && (
                <p id="form-error" role="alert" className="text-sm text-accent">
                  Something went wrong sending that. Please email me directly at{' '}
                  <a href={`mailto:${profile.email}`} className="underline">
                    {profile.email}
                  </a>
                  .
                </p>
              )}
            </form>

            <AnimatePresence>
              {status === 'sent' && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-start justify-center rounded-[1.5rem] border border-line bg-ink-2 p-10"
                  initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0 round 1.5rem)' }}
                  animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0 round 1.5rem)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: EASE_OUT }}
                  role="status"
                >
                  <svg viewBox="0 0 52 52" className="mb-8 size-16 text-accent" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <motion.circle cx="26" cy="26" r="24" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.3 }} />
                    <motion.path d="M15 27l7 7 15-15" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.9 }} />
                  </svg>
                  <h3 className="font-display text-5xl">Message sent.</h3>
                  <p className="mt-4 text-paper-2">Thank you for reaching out. Johnrick will reply to your inbox shortly.</p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-8 rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({
  name,
  label,
  placeholder,
  error,
  type = 'text',
  multiline = false,
}: {
  name: string
  label: string
  placeholder: string
  error?: string
  type?: string
  multiline?: boolean
}) {
  const id = `field-${name}`
  const shared = {
    id,
    name,
    placeholder,
    required: true,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-error` : undefined,
    className:
      'peer w-full resize-none border-b bg-transparent py-3 text-xl placeholder:text-mute/60 focus:outline-none ' +
      (error ? 'border-accent' : 'border-line focus:border-paper'),
  }
  return (
    <div className="relative">
      <label htmlFor={id} className="eyebrow mb-2 block">
        {label}
      </label>
      {multiline ? <textarea rows={4} {...shared} /> : <input type={type} {...shared} />}
      <span aria-hidden className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[var(--ease-out-expo)] peer-focus:scale-x-100" />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-accent">
          {error}
        </p>
      )}
    </div>
  )
}
