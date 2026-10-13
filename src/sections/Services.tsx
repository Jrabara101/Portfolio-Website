import { motion } from 'motion/react'
import { EASE_OUT, SectionHead } from '../components/motion'
import { useSectionLink } from '../components/Nav'
import { services } from '../data/site'

/** Services as an index: hovering a row floods it with the accent from below. */
export function Services() {
  const sectionLink = useSectionLink()
  return (
    <section id="services" className="container-x py-24 md:py-36">
      <SectionHead
        index="02"
        label="Services"
        title="What I do, and what it costs."
        aside="Clear starting prices, one point of contact, and the same person designing and building — no hand-off gap."
      />

      <ul className="border-t border-line">
        {services.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1, ease: EASE_OUT, delay: i * 0.06 }}
            className="border-b border-line"
          >
            <a
              href="/#contact"
              onClick={sectionLink('#contact')}
              data-cursor="Enquire"
              className="group relative grid gap-4 overflow-hidden px-2 py-9 md:grid-cols-12 md:items-center md:gap-8 md:px-4 md:py-12"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-y-100"
              />
              <span className="relative font-mono text-sm text-accent transition-colors duration-500 group-hover:text-ink md:col-span-1">
                0{i + 1}
              </span>
              <h3 className="relative font-display text-4xl tracking-[-0.02em] transition-[color,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:text-ink md:col-span-4 md:text-6xl">
                {s.title}
              </h3>
              <div className="relative md:col-span-5">
                <p className="leading-relaxed text-paper-2 transition-colors duration-500 group-hover:text-ink/80">{s.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-3 py-1 text-xs text-mute transition-colors duration-500 group-hover:border-ink/25 group-hover:text-ink"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="relative font-mono text-sm text-paper transition-colors duration-500 group-hover:text-ink md:col-span-2 md:text-right">
                {s.price}
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
