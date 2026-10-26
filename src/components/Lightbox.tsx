"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ImgKey } from "@/lib/data";
import { alts, img } from "@/lib/data";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import Img from "./ui/Img";

export default function Lightbox() {
  const [state, setState] = useState<{ keys: ImgKey[]; index: number; source?: HTMLElement; sourceKey?: ImgKey } | null>(null);
  const picture = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const show = (e: Event) => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      closeTimer.current = null;
      setClosing(false);
      setState((e as CustomEvent).detail);
    };
    window.addEventListener("rr:lightbox", show);
    return () => {
      window.removeEventListener("rr:lightbox", show);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const close = useCallback(() => {
    if (closeTimer.current) return;
    setClosing(true);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setState(null);
      setClosing(false);
      closeTimer.current = null;
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 600);
  }, []);
  const step = useCallback(
    (d: number) => {
      if (!closeTimer.current) setState((s) => (s ? { ...s, index: (s.index + d + s.keys.length) % s.keys.length } : s));
    },
    []
  );

  const isOpen = state !== null;
  useLayoutEffect(() => {
    if (!state || !picture.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const element = picture.current;
    const k = state.keys[state.index];
    const sourceImage = state.source?.querySelector("img");
    const source = sourceImage?.getBoundingClientRect();
    const target = element.getBoundingClientRect();
    const asset = img(k);
    // Both images use object-fit: contain; measure the visible photo, not its letterbox.
    const fit = (rect: DOMRect) => {
      const scale = Math.min(rect.width / asset.width, rect.height / asset.height);
      return { width: asset.width * scale, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    };
    let from: Keyframe = { opacity: 0, transform: "scale(0.97)" };
    if (source && source.width > 0 && source.height > 0 && state.sourceKey === k && source.bottom > 0 && source.top < window.innerHeight) {
      const a = fit(source);
      const b = fit(target);
      from = { opacity: 1, transform: `translate(${a.x - b.x}px, ${a.y - b.y}px) scale(${a.width / b.width})` };
    }
    const rest = { opacity: 1, transform: "translate(0px, 0px) scale(1)" };
    const animation = element.animate(closing ? [rest, from] : [from, rest], {
      duration: 600,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "both",
    });
    return () => animation.cancel();
  }, [state, closing]);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    closeButton.current?.focus({ preventScroll: true });
    lockScroll();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("keydown", key);
      unlockScroll();
      previousFocus?.focus({ preventScroll: true });
    };
  }, [isOpen, close, step]);

  if (!state) return null;
  const k = state.keys[state.index];

  return (
    <div className={`lb${closing ? " is-closing" : ""}`} role="dialog" aria-modal="true" aria-label={alts[k] ?? "Image"} onClick={close}>
      <div ref={picture} key={k} className="lb__img" onClick={(e) => e.stopPropagation()}>
        <Img k={k} key={k} className="contain" sizes="92vw" />
      </div>
      <div className="lb__bar" onClick={(e) => e.stopPropagation()}>
        <span>
          {String(state.index + 1).padStart(2, "0")} / {String(state.keys.length).padStart(2, "0")}
        </span>
        <span className="lb__title">{alts[k]?.replace("Royal Rising: ", "")}</span>
        <div className="lb__nav">
          <button onClick={() => step(-1)} aria-label="Previous image">
            ←
          </button>
          <button onClick={() => step(1)} aria-label="Next image">
            →
          </button>
          <button ref={closeButton} onClick={close} aria-label="Close">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
