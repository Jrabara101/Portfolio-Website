import Lenis from 'lenis'
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

const LenisContext = createContext<Lenis | null>(null)

/** Smooth scrolling for the whole document. Disabled for reduced-motion users. */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const instance = new Lenis({ autoRaf: true, lerp: 0.1, anchors: false })
    setLenis(instance)
    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export const useLenis = () => useContext(LenisContext)

/** Scroll to an element id or the top, using Lenis when it's running. */
export function useScrollTo() {
  const lenis = useLenis()
  return useCallback((target: string | number, opts: { immediate?: boolean } = {}) => {
    const offset = -24
    if (typeof target === 'number') {
      if (lenis) lenis.scrollTo(target, { immediate: opts.immediate })
      else window.scrollTo({ top: target, behavior: opts.immediate ? 'instant' : 'smooth' })
      return
    }
    const el = document.querySelector<HTMLElement>(target)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset, immediate: opts.immediate, duration: 1.4 })
    else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset
      window.scrollTo({ top, behavior: opts.immediate ? 'instant' : 'smooth' })
    }
  }, [lenis])
}
