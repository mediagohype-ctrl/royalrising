import type { Metadata } from "next";
import InnerPage, { PageNote } from "@/components/InnerPage";
import Drawings from "@/components/Drawings";

export const metadata: Metadata = { title: "Drawings | Royal Rising", description: "Explore architectural floor plans, site layouts, blueprints and design studies from Royal Rising." };
export default function DrawingsPage() {
  return <InnerPage label="Drawings" title="Every space starts with a plan." intro="From the movement through a home to its relationship with the landscape, drawings make the thinking visible." image="project-staircase-dining">
    <PageNote label="Behind the spaces" title="Drawn with care. Designed for living."><p>Before choosing finishes, we consider how a home works. Where do you arrive? How does daylight reach the rooms? Where can family life open up, and where is privacy needed?</p><p>Floor plans, site studies and cutaways help explore those questions. They turn spatial ideas into something we can discuss, test and refine together.</p></PageNote>
    <Drawings showAll />
    <section className="page-values"><div><p className="label">Reading a drawing</p><h2>Look a little closer.</h2></div><article><h3>The site</h3><p>Look at the position of the building, arrival routes and outdoor spaces. These relationships shape the experience before you step inside.</p></article><article><h3>The plan</h3><p>Follow the connections between rooms. Shared areas, quieter corners and circulation reveal the everyday rhythm of the home.</p></article><article><h3>The detail</h3><p>Notice furniture layouts, openings and changes in level. Each helps explain the scale and intended use of a space.</p></article></section>
    <section className="page-drawing-note"><p className="label">From paper to place</p><h2>See the idea take shape.</h2><p>These drawings are portfolio studies for viewing and discussion. Construction requires drawings developed for the specific site and agreed project scope.</p><a className="page-text-link" href="/projects">Explore the spaces <span aria-hidden>↗</span></a></section>
  </InnerPage>;
}
