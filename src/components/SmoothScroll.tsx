"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion, onReady } from "@/lib/ready";
import { setLenis, scrollToTarget, lockScroll, unlockScroll } from "@/lib/scroll";

export default function SmoothScroll() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    let lenis: Lenis | null = null;
    const raf = (time: number) => lenis?.raf(time * 1000);

    if (!prefersReducedMotion()) {
      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, touchMultiplier: 1.4 });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    // Hold the page still until the preloader lifts
    lockScroll();
    const offReady = onReady(() => {
      unlockScroll();
      ScrollTrigger.refresh();
    });

    // Route every in-page anchor through the smooth scroller
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href")!;
      e.preventDefault();
      scrollToTarget(href === "#top" ? 0 : href);
    };
    document.addEventListener("click", onClick);

    // Images arriving late can shift pinned sections; re-measure once everything is in
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      offReady();
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(raf);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
