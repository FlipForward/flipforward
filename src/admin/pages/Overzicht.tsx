import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useData } from "../data";
import { PROJECT_STATUS } from "../types";
import { datum, euro, plusDagen, vandaag, voortgang } from "../logica";
import { facturenVan, volgendeFactuur, type Factuur } from "../facturen";
import FactuurLijst from "../FactuurLijst";
import { Sectie, StatusBadge, Voortgang } from "../ui";

const som = (f: Factuur[]) => f.reduce((s, x) => s + x.bedrag, 0);

export default function Overzicht() {
  const { data } = useData();
  const klantVan = (id: string) => data.klanten.find((k) => k.id === id);

  const projecten = [...data.projecten].sort(
    (a, b) => PROJECT_STATUS.indexOf(a.status) - PROJECT_STATUS.indexOf(b.status),
  );
  const actief = projecten.filter((p) => p.status !== "gestopt");
  const inOnderhoud = actief.filter((p) => p.start_onderhoud && p.maandbedrag);

  const nu = vandaag();
  const binnenkortTot = plusDagen(nu, 45);
  const alle = projecten.flatMap((p) => facturenVan(p, data.betalingen, binnenkortTot));
  const teFactureren = alle.filter((f) => f.status === "gepland" && f.factuurdatum && f.factuurdatum <= plusDagen(nu, 7));
  const binnenkort = alle.filter((f) => f.status === "gepland" && f.factuurdatum && f.factuurdatum > plusDagen(nu, 7));
  const wacht = alle.filter((f) => f.status === "gefactureerd" || f.status === "te_laat");
  const teLaat = wacht.filter((f) => f.status === "te_laat");
  const betaald = alle
    .filter((f) => f.status === "betaald" && f.rij?.betaald_op && f.rij.betaald_op >= plusDagen(nu, -90))
    .sort((a, b) => (b.rij!.betaald_op ?? "").localeCompare(a.rij!.betaald_op ?? ""));

  const cijfers = [
    { label: "Lopende projecten", waarde: String(actief.length) },
    { label: "Onderhoud per maand", waarde: euro(inOnderhoud.reduce((s, p) => s + Number(p.maandbedrag), 0)) },
    { label: "Nu te factureren", waarde: euro(som(teFactureren)) },
    { label: "Wacht op betaling", waarde: euro(som(wacht)) },
  ];

  return (
    <div className="space-y-6">
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cijfers.map((c) => (
          <div key={c.label} className="rounded-xl border border-border bg-card p-4">
            <dt className="text-xs text-muted-foreground">{c.label}</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{c.waarde}</dd>
          </div>
        ))}
      </dl>

      {teLaat.length > 0 && (
        <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm">
          {teLaat.length === 1 ? "1 factuur is" : `${teLaat.length} facturen zijn`} over de vervaldatum: {euro(som(teLaat))}.
        </p>
      )}

      <Sectie titel="Nu te factureren">
        <FactuurLijst facturen={teFactureren} metKlant leeg="Deze week hoeft er geen factuur te vertrekken." />
      </Sectie>

      <Sectie titel="Wacht op betaling">
        <FactuurLijst facturen={wacht} metKlant leeg="Geen openstaande facturen." />
      </Sectie>

      <Sectie
        titel="Projecten"
        actie={
          <Button asChild size="sm">
            <Link to="/nieuw">Nieuw project</Link>
          </Button>
        }
      >
        {projecten.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nog geen projecten. Een project komt hier pas bij zodra de offerte getekend is; leads en demo's blijven in Notion.
          </p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {projecten.map((p) => {
              const taken = data.taken.filter((t) => t.project_id === p.id).sort((a, b) => a.volgorde - b.volgorde);
              const v = voortgang(taken);
              const volgendeStap = taken.find((t) => !t.klaar);
              const offerte = data.offertes.find((o) => o.project_id === p.id);
              const factuur = volgendeFactuur(p, data.betalingen);
              return (
                <li key={p.id}>
                  <Link
                    to={`/project/${p.id}`}
                    className="flex h-full flex-col gap-3 rounded-lg border border-border bg-background/40 p-4 transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{klantVan(p.klant_id)?.bedrijf ?? "?"}</p>
                        <p className="truncate text-sm text-muted-foreground">{p.naam}</p>
                      </div>
                      <StatusBadge status={p.status} />
                    </div>
                    <Voortgang procent={v.procent} label={`${v.klaar}/${v.totaal} stappen`} />
                    <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                      <dt className="text-muted-foreground">Volgende stap</dt>
                      <dd>{volgendeStap ? `${volgendeStap.titel} (${volgendeStap.wie})` : "alles afgevinkt"}</dd>
                      <dt className="text-muted-foreground">Offerte</dt>
                      <dd>{offerte ? `${offerte.nummer} · ${offerte.status}` : "–"}</dd>
                      <dt className="text-muted-foreground">Volgende factuur</dt>
                      <dd>
                        {factuur
                          ? `${factuur.factuurdatum ? datum(factuur.factuurdatum) : "bij livegang"} · ${euro(factuur.bedrag)}`
                          : p.start_onderhoud
                            ? "–"
                            : "onderhoud nog niet gestart"}
                      </dd>
                      <dt className="text-muted-foreground">Onderhoud</dt>
                      <dd>
                        {p.maandbedrag ? `${euro(p.maandbedrag)}/maand, ${p.facturatie}` : "–"}
                        {p.start_onderhoud && ` sinds ${datum(p.start_onderhoud)}`}
                      </dd>
                    </dl>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Sectie>

      <Sectie titel="Binnenkort te factureren (45 dagen)">
        <FactuurLijst facturen={binnenkort} metKlant leeg="Niets gepland in de komende 45 dagen." />
      </Sectie>

      <Sectie titel="Recent betaald (90 dagen)">
        <FactuurLijst facturen={betaald} metKlant leeg="Nog geen betalingen in de voorbije 90 dagen." />
      </Sectie>
    </div>
  );
}
