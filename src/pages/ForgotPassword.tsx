import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import { Mail } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast({ title: 'Fout', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'E-mail verstuurd', description: 'Check je inbox voor de resetlink.' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 bg-card border-border">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Logo className="h-8 w-auto text-foreground" />
            <span className="text-xl font-bold text-foreground">FlipForward</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Wachtwoord Vergeten</h1>
          <p className="text-muted-foreground mt-1">Voer je e-mail in om een resetlink te ontvangen</p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">E-mail</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jouw@email.com"
              required
              className="bg-background border-border"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Laden...' : 'Resetlink versturen'}
            <Mail className="ml-2 w-4 h-4" />
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/login" className="text-accent hover:underline">Terug naar inloggen</Link>
        </p>
      </Card>
    </div>
  );
};

export default ForgotPassword;
