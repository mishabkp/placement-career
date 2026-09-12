import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layouts/Sidebar';
import { Header } from '../components/layouts/Header';
import { CommandPalette } from '../components/ui/CommandPalette';

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#FFF9E9] text-[#1E1C10] p-3 sm:p-4 gap-4">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300 relative rounded-3xl bg-transparent">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto scrollbar-thin rounded-3xl mt-4">
          <div className="p-2 sm:p-4 lg:p-6 max-w-[1700px] w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette />
    </div>
  );
}
