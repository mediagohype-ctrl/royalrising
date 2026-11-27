import type { Metadata } from "next";
import InnerPage, { EditorialSection, PageNote } from "@/components/InnerPage";

export const metadata: Metadata = { title: "About Us | Royal Rising", description: "Royal Rising is one studio for architecture, interiors and construction, taking private homes from site study to handover." };

export default function AboutPage() {
  return <InnerPage label="About Us" title="One studio, from site to keys." intro="Royal Rising designs and builds private residences, estates and interiors, with one team responsible from the first site visit to handover." image="project-bedroom-suite" clean>
    <PageNote title="Why one studio for the whole job."><p>When the architect, the interior designer and the contractor are three separate firms, a home gets designed three times and coordinated by whoever is left holding the problem. Details are lost at every hand-off, and the client ends up acting as referee.</p><p>We work differently. Architecture, interiors and construction sit with one team, so the facade, the floor plan and the cabinet handles are all designed with the same intent, and the people who drew them are on site when they are built.</p></PageNote>
    <EditorialSection title="We start with how you live." text="Before we discuss style, we ask practical questions. Who lives in the house, and who visits? Where does the family eat on an ordinary weekday? Which rooms need to be quiet? The answers decide the plan. Materials, light and proportion then give that plan its character." image="project-formal-living">
      <a className="pill page-text-link" href="/approach">Discover our approach <span aria-hidden>↗</span></a>
    </EditorialSection>
    <section className="page-values">
      <div><h2>What we hold to.</h2></div>
      <article><h3>Design for the site</h3><p>Orientation, climate and views shape the plan. A house should look as if it could only stand where it does.</p></article>
      <article><h3>Materials that age well</h3><p>Stone, timber and metal chosen for how they wear over decades, not how they photograph on day one.</p></article>
      <article><h3>One team, start to finish</h3><p>The people who design your home stay with it through construction and handover.</p></article>
    </section>
    <EditorialSection title="From the outside in." text="A facade, a staircase and a bedroom wardrobe should look as if they came from the same hand, because in our projects they do. Working across all three disciplines lets us carry one idea from the street to the smallest fitting." image="project-staircase-dining" reverse>
      <a className="pill page-text-link" href="/projects">Explore our work <span aria-hidden>↗</span></a>
    </EditorialSection>
    <PageNote title="You stay in the decisions."><p>Bring reference images, a list of must-haves and the things you are unsure about. Early conversations are where the important choices are made, and we would rather hear a concern in the first meeting than on site.</p><p>At every stage you review drawings and samples before we move on, so nothing is built that you have not seen and approved.</p><a className="pill page-text-link" href="/approach">See how we work <span aria-hidden>↗</span></a></PageNote>
  </InnerPage>;
}
