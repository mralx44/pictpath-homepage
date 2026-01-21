const puppeteer = require('puppeteer');
const path = require('path');

async function generateOGImage() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to exact OG image size
  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 1
  });
  
  // Load the HTML file
  const htmlPath = path.join(__dirname, 'og-preview.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  
  // Take screenshot
  await page.screenshot({
    path: path.join(__dirname, 'og-preview.png'),
    type: 'png'
  });
  
  await browser.close();
  console.log('✅ OG preview image generated: og-preview.png');
}

generateOGImage().catch(console.error);
