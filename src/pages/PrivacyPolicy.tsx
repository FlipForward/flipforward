import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { business, fullAddress } from "@/lib/site";

const mail = <a href={`mailto:${business.email}`}>{business.email}</a>;

const sections: LegalSection[] = [
  {
    title: "1. Wie is verantwoordelijk?",
    body: (
      <p>
        De verwerkingsverantwoordelijke is {business.owner}, eenmanszaak met handelsnaam {business.name}, {fullAddress},
        ondernemingsnummer {business.enterpriseNumber}. Voor alle vragen over privacy kun je mailen naar {mail}.
      </p>
    ),
  },
  {
    title: "2. Welke gegevens verwerken we?",
    body: (
      <>
        <p>Via het contactformulier:</p>
        <ul>
          <li>naam en (optioneel) bedrijfsnaam;</li>
          <li>e-mailadres en (optioneel) telefoonnummer;</li>
          <li>het gekozen pakket en de inhoud van je bericht.</li>
        </ul>
        <p>Als je klant wordt bovendien: facturatiegegevens (bedrijfsgegevens, ondernemings- of btw-nummer, adres) en de inhoud die je voor je website aanlevert.</p>
        <p>
          Bij elk bezoek aan de website registreert onze hostingpartij technische gegevens zoals je IP-adres, browser en het
          tijdstip, om de website veilig en beschikbaar te houden. We gebruiken geen analyse- of marketingtools en bouwen geen
          bezoekersprofielen.
        </p>
      </>
    ),
  },
  {
    title: "3. Waarom en op welke rechtsgrond?",
    body: (
      <ul>
        <li>
          <strong>Je aanvraag beantwoorden en een voorstel maken</strong> – maatregelen die je zelf vraagt vóór een overeenkomst
          (art. 6.1.b AVG).
        </li>
        <li>
          <strong>Je website bouwen, hosten, onderhouden en factureren</strong> – uitvoering van de overeenkomst (art. 6.1.b AVG).
        </li>
        <li>
          <strong>Boekhouding en facturen bewaren</strong> – wettelijke verplichting (art. 6.1.c AVG).
        </li>
        <li>
          <strong>Beveiliging van de website</strong> (technische logs) – gerechtvaardigd belang (art. 6.1.f AVG).
        </li>
      </ul>
    ),
  },
  {
    title: "4. Hoe lang bewaren we je gegevens?",
    review: "bewaartermijnen zijn een voorstel; controleer vooral de fiscale bewaartermijn (7 of 10 jaar) met je boekhouder.",
    body: (
      <ul>
        <li>Contactaanvragen die niet tot een overeenkomst leiden: maximaal 12 maanden na het laatste contact.</li>
        <li>Klantgegevens: zolang de overeenkomst loopt, en daarna zolang nodig voor eventuele geschillen.</li>
        <li>Facturen en boekhoudkundige stukken: zolang de wet het verplicht (momenteel 7 tot 10 jaar).</li>
        <li>Technische logs van de hostingpartij: kort, volgens het beleid van die partij.</li>
      </ul>
    ),
  },
  {
    title: "5. Met wie delen we gegevens?",
    review: "controleer de lijst van verwerkers (is Dexxter nog in gebruik?).",
    body: (
      <>
        <p>We verkopen je gegevens nooit. We werken met deze verwerkers, die je gegevens enkel in onze opdracht verwerken:</p>
        <ul>
          <li>Vercel Inc. – hosting van de website en doorsturen van het contactformulier naar onze mailbox (servers mogelijk buiten de EU, met de wettelijke waarborgen zoals de standaardcontractbepalingen van de Europese Commissie);</li>
          <li>Vimexx – e-mailhosting: berichten uit het contactformulier komen als e-mail in onze mailbox terecht en worden niet in een aparte databank bewaard;</li>
          <li>Dexxter – facturatie en boekhouding.</li>
        </ul>
        <p>Daarnaast geven we gegevens alleen door als de wet ons daartoe verplicht.</p>
      </>
    ),
  },
  {
    title: "6. Cookies",
    body: (
      <p>
        Deze website plaatst geen cookies: geen analyse-, advertentie- of trackingcookies en ook geen andere. Daarom tonen we
        ook geen cookiebanner. Kies je voor de lichte of donkere weergave, dan wordt die keuze niet bewaard.
      </p>
    ),
  },
  {
    title: "7. Jouw rechten",
    body: (
      <>
        <p>
          Je hebt het recht om je gegevens in te zien, te laten verbeteren of verwijderen, de verwerking te laten beperken,
          bezwaar te maken en je gegevens over te laten dragen. Stuur je verzoek naar {mail}. We antwoorden binnen een maand.
        </p>
        <p>
          Ben je niet tevreden over hoe we met je gegevens omgaan, dan kun je klacht indienen bij de Gegevensbeschermingsautoriteit,
          Drukpersstraat 35, 1000 Brussel,{" "}
          <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer">
            www.gegevensbeschermingsautoriteit.be
          </a>
          .
        </p>
      </>
    ),
  },
];

const PrivacyPolicy = () => (
  <LegalPage
    title="Privacyverklaring"
    updated="5 oktober 2026"
    intro={
      <p>
        In deze privacyverklaring lees je welke persoonsgegevens {business.name} verwerkt, waarom, hoe lang, met wie we ze delen
        en welke rechten je hebt.
      </p>
    }
    sections={sections}
  />
);

export default PrivacyPolicy;
