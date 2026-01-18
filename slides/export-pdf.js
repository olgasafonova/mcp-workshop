const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const slides = [
  'slide-01-title.html',
  'slide-02-problem.html',
  'slide-03-rag-vs-mcp.html',
  'slide-04-what-mcp-is.html',
  'slide-05-three-parts.html',
  'slide-06-cloud-vs-local.html',
  'slide-07-tier2-intro.html',
  'slide-08-demo-gleif.html',
  'slide-09-demo-playwright.html',
  'slide-10-config.html',
  'slide-11-tier3-intro.html',
  'slide-12-architecture.html',
  'slide-13-patterns.html',
  'slide-14-getting-started.html',
  'slide-15-takeaways.html',
  'slide-16-resources.html'
];

async function exportSlides() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  const exportDir = path.join(__dirname, 'export');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
  }

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const url = `http://localhost:8000/${slide}`;
    console.log(`Capturing ${slide}...`);

    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500); // Wait for fonts

    const filename = `slide-${String(i + 1).padStart(2, '0')}.png`;
    await page.screenshot({
      path: path.join(exportDir, filename),
      type: 'png'
    });
  }

  await browser.close();
  console.log(`\nExported ${slides.length} slides to ${exportDir}/`);
  console.log('Creating PDF...');

  // Use ImageMagick to combine PNGs into PDF
  try {
    execSync(`convert ${exportDir}/slide-*.png ${exportDir}/../mcp-workshop-slides.pdf`);
    console.log('PDF created: mcp-workshop-slides.pdf');
  } catch (e) {
    console.log('Note: Install ImageMagick to auto-create PDF: brew install imagemagick');
    console.log('Or import PNGs into Google Slides manually.');
  }
}

exportSlides().catch(console.error);
