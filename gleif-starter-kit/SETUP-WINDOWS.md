# GLEIF Setup for Windows

**Time needed:** 2-3 minutes

---

## Step 1: Download

1. Go to: **github.com/olgasafonova/gleif-mcp-server/releases**
2. Download: `gleif-mcp-server-windows-amd64.mcpb`
3. Save to your Downloads folder

---

## Step 2: Find the Config File

1. Press **Win + R** (opens Run dialog)
2. Paste this and press Enter:
   ```
   %APPDATA%\Claude
   ```
3. Look for `claude_desktop_config.json`
   - If it exists → right-click → Open with → Notepad
   - If it doesn't exist → create a new file with that exact name

### To create a new file:
1. Right-click in the folder → New → Text Document
2. Name it `claude_desktop_config.json` (make sure it's not `claude_desktop_config.json.txt`)
3. If you can't see file extensions: View → Show → File name extensions

---

## Step 3: Add the Config

### If the file is EMPTY or NEW:

Paste this (replace YOUR_USERNAME with your actual username):

```json
{
  "mcpServers": {
    "gleif": {
      "command": "C:\\Users\\YOUR_USERNAME\\Downloads\\gleif-mcp-server-windows-amd64.mcpb"
    }
  }
}
```

**Important:** Use double backslashes `\\` in Windows paths!

### If the file ALREADY HAS content:

Add the gleif section inside the existing `mcpServers`. Example:

```json
{
  "mcpServers": {
    "some-other-server": {
      "command": "C:\\path\\to\\other"
    },
    "gleif": {
      "command": "C:\\Users\\YOUR_USERNAME\\Downloads\\gleif-mcp-server-windows-amd64.mcpb"
    }
  }
}
```

**Important:** Don't forget the comma between servers!

---

## Step 4: Find Your Username

Not sure what YOUR_USERNAME is?

1. Press **Win + R**
2. Type `cmd` and press Enter
3. Look at the prompt — it shows `C:\Users\YourUsername>`

Or just open File Explorer and go to `C:\Users\` — your username is the folder name.

---

## Step 5: Restart Claude Desktop

1. Right-click Claude in taskbar → Close window
2. Or: Task Manager → End task on Claude
3. Open Claude Desktop again

---

## Step 6: Test It!

Type in Claude Desktop:

```
Look up Apple's LEI using GLEIF
```

You should see Claude call the GLEIF tool and return company data.

---

## Troubleshooting

### "Server not available"
- Check the path — typos are the #1 cause
- Make sure you used `\\` not `/` in paths
- Restart Claude Desktop again

### "File not found"
- Check if the .mcpb file is really in Downloads
- Make sure the path matches exactly where you saved it

### JSON errors
- Check for missing commas between servers
- Check for missing quotes around paths
- Make sure you used `\\` not `\` (single backslash breaks JSON)
- Use a JSON validator: **jsonlint.com**

### Config file has .txt extension
- Make sure the file is named `claude_desktop_config.json` not `claude_desktop_config.json.txt`
- Enable "File name extensions" in File Explorer to check

### Windows Defender warning
- Click "More info" → "Run anyway"
- The file is safe — it's just not signed

---

## Quick Reference

| Item | Value |
|------|-------|
| Config location | `%APPDATA%\Claude\claude_desktop_config.json` |
| Full config path | `C:\Users\USERNAME\AppData\Roaming\Claude\claude_desktop_config.json` |
| Binary location | Wherever you saved it (e.g., `C:\Users\USERNAME\Downloads\`) |
| Path format | `C:\\Users\\username\\path\\to\\file` (double backslashes!) |
