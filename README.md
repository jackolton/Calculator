# Calculator Site

Programmatic SEO calculator site for real estate investors. 50–100 narrow calculators on one domain, monetized via affiliate links and display ads.

## Stack

- [Astro](https://astro.build) — static site generator
- Preact — interactive calculator widgets (islands architecture)
- Tailwind CSS — styling
- Cloudflare Pages — hosting and auto-deploy from `main`
- Plausible — analytics

## Development

```bash
npm install          # first time only
npm run dev          # start local dev server at http://localhost:4321
npm run build        # production build to ./dist
npm run preview      # serve the production build locally
```

## Project conventions

All project rules (tech structure, writing voice, SEO requirements, calc specification format) live in [`CLAUDE.md`](./CLAUDE.md). Read that before making changes.

## Working with Claude Code

This repo is set up for use with [Claude Code](https://docs.claude.com/en/docs/claude-code/overview). To start a session:

```bash
claude
```

Custom slash commands for this project:

- `/new-calc <slug>` — scaffold a new calculator (JSON spec + formula + markdown + page).
- `/seo-audit <slug>` — audit a calc page against the SEO checklist.
- `/ship "<commit message>"` — stage, commit, push, and trigger auto-deploy.

## Deployment

Pushes to `main` auto-deploy via Cloudflare Pages. Preview URL is shown in the Cloudflare Pages dashboard. Custom domain configured under Pages → Custom Domains.

## Structure

```
src/calcs/               — one JSON spec per calc
src/content/             — one markdown explainer per calc
src/lib/formulas/        — one formula function per calc
src/pages/[slug].astro   — dynamic route rendering any calc from its spec
```

See `CLAUDE.md` for the full directory map and what each piece does.

## License

Proprietary. Not for redistribution.
