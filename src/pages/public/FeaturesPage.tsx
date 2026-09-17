import { Link } from 'react-router-dom';
import {
  TrendingUp, Code2, Compass, ArrowRight
} from 'lucide-react';
import { PublicNavbar } from '../../components/layouts/PublicNavbar';
import { PublicFooter } from '../../components/layouts/PublicFooter';

const featureCards = [
  {
    title: 'RESUME AI',
    tag: 'DISCOVER',
    subtitle: 'ATS Scanner & Score Boost',
    link: '/resume',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop',
    accent: 'amber',
    glow: 'group-hover:shadow-[0_0_35px_rgba(245,158,11,0.4)]',
    border: 'group-hover:border-amber-400',
  },
  {
    title: 'AI INTERVIEW',
    tag: 'DISCOVER',
    subtitle: 'Real-time Mock Simulator',
    link: '/interview',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    accent: 'teal',
    glow: 'group-hover:shadow-[0_0_35px_rgba(20,184,166,0.4)]',
    border: 'group-hover:border-teal-400',
  },
  {
    title: 'SKILL GAP',
    tag: 'DISCOVER',
    subtitle: 'Target Role Benchmark',
    link: '/skill-gap',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    accent: 'amber',
    glow: 'group-hover:shadow-[0_0_35px_rgba(245,158,11,0.4)]',
    border: 'group-hover:border-amber-400',
  },
  {
    title: 'ROADMAP',
    tag: 'DISCOVER',
    subtitle: 'Personalized Pathway',
    link: '/career-roadmap',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800&auto=format&fit=crop',
    accent: 'green',
    glow: 'group-hover:shadow-[0_0_35px_rgba(34,197,94,0.4)]',
    border: 'group-hover:border-green-400',
  },
  {
    title: 'CODING COACH',
    tag: 'DISCOVER',
    subtitle: 'DSA & Question Bank',
    link: '/coding',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    accent: 'amber',
    glow: 'group-hover:shadow-[0_0_35px_rgba(245,158,11,0.4)]',
    border: 'group-hover:border-amber-400',
  },
  {
    title: 'ASSESSMENT ENGINE',
    tag: 'NEW MODULE',
    subtitle: 'Aptitude & Timed MCQ Suite',
    link: '/assessment',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
    accent: 'teal',
    glow: 'group-hover:shadow-[0_0_35px_rgba(20,184,166,0.4)]',
    border: 'group-hover:border-teal-400',
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col antialiased bg-[#090C12] text-slate-100 selection:bg-[#C8952E]/30 selection:text-[#D8AA55]">
      <PublicNavbar />

      <section id="features" className="py-24 px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-20 relative overflow-hidden w-full">
        <div className="max-w-[1600px] mx-auto relative z-10">

          {/* Section Header (Centered with Double Lines) */}
          <div className="mb-14 text-center">
            <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-3">
              <span className="w-8 h-[1.5px] bg-amber-500/60 rounded-full inline-block" />
              <span>PLATFORM MODULES</span>
              <span className="w-8 h-[1.5px] bg-amber-500/60 rounded-full inline-block" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-center">
              Everything You Need to
              <span className="gradient-text-amber"> Get Placed</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mt-3 leading-relaxed text-center font-normal">
              Six high-powered placement modules engineered to prepare, practice, audit, and benchmark your career readiness from day one.
            </p>
          </div>

          {/* ─── 6 IMAGE-BACKED MINIMAL CARDS (MATCHING REFERENCE DESIGN) ─── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-24">
            {featureCards.map((card) => (
              <Link
                key={card.title}
                to={card.link}
                className="group relative block h-[380px] sm:h-[420px] lg:h-[460px] rounded-[2rem] overflow-hidden border border-white/10 hover:border-amber-400/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_35px_rgba(245,158,11,0.35)]"
              >
                {/* Background Image with Zoom on Hover */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Gradient Overlay for optimal contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A0E] via-[#070A0E]/50 to-black/20 opacity-85 group-hover:opacity-75 transition-opacity duration-500" />

                {/* Subtle gold glow sweep on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top Subtle Status Tag */}
                <div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    Open <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

                {/* Centered Bottom Typography */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center justify-end text-center z-10">
                  <span className="text-[11px] font-bold tracking-[0.25em] text-gray-300/90 uppercase mb-1.5 transition-colors duration-300 group-hover:text-amber-400">
                    {card.tag}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight uppercase group-hover:text-amber-300 transition-colors duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    {card.title}
                  </h3>

                  <p className="text-xs text-gray-400 font-medium mt-1.5 max-w-[180px] line-clamp-1 opacity-80 group-hover:opacity-100 group-hover:text-gray-200 transition-all duration-300">
                    {card.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* ─── CATEGORIZED PLATFORM MODULES (CAREER, PREPARATION, ANALYSIS, OPPORTUNITIES) ─── */}
          <div className="mb-24 space-y-20">
            {/* Section Divider Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-3">
                <span className="w-8 h-[1.5px] bg-amber-500/60 rounded-full inline-block" />
                <span>COMPLETE ECOSYSTEM</span>
                <span className="w-8 h-[1.5px] bg-amber-500/60 rounded-full inline-block" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-center">
                Explore Modules by <span className="gradient-text-amber">Specialization</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto mt-2 text-center font-normal leading-relaxed">
                Seamlessly jump to dedicated tools and workspaces across your complete career preparation lifecycle.
              </p>
            </div>

            {/* 1. CAREER SECTION */}
            <div id="category-career" className="text-center">
              <div className="max-w-2xl mx-auto mb-8 pb-4 border-b border-white/10 text-center">
                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-2">
                  <span className="w-4 h-[2px] bg-amber-400 rounded-full inline-block" />
                  <span>PLANNING & BENCHMARK</span>
                  <span className="w-4 h-[2px] bg-amber-400 rounded-full inline-block" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-2">
                  CAREER
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-normal leading-relaxed max-w-lg mx-auto">
                  Personalized milestone roadmaps and real-time competency gap analysis tailored directly to your target software role.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto gap-4 sm:gap-6">
                {[
                  {
                    title: 'CAREER ROADMAP',
                    tag: 'DISCOVER',
                    subtitle: 'Personalized Milestone Pathway',
                    link: '/career-roadmap',
                    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800&auto=format&fit=crop',
                  },
                  {
                    title: 'SKILL GAP',
                    tag: 'DISCOVER',
                    subtitle: 'Target Role Benchmark & Match',
                    link: '/skill-gap',
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
                  },
                ].map((card) => (
                  <Link
                    key={card.title}
                    to={card.link}
                    className="group relative block h-[380px] sm:h-[420px] rounded-[2rem] overflow-hidden border border-white/10 hover:border-amber-400/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_35px_rgba(245,158,11,0.35)]"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070A0E] via-[#070A0E]/50 to-black/20 opacity-85 group-hover:opacity-75 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30">
                        Open <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center justify-end text-center z-10">
                      <span className="text-[11px] font-bold tracking-[0.25em] text-gray-300/90 uppercase mb-1.5 transition-colors duration-300 group-hover:text-amber-400">
                        {card.tag}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight uppercase group-hover:text-amber-300 transition-colors duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        {card.title}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium mt-1.5 max-w-[200px] line-clamp-1 opacity-80 group-hover:opacity-100 group-hover:text-gray-200 transition-all duration-300">
                        {card.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. PREPARATION SECTION */}
            <div id="category-preparation" className="text-center">
              <div className="max-w-2xl mx-auto mb-8 pb-4 border-b border-white/10 text-center">
                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-2">
                  <span className="w-4 h-[2px] bg-amber-400 rounded-full inline-block" />
                  <span>INTERVIEW & PRACTICE</span>
                  <span className="w-4 h-[2px] bg-amber-400 rounded-full inline-block" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-2">
                  PREPARATION
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-normal leading-relaxed max-w-lg mx-auto">
                  Comprehensive practice tools including ATS resume audits, real-time voice mock interviews, coding sandboxes, and AI learning.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-7xl mx-auto gap-4 sm:gap-6">
                {[
                  {
                    title: 'RESUME ANALYZER',
                    tag: 'DISCOVER',
                    subtitle: 'ATS Scanner & Score Boost',
                    link: '/resume',
                    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop',
                  },
                  {
                    title: 'AI INTERVIEW',
                    tag: 'DISCOVER',
                    subtitle: 'Real-time Mock Simulator',
                    link: '/interview',
                    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
                  },
                  {
                    title: 'ASSESSMENT ENGINE',
                    tag: 'NEW MODULE',
                    subtitle: 'Aptitude & Timed MCQ Suite',
                    link: '/assessment',
                    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
                  },
                  {
                    title: 'CODING PRACTICE',
                    tag: 'DISCOVER',
                    subtitle: 'DSA & Algorithmic Practice',
                    link: '/coding',
                    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
                  },
                  {
                    title: 'LEARNING ASSISTANT',
                    tag: 'DISCOVER',
                    subtitle: 'AI Concept Tutor & Notes',
                    link: '/learning',
                    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
                  },
                ].map((card) => (
                  <Link
                    key={card.title}
                    to={card.link}
                    className="group relative block h-[380px] sm:h-[420px] rounded-[2rem] overflow-hidden border border-white/10 hover:border-amber-400/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_35px_rgba(245,158,11,0.35)]"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070A0E] via-[#070A0E]/50 to-black/20 opacity-85 group-hover:opacity-75 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30">
                        Open <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center justify-end text-center z-10">
                      <span className="text-[11px] font-bold tracking-[0.25em] text-gray-300/90 uppercase mb-1.5 transition-colors duration-300 group-hover:text-amber-400">
                        {card.tag}
                      </span>
                      <h4 className="text-lg sm:text-xl font-black text-white tracking-tight leading-tight uppercase group-hover:text-amber-300 transition-colors duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        {card.title}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium mt-1.5 max-w-[180px] line-clamp-1 opacity-80 group-hover:opacity-100 group-hover:text-gray-200 transition-all duration-300">
                        {card.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. ANALYSIS SECTION */}
            <div id="category-analysis" className="text-center">
              <div className="max-w-2xl mx-auto mb-8 pb-4 border-b border-white/10 text-center">
                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-2">
                  <span className="w-4 h-[2px] bg-amber-400 rounded-full inline-block" />
                  <span>PORTFOLIO & AUDIT</span>
                  <span className="w-4 h-[2px] bg-amber-400 rounded-full inline-block" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-2">
                  ANALYSIS
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-normal leading-relaxed max-w-lg mx-auto">
                  Deep-dive algorithmic audit into your open-source GitHub repositories and LinkedIn professional branding.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto gap-4 sm:gap-6">
                {[
                  {
                    title: 'GITHUB ANALYZER',
                    tag: 'DISCOVER',
                    subtitle: 'Repo Architecture & Git Audit',
                    link: '/github',
                    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop',
                  },
                  {
                    title: 'LINKEDIN ANALYZER',
                    tag: 'DISCOVER',
                    subtitle: 'Profile Optimization & Brand Score',
                    link: '/linkedin',
                    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
                  },
                ].map((card) => (
                  <Link
                    key={card.title}
                    to={card.link}
                    className="group relative block h-[380px] sm:h-[420px] rounded-[2rem] overflow-hidden border border-white/10 hover:border-amber-400/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_35px_rgba(245,158,11,0.35)]"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070A0E] via-[#070A0E]/50 to-black/20 opacity-85 group-hover:opacity-75 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30">
                        Open <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center justify-end text-center z-10">
                      <span className="text-[11px] font-bold tracking-[0.25em] text-gray-300/90 uppercase mb-1.5 transition-colors duration-300 group-hover:text-amber-400">
                        {card.tag}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight uppercase group-hover:text-amber-300 transition-colors duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        {card.title}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium mt-1.5 max-w-[200px] line-clamp-1 opacity-80 group-hover:opacity-100 group-hover:text-gray-200 transition-all duration-300">
                        {card.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 4. OPPORTUNITIES SECTION */}
            <div id="category-opportunities" className="text-center">
              <div className="max-w-2xl mx-auto mb-8 pb-4 border-b border-white/10 text-center">
                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-2">
                  <span className="w-4 h-[2px] bg-amber-400 rounded-full inline-block" />
                  <span>JOBS & BENCHMARK</span>
                  <span className="w-4 h-[2px] bg-amber-400 rounded-full inline-block" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-2">
                  OPPORTUNITIES
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-normal leading-relaxed max-w-lg mx-auto">
                  Tailored high-paying tech openings and aggregate placement readiness scoring with detailed metrics breakdown.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 max-w-6xl mx-auto gap-4 sm:gap-6">
                {[
                  {
                    title: 'COMPANY PREP KITS',
                    tag: 'NEW MODULE',
                    subtitle: 'Hiring Blueprints & Drives',
                    link: '/company-prep',
                    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
                  },
                  {
                    title: 'JOB MATCHER',
                    tag: 'DISCOVER',
                    subtitle: 'AI-Matched Tech Openings',
                    link: '/jobs',
                    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop',
                  },
                  {
                    title: 'CAREER SCORE',
                    tag: 'DISCOVER',
                    subtitle: 'Readiness Benchmark Index',
                    link: '/progress',
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
                  },
                ].map((card) => (
                  <Link
                    key={card.title}
                    to={card.link}
                    className="group relative block h-[380px] sm:h-[420px] rounded-[2rem] overflow-hidden border border-white/10 hover:border-amber-400/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_35px_rgba(245,158,11,0.35)]"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070A0E] via-[#070A0E]/50 to-black/20 opacity-85 group-hover:opacity-75 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30">
                        Open <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center justify-end text-center z-10">
                      <span className="text-[11px] font-bold tracking-[0.25em] text-gray-300/90 uppercase mb-1.5 transition-colors duration-300 group-hover:text-amber-400">
                        {card.tag}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight uppercase group-hover:text-amber-300 transition-colors duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        {card.title}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium mt-1.5 max-w-[200px] line-clamp-1 opacity-80 group-hover:opacity-100 group-hover:text-gray-200 transition-all duration-300">
                        {card.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>


          {/* ─── HOW IT WORKS — AMAZON CONNECTED PIPELINE (#C8952E & #1E7F76) ─── */}
          <div className="relative p-8 sm:p-12 lg:p-14 rounded-[2.5rem] bg-[#0D1117] border border-[#232A38] shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden">
            
            {/* Background Subtle Ambient Aura */}
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#C8952E]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#1E7F76]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center mb-12 relative z-10">
              <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D8AA55] mb-3">
                <span className="w-8 h-[2px] bg-[#C8952E] rounded-full inline-block" />
                <span>PLACEMENT EXECUTION PIPELINE</span>
                <span className="w-8 h-[2px] bg-[#C8952E] rounded-full inline-block" />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white text-center tracking-tight">
                Get Placement-Ready in <span className="text-[#D8AA55] underline decoration-[#C8952E]/50 underline-offset-8">3 Simple Steps</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto mt-3 text-center font-normal leading-relaxed">
                A structured, data-driven methodology tailored directly to your dream software engineering profile.
              </p>
            </div>

            {/* 3 Step Connected Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
              
              {/* Step 01 */}
              <div className="p-7 rounded-3xl bg-[#171C26] border border-[#232A38] hover:border-[#C8952E]/60 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                {/* Large Background Watermark Number */}
                <span className="absolute -bottom-4 -right-2 text-7xl font-black text-[#C8952E]/[0.06] select-none group-hover:text-[#C8952E]/[0.12] transition-colors pointer-events-none">
                  01
                </span>

                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#C8952E]/15 border border-[#C8952E]/30 flex items-center justify-center text-[#D8AA55] shadow-sm group-hover:scale-110 group-hover:bg-[#C8952E] group-hover:text-[#090C12] transition-all duration-300">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-black tracking-widest uppercase bg-[#C8952E] text-[#090C12] px-2.5 py-1 rounded-full shadow-sm">
                    STEP 01
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#D8AA55] transition-colors">
                  Benchmark & Baseline
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal mb-5">
                  Select your target role (Full Stack, Backend, AI/ML), upload your resume for ATS audit, and identify initial readiness gaps.
                </p>

                {/* Micro-Telemetry Chip */}
                <div className="p-3 rounded-xl bg-[#161B25] border border-[#2A3140] space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-gray-200">
                    <span>ATS Audit & Role Fit</span>
                    <span className="text-[#D8AA55] font-bold">89% Target</span>
                  </div>
                  <div className="w-full bg-[#0D1117] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#C8952E] h-full rounded-full shadow-[0_0_8px_rgba(200,149,46,0.5)]" style={{ width: '89%' }} />
                  </div>
                </div>
              </div>

              {/* Step 02 */}
              <div className="p-7 rounded-3xl bg-[#171C26] border border-[#232A38] hover:border-[#1E7F76]/60 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                {/* Large Background Watermark Number */}
                <span className="absolute -bottom-4 -right-2 text-7xl font-black text-[#1E7F76]/[0.08] select-none group-hover:text-[#1E7F76]/[0.15] transition-colors pointer-events-none">
                  02
                </span>

                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#1E7F76]/15 border border-[#1E7F76]/30 flex items-center justify-center text-[#2FA89B] shadow-sm group-hover:scale-110 group-hover:bg-[#1E7F76] group-hover:text-white transition-all duration-300">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-black tracking-widest uppercase bg-[#1E7F76] text-white px-2.5 py-1 rounded-full shadow-sm">
                    STEP 02
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#2FA89B] transition-colors">
                  Upskill & Voice Mock AI
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal mb-5">
                  Practice real-time speech mock interviews with instant rubric feedback, solve curated DSA topics, and execute milestone pathways.
                </p>

                {/* Micro-Telemetry Chip */}
                <div className="p-3 rounded-xl bg-[#161B25] border border-[#2A3140] space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-gray-200">
                    <span>Voice Mock Simulator</span>
                    <span className="text-[#2FA89B] font-bold">Prime AI Active</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2FA89B] animate-ping" />
                    <span>Communication & System Architecture</span>
                  </div>
                </div>
              </div>

              {/* Step 03 */}
              <div className="p-7 rounded-3xl bg-[#171C26] border border-[#232A38] hover:border-[#C8952E]/60 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                {/* Large Background Watermark Number */}
                <span className="absolute -bottom-4 -right-2 text-7xl font-black text-[#C8952E]/[0.06] select-none group-hover:text-[#C8952E]/[0.12] transition-colors pointer-events-none">
                  03
                </span>

                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#C8952E]/15 border border-[#C8952E]/30 flex items-center justify-center text-[#D8AA55] shadow-sm group-hover:scale-110 group-hover:bg-[#C8952E] group-hover:text-[#090C12] transition-all duration-300">
                    <Compass className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-black tracking-widest uppercase bg-[#C8952E] text-[#090C12] px-2.5 py-1 rounded-full shadow-sm">
                    STEP 03
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#D8AA55] transition-colors">
                  Match & Apply Confidently
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal mb-5">
                  Apply directly to curated high-paying openings matching your verified technical benchmark with pre-screened readiness certificate.
                </p>

                {/* Micro-Telemetry Chip */}
                <div className="p-3 rounded-xl bg-[#161B25] border border-[#2A3140] space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-gray-200">
                    <span>Verified Readiness Index</span>
                    <span className="text-[#D8AA55] font-bold">Top 8% Tier</span>
                  </div>
                  <div className="w-full bg-[#0D1117] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#C8952E] h-full rounded-full shadow-[0_0_8px_rgba(200,149,46,0.5)]" style={{ width: '94%' }} />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
