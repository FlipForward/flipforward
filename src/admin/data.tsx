import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Store } from "./store";
import type { Tabel, Tabellen } from "./types";

type Alles = { [T in Tabel]: Tabellen[T][] };
const LEEG: Alles = { klanten: [], projecten: [], offertes: [], betalingen: [], taken: [], werkuren: [] };
const TABELLEN = Object.keys(LEEG) as Tabel[];

type Ctx = {
  data: Alles;
  laden: boolean;
  fout: string | null;
  store: Store;
  /** Voert een wijziging uit en laadt daarna alles opnieuw (het zijn maar een paar honderd rijen). */
  doe: (actie: (s: Store) => Promise<unknown>) => Promise<void>;
};

const DataCtx = createContext<Ctx | null>(null);

export function DataProvider({ store, children }: { store: Store; children: ReactNode }) {
  const [data, setData] = useState<Alles>(LEEG);
  const [laden, setLaden] = useState(true);
  const [fout, setFout] = useState<string | null>(null);

  const herlaad = useCallback(async () => {
    const rijen = await Promise.all(TABELLEN.map((t) => store.lijst(t)));
    setData(Object.fromEntries(TABELLEN.map((t, i) => [t, rijen[i]])) as Alles);
  }, [store]);

  useEffect(() => {
    herlaad()
      .catch((e: Error) => setFout(e.message))
      .finally(() => setLaden(false));
  }, [herlaad]);

  const doe = useCallback(
    async (actie: (s: Store) => Promise<unknown>) => {
      setFout(null);
      try {
        await actie(store);
      } catch (e) {
        setFout((e as Error).message);
      }
      await herlaad().catch((e: Error) => setFout(e.message));
    },
    [store, herlaad],
  );

  return <DataCtx.Provider value={{ data, laden, fout, store, doe }}>{children}</DataCtx.Provider>;
}

export function useData() {
  const ctx = useContext(DataCtx);
  if (!ctx) throw new Error("useData buiten DataProvider");
  return ctx;
}
