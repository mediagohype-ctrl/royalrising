import meta from "./image-meta.json";

export type ImgKey = keyof typeof meta;
export const img = (key: ImgKey) => meta[key];

export const contact = {
  email: "info@royalrising.in",
  website: "www.royalrising.in",
  websiteUrl: "https://www.royalrising.in",
  instagram: "https://www.instagram.com/royal.rising",
  instagramHandle: "@royal.rising",
  youtube: "https://youtu.be/sEHKt4KZifU",
};

export const navLeft = [
  { label: "Brand Story", href: "#story" },
  { label: "Services", href: "#services" },
];
export const navRight = [
  { label: "Projects", href: "#works" },
  { label: "Drawings", href: "#drawings" },
];

export const heroSlides: { k: ImgKey; name: string }[] = [
  { k: "fh-day", name: "Futuristic Home & Mandir" },
  { k: "tp-front-day", name: "Twin Palace with Mandir" },
  { k: "v145-day", name: "Villa 145" },
  { k: "hm-aerial-day", name: "H-Shaped Mansion" },
];

export const services: { k: ImgKey; title: string; text: string }[] = [
  { k: "hm-night-waterfall", title: "Iconic Architecture", text: "Sculpted forms, drawn to sit in their landscape and light." },
  { k: "v145-night", title: "Interior Design", text: "Suites, lounges and courtyards that flow into the architecture." },
  { k: "tp-aerial-day", title: "Master Planning", text: "Site layouts, gardens and water, set out to the metre." },
  { k: "or-day", title: "Construction", text: "Working drawings taken to site and built, foundation to finish." },
];

export type Tile = { k: ImgKey; title: string };
export type Row = { kind: "two" | "full" | "center"; tiles: Tile[] };

export const featured: Row[] = [
  { kind: "two", tiles: [{ k: "tp-front-night", title: "Twin Palace" }, { k: "fh-night", title: "Futuristic Home" }] },
  { kind: "full", tiles: [{ k: "hm-night-waterfall", title: "H-Shaped Mansion" }] },
  { kind: "center", tiles: [{ k: "or-night", title: "Organic Residence" }] },
  { kind: "full", tiles: [{ k: "v145-night", title: "Villa 145" }] },
  { kind: "two", tiles: [{ k: "tp-sunset", title: "Twin Palace · Sunset" }, { k: "hm-garden-dusk", title: "H-Shaped Mansion · Garden" }] },
];

export const featuredMore: Row[] = [
  { kind: "two", tiles: [{ k: "tp-aerial-day", title: "Twin Palace · Masterplan" }, { k: "fh-aerial", title: "Futuristic Home · Aerial" }] },
  { kind: "full", tiles: [{ k: "v145-day", title: "Villa 145 · Day" }] },
  { kind: "two", tiles: [{ k: "or-day", title: "Organic Residence · Day" }, { k: "hm-aerial-dusk", title: "H-Shaped Mansion · Dusk" }] },
  { kind: "full", tiles: [{ k: "tp-aerial-night", title: "Twin Palace · Night aerial" }] },
  { kind: "two", tiles: [{ k: "hm-aerial-day", title: "H-Shaped Mansion · Aerial" }, { k: "fh-day", title: "Futuristic Home · Day" }] },
  { kind: "full", tiles: [{ k: "fh-views", title: "Futuristic Home · Four views" }] },
  { kind: "two", tiles: [{ k: "tp-concept-front", title: "Twin Palace · Concept" }, { k: "tp-concept-aerial", title: "Twin Palace · Concept aerial" }] },
  { kind: "center", tiles: [{ k: "tp-front-day", title: "Twin Palace · Fountain avenue" }] },
  { kind: "two", tiles: [{ k: "or-day-branded", title: "Organic Residence" }, { k: "or-night-branded", title: "Organic Residence · Night" }] },
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

/** Alt text for every image */
export const alts: Partial<Record<ImgKey, string>> = Object.fromEntries(
  [...featured, ...featuredMore].flatMap((r) => r.tiles.map((t) => [t.k, `Royal Rising: ${t.title}`]))
    .concat([...drawings, ...drawingsMore].map((d) => [d.k, `${d.label}: ${d.title}`]))
);
