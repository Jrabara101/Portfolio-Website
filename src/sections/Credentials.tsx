import { motion } from 'motion/react'
import { Arrow, Counter, EASE_OUT, Reveal, SectionHead } from '../components/motion'
import { credentials, learning, type Credential } from '../data/site'

const all = [...credentials.featured, ...credentials.more]
const certCount = all.reduce((n, c) => n + c.titles.length, 0)

/** Certificates grouped by issuer, with verifiable programs featured up top. */
export function Credentials() {
  return (
    <section id="credentials" className="container-x py-24 md:py-36">
      <SectionHead
        index="06"
        label="Credentials"
        title="Certified, and still learning."
        aside="Certificates from the programs I’ve finished, plus what I’m working through now. Verified ones link straight to the issuer."
      />

      <dl className="mb-14 grid grid-cols-3 border-y border-line md:mb-20">
        {[
          { value: certCount, label: 'Certificates' },
          { value: all.length, label: 'Issuers' },
          { value: 60, label: 'Webinars', suffix: '+' },
        ].map((s, i) => (
          <div key={s.label} className={`flex flex-col-reverse gap-1 py-6 md:py-8 ${i ? 'border-l border-line pl-4 md:pl-8' : ''}`}>
            <dt className="eyebrow">{s.label}</dt>
            <dd className="font-display text-5xl leading-none tabular-nums md:text-7xl">
              <Counter to={s.value} />
              {s.suffix && <span className="text-accent">{s.suffix}</span>}
            </dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-5 md:grid-cols-2">
        {credentials.featured.map((c, i) => (
          <FeaturedCard key={c.issuer} credential={c} delay={i * 0.1} />
        ))}
      </div>

      <ul className="mt-16 grid gap-x-12 md:mt-24 md:grid-cols-2">
        {credentials.more.map((c, i) => (
          <motion.li
            key={c.issuer}
            className="border-t border-line py-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: (i % 2) * 0.08 }}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl leading-tight md:text-3xl">{c.issuer}</h3>
              <span className="eyebrow shrink-0 tabular-nums">{c.year}</span>
            </div>
            {c.note && <p className="mt-1 text-sm text-mute">{c.note}</p>}
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.titles.map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-paper-2">
                  {t}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ul>

      <Reveal className="mt-16 rounded-[1.75rem] border border-line bg-ink-2 p-7 md:mt-24 md:p-10">
        <p className="eyebrow mb-6 flex items-center gap-3 text-accent!">
          <span className="pulse-dot size-2 rounded-full bg-accent" />
          Currently learning
        </p>
        <ul className="grid gap-6 md:grid-cols-2 md:gap-10">
          {learning.map((l) => (
            <li key={l.name}>
              <h3 className="font-display text-3xl">{l.name}</h3>
              <p className="mt-2 text-paper-2">{l.detail}</p>
              {l.href && (
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-3 inline-flex items-center gap-2 text-sm text-accent"
                >
                  {l.linkLabel}
                  <Arrow diagonal className="size-3.5" />
                </a>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-8 border-t border-line pt-6 text-sm text-mute">
          Plus 60+ webinars and seminars on cybersecurity, AI and data science, hosted by DICT, DOST, DTI and others.
        </p>
      </Reveal>
    </section>
  )
}

/** Large card for a verifiable program; a soft accent glow follows the pointer. */
function FeaturedCard({ credential: c, delay }: { credential: Credential; delay: number }) {
  return (
    <motion.article
      className="group relative flex flex-col md:min-h-80 overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 p-7 transition-colors hover:border-accent/60 md:p-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, ease: EASE_OUT, delay }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--gx', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--gy', `${e.clientY - r.top}px`)
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), rgb(255 91 46 / 0.12), transparent 60%)' }}
      />
      <div className="relative flex items-center justify-between gap-4">
        <p className="eyebrow text-accent!">{c.issuer}</p>
        {c.verify && (
          <span className="flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-wide text-paper-2 uppercase">
            <svg viewBox="0 0 16 16" className="size-3 text-accent" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M3 8.5 6.5 12 13 4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Verified
          </span>
        )}
      </div>
      <h3 className="relative mt-8 font-display text-4xl leading-[1.05] md:text-5xl">{c.titles[0]}</h3>
      {c.note && <p className="relative mt-3 text-paper-2">{c.note}</p>}
      <div className="relative mt-auto flex flex-wrap items-center justify-between gap-4 pt-10">
        <span className="eyebrow tabular-nums">{c.year}</span>
        {c.verify && (
          <a
            href={c.verify}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Verify"
            className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm text-ink transition-colors hover:bg-accent"
          >
            Verify certificate
            <Arrow diagonal className="size-4" />
          </a>
        )}
      </div>
    </motion.article>
  )
}
