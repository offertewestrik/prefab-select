import React, { useMemo, useState } from 'react';
import { Plus, Sparkles, CheckSquare, AlertTriangle, CheckCircle2, Bot } from 'lucide-react';
import { useData } from '../context/DataContext';
import { StatCard } from '../components/StatCard';
import {
  Card, CardHeader, Button, Badge, Avatar, Modal, Tabs, Table, Th, Td,
  EmptyState, PageHeader, Input, Textarea, Select, Field,
} from '../components/ui';
import { KanbanBoard, type KanbanColumn } from '../components/kanban/KanbanBoard';
import { formatDate } from '../lib/format';
import { users } from '../data/mockData';
import { priorityTone, taskStatusTone, TASK_STATUS_LABELS } from './_shared';
import type { Task, TaskStatus, TaskPriority } from '../types';

const COLUMNS: KanbanColumn<TaskStatus>[] = [
  { id: 'todo', title: TASK_STATUS_LABELS.todo, accent: '#64748B' },
  { id: 'bezig', title: TASK_STATUS_LABELS.bezig, accent: '#3B82F6' },
  { id: 'review', title: TASK_STATUS_LABELS.review, accent: '#F59E0B' },
  { id: 'klaar', title: TASK_STATUS_LABELS.klaar, accent: '#10B981' },
];

const PRIORITIES: TaskPriority[] = ['laag', 'normaal', 'hoog', 'urgent'];
const STATUSES: TaskStatus[] = ['todo', 'bezig', 'review', 'klaar'];

function userById(id: string) {
  return users.find((u) => u.id === id);
}

const MONTHS = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
const WEEKDAYS = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];

