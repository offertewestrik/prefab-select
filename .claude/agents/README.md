# Agency Agents

232 specialized subagents, available in every Claude Code session for this
repository (including Claude Code on the web).

## Source & license

Imported from [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents),
licensed under the MIT License (© 2025 AgentLand Contributors). Each `.md` file
is an agent persona with YAML frontmatter (`name`, `description`, …) and works
natively with Claude Code — no conversion needed.

## How to use

Reference an agent by its name in any session, e.g.:

```
Use the DevOps Automator agent to set up a CI/CD pipeline.
Activate Frontend Developer and help me build a React component.
```

Or let Claude pick the best-matching agent automatically based on the task.

## Roster

232 agents across 16 divisions: academic, design, engineering, finance,
game-development, gis, marketing, paid-media, product, project-management,
sales, security, spatial-computing, specialized, support, and testing.
(The upstream `strategy/` playbooks and runbooks are not subagents and were
not imported.)

To update: re-download the upstream repo and re-copy the division `*.md` files
into this directory.
