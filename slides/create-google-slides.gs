/**
 * Google Apps Script to create a presentation from slide images
 *
 * Setup:
 * 1. Upload all slide-XX.png files to a Google Drive folder
 * 2. Open Google Apps Script (script.google.com)
 * 3. Paste this code and update FOLDER_ID below
 * 4. Run createPresentationFromImages()
 */

// Replace with your Google Drive folder ID containing the slide images
const FOLDER_ID = 'YOUR_FOLDER_ID_HERE';
const PRESENTATION_NAME = 'MCP Workshop - Building AI Tools';

function createPresentationFromImages() {
  // Get the folder with images
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const files = folder.getFilesByType(MimeType.PNG);

  // Collect and sort files by name
  const imageFiles = [];
  while (files.hasNext()) {
    const file = files.next();
    if (file.getName().startsWith('slide-')) {
      imageFiles.push(file);
    }
  }

  // Sort by slide number
  imageFiles.sort((a, b) => {
    const numA = parseInt(a.getName().match(/slide-(\d+)/)?.[1] || '0');
    const numB = parseInt(b.getName().match(/slide-(\d+)/)?.[1] || '0');
    return numA - numB;
  });

  Logger.log(`Found ${imageFiles.length} slides`);

  // Create new presentation
  const presentation = SlidesApp.create(PRESENTATION_NAME);
  const slides = presentation.getSlides();

  // Remove the default blank slide
  if (slides.length > 0) {
    slides[0].remove();
  }

  // Add each image as a slide
  for (let i = 0; i < imageFiles.length; i++) {
    const imageFile = imageFiles[i];
    Logger.log(`Adding slide ${i + 1}: ${imageFile.getName()}`);

    // Create a new blank slide
    const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);

    // Get the slide dimensions (standard 16:9)
    const pageWidth = presentation.getPageWidth();
    const pageHeight = presentation.getPageHeight();

    // Insert image to fill the entire slide
    const image = slide.insertImage(imageFile.getBlob());

    // Position and size to fill slide
    image.setLeft(0);
    image.setTop(0);
    image.setWidth(pageWidth);
    image.setHeight(pageHeight);
  }

  // Save and log the URL
  const url = presentation.getUrl();
  Logger.log(`Presentation created: ${url}`);

  return url;
}

/**
 * Helper function to get folder ID from URL
 * Drive folder URL format: https://drive.google.com/drive/folders/FOLDER_ID
 */
function getFolderIdFromUrl(url) {
  const match = url.match(/folders\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}
