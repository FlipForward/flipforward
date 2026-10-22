import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ProjectStatus } from "./types";
import { STATUS_LABEL } from "./logica";

export function Sectie({ titel, actie, children }: { titel: string; actie?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">{titel}</h2>
        {actie}
      </div>
      {children}
    </section>
  );
}

type VeldProps = {
  label: string;
  waarde: string | number | null | undefined;
  onChange: (v: string) => void;
  type?: "text" | "number" | "date" | "email" | "url" | "tel";
  lang?: boolean;
  opties?: readonly string[] | { waarde: string; label: string }[];
  className?: string;
};

const veldStijl =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function Veld({ label, waarde, onChange, type = "text", lang, opties, className }: VeldProps) {
  const id = useId();
  const v = waarde ?? "";
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      {opties ? (
        <select id={id} className={veldStijl} value={v} onChange={(e) => onChange(e.target.value)}>
          {opties.map((o) =>
            typeof o === "string" ? (
              <option key={o} value={o}>
                {o}
              </option>
            ) : (
              <option key={o.waarde} value={o.waarde}>
                {o.label}
              </option>
            ),
          )}
        </select>
      ) : lang ? (
        <textarea id={id} rows={4} className={veldStijl} value={v} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input
          id={id}
          type={type}
          step={type === "number" ? "any" : undefined}
          className={veldStijl}
          value={v}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

const STATUS_KLEUR: Record<ProjectStatus, string> = {
  getekend: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  in_opbouw: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  klaar_voor_livegang: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  live: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  gestopt: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={cn("inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold", STATUS_KLEUR[status])}>
      {STATUS_LABEL[status]}
    </span>
  );
}

export function Voortgang({ procent, label }: { procent: number; label: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span>{procent}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-label={label}
        aria-valuenow={procent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${procent}%` }} />
      </div>
    </div>
  );
}

/** Lege string → null, getallen als getal. Voor het opslaan van formuliervelden. */
export const leegNull = (v: string) => (v.trim() === "" ? null : v);
export const getalOfNull = (v: string) => (v.trim() === "" ? null : Number(v.replace(",", ".")));
