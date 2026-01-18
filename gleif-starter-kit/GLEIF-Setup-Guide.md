# Add GLEIF to Claude Desktop in 2 Minutes

**What you'll get:** Your AI can look up companies in a global financial database.

---

## Step 1: Download the Binary

Go to: **github.com/olgasafonova/gleif-mcp-server/releases**

Download the file for your computer:

| Your Computer | Download This |
|---------------|---------------|
| Mac (Apple Silicon / M1/M2/M3) | `gleif-mcp-server-darwin-arm64.mcpb` |
| Mac (Intel) | `gleif-mcp-server-darwin-amd64.mcpb` |
| Windows | `gleif-mcp-server-windows-amd64.mcpb` |

**Save it somewhere you'll remember** (e.g., Downloads folder).

---

## Step 2: Make It Executable (Mac Only)

Open Terminal and run:

```bash
chmod +x ~/Downloads/gleif-mcp-server-darwin-arm64.mcpb
```

(Adjust the filename if you downloaded a different version.)

---

## Step 3: Add to Claude Desktop Config

### On Mac

1. Open Finder
2. Press `Cmd + Shift + G`
3. Paste: `~/Library/Application Support/Claude/`
4. Open `claude_desktop_config.json` (create it if it doesn't exist)

### On Windows

1. Press `Win + R`
2. Paste: `%APPDATA%\Claude`
3. Open `claude_desktop_config.json`

---

## Step 4: Paste This Config

```json
{
  "mcpServers": {
    "gleif": {
      "command": "/Users/YOUR_USERNAME/Downloads/gleif-mcp-server-darwin-arm64.mcpb"
    }
  }
}
```

**Important:** Replace the path with where YOU saved the file.

Example paths:
- Mac: `/Users/jane/Downloads/gleif-mcp-server-darwin-arm64.mcpb`
- Windows: `C:\\Users\\Jane\\Downloads\\gleif-mcp-server-windows-amd64.mcpb`

---

## Step 5: Restart Claude Desktop

Quit Claude Desktop completely and reopen it.

---

## Step 6: Try It!

In Claude Desktop, type:

```
Look up Microsoft's LEI using GLEIF
```

or

```
Find the LEI for Tesla
```

or

```
What company has LEI HWUPKR0MPOU8FGXBT394?
```

---

## Troubleshooting

**"Server not showing"**
- Check the path in config is correct (no typos)
- Make sure you restarted Claude Desktop

**"Permission denied" (Mac)**
- Run the chmod command from Step 2

**"File not found"**
- Use absolute path (starts with `/` on Mac or `C:\` on Windows)

---

## What is GLEIF?

GLEIF is the Global Legal Entity Identifier Foundation. They maintain a database of 2+ million companies worldwide, each with a unique 20-character ID called an LEI.

The LEI system is used in financial regulations (MiFID II, EMIR, Dodd-Frank) to identify parties in transactions.

---

**Questions?** Find Olga on LinkedIn: linkedin.com/in/olgasafonova
