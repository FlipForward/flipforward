import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useData } from "../data";
import { OFFERTE_STATUS, PROJECT_STATUS, type Klant, type Offerte, type Project } from "../types";
import {
  STATUS_LABEL,
  datum,
  euro,
  isTeLaat,
  minutenInMaand,
  ontbrekendeBetalingen,
  openstaand,
  plusDagen,
  vandaag,
  voortgang,
} from "../logica";
import { Sectie, StatusBadge, Veld, Voortgang, getalOfNull, leegNull } from "../ui";

export default function ProjectPagina() {
  const { id } = useParams();
  const { data } = useData();
  const project = data.projecten.find((p) => p.id === id);
  const klant = project && data.klanten.find((k) => k.id === project.klant_id);

  if (!project || !klant)
    return (
      <p>
        Project niet gevonden. <Link to="/" className="underline">Terug naar het overzicht</Link>
      </p>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Overzicht
        </Link>
        <h1 className="text-2xl font-semibold">
          {klant.bedrijf} <span className="text-muted-foreground">· {project.naam}</span>
        </h1>
        <StatusBadge status={project.status} />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Stappen project={project} />
        <Betalingen project={project} />
        <Offertes project={project} />
        <Werkuren project={project} />
        <ProjectGegevens key={`p-${project.id}`} project={project} />
        <KlantGegevens key={`k-${klant.id}`} klant={klant} />
      </div>
      <Verwijderen project={project} />
    </div>
  );
}

function Stappen({ project }: { project: Project }) {
  const { data, doe } = useData();
  const [nieuw, setNieuw] = useState("");
  const taken = data.taken.filter((t) => t.project_id === project.id).sort((a, b) => a.volgorde - b.volgorde);
  const v = voortgang(taken);
  return (
    <Sectie titel="Voortgang">
      <Voortgang procent={v.procent} label={`${v.klaar} van ${v.totaal} stappen klaar`} />
      <ul className="mt-4 space-y-1">
        {taken.map((t) => (
          <li key={t.id} className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-muted/40">
            <input
              id={`taak-${t.id}`}
              type="checkbox"
              className="size-4 accent-[hsl(var(--primary))]"
              checked={t.klaar}
              onChange={(e) =>
                doe((s) => s.wijzig("taken", t.id, { klaar: e.target.checked, klaar_op: e.target.checked ? vandaag() : null }))
              }
            />
            <label htmlFor={`taak-${t.id}`} className={t.klaar ? "flex-1 text-muted-foreground line-through" : "flex-1"}>
              {t.titel}
            </label>
            <span className="text-xs text-muted-foreground">
              {t.wie}
              {t.klaar_op && ` · ${datum(t.klaar_op)}`}
            </span>
            <button
              type="button"
              aria-label={`Stap "${t.titel}" verwijderen`}
              className="text-muted-foreground hover:text-destructive"
              onClick={() => doe((s) => s.verwijder("taken", t.id))}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!nieuw.trim()) return;
          const volgorde = Math.max(-1, ...taken.map((t) => t.volgorde)) + 1;
          doe((s) => s.maak("taken", [{ project_id: project.id, titel: nieuw.trim(), wie: "finn", klaar: false, volgorde }]));
          setNieuw("");
        }}
      >
        <Veld className="flex-1" label="Stap toevoegen" waarde={nieuw} onChange={setNieuw} />
        <Button type="submit" size="sm" variant="outline" className="self-end">
          Toevoegen
        </Button>
      </form>
    </Sectie>
  );
}

