import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/aceternity/FlipWords";
import { cn } from "@/lib/utils";

const WORDS = ["opvalt.", "verkoopt.", "gevonden wordt.", "gewoon werkt."];

/** Gedeelde hero-tekst voor de Aceternity-varianten. */
const HeroCopy = ({ align = "left", className }: { align?: "left" | "center"; className?: string }) => {
  const center = align === "center";
  return (
    <div className={cn(center ? "text-center mx-auto" : "text-left", "max-w-3xl", className)}>
      <p className={cn("inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-sm font-medium text-accent")}>
        <MapPin className="h-4 w-4" aria-hidden="true" /> Webbureau uit Retie · Kempen
      </p>

      <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl xl:text-7xl">
        <span className="sr-only">Jouw zaak verdient een website die opvalt, verkoopt en gevonden wordt.</span>
        <span aria-hidden="true">
          Jouw zaak verdient
          <br />
          een website die
          <br />
          <FlipWords words={WORDS} className="text-accent -ml-0" />
        </span>
      </h1>

      <p className={cn("mt-6 max-w-xl text-base text-muted-foreground sm:text-xl", center && "mx-auto")}>
        FlipForward bouwt websites voor kmo's en zelfstandigen in de Kempen en regelt daarna alles: hosting, beveiliging,
        updates en aanpassingen. Jij onderneemt, wij doen de rest.
      </p>

      <div className={cn("mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4", center ? "justify-center items-center" : "items-start")}>
        <Button asChild variant="hero" size="lg">
          <a href="#pakketten">
            Bekijk de pakketten
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="#portfolio">Bekijk ons werk</a>
        </Button>
      </div>
    </div>
  );
};

export default HeroCopy;
