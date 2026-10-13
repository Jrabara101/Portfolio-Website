import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { Footer } from '../components/Footer'
import { Arrow, Counter, EASE_OUT, Magnetic, Reveal, SplitText } from '../components/motion'
import { DAILY_CATEGORIES, dailyUi, type DailyCategory, type DailyUi } from '../data/dailyUi'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useScrollTo } from '../hooks/useSmoothScroll'
import { CategoryArt } from '../sections/playground/CategoryArt'
import { pad, Viewer } from '../sections/playground/Viewer'

type CategoryFilter = 'all' | DailyCategory
type Sort = 'newest' | 'oldest'
type View = 'grid' | 'index'

// Categories in the order they're shown, each with its live count.
const categoryCounts = (Object.keys(DAILY_CATEGORIES) as DailyCategory[])
  .map((c) => ({ value: c, label: DAILY_CATEGORIES[c], count: dailyUi.filter((p) => p.category === c).length }))
  .filter((c) => c.count > 0)
  .sort((a, b) => b.count - a.count)

const latestDay = Math.max(...dailyUi.map((p) => p.day))

export function Playground() {
  useDocumentTitle(
    'Daily UI Playground — Johnrick Rabara',
    `${dailyUi.length} daily interface challenges — forms, checkouts, dashboards and more — each one live and explorable.`,
  )
  const [params, setParams] = useSearchParams()
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<Sort>('newest')
  const [view, setView] = useState<View>('grid')
  const deferredQuery = useDeferredValue(query.trim().toLowerCase())
  const searchRef = useRef<HTMLInputElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  // The floating dock takes over once the real toolbar has scrolled up and out of view.
  const [pastTools, setPastTools] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', () => {
    const el = toolbarRef.current
    if (el) setPastTools(el.getBoundingClientRect().bottom < 0)
  })
  const scrollTo = useScrollTo()

  const filtered = useMemo(() => {
    const q = deferredQuery
    const list = dailyUi.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        (!q ||
          p.title.toLowerCase().includes(q) ||
          `day ${p.day}`.includes(q) ||
          String(p.day) === q ||
          p.tech.some((t) => t.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))),
    )
    return sort === 'newest' ? [...list].sort((a, b) => b.day - a.day) : [...list].sort((a, b) => a.day - b.day)
  }, [category, deferredQuery, sort])

  /* ---------------------------------------------------------- Viewer state */
  // The open build lives in the URL (?day=42) so a preview can be shared or bookmarked.
  const openDay = Number(params.get('day')) || null
  const openProject = openDay ? dailyUi.find((p) => p.day === openDay) : undefined
  // Browse within the current filter; fall back to the full list for deep links outside it.
  const browseList = openProject && filtered.some((p) => p.day === openProject.day) ? filtered : dailyUi
  const position = openProject ? browseList.findIndex((p) => p.day === openProject.day) : -1
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const [direction, setDirection] = useState<1 | -1>(1)

  const open = useCallback(
    (p: DailyUi, from?: { x: number; y: number }) => {
      setOrigin(from ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 })
      setDirection(1)
      setParams((prev) => {
        const next = new URLSearchParams(prev)
        next.set('day', String(p.day))
        return next
      })
    },
    [setParams],
  )
  const close = useCallback(
    () =>
      setParams((prev) => {
        const next = new URLSearchParams(prev)
        next.delete('day')
        return next
      }),
    [setParams],
  )
  const step = useCallback(
    (dir: 1 | -1) => {
      if (position < 0) return
      const next = browseList[(position + dir + browseList.length) % browseList.length]
      setDirection(dir)
      setParams(
        (prev) => {
          const sp = new URLSearchParams(prev)
          sp.set('day', String(next.day))
          return sp
        },
        { replace: true },
      )
    },
    [browseList, position, setParams],
  )
  const surprise = (e: React.MouseEvent) => {
    const pick = dailyUi[Math.floor(Math.random() * dailyUi.length)]
    open(pick, { x: e.clientX, y: e.clientY })
  }

  // "/" jumps to search, like most dev tools.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest('input, textarea, [contenteditable]')
      if (e.key === '/' && !typing && !openProject) {
        e.preventDefault()
        scrollTo('#playground-tools')
        window.setTimeout(() => searchRef.current?.focus(), 400)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openProject, scrollTo])

  const pickCategory = (c: CategoryFilter) => {
    setCategory(c)
    if (pastTools) scrollTo('#playground-tools')
  }

  return (
    <>
      <main id="main" className="pt-32 md:pt-40">
        {/* ---------------------------------------------------------- Hero */}
        <header className="container-x">
          <motion.div
            className="mb-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.4 }}
          >
            <Link to="/#builds" className="group inline-flex items-center gap-2 text-sm text-paper-2 hover:text-paper">
              <Arrow className="size-4 rotate-180 transition-transform group-hover:-translate-x-1" />
              Portfolio
            </Link>
            <span className="h-px w-8 bg-line" />
            <span className="eyebrow">Daily UI · {dailyUi.length} live builds</span>
          </motion.div>

          <h1 className="font-display text-mega tracking-[-0.035em]" aria-label="Daily UI Playground">
            <SplitText text="Daily UI" trigger="mount" delay={0.45} className="block" />
            <span className="block md:pl-[14vw]">
              <SplitText text="Playground" trigger="mount" delay={0.6} wordClassName="italic text-accent" />
            </span>
          </h1>

          <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-end">
            <motion.p
              className="max-w-xl text-xl leading-relaxed text-paper-2 md:col-span-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE_OUT, delay: 0.9 }}
            >
              One interface a day — sign-up forms, checkouts, dashboards, players and odd little experiments. Every one is
              deployed; open any of them right here, at any screen size.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-3 md:col-span-6 md:justify-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE_OUT, delay: 1 }}
            >
              <Magnetic>
                <button
                  type="button"
                  onClick={surprise}
                  data-cursor="Roll"
                  className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-ink transition-colors hover:bg-paper"
                >
                  <Dice />
                  Surprise me
                </button>
              </Magnetic>
              <Magnetic>
                <a
                  href="#playground-tools"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo('#playground-tools')
                  }}
                  className="inline-flex items-center gap-3 rounded-full border border-line px-6 py-3.5 transition-colors hover:border-paper"
                >
                  Browse all <Arrow className="size-4 rotate-90" />
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <motion.dl
            className="mt-16 grid grid-cols-2 border-t border-line md:grid-cols-4"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1.1 } } }}
          >
            {[
              { value: dailyUi.length, label: 'Live builds' },
              { value: latestDay, label: 'Latest day' },
              { value: categoryCounts.length, label: 'Categories' },
              { value: dailyUi.filter((p) => p.category === 'utilities').length, label: 'Utility widgets' },
            ].map((s) => (
              <motion.div
                key={s.label}
                className="flex flex-col-reverse border-b border-line py-7 pr-4 md:border-b-0"
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } } }}
              >
                <dt className="eyebrow mt-1">{s.label}</dt>
                <dd>
                  <Counter to={s.value} className="font-display text-6xl tabular-nums md:text-7xl" />
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </header>

        {/* ------------------------------------------------------- Toolbar */}
        <section id="playground-tools" className="container-x scroll-mt-24 pt-20 md:pt-28">
          <div ref={toolbarRef} className="flex flex-col gap-6 border-b border-line pb-6">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <label className="relative block w-full lg:max-w-md">
                <span className="sr-only">Search builds</span>
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search title, day, tag or tech…"
                  autoComplete="off"
                  className="w-full border-b border-line bg-transparent py-3 pr-12 font-display text-2xl placeholder:text-mute/60 focus:border-accent focus:outline-none sm:text-3xl md:text-4xl"
                />
                <kbd className="absolute top-1/2 right-0 -translate-y-1/2 rounded-md border border-line px-2 py-0.5 font-mono text-xs text-mute">/</kbd>
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <Segmented
                  label="Sort"
                  value={sort}
                  onChange={setSort}
                  options={[
                    { value: 'newest', label: 'Newest' },
                    { value: 'oldest', label: 'Oldest' },
                  ]}
                />
                <Segmented
                  label="View"
                  value={view}
                  onChange={setView}
                  options={[
                    { value: 'grid', label: 'Grid' },
                    { value: 'index', label: 'Index' },
                  ]}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {[{ value: 'all' as const, label: 'All', count: dailyUi.length }, ...categoryCounts].map((c) => (
                <button
                  key={c.value}
                  type="button"
                  aria-pressed={category === c.value}
                  onClick={() => pickCategory(c.value)}
                  className="group relative rounded-full border border-line px-4 py-2 text-sm transition-colors aria-pressed:text-ink"
                >
                  {category === c.value && (
                    <motion.span layoutId="daily-cat" className="absolute inset-0 rounded-full bg-paper" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                  )}
                  <span className="relative">
                    {c.label}
                    <sup className="ml-1 font-mono text-[10px] text-accent">{c.count}</sup>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <p className="eyebrow mt-6" aria-live="polite">
            {filtered.length === dailyUi.length ? `Showing all ${filtered.length} builds` : `${filtered.length} of ${dailyUi.length} builds`}
          </p>

          {/* --------------------------------------------------- Results */}
          <div className="mt-8 pb-12">
            {filtered.length === 0 ? (
              <EmptyState
                onReset={() => {
                  setQuery('')
                  setCategory('all')
                }}
              />
            ) : view === 'grid' ? (
              <motion.ul layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence mode="popLayout" initial={false}>
                  {filtered.map((p, i) => (
                    <GridCard key={p.day} project={p} index={i} onOpen={open} />
                  ))}
                </AnimatePresence>
              </motion.ul>
            ) : (
              <IndexList items={filtered} onOpen={open} />
            )}
          </div>
        </section>

        {/* -------------------------------------------------------- Outro */}
        <section className="container-x pt-16 pb-28">
          <Reveal className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 px-7 py-16 md:px-16 md:py-20">
            <div aria-hidden className="absolute -top-1/2 -right-1/4 size-[60vw] rounded-full bg-accent/15 blur-[120px]" />
            <div className="relative grid gap-10 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <p className="eyebrow mb-4">The source file</p>
                <h2 className="font-display text-display">Every one of these started in Figma.</h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper-2">
                  Wireframes, component states, type and colour explorations — the working file behind the daily studies.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
                <Magnetic>
                  <a
                    href="https://www.figma.com/design/NmiYpQsP2vUiYk0EDp2KXt/UI-Challenges?node-id=0-1&p=f&t=Rk6RcQTEx48VPejJ-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-paper px-6 py-4 text-ink transition-colors hover:bg-accent"
                  >
                    Open the Figma file <Arrow className="size-4 -rotate-45" />
                  </a>
                </Magnetic>
                <Link to="/#contact" className="inline-flex items-center rounded-full border border-line px-6 py-4 transition-colors hover:border-paper">
                  Work with me
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />

      <Dock
        visible={pastTools && !openProject}
        query={query}
        onQuery={setQuery}
        count={filtered.length}
        category={category === 'all' ? 'All' : DAILY_CATEGORIES[category]}
        onTools={() => scrollTo('#playground-tools')}
      />

      <AnimatePresence>
        {openProject && (
          <Viewer
            key="viewer"
            project={openProject}
            position={position}
            total={browseList.length}
            origin={origin}
            direction={direction}
            onClose={close}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </>
  )
}

/* ---------------------------------------------------------------- Grid card */

function GridCard({ project, index, onOpen }: { project: DailyUi; index: number; onOpen: (p: DailyUi, from: { x: number; y: number }) => void }) {
  const reduce = useReducedMotion()
  const fine = useMediaQuery('(pointer: fine)')
  const rx = useSpring(useMotionValue(0), { stiffness: 250, damping: 22 })
  const ry = useSpring(useMotionValue(0), { stiffness: 250, damping: 22 })
  const tilt = fine && !reduce

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE_OUT, delay: Math.min(index, 12) * 0.03 } }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      style={{ perspective: 900 }}
    >
      <motion.button
        type="button"
        onClick={(e) => onOpen(project, { x: e.clientX, y: e.clientY })}
        onPointerMove={(e) => {
          if (!tilt) return
          const r = e.currentTarget.getBoundingClientRect()
          ry.set(((e.clientX - r.left) / r.width - 0.5) * 10)
          rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10)
        }}
        onPointerLeave={() => {
          rx.set(0)
          ry.set(0)
        }}
        style={tilt ? { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' } : undefined}
        data-cursor="Preview"
        className="art-card group flex h-full w-full flex-col overflow-hidden rounded-[1.25rem] border border-line bg-ink-2 text-left transition-colors duration-500 hover:border-accent/50"
      >
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-ink-3">
          <span
            aria-hidden
            className="absolute -right-3 -bottom-8 font-display text-[9rem] leading-none text-paper/[0.05] tabular-nums transition-[color,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-x-2 group-hover:text-accent/15"
          >
            {pad(project.day)}
          </span>
          <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgb(255_91_46/0.22),transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <CategoryArt
            category={project.category}
            className="relative size-28 text-paper/35 transition-[color,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:text-accent"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-accent">Day {pad(project.day)}</span>
            <span className="eyebrow">{DAILY_CATEGORIES[project.category]}</span>
          </div>
          <h3 className="font-display text-2xl leading-tight">{project.title}</h3>
          <div className="mt-auto flex items-center justify-between border-t border-line pt-3 text-xs text-mute">
            <span className="truncate pr-2">{project.tags.join(' · ')}</span>
            <span aria-hidden className="text-accent transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </div>
        </div>
      </motion.button>
    </motion.li>
  )
}

/* --------------------------------------------------------------- Index list */

function IndexList({ items, onOpen }: { items: DailyUi[]; onOpen: (p: DailyUi, from: { x: number; y: number }) => void }) {
  return (
    <ol className="border-t border-line">
      <AnimatePresence initial={false}>
        {items.map((p, i) => (
          <motion.li
            key={p.day}
            layout
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT, delay: Math.min(i, 15) * 0.02 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="border-b border-line"
          >
            <button
              type="button"
              onClick={(e) => onOpen(p, { x: e.clientX, y: e.clientY })}
              data-cursor="Preview"
              className="art-card group relative grid w-full grid-cols-[4.5rem_1fr_auto] items-center gap-4 overflow-hidden px-2 py-5 text-left md:grid-cols-12 md:px-4"
            >
              <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
              <span className="relative font-mono text-sm text-accent transition-colors group-hover:text-ink md:col-span-1">{pad(p.day)}</span>
              <span className="relative font-display text-2xl leading-tight transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:text-ink md:col-span-5 md:text-3xl">
                {p.title}
              </span>
              <span className="relative hidden text-sm text-mute transition-colors group-hover:text-ink/70 md:col-span-2 md:block">{DAILY_CATEGORIES[p.category]}</span>
              <span className="relative hidden truncate font-mono text-xs text-mute transition-colors group-hover:text-ink/70 md:col-span-3 md:block">{p.tech.join(' · ')}</span>
              <span className="relative flex justify-end md:col-span-1">
                <CategoryArt category={p.category} className="size-8 text-paper/40 transition-colors group-hover:text-ink" />
              </span>
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ol>
  )
}

/* ------------------------------------------------------------------- Bits */

function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
}) {
  return (
    <div className="flex rounded-full border border-line p-1" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className="relative rounded-full px-4 py-1.5 text-sm transition-colors aria-pressed:text-ink"
        >
          {value === o.value && (
            <motion.span layoutId={`seg-${label}`} className="absolute inset-0 rounded-full bg-paper" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
          )}
          <span className="relative">{o.label}</span>
        </button>
      ))}
    </div>
  )
}

