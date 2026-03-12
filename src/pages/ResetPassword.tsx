import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import { KeyRound } from 'lucide-react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('type=recovery')) {
      setReady(true);
    }
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: 'Te kort', description: 'Minimaal 6 tekens', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast({ title: 'Fout', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Wachtwoord bijgewerkt!' });
      navigate('/login');
    }
    setLoading(false);
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Ongeldige of verlopen resetlink.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 bg-card border-border">
        <div className="text-center mb-8">
          <Logo className="h-8 w-auto text-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground">Nieuw Wachtwoord</h1>
        </div>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">Nieuw wachtwoord</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimaal 6 tekens"
              required
              className="bg-background border-border"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Laden...' : 'Wachtwoord opslaan'}
            <KeyRound className="ml-2 w-4 h-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;
