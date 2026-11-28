import type { Project } from "./catalog";
import { originalPortfolioGalleries } from "./original-portfolio-images";

// Additional projects from https://royalrising.in/projects/.
// Keep separate source entries, including the two earlier Preet/Gagan Vihar projects.
const entries: Omit<Project, "cover" | "gallery">[] = [
  {
    slug: "tata-primanti-gurgaon", name: "Tata Primanti, Gurgaon", category: "interiors",
    typology: "Residential Interiors · Living & Dining", services: ["interior-design"],
    blurb: "Bright living and dining spaces combining classical details with modern furniture.",
    overview: ["A balanced, light-filled interior at Tata Primanti in Gurgaon. The living and dining areas share a layered palette of colours and textures, bringing classical and contemporary elements together beneath statement chandeliers."],
  },
  {
    slug: "preet-vihar-delhi", name: "Preet Vihar, Delhi", category: "interiors",
    typology: "Residential Interiors", services: ["interior-design"],
    blurb: "Relaxed residential interiors with marble, metal and a rich mix of textures.",
    overview: ["This East Delhi home centres on comfort and a relaxed sense of luxury. Carefully selected materials bring depth to the rooms, with marble and metal forming the main decorative palette."],
  },
  {
    slug: "mirzapur-up", name: "Mirzapur, UP", category: "commercial",
    typology: "Commercial Interiors · Reception", services: ["interior-design"],
    blurb: "A welcoming commercial interior with a distinctive reception and panoramic mirrors.",
    overview: ["Designed as a comfortable setting for staff and clients, this Mirzapur project combines a prominent reception area with symmetrical panoramic mirrors. Reflective surfaces extend the sense of space while the reception gives visitors a clear point of arrival."],
  },
  {
    slug: "living-area-noida", name: "Living Area, Noida", category: "interiors",
    typology: "Residential Interiors · Living Room", services: ["interior-design"],
    blurb: "Light tones, contrasting accents and a backlit feature wall in a Noida living room.",
    overview: ["Timeless furniture sits within a light palette with contrasting accents. A dimensional backlit wall and timber panels echo the patterned marble floor, giving the living area warmth and texture."],
  },
  {
    slug: "lajpat-nagar-delhi", name: "Lajpat Nagar, Delhi", category: "hospitality",
    typology: "Boutique Hotel · Reception", services: ["interior-design"],
    blurb: "A boutique hotel reception in light natural tones, marble textures and metal panels.",
    overview: ["The reception establishes the character of this boutique hotel in Lajpat Nagar. Light-toned natural materials meet marble textures and metal panels behind the desk, creating a composed welcome for guests."],
  },
  {
    slug: "gagan-vihar-delhi", name: "Gagan Vihar, Delhi", category: "interiors",
    typology: "Residential Interiors · Apartment", services: ["interior-design"],
    blurb: "An East Delhi apartment pairing detailed interiors with everyday comfort.",
    overview: ["This apartment in Gagan Vihar brings detailed finishes and practical planning together. The interior balances a luxurious atmosphere with the comfort and functionality of a home."],
  },
  {
    slug: "east-of-kailash-delhi", name: "East of Kailash, Delhi", category: "interiors",
    typology: "Residential Interiors", services: ["interior-design"],
    blurb: "Natural timber, marble and tinted mirrors frame carefully chosen wall art.",
    overview: ["Timber panelling and wall art give the living room its focus. Marble, fluted wall details and tinted mirrors complete a material palette selected to work with the lighting throughout the interior."],
  },
  {
    slug: "preet-vihar-2", name: "Preet Vihar", category: "commercial",
    typology: "Architecture · Commercial", services: ["architecture"],
    blurb: "A Preet Vihar project from Royal Rising’s original portfolio.",
    overview: ["Explore the project images for this Preet Vihar commission, listed under architecture and commercial work in Royal Rising’s original portfolio."],
  },
  {
    slug: "gagan-vihar", name: "Gagan Vihar", category: "commercial",
    typology: "Architecture · Commercial", services: ["architecture"],
    blurb: "A Gagan Vihar project from Royal Rising’s original portfolio.",
    overview: ["Explore the original project gallery for this Gagan Vihar commission."],
  },
];

export const originalPortfolio: Project[] = entries.map((entry) => {
  const gallery = originalPortfolioGalleries[entry.slug as keyof typeof originalPortfolioGalleries];
  return { ...entry, cover: gallery[0], gallery: [...gallery] };
});
