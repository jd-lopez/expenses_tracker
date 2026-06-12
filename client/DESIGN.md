---
name: Deep Indigo Finance
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#95002b'
  on-tertiary: '#ffffff'
  tertiary-container: '#bf0f3c'
  on-tertiary-container: '#ffd0d2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b7'
  on-tertiary-fixed: '#40000d'
  on-tertiary-fixed-variant: '#92002a'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  currency-display:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style

The design system is anchored in a **Modern Minimalist** aesthetic, optimized for clarity and financial confidence. It targets professional users who value efficiency and precision. The emotional response is one of "ordered vitality"—where the seriousness of financial management meets the energetic feedback of vibrant accents. 

The style utilizes generous whitespace to reduce cognitive load, paired with subtle depth cues to establish a clear information hierarchy. Interaction patterns are snappy and functional, avoiding unnecessary flourish in favor of a utilitarian but premium feel.

## Colors

The palette is structured around a high-contrast foundation. **Deep Indigo** serves as the primary brand anchor for actions and navigation. **Emerald** and **Rose** are reserved strictly for semantic financial status—inflow and outflow respectively—ensuring immediate data recognition.

In **Light Mode**, we prioritize a "paper-white" clarity with soft slate-gray borders. In **Dark Mode**, the interface shifts to a deep navy foundation, using layered surface tones (from `#0F172A` to `#334155`) to define depth rather than relying on heavy outlines.

## Typography

This design system employs **Inter** for all primary interface elements to ensure maximum legibility and a neutral, modern tone. Financial figures are given distinct treatment: large currency displays use tighter letter-spacing and heavier weights to emphasize balance totals.

**JetBrains Mono** is introduced as a secondary label font for transaction IDs, timestamps, and secondary metadata to provide a subtle "ledger" or technical feel that distinguishes data attributes from narrative text.

## Layout & Spacing

The layout follows a **12-column fluid grid** for desktop and a **single-column fluid layout** for mobile. We use a 4px base unit for all spatial relationships. 

- **Desktop:** 24px gutters with 40px outer margins. Content is centered with a max-width of 1200px.
- **Mobile:** 16px horizontal margins. Transactions list items span the full width to maximize horizontal scanning space for currency values.
- **Vertical Rhythm:** Content groups are separated by 24px (lg), while internal component elements use 8px (sm) or 12px (md) spacing.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and tonal layering. 

In light mode, primary cards use a soft, diffused shadow: `0px 4px 20px rgba(15, 23, 42, 0.05)`. Elements at a higher elevation (like modals) use a more pronounced `0px 10px 30px rgba(15, 23, 42, 0.1)`.

In dark mode, shadows are largely replaced by **Tonal Layers**. The background is the lowest level, with cards and inputs using the `surface` and `surface-variant` colors to "lift" them visually. A 1px subtle inner stroke is used on cards in dark mode to define edges without increasing visual noise.

## Shapes

The design system utilizes a **Rounded** shape language to soften the density of financial data. 

- **Primary Cards:** 1rem (16px) corner radius.
- **Buttons & Inputs:** 0.5rem (8px) corner radius.
- **Small Badges/Chips:** 2rem (Pill-shaped) to distinguish them from interactive buttons.

This creates a approachable, tactile feel that differentiates the product from more rigid, traditional banking software.

## Components

### Buttons
Primary buttons use the Deep Indigo background with white text. Ghost buttons use the primary color for text and no border, unless they are secondary actions which use the `border` token.

### Transaction Lists
List items are clean and borderless, separated by a 1px `border` line or simple vertical whitespace. The amount is always right-aligned, using Emerald for positive and Rose for negative values.

### Category Cards
Cards for expense categories (e.g., Food, Transport) should feature a subtle 40x40px icon container with a 10% opacity background of the category color.

### Data Visualization
Charts should use simplified line weights (2px-3px) with soft gradients (area charts). Use the primary Deep Indigo for neutral trends, Emerald for growth, and Rose for decline.

### Input Fields
Inputs use the `surface` token for background color with a 1px `border`. On focus, the border transitions to Deep Indigo with a 2px outer glow (ring) of 20% opacity.