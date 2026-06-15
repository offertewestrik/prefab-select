import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, CornerDownLeft, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { aiService, type AICommandResult } from '../../services/aiService';
import { Spinner, cn } from '../ui';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  suggestions?: string[];
}

const STARTERS = [
  'Analyseer leads van Prefab Select deze week',
  'Maak rapportage voor Lucky Zonwering',
  'Controleer Firebase errors',
  'Maak Meta Ads verbeteradvies',
  'Maak contentplanning voor komende week',
];

export function CommandPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { companies, leads, campaigns, selectedCompany } = useData();
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  const submit = async (text: string) => {
    const prompt = text.trim();
    if (!prompt || busy) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text: prompt }]);
    setBusy(true);
    const res: AICommandResult = await aiService.sendCommand(prompt, {
      companies: companies.items, leads: leads.items, campaigns: campaigns.items,
      activeCompanyId: selectedCompany?.id ?? null,
    });
    setMessages((m) => [...m, { role: 'assistant', text: res.text, suggestions: res.suggestions }]);
    setBusy(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center p-4 sm:pt-24">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl acc-glass-strong rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="flex items-center gap-3 px-4 h-14 border-b border-[var(--acc-border)] shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <Sparkles size={15} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold leading-none">AI Command Center</p>
            <p className="text-[10px] text-[var(--acc-muted)] mt-0.5">Model: {aiService.provider()}</p>
          </div>
          <button onClick={onClose} className="text-[var(--acc-muted)] hover:text-white"><X size={18} /></button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto acc-scroll px-4 py-4 space-y-3">
          {messages.length === 0 && (
            <div className="space-y-2">
              <p className="text-xs text-[var(--acc-muted)] px-1">Probeer bijvoorbeeld:</p>
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="w-full text-left text-sm px-3 py-2.5 rounded-xl acc-glass hover:border-white/20 border border-transparent text-[var(--acc-text)] transition-colors flex items-center gap-2"
                >
                  <Sparkles size={13} className="text-violet-300 shrink-0" />
                  {s}
                </button>
              ))}
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
              <div className={cn(
                'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap leading-relaxed',
                m.role === 'user' ? 'bg-blue-600 text-white' : 'acc-glass border border-[var(--acc-border)]',
              )}>
                <Markdownish text={m.text} />
                {m.suggestions && m.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {m.suggestions.map((s) => (
                      <button key={s} onClick={() => submit(s)} className="text-[11px] px-2 py-1 rounded-lg bg-white/8 hover:bg-white/14 transition-colors">
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {busy && (
            <div className="flex items-center gap-2 text-sm text-[var(--acc-muted)]">
              <Spinner /> AI denkt na…
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); submit(input); }}
          className="flex items-center gap-2 px-3 py-3 border-t border-[var(--acc-border)] shrink-0"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Typ een opdracht…"
            className="acc-input flex-1 px-3.5 py-2.5 text-sm"
          />
          <button type="submit" disabled={busy || !input.trim()} className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 flex items-center justify-center text-white transition-colors">
            <CornerDownLeft size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

/** Minimal **bold** + bullet rendering to keep the panel dependency-free. */
function Markdownish({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => {
        const html = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/_(.+?)_/g, '<em>$1</em>');
        return <p key={i} className={line.trim() === '' ? 'h-1.5' : ''} dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </>
  );
}
