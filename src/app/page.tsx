import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Split from "@/components/Split";
import Services from "@/components/Services";
import QuoteBand from "@/components/QuoteBand";
import FeaturedWorks from "@/components/FeaturedWorks";

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
          <h1 id="phone-intro-title">Spaces shaped<br />around your life.</h1>
          <p className="phone-intro__copy">
            A home begins with how you want to live. We bring light, materials and
            thoughtful planning together, from the first sketch to the final build.
          </p>
          <div className="phone-intro__links">
            <a className="pill" href="#works">Explore projects <span aria-hidden>↗</span></a>
            <a className="phone-intro__service" href="#services">Our services <span aria-hidden>↓</span></a>
          </div>
        </section>
        <div className="story-stack">
          <Split
            id="story"
            title="Brand Story"
            quote="Spaces shaped by light and life"
            text="Royal Rising brings architecture, interiors and construction together to create thoughtful spaces rooted in their surroundings. We work with natural light, considered materials and balanced proportions to shape homes that feel personal, welcoming and timeless."
            image="project-bedroom-suite"
            cta={{ label: "Read More", href: "#services" }}
          />
        <div className="approach-overlap">
        <Split
          id="approach"
          title="Our Approach"
          quote="From first sketch to finished home"
          label="How we work"
          sub="Plan. Design. Build."
          text="We shape your ideas around the site, light and the way you live, guiding every detail from concept to construction."
          image="project-dressing-suite"
          reverse
          cta={{ label: "View Projects", href: "#works" }}
        />
        </div>
        </div>
        </div>
        <Services />
        <QuoteBand k="project-bedroom-detail" text="Drawn with care, built to rise" />
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
