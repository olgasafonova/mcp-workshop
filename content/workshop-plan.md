# MCP Workshop: From Explorer to Architect

**Duration**: 1 hour (with breaks)
**Audience**: Developers, Product, Designers, Marketers

---

## Workshop Flow

| Time | Section | Level | Vibe |
|------|---------|-------|------|
| 0:00-0:15 | What are MCPs | Explorer | *"What can it do?"* — Curious. Watching demos. Seeing possibilities. |
| 0:15-0:18 | Break + Q&A | - | |
| 0:18-0:35 | How to Use MCPs | Practitioner | *"What can it do for me?"* — Using daily. Getting value. Prompting with intent. |
| 0:35-0:38 | Break + Q&A | - | |
| 0:38-0:55 | How to Build MCPs | Architect | *"What can I make it do?"* — Designing systems. Building servers. Enabling others. |
| 0:55-1:00 | Wrap-up + Resources | - | |

---

## Visual Approach

Clean diagrams + screenshots + live demos + social proof.

| Section | Assets |
|---------|--------|
| Explorer | RAG vs MCP diagram, Cloud vs Local diagram |
| Practitioner | `claude_desktop_config.json` screenshot, terminal, GLEIF/Playwright demo |
| Architect | Code snippets, architecture diagram, **feedback screenshots** |
| Wrap-up | QR codes (LinkedIn, Substack) |

---

## Terminology Note

**MCP tools** = the functions an MCP server exposes (e.g., `create_sticky`, `search_entity`)
**Apps** = what MCP connects to (Miro, ProductPlan, filesystem, browser)

Apps can be:
- **Cloud**: Miro, ProductPlan, GLEIF API
- **Local**: filesystem, git, browser (Playwright)

---

## Tier 1: What are MCPs (15 min)
**Level: Explorer** — *"What can it do?"*

No technical background needed. Curious. Watching demos. Seeing possibilities.

### The Problem Statement (3 min)

> "AI that knows everything and does nothing is an expensive search bar."

Most AI assistants today can:
- Answer questions
- Summarize documents
- Generate text

But they can't:
- Create a Miro board for your workshop
- Update your roadmap in ProductPlan
- Control your browser to fill out forms
- Edit files on your machine

**Visual**: Show the "expensive search bar" concept — AI as a one-way street.

### RAG vs MCP: The Key Difference (5 min)

**RAG (Retrieval-Augmented Generation)**
- Arrows pointing IN to the AI
- AI retrieves and reads information
- Still just a smarter search bar
- Example: "Find all Q1 roadmap items" → AI reads and summarizes

**MCP (Model Context Protocol)**
- Arrows pointing OUT from the AI
- AI takes action in your apps
- Becomes a collaborator, not just a consultant
- Example: "Create a Q1 roadmap with these features" → AI builds it in ProductPlan

**Visual**: Two diagrams side by side
- RAG: Multiple arrows pointing INTO a central circle (AI receives)
- MCP: Multiple arrows pointing OUT from a central circle (AI acts)

### What MCP Actually Is (4 min)

MCP is a **protocol** — a shared language that lets AI assistants talk to your apps.

Think of it like USB for AI:
- Before USB: Every device had its own cable
- After USB: One standard, everything connects
- Before MCP: Every AI integration was custom-built
- After MCP: One standard, any AI can use any app

**The Three Parts**:
1. **Client** — The AI assistant (Claude, ChatGPT, Cursor)
2. **Server** — The bridge (Miro MCP Server, Playwright MCP Server)
3. **App** — The actual service (Miro, your browser, your filesystem)

**Key insight**: Apps can be in the cloud OR on your machine.

| Cloud Apps | Local Apps |
|------------|------------|
| Miro | Your browser (Playwright) |
| ProductPlan | Files on your machine |
| GLEIF API | Local git repos |
| MediaWiki | |

**Visual**: Simple flow diagram: Client → Server → App (with cloud/local icons)

### Real Examples (3 min)

| App | Without MCP | With MCP |
|-----|-------------|----------|
| Miro (cloud) | "Describe what board you want" | "Create a workshop board with 3 frames" |
| Wiki (cloud) | "Here's text to paste in" | "Update the API documentation page" |
| Browser (local) | "Here are the steps to follow" | "Fill out this form and submit it" |
| Filesystem (local) | "Copy this code" | "Create a new file with this content" |

---

## Tier 2: How to Use MCPs (17 min)
**Level: Practitioner** — *"What can it do for me?"*

Can follow instructions, no coding required. Using daily. Getting value. Prompting with intent.

