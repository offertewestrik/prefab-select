import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './agency.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Spinner, EmptyState, Button } from './components/ui';
import type { Permission } from './lib/rbac';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CompaniesPage from './pages/CompaniesPage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import LeadsPage from './pages/LeadsPage';
import CrmPage from './pages/CrmPage';
import QuotesPage from './pages/QuotesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import RevenuePage from './pages/RevenuePage';
import ProjectsPage from './pages/ProjectsPage';
import AgentsPage from './pages/AgentsPage';
import TasksPage from './pages/TasksPage';
import ReportsPage from './pages/ReportsPage';
import ContentPage from './pages/ContentPage';
import SettingsPage from './pages/SettingsPage';

function RequireAuth() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="acc-root flex items-center justify-center min-h-screen">
        <Spinner size={28} />
      </div>
    );
  }
  if (!user) return <Navigate to="/agency/login" replace />;
  return <Outlet />;
}

function Guard({ permission, children }: { permission: Permission; children: React.ReactNode }) {
  const { can } = useAuth();
  if (!can(permission)) {
    return (
      <EmptyState
        title="Geen toegang"
        description="Je rol heeft geen rechten voor deze module. Neem contact op met een beheerder."
        action={<Button variant="secondary" onClick={() => window.history.back()}>Terug</Button>}
      />
    );
  }
  return <>{children}</>;
}

export default function AgencyApp() {
  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          <Route path="/agency/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route element={<DashboardLayout />}>
              <Route path="/agency" element={<Navigate to="/agency/dashboard" replace />} />
              <Route path="/agency/dashboard" element={<Guard permission="view:dashboard"><DashboardPage /></Guard>} />
              <Route path="/agency/companies" element={<Guard permission="view:companies"><CompaniesPage /></Guard>} />
              <Route path="/agency/companies/:id" element={<Guard permission="view:companies"><CompanyDetailPage /></Guard>} />
              <Route path="/agency/leads" element={<Guard permission="view:leads"><LeadsPage /></Guard>} />
              <Route path="/agency/crm" element={<Guard permission="view:leads"><CrmPage /></Guard>} />
              <Route path="/agency/quotes" element={<Guard permission="view:quotes"><QuotesPage /></Guard>} />
              <Route path="/agency/analytics" element={<Guard permission="view:analytics"><AnalyticsPage /></Guard>} />
              <Route path="/agency/revenue" element={<Guard permission="view:revenue"><RevenuePage /></Guard>} />
              <Route path="/agency/projects" element={<Guard permission="view:projects"><ProjectsPage /></Guard>} />
              <Route path="/agency/agents" element={<Guard permission="view:agents"><AgentsPage /></Guard>} />
              <Route path="/agency/tasks" element={<Guard permission="view:tasks"><TasksPage /></Guard>} />
              <Route path="/agency/reports" element={<Guard permission="view:reports"><ReportsPage /></Guard>} />
              <Route path="/agency/content" element={<Guard permission="view:content"><ContentPage /></Guard>} />
              <Route path="/agency/settings" element={<Guard permission="view:settings"><SettingsPage /></Guard>} />
              <Route path="/agency/*" element={<Navigate to="/agency/dashboard" replace />} />
            </Route>
          </Route>
        </Routes>
      </DataProvider>
    </AuthProvider>
  );
}
