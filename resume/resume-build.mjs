import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { chromium } from 'playwright-core'
import { C } from './resume-content.mjs'

const OUT = process.argv[2]
mkdirSync(OUT, { recursive: true })
const PHOTO = 'data:image/jpeg;base64,' + readFileSync(`${OUT}/img0.jpeg`).toString('base64')
const FONTS =
  '<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap" rel="stylesheet">'

const BASE = `
@page { size: A4; margin: 0 }
* { box-sizing: border-box; margin: 0; padding: 0 }
html, body { background: #fff }
body { -webkit-print-color-adjust: exact; print-color-adjust: exact }
.page { width: 210mm; height: 297mm; overflow: hidden; position: relative }
a { color: inherit; text-decoration: none }
ul { list-style: none }
b { font-weight: 600 }
`
const doc = (title, css, body) =>
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title>${FONTS}<style>${BASE}${css}</style></head><body><div class="page">${body}</div></body></html>`

const contactLinks = (sep = '') =>
  C.contacts.map((c) => (c.href ? `<a href="${c.href}">${c.v}</a>` : `<span>${c.v}</span>`)).join(sep)
const bullets = (b) => `<ul class="bl">${b.map((x) => `<li>${x}</li>`).join('')}</ul>`

// ---------------------------------------------------------------- 1 · Editorial
const editorial = () =>
  doc(
    'Rabara — Editorial',
    `
