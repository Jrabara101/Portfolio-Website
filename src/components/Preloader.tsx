import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { useEffect } from 'react'
import { EASE_IN_OUT, EASE_OUT } from './motion'

const SESSION_KEY = 'jr-intro-seen'

/** Whether the intro should play: once per browser session, never for reduced motion. */
export function shouldPlayIntro() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return sessionStorage.getItem(SESSION_KEY) !== '1'
  } catch {
    return true
  }
}

/** Counter-to-100 intro; the panel lifts away and calls onDone. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, '0'))
  const width = useTransform(count, [0, 100], ['0%', '100%'])

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* storage blocked — the intro just replays next time */
    }
    const controls = animate(count, 100, { duration: reduce ? 0 : 1.8, ease: [0.65, 0, 0.35, 1] })
    controls.then(() => window.setTimeout(onDone, 150))
    return () => controls.stop()
  }, [count, onDone, reduce])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink px-[clamp(1rem,4vw,3.5rem)] py-8"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 1, ease: EASE_IN_OUT } }}
    >
      <div className="flex items-center justify-between">
        <span className="eyebrow">Portfolio — {new Date().getFullYear()}</span>
        <span className="eyebrow">Loading</span>
      </div>

      <div className="overflow-hidden">
        <motion.p
          className="font-display text-mega italic"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.1 }}
        >
          Johnrick Rabara
        </motion.p>
      </div>

      <div>
        <div className="mb-4 flex items-end justify-between">
          <span className="eyebrow max-w-[22ch]">Brand identity · Shopify stores · Landing pages</span>
          <motion.span className="font-mono text-5xl tabular-nums text-accent md:text-7xl">{rounded}</motion.span>
        </div>
        <div className="h-px w-full bg-line">
          <motion.div className="h-px bg-accent" style={{ width }} />
        </div>
      </div>
    </motion.div>
  )
}
