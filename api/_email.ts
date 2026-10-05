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

/** mailto-link die meteen een antwoord opent naar de aanvrager, met onderwerp en aanhef ingevuld. */
export function replyLink(lead: Lead) {
  const subject = `Je aanvraag bij FlipForward${lead.pakket && lead.pakket !== "Niet gekozen" && lead.pakket !== "Weet ik nog niet" ? ` – pakket ${lead.pakket}` : ""}`;
  const quoted = lead.message
    .split("\n")
    .map((l) => `> ${l}`)
    .join("\n");
  const body = `Hoi ${firstName(lead.name)},\n\nBedankt voor je aanvraag!\n\n\n\nGroeten,\nFinn\nFlipForward – flipforward.be\n\n---\nJouw bericht:\n${quoted}`;
  return `mailto:${encodeURIComponent(lead.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
  const row = (label: string, value: string) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e2533;color:#8b93a7;font-size:13px;width:96px;vertical-align:top;">${label}</td>
                <td style="padding:10px 0;border-bottom:1px solid #1e2533;color:#f5f6f8;font-size:15px;vertical-align:top;">${value}</td>
              </tr>`;

  const button = (href: string, label: string, primary: boolean) => `
                <td style="padding:0 8px 8px 0;">
                  <a href="${esc(href)}" style="display:inline-block;padding:13px 22px;border-radius:10px;font-size:15px;font-weight:700;text-decoration:none;${
                    primary ? "background:#d9411c;color:#ffffff;" : "background:#1a2130;color:#f5f6f8;border:1px solid #2b3446;"
                  }">${label}</a>
                </td>`;

  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark light">
<title>Nieuwe aanvraag</title>
</head>
<body style="margin:0;padding:0;background:#070b16;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">${esc(lead.name)}${lead.company ? ` (${esc(lead.company)})` : ""} – ${esc(lead.pakket)}: ${esc(lead.message.slice(0, 120))}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#070b16;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
          <tr>
            <td style="padding:0 4px 20px;">
              <img src="https://flipforward.be/icon-192.png" width="40" height="40" alt="FlipForward" style="display:inline-block;vertical-align:middle;border-radius:10px;">
              <span style="display:inline-block;vertical-align:middle;margin-left:10px;color:#f5f6f8;font-size:18px;font-weight:700;">FlipForward</span>
            </td>
          </tr>
          <tr>
            <td style="background:#0f1420;border:1px solid #1e2533;border-radius:16px;overflow:hidden;">
              <div style="height:4px;background:#d9411c;background-image:linear-gradient(90deg,#f2532d,#c2410c);"></div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:28px 28px 8px;">
                    <p style="margin:0 0 6px;color:#f2532d;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Nieuwe aanvraag</p>
                    <h1 style="margin:0;color:#f5f6f8;font-size:24px;line-height:1.3;">${esc(lead.name)}${
                      lead.company ? `<span style="color:#8b93a7;font-weight:400;"> · ${esc(lead.company)}</span>` : ""
                    }</h1>
                    <p style="margin:10px 0 0;">
                      <span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#2a1610;color:#ff8a65;font-size:13px;font-weight:600;">Pakket: ${esc(lead.pakket)}</span>
                      <span style="display:inline-block;margin-left:6px;color:#8b93a7;font-size:13px;">${esc(when)}</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 28px 0;">
                    <div style="background:#141a28;border-left:3px solid #f2532d;border-radius:8px;padding:16px 18px;color:#e6e8ee;font-size:15px;line-height:1.6;white-space:pre-wrap;">${esc(lead.message)}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 28px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${row(
                      "E-mail",
                      `<a href="mailto:${esc(lead.email)}" style="color:#ff8a65;text-decoration:none;">${esc(lead.email)}</a>`,
                    )}${row("Telefoon", tel ? `<a href="tel:${esc(tel)}" style="color:#ff8a65;text-decoration:none;">${esc(lead.phone)}</a>` : "–")}${row(
                      "Bedrijf",
                      lead.company ? esc(lead.company) : "–",
                    )}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 28px 28px;">
                    <table role="presentation" cellpadding="0" cellspacing="0"><tr>${button(replyLink(lead), `Antwoord ${esc(firstName(lead.name))}`, true)}${
                      tel ? button(`tel:${tel}`, "Bel", false) : ""
                    }</tr></table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 4px 0;color:#5d667a;font-size:12px;line-height:1.5;">
              Verstuurd via het contactformulier op flipforward.be. Op "Beantwoorden" klikken in je mailprogramma werkt ook: dat gaat naar ${esc(
                lead.email,
              )}.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
