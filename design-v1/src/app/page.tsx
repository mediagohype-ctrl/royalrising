import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Studio from "@/components/Studio";
import WorksRail from "@/components/WorksRail";
import TwinPalace from "@/components/chapters/TwinPalace";
import FuturisticHome from "@/components/chapters/FuturisticHome";
import OrganicResidence from "@/components/chapters/OrganicResidence";
import Villa145 from "@/components/chapters/Villa145";
import HMansion from "@/components/chapters/HMansion";
import Process from "@/components/Process";
import Archive from "@/components/Archive";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Marquee from "@/components/ui/Marquee";
import FlyThrough from "@/components/FlyThrough";
import ScrollFX from "@/components/ScrollFX";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Nav />
      <div className="grain" aria-hidden />
      <main>
        <Hero />
        <Studio />
        <Marquee items={["Architecture", "Interior", "Construction"]} />
        <FlyThrough />
        <WorksRail />
        <TwinPalace />
        <FuturisticHome />
        <OrganicResidence />
        <Villa145 />
        <HMansion />
        <Marquee items={["Drawn with care", "Built to last", "Lit for the evening"]} className="marquee--gold" />
        <Process />
        <Archive />
        <Contact />
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
