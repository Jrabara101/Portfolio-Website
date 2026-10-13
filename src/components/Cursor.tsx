import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

/**
 * Two-part cursor: a precise dot plus a lagging ring. Any element with a
 * `data-cursor="Label"` attribute grows the ring and shows the label inside it;
 * links and buttons get a smaller hover state. Fine pointers only.
 */
export function Cursor() {
  const enabled = useMediaQuery('(pointer: fine) and (prefers-reduced-motion: no-preference)')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 })
  const [label, setLabel] = useState<string | null>(null)
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-cursor')

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)
    }
    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      const labelled = target?.closest<HTMLElement>('[data-cursor]')
      setLabel(labelled?.dataset.cursor ?? null)
      setHovering(!!target?.closest('a, button, [role="button"], input, textarea, label'))
    }
    const leave = () => setHidden(true)

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const size = label ? 96 : hovering ? 56 : 32

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80]" style={{ opacity: hidden ? 0 : 1 }}>
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          backgroundColor: label ? 'rgb(255 91 46 / 1)' : 'rgb(255 91 46 / 0)',
          borderColor: label ? 'rgb(255 91 46 / 0)' : hovering ? 'rgb(255 91 46 / 0.9)' : 'rgb(237 234 227 / 0.45)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        <div className="absolute inset-0 rounded-full border" style={{ borderColor: 'inherit' }} />
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              className="font-mono text-[11px] tracking-[0.14em] text-ink uppercase"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 size-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: label ? 0 : 1 }}
      />
    </div>
  )
}
