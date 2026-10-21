"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { featured, featuredMore, img, type Row, type Tile as TileT } from "@/lib/data";
import { openLightbox } from "@/lib/events";
import Img from "./ui/Img";

const allTiles = [...featured, ...featuredMore].flatMap((r) => r.tiles);
const allKeys = allTiles.map((t) => t.k);

function Tile({ t, sizes }: { t: TileT; sizes: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const { width, height } = img(t.k);
  const ratio = width / height;
  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        { clipPath: "inset(12% 0% 0% 0%)", opacity: 0.3 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 98%", end: "top 55%", scrub: true },
        }
      );
    },
    { scope: ref }
  );
  return (
    // Frame matches the photo's own shape; in a two-up row the ratio also sets its share of the width
    <button
      ref={ref}
      className="tile"
      style={{ aspectRatio: `${width} / ${height}`, ["--r" as string]: ratio }}
      data-cursor="View" onClick={() => openLightbox(allKeys, allKeys.indexOf(t.k))} aria-label={`Open ${t.title}`}>
      <div className="tile__img">
        <Img k={t.k} sizes={sizes} />
      </div>
      <span className="tile__title">{t.title}</span>
    </button>
  );
}

function Rows({ rows }: { rows: Row[] }) {
  return rows.map((r, i) => (
    <div key={i} className={`works__row works__row--${r.kind}`}>
      {r.tiles.map((t) => (
        <Tile key={t.k} t={t} sizes={r.kind === "two" ? "(max-width: 900px) 100vw, 52vw" : "105vw"} />
      ))}
    </div>
  ));
}

export default function FeaturedWorks() {
  const root = useRef<HTMLElement>(null);
  const [more, setMore] = useState(false);

  useGSAP(
    () => {
      gsap.from(".works__title", {
        y: 50,
        opacity: 0,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: ".works__title", start: "top 85%", once: true },
      });
    },
    { scope: root }
  );

  // new rows change the page height; re-measure every trigger below
  useEffect(() => {
    if (!more) return;
    const t = setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => clearTimeout(t);
  }, [more]);

  return (
    <section id="works" ref={root} className="works">
      <h2 className="title works__title">Featured Works</h2>
      <Rows rows={featured} />
      {more && <Rows rows={featuredMore} />}
      {!more && (
        <div className="more">
          <button className="more__btn" onClick={() => setMore(true)} aria-label="View more projects">
            <span aria-hidden>+</span>
          </button>
          <span className="more__label">View more projects</span>
        </div>
      )}
    </section>
  );
}
