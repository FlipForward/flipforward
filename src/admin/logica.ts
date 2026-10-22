import type { Betaling, Project, ProjectStatus, Taak, Werkuur } from "./types";

/** Vaste stappen van een FlipForward-project, van akkoord tot onderhoud (zoals bij Bavago en Jan Gijs). */
export const STANDAARD_TAKEN: { titel: string; wie: Taak["wie"] }[] = [
  { titel: "Offerte getekend terug", wie: "klant" },
  { titel: "Factuur opstart deel 1 verstuurd", wie: "finn" },
  { titel: "Inhoud, foto's en logo aangeleverd", wie: "klant" },
  { titel: "Klantfeedback verwerkt (op branch, niet op main)", wie: "finn" },
  { titel: "Teksten nagelezen en goedgekeurd", wie: "klant" },
  { titel: "Formulier getest (SMTP_PASS in Vercel)", wie: "finn" },
  { titel: "Akkoord voor livegang", wie: "klant" },
  { titel: "DNS naar Vercel (MX, SPF, DKIM, DMARC niet aanraken)", wie: "finn" },
  { titel: "SITE_URL op eigen domein, PUBLIC_DEMO=false", wie: "finn" },
  { titel: "Search Console + sitemap, Bing Webmaster Tools", wie: "finn" },
  { titel: "Google Bedrijfsprofiel (NAP gelijk aan de site)", wie: "finn" },
  { titel: "Factuur opstart deel 2 verstuurd", wie: "finn" },
  { titel: "Onderhoud gestart, CLAUDE.md bijgewerkt", wie: "finn" },
];

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  getekend: "Getekend",
  in_opbouw: "In opbouw",
  klaar_voor_livegang: "Klaar voor livegang",
  live: "Live",
  gestopt: "Gestopt",
};

export const vandaag = () => new Date().toISOString().slice(0, 10);

export function plusDagen(datum: string, dagen: number) {
  const d = new Date(`${datum}T12:00:00`);
  d.setDate(d.getDate() + dagen);
  return d.toISOString().slice(0, 10);
}

export function plusMaanden(datum: string, maanden: number) {
  const d = new Date(`${datum}T12:00:00`);
  d.setMonth(d.getMonth() + maanden);
  return d.toISOString().slice(0, 10);
}

const euroFmt = new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR" });
export const euro = (n: number | null | undefined) => (n == null ? "–" : euroFmt.format(n));

export const datum = (iso: string | null | undefined) =>
  iso ? new Date(`${iso}T12:00:00`).toLocaleDateString("nl-BE", { day: "2-digit", month: "2-digit", year: "numeric" }) : "–";

export function voortgang(taken: Taak[]) {
  const klaar = taken.filter((t) => t.klaar).length;
  return { klaar, totaal: taken.length, procent: taken.length ? Math.round((klaar / taken.length) * 100) : 0 };
}

export const isTeLaat = (b: Betaling) => !b.betaald_op && !!b.vervaldatum && b.vervaldatum < vandaag();

export const openstaand = (betalingen: Betaling[]) =>
  betalingen.filter((b) => !b.betaald_op).reduce((som, b) => som + Number(b.bedrag), 0);

/** Minuten gewerkt in de maand van `ref` (jjjj-mm). */
export const minutenInMaand = (uren: Werkuur[], ref = vandaag().slice(0, 7)) =>
  uren.filter((u) => u.datum.startsWith(ref)).reduce((som, u) => som + u.minuten, 0);

/**
 * Betalingsschema volgens de offerte: 50% opstart bij akkoord, 50% bij livegang (14 dagen betaaltermijn),
 * daarna `termijnen` maandelijkse termijnen vanaf de start van het onderhoud.
 * Geeft enkel rijen terug die nog niet bestaan, dus opnieuw klikken na het invullen van de livegang vult aan.
 */
export function ontbrekendeBetalingen(p: Project, bestaand: Betaling[]): Partial<Betaling>[] {
  const nieuw: Partial<Betaling>[] = [];
  const heeft = (soort: Betaling["soort"]) => bestaand.some((b) => b.soort === soort);
  const helft = p.opstartprijs ? Math.round((p.opstartprijs / 2) * 100) / 100 : null;

  if (helft && !heeft("opstart_1"))
    nieuw.push({
      soort: "opstart_1",
      omschrijving: "Opstart deel 1 (50% bij akkoord)",
      bedrag: helft,
      vervaldatum: p.akkoord_op ? plusDagen(p.akkoord_op, 14) : null,
    });
  if (helft && !heeft("opstart_2"))
    nieuw.push({
      soort: "opstart_2",
      omschrijving: "Opstart deel 2 (50% bij livegang)",
      bedrag: helft,
      vervaldatum: p.livegang_op ? plusDagen(p.livegang_op, 14) : null,
    });

  const aantal = p.termijnen ?? 0;
  const al = bestaand.filter((b) => b.soort === "termijn").length;
  if (p.maandbedrag && p.start_onderhoud && aantal > al) {
    for (let i = al; i < aantal; i++)
      nieuw.push({
        soort: "termijn",
        omschrijving: `Onderhoud termijn ${i + 1}/${aantal}`,
        bedrag: p.maandbedrag,
        vervaldatum: plusMaanden(p.start_onderhoud, i),
      });
  }
  return nieuw.map((b) => ({ ...b, project_id: p.id }));
}
