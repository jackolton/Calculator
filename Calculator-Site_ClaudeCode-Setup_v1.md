# Calculator Site — Claude Code Setup Walkthrough

**For:** Total beginner on macOS using VSCode, with no prior Git, GitHub, or Claude Code experience.
**Time:** ~90 minutes end-to-end (one-time), then ~2 minutes to start any working session.
**Goal:** Go from zero to a working Claude Code project that auto-deploys to the internet when you push changes.

---

## What you're about to do

You'll set up three things on your Mac: Claude Code (the AI tool that edits code for you), Git + GitHub (the place your code lives and backs up to), and a Cloudflare Pages connection (which automatically publishes your site every time you save changes). Then you'll create the Calculator Site project, drop in the instruction files I've prepared, and start building.

After the one-time setup, your daily workflow is: open VSCode → open terminal → type `claude` → tell it what to build → review the changes → type `/ship` → and it's live on the internet.

---

## PART 1 — One-time machine setup (~45 min)

### 1.1  Create a GitHub account (if you don't have one)

Go to **github.com**, click Sign Up. Use `jolton19@gmail.com` or a personal email. Pick a username — this will appear in URLs for the rest of your life, so pick something clean (e.g., `jackolton`). Free tier is all you need.

**Check:** You can log in to github.com and see your profile page.

### 1.2  Install Homebrew

Homebrew is the "app store for terminal tools." Everything below installs through it.

Open **Terminal** (Cmd+Space, type "Terminal", Enter). Paste this and hit Enter:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

It'll ask for your Mac password (the one you use to unlock your laptop). Type it — you won't see any characters as you type, that's normal. Hit Enter.

This takes 5–10 minutes. When it finishes, it'll print two commands at the bottom — something like `echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile`. Copy and paste **both** of those commands and run them. This adds Homebrew to your shell so you can type `brew` anywhere.

**Check:** Run `brew --version`. You should see something like `Homebrew 4.x.x`.

### 1.3  Install Git, Node.js, and GitHub CLI

In the same Terminal, paste:

```bash
brew install git node gh
```

This takes 5 minutes. Installs three things:
- **Git** — the version control system (tracks changes to your files).
- **Node.js** — runs JavaScript on your computer, needed for Astro.
- **gh** — GitHub's command-line tool, makes GitHub 10x easier than clicking around the website.

**Check:**
```bash
git --version
node --version
gh --version
```

Each should print a version number. If any says "command not found," restart Terminal and try again.

### 1.4  Authenticate GitHub CLI

Run:

```bash
gh auth login
```

It'll ask a series of questions. Answer like this:

- **What account do you want to log into?** → GitHub.com
- **What is your preferred protocol for Git operations?** → HTTPS
- **Authenticate Git with your GitHub credentials?** → Yes
- **How would you like to authenticate GitHub CLI?** → Login with a web browser

It'll show you an 8-character code like `ABCD-1234` and open your browser. Paste that code into the browser prompt, click Continue, and authorize. Back in Terminal you'll see `✓ Authentication complete`.

**Check:** `gh auth status` should print your GitHub username and confirm you're logged in.

### 1.5  Install Claude Code

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Follow any prompts. Restart Terminal when it's done.

**Check:** `claude --version` prints a version number.

### 1.6  Log into Claude Code

Run:

```bash
claude
```

First time only, it'll ask how you want to authenticate. Pick **"Claude subscription"** (uses your existing Claude Pro/Max account — simplest option). A browser opens, you log in, you're done.

You're now inside Claude Code. Type `exit` or press Ctrl+D to leave. You'll come back in once the project is created.

### 1.7  VSCode

You already have it. Open VSCode. Install the Claude Code extension (optional but nicer than pure terminal):

- Click the Extensions icon in the left sidebar (the four squares).
- Search `Claude Code`.
- Install the one published by Anthropic.

The extension gives you a side panel for reviewing diffs. You can still run Claude Code in the integrated terminal either way.

