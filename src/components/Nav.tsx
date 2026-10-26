"use client";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { openContact } from "@/lib/events";
import { navLeft, navRight, contact } from "@/lib/data";

export default function Nav() {
  const header = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open || !window.matchMedia("(max-width: 560px)").matches) return;
    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = [
        header.current?.querySelector<HTMLAnchorElement>(".nav__logo"),
        burger.current,
        ...document.querySelectorAll<HTMLElement>("#menu a, #menu button"),
      ].filter((item): item is HTMLElement => !!item);
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [open]);

  useEffect(() => {
    const element = header.current;
    if (!element) return;
    const measure = () => document.documentElement.style.setProperty("--nav-height", `${element.offsetHeight}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--nav-height");
    };
  }, []);

  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        const h = header.current!;
        // transparent over the hero, white once past it
        const hero = document.getElementById("top");
        h.classList.toggle("is-solid", y > (hero?.offsetHeight ?? window.innerHeight) - h.offsetHeight);
        const story = document.getElementById("story");
        const storyBounds = story?.getBoundingClientRect();
        const approach = document.getElementById("approach");
        const overStory = !!storyBounds && storyBounds.top <= h.offsetHeight &&
          storyBounds.bottom > h.offsetHeight &&
          (!approach || approach.getBoundingClientRect().top > h.offsetHeight);
        h.classList.toggle("is-story", overStory);
        h.classList.toggle("is-hidden", self.direction === 1 && y > 24);
      },
    });
  });

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      if (open) lockScroll();
      else unlockScroll();
    }
    mounted.current = true;
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        burger.current?.focus();
      }
    };
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
          <img src="/images/logo-mark.png" alt="Royal Rising" width={44} height={56} />
          <span className="nav__logo-title">Royal Rising</span>
          <span className="nav__logo-sub">Architecture &bull; Interior &bull; Construction</span>
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
        <button ref={burger} className="nav__burger" aria-expanded={open} aria-controls="menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
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
