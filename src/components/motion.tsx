import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { Children, useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

export const EASE_OUT = [0.16, 1, 0.3, 1] as const
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const

/* ---------------------------------------------------------------- Reveal */

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'p' | 'span'
}) {
  const Tag = motion[as] as typeof motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, ease: EASE_OUT, delay }}
    >
      {children}
    </Tag>
  )
}

/** Staggers direct children in as a group. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

/* ------------------------------------------------------------- SplitText */

/**
 * Masked word-by-word reveal: each word rises out of its own clipping box.
 * Accessible name is the full string; the animated spans are aria-hidden.
 */
export function SplitText({
  text,
  as: Tag = 'span',
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  trigger = 'view',
}: {
  text: string
  as?: ElementType
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
  trigger?: 'view' | 'mount'
}) {
  const words = text.split(' ')
  const animateProps =
    trigger === 'mount'
      ? { animate: 'show' }
      : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -8% 0px' } }

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden
        className="inline"
        initial="hidden"
        {...animateProps}
        variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
            <motion.span
              className={`inline-block will-change-transform ${wordClassName ?? ''}`}
              variants={{
                hidden: { y: '110%', rotate: 4 },
                show: { y: '0%', rotate: 0, transition: { duration: 1.1, ease: EASE_OUT } },
              }}
            >
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

/* ------------------------------------------------------- ScrollHighlight */

/** Paragraph whose words brighten one by one as it scrolls through the viewport. */
export function ScrollHighlight({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden>
        {words.map((word, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {word}
          </Word>
        ))}
      </span>
    </p>
  )
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{' '}
    </motion.span>
  )
}

/* -------------------------------------------------------------- Parallax */

/** Image that drifts against the scroll direction inside an overflow-hidden frame. */
export function ParallaxImage({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  amount = 12,
  priority = false,
  style,
}: {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  imgClassName?: string
  amount?: number
  priority?: boolean
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`])
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`} style={style}>
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        style={reduce ? undefined : { y, scale: 1 + (amount * 2.2) / 100 }}
        className={`h-full w-full object-cover ${imgClassName ?? ''}`}
      />
    </div>
  )
}

/** Clip-path wipe that uncovers its child when it enters the viewport. */
export function ClipReveal({
  children,
  className,
  delay = 0,
  trigger = 'view',
}: {
  children: ReactNode
  className?: string
  delay?: number
  trigger?: 'view' | 'mount'
}) {
  const props =
    trigger === 'mount'
      ? { animate: { clipPath: 'inset(0% 0% 0% 0% round 1.25rem)' } }
      : { whileInView: { clipPath: 'inset(0% 0% 0% 0% round 1.25rem)' }, viewport: { once: true, margin: '0px 0px -10% 0px' } }
  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(100% 0% 0% 0% round 1.25rem)' }}
      {...props}
      transition={{ duration: 1.4, ease: EASE_IN_OUT, delay }}
    >
      {children}
    </motion.div>
  )
}

/* -------------------------------------------------------------- Magnetic */

/** Pulls its child toward the pointer while hovered. */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 })
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 })

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className ?? ''}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/* --------------------------------------------------------------- Counter */

export function Counter({ to, duration = 2, className }: { to: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const value = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(value, to, { duration, ease: EASE_OUT, onUpdate: (v) => setDisplay(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to, duration, value])

  return (
    <span ref={ref} className={className} aria-label={String(to)}>
      <span aria-hidden>{display}</span>
    </span>
  )
}

/* --------------------------------------------------------------- Marquee */

export function Marquee({
  children,
  duration = 32,
  reverse = false,
  className,
}: {
  children: ReactNode
  duration?: number
  reverse?: boolean
  className?: string
}) {
  return (
    <div className={`marquee flex overflow-hidden select-none ${className ?? ''}`}>
      <div
        className="marquee-track flex shrink-0 items-center"
        style={{ ['--marquee-duration' as string]: `${duration}s`, animationDirection: reverse ? 'reverse' : undefined }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ Section head */

export function SectionHead({
  index,
  label,
  title,
  aside,
}: {
  index: string
  label: string
  title: string
  aside?: ReactNode
}) {
  return (
    <header className="mb-14 md:mb-20">
      <div className="flex items-center gap-4">
        <span className="eyebrow text-accent!">({index})</span>
        <span className="eyebrow">{label}</span>
        <motion.span
          className="h-px flex-1 origin-left bg-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE_IN_OUT }}
        />
      </div>
      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SplitText as="h2" text={title} className="font-display text-display max-w-[16ch] tracking-[-0.02em]" />
        {aside && <Reveal className="max-w-sm text-paper-2 md:pb-3">{aside}</Reveal>}
      </div>
    </header>
  )
}

/* ------------------------------------------------------------- Arrow icon */

export function Arrow({ className, diagonal = false }: { className?: string; diagonal?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
      className={`${className ?? 'size-4'} ${diagonal ? '-rotate-45' : ''}`}
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
