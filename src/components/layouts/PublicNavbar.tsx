import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SmartToy } from '../icons/StitchIcons';
import { ArrowRight, Menu, X as XIcon } from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Features', to: '/features' },
  { label: 'Contact', to: '/contact' },
];

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-[#FFF9E9]/90 backdrop-blur-md border-b border-[#CDC7AA]/40 transition-all">
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-16 py-3.5 max-w-[1600px] mx-auto w-full">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 bg-[#FFE600] rounded-2xl flex items-center justify-center shadow-md border border-[#CDC7AA]/40 text-[#1A1A1A] group-hover:scale-105 transition-transform">
            <SmartToy className="h-6 w-6 text-[#1A1A1A]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black font-heading text-[#1E1C10] tracking-tight block leading-tight">
                Placement Pal
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#00F5D4]/40 text-[#006B5B] font-bold text-[10px]">
                AI
              </span>
            </div>
            <span className="block text-[10px] text-[#6A5F00] font-bold uppercase tracking-wider">
              Placement Intelligence Engine
            </span>
          </div>
        </div>

        {/* Nav Pills */}
        <div className="hidden md:flex items-center gap-1.5 bg-[#FAF3DF] p-1.5 rounded-full border border-[#CDC7AA]/40 shadow-xs">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'text-[#4B4731] hover:text-[#1E1C10] hover:bg-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-full font-bold text-xs text-[#1E1C10] hover:bg-[#FAF3DF] transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 rounded-full bg-[#FFE600] hover:bg-[#DEC800] text-[#1A1A1A] font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-transform active:scale-95 border border-[#CDC7AA]/40"
          >
            <span>Get Started Free</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-2xl border border-[#CDC7AA]/40 bg-white text-[#1E1C10] hover:bg-[#FAF3DF]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <XIcon className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 space-y-2 border-t border-[#CDC7AA]/40 bg-[#FFF9E9]/98 backdrop-blur-xl">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm text-[#1E1C10] hover:bg-[#FFE600]/20 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2.5 pt-3 border-t border-[#CDC7AA]/30">
            <Link
              to="/login"
              className="flex-1 py-2 rounded-full text-center bg-[#FAF3DF] text-[#1E1C10] font-bold text-xs border border-[#CDC7AA]/40"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="flex-1 py-2 rounded-full text-center bg-[#FFE600] text-[#1A1A1A] font-extrabold text-xs shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
