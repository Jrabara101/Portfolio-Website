import { motion, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { Footer } from '../components/Footer'
import { Arrow, ClipReveal, EASE_OUT, Magnetic, ParallaxImage, Reveal, SplitText, Stagger } from '../components/motion'
import { useSectionLink } from '../components/Nav'
import { caseStudies, getCaseStudy, type Block, type Card } from '../data/caseStudies'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useScrollTo } from '../hooks/useSmoothScroll'
import { NotFound } from './NotFound'

export function CaseStudyPage() {
  const { slug } = useParams()
  const study = getCaseStudy(slug)
  useDocumentTitle(study ? `${study.name} — Case Study | Johnrick Rabara` : 'Not found', study?.summary)
  if (!study) return <NotFound />

  const index = caseStudies.indexOf(study)
  const next = caseStudies[(index + 1) % caseStudies.length]

  return (
    <>
      <ReadingProgress />
      <main id="main" className="pt-32 md:pt-40">
        {/* ---------------------------------------------------------- Hero */}
        <header className="container-x">
          <motion.div
            className="mb-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.5 }}
          >
            <Link to="/#work" className="group inline-flex items-center gap-2 text-sm text-paper-2 hover:text-paper">
              <Arrow className="size-4 rotate-180 transition-transform group-hover:-translate-x-1" />
              All work
            </Link>
            <span className="h-px w-8 bg-line" />
            <span className="eyebrow">{study.eyebrow}</span>
          </motion.div>

          <SplitText
            as="h1"
            trigger="mount"
            delay={0.55}
            stagger={0.035}
            text={study.title}
            className="block max-w-[20ch] font-display text-[clamp(2.6rem,6.4vw,6.25rem)] leading-[0.98] tracking-[-0.025em]"
          />

          <div className="mt-14 grid gap-12 md:grid-cols-12">
            <motion.p
              className="text-xl leading-relaxed text-paper-2 md:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE_OUT, delay: 1 }}
            >
              {study.lede}
            </motion.p>
            <motion.dl
              className="grid grid-cols-2 gap-x-6 gap-y-6 self-start md:col-span-4 md:col-start-9"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 1.1 } } }}
            >
              {study.meta.map((m) => (
                <motion.div
                  key={m.label}
                  className="border-t border-line pt-3"
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } } }}
                >
                  <dt className="eyebrow mb-1">{m.label}</dt>
                  <dd>{m.value}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-between gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <ul className="flex flex-wrap gap-2">
              {study.tags.map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-paper-2">
                  {t}
                </li>
              ))}
            </ul>
            {study.links && (
              <div className="flex flex-wrap gap-3">
                {study.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm transition-colors ${
                      l.primary ? 'bg-paper text-ink hover:bg-accent' : 'border border-line hover:border-paper'
                    }`}
                  >
                    {l.label}
                    {l.primary && <Arrow className="size-4 transition-transform group-hover:-rotate-45" />}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </header>

        {study.cover && (
          <ClipReveal trigger="mount" delay={0.9} className="container-x mt-16 md:mt-24">
            <div className="overflow-hidden rounded-[1.25rem]" style={{ background: study.cover.bg }}>
              {study.cover.fit === 'contain' ? (
                <img
                  src={study.cover.src}
                  alt={study.cover.alt}
                  width={study.cover.width}
                  height={study.cover.height}
                  className="mx-auto max-h-[70svh] w-auto object-contain p-10"
                  fetchPriority="high"
                />
              ) : (
                <ParallaxImage
                  src={study.cover.src}
                  alt={study.cover.alt}
                  width={study.cover.width}
                  height={study.cover.height}
                  priority
                  amount={8}
                  className="aspect-[16/10] md:aspect-[16/8]"
                  imgClassName={study.cover.position === 'top' ? 'object-top' : ''}
                />
              )}
            </div>
          </ClipReveal>
        )}

        {/* ---------------------------------------------------------- Body */}
        <div className="container-x mt-24 grid gap-12 md:mt-36 md:grid-cols-12">
          <Toc sections={study.sections} />
          <article className="md:col-span-8 md:col-start-5 lg:col-span-7 lg:col-start-5">
            {study.sections.map((section, i) => (
              <section key={section.id} id={section.id} className="mb-24 scroll-mt-28 md:mb-32">
                <Reveal className="mb-8 flex items-baseline gap-4 border-t border-line pt-6">
                  <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="font-display text-4xl leading-tight tracking-[-0.015em] md:text-5xl">{section.title}</h2>
                </Reveal>
                <div className="space-y-8">
                  {section.blocks.map((block, j) => (
                    <BlockView key={j} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </article>
        </div>

        <CallToAction cta={study.cta} />
        <NextStudy slug={next.slug} />
      </main>
      <Footer />
    </>
  )
}

/* ------------------------------------------------------------ Progress */

function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30 })
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-accent" style={{ scaleX }} />
}

/* ----------------------------------------------------------------- TOC */

function Toc({ sections }: { sections: { id: string; title: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id)
  const scrollTo = useScrollTo()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav aria-label="On this page" className="hidden md:col-span-3 md:block">
      <div className="sticky top-28">
        <p className="eyebrow mb-5">On this page</p>
        <ol className="space-y-1 border-l border-line">
          {sections.map((s, i) => {
            const isActive = active === s.id
            return (
              <li key={s.id} className="relative">
                {isActive && (
                  <motion.span layoutId="toc-indicator" className="absolute top-0 -left-px h-full w-px bg-accent" transition={{ type: 'spring', stiffness: 400, damping: 36 }} />
                )}
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(`#${s.id}`)
                  }}
                  aria-current={isActive ? 'location' : undefined}
                  className={`flex gap-3 py-1.5 pl-4 text-sm transition-colors ${isActive ? 'text-paper' : 'text-mute hover:text-paper-2'}`}
                >
                  <span className="font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}

/* -------------------------------------------------------------- Blocks */

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return (
        <Reveal as="div" className="prose-case text-lg leading-[1.75] text-paper-2">
          <p>{block.body}</p>
        </Reveal>
      )
    case 'lead':
      return <Reveal className="font-display text-3xl leading-snug">{block.body}</Reveal>
    case 'numbered':
      return (
        <ol className="border-t border-line">
          {block.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.06} className="grid grid-cols-[3rem_1fr] gap-2 border-b border-line py-6">
              <span className="font-display text-3xl text-accent italic">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-lg leading-relaxed text-paper-2">
                <strong className="font-medium text-paper">{item.title}</strong> {item.body}
              </p>
            </Reveal>
          ))}
        </ol>
      )
    case 'bullets':
      return (
        <ul className="space-y-4">
          {block.items.map((item, i) => (
            <Reveal as="li" key={i} delay={i * 0.05} className="flex gap-4 text-lg leading-relaxed text-paper-2">
              <Arrow className="mt-1.5 size-4 shrink-0 text-accent" />
              <span>{item}</span>
            </Reveal>
          ))}
        </ul>
      )
    case 'cards':
      return (
        <Stagger
          className={`grid gap-4 ${block.cols === 3 ? 'md:grid-cols-3' : block.cols === 2 ? 'md:grid-cols-2' : ''}`}
          stagger={0.08}
        >
          {block.items.map((card, i) => (
            <CardView key={i} card={card} accent={block.accent} />
          ))}
        </Stagger>
      )
    case 'callout':
      return (
        <Reveal className="prose-case relative overflow-hidden rounded-[1.25rem] border border-accent/30 bg-accent-soft p-7 md:p-9">
          {block.title && <h3 className="mb-3 font-display text-2xl">{block.title}</h3>}
          <div className="leading-relaxed text-paper">
            {block.label && <span className="eyebrow mb-2 block text-accent!">{block.label}</span>}
            {typeof block.body === 'string' ? <p>{block.body}</p> : block.body}
          </div>
        </Reveal>
      )
    case 'palette':
      return (
        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-5" stagger={0.07}>
          {block.colors.map((c) => (
            <div key={c.hex} className="group overflow-hidden rounded-2xl border border-line">
              <div className="h-28 transition-[height] duration-700 ease-[var(--ease-out-expo)] group-hover:h-36" style={{ background: c.hex }} />
              <div className="p-3">
                <p className="text-sm">{c.name}</p>
                <p className="font-mono text-xs text-mute">{c.hex}</p>
              </div>
            </div>
          ))}
        </Stagger>
      )
    case 'figure':
      return (
        <figure>
          <ClipReveal>
            <ParallaxImage src={block.src} alt={block.alt} width={block.width} height={block.height} amount={6} style={{ aspectRatio: `${block.width}/${block.height}` }} />
          </ClipReveal>
          {block.caption && <figcaption className="eyebrow mt-3">{block.caption}</figcaption>}
        </figure>
      )
    case 'gallery':
      return (
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {block.items.map((img, i) => (
            <figure key={img.src} className="group">
              <ClipReveal delay={i * 0.12}>
                <div className="overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    loading="lazy"
                    decoding="async"
                    className="w-full transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                </div>
              </ClipReveal>
              <figcaption className="mt-3 text-xs text-mute md:text-sm">{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      )
    case 'stack':
      return <StackDiagram layers={block.layers} />
    case 'stats':
      return (
        <Stagger className="grid grid-cols-2 border-t border-l border-line md:grid-cols-4">
          {block.items.map((s) => (
            <div key={s.label} className="border-r border-b border-line p-5">
              <p className="font-display text-5xl text-accent">{s.value}</p>
              <p className="eyebrow mt-2">{s.label}</p>
            </div>
          ))}
        </Stagger>
      )
    case 'note':
      return <Reveal className="text-sm text-mute italic">{block.body}</Reveal>
  }
}

/** Architecture diagram: layers drop in one by one, joined by connectors with a signal running down them. */
function StackDiagram({ layers }: { layers: { rows: { title: string; detail: string }[]; linkBelow?: string }[] }) {
  return (
    <motion.div
      className="rounded-[1.25rem] border border-line bg-ink-2 p-5 md:p-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      variants={{ show: { transition: { staggerChildren: 0.25 } } }}
    >
      {layers.map((layer, i) => (
        <motion.div key={i} variants={{ hidden: { opacity: 0, y: -16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } } }}>
          <div className="overflow-hidden rounded-xl border border-line bg-ink-3">
            {layer.rows.map((row, j) => (
              <div key={row.title} className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between ${j > 0 ? 'border-t border-dashed border-line' : ''}`}>
                <span className="font-medium">{row.title}</span>
                <span className="font-mono text-xs text-mute">{row.detail}</span>
              </div>
            ))}
          </div>
          {layer.linkBelow !== undefined && (
            <div className="relative ml-8 flex h-14 items-center gap-4">
              <span className="relative h-full w-px overflow-hidden bg-line">
                <motion.span
                  className="absolute inset-x-0 h-4 bg-accent"
                  animate={{ y: ['-100%', '400%'] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                />
              </span>
              <span className="font-mono text-xs text-accent">{layer.linkBelow}</span>
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

function CardView({ card, accent }: { card: Card; accent?: boolean }) {
  return (
    <div className="prose-case group relative h-full overflow-hidden rounded-[1.25rem] border border-line bg-ink-2 p-7 transition-colors duration-500 hover:border-paper/25">
      {card.big && (
        <p className="mb-3 font-display text-7xl leading-none text-accent italic transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1">
          {card.big}
        </p>
      )}
      {card.eyebrow && <p className="eyebrow mb-3 text-accent!">{card.eyebrow}</p>}
      {card.title && <h3 className={`mb-3 text-xl font-medium ${accent ? 'text-accent' : 'text-paper'}`}>{card.title}</h3>}
      <div className="leading-relaxed text-paper-2">{typeof card.body === 'string' ? <p>{card.body}</p> : card.body}</div>
    </div>
  )
}

/* ------------------------------------------------------------ Endings */

function CallToAction({ cta }: { cta: { title: string; body: string; secondary: { label: string; href: string } } }) {
  const sectionLink = useSectionLink()
  const external = cta.secondary.href.startsWith('http')
  return (
    <section className="container-x">
      <Reveal className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 px-7 py-16 md:px-16 md:py-24">
        <div aria-hidden className="absolute -top-1/2 -right-1/4 size-[60vw] rounded-full bg-accent/15 blur-[120px]" />
        <div className="relative grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h2 className="font-display text-display">{cta.title}</h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper-2">{cta.body}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <Magnetic>
              <a href="/#contact" onClick={sectionLink('#contact')} className="inline-flex items-center gap-3 rounded-full bg-accent px-6 py-4 text-ink transition-colors hover:bg-paper">
                Start a conversation <Arrow />
              </a>
            </Magnetic>
            {external ? (
              <a href={cta.secondary.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-line px-6 py-4 transition-colors hover:border-paper">
                {cta.secondary.label}
              </a>
            ) : (
              <a href={cta.secondary.href} onClick={sectionLink(cta.secondary.href.replace('/', ''))} className="inline-flex items-center rounded-full border border-line px-6 py-4 transition-colors hover:border-paper">
                {cta.secondary.label}
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function NextStudy({ slug }: { slug: string }) {
  const study = getCaseStudy(slug)!
  return (
    <section className="container-x mt-28 mb-12 md:mt-40">
      <Link to={`/work/${study.slug}`} data-cursor="Next" className="group block border-t border-line pt-8">
        <div className="flex items-center justify-between">
          <span className="eyebrow">Next case study</span>
          <span className="eyebrow">{study.category}</span>
        </div>
        <div className="mt-6 flex items-end justify-between gap-6">
          <h2 className="font-display text-mega tracking-[-0.035em] transition-[color,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-4 group-hover:text-accent">
            {study.name}
          </h2>
          <span className="mb-4 hidden size-20 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-ink md:flex">
            <Arrow className="size-6 transition-transform duration-500 group-hover:-rotate-45" />
          </span>
        </div>
      </Link>
    </section>
  )
}
