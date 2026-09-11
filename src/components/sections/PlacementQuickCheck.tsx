import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { SmartToy } from '../icons/StitchIcons';

interface QuestionOption {
  label: string;
  sub?: string;
  scoreBonus: number;
}

const QUESTIONS = [
  {
    id: 'role',
    step: '01',
    title: 'What is your primary target campus role?',
    options: [
      { label: 'Full Stack SDE', sub: 'React, Node, DBs', scoreBonus: 30 },
      { label: 'Cloud & DevOps', sub: 'AWS, Go, K8s', scoreBonus: 32 },
      { label: 'AI & Data Science', sub: 'Python, ML, SQL', scoreBonus: 28 },
      { label: 'Core / Systems SDE', sub: 'C++, Java, Linux', scoreBonus: 31 },
    ] as QuestionOption[],
  },
  {
    id: 'dsa',
    step: '02',
    title: 'How many coding / DSA questions have you solved?',
    options: [
      { label: 'Getting Started', sub: '< 50 Problems', scoreBonus: 22 },
      { label: 'Consistent Solver', sub: '50 – 150 Problems', scoreBonus: 30 },
      { label: 'Campus Pro', sub: '150+ Problems', scoreBonus: 36 },
    ] as QuestionOption[],
  },
  {
    id: 'ctc',
    step: '03',
    title: 'What is your target CTC aspiration?',
    options: [
      { label: '₹8 – 14 LPA', sub: 'Fast Track SDE', scoreBonus: 25 },
      { label: '₹15 – 22 LPA', sub: 'High Growth Product', scoreBonus: 28 },
      { label: '₹25+ LPA', sub: 'Tier-1 Elite Day-1', scoreBonus: 31 },
    ] as QuestionOption[],
  },
];

