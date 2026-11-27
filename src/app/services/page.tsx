import type { Metadata } from "next";
import InnerPage, { EditorialSection, PageNote } from "@/components/InnerPage";
import { serviceCatalog } from "@/lib/catalog";

export const metadata: Metadata = { title: "Services | Royal Rising", description: "Explore architecture, interior design, master planning and construction with Royal Rising." };

export default function ServicesPage() {
  return <InnerPage label="Services" title={<>One <em style={{ color: "var(--gold)", fontStyle: "italic" }}>vision</em>. Every <em style={{ color: "var(--gold)", fontStyle: "italic" }}>discipline</em>.</>} intro="Architecture, interior design, master planning and construction, delivered by one team." image="project-timber-facade" clean>
    <PageNote title="Take one service, or all four."><p>Some clients come to us with an empty plot. Others have a finished shell and need the interiors resolved. We scope each engagement around where your project stands today.</p><p>When we take on more than one discipline, the benefit compounds: the structure is planned for the interior, the interior is planned for the light, and nothing has to be redesigned on site.</p>
      <nav className="service-jump" aria-label="Our services">
        {serviceCatalog.map((s, i) => <a key={s.slug} className="service-jump__link" href={`/services/${s.slug}`}><span>{String(i + 1).padStart(2, "0")}</span>{s.title}<i aria-hidden>↗</i></a>)}
      </nav>
    </PageNote>
    {serviceCatalog.map((service, index) => <EditorialSection key={service.slug} label={`Service ${String(index + 1).padStart(2, "0")}`} title={service.title} text={service.overview.paragraphs[0]} image={service.k} reverse={index % 2 === 1}>
      <ul className="page-service-list">{service.components.slice(0, 3).map(item => <li key={item.title}>{item.title}</li>)}</ul>
      <a className="pill page-text-link" href={`/services/${service.slug}`}>Explore {service.title} <span aria-hidden>↗</span></a>
    </EditorialSection>)}
    <PageNote title="What to send us first."><p>The site location and approximate area, the spaces you need, and any surveys, plans or reference images you already have. A budget range and target timeline help us give you a realistic answer.</p><p>Before any work starts, you receive a written proposal setting out the scope, deliverables, stages and fees, so both sides know exactly what has been agreed.</p><a className="pill page-text-link" href="/approach">Explore our process <span aria-hidden>↗</span></a></PageNote>
  </InnerPage>;
}
