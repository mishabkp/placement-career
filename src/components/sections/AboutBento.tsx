import { Sparkles, FileText, GraduationCap } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   AboutBento — "Neo-Brutalism + Tech Minimal" redesign of the
   origin/mission block. Deep obsidian background, glassmorphic
   cards, indigo→cyan accents, geometric sans headings, mono
   eyebrow tags. Scoped to this component only — the rest of the
   site keeps its ink & gold theme.
   ───────────────────────────────────────────────────────────── */

const METRICS = [
  { value: '4', label: 'ENGINEERS' },
  { value: '5', label: 'MENTORS' },
  { value: '100%', label: 'PLACEMENT FOCUS' },
];

const TECH_BADGES = [
  { icon: Sparkles, label: 'LLM Core' },
  { icon: FileText, label: 'ATS Resume Parser' },
  { icon: GraduationCap, label: 'KTU S8 Capstone' },
];

export function AboutBento() {
  return (
    <div className="relative mb-20 rounded-[2.5rem] overflow-hidden bg-[#0B0F17] border border-white/[0.06] p-6 sm:p-10 lg:p-12">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-40 -left-32 w-[480px] h-[480px] rounded-full bg-indigo-600/25 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 w-[440px] h-[440px] rounded-full bg-cyan-500/20 blur-[130px]" />

      <div className="relative z-10">
        {/* Eyebrow */}
        <div className="mb-8">
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300 bg-cyan-400/10 border border-cyan-400/25 shadow-[0_0_20px_-4px_rgba(6,182,212,0.5)]"
            style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            // GECT CAPSTONE PROJECT
          </span>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6">
          {/* ─── Card 1 — Main Feature (2 cols) ─── */}
          <div className="lg:col-span-2 group relative p-8 sm:p-10 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:-translate-y-1 hover:border-indigo-400/40 transition-all duration-300 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_70px_-15px_rgba(99,102,241,0.25)]">
            <h3
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.15] mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Building{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Next-Gen Placement Intelligence
              </span>
            </h3>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal mb-4">
              <strong className="text-white font-semibold">AI Career Coach</strong> was born from a simple campus reality at Government Engineering College, Thrissur: while B.Tech students possess strong technical potential, they often face unexpected rejections due to unoptimized ATS resumes, lack of structured mock interview practice, and unidentified skill gaps.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              We didn't just build another job portal; we crafted a 24/7 autonomous career mentor. Combining modern LLM intelligence with real-world recruitment benchmarks, our mission is to ensure every engineering student steps into placement season with clarity, confidence, and competitive readiness.
            </p>
          </div>

          {/* ─── Card 2 — Metrics & Impact (1 col) ─── */}
          <div className="group relative p-7 sm:p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:-translate-y-1 hover:border-indigo-400/40 transition-all duration-300 flex flex-col justify-center gap-4">
            {METRICS.map((stat) => (
              <div
                key={stat.label}
                className="relative p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border border-white/10 hover:border-cyan-400/30 transition-colors"
              >
                <p
                  className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent tracking-tight"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1"
                  style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* ─── Card 3 — Tech Highlights (1 col) ─── */}
          <div className="group relative p-7 sm:p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:-translate-y-1 hover:border-cyan-400/40 transition-all duration-300 flex flex-col gap-3">
            <p
              className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1"
              style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
            >
              Tech Stack
            </p>
            {TECH_BADGES.map((tech) => (
              <div
                key={tech.label}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#11151D] border border-white/10 hover:border-cyan-400/40 transition-colors"
              >
                <tech.icon className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span
                  className="text-xs font-semibold text-slate-200 tracking-tight"
                  style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
                >
                  [{tech.label}]
                </span>
              </div>
            ))}
          </div>

          {/* ─── Card 4 — Team / Campus Visual (full width banner) ─── */}
          <div className="lg:col-span-4 relative rounded-[2rem] overflow-hidden group border border-white/10 hover:border-indigo-400/40 transition-all duration-300 hover:-translate-y-1 min-h-[240px] sm:min-h-[300px] lg:min-h-[320px]">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop"
              alt="Engineering Team Collaboration"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/50 to-transparent" />

            {/* Floating glow tag */}
            <div className="absolute top-5 right-5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white px-4 py-2 rounded-2xl font-black text-xs shadow-[0_8px_25px_-4px_rgba(99,102,241,0.6)] flex items-center gap-1.5 select-none">
              <span>✨</span>
              <span>B.Tech 2026</span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p
                className="text-[11px] font-bold uppercase tracking-widest text-cyan-300 mb-1.5"
                style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
              >
                // Campus &amp; Team
              </p>
              <h4
                className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Engineered at GEC Thrissur
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
