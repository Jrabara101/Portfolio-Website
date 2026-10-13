import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_IN_OUT } from './motion'

/**
 * Wraps each route. On exit an ink panel with an accent edge sweeps up over the
 * page; the next page then unveils from under it. The very first page load is
 * handled by the preloader instead, so it skips the curtain.
 */
export function PageTransition({ children, label, animateIn }: { children: ReactNode; label: string; animateIn: boolean }) {
  return (
    <>
      {children}
      {/* Exit curtain — covers the outgoing page. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] origin-bottom bg-ink-2"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.7, ease: EASE_IN_OUT }}
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-accent" />
      </motion.div>
      {/* Enter curtain — lifts off the incoming page. */}
      {animateIn && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[70] flex origin-top items-center justify-center bg-ink-2"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: EASE_IN_OUT, delay: 0.15 }}
        >
          <motion.span
            className="font-display text-5xl italic md:text-7xl"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {label}
          </motion.span>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-accent" />
        </motion.div>
      )}
    </>
  )
}
