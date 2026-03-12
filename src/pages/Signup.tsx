import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import { UserPlus, Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: 'Wachtwoord te kort', description: 'Minimaal 6 tekens', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) {
      toast({ title: 'Registratie mislukt', description: error.message, variant: 'destructive' });
    } else {
      toast({
        title: 'Bevestig je e-mail',
        description: 'We hebben een bevestigingslink naar je e-mailadres gestuurd.',
      });
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
          <h1 className="text-2xl font-bold text-foreground">Account Aanmaken</h1>
          <p className="text-muted-foreground mt-1">Maak een account om tickets in te dienen</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">Volledige naam</label>
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jan de Vries"
              required
              className="bg-background border-border"
            />
          </div>
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
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">Wachtwoord</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimaal 6 tekens"
                required
                className="bg-background border-border pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Laden...' : 'Registreren'}
            <UserPlus className="ml-2 w-4 h-4" />
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Heb je al een account?{' '}
          <Link to="/login" className="text-accent hover:underline">Inloggen</Link>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
