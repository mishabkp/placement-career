import React, { useState } from 'react';
import { PageHeader } from '../../components/shared/PageHeader';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import {
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Code2,
  BookOpen,
  FileText,
  Mic,
  RefreshCw,
  Printer,
  ChevronRight,
  Target,
  Sparkles,
  BarChart3,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActionItem {
  id: string;
  title: string;
  category: string;
  points: number;
  timeEstimate: string;
  link: string;
  linkText: string;
}

const ACTION_ITEMS: ActionItem[] = [
  {
    id: 'coding-trees',
    title: 'Solve 5 Tree & Graph traversal problems',
    category: 'Coding Arena',
    points: 4,
    timeEstimate: '2.5 hrs',
    link: '/coding',
    linkText: 'Practice Coding',
  },
  {
    id: 'resume-metrics',
    title: 'Quantify project impact metrics in Resume',
    category: 'Resume Analyzer',
    points: 3,
    timeEstimate: '45 mins',
    link: '/resume',
    linkText: 'Review Resume',
  },
  {
    id: 'mock-interview',
    title: 'Complete 1 AI Mock Interview session',
    category: 'AI Interview',
    points: 4,
    timeEstimate: '20 mins',
    link: '/interview',
    linkText: 'Start Interview',
  },
];

export const ProgressPage: React.FC = () => {
  const { studentBranch } = useAuth();
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentScore, setCurrentScore] = useState(82);
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({
    'resume-metrics': false,
    'coding-trees': true,
    'mock-interview': false,
  });

  const toggleAction = (id: string) => {
    setCompletedActions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReEvaluate = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      // Small simulated adjustment to demonstrate live calculation
      setCurrentScore((prev) => (prev === 82 ? 85 : 82));
      setIsEvaluating(false);
    }, 1000);
  };

  // Projected score based on checked action items
  const additionalPoints = ACTION_ITEMS.reduce((sum, item) => {
    return sum + (completedActions[item.id] ? item.points : 0);
  }, 0);
  const projectedTotal = Math.min(100, 75 + additionalPoints);

  const pillars = [
    {
      title: 'Coding & Algorithms',
      score: 85,
      icon: <Code2 className="h-5 w-5 text-[#6A5F00]" />,
      summary: 'Data structures, problem solving patterns, and complexity analysis.',
      strengths: 'Arrays, Two Pointers, Hash Maps',
      needsWork: 'Dynamic Programming & Graphs',
      link: '/coding',
      linkText: 'Practice Coding',
    },
    {
      title: 'Core Domain Knowledge',
      score: 80,
      icon: <BookOpen className="h-5 w-5 text-[#006B5B]" />,
      summary: `Fundamental concepts and technical competency in ${studentBranch || 'Core Engineering'}.`,
      strengths: 'System Architecture & Database Foundations',
      needsWork: 'Distributed Caching & Concurrency',
      link: '/learning',
      linkText: 'Review Concepts',
    },
    {
      title: 'Resume & ATS Quality',
      score: 78,
      icon: <FileText className="h-5 w-5 text-[#B45309]" />,
      summary: 'Keyword relevancy, clean formatting, and recruiter parsing compatibility.',
      strengths: 'Concise layout and verified tech stack',
      needsWork: 'Quantifiable metrics in project bullets',
      link: '/resume',
      linkText: 'Optimize Resume',
    },
    {
      title: 'Mock Interview Communication',
      score: 84,
      icon: <Mic className="h-5 w-5 text-[#7C3AED]" />,
      summary: 'Technical explanation clarity, problem breakdown, and behavioral STAR format.',
      strengths: 'Clear articulation of thought process',
      needsWork: 'Behavioral STAR methodology depth',
      link: '/interview',
      linkText: 'Practice Mock',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-16 font-sans">
      {/* Page Header */}
      <PageHeader
        title="Career Readiness Score"
        description="A real-time, balanced evaluation of your placement readiness across coding, core tech, resume, and interview skills."
        icon={<BarChart3 className="h-6 w-6 text-[#726600]" />}
        badge={<Badge variant="success">Tier-1 Ready</Badge>}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleReEvaluate}
              disabled={isEvaluating}
              className="px-4 py-2 bg-[#FFE600] text-[#1E1C10] text-xs font-bold rounded-full shadow-sm hover:brightness-105 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isEvaluating ? 'animate-spin' : ''}`} />
              <span>{isEvaluating ? 'Recalculating...' : 'Live Re-evaluate'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-white border border-[#CDC7AA]/60 text-[#1E1C10] text-xs font-bold rounded-full shadow-xs hover:bg-[#FAF3DF] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#7C775F]" />
              <span>Print Summary</span>
            </button>
          </div>
        }
      />

      {/* ─── Hero Score Overview (Clean & Balanced) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Main Dial Card (5 cols) */}
        <div className="lg:col-span-5 bg-[#FAF3DF] border border-[#CDC7AA]/60 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C775F]">
                Placement Readiness Index
              </span>
              <span className="text-xs font-bold text-[#006B5B] bg-[#00F5D4]/25 px-2.5 py-0.5 rounded-full">
                Active Benchmark
              </span>
            </div>

            {/* Circular Gauge */}
            <div className="flex flex-col items-center justify-center my-4">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    className="text-white"
                    cx="60"
                    cy="60"
                    fill="transparent"
                    r="48"
                    stroke="currentColor"
                    strokeWidth="10"
                  />
                  <circle
                    className="transition-all duration-1000 ease-out text-[#FFE600]"
                    cx="60"
                    cy="60"
                    fill="transparent"
                    r="48"
                    stroke="currentColor"
                    strokeDasharray="301.59"
                    strokeDashoffset={301.59 - (301.59 * currentScore) / 100}
                    strokeLinecap="round"
                    strokeWidth="10"
                  />
                </svg>

                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-4xl sm:text-5xl font-black text-[#1E1C10] font-heading tracking-tight">
                    {currentScore}
                  </span>
                  <span className="text-xs font-bold text-[#7C775F]">out of 100</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 rounded-2xl p-3.5 border border-[#CDC7AA]/40 text-center">
            <p className="text-xs font-bold text-[#1E1C10]">
              Eligibility: <span className="text-[#6A5F00]">Top Product & Core Campus Drives</span>
            </p>
            <p className="text-[11px] text-[#7C775F] mt-0.5">
              Score reflects verified performance across coding tests, resume checks, and interview rubrics.
            </p>
          </div>
        </div>

        {/* Highlight Insights (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#CDC7AA]/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs">
          <div>
            <h3 className="text-base font-bold text-[#1E1C10] font-heading mb-1">
              Readiness Breakdown & Insights
            </h3>
            <p className="text-xs text-[#7C775F] mb-5">
              Summary of your verified competencies relative to campus recruitment standards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              <div className="p-3.5 rounded-2xl bg-[#FAF3DF] border border-[#CDC7AA]/40">
                <span className="text-[11px] font-bold text-[#7C775F] block">Technical Foundation</span>
                <span className="text-xl font-black text-[#1E1C10] mt-0.5 block">85%</span>
                <span className="text-[11px] text-[#006B5B] font-bold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> Strong
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF3DF] border border-[#CDC7AA]/40">
                <span className="text-[11px] font-bold text-[#7C775F] block">Resume ATS Score</span>
                <span className="text-xl font-black text-[#1E1C10] mt-0.5 block">78%</span>
                <span className="text-[11px] text-[#B45309] font-bold flex items-center gap-1 mt-1">
                  Needs Metrics
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF3DF] border border-[#CDC7AA]/40">
                <span className="text-[11px] font-bold text-[#7C775F] block">Interview Confidence</span>
                <span className="text-xl font-black text-[#1E1C10] mt-0.5 block">84%</span>
                <span className="text-[11px] text-[#006B5B] font-bold flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3 h-3" /> Interview Ready
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF3DF]/60 border border-[#CDC7AA]/30 text-xs text-[#4B4731] leading-relaxed">
              <span className="font-bold text-[#1E1C10]">Key Observation:</span> Your algorithmic problem solving and technical fundamentals are in great shape. Boosting your resume's quantified impact points and completing one targeted mock interview will push you above <strong className="text-[#6A5F00]">90 points</strong>.
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#CDC7AA]/30 flex flex-wrap items-center justify-between gap-3 text-xs text-[#7C775F]">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#6A5F00]" />
              Regular updates from Coding Arena & Resume Scans.
            </span>
            <Link
              to="/skill-gap"
              className="text-[#6A5F00] font-bold hover:underline flex items-center gap-1"
            >
              View Skill Gap Analysis <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ─── 4 Core Placement Pillars (Clean Cards) ─── */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[#1E1C10] font-heading">
            Placement Assessment Pillars
          </h2>
          <p className="text-xs text-[#7C775F]">
            The four foundation metrics evaluated by top campus recruitment teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white rounded-2xl p-5 border border-[#CDC7AA]/50 shadow-xs flex flex-col justify-between hover:border-[#FFE600] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF3DF] border border-[#CDC7AA]/40 flex items-center justify-center">
                      {pillar.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#1E1C10]">{pillar.title}</h3>
                      <p className="text-[11px] text-[#7C775F]">{pillar.summary}</p>
                    </div>
                  </div>
                  <span className="text-base font-black text-[#1E1C10] font-heading">
                    {pillar.score}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#FAF3DF] h-2 rounded-full overflow-hidden mb-3">
                  <div
                    className="bg-[#FFE600] h-full rounded-full transition-all duration-700"
                    style={{ width: `${pillar.score}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] mt-3 pt-3 border-t border-[#CDC7AA]/30">
                  <div>
                    <span className="text-[#7C775F] block">Key Strength</span>
                    <span className="font-bold text-[#006B5B] block truncate mt-0.5">
                      {pillar.strengths}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#7C775F] block">Next Area to Polish</span>
                    <span className="font-bold text-[#B45309] block truncate mt-0.5">
                      {pillar.needsWork}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#CDC7AA]/20 flex items-center justify-end">
                <Link
                  to={pillar.link}
                  className="text-xs font-bold text-[#6A5F00] hover:text-[#1E1C10] flex items-center gap-1 transition-colors"
                >
                  {pillar.linkText} <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── High-Impact Score Improvement Plan ─── */}
      <div className="bg-[#FAF3DF] border border-[#CDC7AA]/60 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-[#6A5F00]" />
              <h2 className="text-base sm:text-lg font-bold text-[#1E1C10] font-heading">
                Actionable Tasks to Reach 90+
              </h2>
            </div>
            <p className="text-xs text-[#7C775F] mt-0.5">
              Check off recommended activities to simulate your projected score increase.
            </p>
          </div>

          <div className="bg-white px-3.5 py-1.5 rounded-full border border-[#CDC7AA]/50 flex items-center gap-2 self-start sm:self-center shadow-xs">
            <span className="text-xs text-[#7C775F] font-bold">Projected Score:</span>
            <span className="text-xs font-black text-[#006B5B]">{projectedTotal} / 100</span>
          </div>
        </div>

        {/* Task Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {ACTION_ITEMS.map((item) => {
            const isDone = !!completedActions[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleAction(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isDone
                    ? 'bg-white border-[#FFE600] shadow-sm'
                    : 'bg-white/70 border-[#CDC7AA]/50 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C775F]">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-bold text-[#006B5B] bg-[#00F5D4]/20 px-2 py-0.5 rounded-full">
                      +{item.points} pts
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => {}}
                      className="mt-0.5 w-4 h-4 accent-[#6A5F00] rounded cursor-pointer"
                    />
                    <p className={`text-xs font-bold leading-snug ${isDone ? 'text-[#1E1C10]' : 'text-[#4B4731]'}`}>
                      {item.title}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-[#CDC7AA]/20 flex items-center justify-between text-[11px]">
                  <span className="text-[#7C775F]">~{item.timeEstimate}</span>
                  <Link
                    to={item.link}
                    onClick={(e) => e.stopPropagation()}
                    className="font-bold text-[#6A5F00] hover:underline flex items-center gap-0.5"
                  >
                    {item.linkText} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
