import { chromium } from 'playwright';
import { readdir } from 'fs/promises';
import { join } from 'path';

const slidesDir = '/Users/olgasafonova/Projects/MCP-workshop/slides';
const outputDir = '/Users/olgasafonova/Projects/MCP-workshop/slides/export';

async function exportSlides() {
  // Get all slide HTML files
  const files = await readdir(slidesDir);
  const slideFiles = files
    .filter(f => f.startsWith('slide-') && f.endsWith('.html'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/slide-(\d+)/)?.[1] || '0');
      const numB = parseInt(b.match(/slide-(\d+)/)?.[1] || '0');
      return numA - numB;
    });

  console.log(`Found ${slideFiles.length} slides:`, slideFiles);

  // Launch browser
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  // Screenshot each slide
  for (let i = 0; i < slideFiles.length; i++) {
    const slideFile = slideFiles[i];
    const slideNum = String(i + 1).padStart(2, '0');
    const filePath = `file://${join(slidesDir, slideFile)}`;

    console.log(`Processing ${slideFile}...`);

    await page.goto(filePath, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500); // Wait for fonts to load

    await page.screenshot({
      path: join(outputDir, `slide-${slideNum}.png`),
      fullPage: false
    });
  }

  await browser.close();
  console.log('Done! Screenshots saved to', outputDir);
}

exportSlides().catch(console.error);
