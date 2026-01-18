# Live Setup Script for Presenter

**Use this during Tier 2 when audience installs GLEIF.**

---

## Before You Start (say this)

> "We're going to add GLEIF to your Claude Desktop. This takes about 3 minutes.
> Don't worry if you hit issues — we'll troubleshoot together.
>
> Mac users, follow along with me. Windows users, your steps are similar but paths look different — I'll call out the differences."

---

## Step-by-Step (show on YOUR screen)

### 1. Download (1 min)

> "Go to github.com/olgasafonova/gleif-mcp-server/releases"

**Show the releases page on screen.**

> "Download the file for your system:
> - Mac M1/M2/M3/M4: darwin-arm64
> - Mac Intel: darwin-amd64
> - Windows: windows-amd64
>
> Save it to Downloads."

**Wait 30 seconds for downloads.**

---

### 2. Mac: Unblock the file (30 sec)

> "Mac users — macOS blocks downloaded files. Let's fix that.
>
> Open Terminal — press Cmd + Space, type Terminal, Enter.
>
> Paste this command..."

**Show on screen:**
```bash
chmod +x ~/Downloads/gleif-mcp-server-darwin-arm64.mcpb && xattr -d com.apple.quarantine ~/Downloads/gleif-mcp-server-darwin-arm64.mcpb
```

> "If you have Intel Mac, change 'arm64' to 'amd64' in that command."

---

### 3. Find the config file (1 min)

**Mac (show on screen):**
> "Finder → Cmd + Shift + G → paste this path:"

```
~/Library/Application Support/Claude/
```

> "Open claude_desktop_config.json. If it doesn't exist, create it."

**Windows (say this):**
> "Windows users: press Win + R, paste %APPDATA%\Claude, and open the config file there."

---

### 4. Add the config (1 min)

**Show on screen (Mac version):**

```json
{
  "mcpServers": {
    "gleif": {
      "command": "/Users/YOUR_USERNAME/Downloads/gleif-mcp-server-darwin-arm64.mcpb"
    }
  }
}
```

> "Replace YOUR_USERNAME with your actual username.
>
> To find it: open Terminal, type 'whoami', press Enter.
>
> Windows users: your path looks like C-colon-backslash-backslash-Users-backslash-backslash...
> Use DOUBLE backslashes. Check your handout for the exact format."

---

### 5. Restart Claude Desktop (15 sec)

> "Cmd + Q to quit completely. Then reopen Claude Desktop."

---

### 6. Test it (30 sec)

> "Type: Look up Apple's LEI using GLEIF"

**Show the expected result on your screen.**

> "You should see Claude call the GLEIF tool. If you see company data, you're done!"

---

## Common Issues (call these out)

| They say... | You say... |
|-------------|------------|
| "Server not showing" | "Check your path for typos. Did you restart Claude?" |
| "Permission denied" | "Mac users: run the Terminal command again" |
| "JSON error" | "Check for missing commas. Use jsonlint.com to validate" |
| "Can't find config folder" | "Mac: Cmd+Shift+G in Finder. Windows: Win+R, %APPDATA%\Claude" |
| "File blocked by Windows" | "Click More Info → Run Anyway" |

---

## If Someone Is Stuck

> "If you're still having trouble, don't worry — follow along with my screen for now.
> The setup guide is in the handout, and you can try again after the workshop."

**Don't let one stuck person derail the whole room.**

---

## Time Budget

| Step | Time |
|------|------|
| Download | 1:00 |
| Unblock (Mac) | 0:30 |
| Find config | 1:00 |
| Edit config | 1:00 |
| Restart + test | 0:45 |
| **Total** | **4:15** |

Buffer for questions: add 2-3 minutes. **Total: ~7 minutes.**
