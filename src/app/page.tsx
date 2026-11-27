import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Split from "@/components/Split";
import Services from "@/components/Services";
import QuoteBand from "@/components/QuoteBand";
import FeaturedWorks from "@/components/FeaturedWorks";
import VideoShowcase from "@/components/VideoShowcase";

import Drawings from "@/components/Drawings";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import ContactDrawer from "@/components/ContactDrawer";
import Lightbox from "@/components/Lightbox";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Nav />
      <main>
        <div className="intro-sequence">
        <Hero />
        <section className="phone-intro" aria-labelledby="phone-intro-title">
          <p className="label">Architecture · Interiors · Construction</p>
          <h1 id="phone-intro-title">Homes designed<br />from the ground up.</h1>
          <p className="phone-intro__copy">
            Architecture, interiors and construction under one roof. We take a home
            from the first site visit to the day you move in.
          </p>
          <div className="phone-intro__links">
            <a className="pill" href="#works">Explore projects <span aria-hidden>↗</span></a>
            <a className="phone-intro__service" href="#services">Our services <span aria-hidden>↓</span></a>
          </div>
        </section>
        <div className="story-stack">
          <Split
            id="story"
            title={<>Brand <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Story</em></>}
            quote="Designed for the plot. Built for the family."
            text="Royal Rising is an architecture, interiors and construction studio. We design private residences, estates and interiors, then stay with them through the build, so the house you move into is the house you approved. Natural materials, generous daylight and plans that make daily life easier run through all of our work."
            image="hd-tp-front-day"
            cta={{ label: "Read More", href: "/about" }}
          />
        <div className="approach-overlap">
        <Split
          id="approach"
          title={<>Our <em>Approach</em></>}
          quote="From First Sketch to Finished Home"
          label="How we work"
          sub="Plan. Design. Build."
          text="We study the site, learn how your household runs and develop the design in stages you can review. Then we carry it through construction ourselves."
          image="hd-v145-night"
          reverse
          cta={{ label: "Our Process", href: "/approach" }}
        />
        </div>
        </div>
        </div>
        <VideoShowcase />
        <Services />
        <QuoteBand k="hd-hm-night-waterfall" text="Drawn with care, built to rise" accentWords={["care", "rise"]} />
        <FeaturedWorks />
        <Drawings />
        <Cta />
      </main>
      <Footer />
      <ContactDrawer />
      <Lightbox />
    </>
  );
}
