# GLEIF + Claude Desktop

Give Claude the ability to look up company information.

---

## Step 1: Download

**[Click here to download](https://github.com/olgasafonova/gleif-mcp-server/releases/tag/v0.2.0)**

Scroll to **Assets**, click your file:
- **Mac M1/M2/M3/M4:** `gleif-mcp-server-darwin-arm64`
- **Mac Intel:** `gleif-mcp-server-darwin-amd64`
- **Windows:** `gleif-mcp-server-windows-amd64.exe`

---

## Step 2: Unblock (Mac only)

Copy this entire line, paste into Terminal (`Cmd+Space`, type "Terminal"), press Enter:

```
chmod +x ~/Downloads/gleif-mcp-server-darwin-arm64 && xattr -d com.apple.quarantine ~/Downloads/gleif-mcp-server-darwin-arm64
```

No output = it worked. Close Terminal.

---

## Step 3: Tell Claude where to find it

1. In Finder, press `Cmd+Shift+G`
2. Paste: `~/Library/Application Support/Claude/`
3. Open `claude_desktop_config.json` (create it if missing)
4. Paste this, replacing `YOUR_USERNAME` with yours:

```json
{
  "mcpServers": {
    "gleif": {
      "command": "/Users/YOUR_USERNAME/Downloads/gleif-mcp-server-darwin-arm64"
    }
  }
}
```

> **Find your username:** Open Terminal, type `whoami`, press Enter.

---

## Step 4: Restart & Test

1. Quit Claude (`Cmd+Q`)
2. Open Claude
3. Ask: *"Look up Apple's LEI"*

Done!

---

**Stuck?** See [detailed guide](./claude-desktop-gleif-setup.md) or [open an issue](https://github.com/olgasafonova/gleif-mcp-server/issues).
