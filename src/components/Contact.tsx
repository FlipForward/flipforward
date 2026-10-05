import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Send, MapPin, Clock } from "lucide-react";
import { business, packages, type PackageId } from "@/lib/site";
import { PACKAGE_EVENT } from "@/lib/selectPackage";

type PackageChoice = PackageId | "onbekend" | "";

const isPackage = (v: string | null): v is PackageId => packages.some((p) => p.id === v);

const emptyForm = { name: "", company: "", email: "", phone: "", pakket: "" as PackageChoice, message: "" };

const fieldClass = "bg-background border-border";
const selectClass =
  "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-base md:text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

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
      setStatus({ ok: true, text: "Bedankt! Je bericht is verzonden. Je krijgt binnen 2 werkdagen een antwoord." });
      setForm(emptyForm);
    }
    setLoading(false);
  };

  const infoCards = [
    { icon: Mail, title: "E-mail", content: <a className="underline underline-offset-4 hover:text-accent" href={`mailto:${business.email}`}>{business.email}</a> },
    { icon: Clock, title: "Antwoord", content: "Binnen 2 werkdagen, vaak sneller." },
    { icon: MapPin, title: "Regio", content: `Gevestigd in ${business.city}, actief in de Kempen, de provincie Antwerpen en verder.` },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-16 sm:py-24 bg-background relative overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="contact-title" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Laten we <span className="text-accent">kennismaken</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Vertel kort over je zaak. Je krijgt een vrijblijvend voorstel.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-6 sm:gap-8 items-start">
          <Card className="md:col-span-3 p-6 sm:p-8 bg-gradient-card border-border">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Spamval: onzichtbaar voor bezoekers, bots vullen het in. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-foreground">
                    Naam <span aria-hidden="true">*</span>
                  </label>
                  <Input id="name" name="name" autoComplete="name" required value={form.name} onChange={update("name")} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-1.5 text-foreground">
                    Bedrijf
                  </label>
                  <Input id="company" name="company" autoComplete="organization" value={form.company} onChange={update("company")} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-foreground">
                    E-mailadres <span aria-hidden="true">*</span>
                  </label>
                  <Input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={update("email")} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1.5 text-foreground">
                    Telefoon <span className="text-muted-foreground font-normal">(optioneel)</span>
                  </label>
                  <Input id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update("phone")} className={fieldClass} />
                </div>
              </div>

              <div>
                <label htmlFor="pakket" className="block text-sm font-medium mb-1.5 text-foreground">
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
                <label htmlFor="message" className="block text-sm font-medium mb-1.5 text-foreground">
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
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Velden met * zijn verplicht. We gebruiken je gegevens alleen om je aanvraag te beantwoorden, zoals beschreven in onze{" "}
                <Link to="/privacyverklaring" className="underline underline-offset-4 text-foreground hover:text-accent">
                  privacyverklaring
                </Link>
                .
              </p>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                {loading ? "Verzenden…" : "Verstuur aanvraag"}
                <Send className="ml-2 w-4 h-4" aria-hidden="true" />
              </Button>

              <p role="status" aria-live="polite" className={`text-sm min-h-[1.25rem] ${status?.ok === false ? "text-destructive" : "text-foreground"}`}>
                {status?.text}
              </p>
            </form>
          </Card>

          <div className="md:col-span-2 flex flex-col gap-4">
            {infoCards.map(({ icon: Icon, title, content }) => (
              <Card key={title} className="p-5 sm:p-6 bg-gradient-card border-border">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-accent" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold mb-1 text-foreground text-sm">{title}</h3>
                    <p className="text-sm text-muted-foreground break-words">{content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
