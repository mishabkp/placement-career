import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layouts/Sidebar';
import { Header } from '../components/layouts/Header';

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#FFF9E9] text-[#1E1C10]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />


      <div className="flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1700px] w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
