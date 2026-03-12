import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/Logo';
import { Plus, Globe, LogOut, Shield } from 'lucide-react';

const statusColors: Record<string, string> = {
  open: 'bg-accent/20 text-accent',
  'in_progress': 'bg-yellow-500/20 text-yellow-600',
  closed: 'bg-muted text-muted-foreground',
};

const Dashboard = () => {
  const { user, isAdmin, signOut } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      const { data } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });
      setTickets(data || []);
      setLoading(false);
    };
    if (user) fetchTickets();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="h-7 w-auto text-foreground" />
            <span className="font-bold text-foreground">FlipForward</span>
          </Link>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  <Shield className="w-4 h-4 mr-1" /> Admin
                </Button>
              </Link>
            )}
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-1" /> Uitloggen
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mijn Aanvragen</h1>
            <p className="text-muted-foreground text-sm">Bekijk de status van je website-aanvragen</p>
          </div>
          <Link to="/tickets/new">
            <Button>
              <Plus className="w-4 h-4 mr-1" /> Nieuwe Aanvraag
            </Button>
          </Link>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Laden...</p>
        ) : tickets.length === 0 ? (
          <Card className="p-8 text-center border-border">
            <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-1">Geen tickets</h3>
            <p className="text-muted-foreground text-sm mb-4">Je hebt nog geen tickets ingediend.</p>
            <Link to="/tickets/new">
              <Button><Plus className="w-4 h-4 mr-1" /> Maak je eerste ticket</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="p-4 border-border hover:shadow-card transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground truncate">{ticket.subject}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-1 mt-1">{ticket.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(ticket.created_at).toLocaleDateString('nl-BE')}
                    </p>
                  </div>
                  <Badge className={statusColors[ticket.status] || 'bg-muted text-muted-foreground'}>
                    {ticket.status === 'open' ? 'Open' : ticket.status === 'in_progress' ? 'In behandeling' : 'Gesloten'}
                  </Badge>
                </div>
                {ticket.admin_reply && (
                  <div className="mt-3 p-3 bg-muted rounded-md">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Antwoord van FlipForward:</p>
                    <p className="text-sm text-foreground">{ticket.admin_reply}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
