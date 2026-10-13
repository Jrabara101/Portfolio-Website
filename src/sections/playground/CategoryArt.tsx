import type { DailyCategory } from '../../data/dailyUi'

/**
 * Line-art glyph per category (ported from the old playground). Strokes inherit
 * currentColor; elements tagged `.draw` re-draw themselves on card hover via the
 * `.art-draw` rule in index.css.
 */
export function CategoryArt({ category, className }: { category: DailyCategory; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      {ART[category] ?? ART.entertainment}
    </svg>
  )
}

const ART: Record<DailyCategory, React.ReactNode> = {
  forms: (
    <>
      <rect x="20" y="20" width="60" height="60" rx="4" strokeDasharray="4 2" />
      <rect className="draw" x="30" y="32" width="40" height="8" rx="2" />
      <rect className="draw" x="30" y="48" width="40" height="8" rx="2" />
      <rect x="40" y="64" width="20" height="8" rx="4" fill="currentColor" fillOpacity="0.25" />
    </>
  ),
  checkout: (
    <>
      <rect className="draw" x="15" y="25" width="70" height="50" rx="6" />
      <rect x="25" y="37" width="12" height="10" rx="2" fill="currentColor" fillOpacity="0.25" />
      <line x1="25" y1="58" x2="62" y2="58" strokeDasharray="2 2" />
      <circle className="draw" cx="70" cy="58" r="4" />
    </>
  ),
  landing: (
    <>
      <rect className="draw" x="15" y="20" width="70" height="60" rx="4" />
      <line x1="15" y1="35" x2="85" y2="35" />
      <circle cx="28" cy="27" r="3" fill="currentColor" fillOpacity="0.25" />
      <rect className="draw" x="25" y="45" width="20" height="25" rx="2" />
      <rect x="55" y="45" width="20" height="10" rx="1" />
      <rect x="55" y="60" width="20" height="10" rx="1" />
    </>
  ),
  utilities: (
    <>
      <circle className="draw" cx="50" cy="50" r="35" strokeDasharray="40 10" />
      <path className="art-spin" d="M50 50 L70 30" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="50" r="4" fill="currentColor" />
    </>
  ),
  design: (
    <>
      <polygon className="draw" points="50,20 80,45 50,70 20,45" strokeDasharray="3 3" />
      <polygon points="50,35 70,52 50,68 30,52" fill="currentColor" fillOpacity="0.12" />
      <polygon points="50,50 60,58 50,66 40,58" fill="currentColor" fillOpacity="0.25" />
    </>
  ),
  profile: (
    <>
      <circle className="draw" cx="50" cy="40" r="15" />
      <path className="draw" d="M25 75 C25 60, 35 55, 50 55 C65 55, 75 60, 75 75" strokeLinecap="round" />
      <circle cx="50" cy="50" r="38" strokeDasharray="4 4" />
    </>
  ),
  settings: (
    <>
      <circle className="draw" cx="50" cy="50" r="18" />
      <path
        className="art-spin"
        d="M50 20 L50 32 M50 68 L50 80 M20 50 L32 50 M68 50 L80 50 M29 29 L38 38 M62 62 L71 71 M29 71 L38 62 M62 29 L71 38"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </>
  ),
  pages: (
    <>
      <rect x="25" y="25" width="50" height="40" rx="3" />
      <rect className="draw" x="35" y="35" width="50" height="40" rx="3" fill="var(--color-ink-3)" />
      <line x1="35" y1="45" x2="85" y2="45" />
    </>
  ),
  music: (
    <g strokeLinecap="round" strokeWidth="3" className="art-bars">
      {[20, 35, 50, 65, 80].map((x, i) => (
        <line key={x} x1={x} x2={x} y1={50 - [20, 30, 35, 25, 15][i]} y2={50 + [20, 30, 35, 25, 15][i]} style={{ animationDelay: `${i * 0.12}s`, transformOrigin: "50% 50%" }} />
      ))}
    </g>
  ),
  social: (
    <>
      <circle cx="50" cy="30" r="6" fill="currentColor" />
      <circle className="draw" cx="30" cy="65" r="6" />
      <circle className="draw" cx="70" cy="65" r="6" />
      <line className="draw" x1="47" y1="35" x2="33" y2="60" />
      <line className="draw" x1="53" y1="35" x2="67" y2="60" />
      <line x1="36" y1="65" x2="64" y2="65" strokeDasharray="2 2" />
    </>
  ),
  chat: (
    <>
      <path className="draw" d="M20 35 C20 25, 30 20, 45 20 C60 20, 70 25, 70 35 C70 45, 60 50, 45 50 C40 50, 35 48, 30 52 L30 45 C24 43, 20 40, 20 35 Z" />
      <path d="M50 55 C54 55, 58 54, 62 52 L66 56 L66 50 C70 48, 74 44, 74 40" strokeDasharray="3 3" />
    </>
  ),
  dashboards: (
    <g className="art-bars">
      <rect x="25" y="60" width="10" height="20" rx="1" fill="currentColor" style={{ animationDelay: '0s' }} />
      <rect x="45" y="40" width="10" height="40" rx="1" fill="currentColor" fillOpacity="0.5" style={{ animationDelay: '0.12s' }} />
      <rect x="65" y="25" width="10" height="55" rx="1" fill="currentColor" fillOpacity="0.8" style={{ animationDelay: '0.24s' }} />
      <line x1="15" y1="80" x2="85" y2="80" />
    </g>
  ),
  entertainment: (
    <>
      <rect className="draw" x="20" y="30" width="60" height="40" rx="4" />
      <line x1="32" y1="35" x2="32" y2="65" strokeDasharray="2 2" />
      <path d="M46 43 L58 50 L46 57 Z" fill="currentColor" fillOpacity="0.4" />
    </>
  ),
}
