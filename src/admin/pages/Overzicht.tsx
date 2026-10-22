import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useData } from "../data";
import { PROJECT_STATUS } from "../types";
import { datum, euro, isTeLaat, openstaand, vandaag, voortgang } from "../logica";
import { Sectie, StatusBadge, Voortgang } from "../ui";

export default function Overzicht() {
  const { data, doe } = useData();
  const klantVan = (id: string) => data.klanten.find((k) => k.id === id);
  const projectVan = (id: string) => data.projecten.find((p) => p.id === id);

  const projecten = [...data.projecten].sort(
    (a, b) => PROJECT_STATUS.indexOf(a.status) - PROJECT_STATUS.indexOf(b.status),
  );
  const actief = projecten.filter((p) => p.status !== "gestopt");
  const live = projecten.filter((p) => p.status === "live");
  const maandelijks = live.reduce((som, p) => som + Number(p.maandbedrag ?? 0), 0);
  const open = data.betalingen
    .filter((b) => !b.betaald_op)
    .sort((a, b) => (a.vervaldatum ?? "9999").localeCompare(b.vervaldatum ?? "9999"));
  const teLaat = open.filter(isTeLaat);

  const cijfers = [
    { label: "Lopende projecten", waarde: String(actief.length) },
    { label: "Live", waarde: String(live.length) },
    { label: "Onderhoud per maand (live)", waarde: euro(maandelijks) },
    { label: "Nog te ontvangen", waarde: euro(openstaand(data.betalingen)) },
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
          {teLaat.length === 1 ? "1 betaling is" : `${teLaat.length} betalingen zijn`} over de vervaldatum.
        </p>
      )}

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
              const volgende = taken.find((t) => !t.klaar);
              const betalingen = data.betalingen.filter((b) => b.project_id === p.id);
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
                    <p className="text-sm">
                      <span className="text-muted-foreground">Volgende: </span>
                      {volgende ? `${volgende.titel} (${volgende.wie})` : "alles afgevinkt"}
                    </p>
                    <p className="mt-auto text-sm text-muted-foreground">
                      Openstaand {euro(openstaand(betalingen))}
                      {p.livegang_op && ` · live ${datum(p.livegang_op)}`}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Sectie>

      <Sectie titel="Openstaande betalingen">
        {open.length === 0 ? (
          <p className="text-sm text-muted-foreground">Niets openstaand.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="text-left text-xs text-muted-foreground">
                <tr>
                  <th className="py-2 pr-3 font-medium">Vervalt</th>
                  <th className="py-2 pr-3 font-medium">Klant</th>
                  <th className="py-2 pr-3 font-medium">Omschrijving</th>
                  <th className="py-2 pr-3 text-right font-medium">Bedrag</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody>
                {open.slice(0, 15).map((b) => {
                  const p = projectVan(b.project_id);
                  return (
                    <tr key={b.id} className="border-t border-border">
                      <td className={isTeLaat(b) ? "py-2 pr-3 font-semibold text-destructive" : "py-2 pr-3"}>
                        {datum(b.vervaldatum)}
                      </td>
                      <td className="py-2 pr-3">
                        {p ? <Link className="underline-offset-2 hover:underline" to={`/project/${p.id}`}>{klantVan(p.klant_id)?.bedrijf}</Link> : "?"}
                      </td>
                      <td className="py-2 pr-3">
                        {b.omschrijving}
                        {!b.gefactureerd_op && <span className="ml-2 text-xs text-muted-foreground">(nog niet gefactureerd)</span>}
                      </td>
                      <td className="py-2 pr-3 text-right tabular-nums">{euro(b.bedrag)}</td>
                      <td className="py-2 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => doe((s) => s.wijzig("betalingen", b.id, { betaald_op: vandaag() }))}
                        >
                          Betaald
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Sectie>
    </div>
  );
}
