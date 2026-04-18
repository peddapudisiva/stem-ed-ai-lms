import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-bg">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col min-h-screen transition-all select-none lg:select-auto">
        <TopBar />
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 transition-all relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
