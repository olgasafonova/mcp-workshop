import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const exportDir = path.join(__dirname, 'export');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
  }

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const url = `http://localhost:8000/${slide}`;
    console.log(`Capturing ${slide}...`);

    await page.goto(url, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500)); // Wait for fonts

    const filename = `slide-${String(i + 1).padStart(2, '0')}.png`;
    await page.screenshot({
      path: path.join(exportDir, filename),
      type: 'png'
    });
  }

  await browser.close();
  console.log(`\nExported ${slides.length} slides to export/`);
}

exportSlides().catch(console.error);
