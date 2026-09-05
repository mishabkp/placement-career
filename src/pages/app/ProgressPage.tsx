import React, { useState } from 'react';
import {
  SmartToy,
  AutoAwesome,
  Verified,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from '../../components/icons/StitchIcons';
import { Bolt, Sparkles, Lock } from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentScore, setCurrentScore] = useState(82);
  const [simChecks, setSimChecks] = useState({
    readme: true,
    dp: true,
    resume: true,
  });
  const [appliedNotice, setAppliedNotice] = useState(false);

  // Calculate simulated score
  const baseScore = currentScore;
  const simBonus =
    (simChecks.readme ? 4 : 0) +
    (simChecks.dp ? 5 : 0) +
    (simChecks.resume ? 3 : 0);
  const projectedScore = baseScore + simBonus;

  const handleReEvaluate = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setCurrentScore((prev) => (prev === 82 ? 84 : 82));
      setIsEvaluating(false);
    }, 1200);
  };

  const handleSimToggle = (key: 'readme' | 'dp' | 'resume') => {
    setSimChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Bar / Action Anchor */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FFE600] text-[#1E1C10] flex items-center justify-center shadow-md transform -rotate-3 hover:rotate-0 transition-transform">
            <span className="text-3xl">🎖️</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl font-extrabold text-[#1E1C10] tracking-tight">
                Career Readiness Score
              </h1>
              <span className="bg-[#00F5D4]/30 text-[#006B5B] text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold shadow-sm">
                Tier-1 Ready 🚀
              </span>
              <span className="bg-[#FF6B6B]/20 text-[#BA1A1A] text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold shadow-sm">
                Top 18% Campus
              </span>
            </div>
            <p className="text-sm text-[#4B4731] mt-1 font-medium">
              Real-time placement potential index calibrated against top tier tech recruiters.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleReEvaluate}
            disabled={isEvaluating}
            className="group px-5 py-2.5 bg-[#FFE600] text-[#1E1C10] text-xs font-bold rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Bolt
              className={`w-4 h-4 fill-current ${
                isEvaluating ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'
              }`}
            />
            <span>{isEvaluating ? 'Calibrating...' : 'Run Live Re-Evaluation'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 bg-[#EEE8D4] text-[#1E1C10] text-xs font-bold rounded-full shadow-sm hover:bg-[#E8E2CF] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Transcript</span>
          </button>
        </div>
      </div>

      {/* Campus Drive Benchmarking Active Ribbon */}
      <div className="rounded-2xl overflow-hidden shadow-sm bg-[#FAF3DF] border border-[#E8E2CF] p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#26FEDC] text-[#007261] flex items-center justify-center text-lg font-bold">
            ✨
          </div>
          <div>
            <p className="text-xs font-bold text-[#1E1C10]">Campus Drive 2025 Benchmarking Active</p>
            <p className="text-xs text-[#4B4731]">
              Calibrated with Amazon, Microsoft, and Cisco placement thresholds.
            </p>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-[#4B4731] text-xs font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00F5D4] inline-block animate-ping"></span>
          <span>Live Sync with GitHub & LeetCode (NIT Calicut CSE Batch)</span>
        </div>
      </div>

      {/* 3D Hero Satisfying Score Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Hero Card: Radial Gauge & Standing */}
        <div className="lg:col-span-8 bg-[#FAF3DF] border border-[#CDC7AA] rounded-3xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#FFE600]/20 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-[#00F5D4]/20 blur-xl pointer-events-none"></div>

          <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
            <div>
              <span className="text-xs text-[#6A5F00] uppercase tracking-widest font-extrabold">
                Overall Placement Index
              </span>
              <h2 className="text-2xl font-extrabold text-[#1E1C10] mt-1">
                Super Satisfactory Readiness
              </h2>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-[#E8E2CF]">
              <Verified className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span className="text-xs text-[#1E1C10] font-semibold">Updated 14 mins ago</span>
            </div>
          </div>

          {/* Radial Gauge & Telemetry */}
          <div className="my-6 grid grid-cols-1 md:grid-cols-12 items-center gap-6 relative z-10">
            {/* Radial Gauge */}
            <div className="md:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-52 h-52 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-white shadow-inner border border-[#E8E2CF]"></div>
                <div className="absolute inset-3 rounded-full bg-[#F4EEDA] shadow"></div>

                {/* SVG Gauge */}
                <svg className="w-44 h-44 transform -rotate-90 relative z-10" viewBox="0 0 120 120">
                  <circle
                    className="text-[#E8E2CF]"
                    cx="60"
                    cy="60"
                    fill="transparent"
                    r="50"
                    stroke="currentColor"
                    strokeDasharray="314"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    strokeWidth="11"
                  />
                  <circle
                    className="transition-all duration-1000 ease-out text-[#FFE600]"
                    cx="60"
                    cy="60"
                    fill="transparent"
                    r="50"
                    stroke="currentColor"
                    strokeDasharray="314"
                    strokeDashoffset={314 - (314 * currentScore) / 100}
                    strokeLinecap="round"
                    strokeWidth="11"
                  />
                </svg>

                {/* Satisfying Center Score Display */}
                <div className="absolute flex flex-col items-center justify-center text-center z-20">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-black text-[#1E1C10] tracking-tighter">
                      {currentScore}
                    </span>
                    <span className="text-xl font-bold text-[#7C775F] ml-1">/100</span>
                  </div>
                  <span className="bg-[#FFE600] text-[#1E1C10] px-3 py-0.5 rounded-full text-xs font-extrabold shadow-sm mt-1">
                    Grade A+ (Elite)
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-[#E8E2CF]">
                <TrendingUp className="w-4 h-4 text-[#006B5B]" />
                <span className="text-xs text-[#1E1C10] font-bold">+7 pts gained this week!</span>
              </div>
            </div>

            {/* Metric Details */}
            <div className="md:col-span-6 flex flex-col gap-3">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#E8E2CF]">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#7C775F] uppercase font-bold">
                    NIT Calicut Standing
                  </span>
                  <span className="text-xs text-[#006B5B] font-extrabold">Top 18th Percentile</span>
                </div>
                <div className="w-full bg-[#EEE8D4] h-3 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-[#00F5D4] h-full rounded-full transition-all duration-500"
                    style={{ width: `${currentScore}%` }}
                  ></div>
                </div>
                <p className="text-xs text-[#4B4731] mt-2 font-medium">
                  Ranked #42 among 240+ registered CSE final-year applicants.
                </p>
              </div>

              {/* Campus Titan Certified */}
              <div className="bg-[#FFE600]/20 p-3.5 rounded-2xl flex items-center gap-3 border border-[#FFE600]/40">
                <div className="w-12 h-12 rounded-xl bg-[#FFE600] text-[#1E1C10] flex items-center justify-center text-2xl shadow-sm">
                  🏆
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1E1C10]">"Campus Titan" Certified</p>
                  <p className="text-xs text-[#4B4731]">
                    Qualified directly for 12+ Day-1 Dream Company shortlist tests.
                  </p>
                </div>
              </div>

              {/* Next Milestone unlock */}
              <div className="bg-[#EEE8D4] p-2.5 rounded-2xl flex items-center justify-between px-3 border border-[#CDC7AA]/50">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#6A5F00]" />
                  <span className="text-xs text-[#1E1C10] font-medium">
                    <strong className="text-[#6A5F00] font-bold">Next unlock at 88:</strong> Google & Microsoft referrals
                  </span>
                </div>
                <span className="bg-[#1A1A1A] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {88 - currentScore > 0 ? `${88 - currentScore} pts left` : 'Unlocked!'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Footer Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 bg-[#EEE8D4]/60 px-4 py-2 rounded-2xl relative z-10 border border-[#CDC7AA]/40">
            <span className="text-xs text-[#4B4731] flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ATS Scanner passed with 94% accuracy
            </span>
            <span className="text-xs text-[#4B4731] flex items-center gap-1 font-semibold">
              <AutoAwesome className="w-4 h-4 text-amber-500 fill-amber-500" />
              System Design mock completed
            </span>
          </div>
        </div>

        {/* Right Hero Card: 3D Mascot Pal-Bot & Instant Advice */}
        <div className="lg:col-span-4 bg-white border border-[#E8E2CF] rounded-3xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-[#FFE600]/20 blur-xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#00F5D4] text-[#1E1C10] flex items-center justify-center text-xl shadow">
                  🤖
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#1E1C10]">Pal-Bot Advice</h3>
                  <p className="text-[11px] font-bold text-[#7C775F]">AI Career Strategist</p>
                </div>
              </div>
              <span className="bg-[#9B5DE5]/20 text-[#9B5DE5] text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                Smart Coach
              </span>
            </div>

            {/* Speech bubble card */}
            <div className="bg-[#FAF3DF] p-4 rounded-2xl border border-[#E8E2CF] relative my-2">
              <p className="text-xs text-[#1E1C10] leading-relaxed font-medium">
                "Woah <strong className="text-[#6A5F00] font-bold">Candidate!</strong> You are only{' '}
                <strong className="text-[#006B5B] font-bold">6 points</strong> away from unlocking the
                Super-Dream Bracket! Tackling the pending DP problems in Coding Arena will bridge that gap
                before campus drives begin!"
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#7C775F] font-semibold">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Est. 25% higher CTC package projected.</span>
              </div>
            </div>

            {/* Impact CTAs */}
            <div className="flex flex-col gap-2 mt-4">
              <a
                href="/coding"
                className="w-full py-2.5 px-4 bg-[#FFE600] text-[#1E1C10] text-xs font-extrabold rounded-full shadow-sm hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Bolt className="w-4 h-4 fill-current" />
                <span>Boost Score in Coding Arena</span>
              </a>
              <a
                href="/interview"
                className="w-full py-2.5 px-4 bg-[#EEE8D4] text-[#1E1C10] text-xs font-bold rounded-full shadow-sm hover:bg-[#E8E2CF] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <SmartToy className="w-4 h-4" />
                <span>Schedule AI Mock Review</span>
              </a>
            </div>
          </div>

          {/* Target footer */}
          <div className="mt-6 pt-3 flex items-center justify-between text-xs text-[#7C775F] border-t border-[#F4EEDA]">
            <span className="font-semibold">Target: Product Tier</span>
            <span className="bg-[#FAF3DF] px-2.5 py-0.5 rounded-full text-[#1E1C10] font-bold border border-[#E8E2CF]">
              CTC 18-28 LPA
            </span>
          </div>
        </div>
      </div>

      {/* Core Placement Pillars (5 Pillars) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#1E1C10]">Core Placement Pillars</h2>
          <p className="text-xs text-[#7C775F] font-medium">
            Detailed scores across every benchmark required by top-tier hiring panels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Pillar 1: Coding & Algorithms */}
          <div className="bg-white rounded-3xl p-5 border border-[#E8E2CF] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFE600]/30 text-[#1E1C10] flex items-center justify-center text-xl font-bold">
                  💻
                </div>
                <span className="bg-[#00F5D4]/30 text-[#006B5B] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  95th %ile
                </span>
              </div>
              <h3 className="text-base font-extrabold text-[#1E1C10]">Coding & Algorithms</h3>
              <p className="text-xs text-[#7C775F] mt-1 font-medium">
                Data structures, recursion, complexity, LeetCode style assessments.
              </p>

              <div className="my-4">
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-[#1E1C10]">Competency</span>
                  <span className="text-[#6A5F00] font-black text-sm">85%</span>
                </div>
                <div className="w-full bg-[#EEE8D4] h-3 rounded-full overflow-hidden">
                  <div className="bg-[#FFE600] h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#4B4731] font-medium">
                <div className="flex justify-between">
                  <span>Solved Questions:</span>
                  <span className="font-bold text-[#1E1C10]">184 / 200</span>
                </div>
                <div className="flex justify-between">
                  <span>Core Strengths:</span>
                  <span className="font-bold text-[#1E1C10]">Graphs, Trees, DP</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between bg-[#FAF3DF] px-3 py-2 rounded-2xl border border-[#E8E2CF]">
              <span className="text-xs text-[#006B5B] font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> +5 XP Boost
              </span>
              <a
                href="/coding"
                className="text-xs text-[#6A5F00] font-bold hover:underline flex items-center gap-1"
              >
                Inspect Pillar <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Pillar 2: Technical Stack */}
          <div className="bg-white rounded-3xl p-5 border border-[#E8E2CF] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-[#00F5D4]/20 text-[#006B5B] flex items-center justify-center text-xl font-bold">
                  ⚙️
                </div>
                <span className="bg-[#FFE600]/30 text-[#6A5F00] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Very Good
                </span>
              </div>
              <h3 className="text-base font-extrabold text-[#1E1C10]">Technical Stack</h3>
              <p className="text-xs text-[#7C775F] mt-1 font-medium">
                Full-stack, APIs, SQL/NoSQL, Docker & Cloud deployment readiness.
              </p>

              <div className="my-4">
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-[#1E1C10]">Verified Knowledge</span>
                  <span className="text-[#006B5B] font-black text-sm">79%</span>
                </div>
                <div className="w-full bg-[#EEE8D4] h-3 rounded-full overflow-hidden">
                  <div className="bg-[#00F5D4] h-full rounded-full" style={{ width: '79%' }}></div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#4B4731] font-medium">
                <div className="flex justify-between">
                  <span>Primary Stack:</span>
                  <span className="font-bold text-[#1E1C10]">React, Node, Postgres</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Check:</span>
                  <span className="font-bold text-[#BA1A1A]">Microservices</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between bg-[#FAF3DF] px-3 py-2 rounded-2xl border border-[#E8E2CF]">
              <span className="text-xs text-[#006B5B] font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> +8 XP Boost
              </span>
              <a
                href="/skill-gap"
                className="text-xs text-[#6A5F00] font-bold hover:underline flex items-center gap-1"
              >
                Inspect Pillar <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Pillar 3: Resume & ATS */}
          <div className="bg-white rounded-3xl p-5 border border-[#E8E2CF] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-[#9B5DE5]/15 text-[#9B5DE5] flex items-center justify-center text-xl font-bold">
                  📄
                </div>
                <span className="bg-[#9B5DE5]/20 text-[#9B5DE5] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  ATS Scanned
                </span>
              </div>
              <h3 className="text-base font-extrabold text-[#1E1C10]">Resume & ATS Score</h3>
              <p className="text-xs text-[#7C775F] mt-1 font-medium">
                Impact metric action verbs, formatting check, recruiter keywords.
              </p>

              <div className="my-4">
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-[#1E1C10]">ATS Compatibility</span>
                  <span className="text-[#9B5DE5] font-black text-sm">74%</span>
                </div>
                <div className="w-full bg-[#EEE8D4] h-3 rounded-full overflow-hidden">
                  <div className="bg-[#9B5DE5] h-full rounded-full" style={{ width: '74%' }}></div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#4B4731] font-medium">
                <div className="flex justify-between">
                  <span>Keyword Density:</span>
                  <span className="font-bold text-[#1E1C10]">88% Aligned</span>
                </div>
                <div className="flex justify-between">
                  <span>Improvement Area:</span>
                  <span className="font-bold text-[#FF6B6B]">Metric Quantifiers</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between bg-[#FAF3DF] px-3 py-2 rounded-2xl border border-[#E8E2CF]">
              <span className="text-xs text-[#006B5B] font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> +4 XP Boost
              </span>
              <a
                href="/resume"
                className="text-xs text-[#6A5F00] font-bold hover:underline flex items-center gap-1"
              >
                Inspect Pillar <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Pillar 4: GitHub & Projects */}
          <div className="bg-white rounded-3xl p-5 border border-[#E8E2CF] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF3DF] text-[#1E1C10] flex items-center justify-center text-xl font-bold border border-[#E8E2CF]">
                  🐙
                </div>
                <span className="bg-[#00F5D4]/20 text-[#006B5B] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  595 Commits
                </span>
              </div>
              <h3 className="text-base font-extrabold text-[#1E1C10]">GitHub & Open Source</h3>
              <p className="text-xs text-[#7C775F] mt-1 font-medium">
                Repo architecture, documentation standards, commit frequency.
              </p>

              <div className="my-4">
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-[#1E1C10]">Project Depth</span>
                  <span className="text-[#1A1A1A] font-black text-sm">71%</span>
                </div>
                <div className="w-full bg-[#EEE8D4] h-3 rounded-full overflow-hidden">
                  <div className="bg-[#1A1A1A] h-full rounded-full" style={{ width: '71%' }}></div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#4B4731] font-medium">
                <div className="flex justify-between">
                  <span>Live Production URLs:</span>
                  <span className="font-bold text-[#1E1C10]">2 / 3 Live</span>
                </div>
                <div className="flex justify-between">
                  <span>Flagship Repos:</span>
                  <span className="font-bold text-amber-600">Need Readme Badges</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between bg-[#FAF3DF] px-3 py-2 rounded-2xl border border-[#E8E2CF]">
              <span className="text-xs text-[#006B5B] font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> +6 XP Boost
              </span>
              <a
                href="/github"
                className="text-xs text-[#6A5F00] font-bold hover:underline flex items-center gap-1"
              >
                Inspect Pillar <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Pillar 5: Mock Interview Communication (2-column span on large) */}
          <div className="bg-white rounded-3xl p-5 border border-[#E8E2CF] shadow-sm hover:shadow-md transition-all flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B6B]/20 text-[#FF6B6B] flex items-center justify-center text-xl font-bold">
                  🎙️
                </div>
                <span className="bg-[#00F5D4]/30 text-[#006B5B] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Top Quartile (88%)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-base font-extrabold text-[#1E1C10]">
                    Mock Interview Communication
                  </h3>
                  <p className="text-xs text-[#7C775F] mt-1 font-medium">
                    STAR technique adherence, behavioral clarity, problem articulation speed.
                  </p>
                  <div className="my-4">
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="text-[#1E1C10]">Communication Rating</span>
                      <span className="text-[#FF6B6B] font-black text-sm">88%</span>
                    </div>
                    <div className="w-full bg-[#EEE8D4] h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-[#FF6B6B] h-full rounded-full"
                        style={{ width: '88%' }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF3DF] p-3.5 rounded-2xl border border-[#E8E2CF] flex flex-col justify-center">
                  <span className="text-xs text-[#7C775F] uppercase font-bold">
                    AI Interviewer Notes:
                  </span>
                  <p className="text-xs text-[#1E1C10] mt-1 leading-relaxed font-medium">
                    "Excellent confidence and structured explanations for System Design trade-offs.
                    Minor pause observed on Redis caching edge cases."
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between bg-[#FAF3DF] px-3 py-2 rounded-2xl border border-[#E8E2CF]">
              <span className="text-xs text-[#006B5B] font-bold flex items-center gap-1">
                <Verified className="w-3.5 h-3.5 text-emerald-600" /> 4 Mock Sessions Recorded
              </span>
              <a
                href="/interview"
                className="text-xs text-[#6A5F00] font-bold hover:underline flex items-center gap-1"
              >
                Review Audio Transcripts <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive "What If" Score Simulator Sandbox */}
      <div className="bg-[#FAF3DF] border border-[#CDC7AA] rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎮</span>
              <h2 className="text-xl font-extrabold text-[#1E1C10]">"What If" Score Simulator</h2>
            </div>
            <p className="text-xs text-[#4B4731] mt-0.5 font-medium">
              Check items below to simulate how small changes immediately boost your campus score!
            </p>
          </div>

          <div className="bg-white px-5 py-2 rounded-full shadow-sm border border-[#E8E2CF] flex items-center gap-3">
            <span className="text-xs text-[#7C775F] font-bold">Projected Leap:</span>
            <div className="flex items-center gap-1.5 font-black">
              <span className="text-base text-[#7C775F]">{baseScore}</span>
              <ArrowRight className="w-4 h-4 text-[#006B5B]" />
              <span className="text-xl text-[#006B5B]">{projectedScore}</span>
            </div>
            <span className="bg-[#FFE600] text-[#1E1C10] text-xs px-2.5 py-0.5 rounded-full font-extrabold">
              {projectedScore >= 90 ? 'Super Dream Tier 🌟' : 'Dream Tier ⭐'}
            </span>
          </div>
        </div>

        {/* Checkboxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          <label
            onClick={() => handleSimToggle('readme')}
            className={`p-4 rounded-2xl border shadow-sm transition-all flex items-start gap-3 cursor-pointer select-none ${
              simChecks.readme
                ? 'bg-white border-[#FFE600] ring-2 ring-[#FFE600]/30'
                : 'bg-[#F4EEDA] border-[#E8E2CF] opacity-75'
            }`}
          >
            <input
              type="checkbox"
              checked={simChecks.readme}
              readOnly
              className="mt-1 w-4 h-4 accent-[#6A5F00] cursor-pointer"
            />
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#1E1C10]">Fix Flagship READMEs</span>
                <span className="bg-[#00F5D4]/30 text-[#006B5B] text-[10px] px-2 py-0.5 rounded-full font-bold">
                  +4 pts
                </span>
              </div>
              <p className="text-[11px] text-[#4B4731] mt-1 font-medium">
                Add architectural diagrams, badges, and hosted demo URLs.
              </p>
            </div>
          </label>

          <label
            onClick={() => handleSimToggle('dp')}
            className={`p-4 rounded-2xl border shadow-sm transition-all flex items-start gap-3 cursor-pointer select-none ${
              simChecks.dp
                ? 'bg-white border-[#FFE600] ring-2 ring-[#FFE600]/30'
                : 'bg-[#F4EEDA] border-[#E8E2CF] opacity-75'
            }`}
          >
            <input
              type="checkbox"
              checked={simChecks.dp}
              readOnly
              className="mt-1 w-4 h-4 accent-[#6A5F00] cursor-pointer"
            />
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#1E1C10]">10 Hard DP Problems</span>
                <span className="bg-[#00F5D4]/30 text-[#006B5B] text-[10px] px-2 py-0.5 rounded-full font-bold">
                  +5 pts
                </span>
              </div>
              <p className="text-[11px] text-[#4B4731] mt-1 font-medium">
                Master Knapsack, Longest Common Subsequence & Tree DP patterns.
              </p>
            </div>
          </label>

          <label
            onClick={() => handleSimToggle('resume')}
            className={`p-4 rounded-2xl border shadow-sm transition-all flex items-start gap-3 cursor-pointer select-none ${
              simChecks.resume
                ? 'bg-white border-[#FFE600] ring-2 ring-[#FFE600]/30'
                : 'bg-[#F4EEDA] border-[#E8E2CF] opacity-75'
            }`}
          >
            <input
              type="checkbox"
              checked={simChecks.resume}
              readOnly
              className="mt-1 w-4 h-4 accent-[#6A5F00] cursor-pointer"
            />
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#1E1C10]">Quantify Resume Impact</span>
                <span className="bg-[#00F5D4]/30 text-[#006B5B] text-[10px] px-2 py-0.5 rounded-full font-bold">
                  +3 pts
                </span>
              </div>
              <p className="text-[11px] text-[#4B4731] mt-1 font-medium">
                Rewrite bullet points with "increased speed by 35% using Redis caching".
              </p>
            </div>
          </label>
        </div>

        {/* Footer Advice */}
        <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#4B4731] border-t border-[#E8E2CF]">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-4 h-4 text-[#6A5F00]" />
            Completing these tasks takes approximately 4.5 hours of focused prep.
          </span>
          <button
            onClick={() => {
              setAppliedNotice(true);
              setTimeout(() => setAppliedNotice(false), 3000);
            }}
            className="px-5 py-2 bg-[#FFE600] text-[#1E1C10] text-xs font-extrabold rounded-full shadow-sm hover:brightness-105 transition-all cursor-pointer active:scale-95"
          >
            {appliedNotice ? 'Added to Roadmap! 🎯' : 'Add All Tasks To My Roadmap 🚀'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
