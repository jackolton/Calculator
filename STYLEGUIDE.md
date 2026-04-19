# REI Calcs — Style Guide

Inspired by Google Drive's Material Design 3 visual language. Every design decision below maps to a Drive UI pattern.

---

## Color Palette

| Token | Hex | Drive analog |
|---|---|---|
| `--color-primary` | `#1a73e8` | Google blue — buttons, links, active states, primary output |
| `--color-primary-dk` | `#1557b0` | Button pressed / hover |
| `--color-primary-lt` | `#e8f0fe` | Selected-item tint — results card background |
| `--color-primary-border` | `#c5d8f7` | Results card border |
| `--color-surface` | `#ffffff` | Cards, nav bar, inputs |
| `--color-bg` | `#f8f9fa` | Page background — Drive's "canvas" |
| `--color-border` | `#dadce0` | All card and input borders |
| `--color-divider` | `#e8eaed` | Horizontal rules, nav bottom border |
| `--color-hover` | `#f1f3f4` | Row/item hover state |
| `--color-text` | `#202124` | Primary body text |
| `--color-text-muted` | `#5f6368` | Labels, secondary text, placeholders |
| `--color-text-hint` | `#80868b` | Input placeholder |
| `--color-success` | `#34a853` | Google green — positive signal |
| `--color-warning` | `#fbbc04` | Google yellow — caution |
| `--color-error` | `#ea4335` | Google red — error states |

**Never** use raw Tailwind color names (slate-200, blue-600, etc.) directly in components. Always go through a CSS token.

---

## Typography

Font stack: **Inter** → system-ui → sans-serif (closest public match to Google Sans)

| Role | Size | Weight | Usage |
|---|---|---|---|
| Display | `1.75rem` / 28px | 400 | Page `<h1>` |
| Title Large | `1.25rem` / 20px | 500 | `<h2>`, section headers |
| Title Medium | `1rem` / 16px | 500 | `<h3>`, widget subheadings |
| Body | `0.875rem` / 14px | 400 | All body copy |
| Label | `0.75rem` / 12px | 500 | Input labels, badges — uppercase + letter-spacing |
| Result Primary | `2.25rem` / 36px | 600 | Primary calculator output |
| Result Secondary | `1.125rem` / 18px | 500 | Secondary outputs |

All numeric outputs: `font-variant-numeric: tabular-nums`

h1 weight is intentionally **400** — Drive uses light-weight display text, not bold headers.

---

## Spacing

8px base grid. Use: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.

- Page max-width: `1024px`
- Calculator/content max-width: `672px`
- Nav app bar height: `64px`
- Card internal padding: `20px` (default), `24px` (calculator widget)
- Section vertical gap: `40px`

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Text inputs |
| `--radius-md` | `8px` | Cards, dropdowns, FAQ items |
| `--radius-lg` | `12px` | Results panel, embeds |
| `--radius-pill` | `9999px` | Primary CTA buttons, chips |

---

## Elevation

Two levels only. Never stack shadows or use colored shadows.

| Token | Value | When |
|---|---|---|
| `--shadow-card` | `0 1px 2px rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)` | Card at rest |
| `--shadow-lift` | `0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)` | Card on hover |

---

## Components

### App Bar (Nav)
- Height `64px`, `background: var(--color-surface)`, `border-bottom: 1px solid var(--color-divider)`
- Sticky, `z-10`
- Logo: `18px / weight 500 / color --color-text` — no decoration
- "All Calcs": `14px / weight 500 / color --color-text-muted` — right-aligned
- Dropdown: `border-radius: var(--radius-md)`, `box-shadow: var(--shadow-lift)`

### Cards
- `background: var(--color-surface)`
- `border: 1px solid var(--color-border)`
- `border-radius: var(--radius-md)`
- `box-shadow: var(--shadow-card)`
- Hover: `box-shadow: var(--shadow-lift)`, transition 150ms

### Buttons

**Primary (filled):**
- `background: var(--color-primary)`, `color: #fff`
- `border-radius: var(--radius-pill)` — pill shape is non-negotiable
- `padding: 8px 24px`, `font-size: 14px / weight 500`
- Hover: `background: var(--color-primary-dk)`

**Secondary (outlined):**
- `border: 1px solid var(--color-border)`, `color: var(--color-primary)`
- Same pill shape
- Hover: `background: var(--color-primary-lt)`

**Text button:**
- No border/background, `color: var(--color-primary) / weight 500`

### Text Inputs
- `height: 40px`, `border: 1px solid var(--color-border)`, `border-radius: var(--radius-sm)`
- Focus: `border-color: var(--color-primary)`, `box-shadow: 0 0 0 2px var(--color-primary-lt)`
- Placeholder: `color: var(--color-text-hint)`
- Prefix/suffix ($, %): `color: var(--color-text-muted)`

### Results Panel
- `background: var(--color-primary-lt)` — Drive's "selected" blue tint
- `border: 1px solid var(--color-primary-border)`
- `border-radius: var(--radius-lg)`
- Primary number: `2.25rem / weight 600 / color: var(--color-primary)`
- Primary label: `12px / uppercase / letter-spacing / color: var(--color-text-muted)`
- Divider between primary and secondary: `var(--color-primary-border)`
- Secondary label: `var(--color-text-muted)`, value: `var(--color-text) / weight 500`

### Affiliate CTA
- `background: var(--color-surface)`, `border: 1px solid var(--color-border)`, `border-radius: var(--radius-md)`
- Headline: `14px / color: var(--color-text)`
- Button: primary pill style

### FAQ Accordion
- Each item: `background: var(--color-surface)`, `border: 1px solid var(--color-border)`, `border-radius: var(--radius-md)`
- Question: `14px / weight 500 / color: var(--color-text)`
- Chevron: `color: var(--color-text-muted)`, rotates 180° on open
- Answer: `14px / color: var(--color-text-muted) / line-height 1.6`
- Gap between items: `8px` (not fused borders)

### Related Calcs
- Grid: `gap-3`, `sm:grid-cols-2`
- Card: standard card + card-hover
- Icon container: `40px × 40px`, `background: var(--color-primary-lt)`, `border-radius: var(--radius-md)`
- Icon: `color: var(--color-primary)`
- Title: `14px / weight 500`
- Hover title: `color: var(--color-primary)`

---

## Do / Don't

**Do:**
- `#f8f9fa` as page background — never pure white at the body level
- Pill-shaped primary CTAs always
- `#dadce0` for all card and input borders — not Tailwind's slate-200/slate-300
- Two shadow levels max
- Display results immediately on load with default inputs pre-filled

**Don't:**
- Use any dark surface (navy, charcoal) as a card background
- Place display ads above the calculator
- Use font weights above 600 on any UI element
- Round inputs to more than `4px`
- Add color fills to cards beyond white or `#e8f0fe`
