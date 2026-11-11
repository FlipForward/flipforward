import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, RotateCcw, TriangleAlert } from "lucide-react";

/**
 * Speelse 404: een verouderde "kapotte" pagina die je naar een moderne versie flipt.
 * Knipoog naar de naam FlipForward. Werkt ook zonder animatie (reduced motion = crossfade).
 */
const links = [
  { to: "/", label: "Home" },
  { to: "/#portfolio", label: "Werk" },
  { to: "/#pakketten", label: "Prijzen" },
  { to: "/#contact", label: "Contact" },
];

const NotFound = () => {
  const [flipped, setFlipped] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  return (
    <main id="main" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background px-4 py-16">

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
                  <button type="button" onClick={() => setFlipped(true)} className="ff-btn ff-btn-primary [font-family:'Host_Grotesk_Variable',sans-serif]">
                    Flip forward
                  </button>
                  <p className="mt-3 text-xs text-[#555]">
                    Bezoeker nr. <span className="bg-black px-1 font-mono text-[#33ff33]">000404</span> · Best bekeken in 800x600
                  </p>
                </div>
              </div>
            </section>

            {/* Achterkant: de moderne versie met de weg terug */}
            <section
              aria-hidden={!flipped}
              className={`relative flex flex-col justify-center overflow-hidden on-ink rounded-3xl [grid-area:1/1] sm:min-h-[32rem] p-6 [backface-visibility:hidden] sm:p-10 ${
                reduced ? `transition-opacity duration-500 ${flipped ? "opacity-100" : "pointer-events-none opacity-0"}` : ""
              }`}
              style={!reduced ? { transform: "rotateY(180deg)" } : undefined}
            >
              <p className="soft num relative text-sm">Fout 404</p>
              <p className="relative mt-3 text-3xl leading-[1.08] tracking-[-0.03em] sm:text-5xl">
                Die pagina bestaat nog steeds niet, maar ze ziet er nu wel goed uit
              </p>
              <p className="soft relative mt-5">Kies waar je naartoe wil</p>
              <ul className="line relative mt-4 border-t">
                {links.map(({ to, label }) => (
                  <li key={to} className="line border-b">
                    <Link
                      to={to}
                      tabIndex={flipped ? 0 : -1}
                      className="group flex items-center justify-between py-3.5 text-xl tracking-[-0.01em]"
                    >
                      {label}
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                tabIndex={flipped ? 0 : -1}
                onClick={() => setFlipped(false)}
                className="soft relative mt-6 inline-flex items-center gap-1.5 self-start rounded-full py-1 text-sm"
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
