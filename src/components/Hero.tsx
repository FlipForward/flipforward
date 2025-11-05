import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TypingAnimation from './TypingAnimation';

const Hero = () => {
  const { t } = useLanguage();
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
    </section>
  );
};

export default Hero;
