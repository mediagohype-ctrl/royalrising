import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InnerPage, { PageNote } from "@/components/InnerPage";
import Gallery from "@/components/catalog/Gallery";
import Img from "@/components/ui/Img";
import { categoryLabel, getProject, getService, projects, type Service } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: `${project.name} | Projects | Royal Rising`, description: project.blurb };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const category = categoryLabel(project.category);
  const services = project.services.map(getService).filter((s): s is Service => !!s);
  // Next project: stay within the category first, then continue through the portfolio.
  const sameCategory = projects.filter((p) => p.category === project.category);
  const next = sameCategory.length > 1
    ? sameCategory[(sameCategory.indexOf(project) + 1) % sameCategory.length]
    : projects[(projects.indexOf(project) + 1) % projects.length];
  const imageCount = project.gallery.length + (project.drawings?.length ?? 0);

  return <InnerPage label={category} intro={project.blurb} image={project.cover}
    title={<>{project.name}{project.accent && <> <em style={{ color: "var(--gold)", fontStyle: "italic" }}>{project.accent}</em></>}</>}
    crumbs={[{ label: "Projects", href: "/projects" }, { label: category, href: `/projects?category=${project.category}` }, { label: project.name }]}>
    <dl className="detail-facts">
      <div><dt className="label">Category</dt><dd><a href={`/projects?category=${project.category}`}>{category}</a></dd></div>
      <div><dt className="label">Typology</dt><dd>{project.typology}</dd></div>
      <div><dt className="label">Services</dt><dd>{services.map((s, i) => <span key={s.slug}>{i > 0 && ", "}<a href={`/services/${s.slug}`}>{s.title}</a></span>)}</dd></div>
      <div><dt className="label">Images</dt><dd>{imageCount}</dd></div>
    </dl>

    <PageNote label="Overview" title="About the project.">
      {project.overview.map((p) => <p key={p}>{p}</p>)}
    </PageNote>

    <section className="detail-block" aria-labelledby="views-title">
      <div className="detail-head">
        <p className="label">Images</p>
        <h2 id="views-title">The views.</h2>
        <p>Select any image to view it full screen.</p>
      </div>
      <Gallery keys={project.gallery} name={project.name} />
    </section>

    {project.drawings && project.drawings.length > 0 && <section className="detail-block detail-block--paper" aria-labelledby="drawings-title">
      <div className="detail-head">
        <p className="label">Drawings</p>
        <h2 id="drawings-title">Plans and layouts.</h2>
        <p>Shown uncropped, so every line and dimension stays legible.</p>
      </div>
      <Gallery keys={project.drawings} name={`${project.name} drawings`} drawings />
    </section>}

    <nav className="detail-next" aria-label="More projects">
      <div className="detail-next__list">
        <p className="label">Keep exploring</p>
        <h2>More {category.toLowerCase()} work.</h2>
        <div className="detail-next__actions">
          <a className="pill" href={`/projects?category=${project.category}`}>All {category.toLowerCase()} <span aria-hidden>↗</span></a>
          <a className="link-button" href="/projects">All projects</a>
        </div>
      </div>
      <a className="detail-next__card" href={`/projects/${next.slug}`}>
        <div className="detail-next__image"><Img k={next.cover} sizes="(max-width: 760px) 100vw, 50vw" alt="" /></div>
        <span className="label">Next project · {categoryLabel(next.category)}</span>
        <strong>{next.name} <span aria-hidden>→</span></strong>
      </a>
    </nav>
  </InnerPage>;
}
