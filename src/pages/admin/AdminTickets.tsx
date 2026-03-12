import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

const statusOptions = [
  { value: 'open', label: 'Open', className: 'bg-accent/20 text-accent' },
  { value: 'in_progress', label: 'In behandeling', className: 'bg-yellow-500/20 text-yellow-600' },
  { value: 'closed', label: 'Gesloten', className: 'bg-muted text-muted-foreground' },
];

const AdminTickets = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTickets = async () => {
    const { data } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false });
    setTickets(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchTickets(); }, []);

  const updateStatus = async (ticketId: string, status: string) => {
    await supabase.from('tickets').update({ status, updated_at: new Date().toISOString() }).eq('id', ticketId);
    fetchTickets();
    if (selectedTicket?.id === ticketId) setSelectedTicket((t: any) => ({ ...t, status }));
    toast({ title: `Status bijgewerkt naar ${statusOptions.find(s => s.value === status)?.label}` });
  };

  const sendReply = async () => {
    if (!selectedTicket || !reply.trim()) return;
    await supabase.from('tickets').update({
      admin_reply: reply.trim(),
      updated_at: new Date().toISOString(),
    }).eq('id', selectedTicket.id);
    toast({ title: 'Antwoord verstuurd' });
    setReply('');
    fetchTickets();
    setSelectedTicket((t: any) => ({ ...t, admin_reply: reply.trim() }));
  };

  const getStatusStyle = (status: string) => statusOptions.find(s => s.value === status)?.className || '';

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Website-aanvragen</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Ticket list */}
        <div className="lg:col-span-1 space-y-2 max-h-[70vh] overflow-auto">
          {loading ? (
            <p className="text-muted-foreground p-4">Laden...</p>
          ) : tickets.length === 0 ? (
            <p className="text-muted-foreground p-4">Geen aanvragen gevonden.</p>
          ) : tickets.map((ticket) => (
            <Card
              key={ticket.id}
              className={`p-3 border-border cursor-pointer transition-colors hover:bg-muted/50 ${selectedTicket?.id === ticket.id ? 'ring-2 ring-accent' : ''}`}
              onClick={() => { setSelectedTicket(ticket); setReply(ticket.admin_reply || ''); }}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-foreground text-sm truncate">{ticket.subject}</h3>
                <Badge className={`text-xs shrink-0 ${getStatusStyle(ticket.status)}`}>
                  {statusOptions.find(s => s.value === ticket.status)?.label}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(ticket.created_at).toLocaleDateString('nl-BE')}
              </p>
            </Card>
          ))}
        </div>

        {/* Ticket detail */}
        <div className="lg:col-span-2">
          {selectedTicket ? (
            <Card className="p-5 border-border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground">{selectedTicket.subject}</h2>
                  <p className="text-xs text-muted-foreground">
                    {new Date(selectedTicket.created_at).toLocaleString('nl-BE')} · ID: {selectedTicket.id.slice(0, 8)}
                  </p>
                </div>
                <Select value={selectedTicket.status} onValueChange={(val) => updateStatus(selectedTicket.id, val)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(s => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-muted p-4 rounded-md mb-4">
                <p className="text-sm text-foreground whitespace-pre-wrap">{selectedTicket.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Admin Antwoord</label>
                <Textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={4}
                  placeholder="Typ je antwoord..."
                  className="bg-background border-border resize-none"
                />
                <Button className="mt-3" onClick={sendReply} disabled={!reply.trim()}>
                  <Send className="w-4 h-4 mr-1" /> Antwoord Opslaan
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center border-border">
              <p className="text-muted-foreground">Selecteer een aanvraag om details te bekijken</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTickets;
