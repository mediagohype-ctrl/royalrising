# Royal Rising Website

Single-page parallax site for Royal Rising (Architecture | Interior | Construction), built with Next.js 16, GSAP ScrollTrigger and Lenis smooth scrolling.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Images

Client originals live in `assets/`. `npm run images` turns them into named, cropped files in `public/images/`, extracts the gold logo onto a transparent background, and writes `src/lib/image-meta.json`. Run it again whenever assets change.

## Structure

- `src/app/page.tsx`: section order
- `src/lib/data.ts`: projects, facts, contact details and the archive list (all copy lives here)
- `src/components/`: Hero, Studio, WorksRail, Process, Archive, Contact, Footer, Nav, Preloader, Cursor
- `src/components/chapters/`: one file per project
- `src/components/ui/`: reusable effects (ParallaxImage, SplitReveal, ScrubWords, CompareSlider, Lens, Counter, Magnetic, Marquee)

## Notes

- The contact form opens the visitor's mail app, pre-filled to info@royalrising.in. There's no backend yet.
- Motion respects `prefers-reduced-motion`: no smooth scroll, no preloader animation.
