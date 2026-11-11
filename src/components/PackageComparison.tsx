import { Check, Minus } from "lucide-react";
import { comparison, packages, formatEuro, yearlyPrice } from "@/lib/site";

/** Vergelijkingstabel van de drie pakketten (data uit site.ts). */
const Cell = ({ v }: { v: string | boolean }) =>
  v === true ? (
    <>
      <Check className="mx-auto h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
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
  <div className="mt-12 hidden md:block">
    <h3 className="mb-5 text-2xl tracking-[-0.02em]">Vergelijk de pakketten</h3>
    <div className="overflow-x-auto rounded-3xl bg-card">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <caption className="sr-only">Vergelijking van de pakketten Start, Business en Pro</caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="sticky left-0 z-10 w-[34%] bg-card px-4 py-4 text-left font-medium text-muted-foreground">
              <span className="sr-only">Kenmerk</span>
            </th>
            {packages.map((p) => (
              <th
                key={p.id}
                scope="col"
                className={`px-3 py-4 text-center align-bottom ${p.highlight ? "bg-muted" : ""}`}
              >
                <span className="block text-lg font-normal text-foreground">{p.name}</span>
                <span className="mt-1 block text-xs font-normal text-muted-foreground">
                  {p.setupFrom ? "vanaf " : ""}
                  {formatEuro(p.setup)} + {formatEuro(p.monthly)}/maand
                </span>
                <span className="mt-0.5 block text-xs font-normal text-muted-foreground">of {formatEuro(yearlyPrice(p))}/jaar, 1 maand gratis</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.map((row) => (
            <tr key={row.label} className="border-b border-border/60 last:border-0">
              <th scope="row" className="sticky left-0 z-10 bg-card px-4 py-3 text-left font-medium text-muted-foreground max-sm:w-36 max-sm:min-w-36">
                {row.label}
              </th>
              {row.values.map((v, i) => (
                <td key={i} className={`px-3 py-3 text-center ${packages[i].highlight ? "bg-muted" : ""}`}>
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
