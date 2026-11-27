"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { activeCategories, projects } from "@/lib/catalog";
import ProjectCard from "./ProjectCard";

type Filter = "all" | (typeof activeCategories)[number]["slug"];

/** Category tabs over the project grid. The choice is kept in ?category= so it can be linked. */
export default function ProjectsBrowser() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Filter>("all");
  const first = useRef(true);

  // Read a linked category (e.g. from a project breadcrumb) once on arrival.
  useEffect(() => {
    const linked = new URLSearchParams(window.location.search).get("category");
    if (linked && activeCategories.some((c) => c.slug === linked)) setActive(linked as Filter);
  }, []);

  const choose = (next: Filter) => {
    setActive(next);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", next);
    window.history.replaceState(null, "", url);
  };

  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add({ desktop: "(min-width: 961px)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (context.conditions?.reduced) return;
      const desktop = context.conditions?.desktop;
      gsap.utils.toArray<HTMLElement>(".project-card", root.current!).forEach((card, i) => {
        const trigger = { trigger: card, start: "top 92%", once: true };
        const delay = first.current ? (i % 2) * 0.12 : i * 0.06;
        gsap.from(card.querySelectorAll(".project-card__meta, .project-card__title, .project-card__type, .project-card__cta"), {
          y: desktop ? 26 : 16, opacity: 0, duration: 0.95, stagger: 0.07, delay: delay + 0.2,
          ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: trigger,
        });
        gsap.fromTo(card.querySelector(".project-card__media"), { clipPath: "inset(100% 0% 0% 0%)" }, {
          clipPath: "inset(0% 0% 0% 0%)", duration: desktop ? 1.3 : 1, delay,
          ease: "power3.inOut", clearProps: "clipPath", scrollTrigger: trigger,
        });
        gsap.from(card.querySelector(".project-card__media img"), {
          scale: 1.14, duration: 1.7, delay, ease: "power2.out", clearProps: "transform", scrollTrigger: trigger,
        });
      });
    });
    return () => motion.revert();
  }, { scope: root, dependencies: [active], revertOnUpdate: true });

  // The grid height changes with the filter; re-measure every trigger below it.
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const t = setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => clearTimeout(t);
  }, [active]);

  const shown = active === "all" ? projects : projects.filter((p) => p.category === active);
  const tabs: { slug: Filter; label: string; count: number }[] = [
    { slug: "all", label: "All projects", count: projects.length },
    ...activeCategories.map((c) => ({ slug: c.slug, label: c.label, count: projects.filter((p) => p.category === c.slug).length })),
  ];

  return (
    <section ref={root} className="project-browser" aria-labelledby="project-browser-title">
      <div className="project-browser__head">
        <div>
          <p className="label">Portfolio</p>
          <h2 id="project-browser-title">Browse by category.</h2>
        </div>
        <div className="filter-tabs" role="group" aria-label="Filter projects by category">
          {tabs.map((t) => (
            <button key={t.slug} type="button" className={`filter-tab${active === t.slug ? " is-on" : ""}`}
              aria-pressed={active === t.slug} onClick={() => choose(t.slug)}>
              {t.label}<sup>{t.count}</sup>
            </button>
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{shown.length} projects shown</p>
      <div className="project-grid">
        {shown.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
      </div>
    </section>
  );
}
