/* Material-3 design tokens extracted from the former inline tailwind.config
   blocks in daily-ui.html and html/code.html (both were identical).
   Those blocks only worked with the Tailwind CDN; they now live here so the
   compiled build produces the same utilities. */
module.exports = {
  "colors": {
    "inverse-primary": "#006970",
    "surface-container-lowest": "#0e0e11",
    "tertiary": "#faf3ff",
    "on-error-container": "#ffdad6",
    "surface-variant": "#353438",
    "on-primary-fixed": "#002022",
    "error": "#ffb4ab",
    "surface-dim": "#131316",
    "outline": "#849495",
    "surface-tint": "#00dbe9",
    "primary-fixed": "#7df4ff",
    "secondary-fixed": "#79ff5b",
    "on-primary-container": "#006970",
    "on-secondary-fixed": "#022100",
    "outline-variant": "#3b494b",
    "surface-container-high": "#2a2a2d",
    "on-primary-fixed-variant": "#004f54",
    "secondary": "#d7ffc5",
    "on-error": "#690005",
    "on-surface": "#e4e1e6",
    "error-container": "#93000a",
    "on-surface-variant": "#b9cacb",
    "on-tertiary-container": "#7213ff",
    "on-secondary": "#053900",
    "surface-container-highest": "#353438",
    "surface-bright": "#39393c",
    "primary-fixed-dim": "#00dbe9",
    "primary-container": "#00f0ff",
    "surface": "#131316",
    "primary": "#dbfcff",
    "on-secondary-fixed-variant": "#095300",
    "background": "#131316",
    "on-secondary-container": "#0f6d00",
    "inverse-surface": "#e4e1e6",
    "tertiary-container": "#e1d2ff",
    "inverse-on-surface": "#303033",
    "surface-container": "#1f1f22",
    "on-tertiary": "#3c0090",
    "secondary-container": "#2ff801",
    "tertiary-fixed": "#e9ddff",
    "tertiary-fixed-dim": "#d1bcff",
    "secondary-fixed-dim": "#2ae500",
    "surface-container-low": "#1b1b1e",
    "on-tertiary-fixed-variant": "#5700c9",
    "on-background": "#e4e1e6",
    "on-primary": "#00363a",
    "on-tertiary-fixed": "#23005b"
  },
  "borderRadius": {
    "DEFAULT": "0.25rem",
    "lg": "0.5rem",
    "xl": "0.75rem",
    "full": "9999px"
  },
  "spacing": {
    "margin-mobile": "16px",
    "gutter": "24px",
    "container-max": "1440px",
    "margin-desktop": "48px",
    "unit": "8px"
  },
  "fontFamily": {
    "headline-xl": [
      "Space Grotesk"
    ],
    "headline-lg-mobile": [
      "Space Grotesk"
    ],
    "body-md": [
      "Inter"
    ],
    "headline-md": [
      "Space Grotesk"
    ],
    "label-sm": [
      "Space Grotesk"
    ],
    "headline-lg": [
      "Space Grotesk"
    ],
    "body-lg": [
      "Inter"
    ],
    "label-md": [
      "Space Grotesk"
    ]
  },
  "fontSize": {
    "headline-xl": [
      "64px",
      {
        "lineHeight": "72px",
        "letterSpacing": "-0.02em",
        "fontWeight": "700"
      }
    ],
    "headline-lg-mobile": [
      "32px",
      {
        "lineHeight": "40px",
        "fontWeight": "700"
      }
    ],
    "body-md": [
      "16px",
      {
        "lineHeight": "24px",
        "fontWeight": "400"
      }
    ],
    "headline-md": [
      "24px",
      {
        "lineHeight": "32px",
        "fontWeight": "600"
      }
    ],
    "label-sm": [
      "12px",
      {
        "lineHeight": "16px",
        "fontWeight": "500"
      }
    ],
    "headline-lg": [
      "40px",
      {
        "lineHeight": "48px",
        "letterSpacing": "-0.01em",
        "fontWeight": "700"
      }
    ],
    "body-lg": [
      "18px",
      {
        "lineHeight": "28px",
        "fontWeight": "400"
      }
    ],
    "label-md": [
      "14px",
      {
        "lineHeight": "20px",
        "letterSpacing": "0.05em",
        "fontWeight": "600"
      }
    ]
  }
};
