import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { business, fullAddress, packages, formatEuro } from "@/lib/site";

const pkg = (id: string) => packages.find((p) => p.id === id)!;

const sections: LegalSection[] = [
  {
    title: "Artikel 1 – Toepassing",
    review: "toepassing op consumenten; dwingende bepalingen van boek VI WER (o.a. onrechtmatige bedingen) kunnen artikels 4, 11 en 12 beperken.",
    body: (
      <>
        <p>
          Deze voorwaarden gelden voor alle offertes, overeenkomsten en diensten van {business.owner}, eenmanszaak met
          handelsnaam {business.name}, {fullAddress}, ondernemingsnummer {business.enterpriseNumber} (hierna “FlipForward”),
          tegenover de opdrachtgever (hierna “de Klant”).
        </p>
        <p>
          Afwijkingen gelden alleen als ze schriftelijk zijn overeengekomen. Bij tegenstrijdigheid gaat de ondertekende offerte
          voor op deze voorwaarden. Is de Klant een consument, dan blijven de dwingende regels van het consumentenrecht van
          toepassing.
        </p>
      </>
    ),
  },
  {
    title: "Artikel 2 – Website as a Service",
    body: (
      <>
        <p>
          FlipForward bouwt een website voor de Klant en zorgt daarna, zolang het abonnement loopt, voor hosting, domeinbeheer en
          onderhoud. De Klant betaalt een eenmalige opstartkost en een vast bedrag per maand, volgens het gekozen pakket (Start,
          Business of Pro) zoals beschreven op de website en in de offerte.
        </p>
      </>
    ),
  },
  {
    title: "Artikel 3 – Opstart en oplevering",
    body: (
      <>
        <p>
          De werkzaamheden starten na betaling van de opstartkost. De bouw duurt doorgaans ongeveer 2 tot 6 weken, afhankelijk van
          het pakket. Deze termijn is indicatief en loopt pas vanaf het moment dat de Klant alle inhoud (teksten, beelden,
          logo's) heeft aangeleverd.
        </p>
        <p>
          Bij de bouw zijn twee feedbackrondes inbegrepen. Vertraging door laattijdig aanleveren van inhoud of feedback geeft geen
          recht op korting of schadevergoeding.
        </p>
      </>
    ),
  },
  {
    title: "Artikel 4 – Looptijd en opzegging",
    review: "minimale looptijd van 12 maanden en de regeling bij vroegtijdige stopzetting, zeker tegenover consumenten.",
    body: (
      <>
        <p>Het maandabonnement start op de dag dat de website live gaat en heeft een minimale looptijd van 12 maanden.</p>
        <p>
          Na die 12 maanden loopt het abonnement maandelijks door en kan elke partij het opzeggen per e-mail, tegen het einde van
          de kalendermaand die volgt op de opzegging.
        </p>
        <p>
          Zegt de Klant op vóór het einde van de minimale looptijd, dan blijven de maandbedragen tot het einde van die 12 maanden
          verschuldigd.
        </p>
      </>
    ),
  },
  {
    title: "Artikel 5 – Wat het onderhoud omvat",
    body: (
      <>
        <p>Het maandbedrag omvat in elk pakket:</p>
        <ul>
          <li>hosting, SSL-certificaat en de registratiekosten van één domeinnaam;</li>
          <li>back-ups, software-updates, beveiliging en uptime-monitoring;</li>
          <li>
            aanpassingen aan de website tot {pkg("start").name}: 30 minuten, {pkg("business").name}: 1 uur en{" "}
            {pkg("pro").name}: 2 uur per maand. Niet gebruikte tijd wordt niet overgedragen naar een volgende maand;
          </li>
          <li>voor {pkg("pro").name}: een kwartaalrapport.</li>
        </ul>
        <p>
          Niet inbegrepen zijn onder meer nieuwe functies, extra pagina's boven het pakket, een volledig herontwerp en het schrijven
          van teksten. Dat is meerwerk (artikel 7).
        </p>
      </>
    ),
  },
  {
    title: "Artikel 6 – Reactietijd en beschikbaarheid",
    body: (
      <p>
        FlipForward reageert op vragen en meldingen binnen 2 werkdagen (maandag tot vrijdag, behalve feestdagen). FlipForward
        doet wat redelijkerwijs mogelijk is om de website beschikbaar te houden, maar kan geen ononderbroken werking garanderen,
        onder meer bij storingen bij hosting- of softwareleveranciers.
      </p>
    ),
  },
  {
    title: "Artikel 7 – Meerwerk",
    body: (
      <p>
        Werk buiten het pakket of boven de maandelijkse aanpassingstijd wordt alleen uitgevoerd na akkoord van de Klant en wordt
        gefactureerd aan € 75 per uur, per begonnen kwartier.
      </p>
    ),
  },
  {
    title: "Artikel 8 – Prijzen en btw",
    review: "wat gebeurt er met lopende contracten als FlipForward btw-plichtig wordt (bv. omzetdrempel overschreden)?",
    body: (
      <p>
        FlipForward valt onder de bijzondere vrijstellingsregeling voor kleine ondernemingen en rekent geen btw aan. Wordt
        FlipForward later btw-plichtig, dan wordt vanaf dat moment btw aangerekend volgens de wet op de dan geldende bedragen. De
        Klant wordt daar vooraf over ingelicht.
      </p>
    ),
  },
  {
    title: "Artikel 9 – Betaling",
    body: (
      <>
        <p>
          De opstartkost wordt vooraf gefactureerd. Het maandbedrag wordt maandelijks gefactureerd. Facturen zijn betaalbaar binnen
          14 dagen na factuurdatum.
        </p>
        <p>
          Bij niet-betaling stuurt FlipForward een herinnering. Blijft betaling daarna uit, dan mag FlipForward de website
          tijdelijk offline halen tot het volledige bedrag is betaald.
        </p>
      </>
    ),
  },
  {
    title: "Artikel 10 – Eigendom",
    review: "verdeling van intellectuele eigendom (ontwerp/code bij FlipForward, inhoud en domein bij de Klant).",
    body: (
      <ul>
        <li>De domeinnaam wordt geregistreerd op naam van de Klant. FlipForward beheert hem technisch zolang het abonnement loopt.</li>
        <li>
          Teksten, beelden en logo's die de Klant aanlevert, blijven van de Klant. De Klant verklaart dat hij de nodige rechten
          heeft op die inhoud.
        </li>
        <li>Foto's die FlipForward maakt (add-on fotografie) mag de Klant onbeperkt gebruiken voor de eigen marketing.</li>
        <li>
          Het ontwerp, de code en de technische opbouw van de website blijven eigendom van FlipForward. De Klant krijgt een
          gebruiksrecht zolang het abonnement loopt.
        </li>
      </ul>
    ),
  },
  {
    title: "Artikel 11 – Einde van de overeenkomst",
    body: (
      <p>
        Bij het einde van de overeenkomst geeft FlipForward de Klant de overdrachtscode van de domeinnaam en een kopie van de
        aangeleverde inhoud (teksten, beelden, logo's). De website gaat offline aan het einde van de laatste betaalde maand. Een
        overname van het ontwerp en de code door de Klant is bespreekbaar en wordt dan apart overeengekomen.
      </p>
    ),
  },
  {
    title: "Artikel 12 – Aansprakelijkheid",
    review: "beperking van aansprakelijkheid en de uitsluiting van indirecte schade.",
    body: (
      <>
        <p>
          FlipForward heeft een inspanningsverbintenis. FlipForward is niet aansprakelijk voor indirecte schade zoals
          winstderving, of voor schade door fouten van derden (zoals hosting- of softwareleveranciers).
        </p>
        <p>De aansprakelijkheid is in elk geval beperkt tot de bedragen die de Klant in de laatste 3 maanden heeft betaald.</p>
        <p>
          De inhoud van de website, zoals juridische teksten (privacyverklaring, B2B-voorwaarden) die de Klant aanlevert of laat
          plaatsen, blijft de verantwoordelijkheid van de Klant. FlipForward geeft geen juridisch advies.
        </p>
      </>
    ),
  },
  {
    title: "Artikel 13 – Herroepingsrecht voor consumenten",
    review: "of en hoe het herroepingsrecht van 14 dagen geldt wanneer de bouw op verzoek van de consument meteen start.",
    body: (
      <p>
        Een consument die de overeenkomst op afstand sluit, heeft 14 dagen herroepingsrecht. Vraagt de consument uitdrukkelijk
        om binnen die termijn al te beginnen, dan betaalt hij bij herroeping een bedrag in verhouding tot het reeds geleverde
        werk.
      </p>
    ),
  },
  {
    title: "Artikel 14 – Toepasselijk recht",
    body: (
      <p>
        Op alle overeenkomsten is het Belgisch recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechtbanken van
        het gerechtelijk arrondissement Antwerpen, afdeling Turnhout, onverminderd de dwingende bevoegdheidsregels voor
        consumenten.
      </p>
    ),
  },
];

const Terms = () => (
  <LegalPage
    title="Algemene voorwaarden"
    updated="5 oktober 2026"
    intro={
      <p>
        Deze voorwaarden horen bij de pakketten Start ({formatEuro(pkg("start").setup)} + {formatEuro(pkg("start").monthly)}/maand),
        Business ({formatEuro(pkg("business").setup)} + {formatEuro(pkg("business").monthly)}/maand) en Pro (vanaf{" "}
        {formatEuro(pkg("pro").setup)} + {formatEuro(pkg("pro").monthly)}/maand).
      </p>
    }
    sections={sections}
  />
);

export default Terms;
