// Group visually identical images (including mirrored copies) by difference hash,
// and flag any that are already on the website.
const fs = require("fs");
const path = require("path");
const sharp = require("d:/royal rising/node_modules/sharp");

const S = 16; // 16x16 dHash = 256 bits
async function dhash(file, flip = false) {
  let img = sharp(file).greyscale().resize(S + 1, S, { fit: "fill" });
  if (flip) img = img.flop();
  const px = await img.raw().toBuffer();
  const bits = [];
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) bits.push(px[y * (S + 1) + x] < px[y * (S + 1) + x + 1] ? 1 : 0);
  return bits;
}
const dist = (a, b) => a.reduce((n, v, i) => n + (v !== b[i]), 0);
const LIMIT = 40; // of 256 bits

(async () => {
  const thumbs = fs.readdirSync(path.join(__dirname, "thumbs")).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const site = fs.readdirSync("d:/royal rising/public/images/projects").filter((f) => f.endsWith(".webp") && !f.endsWith("-enhanced.webp"));
  const siteHashes = [];
  for (const f of site) siteHashes.push({ f, h: await dhash(`d:/royal rising/public/images/projects/${f}`), m: await dhash(`d:/royal rising/public/images/projects/${f}`, true) });

  const items = [];
  for (const f of thumbs) items.push({ f, h: await dhash(path.join(__dirname, "thumbs", f)), m: await dhash(path.join(__dirname, "thumbs", f), true) });

  const groups = [];
  for (const it of items) {
    const g = groups.find((g) => dist(g[0].h, it.h) <= LIMIT || dist(g[0].h, it.m) <= LIMIT);
    if (g) g.push(it); else groups.push([it]);
  }
  const result = groups.map((g) => {
    const lead = g[0];
    let best = null;
    for (const s of siteHashes) {
      const d = Math.min(dist(s.h, lead.h), dist(s.m, lead.h));
      if (!best || d < best.d) best = { f: s.f, d };
    }
    return { keep: lead.f, copies: g.slice(1).map((x) => x.f), onSite: best.d <= LIMIT ? best.f : null, nearestSite: `${best.f} (${best.d})` };
  });
  fs.writeFileSync(path.join(__dirname, "groups.json"), JSON.stringify(result, null, 1));
  const fresh = result.filter((r) => !r.onSite);
  console.log("previews", items.length, "distinct", groups.length, "already on site", groups.length - fresh.length, "new", fresh.length);
  for (const r of result) console.log(r.keep.padEnd(8), "copies:", String(r.copies.length).padEnd(3), r.onSite ? "ON SITE " + r.onSite : "new   near " + r.nearestSite);
})();
