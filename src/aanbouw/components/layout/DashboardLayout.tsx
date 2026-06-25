import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="abp-root abp-scroll">
      <div className="flex min-h-screen">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 min-w-0 flex flex-col">
          <Topbar onMenu={() => setSidebarOpen(true)} />
          <main className="flex-1 px-4 sm:px-6 py-6 max-w-[1500px] w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
