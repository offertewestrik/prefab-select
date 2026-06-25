import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, RotateCcw, LogOut, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { ROLE_LABELS } from '../lib/rbac';
import { PageHeader, Card, CardHeader, Button, Badge, Avatar, Modal } from '../components/ui';

export default function InstellingenPage() {
  const { user, logout } = useAuth();
  const { resetData } = useData();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);

  return (
    <div>
      <PageHeader title="Instellingen" subtitle="Beheer uw account en demo-omgeving." />

      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-5">
          <CardHeader title="Account" icon={<User size={16} />} />
          <div className="flex items-center gap-3 mb-4">
            <Avatar name={user?.name ?? '?'} color={user?.avatarColor} size={48} />
            <div>
              <p className="font-semibold">{user?.name}</p>
              <p className="text-sm text-[var(--abp-muted)]">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Badge tone="navy">{user ? ROLE_LABELS[user.role] : ''}</Badge>
            {user?.title && <span className="text-xs text-[var(--abp-muted)]">{user.title}</span>}
          </div>
          <Button variant="secondary" onClick={() => { logout(); navigate('/aanbouw/login'); }} icon={<LogOut size={15} />}>Uitloggen</Button>
        </Card>

        <Card className="p-5">
          <CardHeader title="Over dit platform" icon={<ShieldCheck size={16} />} />
          <p className="text-sm text-[var(--abp-muted)] leading-relaxed">
            AanbouwPlatform.nl is hét lead- en offerteplatform voor woninguitbreiding — van aanbouw, uitbouw en dakopbouw tot mantelzorgwoning, poolhouse, veranda, tuinkantoor en prefab woning.
            Deze demo draait volledig op lokale data (localStorage) — wijzigingen blijven bewaard tot u ze reset.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-[var(--abp-surface-2)]"><p className="font-bold text-[var(--abp-navy)]">3</p><p className="text-[var(--abp-muted)]">rollen</p></div>
            <div className="p-2 rounded-xl bg-[var(--abp-surface-2)]"><p className="font-bold text-[var(--abp-navy)]">13</p><p className="text-[var(--abp-muted)]">diensten</p></div>
            <div className="p-2 rounded-xl bg-[var(--abp-surface-2)]"><p className="font-bold text-[var(--abp-navy)]">nl-NL</p><p className="text-[var(--abp-muted)]">locale</p></div>
          </div>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <CardHeader title="Demo-data" subtitle="Zet alle aanvragen, offertes en bedrijven terug naar de begintoestand." icon={<RotateCcw size={16} />} />
          <Button variant="danger" onClick={() => setConfirm(true)} icon={<RotateCcw size={15} />}>Demo-data resetten</Button>
        </Card>
      </div>

      <Modal open={confirm} onClose={() => setConfirm(false)} title="Demo-data resetten?"
        footer={<>
          <Button variant="ghost" onClick={() => setConfirm(false)}>Annuleren</Button>
          <Button variant="danger" onClick={() => { resetData(); setConfirm(false); }} icon={<RotateCcw size={15} />}>Ja, resetten</Button>
        </>}>
        <p className="text-sm text-[var(--abp-muted)]">Alle wijzigingen die u in deze demo heeft gemaakt — nieuwe aanvragen, offertes, statuswijzigingen — worden teruggezet naar de oorspronkelijke seed-data.</p>
      </Modal>
    </div>
  );
}
