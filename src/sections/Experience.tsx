import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router'
import { Arrow, EASE_OUT, SectionHead } from '../components/motion'
import { experience } from '../data/site'

/** Experience as an accordion timeline — one role open at a time. */
export function Experience() {
  const [open, setOpen] = useState(0)

  return (
    <section id="experience" className="container-x py-24 md:py-36">
      <SectionHead
        index="05"
        label="Experience"
        title="Work, internships & training."
        aside="From Java NC III to running a client platform in production and shipping on Stellar — newest first."
      />

      <ol className="border-t border-line">
        {experience.map((job, i) => {
          const isOpen = open === i
          const panelId = `job-panel-${i}`
          return (
            <motion.li
              key={job.company + job.role}
              className="border-b border-line"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: i * 0.04 }}
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 py-7 text-left md:grid-cols-12 md:gap-8"
                >
                  <span className="eyebrow order-3 col-span-2 tabular-nums md:order-none md:col-span-2">
                    {job.start} — {job.end}
                  </span>
                  <span className="flex items-center gap-4 md:col-span-6">
                    {job.logo ? (
                      <img
                        src={job.logo}
                        alt=""
                        width={44}
                        height={44}
                        loading="lazy"
                        className="size-11 shrink-0 rounded-full bg-paper object-contain p-1.5"
                      />
                    ) : (
                      <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent font-display text-xl text-ink">
                        {job.company.charAt(0)}
                      </span>
                    )}
                    <span className="font-display text-2xl leading-tight transition-colors group-hover:text-accent md:text-4xl">{job.role}</span>
                  </span>
                  <span className="hidden text-paper-2 md:col-span-3 md:block">{job.company}</span>
                  <span className="flex justify-end md:col-span-1">
                    <span className="relative flex size-10 items-center justify-center rounded-full border border-line transition-colors group-hover:border-accent">
                      <span className="absolute h-px w-3.5 bg-current" />
                      <motion.span className="absolute h-px w-3.5 bg-current" animate={{ rotate: isOpen ? 0 : 90 }} transition={{ duration: 0.4 }} />
                    </span>
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-6 pb-10 md:grid-cols-12 md:gap-8">
                      <p className="text-paper-2 md:col-span-2 md:col-start-3 md:hidden">{job.company}</p>
                      <ul className="space-y-3 md:col-span-7 md:col-start-3">
                        {job.bullets.map((b) => (
                          <li key={b} className="flex gap-3 leading-relaxed text-paper-2">
                            <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      {job.caseStudy && (
                        <div className="md:col-span-3">
                          <Link
                            to={`/work/${job.caseStudy.slug}`}
                            className="group/cs inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm text-ink transition-colors hover:bg-accent"
                          >
                            {job.caseStudy.label}
                            <Arrow className="size-4 transition-transform group-hover/cs:translate-x-1" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          )
        })}
      </ol>
    </section>
  )
}
