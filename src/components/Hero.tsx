import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TypingAnimation from './TypingAnimation';
import { useState, useEffect } from 'react';

const Hero = () => {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30 overflow-hidden">
        <div 
          className="absolute top-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          style={{ 
            transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.3}px)`,
            animation: 'float 20s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute top-40 right-20 w-80 h-80 bg-primary/15 rounded-full blur-3xl"
          style={{ 
            transform: `translate(${-scrollY * 0.15}px, ${scrollY * 0.4}px)`,
            animation: 'float 25s ease-in-out infinite 5s'
          }}
        />
        <div 
          className="absolute bottom-20 left-1/3 w-72 h-72 bg-accent/15 rounded-full blur-3xl"
          style={{ 
            transform: `translate(${scrollY * 0.25}px, ${scrollY * 0.5}px)`,
            animation: 'float 30s ease-in-out infinite 10s'
          }}
        />
      </div>

      <div className="container mx-auto px-6 pt-20 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <TypingAnimation />
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t('hero.title1')}
            <span className="block text-transparent bg-clip-text bg-gradient-accent mt-2">
              {t('hero.title2')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
          } hover:scale-110`}
          aria-label="Scroll to about section"
        >
          <ChevronDown className="w-10 h-10 text-accent animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
