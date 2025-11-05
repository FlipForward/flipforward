import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'Full Stack Development',
    description: 'Modern e-commerce solution with seamless checkout and inventory management.',
    tags: ['React', 'Node.js', 'Stripe'],
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    title: 'SaaS Dashboard',
    category: 'Web Application',
    description: 'Intuitive analytics dashboard with real-time data visualization.',
    tags: ['TypeScript', 'D3.js', 'API'],
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    title: 'Corporate Website',
    category: 'Brand Identity',
    description: 'Professional corporate presence with engaging storytelling.',
    tags: ['Design', 'CMS', 'SEO'],
    gradient: 'from-orange-500/20 to-red-500/20'
  },
  {
    title: 'Mobile App Landing',
    category: 'Marketing Site',
    description: 'High-converting landing page for mobile app launch.',
    tags: ['Next.js', 'Animation', 'A/B Testing'],
    gradient: 'from-green-500/20 to-emerald-500/20'
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-accent">Work</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transforming ideas into exceptional digital experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="p-8 bg-gradient-card border-border transition-all duration-300 cursor-pointer overflow-hidden relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="outline" className="text-accent border-accent/50">
                    {project.category}
                  </Badge>
                  <ExternalLink className="w-5 h-5 text-muted-foreground" />
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {project.description}
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