### Setup Demo (7 min)

Live demo: Setting up an MCP server in Claude Desktop

**Steps shown**:
1. Download the binary (or install via npm/go)
2. Add to Claude Desktop config (`claude_desktop_config.json`)
3. Restart Claude Desktop
4. Test with a simple command

**Example config**:
```json
{
  "mcpServers": {
    "gleif": {
      "command": "/path/to/gleif-mcp-server"
    }
  }
}
```

**Why GLEIF for setup demo**: No authentication needed. Just download and run.

### Cloud vs Local Demo (5 min)

**Demo 1: Cloud App (GLEIF)**
- "Look up Apple's LEI number"
- AI calls GLEIF API, returns structured data
- Show: data flows from cloud to AI to you

**Demo 2: Local App (Playwright)**
- "Open a browser and go to miro.com"
- "Take a screenshot of the page"
- Browser opens on YOUR machine
- Show: AI controls something right here, no cloud involved

**Key teaching moment**: Same protocol, different targets. Cloud or local, MCP doesn't care.

### Using MCP Effectively (5 min)

**Key insight**: You're giving AI a toolbox. Be specific about which app to use.

Good prompts:
- "Use the wiki server to search for authentication docs"
- "Create a Miro sticky note saying 'Review API design'"
- "Use Playwright to open the login page and take a screenshot"

Less effective:
- "Find some info about authentication" (which app?)
- "Make a note somewhere" (where?)
- "Open a website" (which browser tool?)

**Capabilities vary by server**:
- GLEIF: 4 tools (lookup LEI, search entities)
- ProductPlan: 38 tools (full roadmap management)
- Miro: 77 tools (everything from stickies to diagrams)
- Playwright: Browser automation (navigate, click, screenshot)

---

## Tier 3: How to Build MCPs (17 min)
**Level: Architect** — *"What can I make it do?"*

Developers who want to create their own. Designing systems. Building servers. Enabling others.

### The Evolution Story (4 min)

My journey building 4 MCP servers in December 2024:

| Date | Server | App Type | Learning |
|------|--------|----------|----------|
| Dec 4 | ProductPlan | Cloud API | First attempt. Learned the SDK, basic tool patterns |
| Dec 10 | MediaWiki | Cloud/Self-hosted | Added complexity: auth, multiple tool types |
| Dec 20 | Miro | Cloud API | Scaled up: 77 tools, diagrams, bulk operations |
| Dec 31 | GLEIF | Cloud API | Refined: minimal, focused, production-ready |

**Key insight**: Start with something simple. Each server taught patterns used in the next.

### Architecture Overview (5 min)

All my servers follow the same structure:

```
server/
├── main.go              # Entry point, server setup
├── tools/
│   ├── definitions.go   # Tool schemas (name, description, parameters)
│   └── handlers.go      # Tool logic (what happens when called)
├── client/
│   └── client.go        # API client for the external app
└── cache/
    └── cache.go         # Optional: response caching
```

**The minimal server needs**:
1. A tool definition (what can it do?)
2. A handler (how does it do it?)
3. A client (how does it talk to the app?)

**Code snippet** (from GLEIF — the simplest example):
```go
// Tool definition
{
    Name:        "lookup_lei",
    Description: "Look up an entity by its LEI",
    InputSchema: json.RawMessage(`{
        "type": "object",
        "properties": {
            "lei": {"type": "string", "description": "The LEI to look up"}
        },
        "required": ["lei"]
    }`),
}

// Handler
func (h *Handler) LookupLEI(lei string) (*Entity, error) {
    return h.client.GetEntity(lei)
}
```

### Production Patterns (5 min)

What I added as servers matured:

**From ProductPlan (first server)**:
- Basic error handling
- Simple retry logic

**Added in MediaWiki**:
- Authentication flows
- Rate limiting
- Markdown conversion

**Added in Miro**:
- Caching (15-minute TTL for boards)
- Bulk operations (create 20 items at once)
- Complex tool schemas (nested objects, enums)
- Audit logging

**Refined in GLEIF**:
- Clean separation of concerns
- Minimal dependencies
- No auth needed = easier testing

### The Payoff: Real Impact (3 min)

**This is what happens at the Architect level.** You build something, share it, and...

#### Miro CEO Recognition
> "Hi Olga, impressive work on Miro MCP, thank you!"
> — **Andrey Khusid, CEO at Miro** (LinkedIn DM, Dec 26, 2025)

**Screenshot**: `screenshots/miro-ceo-feedback.png`

