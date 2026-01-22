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
    'portfolio.project3.title': 'Hyperdrive Festival',
    'portfolio.project3.category': 'Event Showcase',
    'portfolio.project3.desc': 'A school group project for a fictive festival website with event information and ticketing.',
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
    'portfolio.project3.title': 'Hyperdrive Festival',
    'portfolio.project3.category': 'Evenement Showcase',
    'portfolio.project3.desc': 'Een school groepsproject voor een fictieve festival website met evenementinformatie en ticketing.',
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
