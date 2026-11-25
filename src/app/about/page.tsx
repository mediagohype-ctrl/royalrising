import type { Metadata } from "next";
import InnerPage, { EditorialSection, PageNote } from "@/components/InnerPage";

export const metadata: Metadata = { title: "About Us | Royal Rising", description: "Discover Royal Rising’s considered approach to architecture, interiors and construction." };

export default function AboutPage() {
  return <InnerPage label="About Us" title="Spaces shaped by light and life." intro="Royal Rising brings architecture, interiors and construction together. We create thoughtful spaces rooted in their surroundings and in the lives of the people who call them home." image="project-bedroom-suite" clean>
    <PageNote title="A home is personal. So is the process."><p>A place to gather, a quiet room to unwind, a view you return to every morning. The spaces that matter most are shaped by the life within them. At Royal Rising, those everyday moments give the design its direction.</p><p>We connect architecture, interiors and construction so that the larger vision and the individual details develop together. The result we work towards is a home that feels coherent, comfortable and distinctly yours.</p></PageNote>
    <EditorialSection title="A home begins with you." text="The way you gather, the quiet moments you value, the light you wake up to. These are the starting points for our work. We bring natural light, considered materials and balanced proportions together to shape homes that feel personal, welcoming and timeless." image="project-formal-living">
      <a className="page-text-link" href="/approach">Discover our approach <span aria-hidden>↗</span></a>
    </EditorialSection>
    <section className="page-values">
      <div><h2>Considered in every detail.</h2></div>
      <article><h3>A sense of place</h3><p>Architecture that responds to the site, its light and its surroundings.</p></article>
      <article><h3>Everyday beauty</h3><p>Materials and proportions that make daily routines feel more comfortable and natural.</p></article>
      <article><h3>A connected vision</h3><p>Planning, interiors and construction considered together from the beginning.</p></article>
    </section>
    <EditorialSection title="From the outside in." text="A facade, a staircase, a room and its smallest details all belong to the same story. Working across disciplines helps us carry the original idea through each layer of a home." image="project-staircase-dining" reverse>
      <a className="page-text-link" href="/projects">Explore our work <span aria-hidden>↗</span></a>
    </EditorialSection>
    <PageNote title="Your priorities guide the design."><p>Bring your ideas, your questions and the things you know you need. We use those conversations to understand how you live, what the site offers and where the design should focus.</p><p>From room layouts to materials, each decision has a purpose. We make space for discussion as the proposal develops, keeping everyday use at the centre of the work.</p><a className="page-text-link" href="/approach">See how we work <span aria-hidden>↗</span></a></PageNote>
  </InnerPage>;
}
