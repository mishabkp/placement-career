import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { PublicNavbar } from '../../components/layouts/PublicNavbar';
import { PublicFooter } from '../../components/layouts/PublicFooter';
import { SmartToy } from '../../components/icons/StitchIcons';
import {
  Award,
  GraduationCap,
  ArrowRight,
  School,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Star,
} from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/team';

// Confetti particle data
const CONFETTI = [
  { id: 0,  x: -80, y: -60, r: 0,   color: '#FFE600', size: 10, delay: 0    },
  { id: 1,  x:  80, y: -60, r: 30,  color: '#00F5D4', size: 8,  delay: 0.05 },
  { id: 2,  x: -40, y: -90, r: -20, color: '#FF6B6B', size: 12, delay: 0.1  },
  { id: 3,  x:  40, y: -90, r: 60,  color: '#FFE600', size: 6,  delay: 0.08 },
  { id: 4,  x: -100,y: -30, r: 45,  color: '#9B5DE5', size: 9,  delay: 0.15 },
  { id: 5,  x:  100,y: -30, r: -45, color: '#FFE600', size: 7,  delay: 0.12 },
  { id: 6,  x: -60, y: -100,r: 10,  color: '#00F5D4', size: 11, delay: 0.2  },
  { id: 7,  x:  60, y: -100,r: -10, color: '#FF6B6B', size: 8,  delay: 0.18 },
  { id: 8,  x: -120,y: -50, r: 20,  color: '#FFE600', size: 6,  delay: 0.22 },
  { id: 9,  x:  120,y: -50, r: -20, color: '#9B5DE5', size: 10, delay: 0.25 },
  { id: 10, x:   0, y: -110,r: 0,   color: '#FFE600', size: 14, delay: 0.03 },
  { id: 11, x: -90, y: -80, r: -35, color: '#00F5D4', size: 7,  delay: 0.17 },
  { id: 12, x:  90, y: -80, r: 35,  color: '#FF6B6B', size: 9,  delay: 0.14 },
];


const TIMELINE_PHASES = [
  {
    phase: '01',
    title: 'Ideation',
    period: 'Aug 2024',
    desc: 'Identified the critical gap in campus placement prep. Brainstormed Placement Pal concept with faculty guidance.',
    icon: '💡',
    color: '#FFE600',
    bg: 'bg-[#FFE600]',
    textDark: 'text-[#1A1A1A]',
    border: 'border-[#FFE600]',
    glow: 'rgba(255,230,0,0.5)',
    tags: ['Problem Discovery', 'Concept Mapping'],
  },
  {
    phase: '02',
    title: 'Research',
    period: 'Sep 2024',
    desc: 'Analyzed 50+ student failure patterns in placements. Studied ATS systems, interview rubrics, and DSA evaluation pipelines.',
    icon: '🔬',
    color: '#00F5D4',
    bg: 'bg-[#00F5D4]',
    textDark: 'text-[#006B5B]',
    border: 'border-[#00F5D4]',
    glow: 'rgba(0,245,212,0.5)',
    tags: ['User Research', 'Competitive Analysis'],
  },
  {
    phase: '03',
    title: 'Design',
    period: 'Oct–Nov 2024',
    desc: 'Created 80+ Figma wireframes. Established the cartoon vibrant design system with Stitch-generated components.',
    icon: '🎨',
    color: '#FF6B6B',
    bg: 'bg-[#FF6B6B]',
    textDark: 'text-white',
    border: 'border-[#FF6B6B]',
    glow: 'rgba(255,107,107,0.5)',
    tags: ['UI/UX Design', 'Design System'],
  },
  {
    phase: '04',
    title: 'Development',
    period: 'Dec 2024–Feb 2025',
    desc: 'Built 14 intelligent modules in React + TypeScript. Integrated Google Gemini AI for resume parsing and mock interviews.',
    icon: '⚙️',
    color: '#9B5DE5',
    bg: 'bg-[#9B5DE5]',
    textDark: 'text-white',
    border: 'border-[#9B5DE5]',
    glow: 'rgba(155,93,229,0.5)',
    tags: ['React + TypeScript', 'Gemini AI Integration'],
  },
  {
    phase: '05',
    title: 'Testing',
    period: 'Mar 2025',
    desc: 'Conducted UAT with 30+ engineering students. Refined AI feedback accuracy and ATS scoring algorithm performance.',
    icon: '🧪',
    color: '#FFE600',
    bg: 'bg-[#FFE600]',
    textDark: 'text-[#1A1A1A]',
    border: 'border-[#FFE600]',
    glow: 'rgba(255,230,0,0.5)',
    tags: ['UAT Testing', 'Performance Tuning'],
  },
  {
    phase: '06',
    title: 'Launch',
    period: 'Apr 2025',
    desc: 'KTU capstone submission. Placement Pal deployed as a fully functional AI-powered campus placement companion.',
    icon: '🚀',
    color: '#00F5D4',
    bg: 'bg-[#00F5D4]',
    textDark: 'text-[#006B5B]',
    border: 'border-[#00F5D4]',
    glow: 'rgba(0,245,212,0.5)',
    tags: ['KTU Submission', 'Live Deployment'],
  },
];

function ProjectTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCount, setActiveCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  // Stagger cards one by one
  useEffect(() => {
    if (!started) return;
    let count = 0;
    const id = setInterval(() => {
      count += 1;
      setActiveCount(count);
      if (count >= TIMELINE_PHASES.length) clearInterval(id);
    }, 220);
    return () => clearInterval(id);
  }, [started]);

  return (
    <section ref={sectionRef} className="py-16 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="px-4 py-1.5 rounded-full bg-[#1A1A1A] text-[#FFE600] font-black text-xs border border-[#FFE600]/40 inline-block mb-3 uppercase tracking-widest">
          🗓️ Project Journey
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#1E1C10] tracking-tight">
          From Idea to Impact — Our Development Timeline
        </h2>
        <p className="text-xs sm:text-sm text-[#4B4731] font-medium mt-2">
          Six months of focused engineering, design, and AI integration — one semester, one mission.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* ── Connecting line (desktop) ── */}
        <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-0.5 bg-[#CDC7AA]/30 z-0">
          {/* Animated fill */}
          <div
            className="h-full bg-gradient-to-r from-[#FFE600] via-[#FF6B6B] to-[#00F5D4] rounded-full transition-all duration-[1600ms] ease-out"
            style={{ width: started ? `${(activeCount / TIMELINE_PHASES.length) * 100}%` : '0%' }}
          />
        </div>

        {/* ── Phase Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 relative z-10">
          {TIMELINE_PHASES.map((phase, i) => {
            const isActive = i < activeCount;
            return (
              <div
                key={phase.phase}
                className="flex flex-col items-center text-center"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.92)',
                  transition: `opacity 500ms cubic-bezier(0.34,1.56,0.64,1), transform 500ms cubic-bezier(0.34,1.56,0.64,1)`,
                  transitionDelay: `${i * 40}ms`,
                }}
              >
                {/* Dot + Icon */}
                <div className="relative mb-4">
                  {/* Outer pulsing ring */}
                  {isActive && (
                    <div
                      className="absolute -inset-2 rounded-full opacity-40 animate-ping"
                      style={{ background: phase.glow }}
                    />
                  )}
                  {/* Glow halo */}
                  <div
                    className="absolute -inset-1 rounded-full blur-md transition-opacity duration-700"
                    style={{ background: phase.glow, opacity: isActive ? 0.6 : 0 }}
                  />
                  {/* Main circle */}
                  <div
                    className={`relative w-[52px] h-[52px] rounded-full ${phase.bg} flex items-center justify-center text-xl shadow-lg border-4 border-white transition-all duration-500`}
                    style={{
                      boxShadow: isActive ? `0 0 20px ${phase.glow}, 0 4px 14px rgba(0,0,0,0.12)` : '0 4px 14px rgba(0,0,0,0.08)',
                    }}
                  >
                    <span role="img" aria-label={phase.title}>{phase.icon}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div
                  className="w-full rounded-3xl p-5 bg-white border-2 border-[#CDC7AA]/40 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-2.5 text-left"
                  style={{
                    borderColor: isActive ? `${phase.color}55` : undefined,
                    boxShadow: isActive ? `0 0 0 2px ${phase.color}22, 0 4px 20px rgba(0,0,0,0.06)` : undefined,
                  }}
                >
                  {/* Phase number + period */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={{ background: `${phase.color}22`, color: phase.color === '#FFE600' ? '#6A5F00' : phase.color }}
                    >
                      Phase {phase.phase}
                    </span>
                    <span className="text-[9px] font-bold text-[#7C775F]">{phase.period}</span>
                  </div>

                  {/* Title */}
                  <h4 className="font-heading font-black text-base text-[#1E1C10]">{phase.title}</h4>

                  {/* Description */}
                  <p className="text-[11px] text-[#4B4731] font-medium leading-relaxed">{phase.desc}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1 border-t border-[#CDC7AA]/20">
                    {phase.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#FAF3DF] text-[#6A5F00] border border-[#CDC7AA]/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CheckCircle if complete */}
                  {isActive && i < TIMELINE_PHASES.length - 1 && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-[#006B5B] mt-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Completed</span>
                    </div>
                  )}
                  {isActive && i === TIMELINE_PHASES.length - 1 && (
                    <div className="flex items-center gap-1 text-[10px] font-black text-[#9B5DE5] mt-1">
                      <span className="w-2 h-2 rounded-full bg-[#9B5DE5] animate-pulse" />
                      <span>Live Now ✨</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile vertical connector */}
        <div className="lg:hidden absolute left-[50%] top-0 bottom-0 w-0.5 bg-[#CDC7AA]/30 -z-0 ml-[-1px]">
          <div
            className="w-full bg-gradient-to-b from-[#FFE600] via-[#FF6B6B] to-[#00F5D4] rounded-full transition-all duration-[1600ms] ease-out"
            style={{ height: started ? `${(activeCount / TIMELINE_PHASES.length) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
        {[
          { val: '8', unit: 'Months', label: 'Development', color: '#FFE600', bg: 'bg-[#FFE600]/15' },
          { val: '14', unit: 'Modules', label: 'AI Features Built', color: '#00F5D4', bg: 'bg-[#00F5D4]/15' },
          { val: '30+', unit: 'Students', label: 'Beta Testers', color: '#FF6B6B', bg: 'bg-[#FF6B6B]/15' },
          { val: '100%', unit: 'KTU', label: 'Capstone Approved', color: '#9B5DE5', bg: 'bg-[#9B5DE5]/15' },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={`rounded-3xl p-5 ${stat.bg} border border-white/60 text-center`}
            style={{
              opacity: activeCount > i * 1.5 ? 1 : 0,
              transform: activeCount > i * 1.5 ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 600ms cubic-bezier(0.34,1.56,0.64,1)',
              transitionDelay: `${i * 100}ms`,
            }}
          >
            <div className="font-heading text-3xl font-black" style={{ color: stat.color === '#FFE600' ? '#6A5F00' : stat.color }}>
              {stat.val}
            </div>
            <div className="text-[10px] font-black uppercase tracking-wider text-[#7C775F] mt-0.5">{stat.unit}</div>
            <div className="text-xs text-[#4B4731] font-semibold mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FacultyRevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed) {
          setRevealed(true);
          // Fire confetti burst 400ms after curtains start
          setTimeout(() => setShowConfetti(true), 400);
          // Hide confetti after 2.5s
          setTimeout(() => setShowConfetti(false), 2800);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  return (
    <section ref={sectionRef} className="py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full">
      {/* ─── Section pre-title ─── */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1A] text-[#FFE600] font-black text-xs border border-[#FFE600]/40 shadow-sm uppercase tracking-widest">
          <span>👑</span> Faculty Spotlight
        </span>
      </div>

      {/* ─── Curtain Stage ─── */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#CDC7AA]/50" style={{ minHeight: 340 }}>

        {/* ── BACKGROUND (always visible) ── */}
        <div className="absolute inset-0 bg-[#1A1A1A]" />

        {/* Deep gold ambient glow behind the photo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-80 h-80 rounded-full blur-3xl transition-opacity duration-[1200ms]"
            style={{
              background: 'radial-gradient(circle, rgba(255,230,0,0.35) 0%, rgba(255,180,0,0.12) 50%, transparent 80%)',
              opacity: revealed ? 1 : 0,
            }}
          />
        </div>

        {/* ── LEFT CURTAIN PANEL ── */}
        <div
          className="absolute inset-y-0 left-0 w-1/2 z-20 transition-transform duration-[900ms]"
          style={{
            transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
            transform: revealed ? 'translateX(-102%)' : 'translateX(0)',
          }}
        >
          {/* Velvet texture */}
          <div
            className="w-full h-full relative"
            style={{
              background: 'linear-gradient(160deg, #8B0000 0%, #6B0000 30%, #9B1111 55%, #7A0000 80%, #5A0000 100%)',
            }}
          >
            {/* Fabric fold lines */}
            {[15, 30, 45, 60, 75].map((p) => (
              <div
                key={p}
                className="absolute inset-y-0 opacity-30"
                style={{
                  left: `${p}%`,
                  width: 3,
                  background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.6) 70%, transparent)',
                }}
              />
            ))}
            {/* Top gold fringe */}
            <div className="absolute top-0 left-0 right-0 h-6 flex items-end justify-center overflow-hidden">
              {[...Array(14)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 mx-0.5 rounded-b-full"
                  style={{ height: 10 + (i % 3) * 4, background: 'linear-gradient(to bottom, #FFE600, #B8960C)' }}
                />
              ))}
            </div>
            {/* Right-edge highlight (simulates thickness) */}
            <div className="absolute right-0 inset-y-0 w-4 bg-gradient-to-l from-black/40 to-transparent" />
          </div>
        </div>

        {/* ── RIGHT CURTAIN PANEL ── */}
        <div
          className="absolute inset-y-0 right-0 w-1/2 z-20 transition-transform duration-[900ms]"
          style={{
            transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
            transform: revealed ? 'translateX(102%)' : 'translateX(0)',
          }}
        >
          <div
            className="w-full h-full relative"
            style={{
              background: 'linear-gradient(200deg, #5A0000 0%, #7A0000 25%, #9B1111 50%, #6B0000 75%, #8B0000 100%)',
            }}
          >
            {[15, 30, 45, 60, 75].map((p) => (
              <div
                key={p}
                className="absolute inset-y-0 opacity-30"
                style={{
                  left: `${p}%`,
                  width: 3,
                  background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.6) 70%, transparent)',
                }}
              />
            ))}
            <div className="absolute top-0 left-0 right-0 h-6 flex items-end justify-center overflow-hidden">
              {[...Array(14)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 mx-0.5 rounded-b-full"
                  style={{ height: 10 + (i % 3) * 4, background: 'linear-gradient(to bottom, #FFE600, #B8960C)' }}
                />
              ))}
            </div>
            <div className="absolute left-0 inset-y-0 w-4 bg-gradient-to-r from-black/40 to-transparent" />
          </div>
        </div>

        {/* ── SPOTLIGHT RAY (sweeps across) ── */}
        <div
          className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
          style={{ opacity: revealed ? 1 : 0, transition: 'opacity 600ms ease 700ms' }}
        >
          <div
            className="absolute"
            style={{
              top: '-20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 260,
              height: '140%',
              background: 'conic-gradient(from 170deg at 50% 0%, transparent 10deg, rgba(255,230,0,0.18) 20deg, rgba(255,200,0,0.10) 30deg, transparent 40deg)',
              animation: revealed ? 'spotlightSweep 2s ease-out forwards' : 'none',
            }}
          />
        </div>

        {/* ── CONFETTI PARTICLES ── */}
        {showConfetti && (
          <div className="absolute z-30 pointer-events-none" style={{ top: '50%', left: '22%' }}>
            {CONFETTI.map((c) => (
              <div
                key={c.id}
                style={{
                  position: 'absolute',
                  width: c.size,
                  height: c.size,
                  borderRadius: c.id % 3 === 0 ? '50%' : c.id % 3 === 1 ? '2px' : '50% 0 50% 0',
                  background: c.color,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${c.delay}s`,
                  animation: `confettiBurst 1.2s cubic-bezier(0.22,1,0.36,1) ${c.delay}s both`,
                  '--tx': `${c.x}px`,
                  '--ty': `${c.y}px`,
                  '--rot': `${c.r}deg`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        {/* ── REVEALED CONTENT ── */}
        <div
          className="relative z-10 p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 transition-all duration-700"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: '700ms',
          }}
        >
          {/* ── Photo + Crown ── */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-center sm:text-left flex-1">
            <div className="relative shrink-0">
              {/* Spinning golden star ring */}
              <div
                className="absolute -inset-4 rounded-3xl border-2 border-dashed border-[#FFE600]/50 pointer-events-none"
                style={{
                  animation: revealed ? 'slowSpin 12s linear infinite' : 'none',
                }}
              />
              {/* Outer glow pulse */}
              <div
                className="absolute -inset-3 rounded-3xl blur-lg pointer-events-none"
                style={{
                  background: 'rgba(255,230,0,0.25)',
                  animation: revealed ? 'glowPulse 2.5s ease-in-out infinite' : 'none',
                }}
              />

              {/* Crown Badge — springs in */}
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 bg-[#1A1A1A] text-[#FFE600] px-3 py-1.5 rounded-full border border-[#FFE600]/50 shadow-lg flex items-center gap-1.5 text-xs font-black whitespace-nowrap"
                style={{
                  animation: revealed ? 'springBounceDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1s both' : 'none',
                  opacity: 0,
                }}
              >
                <span className="text-base">👑</span>
                <span className="uppercase tracking-wider">Project Guide</span>
                <Sparkles className="h-3.5 w-3.5" />
              </div>

              {/* Photo */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl p-2 shadow-[0_0_40px_rgba(255,230,0,0.5)]" style={{ background: 'linear-gradient(135deg, #FFE600, #FAF3DF 45%, #00F5D4 100%)' }}>
                <div className="w-full h-full rounded-2xl overflow-hidden bg-[#FAF3DF]">
                  <img
                    src="/guide-rincy.png"
                    alt="Faculty Mrs. Rincy - Project Guide"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFE600]/25 border border-[#FFE600]/40 rounded-full text-xs font-black text-[#6A5F00] uppercase tracking-wider">
                <Award className="h-3.5 w-3.5" /> Faculty Mentorship
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl font-black text-white leading-tight">
                Faculty Mrs. Rincy
              </h3>
              <p className="text-sm font-bold text-[#FFE600]">
                Assistant Professor &amp; Project Guide
              </p>
              <p className="text-xs text-white/60 font-semibold flex items-center gap-1.5 justify-center sm:justify-start">
                <School className="h-4 w-4 text-[#00F5D4]" />
                Department of CSE • MGM College of Engineering, Valanchery
              </p>
              <p className="text-sm text-white/75 leading-relaxed max-w-xl font-medium pt-1">
                Under the continuous mentorship and academic guidance of{' '}
                <strong className="text-[#FFE600]">Mrs. Rincy</strong>, Placement Pal was
                conceptualized, architected, and validated to address the real-world hiring
                hurdles of engineering students.
              </p>

              {/* Star Rating */}
              <div className="flex items-center gap-1.5 pt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#FFE600] text-[#FFE600]"
                    style={{
                      animation: revealed ? `starPop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${1.2 + i * 0.08}s both` : 'none',
                      opacity: 0,
                    }}
                  />
                ))}
                <span className="text-xs font-black text-[#FFE600] ml-1">Exceptional Mentor</span>
              </div>
            </div>
          </div>

          {/* Right Badge */}
          <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-[#FFE600]/30 shadow-xl flex flex-col items-center text-center shrink-0 min-w-[200px] gap-2">
            <div className="w-14 h-14 rounded-2xl bg-[#FFE600] text-[#1A1A1A] flex items-center justify-center shadow-lg mb-1">
              <GraduationCap className="h-7 w-7" />
            </div>
            <p className="font-heading font-black text-white text-sm">KTU Capstone Approved</p>
            <span className="text-[11px] font-bold text-[#006B5B] bg-[#00F5D4]/40 px-3 py-0.5 rounded-full">
              Batch 2026
            </span>
            <p className="text-[10px] text-white/50 font-semibold">MGM College of Engineering Valanchery</p>
          </div>
        </div>
      </div>

      {/* ── Keyframe styles injected via style tag ── */}
      <style>{`
        @keyframes confettiBurst {
          0%   { transform: translate(-50%, -50%) rotate(0deg) scale(1); opacity: 1; }
          60%  { opacity: 1; }
          100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) rotate(var(--rot)) scale(0.4); opacity: 0; }
        }
        @keyframes spotlightSweep {
          0%   { transform: translateX(-50%) rotate(-15deg); opacity: 0; }
          20%  { opacity: 1; }
          60%  { transform: translateX(-50%) rotate(15deg); opacity: 0.9; }
          100% { transform: translateX(-50%) rotate(0deg); opacity: 0.6; }
        }
        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.08); }
        }
        @keyframes springBounceDown {
          0%   { opacity: 0; transform: translateX(-50%) translateY(-20px) scale(0.5); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1);   }
        }
        @keyframes starPop {
          0%   { opacity: 0; transform: scale(0) rotate(-30deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </section>
  );
}

const TECH_STACK = [
  {
    category: 'Frontend Client',
    tech: 'React 19 + TypeScript + Vite',
    desc: 'Ultra-fast HMR, component-driven UI with fluid responsive layouts.',
    badge: 'Lightning ⚡',
    badgeColor: 'bg-[#FFE600] text-[#1A1A1A]',
  },
  {
    category: 'Styling & Design System',
    tech: 'Tailwind CSS + Stitch Tokens',
    desc: 'Tactile cartoon aesthetic, bubbly pill geometry, and vibrant color harmonies.',
    badge: 'Cartoon Vibrant 🎨',
    badgeColor: 'bg-[#00F5D4]/40 text-[#006B5B]',
  },
  {
    category: 'AI & Intelligence Core',
    tech: 'Google Gemini Flash + ATS Parser',
    desc: 'Context-aware speech evaluation, DSA hint generation, and resume scoring.',
    badge: 'LLM Powered 🤖',
    badgeColor: 'bg-[#9B5DE5]/20 text-[#6B21A8]',
  },
  {
    category: 'Campus Recruiter Engine',
    tech: 'NITC & Tier-1 SDE Benchmarks',
    desc: 'Data-driven hiring rubrics tailored for Day-1 product engineering drives.',
    badge: 'Campus Ready 🎯',
    badgeColor: 'bg-[#FFDAD6] text-[#BA1A1A]',
  },
];

export default function AboutPage() {

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FFF9E9] text-[#1E1C10] selection:bg-[#FFE600] selection:text-[#1A1A1A]">
      <PublicNavbar />

      <main className="flex-1">
        {/* ══════════════ 1. ABOUT HERO SECTION ══════════════ */}
        <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full overflow-hidden">
          {/* Ambient Glow Orbs */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-[#FFE600]/20 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-48 right-0 w-[400px] h-[400px] bg-[#00F5D4]/15 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
            {/* Eyebrow Chip */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white text-[#1E1C10] border border-[#CDC7AA]/50 shadow-sm transition-transform hover:scale-105">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600] animate-ping" />
              <GraduationCap className="h-4 w-4 text-[#6A5F00]" />
              <span className="uppercase tracking-wider font-extrabold text-[#1A1A1A]">
                KTU S8 B.Tech CSE Capstone Project
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[#1E1C10] tracking-tight leading-[1.1]">
              The Passionate Minds Behind{' '}
              <span className="px-3 py-1 bg-[#FFE600] text-[#1A1A1A] rounded-2xl shadow-sm inline-block transform -rotate-1 hover:rotate-0 transition-transform">
                Placement Pal
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#4B4731] font-medium leading-relaxed max-w-2xl">
              Conceived and engineered by four final-year Computer Science students under expert faculty guidance at <strong className="text-[#1E1C10]">MGM College of Engineering, Valanchery</strong>. Built to transform campus placement preparation into a joyful, data-driven journey.
            </p>

            {/* Quick Metrics Ribbon */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <span className="px-4 py-2 rounded-full bg-white border border-[#CDC7AA]/40 shadow-xs font-bold text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00F5D4]" />
                4 Student Engineers
              </span>
              <span className="px-4 py-2 rounded-full bg-white border border-[#CDC7AA]/40 shadow-xs font-bold text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FFE600]" />
                1 Dedicated Faculty Guide
              </span>
              <span className="px-4 py-2 rounded-full bg-white border border-[#CDC7AA]/40 shadow-xs font-bold text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF6B6B]" />
                100% Student-Centric
              </span>
            </div>
          </div>
        </section>

        {/* ══════════════ 2. ORIGIN & MISSION BENTO ══════════════ */}
        <section className="py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Story Card (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#CDC7AA]/50 shadow-sm flex flex-col justify-between gap-6 relative overflow-hidden">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#FAF3DF] text-[#6A5F00] font-black text-xs border border-[#CDC7AA]/40">
                    OUR MISSION & INSPIRATION
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#1E1C10] tracking-tight">
                  Solving the Engineering Placement Dilemma
                </h2>
                <div className="space-y-4 text-xs sm:text-sm text-[#4B4731] font-medium leading-relaxed mt-4">
                  <p>
                    Every year, thousands of talented engineering students across colleges in Kerala prepare tirelessly for campus placements. Yet, they face sudden rejections due to un-optimized ATS resumes, lack of structured mock interview practice, or subtle DSA concept gaps.
                  </p>
                  <p>
                    We realized students don't need another generic job board or intimidating exam portal. They need a <strong>warm, encouraging, cartoon-powered companion</strong> that gives them accurate feedback 24/7 without judgment.
                  </p>
                  <p>
                    That is why we created <strong>Placement Pal</strong> and its friendly robot buddy <strong>Pal-Bot</strong> — turning tedious preparation into an engaging, milestone-driven adventure.
                  </p>
                </div>
              </div>

              {/* Pal-Bot Callout Box */}
              <div className="p-4 rounded-2xl bg-[#FAF3DF] border border-[#CDC7AA]/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFE600] flex items-center justify-center text-[#1A1A1A] shrink-0 shadow-xs">
                  <SmartToy className="h-7 w-7 text-[#1A1A1A]" />
                </div>
                <p className="text-xs text-[#1E1C10] font-bold leading-relaxed">
                  "No student should walk into their dream placement interview feeling underprepared. Pal-Bot is here to guide every step!"
                </p>
              </div>
            </div>

            {/* Impact Highlights Bento (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#CDC7AA]/50 shadow-sm flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#7C775F] bg-[#FAF3DF] px-2.5 py-0.5 rounded-full">
                    Key Pillar 01
                  </span>
                  <h3 className="font-heading text-xl font-black text-[#1E1C10] mt-2 mb-1">
                    AI Speech & STAR Feedback
                  </h3>
                  <p className="text-xs text-[#4B4731] leading-relaxed">
                    Sub-second speech pace analysis and structural evaluation for behavioral and technical mock rounds.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#006B5B] pt-4 border-t border-[#CDC7AA]/20">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Real-time voice tone & latency radar</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#CDC7AA]/50 shadow-sm flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#7C775F] bg-[#FAF3DF] px-2.5 py-0.5 rounded-full">
                    Key Pillar 02
                  </span>
                  <h3 className="font-heading text-xl font-black text-[#1E1C10] mt-2 mb-1">
                    ATS Keyword Synthesizer
                  </h3>
                  <p className="text-xs text-[#4B4731] leading-relaxed">
                    Parses student PDF resumes and benchmarks them against verified job postings from Flipkart, PhonePe, and Google.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#6A5F00] pt-4 border-t border-[#CDC7AA]/20">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Quantified impact bullet points boost</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ 3. CORE TEAM MEMBERS ══════════════ */}
        <section className="py-16 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-4 py-1.5 rounded-full bg-[#FAF3DF] text-[#6A5F00] font-black text-xs border border-[#CDC7AA]/40 inline-block mb-3">
              MEET THE BUILDERS
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#1E1C10] tracking-tight">
              Core Development Team
            </h2>
            <p className="text-xs sm:text-sm text-[#4B4731] font-medium mt-1">
              Final-year B.Tech Computer Science & Engineering students at MGM College of Engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#CDC7AA]/40 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Member Photo or Initial with Gradient Ring */}
                  <div className="relative w-28 h-28 rounded-3xl p-1 bg-gradient-to-tr from-[#FFE600] via-[#FAF3DF] to-[#00F5D4] shadow-md mb-4 group-hover:scale-105 transition-transform">
                    <div className="w-full h-full rounded-2xl bg-[#FAF3DF] overflow-hidden flex items-center justify-center relative">
                      <span className="font-heading text-3xl font-black text-[#1E1C10]">
                        {member.initial}
                      </span>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Member Name & Role */}
                  <h3 className="font-heading text-lg font-black text-[#1E1C10]">
                    {member.name}
                  </h3>
                  <span className="inline-block mt-1 px-3 py-1 rounded-full bg-[#FAF3DF] text-[#6A5F00] font-bold text-xs border border-[#CDC7AA]/30">
                    {member.role}
                  </span>

                  <p className="text-xs text-[#7C775F] font-semibold mt-2">
                    {member.dept}
                  </p>
                </div>

                {/* Bottom Tag & Connect */}
                <div className="w-full pt-4 mt-4 border-t border-[#CDC7AA]/20 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00F5D4]/20 text-[#006B5B] font-extrabold text-[10px]">
                    Engineering
                  </span>
                  <a
                    href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-[#FAF3DF] hover:bg-[#FFE600] text-[#1A1A1A] transition-colors border border-[#CDC7AA]/40 shadow-xs"
                    title={`Contact ${member.name}`}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════ 4. FACULTY GUIDE SPOTLIGHT — CURTAIN REVEAL ══════════════ */}
        <FacultyRevealSection />

        {/* ══════════════ 4b. PROJECT JOURNEY TIMELINE ══════════════ */}
        <ProjectTimeline />

        {/* ══════════════ 5. TECHNOLOGY ARCHITECTURE BENTO ══════════════ */}
        <section className="py-16 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-4 py-1.5 rounded-full bg-[#FAF3DF] text-[#006B5B] font-black text-xs border border-[#CDC7AA]/40 inline-block mb-3">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#1E1C10] tracking-tight">
              Built on Modern Engineering Standards
            </h2>
            <p className="text-xs sm:text-sm text-[#4B4731] font-medium mt-1">
              Clean modular code with reactive component hierarchies and low-latency AI integrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECH_STACK.map((item) => (
              <div
                key={item.category}
                className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#CDC7AA]/40 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <h4 className="font-heading text-base font-black text-[#1E1C10] mt-3 mb-1">
                    {item.category}
                  </h4>
                  <p className="text-xs font-bold text-[#6A5F00]">{item.tech}</p>
                  <p className="text-xs text-[#4B4731] mt-2 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4 mt-3 border-t border-[#CDC7AA]/20 flex items-center gap-1.5 text-[11px] font-bold text-[#006B5B]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Production Verified</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════ 6. INVITATION CTA ══════════════ */}
        <section className="py-14 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full">
          <div className="bg-[#1A1A1A] text-white rounded-3xl p-8 sm:p-12 shadow-xl border-2 border-[#FFE600]/40 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="flex items-center gap-4 relative z-10 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#FFE600] text-[#1A1A1A] flex items-center justify-center shrink-0 shadow-md">
                <SmartToy className="h-8 w-8 text-[#1A1A1A]" />
              </div>
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-black text-white">
                  Experience Placement Pal Live
                </h3>
                <p className="text-xs sm:text-sm text-[#CDC7AA] font-medium mt-0.5">
                  Try the interactive dashboard, upload your resume, or practice interview questions.
                </p>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-3 shrink-0">
              <Link
                to="/register"
                className="px-6 py-3 rounded-full bg-[#FFE600] hover:bg-[#DEC800] text-[#1A1A1A] font-black text-xs shadow-md transition-transform active:scale-95 flex items-center gap-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-4 w-4 text-[#1A1A1A]" />
              </Link>
              <Link
                to="/features"
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
