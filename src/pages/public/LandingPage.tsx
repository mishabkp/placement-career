import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PublicNavbar } from '../../components/layouts/PublicNavbar';
import { PublicFooter } from '../../components/layouts/PublicFooter';
import { SmartToy } from '../../components/icons/StitchIcons';
import {
  ArrowRight,
  Sparkles,
  FileText,
  Mic,
  Code2,
  Star,
  Target,
  Trophy,
  ChevronRight,
  Building2,
} from 'lucide-react';

function useCounter(end: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

const SAMPLE_ROLES = [
  {
    role: 'Full Stack SDE',
    skills: 'React, TypeScript, Node.js, PostgreSQL, Docker',
    score: 88,
    badge: 'Tier-1 SDE Ready',
    insight: 'Top 10% fit for Flipkart, Razorpay & Atlassian campus tracks.',
  },
  {
    role: 'Cloud & DevOps Engineer',
    skills: 'Go, Kubernetes, Terraform, AWS, Linux, CI/CD',
    score: 92,
    badge: 'Elite Infrastructure Fit',
    insight: 'Exceptional match for PhonePe & Cisco cloud networking teams.',
  },
  {
    role: 'Data Engineer / ML Ops',
    skills: 'Python, SQL, Apache Spark, Kafka, FastAPI',
    score: 84,
    badge: 'High Analytics Match',
    insight: 'Solid foundations; adding System Design will push score above 90+.',
  },
];

const RECRUITER_DRIVES = [
  { name: 'Atlassian', ctc: '₹28 LPA', tag: 'Product SDE', bg: 'bg-[#FFE600]', text: 'text-[#1A1A1A]' },
  { name: 'Google India', ctc: '₹34 LPA', tag: 'Software Engineer', bg: 'bg-[#00F5D4]', text: 'text-[#006B5B]' },
  { name: 'PhonePe', ctc: '₹22 LPA', tag: 'Campus Blitz', bg: 'bg-[#FAF3DF]', text: 'text-[#1E1C10]' },
  { name: 'Razorpay', ctc: '₹20 LPA', tag: 'Fullstack Dev', bg: 'bg-[#FFE600]', text: 'text-[#1A1A1A]' },
  { name: 'Cisco Systems', ctc: '₹16 LPA', tag: 'Core Network', bg: 'bg-[#9B5DE5]', text: 'text-white' },
  { name: 'Zoho Corp', ctc: '₹12 LPA', tag: 'App Engineer', bg: 'bg-[#FAF3DF]', text: 'text-[#1E1C10]' },
];

const TESTIMONIALS = [
  {
    name: 'Meera Krishnan',
    college: 'NIT Calicut, CSE 2026',
    offer: 'Atlassian · ₹28 LPA',
    text: 'The ATS scanner boosted my resume score from 61 to 89. Pal-Bot identified exact missing cloud metrics, and I cleared the tech screen in 2 days!',
    avatar: 'MK',
    avatarBg: 'bg-[#FFE600] text-[#1A1A1A]',
    stars: 5,
  },
  {
    name: 'Rohan Pillai',
    college: 'CUSAT, IT 2026',
    offer: 'PhonePe · ₹22 LPA',
    text: 'The AI mock interviews are unbelievably realistic. The real-time speech pace feedback and system design radar prepared me for tough panel rounds.',
    avatar: 'RP',
    avatarBg: 'bg-[#00F5D4] text-[#006B5B]',
    stars: 5,
  },
  {
    name: 'Anjali Nair',
    college: 'GEC Thrissur, CSE 2025',
    offer: 'Razorpay · ₹20 LPA',
    text: 'The structured 4-month campus roadmap kept me disciplined every morning. The interactive code streaks pushed me to solve 180+ DSA questions.',
    avatar: 'AN',
    avatarBg: 'bg-[#FFDAD6] text-[#BA1A1A]',
    stars: 5,
  },
];

export default function LandingPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Interactive Mini Audit State
  const [selectedRoleIdx, setSelectedRoleIdx] = useState(0);
  const [customSkills, setCustomSkills] = useState(SAMPLE_ROLES[0].skills);
  const [auditScore, setAuditScore] = useState(SAMPLE_ROLES[0].score);
  const [isAuditing, setIsAuditing] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const studentsCount = useCounter(1248, 1800, statsVisible);
  const placementRate = useCounter(94, 1600, statsVisible);
  const auditsCount = useCounter(3820, 2000, statsVisible);
  const avgCtc = useCounter(15, 1500, statsVisible);

  const handleSelectRole = (idx: number) => {
    setSelectedRoleIdx(idx);
    setCustomSkills(SAMPLE_ROLES[idx].skills);
    setAuditScore(SAMPLE_ROLES[idx].score);
  };

  const handleRunMiniAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * 8) + 86;
      setAuditScore(randomScore);
      setIsAuditing(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FFF9E9] text-[#1E1C10] selection:bg-[#FFE600] selection:text-[#1A1A1A]">
      <PublicNavbar />

      {/* ══════════════ 1. HERO SECTION ══════════════ */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full overflow-hidden">
        {/* Ambient Decorative Background Shapes */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#FFE600]/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-[#00F5D4]/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Call To Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Pill Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white text-[#1E1C10] border border-[#CDC7AA]/50 shadow-sm transition-transform hover:scale-105">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F5D4] animate-ping" />
              <SmartToy className="h-4 w-4 text-[#6A5F00]" />
              <span className="uppercase tracking-wider font-extrabold text-[#1A1A1A]">
                AI-Powered Campus Placement Companion
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[#1E1C10] tracking-tight leading-[1.1]">
              Crack Your Dream Campus Placements with{' '}
              <span className="relative inline-block">
                <span className="relative z-10 px-3 py-1 bg-[#FFE600] text-[#1A1A1A] rounded-2xl shadow-sm inline-block transform -rotate-1 hover:rotate-0 transition-transform">
                  Pal-Bot 🤖
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#4B4731] font-medium max-w-2xl leading-relaxed">
              The vibrant AI career intelligence ecosystem for engineering students. Auto-tune resumes for ATS, simulate realistic voice & video mock interviews, bridge coding gaps, and match verified campus recruiter drives.
            </p>

            {/* CTAs Button Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FFE600] hover:bg-[#DEC800] text-[#1A1A1A] font-black text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2.5 border border-[#CDC7AA]/40"
              >
                <span>Launch Your Readiness Audit</span>
                <ArrowRight className="h-4 w-4 text-[#1A1A1A]" />
              </Link>
              <a
                href="#mini-audit"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-[#FAF3DF] text-[#1E1C10] font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 border border-[#CDC7AA]/40"
              >
                <Sparkles className="h-4 w-4 text-[#6A5F00]" />
                <span>Try Live Mini Audit</span>
              </a>
            </div>

            {/* Social Proof Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-bold text-[#7C775F]">
              <div className="flex -space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FFE600] border-2 border-white flex items-center justify-center font-black text-[11px] text-[#1A1A1A]">
                  AM
                </div>
                <div className="w-8 h-8 rounded-full bg-[#00F5D4] border-2 border-white flex items-center justify-center font-black text-[11px] text-[#006B5B]">
                  SR
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FF6B6B] border-2 border-white flex items-center justify-center font-black text-[11px] text-white">
                  AN
                </div>
                <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-[#FFE600] border-2 border-white flex items-center justify-center font-black text-[10px]">
                  +1.2k
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#FFA116]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#FFA116]" />
                  ))}
                </div>
                <span className="text-[#1E1C10]">Verified by NIT Calicut & Top Engineering TPOs</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cartoon Bento Mascot Dashboard Preview (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Visual Mascot Panel */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#CDC7AA]/50 relative transition-transform hover:scale-[1.01]">
                {/* Floating Top Pill */}
                <div className="flex items-center justify-between pb-4 border-b border-[#CDC7AA]/30">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFE600] flex items-center justify-center shadow-md border border-[#CDC7AA]/40 text-[#1A1A1A]">
                      <SmartToy className="h-7 w-7 text-[#1A1A1A]" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-black text-[#1E1C10]">
                        Pal-Bot Active Audit
                      </h3>
                      <p className="text-xs text-[#006B5B] font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-ping" />
                        Online Coaching Mode
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#FAF3DF] text-[#6A5F00] font-black text-xs border border-[#CDC7AA]/40">
                    Tier-1 SDE
                  </span>
                </div>

                {/* Score Dial Showcase */}
                <div className="py-6 flex flex-col items-center text-center">
                  <div className="relative w-36 h-36 rounded-full bg-gradient-to-tr from-[#FFE600] via-[#FAF3DF] to-[#00F5D4] p-2 flex items-center justify-center shadow-inner">
                    <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center shadow-sm">
                      <span className="font-heading text-4xl font-black text-[#1E1C10]">88</span>
                      <span className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                        Readiness
                      </span>
                    </div>
                    <span className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-[#00F5D4] text-[#006B5B] font-black text-[10px] shadow-sm">
                      Recruiter Ready 🔥
                    </span>
                  </div>
                </div>

                {/* 3 Interactive Feature Progress Strips */}
                <div className="space-y-3 pt-2">
                  <div className="p-3 rounded-2xl bg-[#FAF3DF]/70 border border-[#CDC7AA]/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileText className="h-4 w-4 text-[#6A5F00]" />
                      <span className="text-xs font-bold text-[#1E1C10]">ATS Resume Score</span>
                    </div>
                    <span className="text-xs font-black text-[#006B5B]">92% Top 5%</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FAF3DF]/70 border border-[#CDC7AA]/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Mic className="h-4 w-4 text-[#9B5DE5]" />
                      <span className="text-xs font-bold text-[#1E1C10]">Mock Speech Clarity</span>
                    </div>
                    <span className="text-xs font-black text-[#6A5F00]">86% Clear Pace</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FAF3DF]/70 border border-[#CDC7AA]/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Code2 className="h-4 w-4 text-[#FF6B6B]" />
                      <span className="text-xs font-bold text-[#1E1C10]">DSA Mastery Streak</span>
                    </div>
                    <span className="text-xs font-black text-[#FF6B6B]">34 Days 🔥</span>
                  </div>
                </div>
              </div>

              {/* Floating Sticker 1 (Top Right) */}
              <div className="hidden sm:flex absolute -top-5 -right-6 bg-[#1A1A1A] text-white px-4 py-2.5 rounded-2xl shadow-xl border border-[#FFE600]/50 items-center gap-2.5 animate-bounce" style={{ animationDuration: '4s' }}>
                <Trophy className="h-4.5 w-4.5 text-[#FFE600]" />
                <div>
                  <p className="text-[11px] font-black text-[#FFE600]">Shortlisted!</p>
                  <p className="text-[10px] text-gray-300 font-medium">Flipkart Day-1 SDE Track</p>
                </div>
              </div>

              {/* Floating Sticker 2 (Bottom Left) */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white text-[#1E1C10] px-4 py-2.5 rounded-2xl shadow-xl border border-[#CDC7AA]/40 items-center gap-2.5">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="text-[10px] font-bold text-[#7C775F] uppercase">Average Package</p>
                  <p className="font-heading text-sm font-black text-[#006B5B]">₹14.8 LPA CTC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 2. TOP CAMPUS RECRUITERS TICKER ══════════════ */}
      <section className="py-8 bg-[#FAF3DF]/80 border-y border-[#CDC7AA]/40 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="shrink-0 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#6A5F00]" />
              <span className="font-heading text-xs font-black uppercase tracking-wider text-[#1E1C10]">
                Active Recruiter Drives:
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 justify-center md:justify-end">
              {RECRUITER_DRIVES.map((d) => (
                <div
                  key={d.name}
                  className="px-4 py-2 rounded-full bg-white border border-[#CDC7AA]/40 shadow-xs flex items-center gap-2.5 transition-transform hover:scale-105"
                >
                  <span className="font-black text-xs text-[#1E1C10]">{d.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${d.bg} ${d.text}`}>
                    {d.ctc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 3. INTERACTIVE LIVE MINI AUDIT PLAYGROUND ══════════════ */}
      <section id="mini-audit" className="py-20 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#CDC7AA]/50 shadow-md flex flex-col gap-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#CDC7AA]/30">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-1 rounded-full bg-[#FFE600] text-[#1A1A1A] font-black text-xs">
                  ⚡ Interactive Demo
                </span>
                <span className="text-xs font-bold text-[#006B5B]">No signup required to test</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#1E1C10]">
                Test Pal-Bot Instant Placement Benchmark
              </h2>
              <p className="text-xs sm:text-sm text-[#4B4731] font-medium mt-1">
                Select your engineering target role, adjust your skills, and see your instant simulated readiness.
              </p>
            </div>

            {/* Target Role Selector Chips */}
            <div className="flex items-center gap-2 flex-wrap">
              {SAMPLE_ROLES.map((r, idx) => (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => handleSelectRole(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedRoleIdx === idx
                      ? 'bg-[#1A1A1A] text-white shadow-sm'
                      : 'bg-[#FAF3DF] text-[#1E1C10] hover:bg-[#F4EEDA] border border-[#CDC7AA]/40'
                  }`}
                >
                  {r.role}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Input Playground (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#7C775F] uppercase tracking-wider mb-2">
                  Your Current Skills & Technologies
                </label>
                <textarea
                  rows={3}
                  value={customSkills}
                  onChange={(e) => setCustomSkills(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-[#FAF3DF]/60 text-[#1E1C10] font-semibold text-xs sm:text-sm border border-[#CDC7AA]/40 outline-none focus:bg-white focus:border-[#6A5F00] transition-colors"
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleRunMiniAudit}
                  disabled={isAuditing}
                  className="px-6 py-3 rounded-full bg-[#FFE600] hover:bg-[#DEC800] text-[#1A1A1A] font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 border border-[#CDC7AA]/40"
                >
                  <Sparkles className={`h-4 w-4 text-[#1A1A1A] ${isAuditing ? 'animate-spin' : ''}`} />
                  <span>{isAuditing ? 'Auditing Skills...' : 'Re-calculate Fit Score ✨'}</span>
                </button>
                <span className="text-xs text-[#7C775F] font-medium">
                  Matches ATS keyword patterns for 2026 hiring
                </span>
              </div>
            </div>

            {/* Right: Instant Score Result Card (5 cols) */}
            <div className="lg:col-span-5 bg-[#FAF3DF] p-6 sm:p-7 rounded-3xl border border-[#CDC7AA]/40 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                    Simulated Readiness
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-heading text-4xl sm:text-5xl font-black text-[#1E1C10]">
                      {auditScore}%
                    </span>
                    <span className="text-xs font-bold text-[#006B5B] bg-[#00F5D4]/40 px-2.5 py-0.5 rounded-full">
                      {SAMPLE_ROLES[selectedRoleIdx].badge}
                    </span>
                  </div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#FFE600] flex items-center justify-center text-[#1A1A1A] shadow-xs">
                  <SmartToy className="h-6 w-6 text-[#1A1A1A]" />
                </div>
              </div>

              <p className="text-xs text-[#4B4731] bg-white p-3.5 rounded-2xl border border-[#CDC7AA]/30 leading-relaxed font-medium">
                {SAMPLE_ROLES[selectedRoleIdx].insight}
              </p>

              <Link
                to="/register"
                className="w-full py-2.5 rounded-full bg-[#1A1A1A] hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
              >
                <span>Unlock Full Roadmap & Mock AI</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#FFE600]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 4. CARTOON BENTO 4 PILLARS ══════════════ */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-4 py-1.5 rounded-full bg-[#FAF3DF] text-[#6A5F00] font-black text-xs border border-[#CDC7AA]/40 inline-block mb-3">
            THE 4-PILLAR INTELLIGENCE ENGINE
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1C10] tracking-tight">
            Everything You Need to Get Placed
          </h2>
          <p className="text-sm sm:text-base text-[#4B4731] font-medium mt-2">
            No fragmented tools. Placement Pal combines resume vetting, live mock tests, coding streaks, and campus recruiter alignments in one joyful dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Resume AI */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#CDC7AA]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FFE600] flex items-center justify-center text-[#1A1A1A] mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6 text-[#1A1A1A]" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6A5F00] bg-[#FAF3DF] px-2.5 py-0.5 rounded-full">
                01 · Resume AI
              </span>
              <h3 className="font-heading text-xl font-black text-[#1E1C10] mt-2 mb-1.5">
                ATS Scanner & Auditor
              </h3>
              <p className="text-xs text-[#4B4731] leading-relaxed font-medium">
                Scans your PDF resume against Tier-1 SDE job descriptions. Auto-suggests quantified bullet metrics that bypass recruiter filters.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-[#CDC7AA]/20">
              <Link to="/resume" className="text-xs font-bold text-[#6A5F00] flex items-center gap-1 hover:underline">
                <span>Test Resume Scanner</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: AI Mock Interview */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#CDC7AA]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#00F5D4] flex items-center justify-center text-[#006B5B] mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <Mic className="h-6 w-6 text-[#006B5B]" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#006B5B] bg-[#00F5D4]/20 px-2.5 py-0.5 rounded-full">
                02 · Simulator
              </span>
              <h3 className="font-heading text-xl font-black text-[#1E1C10] mt-2 mb-1.5">
                AI Voice & Tech Mocks
              </h3>
              <p className="text-xs text-[#4B4731] leading-relaxed font-medium">
                Practice technical DSA explanation, system design trade-offs, and HR STAR method scenarios with live real-time AI speech feedback.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-[#CDC7AA]/20">
              <Link to="/interview" className="text-xs font-bold text-[#006B5B] flex items-center gap-1 hover:underline">
                <span>Start Mock Session</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Skill Gap Radar */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#CDC7AA]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#9B5DE5] flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <Target className="h-6 w-6 text-white" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#9B5DE5] bg-[#9B5DE5]/20 px-2.5 py-0.5 rounded-full">
                03 · Gap Analysis
              </span>
              <h3 className="font-heading text-xl font-black text-[#1E1C10] mt-2 mb-1.5">
                Role Benchmark Radar
              </h3>
              <p className="text-xs text-[#4B4731] leading-relaxed font-medium">
                Compare your current skills side-by-side against campus criteria for companies like Google, PhonePe, and Atlassian to see missing gaps.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-[#CDC7AA]/20">
              <Link to="/skill-gap" className="text-xs font-bold text-[#9B5DE5] flex items-center gap-1 hover:underline">
                <span>Analyze Skill Gaps</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Coding Coach */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#CDC7AA]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FF6B6B] flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#BA1A1A] bg-[#FFDAD6] px-2.5 py-0.5 rounded-full">
                04 · DSA Coach
              </span>
              <h3 className="font-heading text-xl font-black text-[#1E1C10] mt-2 mb-1.5">
                Campus Question Bank
              </h3>
              <p className="text-xs text-[#4B4731] leading-relaxed font-medium">
                480+ verified campus coding problems across DP, Graphs, Trees, and SQL with instant test runners and Pal-Bot hint generation.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-[#CDC7AA]/20">
              <Link to="/coding" className="text-xs font-bold text-[#BA1A1A] flex items-center gap-1 hover:underline">
                <span>Practice Challenges</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 5. LIVE TELEMETRY COUNTERS ══════════════ */}
      <section ref={statsRef} className="py-16 bg-white border-y border-[#CDC7AA]/40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-heading text-4xl sm:text-5xl font-black text-[#1E1C10]">
                {studentsCount}+
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#7C775F] uppercase tracking-wider mt-1">
                Students Coached
              </p>
            </div>
            <div>
              <div className="font-heading text-4xl sm:text-5xl font-black text-[#006B5B]">
                {placementRate}%
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#7C775F] uppercase tracking-wider mt-1">
                Placement Conversion
              </p>
            </div>
            <div>
              <div className="font-heading text-4xl sm:text-5xl font-black text-[#6A5F00]">
                {auditsCount}+
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#7C775F] uppercase tracking-wider mt-1">
                AI Audits Completed
              </p>
            </div>
            <div>
              <div className="font-heading text-4xl sm:text-5xl font-black text-[#1E1C10]">
                ₹{avgCtc} LPA
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#7C775F] uppercase tracking-wider mt-1">
                Average Offer CTC
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 6. STUDENT SUCCESS WALL ══════════════ */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-4 py-1.5 rounded-full bg-[#FAF3DF] text-[#006B5B] font-black text-xs border border-[#CDC7AA]/40 inline-block mb-3">
            VERIFIED SUCCESS STORIES
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#1E1C10]">
            Loved by Campus Toppers
          </h2>
          <p className="text-xs sm:text-sm text-[#4B4731] font-medium mt-1">
            See how final-year students cracked Tier-1 engineering offers using Pal-Bot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white p-7 rounded-3xl border-2 border-[#CDC7AA]/40 shadow-sm flex flex-col justify-between transition-all hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#FAF3DF] text-[#006B5B] font-bold text-xs border border-[#CDC7AA]/30">
                    {t.offer}
                  </span>
                  <div className="flex text-[#FFA116]">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#FFA116]" />
                    ))}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#4B4731] leading-relaxed font-medium italic">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-[#CDC7AA]/30">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center font-heading text-sm font-black shadow-xs ${t.avatarBg}`}
                >
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-heading text-sm font-black text-[#1E1C10]">{t.name}</h4>
                  <p className="text-[11px] text-[#7C775F] font-semibold">{t.college}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ 7. FINAL HIGH-ENERGY CALL TO ACTION ══════════════ */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full">
        <div className="bg-[#1A1A1A] text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden border-2 border-[#FFE600]/40 flex flex-col items-center text-center">
          {/* Glowing Ambient Halo */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FFE600]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-[#FFE600] text-[#1A1A1A] mx-auto flex items-center justify-center shadow-lg border-2 border-white">
              <SmartToy className="h-9 w-9 text-[#1A1A1A]" />
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Ready to Land Your Dream Campus Offer?
            </h2>

            <p className="text-xs sm:text-sm text-[#CDC7AA] font-medium leading-relaxed max-w-xl mx-auto">
              Join 1,200+ students from top engineering universities preparing with Pal-Bot. Take your free readiness audit in 60 seconds.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-4 rounded-full bg-[#FFE600] hover:bg-[#DEC800] text-[#1A1A1A] font-black text-sm shadow-lg transition-transform active:scale-95 flex items-center gap-2"
              >
                <span>Get Started Free — No Credit Card</span>
                <ArrowRight className="h-4 w-4 text-[#1A1A1A]" />
              </Link>
              <Link
                to="/about"
                className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/10"
              >
                Learn More About The Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
