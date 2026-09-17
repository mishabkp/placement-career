import { Menu, Bell, Search, User, LogOut, ArrowRightLeft, ShieldCheck, GraduationCap } from 'lucide-react';
import { mockNotifications } from '../../data/mockData';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, isFaculty, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  const unreadCount = mockNotifications.length;

  const handleToggleRole = () => {
    const nextRole = isFaculty ? 'student' : 'faculty';
    switchRole(nextRole);
    setShowProfileMenu(false);
    if (nextRole === 'faculty') {
      navigate('/faculty-portal');
    } else {
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/login');
  };

  return (
    <header
      className="h-[68px] flex items-center justify-between px-4 lg:px-6 flex-shrink-0 sticky top-0 z-20 bg-white/60 backdrop-blur-xl border border-[#CDC7AA]/40 shadow-sm rounded-3xl"
    >
      {/* Left: Mobile Toggle & Stitch Search bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl bg-[#F4EEDA] text-[#4B4731] hover:text-[#1E1C10] hover:bg-[#EEE8D4] transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search matching Stitch rounded-full design */}
        <div
          className="hidden sm:flex items-center gap-2.5 bg-[#F4EEDA] border-2 border-[#CDC7AA]/60 rounded-full px-4 py-1.5 w-64 lg:w-96 focus-within:border-[#6A5F00] focus-within:bg-white transition-all shadow-inner"
        >
          <Search className="h-4 w-4 text-[#7C775F] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search paths, skills... (⌘K)"
            className="bg-transparent text-xs text-[#1E1C10] placeholder:text-[#7C775F] font-medium focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Right: Role indicator, Notifications & User Profile */}
      <div className="flex items-center gap-3">
        {/* Role Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF3DF] border border-[#CDC7AA]/50 text-xs font-bold">
          {isFaculty ? (
            <>
              <GraduationCap className="h-3.5 w-3.5 text-[#726600]" />
              <span className="text-[#726600]">TPO Officer</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[#4B4731]">Student</span>
            </>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="relative w-10 h-10 rounded-full bg-[#F4EEDA] border border-[#CDC7AA]/50 flex items-center justify-center text-[#1E1C10] hover:bg-[#EEE8D4] transition-colors cursor-pointer"
            aria-label="Toggle notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#FF6B6B] rounded-full border-2 border-[#FFF9E9]" />
            )}
          </button>

          {showNotif && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowNotif(false)} />
              <div
                className="absolute right-0 mt-2 w-80 bg-white border border-[#CDC7AA] rounded-2xl z-20 overflow-hidden shadow-2xl p-2 animate-in fade-in zoom-in duration-150"
              >
                <div className="p-3 border-b border-[#CDC7AA]/30 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1E1C10]">Notifications</span>
                  <span className="text-[10px] bg-[#FFE600] text-[#726600] font-bold px-2 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                </div>
                <div className="max-h-60 overflow-y-auto p-1 space-y-1">
                  {mockNotifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-xl hover:bg-[#FAF3DF] transition-colors text-xs space-y-0.5"
                    >
                      <p className="text-[11px] text-[#1E1C10] leading-snug font-semibold">{n.message}</p>
                      <span className="text-[9px] text-[#7C775F]">{n.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User avatar menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-10 h-10 rounded-full bg-[#FFE600] border border-[#CDC7AA] flex items-center justify-center shadow-sm text-[#726600] font-bold text-xs hover:scale-105 transition-transform"
            aria-label="User account"
          >
            {user.initials}
          </button>

          {showProfileMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-white border border-[#CDC7AA] rounded-2xl z-20 overflow-hidden shadow-2xl p-2 animate-in fade-in zoom-in duration-150 text-xs">
                <div className="p-2.5 border-b border-[#CDC7AA]/30">
                  <p className="font-bold text-[#1E1C10]">{user.name}</p>
                  <p className="text-[11px] text-[#726600] font-semibold">{user.track}</p>
                  <p className="text-[10px] text-[#7C775F] truncate">{user.email}</p>
                </div>

                <div className="py-1 space-y-0.5">
                  <button
                    onClick={handleToggleRole}
                    className="w-full px-3 py-2 text-left rounded-xl hover:bg-[#FAF3DF] text-[#1E1C10] font-medium flex items-center gap-2 transition-colors"
                  >
                    <ArrowRightLeft className="h-3.5 w-3.5 text-[#726600]" />
                    <span>Switch to {isFaculty ? 'Student Mode' : 'Faculty / TPO Mode'}</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left rounded-xl hover:bg-red-50 text-red-600 font-medium flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