**Check:** Open VSCode, press `` Ctrl+` `` (that's Control + backtick, the key above Tab). A terminal appears at the bottom. Type `claude --version`. Works? You're done with Part 1.

---

## PART 2 — Create the Calculator Site project (~30 min)

### 2.1  Make a Projects folder

In Terminal (or VSCode's terminal):

```bash
mkdir -p ~/Projects
cd ~/Projects
```

All your future coding projects will live in `~/Projects/`. The `~` is shorthand for your home folder (`/Users/jack/`).

### 2.2  Scaffold the Astro site

```bash
npm create astro@latest calculator-site
```

It'll ask a few questions. Answer:

- **How would you like to start your new project?** → Include sample files (Empty is also fine)
- **Install dependencies?** → Yes
- **Initialize a new git repository?** → Yes
- **TypeScript?** → No (can add later if you want)

When done:

```bash
cd calculator-site
npm run dev
```

Your browser should open `http://localhost:4321` showing a default Astro page. Press `Ctrl+C` in the terminal to stop the dev server. You'll restart it later.

### 2.3  Copy the starter files I prepared

The files you need are in your Cowork workspace folder:

```
CLAUDE COWORK/CLAUDE OUTPUTS/Calculator Site/scaffold/
```

Open that folder in **Finder**. Press `Cmd+Shift+.` (period) inside Finder to reveal hidden files — you'll see a `.claude` folder and a `.gitignore` file that are otherwise invisible.

Copy **everything** inside `scaffold/` into `~/Projects/calculator-site/`. When Finder asks about overwriting `.gitignore`, say Replace. When asked about `README.md`, say Replace.

Alternative: do it from the terminal (faster, no hidden-file hassle):

```bash
cp -R "/Users/jack/Library/CloudStorage/.../CLAUDE COWORK/CLAUDE OUTPUTS/Calculator Site/scaffold/." ~/Projects/calculator-site/
```

(Replace the `...` with your actual Cowork folder path. Right-click the `scaffold` folder in Finder → Option key → "Copy as Pathname" gets you the exact path.)

**Check:** In `~/Projects/calculator-site/`, you should now have:
- `CLAUDE.md` (the project instruction file)
- `README.md`
- `.gitignore`
- `.claude/settings.json`
- `.claude/commands/new-calc.md` and two other commands

From the terminal:
```bash
cd ~/Projects/calculator-site
ls -la
```
The `-la` flag shows hidden files. You should see all of the above.

### 2.4  Create the GitHub repo

Still in `~/Projects/calculator-site/`:

```bash
gh repo create calculator-site --private --source=. --remote=origin
```

That one command does three things: creates a new private GitHub repo called `calculator-site`, links your local folder to it, and sets up the `origin` remote (where pushes go).

**Check:** `gh repo view --web` opens the new repo in your browser.

### 2.5  First commit and push

```bash
git add .
git commit -m "Initial project scaffold"
git push -u origin main
```

Translation: stage all the files, save a snapshot with the message "Initial project scaffold," and upload that snapshot to GitHub. The `-u origin main` just tells Git to remember where you're pushing to, so future pushes are a plain `git push`.

**Check:** Refresh the GitHub repo in your browser. All your files are there.

### 2.6  Connect Cloudflare Pages (auto-deploy)

This is the magic: after this step, every `git push` automatically publishes your site to a public URL.

1. Go to **dash.cloudflare.com** — create a free account if you don't have one.
2. In the left sidebar, click **Workers & Pages** → **Pages**.
3. Click **Create application** → **Pages** tab → **Connect to Git**.
4. Authorize Cloudflare to access your GitHub. Select the `calculator-site` repo.
5. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build` (pre-filled)
   - **Build output directory:** `dist` (pre-filled)
   - Leave the rest default.
6. Click **Save and Deploy**.

First deploy takes ~2 minutes. When done, Cloudflare gives you a URL like `calculator-site-abc.pages.dev`. Your site is live.

**From now on:** every `git push` triggers a new deploy automatically. You'll tell Claude Code to use `/ship` when you want to push (see Part 3).

### 2.7  Connect a custom domain (do this once you pick one)

Per the launch plan, register a domain (e.g., via Namecheap or Cloudflare Registrar — Cloudflare's registrar is cheapest and auto-connects). Then in the Cloudflare Pages project: **Custom domains** → **Set up a custom domain** → type your domain → follow the DNS instructions. Live in ~5 minutes.

---

## PART 3 — Working with Claude Code daily

### 3.1  Starting a session

Every time you want to work on the project:

1. Open VSCode.
2. `File` → `Open Folder` → select `~/Projects/calculator-site`.
3. Press `` Ctrl+` `` to open the integrated terminal.
4. Type `claude` and hit Enter.

