import meta from "./image-meta.json";
import extensions from "./image-extensions.json";
import { projectImages } from "./project-images";

const displayImages = { ...meta, ...extensions, ...projectImages };
export type ImgKey = keyof typeof displayImages;
export const img = (key: ImgKey) => displayImages[key];

export const contact = {
  email: "info@royalrising.in",
  website: "www.royalrising.in",
  websiteUrl: "https://www.royalrising.in",
  instagram: "https://www.instagram.com/royal.rising",
  instagramHandle: "@royal.rising",
};

export const navLeft = [
  { label: "About Us", href: "#story" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#works" },
];
export const navRight = [
  { label: "Our Approach", href: "#approach" },
  { label: "Drawings", href: "#drawings" },
];

export const heroSlides: { k: ImgKey; name: string }[] = [
  { k: "project-formal-living", name: "Spaces to feel at home in" },
  { k: "project-green-lounge", name: "A quieter kind of luxury" },
  { k: "project-staircase-dining", name: "Every detail, considered" },
];

export const services: { k: ImgKey; title: string; text: string }[] = [
  { k: "project-timber-facade", title: "Architecture", text: "Considered proportions, natural light and a sense of place." },
  { k: "project-home-cinema", title: "Interior Design", text: "Materials, furniture and details chosen for the way you live." },
  { k: "project-dining-room", title: "Master Planning", text: "Thoughtful connections between buildings, gardens and everyday life." },
  { k: "project-entry-detail", title: "Construction", text: "Careful coordination, from working drawings to the finishing details." },
];

export type Tile = { k: ImgKey; title: string };
export type Row = { kind: "two" | "full" | "center"; tiles: Tile[] };

export const featured: Row[] = [
  { kind: "two", tiles: [{ k: "project-residence-facade", title: "Residential Facade" }, { k: "project-timber-facade", title: "Timber & Stone Facade" }] },
  { kind: "full", tiles: [{ k: "project-formal-living", title: "Formal Living" }] },
  { kind: "two", tiles: [{ k: "project-green-lounge", title: "The Green Lounge" }, { k: "project-dining-room", title: "Dining & Living" }] },
  { kind: "full", tiles: [{ k: "project-staircase-dining", title: "Sculptural Staircase" }] },
  { kind: "two", tiles: [{ k: "project-bedroom-suite", title: "Bedroom Suite" }, { k: "project-bedroom-detail", title: "Bedroom Details" }] },
];

export const featuredMore: Row[] = [
  { kind: "two", tiles: [{ k: "project-dressing-suite", title: "Dressing Suite" }, { k: "project-entry-detail", title: "Entrance Details" }] },
  { kind: "two", tiles: [{ k: "project-home-cinema", title: "Home Cinema" }, { k: "project-bar-detail", title: "Bar & Lounge" }] },
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
);
