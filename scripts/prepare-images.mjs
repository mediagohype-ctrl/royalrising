// Converts the raw client assets in /assets into named, web-ready files in /public/images.
// - Renames every asset to something meaningful
// - Crops baked-in logos out of renders used full-bleed
// - Extracts the gold monogram onto a transparent background
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "assets";
const OUT = "public/images";
fs.mkdirSync(OUT, { recursive: true });

const a = (stamp) => path.join(SRC, `WhatsApp Image 2026-10-21 at ${stamp}.jpeg`);

/** [source stamp, output name, optional crop {left, top, width, height}] */
const jobs = [
  // Futuristic Home & Mandir
  ["10.50.37", "fh-plan-line", null],
  ["10.50.37 (1)", "fh-plan-color", null],
  ["10.50.38", "fh-aerial", { left: 0, top: 240, width: 1320, height: 1126 }],
  ["10.50.38 (1)", "fh-day", { left: 0, top: 340, width: 1320, height: 1020 }],
  ["10.50.38 (2)", "fh-night", { left: 0, top: 340, width: 1320, height: 1020 }],
  ["10.50.39", "fh-views", null],

  // H-Shaped Ultra Luxury Mansion
  ["10.50.59", "hm-plan-color", null],
  ["10.50.59 (1)", "hm-plan-line", null],
  ["10.50.59 (2)", "hm-night-waterfall", null],
  ["10.51.00", "hm-aerial-dusk", null],
  ["10.51.00 (1)", "hm-aerial-day", null],
  ["10.51.00 (2)", "hm-garden-dusk", null],

  // Organic Residence
  ["10.51.38", "or-day", { left: 0, top: 270, width: 1320, height: 1060 }],
  ["10.51.38 (1)", "or-night", { left: 0, top: 270, width: 1320, height: 1060 }],
  ["10.51.38", "or-day-branded", null],
  ["10.51.38 (1)", "or-night-branded", null],
  ["10.51.38 (2)", "or-plans-color", null],
  ["10.51.39", "or-plans-blueprint", null],

  // Futuristic Organic Villa 145
  ["10.52.14", "v145-cutaway", null],
  ["10.52.15", "v145-night", { left: 0, top: 0, width: 1320, height: 680 }],
  ["10.52.15 (1)", "v145-day", { left: 0, top: 0, width: 1320, height: 680 }],
  ["10.52.15 (2)", "v145-plan-color", null],
  ["10.52.16", "v145-plan-line", null],

  // Twin Palace with Mandir
  ["10.53.02", "tp-sunset", null],
  ["10.53.02 (1)", "tp-aerial-night", null],
  ["10.53.03", "tp-front-night", null],
  ["10.53.03 (1)", "tp-aerial-day", null],
  ["10.53.03 (2)", "tp-front-day", null],
  ["10.53.04", "tp-concept-front", null],
  ["10.53.04 (1)", "tp-concept-aerial", null],
  ["10.53.04 (2)", "tp-siteplan", { left: 60, top: 240, width: 1230, height: 1090 }],
];

// The sources are WhatsApp-compressed (~1320px wide). Supersample 2× with Lanczos and a light
// sharpen so large screens never fall back to the browser's soft bilinear upscale.
// When an AI-upscaled (4×, Real-ESRGAN) copy exists in assets-hq/, it is used instead:
// crops are scaled to match and the result is capped at 4K width.
const HQ = "assets-hq";
const MAX_W = 3840;
const hq = (stamp) => path.join(HQ, `WhatsApp Image 2026-10-21 at ${stamp}.png`);

for (const [stamp, name, crop] of jobs) {
  const useHq = fs.existsSync(hq(stamp));
  const src = useHq ? hq(stamp) : a(stamp);
  const k = useHq ? 4 : 1;
  let img = sharp(src);
  if (crop) img = img.extract({ left: crop.left * k, top: crop.top * k, width: crop.width * k, height: crop.height * k });
  const width = crop ? crop.width * k : (await sharp(src).metadata()).width;

  img = useHq
    ? img.resize({ width: Math.min(width, MAX_W), kernel: "lanczos3" })
    : img.resize({ width: width * 2, kernel: "lanczos3" }).sharpen({ sigma: 0.6, m1: 0.4, m2: 1.2 });
  await img.jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: "4:4:4" }).toFile(path.join(OUT, `${name}.jpg`));
  console.log(useHq ? "✓ HQ" : "✓   ", name);
}

// Gold monogram: key the navy night sky out by "goldness" (red well above blue).
async function extractLogo(region, name) {
  const { data, info } = await sharp(a("10.50.38 (2)"))
    .extract(region)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const gold = (r - b - 34) / 46;
    const alpha = Math.max(0, Math.min(1, gold));
    data[i + 3] = Math.round(alpha * 255);
    // lift edge pixels toward gold so dark fringes don't show
    if (alpha < 1) {
      data[i] = Math.max(r, 200);
      data[i + 1] = Math.max(g, 160);
      data[i + 2] = Math.min(b, 90);
    }
  }
  await sharp(data, { raw: info }).png().toFile(path.join(OUT, `${name}.png`));
  console.log("✓", name);
}

await extractLogo({ left: 565, top: 18, width: 190, height: 240 }, "logo-mark");
await extractLogo({ left: 530, top: 18, width: 260, height: 276 }, "logo-full");

// Emit dimensions so layouts can reserve the right aspect ratio
const meta = {};
for (const f of fs.readdirSync(OUT)) {
  const m = await sharp(path.join(OUT, f)).metadata();
  meta[f.replace(/\.(jpg|png)$/, "")] = { src: `/images/${f}`, width: m.width, height: m.height };
}
fs.mkdirSync("src/lib", { recursive: true });
fs.writeFileSync("src/lib/image-meta.json", JSON.stringify(meta, null, 2));
console.log("✓ image-meta.json");
