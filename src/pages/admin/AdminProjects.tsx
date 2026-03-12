import { useState } from 'react';
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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type CollisionDetection,
  rectIntersection,
} from '@dnd-kit/core';
import { useDroppable, useDraggable } from '@dnd-kit/core';

const statusOptions = [
  { value: 'voorstel', label: 'Voorstel', color: 'bg-blue-500/20 text-blue-600', border: 'border-t-blue-500' },
  { value: 'prototype', label: 'Prototype', color: 'bg-purple-500/20 text-purple-600', border: 'border-t-purple-500' },
  { value: 'gecontacteerd', label: 'Gecontacteerd', color: 'bg-yellow-500/20 text-yellow-600', border: 'border-t-yellow-500' },
  { value: 'bezig', label: 'Bezig', color: 'bg-accent/20 text-accent', border: 'border-t-accent' },
  { value: 'wacht_op_bevestiging', label: 'Wacht op bevestiging', color: 'bg-orange-500/20 text-orange-600', border: 'border-t-orange-500' },
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

const QUERY_KEY = ['admin-projects'];

// ─── Kanban Card (draggable) ───
const KanbanCard = ({ project, onEdit, onDelete }: { project: Project; onEdit: (p: Project) => void; onDelete: (id: string) => void }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: project.id,
    data: { project },
  });

  const style: React.CSSProperties = {
    ...(transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : {}),
    opacity: isDragging ? 0 : 1,
    transition: isDragging ? 'none' : 'box-shadow 0.2s',
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card className="p-3 border-border bg-card hover:shadow-md cursor-grab active:cursor-grabbing select-none">
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

// ─── Kanban Column (droppable) ───
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
      className={`flex flex-col min-w-[200px] w-full rounded-lg border-t-4 ${status.border} bg-muted/30 transition-all duration-200 ${isOver ? 'bg-muted/60 ring-2 ring-primary/30 scale-[1.01]' : ''}`}
    >
      <div className="px-3 py-2.5 flex items-center gap-2">
        <Badge className={`text-[10px] px-1.5 py-0 ${status.color}`}>
          {status.label}
        </Badge>
        <span className="text-xs text-muted-foreground font-medium">{projects.length}</span>
      </div>
      <div className="flex-1 px-2 pb-2 space-y-2 min-h-[80px]">
        {projects.map(p => (
          <KanbanCard key={p.id} project={p} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

// ─── Drag Overlay ───
const DragOverlayCard = ({ project }: { project: Project }) => (
  <Card className="p-3 border-primary/30 bg-card shadow-2xl w-[200px] rotate-1 scale-105">
    <h4 className="font-medium text-sm text-foreground truncate">{project.name}</h4>
    {project.client_name && <p className="text-xs text-muted-foreground">{project.client_name}</p>}
  </Card>
);

// ─── Main Component ───
const AdminProjects = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Custom collision detection that only targets droppable columns
  const columnCollisionDetection: CollisionDetection = (args) => {
    const statusValues = statusOptions.map(s => s.value);
    const collisions = rectIntersection(args);
    // Only return collisions with droppable columns, not with draggable cards
    const columnCollisions = collisions.filter(c => statusValues.includes(c.id as string));
    return columnCollisions.length > 0 ? columnCollisions : collisions;
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  // ─── Query ───
  const { data: projects = [], isLoading: loading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data as Project[]) || [];
    },
  });

  // ─── Status mutation (drag & drop + quick update) ───
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('projects')
        .update({ status: status as any, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });
      const previous = queryClient.getQueryData<Project[]>(QUERY_KEY);
      queryClient.setQueryData<Project[]>(QUERY_KEY, old =>
        old?.map(p => p.id === id ? { ...p, status } : p) ?? []
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(QUERY_KEY, context?.previous);
      toast({ title: 'Status update mislukt', variant: 'destructive' });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  // ─── Save mutation (create/edit) ───
  const saveMutation = useMutation({
    mutationFn: async (payload: { data: any; id?: string }) => {
      if (payload.id) {
        const { error } = await supabase.from('projects').update(payload.data).eq('id', payload.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert(payload.data);
        if (error) throw error;
      }
    },
    onSuccess: (_data, vars) => {
      toast({ title: vars.id ? 'Opdracht bijgewerkt' : 'Opdracht aangemaakt' });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
    onError: () => toast({ title: 'Opslaan mislukt', variant: 'destructive' }),
  });

  // ─── Delete mutation ───
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });
      const previous = queryClient.getQueryData<Project[]>(QUERY_KEY);
      queryClient.setQueryData<Project[]>(QUERY_KEY, old => old?.filter(p => p.id !== id) ?? []);
      return { previous };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(QUERY_KEY, context?.previous);
      toast({ title: 'Verwijderen mislukt', variant: 'destructive' });
    },
    onSuccess: () => toast({ title: 'Opdracht verwijderd' }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

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

  const handleSave = () => {
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
    saveMutation.mutate({ data: payload, id: editingProject?.id });
    setDialogOpen(false);
  };

  const getStatusStyle = (status: string) => statusOptions.find(s => s.value === status)?.color || '';
  const getStatusLabel = (status: string) => statusOptions.find(s => s.value === status)?.label || status;

  const filtered = filterStatus === 'all' ? projects : projects.filter(p => p.status === filterStatus);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveProject(projects.find(p => p.id === event.active.id) || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveProject(null);
    const { active, over } = event;
    if (!over) return;

    const projectId = active.id as string;
    const newStatus = over.id as string;
    const project = projects.find(p => p.id === projectId);

    if (project && project.status !== newStatus && statusOptions.some(s => s.value === newStatus)) {
      statusMutation.mutate({ id: projectId, status: newStatus });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Opdrachten</h1>
        <div className="flex items-center gap-3">
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
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
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
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea placeholder="Beschrijving" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} />
                <Textarea placeholder="Notities" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} />
                <Button className="w-full" onClick={handleSave} disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? 'Bezig...' : editingProject ? 'Opslaan' : 'Aanmaken'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Laden...</p>
      ) : viewMode === 'kanban' ? (
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
                onDelete={id => deleteMutation.mutate(id)}
              />
            ))}
          </div>
          <DragOverlay dropAnimation={{ duration: 200, easing: 'ease' }}>
            {activeProject ? <DragOverlayCard project={activeProject} /> : null}
          </DragOverlay>
        </DndContext>
      ) : (
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
                    <Select value={project.status} onValueChange={val => statusMutation.mutate({ id: project.id, status: val })}>
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
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteMutation.mutate(project.id)}>
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
