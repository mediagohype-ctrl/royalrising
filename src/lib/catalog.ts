import type { ImgKey } from "./data";
import { originalPortfolio } from "./original-portfolio";

/* ============================================================
   Services and projects: the content behind the listing pages
   (/services, /projects) and their detail pages.
   Add a project or service here and its page is generated.
   ============================================================ */

/** Brand films hosted on R2 (portrait format, shared with the homepage). */
const film = (name: string) => `https://pub-867733225994464abcdc817244b3315e.r2.dev/${name}`;

export type ServiceComponent = { title: string; text: string; k: ImgKey };

export type Service = {
  slug: string;
  title: string;
  /** One line for cards and the listing page. */
  summary: string;
  /** Image for the listing page and cards. */
  k: ImgKey;
  /** Detail page hero image. */
  hero: ImgKey;
  intro: string;
  overview: { title: string; paragraphs: string[] };
  /** What the service is made of, shown as a numbered list. */
  components: ServiceComponent[];
  video: { src: string; title: string; text: string };
  gallery: ImgKey[];
  /** Project slugs that show this service at work. */
  projects: string[];
};

export const serviceCatalog: Service[] = [
  {
    slug: "architecture",
    title: "Architecture",
    summary: "Homes planned around the site, its light and the family who will live there.",
    k: "project-residence-facade",
    hero: "tp-front-day",
    intro: "From the first site visit to a complete drawing set: residences designed for their plot, their climate and the people inside them.",
    overview: {
      title: "A building that belongs to its plot.",
      paragraphs: [
        "Every design starts on site. Where the sun rises, where the road meets the boundary, what the neighbours see: these decide where the living room faces and where the bedrooms sit, long before we talk about style.",
        "We develop the scheme through plans, elevations and 3D views, so you can walk through the house and question every room while changes still cost nothing.",
      ],
    },
    components: [
      { title: "Site study", text: "Orientation, access, setbacks and views, recorded before a single line is drawn.", k: "tp-aerial-day" },
      { title: "Spatial planning", text: "Rooms arranged around how your household actually runs: who gathers where, and who needs a door that closes.", k: "v145-cutaway" },
      { title: "Concept & elevations", text: "Massing and facade developed together, so the house looks right from the street and works from the inside.", k: "tp-concept-front" },
      { title: "3D visualisation", text: "Photoreal renders and cutaways that let you approve a design with your eyes, not your imagination.", k: "v145-night" },
      { title: "Working drawings", text: "Dimensioned plans, sections and details that a contractor can price and build from without guesswork.", k: "hm-plan-line" },
    ],
    video: {
      src: film("ROYAL%20RISING.mp4"),
      title: "Walk the building.",
      text: "Facades, courtyards and water, seen at the pace of someone arriving home.",
    },
    gallery: ["tp-front-night", "v145-night", "hm-night-waterfall", "or-night", "fh-day", "project-residence-facade", "v145-day", "project-timber-facade"],
    projects: ["twin-palace", "villa-145", "h-shaped-mansion"],
  },
  {
    slug: "interior-design",
    title: "Interior Design",
    summary: "Layouts, materials and lighting resolved as one design, room by room.",
    k: "project-home-cinema",
    hero: "project-green-lounge",
    intro: "Living rooms, bedrooms, wardrobes and baths, designed down to the joinery, the stone and the lighting circuit.",
    overview: {
      title: "Rooms with a point of view.",
      paragraphs: [
        "An interior succeeds or fails on decisions most people never notice: where the sofa meets the window, how high the cove light sits, which way the marble is book-matched. We make those decisions deliberately and draw every one of them.",
        "We plan the whole home first, then give each room its own identity. The foyer, the lounge and the master suite share a palette, but none of them is a copy of the other.",
      ],
    },
    components: [
      { title: "Space planning", text: "Furniture and circulation fixed first, so every room has the clearances it needs before finishes are discussed.", k: "project-formal-living" },
      { title: "Material & finish palettes", text: "Stone, timber, fabric and metal chosen side by side, for how they look on day one and in year ten.", k: "project-copper-bedroom" },
      { title: "Lighting design", text: "Daylight, cove, task and accent light planned in layers, each on its own circuit.", k: "project-green-lounge" },
      { title: "Furniture & styling", text: "Pieces selected or custom-made to the room's proportions, then placed to finish the composition.", k: "project-tufted-living" },
      { title: "Bespoke details", text: "Feature walls, screens and joinery drawn specifically for your home and nobody else's.", k: "project-display-partition" },
    ],
    video: {
      src: film("ROYAL.mp4"),
      title: "Up close.",
      text: "Grain, veining and light on metal: the details that photographs flatten.",
    },
    gallery: ["project-formal-living", "project-fireplace-lounge", "project-tufted-living", "project-green-lounge", "project-copper-bedroom", "project-walkin-wardrobe", "project-dining-room", "project-staircase-view", "project-bedroom-suite", "project-home-cinema", "project-geometric-bedroom", "project-bath-vanity"],
    projects: ["formal-living-dining", "lounge-staircase", "bedroom-suites"],
  },
  {
    slug: "master-planning",
    title: "Master Planning",
    summary: "Buildings, gardens, water and arrival arranged as one estate.",
    k: "tp-aerial-day",
    hero: "tp-aerial-day",
    intro: "For larger plots and multi-building estates: a site plan that fixes where everything goes, and why, before any single building is designed.",
    overview: {
      title: "Get the site right, and every building follows.",
      paragraphs: [
        "On a large plot, the most expensive mistakes are made before design begins: a main house that blocks the best view, a service entry that crosses the garden, a temple facing the wrong way. Master planning settles those questions first.",
        "The outcome is a site layout in which every structure, drive, path and open space has a reason to be where it is, and room to grow if the family does.",
      ],
    },
    components: [
      { title: "Site analysis", text: "Levels, orientation, access and boundaries surveyed to show what the land can and cannot take.", k: "fh-aerial" },
      { title: "Building placement", text: "Each structure positioned for daylight, privacy and outlook, and for how it sits beside the others.", k: "hm-aerial-day" },
      { title: "Arrival & circulation", text: "Gates, drives and footpaths laid out so guests, family and service traffic never get in each other's way.", k: "tp-front-day" },
      { title: "Landscape integration", text: "Gardens, pools and courtyards planned as part of the architecture, not filled in afterwards.", k: "hm-garden-dusk" },
      { title: "Site layouts", text: "A coordinated site plan that becomes the brief for every building that follows.", k: "tp-siteplan" },
    ],
    video: {
      src: film("ROYAL%20(1).mp4"),
      title: "The estate from above.",
      text: "How buildings, gardens and water sit together across a single site.",
    },
    gallery: ["tp-aerial-day", "tp-siteplan", "fh-aerial", "hm-aerial-dusk", "tp-concept-aerial", "hm-garden-dusk", "fh-plan-color", "tp-aerial-night"],
    projects: ["twin-palace", "futuristic-home", "h-shaped-mansion"],
  },
  {
    slug: "construction",
    title: "Construction",
    summary: "Coordinated delivery, from the working drawings to the last fitting.",
    k: "v145-cutaway",
    hero: "project-staircase-dining",
    intro: "The design team stays with the project on site, so what gets built is what you approved.",
    overview: {
      title: "What you approved is what gets built.",
      paragraphs: [
        "Most designs lose their quality in the gap between the drawing office and the site. We close that gap by coordinating the drawings, the materials and the site decisions ourselves.",
        "From the first drawing set to the final sample board, the people who designed your home are the people answering the contractor's questions.",
      ],
    },
    components: [
      { title: "Working drawing coordination", text: "Architectural, structural and services drawings checked against each other and issued as one buildable set.", k: "or-plans-blueprint" },
      { title: "Material coordination", text: "Samples, specifications and finishes signed off before ordering, not argued over after delivery.", k: "project-entry-detail" },
      { title: "Site execution", text: "Regular site supervision from foundation to roof, with decisions recorded as they are made.", k: "or-day" },
      { title: "Detail resolution", text: "Edges, joints and transitions worked out in advance, because that is where workmanship shows.", k: "project-staircase-dining" },
      { title: "Finishing & handover", text: "Final fixtures, snag checks and cleaning, so the home is ready to move into on the day it is handed over.", k: "project-bedroom-suite" },
    ],
    video: {
      src: film("ROYAL%20RISING%20(1).mp4"),
      title: "From drawing to site.",
      text: "Materials, joints and finishes: where a design either holds up or falls apart.",
    },
    gallery: ["v145-cutaway", "or-plans-blueprint", "project-staircase-dining", "project-entry-detail", "or-day", "v145-plan-line", "project-dining-partition", "project-dressing-suite"],
    projects: ["organic-residence", "timber-stone-residence", "formal-living-dining"],
  },
];

