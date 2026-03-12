import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminMessages = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const markAsRead = async (id: string) => {
    await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
    setMessages(msgs => msgs.map(m => m.id === id ? { ...m, is_read: true } : m));
    toast({ title: 'Gemarkeerd als gelezen' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Contactberichten</h1>
      {loading ? (
        <p className="text-muted-foreground">Laden...</p>
      ) : messages.length === 0 ? (
        <Card className="p-8 text-center border-border">
          <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Nog geen berichten ontvangen.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <Card key={msg.id} className={`p-4 border-border ${!msg.is_read ? 'border-l-4 border-l-accent' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground text-sm">{msg.name}</h3>
                    {!msg.is_read && <Badge className="bg-accent/20 text-accent text-xs">Nieuw</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{msg.email} · {new Date(msg.created_at).toLocaleString('nl-BE')}</p>
                  <p className="text-sm text-foreground whitespace-pre-wrap">{msg.message}</p>
                </div>
                {!msg.is_read && (
                  <Button variant="outline" size="sm" onClick={() => markAsRead(msg.id)}>
                    <Check className="w-4 h-4 mr-1" /> Gelezen
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
