import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ServicesWithTranslations from '@/components/ServicesWithTranslations';
import PortfolioWithTranslations from '@/components/PortfolioWithTranslations';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

import { useEffect, useState } from 'react';

const Index = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowContent(true);
    } else {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen relative">
      {showContent && <Navigation />}
      <Hero />
      <About />
      <ServicesWithTranslations />
      <PortfolioWithTranslations />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
