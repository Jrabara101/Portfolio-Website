import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { nav, profile, socials } from '../data/site'
import { useLenis, useScrollTo } from '../hooks/useSmoothScroll'
import { EASE_IN_OUT, EASE_OUT, Magnetic } from './motion'

/** Returns a click handler that scrolls to a home-page section, routing home first if needed. */
export function useSectionLink() {
  const location = useLocation()
  const navigate = useNavigate()
  const scrollTo = useScrollTo()
  return (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (location.pathname === '/') scrollTo(hash)
    else navigate(`/${hash}`)
  }
}

export function Nav() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const sectionLink = useSectionLink()
  const lenis = useLenis()
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 160 && !open)
    setScrolled(y > 40)
  })

  // Lock scrolling while the full-screen menu is open.
  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, lenis])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <div
          className={`container-x flex items-center justify-between py-5 transition-[background,backdrop-filter] duration-500 ${
            scrolled && !open ? 'bg-ink/70 backdrop-blur-xl' : ''
          }`}
        >
          <Link to="/" className="group flex items-baseline gap-2" aria-label="Johnrick Rabara — home">
            <span className="font-display text-3xl italic leading-none">JR.</span>
            <span className="eyebrow hidden transition-colors group-hover:text-paper sm:inline">{profile.role}</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a key={item.href} href={`/${item.href}`} onClick={sectionLink(item.href)} className="link-underline text-sm text-paper-2 hover:text-paper">
                {item.label}
              </a>
            ))}
            <Link to="/playground" className={`link-underline text-sm hover:text-paper ${location.pathname === '/playground' ? 'text-accent' : 'text-paper-2'}`}>
              Playground
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <Magnetic strength={0.25}>
              <a
                href="/#contact"
                onClick={sectionLink('#contact')}
                className="flex items-center gap-2.5 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                <span className="pulse-dot size-2 rounded-full bg-accent" aria-hidden />
                Available for work
              </a>
              </Magnetic>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative flex size-11 items-center justify-center rounded-full border border-line md:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <motion.span className="absolute h-px w-4 bg-paper" animate={{ rotate: open ? 45 : 0, y: open ? 0 : -3 }} />
              <motion.span className="absolute h-px w-4 bg-paper" animate={{ rotate: open ? -45 : 0, y: open ? 0 : 3 }} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink-2 px-[clamp(1rem,4vw,3.5rem)] pt-28 pb-10 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: EASE_IN_OUT }}
          >
            <nav aria-label="Mobile">
              <ul className="space-y-2">
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.a
                      href={`/${item.href}`}
                      onClick={(e) => {
                        e.preventDefault()
                        setOpen(false)
                        // Lenis is stopped while the menu is open; scroll once it has restarted.
                        window.setTimeout(() => sectionLink(item.href)(e), 60)
                      }}
                      className="flex items-baseline gap-4 font-display text-6xl"
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.25 + i * 0.06 }}
                    >
                      <span className="font-mono text-xs text-accent">0{i + 1}</span>
                      {item.label}
                    </motion.a>
                  </li>
                ))}
                <li className="overflow-hidden">
                  <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.25 + nav.length * 0.06 }}>
                    <Link to="/playground" className="flex items-baseline gap-4 font-display text-6xl italic text-accent">
                      <span className="font-mono text-xs not-italic">0{nav.length + 1}</span>
                      Playground
                    </Link>
                  </motion.div>
                </li>
              </ul>
            </nav>
            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="eyebrow hover:text-paper">
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
