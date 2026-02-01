# MCP Workshop: Speaker Script

**Duration:** 1 hour
**Presenter:** Olga Safonova
**Slides:** 21

---

## Slide 1: Title
**"From Explorer to Architect"**

> "Welcome everyone. I'm Olga Safonova, AI Product Leader.
>
> Today we're covering MCP — Model Context Protocol. The standard that lets AI assistants take action in your apps.
>
> We'll go from understanding what it is, to using it, to building your own servers. Three tiers. Pick your depth."

**[~1 min]**

---

## TIER 1: EXPLORER (15 min)

---

## Slide 2: The Problem
**"AI that knows everything and does nothing is an expensive search bar."**

> "Let's start with a problem. Current AI can answer questions. It can generate text. But ask it to create a Miro board? Update your roadmap? It can't.
>
> [Point to the quote]
>
> AI that knows everything and does nothing is just an expensive search bar."

**[~1 min]**

---

## Slide 3: RAG vs MCP
**"The Distinction"**

> "You might have heard of RAG — Retrieval Augmented Generation.
>
> [Point to left side]
> RAG is about getting information INTO the AI. You feed it documents, context, data. Result: better answers.
>
> [Point to right side]
> MCP is the opposite. Commands flow OUT. The AI takes action. Result: things get done.
>
> Both are important. RAG improves what AI knows. MCP improves what AI does."

**[~2 min]**

---

## Slide 4: What MCP Is
**"A protocol. Like USB-C for AI."**

> "So what is MCP? It's a protocol.
>
> Think of it like USB-C for AI. Before USB-C, every device had a different cable. Now one cable works everywhere.
>
> MCP is the same idea. One standard that lets any AI assistant connect to any app."

**[~1 min]**

---

## Slide 5: The Three Parts
**"How it works"**

> "MCP has three parts.
>
> [Point to each box]
>
> First, the CLIENT — that's your AI assistant. Claude, ChatGPT, Cursor.
>
> Second, the SERVER — the bridge. This is what I build. Miro MCP Server, Playwright MCP Server, GLEIF MCP Server.
>
> Third, the APP — the actual service. Miro, your browser, the GLEIF API.
>
> Client talks to Server. Server talks to App. That's it."

**[~2 min]**

---

## Slide 6: What Servers Provide
**"Tools, Resources, Prompts"**

> "What does a server actually give the AI?
>
> [Point to Tools]
> TOOLS — actions the AI can take. Search for a company. Create a board. Take a screenshot.
>
> [Point to Resources]
> RESOURCES — data the AI can read. Files on your computer, database records, live API data.
>
> [Point to Prompts]
> PROMPTS — reusable templates for specific tasks. Code review checklists, report formats.
>
> Most servers focus on tools. That's where the action is."

**[~2 min]**

---

## Slide 7: Cloud vs Local
**"Apps can be anywhere"**

> "Here's what matters. The app can be in the cloud OR on your machine.
>
> [Point to Cloud column]
> Cloud apps — Miro, ProductPlan, GLEIF API, Slack. Data lives on someone else's server.
>
> [Point to Local column]
> Local apps — your browser, files on your machine, local git repos. Data stays with you.
>
> [Point to insight]
> Same protocol. Different locations. Data stays where you want it."

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

> "Tier 2 — How to USE MCPs.
>
> No coding required. Just follow along. Three live demos coming up.
>
> First, let's make sure everyone has Claude Desktop."

**[~30 sec]**

---

## Slide 9: Get Claude Desktop
**"claude.ai/download"**

> "If you don't have Claude Desktop yet, grab it now. Go to claude.ai/download.
>
> [Point to Mac column]
> Mac users — download the DMG, drag to Applications, open and sign in.
>
> [Point to Windows column]
> Windows users — download the installer, run it, sign in.
>
> **Important: Free accounts work! You don't need Pro or Max.**
>
> Already have it? Great, you're ahead."

**[~2 min — give people time to download]**

---

## Slide 10: Demo 1 — GLEIF
**"Cloud App Pattern"**

> "First demo — a cloud app. GLEIF is a global database of legal entities. Every company in finance has a unique ID called an LEI.
>
> Watch what Claude does."

**[LIVE DEMO]**
```
PROMPT: "Use the GLEIF server to look up Apple Inc's LEI"
```

> "Notice — Claude didn't search the web. It called a specific API. Got structured data back. That LEI is real, used in regulations worldwide."

```
PROMPT: "Who is Apple's ultimate parent company according to GLEIF?"
```

> "Now it's traversing corporate ownership data. This is ACTION, not just retrieval."

**[~4 min including demo]**

---

## Slide 11: Demo 2 — Playwright
**"Local App Pattern"**

> "Now something different. This MCP controls software on MY machine."

**[LIVE DEMO]**
```
PROMPT: "Open a browser and go to producthunt.com"
```

> "See that? The browser opened HERE. On my laptop. Not in some cloud. Claude is controlling local software."

```
PROMPT: "Take a screenshot of the page"
```

> "Claude can see what's on screen. This is the local app pattern. Privacy — data stays on your machine. No API keys needed for local apps."

**[~4 min including demo]**

---

## Slide 12: Demo 3 — Configuration
**"What you actually do"**

> "How hard is setup? Let me show you the config file.
>
> [Point to code block]
>
> This is it. A JSON file. Server names and how to start them. Each server is just a program Claude knows how to talk to.
>
> [Point to takeaways]
>
> Edit one file. Give it a name, tell it how to start. Restart Claude. Done. No coding required to USE an MCP — only to BUILD one."

**[~4 min]**

---

## Slide 13: Install GLEIF (Hands-on)
**"Try it yourself"**

