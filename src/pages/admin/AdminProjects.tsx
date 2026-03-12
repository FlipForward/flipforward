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
import { Plus, Pencil, Trash2, LayoutGrid, List, Phone, Mail, User } from 'lucide-react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';

const statusOptions = [
  { value: 'voorstel', label: 'Voorstel', color: 'bg-blue-500/20 text-blue-600', border: 'border-t-blue-500' },
  { value: 'prototype', label: 'Prototype', color: 'bg-purple-500/20 text-purple-600', border: 'border-t-purple-500' },
  { value: 'gecontacteerd', label: 'Gecontacteerd', color: 'bg-yellow-500/20 text-yellow-600', border: 'border-t-yellow-500' },
  { value: 'bezig', label: 'Bezig', color: 'bg-accent/20 text-accent', border: 'border-t-accent' },
  { value: 'wacht_op_bevestiging', label: 'Wacht op\nbevestiging', color: 'bg-orange-500/20 text-orange-600', border: 'border-t-orange-500' },
  { value: 'afgerond', label: 'Afgerond', color: 'bg-green-500/20 text-green-600', border: 'border-t-green-500' },
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

// Draggable project card for Kanban
const KanbanCard = ({ project, onEdit, onDelete }: { project: Project; onEdit: (p: Project) => void; onDelete: (id: string) => void }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: project.id,
    data: { project },
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)`, opacity: isDragging ? 0.4 : 1 }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card className="p-3 border-border bg-card hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
        <h4 className="font-medium text-sm text-foreground truncate mb-1.5">{project.name}</h4>
        {(project.client_name || project.client_email || project.client_phone) && (
          <div className="space-y-0.5 mb-1.5">
            {project.client_name && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <User className="w-3 h-3 shrink-0" /> {project.client_name}
              </p>
            )}
            {project.client_email && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Mail className="w-3 h-3 shrink-0" /> <span className="truncate">{project.client_email}</span>
              </p>
            )}
            {project.client_phone && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Phone className="w-3 h-3 shrink-0" /> {project.client_phone}
              </p>
            )}
          </div>
        )}
        {project.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{project.description}</p>
        )}
        <div className="flex items-center justify-between pt-1 border-t border-border">
          <span className="text-[10px] text-muted-foreground">
            {new Date(project.created_at).toLocaleDateString('nl-BE')}
          </span>
          <div className="flex gap-0.5" onClick={e => e.stopPropagation()} onPointerDown={e => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onEdit(project)}>
              <Pencil className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => onDelete(project.id)}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Droppable column
const KanbanColumn = ({ status, projects, onEdit, onDelete }: {
  status: typeof statusOptions[0];
  projects: Project[];
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: status.value });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col min-w-[200px] w-full rounded-lg border-t-4 ${status.border} bg-muted/30 transition-colors ${isOver ? 'bg-muted/60 ring-2 ring-primary/20' : ''}`}
    >
      <div className="px-3 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge className={`text-[10px] px-1.5 py-0 ${status.color}`}>
            {status.label.replace('\n', ' ')}
          </Badge>
          <span className="text-xs text-muted-foreground font-medium">{projects.length}</span>
        </div>
      </div>
      <div className="flex-1 px-2 pb-2 space-y-2 min-h-[80px]">
        {projects.map(p => (
          <KanbanCard key={p.id} project={p} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

// Overlay card shown while dragging
const DragOverlayCard = ({ project }: { project: Project }) => (
  <Card className="p-3 border-border bg-card shadow-xl w-[200px] rotate-2">
    <h4 className="font-medium text-sm text-foreground truncate">{project.name}</h4>
    {project.client_name && <p className="text-xs text-muted-foreground">{project.client_name}</p>}
  </Card>
);

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

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
      client_phone: project.client_phone || '',
      description: project.description || '',
      status: project.status,
      notes: project.notes || '',
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
      client_phone: form.client_phone.trim() || null,
      description: form.description.trim() || null,
      status: form.status as any,
      notes: form.notes.trim() || null,
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
  const getStatusLabel = (status: string) => statusOptions.find(s => s.value === status)?.label?.replace('\n', ' ') || status;

  const filtered = filterStatus === 'all' ? projects : projects.filter(p => p.status === filterStatus);

  // Drag handlers
  const handleDragStart = (event: DragStartEvent) => {
    const project = projects.find(p => p.id === event.active.id);
    setActiveProject(project || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveProject(null);
    const { active, over } = event;
    if (!over) return;

    const projectId = active.id as string;
    const newStatus = over.id as string;
    const project = projects.find(p => p.id === projectId);

    if (project && project.status !== newStatus && statusOptions.some(s => s.value === newStatus)) {
      // Optimistic update
      setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: newStatus } : p));
      quickStatusUpdate(projectId, newStatus);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Opdrachten</h1>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex border border-border rounded-md overflow-hidden">
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none h-8 px-2"
              onClick={() => setViewMode('kanban')}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none h-8 px-2"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {viewMode === 'list' && (
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter op status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle statussen</SelectItem>
                {statusOptions.map(s => (
                  <SelectItem key={s.value} value={s.value}>{s.label.replace('\n', ' ')}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

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
                <div className="grid grid-cols-3 gap-3">
                  <Input placeholder="Klant naam" value={form.client_name} onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))} />
                  <Input placeholder="Klant email" value={form.client_email} onChange={e => setForm(f => ({ ...f, client_email: e.target.value }))} />
                  <Input placeholder="Telefoonnummer" value={form.client_phone} onChange={e => setForm(f => ({ ...f, client_phone: e.target.value }))} />
                </div>
                <Select value={form.status} onValueChange={val => setForm(f => ({ ...f, status: val }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(s => (
                      <SelectItem key={s.value} value={s.value}>{s.label.replace('\n', ' ')}</SelectItem>
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
      ) : viewMode === 'kanban' ? (
        /* ─── KANBAN VIEW ─── */
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-6 gap-3 min-h-[60vh]">
            {statusOptions.map(status => (
              <KanbanColumn
                key={status.value}
                status={status}
                projects={projects.filter(p => p.status === status.value)}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
          <DragOverlay>
            {activeProject ? <DragOverlayCard project={activeProject} /> : null}
          </DragOverlay>
        </DndContext>
      ) : (
        /* ─── LIST VIEW ─── */
        filtered.length === 0 ? (
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
                    {(project.client_name || project.client_email || project.client_phone) && (
                      <p className="text-sm text-muted-foreground">
                        {[project.client_name, project.client_email, project.client_phone].filter(Boolean).join(' · ')}
                      </p>
                    )}
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
                          <SelectItem key={s.value} value={s.value}>{s.label.replace('\n', ' ')}</SelectItem>
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
        )
      )}
    </div>
  );
};

export default AdminProjects;
