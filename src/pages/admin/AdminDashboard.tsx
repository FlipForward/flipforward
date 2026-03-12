import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Ticket, Mail, Eye, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ tickets: 0, openTickets: 0, messages: 0, unreadMessages: 0, pageViews: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [ticketsRes, openRes, msgsRes, unreadRes, viewsRes] = await Promise.all([
        supabase.from('tickets').select('id', { count: 'exact', head: true }),
        supabase.from('tickets').select('id', { count: 'exact', head: true }).eq('status', 'open'),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('page_views').select('id', { count: 'exact', head: true }),
      ]);
      setStats({
        tickets: ticketsRes.count || 0,
        openTickets: openRes.count || 0,
        messages: msgsRes.count || 0,
        unreadMessages: unreadRes.count || 0,
        pageViews: viewsRes.count || 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Open Tickets', value: stats.openTickets, total: stats.tickets, icon: Ticket, color: 'text-accent' },
    { label: 'Ongelezen Berichten', value: stats.unreadMessages, total: stats.messages, icon: Mail, color: 'text-accent' },
    { label: 'Pagina Weergaven', value: stats.pageViews, total: null, icon: Eye, color: 'text-accent' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {cards.map(({ label, value, total, icon: Icon, color }) => (
          <Card key={label} className="p-5 border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
                {total !== null && <p className="text-xs text-muted-foreground mt-1">{total} totaal</p>}
              </div>
              <Icon className={`w-8 h-8 ${color} opacity-60`} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
