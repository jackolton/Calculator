# Calculator Site — Launch Plan v1

**Drafted:** 2026-04-18
**Owner:** Jack
**Status:** Pre-launch, niche-lock pending
**Time budget assumption:** 8–15 hrs/week

---

## 1. Thesis

Programmatic calculator sites are one of the few SEO plays that still work in 2026 because they map directly to a user need that is hard to hallucinate: arithmetic. Someone searching "DSCR loan calculator" is not looking for a 2,000-word article — they are looking for a number. Deliver that number faster and cleaner than Bankrate, with free-tool stickiness (embed, export, save), and the long-tail keyword supply is effectively unlimited.

The bet is straightforward. Pick a vertical where (a) search intent is transactional or pre-transactional, (b) affiliate payouts are generous, and (c) Google has tolerated programmatic pages that deliver a real tool rather than spun content. Build one well-engineered calculator template, then use AI to produce 50–100 calculators against it — each one a standalone landing page with its own keyword, its own copy, its own affiliate offer. Rank the long tail. Cash on the clicks.

This only works if two things are true. First, every calculator has to actually work and be better than the top-3 competing results — faster page load, zero friction, obvious math, no 800-word intro above the widget. Second, the site has to look and read like a human built it, not like a batch-generated AI farm, because Google's March 2024 / 2025 / 2026 updates have been brutal on pure AI content. The edge is not AI content — it is AI leverage applied to a hand-crafted product shell.

## 2. Niche Recommendation

**Primary recommendation: Real Estate Investor & Small Landlord Calculators.**

This is the right niche for Jack specifically because:

- **Search volume with headroom.** Long-tail keywords like "dscr loan calculator," "1031 exchange timeline calculator," "seller financing calculator," "rental vs refi calculator," "syndication waterfall calculator," and "brrrr calculator" range from 500 to 30,000 monthly searches with keyword difficulty scores well under 40. BiggerPockets dominates the head terms but leaves the long tail wide open.
- **Affiliate payouts are fat.** DSCR loan lenders pay $200–600 per funded lead. Landlord insurance pays $50–150 per quote. Property management software (Stessa, Baselane, RentRedi) pay $10–40 per signup. Tax software (Keeper, Avalara) pays 20–30% rev share. Mortgage refinance leads pay $150–400. One or two funded DSCR leads a month covers the hosting bill ten times over.
- **Jack's domain knowledge applies without touching R4 IP.** LIHTC expertise does not transfer directly, but the underlying financial mechanics (DCF, IRR, waterfall, cap rate, refinance break-even, cash-on-cash, yield-on-cost) translate one-to-one to individual real estate investing. He can talk about these calculations as a finance professional, not a bro.
- **Competitor calc UX is bad.** BiggerPockets hides their best calcs behind a Pro paywall. Bankrate's calcs are buried under six ads and three chat pop-ups. NerdWallet's designs are fine but generic. There is real whitespace for a fast, clean, purpose-built tool.

**Secondary option to consider: Finance-Professional Quick-Check Calculators.**

Niche audience (finance students, junior analysts, small-fund associates) but maximum domain leverage: LBO quick-check, DCF shortcut, IRR/MOIC, waterfall mechanics, back-of-envelope fund economics. Affiliates are thin but high-AOV (Wall Street Prep, Breaking Into Wall Street, CFA prep). Hard mode — audience is smaller and savvier, Google searches are lower volume. Better as a side-site or subsection, not the main bet.

**What I'd stop worrying about:** personal finance head terms. NerdWallet, Bankrate, and The Calculator Site own those. You will not rank for "mortgage calculator" or "401k calculator" in this decade. Don't try.

**Decision to lock by end of Week 1:** Real estate investor (recommended) vs. finance-pro vs. a different vertical Jack knows well enough to out-write.

## 3. Shape of the Business

Concretely, the product is one domain with 50–100 pages. Every page follows the same pattern:

1. Calculator widget above the fold, working in under 200ms, mobile-first.
2. Inputs default to a reasonable example so the user sees a result without typing.
3. One affiliate CTA immediately below the result, contextual to what they just calculated (e.g., "Your cash-on-cash is 8.2%. See DSCR loan rates from Kiavi →").
4. 400–600 words below the fold: how the calculation works, when to use it, common mistakes, worked example. Written in analyst voice, not "in today's fast-paced world" voice.
5. FAQ block with schema markup.
6. Related calculators grid (internal linking).
7. Embed code snippet ("use this calc on your site") — this is the backlink flywheel.

