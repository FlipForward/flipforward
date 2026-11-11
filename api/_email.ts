/**
 * HTML-mail voor nieuwe aanvragen via het contactformulier.
 * Bestanden met "_" in api/ worden door Vercel niet als route gepubliceerd.
 * Alles inline gestyled en in tabellen, zodat het ook in Outlook en Gmail goed toont.
 */

export interface Lead {
  name: string;
  company: string;
  email: string;
  phone: string;
  pakket: string; // leesbaar label, bv. "Business"
  message: string;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const firstName = (name: string) => name.trim().split(/\s+/)[0] || name;

/** mailto-link naar de aanvrager met enkel een onderwerp. Kort gehouden: lange, gecodeerde links wegen mee in spamfilters. */
export function replyLink(lead: Lead) {
  const subject = `Je aanvraag bij FlipForward${lead.pakket && lead.pakket !== "Niet gekozen" && lead.pakket !== "Weet ik nog niet" ? ` – pakket ${lead.pakket}` : ""}`;
  return `mailto:${encodeURIComponent(lead.email)}?subject=${encodeURIComponent(subject)}`;
}

export function leadText(lead: Lead) {
  return [
    `Nieuwe aanvraag via flipforward.be`,
    ``,
    `Naam:     ${lead.name}`,
    `Bedrijf:  ${lead.company || "-"}`,
    `E-mail:   ${lead.email}`,
    `Telefoon: ${lead.phone || "-"}`,
    `Pakket:   ${lead.pakket}`,
    ``,
    `Bericht:`,
    lead.message,
    ``,
    `Antwoorden: gebruik "Beantwoorden" in je mailprogramma (gaat naar ${lead.email}).`,
  ].join("\n");
}

/**
 * Zelfde designtaal als de site (11/11/2026): papierwit, inktzwart, oranje enkel op de knop, grote kop zonder vet.
 * Bewust sober voor spamfilters: geen verborgen voorvertoningstekst, geen afbeeldingen van buitenaf, geen verlopen.
 */
export function leadHtml(lead: Lead, receivedAt = new Date()) {
  const when = receivedAt.toLocaleString("nl-BE", {
    timeZone: "Europe/Brussels",
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
  const tel = lead.phone.replace(/[^\d+]/g, "");
  const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif";
  const row = (label: string, value: string) => `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #d3cfc6;color:#5a5a60;font-size:14px;width:104px;vertical-align:top;">${label}</td>
                <td style="padding:12px 0;border-bottom:1px solid #d3cfc6;color:#17171a;font-size:16px;vertical-align:top;">${value}</td>
              </tr>`;
  const link = (href: string, label: string) => `<a href="${esc(href)}" style="color:#17171a;text-decoration:underline;">${label}</a>`;

  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Nieuwe aanvraag</title>
</head>
<body style="margin:0;padding:0;background:#f3f1ed;font-family:${font};color:#17171a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f1ed;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
          <tr>
            <td style="padding:0 0 24px;font-size:17px;font-weight:500;color:#17171a;">
              <span style="color:#de310d;">ff›</span> FlipForward
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 8px;color:#5a5a60;font-size:14px;">Nieuwe aanvraag · ${esc(when)}</td>
          </tr>
          <tr>
            <td style="padding:0 0 24px;">
              <h1 style="margin:0;font-size:32px;line-height:1.1;font-weight:400;letter-spacing:-0.02em;color:#17171a;">${esc(lead.name)}${
                lead.company ? `<span style="color:#5a5a60;">, ${esc(lead.company)}</span>` : ""
              }</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 24px;background:#faf8f4;border-radius:16px;font-size:16px;line-height:1.6;color:#17171a;white-space:pre-wrap;">${esc(lead.message)}</td>
          </tr>
          <tr>
            <td style="padding:16px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #d3cfc6;">${row("Pakket", esc(lead.pakket))}${row(
                "E-mail",
                link(`mailto:${lead.email}`, esc(lead.email)),
              )}${row("Telefoon", tel ? link(`tel:${tel}`, esc(lead.phone)) : "–")}${row("Bedrijf", lead.company ? esc(lead.company) : "–")}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 0 0;">
              <a href="${esc(replyLink(lead))}" style="display:inline-block;padding:16px 28px;border-radius:999px;background:#de310d;color:#ffffff;font-size:16px;font-weight:500;text-decoration:none;">Antwoord ${esc(firstName(lead.name))}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 0 0;color:#5a5a60;font-size:13px;line-height:1.5;">
              Verstuurd via het contactformulier op flipforward.be. "Beantwoorden" in je mailprogramma gaat naar ${esc(lead.email)}.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
