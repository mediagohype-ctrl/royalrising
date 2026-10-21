"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { openContact } from "@/lib/events";
import { navLeft, navRight, contact } from "@/lib/data";

export default function Nav() {
  const header = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    gsap.set(header.current, { yPercent: -100, opacity: 0 });
    const off = onReady(() => gsap.to(header.current, { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.3 }));
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        const h = header.current!;
        // transparent over the hero, white once past it
        h.classList.toggle("is-solid", y > window.innerHeight * 0.85);
        h.classList.toggle("is-hidden", self.direction === 1 && y > window.innerHeight);
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
  const talk = () => {
    close();
    openContact();
  };

  return (
    <>
      <header ref={header} className={`nav${open ? " is-open" : ""}`}>
        <nav className="nav__side" aria-label="Primary">
          {navLeft.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#top" className="nav__logo" aria-label="Royal Rising, back to top" onClick={close}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-mark.png" alt="" width={30} height={38} />
          <span>Royal Rising</span>
        </a>
        <div className="nav__side nav__side--r">
          {navRight.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
          <button className="pill" onClick={talk}>
            Let&apos;s Talk
          </button>
        </div>
        <button className="nav__burger" aria-expanded={open} aria-controls="menu" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          <i />
          <i />
        </button>
      </header>

      <div id="menu" className={`menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        {[...navLeft, ...navRight].map((n, i) => (
          <a key={n.href} href={n.href} onClick={close} tabIndex={open ? 0 : -1} style={{ ["--i" as string]: i }}>
            {n.label}
          </a>
        ))}
        <button className="pill" onClick={talk} tabIndex={open ? 0 : -1}>
          Let&apos;s Talk
        </button>
        <a className="menu__mail" href={`mailto:${contact.email}`} tabIndex={open ? 0 : -1}>
          {contact.email}
        </a>
      </div>
    </>
  );
}
