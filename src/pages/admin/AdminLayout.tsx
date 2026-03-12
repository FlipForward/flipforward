import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { FolderKanban, Mail, BarChart3, LogOut } from 'lucide-react';

const navItems = [
  { to: '/admin', icon: BarChart3, label: 'Dashboard' },
  { to: '/admin/projects', icon: FolderKanban, label: 'Opdrachten' },
  { to: '/admin/messages', icon: Mail, label: 'Berichten' },
];

const AdminLayout = () => {
  const { isAdmin, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Laden...</p></div>;
  if (!isAdmin) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="h-7 w-auto text-foreground" />
            <span className="font-bold text-foreground">FlipForward</span>
          </Link>
          <p className="text-xs text-accent mt-1 font-medium">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to}>
                <Button variant={active ? 'default' : 'ghost'} className="w-full justify-start" size="sm">
                  <Icon className="w-4 h-4 mr-2" /> {label}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full justify-start text-destructive" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" /> Uitloggen
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
