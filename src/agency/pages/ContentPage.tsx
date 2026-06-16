import React, { useMemo, useState } from 'react';
import { Plus, Sparkles, Calendar, CheckCircle2, Clock, Lightbulb } from 'lucide-react';
import { useData } from '../context/DataContext';
import { StatCard } from '../components/StatCard';
import {
  Card, CardHeader, Button, Badge, Modal, Spinner, Select, Input, Textarea, Field,
  EmptyState, PageHeader,
} from '../components/ui';
import { aiService } from '../services/aiService';
import { formatDate } from '../lib/format';
import { contentStatusTone } from './_shared';
import type { ContentPlatform, ContentStatus } from '../types';
import type { BadgeTone } from '../components/ui';

const PLATFORMS: ContentPlatform[] = ['Facebook', 'Instagram', 'TikTok', 'LinkedIn'];
const STATUSES: ContentStatus[] = ['idee', 'concept', 'ingepland', 'geplaatst'];
const STATUS_LABELS: Record<ContentStatus, string> = {
  idee: 'Ideeën', concept: 'Concept', ingepland: 'Ingepland', geplaatst: 'Geplaatst',
};

function platformTone(p: ContentPlatform): BadgeTone {
  switch (p) {
    case 'Instagram': return 'purple';
    case 'Facebook': return 'blue';
    case 'TikTok': return 'cyan';
    case 'LinkedIn': return 'blue';
  }
}

