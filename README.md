# MCP Workshop: From Explorer to Architect

**Duration**: 1 hour
**Audience**: Developers, Product, Designers, Marketers

## Workshop Flow

| Time | Section | Level | Vibe |
|------|---------|-------|------|
| 0:00-0:15 | What are MCPs | Explorer | *"What can it do?"* — Curious. Watching demos. Seeing possibilities. |
| 0:15-0:18 | Break + Q&A | - | |
| 0:18-0:35 | How to Use MCPs | Practitioner | *"What can it do for me?"* — Using daily. Getting value. Prompting with intent. |
| 0:35-0:38 | Break + Q&A | - | |
| 0:38-0:55 | How to Build MCPs | Architect | *"What can I make it do?"* — Designing systems. Building servers. Enabling others. |
| 0:55-1:00 | Wrap-up + Resources | - | |

## Visual Approach

Clean diagrams + screenshots + live demos + social proof.

| Section | Assets |
|---------|--------|
| Explorer | RAG vs MCP diagram, Cloud vs Local diagram |
| Practitioner | `claude_desktop_config.json` screenshot, terminal, GLEIF/Playwright demo |
| Architect | Code snippets, architecture diagram, **feedback screenshots** (Miro, MediaWiki) |
| Wrap-up | QR codes (LinkedIn, Substack) |

## Project Structure

```
mcp-workshop/
├── content/           # Workshop content and scripts
├── slides/            # Presentation files
├── diagrams/          # RAG vs MCP, architecture, cloud vs local
├── screenshots/       # Config files, demos, feedback
├── demo-scripts/      # Commands/prompts for live demos
└── assets/            # QR codes, logos
```

## Related MCP Servers

Servers built by Olga (used in demos):
- [gleif-mcp-server](https://github.com/olgasafonova/gleif-mcp-server) — Simplest, no auth
- [miro-mcp-server](https://github.com/olgasafonova/miro-mcp-server) — Most complete, 77 tools
- [mediawiki-mcp-server](https://github.com/olgasafonova/mediawiki-mcp-server)
- [productplan-mcp-server](https://github.com/olgasafonova/productplan-mcp-server)
