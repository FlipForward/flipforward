import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { store, type Store } from "./store";
import { DataProvider, useData } from "./data";
import Overzicht from "./pages/Overzicht";
import ProjectPagina from "./pages/ProjectPagina";
import NieuwProject from "./pages/NieuwProject";
import { Veld } from "./ui";

export default function AdminApp() {
  if (!store)
    return (
      <Midden>
        <p>De beheeromgeving is niet ingesteld (VITE_SUPABASE_URL en VITE_SUPABASE_ANON_KEY ontbreken).</p>
      </Midden>
    );
  return <MetSessie store={store} />;
}

function MetSessie({ store }: { store: Store }) {
  const [email, setEmail] = useState<string | null | undefined>(undefined);
  useEffect(() => {
    store.sessie().then(setEmail);
    return store.bijSessie(setEmail);
  }, [store]);

  if (email === undefined) return <Midden>Laden…</Midden>;
  if (!email) return <Login store={store} />;
  return (
    <DataProvider store={store}>
      <Schil email={email} store={store} />
    </DataProvider>
  );
}

function Schil({ email, store }: { email: string; store: Store }) {
  const { laden, fout } = useData();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="font-semibold">
            FlipForward <span className="text-muted-foreground">beheer</span>
          </Link>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {store.modus === "lokaal" && (
              <span className="rounded-full border border-amber-500/40 px-2 py-0.5 text-xs text-amber-300">
                lokaal · voorbeelddata
              </span>
            )}
            <span className="hidden sm:inline">{email}</span>
            <Button size="sm" variant="outline" onClick={() => store.logout()}>
              Afmelden
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">
        {fout && (
          <p role="alert" className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm">
            {fout}
          </p>
        )}
        {laden ? (
          <p className="text-muted-foreground">Laden…</p>
        ) : (
          <Routes>
            <Route path="/" element={<Overzicht />} />
            <Route path="/nieuw" element={<NieuwProject />} />
            <Route path="/project/:id" element={<ProjectPagina />} />
            <Route path="*" element={<Overzicht />} />
          </Routes>
        )}
      </main>
    </div>
  );
}

function Login({ store }: { store: Store }) {
  const [email, setEmail] = useState(store.modus === "lokaal" ? "finn@flipforward.be" : "");
  const [status, setStatus] = useState<"idle" | "bezig" | "verstuurd">("idle");
  const [fout, setFout] = useState<string | null>(null);
  return (
    <Midden>
      <form
        className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-card p-6"
        onSubmit={async (e) => {
          e.preventDefault();
          setStatus("bezig");
          setFout(null);
          try {
            await store.login(email.trim());
            setStatus("verstuurd");
          } catch (err) {
            setFout((err as Error).message);
            setStatus("idle");
          }
        }}
      >
        <h1 className="text-xl font-semibold">FlipForward beheer</h1>
        {status === "verstuurd" && store.modus === "supabase" ? (
          <p className="text-sm">Check je mailbox: er staat een aanmeldlink klaar voor {email}.</p>
        ) : (
          <>
            <Veld label="E-mailadres" type="email" waarde={email} onChange={setEmail} />
            {fout && (
              <p role="alert" className="text-sm text-destructive">
                {fout}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={status === "bezig" || !email.trim()}>
              {store.modus === "lokaal" ? "Aanmelden (lokaal)" : "Stuur aanmeldlink"}
            </Button>
          </>
        )}
      </form>
    </Midden>
  );
}

function Midden({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">{children}</div>;
}
