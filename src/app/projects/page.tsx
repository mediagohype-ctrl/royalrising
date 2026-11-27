import type { Metadata } from "next";
import InnerPage, { PageNote } from "@/components/InnerPage";
import ProjectsBrowser from "@/components/catalog/ProjectsBrowser";

export const metadata: Metadata = { title: "Projects | Royal Rising", description: "Explore Royal Rising’s portfolio of residential, hospitality and interior projects." };
export default function ProjectsPage() {
  return <InnerPage label="Projects" title="Selected work." intro="Private residences, estates and interiors, from site plan to finished room." image="project-formal-living" clean>
    <PageNote title="From the street to the smallest fitting."><p>The portfolio spans whole estates and single rooms. Some projects show a building from concept to night render; others focus on one bedroom, one wardrobe or one stone wall.</p><p>Filter by category, then open any project for its full description, images and, where available, drawings.</p></PageNote>
    <ProjectsBrowser />
    <PageNote title="Different rooms, one hand."><p>Across these projects, a small set of materials does most of the work: stone, timber, metal and light. Used with discipline, they give each home a character of its own, with shared rooms that welcome guests and private rooms that stay calm.</p><a className="pill page-text-link" href="/services">Discover our services <span aria-hidden>↗</span></a></PageNote>
  </InnerPage>;
}
