# Workshop Prep Todo

## Opening "Wow" Demo

- [ ] **Set up Miro board** for live demo (blank or with template)
- [ ] **Test voice → stickies flow**:
  - Speak into Claude Code
  - Claude creates stickies on Miro board in real-time
  - Keep prompt simple: "Add 3 stickies to my Miro board: idea 1, idea 2, idea 3"
- [ ] **Pre-position Miro window** on screen so audience sees stickies appear
- [ ] **Rehearse 2-3 times** to nail the timing
- [ ] **Backup**: Pre-recorded GIF if voice input fails

---

## Audience Participation: Claude Desktop Setup

### The Goal
People download Claude Desktop during workshop and try MCPs themselves.

### Reality Check

| MCP | Works with Claude Desktop? | Non-dev friendly? | Setup complexity |
|-----|---------------------------|-------------------|------------------|
| **GLEIF** | Yes | Yes | Just config + binary |
| **Playwright** | Yes, BUT... | No | Needs npm, playwright install |

### GLEIF — Best for audience participation
- Cloud API, no local dependencies
- Just need: Claude Desktop + config + gleif-mcp-server binary
- Works on Mac, Windows, Linux
- **Action**: Create downloadable zip with binary + config snippet

### Playwright — Demo only, not for audience
- Requires Node.js, npm, playwright browsers
- Too many steps for non-devs in 1-hour workshop
- **Keep as presenter demo only**

---

## Prep Tasks

### Before Workshop

- [x] **Create GLEIF starter kit**: `gleif-starter-kit/`
  - Binaries on GitHub releases (v0.5.1)
  - Config snippets: `sample-config-mac.json`, `sample-config-windows.json`
  - Setup guide: `GLEIF-Setup-Guide.md`, `SETUP-MAC.md`, `SETUP-WINDOWS.md`
  - Live setup script: `LIVE-SETUP-SCRIPT.md`
  - Sample prompts: `sample-prompts.txt`

- [x] **Update GLEIF GitHub README** with detailed Claude Desktop setup (6 steps)

- [x] **Create setup slides**:
  - Slide 09: Get Claude Desktop (claude.ai/download)
  - Slide 10: Install GLEIF (GitHub link + config folder paths)

- [ ] **Test on fresh machine** — does GLEIF work without dev tools?

- [x] **Prepare simple GLEIF prompts** for audience to try: `gleif-starter-kit/sample-prompts.txt`

- [ ] **Create Miro board link** for opening demo

- [ ] **Record backup videos**:
  - Miro voice demo (30 sec)
  - GLEIF demo (1 min)
  - Playwright demo (1 min)

### Day of Workshop

- [ ] Claude Desktop open + configured
- [ ] Claude Code open (for voice demo)
- [ ] Miro board open in browser
- [ ] Backup videos loaded
- [ ] GLEIF starter kit link ready to share

---

## Questions to Resolve

1. ~~**Where to host GLEIF binaries?**~~ → GitHub releases (already there: v0.5.1)
2. ~~**Should audience install during Tier 1 or Tier 2?**~~ → **Tier 2** (after they understand what MCP is)
3. **WiFi bandwidth** — can 20+ people download simultaneously?
4. **Fallback if downloads fail** — show demo, share link for later?

---

## Simplified Audience Flow

**Covered in Slides 9-10:**

```
1. Download Claude Desktop from claude.ai/download (Slide 9)
2. Download GLEIF binary from github.com/olgasafonova/gleif-mcp-server/releases
3. Open config folder:
   - Mac: Cmd+Shift+G → ~/Library/Application Support/Claude/
   - Windows: Win+R → %APPDATA%\Claude
4. Add config to claude_desktop_config.json (see GitHub README)
5. Restart Claude Desktop
6. Try: "Look up Apple's LEI using GLEIF"
```

Time estimate: 5-7 minutes for non-devs with clear instructions.

**Slide deck:** 21 slides total (updated from 19)
