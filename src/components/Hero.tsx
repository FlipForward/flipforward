import HeroCopy from "./hero/HeroCopy";
import { ParallaxHeroImages } from "./aceternity/ParallaxHeroImages";
import { Spotlight } from "./aceternity/Spotlight";
import { showcase, projectAnchor, FEATURED } from "@/lib/showcase";

const floating = showcase.slice(0, 8).map((s) => ({
  src: s.thumbnail,
  w: s.w,
  h: s.h,
  title: s.title,
  href: FEATURED.includes(s.title) ? `#${projectAnchor(s.title)}` : s.link,
}));

/** Gecentreerde tekst; projectscreenshots zweven eromheen en volgen de muis. */
const Hero = () => (
  <section id="hero" className="relative flex items-center overflow-hidden md:min-h-[100svh]">
    <Spotlight />
    <ParallaxHeroImages items={floating} className="max-md:hidden" />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--background))_25%,hsl(var(--background)/0.6)_50%,transparent_75%)]"
    />
    <div className="container pointer-events-none relative z-20 mx-auto px-4 pb-14 pt-28 sm:px-6 md:pb-20">
      <HeroCopy align="center" className="pointer-events-auto" />
    </div>
  </section>
);

export default Hero;
