# MCP Workshop: Speaker Script

**Duration:** 1 hour
**Presenter:** Olga Safonova
**Slides:** 21

---

## Slide 1: Title
**"From Explorer to Architect"**

> "Welcome everyone. I'm Olga Safonova, AI Product Leader. I build AI tools in Go.
>
> Today we're covering MCP — Model Context Protocol. We'll go from understanding what it is, to using it, to building your own servers.
>
> Three tiers. Pick your depth. If you're non-technical, Tier 1 is for you. If you want to use MCPs, stay for Tier 2. Developers who want to build — Tier 3."

**[~1 min]**

---

## TIER 1: EXPLORER (15 min)

---

## Slide 2: The Problem
**"AI that knows everything and does nothing is an expensive search bar."**

> "Let's start with a problem. Current AI can answer questions. It can generate text. But ask it to create a Miro board? Update your roadmap? It can't.
>
> AI that knows everything and does nothing is just an expensive search bar."

**[~1 min]**

---

## Slide 3: RAG vs MCP
**"The Distinction"**

> "You might have heard of RAG — Retrieval Augmented Generation. RAG is about getting information INTO the AI. You feed it documents, context, data.
>
> MCP is the opposite. It's about getting commands OUT of the AI. The AI takes action.
>
> RAG = information flows in. MCP = actions flow out."

**[~2 min]**

---

## Slide 4: What MCP Is
**"A protocol. Like USB-C for AI."**

> "So what is MCP? It's a protocol. Think of it like USB-C for AI.
>
> Before USB-C, every device had a different cable. Now one cable works everywhere.
>
> MCP is the same idea. One standard that lets any AI assistant connect to any app."

**[~1 min]**

---

## Slide 5: The Three Parts
**"How it works"**

> "MCP has three parts.
>
> First, the CLIENT — that's your AI assistant. Claude, ChatGPT, Cursor.
>
> Second, the SERVER — the bridge. This is what I build. Miro MCP Server, Playwright MCP Server.
>
> Third, the APP — the actual service. Miro, your browser, your filesystem.
>
> Client talks to Server. Server talks to App. That's it."

**[~2 min]**

---

## Slide 6: What Servers Provide
**"Tools, Resources, Prompts"**

> "What does a server actually give the AI?
>
> TOOLS — actions the AI can take. Create a board. Look up a company.
>
> RESOURCES — data the AI can read. Files, database records.
>
> PROMPTS — pre-built instructions for specific tasks.
>
> Most servers focus on tools. That's where the action is."

**[~2 min]**

---

## Slide 7: Cloud vs Local
**"Apps can be anywhere"**

> "Here's what matters. The app can be in the cloud OR on your machine.
>
> Cloud apps — Miro, ProductPlan, GLEIF API. Data lives on someone else's server.
>
> Local apps — your browser, files on your machine, local git repos. Data stays with you.
>
> Same protocol. Different locations. Your choice."

**[~2 min]**

---

## [BREAK + Q&A — 3 min]

> "That's Tier 1. Any questions before we move to demos?
>
> [Handle questions]
>
> Alright, let's see MCP in action."

---

## TIER 2: USER (20 min)

---

## Slide 8: Tier 2 Intro
**"How to Use MCPs"**

> "Tier 2 — How to USE MCPs. No coding required. Just follow along.
>
> First, let's make sure everyone has Claude Desktop. Then we'll install an MCP together."

**[~30 sec]**

---

## Slide 9: Get Claude Desktop
**"claude.ai/download"**

> "If you don't have Claude Desktop yet, grab it now. Go to claude.ai/download.
>
> Mac users — download the DMG, drag to Applications, open and sign in.
>
> Windows users — download the installer, run it, sign in.
>
> Already have it? Great, you're ahead."

**[~2 min — give people time to download]**

---

## Slide 10: Install GLEIF
**"Your First MCP Server"**

> "Now let's add an MCP server together. We're using GLEIF — it looks up company legal identifiers.
>
> Go to the GitHub link on screen. Download the binary for your system.
>
> Mac users — open Finder, press Cmd+Shift+G, paste the config path.
>
> Windows users — press Win+R, paste the path.
>
> Open claude_desktop_config.json. Add the config from the README. Restart Claude.
>
> I'll give you a few minutes. Raise your hand if you're stuck."

**[~5 min — walk around, help people]**

---

## Slide 11: Demo GLEIF
**"Cloud App Demo"**

> "First demo — a cloud app. GLEIF is a global database of legal entities. Every company in finance has a unique ID called an LEI.
>
> Watch what Claude does."

**[LIVE DEMO]**
```
PROMPT: "Use GLEIF to look up Apple Inc's LEI"
```

> "Notice — Claude didn't search the web. It called a specific API. Got structured data back. That LEI is real, used in regulations worldwide.
>
> Let me ask a follow-up."

```
PROMPT: "Who is Apple's ultimate parent company according to GLEIF?"
```

> "Now it's traversing corporate ownership data. This is ACTION, not just retrieval."

