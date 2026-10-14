import { Check, Minus } from "lucide-react";
import { comparison, packages, formatEuro } from "@/lib/site";

/** Vergelijkingstabel van de drie pakketten (data uit site.ts). */
const Cell = ({ v }: { v: string | boolean }) =>
  v === true ? (
    <>
      <Check className="mx-auto h-4 w-4 text-accent" aria-hidden="true" />
      <span className="sr-only">Inbegrepen</span>
    </>
  ) : v === false ? (
    <>
      <Minus className="mx-auto h-4 w-4 text-muted-foreground/50" aria-hidden="true" />
      <span className="sr-only">Niet inbegrepen</span>
    </>
  ) : (
    <span className="text-foreground">{v}</span>
  );

const PackageComparison = () => (
  <div className="mx-auto mt-14 max-w-6xl">
    <h3 className="mb-6 text-center text-2xl font-bold">Vergelijk de pakketten</h3>
    <div className="overflow-x-auto rounded-2xl border border-border bg-background/60">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <caption className="sr-only">Vergelijking van de pakketten Start, Business en Pro</caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="sticky left-0 z-10 w-[34%] bg-[hsl(222_47%_6%)] px-4 py-4 text-left font-medium text-muted-foreground">
              <span className="sr-only">Kenmerk</span>
            </th>
            {packages.map((p) => (
              <th
                key={p.id}
                scope="col"
                className={`px-3 py-4 text-center align-bottom ${p.highlight ? "bg-accent/[0.07]" : ""}`}
              >
                <span className="block text-base font-bold text-foreground">{p.name}</span>
                <span className="mt-1 block text-xs font-normal text-muted-foreground">
                  {p.setupFrom ? "vanaf " : ""}
                  {formatEuro(p.setup)} + {formatEuro(p.monthly)}/maand
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.map((row) => (
            <tr key={row.label} className="border-b border-border/60 last:border-0">
              <th scope="row" className="sticky left-0 z-10 bg-[hsl(222_47%_6%)] px-4 py-3 text-left font-medium text-muted-foreground max-sm:w-36 max-sm:min-w-36">
                {row.label}
              </th>
              {row.values.map((v, i) => (
                <td key={i} className={`px-3 py-3 text-center ${packages[i].highlight ? "bg-accent/[0.07]" : ""}`}>
                  <Cell v={v} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default PackageComparison;
