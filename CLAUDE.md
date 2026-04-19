# Calculator Site — Project Operating Manual

## What this is

A programmatic SEO calculator site targeting long-tail real estate investor keywords. 50–100 narrow calculators on one domain, each a standalone landing page. Monetized via affiliate links (DSCR lenders, landlord insurance, property management SaaS) and display ads (Ezoic → Mediavine → Raptive as traffic scales).

The calculator is the product. The written content exists to rank the calc. Every page must (1) load in under 1 second, (2) do the math correctly, (3) be embeddable on third-party sites via iframe.

## Tech stack

- **Framework:** Astro (static site generation, zero JS on non-interactive pages).
- **Interactive islands:** Preact inside Astro components for the calculator widgets.
- **Styling:** Tailwind CSS. Navy/blue palette — see `src/styles/tokens.css` for the full design system. Match visual language to other projects in Jack's portfolio (personal dashboard, journal).
- **Deployment:** Cloudflare Pages, auto-deploys from `master` branch on every `git push`.
- **Analytics:** Plausible (cookie-less, no banner needed).
- **Email capture:** ConvertKit free tier, embedded via `<script>` tag on relevant calcs.

## Project structure

```
calculator-site/
├── CLAUDE.md                     ← this file; read first every session
├── README.md
├── .claude/
│   ├── settings.json
│   └── commands/                 ← custom slash commands
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── public/                       ← static assets (favicon, og images, robots.txt, sitemap)
└── src/
    ├── calcs/                    ← one JSON file per calculator — THE source of truth
    │   └── cap-rate.json
    ├── components/
    │   ├── Calculator.astro      ← generic calc wrapper that reads a JSON spec
    │   ├── CalculatorForm.tsx    ← interactive form (Preact island)
    │   ├── AffiliateCTA.astro
    │   ├── FAQBlock.astro
    │   └── RelatedCalcs.astro
    ├── content/                  ← markdown explainer content per calc (one file per calc)
    │   └── cap-rate.md
    ├── layouts/
    │   └── CalcLayout.astro      ← page layout: nav, calc, content, footer
    ├── pages/
    │   ├── index.astro
    │   ├── [slug].astro          ← dynamic route that renders any calc from its JSON spec
    │   └── embed/[slug].astro    ← iframe-embeddable bare version of each calc
    ├── lib/
    │   ├── formulas/             ← one .ts file per calc with the math function
    │   └── schema.ts             ← helpers for JSON-LD structured data
    └── styles/
        └── tokens.css            ← CSS custom properties (design system)
```

## How calculators are specified

Each calc is one JSON file in `src/calcs/`, one markdown file in `src/content/`, and one formula function in `src/lib/formulas/`. The dynamic route `src/pages/[slug].astro` wires them together — so adding a new calc never requires touching a page file.

**JSON spec shape** (`src/calcs/<slug>.json`):

```json
{
  "slug": "cap-rate-calculator",
  "title": "Cap Rate Calculator",
  "h1": "Cap Rate Calculator",
  "metaTitle": "Cap Rate Calculator — Free Real Estate Investor Tool",
  "metaDescription": "Calculate capitalization rate for rental property in 10 seconds. Free, no signup.",
  "primaryKeyword": "cap rate calculator",
  "relatedCalcs": ["cash-on-cash-calculator", "gross-rent-multiplier-calculator"],
  "inputs": [
    { "id": "price", "label": "Purchase Price", "type": "currency", "default": 300000, "min": 0 },
    { "id": "grossRent", "label": "Monthly Rent", "type": "currency", "default": 2800, "min": 0 },
    { "id": "expenseRatio", "label": "Operating Expenses (% of rent)", "type": "percent", "default": 40, "min": 0, "max": 100 }
  ],
  "outputs": [
    { "id": "capRate", "label": "Cap Rate", "format": "percent", "highlight": true },
    { "id": "noi", "label": "Net Operating Income (annual)", "format": "currency" }
  ],
  "formula": "capRate",
  "affiliate": {
    "partner": "stessa",
    "headline": "Track this property's performance for free",
    "cta": "Open a Stessa account →",
    "url": "https://stessa.com/?ref=REPLACE_ME"
  }
}
```

**Formula shape** (`src/lib/formulas/cap-rate.ts`):

```typescript
export function capRate(inputs: Record<string, number>) {
  const { price, grossRent, expenseRatio } = inputs;
  const annualGross = grossRent * 12;
  const noi = annualGross * (1 - expenseRatio / 100);
  const capRate = (noi / price) * 100;
  return { capRate, noi };
}
```

**Markdown explainer** (`src/content/cap-rate.md`):