**[~4 min including demo]**

---

## Slide 12: Demo Playwright
**"Local App Demo"**

> "Now something different. This MCP controls software on MY machine."

**[LIVE DEMO]**
```
PROMPT: "Open a browser and go to producthunt.com"
```

> "See that? The browser opened HERE. On my laptop. Not in some cloud. Claude is controlling local software."

```
PROMPT: "Take a screenshot of the page"
```

> "Claude can see what's on screen. This is the local app pattern. Privacy — data stays on your machine."

**[~4 min including demo]**

---

## Slide 13: Configuration
**"Setup is simple"**

> "How hard is setup? Let me show you the config file."

**[Show claude_desktop_config.json]**

> "This is it. A JSON file. Server names and paths. Each server is just a program Claude knows how to talk to.
>
> Add a server, restart Claude, done. No coding required to USE an MCP — only to BUILD one."

**[~4 min]**

---

## [BREAK + Q&A — 3 min]

> "That's Tier 2. Questions about using MCPs?
>
> [Handle questions]
>
> Now for the builders in the room."

---

## TIER 3: ARCHITECT (15 min)

---

## Slide 14: Tier 3 Intro
**"How to Build MCPs"**

> "Tier 3 — How to BUILD MCPs. This is for developers who want to create their own."

**[~30 sec]**

---

## Slide 15: Architecture
**"Structure"**

> "Here's the typical structure of an MCP server.
>
> Main entry point. Tools folder with definitions and handlers. Client folder for API communication.
>
> Definitions say WHAT the server can do. Handlers say HOW it does it.
>
> I built four servers in December. ProductPlan was first — learned the SDK. MediaWiki added auth and rate limiting. Miro scaled to 77 tools. GLEIF was refined, minimal, production-ready."

**[~4 min]**

---

## Slide 16: Production Patterns
**"Lessons Learned"**

> "What I learned building these.
>
> ERROR HANDLING — wrap API errors with context. Clear messages.
>
> AUTHENTICATION — store keys safely, not in code. Check they exist at start.
>
> CACHING — remember recent results. Fewer API calls, faster responses.
>
> RATE LIMITING — don't hit APIs too fast.
>
> BULK OPERATIONS — group requests. One batch beats many singles.
>
> RETRIES — retry temporary failures. Skip bad requests. Wait longer between attempts."

**[~5 min]**

---

## Slide 17: Getting Started
**"Your First MCP Server"**

> "How to start?
>
> Fork GLEIF if you want simple — 4 tools, minimal code.
>
> Fork Miro if you want complete — 77 tools, bulk operations, the works.
>
> Both use the Go SDK. TypeScript and Python SDKs also available.
>
> Start small. My first server had 5 tools. Ship it, learn, add more."

**[~4 min]**

---

## WRAP-UP (5 min)

---

## Slide 18: Distilled
**"Key Takeaways"**

> "Let's distill this.
>
> EXPLORERS — MCP lets AI take action, not just answer questions.
>
> USERS — setup is simple. Download, configure, restart.
>
> ARCHITECTS — start small. My first server had 5 tools. Ship and iterate."

**[~2 min]**

---

## Slide 19: Real Value
**"Testimonials"**

> "This isn't theory. Real people using these servers.
>
> Miro's CEO reached out about the Miro MCP. Their product evangelist said we're 'ahead of the curve.'
>
> Colleagues at Tietoevry call it 'SO useful', a 'golden nugget', 'one of the best gifts ever.'
>
> This stuff works. And it's just the beginning."

**[~1 min]**

---

## Slide 20: Resources
**"Learn More"**

> "Resources. MCP specification at modelcontextprotocol.io. SDKs for Go, TypeScript, Python.
>
> My servers are all on GitHub — fork them, learn from them, build your own."

**[~1 min]**

---

## Slide 21: Thank You
**"Connect"**

> "Thank you for your time.
>
> LinkedIn, GitHub, Substack — scan the QR codes.
>
> I'd love to hear what you build. Questions?"

**[Q&A until time]**

---

## BACKUP PLANS

**If GLEIF demo fails:**
- Show pre-recorded GIF
- "The API is down, but here's what you'd see..."

**If Playwright demo fails:**
- Switch to filesystem: "List files in my Documents folder"
- Pre-recorded video as fallback

**If Claude crashes:**
- Backup laptop with identical setup
- Pre-recorded full demo (2 min)

**Rule:** Never apologize for more than 5 seconds. Acknowledge, switch to backup, keep moving.

---

## TIMING CHECKLIST

| Section | Target | Actual |
|---------|--------|--------|
| Slide 1 (Title) | 0:00 | |
| Slides 2-7 (Tier 1) | 0:01-0:15 | |
| Break + Q&A | 0:15-0:18 | |
| Slides 8-13 (Tier 2 + Setup) | 0:18-0:38 | |
| Break + Q&A | 0:38-0:40 | |
| Slides 14-17 (Tier 3) | 0:40-0:55 | |
| Slides 18-21 (Wrap) | 0:55-1:00 | |
