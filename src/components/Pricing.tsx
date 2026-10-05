import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Camera, Languages, Clock } from "lucide-react";
import { packages, includedInAll, addOns, PRICE_NOTE, formatEuro } from "@/lib/site";
import { selectPackage } from "@/lib/selectPackage";

const addOnIcons: Record<string, typeof Clock> = { Fotografie: Camera, "Extra taal": Languages };

const Pricing = () => {
  return (
    <section id="pakketten" aria-labelledby="pakketten-title" className="py-16 sm:py-24 bg-muted/50 relative overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="pakketten-title" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Kies je <span className="text-accent">pakket</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Eén keer opstarten, daarna een vast bedrag per maand. Hosting, onderhoud en beveiliging zitten er altijd in.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 max-w-6xl mx-auto items-stretch">
          {packages.map((p) => {
            const featured = Boolean(p.highlight);
            return (
              <Card
                key={p.id}
                className={`relative flex flex-col p-6 sm:p-8 bg-gradient-card ${
                  featured ? "border-2 border-accent shadow-[0_0_40px_hsl(10_89%_55%/0.15)] lg:-translate-y-2" : "border-border"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {p.highlight}
                  </span>
                )}
                <h3 className="text-2xl font-bold text-foreground">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 min-h-[2.5rem]">{p.audience}</p>

                <div className="mt-6">
                  <p className="text-4xl font-bold text-foreground">
                    {p.setupFrom && <span className="text-base font-medium text-muted-foreground mr-1">vanaf</span>}
                    {formatEuro(p.setup)}
                  </p>
                  <p className="text-sm text-muted-foreground">eenmalige opstart</p>
                  <p className="mt-3 text-xl font-semibold text-accent">
                    + {formatEuro(p.monthly)} <span className="text-base font-medium">/ maand</span>
                  </p>
                  <p className="text-sm text-muted-foreground min-h-[1.25rem]">{p.monthlyNote ?? "hosting & onderhoud"}</p>
                </div>

                <p className="mt-6 rounded-lg bg-background/60 px-3 py-2 text-sm font-semibold text-foreground">{p.pages}</p>

                <ul className="mt-6 space-y-2.5 text-sm flex-1" aria-label={`Inbegrepen in ${p.name}`}>
                  {[...p.features, ...p.legal].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-foreground">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={featured ? "hero" : "outline"}
                  size="lg"
                  className="mt-8 w-full"
                >
                  <a
                    href={`?pakket=${p.id}#contact`}
                    onClick={(e) => {
                      e.preventDefault();
                      selectPackage(p.id);
                    }}
                  >
                    Kies {p.name}
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </a>
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="max-w-6xl mx-auto mt-8 rounded-xl border border-border bg-background/60 p-5 sm:p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-3">In elk pakket inbegrepen</h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground">
            {includedInAll.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="max-w-6xl mx-auto mt-4 text-sm text-muted-foreground text-center">{PRICE_NOTE}</p>

        <div className="max-w-6xl mx-auto mt-14">
          <h3 className="text-2xl font-bold text-center mb-6">Extra's</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {addOns.map((a) => {
              const Icon = addOnIcons[a.name] ?? Clock;
              return (
                <Card key={a.name} className="p-5 sm:p-6 border-dashed border-accent/40 bg-accent/5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{a.name}</p>
                      <p className="text-accent font-bold text-sm">{a.price}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
