import { useEffect, useState } from "react";

/**
 * Ontwerpvarianten om naast elkaar te vergelijken (enkel tijdelijk tijdens de redesign).
 * Keuze staat in de URL (?hero=slider&werk=stack) zodat je een variant kunt delen.
 */
export const VARIANTS = {
  hero: [
    { id: "flip", label: "Flip-kaart" },
    { id: "slider", label: "Voor/na-slider" },
    { id: "scroll", label: "Scroll-flip" },
  ],
  werk: [
    { id: "cases", label: "Grote cases" },
    { id: "carousel", label: "Carrousel" },
    { id: "stack", label: "Stapelkaarten" },
  ],
} as const;

export type VariantKey = keyof typeof VARIANTS;
const EVENT = "ff-variant";

function read(key: VariantKey): string {
  const v = new URLSearchParams(window.location.search).get(key);
  return VARIANTS[key].some((o) => o.id === v) ? (v as string) : VARIANTS[key][0].id;
}

/** Eerste render (en SSR/prerender) = standaardvariant; daarna de keuze uit de URL. */
export function useVariant(key: VariantKey): string {
  const [value, setValue] = useState<string>(VARIANTS[key][0].id);
  useEffect(() => {
    const sync = () => setValue(read(key));
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("popstate", sync);
    };
  }, [key]);
  return value;
}

export function setVariant(key: VariantKey, id: string) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, id);
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(EVENT));
}