/* ---------- projects ---------- */

export const projectCategories = [
  { slug: "residential", label: "Residential" },
  { slug: "interiors", label: "Interiors" },
  { slug: "hospitality", label: "Hospitality" },
  { slug: "commercial", label: "Commercial" },
  { slug: "industrial", label: "Industrial" },
] as const;

export type CategorySlug = (typeof projectCategories)[number]["slug"];

export type Project = {
  slug: string;
  name: string;
  /** Short italic line shown after the name. */
  accent?: string;
  category: CategorySlug;
  typology: string;
  /** Service slugs involved in the project. */
  services: string[];
  cover: ImgKey;
  /** One line for cards and the page intro. Not repeated in the overview. */
  blurb: string;
  overview: string[];
  /** Photographs and visualisations. */
  gallery: ImgKey[];
  /** Plans and drawings, shown uncropped. */
  drawings?: ImgKey[];
};

export const projects: Project[] = [
  {
    slug: "twin-palace",
    name: "Twin Palace",
    accent: "with Mandir",
    category: "residential",
    typology: "Private Estate · Temple · Fountain Garden",
    services: ["architecture", "master-planning"],
    cover: "tp-front-night",
    blurb: "Two travertine palaces facing each other across a cascading pool, with a hand-carved mandir at the head of the garden.",
    overview: [
      "Two residences share one estate, close enough to share a garden and far enough apart to keep their privacy. They are set as a mirrored pair either side of a T-shaped pool that steps down in a series of cascades.",
      "The mandir closes the main axis, so every route through the estate leads towards it. The fountain garden in front turns the arrival into a slow procession rather than a drive up to the door.",
      "The views follow the scheme from early concept studies to finished day and night renders. The site layout shows how the buildings, water and planting were fixed together.",
    ],
    gallery: ["tp-front-night", "tp-front-day", "tp-sunset", "tp-aerial-night", "tp-aerial-day", "tp-concept-front", "tp-concept-aerial"],
    drawings: ["tp-siteplan"],
  },
  {
    slug: "villa-145",
    name: "Villa 145",
    accent: "Futuristic Organic",
    category: "residential",
    typology: "Private Villa · Curved Travertine",
    services: ["architecture", "construction"],
    cover: "v145-night",
    blurb: "Curved travertine bands, full-height glazing and a bronze spiral stair, all wrapped around an infinity pool.",
    overview: [
      "There is hardly a straight wall in Villa 145. Bands of travertine curve around each floor and shade the full-height glass beneath them, so the rooms stay bright without overheating.",
      "The pool sits at the centre of the plan, and every principal room looks onto it. A bronze spiral stair links the levels and is the one element you can see from almost anywhere in the house.",
      "The cutaway and floor plans show how the rooms are arranged around the water. The day and night views show how the travertine changes colour through the day.",
    ],
    gallery: ["v145-night", "v145-day", "v145-cutaway"],
    drawings: ["v145-plan-color", "v145-plan-line"],
  },
  {
    slug: "h-shaped-mansion",
    name: "H-Shaped Mansion",
    accent: "Ultra Luxury",
    category: "residential",
    typology: "Private Mansion · 1,850 m²",
    services: ["architecture", "master-planning"],
    cover: "hm-night-waterfall",
    blurb: "Master and guest wings joined by a glass-walled courtyard, stepping down to a 30-metre infinity waterfall.",
    overview: [
      "At 1,850 m², the mansion needed a plan that would keep family life and hospitality apart without splitting the house in two. The H-shaped plan does that: the master wing and the guest wing run in parallel, joined by a glazed courtyard that both can use.",
      "The ground falls away beyond the courtyard, and the design makes use of it with a 30-metre infinity edge that pours over into the garden below.",
      "The aerial views at day and dusk show the wings and landscape as one composition. The floor plans show how the courtyard links them.",
    ],
    gallery: ["hm-night-waterfall", "hm-aerial-dusk", "hm-aerial-day", "hm-garden-dusk"],
    drawings: ["hm-plan-color", "hm-plan-line"],
  },
  {
    slug: "organic-residence",
    name: "Organic Residence",
    accent: "Stilt + 4",
    category: "residential",
    typology: "Residential · 8 × 2BHK",
    services: ["architecture", "construction"],
    cover: "or-night",
    blurb: "Eight apartments behind a facade of curved balconies and hanging gardens, raised on sculpted columns above stilt parking.",
    overview: [
      "Apartment buildings on tight urban plots usually end up as boxes. This one does not. The balconies flow around the corners in organic curves, and their planters give every one of the eight homes a garden in the air.",
      "Sculpted columns carry the building over stilt parking, so the ground floor reads as a shaded entrance court rather than a car park.",
      "Day and night views show the facade, and the floor plans and blueprints show how two 2BHK homes fit on each of the four levels.",
    ],
    gallery: ["or-night", "or-day", "or-night-branded", "or-day-branded"],
    drawings: ["or-plans-color", "or-plans-blueprint"],
  },
  {
    slug: "timber-stone-residence",
    name: "Timber & Stone Residence",
    category: "residential",
    typology: "Private Residence · Facade",
    services: ["architecture", "construction"],
    cover: "project-timber-facade",
    blurb: "A residential facade in warm timber and natural stone, with openings placed for privacy as much as for light.",
    overview: [
      "The facade relies on two materials and good proportions. Stone gives the base its weight, timber warms the upper floors, and the openings are sized and placed so the house looks out without being looked into.",
      "The two views show the house from the street, where the balance of stone, timber and glass sets the tone before you reach the door.",
    ],
    gallery: ["project-timber-facade", "project-residence-facade"],
  },
  {
    slug: "futuristic-home",
    name: "Futuristic Home",
    accent: "& Mandir",
    category: "hospitality",
    typology: "Resort · Residence · Mandir Complex",
    services: ["architecture", "master-planning"],
    cover: "fh-aerial",
    blurb: "Twin glazed domes under a flowing white canopy, a lotus-form mandir and a court of illuminated circular fountains.",
    overview: [
      "This destination brings residence, hospitality and worship onto one site. A single white canopy ties the composition together and sweeps over two glazed domes that hold the main public spaces.",
      "The lotus-form mandir stands on its own axis, approached across a court of circular fountains that are lit after dark.",
      "The master plan sets out the arrangement. The views range from the top-down aerial to the domes at night.",
    ],
    gallery: ["fh-aerial", "fh-night", "fh-day", "fh-views"],
    drawings: ["fh-plan-color", "fh-plan-line"],
  },
  {
    slug: "formal-living-dining",
    name: "Formal Living & Dining",
    category: "interiors",
    typology: "Residential Interiors · Living · Dining",
    services: ["interior-design", "construction"],
    cover: "project-formal-living",
    blurb: "A formal living and dining room with tufted seating, sculptural lighting and warm metallic accents.",
    overview: [
      "A room for entertaining should not feel empty on an ordinary evening. Here living and dining share one open volume, with decorative screens and partitions separating them without closing either off.",
      "Tufted upholstery and sculptural pendants set a formal tone, and warm metal accents keep it from feeling cold.",
    ],
    gallery: ["project-formal-living", "project-living-room-wide", "project-living-dining", "project-dining-room", "project-dining-screen", "project-dining-partition"],
  },
  {
    slug: "lounge-staircase",
    name: "Lounge & Staircase Residence",
    category: "interiors",
    typology: "Residential Interiors · Lounge · Staircase",
    services: ["interior-design", "construction"],
    cover: "project-green-lounge",
    blurb: "A green lounge with a backlit bar, a fireplace TV lounge and a floating staircase above the dining room.",
    overview: [
      "One palette of timber, stone, bronze and deep green runs from the entrance foyer to the top of the stairs, so the ground floor feels like one continuous home.",
      "Each space still has its own job. The green lounge centres on a backlit bar display, the TV lounge on its fireplace, and the floating staircase above the dining table gives the whole house its focal point.",
    ],
    gallery: ["project-green-lounge", "project-bar-lounge-red", "project-lounge-sofa", "project-lounge-overhead", "project-fireplace-lounge", "project-staircase-dining", "project-staircase-view", "project-display-partition", "project-entry-detail"],
  },
  {
    slug: "tufted-living",
    name: "Tufted Living Room",
    category: "interiors",
    typology: "Residential Interiors · Living",
    services: ["interior-design"],
    cover: "project-tufted-living",
    blurb: "A bright living room of tufted sofas and marble feature walls, centred on a sculpted statue framed by greenery.",
    overview: [
      "Pale stone, soft upholstery and layered rugs keep this living room light at any time of day.",
      "A statue niche lined with planting serves as the focal point, giving the room the calm of a small gallery without making it formal.",
    ],
    gallery: ["project-tufted-living", "project-statue-living", "project-tufted-living-view"],
  },
  {
    slug: "private-suites",
    name: "Master Suite",
    category: "interiors",
    typology: "Residential Interiors · Bedroom · Lounge · Study",
    services: ["interior-design"],
    cover: "project-bedroom-suite",
    blurb: "A master suite that combines a bedroom, a sitting corner and a study, centred on a backlit marble headboard.",
    overview: [
      "The suite had to work as a bedroom, a place to read and a place to work, without any of the three spilling into the others. Each zone has its own lighting and furniture, but they share the same finishes.",
      "A backlit marble headboard anchors the room. Pale surfaces and gentle colour accents keep it restful.",
    ],
    gallery: ["project-bedroom-suite", "project-suite-lounge", "project-suite-study", "project-suite-overview"],
  },
  {
    slug: "bedroom-suites",
    name: "Bedroom Suites",
    category: "interiors",
    typology: "Residential Interiors · Bedrooms",
    services: ["interior-design"],
    cover: "project-bedroom-detail",
    blurb: "A series of bedrooms, each defined by its own feature wall: copper panelling, geometric screens or blush marble.",
    overview: [
      "These bedrooms follow one formula with endless variations. A strong headboard wall gives each room its identity, and fitted storage, a study or seating corner and layered lighting handle the practical side.",
      "The result is a set of rooms that are clearly related but never interchangeable.",
    ],
    gallery: ["project-bedroom-detail", "project-copper-bedroom", "project-bedroom-study", "project-study-bedroom", "project-geometric-bedroom", "project-blush-marble-bedroom"],
  },
  {
    slug: "dressing-and-bath",
    name: "Dressing Rooms & Baths",
    category: "interiors",
    typology: "Residential Interiors · Dressing · Bath",
    services: ["interior-design", "construction"],
    cover: "project-walkin-wardrobe",
    blurb: "Walk-in wardrobes and bathrooms in marble and glass, lit with warm concealed light.",
    overview: [
      "Dressing rooms and bathrooms are used more often than any formal room in the house, so we design them to the same standard.",
      "Glass-fronted wardrobes put clothes and accessories on display. In the bathrooms, vanities and showers are finished in book-matched marble, with lighting concealed in the joinery.",
    ],
    gallery: ["project-walkin-wardrobe", "project-wardrobe-detail", "project-dressing-suite", "project-bath-vanity", "project-marble-bath-vanity", "project-marble-bath"],
  },
  {
    slug: "cinema-and-bar",
    name: "Home Cinema & Bar",
    category: "interiors",
    typology: "Residential Interiors · Entertainment",
    services: ["interior-design", "construction"],
    cover: "project-home-cinema",
    blurb: "A private cinema and bar lounge in rich finishes, lit for evenings with family and friends.",
    overview: [
      "A home cinema has to perform before it can impress. Acoustic wall panels control the sound and recliner seating is set out for clear sightlines, all finished in materials that suit the rest of the house.",
      "Next door, a backlit onyx bar turns the lounge into a room people stay in long after the film has ended.",
    ],
    gallery: ["project-home-cinema", "project-cinema-screen", "project-bar-detail"],
  },
  {
    slug: "marble-residence",
    name: "Marble Residence",
    category: "interiors",
    typology: "Residential Interiors · Living · Dining · Foyer",
    services: ["interior-design", "construction"],
    cover: "project-marble-living-dining",
    blurb: "White marble, soft grey upholstery and brass, from a sculpted foyer console to an open living and dining room.",
    overview: [
      "The palette is pared back to marble, grey and brass, and repeated in every room, so the stone itself provides the drama.",
      "Heavily veined feature walls mark the transitions, first in the foyer with its sculptural console and then in the living room, where the TV wall is clad in the same stone.",
    ],
    gallery: ["project-marble-living-dining", "project-marble-living-tv", "project-marble-foyer-console", "project-foyer-sculpture"],
  },
  {
    slug: "family-bedrooms",
    name: "Family Bedrooms",
    category: "interiors",
    typology: "Residential Interiors · Six Bedrooms",
    services: ["interior-design"],
    cover: "project-jaali-bedroom",
    blurb: "Six bedrooms in one family home, from a jaali headboard wall to blush, sage and timber-panelled rooms.",
    overview: [
      "Each bedroom was designed around the person who sleeps in it: their colours, their routines and how much storage they need.",
      "The rooms share a layout of feature headboard, combined TV and storage wall and soft cove lighting, which keeps the house coherent while every room has its own identity.",
    ],
    gallery: ["project-jaali-bedroom", "project-panel-bedroom", "project-blush-bedroom", "project-timber-bedroom", "project-sage-bedroom", "project-pattern-bedroom"],
  },
  {
    slug: "grey-gold-bedroom",
    name: "Grey & Gold Bedroom",
    category: "interiors",
    typology: "Residential Interiors · Master Bedroom",
    services: ["interior-design"],
    cover: "project-grey-gold-bedroom",
    blurb: "A master bedroom with a tufted grey headboard, a backlit marble wall with floral sculpture and a ribbed timber TV wall.",
    overview: [
      "Grey upholstery sets a quiet base. Gold and yellow accents warm it up, and ribbed timber on the TV wall adds texture where a plain finish would look flat.",
      "The backlit marble panel with its floral sculpture gives the room a focal point that holds its own from the bed, the door and the seating area.",
    ],
    gallery: ["project-grey-gold-bedroom", "project-grey-gold-headboard", "project-grey-gold-bedroom-view", "project-grey-gold-tv-wall", "project-timber-tv-wall"],
  },
  {
    slug: "white-bedroom-suite",
    name: "White Bedroom Suite",
    category: "interiors",
    typology: "Residential Interiors · Bedroom · Dressing",
    services: ["interior-design"],
    cover: "project-white-bedroom-tv",
    blurb: "A white bedroom suite with a botanical feature wall, a sculptural pendant and a glass-fronted walk-in wardrobe.",
    overview: [
      "White finishes throughout keep the suite open and airy. A patterned rug and a botanical wall bring in just enough colour, and a single art piece does the rest.",
      "A sculptural pendant hangs over the bed. The walk-in wardrobe beyond is glass-fronted, so it reads as part of the room rather than a cupboard.",
    ],
    gallery: ["project-white-bedroom-tv", "project-white-bedroom", "project-pendant-bedroom", "project-white-bedroom-wardrobe"],
  },
  {
    slug: "statement-bedrooms",
    name: "Statement Bedrooms",
    category: "interiors",
    typology: "Residential Interiors · Bedrooms",
    services: ["interior-design"],
    cover: "project-teal-bedroom",
    blurb: "Three bedrooms, three bold moves: a teal geometric headboard, black Portoro marble and a mint quilted wall.",
    overview: [
      "Each of these bedrooms commits to a single feature wall and lets it lead.",
      "Everything else holds back: furniture, wardrobes and lighting stay simple so the teal geometry, the gold-veined Portoro or the quilted mint can take centre stage.",
    ],
    gallery: ["project-teal-bedroom", "project-black-marble-bedroom", "project-black-marble-bedroom-tv", "project-quilted-bedroom", "project-quilted-bedroom-wardrobe"],
  },
  {
    slug: "living-foyers",
    name: "Living Rooms, Foyers & Pooja Room",
    category: "interiors",
    typology: "Residential Interiors · Living · Foyer · Mandir",
    services: ["interior-design"],
    cover: "project-bronze-living",
    blurb: "A bronze-toned living room, an entrance foyer with gallery lighting and a backlit pooja room with a carved Om panel.",
    overview: [
      "These three spaces cover the public and private sides of a home: the foyer that receives guests, the living room where the family gathers and the pooja room set aside for daily prayer.",
      "Bronze tones carry from the living room into the foyer. The pooja room uses a backlit carved Om panel to create a quiet, glowing place of its own.",
    ],
    gallery: ["project-bronze-living", "project-console-foyer", "project-pooja-room"],
  },
];

// Append imported work without replacing or reordering the existing portfolio.
projects.push(...originalPortfolio);

export const categoryLabel = (slug: CategorySlug) => projectCategories.find((c) => c.slug === slug)!.label;
/** Categories that currently have projects, in display order. */
export const activeCategories = projectCategories.filter((c) => projects.some((p) => p.category === c.slug));
export const getService = (slug: string) => serviceCatalog.find((s) => s.slug === slug);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
