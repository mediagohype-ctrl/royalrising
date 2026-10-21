"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { contact, nav, projects } from "@/lib/data";

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".ft__big span",
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: "none",
          stagger: 0.05,
          scrollTrigger: { trigger: wrap.current, start: "top 70%", end: "bottom bottom", scrub: true },
        }
      );
      gsap.fromTo(
        ".ft__mark",
        { rotateY: -90, opacity: 0 },
        { rotateY: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: wrap.current, start: "top 80%", end: "center bottom", scrub: true } }
      );
    },
    { scope: root }
  );

  return (
    // The page lifts away to uncover a footer fixed beneath it
    <div ref={wrap} className="ft-wrap">
      <footer ref={root} className="ft">
        <div className="ft__top">
          <div className="ft__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-full.png" alt="Royal Rising" className="ft__mark" width={130} height={138} />
            <p>Architecture | Interior | Construction</p>
          </div>
          <div className="ft__cols">
            <div>
              <h4>Projects</h4>
              {projects.map((p) => (
                <a key={p.id} href={`#${p.id}`}>
                  {p.name}
                </a>
              ))}
            </div>
            <div>
              <h4>Explore</h4>
              {nav.map((n) => (
                <a key={n.href} href={n.href}>
                  {n.label}
                </a>
              ))}
            </div>
            <div>
              <h4>Connect</h4>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={contact.websiteUrl} target="_blank" rel="noreferrer">
                {contact.website}
              </a>
              <a href={contact.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href={contact.youtube} target="_blank" rel="noreferrer">
                YouTube
              </a>
            </div>
          </div>
        </div>
        <div className="ft__big" aria-hidden>
          {"ROYAL RISING".split("").map((c, i) => (
            <span key={i}>{c === " " ? " " : c}</span>
          ))}
        </div>
        <div className="ft__bottom">
          <span>© {new Date().getFullYear()} Royal Rising</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
