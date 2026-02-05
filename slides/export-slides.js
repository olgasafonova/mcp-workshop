const { chromium } = require('playwright');
const { readdir, readFile, writeFile } = require('fs/promises');
const { join } = require('path');
const { PDFDocument } = require('pdf-lib');

const slidesDir = '/Users/olgasafonova/Projects/MCP-workshop/slides';
const outputDir = '/Users/olgasafonova/Projects/MCP-workshop/slides/export';

async function exportSlides() {
  // Get all slide HTML files
  const files = await readdir(slidesDir);
  const slideFiles = files
    .filter(f => f.startsWith('slide-') && f.endsWith('.html'))
    .sort((a, b) => {
      const matchA = a.match(/slide-(\d+)(b)?/);
      const matchB = b.match(/slide-(\d+)(b)?/);
      const numA = parseInt(matchA?.[1] || '0');
      const numB = parseInt(matchB?.[1] || '0');
      if (numA !== numB) return numA - numB;
      // Same number: non-b comes before b
      return (matchA?.[2] ? 1 : 0) - (matchB?.[2] ? 1 : 0);
    });

  console.log(`Found ${slideFiles.length} slides:`, slideFiles);

  // Launch browser
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 4
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
  console.log('Screenshots saved to', outputDir);

  // Generate combined PDF
  console.log('Generating PDF...');
  const pdfDoc = await PDFDocument.create();
  const slideWidth = 1920;
  const slideHeight = 1080;

  for (let i = 0; i < slideFiles.length; i++) {
    const slideNum = String(i + 1).padStart(2, '0');
    const pngPath = join(outputDir, `slide-${slideNum}.png`);
    const pngBytes = await readFile(pngPath);
    const pngImage = await pdfDoc.embedPng(pngBytes);

    const page = pdfDoc.addPage([slideWidth, slideHeight]);
    page.drawImage(pngImage, {
      x: 0, y: 0,
      width: slideWidth,
      height: slideHeight,
    });
  }

  const pdfPath = join(outputDir, 'MCP-Workshop-Slides.pdf');
  const pdfBytes = await pdfDoc.save();
  await writeFile(pdfPath, pdfBytes);
  console.log(`Done! PDF saved to ${pdfPath} (${slideFiles.length} pages)`);
}

exportSlides().catch(console.error);