#### Internal Adoption at Tietoevry
> "I'm just going to comment on this post again, because since getting this up & running it has been SO useful in making everyday work more efficient. Huge thanks @Olga Safonova!!!"
> — **Jenny Felldin** (Viva Engage, Jan 2026)

Also: **Morten Lerfald**: "Love it!"

Post seen by **96 people** in Public 360° - INDTECH.

**Screenshots**: `screenshots/mediawiki-internal-feedback-1.png`, `screenshots/mediawiki-internal-feedback-2.png`

**The message**: You're not just building for yourself anymore. You're enabling others.

### Getting Started (2 min)

**Option 1: Fork an existing server**
- GLEIF is simplest (no auth, 4 tools)
- Miro is most complete (all patterns, 77 tools)

**Option 2: Use the Go MCP SDK**
```bash
go get github.com/modelcontextprotocol/go-sdk
```

**Option 3: Use TypeScript SDK**
```bash
npm install @modelcontextprotocol/sdk
```

**Key resources**:
- MCP Specification: modelcontextprotocol.io
- Go SDK: github.com/modelcontextprotocol/go-sdk
- My servers: github.com/olgasafonova (as examples)

---

## Wrap-up (5 min)

### Key Takeaways by Level

| Level | Vibe | Takeaway |
|-------|------|----------|
| Explorer | *"What can it do?"* | MCP lets AI take action, not just answer questions. Works with cloud AND local apps. |
| Practitioner | *"What can it do for me?"* | Setup is simple — download, configure, restart. Start with GLEIF or Playwright. |
| Architect | *"What can I make it do?"* | Start small. My first server had 5 tools. By the fourth, I had production patterns figured out. |

### The Vision

Today: AI that can control your browser, update your roadmap, create your diagrams.

Tomorrow: AI that coordinates across all your apps seamlessly — cloud and local.

MCP is the foundation making this possible.

---

## Stay Connected

### Connect on LinkedIn
More AI insights, MCP updates, and behind-the-scenes of building these servers.

**LinkedIn**: linkedin.com/in/olgasafonova
`[QR CODE]`

### Subscribe to Substack
Deep dives on AI engineering, MCP patterns, and practical automation.

**Substack**: substack.com/@olgasafonova
`[QR CODE]`

---

## Demo Script

### Demo 1: GLEIF (Cloud App, No Auth)
```
"Look up Apple's LEI"
→ Returns: HWUPKR0MPOU8FGXBT394, Apple Inc., Cupertino, CA
```

### Demo 2: Playwright (Local App, Visual)
```
"Open a browser and navigate to miro.com"
→ Browser window opens on presenter's machine

"Take a screenshot"
→ Screenshot captured and displayed

"Click the Sign In button"
→ Visible click happens in real-time
```

### Demo 3: Miro (Cloud App, With Auth)
```
"Create a new board called 'Workshop Demo'"
→ Board created

"Add a yellow sticky saying 'Hello from MCP'"
→ Sticky appears

"Create a flowchart: Start → Process → End"
→ Diagram generated from Mermaid
```

---

## Resources

- **MCP Specification**: https://modelcontextprotocol.io
- **Example Servers** (Go):
  - GLEIF (simplest): github.com/olgasafonova/gleif-mcp-server
  - Miro (most complete): github.com/olgasafonova/miro-mcp-server
  - MediaWiki: github.com/olgasafonova/mediawiki-mcp-server
  - ProductPlan: github.com/olgasafonova/productplan-mcp-server
- **Go SDK**: github.com/modelcontextprotocol/go-sdk
- **TypeScript SDK**: github.com/modelcontextprotocol/typescript-sdk
- **Playwright MCP**: @anthropic/mcp-playwright (for local browser control)

---

## Visual Assets to Prepare

1. **RAG vs MCP diagram**
   - RAG: arrows pointing IN (retrieval)
   - MCP: arrows pointing OUT (action)

2. **Cloud vs Local diagram**
   - Split view: cloud icons (Miro, GLEIF) | laptop icons (browser, files)
   - Both connected through MCP

3. **Evolution timeline**
   - Four circles: ProductPlan → Wiki → Miro → GLEIF
   - Shows progression and learning

4. **Architecture diagram**
   - Client → Server → App flow
   - Simple 3-box diagram

5. **Live demo screens**
   - Claude Desktop config file
   - Terminal running MCP server
   - Browser being controlled by Playwright
   - Miro board being created

6. **Social proof screenshots**
   - Miro CEO LinkedIn DM
   - Internal Viva Engage feedback

7. **QR Codes** (print on handout or final slide)
   - LinkedIn profile
   - Substack subscribe page
