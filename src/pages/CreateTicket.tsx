import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import { Send, ArrowLeft } from 'lucide-react';

const CreateTicket = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const { error } = await supabase.from('tickets').insert({
      user_id: user.id,
      subject: subject.trim(),
      description: description.trim(),
    });

    if (error) {
      toast({ title: 'Fout', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Ticket ingediend!', description: 'We nemen zo snel mogelijk contact met je op.' });
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
        <h1 className="text-2xl font-bold text-foreground mb-6">Nieuw Ticket</h1>
        <Card className="p-6 border-border">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Onderwerp</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Bijv. Ik wil een website laten bouwen"
                required
                maxLength={200}
                className="bg-background border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Beschrijving</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beschrijf je vraag of verzoek zo gedetailleerd mogelijk..."
                required
                maxLength={2000}
                rows={8}
                className="bg-background border-border resize-none"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Versturen...' : 'Ticket Indienen'}
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateTicket;
