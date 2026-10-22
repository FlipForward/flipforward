import type { Betaling, Project } from "./types";
import { plusDagen, plusMaanden, vandaag } from "./logica";

/** Zoals de algemene voorwaarden (art. 9): betalen binnen 14 dagen, jaarlijks = 11 maandbedragen voor 12 maanden. */
export const BETAALTERMIJN_DAGEN = 14;
export const BETAALDE_MAANDEN_PER_JAAR = 11;

export type FactuurStatus = "gepland" | "gefactureerd" | "te_laat" | "betaald";

/** Eén factuur: een rij uit `betalingen`, of een geplande onderhoudsfactuur die nog geen rij heeft. */
export type Factuur = {
  sleutel: string;
  project_id: string;
  rij: Betaling | null;
  soort: Betaling["soort"];
  omschrijving: string;
  bedrag: number;
  /** Wanneer de factuur moet vertrekken (null = nog onbekend, bv. "bij livegang"). */
  factuurdatum: string | null;
  vervaldatum: string | null;
  periode: string | null;
  status: FactuurStatus;
};

export const STATUS_LABEL_FACTUUR: Record<FactuurStatus, string> = {
  gepland: "Te factureren",
  gefactureerd: "Wacht op betaling",
  te_laat: "Te laat",
  betaald: "Betaald",
};

const maandJaar = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("nl-BE", { month: "long", year: "numeric" });

/**
 * Onderhoudsfacturen vanaf de start van het onderhoud tot `tot`.
 * Maandelijks: elke maand één factuur; in de eerste looptijd enkel de eerste `termijnen` maanden
 * (bv. Bavago: 12 maanden aan de prijs van 11 → maand 12 gratis). Jaarlijks: per jaar vooruit, 11 maandbedragen.
 */
export function onderhoudsPlanning(p: Project, tot: string) {
  if (!p.start_onderhoud || !p.maandbedrag || p.status === "gestopt") return [];
  const uit: { periode: string; bedrag: number; omschrijving: string }[] = [];
  if (p.facturatie === "jaarlijks") {
    for (let j = 0; ; j++) {
      const periode = plusMaanden(p.start_onderhoud, 12 * j);
      if (periode > tot) break;
      const einde = plusDagen(plusMaanden(periode, 12), -1);
      uit.push({
        periode,
        bedrag: p.maandbedrag * BETAALDE_MAANDEN_PER_JAAR,
        omschrijving: `Onderhoud jaar ${j + 1} (${maandJaar(periode)} – ${maandJaar(einde)})`,
      });
    }
    return uit;
  }
  const looptijd = p.looptijd_maanden ?? 12;
  const betaald = p.termijnen ?? looptijd;
  for (let i = 0; ; i++) {
    const periode = plusMaanden(p.start_onderhoud, i);
    if (periode > tot) break;
    if (i < looptijd && i >= betaald) continue;
    uit.push({ periode, bedrag: p.maandbedrag, omschrijving: `Onderhoud ${maandJaar(periode)}` });
  }
  return uit;
}

function statusVan(b: Betaling): FactuurStatus {
  if (b.betaald_op) return "betaald";
  if (b.gefactureerd_op) return b.vervaldatum && b.vervaldatum < vandaag() ? "te_laat" : "gefactureerd";
  return "gepland";
}

function factuurdatumVan(b: Betaling, p: Project): string | null {
  if (b.gefactureerd_op) return b.gefactureerd_op;
  if (b.soort === "termijn") return b.periode;
  if (b.soort === "opstart_1") return p.akkoord_op;
  if (b.soort === "opstart_2") return p.livegang_op;
  return b.vervaldatum ? plusDagen(b.vervaldatum, -BETAALTERMIJN_DAGEN) : null;
}

/** Alle facturen van een project: bestaande rijen + geplande onderhoudsfacturen tot `tot`, gesorteerd op factuurdatum. */
export function facturenVan(p: Project, betalingen: Betaling[], tot: string): Factuur[] {
  const eigen = betalingen.filter((b) => b.project_id === p.id);
  const bekend = new Set(eigen.filter((b) => b.soort === "termijn" && b.periode).map((b) => b.periode));
  const rijen: Factuur[] = eigen.map((b) => ({
    sleutel: b.id,
    project_id: p.id,
    rij: b,
    soort: b.soort,
    omschrijving: b.omschrijving,
    bedrag: Number(b.bedrag),
    factuurdatum: factuurdatumVan(b, p),
    vervaldatum: b.vervaldatum,
    periode: b.periode,
    status: statusVan(b),
  }));
  const gepland: Factuur[] = onderhoudsPlanning(p, tot)
    .filter((t) => !bekend.has(t.periode))
    .map((t) => ({
      sleutel: `plan-${p.id}-${t.periode}`,
      project_id: p.id,
      rij: null,
      soort: "termijn",
      omschrijving: t.omschrijving,
      bedrag: t.bedrag,
      factuurdatum: t.periode,
      vervaldatum: null,
      periode: t.periode,
      status: "gepland",
    }));
  return [...rijen, ...gepland].sort((a, b) => (a.factuurdatum ?? "9999").localeCompare(b.factuurdatum ?? "9999"));
}

/** Eerstvolgende factuur die nog moet vertrekken (kijkt tot ruim een jaar vooruit). */
export const volgendeFactuur = (p: Project, betalingen: Betaling[]) =>
  facturenVan(p, betalingen, plusDagen(vandaag(), 400)).find((f) => f.status === "gepland") ?? null;

/** Rij-wijziging voor "factuur verstuurd": bestaande rij bijwerken of de geplande termijn aanmaken. */
export function alsVerstuurd(f: Factuur): { nieuw?: Partial<Betaling>; wijziging?: Partial<Betaling> } {
  const nu = vandaag();
  const vervaldatum = plusDagen(nu, BETAALTERMIJN_DAGEN);
  if (f.rij) return { wijziging: { gefactureerd_op: nu, vervaldatum: f.rij.vervaldatum ?? vervaldatum } };
  return {
    nieuw: {
      project_id: f.project_id,
      soort: "termijn",
      omschrijving: f.omschrijving,
      bedrag: f.bedrag,
      periode: f.periode,
      gefactureerd_op: nu,
      vervaldatum,
    },
  };
}
