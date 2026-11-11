import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { packages, includedInAll, addOns, formatEuro, yearlyPrice, rentYearly, RENT_MONTHS } from "@/lib/site";
import { selectPackage } from "@/lib/selectPackage";
import Reveal from "./motion/Reveal";

/** "Domeinnaam, hosting, SSL-certificaat, …" als lopende zin. */
const inbegrepen = includedInAll.map((x) => (x.startsWith("SSL") ? x : x.toLowerCase()));

const huur = packages.filter((p) => p.rent);

const Pricing = () => {
  // Gsm en tablet: de pakketten staan naast elkaar om te swipen; start met de aanrader in het midden
  const rij = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = rij.current;
    const kaart = el?.querySelector<HTMLElement>(`[data-pakket="${packages.find((p) => p.highlight)?.id}"]`);
    if (!el || !kaart || el.scrollWidth <= el.clientWidth) return;
    el.scrollLeft = kaart.offsetLeft - (el.clientWidth - kaart.clientWidth) / 2;
  }, []);

  return (
    <section id="pakketten" aria-labelledby="pakketten-title" className="scroll-mt-20 border-t border-border py-16 sm:py-28">
      <div className="wrap">
        <Reveal className="grid gap-4 pb-8 sm:pb-14 lg:grid-cols-2 lg:items-end">
          <h2 id="pakketten-title" className="h-section">
            Prijzen
          </h2>
          <p className="max-w-[30rem] text-lg text-muted-foreground lg:justify-self-end">
            Eén keer opstarten, daarna een vast bedrag per maand. Er komt geen btw bij: dit zijn eindprijzen.
          </p>
        </Reveal>

        <div ref={rij} className="snap-row -mx-4 px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0">
          {packages.map((p, i) => {
            const featured = Boolean(p.highlight);
            return (
              <Reveal key={p.id} delay={i * 80} className="flex w-[84vw] max-w-[24rem] shrink-0 snap-center lg:w-auto lg:max-w-none">
                <article
                  data-pakket={p.id}
                  className={`flex w-full flex-col rounded-3xl p-6 sm:p-8 ${featured ? "on-ink" : "bg-card"}`}
                  aria-labelledby={`pakket-${p.id}`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 id={`pakket-${p.id}`} className="text-2xl tracking-[-0.02em]">
                      {p.name}
                    </h3>
                    {p.highlight && <span className="soft text-sm">{p.highlight}</span>}
                  </div>
                  <p className={`mt-1 text-[15px] ${featured ? "soft" : "text-muted-foreground"}`}>{p.audience}</p>

                  <p className="num mt-8 text-[clamp(2.75rem,4.4vw,4rem)] leading-none tracking-[-0.04em]">
                    {p.setupFrom && <span className={`mr-2 text-lg tracking-normal ${featured ? "soft" : "text-muted-foreground"}`}>vanaf</span>}
                    {formatEuro(p.setup)}
                  </p>
                  <p className={`mt-2 text-[15px] ${featured ? "soft" : "text-muted-foreground"}`}>eenmalige opstart</p>
                  <p className="num mt-5 text-xl">
                    + {formatEuro(p.monthly)} per maand
                  </p>
                  <p className={`num mt-1 text-[15px] ${featured ? "soft" : "text-muted-foreground"}`}>of {formatEuro(yearlyPrice(p))} per jaar, 1 maand gratis</p>

                  <ul className={`line mb-8 mt-8 space-y-3 border-t pt-6 text-[15px] ${featured ? "" : "border-border"}`}>
                    {[p.pages, ...p.features].map((f) => (
                      <li key={f} className="flex gap-3">
                        <Check className={`mt-1 h-4 w-4 shrink-0 ${featured ? "soft" : "text-muted-foreground"}`} strokeWidth={1.5} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button type="button" onClick={() => selectPackage(p.id)} className={`ff-btn mt-auto w-full ${featured ? "ff-btn-primary" : "ff-btn-line"}`}>
                    Kies {p.name}
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 grid gap-10 sm:mt-16 lg:grid-cols-3 lg:gap-12">
          <div>
            <h3 className="text-xl tracking-[-0.01em]">Liever geen opstart</h3>
            <p className="mt-3 max-w-[32rem] text-muted-foreground">
              {huur.map((p) => p.name).join(" en ")} kan je ook huren: geen opstartkost, een vast bedrag per maand vanaf je akkoord, voor minstens{" "}
              {RENT_MONTHS} maanden. De website blijft dan van FlipForward.
            </p>
            <dl className="mt-4 border-t border-border">
              {huur.map((p) => (
                <div key={p.id} className="flex items-baseline justify-between gap-6 border-b border-border py-3">
                  <dt>{p.name} huren</dt>
                  <dd className="num text-right text-muted-foreground">
                    <span className="text-foreground">{formatEuro(p.rent!)} per maand</span>
                    <span className="block text-sm">of {formatEuro(rentYearly(p.rent!))} per jaar</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="text-xl tracking-[-0.01em]">In elke prijs</h3>
            <p className="mt-3 max-w-[32rem] text-muted-foreground">
              {inbegrepen.slice(0, -1).join(", ").replace(/^./, (c) => c.toUpperCase())} en {inbegrepen[inbegrepen.length - 1]}, plus een privacyverklaring en je wettelijke
              bedrijfsgegevens. Je domeinnaam staat op jouw naam.
            </p>
          </div>
          <div>
            <h3 className="text-xl tracking-[-0.01em]">Extra</h3>
            <dl className="mt-3 border-t border-border">
              {addOns.map((a) => (
                <div key={a.name} className="flex items-baseline justify-between gap-6 border-b border-border py-3">
                  <dt>{a.name}</dt>
                  <dd className="num text-muted-foreground">{a.price.toLowerCase()}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Pricing;
