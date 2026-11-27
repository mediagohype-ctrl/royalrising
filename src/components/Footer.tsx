"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { contact } from "@/lib/data";
import { openContact } from "@/lib/events";
import SocialLinks from "./SocialLinks";

const company = [
  { label: "About Us", href: "/about" },
  { label: "Our Approach", href: "/approach" },
  { label: "Services", href: "/services" },
];
const explore = [
  { label: "Projects", href: "/projects" },
  { label: "Drawings", href: "/drawings" },
  { label: "Back to top", href: "#top" },
];


export default function Footer() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".ft__letter", { yPercent: 110 }, {
        yPercent: 0,
        ease: "power2.inOut",
        duration: 1.1,
        stagger: { each: 0.07, from: "center" },
        scrollTrigger: {
          trigger: ".ft__big",
          start: "clamp(top 95%)",
          toggleActions: "restart none restart none",
          invalidateOnRefresh: true,
        },
      });
    });
    return () => motion.revert();
  }, { scope: root });
  return (
    <footer ref={root} className="ft">
      <div className="ft__grid">
        <div className="ft__col ft__project">
          <h4>Start a project</h4>
          <button className="ft__write" onClick={openContact}>
            <span>Tell us about your site</span>
            <i aria-hidden>→</i>
          </button>
        </div>
        <div className="ft__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-mark.webp" alt="" width={120} height={159} decoding="async" />
          <span className="ft__brand-name">Royal Rising</span>
          <p>Architecture | Interior | Construction</p>
        </div>
        <div className="ft__links">
          <div>
            <h4>Company</h4>
            {company.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
            <button className="ft__contact" onClick={openContact}>Contact Us</button>
          </div>
          <div>
            <h4>Explore</h4>
            {explore.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="ft__grid ft__grid--info">
        <div className="ft__col">
          <h4>Studio</h4>
          <p>Royal Rising</p>
          <p>Architecture · Interior · Construction</p>
        </div>
        <div className="ft__col ft__col--c">
          <h4>Client enquiries</h4>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <h4>Website</h4>
          <a href={contact.websiteUrl} target="_blank" rel="noreferrer">
            {contact.website}
          </a>
        </div>
        <SocialLinks className="ft__social" />
      </div>

      <div className="ft__big" aria-hidden>
        {"ROYAL RISING".split("").map((letter, i) => (
          <span key={i} className={letter === " " ? "ft__space" : "ft__letter"}>
            {letter === " " ? "\u00a0" : letter}
          </span>
        ))}
      </div>
      <div className="ft__bottom">
        <span>© {new Date().getFullYear()} Royal Rising. All rights reserved.</span>
        <nav className="ft__legal" aria-label="Legal">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-and-conditions">Terms &amp; Conditions</a>
        </nav>
      </div>
    </footer>
  );
}
