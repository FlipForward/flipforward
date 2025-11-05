import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Build Something <span className="text-accent">Amazing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to flip your business forward? Get in touch with us today.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-gradient-card border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                  Your Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background border-border focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background border-border focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="bg-background border-border focus:border-accent resize-none"
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Send Message
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 bg-gradient-card border-border hover:border-accent/50 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Email Us</h3>
                  <p className="text-muted-foreground">hello@flipforward.com</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border hover:border-accent/50 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Live Chat</h3>
                  <p className="text-muted-foreground">Available Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-accent border-accent/50">
              <h3 className="text-xl font-bold mb-2 text-white">Start Your Project</h3>
              <p className="text-white/90 mb-4">
                Get a free consultation and project estimate within 48 hours.
              </p>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  No commitment required
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  Fast response time
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  Expert guidance
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
