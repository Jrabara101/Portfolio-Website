import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { Arrow, EASE_OUT } from '../components/motion'
import { buildCategories, type Build } from '../data/site'
import { useLenis } from '../hooks/useSmoothScroll'

export function BuildModal({ build, onClose }: { build: Build; onClose: () => void }) {
  const lenis = useLenis()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus()
    }
  }, [lenis, onClose])

  const category = buildCategories.find((c) => c.value === build.category)?.label

  return (
    <div className="fixed inset-0 z-[75] flex items-end justify-center p-3 md:items-center md:p-8" role="dialog" aria-modal="true" aria-labelledby="build-title">
      <motion.button
        type="button"
        aria-label="Close project"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-ink/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        layoutId={`build-${build.title}`}
        className="relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-[1.75rem] border border-line bg-ink-2"
        transition={{ type: 'spring', stiffness: 260, damping: 32 }}
        data-lenis-prevent
      >
        <div className="relative h-56 shrink-0 md:h-72" style={{ background: build.imageBg ?? 'var(--color-ink-3)' }}>
          {build.image ? (
            <img src={build.image} alt={build.title} className="h-full w-full object-contain p-6" />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center font-display text-8xl italic text-accent">UI</span>
          )}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-ink/80 text-xl backdrop-blur transition-colors hover:bg-accent hover:text-ink"
          >
            <span className="sr-only">Close</span>
            <span aria-hidden>×</span>
          </button>
        </div>

        <motion.div
          className="overflow-y-auto p-7 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.6, ease: EASE_OUT } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          <p className="eyebrow mb-3 text-accent!">{category}</p>
          <h3 id="build-title" className="font-display text-4xl md:text-5xl">
            {build.title}
          </h3>
          <p className="mt-5 leading-relaxed text-paper-2">{build.description}</p>

          <p className="eyebrow mt-8 mb-3">Tech stack &amp; tools</p>
          <div className="flex flex-wrap gap-2">
            {build.tech.map((t) => (
              <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-paper-2">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-end gap-3">
            {build.source && (
              <a
                href={build.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-paper"
              >
                View source
              </a>
            )}
            {build.internal ? (
              <Link
                to={build.live}
                className="group inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm text-ink transition-colors hover:bg-accent"
              >
                Explore playground
                <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <a
                href={build.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm text-ink transition-colors hover:bg-accent"
              >
                Live demo
                <Arrow className="size-4 transition-transform group-hover:-rotate-45" />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
