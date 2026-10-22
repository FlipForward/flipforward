import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useData } from "./data";
import { STATUS_LABEL_FACTUUR, alsVerstuurd, type Factuur, type FactuurStatus } from "./facturen";
import { datum, euro, vandaag } from "./logica";

const KLEUR: Record<FactuurStatus, string> = {
  gepland: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  gefactureerd: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  te_laat: "bg-red-500/15 text-red-300 border-red-500/30",
  betaald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
};

export function FactuurStatusBadge({ status }: { status: FactuurStatus }) {
  return (
    <span className={cn("inline-flex whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-semibold", KLEUR[status])}>
      {STATUS_LABEL_FACTUUR[status]}
    </span>
  );
}

/** Tabel met facturen; per status de volgende stap: verstuurd → betaald. Met `metKlant` ook een kolom met link naar het project. */
export default function FactuurLijst({
  facturen,
  metKlant = false,
  leeg,
}: {
  facturen: Factuur[];
  metKlant?: boolean;
  leeg: string;
}) {
  const { data, doe } = useData();
  if (facturen.length === 0) return <p className="text-sm text-muted-foreground">{leeg}</p>;

  const klantVan = (projectId: string) => {
    const p = data.projecten.find((x) => x.id === projectId);
    return p && data.klanten.find((k) => k.id === p.klant_id);
  };
  const verstuurd = (f: Factuur) => {
    const { nieuw, wijziging } = alsVerstuurd(f);
    return doe((s) => (nieuw ? s.maak("betalingen", [nieuw]) : s.wijzig("betalingen", f.rij!.id, wijziging!)));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] text-sm">
        <thead className="text-left text-xs text-muted-foreground">
          <tr>
            <th className="py-2 pr-3 font-medium">Factuurdatum</th>
            {metKlant && <th className="py-2 pr-3 font-medium">Klant</th>}
            <th className="py-2 pr-3 font-medium">Omschrijving</th>
            <th className="py-2 pr-3 text-right font-medium">Bedrag</th>
            <th className="py-2 pr-3 font-medium">Status</th>
            <th className="py-2 text-right font-medium">Actie</th>
          </tr>
        </thead>
        <tbody>
          {facturen.map((f) => {
            const achterstallig = f.status === "gepland" && !!f.factuurdatum && f.factuurdatum <= vandaag();
            return (
              <tr key={f.sleutel} className="border-t border-border align-middle">
                <td className={cn("py-2 pr-3 tabular-nums", achterstallig && "font-semibold text-amber-300")}>
                  {f.factuurdatum ? datum(f.factuurdatum) : f.soort === "opstart_2" ? "bij livegang" : "–"}
                </td>
                {metKlant && (
                  <td className="py-2 pr-3">
                    <Link className="underline-offset-2 hover:underline" to={`/project/${f.project_id}`}>
                      {klantVan(f.project_id)?.bedrijf ?? "?"}
                    </Link>
                  </td>
                )}
                <td className="py-2 pr-3">
                  {f.omschrijving}
                  {f.rij?.betaald_op && <span className="ml-2 text-xs text-muted-foreground">betaald {datum(f.rij.betaald_op)}</span>}
                  {!f.rij?.betaald_op && f.vervaldatum && f.status !== "gepland" && (
                    <span className="ml-2 text-xs text-muted-foreground">vervalt {datum(f.vervaldatum)}</span>
                  )}
                </td>
                <td className="py-2 pr-3 text-right tabular-nums">{euro(f.bedrag)}</td>
                <td className="py-2 pr-3">
                  <FactuurStatusBadge status={f.status} />
                </td>
                <td className="py-2 text-right">
                  {f.status === "gepland" && (
                    <Button size="sm" variant="outline" onClick={() => verstuurd(f)}>
                      Factuur verstuurd
                    </Button>
                  )}
                  {(f.status === "gefactureerd" || f.status === "te_laat") && (
                    <span className="inline-flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => doe((s) => s.wijzig("betalingen", f.rij!.id, { betaald_op: vandaag() }))}>
                        Betaald
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        title="Factuur toch nog niet verstuurd"
                        aria-label={`Verzending van ${f.omschrijving} ongedaan maken`}
                        onClick={() =>
                          doe((s) =>
                            f.rij!.soort === "termijn" ? s.verwijder("betalingen", f.rij!.id) : s.wijzig("betalingen", f.rij!.id, { gefactureerd_op: null }),
                          )
                        }
                      >
                        ↶
                      </Button>
                    </span>
                  )}
                  {f.status === "betaald" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      title="Betaling ongedaan maken"
                      aria-label={`Betaling van ${f.omschrijving} ongedaan maken`}
                      onClick={() => doe((s) => s.wijzig("betalingen", f.rij!.id, { betaald_op: null }))}
                    >
                      ↶
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