export function PlacementQuickCheck() {
  const [answers, setAnswers] = useState<Record<string, number>>({
    role: 0,
    dsa: 1,
    ctc: 1,
  });

  const [activeTab, setActiveTab] = useState<'q1' | 'q2' | 'q3'>('q1');
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSelect = (questionId: string, optionIdx: number) => {
    setIsCalculating(true);
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    setTimeout(() => {
      setIsCalculating(false);
      if (questionId === 'role') setActiveTab('q2');
      else if (questionId === 'dsa') setActiveTab('q3');
    }, 200);
  };

  // Calculate live score based on selections
  const roleScore = QUESTIONS[0].options[answers.role]?.scoreBonus || 30;
  const dsaScore = QUESTIONS[1].options[answers.dsa]?.scoreBonus || 30;
  const ctcScore = QUESTIONS[2].options[answers.ctc]?.scoreBonus || 28;
  const totalScore = Math.min(98, roleScore + dsaScore + ctcScore);

  const selectedRole = QUESTIONS[0].options[answers.role]?.label || 'Full Stack SDE';
  const selectedDsa = QUESTIONS[1].options[answers.dsa]?.label || 'Consistent Solver';
  const selectedCtc = QUESTIONS[2].options[answers.ctc]?.label || '₹15 – 22 LPA';

  const getBadge = () => {
    if (totalScore >= 90) return { text: 'Tier-1 Elite Ready 🔥', color: 'bg-[#00F5D4]/30 text-[#006B5B]' };
    if (totalScore >= 80) return { text: 'Product SDE Fit ⚡', color: 'bg-[#FFE600]/40 text-[#6A5F00]' };
    return { text: 'Foundation Match 🌱', color: 'bg-[#FAF3DF] text-[#1E1C10]' };
  };

  const getTip = () => {
    if (answers.dsa === 0) return 'Recommended: Boost tree and dynamic programming streaks to easily cross 90%+ readiness.';
    if (answers.ctc === 2) return 'Top Tier-1 fit! Polishing System Design trade-offs will lock in Day-1 offers.';
    return 'Strong foundational match for Atlassian, Razorpay & PhonePe campus recruitment blitzes.';
  };

  const badge = getBadge();

  return (
    <section id="mini-audit" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1500px] mx-auto w-full relative">
      {/* Soft Ambient Glass Glows */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-[#FFE600]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00F5D4]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Glassmorphism Wrapper */}
      <div className="bg-white/75 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#CDC7AA]/30">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-extrabold text-[#6A5F00] border border-[#CDC7AA]/40 shadow-xs mb-2.5">
              <Sparkles className="h-3.5 w-3.5 text-[#1A1A1A]" />
              <span>Instant AI Placement Fit Check</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-[#1E1C10] tracking-tight">
              Test Your Dream Placement Match
            </h2>
            <p className="text-xs sm:text-sm text-[#4B4731] font-medium mt-1">
              Select 3 quick answers to simulate your real-time campus hiring readiness.
            </p>
          </div>

          {/* Quick Step Tabs */}
          <div className="flex items-center gap-2 bg-[#FAF3DF]/80 p-1.5 rounded-2xl border border-[#CDC7AA]/40 self-start md:self-auto">
            {[
              { id: 'q1', label: '1. Role' },
              { id: 'q2', label: '2. Coding' },
              { id: 'q3', label: '3. Package' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as 'q1' | 'q2' | 'q3')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1E1C10] text-white shadow-xs'
                    : 'text-[#4B4731] hover:text-[#1E1C10] hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Responsive Q&A Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8">
          {/* Left Column: Interactive Q&A Selection (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Question 1: Target Role */}
            {activeTab === 'q1' && (
              <div className="space-y-4 animate-rise">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#6A5F00] bg-[#FAF3DF] px-2.5 py-0.5 rounded-md">
                    Question 1 of 3
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('q2')}
                    className="text-xs font-bold text-[#1E1C10] flex items-center gap-1 hover:underline"
                  >
                    <span>Next question</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-black text-[#1E1C10]">
                  {QUESTIONS[0].title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {QUESTIONS[0].options.map((opt, idx) => {
                    const isSelected = answers.role === idx;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => handleSelect('role', idx)}
                        className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between gap-1 group ${
                          isSelected
                            ? 'bg-[#1E1C10] text-white border-[#1E1C10] shadow-md scale-[1.02]'
                            : 'bg-white/80 hover:bg-white text-[#1E1C10] border-[#CDC7AA]/50 hover:border-[#1E1C10]/40 shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-heading text-sm font-black">{opt.label}</span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-white bg-[#FFE600]' : 'border-[#CDC7AA]'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />}
                          </div>
                        </div>
                        <span className={`text-[11px] font-medium ${isSelected ? 'text-[#CDC7AA]' : 'text-[#7C775F]'}`}>
                          {opt.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question 2: DSA Level */}
            {activeTab === 'q2' && (
              <div className="space-y-4 animate-rise">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#6A5F00] bg-[#FAF3DF] px-2.5 py-0.5 rounded-md">
                    Question 2 of 3
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('q1')}
                      className="text-xs font-bold text-[#7C775F] hover:underline"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('q3')}
                      className="text-xs font-bold text-[#1E1C10] flex items-center gap-1 hover:underline"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-black text-[#1E1C10]">
                  {QUESTIONS[1].title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {QUESTIONS[1].options.map((opt, idx) => {
                    const isSelected = answers.dsa === idx;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => handleSelect('dsa', idx)}
                        className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between gap-1 group ${
                          isSelected
                            ? 'bg-[#1E1C10] text-white border-[#1E1C10] shadow-md scale-[1.02]'
                            : 'bg-white/80 hover:bg-white text-[#1E1C10] border-[#CDC7AA]/50 hover:border-[#1E1C10]/40 shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-heading text-sm font-black">{opt.label}</span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-white bg-[#FFE600]' : 'border-[#CDC7AA]'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />}
                          </div>
                        </div>
                        <span className={`text-[11px] font-medium ${isSelected ? 'text-[#CDC7AA]' : 'text-[#7C775F]'}`}>
                          {opt.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question 3: CTC Aspirations */}
            {activeTab === 'q3' && (
              <div className="space-y-4 animate-rise">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#6A5F00] bg-[#FAF3DF] px-2.5 py-0.5 rounded-md">
                    Question 3 of 3
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('q2')}
                    className="text-xs font-bold text-[#7C775F] hover:underline"
                  >
                    ← Back to Question 2
                  </button>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-black text-[#1E1C10]">
                  {QUESTIONS[2].title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {QUESTIONS[2].options.map((opt, idx) => {
                    const isSelected = answers.ctc === idx;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => handleSelect('ctc', idx)}
                        className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between gap-1 group ${
                          isSelected
                            ? 'bg-[#1E1C10] text-white border-[#1E1C10] shadow-md scale-[1.02]'
                            : 'bg-white/80 hover:bg-white text-[#1E1C10] border-[#CDC7AA]/50 hover:border-[#1E1C10]/40 shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-heading text-sm font-black">{opt.label}</span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-white bg-[#FFE600]' : 'border-[#CDC7AA]'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />}
                          </div>
                        </div>
                        <span className={`text-[11px] font-medium ${isSelected ? 'text-[#CDC7AA]' : 'text-[#7C775F]'}`}>
                          {opt.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Summary Pill Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-[#7C775F]">
              <span className="font-bold">Your selections:</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/70 border border-[#CDC7AA]/40 text-[#1E1C10] font-semibold">
                {selectedRole}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/70 border border-[#CDC7AA]/40 text-[#1E1C10] font-semibold">
                {selectedDsa}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/70 border border-[#CDC7AA]/40 text-[#1E1C10] font-semibold">
                {selectedCtc}
              </span>
            </div>
          </div>

          {/* Right Column: Instant Glass Result Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-white/95 to-[#FAF3DF]/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border-2 border-white shadow-xl flex flex-col justify-between gap-6 relative">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-extrabold text-[#7C775F] uppercase tracking-wider">
                  Live Simulated Benchmark
                </span>
                <div className="flex items-baseline gap-2.5 mt-1.5">
                  <span className={`font-heading text-4xl sm:text-5xl font-black text-[#1E1C10] transition-transform ${isCalculating ? 'scale-110 opacity-70' : 'scale-100 opacity-100'}`}>
                    {totalScore}%
                  </span>
                  <span className={`text-xs font-black px-3 py-1 rounded-full ${badge.color}`}>
                    {badge.text}
                  </span>
                </div>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-[#FFE600] flex items-center justify-center text-[#1A1A1A] shadow-sm border border-[#CDC7AA]/40">
                <SmartToy className="h-6 w-6 text-[#1A1A1A]" />
              </div>
            </div>

            {/* Insight Box */}
            <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-[#CDC7AA]/30">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#006B5B] mb-1">
                <Zap className="h-3.5 w-3.5 text-[#006B5B]" />
                <span>AI Recommendation</span>
              </div>
              <p className="text-xs text-[#4B4731] font-medium leading-relaxed">
                {getTip()}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <Link
                to="/register"
                className="w-full py-3.5 rounded-full bg-[#1E1C10] hover:bg-black text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
              >
                <span>Unlock Full Roadmap & AI Mocks</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#FFE600]" />
              </Link>
              <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-[#7C775F]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#006B5B]" />
                <span>100% Free Campus Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
