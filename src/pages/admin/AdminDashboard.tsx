import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { FolderKanban, CheckCircle, Clock, Mail } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [totalRes, activeRes, completedRes, unreadRes] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }).neq('status', 'afgerond'),
        supabase.from('projects').select('id', { count: 'exact', head: true }).eq('status', 'afgerond'),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('is_read', false),
      ]);
      setStats({
        totalProjects: totalRes.count || 0,
        activeProjects: activeRes.count || 0,
        completedProjects: completedRes.count || 0,
        unreadMessages: unreadRes.count || 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Totaal Opdrachten', value: stats.totalProjects, icon: FolderKanban, color: 'text-accent' },
    { label: 'Actieve Opdrachten', value: stats.activeProjects, icon: Clock, color: 'text-yellow-500' },
    { label: 'Afgerond', value: stats.completedProjects, icon: CheckCircle, color: 'text-green-500' },
    { label: 'Ongelezen Berichten', value: stats.unreadMessages, icon: Mail, color: 'text-accent' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="p-5 border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
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
