import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Tabel, Tabellen } from "./types";
import { voorbeeldData } from "./voorbeeld";

/**
 * Eén kleine opslaglaag met twee uitvoeringen:
 *  - Supabase (productie en dev met VITE_SUPABASE_URL): RLS laat enkel finn@flipforward.be toe.
 *  - Lokaal (enkel `npm run dev` zonder Supabase-variabelen): localStorage met fictieve voorbeelddata.
 */
export type Store = {
  modus: "supabase" | "lokaal";
  sessie(): Promise<string | null>;
  login(email: string): Promise<void>;
  logout(): Promise<void>;
  bijSessie(cb: (email: string | null) => void): () => void;
  lijst<T extends Tabel>(tabel: T): Promise<Tabellen[T][]>;
  maak<T extends Tabel>(tabel: T, rijen: Partial<Tabellen[T]>[]): Promise<Tabellen[T][]>;
  wijzig<T extends Tabel>(tabel: T, id: string, wijziging: Partial<Tabellen[T]>): Promise<void>;
  verwijder(tabel: Tabel, id: string): Promise<void>;
};

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

function supabaseStore(client: SupabaseClient): Store {
  const check = <D>({ data, error }: { data: D; error: { message: string } | null }) => {
    if (error) throw new Error(error.message);
    return data;
  };
  return {
    modus: "supabase",
    async sessie() {
      const { data } = await client.auth.getSession();
      return data.session?.user.email ?? null;
    },
    async login(email) {
      const { error } = await client.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false, emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (error) throw new Error(error.message);
    },
    async logout() {
      await client.auth.signOut();
    },
    bijSessie(cb) {
      const { data } = client.auth.onAuthStateChange((_e, s) => cb(s?.user.email ?? null));
      return () => data.subscription.unsubscribe();
    },
    async lijst(tabel) {
      return check(await client.from(tabel).select("*").order("created_at"));
    },
    async maak(tabel, rijen) {
      return check(await client.from(tabel).insert(rijen as never).select());
    },
    async wijzig(tabel, id, wijziging) {
      check(await client.from(tabel).update(wijziging as never).eq("id", id));
    },
    async verwijder(tabel, id) {
      check(await client.from(tabel).delete().eq("id", id));
    },
  };
}

function lokaleStore(): Store {
  const KEY = "ff-admin-lokaal";
  type Db = { [T in Tabel]: Tabellen[T][] };
  const lees = (): Db => {
    try {
      const ruw = localStorage.getItem(KEY);
      if (ruw) return JSON.parse(ruw);
    } catch {
      /* lege of geblokkeerde opslag → voorbeelddata */
    }
    return voorbeeldData();
  };
  let db = lees();
  const bewaar = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(db));
    } catch {
      /* enkel in het geheugen */
    }
  };
  const SESSIE = "ff-admin-lokaal-sessie";
  let email: string | null = null;
  try {
    email = sessionStorage.getItem(SESSIE);
  } catch {
    /* geen opslag → opnieuw aanmelden */
  }
  const luisteraars = new Set<(e: string | null) => void>();
  const meld = () => {
    try {
      if (email) sessionStorage.setItem(SESSIE, email);
      else sessionStorage.removeItem(SESSIE);
    } catch {
      /* enkel in het geheugen */
    }
    luisteraars.forEach((cb) => cb(email));
  };
  return {
    modus: "lokaal",
    async sessie() {
      return email;
    },
    async login(e) {
      email = e;
      meld();
    },
    async logout() {
      email = null;
      meld();
    },
    bijSessie(cb) {
      luisteraars.add(cb);
      return () => luisteraars.delete(cb);
    },
    async lijst(tabel) {
      return structuredClone(db[tabel]);
    },
    async maak(tabel, rijen) {
      const nieuw = rijen.map((r) => ({ ...r, id: crypto.randomUUID() }) as Tabellen[typeof tabel]);
      (db[tabel] as unknown[]).push(...nieuw);
      bewaar();
      return nieuw;
    },
    async wijzig(tabel, id, wijziging) {
      const rij = (db[tabel] as { id: string }[]).find((r) => r.id === id);
      if (rij) Object.assign(rij, wijziging);
      bewaar();
    },
    async verwijder(tabel, id) {
      db = { ...db, [tabel]: (db[tabel] as { id: string }[]).filter((r) => r.id !== id) };
      // zoals "on delete cascade" in de databank
      if (tabel === "projecten")
        for (const t of ["offertes", "betalingen", "taken", "werkuren"] as const)
          db = { ...db, [t]: (db[t] as { project_id: string }[]).filter((r) => r.project_id !== id) };
      bewaar();
    },
  };
}

export const store: Store | null =
  url && anonKey
    ? supabaseStore(createClient(url, anonKey))
    : import.meta.env.DEV
      ? lokaleStore()
      : null;
