"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion, onReady } from "@/lib/ready";
import { setLenis, scrollToTarget, lockScroll, unlockScroll } from "@/lib/scroll";

export default function SmoothScroll() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!window.__rrReady) window.scrollTo(0, 0);

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

    // Advance one reading panel per gesture before Services.
    let moving = false;
    let moveDeadline = 0;
    let wheelAmount = 0;
    let lastWheel = 0;
    let touchY: number | null = null;
    let touchMoved = false;
    const resetStep = () => {
      moving = false;
      moveDeadline = 0;
      wheelAmount = 0;
    };
    const isMoving = () => {
      // ScrollTrigger refreshes, dialogs and native input can interrupt Lenis
      // without invoking the original scroll's completion callback.
      if (moving && (performance.now() >= moveDeadline || !lenis?.isScrolling)) resetStep();
      return moving;
    };
    const sectionSelector = ".intro-sequence section";
    const getSectionEnd = () => {
      const services = document.getElementById("services");
      if (!services) return 0;
      return services.getBoundingClientRect().top + window.scrollY;
    };
    const inSectionRange = (direction: number) => {
      const end = getSectionEnd();
      return isMoving() || (end > 0 && (direction > 0 ? window.scrollY < end - 24 : window.scrollY <= end + 24));
    };
    const canAdvance = (target: EventTarget | null) => {
      if (!lenis || lenis.isStopped || document.documentElement.classList.contains("is-locked")) return false;
      return target instanceof Element && !target.closest(
        'input, textarea, select, [contenteditable="true"], [data-lenis-prevent], [role="dialog"]'
      );
    };
    const advance = (direction: number) => {
      if (!lenis) return false;
      if (isMoving()) return true;
      const max = Math.min(getSectionEnd(), Math.max(0, document.documentElement.scrollHeight - window.innerHeight));
      const stops = [0, max];
      const pins = ScrollTrigger.getAll().filter((trigger) =>
        trigger.pin instanceof Element && !!trigger.pin.closest(".intro-sequence")
      );
      document.querySelectorAll<HTMLElement>(sectionSelector).forEach((section) => {
        if (!section.getClientRects().length) return;
        const pin = pins.find((trigger) => trigger.pin === section);
        // Brand Story pins at its bottom on short screens. Recover its actual
        // section top so the heading and text remain reachable in both directions.
        const top = section.id === "top" ? 0 : pin
          ? pin.start - Math.max(0, section.offsetHeight - window.innerHeight)
          : section.getBoundingClientRect().top + window.scrollY;
        stops.push(top);
        // Long sections remain readable instead of skipping their lower content.
        const bottom = top + section.offsetHeight - window.innerHeight;
        for (let point = top + window.innerHeight * 0.85; point < bottom; point += window.innerHeight * 0.85) {
          stops.push(point);
        }
        if (bottom > top + 40) stops.push(bottom);
      });
      // Pinned animation ranges supply their own stops, not artificial reading panels.
      for (let i = stops.length - 1; i >= 0; i--) {
        if (pins.some((trigger) => stops[i] > trigger.start + 1 && stops[i] < trigger.end - 1)) stops.splice(i, 1);
      }
      pins.forEach((trigger) => {
        stops.push(trigger.start, trigger.end);
      });
      const ordered = [...new Set(stops.map((point) => Math.round(Math.max(0, Math.min(max, point)))))].sort((a, b) => a - b);
      const current = window.scrollY;
      const target = direction > 0
        ? ordered.find((point) => point > current + 24)
        : ordered.slice().reverse().find((point) => point < current - 24);
      if (target === undefined) return false;
      // Short reading steps stay responsive; full panels glide in and settle
      // gently with the same acceleration when travelling up or down.
      const distance = Math.abs(target - current) / window.innerHeight;
      const duration = Math.min(1.35, Math.max(0.7, 0.7 + distance * 0.45));
      moving = true;
      moveDeadline = performance.now() + duration * 1000 + 600;
      lenis.scrollTo(target, {
        duration,
        lerp: 0,
        easing: (t) => (1 - Math.cos(Math.PI * t)) / 2,
        onComplete: resetStep,
      });
      return true;
    };
    const onWheel = (event: WheelEvent) => {
      if (!canAdvance(event.target) || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY) return;
      if (!inSectionRange(Math.sign(event.deltaY))) return;
      const now = performance.now();
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (now - lastWheel > 180 || Math.sign(wheelAmount) !== Math.sign(delta)) wheelAmount = 0;
      lastWheel = now;
      if (isMoving()) {
        wheelAmount = 0;
      } else {
        wheelAmount += delta;
        if (Math.abs(wheelAmount) >= 24) {
          wheelAmount = 0;
          // At an edge, let Lenis handle the wheel instead of swallowing it.
          if (!advance(Math.sign(delta))) return;
        }
      }
      event.preventDefault();
      event.stopImmediatePropagation();
    };
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches.length === 1 && canAdvance(event.target) ? event.touches[0].clientY : null;
      touchMoved = false;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (touchY === null || event.touches.length !== 1 || !canAdvance(event.target)) return;
      const delta = touchY - event.touches[0].clientY;
      if (!touchMoved && !inSectionRange(Math.sign(delta))) return;
      if (Math.abs(delta) < 24 && !touchMoved) return;
      if (!touchMoved && !advance(Math.sign(delta))) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      touchMoved = true;
    };
    const onTouchEnd = () => { touchY = null; touchMoved = false; };
    const onNativeInput = () => resetStep();
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    window.addEventListener("pointerdown", onNativeInput);
    window.addEventListener("keydown", onNativeInput);

    // Route every in-page anchor through the smooth scroller
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href")!;
      e.preventDefault();
      resetStep();
      scrollToTarget(href === "#top" ? 0 : href);
    };
    document.addEventListener("click", onClick);

    // Images arriving late can shift pinned sections; re-measure once everything is in
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      offReady();
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart, true);
      window.removeEventListener("touchmove", onTouchMove, true);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("pointerdown", onNativeInput);
      window.removeEventListener("keydown", onNativeInput);
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(raf);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
