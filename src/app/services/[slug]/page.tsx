import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InnerPage, { PageNote } from "@/components/InnerPage";
import Gallery from "@/components/catalog/Gallery";
import ProjectCard from "@/components/catalog/ProjectCard";
import ServiceFilm from "@/components/catalog/ServiceFilm";
import ServiceComponents from "@/components/catalog/ServiceComponents";
import Img from "@/components/ui/Img";
import { getProject, getService, serviceCatalog, type Project } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return serviceCatalog.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return { title: `${service.title} | Services | Royal Rising`, description: service.intro };
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const index = serviceCatalog.indexOf(service);
  const next = serviceCatalog[(index + 1) % serviceCatalog.length];
  const related = service.projects.map(getProject).filter((p): p is Project => !!p);

  return <InnerPage label="Services" title={service.title} intro={service.intro} image={service.hero}
    crumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}>
    <PageNote label={`Service ${String(index + 1).padStart(2, "0")}`} title={service.overview.title}>
      {service.overview.paragraphs.map((p) => <p key={p}>{p}</p>)}
      <a className="pill page-text-link" href="#components">What’s included <span aria-hidden>↓</span></a>
    </PageNote>

    <ServiceComponents title={service.title} items={service.components} />

    <ServiceFilm src={service.video.src} title={service.video.title} text={service.video.text} />

    <section className="detail-block" aria-labelledby="gallery-title">
      <div className="detail-head">
        <p className="label">Images</p>
        <h2 id="gallery-title">{service.title}, in images.</h2>
        <p>A selection of work from this discipline. Select any image to enlarge it.</p>
      </div>
      <Gallery keys={service.gallery} name={service.title} />
    </section>

    {related.length > 0 && <section className="detail-block detail-block--paper" aria-labelledby="related-title">
      <div className="detail-head detail-head--split">
        <div><p className="label">Projects</p><h2 id="related-title">See it in practice.</h2></div>
        <a className="pill" href="/projects">All projects <span aria-hidden>↗</span></a>
      </div>
      <div className="related-grid">
        {related.map((p) => <ProjectCard key={p.slug} project={p} sizes="(max-width: 760px) 100vw, 33vw" />)}
      </div>
    </section>}

    <nav className="detail-next" aria-label="More services">
      <div className="detail-next__list">
        <p className="label">More services</p>
        <div className="service-jump">
          {serviceCatalog.map((s, i) => <a key={s.slug} className={`service-jump__link${s.slug === service.slug ? " is-current" : ""}`}
            href={`/services/${s.slug}`} aria-current={s.slug === service.slug ? "page" : undefined}>
            <span>{String(i + 1).padStart(2, "0")}</span>{s.title}<i aria-hidden>↗</i></a>)}
        </div>
      </div>
      <a className="detail-next__card" href={`/services/${next.slug}`}>
        <div className="detail-next__image"><Img k={next.k} sizes="(max-width: 760px) 100vw, 50vw" alt="" /></div>
        <span className="label">Next service</span>
        <strong>{next.title} <span aria-hidden>→</span></strong>
      </a>
    </nav>
  </InnerPage>;
}
