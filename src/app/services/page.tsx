import type { Metadata } from "next";
import InnerPage, { EditorialSection, PageNote } from "@/components/InnerPage";
import { services } from "@/lib/data";

export const metadata: Metadata = { title: "Services | Royal Rising", description: "Explore architecture, interior design, master planning and construction with Royal Rising." };
const details = [
  { text: "We begin with the site and the way you want to live. Orientation, proportion and the movement of natural light guide a design that connects each room to the whole.", items: ["Site and spatial planning", "Architectural concepts and elevations", "Design development and working drawings"] },
  { text: "Interiors bring a home into focus. We consider how materials, furniture and lighting work together, making spaces that are comfortable to use and expressive of your taste.", items: ["Space planning and furniture layouts", "Material and finish palettes", "Lighting and bespoke details"] },
  { text: "A thoughtful plan looks beyond individual rooms. We explore the relationships between buildings, gardens, arrival points and movement to bring clarity to the larger site.", items: ["Site organisation and building placement", "Circulation and outdoor connections", "Landscape integration"] },
  { text: "The intention of a drawing should be felt in the finished space. We bring the design and its execution together through coordination and attention to the details that matter.", items: ["Working drawing coordination", "Material and detail coordination", "Execution and finishing details"] },
];
export default function ServicesPage() {
  return <InnerPage label="Services" title={<>One <em style={{ color: "var(--gold)", fontStyle: "italic" }}>vision</em>. Every <em style={{ color: "var(--gold)", fontStyle: "italic" }}>discipline</em>.</>} intro="Architecture, interiors, master planning and construction. Connected thinking, from the first conversation to the finishing details." image="project-timber-facade">
    <PageNote label="What we do" title="Plan the whole. Consider every part."><p>A home works best when its architecture, interiors and execution support the same idea. We consider the building, the rooms and their details together, while shaping a scope around the needs of your project.</p><p>Whether you are exploring a new home or developing its interiors, the first step is to understand your site, priorities and desired outcome. From there, we can identify the disciplines and stages your project needs.</p></PageNote>
    {services.map((service, index) => <EditorialSection key={service.title} label="Our expertise" title={service.title} text={details[index].text} image={service.k} reverse={index % 2 === 1}>
      <ul className="page-service-list">{details[index].items.map(item => <li key={item}>{item}</li>)}</ul>
    </EditorialSection>)}
    <PageNote label="Before we begin" title="A clear brief makes a strong beginning."><p>Share the site location, approximate area, the spaces you need and any plans or references you already have. An outline of your budget and preferred timing helps frame the initial conversation.</p><p>We discuss the proposed scope, deliverables and responsibilities before work begins. Each engagement is shaped around the project, with services and stages set out in the agreed proposal.</p><a className="page-text-link" href="/approach">Explore our process <span aria-hidden>↗</span></a></PageNote>
  </InnerPage>;
}
