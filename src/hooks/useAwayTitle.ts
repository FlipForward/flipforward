import { useEffect } from "react";

const AWAY_TITLES = ["We missen je hier 🥺", "Kom je terug? 👀", "Psst… je website wacht 🧡", "Hallo? Ben je daar nog? 👋"];

/**
 * Verandert de tab-titel als de bezoeker naar een ander tabblad gaat, en zet hem terug bij terugkomst.
 * Enkel in de browser (de prerender ziet altijd de gewone titel).
 */
export function useAwayTitle() {
  useEffect(() => {
    let original = document.title;
    let i = Math.floor(Math.random() * AWAY_TITLES.length);

    const onChange = () => {
      if (document.hidden) {
        original = document.title; // titel kan per pagina verschillen
        document.title = AWAY_TITLES[i];
        i = (i + 1) % AWAY_TITLES.length;
      } else {
        document.title = original;
      }
    };

    document.addEventListener("visibilitychange", onChange);
    return () => {
      document.removeEventListener("visibilitychange", onChange);
      if (!document.hidden) document.title = original;
    };
  }, []);
}
