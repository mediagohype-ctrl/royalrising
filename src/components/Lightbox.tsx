"use client";
import { useCallback, useEffect, useState } from "react";
import type { ImgKey } from "@/lib/data";
import { alts } from "@/lib/data";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import Img from "./ui/Img";

export default function Lightbox() {
  const [state, setState] = useState<{ keys: ImgKey[]; index: number } | null>(null);

  useEffect(() => {
    const show = (e: Event) => setState((e as CustomEvent).detail);
    window.addEventListener("rr:lightbox", show);
    return () => window.removeEventListener("rr:lightbox", show);
  }, []);

  const close = useCallback(() => setState(null), []);
  const step = useCallback(
    (d: number) => setState((s) => (s ? { ...s, index: (s.index + d + s.keys.length) % s.keys.length } : s)),
    []
  );

  const isOpen = state !== null;
  useEffect(() => {
    if (!isOpen) return;
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
    };
  }, [isOpen, close, step]);

  if (!state) return null;
  const k = state.keys[state.index];

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={alts[k] ?? "Image"} onClick={close}>
      <div className="lb__img" onClick={(e) => e.stopPropagation()}>
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
          <button onClick={close} aria-label="Close">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
