import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PublicNavbar } from '../../components/layouts/PublicNavbar';
import { PublicFooter } from '../../components/layouts/PublicFooter';
import { HeroScrollAnimation } from '../../components/sections/HeroScrollAnimation';
import { PlacementQuickCheck } from '../../components/sections/PlacementQuickCheck';
import { SmartToy } from '../../components/icons/StitchIcons';
import {
  ArrowRight,
  FileText,
  Mic,
  Code2,
  Star,
  Target,
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

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FFF9E9] text-[#1E1C10] selection:bg-[#FFE600] selection:text-[#1A1A1A]">
      <PublicNavbar />

      {/* ══════════════ 1. HERO SCROLL ANIMATION SECTION ══════════════ */}
      <HeroScrollAnimation />

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

      {/* ══════════════ 3. INTERACTIVE GLASSMORPHISM PLACEMENT Q&A CHECK ══════════════ */}
      <PlacementQuickCheck />

      {/* ══════════════ 4. GLASSMORPHIC THEMED 4 PILLARS ══════════════ */}
      <section className="relative py-20 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full">
        {/* Ambient Soft Mesh Gradient Orbs (enhances real glassmorphic refraction) */}
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-[#FFE600]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-[#00F5D4]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#9B5DE5]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-[#FF6B6B]/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-[#6A5F00] font-black text-xs border border-[#CDC7AA]/50 shadow-xs inline-block mb-3">
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
          <Link
            to="/resume"
            className="group relative rounded-3xl overflow-hidden border border-white/60 bg-[#1E1C10] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between h-[450px]"
          >
            <img
              src="/images/feature_ats.jpg"
              alt="ATS Resume AI"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 group-hover:from-black/75 transition-colors duration-500" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            {/* Top Floating Glass Badges */}
            <div className="relative z-10 p-5 flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/85 backdrop-blur-md flex items-center justify-center text-[#1A1A1A] shadow-md border border-white/60 group-hover:scale-110 group-hover:bg-[#FFE600] transition-all">
                <FileText className="h-6 w-6 text-[#1A1A1A]" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1A1A1A] bg-white/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/60 shadow-xs">
                01 · Resume AI
              </span>
            </div>

            {/* Bottom Frosted Glass Card Panel */}
            <div className="relative z-10 m-3 p-5 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/70 shadow-lg group-hover:bg-white/95 transition-all duration-300">
              <h3 className="font-heading text-lg sm:text-xl font-black text-[#1E1C10] leading-snug">
                ATS Scanner & Auditor
              </h3>
              <p className="text-xs text-[#4B4731] leading-relaxed font-medium mt-1.5">
                Scans your PDF resume against Tier-1 SDE job descriptions. Auto-suggests quantified bullet metrics that bypass recruiter filters.
              </p>
              <div className="pt-3.5 mt-3.5 border-t border-[#CDC7AA]/40 flex items-center justify-between text-xs font-black text-[#6A5F00]">
                <span>Test Resume Scanner</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Card 2: AI Mock Interview */}
          <Link
            to="/interview"
            className="group relative rounded-3xl overflow-hidden border border-white/60 bg-[#1E1C10] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between h-[450px]"
          >
            <img
              src="/images/feature_mock.jpg"
              alt="AI Voice & Tech Mocks"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 group-hover:from-black/75 transition-colors duration-500" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            {/* Top Floating Glass Badges */}
            <div className="relative z-10 p-5 flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/85 backdrop-blur-md flex items-center justify-center text-[#006B5B] shadow-md border border-white/60 group-hover:scale-110 group-hover:bg-[#00F5D4] transition-all">
                <Mic className="h-6 w-6 text-[#006B5B]" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#006B5B] bg-white/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/60 shadow-xs">
                02 · Simulator
              </span>
            </div>

            {/* Bottom Frosted Glass Card Panel */}
            <div className="relative z-10 m-3 p-5 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/70 shadow-lg group-hover:bg-white/95 transition-all duration-300">
              <h3 className="font-heading text-lg sm:text-xl font-black text-[#1E1C10] leading-snug">
                AI Voice & Tech Mocks
              </h3>
              <p className="text-xs text-[#4B4731] leading-relaxed font-medium mt-1.5">
                Practice technical DSA explanation, system design trade-offs, and HR STAR method scenarios with live real-time AI speech feedback.
              </p>
              <div className="pt-3.5 mt-3.5 border-t border-[#CDC7AA]/40 flex items-center justify-between text-xs font-black text-[#006B5B]">
                <span>Start Mock Session</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Card 3: Skill Gap Radar */}
          <Link
            to="/skill-gap"
            className="group relative rounded-3xl overflow-hidden border border-white/60 bg-[#1E1C10] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between h-[450px]"
          >
            <img
              src="/images/feature_skill.jpg"
              alt="Role Benchmark Radar"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 group-hover:from-black/75 transition-colors duration-500" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            {/* Top Floating Glass Badges */}
            <div className="relative z-10 p-5 flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/85 backdrop-blur-md flex items-center justify-center text-[#7C3AED] shadow-md border border-white/60 group-hover:scale-110 group-hover:bg-[#9B5DE5] group-hover:text-white transition-all">
                <Target className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7C3AED] bg-white/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/60 shadow-xs">
                03 · Gap Analysis
              </span>
            </div>

            {/* Bottom Frosted Glass Card Panel */}
            <div className="relative z-10 m-3 p-5 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/70 shadow-lg group-hover:bg-white/95 transition-all duration-300">
              <h3 className="font-heading text-lg sm:text-xl font-black text-[#1E1C10] leading-snug">
                Role Benchmark Radar
              </h3>
              <p className="text-xs text-[#4B4731] leading-relaxed font-medium mt-1.5">
                Compare your current skills side-by-side against campus criteria for companies like Google, PhonePe, and Atlassian to see missing gaps.
              </p>
              <div className="pt-3.5 mt-3.5 border-t border-[#CDC7AA]/40 flex items-center justify-between text-xs font-black text-[#7C3AED]">
                <span>Analyze Skill Gaps</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Card 4: Coding Coach */}
          <Link
            to="/coding"
            className="group relative rounded-3xl overflow-hidden border border-white/60 bg-[#1E1C10] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between h-[450px]"
          >
            <img
              src="/images/feature_coding.jpg"
              alt="Campus Question Bank"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 group-hover:from-black/75 transition-colors duration-500" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            {/* Top Floating Glass Badges */}
            <div className="relative z-10 p-5 flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/85 backdrop-blur-md flex items-center justify-center text-[#DC2626] shadow-md border border-white/60 group-hover:scale-110 group-hover:bg-[#FF6B6B] group-hover:text-white transition-all">
                <Code2 className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#DC2626] bg-white/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/60 shadow-xs">
                04 · DSA Coach
              </span>
            </div>

            {/* Bottom Frosted Glass Card Panel */}
            <div className="relative z-10 m-3 p-5 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/70 shadow-lg group-hover:bg-white/95 transition-all duration-300">
              <h3 className="font-heading text-lg sm:text-xl font-black text-[#1E1C10] leading-snug">
                Campus Question Bank
              </h3>
              <p className="text-xs text-[#4B4731] leading-relaxed font-medium mt-1.5">
                480+ verified campus coding problems across DP, Graphs, Trees, and SQL with instant test runners and Pal-Bot hint generation.
              </p>
              <div className="pt-3.5 mt-3.5 border-t border-[#CDC7AA]/40 flex items-center justify-between text-xs font-black text-[#DC2626]">
                <span>Practice Challenges</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
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