Claude Code starts. It automatically reads `CLAUDE.md` (your project instructions) and the files in `.claude/`. It's ready.

### 3.2  Core commands

Type these **inside** Claude Code (after the `>` prompt):

| Command | What it does |
|---|---|
| `/help` | Shows all available commands |
| `/new-calc <name>` | Creates a new calculator page (custom command I made for you) |
| `/seo-audit <page>` | Audits a calc page for SEO issues |
| `/ship "<message>"` | Commits your changes and pushes to GitHub (triggers auto-deploy) |
| `/clear` | Starts a fresh conversation (loses context, useful between unrelated tasks) |
| `/compact` | Keeps context but frees up memory mid-session |
| `/context` | Shows how much of Claude's memory you're using |
| `/resume` | Resumes a previous conversation |
| `exit` or `Ctrl+D` | Leaves Claude Code |

### 3.3  Your first real conversation

Once you're inside Claude Code in the project folder, paste this and hit Enter:

> Read CLAUDE.md and tell me what you understand about this project. Then tell me what you'd recommend we build first.

Claude will read the instruction file and propose a plan. From there, normal conversation:

> Let's build the Cap Rate calculator first. Use the JSON-driven pattern described in CLAUDE.md. Create the Calculator component, the cap-rate spec, and the page. Default inputs should be a $300,000 duplex with $3,200/mo rent and 40% expenses.

Claude will write the code, save the files, and show you a diff. Review in VSCode. If you like it, say "ship it." If not, tell it what to change.

### 3.4  Reviewing changes

While Claude works, it'll show diffs inline in the terminal. For a nicer view, open the **Source Control** icon in VSCode's left sidebar (three circles connected). Every changed file shows there with a side-by-side diff when you click it.

**If Claude asks for permission** to run a command or edit a file: it's showing you what it wants to do before doing it. Type `y` (yes) or `n` (no). For trusted routine operations, you can say "always" to skip the prompt for that command type.

### 3.5  Shipping changes

When you're happy with a batch of changes:

```
/ship "Added Cap Rate calculator"
```

The `/ship` command I made runs: `git add .` → `git commit -m "<your message>"` → `git push`. Then Cloudflare auto-deploys. Check your pages.dev URL in ~90 seconds to see the new calc live.

---

## PART 4 — Git / GitHub essentials for beginners

You don't need to master Git. You need to know four things.

**1. Git vs. GitHub.** Git is the tool that tracks changes to your files (runs locally). GitHub is a website that stores the full history in the cloud. Every time you `push`, you upload your latest local state to GitHub.

**2. The 3-command loop.** This is 95% of what you'll do:

```bash
git add .                    # "Include all my current changes in the next snapshot"
git commit -m "Message"      # "Take a snapshot with this description"
git push                     # "Upload to GitHub"
```

The `/ship` slash command I wrote does all three. You'll rarely type these manually.

**3. Viewing what changed.**

```bash
git status    # What files have I changed since the last commit?
git diff      # Show me the actual line-by-line changes
git log       # History of past commits
```

**4. Undoing mistakes.**

