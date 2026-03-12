import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import { Send, ArrowLeft } from 'lucide-react';

const websiteTypes = [
  'Portfolio / Persoonlijke website',
  'Bedrijfswebsite',
  'Webshop / E-commerce',
  'Blog / Content platform',
  'Landing page',
  'Ander type',
];

const CreateTicket = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState('');
  const [websiteType, setWebsiteType] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const subject = `${websiteType} – ${businessName}`;

    const { error } = await supabase.from('tickets').insert({
      user_id: user.id,
      subject: subject.trim(),
      description: `Type website: ${websiteType}\nBedrijf/project: ${businessName}\nBudget: ${budget || 'Niet opgegeven'}\n\n${description.trim()}`,
    });

    if (error) {
      toast({ title: 'Fout', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Aanvraag ingediend!', description: 'We bekijken je voorstel en nemen zo snel mogelijk contact op.' });
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <Logo className="h-7 w-auto text-foreground" />
            <span className="font-bold text-foreground">FlipForward</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-foreground mb-2">Website Aanvragen</h1>
        <p className="text-muted-foreground text-sm mb-6">Vertel ons over het project dat je in gedachten hebt. Wij komen met een voorstel.</p>
        <Card className="p-6 border-border">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Bedrijf / Projectnaam</label>
              <Input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Bijv. Bakkerij De Vries"
                required
                maxLength={100}
                className="bg-background border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Type website</label>
              <Select value={websiteType} onValueChange={setWebsiteType} required>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Selecteer een type..." />
                </SelectTrigger>
                <SelectContent>
                  {websiteTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Budget indicatie <span className="text-muted-foreground font-normal">(optioneel)</span></label>
              <Input
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Bijv. WaaS pakket (€1000 + €50/mnd)"
                maxLength={100}
                className="bg-background border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Beschrijving van je project</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beschrijf wat je nodig hebt: aantal pagina's, gewenste functies, stijl, deadline, referentie-websites..."
                required
                maxLength={2000}
                rows={8}
                className="bg-background border-border resize-none"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading || !websiteType}>
              {loading ? 'Versturen...' : 'Aanvraag Indienen'}
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateTicket;
