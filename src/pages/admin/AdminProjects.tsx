import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const statusOptions = [
  { value: 'voorstel', label: 'Voorstel', color: 'bg-blue-500/20 text-blue-600' },
  { value: 'prototype', label: 'Prototype', color: 'bg-purple-500/20 text-purple-600' },
  { value: 'gecontacteerd', label: 'Gecontacteerd', color: 'bg-yellow-500/20 text-yellow-600' },
  { value: 'bezig', label: 'Bezig', color: 'bg-accent/20 text-accent' },
  { value: 'wacht_op_bevestiging', label: 'Wacht op bevestiging', color: 'bg-orange-500/20 text-orange-600' },
  { value: 'afgerond', label: 'Afgerond', color: 'bg-green-500/20 text-green-600' },
];

type Project = {
  id: string;
  name: string;
  client_name: string | null;
  client_email: string | null;
  client_phone: string | null;
  description: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

const emptyForm = { name: '', client_name: '', client_email: '', client_phone: '', description: '', status: 'voorstel', notes: '' };

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { toast } = useToast();

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    setProjects((data as Project[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const openCreate = () => {
    setEditingProject(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setForm({
      name: project.name,
      client_name: project.client_name || '',
      client_email: project.client_email || '',
      description: project.description || '',
      status: project.status,
      notes: project.notes || '',
      budget: project.budget || '',
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast({ title: 'Vul een naam in', variant: 'destructive' });
      return;
    }

    const payload = {
      name: form.name.trim(),
      client_name: form.client_name.trim() || null,
      client_email: form.client_email.trim() || null,
      description: form.description.trim() || null,
      status: form.status as any,
      notes: form.notes.trim() || null,
      budget: form.budget.trim() || null,
      updated_at: new Date().toISOString(),
    };

    if (editingProject) {
      await supabase.from('projects').update(payload).eq('id', editingProject.id);
      toast({ title: 'Opdracht bijgewerkt' });
    } else {
      await supabase.from('projects').insert(payload);
      toast({ title: 'Opdracht aangemaakt' });
    }

    setDialogOpen(false);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('projects').delete().eq('id', id);
    toast({ title: 'Opdracht verwijderd' });
    fetchProjects();
  };

  const quickStatusUpdate = async (id: string, status: string) => {
    await supabase.from('projects').update({ status: status as any, updated_at: new Date().toISOString() }).eq('id', id);
    fetchProjects();
  };

  const getStatusStyle = (status: string) => statusOptions.find(s => s.value === status)?.color || '';
  const getStatusLabel = (status: string) => statusOptions.find(s => s.value === status)?.label || status;

  const filtered = filterStatus === 'all' ? projects : projects.filter(p => p.status === filterStatus);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Opdrachten</h1>
        <div className="flex items-center gap-3">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter op status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle statussen</SelectItem>
              {statusOptions.map(s => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate}><Plus className="w-4 h-4 mr-1" /> Nieuw</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingProject ? 'Opdracht bewerken' : 'Nieuwe opdracht'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 mt-2">
                <Input placeholder="Opdracht naam *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Klant naam" value={form.client_name} onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))} />
                  <Input placeholder="Klant email" value={form.client_email} onChange={e => setForm(f => ({ ...f, client_email: e.target.value }))} />
                </div>
                <Input placeholder="Budget" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} />
                <Select value={form.status} onValueChange={val => setForm(f => ({ ...f, status: val }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(s => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea placeholder="Beschrijving" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} />
                <Textarea placeholder="Notities" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} />
                <Button className="w-full" onClick={handleSave}>{editingProject ? 'Opslaan' : 'Aanmaken'}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Laden...</p>
      ) : filtered.length === 0 ? (
        <Card className="p-8 text-center border-border">
          <p className="text-muted-foreground">Geen opdrachten gevonden.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map(project => (
            <Card key={project.id} className="p-4 border-border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground truncate">{project.name}</h3>
                    <Badge className={`text-xs shrink-0 ${getStatusStyle(project.status)}`}>
                      {getStatusLabel(project.status)}
                    </Badge>
                  </div>
                  {project.client_name && (
                    <p className="text-sm text-muted-foreground">
                      {project.client_name}{project.client_email ? ` · ${project.client_email}` : ''}
                    </p>
                  )}
                  {project.budget && <p className="text-sm text-muted-foreground">Budget: {project.budget}</p>}
                  {project.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>}
                  {project.notes && <p className="text-xs text-muted-foreground mt-1 italic line-clamp-1">📝 {project.notes}</p>}
                  <p className="text-xs text-muted-foreground mt-2">
                    Aangemaakt: {new Date(project.created_at).toLocaleDateString('nl-BE')}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Select value={project.status} onValueChange={val => quickStatusUpdate(project.id, val)}>
                    <SelectTrigger className="w-44 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(s => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(project)}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
