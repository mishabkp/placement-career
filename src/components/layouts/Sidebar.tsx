import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, User, FileText, Map, TrendingUp,
  Mic, Code2, BookOpen, Briefcase, BarChart3,
  Settings, ShieldCheck, X, ChevronLeft, ChevronRight,
  GitBranch, Globe, Sparkles
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    group: 'MAIN',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-[18px] w-[18px]" /> },
      { label: 'Profile', path: '/profile', icon: <User className="h-[18px] w-[18px]" /> },
    ],
  },
  {
    group: 'CAREER',
    items: [
      { label: 'Career Roadmap', path: '/career-roadmap', icon: <Map className="h-[18px] w-[18px]" /> },
      { label: 'Skill Gap', path: '/skill-gap', icon: <TrendingUp className="h-[18px] w-[18px]" /> },
    ],
  },
  {
    group: 'PREPARATION',
    items: [
      { label: 'Resume Analyzer', path: '/resume', icon: <FileText className="h-[18px] w-[18px]" /> },
      { label: 'AI Interview', path: '/interview', icon: <Mic className="h-[18px] w-[18px]" />, badge: 'AI' },
      { label: 'Coding Practice', path: '/coding', icon: <Code2 className="h-[18px] w-[18px]" /> },
      { label: 'Learning Assistant', path: '/learning', icon: <BookOpen className="h-[18px] w-[18px]" />, badge: 'AI' },
    ],
  },
  {
    group: 'ANALYSIS',
    items: [
      { label: 'GitHub Analyzer', path: '/github', icon: <GitBranch className="h-[18px] w-[18px]" /> },
      { label: 'LinkedIn Analyzer', path: '/linkedin', icon: <Globe className="h-[18px] w-[18px]" /> },
    ],
  },
  {
    group: 'OPPORTUNITIES',
    items: [
      { label: 'Job Matcher', path: '/jobs', icon: <Briefcase className="h-[18px] w-[18px]" /> },
      { label: 'Career Score', path: '/progress', icon: <BarChart3 className="h-[18px] w-[18px]" /> },
    ],
  },
  {
    group: 'ACCOUNT',
    items: [
      { label: 'Settings', path: '/settings', icon: <Settings className="h-[18px] w-[18px]" /> },
      { label: 'Admin', path: '/admin', icon: <ShieldCheck className="h-[18px] w-[18px]" /> },
    ],
  },
];

function NavItemLink({
  item,
  onClose,
  collapsed,
}: {
  item: NavItem;
  onClose: () => void;
  collapsed: boolean;
}) {
  return (
    <NavLink
      to={item.path}
      onClick={onClose}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        cn(
          'relative flex items-center gap-3 rounded-full text-xs font-semibold transition-all duration-200 select-none cursor-pointer',
          collapsed ? 'px-0 py-2.5 justify-center' : 'px-3.5 py-2.5',
          isActive
            ? 'bg-[#FFE600] text-[#726600] font-bold shadow-[0_2px_8px_rgba(106,95,0,0.18)]'
            : 'text-[#4B4731] hover:bg-[#EEE8D4] hover:text-[#1E1C10]',
        )
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={cn(
              'flex-shrink-0 transition-transform duration-200',
              isActive ? 'text-[#726600]' : 'group-hover:scale-105',
            )}
          >
            {item.icon}
          </span>

          {!collapsed && (
            <>
              <span className={cn('flex-1 truncate', isActive ? 'text-[#726600] font-bold' : '')}>
                {item.label}
              </span>
              {item.badge && (
                <span
                  className={cn(
                    'text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider',
                    isActive
                      ? 'bg-white text-[#726600] shadow-sm'
                      : 'bg-[#FFE600]/40 text-[#726600]',
                  )}
                >
                  {item.badge}
                </span>
              )}
            </>
          )}

          {/* Collapsed tooltip */}
          {collapsed && (
            <span className="absolute left-full ml-3 z-50 px-2.5 py-1.5 bg-[#1E1C10] text-white text-xs font-bold rounded-xl shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 whitespace-nowrap transition-opacity duration-150">
              {item.label}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-full flex flex-col',
          'transition-all duration-300 ease-in-out',
          'lg:translate-x-0 lg:static lg:z-auto',
          'bg-[#FAF3DF] border-r border-[#CDC7AA]/40 text-[#1E1C10]',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          collapsed ? 'w-[70px]' : 'w-[264px]',
        )}
      >
        {/* ─── Logo Area (Placement Pal) ─── */}
        <div
          className={cn(
            'flex items-center h-[68px] flex-shrink-0 border-b border-[#CDC7AA]/30 relative',
            collapsed ? 'justify-center px-0' : 'justify-between px-5',
          )}
        >
          <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
            <div className="w-9 h-9 bg-[#FFE600] border border-[#CDC7AA] rounded-2xl flex items-center justify-center text-[#726600] shadow-sm flex-shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div>
                <span className="text-sm font-extrabold text-[#1E1C10] tracking-tight block leading-tight font-heading">
                  Placement Pal
                </span>
                <span className="block text-[10px] text-[#726600] font-bold tracking-wider uppercase">
                  AI Placement Platform
                </span>
              </div>
            )}
          </div>

          {/* Mobile close button */}
          <button
            onClick={onClose}
            className={cn(
              'lg:hidden p-1.5 rounded-xl text-[#7C775F] hover:text-[#1E1C10] hover:bg-[#EEE8D4] transition-colors',
              collapsed && 'hidden',
            )}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ─── Navigation Groups ─── */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin">
          {navGroups.map((group) => (
            <div key={group.group} className="space-y-1">
              {!collapsed ? (
                <div className="px-3 pb-1 text-[10px] font-extrabold tracking-wider text-[#7C775F] uppercase">
                  {group.group}
                </div>
              ) : (
                <div className="h-2" />
              )}

              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavItemLink
                    key={item.path}
                    item={item}
                    onClose={onClose}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ─── Bottom Student Pill Card ─── */}
        <div className="p-3 border-t border-[#CDC7AA]/30">
          {!collapsed ? (
            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#F4EEDA] border border-[#CDC7AA]/50 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FFE600] text-[#726600] font-bold text-xs flex items-center justify-center shadow-inner">
                  AP
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-[#1E1C10] truncate">Arjun Patel</div>
                  <div className="text-[10px] text-[#726600] font-semibold truncate">Tier-1 SDE Track</div>
                </div>
              </div>
              <button
                onClick={() => setCollapsed(true)}
                className="p-1 rounded-lg text-[#7C775F] hover:text-[#1E1C10] hover:bg-[#EEE8D4] transition-colors"
                title="Collapse sidebar"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => setCollapsed(false)}
                className="p-2 rounded-xl text-[#7C775F] hover:text-[#1E1C10] hover:bg-[#EEE8D4] transition-colors"
                title="Expand sidebar"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