function Betalingen({ project }: { project: Project }) {
  const { data, doe } = useData();
  const betalingen = data.betalingen
    .filter((b) => b.project_id === project.id)
    .sort((a, b) => (a.vervaldatum ?? "9999").localeCompare(b.vervaldatum ?? "9999"));
  const ontbrekend = ontbrekendeBetalingen(project, betalingen);
  const betaald = betalingen.filter((b) => b.betaald_op).reduce((s, b) => s + Number(b.bedrag), 0);
  return (
    <Sectie
      titel="Betalingen"
      actie={
        ontbrekend.length > 0 && (
          <Button size="sm" variant="outline" onClick={() => doe((s) => s.maak("betalingen", ontbrekend))}>
            Schema aanvullen ({ontbrekend.length})
          </Button>
        )
      }
    >
      <p className="mb-3 text-sm text-muted-foreground">
        Betaald {euro(betaald)} · openstaand {euro(openstaand(betalingen))}
        {!project.start_onderhoud && project.termijnen ? " · termijnen volgen zodra de start van het onderhoud ingevuld is" : ""}
      </p>
      {betalingen.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nog geen betalingen. Vul opstartprijs en akkoorddatum in en klik op "Schema aanvullen".</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead className="text-left text-xs text-muted-foreground">
              <tr>
                <th className="py-2 pr-3 font-medium">Omschrijving</th>
                <th className="py-2 pr-3 font-medium">Vervalt</th>
                <th className="py-2 pr-3 text-right font-medium">Bedrag</th>
                <th className="py-2 pr-3 font-medium">Gefactureerd</th>
                <th className="py-2 font-medium">Betaald</th>
              </tr>
            </thead>
            <tbody>
              {betalingen.map((b) => (
                <tr key={b.id} className="border-t border-border">
                  <td className="py-2 pr-3">{b.omschrijving}</td>
                  <td className={isTeLaat(b) ? "py-2 pr-3 font-semibold text-destructive" : "py-2 pr-3"}>{datum(b.vervaldatum)}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{euro(b.bedrag)}</td>
                  <td className="py-2 pr-3">
                    <DatumKnop
                      waarde={b.gefactureerd_op}
                      label="Gefactureerd"
                      zet={(d) => doe((s) => s.wijzig("betalingen", b.id, { gefactureerd_op: d }))}
                    />
                  </td>
                  <td className="py-2">
                    <DatumKnop
                      waarde={b.betaald_op}
                      label="Betaald"
                      zet={(d) => doe((s) => s.wijzig("betalingen", b.id, { betaald_op: d }))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ExtraBetaling project={project} />
    </Sectie>
  );
}

/** Datum tonen met een knop om ze te wissen, of een knop "vandaag" als ze nog leeg is. */
function DatumKnop({ waarde, label, zet }: { waarde: string | null; label: string; zet: (d: string | null) => void }) {
  return waarde ? (
    <span className="inline-flex items-center gap-1">
      {datum(waarde)}
      <button type="button" aria-label={`${label} wissen`} className="text-muted-foreground hover:text-destructive" onClick={() => zet(null)}>
        ×
      </button>
    </span>
  ) : (
    <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => zet(vandaag())}>
      vandaag
    </Button>
  );
}

function ExtraBetaling({ project }: { project: Project }) {
  const { doe } = useData();
  const [omschrijving, setOmschrijving] = useState("");
  const [bedrag, setBedrag] = useState("");
  return (
    <form
      className="mt-4 grid grid-cols-[1fr_7rem_auto] items-end gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        const n = getalOfNull(bedrag);
        if (!omschrijving.trim() || n == null) return;
        doe((s) =>
          s.maak("betalingen", [
            { project_id: project.id, soort: "extra", omschrijving: omschrijving.trim(), bedrag: n, vervaldatum: null },
          ]),
        );
        setOmschrijving("");
        setBedrag("");
      }}
    >
      <Veld label="Extra (fotoshoot, uren …)" waarde={omschrijving} onChange={setOmschrijving} />
      <Veld label="Bedrag" type="number" waarde={bedrag} onChange={setBedrag} />
      <Button type="submit" size="sm" variant="outline">
        Toevoegen
      </Button>
    </form>
  );
}

const LEGE_OFFERTE = { nummer: "", datum: "", status: "opgesteld", opstart: "", maandbedrag: "", pdf_pad: "" };

function Offertes({ project }: { project: Project }) {
  const { data, doe } = useData();
  const [open, setOpen] = useState(false);
  const [f, setF] = useState(LEGE_OFFERTE);
  const offertes = data.offertes.filter((o) => o.project_id === project.id);
  const zet = (o: Offerte, w: Partial<Offerte>) => doe((s) => s.wijzig("offertes", o.id, w));
  return (
    <Sectie
      titel="Offertes"
      actie={
        <Button size="sm" variant="outline" onClick={() => setOpen((o) => !o)}>
          {open ? "Annuleren" : "Offerte toevoegen"}
        </Button>
      }
    >
      {offertes.length === 0 && !open && <p className="text-sm text-muted-foreground">Nog geen offerte gekoppeld.</p>}
      <ul className="space-y-4">
        {offertes.map((o) => (
          <li key={o.id} className="rounded-lg border border-border p-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold">{o.nummer}</p>
              <select
                aria-label={`Status ${o.nummer}`}
                className="rounded-md border border-input bg-background px-2 py-1 text-xs"
                value={o.status}
                onChange={(e) => zet(o, { status: e.target.value as Offerte["status"] })}
              >
                {OFFERTE_STATUS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <p className="mt-1 text-muted-foreground">
              Opstart {euro(o.opstart)} · {euro(o.maandbedrag)}/maand
              {o.totaal_eerste_jaar != null && ` · eerste jaar ${euro(o.totaal_eerste_jaar)}`}
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <Veld label="Datum" type="date" waarde={o.datum} onChange={(v) => zet(o, { datum: leegNull(v) })} />
              <Veld label="Verstuurd op" type="date" waarde={o.verstuurd_op} onChange={(v) => zet(o, { verstuurd_op: leegNull(v) })} />
              <Veld label="Getekend op" type="date" waarde={o.getekend_op} onChange={(v) => zet(o, { getekend_op: leegNull(v) })} />
            </div>
            <BlurVeld label="Getekend door" waarde={o.getekend_door} bewaar={(v) => zet(o, { getekend_door: leegNull(v) })} />
            <BlurVeld label="PDF (pad in bucket of lokale map)" waarde={o.pdf_pad} bewaar={(v) => zet(o, { pdf_pad: leegNull(v) })} />
          </li>
        ))}
      </ul>
      {open && (
        <form
          className="mt-4 grid gap-2 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!f.nummer.trim()) return;
            const opstart = getalOfNull(f.opstart);
            const maand = getalOfNull(f.maandbedrag);
            doe((s) =>
              s.maak("offertes", [
                {
                  project_id: project.id,
                  nummer: f.nummer.trim(),
                  datum: leegNull(f.datum),
                  status: f.status as Offerte["status"],
                  opstart,
                  maandbedrag: maand,
                  totaal_eerste_jaar:
                    opstart != null && maand != null ? opstart + maand * (project.termijnen ?? 12) : null,
                  pdf_pad: leegNull(f.pdf_pad),
                },
              ]),
            );
            setF(LEGE_OFFERTE);
            setOpen(false);
          }}
        >
          <Veld label="Nummer (FF-jjjj-nnn)" waarde={f.nummer} onChange={(v) => setF({ ...f, nummer: v })} />
          <Veld label="Datum" type="date" waarde={f.datum} onChange={(v) => setF({ ...f, datum: v })} />
          <Veld label="Opstart" type="number" waarde={f.opstart} onChange={(v) => setF({ ...f, opstart: v })} />
          <Veld label="Maandbedrag" type="number" waarde={f.maandbedrag} onChange={(v) => setF({ ...f, maandbedrag: v })} />
          <Veld label="Status" opties={OFFERTE_STATUS} waarde={f.status} onChange={(v) => setF({ ...f, status: v })} />
          <Veld label="PDF-locatie" waarde={f.pdf_pad} onChange={(v) => setF({ ...f, pdf_pad: v })} />
          <Button type="submit" size="sm" className="sm:col-span-2 sm:justify-self-start">
            Offerte opslaan
          </Button>
        </form>
      )}
    </Sectie>
  );
}

/** Tekstveld dat pas bij het verlaten opslaat (geen schrijfactie per toets). */
function BlurVeld({ label, waarde, bewaar }: { label: string; waarde: string | null; bewaar: (v: string) => void }) {
  const [v, setV] = useState(waarde ?? "");
  return (
    <div className="mt-2" onBlur={() => v !== (waarde ?? "") && bewaar(v)}>
      <Veld label={label} waarde={v} onChange={setV} />
    </div>
  );
}

function Werkuren({ project }: { project: Project }) {
  const { data, doe } = useData();
  const [f, setF] = useState({ datum: vandaag(), minuten: "", omschrijving: "" });
  const uren = data.werkuren.filter((u) => u.project_id === project.id).sort((a, b) => b.datum.localeCompare(a.datum));
  const dezeMaand = minutenInMaand(uren);
  const inbegrepen = (project.uren_per_maand ?? 0) * 60;
  return (
    <Sectie titel="Werkuren onderhoud">
      <p className="mb-3 text-sm">
        Deze maand {(dezeMaand / 60).toLocaleString("nl-BE", { maximumFractionDigits: 2 })} u
        {inbegrepen > 0 && (
          <span className={dezeMaand > inbegrepen ? "font-semibold text-destructive" : "text-muted-foreground"}>
            {" "}
            van {project.uren_per_maand} u inbegrepen
            {dezeMaand > inbegrepen && " → extra werk aan € 75/u na akkoord"}
          </span>
        )}
      </p>
      <form
        className="grid grid-cols-2 items-end gap-2 sm:grid-cols-[9rem_6rem_1fr_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          const min = Number(f.minuten);
          if (!min || min <= 0) return;
          doe((s) =>
            s.maak("werkuren", [
              { project_id: project.id, datum: f.datum, minuten: min, omschrijving: leegNull(f.omschrijving) },
            ]),
          );
          setF({ ...f, minuten: "", omschrijving: "" });
        }}
      >
        <Veld label="Datum" type="date" waarde={f.datum} onChange={(v) => setF({ ...f, datum: v })} />
        <Veld label="Minuten" type="number" waarde={f.minuten} onChange={(v) => setF({ ...f, minuten: v })} />
        <Veld className="col-span-2 sm:col-span-1" label="Wat" waarde={f.omschrijving} onChange={(v) => setF({ ...f, omschrijving: v })} />
        <Button type="submit" size="sm" variant="outline">
          Loggen
        </Button>
      </form>
      {uren.length > 0 && (
        <ul className="mt-4 space-y-1 text-sm">
          {uren.slice(0, 10).map((u) => (
            <li key={u.id} className="flex gap-3">
              <span className="w-24 shrink-0 text-muted-foreground">{datum(u.datum)}</span>
              <span className="w-16 shrink-0 tabular-nums">{u.minuten} min</span>
              <span className="flex-1">{u.omschrijving}</span>
              <button
                type="button"
                aria-label="Werkuur verwijderen"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => doe((s) => s.verwijder("werkuren", u.id))}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </Sectie>
  );
}

type ProjectForm = { [K in keyof Project]: string };

function naarForm(p: Project): ProjectForm {
  return Object.fromEntries(Object.entries(p).map(([k, v]) => [k, v == null ? "" : String(v)])) as ProjectForm;
}

const GETALLEN: (keyof Project)[] = ["opstartprijs", "maandbedrag", "termijnen", "looptijd_maanden", "uren_per_maand"];

export function vanForm(f: Partial<ProjectForm>): Partial<Project> {
  const uit: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(f)) {
    if (k === "id") continue;
    uit[k] = GETALLEN.includes(k as keyof Project) ? getalOfNull(v ?? "") : leegNull(v ?? "");
  }
  return uit as Partial<Project>;
}

export function ProjectVelden({ f, zet }: { f: Partial<ProjectForm>; zet: (k: keyof Project, v: string) => void }) {
  const veld = (k: keyof Project, label: string, extra?: Partial<Parameters<typeof Veld>[0]>) => (
    <Veld key={k} label={label} waarde={f[k]} onChange={(v) => zet(k, v)} {...extra} />
  );
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {veld("naam", "Projectnaam")}
      {veld("status", "Status", { opties: PROJECT_STATUS.map((s) => ({ waarde: s, label: STATUS_LABEL[s] })) })}
      {veld("pakket", "Pakket", { className: "sm:col-span-2" })}
      {veld("opstartprijs", "Opstartprijs (€)", { type: "number" })}
      {veld("maandbedrag", "Maandbedrag (€)", { type: "number" })}
      {veld("termijnen", "Gefactureerde termijnen jaar 1", { type: "number" })}
      {veld("looptijd_maanden", "Minimale looptijd (maanden)", { type: "number" })}
      {veld("uren_per_maand", "Uren inbegrepen per maand", { type: "number" })}
      {veld("akkoord_op", "Akkoord op", { type: "date" })}
      {veld("livegang_op", "Livegang", { type: "date" })}
      {veld("start_onderhoud", "Start onderhoud", { type: "date" })}
      {veld("domein", "Domein")}
      {veld("dns_status", "DNS-status")}
      {veld("demo_url", "Demo-URL", { type: "url" })}
      {veld("live_url", "Live-URL", { type: "url" })}
      {veld("repo_url", "GitHub-repo", { type: "url" })}
      {veld("vercel_project", "Vercel-project")}
      {veld("notities", "Notities", { lang: true, className: "sm:col-span-2" })}
    </div>
  );
}

function ProjectGegevens({ project }: { project: Project }) {
  const { data, doe } = useData();
  const [f, setF] = useState(() => naarForm(project));
  const gewijzigd = JSON.stringify(f) !== JSON.stringify(naarForm(project));
  return (
    <Sectie titel="Projectgegevens">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const nieuw = vanForm(f);
          // Livegang pas later gekend → vervaldatum van de tweede helft opstart meteen invullen.
          const deel2 = data.betalingen.find((b) => b.project_id === project.id && b.soort === "opstart_2" && !b.vervaldatum);
          doe(async (s) => {
            await s.wijzig("projecten", project.id, nieuw);
            if (deel2 && nieuw.livegang_op) await s.wijzig("betalingen", deel2.id, { vervaldatum: plusDagen(nieuw.livegang_op, 14) });
          });
        }}
      >
        <ProjectVelden f={f} zet={(k, v) => setF({ ...f, [k]: v })} />
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Button type="submit" size="sm" disabled={!gewijzigd}>
            Opslaan
          </Button>
          {project.demo_url && <a className="self-center underline" href={project.demo_url} target="_blank" rel="noreferrer">Demo</a>}
          {project.live_url && <a className="self-center underline" href={project.live_url} target="_blank" rel="noreferrer">Live</a>}
          {project.repo_url && <a className="self-center underline" href={project.repo_url} target="_blank" rel="noreferrer">Repo</a>}
        </div>
      </form>
    </Sectie>
  );
}

