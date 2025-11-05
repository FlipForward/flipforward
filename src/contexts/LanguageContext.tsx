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
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'nav.getStarted': 'Get Started',
    
    // Hero
    'hero.badge': 'Award-Winning Web Design Agency',
    'hero.title1': 'We Build Websites That',
    'hero.title2': 'Flip Your Business Forward',
    'hero.description': 'Transform your digital presence with cutting-edge web solutions that captivate, convert, and scale your business.',
    'hero.startProject': 'Start Your Project',
    'hero.viewWork': 'View Our Work',
    'hero.stat1': 'Projects Delivered',
    'hero.stat2': 'Client Satisfaction',
    'hero.stat3': 'Industry Experience',
    
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
    'portfolio.project1.title': 'E-Commerce Platform',
    'portfolio.project1.category': 'Full Stack Development',
    'portfolio.project1.desc': 'Modern e-commerce solution with seamless checkout and inventory management.',
    'portfolio.project2.title': 'SaaS Dashboard',
    'portfolio.project2.category': 'Web Application',
    'portfolio.project2.desc': 'Intuitive analytics dashboard with real-time data visualization.',
    'portfolio.project3.title': 'Corporate Website',
    'portfolio.project3.category': 'Brand Identity',
    'portfolio.project3.desc': 'Professional corporate presence with engaging storytelling.',
    'portfolio.project4.title': 'Mobile App Landing',
    'portfolio.project4.category': 'Marketing Site',
    'portfolio.project4.desc': 'High-converting landing page for mobile app launch.',
    
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
    'contact.liveChat': 'Live Chat',
    'contact.availability': 'Available Mon-Fri, 9AM-6PM EST',
    'contact.startProject': 'Start Your Project',
    'contact.consultation': 'Get a free consultation and project estimate within 48 hours.',
    'contact.noCommitment': 'No commitment required',
    'contact.fastResponse': 'Fast response time',
    'contact.expertGuidance': 'Expert guidance',
    'contact.success': 'Message Sent!',
    'contact.successDesc': "We'll get back to you within 24 hours.",
  },
  nl: {
    // Navigation
    'nav.services': 'Diensten',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'nav.getStarted': 'Begin Nu',
    
    // Hero
    'hero.badge': 'Bekroond Webdesign Bureau',
    'hero.title1': 'Wij Bouwen Websites Die',
    'hero.title2': 'Uw Bedrijf Vooruit Helpen',
    'hero.description': 'Transformeer uw digitale aanwezigheid met geavanceerde weboplossingen die boeien, converteren en uw bedrijf laten groeien.',
    'hero.startProject': 'Start Uw Project',
    'hero.viewWork': 'Bekijk Ons Werk',
    'hero.stat1': 'Projecten Opgeleverd',
    'hero.stat2': 'Klanttevredenheid',
    'hero.stat3': 'Ervaring in de Sector',
    
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
    'portfolio.project1.title': 'E-Commerce Platform',
    'portfolio.project1.category': 'Full Stack Ontwikkeling',
    'portfolio.project1.desc': 'Moderne e-commerce oplossing met naadloze checkout en voorraadbeheer.',
    'portfolio.project2.title': 'SaaS Dashboard',
    'portfolio.project2.category': 'Webapplicatie',
    'portfolio.project2.desc': 'Intuïtief analytics dashboard met real-time datavisualisatie.',
    'portfolio.project3.title': 'Zakelijke Website',
    'portfolio.project3.category': 'Merkidentiteit',
    'portfolio.project3.desc': 'Professionele corporate aanwezigheid met boeiende storytelling.',
    'portfolio.project4.title': 'Mobiele App Landing',
    'portfolio.project4.category': 'Marketing Site',
    'portfolio.project4.desc': 'Hoog-converterende landingspagina voor mobiele app lancering.',
    
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
    'contact.emailUs': 'E-mail Ons',
    'contact.liveChat': 'Live Chat',
    'contact.availability': 'Beschikbaar ma-vr, 9:00-18:00 CET',
    'contact.startProject': 'Start Uw Project',
    'contact.consultation': 'Ontvang binnen 48 uur een gratis consultatie en projectschatting.',
    'contact.noCommitment': 'Geen verplichting',
    'contact.fastResponse': 'Snelle reactietijd',
    'contact.expertGuidance': 'Deskundige begeleiding',
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
