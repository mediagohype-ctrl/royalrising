// Round 2: convert the extra Drive photos and APPEND them to the image registry
// (sources.json and src/lib/project-images.ts), leaving existing entries untouched.
const fs = require("fs");
const sharp = require("sharp");

(async () => {
  const selected = JSON.parse(fs.readFileSync(".tmp/drive-selected-more.json", "utf8"));
  const sourcesPath = "public/images/projects/sources.json";
  const sources = JSON.parse(fs.readFileSync(sourcesPath, "utf8"));
  const registryPath = "src/lib/project-images.ts";
  let registry = fs.readFileSync(registryPath, "utf8");
  let n = (registry.match(/^import photo\d+/gm) || []).length;
  const imports = [];
  const entries = [];

  for (const item of selected) {
    if (sources.images.some((s) => s.key === item.key)) continue;
    const target = `public/images/projects/${item.key}.webp`;
    const info = await sharp(item.original).rotate()
      .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 88 }).toFile(target);
    sources.images.push({
      key: item.key, driveId: item.driveId, sourceName: item.sourceName,
      src: `/images/projects/${item.key}.webp`, width: info.width, height: info.height,
      source: `https://drive.google.com/file/d/${item.driveId}/view`,
    });
    imports.push(`import photo${n} from "../../public/images/projects/${item.key}.webp";`);
    entries.push(`  "project-${item.key}": photo${n},`);
    n++;
    console.log(item.key, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)} KB`);
  }

  registry = registry.replace(/(import photo\d+ from [^\n]+\n)(?!import)/, `$1${imports.join("\n")}\n`);
  registry = registry.replace(/\n};\s*$/, `\n${entries.join("\n")}\n};\n`);
  fs.writeFileSync(registryPath, registry);
  fs.writeFileSync(sourcesPath, JSON.stringify(sources, null, 2) + "\n");
})();
