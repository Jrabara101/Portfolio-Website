import { AnimatePresence, MotionConfig } from 'motion/react'
import { createContext, lazy, Suspense, useCallback, useContext, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { PageTransition } from './components/PageTransition'
import { Preloader, shouldPlayIntro } from './components/Preloader'
import { getCaseStudy } from './data/caseStudies'
import { useScrollTo } from './hooks/useSmoothScroll'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

const Playground = lazy(() => import('./pages/Playground').then((m) => ({ default: m.Playground })))
const CaseStudyPage = lazy(() => import('./pages/CaseStudy').then((m) => ({ default: m.CaseStudyPage })))

/** True once the intro has finished (or was skipped) — gates the hero entrance. */
const IntroContext = createContext(true)
export const useIntroDone = () => useContext(IntroContext)

function routeLabel(pathname: string) {
  if (pathname === '/') return 'Home'
  if (pathname === '/playground') return 'Playground'
  const study = getCaseStudy(pathname.split('/')[2])
  return study?.name ?? 'Not found'
}

export default function App() {
  const location = useLocation()
  const scrollTo = useScrollTo()
  const [playIntro] = useState(shouldPlayIntro)
  const [introDone, setIntroDone] = useState(!playIntro)
  const finishIntro = useCallback(() => setIntroDone(true), [])
  const firstKey = useRef(location.key)

  // Route by pathname only, so hash changes on the same page don't remount it.
  const routeKey = location.pathname

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={introDone}>
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-accent px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Nav />
        <AnimatePresence mode="wait" onExitComplete={() => !location.hash && scrollTo(0, { immediate: true })}>
          <PageTransition key={routeKey} label={routeLabel(location.pathname)} animateIn={location.key !== firstKey.current}>
            <Suspense fallback={<div className="min-h-svh" />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/work/:slug" element={<CaseStudyPage />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageTransition>
        </AnimatePresence>
        <AnimatePresence>{!introDone && <Preloader onDone={finishIntro} />}</AnimatePresence>
        <Cursor />
        <div className="grain" aria-hidden />
      </IntroContext.Provider>
    </MotionConfig>
  )
}
