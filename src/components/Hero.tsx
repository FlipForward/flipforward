import { ArrowDownRight } from "lucide-react";
import Magnetic from "./motion/Magnetic";
import Marquee from "./motion/Marquee";
import { business, packages, formatEuro } from "@/lib/site";

const TITLE = ["Websites", "voor", "vakmannen", "en", "kmo’s", "in", "de", "Kempen"];

/** Voor wie Finn bouwt: de vakken rollen als band door het beeld. Geen klantnamen, enkel beroepen. */
const TRADES = ["Dakwerkers", "Schrijnwerkers", "Loodgieters", "Tuinaannemers", "Garages", "Elektriciens", "Kappers", "Bakkers"];

const Hero = () => {
  const start = packages[0];

  return (
    <section id="hero" className="pb-14 pt-16 sm:pb-24 sm:pt-20">
      <div className="wrap pb-10 pt-10 sm:pb-14 sm:pt-16 lg:pt-20">
        <h1 className="eyebrow fade-up" style={{ ["--d" as string]: "0s" }}>
          Webdesign &amp; website laten maken · {business.city}, Kempen
        </h1>

        <p className="display mt-5 max-w-[16ch] text-foreground sm:mt-6">
          {TITLE.map((w, i) => (
            <span key={i}>
              <span className="rise">
                <span style={{ ["--i" as string]: i }}>{w}</span>
              </span>{" "}
            </span>
          ))}
        </p>

        <div className="fade-up mt-8 grid gap-8 sm:mt-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-[34rem] text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Ik ben Finn. Ik bouw je website in 2 tot 6 weken en hou ze daarna bij: hosting, updates en aanpassingen voor een vast bedrag per
            maand. Vanaf {formatEuro(start.setup)} opstart en {formatEuro(start.monthly)} per maand.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Magnetic className="w-full sm:w-auto">
              <a href="#contact" className="ff-btn ff-btn-primary w-full sm:w-auto">
                Vraag een gratis voorbeeld
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a href="#pakketten" className="ff-btn ff-btn-line w-full sm:w-auto">
                Bekijk de prijzen
                <ArrowDownRight strokeWidth={1.5} className="h-4 w-4" aria-hidden="true" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <p className="sr-only">Voor onder meer {TRADES.join(", ").toLowerCase()}.</p>
      <Marquee className="border-y border-border py-3 sm:py-5">
        {TRADES.map((t) => (
          <span key={t} className="flex items-center text-[clamp(2.25rem,7vw,6rem)] leading-none tracking-[-0.04em] text-foreground">
            <span className="px-5 sm:px-8">{t}</span>
            <span className="h-2.5 w-2.5 rounded-full bg-primary sm:h-4 sm:w-4" />
          </span>
        ))}
      </Marquee>

    </section>
  );
};

export default Hero;