Four sections, in this order, no exceptions:
1. `## How it works` — 2–3 short paragraphs explaining the formula in plain English.
2. `## When to use it` — bullet list or short paragraph of real use cases.
3. `## Common mistakes` — 3–5 specific errors investors make with this metric.
4. `## Worked example` — real numbers matching the default inputs, step by step.

After those four, a FAQ block (rendered from frontmatter, generates `FAQPage` schema).

## Writing voice — rules

This is non-negotiable. Google penalizes AI-sounding content. Human-editor voice is the product edge.

**Avoid these words and phrases completely:**
delve, crucial, landscape, leverage, testament, underscores, highlights the importance, in today's world, stands as, serves as, pivotal, key role, in the ever-evolving, it's important to note, represents a shift, transformative, unlock, navigate, ensure, robust, comprehensive, tailored.

**Write like this:**
- Short sentences when making a point. Longer only when nuance requires it.
- Numbers and specifics, not adjectives. "8.2% cap rate on a $300K duplex" beats "attractive return."
- Direct second person. "You compare" not "one compares."
- Name the edge case. Explain what goes wrong and when.
- Assume the reader is a smart investor, not a beginner. Don't define "NOI" five times on one page.

**Length targets:**
- Meta title: 50–60 characters.
- Meta description: 140–158 characters.
- Page copy total: 500–700 words. Longer only if the topic genuinely requires it.

## SEO requirements (every page)

Every calc page must have:

1. One `<h1>` matching the target keyword (e.g., "Cap Rate Calculator").
2. `<title>` and `<meta name="description">` filled from the JSON spec.
3. JSON-LD structured data of types:
   - `SoftwareApplication` (the calc itself)
   - `FAQPage` (from the FAQ block)
   - `BreadcrumbList` (home → calcs → this calc)
4. Canonical URL pointing to itself.
5. Open Graph and Twitter Card tags with a unique preview image (generate a simple SVG per calc in `public/og/<slug>.svg`).
6. Internal links to 3–5 related calcs in a `<RelatedCalcs>` block.
7. An embed snippet block (`<pre><code>`) showing how third parties can iframe the calc.

Verify via `schema.org/validator` and Google's Rich Results Test before shipping new calcs.

## Calc page layout (above the fold)

Order matters. This is the layout that maximizes affiliate revenue without tanking rankings:

1. Thin top nav (logo left, "All Calcs" dropdown right).
2. `<h1>`.
3. One sentence tagline (from JSON: `metaDescription`).
4. **The calculator widget.** Always visible on first paint. Inputs pre-filled with sensible defaults so results display immediately.
5. Results card. Primary output highlighted. One affiliate CTA immediately below, contextual to the result.
6. "Copy embed code" button.
7. Below the fold: the four explainer sections, FAQ, related calcs, footer.

**Never:**
- Put a display ad above the calculator.
- Show a cookie banner, email popup, or paywall on first load.
- Require interaction to see any result.

## Performance targets

- Lighthouse: 100 Performance, 100 SEO, 100 Accessibility, 100 Best Practices. If a calc drops below 95 on any dimension, fix before shipping.
- First Contentful Paint: < 0.8s on 4G.
- Total JavaScript on a calc page: < 50KB gzipped.
- No third-party script on the calc page except Plausible (1KB, async) and the affiliate link itself (no SDK — direct href only).

## Affiliate link rules

- Always `rel="sponsored nofollow"` on affiliate links.
- One primary CTA per calc, placed immediately after the result.
- Secondary CTA optional, in the explainer content, only when contextually relevant.
- Never inject affiliate links into the worked example numbers.
- Disclose affiliate relationships in a footer link ("How we make money") — single page, linked from every page footer.

## Commit conventions

Short, imperative mood. First letter lowercase. No period.

- `add cap rate calculator`
- `fix dscr formula edge case when income is zero`
- `improve related calcs internal linking`
- `draft explainer for 1031 exchange calculator`

When the `/ship` command is used, Claude should generate a commit message in this style unless the user specified one.

## Backlog

Calc backlog lives in `backlog/calculators.md` (create if missing). Each entry:
- Slug
- Primary keyword + estimated monthly search volume
- Difficulty hypothesis (low/med/high)
- Affiliate match
- Status: not-started / draft / shipped

When a new calc is finished, update the status. When `/new-calc` is invoked, pull the next "not-started" entry unless the user specifies.

## When in doubt

Read `README.md` for the current state of the project. Check `git log --oneline -20` for recent direction. Check open issues on GitHub via `gh issue list`.

When uncertain about math correctness, calculate the same result three different ways (manually, via the formula function, via a spreadsheet) and compare. A wrong calculator is worse than no calculator.
