# Miro MCP Server Comparison Report

**Test Date:** January 5, 2026
**Test Board:** `uXjVGVokv2A=` (MCP Demo - Sprint Planning)
**Board Items:** 11 items pre-test → 18 items post-test

---

## Executive Summary

| Metric | miro-mcp-server | official-miro-mcp |
|--------|-----------------|-------------------|
| **Total Tools** | 77 | 5 |
| **Response Verbosity** | Minimal (with detail_level option) | Rich/detailed |
| **AI Integration** | Via miro_get_board_content | Built-in AI analysis |
| **Board Modification Style** | Discrete, grouped, or framed | Compound objects |

---

## Tool Availability Comparison

### miro-mcp-server (Community/Custom)
Full CRUD operations for all Miro item types:
- Sticky notes, shapes, text, frames, connectors
- Cards, app cards, documents, embeds, images
- Mindmaps, groups, tags
- Board management (create, copy, share, delete)
- Bulk operations (create, update, delete up to 20 items)
- Search, audit logs, export (Enterprise)
- Diagram generation (Mermaid syntax)

### official-miro-mcp (Miro Official)
Limited to 5 specialized tools:
1. `board_get_items` - List items with pagination
2. `board_get_image_download_url` - Get image URL
3. `board_get_image_data` - Get image binary data
4. `context_get_board_docs` - AI-generated board documentation
5. `draft_diagram_new` - AI-powered diagram generation

---

## Detailed Test Results

### Test 1: List Items

**Request:** List all items on board (limit 50)

| Metric | miro-mcp-server | official-miro-mcp |
|--------|-----------------|-------------------|
| Items returned | 11 | 11 |
| Response size | ~500 chars | ~2,500 chars |
| Estimated tokens | ~120 | ~600 |
| Data fields per item | 4-5 (id, type, content, x, y) | 8-10 (+ style, geometry, position, parent, data) |

**miro-mcp-server output structure:**
```json
{
  "id": "3458764653995431573",
  "type": "sticky_note",
  "content": "UI Refresh",
  "x": -150,
  "y": 50
}
```

**official-miro-mcp output structure:**
```json
{
  "id": "3458764653995431573",
  "type": "sticky_note",
  "data": {"shape": "square", "content": "UI Refresh"},
  "style": {"fillColor": "light_pink", "textAlign": "center", "textAlignVertical": "middle"},
  "geometry": {"height": 228, "width": 199},
  "position": {"origin": "center", "relativeTo": "canvas_center", "x": -150, "y": 50},
  "parent": null
}
```

**Winner:**
- **Speed/Tokens:** miro-mcp-server (5x less data)
- **Detail/Completeness:** official-miro-mcp (includes styles, geometry)

---

### Test 2: Board Summary / Context

**Request:** Get board overview

| Metric | miro-mcp-server (`get_board_summary`) | official-miro-mcp (`context_get_board_docs`) |
|--------|---------------------------------------|----------------------------------------------|
| Response size | ~600 chars | ~2,000 chars |
| Estimated tokens | ~150 | ~500 |
| Data type | Structured JSON | AI-generated Markdown |

**miro-mcp-server returns:**
- Board name, description, view link
- Item counts by type (frame: 1, shape: 2, sticky_note: 7, text: 1)
- 5 most recent items
- Total item count

**official-miro-mcp returns:**
- AI-analyzed project summary
- Inferred project type, purpose, target users
- Key features extracted from board content
- Technology stack analysis
- Design maturity assessment
- Recommended document types to generate
- Next steps suggestions

**Winner:**
- **Speed/Efficiency:** miro-mcp-server
- **Intelligence/Analysis:** official-miro-mcp (adds significant value through AI)

---

### Test 3: Diagram Generation

**Request:** Create flowchart with 5 nodes and 5 edges

| Metric | miro-mcp-server (`generate_diagram`) | official-miro-mcp (`draft_diagram_new`) |
|--------|--------------------------------------|----------------------------------------|
| Items created | 10 (5 shapes + 5 connectors) | 2 (1 diagram + 1 ai_generation_result) |
| Response size | ~400 chars | ~3,500 chars |
| Diagram style | Basic shapes | Professional flowchart stencils |
| Colors | Default | Color-coded by node type |
| Board clutter | Higher (10 items) | Lower (2 items) |
| Output includes | Node/connector IDs | Full diagram JSON + deep link |

