import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projects = [
  { slug: "drive-cloner", url: "https://driveclonerbysuhaib.lovable.app/" },
  { slug: "rapidkeys", url: "https://rapidkeys-pro.netlify.app/" },
  { slug: "portfolio-v1", url: "https://suhaib-abid-portfolio.netlify.app/" },
  { slug: "vip-wallpaper", url: "https://vip-wallpaper-changer.netlify.app/" },
  { slug: "quest-completer", url: "https://quest-completer-by-suhaib.netlify.app/" }
];

const outDir = path.join(__dirname, 'public', 'projects');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
  console.log('Starting browser...');
  const browser = await puppeteer.launch({ 
    headless: "new",
    defaultViewport: { width: 1920, height: 1080 } 
  });
  
  const page = await browser.newPage();
  
  for (const project of projects) {
    console.log(`Navigating to ${project.url}...`);
    try {
      await page.goto(project.url, { waitUntil: 'networkidle2', timeout: 30000 });
      // Wait an extra second for animations to settle
      await new Promise(r => setTimeout(r, 1000));
      
      const outPath = path.join(outDir, `${project.slug}.png`);
      await page.screenshot({ path: outPath });
      console.log(`Saved screenshot to ${outPath}`);
    } catch (e) {
      console.error(`Failed to capture ${project.slug}:`, e.message);
    }
  }

  await browser.close();
  console.log('Done!');
})();
