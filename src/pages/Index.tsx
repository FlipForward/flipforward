import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

/** Homepage: hero, werk, prijzen, wie en hoe, vragen, contact. */
const Index = () => (
  <div className="relative min-h-screen">
    <Navigation />
    <main id="main">
      <Hero />
      <Portfolio />
      <Pricing />
      <About />
      <Testimonials />
      <Faq />
      <Contact />
    </main>
    <Footer />
    <ScrollToTop />
  </div>
);

export default Index;
