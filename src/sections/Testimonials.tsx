import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { EASE_OUT, SectionHead } from '../components/motion'
import { testimonials } from '../data/site'

const INTERVAL = 7000

/** One quote at a time, set large, auto-advancing while visible. */
export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-20% 0px' })
  const reduce = useReducedMotion()
  const running = inView && !paused && !reduce
  const t = testimonials[index]

  useEffect(() => {
    if (!running) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % testimonials.length), INTERVAL)
    return () => window.clearTimeout(id)
  }, [index, running])

  return (
    <section id="kind-words" className="container-x py-24 md:py-36">
      <SectionHead index="07" label="Kind words" title="From the people I’ve worked with." />

      <div
        ref={ref}
        className="relative grid gap-10 md:grid-cols-12"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <span aria-hidden className="font-display text-[10rem] leading-[0.6] text-accent md:col-span-2 md:text-[14rem]">
          “
        </span>
        <div className="md:col-span-10" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
            >
              <blockquote className="font-display text-3xl leading-[1.18] md:text-5xl">{t.quote}</blockquote>
              <figcaption className="mt-10 flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-full border border-line font-mono text-sm text-accent">
                  {t.initials}
                </span>
                <span>
                  <span className="block">{t.role}</span>
                  <span className="eyebrow">{t.org}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-14 flex items-center gap-3">
            {testimonials.map((q, i) => (
              <button
                key={q.org}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show recommendation from ${q.org}`}
                aria-current={i === index}
                className="group relative h-8 flex-1 md:max-w-40"
              >
                <span className="absolute inset-x-0 top-1/2 h-px bg-line" />
                {i === index && (
                  <motion.span
                    key={`${index}-${running}`}
                    className="absolute top-1/2 left-0 h-px origin-left bg-accent"
                    initial={{ width: running ? '0%' : '100%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: running ? INTERVAL / 1000 : 0, ease: 'linear' }}
                  />
                )}
                <span className="eyebrow absolute top-full left-0 mt-1 hidden text-left group-hover:text-paper md:block">{q.org}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