**miro-mcp-server approach:**
- Creates individual Miro shapes for each node
- Creates individual connectors between shapes
- Uses basic shape types (rectangle, rhombus)
- More items on board, but individually editable

**official-miro-mcp approach:**
- Creates a single compound "diagram" item
- Uses official Miro flowchart stencils
- Professional styling with color-coded nodes:
  - Start/End: Green (#adf0c7)
  - Decision: Blue (#c6dcff)
  - Process: Yellow (#fff6b6)
- Includes deep link for direct navigation
- Also creates an "ai_generation_result" tracking item

**Winner:**
- **Simplicity/Editability:** miro-mcp-server (discrete items)
- **Visual Quality:** official-miro-mcp (professional stencils)
- **Board Organization:** official-miro-mcp (fewer items)

---

### Test 4: Filtering by Item Type

Both servers support filtering by item type with identical results (7 sticky notes).

| Metric | miro-mcp-server | official-miro-mcp |
|--------|-----------------|-------------------|
| Filter parameter | `type` | `item_type` |
| Supported types | sticky_note, shape, text, connector, frame | sticky_note, shape, text, frame, image, card, etc. |

---

## Token Consumption Summary

Estimated tokens consumed during test session:

| Operation | miro-mcp-server | official-miro-mcp |
|-----------|-----------------|-------------------|
| List items (unfiltered) | ~120 | ~600 |
| List items (filtered) | ~90 | ~450 |
| Board summary/context | ~150 | ~500 |
| Diagram generation | ~100 | ~900 |
| **Total per full operation set** | **~460** | **~2,450** |

**Ratio:** official-miro-mcp uses approximately **5x more tokens** for equivalent operations.

---

## Board State Changes

### Pre-test state
- 11 items (1 frame, 7 sticky notes, 2 shapes, 1 text)

### Post-test state
- 18 items (+7 items)
  - +5 shapes (miro-mcp-server diagram nodes)
  - +1 diagram (official-miro-mcp)
  - +1 ai_generation_result (official-miro-mcp)
  - +5 connectors (miro-mcp-server, not counted in list)

---

## Feature Matrix

| Feature | miro-mcp-server | official-miro-mcp |
|---------|-----------------|-------------------|
| Create sticky notes | Yes | No |
| Create shapes | Yes | No |
| Create frames | Yes | No |
| Create connectors | Yes | No (only via diagram) |
| Create text | Yes | No |
| Create cards | Yes | No |
| Create mindmaps | Yes | No |
| Create diagrams | Yes (Mermaid) | Yes (Natural language + Mermaid) |
| Update items | Yes | No |
| Delete items | Yes | No |
| Bulk operations | Yes (up to 20) | No |
| Search board | Yes | No |
| Share board | Yes | No |
| Copy board | Yes | No |
| List items | Yes | Yes |
| Get item details | Yes | Yes (via list) |
| Get image data | Yes | Yes |
| AI analysis | Yes (via get_board_content) | Yes (built-in) |
| Tags/labels | Yes | No |
| Groups | Yes | No |
| Board export | Yes (Enterprise) | No |

---

## Recommendations

### Use miro-mcp-server when:
- You need full CRUD operations
- Token efficiency is important
- You want to create/update/delete individual items
- You need bulk operations
- You want search, tags, groups, or sharing

### Use official-miro-mcp when:
- You need AI-powered board analysis
- You want professional-looking diagrams
- Rich styling information is required
- You're building documentation from board content
- Visual quality matters more than token efficiency

### Consider using both when:
- Use official-miro-mcp for reading/analysis (richer data)
- Use miro-mcp-server for writing/modifications (more capabilities)

---

## Conclusion

The two MCP servers serve different purposes:

**miro-mcp-server** is a comprehensive, low-level API wrapper providing full control over Miro boards with minimal overhead. It's token-efficient and feature-complete.

**official-miro-mcp** is a specialized, AI-enhanced tool focused on intelligent reading and professional diagram generation. It trades token efficiency for richer insights and better visual output.

For a production workflow, using both in combination provides the best of both worlds: AI analysis and professional diagrams from the official server, full board manipulation from the community server.
