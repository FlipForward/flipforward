import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'nl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.getStarted': 'Get Started',
    
    // Hero
    'hero.title1': 'We Build Websites That',
    'hero.title2': 'Flip Your Business Forward',
    'hero.description': 'Transform your digital presence with cutting-edge web solutions that captivate, convert, and scale your business.',
    'hero.startProject': 'Start Your Project',
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
    'services.title': 'Services That',
    'services.titleAccent': 'Scale',
    'services.subtitle': 'Comprehensive web solutions tailored to your business goals',
    'services.webdev.title': 'Web Development',
    'services.webdev.desc': 'Custom-coded websites built with modern frameworks and best practices for optimal performance.',
    'services.design.title': 'UI/UX Design',
    'services.design.desc': 'Beautiful, intuitive designs that engage users and drive conversions through thoughtful experiences.',
    'services.mobile.title': 'Mobile First',
    'services.mobile.desc': 'Responsive designs that look stunning and function flawlessly on every device and screen size.',
    'services.seo.title': 'SEO Optimization',
    'services.seo.desc': 'Strategic optimization to boost your search rankings and drive organic traffic to your site.',
    'services.performance.title': 'Performance',
    'services.performance.desc': 'Lightning-fast load times and smooth interactions that keep visitors engaged and coming back.',
    'services.growth.title': 'Growth Strategy',
    'services.growth.desc': 'Data-driven strategies to scale your digital presence and achieve measurable business results.',
    
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
    'about.titleAccent': 'Me',
    'about.subtitle': 'A student with a passion for technology',
    'about.description': "I'm a student with a deep passion for everything related to technology. Whether it's coding, designing, or exploring the latest tech trends, I love bringing ideas to life through web development. I believe in creating digital experiences that are not only functional but also visually stunning.",
    'about.passion.title': 'Technology Enthusiast',
    'about.passion.desc': 'Constantly exploring new technologies and staying updated with the latest trends in web development.',
    'about.learning.title': 'Always Learning',
    'about.learning.desc': 'As a student, I\'m continuously expanding my skills and knowledge in modern web technologies.',
    'about.dedication.title': 'Dedicated & Reliable',
    'about.dedication.desc': 'Committed to delivering quality work on time with attention to detail and visual excellence.',
    
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
    'contact.emailUs': 'Email Me',
    'contact.delivery': 'Fast Delivery',
    'contact.deliveryDesc': 'I prioritize quick turnaround times without compromising on quality.',
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
    'privacy.section5.text': 'You have the right to view, correct, or delete your personal data. In addition, you have the right to withdraw any consent for data processing or to object to the processing of your personal data by FlipForward. Please send an email to: finnvangronsveld@gmail.com.',
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
    'hero.title1': 'Wij Bouwen Websites Die',
    'hero.title2': 'Uw Bedrijf Vooruit Helpen',
    'hero.description': 'Transformeer uw digitale aanwezigheid met geavanceerde weboplossingen die boeien, converteren en uw bedrijf laten groeien.',
    'hero.startProject': 'Start Uw Project',
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
    'services.title': 'Diensten Die',
    'services.titleAccent': 'Schalen',
    'services.subtitle': 'Uitgebreide weboplossingen afgestemd op uw bedrijfsdoelen',
    'services.webdev.title': 'Webontwikkeling',
    'services.webdev.desc': 'Op maat gemaakte websites gebouwd met moderne frameworks en best practices voor optimale prestaties.',
    'services.design.title': 'UI/UX Design',
    'services.design.desc': 'Prachtige, intuïtieve ontwerpen die gebruikers betrekken en conversies stimuleren door doordachte ervaringen.',
    'services.mobile.title': 'Mobile First',
    'services.mobile.desc': 'Responsieve ontwerpen die er geweldig uitzien en foutloos functioneren op elk apparaat en schermformaat.',
    'services.seo.title': 'SEO Optimalisatie',
    'services.seo.desc': 'Strategische optimalisatie om uw zoekresultaten te verbeteren en organisch verkeer naar uw site te leiden.',
    'services.performance.title': 'Prestaties',
    'services.performance.desc': 'Bliksemsnelle laadtijden en soepele interacties die bezoekers betrokken houden.',
    'services.growth.title': 'Groeistrategie',
    'services.growth.desc': 'Data-gedreven strategieën om uw digitale aanwezigheid te vergroten en meetbare bedrijfsresultaten te behalen.',
    
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
    'about.titleAccent': 'Mij',
    'about.subtitle': 'Een student met een passie voor technologie',
    'about.description': "Ik ben een student met een diepe passie voor alles wat met technologie te maken heeft. Of het nu gaat om programmeren, ontwerpen of het verkennen van de nieuwste tech-trends, ik vind het geweldig om ideeën tot leven te brengen via webontwikkeling. Ik geloof in het creëren van digitale ervaringen die niet alleen functioneel zijn, maar ook visueel verbluffend.",
    'about.passion.title': 'Technologie Liefhebber',
    'about.passion.desc': 'Constant nieuwe technologieën verkennen en op de hoogte blijven van de nieuwste trends in webontwikkeling.',
    'about.learning.title': 'Altijd Lerend',
    'about.learning.desc': 'Als student breid ik voortdurend mijn vaardigheden en kennis uit in moderne webtechnologieën.',
    'about.dedication.title': 'Toegewijd & Betrouwbaar',
    'about.dedication.desc': 'Toegewijd aan het leveren van kwaliteitswerk op tijd met aandacht voor detail en visuele excellentie.',
    
    // Contact
    'contact.title': 'Laten We Iets',
    'contact.titleAccent': 'Geweldigs Bouwen',
    'contact.subtitle': 'Klaar om uw bedrijf vooruit te helpen? Neem vandaag nog contact met ons op.',
    'contact.name': 'Uw Naam',
    'contact.namePlaceholder': 'Jan de Vries',
    'contact.email': 'E-mailadres',
    'contact.emailPlaceholder': 'jan@voorbeeld.nl',
    'contact.message': 'Uw Bericht',
    'contact.messagePlaceholder': 'Vertel ons over uw project...',
    'contact.send': 'Verzend Bericht',
    'contact.emailUs': 'E-mail Mij',
    'contact.delivery': 'Snelle Levering',
    'contact.deliveryDesc': 'Ik geef prioriteit aan snelle doorlooptijden zonder concessies te doen aan kwaliteit.',
    'contact.visuals': 'Visuele Excellence',
    'contact.visualsDesc': 'Prachtige, moderne ontwerpen creëren die uw project laten opvallen.',
    'contact.success': 'Bericht Verzonden!',
    'contact.successDesc': 'We nemen binnen 24 uur contact met u op.',

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
    'privacy.section5.text': 'Je hebt het recht om je persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heb je het recht om je eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van jouw persoonsgegevens door FlipForward. Stuur hiervoor een e-mail naar: finnvangronsveld@gmail.com.',
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
