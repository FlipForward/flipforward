import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import VariantSwitcher from "@/components/VariantSwitcher";

const Index = () => (
  <div className="min-h-screen relative">
    <Navigation />
    <main id="main">
      <Hero />
      <About />
      <Services />
      <Pricing />
      <HowItWorks />
      <Portfolio />
      <Testimonials />
      <Faq />
      <Contact />
    </main>
    <Footer />
    <ScrollToTop />
    <VariantSwitcher />
  </div>
);

export default Index;
