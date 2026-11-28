import meta from "./image-meta.json";
import extensions from "./image-extensions.json";
import { projectImages } from "./project-images";
import { originalPortfolioImages } from "./original-portfolio-images";

/**
 * Full-resolution, lightly sharpened copies for the large home page slots
 * (public/images/hd, made from the originals; the "-extended" versions are only 1672px).
 */
const hd = (name: keyof typeof meta) => ({ ...meta[name], src: `/images/hd/${name}.jpg` });
const hdImages = {
  "hd-tp-front-day": hd("tp-front-day"),
  "hd-v145-night": hd("v145-night"),
  "hd-v145-day": hd("v145-day"),
  "hd-hm-night-waterfall": hd("hm-night-waterfall"),
  "hd-hm-garden-dusk": hd("hm-garden-dusk"),
  "hd-fh-aerial": hd("fh-aerial"),
  "hd-tp-front-night": hd("tp-front-night"),
  "hd-hm-aerial-dusk": hd("hm-aerial-dusk"),
  "hd-v145-cutaway": hd("v145-cutaway"),
  "hd-or-day": hd("or-day"),
};

const displayImages = { ...meta, ...extensions, ...projectImages, ...hdImages, ...originalPortfolioImages };
export type ImgKey = keyof typeof displayImages;
export const img = (key: ImgKey) => displayImages[key];

export const contact = {
  email: "info@royalrising.in",
  website: "www.royalrising.in",
  websiteUrl: "https://www.royalrising.in",
  instagram: "https://www.instagram.com/royal.rising/",
  facebook: "https://www.facebook.com/RoyalRising",
  instagramHandle: "@royal.rising",
};

export const navLeft = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
];
export const navRight = [
  { label: "Our Approach", href: "/approach" },
  { label: "Drawings", href: "/drawings" },
];

export const heroSlides: { k: ImgKey; name: string }[] = [
  { k: "project-formal-living", name: "Designed for the life inside" },
  { k: "project-green-lounge", name: "Luxury without the noise" },
  { k: "project-staircase-dining", name: "Every detail, drawn" },
];

/** Home page services slider. `slug` links each slide to its /services/{slug} page. */
export const services: { k: ImgKey; slug: string; title: string; text: string }[] = [
  { k: "hd-hm-garden-dusk", slug: "architecture", title: "Architecture", text: "Residences planned around the site, its light and its views." },
  { k: "project-home-cinema", slug: "interior-design", title: "Interior Design", text: "Layouts, materials and lighting resolved room by room." },
  { k: "hd-v145-cutaway", slug: "master-planning", title: "Master Planning", text: "Buildings, gardens and arrival arranged as one estate." },
  { k: "hd-or-day", slug: "construction", title: "Construction", text: "Delivery coordinated from working drawings to the last fitting." },
];

export type Tile = { k: ImgKey; title: string };
export type Row = { kind: "two" | "full" | "center"; tiles: Tile[] };

export const featured: Row[] = [
  { kind: "two", tiles: [{ k: "project-residence-facade", title: "Residential Facade" }, { k: "project-timber-facade", title: "Timber & Stone Facade" }] },
  { kind: "full", tiles: [{ k: "hd-tp-front-night", title: "Twin Palace" }] },
  { kind: "two", tiles: [{ k: "project-formal-living", title: "Formal Living" }, { k: "project-staircase-dining", title: "Sculptural Staircase" }] },
  { kind: "two", tiles: [{ k: "project-green-lounge", title: "The Green Lounge" }, { k: "project-dining-room", title: "Dining & Living" }] },
  { kind: "full", tiles: [{ k: "hd-hm-aerial-dusk", title: "H-Shaped Mansion" }] },
  { kind: "two", tiles: [{ k: "project-bedroom-suite", title: "Bedroom Suite" }, { k: "project-bedroom-detail", title: "Master Bedroom" }] },
];

export const featuredMore: Row[] = [
  { kind: "two", tiles: [{ k: "project-dressing-suite", title: "Bath & Dressing Suite" }, { k: "project-entry-detail", title: "Entrance Foyer" }] },
  { kind: "two", tiles: [{ k: "project-home-cinema", title: "Home Cinema" }, { k: "project-bar-detail", title: "Bar & Lounge" }] },
  { kind: "two", tiles: [{ k: "project-tufted-living", title: "Tufted Living Room" }, { k: "project-fireplace-lounge", title: "Fireplace Lounge" }] },
  { kind: "two", tiles: [{ k: "project-copper-bedroom", title: "Copper Panelled Bedroom" }, { k: "project-geometric-bedroom", title: "Geometric Bedroom" }] },
  { kind: "two", tiles: [{ k: "project-walkin-wardrobe", title: "Walk-in Wardrobe" }, { k: "project-display-partition", title: "Display Partition" }] },
  { kind: "two", tiles: [{ k: "project-marble-living-dining", title: "Marble Living & Dining" }, { k: "project-teal-bedroom", title: "Teal Statement Bedroom" }] },
];

export const drawings: { k: ImgKey; label: string; title: string }[] = [
  { k: "fh-plan-color", label: "Futuristic Home", title: "Master plan" },
  { k: "or-plans-blueprint", label: "Organic Residence", title: "Blueprint set" },
  { k: "v145-plan-color", label: "Villa 145", title: "Floor plans" },
  { k: "hm-plan-color", label: "H-Shaped Mansion", title: "Floor plan" },
];
export const drawingsMore: { k: ImgKey; label: string; title: string }[] = [
  { k: "tp-siteplan", label: "Twin Palace", title: "Site layout" },
  { k: "v145-cutaway", label: "Villa 145", title: "3D layout cutaway" },
  { k: "or-plans-color", label: "Organic Residence", title: "Floor plan set" },
  { k: "fh-plan-line", label: "Futuristic Home", title: "Line drawing" },
  { k: "v145-plan-line", label: "Villa 145", title: "Line plans" },
  { k: "hm-plan-line", label: "H-Shaped Mansion", title: "Line plan" },
];

/** Alt text for portfolio imagery */
export const alts: Partial<Record<ImgKey, string>> = Object.fromEntries(
  [...featured, ...featuredMore].flatMap((r) => r.tiles.map((t) => [t.k, `Royal Rising portfolio: ${t.title}`]))
    .concat([...drawings, ...drawingsMore].map((d) => [d.k, `${d.label}: ${d.title}`]))
    .concat([
      ["tp-aerial-day", "Twin Palace: master plan aerial"],
      ["hm-night-waterfall", "H-Shaped Mansion: infinity waterfall at night"],
      ["hd-hm-night-waterfall", "H-Shaped Mansion: infinity waterfall at night"],
      ["hd-tp-front-day", "Twin Palace estate with mandir and fountain garden"],
      ["hd-v145-night", "Villa 145: curved travertine villa at night"],
      ["hd-v145-day", "Villa 145: curved travertine villa by day"],
      ["hd-hm-garden-dusk", "H-Shaped Mansion: garden facade at dusk"],
      ["hd-v145-cutaway", "Villa 145: 3D layout cutaway"],
      ["hd-or-day", "Organic Residence: completed building by day"],
    ])
);
