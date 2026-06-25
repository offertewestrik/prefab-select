import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './aanbouw.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Spinner, EmptyState, Button } from './components/ui';
import type { Permission } from './lib/rbac';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
// Admin
import AanvragenPage from './pages/AanvragenPage';
import BouwbedrijvenPage from './pages/BouwbedrijvenPage';
import KlantenPage from './pages/KlantenPage';
import StatistiekenPage from './pages/StatistiekenPage';
// Aannemer
import LeadsPage from './pages/LeadsPage';
import OffertesPage from './pages/OffertesPage';
import ProjectenPage from './pages/ProjectenPage';
import WerkgebiedPage from './pages/WerkgebiedPage';
import DienstenPage from './pages/DienstenPage';
import BedrijfsprofielPage from './pages/BedrijfsprofielPage';
import CreditsPage from './pages/CreditsPage';
// Klant
import NieuweAanvraagPage from './pages/NieuweAanvraagPage';
import MijnAanvragenPage from './pages/MijnAanvragenPage';
import BerichtenPage from './pages/BerichtenPage';
// Shared
import InstellingenPage from './pages/InstellingenPage';

function RequireAuth() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="abp-root flex items-center justify-center min-h-screen">
        <Spinner size={28} />
      </div>
    );
  }
  if (!user) return <Navigate to="/aanbouw/login" replace />;
  return <Outlet />;
}

function Guard({ permission, children }: { permission: Permission; children: React.ReactNode }) {
  const { can } = useAuth();
  if (!can(permission)) {
    return (
      <EmptyState
        title="Geen toegang"
        description="Je rol heeft geen rechten voor deze pagina. Neem contact op met de platformbeheerder."
        action={<Button variant="secondary" onClick={() => window.history.back()}>Terug</Button>}
      />
    );
  }
  return <>{children}</>;
}

export default function AanbouwApp() {
  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          <Route path="/aanbouw/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route element={<DashboardLayout />}>
              <Route path="/aanbouw" element={<Navigate to="/aanbouw/dashboard" replace />} />
              <Route path="/aanbouw/dashboard" element={<DashboardPage />} />

              {/* Admin */}
              <Route path="/aanbouw/aanvragen" element={<Guard permission="view:all-requests"><AanvragenPage /></Guard>} />
              <Route path="/aanbouw/bouwbedrijven" element={<Guard permission="view:companies"><BouwbedrijvenPage /></Guard>} />
              <Route path="/aanbouw/klanten" element={<Guard permission="view:customers"><KlantenPage /></Guard>} />
              <Route path="/aanbouw/statistieken" element={<Guard permission="view:statistics"><StatistiekenPage /></Guard>} />

              {/* Aannemer */}
              <Route path="/aanbouw/leads" element={<Guard permission="view:new-leads"><LeadsPage /></Guard>} />
              <Route path="/aanbouw/offertes" element={<Guard permission="view:quotes"><OffertesPage /></Guard>} />
              <Route path="/aanbouw/projecten" element={<Guard permission="view:projects"><ProjectenPage /></Guard>} />
              <Route path="/aanbouw/werkgebied" element={<Guard permission="manage:workarea"><WerkgebiedPage /></Guard>} />
              <Route path="/aanbouw/diensten" element={<Guard permission="manage:services"><DienstenPage /></Guard>} />
              <Route path="/aanbouw/bedrijfsprofiel" element={<Guard permission="manage:company-profile"><BedrijfsprofielPage /></Guard>} />
              <Route path="/aanbouw/credits" element={<Guard permission="view:credits"><CreditsPage /></Guard>} />

              {/* Klant */}
              <Route path="/aanbouw/nieuwe-aanvraag" element={<Guard permission="create:request"><NieuweAanvraagPage /></Guard>} />
              <Route path="/aanbouw/mijn-aanvragen" element={<Guard permission="view:own-requests"><MijnAanvragenPage /></Guard>} />
              <Route path="/aanbouw/berichten" element={<Guard permission="view:messages"><BerichtenPage /></Guard>} />

              {/* Shared */}
              <Route path="/aanbouw/instellingen" element={<Guard permission="view:settings"><InstellingenPage /></Guard>} />
              <Route path="/aanbouw/*" element={<Navigate to="/aanbouw/dashboard" replace />} />
            </Route>
          </Route>
        </Routes>
      </DataProvider>
    </AuthProvider>
  );
}