Users arrive from Google, do the calculation, click an affiliate link or an ad, leave. A small subset subscribes to an email list in exchange for a spreadsheet version. The email list becomes a newsletter that cross-sells higher-ticket affiliate products (mortgage refi, tax prep, investor courses).

## 4. Moat / Differentiation

Being just another calculator site is a losing game. The three moats that are actually defensible:

**Speed and UX.** Astro static build, zero JavaScript framework on the calculator page except the calc itself, preact for state, < 50KB gzipped. Bankrate loads in 6 seconds. This site loads in under one.

**Embed flywheel.** Every page has a copy-paste iframe embed. When real estate bloggers, agents, and investor coaches embed it on their sites, the footer backs-links to the source calc. Free, compounding, on-topic backlinks — the only SEO asset that still matters.

**Analyst-grade math.** Actually correct, with edge cases handled (amortization with extra principal payments, 1031 exchange 45/180 day rules, reinvested proceeds, marginal tax stacking). Most calculator sites are wrong in subtle ways. Being right is a differentiator.

**Sectioned narrative for each calc.** Not 3,000-word bloated articles — 500 crisp words written like a senior analyst explaining it to a junior. This is the AI writing angle: AI drafts the scaffold, Jack edits it to not sound like AI.

## 5. Tech Architecture

**Stack:**

- **Framework:** Astro (static site generator, zero JS by default, island architecture for interactive calcs).
- **Hosting:** Cloudflare Pages (free tier, unlimited bandwidth, fast global CDN). Fall back to Vercel if Cloudflare gets fussy.
- **Calc components:** Preact or Vanilla JS, one shared `<Calculator>` wrapper that reads a JSON spec per calc.
- **Styling:** Tailwind CSS, inheriting the navy/blue palette from the personal dashboard design system for visual consistency across Jack's portfolio.
- **Content:** Markdown + frontmatter per calc page. Frontmatter drives the calc config; markdown drives the explainer content.
- **Analytics:** Plausible or Cloudflare Analytics (no cookie banner nonsense).
- **Email capture:** ConvertKit free tier (up to 1,000 subs) or Buttondown.
- **Embed widget:** Pre-built iframe snippet per calc, hosted on a `/embed/*` route.

**Calculator template spec (JSON-driven):**

```json
{
  "slug": "dscr-loan-calculator",
  "title": "DSCR Loan Calculator",
  "inputs": [
    { "id": "price", "label": "Purchase Price", "type": "currency", "default": 300000 },
    { "id": "rent", "label": "Monthly Rent", "type": "currency", "default": 2800 },
    { "id": "rate", "label": "Interest Rate", "type": "percent", "default": 7.5 },
    ...
  ],
  "formula": "function(inputs) { ... return { dscr: ..., maxLoan: ..., cashFlow: ... } }",
  "affiliate": {
    "partner": "kiavi",
    "cta": "See DSCR loan rates →",
    "url": "https://kiavi.com/?ref=..."
  }
}
```

One calculator template component reads the spec and renders. Adding a new calc is "write a JSON spec + a formula function + a markdown explainer" — no new code. Claude handles the JSON spec, the formula draft, and the explainer. Jack reviews and ships.

**Domain + branding:** Lock a clean, brandable domain during week 1. Avoid `exactkeyword.com` domains — Google deprioritized those years ago. Options to explore:

- `carrycalc.com` (finance/carry-the-interest vibe)
- `ledgerlane.com`
- `sharpeno.com`
- `runratetools.com`
- `investorcalcs.co`
- Use `namelix.com` or Claude for more.

Budget: $12 for the domain, $0 for hosting in year one.

## 6. SEO & Content Strategy

**Keyword layer.**

Build the initial 100-calc list by:

1. Pulling every real-estate-calculator keyword from Ahrefs / Semrush free trials or Keyword Planner. Filter: volume > 100, KD < 40.
2. Checking the current top-3 SERP results — if it's BiggerPockets pro-locked, Bankrate bloated, or a dead 2015 blog, it's a target.
3. Grouping into "calculator families" so one spec template serves multiple calcs (an amortization engine powers ~15 calcs alone).

**Content layer.**

Every page has: one H1 (the calc name), one H2 per section (how it works, when to use, common mistakes, worked example, FAQ, related calcs). Schema markup: `SoftwareApplication`, `FAQPage`, `BreadcrumbList`. Worked examples use real numbers that match the default inputs, so the copy "pre-explains" what the user is about to see.

**Backlink layer.**

