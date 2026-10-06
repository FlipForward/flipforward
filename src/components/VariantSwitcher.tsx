import { useEffect, useState } from "react";
import { Palette, X } from "lucide-react";
import { VARIANTS, setVariant, useVariant, type VariantKey } from "@/lib/variants";

const LABELS: Record<VariantKey, string> = { hero: "Hero" };
const TARGET: Record<VariantKey, string> = { hero: "hero" };

const Row = ({ k }: { k: VariantKey }) => {
  const current = useVariant(k);
  return (
    <div>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">{LABELS[k]}</p>
      <div className="flex flex-wrap gap-1.5">
        {VARIANTS[k].map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={current === o.id}
            onClick={() => {
              setVariant(k, o.id);
              document.getElementById(TARGET[k])?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              current === o.id ? "bg-primary text-white" : "bg-white/10 text-white/80 hover:bg-white/20"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
};

/** Zwevend paneel om ontwerpvarianten te wisselen. Enkel in dev of met ?varianten in de URL. */
const VariantSwitcher = () => {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setEnabled(import.meta.env.DEV || new URLSearchParams(window.location.search).has("varianten"));
    setOpen(window.innerWidth >= 768);
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[60] text-white">
      {open ? (
        <div className="w-72 space-y-3 rounded-2xl border border-white/15 bg-black/80 p-4 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Palette className="h-4 w-4 text-accent" aria-hidden="true" /> Varianten
            </p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Paneel sluiten" className="rounded p-1 hover:bg-white/10">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          {(Object.keys(VARIANTS) as VariantKey[]).map((k) => (
            <Row key={k} k={k} />
          ))}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Varianten openen"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/80 shadow-2xl backdrop-blur-md"
        >
          <Palette className="h-5 w-5 text-accent" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default VariantSwitcher;
