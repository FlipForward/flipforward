import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import TypingAnimation from "./TypingAnimation";

const Hero = () => (
  <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
    {/* Oranje gloed bovenaan, enkel in donkere modus */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-3xl pointer-events-none z-10 opacity-0 dark:opacity-100"
      aria-hidden="true"
    />

    <div className="container mx-auto px-4 sm:px-6 pt-20 pb-16 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <TypingAnimation />

        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-[1.15] text-balance">
          Jouw professionele website,
          <span className="block text-transparent bg-clip-text bg-gradient-accent mt-1 pb-3 sm:pb-4">volledig verzorgd.</span>
        </h1>

        <p className="text-base sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
          FlipForward bouwt websites voor kmo's en zelfstandigen in de Kempen en regelt daarna alles: hosting, beveiliging,
          updates en aanpassingen. Jij onderneemt, wij doen de rest.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
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
    </div>

    <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
      <a href="#over" aria-label="Scroll naar Over FlipForward" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <ChevronDown className="w-10 h-10 text-accent motion-safe:animate-bounce" aria-hidden="true" />
      </a>
    </div>
  </section>
);

export default Hero;
