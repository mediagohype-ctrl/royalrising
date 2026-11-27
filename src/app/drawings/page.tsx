import type { Metadata } from "next";
import InnerPage, { PageNote } from "@/components/InnerPage";
import Drawings from "@/components/Drawings";

export const metadata: Metadata = { title: "Drawings | Royal Rising", description: "Explore architectural floor plans, site layouts, blueprints and design studies from Royal Rising." };
export default function DrawingsPage() {
  return <InnerPage label="Drawings" title="Every space starts with a plan." intro="Floor plans, site layouts and cutaways from our residential projects." image="project-staircase-dining" clean>
    <PageNote title="Why we draw before we build."><p>A good-looking render can hide a bad plan. Drawings cannot. They show where you arrive, how daylight reaches each room, and whether the kitchen sits close enough to the dining table.</p><p>We use floor plans, site studies and cutaways to test those relationships and to give you something concrete to question and mark up before anything is built.</p></PageNote>
    <Drawings showAll />
    <section className="page-values"><div><h2>How to read a drawing.</h2></div><article><h3>The site</h3><p>Start with where the building sits, how you arrive and where the outdoor spaces fall. These decide the experience before you reach the front door.</p></article><article><h3>The plan</h3><p>Trace a route through the rooms. The way shared spaces, private rooms and corridors connect shows how the household will move through a day.</p></article><article><h3>The detail</h3><p>Look at furniture, doors, windows and changes in level. They show the true scale of each room and what it is meant for.</p></article></section>
    <section className="page-drawing-note"><h2>See the idea take shape.</h2><p>These are portfolio studies, shown for reference. Every construction drawing set we issue is prepared for its own site and agreed scope.</p><a className="pill page-text-link" href="/projects">Explore the spaces <span aria-hidden>↗</span></a></section>
  </InnerPage>;
}
