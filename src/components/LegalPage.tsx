import type { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import ContactDrawer from "./ContactDrawer";
import { contact } from "@/lib/data";

export type LegalSection = { id: string; title: string; content: ReactNode };

export default function LegalPage({ title, intro, sections }: {
  title: string; intro: string; sections: LegalSection[];
}) {
  return <>
    <Nav />
    <main id="top" className="inner-page">
      <article className="legal-document">
      <header className="legal-header">
          <h1>{title}</h1>
          <p>{intro}</p>
          <p className="legal-date">Last updated: <time dateTime="2026-11-18">18 November 2026</time></p>
      </header>
        <div className="legal-copy">
          {sections.map(section => <section id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
            <h2 id={`${section.id}-title`}>{section.title}</h2>
            {section.content}
          </section>)}
          <div className="legal-contact"><h2>Questions? Get in touch.</h2><p>Contact Royal Rising at <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p></div>
        </div>
      </article>
    </main>
    <Footer /><ContactDrawer />
  </>;
}
