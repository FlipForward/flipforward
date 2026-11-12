import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "./motion/Magnetic";
import Reveal from "./motion/Reveal";
import { business, packages, type PackageId } from "@/lib/site";
import { PACKAGE_EVENT } from "@/lib/selectPackage";

type PackageChoice = PackageId | "onbekend" | "";

const isPackage = (v: string | null): v is PackageId => packages.some((p) => p.id === v);

const emptyForm = { name: "", company: "", email: "", phone: "", pakket: "" as PackageChoice, message: "" };

const fieldClass = "h-12 rounded-xl border-white/20 bg-transparent text-base text-[hsl(var(--ink-foreground))] placeholder:text-[hsl(var(--ink-muted))] focus-visible:ring-[hsl(var(--ink-foreground))] focus-visible:ring-offset-0";
const selectClass =
  "flex h-12 w-full rounded-xl border border-white/20 bg-[hsl(var(--ink))] px-3 text-base text-[hsl(var(--ink-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ink-foreground))]";

const Contact = () => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [honeypot, setHoneypot] = useState("");

  // Pakket overnemen uit ?pakket=… en uit klikken op de pakketknoppen.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("pakket");
    if (isPackage(fromUrl)) setForm((f) => ({ ...f, pakket: fromUrl }));

    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (isPackage(id)) setForm((f) => ({ ...f, pakket: id }));
    };
    window.addEventListener(PACKAGE_EVENT, onSelect);
    return () => window.removeEventListener(PACKAGE_EVENT, onSelect);
  }, []);

  const update = (key: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Verstuurd als e-mail via de Vercel-functie api/contact.ts; er wordt niets opgeslagen.
    let errorMessage = "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot }),
      });
      if (!res.ok) errorMessage = (await res.json().catch(() => null))?.error ?? "Verzenden is mislukt.";
    } catch {
      errorMessage = "Geen verbinding.";
    }

    if (errorMessage) {
      setStatus({ ok: false, text: `Verzenden mislukt. ${errorMessage} Je kunt ook rechtstreeks mailen naar ${business.email}.` });
    } else {
      setStatus({ ok: true, text: "Bedankt, je bericht is verzonden. Je krijgt binnen 2 werkdagen antwoord." });
      setForm(emptyForm);
    }
    setLoading(false);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="on-ink py-16 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 id="contact-title" className="display max-w-[11ch]">
            Vertel over je zaak
          </h2>
          <p className="soft mt-6 max-w-[30rem] text-lg leading-relaxed sm:text-xl">
            Je krijgt binnen 2 werkdagen antwoord, en als je wil eerst een gratis voorbeeld van je nieuwe site.
          </p>
          <div className="mt-8 sm:mt-10">
            <Magnetic>
              <a href={`mailto:${business.email}`} className="ff-btn ff-btn-line">
                {business.email}
                <ArrowUpRight strokeWidth={1.5} className="h-4 w-4" aria-hidden="true" />
              </a>
            </Magnetic>
          </div>
          <p className="soft mt-8 max-w-[30rem] text-[15px]">
            Gevestigd in {business.city}, actief in de Kempen, de provincie Antwerpen en verder.
          </p>
        </Reveal>

        <Reveal>
          <form onSubmit={handleSubmit} className="relative space-y-5">
              {/* Spamval: onzichtbaar voor bezoekers, bots vullen het in. */}
              <div aria-hidden="true" {...{ inert: "" }} className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm">
                    Naam <span aria-hidden="true">*</span>
                  </label>
                  <Input id="name" name="name" autoComplete="name" required value={form.name} onChange={update("name")} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="company" className="mb-2 block text-sm">
                    Bedrijf
                  </label>
                  <Input id="company" name="company" autoComplete="organization" value={form.company} onChange={update("company")} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm">
                    E-mailadres <span aria-hidden="true">*</span>
                  </label>
                  <Input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={update("email")} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm">
                    Telefoon <span className="soft font-normal">(optioneel)</span>
                  </label>
                  <Input id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update("phone")} className={fieldClass} />
                </div>
              </div>

              <div>
                <label htmlFor="pakket" className="mb-2 block text-sm">
                  Pakket
                </label>
                <select id="pakket" name="pakket" value={form.pakket} onChange={update("pakket")} className={selectClass}>
                  <option value="">Kies een pakket</option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} – {p.audience}
                    </option>
                  ))}
                  <option value="onbekend">Weet ik nog niet</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm">
                  Bericht <span aria-hidden="true">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Wat doet je zaak en wat moet je website voor je doen?"
                  value={form.message}
                  onChange={update("message")}
                  className={`${fieldClass} h-auto resize-none py-3`}
                />
              </div>

              <p className="soft text-sm">
                Velden met * zijn verplicht. We gebruiken je gegevens alleen om je aanvraag te beantwoorden, zoals beschreven in onze{" "}
                <Link to="/privacyverklaring" className="underline underline-offset-4">
                  privacyverklaring
                </Link>
                .
              </p>


              <button type="submit" className="ff-btn ff-btn-primary w-full" disabled={loading}>
                {loading ? "Verzenden…" : "Verstuur aanvraag"}
              </button>

              <p role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
                {status?.text}
              </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
