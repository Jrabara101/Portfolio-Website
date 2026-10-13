import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { Footer } from '../components/Footer'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useScrollTo } from '../hooks/useSmoothScroll'
import { About, ServiceBand } from '../sections/About'
import { Builds } from '../sections/Builds'
import { Contact } from '../sections/Contact'
import { Credentials } from '../sections/Credentials'
import { Experience } from '../sections/Experience'
import { Hero } from '../sections/Hero'
import { Services } from '../sections/Services'
import { Testimonials } from '../sections/Testimonials'
import { Work } from '../sections/Work'

export function Home() {
  useDocumentTitle(
    'Johnrick Rabara | Shopify & Brand Identity Designer',
    'Johnrick Rabara designs and builds Shopify stores and brand identities for growing brands. Brand identity, Shopify stores, landing pages, and UI design.',
  )
  const { hash } = useLocation()
  const scrollTo = useScrollTo()

  // Deep links like /#contact (from a case study or an old bookmark): wait for the
  // enter curtain to lift and layout to settle, then glide to the section.
  useEffect(() => {
    if (!hash) return
    const id = window.setTimeout(() => scrollTo(hash), 700)
    return () => window.clearTimeout(id)
  }, [hash, scrollTo])

  return (
    <>
      <main id="main">
        <Hero />
        <ServiceBand />
        <Work />
        <Services />
        <About />
        <Builds />
        <Experience />
        <Credentials />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
