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
      tags: ['React', 'Node.js', 'Stripe'],
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      titleKey: 'portfolio.project2.title',
      categoryKey: 'portfolio.project2.category',
      descKey: 'portfolio.project2.desc',
      tags: ['TypeScript', 'D3.js', 'API'],
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      titleKey: 'portfolio.project3.title',
      categoryKey: 'portfolio.project3.category',
      descKey: 'portfolio.project3.desc',
      tags: ['Design', 'CMS', 'SEO'],
      gradient: 'from-orange-500/20 to-red-500/20'
    },
    {
      titleKey: 'portfolio.project4.title',
      categoryKey: 'portfolio.project4.category',
      descKey: 'portfolio.project4.desc',
      tags: ['Next.js', 'Animation', 'A/B Testing'],
      gradient: 'from-green-500/20 to-emerald-500/20'
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('portfolio.title')} <span className="text-accent">{t('portfolio.titleAccent')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className={`p-8 bg-gradient-card border-border hover:shadow-[0_0_30px_hsl(10_89%_55%/0.3)] transition-all duration-300 cursor-pointer overflow-hidden relative ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="outline" className="text-accent border-accent/50">
                    {t(project.categoryKey)}
                  </Badge>
                  <ExternalLink className="w-5 h-5 text-muted-foreground" />
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  {t(project.titleKey)}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {t(project.descKey)}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="bg-secondary/50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
