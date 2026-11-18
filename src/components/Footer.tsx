"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { contact } from "@/lib/data";
import { openContact } from "@/lib/events";

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

const Icon = {
  instagram: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
};

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
          <img src="/images/logo-mark.png" alt="" width={120} height={127} />
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
        <div className="ft__social">
          <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            {Icon.instagram}
          </a>
          <a href={contact.websiteUrl} target="_blank" rel="noreferrer" aria-label="Website">
            {Icon.web}
          </a>
          <a href={`mailto:${contact.email}`} aria-label="Email">
            {Icon.mail}
          </a>
        </div>
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
