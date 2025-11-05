import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ServicesWithTranslations from '@/components/ServicesWithTranslations';
import PortfolioWithTranslations from '@/components/PortfolioWithTranslations';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Navigation />
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