- Embed widget (primary source of backlinks, the flywheel).
- Guest posts on mid-tier real estate blogs (BiggerPockets forums, InvestmentNews, small landlord subreddits).
- HARO / Connectively for quote placements — Jack's analyst background is a real credential here.
- Reddit: /r/realestateinvesting, /r/landlord, /r/realestate — answer specific calculation questions, link to the specific calc. Be useful, don't spam.
- Podcast guesting in month 4–6 once there are actual numbers to talk about.

**Technical SEO baseline:** sitemap.xml, robots.txt, correct canonicals, Open Graph tags, hreflang if international, 100/100 Core Web Vitals (Astro makes this trivial), structured data validation.

## 7. Monetization

**Tier 1 — Affiliates (primary revenue for months 1–6).**

Sign up for these in Week 3, after the first 20 calcs are live:

- **DSCR loan lenders:** Kiavi, Visio Lending, Lima One, RCN Capital. Payouts $200–600 per funded loan, $50–100 per qualified app.
- **Landlord insurance:** Steadily, Obie. $40–150 per quote.
- **Mortgage refinance:** Credible, LendingTree partner network. $150–400 per lead.
- **Property management software:** Stessa (free tier, $10–20 per signup), Baselane, RentRedi, Avail.
- **Tax / accounting:** Keeper Tax, Collective, FreshBooks. 20–30% rev share.
- **Real estate education:** BiggerPockets Pro ($50-ish per signup), syndication courses.

**Tier 2 — Display ads (kicks in at traffic thresholds).**

- Month 1–6: AdSense placeholders only.
- At 10,000 sessions/month: apply to **Ezoic** (Level 1, minimal traffic requirement). RPM ~$10–15.
- At 50,000 sessions/month: apply to **Mediavine** / new name "Journey by Mediavine". RPM ~$20–40.
- At 100,000+ sessions: **Raptive** (formerly AdThrive). RPM ~$30–50.

Don't run ads above the fold of the calculator. Protect UX. Ads below the explainer content and in a sidebar on desktop only.

**Tier 3 — Email list + direct product.**

- Capture emails via "download as spreadsheet" lead magnet on every calc.
- Weekly "deal math" newsletter — one real deal broken down with the calc links.
- Eventually: a paid product. Most likely: a $29 Excel/Google Sheets pack ("The 12 Deal Models Every Real Estate Investor Actually Uses") or a $99 mini-course on rental underwriting.

**Revenue projections (realistic, not bro-math):**

- **Month 3:** $50–300. Mostly Amazon-tier affiliates on early traffic.
- **Month 6:** $500–2,000. DSCR lender funnel starts paying. First ad approval.
- **Month 9:** $1,500–5,000. 60–80 calcs indexed, one or two calcs getting real volume.
- **Month 12:** $3,000–12,000 in the upside case. $500–1,500 if ranking stalls.

The wide spread is honest. Programmatic SEO is a power-law game — two or three calcs will do 80% of the revenue, the rest are ballast. The skill is spotting the winners by month 4 and doubling down.

## 8. Risk & Realism

What can kill this:

**Google deprioritizes AI-content sites, again.** The March 2024, 2025, and 2026 "helpful content" updates have all targeted exactly this playbook. Mitigation: the calculators themselves are not AI content — they are tools. The copy around them must be hand-edited to analyst voice. No "in today's rapidly evolving real estate market" sentences. Ever.

**The embed flywheel doesn't start.** If no one embeds the calcs, backlinks don't accrue, and the site stalls at page 3 for long-tail. Mitigation: outreach to 50 small real estate blogs in month 2–3 with a "free embeddable calc for your site" pitch. Track response rate. If under 5%, pivot the positioning.

**Affiliate programs reject the application.** DSCR lenders vet partners. A brand-new site with 10 pages won't pass. Mitigation: apply at month 3, not month 1. Use Impact, ShareASale, FlexOffers as proxy networks that are more lenient while the site ramps.

**Time runs out.** Jack has 8–15 hrs/week and three other active projects (personal dashboard, work journal, day job at R4). Calc-site build phases need to be time-boxed hard. Mitigation: the 30/60/90 below treats this as a disciplined 90-day sprint, not an indefinite build.

**The niche is wrong.** If real estate investor calcs are already saturated by month 6, pivot. The tech stack and template are niche-agnostic — can be re-skinned to any vertical in a week.

**YMYL (Your Money, Your Life) quality bar.** Financial calculators are YMYL. Google expects author credentials, E-E-A-T signals. Mitigation: a real author bio page with Jack's LinkedIn, analyst background, and disclosure that he is a finance professional (without tying to R4 by name).

## 9. 30 / 60 / 90 Plan

**Days 1–30 — Foundation and First 15 Calcs.**