- **"I haven't committed yet, I want to throw away my changes."** → `git restore .` (wipes uncommitted changes, can't be undone, use carefully).
- **"I committed something bad, haven't pushed."** → `git reset --soft HEAD~1` (unstage the last commit, keeps your edits).
- **"I pushed something bad."** → Just edit the file, `/ship` the fix. Each commit is a snapshot, not a replacement — history stays intact.
- **"I broke everything."** → Ask Claude Code: "My git state is broken, here's what `git status` shows: [paste output]. Help me fix it without losing work." It's very good at this.

Branches, pull requests, merging — ignore all of that for now. You're the only person working on this repo. Commit to `main` directly.

---

## PART 5 — The files I prepared for you

All in `CLAUDE OUTPUTS/Calculator Site/scaffold/`.

### CLAUDE.md — the most important file

This is the project-level operating manual. Claude Code automatically reads it every time you start a session in this repo. It tells Claude:
- What the project is (calculator site for real estate investors)
- The tech stack (Astro, Preact islands, Tailwind, Cloudflare Pages)
- The file structure and where new calcs go
- How calcs are specified (JSON + formula pattern)
- Writing voice rules (analyst tone, no AI-isms)
- SEO requirements (schema markup, page structure)
- Commit message conventions

Edit this file as the project evolves. When you learn something Claude should always do, add it.

### README.md

The front-page documentation of the repo. GitHub shows it on the repo page. Visitors see it first.

### .gitignore

Files Git should **not** track — `node_modules/` (huge, re-downloadable), `.env` (secrets), build output, OS junk. Never commit these.

### .claude/settings.json

Project-level Claude Code config. Sets a few preferences: which model to prefer, auto-approve certain safe commands, etc.

### .claude/commands/new-calc.md

Type `/new-calc <slug>` and Claude scaffolds a new calculator from the pattern — JSON spec, formula stub, markdown explainer, page template.

### .claude/commands/seo-audit.md

Type `/seo-audit <slug>` and Claude audits that calc page: schema markup, meta tags, keyword usage, internal linking, Core Web Vitals concerns.

### .claude/commands/ship.md

Type `/ship "<message>"` and Claude stages, commits, and pushes in one shot.

### Adding more commands later

Anytime you notice yourself giving Claude the same multi-step instruction twice, make it a slash command. Create a new file at `.claude/commands/<command-name>.md` with this format:

```markdown
---
description: Short description of what this command does
---

Full instructions for Claude to follow when this command is invoked.
Arguments the user passes appear as $ARGUMENTS in the body.
```

Commit the new command and it's available project-wide.

---

## PART 6 — Troubleshooting

**"command not found: claude"** — Close and reopen Terminal. If still failing, the install script didn't add it to your PATH. Run `echo $PATH` and check. Reinstall via `curl -fsSL https://claude.ai/install.sh | bash`.

**"command not found: gh" or "git"** — Homebrew install didn't finish. Re-run `brew install git node gh`.

**Git says "Author identity unknown" on first commit** — One-time setup:
```bash
git config --global user.name "Jack Olton"
git config --global user.email "jolton19@gmail.com"
```

**`npm run dev` fails with a port conflict** — Something else is using port 4321. Run with a different port: `npm run dev -- --port 3000`.

**Claude Code says it can't edit a file / permission denied** — Your file has incorrect perms. Run `chmod -R u+rw ~/Projects/calculator-site` to fix.

**Cloudflare Pages build fails** — Usually a missing env var or a broken `package.json`. Open the failed build in Cloudflare's UI, scroll to the log, paste it to Claude Code, and ask for a fix.

**I committed something I shouldn't have (a password, an API key)** — Don't just delete and recommit; it's still in history. Tell Claude Code "I accidentally committed a secret. Help me purge it from git history and rotate the key." It'll walk you through `git filter-repo` or BFG.

**Claude Code is running something dangerous and I want to stop it** — `Ctrl+C` cancels the current action. `Ctrl+D` exits Claude Code entirely.

---

## PART 7 — Quick reference card

Save this. You'll refer back.

**Starting a work session (every time):**
```bash
cd ~/Projects/calculator-site
claude
```

**Inside Claude Code:**
- `/new-calc cap-rate` — scaffold a new calc
- `/seo-audit cap-rate` — audit an existing calc
- `/ship "message"` — commit + push (triggers auto-deploy)
- `/clear` — fresh conversation
- `exit` — leave Claude Code

**Manual Git (rarely needed):**
```bash
git status       # what's changed
git add .        # stage everything
git commit -m    # snapshot
git push         # upload
```

**Check your live site:**
- Preview URL: `https://calculator-site-<hash>.pages.dev` (Cloudflare gives you this)
- Custom domain: whatever you register

**When you feel stuck:**
Tell Claude Code exactly what happened, paste any error messages, and ask for help. Give it access to your terminal output. It's good at this.

---

## What to do right now (in order)

1. Part 1, all 7 steps. Don't skip. ~45 min.
2. Lock the niche and register a domain. From the launch plan v1, my recommendation is real estate investor calcs — confirm or override.
3. Part 2, all 7 steps. The repo is live, auto-deploy is wired up. ~30 min.
4. Open Claude Code in the project. Paste: "Read CLAUDE.md. Then build the Cap Rate calculator as the reference implementation for this project — we'll copy this pattern for every other calc."
5. Review, `/ship`, see it live on your Cloudflare URL. Done.

When you hit any snag, paste the error here and I'll debug. You don't have to finish this alone.
