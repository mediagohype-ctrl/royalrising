import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Split from "@/components/Split";
import Services from "@/components/Services";
import QuoteBand from "@/components/QuoteBand";
import FeaturedWorks from "@/components/FeaturedWorks";
import FlyThrough from "@/components/FlyThrough";
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
        <Hero />
        <Split
          id="story"
          title="Brand Story"
          quote="Every curve we draw is designed to rise with the light"
          label="Know us better"
          sub="Iconic Architecture . Interior Design . Construction"
          text="Royal Rising is an architecture, interior and construction studio. We shape flowing curves, glass and travertine into homes, palaces and sacred spaces that feel as if they grew out of their landscape, and then we build them."
          image="v145-day"
          cta={{ label: "Read More", href: "#services" }}
        />
        <Split
          id="approach"
          title="Our Approach"
          quote="From the first line on paper to the first evening in the home"
          label="How we work"
          sub="Site & Story . Drawings . Visualisation . Construction"
          text="We read the land, the light and the way you want to live. Lines become measured plans, plans become photoreal views you can walk through, and our teams take every drawing to site until the place is finished."
          image="or-night"
          reverse
          cta={{ label: "View Projects", href: "#works" }}
        />
        <Services />
        <QuoteBand k="fh-night" text="Drawn with care, built to rise" />
        <FlyThrough />
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
