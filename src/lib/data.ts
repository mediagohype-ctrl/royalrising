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

export const nav = [
  { label: "Works", href: "#works" },
  { label: "Studio", href: "#studio" },
  { label: "Process", href: "#process" },
  { label: "Archive", href: "#archive" },
  { label: "Contact", href: "#contact" },
];

export type Project = {
  id: string;
  index: string;
  name: string;
  accent: string;
  type: string;
  cover: ImgKey;
  blurb: string;
};

export const projects: Project[] = [
  {
    id: "twin-palace",
    index: "01",
    name: "Twin Palace",
    accent: "with Mandir",
    type: "Private Estate · Temple · Fountain Garden",
    cover: "tp-front-night",
    blurb:
      "Two sculpted travertine palaces embrace a T-shaped cascading pool, with a hand-carved mandir and a fountain garden framing the grand approach.",
  },
  {
    id: "futuristic-home",
    index: "02",
    name: "Futuristic Home",
    accent: "& Mandir",
    type: "Resort · Residence · Mandir Complex",
    cover: "fh-aerial",
    blurb:
      "Twin glazed domes beneath a flowing white canopy, a lotus-form mandir and a court of illuminated circular fountains.",
  },
  {
    id: "organic-residence",
    index: "03",
    name: "Organic Residence",
    accent: "Stilt + 4",
    type: "Residential · 8 × 2BHK",
    cover: "or-night",
    blurb:
      "A living tree of curved balconies and hanging gardens rising on sculpted columns above stilt parking.",
  },
  {
    id: "villa-145",
    index: "04",
    name: "Villa 145",
    accent: "Futuristic Organic",
    type: "Private Villa · Curved Travertine",
    cover: "v145-night",
    blurb:
      "Curved travertine ribbons, floor-to-ceiling glass and a bronze spiral stair wrapped around an infinity pool.",
  },
  {
    id: "h-mansion",
    index: "05",
    name: "H-Shaped Mansion",
    accent: "Ultra Luxury",
    type: "Private Mansion · 1,850 m²",
    cover: "hm-night-waterfall",
    blurb:
      "An H-shaped plan of guest and master wings around a glass-walled courtyard, stepping down to a 30 m infinity waterfall.",
  },
];

export const disciplines = [
  {
    no: "I",
    title: "Architecture",
    image: "tp-front-day" as ImgKey,
    text: "Master planning, site layouts and sculptural forms. Every curve is drawn to sit in its landscape and light.",
    points: ["Master planning", "Site layout", "Façade & form", "3D visualisation"],
  },
  {
    no: "II",
    title: "Interior",
    image: "v145-cutaway" as ImgKey,
    text: "Spaces planned from the inside out: suites, lounges and courtyards that flow into the architecture around them.",
    points: ["Space planning", "Suites & lounges", "Lighting design", "Material palettes"],
  },
  {
    no: "III",
    title: "Construction",
    image: "or-plans-blueprint" as ImgKey,
    text: "Drawings that are made to be built: floor-plan sets, structural thinking and delivery from foundation to finish.",
    points: ["Working drawings", "Floor-plan sets", "Structure & services", "Site execution"],
  },
];

export const processSteps = [
  {
    no: "01",
    title: "Site & Story",
    text: "We read the land, the light and the way you want to live, then sketch the first lines of a master plan.",
    image: "fh-plan-line" as ImgKey,
  },
  {
    no: "02",
    title: "Drawings & Plans",
    text: "Lines become measured plans: room by room, level by level, with every dimension set to build.",
    image: "or-plans-blueprint" as ImgKey,
  },
  {
    no: "03",
    title: "Visualisation",
    text: "Photoreal 3D views and cutaways let you walk through the building before a single stone is laid.",
    image: "v145-cutaway" as ImgKey,
  },
  {
    no: "04",
    title: "Construction",
    text: "Our teams take the drawings to site and build the finished place, ready for its first evening.",
    image: "tp-front-night" as ImgKey,
  },
];

/** Every client asset, grouped for the archive. */
export const archive: { key: ImgKey; title: string; project: string }[] = [
  { key: "tp-front-night", title: "Blue hour approach", project: "Twin Palace" },
  { key: "tp-sunset", title: "Sunset over the cascade", project: "Twin Palace" },
  { key: "tp-aerial-night", title: "Night aerial", project: "Twin Palace" },
  { key: "tp-front-day", title: "Fountain avenue", project: "Twin Palace" },
  { key: "tp-aerial-day", title: "Masterplan aerial", project: "Twin Palace" },
  { key: "tp-concept-front", title: "Concept: front", project: "Twin Palace" },
  { key: "tp-concept-aerial", title: "Concept: aerial", project: "Twin Palace" },
  { key: "tp-siteplan", title: "Site layout plan", project: "Twin Palace" },
  { key: "fh-night", title: "Domes after dark", project: "Futuristic Home" },
  { key: "fh-day", title: "Canopy & domes", project: "Futuristic Home" },
  { key: "fh-aerial", title: "Top-down aerial", project: "Futuristic Home" },
  { key: "fh-views", title: "Four views", project: "Futuristic Home" },
  { key: "fh-plan-color", title: "Master plan: colour", project: "Futuristic Home" },
  { key: "fh-plan-line", title: "Master plan: line", project: "Futuristic Home" },
  { key: "or-night-branded", title: "Organic Residence by night", project: "Organic Residence" },
  { key: "or-day-branded", title: "Organic Residence by day", project: "Organic Residence" },
  { key: "or-night", title: "Glowing balconies", project: "Organic Residence" },
  { key: "or-day", title: "Hanging gardens", project: "Organic Residence" },
  { key: "or-plans-color", title: "Floor plan set", project: "Organic Residence" },
  { key: "or-plans-blueprint", title: "Blueprint set", project: "Organic Residence" },
  { key: "v145-night", title: "Golden ribbons", project: "Villa 145" },
  { key: "v145-day", title: "Travertine curves", project: "Villa 145" },
  { key: "v145-cutaway", title: "3D layout cutaway", project: "Villa 145" },
  { key: "v145-plan-color", title: "Floor plans: colour", project: "Villa 145" },
  { key: "v145-plan-line", title: "Floor plans: line", project: "Villa 145" },
  { key: "hm-night-waterfall", title: "Infinity waterfall", project: "H-Shaped Mansion" },
  { key: "hm-aerial-dusk", title: "Dusk aerial", project: "H-Shaped Mansion" },
  { key: "hm-aerial-day", title: "Day aerial", project: "H-Shaped Mansion" },
  { key: "hm-garden-dusk", title: "Garden terrace", project: "H-Shaped Mansion" },
  { key: "hm-plan-color", title: "Floor plan: colour", project: "H-Shaped Mansion" },
  { key: "hm-plan-line", title: "Floor plan: line", project: "H-Shaped Mansion" },
];
