import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'nl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.getStarted': 'Get Started',
    
    // Hero
    'hero.title1': 'Your professional website,',
    'hero.title2': 'fully taken care of.',
    'hero.description': 'We build a powerful website for your business at lightning speed and handle everything: from design and hosting to monthly maintenance. You run your business, we handle the internet.',
    'hero.startProject': 'View our approach',
    'hero.viewWork': 'View Our Work',
    'hero.ideas.biography': 'Personal Biography',
    'hero.ideas.blog': 'Blog Site',
    'hero.ideas.portfolio': 'Portfolio Website',
    'hero.ideas.shop': 'Online Shop',
    'hero.ideas.cafe': 'Café Website',
    'hero.ideas.salon': 'Salon Page',
    'hero.ideas.services': 'Service Business',
    'hero.ideas.gallery': 'Art Gallery',
    'hero.ideas.contact': 'Contact Page',
    'hero.ideas.landing': 'Landing Page',
    
    // Services
    'services.title': 'Our All-in-One',
    'services.titleAccent': 'Package',
    'services.subtitle': 'Everything you need for a successful online presence.',
    'services.design.title': 'Design & Development',
    'services.design.desc': 'A custom-built, mobile-friendly website. Including 2 feedback rounds so the design is 100% to your liking.',
    'services.hosting.title': 'Hosting & Domain',
    'services.hosting.desc': 'We register your domain name, arrange a secure server (SSL) and ensure your website always loads lightning fast.',
    'services.maintenance.title': 'Monthly Maintenance',
    'services.maintenance.desc': 'Ongoing technical updates, security and support for small adjustments. Your website is always up-to-date.',
    
    // Portfolio
    'portfolio.title': 'Featured',
    'portfolio.titleAccent': 'Work',
    'portfolio.subtitle': 'Transforming ideas into exceptional digital experiences',
    'portfolio.project1.title': 'Personal Website',
    'portfolio.project1.category': 'Biography',
    'portfolio.project1.desc': 'Personal biography website showcasing my story, interests, and journey in technology.',
    'portfolio.project2.title': 'ATLAZ',
    'portfolio.project2.category': 'DJ Website',
    'portfolio.project2.desc': 'Official DJ website featuring mixes, upcoming shows, and press info.',
    'portfolio.project3.title': 'Hytale Vlaanderen',
    'portfolio.project3.category': 'Community Platform',
    'portfolio.project3.desc': 'Flemish community hub for a Hytale server hosted by the best Flemish Twitch streamers.',
    'portfolio.project4.title': 'Webdesign Portfolio',
    'portfolio.project4.category': 'Portfolio',
    'portfolio.project4.desc': 'A school project showcasing my webdesign skills and creative projects.',
    
    // About
    'about.title': 'About',
    'about.titleAccent': 'FlipForward',
    'about.subtitle': 'Your digital partner for websites without hassle',
    'about.description': "FlipForward is your digital partner that bridges the gap between technology and design. We don't believe in complicated processes, but in speed, transparency and quality. With a passion for the latest web technologies, we build websites that are not only beautiful but also work perfectly on every device.",
    'about.passion.title': 'Lightning Fast Live',
    'about.passion.desc': 'Online within 5 business days, as soon as we have received your texts and images.',
    'about.learning.title': 'Fully Managed',
    'about.learning.desc': 'No hassle with servers or updates; we manage your hosting and technology.',
    'about.dedication.title': 'Premium Design',
    'about.dedication.desc': 'Modern, conversion-focused designs that strengthen your brand.',
    
    // Pricing
    'pricing.title': 'WaaS Package',
    'pricing.titleAccent': '(Website as a Service)',
    'pricing.setup': '€ 1.000,-',
    'pricing.setupLabel': 'one-time setup',
    'pricing.monthly': '+ € 50,- / month',
    'pricing.monthlyLabel': '(maintenance & hosting)',
    'pricing.feature1': 'Complete web design (max. 5 pages)',
    'pricing.feature2': 'Including domain name & premium hosting',
    'pricing.feature3': 'Delivery in 5 business days',
    'pricing.feature4': 'Responsive on mobile & tablet',
    'pricing.feature5': 'Basic SEO optimization',
    'pricing.feature6': 'Monthly technical updates',
    'pricing.feature7': 'Support for small changes (<30 min/month)',
    'pricing.cta': 'Start your project',

    // Contact
    'contact.title': "Let's Build Something",
    'contact.titleAccent': 'Amazing',
    'contact.subtitle': "Ready to flip your business forward? Get in touch with us today.",
    'contact.name': 'Your Name',
    'contact.namePlaceholder': 'John Doe',
    'contact.email': 'Email Address',
    'contact.emailPlaceholder': 'john@example.com',
    'contact.message': 'Your Message',
    'contact.messagePlaceholder': 'Tell us about your project...',
    'contact.send': 'Send Message',
    'contact.emailUs': 'Email Us',
    'contact.delivery': 'Fast Delivery',
    'contact.deliveryDesc': 'We prioritize quick turnaround times without compromising on quality.',
    'contact.visuals': 'Visual Excellence',
    'contact.visualsDesc': 'Creating beautiful, modern designs that make your project stand out.',
    'contact.success': 'Message Sent!',
    'contact.successDesc': "We'll get back to you within 24 hours.",

    // Terms
    'terms.title': 'Terms & Conditions FlipForward',
    'terms.lastUpdated': 'Last updated',
    'terms.intro': 'These terms and conditions apply to all offers, quotes, and agreements between FlipForward (part of the sole proprietorship Finn Vangronsveld / ATLAZ Records, KBO: BE1033868758) and the Client.',
    'terms.art1.title': 'Article 1: The "Website as a Service" (WaaS) Model',
    'terms.art1.p1': 'FlipForward delivers web design and hosting through a subscription model. The Client does not purchase the website but obtains an exclusive right of use as long as the monthly subscription is active.',
    'terms.art1.p2': 'All websites developed by FlipForward, including code, designs, AI implementations, and licenses, remain the intellectual property of FlipForward at all times.',
    'terms.art2.title': 'Article 2: Delivery and Content',
    'terms.art2.p1': 'FlipForward aims to deliver the initial website (Proof of Concept) within 5 business days. This period only begins after the startup invoice has been paid and all required content (texts, images, logos) has been provided by the Client.',
    'terms.art2.p2': 'If the Client fails to provide material in a timely manner, this may delay the delivery period. This does not entitle the Client to a discount or compensation.',
    'terms.art2.p3': 'A maximum of two (2) feedback rounds are included in the initial build.',
    'terms.art3.title': 'Article 3: Subscription and Maintenance',
    'terms.art3.p1': 'After the website goes live or is approved, the monthly subscription of €50 (excl. VAT) begins.',
    'terms.art3.p2': 'This subscription includes hosting, domain name registration, license costs for tools used, and minor technical maintenance up to a maximum of 30 minutes per month.',
    'terms.art3.p3': 'Modifications that fall outside the initial scope or take longer than 30 minutes (additional work) will be invoiced after consultation at an hourly rate of €100 (excl. VAT).',
    'terms.art4.title': 'Article 4: Payment and Default',
    'terms.art4.p1': 'Invoices must be paid within 14 days of the invoice date.',
    'terms.art4.p2': 'If payment is not received after this period, the Client will receive a reminder. If payment remains outstanding, FlipForward is entitled to (temporarily) take the website offline until the full amount has been paid.',
    'terms.art4.p3': 'Startup costs must be paid prior to the commencement of work.',
    'terms.art5.title': 'Article 5: Cancellation of Subscription',
    'terms.art5.p1': 'The subscription can be cancelled monthly by the Client.',
    'terms.art5.p2': 'Upon cancellation, the right of use referred to in Article 1 expires. The website and associated files will be permanently removed from the servers at the end of the current billing period. No transfer of code or website files to the Client will take place.',
    'terms.art6.title': 'Article 6: Liability',
    'terms.art6.p1': 'FlipForward endeavors to ensure the website and linked AI tools function optimally but cannot guarantee 100% uptime or error-free operation of external (AI) software.',
    'terms.art6.p2': 'The liability of FlipForward for direct or indirect damage is at all times limited to a maximum of the invoice amount of the past three (3) months of the relevant assignment.',
    'terms.art7.title': 'Article 7: Applicable Law',
    'terms.art7.p1': 'All agreements between FlipForward and the Client are exclusively governed by Belgian law. Disputes will be submitted to the competent court in the district where FlipForward is established.',

    // Privacy Policy
    'privacy.title': 'Privacy Policy FlipForward',
    'privacy.lastUpdated': 'Last updated',
    'privacy.intro': 'FlipForward (part of ATLAZ Records, KBO: BE1033868758) values your privacy. In this privacy policy, we explain which personal data we collect, why we do this, and what your rights are.',
    'privacy.section1.title': '1. What data do we collect?',
    'privacy.section1.text': 'When you fill in our contact form or purchase a web design subscription from us, we collect the following data:',
    'privacy.section1.items': 'First and last name|Company name and KBO/VAT number|Email address and phone number|Billing and payment details',
    'privacy.section2.title': '2. Why do we collect this data?',
    'privacy.section2.text': 'We use your data exclusively for:',
    'privacy.section2.items': 'Building, hosting, and maintaining your website.|Processing payments and invoicing (via our partner Dexxter).|Contacting you about your project or support questions.',
    'privacy.section3.title': '3. How long do we keep your data?',
    'privacy.section3.text': 'We do not retain your personal data longer than strictly necessary to achieve the purposes for which your data is collected. Billing data is legally retained for 7 years to comply with Belgian tax legislation.',
    'privacy.section4.title': '4. Sharing data with third parties',
    'privacy.section4.text': 'FlipForward does not sell your data to third parties and only provides it if this is necessary for the execution of our agreement with you (for example, hosting parties or invoicing software) or to comply with a legal obligation.',
    'privacy.section5.title': '5. Your rights (GDPR)',
    'privacy.section5.text': 'You have the right to view, correct, or delete your personal data. In addition, you have the right to withdraw any consent for data processing or to object to the processing of your personal data by FlipForward. Please send an email to: info@flipforward.be.',
    'privacy.section6.title': '6. Cookies',
    'privacy.section6.text': 'Our website uses functional cookies to ensure the website works optimally. We also use analytics tools to analyze how visitors use our website.',
  },
  nl: {
    // Navigation
    'nav.about': 'Over',
    'nav.services': 'Diensten',
    'nav.portfolio': 'Portfolio',
    'nav.getStarted': 'Begin Nu',
    
    // Hero
    'hero.title1': 'Jouw professionele website,',
    'hero.title2': 'volledig ontzorgd.',
    'hero.description': 'Wij bouwen razendsnel een krachtige website voor jouw bedrijf en regelen alles: van design en hosting tot het maandelijkse onderhoud. Jij onderneemt, wij regelen het internet.',
    'hero.startProject': 'Bekijk onze werkwijze',
    'hero.viewWork': 'Bekijk Ons Werk',
    'hero.ideas.biography': 'Persoonlijke Biografie',
    'hero.ideas.blog': 'Blog Site',
    'hero.ideas.portfolio': 'Portfolio Website',
    'hero.ideas.shop': 'Online Winkel',
    'hero.ideas.cafe': 'Café Website',
    'hero.ideas.salon': 'Salon Pagina',
    'hero.ideas.services': 'Diensten Bedrijf',
    'hero.ideas.gallery': 'Kunst Galerij',
    'hero.ideas.contact': 'Contact Pagina',
    'hero.ideas.landing': 'Landing Pagina',
    
    // Services
    'services.title': 'Ons All-in-One',
    'services.titleAccent': 'Pakket',
    'services.subtitle': 'Alles wat je nodig hebt voor een succesvolle online aanwezigheid.',
    'services.design.title': 'Design & Ontwikkeling',
    'services.design.desc': 'Een op maat gemaakte, mobielvriendelijke website. Inclusief 2 feedbackrondes zodat het design 100% naar wens is.',
    'services.hosting.title': 'Hosting & Domein',
    'services.hosting.desc': 'Wij registreren jouw domeinnaam, regelen een veilige server (SSL) en zorgen dat je website altijd bliksemsnel laadt.',
    'services.maintenance.title': 'Maandelijks Onderhoud',
    'services.maintenance.desc': 'Doorlopende technische updates, beveiliging en support voor kleine aanpassingen. Jouw website is altijd up-to-date.',
    
    // Portfolio
    'portfolio.title': 'Uitgelicht',
    'portfolio.titleAccent': 'Werk',
    'portfolio.subtitle': 'Ideeën omzetten in uitzonderlijke digitale ervaringen',
    'portfolio.project1.title': 'Persoonlijke Website',
    'portfolio.project1.category': 'Biografie',
    'portfolio.project1.desc': 'Persoonlijke biografie website die mijn verhaal, interesses en reis in technologie toont.',
    'portfolio.project2.title': 'ATLAZ',
    'portfolio.project2.category': 'DJ Website',
    'portfolio.project2.desc': 'Officiële DJ-website met mixes, aankomende shows en presskit.',
    'portfolio.project3.title': 'Hytale Vlaanderen',
    'portfolio.project3.category': 'Community Platform',
    'portfolio.project3.desc': 'Vlaamse community hub voor een Hytale-server, gehost door de beste Vlaamse Twitch-streamers.',
    'portfolio.project4.title': 'Webdesign Portfolio',
    'portfolio.project4.category': 'Portfolio',
    'portfolio.project4.desc': 'Een school project dat mijn webdesign vaardigheden en creatieve projecten toont.',
    
    // About
    'about.title': 'Over',
    'about.titleAccent': 'FlipForward',
    'about.subtitle': 'Jouw digitale partner voor websites zonder gedoe',
    'about.description': 'FlipForward is jouw digitale partner die de brug slaat tussen techniek en design. Wij geloven niet in ingewikkelde trajecten, maar in snelheid, transparantie en kwaliteit. Met een passie voor de nieuwste webtechnologieën bouwen we websites die niet alleen prachtig zijn, maar ook perfect werken op elk apparaat.',
    'about.passion.title': 'Razendsnel Live',
    'about.passion.desc': 'Binnen 5 werkdagen online, zodra wij jouw teksten en beelden hebben ontvangen.',
    'about.learning.title': 'Volledig Ontzorgd',
    'about.learning.desc': 'Geen gedoe met servers of updates; wij beheren je hosting en techniek.',
    'about.dedication.title': 'Premium Design',
    'about.dedication.desc': 'Moderne, conversiegerichte ontwerpen die jouw merk versterken.',
    
    // Pricing
    'pricing.title': 'WaaS Pakket',
    'pricing.titleAccent': '(Website as a Service)',
    'pricing.setup': '€ 1.000,-',
    'pricing.setupLabel': 'eenmalige setup',
    'pricing.monthly': '+ € 50,- / maand',
    'pricing.monthlyLabel': '(onderhoud & hosting)',
    'pricing.feature1': 'Compleet webdesign (max. 5 pagina\'s)',
    'pricing.feature2': 'Inclusief domeinnaam & premium hosting',
    'pricing.feature3': 'Oplevering in 5 werkdagen',
    'pricing.feature4': 'Responsive op mobiel & tablet',
    'pricing.feature5': 'Basis SEO-optimalisatie',
    'pricing.feature6': 'Maandelijkse technische updates',
    'pricing.feature7': 'Support voor kleine wijzigingen (<30 min/mnd)',
    'pricing.cta': 'Start jouw project',

    // Contact
    'contact.title': 'Laten We Iets',
    'contact.titleAccent': 'Geweldigs Bouwen',
    'contact.subtitle': 'Klaar om jouw bedrijf vooruit te helpen? Neem vandaag nog contact met ons op.',
    'contact.name': 'Jouw Naam',
    'contact.namePlaceholder': 'Jan de Vries',
    'contact.email': 'E-mailadres',
    'contact.emailPlaceholder': 'jan@voorbeeld.nl',
    'contact.message': 'Jouw Bericht',
    'contact.messagePlaceholder': 'Vertel ons over jouw project...',
    'contact.send': 'Verzend Bericht',
    'contact.emailUs': 'E-mail Ons',
    'contact.delivery': 'Snelle Levering',
    'contact.deliveryDesc': 'Wij geven prioriteit aan snelle doorlooptijden zonder concessies te doen aan kwaliteit.',
    'contact.visuals': 'Visuele Excellence',
    'contact.visualsDesc': 'Prachtige, moderne ontwerpen creëren die jouw project laten opvallen.',
    'contact.success': 'Bericht Verzonden!',
    'contact.successDesc': 'We nemen binnen 24 uur contact met je op.',

    // Terms
    'terms.title': 'Algemene Voorwaarden FlipForward',
    'terms.lastUpdated': 'Laatst bijgewerkt',
    'terms.intro': 'Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten tussen FlipForward (onderdeel van de eenmanszaak Finn Vangronsveld / ATLAZ Records, KBO: BE1033868758) en de Opdrachtgever.',
    'terms.art1.title': 'Artikel 1: Het "Website as a Service" (WaaS) Model',
    'terms.art1.p1': 'FlipForward levert webdesign en hosting aan de hand van een abonnementsmodel. De Opdrachtgever koopt de website niet, maar verkrijgt een exclusief gebruiksrecht zolang het maandelijkse abonnement actief is.',
    'terms.art1.p2': 'Alle door FlipForward ontwikkelde websites, inclusief code, ontwerpen, AI-implementaties en licenties, blijven te allen tijde intellectueel eigendom van FlipForward.',
    'terms.art2.title': 'Artikel 2: Oplevering en Inhoud',
    'terms.art2.p1': 'FlipForward streeft naar een oplevering van de initiële website (Proof of Concept) binnen 5 werkdagen. Deze termijn gaat pas in nadat de opstartfactuur is voldaan én alle benodigde inhoud (teksten, afbeeldingen, logo\'s) door de Opdrachtgever is aangeleverd.',
    'terms.art2.p2': 'Indien de Opdrachtgever nalaat tijdig materiaal aan te leveren, kan dit de oplevertermijn vertragen. Dit geeft geen recht op korting of schadevergoeding.',
    'terms.art2.p3': 'Bij de initiële bouw zijn maximaal twee (2) feedbackrondes inbegrepen.',
    'terms.art3.title': 'Artikel 3: Abonnement en Onderhoud',
    'terms.art3.p1': 'Na de livegang of goedkeuring van de website start het maandelijkse abonnement van € 50,- (excl. BTW).',
    'terms.art3.p2': 'Dit abonnement omvat hosting, domeinnaamregistratie, licentiekosten voor gebruikte tools, en klein technisch onderhoud tot maximaal 30 minuten per maand.',
    'terms.art3.p3': 'Aanpassingen die buiten de initiële scope vallen of langer dan 30 minuten in beslag nemen (meerwerk), worden na overleg gefactureerd tegen het uurtarief van € 100,- (excl. BTW).',
    'terms.art4.title': 'Artikel 4: Betaling en Wanbetaling',
    'terms.art4.p1': 'Facturen dienen binnen 14 dagen na factuurdatum te worden voldaan.',
    'terms.art4.p2': 'Bij het uitblijven van betaling na deze termijn, ontvangt de Opdrachtgever een herinnering. Blijft betaling daarna uit, dan is FlipForward gerechtigd de website (tijdelijk) offline te halen tot het volledige bedrag is voldaan.',
    'terms.art4.p3': 'Opstartkosten dienen voorafgaand aan de start van de werkzaamheden te worden voldaan.',
    'terms.art5.title': 'Artikel 5: Opzegging van het Abonnement',
    'terms.art5.p1': 'Het abonnement is maandelijks opzegbaar door de Opdrachtgever.',
    'terms.art5.p2': 'Bij opzegging vervalt het in Artikel 1 genoemde gebruiksrecht. De website en bijbehorende bestanden worden aan het einde van de lopende facturatieperiode permanent van de servers verwijderd. Er vindt geen overdracht van code of websitebestanden naar de Opdrachtgever plaats.',
    'terms.art6.title': 'Artikel 6: Aansprakelijkheid',
    'terms.art6.p1': 'FlipForward spant zich in om de website en gekoppelde AI-tools optimaal te laten functioneren, maar kan geen 100% uptime of foutloze werking van externe (AI-)software garanderen.',
    'terms.art6.p2': 'De aansprakelijkheid van FlipForward voor directe of indirecte schade is te allen tijde beperkt tot maximaal het factuurbedrag van de afgelopen drie (3) maanden van de desbetreffende opdracht.',
    'terms.art7.title': 'Artikel 7: Toepasselijk Recht',
    'terms.art7.p1': 'Op alle overeenkomsten tussen FlipForward en de Opdrachtgever is uitsluitend het Belgisch recht van toepassing. Geschillen zullen worden voorgelegd aan de bevoegde rechtbank in het arrondissement waar FlipForward is gevestigd.',

    // Privacy Policy
    'privacy.title': 'Privacybeleid FlipForward',
    'privacy.lastUpdated': 'Laatst bijgewerkt',
    'privacy.intro': 'FlipForward (onderdeel van ATLAZ Records, KBO: BE1033868758) hecht veel waarde aan jouw privacy. In dit privacybeleid leggen we uit welke persoonsgegevens we verzamelen, waarom we dit doen en wat jouw rechten zijn.',
    'privacy.section1.title': '1. Welke gegevens verzamelen we?',
    'privacy.section1.text': 'Wanneer je ons contactformulier invult of een abonnement voor webdesign bij ons afneemt, verzamelen we de volgende gegevens:',
    'privacy.section1.items': 'Voor- en achternaam|Bedrijfsnaam en KBO/BTW-nummer|E-mailadres en telefoonnummer|Facturatie- en betaalgegevens',
    'privacy.section2.title': '2. Waarom verzamelen we deze gegevens?',
    'privacy.section2.text': 'Wij gebruiken jouw gegevens uitsluitend voor:',
    'privacy.section2.items': 'Het bouwen, hosten en onderhouden van jouw website.|Het afhandelen van betalingen en facturatie (via onze partner Dexxter).|Om contact met je op te nemen over je project of supportvragen.',
    'privacy.section3.title': '3. Hoe lang bewaren we je gegevens?',
    'privacy.section3.text': 'We bewaren je persoonsgegevens niet langer dan strikt nodig is om de doelen te realiseren waarvoor je gegevens worden verzameld. Facturatiegegevens worden wettelijk 7 jaar bewaard ter voldoening aan de Belgische belastingwetgeving.',
    'privacy.section4.title': '4. Delen van gegevens met derden',
    'privacy.section4.text': 'FlipForward verkoopt jouw gegevens niet aan derden en verstrekt deze uitsluitend indien dit nodig is voor de uitvoering van onze overeenkomst met jou (bijvoorbeeld hostingpartijen of facturatiesoftware) of om te voldoen aan een wettelijke verplichting.',
    'privacy.section5.title': '5. Jouw rechten (GDPR)',
    'privacy.section5.text': 'Je hebt het recht om je persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heb je het recht om je eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van jouw persoonsgegevens door FlipForward. Stuur hiervoor een e-mail naar: info@flipforward.be.',
    'privacy.section6.title': '6. Cookies',
    'privacy.section6.text': 'Onze website maakt gebruik van functionele cookies om de website optimaal te laten werken. Ook gebruiken wij analysetools om te analyseren hoe bezoekers onze website gebruiken.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
