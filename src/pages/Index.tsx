import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ServicesWithTranslations from '@/components/ServicesWithTranslations';
import PortfolioWithTranslations from '@/components/PortfolioWithTranslations';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ServicesWithTranslations />
      <PortfolioWithTranslations />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
