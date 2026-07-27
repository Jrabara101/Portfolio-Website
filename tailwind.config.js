const m3 = require('./tailwind.m3-tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // js/main.js is scanned on purpose: the project filter tabs add/remove utility
  // classes at runtime (bg-gradient-to-r, from-[#64ffda], to-[#298dff], ...).
  // Without it those classes get tree-shaken out and the active tab loses its styling.
  content: [
    './*.html',
    './html/**/*.html',
    './js/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Material-3 tokens used by daily-ui.html and html/code.html.
      ...m3,
      colors: {
        ...m3.colors,
        // Main portfolio palette (mirrors the CSS custom properties in styles.css).
        'bg-primary': '#0a192f',
        'bg-secondary': '#0f223f',
        'accent-primary': '#64ffda',
        'accent-secondary': '#298dff',
        'text-primary': '#cfe3ff',
        'text-secondary': '#8892b0'
      },
      fontFamily: {
        ...m3.fontFamily,
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'ui-sans-serif', 'sans-serif']
      }
    }
  },
  // daily-ui.html and html/code.html previously loaded these via the CDN's
  // ?plugins=forms,container-queries query string.
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ]
};
