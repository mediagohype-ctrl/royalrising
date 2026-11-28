import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

// Import only project imagery; never embed HTML from the original WordPress site.
const slugs = ['tata-primanti-gurgaon', 'preet-vihar-delhi', 'mirzapur-up', 'living-area-noida', 'lajpat-nagar-delhi', 'gagan-vihar-delhi', 'east-of-kailash-delhi', 'preet-vihar-2', 'gagan-vihar'];
const directory = 'public/images/original-portfolio';
mkdirSync(directory, { recursive: true });
const fetch = (url) => execFileSync('curl.exe', ['-f', '-sS', '-L', '--max-time', '60', url], { maxBuffer: 30 * 1024 * 1024 });
const imports = [];
const entries = [];
const galleries = {};
const sources = {};
for (const slug of slugs) {
  const url = `https://royalrising.in/portfolio/${slug}/`;
  const html = fetch(url).toString();
  const tags = [...html.matchAll(/<a\b[^>]*>/gi)].map(match => match[0]);
  const urls = tags.filter(tag => /data-mfp-src=|prettyphoto/i.test(tag))
    .map(tag => tag.match(/(?:data-mfp-src|href)="(https:\/\/royalrising\.in\/wp-content\/uploads\/[^"?]+\.(?:jpg|jpeg|png))"/i)?.[1])
    .filter(Boolean);
  const fullImages = [...html.matchAll(/<img\b[^>]*>/gi)]
    .map(match => match[0]).filter(tag => /vc_single_image-img attachment-(full|thumbnail)/.test(tag))
    .map(tag => tag.match(/src="(https:\/\/royalrising\.in\/wp-content\/uploads\/[^"?]+\.(?:jpg|jpeg|png))"/i)?.[1]?.replace(/-80x80(?=\.[^.]+$)/, '')).filter(Boolean);
  const unique = [...new Map([...urls, ...fullImages].map(url => [url.replace(/-\d+x\d+(?=\.[^.]+$)/, ''), url])).values()];
  if (!unique.length) throw new Error(`No project images: ${slug}`);
  galleries[slug] = [];
  sources[slug] = { url, images: unique };
  for (const [index, imageUrl] of unique.entries()) {
    const key = `original-${slug}-${index + 1}`;
    const filename = `${slug}-${index + 1}.webp`;
    if (!existsSync(`${directory}/${filename}`)) {
      await sharp(fetch(imageUrl)).rotate().resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 88 }).toFile(`${directory}/${filename}`);
    }
    const variable = `photo${imports.length}`;
    imports.push(`import ${variable} from "../../${directory}/${filename}";`);
    entries.push(`  "${key}": ${variable},`);
    galleries[slug].push(key);
  }
  console.log(`${slug}: ${unique.length} images`);
}
writeFileSync('src/lib/original-portfolio-images.ts', `${imports.join('\n')}\n\nexport const originalPortfolioImages = {\n${entries.join('\n')}\n};\n\nexport const originalPortfolioGalleries = ${JSON.stringify(galleries, null, 2)} as const;\n`);
writeFileSync(`${directory}/sources.json`, `${JSON.stringify(sources, null, 2)}\n`);
