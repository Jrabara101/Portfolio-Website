import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { Arrow, Counter, EASE_OUT, Reveal, SectionHead, Stagger } from '../components/motion'
import { buildCategories, builds, challenges, stats, type Build, type BuildCategory } from '../data/site'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { Archive } from './Archive'
import { BuildModal } from './BuildModal'

export function Builds() {
  return (
    <section id="builds" className="pt-24 md:pt-36">
      <div className="container-x">
        <SectionHead
          index="04"
          label="Builds & practice"
          title="Shipped in public, every day."
          aside="Featured builds, the design challenges I take part in, and the full archive from my 100 Days of Code and Hands-On seasons — every one deployed live."
        />
        <Stagger className="grid grid-cols-2 border-t border-line md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-b border-line py-8 pr-4 md:border-b-0">
              <Counter to={s.value} className="font-display text-6xl tabular-nums md:text-8xl" />
              <p className="eyebrow mt-2">{s.label}</p>
            </div>
          ))}
        </Stagger>
      </div>

      <BuildRail />

      <div className="container-x">
        <Challenges />
        <Archive />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ Build rail */

function BuildRail() {
  const reduce = useReducedMotion()
  const wide = useMediaQuery('(min-width: 768px)')
  const pinned = wide && !reduce

  const [filter, setFilter] = useState<'all' | BuildCategory>('all')
  const [active, setActive] = useState<Build | null>(null)
  const items = filter === 'all' ? builds : builds.filter((b) => b.category === filter)

  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  // How far the track must travel so its last card lands flush with the right gutter.
  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track || !pinned) return
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [pinned, items.length])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={sectionRef} className="relative mt-24" style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}>
      <div className={pinned ? 'sticky top-0 flex h-svh flex-col justify-center overflow-hidden' : ''}>
        <div className="container-x mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-3">Featured builds</p>
            <h3 className="font-display text-4xl md:text-5xl">Things I’ve made</h3>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter builds">
            {buildCategories.map((c) => (
              <button
                key={c.value}
                type="button"
                aria-pressed={filter === c.value}
                onClick={() => setFilter(c.value)}
                className="relative rounded-full border border-line px-4 py-2 text-sm transition-colors aria-pressed:text-ink"
              >
                {filter === c.value && (
                  <motion.span layoutId="build-filter" className="absolute inset-0 rounded-full bg-paper" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                )}
                <span className="relative">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className={`flex gap-5 px-[clamp(1rem,4vw,3.5rem)] ${pinned ? 'w-max' : 'snap-x snap-mandatory overflow-x-auto pb-4'}`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((b, i) => (
              <motion.button
                key={b.title}
                layout
                layoutId={`build-${b.title}`}
                type="button"
                onClick={() => setActive(b)}
                data-cursor="Open"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="group relative flex w-[78vw] shrink-0 snap-start flex-col overflow-hidden rounded-[1.5rem] border border-line bg-ink-2 text-left sm:w-[46vw] md:w-[28vw] md:max-w-[420px]"
              >
                <div className="relative aspect-[4/3] overflow-hidden" style={{ background: b.imageBg ?? 'var(--color-ink-3)' }}>
                  {b.image ? (
                    <img
                      src={b.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain p-4 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgb(255_91_46/0.25),transparent_65%)] font-display text-8xl italic text-accent">
                      UI
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                    <span className="eyebrow">{buildCategories.find((c) => c.value === b.category)?.label}</span>
                  </div>
                  <h4 className="font-display text-3xl">{b.title}</h4>
                  <p className="text-sm leading-relaxed text-paper-2">{b.summary}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {pinned && (
          <div className="container-x mt-10 flex items-center gap-4">
            <span className="eyebrow">Scroll</span>
            <div className="h-px flex-1 bg-line">
              <motion.div className="h-px bg-accent" style={{ width: bar }} />
            </div>
            <span className="eyebrow tabular-nums">{String(items.length).padStart(2, '0')} builds</span>
          </div>
        )}
      </div>

      <AnimatePresence>{active && <BuildModal build={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------ Challenges */

function Challenges() {
  return (
    <div className="mt-24 grid gap-5 md:mt-32 md:grid-cols-2">
      {challenges.map((c, i) => (
        <Reveal key={c.title} delay={i * 0.08}>
          <a
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Visit"
            className="group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-[1.5rem] border border-line p-8 md:p-10"
          >
            <span
              aria-hidden
              className="absolute -right-24 -bottom-24 size-64 rounded-full bg-accent/0 blur-3xl transition-colors duration-700 group-hover:bg-accent/25"
            />
            <div className="relative">
              <p className="eyebrow mb-4">
                Design challenge · {c.meta}
              </p>
              <h4 className="font-display text-4xl md:text-5xl">{c.title}</h4>
              <p className="mt-5 max-w-lg leading-relaxed text-paper-2">{c.body}</p>
            </div>
            <div className="relative flex items-end justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-mute">
                    {t}
                  </span>
                ))}
              </div>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                <Arrow className="size-4 -rotate-45" />
              </span>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  )
}
