/** Rijen zoals in supabase/migrations/0001_admin.sql. Datums zijn ISO-strings (jjjj-mm-dd). */

export type Contact = { naam: string; rol?: string; email?: string; telefoon?: string };

export type Klant = {
  id: string;
  bedrijf: string;
  ondernemingsnummer: string | null;
  adres: string | null;
  contacten: Contact[];
  gmail_label: string | null;
  notities: string | null;
};

export const PROJECT_STATUS = ["getekend", "in_opbouw", "klaar_voor_livegang", "live", "gestopt"] as const;
export type ProjectStatus = (typeof PROJECT_STATUS)[number];

export type Project = {
  id: string;
  klant_id: string;
  naam: string;
  status: ProjectStatus;
  facturatie: "maandelijks" | "jaarlijks";
  pakket: string | null;
  opstartprijs: number | null;
  maandbedrag: number | null;
  termijnen: number | null;
  looptijd_maanden: number | null;
  uren_per_maand: number | null;
  akkoord_op: string | null;
  livegang_op: string | null;
  start_onderhoud: string | null;
  domein: string | null;
  dns_status: string | null;
  demo_url: string | null;
  live_url: string | null;
  repo_url: string | null;
  vercel_project: string | null;
  notities: string | null;
};

export const OFFERTE_STATUS = ["opgesteld", "verstuurd", "getekend", "afgewezen", "verlopen"] as const;
export type OfferteStatus = (typeof OFFERTE_STATUS)[number];

export type Offerte = {
  id: string;
  project_id: string;
  nummer: string;
  datum: string | null;
  verstuurd_op: string | null;
  getekend_op: string | null;
  getekend_door: string | null;
  opstart: number | null;
  maandbedrag: number | null;
  totaal_eerste_jaar: number | null;
  status: OfferteStatus;
  pdf_pad: string | null;
  notities: string | null;
};

export type BetalingSoort = "opstart_1" | "opstart_2" | "termijn" | "extra";

export type Betaling = {
  id: string;
  project_id: string;
  soort: BetalingSoort;
  omschrijving: string;
  bedrag: number;
  /** Termijnen: eerste dag van de periode die de factuur dekt (sleutel voor de planning). */
  periode: string | null;
  vervaldatum: string | null;
  gefactureerd_op: string | null;
  betaald_op: string | null;
};

export type Taak = {
  id: string;
  project_id: string;
  titel: string;
  wie: "finn" | "klant";
  klaar: boolean;
  klaar_op: string | null;
  volgorde: number;
};

export type Werkuur = {
  id: string;
  project_id: string;
  datum: string;
  minuten: number;
  omschrijving: string | null;
};

export type Tabellen = {
  klanten: Klant;
  projecten: Project;
  offertes: Offerte;
  betalingen: Betaling;
  taken: Taak;
  werkuren: Werkuur;
};
export type Tabel = keyof Tabellen;
