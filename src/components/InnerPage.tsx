import type { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import ContactDrawer from "./ContactDrawer";
import Lightbox from "./Lightbox";
import Img from "./ui/Img";
import type { ImgKey } from "@/lib/data";
import ProjectEnquiry from "./ProjectEnquiry";

export default function InnerPage({ label, title, intro, image, children, showExplore = true }: {
  label: string; title: string; intro: string; image?: ImgKey; children: ReactNode; showExplore?: boolean;
}) {
  return <>
    <Nav />
    <main id="top" className="inner-page studio-page">
      <header className={`studio-hero${image ? " studio-hero--image" : ""}`}>
        {image && <div className="studio-hero__image"><Img k={image} priority sizes="100vw" /></div>}
        <div className="page-intro__copy">
          <p className="label">Royal Rising / {label}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
          {showExplore && <a className="pill" href="#page-content">{label === "About Us" ? "Meet the studio" : label === "Our Approach" ? "Our process" : `Explore ${label.toLowerCase()}`} <span aria-hidden>↓</span></a>}
        </div>
      </header>
      <div id="page-content">{children}</div>
      <section className="page-contact">
        <div className="page-contact__image"><Img k="project-bar-detail" sizes="(max-width: 760px) 100vw, 50vw" /></div>
        <div className="page-contact__copy">
        <p className="label">Your next chapter</p>
        <h2>Let’s make room for your ideas.</h2>
        <p>Tell us about your site, your plans and the way you want to live.</p>
        <ProjectEnquiry />
        </div>
      </section>
    </main>
    <Footer /><ContactDrawer /><Lightbox />
  </>;
}

export function PageNote({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return <section className="page-note"><div><p className="label">{label}</p><h2>{title}</h2></div><div className="page-note__copy">{children}</div></section>;
}

export function EditorialSection({ label, title, text, image, reverse = false, children }: {
  label: string; title: string; text: string; image: ImgKey; reverse?: boolean; children?: ReactNode;
}) {
  return <section className={`page-editorial${reverse ? " page-editorial--reverse" : ""}`}>
    <div className="page-editorial__image"><Img k={image} sizes="(max-width: 760px) 100vw, 50vw" /></div>
    <div className="page-editorial__copy"><p className="label">{label}</p><h2>{title}</h2><p>{text}</p>{children}</div>
  </section>;
}