- Week 1: Lock niche. Register domain. Set up Cloudflare Pages + Astro scaffold. Build calculator template component.
- Week 2: Ship first 5 calcs end-to-end (Cap Rate, Cash-on-Cash, Mortgage with Extra Principal, DSCR, 1% Rule). Each fully polished. Submit sitemap to Google Search Console.
- Week 3: Ship next 10 calcs. Sign up for first affiliate programs (Stessa, Baselane, Impact network — easier approvals). Install Plausible analytics.
- Week 4: Build embed widget system. Outreach to 10 real estate blogs offering free embeds. Write first LinkedIn post announcing the project (no link, warm audience first).

Target by day 30: 15 live calcs, 2 affiliate programs approved, 0–5 backlinks, 200–500 impressions in Search Console.

**Days 31–60 — Scale Content and Start Earning.**

- Week 5: Ship 10 more calcs. Apply to DSCR lenders (Kiavi, Visio, Lima One). Apply to Credible.
- Week 6: Ship 10 more calcs. First guest post pitch to BiggerPockets or a smaller RE blog. Start answering specific calc questions on Reddit with calc links.
- Week 7: Ship 10 more calcs. First iteration — look at Search Console, find calcs ranking 11–20, improve those pages specifically (more internal links, expanded FAQ, refresh schema).
- Week 8: Ship 5 more calcs (quality over quantity now). First email capture live. First weekly "deal math" newsletter to list of 10+ subscribers.

Target by day 60: 50 live calcs, 4–6 affiliate programs approved, 10–25 backlinks, 2,000–8,000 Search Console impressions, first dollar earned.

**Days 61–90 — Double Down and Decide.**

- Week 9: Audit — which 5 calcs are driving traffic? Rebuild those pages to be the best in the SERP. Add worked examples, downloadable Excel versions, video explainers if warranted.
- Week 10: Ship 10 more calcs, targeted at keyword gaps identified in week 9. Apply to Ezoic (if over 10k sessions) or stay with affiliate-only.
- Week 11: Outreach sprint. Podcast pitches, Reddit AMAs, LinkedIn newsletter cross-promote. Aim for 5 quality backlinks.
- Week 12: Decide. If month-3 revenue is trending toward $1K+/month and rankings are climbing → scale to 100 calcs and hire a VA for outreach. If trending flat → pivot niche or pivot business.

Target by day 90: 70+ live calcs, $500–2,000 month-3 revenue, 25–75 backlinks, one calc on page 1 of Google for its primary keyword.

## 10. Week 1 Action Items

This week — nothing else matters:

1. **Niche lock.** Green-light real estate investor niche or propose an alternative by Wednesday.
2. **Domain shortlist.** I'll generate 20 candidate names, you pick three, check availability, register one.
3. **Initial calc backlog.** I'll draft a list of the first 20 calculators with keyword hypotheses and affiliate angles.
4. **Tech scaffold.** Astro + Cloudflare Pages + one working `<Calculator>` component, checked into a GitHub repo, deployable with a git push.
5. **Template calc.** One fully-polished calc (Cap Rate) live on the production domain by end of week. This becomes the pattern for the other 99.

## 11. Decisions Required From Jack

- **Niche:** Real estate investor (recommended) / finance professional / alternative you'd rather pursue.
- **Domain budget:** $12 for a .com vs. willing to spend $50–200 on a premium aftermarket name? Premium names help with branding and flywheel.
- **Identity:** Do you want to publish under your real name (E-E-A-T signal) or a brand-only persona (faceless)? Publishing under your name is stronger for YMYL content. No R4 IP concerns as long as you're not citing LIHTC-specific data.
- **Time allocation:** Confirming 8–15 hrs/week for this and roughly how that trades off against the personal dashboard and journal. First 4 weeks are front-loaded (~12 hrs/wk); weeks 5–12 average lower (~8 hrs/wk).
- **Email list front-end:** OK with ConvertKit free tier? Buttondown is an alternative if you want markdown-first.

Answer these five questions and Week 1 execution starts.

---

**Next deliverables I'll produce when you green-light niche:**

- `Calculator-Site_Calculator-Backlog_v1.xlsx` — 50+ calc candidates, keyword volume hypotheses, difficulty, affiliate match.
- `Calculator-Site_Domain-Shortlist_v1.md` — 20 brandable domain candidates with availability check.
- `Calculator-Site_Tech-Scaffold_v1/` — the actual Astro repo, ready to git init.
- `Calculator-Site_Cap-Rate-Calc_v1.html` — the reference implementation to use as the template.
