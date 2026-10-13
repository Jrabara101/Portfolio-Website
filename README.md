# Johnrick Rabara — Portfolio

Editorial-dark portfolio built with **React 19 + Vite + TypeScript**, styled with **Tailwind CSS v4**,
animated with **Motion** and **Lenis** smooth scrolling.

## Scripts

```bash
npm install
npm run dev       # local dev server
npm run build     # typecheck + production build to dist/
npm run preview   # serve the production build
```

## Structure

```
src/
  data/           all copy — site.ts (home), caseStudies.tsx, archive.ts (157 builds), dailyUi.ts (Daily UI)
  components/     motion primitives, nav, cursor, preloader, page transition, footer
  sections/       home-page sections (Hero, Work, Services, About, Builds, Archive, ...)
  pages/          Home, CaseStudy (/work/:slug), Playground (/playground), NotFound
  styles/         design tokens (@theme) and global CSS
public/           images, icons, PDFs
legacy/           the previous static HTML site (incl. the old daily-ui.html), kept for reference
```

Content changes happen in `src/data/` — components stay presentational.
Adding a case study = one more entry in `caseStudies.tsx`; it gets a route, a card in
Selected Work, and a place in the "next case study" loop automatically.

## Daily UI Playground

`/playground` lists every Daily UI build from `src/data/dailyUi.ts` — add a day by appending one entry.
Previews open in an in-page viewer (desktop / tablet / phone widths, ←/→ to browse, Esc to close),
and the open build is kept in the URL (`/playground?day=42`) so a preview can be shared directly.

## Contact form

Set `VITE_WEB3FORMS_KEY` (see `.env.example`) locally in `.env.local` and in the Vercel project
settings. Without a key, submitting opens a pre-filled email instead.

## Deployment

Vercel builds with `npm run build` and serves `dist/` (see `vercel.json`). Old URLs such as
`/case-study-flow.html` and `/daily-ui.html` permanently redirect to their new routes.

## Motion & accessibility

Every animation respects `prefers-reduced-motion`: the preloader, smooth scrolling, custom cursor,
grain and marquees switch off, and Motion falls back to instant transitions.
