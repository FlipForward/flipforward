import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import TypingAnimation from "./TypingAnimation";
import FlipShowcase from "./hero/FlipShowcase";
import BeforeAfter from "./hero/BeforeAfter";
import ScrollFlipHero from "./hero/ScrollFlipHero";
import { useVariant } from "@/lib/variants";

const HeroText = ({ centered = false }: { centered?: boolean }) => (
  <div className={centered ? "text-center" : "text-center lg:text-left"}>
    <TypingAnimation />

    <h1
      className={`font-extrabold tracking-tight mb-5 sm:mb-6 leading-[1.05] text-balance ${
        centered ? "text-4xl sm:text-6xl xl:text-7xl" : "text-4xl sm:text-5xl xl:text-7xl"
      }`}
    >
      Van saaie site naar
      <span className="block text-transparent bg-clip-text bg-gradient-accent pb-2">flip forward.</span>
    </h1>

    <p className={`text-base sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto ${centered ? "" : "lg:mx-0"}`}>
      FlipForward bouwt websites voor kmo's en zelfstandigen in de Kempen en regelt daarna alles: hosting, beveiliging,
      updates en aanpassingen. Jij onderneemt, wij doen de rest.
    </p>

    <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center ${centered ? "" : "lg:justify-start"}`}>
      <Button asChild variant="hero" size="lg">
        <a href="#pakketten">
          Bekijk de pakketten
          <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
        </a>
      </Button>
      <Button asChild variant="outline" size="lg">
        <a href="#portfolio">Bekijk ons werk</a>
      </Button>
    </div>
  </div>
);

const Hero = () => {
  const variant = useVariant("hero");

  if (variant === "scroll") return <ScrollFlipHero text={<HeroText centered />} />;

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Oranje gloed en raster, enkel in donkere modus */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-3xl pointer-events-none opacity-0 dark:opacity-100"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.07] dark:opacity-[0.12] [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />

      <div className="container mx-auto px-4 sm:px-6 pt-28 pb-20 lg:pt-24 relative z-10">
        <div className="grid items-center gap-12 lg:gap-10 lg:grid-cols-[1fr_1.1fr]">
          <HeroText />
          {variant === "slider" ? <BeforeAfter /> : <FlipShowcase />}
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 hidden sm:flex justify-center z-10">
        <a href="#over" aria-label="Scroll naar Over FlipForward" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <ChevronDown className="w-9 h-9 text-accent motion-safe:animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