export default function ContentPage() {
  const { selectedCompany, content } = useData();
  const cid = selectedCompany?.id;

  const [createOpen, setCreateOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState<ContentPlatform>('Instagram');
  const [status, setStatus] = useState<ContentStatus>('idee');
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [scheduledFor, setScheduledFor] = useState('');
  const [captionLoading, setCaptionLoading] = useState(false);

  const [ideasLoading, setIdeasLoading] = useState(false);
  const [ideas, setIdeas] = useState<string[]>([]);

  const cContent = useMemo(
    () => content.items.filter((c) => c.companyId === cid),
    [content.items, cid],
  );

  if (!selectedCompany) {
    return <EmptyState title="Geen klant geselecteerd" description="Kies een klant rechtsboven." />;
  }

  function resetForm() {
    setTitle(''); setPlatform('Instagram'); setStatus('idee');
    setCaption(''); setHashtags(''); setScheduledFor('');
  }

  function submit() {
    if (!title.trim() || !cid) return;
    content.create({
      companyId: cid,
      platform,
      status,
      title: title.trim(),
      caption,
      hashtags: hashtags.split(',').map((h) => h.trim().replace(/^#/, '')).filter(Boolean),
      visualUrl: undefined,
      scheduledFor: scheduledFor || new Date().toISOString(),
    });
    resetForm();
    setCreateOpen(false);
  }

  async function writeCaption() {
    if (!title.trim()) return;
    setCaptionLoading(true);
    try {
      const text = await aiService.generateCaption({ title: title.trim(), platform });
      setCaption(text);
    } finally {
      setCaptionLoading(false);
    }
  }

  async function loadIdeas() {
    setIdeasLoading(true);
    try {
      const result = await aiService.generateContentIdeas(selectedCompany!);
      setIdeas(result);
    } finally {
      setIdeasLoading(false);
    }
  }

  function addIdea(idea: string) {
    if (!cid) return;
    content.create({
      companyId: cid,
      platform: 'Instagram',
      status: 'idee',
      title: idea,
      caption: '',
      hashtags: [],
      visualUrl: undefined,
      scheduledFor: new Date().toISOString(),
    });
  }

  const total = cContent.length;
  const ingepland = cContent.filter((c) => c.status === 'ingepland').length;
  const geplaatst = cContent.filter((c) => c.status === 'geplaatst').length;
  const ideeen = cContent.filter((c) => c.status === 'idee').length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Content kalender"
        subtitle={`Social media planning voor ${selectedCompany.name}`}
        actions={
          <>
            <Button variant="secondary" icon={<Sparkles size={15} />} onClick={loadIdeas} disabled={ideasLoading}>
              {ideasLoading ? <Spinner size={14} /> : '10 post ideeën'}
            </Button>
            <Button icon={<Plus size={15} />} onClick={() => setCreateOpen(true)}>Post</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Totaal posts" value={total} icon={<Calendar size={18} />} />
        <StatCard label="Ingepland" value={ingepland} icon={<Clock size={18} />} sparkColor="#60a5fa" />
        <StatCard label="Geplaatst" value={geplaatst} icon={<CheckCircle2 size={18} />} sparkColor="#34d399" />
        <StatCard label="Ideeën" value={ideeen} icon={<Lightbulb size={18} />} sparkColor="#a78bfa" />
      </div>

      {(ideasLoading || ideas.length > 0) && (
        <Card className="p-5">
          <CardHeader title="AI postideeën" subtitle="Voeg een idee toe aan je kalender" icon={<Sparkles size={16} />} />
          {ideasLoading ? (
            <div className="flex items-center gap-2 text-sm text-[var(--acc-muted)] py-4"><Spinner /> Ideeën genereren…</div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-2">
              {ideas.map((idea, i) => (
                <div key={i} className="acc-glass rounded-xl p-3 flex items-center gap-3">
                  <span className="text-sm flex-1 min-w-0">{idea}</span>
                  <Button size="sm" variant="secondary" icon={<Plus size={12} />} onClick={() => addIdea(idea)}>Voeg toe</Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      <div className="grid lg:grid-cols-4 gap-4">
        {STATUSES.map((s) => {
          const colItems = cContent.filter((c) => c.status === s);
          return (
            <div key={s} className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: badgeColor(s) }} />
                  <span className="text-xs font-semibold">{STATUS_LABELS[s]}</span>
                </div>
                <span className="text-[11px] text-[var(--acc-muted)] font-medium tabular-nums">{colItems.length}</span>
              </div>
              <div className="space-y-3">
                {colItems.map((item) => (
                  <Card key={item.id} hover className="p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <Badge tone={platformTone(item.platform)}>{item.platform}</Badge>
                      <Badge tone={contentStatusTone(item.status)}>{item.status}</Badge>
                    </div>
                    <p className="text-sm font-medium leading-snug">{item.title}</p>
                    {item.caption && <p className="text-[11px] text-[var(--acc-muted)] line-clamp-3 whitespace-pre-line">{item.caption}</p>}
                    {item.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.hashtags.slice(0, 4).map((h) => (
                          <span key={h} className="text-[10px] text-blue-300">#{h}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-1 border-t border-[var(--acc-border)]">
                      <span className="text-[11px] text-[var(--acc-muted)]">{formatDate(item.scheduledFor)}</span>
                      <Select
                        className="!w-auto !py-1 !px-2 text-[11px]"
                        value={item.status}
                        onChange={(e) => content.update(item.id, { status: e.target.value as ContentStatus })}
                      >
                        {STATUSES.map((st) => <option key={st} value={st}>{STATUS_LABELS[st]}</option>)}
                      </Select>
                    </div>
                  </Card>
                ))}
                {colItems.length === 0 && (
                  <div className="text-[11px] text-[var(--acc-muted)] text-center py-6 border border-dashed border-[var(--acc-border)] rounded-xl">
                    Leeg
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Nieuwe post"
        footer={
          <>
            <Button variant="ghost" onClick={() => setCreateOpen(false)}>Annuleren</Button>
            <Button onClick={submit} disabled={!title.trim()}>Post aanmaken</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Titel">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Bijv. Voor & na transformatie" />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Platform">
              <Select value={platform} onChange={(e) => setPlatform(e.target.value as ContentPlatform)}>
                {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
              </Select>
            </Field>
            <Field label="Status">
              <Select value={status} onChange={(e) => setStatus(e.target.value as ContentStatus)}>
                {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </Select>
            </Field>
          </div>
          <Field label="Caption">
            <div className="flex items-center justify-between mb-1.5">
              <span />
              <Button size="sm" variant="secondary" icon={<Sparkles size={12} />} onClick={writeCaption} disabled={captionLoading || !title.trim()}>
                {captionLoading ? <Spinner size={12} /> : 'Schrijf caption'}
              </Button>
            </div>
            <Textarea rows={4} value={caption} onChange={(e) => setCaption(e.target.value)} />
          </Field>
          <Field label="Hashtags" hint="Komma-gescheiden, bijv. prefab, duurzaam, wonen">
            <Input value={hashtags} onChange={(e) => setHashtags(e.target.value)} placeholder="prefab, duurzaam" />
          </Field>
          <Field label="Inplannen op">
            <Input type="date" value={scheduledFor} onChange={(e) => setScheduledFor(e.target.value)} />
          </Field>
        </div>
      </Modal>
    </div>
  );
}

function badgeColor(s: ContentStatus): string {
  switch (s) {
    case 'idee': return '#94a3b8';
    case 'concept': return '#fbbf24';
    case 'ingepland': return '#3B82F6';
    case 'geplaatst': return '#10B981';
  }
}
