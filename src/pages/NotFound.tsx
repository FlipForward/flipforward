import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home, LayoutGrid, Mail, Package, RotateCcw, TriangleAlert } from "lucide-react";
import { Spotlight } from "@/components/aceternity/Spotlight";
import { Button } from "@/components/ui/button";

/**
 * Speelse 404: een verouderde "kapotte" pagina die je naar een moderne versie flipt.
 * Knipoog naar de naam FlipForward. Werkt ook zonder animatie (reduced motion = crossfade).
 */
const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/#portfolio", label: "Ons werk", icon: LayoutGrid },
  { to: "/#pakketten", label: "Pakketten", icon: Package },
  { to: "/#contact", label: "Contact", icon: Mail },
];

const NotFound = () => {
  const [flipped, setFlipped] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  return (
    <main id="main" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background px-4 py-16">
      <Spotlight />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(10_89%_50%/0.12),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-2xl">
        <h1 className="sr-only">Pagina niet gevonden (404)</h1>

        <div className="relative w-full [perspective:1600px]">
          <div
            className="relative grid w-full transition-transform duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1.15)] [transform-style:preserve-3d]"
            style={{ transform: !reduced && flipped ? "rotateY(180deg)" : "none" }}
          >
            {/* Voorkant: de oude, kapotte pagina */}
            <section
              aria-hidden={flipped}
              className={`flex flex-col overflow-hidden rounded-xl border border-[#9a9a9a] [grid-area:1/1] sm:min-h-[32rem] bg-[#c0c0c0] shadow-2xl [backface-visibility:hidden] ${
                reduced ? `transition-opacity duration-500 ${flipped ? "pointer-events-none opacity-0" : "opacity-100"}` : ""
              }`}
            >
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#0a246a] to-[#a6caf0] px-3 py-1.5">
                <span className="truncate text-xs font-bold text-white [font-family:Tahoma,Verdana,sans-serif] sm:text-sm">
                  404 - Pagina niet gevonden - Microsoft Internet Explorer
                </span>
                <span className="ml-auto flex gap-1" aria-hidden="true">
                  {["_", "□", "×"].map((c) => (
                    <span key={c} className="grid h-4 w-4 place-items-center border border-white/80 bg-[#d4d0c8] text-[10px] leading-none text-black">
                      {c}
                    </span>
                  ))}
                </span>
              </div>
              <div className="flex items-center gap-2 border-b border-[#808080] bg-[#d4d0c8] px-3 py-1 text-[11px] text-black [font-family:Tahoma,Verdana,sans-serif] sm:text-xs">
                <span>Adres</span>
                <span className="flex flex-1 items-center gap-1 truncate border border-[#808080] bg-white px-1.5 py-0.5">
                  <TriangleAlert className="h-3 w-3 flex-shrink-0 text-[#b45309]" aria-hidden="true" />
                  http://www.flipforward.be/deze-pagina-bestaat-niet.htm
                </span>
              </div>

              <div className="flex flex-1 flex-col bg-[#fffff0] p-4 text-black [font-family:'Times_New_Roman',Times,serif] sm:p-6">
                <div className="overflow-hidden whitespace-nowrap border-y-2 border-[#000080] bg-[#ffff66] py-1">
                  <p className="inline-block text-sm font-bold text-[#cc0000] motion-safe:animate-[marquee_10s_linear_infinite] sm:text-base">
                    *** OEPS!!! DEZE PAGINA IS NOG NIET GEFLIPT *** ERROR 404 *** OEPS!!!
                  </p>
                </div>

                <p className="mt-4 text-center text-6xl font-bold text-[#000080] [font-family:'Comic_Sans_MS','Comic_Sans',cursive] sm:text-8xl">
                  404
                </p>
                <p className="mt-2 text-center text-sm sm:text-base">
                  De pagina die je zoekt is <u>verdwenen</u>, <u>verhuisd</u> of heeft <u>nooit bestaan</u>.
                  <br />
                  Klik <span className="text-[#0000ee] underline">hier</span> om het nog eens te proberen. (Dat werkt niet.)
                </p>

                <div className="mx-auto mt-4 grid h-12 w-full max-w-sm place-items-center border-2 border-dashed border-[#999] bg-[repeating-linear-gradient(45deg,#ffcc00_0_10px,#222_10px_20px)] sm:h-14">
                  <span className="bg-[#ffcc00] px-2 py-0.5 text-xs font-bold sm:text-sm">UNDER CONSTRUCTION SINDS 2009</span>
                </div>

                <div className="mt-auto pt-4 text-center">
                  <Button variant="hero" size="lg" onClick={() => setFlipped(true)} className="[font-family:Inter,sans-serif]">
                    Flip forward
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                  <p className="mt-3 text-xs text-[#555]">
                    Bezoeker nr. <span className="bg-black px-1 font-mono text-[#33ff33]">000404</span> · Best bekeken in 800x600
                  </p>
                </div>
              </div>
            </section>

            {/* Achterkant: de moderne versie met de weg terug */}
            <section
              aria-hidden={!flipped}
              className={`relative flex flex-col justify-center overflow-hidden rounded-xl border border-white/10 [grid-area:1/1] sm:min-h-[32rem] bg-[hsl(222_47%_6%)] p-6 shadow-2xl [backface-visibility:hidden] sm:p-10 ${
                reduced ? `transition-opacity duration-500 ${flipped ? "opacity-100" : "pointer-events-none opacity-0"}` : ""
              }`}
              style={!reduced ? { transform: "rotateY(180deg)" } : undefined}
            >
              <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,hsl(10_89%_55%/0.45),transparent_65%)] blur-2xl" />
              <p className="relative text-sm font-semibold uppercase tracking-wider text-accent">Fout 404</p>
              <p className="relative mt-2 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
                Zo. Die pagina bestaat nog steeds niet,
                <span className="block text-transparent bg-clip-text bg-gradient-accent">maar ze ziet er nu wel goed uit.</span>
              </p>
              <p className="relative mt-4 text-muted-foreground">Kies waar je naartoe wilt:</p>
              <ul className="relative mt-5 grid gap-3 sm:grid-cols-2">
                {links.map(({ to, label, icon: Icon }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      tabIndex={flipped ? 0 : -1}
                      className="group flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 text-foreground transition-colors hover:border-accent/60 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                      <span className="font-medium">{label}</span>
                      <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                tabIndex={flipped ? 0 : -1}
                onClick={() => setFlipped(false)}
                className="relative mt-6 inline-flex items-center gap-1.5 self-start rounded-full px-2 py-1 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Toch liever de oude versie
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
