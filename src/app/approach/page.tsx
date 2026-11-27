import type { Metadata } from "next";
import InnerPage, { EditorialSection, PageNote } from "@/components/InnerPage";
import ProcessTimeline, { type Stage } from "@/components/ProcessTimeline";

export const metadata: Metadata = { title: "Our Approach | Royal Rising", description: "The five stages Royal Rising follows to take a home from the first brief to handover." };
const stages: Stage[] = [
  { title: "Brief", k: "hm-plan-line", sheet: true, output: "A written brief and proposal", text: "We meet, visit the site and agree what the project must deliver: the rooms, the budget range, the timeline and the non-negotiables." },
  { title: "Site study", k: "tp-siteplan", sheet: true, output: "Site analysis and constraints", text: "Orientation, levels, access and views are recorded, along with the local rules that set what can be built and where." },
  { title: "Concept design", k: "tp-concept-aerial", output: "Concept plans and 3D views", text: "Plans, massing and an initial material direction, presented in drawings and 3D views and revised with you until the layout is right." },
  { title: "Detailed design", k: "or-plans-blueprint", sheet: true, output: "Working drawings and specifications", text: "Working drawings, specifications and interior details, coordinated across structure and services so the design can be priced and built." },
  { title: "Construction & handover", k: "project-staircase-view", output: "A finished home, ready to live in", text: "Site supervision, material approvals and final finishing, ending with a home that is checked, cleaned and ready to move into." },
];
export default function ApproachPage() {
  return <InnerPage label="Our Approach" title="Five stages. One team." intro="How a Royal Rising project moves from the first conversation to the day you receive the keys." image="project-dressing-suite" clean>
    <PageNote title="The brief comes first."><p>A list of rooms is not a brief. We want to know how the household runs: who is up first, where guests are received, which rooms need privacy and which should open to the garden. That is the information that makes a plan work.</p><p>From there the design develops in clear stages. Each one ends with a review, and we only move on once you have signed off what came before.</p></PageNote>
    <ProcessTimeline stages={stages} />
    <EditorialSection title="Clarity before construction." text="Problems are cheapest to solve on paper. Our plans, sections and cutaways test every relationship between rooms before a contractor is appointed. Browse a selection from our drawing board." image="fh-plan-color"><a className="pill page-text-link" href="/drawings">Explore drawings <span aria-hidden>↗</span></a></EditorialSection>
    <PageNote title="No surprises on site."><p>Honest feedback early saves time and money later. Tell us what you dislike as readily as what you like. Layouts and material samples are reviewed together, so questions are settled while they are still easy to change.</p><p>Every project is different, and the exact sequence depends on the site and the agreed scope. We set out the stages, deliverables and information we need from you in the proposal, before any work begins.</p></PageNote>
  </InnerPage>;
}
