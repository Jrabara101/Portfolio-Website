import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Arrow, Marquee, Reveal, ScrollHighlight, SectionHead, Stagger } from '../components/motion'
import { profile, services, stack } from '../data/site'

export function ServiceBand() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-2.5, 1.5])

  return (
    <div ref={ref} className="relative overflow-hidden py-16 md:py-24">
      <motion.div style={{ rotate }} className="-mx-[5vw] border-y border-line bg-accent py-5 text-ink md:py-7">
        <Marquee duration={28}>
          {services.map((s) => (
            <span key={s.title} className="flex items-center font-display text-4xl md:text-6xl">
              <span className="px-8 italic">{s.title}</span>
              <span aria-hidden className="text-2xl">✦</span>
            </span>
          ))}
        </Marquee>
      </motion.div>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="container-x py-24 md:py-36">
      <SectionHead index="03" label="About" title="One person, brand to checkout." />

      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-8">
          <ScrollHighlight text={profile.intro} className="font-display text-3xl leading-[1.15] md:text-[3.1rem]" />
        </div>

        <dl className="self-end md:col-span-4">
          {profile.facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.06} className="flex justify-between gap-6 border-b border-line py-4">
              <dt className="eyebrow pt-1">{f.label}</dt>
              <dd className="text-right">
                {f.href ? (
                  <a href={f.href} className="link-underline hover:text-accent">
                    {f.value}
                  </a>
                ) : (
                  f.value
                )}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>

      {/* Stack */}
      <div className="mt-28">
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow mb-3">Tech stack</p>
            <p className="max-w-md text-paper-2">The tools I design for and build with — so what launches is what was designed.</p>
          </Reveal>
          <Reveal className="flex flex-wrap gap-3">
            <a
              href={profile.resume}
              download
              className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              Download résumé <Arrow className="size-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={profile.cv}
              download
              className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              Download CV <Arrow className="size-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-3 border-t border-l border-line sm:grid-cols-4 lg:grid-cols-6" stagger={0.04}>
          {stack.map((s) => (
            <div
              key={s.name}
              className="group relative flex aspect-square flex-col items-center justify-center gap-4 overflow-hidden border-r border-b border-line p-4"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink-2 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
              <img
                src={s.icon}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="relative size-10 object-contain grayscale transition duration-500 group-hover:scale-110 group-hover:grayscale-0 md:size-12"
              />
              <span className="relative text-center text-xs text-mute transition-colors group-hover:text-paper">{s.name}</span>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
