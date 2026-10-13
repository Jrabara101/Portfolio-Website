import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Arrow, EASE_IN_OUT, EASE_OUT } from '../../components/motion'
import { DAILY_CATEGORIES, type DailyUi } from '../../data/dailyUi'
import { useLenis } from '../../hooks/useSmoothScroll'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const DEVICES = [
  { id: 'desktop', label: 'Desktop', width: '100%' },
  { id: 'tablet', label: 'Tablet', width: '834px' },
  { id: 'mobile', label: 'Mobile', width: '390px' },
] as const
type Device = (typeof DEVICES)[number]['id']

export const pad = (n: number) => String(n).padStart(3, '0')

/**
 * Full-screen live preview. Opens with a circular reveal from the card that was
 * clicked, swaps projects with a direction-aware slide, and lets you preview
 * the build at desktop, tablet, or phone width.
 */
export function Viewer({
  project,
  position,
  total,
  origin,
  direction,
  onClose,
  onStep,
}: {
  project: DailyUi
  position: number
  total: number
  origin: { x: number; y: number }
  direction: 1 | -1
  onClose: () => void
  onStep: (dir: 1 | -1) => void
}) {
  const lenis = useLenis()
  const wide = useMediaQuery('(min-width: 900px)')
  const [device, setDevice] = useState<Device>('desktop')
  const [loading, setLoading] = useState(true)
  const [slow, setSlow] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Lock the page underneath and wire the keyboard while the viewer is open.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      previouslyFocused?.focus()
    }
  }, [lenis])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onStep])

  // Reset the loader whenever the framed page changes; flag slow loads.
  useEffect(() => {
    setLoading(true)
    setSlow(false)
    const id = window.setTimeout(() => setSlow(true), 8000)
    return () => window.clearTimeout(id)
  }, [project.day, reloadKey])

  const frameWidth = wide ? DEVICES.find((d) => d.id === device)!.width : '100%'
  const circle = (r: string) => `circle(${r} at ${origin.x}px ${origin.y}px)`

  return (
    <motion.div
      className="fixed inset-0 z-[75] flex flex-col bg-ink"
      role="dialog"
      aria-modal="true"
      aria-labelledby="viewer-title"
      initial={{ clipPath: circle('0px') }}
      animate={{ clipPath: circle('150vmax') }}
      exit={{ clipPath: circle('0px'), transition: { duration: 0.6, ease: EASE_IN_OUT } }}
      transition={{ duration: 0.9, ease: EASE_IN_OUT }}
      data-lenis-prevent
    >
      {/* ------------------------------------------------------------ Bar */}
      <div className="container-x flex flex-wrap items-center justify-between gap-4 border-b border-line py-4">
        <div className="flex min-w-0 items-center gap-5">
          <div className="hidden font-mono text-xs text-mute tabular-nums sm:block">
            <span className="text-accent">{String(position + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
          </div>
          <div className="relative min-w-0 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.div
                key={project.day}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ y: d * 30, opacity: 0 }),
                  center: { y: 0, opacity: 1 },
                  exit: (d: number) => ({ y: d * -30, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <p className="eyebrow">
                  Day {pad(project.day)} · {DAILY_CATEGORIES[project.category]}
                </p>
                <h2 id="viewer-title" className="truncate font-display text-3xl leading-tight md:text-4xl">
                  {project.title}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {wide && (
            <div className="mr-2 flex rounded-full border border-line p-1" role="group" aria-label="Preview width">
              {DEVICES.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  aria-pressed={device === d.id}
                  onClick={() => setDevice(d.id)}
                  className="relative rounded-full px-3.5 py-1.5 text-xs transition-colors aria-pressed:text-ink"
                >
                  {device === d.id && (
                    <motion.span layoutId="device-pill" className="absolute inset-0 rounded-full bg-paper" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                  )}
                  <span className="relative">{d.label}</span>
                </button>
              ))}
            </div>
          )}
          <IconButton label="Previous build (←)" onClick={() => onStep(-1)}>
            <Arrow className="size-4 rotate-180" />
          </IconButton>
          <IconButton label="Next build (→)" onClick={() => onStep(1)}>
            <Arrow className="size-4" />
          </IconButton>
          <IconButton label="Reload preview" onClick={() => setReloadKey((k) => k + 1)}>
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v5h-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </IconButton>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group ml-1 hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm text-ink transition-colors hover:bg-paper sm:inline-flex"
          >
            Open live
            <Arrow className="size-4 transition-transform group-hover:-rotate-45" />
          </a>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="ml-1 flex size-10 items-center justify-center rounded-full border border-line text-lg transition-colors hover:border-accent hover:bg-accent hover:text-ink"
          >
            <span className="sr-only">Close preview (Esc)</span>
            <span aria-hidden>×</span>
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------- Stage */}
      <div className="relative flex flex-1 justify-center overflow-hidden bg-ink-2 p-0 md:p-6">
        <motion.div
          className="relative h-full overflow-hidden bg-ink-2 md:rounded-xl md:border md:border-line"
          animate={{ width: frameWidth }}
          transition={{ duration: 0.8, ease: EASE_IN_OUT }}
          style={{ maxWidth: '100%' }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.iframe
              key={`${project.day}-${reloadKey}`}
              src={project.link}
              title={`Day ${project.day} — ${project.title}`}
              onLoad={() => setLoading(false)}
              className="absolute inset-0 h-full w-full border-0 bg-white"
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: `${d * 12}%`, opacity: 0 }),
                center: { x: '0%', opacity: 1 },
                exit: (d: number) => ({ x: `${d * -12}%`, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: EASE_OUT }}
            />
          </AnimatePresence>

          <AnimatePresence>
            {loading && (
              <motion.div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-ink-2 px-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
              >
                <span className="font-display text-[clamp(4rem,12vw,9rem)] leading-none text-paper/10 tabular-nums">{pad(project.day)}</span>
                <div className="h-px w-48 overflow-hidden bg-line">
                  <motion.div
                    className="h-px w-1/3 bg-accent"
                    animate={{ x: ['-100%', '300%'] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
                <p className="eyebrow">Loading live build</p>
                {slow && (
                  <p className="max-w-xs text-sm text-paper-2">
                    Taking a while — this host may be waking up.{' '}
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                      Open it in a new tab
                    </a>
                    .
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --------------------------------------------------------- Footer */}
      <div className="container-x flex flex-wrap items-center justify-between gap-3 border-t border-line py-3">
        <ul className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-mute uppercase">
              {t}
            </li>
          ))}
        </ul>
        <p className="eyebrow hidden md:block">← → to browse · Esc to close</p>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-accent sm:hidden">
          Open live ↗
        </a>
      </div>
    </motion.div>
  )
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className="flex size-10 items-center justify-center rounded-full border border-line transition-colors hover:border-paper"
    >
      <span className="sr-only">{label}</span>
      {children}
    </button>
  )
}
