---
name: Neon Syndicate
colors:
  surface: '#131316'
  surface-dim: '#131316'
  surface-bright: '#39393c'
  surface-container-lowest: '#0e0e11'
  surface-container-low: '#1b1b1e'
  surface-container: '#1f1f22'
  surface-container-high: '#2a2a2d'
  surface-container-highest: '#353438'
  on-surface: '#e4e1e6'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e4e1e6'
  inverse-on-surface: '#303033'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#d7ffc5'
  on-secondary: '#053900'
  secondary-container: '#2ff801'
  on-secondary-container: '#0f6d00'
  tertiary: '#faf3ff'
  on-tertiary: '#3c0090'
  tertiary-container: '#e1d2ff'
  on-tertiary-container: '#7213ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#79ff5b'
  secondary-fixed-dim: '#2ae500'
  on-secondary-fixed: '#022100'
  on-secondary-fixed-variant: '#095300'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d1bcff'
  on-tertiary-fixed: '#23005b'
  on-tertiary-fixed-variant: '#5700c9'
  background: '#131316'
  on-background: '#e4e1e6'
  surface-variant: '#353438'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system establishes a high-stakes digital playground, blending the tension of a poker room with the kinetic energy of a neon-lit futuristic city. The aesthetic targets a tech-savvy, competitive audience that values exclusivity and tactile digital experiences. 

The style is a sophisticated hybrid of **Glassmorphism** and **High-Contrast/Bold** elements. It utilizes deep, layered backgrounds to provide a sense of infinite depth, while UI components appear as illuminated glass slabs floating in a void. Every interaction should feel intentional, premium, and electrically charged, evoking the thrill of a winning hand.

## Colors

The palette is anchored in a "Void Black" (`#0F0F12`) to ensure maximum pop for the neon accents. 

- **Primary (Electric Blue):** Used for primary actions, progress indicators, and active states. It represents the "energy" of the system.
- **Secondary (Lime Green):** Reserved for "win" states, success messages, and high-value callouts, mirroring the color of classic felt or digital gain.
- **Tertiary (Cyber Purple):** Used sparingly for rare items, special events, or accents within gradients to add depth.
- **Surface Neutrals:** Shades of charcoal with slight blue tints are used for background layering to prevent the UI from looking flat.

## Typography

This design system utilizes **Space Grotesk** for headlines and labels to reinforce the technical, futuristic aesthetic. Its geometric quirks provide the "playful" edge required for a digital playground. **Inter** is used for body copy to ensure maximum legibility against dark backgrounds.

Headlines should be set with tight letter-spacing to feel impactful. Labels are frequently uppercase with generous tracking to act as clear signposts in a complex, data-rich environment. Use high-contrast white for primary text and mid-tone grays for secondary information.

## Layout & Spacing

The layout follows a **fluid grid** logic with significant negative space to emphasize the glassmorphism effects. Elements are placed on a strictly enforced 8px rhythm.

- **Desktop:** 12-column grid with 24px gutters. Content is often centered in a "stage" format to mimic a gaming table.
- **Tablet:** 8-column grid with 20px gutters.
- **Mobile:** 4-column grid with 16px margins. 

Containers should use dynamic padding to maintain a "breathable" feel even when data density is high. Use wide margins to draw the eye toward the center of the screen, creating a focused, immersive experience.

## Elevation & Depth

Depth is achieved through **Glassmorphism** and **Tonal Layering** rather than traditional drop shadows.

1.  **Base Layer:** The deepest charcoal background (`#0F0F12`).
2.  **Surface Layer:** Semi-transparent cards (10-15% opacity white/blue tint) with a high `backdrop-filter: blur(20px)`.
3.  **Floating Elements:** Elements at higher elevations receive a 1px "inner glow" border (white at 20% opacity) on the top and left edges to simulate light hitting glass.
4.  **Active Glow:** Interactive elements do not cast shadows; they emit light. Use primary and secondary colors for `box-shadow` glows with 0px offset and large blur radii (20px+) to indicate focus or power-up states.

## Shapes

The shape language is consistently "Rounded" to balance the aggressive neons with a premium, approachable feel.

- **Standard Elements:** Use `0.5rem` (8px) for buttons and inputs.
- **Cards & Modals:** Use `1rem` (16px) to create a distinct frame for glass effects.
- **Interactive Indicators:** Pills and chips use a fully rounded `9999px` radius to stand out as "tokens" or "chips" within the digital playground.

## Components

- **Buttons:** Primary buttons feature a solid neon fill with black text. Secondary buttons are "Ghost" style with a neon border and a subtle glow on hover.
- **Cards:** Defined by their glass effect. They must have a subtle 1px border (`rgba(255,255,255,0.1)`) to separate them from the dark background.
- **Chips:** Styled to look like poker chips when numerical or "status tokens" when used for tags. High-contrast colors with bold Space Grotesk labels.
- **Input Fields:** Darker than the surface background with a focused state that "ignites" the border in Electric Blue.
- **Lists:** Items are separated by low-opacity "etched" lines. Hovering over a list item should trigger a slight background highlight and a primary-colored accent bar on the left edge.
- **Special Component - "The Stake":** A unique card variant for high-priority data that uses a moving gradient border (Primary to Tertiary) to draw immediate attention.