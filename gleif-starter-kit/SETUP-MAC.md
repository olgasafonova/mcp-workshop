# GLEIF Setup for Mac

**Time needed:** 2-3 minutes

---

## Step 1: Download

1. Go to: **[github.com/olgasafonova/gleif-mcp-server/releases/latest](https://github.com/olgasafonova/gleif-mcp-server/releases/latest)**
2. Scroll to **Assets** and download:
   - **Apple Silicon (M1/M2/M3/M4):** `gleif-mcp-server-darwin-arm64.mcpb`
   - **Intel Mac:** `gleif-mcp-server-darwin-amd64.mcpb`

Not sure which Mac you have? Click  → About This Mac → look for "Chip"

---

## Step 2: Allow the File to Run

macOS blocks downloaded files by default. Fix it:

### Option A: Right-click method
1. Find the file in Downloads
2. **Right-click** → **Open**
3. Click "Open" in the warning dialog

### Option B: Terminal method
```bash
chmod +x ~/Downloads/gleif-mcp-server-darwin-arm64.mcpb
xattr -d com.apple.quarantine ~/Downloads/gleif-mcp-server-darwin-arm64.mcpb
```

---

## Step 3: Find the Config File

1. Open **Finder**
2. Press **Cmd + Shift + G** (Go to Folder)
3. Paste this path and press Enter:
   ```
   ~/Library/Application Support/Claude/
   ```
4. Look for `claude_desktop_config.json`
   - If it exists → open it with TextEdit
   - If it doesn't exist → create a new file with that exact name

---

## Step 4: Add the Config

### If the file is EMPTY or NEW:

Paste this (replace YOUR_USERNAME with your actual username):

```json
{
  "mcpServers": {
    "gleif": {
      "command": "/Users/YOUR_USERNAME/Downloads/gleif-mcp-server-darwin-arm64.mcpb"
    }
  }
}
```

### If the file ALREADY HAS content:

Add the gleif section inside the existing `mcpServers`. Example:

```json
{
  "mcpServers": {
    "some-other-server": {
      "command": "/path/to/other"
    },
    "gleif": {
      "command": "/Users/YOUR_USERNAME/Downloads/gleif-mcp-server-darwin-arm64.mcpb"
    }
  }
}
```

**Important:** Don't forget the comma between servers!

---

## Step 5: Find Your Username

Not sure what YOUR_USERNAME is? Open Terminal and type:

```bash
whoami
```

It will print your username (e.g., `jane`, `olga`, `john.smith`).

---

## Step 6: Restart Claude Desktop

1. **Cmd + Q** to fully quit Claude Desktop
2. Open Claude Desktop again

---

## Step 7: Test It!

Type in Claude Desktop:

```
Look up Apple's LEI using GLEIF
```

You should see Claude call the GLEIF tool and return company data.

---

## Troubleshooting

### "Server not available"
- Check the path — typos are the #1 cause
- Make sure the file is in the location you specified
- Restart Claude Desktop again

### "Permission denied"
- Run the Terminal commands from Step 2 (Option B)

### "Malicious software" warning
- Right-click → Open (not double-click)
- Or run the `xattr` command from Step 2

### JSON errors
- Check for missing commas between servers
- Check for missing quotes around paths
- Use a JSON validator: **jsonlint.com**

---

## Quick Reference

| Item | Value |
|------|-------|
| Config location | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Binary location | Wherever you saved it (e.g., `~/Downloads/`) |
| Path format | `/Users/username/path/to/file` |
