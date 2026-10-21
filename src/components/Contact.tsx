"use client";
import { useRef, useState, type FormEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { contact } from "@/lib/data";
import ParallaxImage from "./ui/ParallaxImage";
import SplitReveal from "./ui/SplitReveal";
import Magnetic from "./ui/Magnetic";

const types = ["Private villa", "Mansion / estate", "Residential building", "Temple / mandir", "Interior", "Other"];

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [type, setType] = useState(types[0]);

  useGSAP(
    () => {
      gsap.from(".ct__fade", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".ct__grid", start: "top 80%", once: true },
      });
    },
    { scope: root }
  );

  // No backend yet: hand the enquiry to the visitor's mail app, pre-filled.
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Project enquiry: ${type}`;
    const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\nPhone: ${f.get("phone") || "-"}\nProject: ${type}\n\n${f.get("message")}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" ref={root} className="ct">
      <ParallaxImage k="tp-aerial-night" speed={14} className="ct__bg" sizes="115vw" reveal={false} />
      <div className="ct__shade" />
      <div className="ct__inner">
        <p className="eyebrow">(05) Start a project</p>
        <h2 className="ct__title">
          <SplitReveal text="Let's raise" split="chars" />
          <SplitReveal text="something remarkable." className="ci__accent" delay={0.2} />
        </h2>

        <div className="ct__grid">
          <div className="ct__info">
            <Magnetic strength={0.25}>
              <a href={`mailto:${contact.email}`} className="ct__mail ct__fade" data-cursor="Write">
                {contact.email}
              </a>
            </Magnetic>
            <ul className="ct__links">
              <li className="ct__fade">
                <span>Website</span>
                <a href={contact.websiteUrl} target="_blank" rel="noreferrer">
                  {contact.website}
                </a>
              </li>
              <li className="ct__fade">
                <span>Instagram</span>
                <a href={contact.instagram} target="_blank" rel="noreferrer">
                  {contact.instagramHandle}
                </a>
              </li>
              <li className="ct__fade">
                <span>YouTube</span>
                <a href={contact.youtube} target="_blank" rel="noreferrer">
                  Watch the walkthrough
                </a>
              </li>
            </ul>
          </div>

          <form className="ct__form ct__fade" onSubmit={submit}>
            <fieldset className="ct__types">
              <legend>I&apos;m planning a</legend>
              {types.map((t) => (
                <label key={t} className={type === t ? "is-on" : ""}>
                  <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} />
                  {t}
                </label>
              ))}
            </fieldset>
            <div className="ct__row">
              <label className="field">
                <input name="name" required placeholder=" " autoComplete="name" />
                <span>Your name</span>
              </label>
              <label className="field">
                <input name="email" type="email" required placeholder=" " autoComplete="email" />
                <span>Email</span>
              </label>
            </div>
            <label className="field">
              <input name="phone" type="tel" placeholder=" " autoComplete="tel" />
              <span>Phone (optional)</span>
            </label>
            <label className="field">
              <textarea name="message" rows={3} required placeholder=" " />
              <span>Tell us about the site and what you imagine</span>
            </label>
            <Magnetic strength={0.3}>
              <button type="submit" className="btn btn--gold">
                Send enquiry <span aria-hidden>→</span>
              </button>
            </Magnetic>
          </form>
        </div>
      </div>
    </section>
  );
}
