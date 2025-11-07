import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from 'react-intersection-observer';

const Portfolio = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const projects = [
    {
      titleKey: 'portfolio.project1.title',
      categoryKey: 'portfolio.project1.category',
      descKey: 'portfolio.project1.desc',
      link: 'https://finnvangronsveld.be',
      gradient: 'from-orange-500/20 to-red-500/20'
    },
    {
      titleKey: 'portfolio.project2.title',
      categoryKey: 'portfolio.project2.category',
      descKey: 'portfolio.project2.desc',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      titleKey: 'portfolio.project3.title',
      categoryKey: 'portfolio.project3.category',
      descKey: 'portfolio.project3.desc',
      link: 'https://hyperdrivefestival.be',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      titleKey: 'portfolio.project4.title',
      categoryKey: 'portfolio.project4.category',
      descKey: 'portfolio.project4.desc',
      link: 'https://finnvangronsveld.sinners.be',
      gradient: 'from-green-500/20 to-emerald-500/20'
    }
  ];

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            {t('portfolio.title')} <span className="text-accent">{t('portfolio.titleAccent')}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            {t('portfolio.subtitle')}
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 gap-4 sm:gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className={`p-5 sm:p-8 bg-gradient-card border-border hover:shadow-[0_0_30px_hsl(10_89%_55%/0.3)] transition-all duration-300 cursor-pointer overflow-hidden relative ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => project.link && window.open(project.link, '_blank')}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <Badge variant="outline" className="text-accent border-accent/50 text-xs sm:text-sm">
                    {t(project.categoryKey)}
                  </Badge>
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                </div>

                <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3">
                  {t(project.titleKey)}
                </h3>
                
                <p className="text-sm sm:text-base text-muted-foreground">
                  {t(project.descKey)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
