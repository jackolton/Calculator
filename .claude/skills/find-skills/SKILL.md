---
name: find-skills
description: This skill should be used when the user asks to "find skills", "list skills", "show available skills", "what skills are installed", "what skills can I use", or wants to discover which skills are available in the project or from installed plugins.
---

# Find Skills

Discover all skills available in this project — both project-scoped skills and those from installed plugins.

## Scan Locations

Run these in order to collect all skill sources:

```bash
# 1. Project-scoped skills (highest priority)
find .claude/skills -name "SKILL.md" 2>/dev/null

# 2. Project-scoped commands (legacy location)
find .claude/commands -name "SKILL.md" 2>/dev/null

# 3. User-level skills
find ~/.claude/skills -name "SKILL.md" 2>/dev/null

# 4. Installed plugin skills
find ~/.claude/plugins/marketplaces -name "SKILL.md" 2>/dev/null
```

## Output Format

For each SKILL.md found, extract the `name` and `description` from YAML frontmatter and present a table:

| Skill | Scope | Description |
|-------|-------|-------------|
| `name` | project / user / plugin-name | first sentence of description |

Group by scope: **Project** → **User** → **Plugins** (alphabetical by plugin name within each group).

## Invocation

Skills can be invoked by typing `/<skill-name>` in the prompt.

After listing, note which skills are user-invocable (no `user-invocable: false` in frontmatter) so the user knows what they can call directly.
