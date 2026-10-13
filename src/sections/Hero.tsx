import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useIntroDone } from '../App'
import { Arrow, EASE_IN_OUT, EASE_OUT, Magnetic } from '../components/motion'
import { useSectionLink } from '../components/Nav'
import { profile } from '../data/site'
import { useLocalTime } from '../hooks/useMediaQuery'

const lines: { text: string; accent?: string; rest?: string; indent?: string }[] = [
  { text: 'I design brands' },
  { text: '& build the ', accent: 'stores', indent: 'md:pl-[12vw]' },
  { text: 'they sell in.' },
]

export function Hero() {
  const ready = useIntroDone()
  const ref = useRef<HTMLElement>(null)
  const sectionLink = useSectionLink()
  const time = useLocalTime(profile.timeZone)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const headY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const show = ready ? 'show' : 'hidden'

  return (
    <section ref={ref} id="top" className="relative flex min-h-svh flex-col overflow-hidden pt-28 pb-10">
      {/* Ambient accent glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 right-[-20%] size-[70vw] rounded-full bg-accent/20 blur-[140px]"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={ready ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 2.4, ease: EASE_OUT }}
      />

      <div className="container-x relative flex flex-1 flex-col">
        {/* Meta row */}
        <motion.div
          className="grid grid-cols-2 gap-4 border-b border-line pb-5 md:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <span className="eyebrow">Portfolio ©{new Date().getFullYear()}</span>
          <span className="eyebrow hidden md:block">{profile.role}</span>
          <span className="eyebrow hidden md:block">{profile.location}</span>
          <span className="eyebrow text-right tabular-nums">{time && `${time} PHT`}</span>
        </motion.div>

        <div className="relative flex flex-1 flex-col justify-center py-12 md:py-6">
          {/* Portrait */}
          <motion.div
            className="relative mx-auto mb-10 aspect-[4/5] w-[62vw] max-w-[340px] md:absolute md:top-1/2 md:right-0 md:mb-0 md:w-[26vw] md:max-w-[400px] md:-translate-y-1/2"
            initial={{ clipPath: 'inset(100% 0% 0% 0% round 1.5rem)' }}
            animate={ready ? { clipPath: 'inset(0% 0% 0% 0% round 1.5rem)' } : undefined}
            transition={{ duration: 1.6, ease: EASE_IN_OUT, delay: 0.35 }}
          >
            <motion.img
              src={profile.portrait.src}
              alt={profile.name}
              width={profile.portrait.width}
              height={profile.portrait.height}
              fetchPriority="high"
              decoding="async"
              style={{ y: photoY, scale: photoScale }}
              className="h-full w-full object-cover grayscale-[35%] transition-[filter] duration-700 hover:grayscale-0"
              data-cursor="Hello"
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            style={{ y: headY, opacity: fade }}
            className="relative z-10 font-display text-mega tracking-[-0.035em]"
            aria-label="I design brands & build the stores they sell in."
            initial="hidden"
            animate={show}
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
          >
            {lines.map((line, i) => (
              <span key={i} aria-hidden className={`block overflow-hidden pb-[0.06em] ${line.indent ?? ''}`}>
                <motion.span
                  className="block will-change-transform"
                  variants={{
                    hidden: { y: '105%', rotate: 3 },
                    show: { y: '0%', rotate: 0, transition: { duration: 1.3, ease: EASE_OUT } },
                  }}
                >
                  {line.text}
                  {line.accent && (
                    <span className="relative inline-block italic text-accent">
                      {line.accent}
                      <svg viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-[0.04em] left-0 h-[0.12em] w-full overflow-visible">
                        <motion.path
                          d="M2 14 C 60 4, 140 4, 298 10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={ready ? { pathLength: 1 } : undefined}
                          transition={{ duration: 1.2, ease: EASE_IN_OUT, delay: 1.4 }}
                        />
                      </svg>
                    </span>
                  )}
                </motion.span>
              </span>
            ))}
          </motion.h1>
        </div>

        {/* Bottom row */}
        <motion.div
          className="grid items-end gap-8 md:grid-cols-12"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, ease: EASE_OUT, delay: 1.1 }}
        >
          <p className="max-w-md text-lg leading-relaxed text-paper-2 md:col-span-5">
            Most designers hand you a Figma file and wish you luck. I design your brand <em>and</em> your store — then
            build it myself, so nothing gets lost between the mockup and launch day.
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-4">
            <Magnetic>
              <a
                href="/#work"
                onClick={sectionLink('#work')}
                className="group inline-flex items-center gap-3 rounded-full bg-paper px-6 py-3.5 text-ink transition-colors hover:bg-accent"
              >
                See selected work
                <Arrow className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/#contact"
                onClick={sectionLink('#contact')}
                className="inline-flex items-center gap-3 rounded-full border border-line px-6 py-3.5 transition-colors hover:border-paper"
              >
                Start a project
              </a>
            </Magnetic>
          </div>
          <div className="hidden items-center justify-end gap-3 md:col-span-3 md:flex">
            <span className="eyebrow">Scroll</span>
            <span className="relative h-12 w-px overflow-hidden bg-line">
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-accent"
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
