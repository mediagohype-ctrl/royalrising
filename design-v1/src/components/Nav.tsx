"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { nav, projects, contact } from "@/lib/data";
import Img from "./ui/Img";
import Magnetic from "./ui/Magnetic";

export default function Nav() {
  const header = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(0);

  useGSAP(() => {
    gsap.set(header.current, { yPercent: -100, opacity: 0 });
    const off = onReady(() => gsap.to(header.current, { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.6 }));

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        header.current?.classList.toggle("is-solid", y > 60);
        header.current?.classList.toggle("is-hidden", self.direction === 1 && y > 400);
        if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
      },
    });
    return off;
  });

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      if (open) lockScroll();
      else unlockScroll();
    }
    mounted.current = true;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <div className="progress" aria-hidden>
        <div ref={bar} />
      </div>
      <header ref={header} className={`nav${open ? " is-open" : ""}`}>
        <a href="#top" className="nav__brand" aria-label="Royal Rising, back to top" onClick={close}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-mark.png" alt="" width={30} height={38} />
          <span>Royal Rising</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              <span data-text={n.label}>{n.label}</span>
            </a>
          ))}
        </nav>
        <div className="nav__right">
          <Magnetic>
            <a href="#contact" className="btn btn--ghost nav__cta">
              Start a project
            </a>
          </Magnetic>
          <button className="nav__burger" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
            <span className="nav__burger-label">{open ? "Close" : "Menu"}</span>
            <span className="nav__burger-lines" aria-hidden>
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <div id="menu" className={`menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="menu__preview" aria-hidden>
          {projects.map((p, i) => (
            <div key={p.id} className={`menu__preview-img${preview === i ? " is-active" : ""}`}>
              <Img k={p.cover} sizes="40vw" />
            </div>
          ))}
        </div>
        <div className="menu__body">
          <p className="eyebrow">Projects</p>
          <ul className="menu__projects">
            {projects.map((p, i) => (
              <li key={p.id} style={{ ["--i" as string]: i }}>
                <a href={`#${p.id}`} onClick={close} onPointerEnter={() => setPreview(i)} onFocus={() => setPreview(i)} tabIndex={open ? 0 : -1}>
                  <span className="menu__no">{p.index}</span>
                  <span className="menu__name">
                    {p.name} <em>{p.accent}</em>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="menu__foot">
            <div className="menu__links">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={close} tabIndex={open ? 0 : -1}>
                  {n.label}
                </a>
              ))}
            </div>
            <a href={`mailto:${contact.email}`} className="menu__mail" tabIndex={open ? 0 : -1}>
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
