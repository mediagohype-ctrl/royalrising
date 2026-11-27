import Img from "../ui/Img";
import { categoryLabel, type Project } from "@/lib/catalog";

/** Image-led project card used on the projects page and on service detail pages. */
export default function ProjectCard({ project, index, sizes = "(max-width: 760px) 100vw, 50vw" }: {
  project: Project; index?: number; sizes?: string;
}) {
  return (
    <a className="project-card" href={`/projects/${project.slug}`} aria-label={`View project: ${project.name}`}>
      <div className="project-card__media">
        <Img k={project.cover} sizes={sizes} alt={`${project.name}, ${project.typology}`} />
      </div>
      <div className="project-card__meta">
        <span className="label">{categoryLabel(project.category)}</span>
        {index !== undefined && <span className="project-card__index">{String(index + 1).padStart(2, "0")}</span>}
      </div>
      <h3 className="project-card__title">
        {project.name}{project.accent && <> <em>{project.accent}</em></>}
      </h3>
      <p className="project-card__type">{project.typology}</p>
      <span className="project-card__cta">View project <span aria-hidden>↗</span></span>
    </a>
  );
}
