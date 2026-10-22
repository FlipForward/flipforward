import type { Betaling, Klant, Offerte, Project, Taak, Tabel, Tabellen, Werkuur } from "./types";
import { STANDAARD_TAKEN } from "./logica";

/** Fictieve data voor de lokale modus (npm run dev zonder Supabase). Geen echte klanten. */
export function voorbeeldData(): { [T in Tabel]: Tabellen[T][] } {
  const klant: Klant = {
    id: "k-voorbeeld",
    bedrijf: "Voorbeeld BV",
    ondernemingsnummer: "0000.000.000",
    adres: "Voorbeeldstraat 1, 2470 Retie",
    contacten: [{ naam: "Jan Voorbeeld", rol: "zaakvoerder", email: "jan@voorbeeld.test", telefoon: "0400 00 00 00" }],
    gmail_label: "FlipForward/VOORBEELD",
    notities: "Fictieve klant om de beheeromgeving lokaal te testen.",
  };
  const project: Project = {
    id: "p-voorbeeld",
    klant_id: klant.id,
    naam: "Nieuwe website",
    status: "live",
    facturatie: "maandelijks",
    pakket: "Opstart + 12 maanden onderhoud",
    opstartprijs: 2000,
    maandbedrag: 75,
    termijnen: 11,
    looptijd_maanden: 12,
    uren_per_maand: 1,
    akkoord_op: "2026-08-01",
    livegang_op: "2026-09-01",
    start_onderhoud: "2026-09-01",
    domein: "voorbeeld.test",
    dns_status: "nog oude host",
    demo_url: "https://voorbeeld.flipforward.be",
    live_url: null,
    repo_url: null,
    vercel_project: "voorbeeld",
    notities: null,
  };
  const offerte: Offerte = {
    id: "o-voorbeeld",
    project_id: project.id,
    nummer: "FF-0000-001",
    datum: "2026-07-28",
    verstuurd_op: "2026-07-28",
    getekend_op: "2026-08-01",
    getekend_door: "Jan Voorbeeld",
    opstart: 2000,
    maandbedrag: 75,
    totaal_eerste_jaar: 2825,
    status: "getekend",
    pdf_pad: null,
    notities: null,
  };
  const betalingen: Betaling[] = [
    {
      id: "b-1",
      project_id: project.id,
      soort: "opstart_1",
      omschrijving: "Opstart deel 1 (50% bij akkoord)",
      bedrag: 1000,
      periode: null,
      vervaldatum: "2026-08-15",
      gefactureerd_op: "2026-08-01",
      betaald_op: "2026-08-08",
    },
  ];
  const taken: Taak[] = STANDAARD_TAKEN.map((t, i) => ({
    id: `t-${i}`,
    project_id: project.id,
    titel: t.titel,
    wie: t.wie,
    klaar: i < 3,
    klaar_op: i < 3 ? "2026-10-05" : null,
    volgorde: i,
  }));
  const werkuren: Werkuur[] = [];
  return { klanten: [klant], projecten: [project], offertes: [offerte], betalingen, taken, werkuren };
}
