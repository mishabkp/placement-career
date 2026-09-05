import { Outlet } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#070A0E] text-slate-100">
      {/* Top brand bar */}
      <header className="flex items-center gap-3 px-6 py-5 border-b border-gray-800/80 bg-[#0D1117]/80 backdrop-blur-md">
        <div
          className="w-10 h-10 bg-amber-500 border border-amber-400/50 rounded-2xl flex items-center justify-center shadow-glow-sm"
        >
          <GraduationCap className="h-6 w-6 text-black" />
        </div>
        <div>
          <span className="text-base font-black text-white tracking-tight block leading-tight">
            AI Career Coach
          </span>
          <span className="block text-[11px] text-amber-400 font-black uppercase tracking-widest">
            Student Platform
          </span>
        </div>
      </header>

      {/* Centered Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