/** Floating search dock that appears once the main toolbar has scrolled away. */
function Dock({
  visible,
  query,
  onQuery,
  count,
  category,
  onTools,
}: {
  visible: boolean
  query: string
  onQuery: (q: string) => void
  count: number
  category: string
  onTools: () => void
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-4"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        >
          <div className="flex w-full max-w-xl items-center gap-2 rounded-full border border-line bg-ink-2/85 p-1.5 pl-5 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl">
            <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-mute" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <label className="min-w-0 flex-1">
              <span className="sr-only">Search builds</span>
              <input
                type="search"
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                placeholder="Search builds…"
                className="w-full bg-transparent py-2 text-sm placeholder:text-mute focus:outline-none"
              />
            </label>
            <span className="hidden font-mono text-xs text-mute tabular-nums sm:inline">{count}</span>
            <button
              type="button"
              onClick={onTools}
              className="shrink-0 rounded-full bg-paper px-4 py-2 text-sm text-ink transition-colors hover:bg-accent"
            >
              {category} <span aria-hidden>↑</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-6 py-24 text-center">
      <span className="font-display text-8xl text-paper/10 italic">404</span>
      <p className="max-w-sm text-lg text-paper-2">No build matches that search — fittingly, Day 8 is a 404 page.</p>
      <button type="button" onClick={onReset} className="rounded-full border border-line px-6 py-3 text-sm transition-colors hover:border-accent hover:text-accent">
        Clear filters
      </button>
    </motion.div>
  )
}

function Dice() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <circle cx="8.5" cy="8.5" r="1.1" fill="currentColor" />
      <circle cx="15.5" cy="15.5" r="1.1" fill="currentColor" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" />
    </svg>
  )
}