> "Now let's add an MCP server together.
>
> Scan the QR code on screen — it'll take you to a step-by-step guide.
>
> [Point to steps]
>
> Download the binary for your system. Mac users need to unblock it in Terminal — one command. Add the config to Claude Desktop. Restart and test.
>
> I'll give you a few minutes. Raise your hand if you get stuck."

**[~5 min — walk around, help people]**

### HANDS-ON SUPPORT NOTES

**Common issues people get stuck on:**

1. **Mac security block** — Most common! Apple blocks unsigned binaries.
   - Solution: `xattr -d com.apple.quarantine ~/path/to/gleif-mcp-server`
   - Or: System Settings → Privacy & Security → Allow anyway

2. **Can't find config file location**
   - Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - Tip: Copy path from the guide, use Cmd+Shift+G (Mac) or Win+R (Windows)

3. **JSON syntax errors** — Missing comma, extra comma, wrong brackets
   - Solution: Use the exact JSON from the guide, don't edit manually

4. **Forgot to restart Claude** — Config only loads on startup
   - Solution: Quit Claude completely (check menu bar), reopen

5. **Binary not in PATH** — Server won't start
   - Solution: Use full path in config, e.g., `/Users/name/gleif-mcp-server`

**If people are really stuck:**
- "That's okay! You can set this up after the workshop. The guide has all the steps."
- "Pair up with a neighbor who got it working."
- "Watch my screen for now — I'll demo it."

**Time check:** If most people are stuck after 3 minutes, move on. Don't let hands-on derail the session.

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

> "Tier 3 — How to BUILD MCPs.
>
> This is for developers who want to create their own. Real patterns from production servers I've shipped."

**[~30 sec]**

---

## Slide 15: Architecture
**"Structure"**

> "Here's the typical structure of an MCP server.
>
> [Point to folder structure]
>
> Main entry point registers tools and starts the server.
>
> [Point to definitions.go]
> Definitions say WHAT the server can do. Tool names, descriptions, parameter schemas. This is what Claude sees.
>
> [Point to handlers.go]
> Handlers say HOW it does it. The actual implementation. Calls APIs, processes data, returns results.
>
> [Point to client.go]
> Client handles HTTP communication with auth, rate limiting, caching. Talks to the real API."

**[~4 min]**

---

## Slide 16: Production Patterns
**"Lessons Learned"**

> "What I learned building four servers in December.
>
> [Point to each pattern]
>
> ERROR HANDLING — wrap API errors with context. Clear messages.
>
> AUTHENTICATION — store keys safely, not in code. Check they exist at startup.
>
> CACHING — remember recent results. Fewer API calls, faster responses.
>
> RATE LIMITING — don't hit APIs too fast. Slow down when needed.
>
> BULK OPERATIONS — group similar requests. One batch beats many singles.
>
> RETRIES — retry temporary failures like timeouts. Skip bad requests. Wait longer between attempts."

**[~5 min]**

---

## Slide 17: Getting Started
**"Your First MCP Server"**

> "How to start?
>
> [Point to recommended option]
> Fork GLEIF if you want simple — 12 tools, minimal code, read-only API. Perfect for learning.
>
> [Point to Miro option]
> Fork Miro if you want complete — 77 tools, OAuth, bulk operations. Reference for complex servers.
>
> [Point to SDK note]
> Python and TypeScript are most popular. Tutorials everywhere.
>
> Why Go? Single binary, no runtime dependencies, starts instantly, cross-compiles for any OS. Python needs a runtime, TypeScript needs Node. Go just works.
>
> You decide what works for you."

**[~4 min]**

---

## WRAP-UP (5 min)

---

## Slide 18: Distilled
**"Key Takeaways"**

> "Let's distill this.
>
> [Point to each tier]
>
> EXPLORERS — MCP lets AI take action, not just answer questions.
>
> USERS — Setup is simple. Download, configure, restart.
>
> ARCHITECTS — Start small. Build for real value."

**[~2 min]**

---

## Slide 19: Real Value
**"Testimonials"**

> "This isn't theory. Real people using these servers.
>
> [Point to Miro side]
> Miro's CEO reached out about the Miro MCP. Their Chief Product Evangelist said we're 'ahead of the curve.'
>
> [Point to Tietoevry side]
> Colleagues call it 'SO useful', a 'golden nugget', 'one of the best gifts ever.'
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
> LinkedIn, GitHub, Substack — scan the QR codes if you want to connect.
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

**If hands-on installation fails for many people:**
- "That's totally normal for first-time setup. The guide has troubleshooting steps."
- "You can do this after the workshop — let's keep moving so everyone gets value."
- Show your own successful setup as proof it works

**Rule:** Never apologize for more than 5 seconds. Acknowledge, switch to backup, keep moving.

---

## TIMING CHECKLIST

| Section | Target | Actual |
|---------|--------|--------|
| Slide 1 (Title) | 0:00 | |
| Slides 2-7 (Tier 1) | 0:01-0:12 | |
| Break + Q&A | 0:12-0:15 | |
| Slides 8-13 (Tier 2 + Hands-on) | 0:15-0:35 | |
| Break + Q&A | 0:35-0:38 | |
| Slides 14-17 (Tier 3) | 0:38-0:52 | |
| Slides 18-21 (Wrap) | 0:52-1:00 | |

---

## PRE-WORKSHOP CHECKLIST

- [ ] Claude Desktop open and signed in
- [ ] GLEIF MCP configured and working
- [ ] Playwright MCP configured and working
- [ ] Test both demos work
- [ ] QR codes scannable from back of room
- [ ] Backup laptop ready with same setup
- [ ] Pre-recorded demo videos accessible
- [ ] Setup guide URL short and memorable
- [ ] WiFi password ready to share (if needed)
