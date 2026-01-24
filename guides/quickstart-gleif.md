# GLEIF + Claude Desktop Quick Start

**3 steps to look up company data in Claude Desktop.**

---

## 1. Download

Go to **[v0.2.0 release](https://github.com/olgasafonova/gleif-mcp-server/releases/tag/v0.2.0)** and download:

| Your Mac | File |
|----------|------|
| M1/M2/M3/M4 | `gleif-mcp-server-darwin-arm64` |
| Intel | `gleif-mcp-server-darwin-amd64` |

| Windows | File |
|---------|------|
| Any | `gleif-mcp-server-windows-amd64.exe` |

---

## 2. Configure

**Mac:** Open Terminal, run:
```bash
chmod +x ~/Downloads/gleif-mcp-server-darwin-arm64
xattr -d com.apple.quarantine ~/Downloads/gleif-mcp-server-darwin-arm64
```

Then press `Cmd+Shift+G` in Finder, go to `~/Library/Application Support/Claude/`

Open (or create) `claude_desktop_config.json` and paste:

```json
{
  "mcpServers": {
    "gleif": {
      "command": "/Users/YOUR_USERNAME/Downloads/gleif-mcp-server-darwin-arm64"
    }
  }
}
```

Replace `YOUR_USERNAME` with your Mac username (run `whoami` in Terminal to find it).

**Windows:** Press `Win+R`, go to `%APPDATA%\Claude`

Open (or create) `claude_desktop_config.json` and paste:

```json
{
  "mcpServers": {
    "gleif": {
      "command": "C:\\Users\\YOUR_USERNAME\\Downloads\\gleif-mcp-server-windows-amd64.exe"
    }
  }
}
```

---

## 3. Test

1. Quit Claude Desktop completely (`Cmd+Q` / Exit)
2. Reopen Claude Desktop
3. Type: **"Look up Apple's LEI using GLEIF"**

You should see company data returned.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| No tools icon | Restart Claude Desktop completely |
| "Can't find tool" | Check the path in config matches your username |
| "Permission denied" | Run the `chmod` and `xattr` commands again |

**Need more help?** See the [detailed guide](./claude-desktop-gleif-setup.md).
