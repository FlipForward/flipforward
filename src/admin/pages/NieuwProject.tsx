import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useData } from "../data";
import type { Klant, Project } from "../types";
import { STANDAARD_TAKEN, ontbrekendeBetalingen, vandaag } from "../logica";
import { Sectie, Veld } from "../ui";
import { KlantVelden, ProjectVelden, vanForm } from "./ProjectPagina";

const NIEUWE_KLANT: Klant = {
  id: "",
  bedrijf: "",
  ondernemingsnummer: null,
  adres: null,
  contacten: [{ naam: "" }],
  gmail_label: null,
  notities: null,
};

export default function NieuwProject() {
  const { data, store, doe } = useData();
  const navigate = useNavigate();
  const [klantId, setKlantId] = useState("nieuw");
  const [klant, setKlant] = useState<Klant>(NIEUWE_KLANT);
  const [f, setF] = useState<Partial<Record<keyof Project, string>>>({
    naam: "Nieuwe website",
    status: "getekend",
    termijnen: "11",
    looptijd_maanden: "12",
    uren_per_maand: "1",
    akkoord_op: vandaag(),
  });
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState<string | null>(null);

  async function opslaan() {
    if (klantId === "nieuw" && !klant.bedrijf.trim()) return setFout("Vul de bedrijfsnaam in.");
    setBezig(true);
    setFout(null);
    try {
      let kid = klantId;
      if (kid === "nieuw") {
        const { id: _id, ...rest } = klant;
        const [k] = await store.maak("klanten", [{ ...rest, contacten: klant.contacten.filter((c) => c.naam.trim()) }]);
        kid = k.id;
      }
      const [p] = await store.maak("projecten", [{ ...vanForm(f), klant_id: kid }]);
      await store.maak(
        "taken",
        STANDAARD_TAKEN.map((t, i) => ({ project_id: p.id, titel: t.titel, wie: t.wie, klaar: false, volgorde: i })),
      );
      const betalingen = ontbrekendeBetalingen(p, []);
      if (betalingen.length) await store.maak("betalingen", betalingen);
      await doe(async () => {});
      navigate(`/project/${p.id}`);
    } catch (e) {
      setFout((e as Error).message);
      setBezig(false);
    }
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        opslaan();
      }}
    >
      <div className="flex items-center gap-3">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Overzicht
        </Link>
        <h1 className="text-2xl font-semibold">Nieuw project</h1>
      </div>
      <p className="text-sm text-muted-foreground">
        Enkel voor projecten die echt lopen (offerte getekend). De vaste stappen en het betalingsschema worden meteen aangemaakt.
      </p>
      <div className="grid gap-6 xl:grid-cols-2">
        <Sectie titel="Klant">
          <Veld
            label="Klant"
            waarde={klantId}
            onChange={setKlantId}
            opties={[{ waarde: "nieuw", label: "Nieuwe klant" }, ...data.klanten.map((k) => ({ waarde: k.id, label: k.bedrijf }))]}
          />
          {klantId === "nieuw" && (
            <div className="mt-4">
              <KlantVelden k={klant} setK={setKlant} />
            </div>
          )}
        </Sectie>
        <Sectie titel="Project">
          <ProjectVelden f={f} zet={(k, v) => setF({ ...f, [k]: v })} />
        </Sectie>
      </div>
      {fout && (
        <p role="alert" className="text-sm text-destructive">
          {fout}
        </p>
      )}
      <Button type="submit" disabled={bezig}>
        {bezig ? "Bezig…" : "Project aanmaken"}
      </Button>
    </form>
  );
}
