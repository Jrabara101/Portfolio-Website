import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router'
import { Arrow, SectionHead } from '../components/motion'
import { caseStudies, type CaseStudy } from '../data/caseStudies'

/**
 * Selected work as a deck of sticky cards: each case study pins near the top
 * and gently scales back as the next one slides over it.
 */
export function Work() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section id="work" className="container-x pt-24 pb-12 md:pt-36">
      <SectionHead
        index="01"
        label="Selected work"
        title="Case studies, start to ship."
        aside="A brand built from a blank page, a platform running a real business, and three experiments at the edges of what I know."
      />

      <div ref={ref} className="relative">
        {caseStudies.map((study, i) => (
          <StackCard key={study.slug} study={study} index={i} total={caseStudies.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}

function StackCard({
  study,
  index,
  total,
  progress,
}: {
  study: CaseStudy
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const start = index / total
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index - 1) * 0.035])
  const dim = useTransform(progress, [start, Math.min(1, start + 2 / total)], [0, index === total - 1 ? 0 : 0.5])

  return (
    <div className="sticky mb-8 md:mb-12" style={{ top: `calc(5.5rem + ${index * 18}px)` }}>
      <motion.article style={{ scale }} className="relative origin-top overflow-hidden rounded-[1.75rem] border border-line bg-ink-2">
        <Link
          to={`/work/${study.slug}`}
          data-cursor="Read"
          className="group grid min-h-[70svh] md:min-h-[min(78svh,720px)] md:grid-cols-12"
        >
          <div className="flex flex-col justify-between gap-10 p-7 md:col-span-5 md:p-12">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-accent">0{index + 1}</span>
              <span className="eyebrow">{study.year}</span>
            </div>
            <div>
              <p className="eyebrow mb-5">{study.category}</p>
              <h3 className="font-display text-5xl leading-[0.95] tracking-[-0.02em] md:text-7xl">{study.name}</h3>
              <p className="mt-6 max-w-md leading-relaxed text-paper-2">{study.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {study.cardTags.map((t) => (
                  <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-paper-2">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <span className="inline-flex items-center gap-3 text-sm">
              <span className="flex size-11 items-center justify-center rounded-full border border-line transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                <Arrow className="size-4 transition-transform duration-500 group-hover:-rotate-45" />
              </span>
              Read case study
            </span>
          </div>

          <div className="relative m-3 min-h-[280px] overflow-hidden rounded-[1.25rem] md:col-span-7 md:m-4">
            {study.cover ? (
              <div className="absolute inset-0" style={{ background: study.cover.bg }}>
                <img
                  src={study.cover.src}
                  alt={study.cover.alt}
                  width={study.cover.width}
                  height={study.cover.height}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05] ${
                    study.cover.fit === 'contain' ? 'object-contain p-10' : 'object-cover'
                  }`}
                  style={{ objectPosition: study.cover.position }}
                />
              </div>
            ) : (
              <FlowArt />
            )}
          </div>
        </Link>
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" />
      </motion.article>
    </div>
  )
}

/** FLOW has no imagery, so it gets a typographic cover: the four pillars as a living grid. */
function FlowArt() {
  const pillars = [
    ['F', 'Finance'],
    ['L', 'Logistics'],
    ['O', 'Operations'],
    ['W', 'Workforce'],
  ]
  return (
    <div className="absolute inset-0 grid grid-cols-2 gap-px bg-line">
      {pillars.map(([letter, word], i) => (
        <div key={letter} className="relative flex flex-col justify-between overflow-hidden bg-ink-3 p-5 md:p-7">
          <span className="eyebrow">{word}</span>
          <span className="font-display text-[clamp(4rem,9vw,9rem)] leading-none text-paper transition-colors duration-700 group-hover:text-accent" style={{ transitionDelay: `${i * 80}ms` }}>
            {letter}
          </span>
          <motion.span
            aria-hidden
            className="absolute right-5 bottom-5 size-2 rounded-full bg-accent"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6 }}
          />
        </div>
      ))}
    </div>
  )
}