function KlantGegevens({ klant }: { klant: Klant }) {
  const { doe } = useData();
  const [k, setK] = useState(klant);
  const gewijzigd = JSON.stringify(k) !== JSON.stringify(klant);
  return (
    <Sectie titel="Klant">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const { id: _id, ...rest } = k;
          doe((s) => s.wijzig("klanten", klant.id, { ...rest, contacten: k.contacten.filter((c) => c.naam.trim()) }));
        }}
      >
        <KlantVelden k={k} setK={setK} />
        <Button type="submit" size="sm" className="mt-4" disabled={!gewijzigd}>
          Opslaan
        </Button>
      </form>
    </Sectie>
  );
}

export function KlantVelden({ k, setK }: { k: Omit<Klant, "id">; setK: (k: Klant) => void }) {
  const zet = (veld: keyof Klant, v: string) => setK({ ...k, [veld]: leegNull(v) ?? (veld === "bedrijf" ? "" : null) } as Klant);
  const zetContact = (i: number, veld: string, v: string) =>
    setK({ ...k, contacten: k.contacten.map((c, j) => (j === i ? { ...c, [veld]: v } : c)) } as Klant);
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Veld label="Bedrijf" waarde={k.bedrijf} onChange={(v) => zet("bedrijf", v)} />
        <Veld label="Ondernemingsnummer" waarde={k.ondernemingsnummer} onChange={(v) => zet("ondernemingsnummer", v)} />
        <Veld label="Adres" waarde={k.adres} onChange={(v) => zet("adres", v)} />
        <Veld label="Gmail-label" waarde={k.gmail_label} onChange={(v) => zet("gmail_label", v)} />
      </div>
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-muted-foreground">Contactpersonen</legend>
        {k.contacten.map((c, i) => (
          <div key={i} className="grid grid-cols-2 gap-2 rounded-md border border-border p-2 sm:grid-cols-4">
            <Veld label="Naam" waarde={c.naam} onChange={(v) => zetContact(i, "naam", v)} />
            <Veld label="Rol" waarde={c.rol} onChange={(v) => zetContact(i, "rol", v)} />
            <Veld label="E-mail" type="email" waarde={c.email} onChange={(v) => zetContact(i, "email", v)} />
            <Veld label="Telefoon" type="tel" waarde={c.telefoon} onChange={(v) => zetContact(i, "telefoon", v)} />
          </div>
        ))}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => setK({ ...k, contacten: [...k.contacten, { naam: "" }] } as Klant)}
        >
          + Contactpersoon
        </Button>
      </fieldset>
      <Veld label="Notities" lang waarde={k.notities} onChange={(v) => zet("notities", v)} />
    </div>
  );
}

function Verwijderen({ project }: { project: Project }) {
  const { doe } = useData();
  const navigate = useNavigate();
  return (
    <div className="flex justify-end">
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-destructive"
        onClick={async () => {
          if (!window.confirm(`Project "${project.naam}" met alle stappen, offertes, betalingen en uren verwijderen?`)) return;
          await doe((s) => s.verwijder("projecten", project.id));
          navigate("/");
        }}
      >
        Project verwijderen
      </Button>
    </div>
  );
}
