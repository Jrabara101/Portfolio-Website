import { AnimatePresence, motion } from 'motion/react'
import { useDeferredValue, useMemo, useState } from 'react'
import { EASE_OUT, Reveal } from '../components/motion'
import { ARCHIVE_CATEGORY, SERIES, archive, type ArchiveCategory } from '../data/archive'

const PAGE_SIZE = 24

type SeriesFilter = 'all' | '0' | '1'
type CategoryFilter = 'all' | ArchiveCategory

const seriesOptions: { value: SeriesFilter; label: string }[] = [
  { value: 'all', label: 'All seasons' },
  { value: '0', label: SERIES[0] },
  { value: '1', label: SERIES[1] },
]

const categoryOptions: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'All types' },
  ...(Object.keys(ARCHIVE_CATEGORY) as ArchiveCategory[]).map((k) => ({ value: k, label: `${ARCHIVE_CATEGORY[k]}s` })),
]

/** Searchable, filterable archive of all 157 practice builds, paged so we never mount them all at once. */
export function Archive() {
  const [series, setSeries] = useState<SeriesFilter>('all')
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [query, setQuery] = useState('')
  const [shown, setShown] = useState(PAGE_SIZE)
  const deferredQuery = useDeferredValue(query.trim().toLowerCase())

  const matches = useMemo(
    () =>
      archive.filter(
        ([title, , s, c]) =>
          (series === 'all' || String(s) === series) &&
          (category === 'all' || c === category) &&
          (!deferredQuery || title.toLowerCase().includes(deferredQuery)),
      ),
    [series, category, deferredQuery],
  )
  const visible = matches.slice(0, shown)

  const reset = () => setShown(PAGE_SIZE)

  return (
    <div id="archive" className="mt-24 rounded-[1.75rem] border border-line bg-ink-2/60 p-6 md:mt-32 md:p-12">
      <Reveal className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow mb-3">Build archive</p>
          <h3 className="font-display text-4xl md:text-5xl">Every build, live and clickable.</h3>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-paper-2">
            Every project from both practice seasons. Search by name or filter by season and type.
          </p>
        </div>
        <label className="relative block w-full lg:w-80">
          <span className="sr-only">Search builds</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              reset()
            }}
            placeholder="Search builds…"
            autoComplete="off"
            className="w-full border-b border-line bg-transparent py-3 pr-8 text-lg placeholder:text-mute focus:border-accent focus:outline-none"
          />
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute top-1/2 right-0 size-5 -translate-y-1/2 text-mute" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
        </label>
      </Reveal>

      <div className="mb-8 space-y-3">
        <Chips
          label="Filter by season"
          group="series"
          options={seriesOptions}
          value={series}
          onChange={(v) => {
            setSeries(v)
            reset()
          }}
        />
        <Chips
          label="Filter by type"
          group="category"
          options={categoryOptions}
          value={category}
          onChange={(v) => {
            setCategory(v)
            reset()
          }}
        />
      </div>

      <motion.ul layout className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map(([title, url, s, c]) => (
            <motion.li
              key={url + title}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between gap-4 rounded-2xl border border-line p-4 transition-colors duration-300 hover:border-accent/60 hover:bg-ink-3"
              >
                <span className="flex items-start justify-between gap-2">
                  <span className="leading-snug transition-colors group-hover:text-accent">{title}</span>
                  <span aria-hidden className="shrink-0 text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    ↗
                  </span>
                </span>
                <span className="flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[10px] tracking-wide text-accent uppercase">
                    {ARCHIVE_CATEGORY[c]}
                  </span>
                  <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] tracking-wide text-mute uppercase">
                    {SERIES[s]}
                  </span>
                </span>
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {matches.length === 0 && (
        <p className="py-12 text-center text-paper-2">No builds match that search yet — try a different keyword.</p>
      )}

      <div className="mt-10 flex flex-col items-center gap-4">
        {shown < matches.length && (
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE_SIZE)}
            className="rounded-full border border-line px-7 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            Show more
          </button>
        )}
        <p className="eyebrow">
          Showing {visible.length} of {matches.length} builds
        </p>
      </div>
    </div>
  )
}

function Chips<T extends string>({
  label,
  group,
  options,
  value,
  onChange,
}: {
  label: string
  group: string
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className="relative rounded-full border border-line px-4 py-1.5 text-xs transition-colors aria-pressed:text-ink"
        >
          {value === o.value && (
            <motion.span layoutId={`chip-${group}`} className="absolute inset-0 rounded-full bg-paper" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
          )}
          <span className="relative">{o.label}</span>
        </button>
      ))}
    </div>
  )
}
