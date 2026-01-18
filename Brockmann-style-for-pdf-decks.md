# Brockmann Style Guide for PDF Decks

Design system based on Josef Müller-Brockmann's grid principles, adapted for 1920x1080 presentation slides.

## Slide Dimensions

- **Canvas**: 1920 x 1080px
- **Margins**: 80px on all sides
- **Export**: 4x deviceScaleFactor for crisp PDF output (7680x4320 per slide)

## Typography Hierarchy

| Level | Size | Weight | Use Case |
|-------|------|--------|----------|
| Hero | 96px | 900 | Title slides, "Thank you" |
| H1 | 72px | 900 | Main headlines |
| H2 | 48px | 900 | Section titles, presenter name |
| H3 | 40px | 700 | Subsection titles |
| Subtitle | 32px | 700 | Supporting headlines |
| Body | 28px | 400-600 | Main content, descriptions |
| Code/Mono | 24px | 400 | Code snippets, technical text |
| Meta | 20px | 600-700 | Attribution, secondary info |
| Labels | 16-18px | 600 | Section labels, QR labels |
| Slide number | 14px | 600 | Bottom-right corner |

### Typography CSS Patterns

```css
/* Hero text */
font-size: 96px;
font-weight: 900;
letter-spacing: -0.02em;

/* H1 */
font-size: 72px;
font-weight: 900;
line-height: 1.1;
letter-spacing: -0.02em;

/* H2 */
font-size: 48px;
font-weight: 900;
letter-spacing: -0.02em;

/* Body text */
font-size: 28px;
font-weight: 400;
line-height: 1.4-1.5;
color: #444 or #555;

/* Section labels (red uppercase) */
font-size: 16px;
font-weight: 600;
letter-spacing: 0.15em;
text-transform: uppercase;
color: #E53935;

/* Tier badges (gray uppercase) */
font-size: 16px;
font-weight: 600;
letter-spacing: 0.2em;
text-transform: uppercase;
color: #888;
```

## Color Palette

| Color | Hex | Use |
|-------|-----|-----|
| Dark background | #1A1A1A | Dark slides |
| Light background | #FAFAFA | Light slides |
| Primary text (light) | #FAFAFA | Text on dark |
| Primary text (dark) | #1A1A1A | Text on light |
| Accent red | #E53935 | Highlights, labels, CTAs |
| Body gray | #444, #555 | Body text on light |
| Meta gray | #666, #777, #888 | Secondary text, labels |
| Border gray | #333 | Borders on dark |
| Border light | #E0E0E0 | Borders on light |

## Spacing System (8pt grid)

| Name | Size | Use |
|------|------|-----|
| xs | 8px | Tight spacing |
| sm | 12-16px | Label gaps, small margins |
| md | 24px | Standard gap |
| lg | 32px | Section spacing |
| xl | 48px | Major sections |
| 2xl | 64px | Large separations |
| 3xl | 80px | Margins, major padding |

## Layout Patterns

### Content Alignment

```css
/* Top-aligned content (preferred) */
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 80px;
}
```

### Two-Column Layout

```css
.slide {
  display: grid;
  grid-template-columns: 80px 1fr 1fr 80px;
  grid-template-rows: 80px 1fr 80px;
}

/* Left column */
.left { grid-column: 2 / 3; }

/* Right column with border */
.right {
  grid-column: 3 / 4;
  border-left: 1px solid #E0E0E0; /* or #333 on dark */
  padding-left: 64-80px;
}
```

### Consistent Label Positioning

- **Tier badge**: `position: absolute; top: 80px; left: 80px;`
- **Section label**: First element in content flow, `margin-bottom: 24-32px`
- **Slide number**: `position: absolute; bottom: 80px; right: 80px;`

## Visual Elements

### QR Codes

```css
.qr-code {
  width: 200-220px;
  height: 200-220px;
  background: #FAFAFA;
  padding: 12-16px;
  border-radius: 8px;
}
```

### Platform Logos

- Standard size: 40px
- Adjust individual logos for visual consistency (e.g., Substack at 56px)
- Use white versions on dark backgrounds

### Images/Screenshots

- Use consistent border-radius: 8px
- Match scale ratios when showing similar content
- For LinkedIn screenshots: calculate width based on source aspect ratio

## Export Pipeline

**ALWAYS use highest resolution for PDF export.**

```javascript
// Playwright export settings - USE MAXIMUM RESOLUTION
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 4  // ALWAYS 4x for crisp PDF (7680x4320 per slide)
});

// Wait for fonts
await page.waitForTimeout(500);
```

```bash
# Combine to PDF with ImageMagick
magick slide-*.png output.pdf
```

### Resolution Reference

| Scale | Output Size | Use |
|-------|-------------|-----|
| 1x | 1920x1080 | Never for PDF |
| 2x | 3840x2160 | Minimum acceptable |
| 3x | 5760x3240 | Good |
| **4x** | **7680x4320** | **Always use this** |

## Anti-Patterns to Avoid

- Inconsistent font sizes outside the hierarchy
- Vertically centered content (`justify-content: center`) - use `flex-start` with `padding-top`
- Different spacing between tier badge and section label across slides
- Guessing pixel values for alignment - measure exact positions
- Mixing scale factors (1x, 2x) in exports
- Using transform/scale when width adjustment works

## Alignment Technique

When pixel-perfect alignment is needed:

1. Use Playwright to measure exact Y positions of elements
2. Calculate the difference
3. Apply exact margin/padding values
4. Verify with measurement (target: <1px difference)

## Font Stack

```css
font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
```

Load via Google Fonts:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
```
