import { motion } from 'motion/react'
import { Link } from 'react-router'
import { profile, socials } from '../data/site'
import { useLocalTime } from '../hooks/useMediaQuery'
import { useScrollTo } from '../hooks/useSmoothScroll'
import { Arrow, EASE_OUT, Magnetic } from './motion'

export function Footer() {
  const time = useLocalTime(profile.timeZone)
  const scrollTo = useScrollTo()
  const letters = 'Rabara'.split('')

  return (
    <footer className="relative overflow-hidden border-t border-line pt-20">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow mb-4">Get in touch</p>
          <a href={`mailto:${profile.email}`} className="link-underline text-2xl font-light tracking-tight md:text-3xl">
            {profile.email}
          </a>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4">Elsewhere</p>
          <ul className="space-y-1.5">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline text-paper-2 hover:text-paper">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-4">Local time</p>
          <p className="text-paper-2 tabular-nums">{time} · PHT</p>
          <p className="eyebrow mt-8 mb-4">More</p>
          <Link to="/playground" className="link-underline text-paper-2 hover:text-paper">
            Daily UI Playground
          </Link>
        </div>
        <div className="flex md:col-span-2 md:justify-end">
          <Magnetic>
            <button
              type="button"
              onClick={() => scrollTo(0)}
              className="flex size-20 flex-col items-center justify-center gap-1 rounded-full border border-line text-xs transition-colors hover:border-accent hover:bg-accent hover:text-ink"
            >
              <Arrow className="size-4 -rotate-90" />
              Top
            </button>
          </Magnetic>
        </div>
      </div>

      <div className="container-x mt-16 flex flex-col justify-between gap-2 text-xs text-mute sm:flex-row">
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        <span>Designed &amp; built by hand — React, Vite, Motion.</span>
      </div>

      <div aria-hidden className="mt-6 flex justify-center overflow-hidden leading-[0.78]">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            className="font-display text-[27vw] tracking-[-0.04em] text-paper/[0.06]"
            initial={{ y: '60%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE_OUT, delay: i * 0.05 }}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </footer>
  )
}