body { font-family: 'Inter Tight', sans-serif; color: #1a1a1c; font-size: 9.1pt; line-height: 1.45 }
.page { padding: 13mm 15mm 11mm; background: #fbfaf7 }
.top { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1.2pt solid #1a1a1c; padding-bottom: 5mm }
h1 { font-family: 'Instrument Serif', serif; font-weight: 400; font-size: 40pt; line-height: .9; letter-spacing: -.01em }
h1 i { color: #ff5b2e }
.role { font-family: 'JetBrains Mono', monospace; font-size: 7.4pt; letter-spacing: .14em; text-transform: uppercase; color: #6b6862; margin-top: 3mm }
.ct { text-align: right; font-size: 8.3pt; line-height: 1.6; color: #3d3b37 }
.ct a, .ct span { display: block }
  .sum { font-family: 'Instrument Serif', serif; font-size: 12.4pt; line-height: 1.3; margin: 4mm 0 0; color: #2a2926 }
section { display: grid; grid-template-columns: 30mm 1fr; gap: 4mm; padding-top: 3mm; margin-top: 3mm; border-top: .5pt solid #d9d5cc }
h2 { font-family: 'JetBrains Mono', monospace; font-weight: 500; font-size: 7.2pt; letter-spacing: .14em; text-transform: uppercase; color: #ff5b2e; padding-top: 1pt }
h2 span { color: #a19d94; display: block }
.job + .job { margin-top: 2.6mm }
.jh { display: flex; justify-content: space-between; align-items: baseline }
.jh strong { font-size: 10.2pt; font-weight: 600 }
.jh em { font-style: normal; font-family: 'JetBrains Mono', monospace; font-size: 7.4pt; color: #6b6862 }
.jr { color: #6b6862; font-size: 8.7pt; margin-bottom: 1mm }
.bl li { position: relative; padding-left: 4mm }
.bl li::before { content: ''; position: absolute; left: 0; top: .62em; width: 2mm; height: .6pt; background: #ff5b2e }
.rows li { display: flex; justify-content: space-between; align-items: baseline; gap: 4mm }
.rows li + li { margin-top: .4mm }
.rows em { font-style: normal; color: #6b6862; font-family: 'JetBrains Mono', monospace; font-size: 7.4pt; white-space: nowrap }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: .8mm 6mm }
.two small { display: block; color: #6b6862; font-size: 7.8pt }
.sk li { display: grid; grid-template-columns: 22mm 1fr }
.sk li + li { margin-top: .8mm }
.sk b { font-weight: 600 }
`,
    `
<header class="top">
  <div><h1>Johnrick <i>Rabara</i></h1><p class="role">${C.title} · ${C.subtitle}</p></div>
  <div class="ct">${contactLinks()}</div>
</header>
<p class="sum">${C.summary}</p>
<section><h2>Experience<span>01</span></h2><div>
${C.experience.map((j) => `<div class="job"><div class="jh"><strong>${j.org}</strong><em>${j.dates}</em></div><p class="jr">${j.role}</p>${bullets(j.bullets)}</div>`).join('')}
</div></section>
<section><h2>Education<span>02</span></h2><div>
<div class="jh"><strong>${C.education.degree} — ${C.education.school}</strong><em>${C.education.dates}</em></div><p class="jr">${C.education.note}</p>
</div></section>
<section><h2>Training<span>03</span></h2><ul class="rows">
${C.training.map((t) => `<li><span><b>${t.name}</b> — ${t.org}</span><em>${t.dates}</em></li>`).join('')}
</ul></section>
<section><h2>Certificates<span>04</span></h2><ul class="two">
${C.certs.map((c) => `<li>${c.name}<small>${c.org}</small></li>`).join('')}
</ul></section>
<section><h2>Skills<span>05</span></h2><ul class="sk">
${C.skills.map((s) => `<li><b>${s.k}</b><span>${s.v}</span></li>`).join('')}
</ul></section>
`,
  )

// ---------------------------------------------------------------- 2 · Classic ATS
const classic = () =>
  doc(
    'Rabara — Classic',
    `
body { font-family: 'Inter Tight', sans-serif; color: #111; font-size: 9.3pt; line-height: 1.42 }
.page { padding: 12mm 16mm 10mm }
header { text-align: center }
h1 { font-size: 22pt; font-weight: 700; letter-spacing: .02em }
.role { font-size: 10pt; color: #333; margin-top: 1mm }
.ct { margin-top: 2mm; font-size: 8.2pt; color: #333 }
.ct a, .ct span { white-space: nowrap }
.ct a + a::before, .ct a + span::before, .ct span + a::before { content: '  |  '; white-space: pre; color: #999 }
h2 { font-size: 9.4pt; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; border-bottom: .8pt solid #111; padding-bottom: .8mm; margin: 3.6mm 0 1.6mm }
.jh { display: flex; justify-content: space-between; align-items: baseline }
.jh strong { font-size: 10pt }
.jr { font-style: italic; color: #333; margin-bottom: .8mm }
.job + .job { margin-top: 2.2mm }
.bl { list-style: disc; padding-left: 4.5mm }
.bl li + li { margin-top: .4mm }
.rows li { display: flex; justify-content: space-between }
.rows li + li { margin-top: .5mm }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: .8mm 6mm }
.sk li + li { margin-top: .6mm }
`,
    `
<header>
  <h1>${C.name.toUpperCase()}</h1>
  <p class="role">${C.title} | ${C.subtitle.replace('·', '|')}</p>
  <p class="ct">${contactLinks()}</p>
</header>
<h2>Summary</h2><p>${C.summary}</p>
<h2>Experience</h2>
${C.experience.map((j) => `<div class="job"><div class="jh"><strong>${j.org}</strong><span>${j.dates}</span></div><p class="jr">${j.role}</p>${bullets(j.bullets)}</div>`).join('')}
<h2>Education</h2>
<div class="jh"><strong>${C.education.school}</strong><span>${C.education.dates}</span></div><p class="jr">${C.education.degree}</p><p>${C.education.note}</p>
<h2>Training</h2><ul class="rows">${C.training.map((t) => `<li><span><b>${t.org}</b> — ${t.name}</span><span>${t.dates}</span></li>`).join('')}</ul>
<h2>Certificates</h2><ul class="two">${C.certs.map((c) => `<li><b>${c.org}</b> — ${c.name}</li>`).join('')}</ul>
<h2>Skills</h2><ul class="sk">${C.skills.map((s) => `<li><b>${s.k}:</b> ${s.v}</li>`).join('')}</ul>
`,
  )

// ---------------------------------------------------------------- 3 · Dark sidebar
const sidebar = () =>
  doc(
    'Rabara — Sidebar',
    `
body { font-family: 'Inter Tight', sans-serif; color: #1c1c1f; font-size: 8.9pt; line-height: 1.45 }
.page { display: grid; grid-template-columns: 66mm 1fr }
aside { background: #141416; color: #e9e6df; padding: 13mm 7mm 10mm 9mm }
.ph { width: 34mm; height: 34mm; border-radius: 50%; overflow: hidden; border: 1.4pt solid #ff5b2e; background: #fff; margin-bottom: 6mm }
.ph img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 22%; transform: scale(1.35) }
aside h3 { font-family: 'JetBrains Mono', monospace; font-weight: 500; font-size: 6.8pt; letter-spacing: .16em; text-transform: uppercase; color: #ff5b2e; margin: 5.4mm 0 2mm }
.ct li + li { margin-top: 1.6mm }
.ct small { display: block; font-size: 6.6pt; letter-spacing: .1em; text-transform: uppercase; color: #8e8b84 }
.ct a, .ct span { font-size: 8pt; word-break: break-all }
.sk li + li { margin-top: .8mm }
.sk b { display: block; font-size: 8.2pt; color: #fff }
.sk span { font-size: 7.8pt; color: #c9c5bc }
.ce li + li { margin-top: 1.6mm }
.ce li { font-size: 7.9pt; color: #e9e6df }
.ce small { display: block; color: #8e8b84; font-size: 7pt }
main { padding: 13mm 12mm 10mm 10mm }
h1 { font-size: 27pt; font-weight: 800; letter-spacing: -.02em; line-height: 1 }
.role { color: #ff5b2e; font-weight: 600; font-size: 10pt; margin-top: 2mm }
.role span { color: #6b6862; font-weight: 400 }
.sum { margin-top: 4mm; color: #3d3b37 }
main h2 { display: flex; align-items: center; gap: 3mm; font-size: 8pt; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; margin: 5.4mm 0 2.6mm }
main h2::after { content: ''; flex: 1; height: .6pt; background: #d9d5cc }
.job { position: relative; padding-left: 4.5mm; border-left: .8pt solid #e2ded5 }
.job::before { content: ''; position: absolute; left: -1.5mm; top: 1.1mm; width: 2.2mm; height: 2.2mm; border-radius: 50%; background: #ff5b2e }
.job + .job { margin-top: 3.4mm }
.jh { display: flex; justify-content: space-between; align-items: baseline; gap: 3mm }
.jh strong { font-size: 9.8pt }
.jh em { font-style: normal; font-size: 7.6pt; color: #6b6862; white-space: nowrap }
.jr { color: #6b6862; margin-bottom: .8mm }
.bl li { position: relative; padding-left: 3.4mm }
.bl li::before { content: '–'; position: absolute; left: 0; color: #ff5b2e }
.rows li { display: flex; justify-content: space-between; gap: 3mm }
.rows li + li { margin-top: .7mm }
.rows em { font-style: normal; color: #6b6862; font-size: 7.6pt; white-space: nowrap }
`,
    `
<aside>
  <div class="ph"><img src="${PHOTO}" alt=""></div>
  <h3>Contact</h3>
  <ul class="ct">${C.contacts.map((c) => `<li><small>${c.k}</small>${c.href ? `<a href="${c.href}">${c.v}</a>` : `<span>${c.v}</span>`}</li>`).join('')}</ul>
  <h3>Skills</h3>
  <ul class="sk">${C.skills.map((s) => `<li><b>${s.k}</b><span>${s.v}</span></li>`).join('')}</ul>
  <h3>Certificates</h3>
  <ul class="ce">${C.certs.map((c) => `<li>${c.name}<small>${c.org}</small></li>`).join('')}</ul>
</aside>
<main>
  <h1>Johnrick E.<br>Rabara</h1>
  <p class="role">${C.title} <span>· ${C.subtitle}</span></p>
  <p class="sum">${C.summary}</p>
  <h2>Experience</h2>
  ${C.experience.map((j) => `<div class="job"><div class="jh"><strong>${j.org}</strong><em>${j.dates}</em></div><p class="jr">${j.role}</p>${bullets(j.bullets)}</div>`).join('')}
  <h2>Education</h2>
  <div class="jh"><strong>${C.education.degree}</strong><em>${C.education.dates}</em></div><p class="jr">${C.education.school}</p><p>${C.education.note}</p>
  <h2>Training</h2>
  <ul class="rows">${C.training.map((t) => `<li><span><b>${t.name}</b><br><small style="color:#6b6862">${t.org}</small></span><em>${t.dates}</em></li>`).join('')}</ul>
</main>
`,
  )

// ---------------------------------------------------------------- 4 · Navy header (refined current)
const navy = () =>
  doc(
    'Rabara — Navy',
    `
body { font-family: 'Inter Tight', sans-serif; color: #1b2433; font-size: 9pt; line-height: 1.45 }
header { display: grid; grid-template-columns: 38mm 1fr; background: #1e3557; color: #fff; height: 43mm }
.ph { background: #fff; overflow: hidden }
.ph img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 30% }
.hd { padding: 7mm 12mm 0 9mm }
h1 { font-size: 26pt; font-weight: 800; letter-spacing: -.01em; line-height: 1 }
.role { color: #a9c3e8; font-size: 10pt; margin-top: 1.6mm }
.ct { display: grid; grid-template-columns: 1fr 1fr; gap: 1mm 6mm; margin-top: 4.5mm; font-size: 8.2pt; color: #e3ebf7 }
.ct small { color: #a9c3e8; font-size: 6.6pt; letter-spacing: .1em; text-transform: uppercase; margin-right: 2mm }
main { padding: 5mm 13mm 8mm }
.sum { color: #3a4659; padding-bottom: 1mm }
section { display: grid; grid-template-columns: 26mm 1fr; gap: 4mm; border-top: .6pt solid #d6dde8; padding-top: 2.8mm; margin-top: 2.8mm }
h2 { font-size: 7.6pt; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #1e3557 }
.job + .job { margin-top: 2.4mm }
.jh { display: flex; justify-content: space-between; align-items: baseline }
.jh strong { font-size: 9.8pt }
.jh em { font-style: normal; font-weight: 600; font-size: 7.8pt; color: #1e3557 }
.jr { color: #5b6a80; margin-bottom: .8mm }
.bl li { position: relative; padding-left: 3.6mm }
.bl li::before { content: ''; position: absolute; left: 0; top: .55em; width: 1.3mm; height: 1.3mm; background: #3b6fb6; border-radius: 50% }
.rows li { display: flex; justify-content: space-between }
.rows li + li { margin-top: .6mm }
.rows em { font-style: normal; color: #5b6a80 }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 1mm 6mm }
.two small { display: block; color: #5b6a80; font-size: 7.8pt }
.sk li + li { margin-top: .6mm }
.sk b { color: #1e3557 }
`,
    `
<header>
  <div class="ph"><img src="${PHOTO}" alt=""></div>
  <div class="hd">
    <h1>${C.name}</h1>
    <p class="role">${C.title} · ${C.subtitle}</p>
    <div class="ct">${C.contacts.slice(0, 5).map((c) => `<a href="${c.href}"><small>${c.k}</small>${c.v}</a>`).join('')}<span><small>Based in</small>${C.contacts[5].v}</span></div>
  </div>
</header>
<main>
  <p class="sum">${C.summary}</p>
  <section><h2>Experience</h2><div>${C.experience.map((j) => `<div class="job"><div class="jh"><strong>${j.org}</strong><em>${j.dates}</em></div><p class="jr">${j.role}</p>${bullets(j.bullets)}</div>`).join('')}</div></section>
  <section><h2>Education</h2><div><div class="jh"><strong>${C.education.school}</strong><em>${C.education.dates}</em></div><p class="jr">${C.education.degree}</p><p>${C.education.note}</p></div></section>
  <section><h2>Training</h2><ul class="rows">${C.training.map((t) => `<li><span><b>${t.org}</b> — ${t.name}</span><em>${t.dates}</em></li>`).join('')}</ul></section>
  <section><h2>Certificates</h2><ul class="two">${C.certs.map((c) => `<li>${c.name}<small>${c.org}</small></li>`).join('')}</ul></section>
  <section><h2>Skills</h2><ul class="sk">${C.skills.map((s) => `<li><b>${s.k}:</b> ${s.v}</li>`).join('')}</ul></section>
</main>
`,
  )

// ---------------------------------------------------------------- 5 · Timeline / developer
const timeline = () =>
  doc(
    'Rabara — Timeline',
    `
body { font-family: 'Inter Tight', sans-serif; color: #18181b; font-size: 8.8pt; line-height: 1.45 }
.page { padding: 11mm 15mm 9mm }
header { display: grid; grid-template-columns: 1fr auto; gap: 6mm; align-items: end }
.tag { font-family: 'JetBrains Mono', monospace; font-size: 7.6pt; color: #0f766e }
h1 { font-size: 30pt; font-weight: 800; letter-spacing: -.03em; line-height: 1.02; margin-top: 1.4mm }
.role { font-size: 10pt; color: #52525b; margin-top: 1mm }
.ct { font-family: 'JetBrains Mono', monospace; font-size: 7.6pt; line-height: 1.75; color: #3f3f46; text-align: right }
.ct a, .ct span { display: block }
.sum { margin-top: 4mm; padding: 2.6mm 4mm; background: #f0fdfa; border-left: 2pt solid #0f766e; color: #27272a }
h2 { font-family: 'JetBrains Mono', monospace; font-size: 8pt; font-weight: 500; color: #0f766e; margin: 4mm 0 1.8mm }
h2::before { content: '// '; color: #a1a1aa }
.row { display: grid; grid-template-columns: 36mm 1fr; gap: 4mm }
.d { white-space: nowrap }
.row + .row { margin-top: 2.2mm }
.d { font-family: 'JetBrains Mono', monospace; font-size: 7.4pt; color: #71717a; padding-top: 1.2pt; text-align: right; border-right: 1pt solid #e4e4e7; padding-right: 4mm }
.jh strong { font-size: 9.8pt }
.jh span { color: #71717a }
.bl { margin-top: .8mm }
.bl li { position: relative; padding-left: 3.6mm }
.bl li::before { content: '▸'; position: absolute; left: 0; color: #0f766e; font-size: 7pt; top: .1em }
.tr .row + .row { margin-top: .4mm }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 8mm }
.ce li + li { margin-top: 1mm }
.ce small { display: block; color: #71717a; font-size: 7.8pt }
.chips { display: flex; flex-wrap: wrap; gap: .9mm; margin-top: .6mm }
.chips span { font-family: 'JetBrains Mono', monospace; font-size: 6.9pt; border: .6pt solid #d4d4d8; border-radius: 1mm; padding: 0 1.5mm; color: #3f3f46 }
.sk li + li { margin-top: .8mm }
.sk b { font-size: 8.4pt }
`,
    `
<header>
  <div><p class="tag">&lt;full-stack · ui/ux · qa /&gt;</p><h1>${C.name}</h1><p class="role">${C.title} · ${C.subtitle}</p></div>
  <div class="ct">${contactLinks()}</div>
</header>
<p class="sum">${C.summary}</p>
<h2>experience</h2>
${C.experience.map((j) => `<div class="row"><p class="d">${j.dates}</p><div><p class="jh"><strong>${j.role}</strong> <span>· ${j.org}</span></p>${bullets(j.bullets)}</div></div>`).join('')}
<h2>education</h2>
<div class="row"><p class="d">${C.education.dates}</p><div><p class="jh"><strong>${C.education.degree}</strong> <span>· ${C.education.school}</span></p><p>${C.education.note}</p></div></div>
<h2>training</h2>
<div class="tr">${C.training.map((t) => `<div class="row"><p class="d">${t.dates}</p><p><b>${t.name}</b> <span style="color:#71717a">· ${t.org}</span></p></div>`).join('')}</div>
<div class="grid2">
  <div><h2>certificates</h2><ul class="ce">${C.certs.map((c) => `<li>${c.name}<small>${c.org}</small></li>`).join('')}</ul></div>
  <div><h2>skills</h2><ul class="sk">${C.skills.map((s) => `<li><b>${s.k}</b><div class="chips">${s.v.split(/, (?![^(]*\))/).map((x) => `<span>${x}</span>`).join('')}</div></li>`).join('')}</ul></div>
</div>
`,
  )

const designs = [
  ['1-editorial', editorial],
  ['2-classic-ats', classic],
  ['3-dark-sidebar', sidebar],
  ['4-navy-header', navy],
  ['5-developer-timeline', timeline],
]

const browser = await chromium.launch({ executablePath: 'C:/Users/Admin/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe' })
const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 })
for (const [id, fn] of designs) {
  const html = fn()
  writeFileSync(`${OUT}/${id}.html`, html)
  await page.goto(`file:///${OUT.replace(/\\/g, '/')}/${id}.html`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  // Overflow check: does any content extend past the A4 page?
  const over = await page.evaluate(() => {
    const p = document.querySelector('.page')
    const bottom = p.getBoundingClientRect().bottom
    let max = 0
    p.querySelectorAll('*').forEach((el) => (max = Math.max(max, el.getBoundingClientRect().bottom)))
    return Math.round(max - bottom)
  })
  await page.screenshot({ path: `${OUT}/${id}.png`, clip: { x: 0, y: 0, width: 794, height: 1123 } })
  await page.pdf({ path: `${OUT}/${id}.pdf`, format: 'A4', printBackground: true, preferCSSPageSize: true })
  console.log(id, over > 0 ? `OVERFLOW ${over}px` : `fits (${-over}px spare)`)
}
await browser.close()
