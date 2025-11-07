import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TypingAnimation from './TypingAnimation';
import { useState, useEffect } from 'react';

const Hero = () => {
  const { t } = useLanguage();
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrow(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Orange glow from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <TypingAnimation />
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            {t('hero.title1')}
            <span className="block text-transparent bg-clip-text bg-gradient-accent mt-2">
              {t('hero.title2')}
            </span>
          </h1>
          
          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button variant="hero" size="lg" onClick={scrollToContact}>
              {t('hero.startProject')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => {
              const element = document.getElementById('portfolio');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}>
              {t('hero.viewWork')}
            </Button>
          </div>

        </div>
      </div>

      {/* Scroll down arrow - positioned at bottom center */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
        <button
          onClick={scrollToAbout}
          className={`transition-all duration-500 ${
            showArrow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          aria-label="Scroll to about section"
        >
          <ChevronDown className="w-10 h-10 text-accent animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
