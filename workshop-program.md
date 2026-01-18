# MCP Workshop: From Explorer to Architect

**Duration:** 1 hour
**Host:** Olga Safonova
**Presented for:** Women in Product Nordics & TechWomen Copenhagen

---

## Workshop Overview

Model Context Protocol (MCP) is the standard that lets AI assistants take action in your apps. This workshop takes you from understanding what MCP is to building your own servers.

Three tiers. Pick your depth.

---

## Program

| Time | Section | Level |
|------|---------|-------|
| 0:00–0:15 | **Tier 1: What are MCPs** | Explorer |
| 0:15–0:18 | Break + Q&A | — |
| 0:18–0:35 | **Tier 2: How to Use MCPs** | User |
| 0:35–0:38 | Break + Q&A | — |
| 0:38–0:55 | **Tier 3: How to Build MCPs** | Architect |
| 0:55–1:00 | Wrap-up + Resources | — |

---

## Tier 1: What are MCPs (15 min)
**Level: Explorer** — No technical background needed

### The Problem
AI that knows everything and does nothing is an expensive search bar. Current AI can answer questions and generate text, but it can't create a Miro board or update your roadmap.

### RAG vs MCP
- **RAG**: Information flows IN to the AI (retrieval)
- **MCP**: Commands flow OUT from the AI (action)

### What MCP Actually Is
A protocol — like USB-C for AI. One standard that lets any AI assistant connect to any app.

**The Three Parts:**
1. **Client** — The AI assistant (Claude, ChatGPT, Cursor)
2. **Server** — The bridge (Miro MCP Server, Playwright MCP Server)
3. **App** — The actual service (Miro, your browser, your filesystem)

### Cloud vs Local
Apps can be in the cloud OR on your machine.

| Cloud Apps | Local Apps |
|------------|------------|
| Miro | Your browser |
| ProductPlan | Files on your machine |
| GLEIF API | Local git repos |

---

## Tier 2: How to Use MCPs (17 min)
**Level: User** — Can follow instructions, no coding required

### Demo 1: Cloud App — GLEIF (5 min)

**Setup:** Claude Desktop open, GLEIF MCP already configured

**Script:**
```
ME: "Let me show you a cloud-connected MCP. I'll ask Claude to look up
     a company in a global financial database."

PROMPT: "Use the GLEIF server to look up Apple Inc's LEI"

[Claude calls gleif.search_entity, returns LEI + registration details]

ME: "Notice what happened — Claude didn't search the web. It called a
     specific API, got structured data back. The LEI is a real identifier
     used in financial regulations worldwide."

PROMPT: "Who is Apple's ultimate parent company according to GLEIF?"

[Claude calls gleif.get_relationships]

ME: "Now it's traversing corporate ownership data. This is ACTION,
     not just retrieval."
```

**Talking points:**
- Data lives in the cloud (GLEIF API)
- Claude has tools, not just knowledge
- Structured output, not web scraping

---

### Demo 2: Local App — Playwright (5 min)

**Setup:** Playwright MCP configured, browser ready

**Script:**
```
ME: "Now something different. This MCP controls software on MY machine."

PROMPT: "Open a browser and go to producthunt.com"

[Browser physically opens on presenter's screen]

ME: "See that? The browser opened HERE, on my laptop. Not in some cloud.
     Claude is now controlling local software."

PROMPT: "Take a screenshot of the page"

[Screenshot appears in conversation]

ME: "Claude can see what's on screen and interact with it.
     This is the 'local app' pattern."
```

**Talking points:**
- Browser runs locally, not remotely
- Claude can see and interact
- Privacy: data stays on your machine

---

### Demo 3: Quick Config Walkthrough (4 min)

**Script:**
```
ME: "How hard is setup? Let me show you the config file."

[Open claude_desktop_config.json in editor]

ME: "This is it. A JSON file with server names and paths.
     Each server is just a program Claude knows how to talk to."

[Highlight one server entry]

ME: "Add a server, restart Claude, done. No coding required to USE
     an MCP — only to BUILD one."
```

---

### Demo Backup Plans

**If GLEIF demo fails:**
- Show pre-recorded GIF of the interaction
- Have screenshot of successful response ready
- Explain: "The API is down, but here's what you'd see..."

**If Playwright demo fails:**
- Switch to filesystem MCP: "List files in my Documents folder"
- Pre-recorded video as fallback
- Worst case: describe what would happen, show screenshot

**If Claude Desktop crashes:**
- Have backup laptop with identical setup
- Pre-recorded full demo video (2 min version)
- Pivot to slides explaining the flow

**General backup rule:**
Never apologize for more than 5 seconds. Acknowledge, switch to backup, keep moving.

---

## Tier 3: How to Build MCPs (17 min)
**Level: Architect** — Developers who want to create their own

### The Evolution Story
Four servers built in December 2025:
1. **ProductPlan** — First attempt, learned the SDK
2. **MediaWiki** — Added auth, rate limiting
3. **Miro** — Scaled to 77 tools, bulk operations
4. **GLEIF** — Refined, minimal, production-ready

### Architecture Overview
```
server/
├── main.go              # Entry point
├── tools/
│   ├── definitions.go   # What can it do?
│   └── handlers.go      # How does it do it?
└── client/
    └── client.go        # API client
```

### Production Patterns
- Error handling and retries
- Authentication flows
- Caching with TTL
- Bulk operations
- Rate limiting

### Getting Started
- Fork GLEIF (simplest, 4 tools)
- Fork Miro (most complete, 77 tools)
- Use Go SDK or TypeScript SDK

---

## Key Takeaways

**Explorers:** MCP lets AI take action, not just answer questions.

**Users:** Setup is simple — download, configure, restart.

**Architects:** Start small. My first server had 5 tools.

---

## Resources

- **MCP Specification:** modelcontextprotocol.io
- **Go SDK:** github.com/modelcontextprotocol/go-sdk
- **TypeScript SDK:** github.com/modelcontextprotocol/typescript-sdk
- **Example Servers:** github.com/olgasafonova

---

## Connect

**LinkedIn:** linkedin.com/in/olgasafonova
**Substack:** substack.com/@olgasafonova
