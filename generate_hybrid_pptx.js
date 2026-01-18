/**
 * Generate hybrid PPTX: screenshots as backgrounds + editable text overlays
 * Uses Playwright for screenshots, then calls Python for PPTX generation
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Slide files in order (matching the presentation flow)
const SLIDES = [
  'slide-01-title.html',
  'slide-02-problem.html',
  'slide-03-rag-vs-mcp.html',
  'slide-04-what-mcp-is.html',
  'slide-05-three-parts.html',
  'slide-06-what-servers-provide.html',
  'slide-07-cloud-vs-local.html',
  'slide-08-tier2-intro.html',
  'slide-08b-get-claude-desktop.html',
  'slide-09-demo-gleif.html',
  'slide-10-demo-playwright.html',
  'slide-11-config.html',
  'slide-11b-install-gleif.html',
  'slide-12-tier3-intro.html',
  'slide-13-architecture.html',
  'slide-14-patterns.html',
  'slide-15-getting-started.html',
  'slide-16-takeaways.html',
  'slide-17-testimonial.html',
  'slide-18-resources.html',
  'slide-19-thankyou.html',
];

// Editable text overlays for each slide
// Format: { left, top, width, height } in percentages of slide, plus text content
const OVERLAYS = {
  'slide-01-title.html': [
    { left: 4, top: 26, width: 60, height: 22, text: 'From Explorer\nto Architect', fontSize: 72, bold: true },
    { left: 4, top: 52, width: 55, height: 12, text: 'Model Context Protocol: the standard that lets AI assistants take action in your apps', fontSize: 24 },
  ],
  'slide-02-problem.html': [
    { left: 4, top: 22, width: 75, height: 28, text: 'AI that knows everything and does nothing is an expensive search bar.', fontSize: 48, bold: true },
    { left: 4, top: 52, width: 55, height: 15, text: 'Current AI can answer questions and generate text.\nBut it can\'t create a Miro board or update your roadmap.', fontSize: 20 },
  ],
  'slide-03-rag-vs-mcp.html': [
    { left: 4, top: 16, width: 40, height: 8, text: 'RAG vs MCP', fontSize: 48, bold: true },
  ],
  'slide-04-what-mcp-is.html': [
    { left: 4, top: 20, width: 50, height: 8, text: 'A protocol.', fontSize: 48, bold: true },
    { left: 4, top: 35, width: 50, height: 10, text: 'Like USB-C for AI.', fontSize: 48, bold: true },
  ],
  'slide-05-three-parts.html': [
    { left: 4, top: 16, width: 50, height: 8, text: 'How it works', fontSize: 48, bold: true },
  ],
  'slide-06-what-servers-provide.html': [
    { left: 4, top: 16, width: 60, height: 8, text: 'What servers provide', fontSize: 48, bold: true },
  ],
  'slide-07-cloud-vs-local.html': [
    { left: 4, top: 16, width: 60, height: 8, text: 'Apps can be anywhere.', fontSize: 48, bold: true },
  ],
  'slide-08-tier2-intro.html': [
    { left: 4, top: 38, width: 60, height: 15, text: 'How to Use MCPs', fontSize: 72, bold: true },
  ],
  'slide-08b-get-claude-desktop.html': [
    { left: 4, top: 18, width: 60, height: 10, text: 'Get Claude Desktop', fontSize: 48, bold: true },
  ],
  'slide-09-demo-gleif.html': [
    { left: 4, top: 20, width: 30, height: 8, text: 'GLEIF', fontSize: 48, bold: true },
  ],
  'slide-10-demo-playwright.html': [
    { left: 4, top: 20, width: 30, height: 8, text: 'Playwright', fontSize: 48, bold: true },
  ],
  'slide-11-config.html': [
    { left: 4, top: 20, width: 40, height: 8, text: 'Configuration', fontSize: 48, bold: true },
  ],
  'slide-11b-install-gleif.html': [
    { left: 4, top: 18, width: 50, height: 8, text: 'Try it: Add GLEIF', fontSize: 48, bold: true },
  ],
  'slide-12-tier3-intro.html': [
    { left: 4, top: 38, width: 60, height: 15, text: 'How to Build MCPs', fontSize: 72, bold: true },
  ],
  'slide-13-architecture.html': [
    { left: 4, top: 16, width: 55, height: 8, text: 'Architecture Overview', fontSize: 48, bold: true },
  ],
  'slide-14-patterns.html': [
    { left: 4, top: 16, width: 50, height: 8, text: 'Production Patterns', fontSize: 48, bold: true },
  ],
  'slide-15-getting-started.html': [
    { left: 4, top: 16, width: 50, height: 8, text: 'Getting Started', fontSize: 48, bold: true },
  ],
  'slide-16-takeaways.html': [
    { left: 4, top: 16, width: 30, height: 8, text: 'Distilled', fontSize: 48, bold: true },
  ],
  'slide-17-testimonial.html': [],  // Complex layout, no overlays
  'slide-18-resources.html': [
    { left: 4, top: 20, width: 40, height: 8, text: 'Learn More', fontSize: 36, bold: true },
  ],
  'slide-19-thankyou.html': [
    { left: 30, top: 18, width: 40, height: 12, text: 'Thank you!', fontSize: 64, bold: true, align: 'center' },
    { left: 30, top: 35, width: 40, height: 8, text: 'Olga Safonova', fontSize: 36, bold: true, align: 'center' },
  ],
};

async function main() {
  const slidesDir = path.join(__dirname, 'slides');
  const outputDir = path.join(__dirname, 'slide-screenshots');

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  console.log('Launching browser...');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 4,  // 4x resolution for crisp output
  });

  const screenshotPaths = [];

  for (let i = 0; i < SLIDES.length; i++) {
    const slideFile = SLIDES[i];
    const slidePath = path.join(slidesDir, slideFile);

    if (!fs.existsSync(slidePath)) {
      console.log(`⚠ Skipping missing file: ${slideFile}`);
      continue;
    }

    const page = await context.newPage();
    await page.goto(`file://${slidePath}`);
    await page.waitForTimeout(500);  // Wait for fonts to load

    // Hide all text elements before screenshot (keep graphics only)
    await page.addStyleTag({
      content: `
        /* Hide all text by making it transparent */
        h1, h2, h3, h4, h5, h6, p, span, li, a, label,
        .title, .subtitle, .label, .description, .body,
        .stat-value, .stat-label, .stat-description,
        .bullet-text, .bullet-item, .item-title, .item-description,
        .quote, .author, .role, .presenter, .presenter-title,
        .thank-you, .section-label, .qr-label, .slide-number,
        .card-title, .card-description, .tier-title, .tier-subtitle,
        .code-line, .code-comment, .code-key, .code-value, .code-string,
        .feature-title, .feature-description, .takeaway-text,
        .resource-title, .resource-url, .testimonial-text, .testimonial-author {
          color: transparent !important;
          -webkit-text-fill-color: transparent !important;
        }

        /* Also hide text in specific elements that use background tricks */
        .highlight, .accent, .badge {
          color: transparent !important;
          -webkit-text-fill-color: transparent !important;
        }
      `
    });

    await page.waitForTimeout(100);  // Let CSS apply

    const outputPath = path.join(outputDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    await page.screenshot({ path: outputPath, type: 'png' });
    await page.close();

    screenshotPaths.push({
      index: i,
      path: outputPath,
      file: slideFile,
      overlays: OVERLAYS[slideFile] || [],
    });

    console.log(`✓ ${i + 1}/${SLIDES.length} ${slideFile}`);
  }

  await browser.close();

  // Write metadata for Python script
  const metadataPath = path.join(outputDir, 'metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(screenshotPaths, null, 2));
  console.log(`\n✓ Screenshots saved to ${outputDir}/`);
  console.log(`✓ Metadata saved to ${metadataPath}`);
  console.log('\nRun: python3 generate_hybrid_pptx.py');
}

main().catch(console.error);
