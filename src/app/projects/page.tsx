import type { Metadata } from "next";
import InnerPage, { PageNote } from "@/components/InnerPage";
import FeaturedWorks from "@/components/FeaturedWorks";

export const metadata: Metadata = { title: "Projects | Royal Rising", description: "Explore Royal Rising’s portfolio of residential architecture and considered interiors." };
export default function ProjectsPage() {
  return <InnerPage label="Projects" title="Spaces to feel at home in." intro="Architecture and interiors, seen through the spaces we gather in, retreat to and move through every day." image="project-formal-living" clean>
    <PageNote title="From the first impression to the smallest detail."><p>A facade sets the tone. A staircase connects more than floors. A well-placed window changes the way a room feels throughout the day. Our portfolio explores these relationships across residential architecture and interiors.</p><p>Browse living spaces, private suites and architectural details. Select an image for a closer look at the materials, proportions and composition.</p></PageNote>
    <FeaturedWorks />
    <PageNote title="Different rooms. One considered whole."><p>Timber, stone, soft finishes and carefully placed light carry an idea from one space to the next. The aim is a home with its own character, where shared rooms feel welcoming and private spaces offer a quieter rhythm.</p><a className="pill page-text-link" href="/services">Discover our services <span aria-hidden>↗</span></a></PageNote>
  </InnerPage>;
}
