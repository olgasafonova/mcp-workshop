# GLEIF + Claude Desktop

Give Claude the ability to look up company information.

---

## Step 1: Download

**[Click here to download](https://github.com/olgasafonova/gleif-mcp-server/releases/latest)**

Scroll to **Assets**, click your file:
- **Mac M1/M2/M3/M4:** `gleif-mcp-server-darwin-arm64.mcpb`
- **Mac Intel:** `gleif-mcp-server-darwin-amd64.mcpb`
- **Windows:** `gleif-mcp-server-windows-amd64.mcpb`

---

## Step 2: Unblock (Mac only)

Copy this entire line, paste into Terminal (`Cmd+Space`, type "Terminal"), press Enter:

```
chmod +x ~/Downloads/gleif-mcp-server-darwin-arm64.mcpb && xattr -d com.apple.quarantine ~/Downloads/gleif-mcp-server-darwin-arm64.mcpb
```

No output = it worked. Close Terminal.

**Windows users:** If you see a SmartScreen warning, click "More info" → "Run anyway".

---

## Step 3: Tell Claude where to find it

### Mac

1. In Finder, press `Cmd+Shift+G`
2. Paste: `~/Library/Application Support/Claude/`
3. Open `claude_desktop_config.json` (create it if missing)
4. Paste this, replacing `YOUR_USERNAME` with yours:

```json
{
  "mcpServers": {
    "gleif": {
      "command": "/Users/YOUR_USERNAME/Downloads/gleif-mcp-server-darwin-arm64.mcpb"
    }
  }
}
```

> **Find your username:** Open Terminal, type `whoami`, press Enter.

### Windows

1. Press `Win+R`, paste: `%APPDATA%\Claude`
2. Open `claude_desktop_config.json` (create it if missing)
3. Paste this, replacing `YOUR_USERNAME` with yours:

```json
{
  "mcpServers": {
    "gleif": {
      "command": "C:\\Users\\YOUR_USERNAME\\Downloads\\gleif-mcp-server-windows-amd64.mcpb"
    }
  }
}
```

> **Important:** Use double backslashes `\\` in Windows paths!

---

## Step 4: Restart & Test

1. **Quit Claude completely** (Mac: `Cmd+Q` | Windows: right-click taskbar → Close)
2. Open Claude Desktop
3. Ask: *"Look up Apple's LEI"*

You should see Claude call the GLEIF tool and return data. Done!

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Server not available" | Check the path for typos. Restart Claude. |
| Mac security warning | Run the Terminal command from Step 2 |
| Windows SmartScreen | Click "More info" → "Run anyway" |
| JSON error | Check for missing commas. Validate at jsonlint.com |

**Still stuck?** See [detailed Mac guide](./claude-desktop-gleif-setup.md) or [open an issue](https://github.com/olgasafonova/gleif-mcp-server/issues).