export default function TasksPage() {
  const { selectedCompany, tasks } = useData();
  const [tab, setTab] = useState('board');
  const [createOpen, setCreateOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState(users[0]?.id ?? '');
  const [priority, setPriority] = useState<TaskPriority>('normaal');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');

  const cid = selectedCompany?.id;
  const cTasks = useMemo(
    () => tasks.items.filter((t) => t.companyId === cid),
    [tasks.items, cid],
  );

  if (!selectedCompany) {
    return <EmptyState title="Geen klant geselecteerd" description="Kies een klant rechtsboven." />;
  }

  const open = cTasks.filter((t) => t.status !== 'klaar').length;
  const urgent = cTasks.filter((t) => t.priority === 'urgent').length;
  const done = cTasks.filter((t) => t.status === 'klaar').length;
  const aiCount = cTasks.filter((t) => t.aiAssisted).length;

  function resetForm() {
    setTitle(''); setDescription(''); setAssigneeId(users[0]?.id ?? '');
    setPriority('normaal'); setStatus('todo'); setDueDate(''); setNotes('');
  }

  function submit() {
    if (!title.trim() || !cid) return;
    tasks.create({
      companyId: cid,
      title: title.trim(),
      description,
      assigneeId,
      priority,
      status,
      dueDate: dueDate || new Date().toISOString(),
      notes,
      aiAssisted: false,
      createdAt: new Date().toISOString(),
    });
    resetForm();
    setCreateOpen(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Taken"
        subtitle={`${cTasks.length} taken voor ${selectedCompany.name}`}
        actions={<Button icon={<Plus size={15} />} onClick={() => setCreateOpen(true)}>Taak</Button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Open taken" value={open} icon={<CheckSquare size={18} />} />
        <StatCard label="Urgent" value={urgent} icon={<AlertTriangle size={18} />} sparkColor="#f87171" />
        <StatCard label="Klaar" value={done} icon={<CheckCircle2 size={18} />} sparkColor="#34d399" />
        <StatCard label="AI-ondersteund" value={aiCount} icon={<Bot size={18} />} sparkColor="#a78bfa" />
      </div>

      <Tabs
        tabs={[
          { id: 'board', label: 'Bord', count: cTasks.length },
          { id: 'list', label: 'Lijst' },
          { id: 'calendar', label: 'Kalender' },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === 'board' && (
        <KanbanBoard<Task, TaskStatus>
          columns={COLUMNS}
          items={cTasks}
          getStatus={(t) => t.status}
          onMove={(id, toStatus) => tasks.update(id, { status: toStatus })}
          renderCard={(t) => {
            const u = userById(t.assigneeId);
            return (
              <div className="space-y-2">
                <p className="text-sm font-medium leading-snug">{t.title}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge tone={priorityTone(t.priority)}>{t.priority}</Badge>
                  {t.aiAssisted && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-violet-300">
                      <Sparkles size={11} /> AI
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-1">
                  {u ? <Avatar name={u.name} color={u.avatarColor} size={24} /> : <span />}
                  <span className="text-[11px] text-[var(--acc-muted)]">{formatDate(t.dueDate)}</span>
                </div>
              </div>
            );
          }}
        />
      )}

      {tab === 'list' && (
        <Card className="p-5">
          {cTasks.length === 0 ? (
            <EmptyState title="Geen taken" description="Maak je eerste taak aan." />
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>Taak</Th><Th>Toegewezen</Th><Th>Prioriteit</Th><Th>Status</Th><Th>Deadline</Th><Th />
                </tr>
              </thead>
              <tbody>
                {cTasks.map((t) => {
                  const u = userById(t.assigneeId);
                  return (
                    <tr key={t.id}>
                      <Td>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{t.title}</span>
                          {t.aiAssisted && <Sparkles size={12} className="text-violet-300" />}
                        </div>
                      </Td>
                      <Td>
                        {u ? (
                          <div className="flex items-center gap-2">
                            <Avatar name={u.name} color={u.avatarColor} size={24} />
                            <span className="text-sm">{u.name}</span>
                          </div>
                        ) : '—'}
                      </Td>
                      <Td><Badge tone={priorityTone(t.priority)}>{t.priority}</Badge></Td>
                      <Td><Badge tone={taskStatusTone(t.status)}>{TASK_STATUS_LABELS[t.status]}</Badge></Td>
                      <Td><span className="text-sm text-[var(--acc-muted)]">{formatDate(t.dueDate)}</span></Td>
                      <Td>
                        {!t.aiAssisted && t.status !== 'klaar' && (
                          <Button
                            size="sm"
                            variant="secondary"
                            icon={<Sparkles size={12} />}
                            onClick={() => tasks.update(t.id, { aiAssisted: true, status: 'bezig' })}
                          >
                            AI laten uitvoeren
                          </Button>
                        )}
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card>
      )}

      {tab === 'calendar' && <CalendarView tasks={cTasks} />}

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Nieuwe taak"
        footer={
          <>
            <Button variant="ghost" onClick={() => setCreateOpen(false)}>Annuleren</Button>
            <Button onClick={submit} disabled={!title.trim()}>Taak aanmaken</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Titel">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Bijv. Landingpage reviewen" />
          </Field>
          <Field label="Omschrijving">
            <Textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Toegewezen aan">
              <Select value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)}>
                {users.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
              </Select>
            </Field>
            <Field label="Prioriteit">
              <Select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
                {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </Select>
            </Field>
            <Field label="Status">
              <Select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
                {STATUSES.map((s) => <option key={s} value={s}>{TASK_STATUS_LABELS[s]}</option>)}
              </Select>
            </Field>
            <Field label="Deadline">
              <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </Field>
          </div>
          <Field label="Notities">
            <Textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Field>
        </div>
      </Modal>
    </div>
  );
}

function CalendarView({ tasks }: { tasks: Task[] }) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Monday-first offset
  const leadingBlanks = (first.getDay() + 6) % 7;

  const byDay = useMemo(() => {
    const map: Record<number, Task[]> = {};
    for (const t of tasks) {
      const d = new Date(t.dueDate);
      if (!Number.isNaN(d.getTime()) && d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        (map[day] ??= []).push(t);
      }
    }
    return map;
  }, [tasks, year, month]);

  const cells: (number | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <Card className="p-5">
      <CardHeader title="Kalender view" subtitle={`${MONTHS[month]} ${year}`} />
      <div className="grid grid-cols-7 gap-1.5 mb-2">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-[11px] uppercase tracking-wider font-semibold text-[var(--acc-muted)] text-center py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((day, i) => {
          if (day === null) return <div key={`b${i}`} className="min-h-[88px]" />;
          const dayTasks = byDay[day] ?? [];
          const isToday = day === now.getDate();
          return (
            <div
              key={day}
              className={`min-h-[88px] rounded-xl border border-[var(--acc-border)] p-1.5 ${isToday ? 'bg-blue-500/10 border-blue-400/30' : 'bg-white/[0.02]'}`}
            >
              <div className={`text-[11px] font-semibold mb-1 ${isToday ? 'text-blue-300' : 'text-[var(--acc-muted)]'}`}>{day}</div>
              <div className="space-y-1">
                {dayTasks.slice(0, 3).map((t) => (
                  <div
                    key={t.id}
                    className="text-[10px] leading-tight px-1.5 py-1 rounded-md truncate text-white/90"
                    style={{ background: t.priority === 'urgent' ? 'rgba(248,113,113,0.2)' : t.priority === 'hoog' ? 'rgba(251,191,36,0.2)' : 'rgba(59,130,246,0.2)' }}
                    title={t.title}
                  >
                    {t.title}
                  </div>
                ))}
                {dayTasks.length > 3 && <div className="text-[10px] text-[var(--acc-muted)] px-1.5">+{dayTasks.length - 3} meer</div>}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
