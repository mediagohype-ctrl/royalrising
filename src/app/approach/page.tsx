import type { Metadata } from "next";
import InnerPage, { EditorialSection, PageNote } from "@/components/InnerPage";

export const metadata: Metadata = { title: "Our Approach | Royal Rising", description: "From first sketch to finished home: discover how Royal Rising plans, designs and builds." };
const steps = [
  ["Listen & understand", "We begin with your ideas, daily routines and priorities. Together, we establish what the space needs to do and how you want it to feel."],
  ["Read the site", "Light, orientation, access and the surrounding landscape help us understand the opportunities of the place before the design takes shape."],
  ["Shape the design", "Plans, proportions and material ideas evolve together. We explore how rooms connect and refine the direction through conversation with you."],
  ["Resolve the details", "Working drawings, finishes and interior details turn the concept into a coordinated design, ready to guide its execution."],
  ["Bring it to life", "Construction and finishing carry the design into the real world, with attention to the relationships between materials, spaces and everyday use."],
];
export default function ApproachPage() {
  return <InnerPage label="Our Approach" title="From first sketch to finished home." intro="Plan. Design. Build. A considered process that connects your ideas with the site, the light and the way you live." image="project-dressing-suite" clean>
    <PageNote title="Listen closely. Design with purpose."><p>Good design starts with useful questions. How does your day begin? Where do people come together? What should feel open, and what should feel private? Your answers help us look beyond a list of rooms.</p><p>We bring those priorities into conversation with the site and develop the design in stages. Each stage makes the next decision clearer, from the overall plan to the finishes you encounter every day.</p></PageNote>
    <section className="page-process"><div className="page-process__heading"><h2>A conversation that becomes a place.</h2><p>Each stage builds on the last, keeping the original idea in view as the details develop.</p></div><ol>{steps.map(([title, text], i) => <li key={title}><span className="page-process__number" aria-hidden>{String(i + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>
    <EditorialSection title="Clarity before construction." text="Drawings help us test relationships, communicate decisions and connect the wider vision with the smallest details. Explore a selection of plans and studies from the drawing board." image="fh-plan-color"><a className="pill page-text-link" href="/drawings">Explore drawings <span aria-hidden>↗</span></a></EditorialSection>
    <PageNote title="A shared direction, at every stage."><p>Reference images, practical needs and honest feedback help us understand what matters to you. Reviewing layouts and material ideas together allows questions to be resolved as the design develops.</p><p>The exact sequence depends on the site and agreed scope. We discuss the stages, decisions and information needed for your project at the outset, so there is a clear basis for moving forward.</p></PageNote>
  </InnerPage>;
}
