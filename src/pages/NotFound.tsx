import { Link } from 'react-router'
import { Arrow, Magnetic, SplitText } from '../components/motion'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFound() {
  useDocumentTitle('Page not found — Johnrick Rabara')
  return (
    <main id="main" className="container-x flex min-h-svh flex-col justify-center py-32">
      <p className="eyebrow mb-6">Error 404</p>
      <SplitText as="h1" trigger="mount" text="This page drifted out to sea." className="font-display text-display max-w-[14ch]" />
      <div className="mt-12">
        <Magnetic>
          <Link to="/" className="inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 text-ink transition-colors hover:bg-accent">
            Back to home <Arrow />
          </Link>
        </Magnetic>
      </div>
    </main>
  )
}
