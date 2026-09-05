import { Link } from 'react-router-dom';
import { SmartToy } from '../icons/StitchIcons';
import { Heart, ShieldCheck } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Features', to: '/features' },
  { label: 'Contact', to: '/contact' },
];

export function PublicFooter() {
  return (
    <footer className="py-14 px-4 sm:px-8 lg:px-12 xl:px-16 border-t border-[#CDC7AA]/40 bg-[#FAF3DF]/80 backdrop-blur-md w-full font-sans text-[#1E1C10]">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#FFE600] rounded-2xl flex items-center justify-center text-[#1A1A1A] shadow-md border border-[#CDC7AA]/40">
                <SmartToy className="h-6 w-6 text-[#1A1A1A]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-black text-xl text-[#1E1C10]">
                    Placement Pal
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00F5D4]/40 text-[#006B5B] font-bold text-[10px]">
                    NITC Verified
                  </span>
                </div>
                <span className="text-xs text-[#6A5F00] font-bold">
                  AI Campus Placement Assistant
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#4B4731] max-w-md leading-relaxed font-medium">
              An intelligent, cartoon-powered placement preparation ecosystem designed for engineering students. Built as a capstone project under expert academic mentorship.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#006B5B]">
              <ShieldCheck className="h-4 w-4" />
              <span>Calibrated for Day-1 IT & Tier-1 Product Engineering Drives</span>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="font-heading font-black text-[#1E1C10] text-sm uppercase tracking-wider">
              Quick Navigation
            </h5>
            <div className="space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-xs sm:text-sm font-semibold text-[#4B4731] hover:text-[#6A5F00] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="font-heading font-black text-[#1E1C10] text-sm uppercase tracking-wider">
              Platform Modules
            </h5>
            <div className="space-y-2">
              {[
                { name: 'AI Resume Audit', to: '/resume' },
                { name: 'Mock Interview Bot', to: '/interview' },
                { name: 'Skill Gap Radar', to: '/skill-gap' },
                { name: 'Coding DSA Practice', to: '/coding' },
                { name: 'Job Matcher', to: '/jobs' },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="block text-xs sm:text-sm font-semibold text-[#4B4731] hover:text-[#6A5F00] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#CDC7AA]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-[#7C775F]">
          <p className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Placement Pal · Built with</span>
            <Heart className="h-3.5 w-3.5 text-[#FF6B6B] fill-[#FF6B6B]" />
            <span>for B.Tech Engineering Students</span>
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#1E1C10] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#1E1C10] cursor-pointer transition-colors">Terms of Service</span>
            <Link to="/contact" className="hover:text-[#1E1C10] transition-colors">Support & Feedback</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
