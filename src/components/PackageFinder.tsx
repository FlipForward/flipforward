import { useMemo, useState } from "react";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { packages, type PackageId } from "@/lib/site";

/**
 * "Welk pakket past bij mij?" – drie vragen, het advies is het hoogste pakket dat een antwoord vraagt.
 * De logica volgt rechtstreeks de pakketinhoud in site.ts (pagina's, talen, CMS/catalogus).
 */
const RANK: PackageId[] = ["start", "business", "pro"];

const questions: { id: string; q: string; options: { label: string; pkg: PackageId }[] }[] = [
  {
    id: "paginas",
    q: "Hoeveel pagina's heb je nodig?",
    options: [
      { label: "Tot 5", pkg: "start" },
      { label: "6 tot 10", pkg: "business" },
      { label: "Meer / weet ik niet", pkg: "pro" },
    ],
  },
  {
    id: "talen",
    q: "In hoeveel talen?",
    options: [
      { label: "Enkel Nederlands", pkg: "start" },
      { label: "2 talen", pkg: "business" },
      { label: "3 of meer", pkg: "pro" },
    ],
  },
  {
    id: "extra",
    q: "Wat moet je site nog kunnen?",
    options: [
      { label: "Gewoon tonen wie we zijn", pkg: "start" },
      { label: "Zelf teksten aanpassen", pkg: "business" },
      { label: "Catalogus of offertes", pkg: "pro" },
    ],
  },
];

interface Props {
  onResult: (id: PackageId | null) => void;
}

const PackageFinder = ({ onResult }: Props) => {
  const [answers, setAnswers] = useState<Record<string, PackageId>>({});

  const result = useMemo<PackageId | null>(() => {
    if (Object.keys(answers).length < questions.length) return null;
    return RANK[Math.max(...Object.values(answers).map((p) => RANK.indexOf(p)))];
  }, [answers]);

  const choose = (qid: string, pkg: PackageId) => {
    const next = { ...answers, [qid]: pkg };
    setAnswers(next);
    if (Object.keys(next).length === questions.length) {
      const r = RANK[Math.max(...Object.values(next).map((p) => RANK.indexOf(p)))];
      onResult(r);
      window.setTimeout(() => {
        document.getElementById(`pakket-${r}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 350);
    }
  };

  const reset = () => {
    setAnswers({});
    onResult(null);
  };

  const step = Object.keys(answers).length;
  const pkg = result ? packages.find((p) => p.id === result) : null;

  return (
    <div className="relative max-w-6xl mx-auto mb-12 sm:mb-16 overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/[0.08] via-card to-card p-5 sm:p-8">
      <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,hsl(10_89%_55%/0.25),transparent_70%)] blur-2xl" />

      <div className="relative flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
            <Sparkles className="h-4 w-4" aria-hidden="true" /> Pakketkiezer
          </p>
          <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-foreground">Welk pakket past bij jou?</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            {questions.map((q, i) => (
              <span key={q.id} className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${i < step ? "bg-accent" : "bg-border"}`} />
            ))}
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Opnieuw
            </button>
          )}
        </div>
      </div>

      <div className="relative mt-6 grid gap-5 md:grid-cols-3">
        {questions.map((q, qi) => (
          <fieldset
            key={q.id}
            className={`transition-opacity duration-300 ${qi > step ? "md:opacity-40" : "opacity-100"}`}
          >
            <legend className="mb-3 text-sm font-semibold text-foreground">
              <span className="mr-2 font-mono text-accent">{qi + 1}.</span>
              {q.q}
            </legend>
            <div className="flex flex-wrap gap-2">
              {q.options.map((o) => {
                const active = answers[q.id] === o.pkg;
                return (
                  <button
                    key={o.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => choose(q.id, o.pkg)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-safe:active:scale-95 ${
                      active
                        ? "border-transparent bg-primary text-primary-foreground shadow-glow"
                        : "border-border bg-background/60 text-foreground hover:border-accent/60"
                    }`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <p role="status" aria-live="polite" className="relative mt-6 min-h-[1.5rem] text-base">
        {pkg && (
          <span className="inline-flex flex-wrap items-center gap-x-2 motion-safe:animate-fade-in">
            Ons advies: <strong className="text-accent text-lg">{pkg.name}</strong>
            <span className="text-muted-foreground">({pkg.audience.toLowerCase()})</span>
            <ArrowRight className="h-4 w-4 text-accent motion-safe:animate-pulse" aria-hidden="true" />
            <span className="text-muted-foreground">hieronder gemarkeerd</span>
          </span>
        )}
      </p>
    </div>
  );
};

export default PackageFinder;
