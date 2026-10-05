/**
 * POST /api/contact – Vercel-functie voor het contactformulier.
 * Stuurt een platte-tekstmail via de Vimexx-mailbox (SMTP) naar CONTACT_TO.
 * Er wordt niets opgeslagen: de aanvraag bestaat enkel als e-mail.
 *
 * Vereiste environment variables (Vercel → Settings → Environment Variables):
 *   SMTP_HOST   mail.flipforward.be
 *   SMTP_PORT   587
 *   SMTP_USER   finn@flipforward.be
 *   SMTP_PASS   (wachtwoord van de mailbox – enkel Finn zet dit)
 *   CONTACT_TO  finn@flipforward.be   (optioneel, standaard = SMTP_USER)
 */
import nodemailer from "nodemailer";

const PACKAGES: Record<string, string> = {
  start: "Start",
  business: "Business",
  pro: "Pro",
  onbekend: "Weet ik nog niet",
  "": "Niet gekozen",
};

const LIMITS = { name: 100, company: 120, email: 200, phone: 40, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Eenvoudige rem tegen spam per serverinstantie (geen garantie, wel een drempel).
const recent = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > 5;
}

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json; charset=utf-8" } });

/** Verwijdert regeleinden uit velden die in e-mailheaders terechtkomen (header injection). */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json(400, { error: "Ongeldige aanvraag." });
  }

  const field = (k: keyof typeof LIMITS) => (typeof data[k] === "string" ? (data[k] as string).trim() : "");
  const name = oneLine(field("name"));
  const company = oneLine(field("company"));
  const email = oneLine(field("email"));
  const phone = oneLine(field("phone"));
  const message = field("message");
  const pakket = typeof data.pakket === "string" && data.pakket in PACKAGES ? data.pakket : "";

  // Honeypot: echte bezoekers zien dit veld niet en laten het leeg.
  if (typeof data.website === "string" && data.website.trim() !== "") return json(200, { ok: true });

  if (!name || !email || !message) return json(400, { error: "Naam, e-mailadres en bericht zijn verplicht." });
  if (!EMAIL_RE.test(email)) return json(400, { error: "Dat e-mailadres lijkt niet te kloppen." });
  for (const [k, max] of Object.entries(LIMITS)) {
    const v = k === "message" ? message : { name, company, email, phone }[k as "name"];
    if (v.length > max) return json(400, { error: `Het veld "${k}" is te lang.` });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "onbekend";
  if (rateLimited(ip)) return json(429, { error: "Te veel aanvragen. Probeer het later opnieuw." });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("Contactformulier: SMTP-configuratie ontbreekt");
    return json(500, { error: "Het formulier is tijdelijk niet beschikbaar." });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const text = [
    `Nieuwe aanvraag via flipforward.be`,
    ``,
    `Naam:     ${name}`,
    `Bedrijf:  ${company || "-"}`,
    `E-mail:   ${email}`,
    `Telefoon: ${phone || "-"}`,
    `Pakket:   ${PACKAGES[pakket]}`,
    ``,
    `Bericht:`,
    message,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"FlipForward website" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: { name, address: email },
      subject: `Aanvraag: ${name}${company ? ` (${company})` : ""} – ${PACKAGES[pakket]}`,
      text,
    });
  } catch (err) {
    console.error("Contactformulier: verzenden mislukt", err);
    return json(502, { error: "Verzenden is mislukt. Probeer het later opnieuw." });
  }

  return json(200, { ok: true });
}
