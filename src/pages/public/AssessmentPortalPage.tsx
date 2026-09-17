import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Brain, Clock, Award, CheckCircle2, XCircle, AlertCircle, Bookmark,
  RotateCcw, ArrowRight, ArrowLeft, Sparkles, Check,
  Timer, Maximize2, Minimize2, ShieldCheck, Flame
} from 'lucide-react';
import {
  ASSESSMENT_TESTS,
  MOCK_PAST_RESULTS,
  type AssessmentTest,
  type PastAssessmentResult
} from '../../data/assessmentData';

type ViewMode = 'hub' | 'exam' | 'result';

interface UserResponse {
  selectedOption: number | null; // index of chosen option or null
  isMarkedForReview: boolean;
  timeSpentSeconds: number;
  visited: boolean;
}

export default function AssessmentPortalPage() {
  // Active view state
  const [viewMode, setViewMode] = useState<ViewMode>('hub');
  const [selectedTest, setSelectedTest] = useState<AssessmentTest>(ASSESSMENT_TESTS[0]);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Exam state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<Record<string, UserResponse>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(0);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Past results list
  const [pastResults, setPastResults] = useState<PastAssessmentResult[]>(MOCK_PAST_RESULTS);
  const [currentResult, setCurrentResult] = useState<PastAssessmentResult | null>(null);

  // Timer interval ref
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Filtered tests in hub
  const filteredTests = useMemo(() => {
    return ASSESSMENT_TESTS.filter((t) => {
      const matchCategory = filterCategory === 'All' || t.category === filterCategory;
      const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.companyTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        t.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [filterCategory, searchQuery]);

  // Start Test Handler
  const handleStartTest = (test: AssessmentTest) => {
    setSelectedTest(test);
    const initialResponses: Record<string, UserResponse> = {};
    test.questions.forEach((q, idx) => {
      initialResponses[q.id] = {
        selectedOption: null,
        isMarkedForReview: false,
        timeSpentSeconds: 0,
        visited: idx === 0,
      };
    });
    setUserResponses(initialResponses);
    setCurrentQuestionIndex(0);
    setTimeRemainingSeconds(test.durationMinutes * 60);
    setViewMode('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Timer Effect
  useEffect(() => {
    if (viewMode === 'exam' && timeRemainingSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [viewMode]);

  // Handle Question Change
  const handleSelectOption = (optionIndex: number) => {
    const q = selectedTest.questions[currentQuestionIndex];
    setUserResponses((prev) => ({
      ...prev,
      [q.id]: {
        ...prev[q.id],
        selectedOption: prev[q.id]?.selectedOption === optionIndex ? null : optionIndex,
        visited: true,
      },
    }));
  };

  const handleToggleMarkForReview = () => {
    const q = selectedTest.questions[currentQuestionIndex];
    setUserResponses((prev) => ({
      ...prev,
      [q.id]: {
        ...prev[q.id],
        isMarkedForReview: !prev[q.id]?.isMarkedForReview,
        visited: true,
      },
    }));
  };

  const handleClearResponse = () => {
    const q = selectedTest.questions[currentQuestionIndex];
    setUserResponses((prev) => ({
      ...prev,
      [q.id]: {
        ...prev[q.id],
        selectedOption: null,
        visited: true,
      },
    }));
  };

  const handleNavigateQuestion = (index: number) => {
    if (index >= 0 && index < selectedTest.questions.length) {
      const q = selectedTest.questions[index];
      setUserResponses((prev) => ({
        ...prev,
        [q.id]: {
          ...(prev[q.id] || { selectedOption: null, isMarkedForReview: false, timeSpentSeconds: 0 }),
          visited: true,
        },
      }));
      setCurrentQuestionIndex(index);
    }
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Auto/Manual Submit
  const handleAutoSubmit = () => {
    calculateAndShowResults();
  };

  const handleManualSubmit = () => {
    setIsSubmitModalOpen(false);
    calculateAndShowResults();
  };

  const calculateAndShowResults = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    let totalScore = 0;
    const sectionScores: Record<string, { correct: number; total: number }> = {};

    selectedTest.questions.forEach((q) => {
      if (!sectionScores[q.section]) {
        sectionScores[q.section] = { correct: 0, total: 0 };
      }
      sectionScores[q.section].total += 1;

      const userChoice = userResponses[q.id]?.selectedOption;
      if (userChoice !== null && userChoice !== undefined) {
        if (userChoice === q.correctOptionIndex) {
          totalScore += q.marks;
          sectionScores[q.section].correct += 1;
        } else if (selectedTest.negativeMarking) {
          totalScore = Math.max(0, totalScore - q.negativeMarks);
        }
      }
    });

    const percentage = Number(((totalScore / selectedTest.totalMarks) * 100).toFixed(1));
    const passed = percentage >= selectedTest.passPercentage;
    const percentile = Number(Math.min(99.4, Math.max(45, (percentage * 0.95) + Math.random() * 6)).toFixed(1));
    const timeSpent = (selectedTest.durationMinutes * 60) - timeRemainingSeconds;

    const newResult: PastAssessmentResult = {
      id: `res-${Date.now()}`,
      testId: selectedTest.id,
      testTitle: selectedTest.title,
      date: 'Just now',
      score: totalScore,
      totalMarks: selectedTest.totalMarks,
      percentage,
      percentile,
      passed,
      timeSpentSeconds: timeSpent,
      sectionScores,
    };

    setCurrentResult(newResult);
    setPastResults((prev) => [newResult, ...prev]);
    setViewMode('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (passed) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899'],
      });
    }
  };

  // Exam stats calculations
  const stats = useMemo(() => {
    let answered = 0;
    let marked = 0;
    let answeredAndMarked = 0;
    let notVisited = 0;
    let unanswered = 0;

    selectedTest.questions.forEach((q) => {
      const resp = userResponses[q.id];
      const hasAnswer = resp?.selectedOption !== null && resp?.selectedOption !== undefined;
      const isMarked = resp?.isMarkedForReview;

      if (hasAnswer && isMarked) {
        answeredAndMarked++;
      } else if (hasAnswer) {
        answered++;
      } else if (isMarked) {
        marked++;
      } else if (resp?.visited) {
        unanswered++;
      } else {
        notVisited++;
      }
    });

    return {
      answered,
      marked,
      answeredAndMarked,
      notVisited,
      unanswered,
      totalAnsweredCount: answered + answeredAndMarked,
      remainingCount: selectedTest.questions.length - (answered + answeredAndMarked),
    };
  }, [selectedTest, userResponses]);

  // Format Timer String
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Current Question helper
  const currentQ = selectedTest.questions[currentQuestionIndex] || selectedTest.questions[0];
  const currentResponse = userResponses[currentQ?.id] || {
    selectedOption: null,
    isMarkedForReview: false,
    timeSpentSeconds: 0,
    visited: true,
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-amber-500/30 selection:text-amber-300 font-sans flex flex-col">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP NAVIGATION BAR (CLEAN & MINIMALIST TEST PLATFORM HEADER)
         ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#0B0F17]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3.5">
          <Link
            to="/features"
            className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-amber-400 transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Features Hub</span>
          </Link>
          <div className="h-5 w-[1px] bg-white/15 hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-black font-black text-sm shadow-[0_0_15px_rgba(245,158,11,0.4)]">
              <Brain className="w-4 h-4 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white tracking-tight">ASSESS<span className="text-amber-400">PRO</span></span>
                <span className="text-[10px] uppercase tracking-widest font-black px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  MCQ Engine
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Header Center/Right according to mode */}
        {viewMode === 'exam' ? (
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Live Countdown Timer */}
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm tracking-wider ${
              timeRemainingSeconds < 180
                ? 'bg-red-500/15 border-red-500/50 text-red-400 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                : 'bg-black/60 border-amber-400/30 text-amber-300'
            }`}>
              <Timer className="w-4 h-4 text-amber-400" />
              <span>{formatTime(timeRemainingSeconds)}</span>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors hidden sm:flex items-center justify-center"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Submit Button */}
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Submit Test</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (viewMode === 'result') setViewMode('hub');
              }}
              className="text-xs font-semibold text-gray-400 hover:text-white transition-colors"
            >
              {viewMode === 'result' ? '← Back to Assessment Lobby' : 'Placement Standard v2.4'}
            </button>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. VIEW 1: HUB / TEST SELECTOR & DASHBOARD
         ───────────────────────────────────────────────────────────── */}
      {viewMode === 'hub' && (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {/* Hero Banner with Placement Readiness stats */}
          <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-br from-[#121824] via-[#0E131E] to-[#0A0D14] border border-amber-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Interactive Placement Assessment Simulator</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  Master Campus <span className="gradient-text-amber">Aptitude & Technical</span> MCQ Rounds
                </h1>
                <p className="mt-3 text-sm sm:text-base text-gray-400 font-normal leading-relaxed">
                  Real exam conditions with timed question palettes, negative marking, instant section-wise accuracy analytics, and detailed step-by-step answer keys.
                </p>
              </div>

              {/* Quick Telemetry Box */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-black/50 backdrop-blur-md p-5 rounded-2xl border border-white/10 shrink-0">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[11px] text-gray-400 font-medium">Tests Ready</div>
                  <div className="text-2xl font-black text-white mt-0.5">{ASSESSMENT_TESTS.length}</div>
                  <div className="text-[10px] text-amber-400 font-bold">100% Verified</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[11px] text-gray-400 font-medium">Avg Pass Rate</div>
                  <div className="text-2xl font-black text-emerald-400 mt-0.5">78.4%</div>
                  <div className="text-[10px] text-gray-400">Campus Benchmark</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 col-span-2 sm:col-span-1">
                  <div className="text-[11px] text-gray-400 font-medium">Your Attempts</div>
                  <div className="text-2xl font-black text-amber-400 mt-0.5">{pastResults.length}</div>
                  <div className="text-[10px] text-teal-400 font-bold">Top: 94.2% tile</div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter Pills & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-white/10">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {['All', 'All-Rounder', 'Aptitude', 'Core CS', 'Frontend/Fullstack'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    filterCategory === cat
                      ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat === 'All' ? 'All Assessments' : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by company, role, topic..."
                className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Assessment Test Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredTests.map((test) => (
              <div
                key={test.id}
                className="group relative rounded-3xl bg-[#0E131E] border border-white/10 hover:border-amber-400/60 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.15)] overflow-hidden"
              >
                {/* Subtle top banner glow */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top tags row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/30">
                      {test.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1 font-mono font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {test.durationMinutes} Mins
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-amber-300 transition-colors leading-snug">
                    {test.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-400 font-normal mt-2.5 line-clamp-2 leading-relaxed">
                    {test.shortDesc}
                  </p>

                  {/* Company Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-4">
                    {test.companyTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-semibold text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Metadata + Start Button */}
                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                    <div>
                      <span className="text-white font-bold">{test.questions.length}</span> Questions
                    </div>
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <div>
                      <span className="text-white font-bold">{test.totalMarks}</span> Marks
                    </div>
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <div className="text-amber-400 font-semibold">
                      {test.negativeMarking ? '-0.25 Neg' : 'No Neg'}
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartTest(test)}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Start Test</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Past Assessment Attempts Section */}
          {pastResults.length > 0 && (
            <div className="rounded-3xl bg-[#0E131E] border border-white/10 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-white">Recent Assessment History</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Your recorded mock attempts and performance analytics</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 text-gray-300 border border-white/10">
                  {pastResults.length} Attempts
                </span>
              </div>

              <div className="space-y-3">
                {pastResults.map((res) => (
                  <div
                    key={res.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-400/30 transition-colors gap-3"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white">{res.testTitle}</h4>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-1 font-mono">
                        <span>{res.date}</span>
                        <span>•</span>
                        <span>Time: {Math.floor(res.timeSpentSeconds / 60)}m {res.timeSpentSeconds % 60}s</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-black text-amber-400">{res.score} / {res.totalMarks} ({res.percentage}%)</div>
                        <div className="text-[11px] text-teal-400 font-bold">{res.percentile}th Percentile</div>
                      </div>
                      <span className={`px-3 py-1 rounded-xl text-xs font-extrabold uppercase tracking-wider ${
                        res.passed ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {res.passed ? 'PASSED' : 'RETRY'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. VIEW 2: LIVE EXAMINATION SUITE (THE ENGINE)
         ───────────────────────────────────────────────────────────── */}
      {viewMode === 'exam' && (
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-[1700px] mx-auto w-full">
          {/* Left / Center: Question Canvas */}
          <div className="flex-1 p-4 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
            {/* Question Header Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-extrabold uppercase tracking-wider">
                  {currentQ.section}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  Question {currentQuestionIndex + 1} of {selectedTest.questions.length}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  +{currentQ.marks} Marks
                </span>
                {selectedTest.negativeMarking && (
                  <span className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 font-bold">
                    -{currentQ.negativeMarks} Neg
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-lg bg-white/5 text-gray-300 border border-white/10">
                  {currentQ.difficulty}
                </span>
              </div>
            </div>

            {/* Question Text & Code Snippet */}
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed tracking-normal">
                {currentQ.question}
              </h2>

              {/* Code Snippet Box (if any) */}
              {currentQ.codeSnippet && (
                <div className="p-4 rounded-2xl bg-black/80 border border-white/10 font-mono text-xs text-amber-300 overflow-x-auto leading-relaxed">
                  <pre>{currentQ.codeSnippet}</pre>
                </div>
              )}
            </div>

            {/* 4 Options Grid */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((optionText, optIdx) => {
                const isSelected = currentResponse.selectedOption === optIdx;
                const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-start gap-4 group ${
                      isSelected
                        ? 'bg-amber-400/15 border-amber-400 text-white shadow-[0_0_25px_rgba(245,158,11,0.25)]'
                        : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20 text-gray-200'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-amber-400 text-black'
                          : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white'
                      }`}
                    >
                      {letter}
                    </div>
                    <span className="text-sm font-medium leading-relaxed pt-0.5">
                      {optionText}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons Bar at bottom */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleMarkForReview}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                    currentResponse.isMarkedForReview
                      ? 'bg-indigo-600/30 border-indigo-400 text-indigo-300'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{currentResponse.isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}</span>
                </button>

                {currentResponse.selectedOption !== null && (
                  <button
                    onClick={handleClearResponse}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Clear Choice
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => handleNavigateQuestion(currentQuestionIndex - 1)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold text-white border border-white/10 transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {currentQuestionIndex < selectedTest.questions.length - 1 ? (
                  <button
                    onClick={() => handleNavigateQuestion(currentQuestionIndex + 1)}
                    className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all flex items-center gap-1.5"
                  >
                    <span>Save & Next</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsSubmitModalOpen(true)}
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all flex items-center gap-1.5"
                  >
                    <span>Finish Test</span>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Real-time Question Palette */}
          <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0B0F17]/60 p-4 sm:p-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Palette Legend */}
              <div className="mb-5 pb-4 border-b border-white/10">
                <h4 className="text-xs font-extrabold text-gray-300 uppercase tracking-wider mb-3">Question Palette</h4>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-medium text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-500 shrink-0" />
                    <span>Answered ({stats.answered})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-slate-700 shrink-0" />
                    <span>Unanswered ({stats.unanswered + stats.notVisited})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-indigo-600 shrink-0" />
                    <span>Review ({stats.marked})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-amber-500 shrink-0" />
                    <span>Ans + Review ({stats.answeredAndMarked})</span>
                  </div>
                </div>
              </div>

              {/* Matrix of Question Buttons */}
              <div className="grid grid-cols-5 gap-2.5">
                {selectedTest.questions.map((q, idx) => {
                  const resp = userResponses[q.id];
                  const hasAnswer = resp?.selectedOption !== null && resp?.selectedOption !== undefined;
                  const isMarked = resp?.isMarkedForReview;
                  const isCurrent = idx === currentQuestionIndex;

                  let bgClass = 'bg-white/5 text-gray-400 border-white/5';
                  if (hasAnswer && isMarked) {
                    bgClass = 'bg-amber-500 text-black font-black shadow-[0_0_10px_rgba(245,158,11,0.4)]';
                  } else if (hasAnswer) {
                    bgClass = 'bg-emerald-500 text-black font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]';
                  } else if (isMarked) {
                    bgClass = 'bg-indigo-600 text-white font-bold';
                  } else if (resp?.visited) {
                    bgClass = 'bg-slate-700 text-gray-200';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleNavigateQuestion(idx)}
                      className={`h-9 rounded-xl font-mono text-xs flex items-center justify-center transition-all ${bgClass} ${
                        isCurrent ? 'ring-2 ring-amber-400 scale-105' : 'hover:opacity-80'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Summary Pill */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-gray-300">
                <span>Attempted</span>
                <span className="font-mono font-bold text-amber-400">{stats.totalAnsweredCount} / {selectedTest.questions.length}</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(stats.totalAnsweredCount / selectedTest.questions.length) * 100}%` }}
                />
              </div>
            </div>
          </aside>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. SUBMIT TEST CONFIRMATION MODAL
         ───────────────────────────────────────────────────────────── */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="max-w-md w-full rounded-3xl bg-[#0E131E] border border-amber-500/30 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-400 mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white">Submit Assessment?</h3>
              <p className="text-xs text-gray-400 mt-1">Please review your attempt statistics before final submission.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-black/40 border border-white/5 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white/5">
                <div className="text-gray-400">Answered</div>
                <div className="text-lg font-bold text-emerald-400">{stats.totalAnsweredCount}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5">
                <div className="text-gray-400">Unanswered</div>
                <div className="text-lg font-bold text-red-400">{stats.remainingCount}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5">
                <div className="text-gray-400">Review Marked</div>
                <div className="text-lg font-bold text-indigo-400">{stats.marked + stats.answeredAndMarked}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5">
                <div className="text-gray-400">Time Left</div>
                <div className="text-lg font-bold text-amber-400">{formatTime(timeRemainingSeconds)}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white border border-white/10 transition-colors"
              >
                Continue Test
              </button>
              <button
                onClick={handleManualSubmit}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. VIEW 3: COMPREHENSIVE RESULT & PERFORMANCE REPORT
         ───────────────────────────────────────────────────────────── */}
      {viewMode === 'result' && currentResult && (
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          {/* Top Result Banner */}
          <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#121824] via-[#0E131E] to-[#0A0D14] border border-amber-500/30 text-center relative overflow-hidden shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-extrabold uppercase tracking-wider mb-4">
              <Award className="w-4 h-4" />
              <span>Assessment Completed</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {currentResult.testTitle}
            </h1>

            {/* Big Score Readout */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
              <div className="p-6 rounded-3xl bg-black/50 border border-white/10 min-w-[200px]">
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Score</div>
                <div className="text-4xl sm:text-5xl font-black text-amber-400 font-mono mt-1">
                  {currentResult.score} <span className="text-xl text-gray-500 font-normal">/ {currentResult.totalMarks}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1 font-semibold">{currentResult.percentage}% Accuracy</div>
              </div>

              <div className="p-6 rounded-3xl bg-black/50 border border-white/10 min-w-[200px]">
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Placement Benchmark</div>
                <div className="text-4xl sm:text-5xl font-black text-teal-400 font-mono mt-1">
                  {currentResult.percentile}th
                </div>
                <div className="text-xs text-teal-300 mt-1 font-semibold">Percentile Rank</div>
              </div>

              <div className="p-6 rounded-3xl bg-black/50 border border-white/10 min-w-[200px]">
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Status</div>
                <div className={`text-2xl font-black mt-2 uppercase tracking-wider ${
                  currentResult.passed ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {currentResult.passed ? 'QUALIFIED ✓' : 'NEEDS PRACTICE'}
                </div>
                <div className="text-xs text-gray-400 mt-1">Cut-off: {selectedTest.passPercentage}%</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleStartTest(selectedTest)}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Retake Assessment</span>
              </button>
              <button
                onClick={() => setViewMode('hub')}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/10 transition-colors"
              >
                Browse All Tests
              </button>
            </div>
          </div>

          {/* Section Breakdown Radar / Progress */}
          <div className="rounded-3xl bg-[#0E131E] border border-white/10 p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-black text-white">Section-wise Performance Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(currentResult.sectionScores).map(([sectionName, data]) => {
                const secPercent = Math.round((data.correct / data.total) * 100);
                return (
                  <div key={sectionName} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-white">{sectionName}</span>
                      <span className="text-amber-400 font-mono">{data.correct} / {data.total} Correct ({secPercent}%)</span>
                    </div>
                    <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          secPercent >= 75 ? 'bg-emerald-500' : secPercent >= 50 ? 'bg-amber-400' : 'bg-red-500'
                        }`}
                        style={{ width: `${secPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Question Review & Step-by-Step Explanations */}
          <div className="rounded-3xl bg-[#0E131E] border border-white/10 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white">Complete Answer Key & In-Depth Solutions</h3>
                <p className="text-xs text-gray-400 mt-0.5">Review each question, correct options, and detailed technical derivations</p>
              </div>
            </div>

            <div className="space-y-6">
              {selectedTest.questions.map((q, idx) => {
                const userChoice = userResponses[q.id]?.selectedOption;
                const isCorrect = userChoice === q.correctOptionIndex;
                const isSkipped = userChoice === null || userChoice === undefined;

                return (
                  <div
                    key={q.id}
                    className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-4 ${
                      isCorrect
                        ? 'bg-emerald-500/[0.03] border-emerald-500/20'
                        : isSkipped
                        ? 'bg-white/[0.02] border-white/10'
                        : 'bg-red-500/[0.03] border-red-500/20'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-gray-400">Q{idx + 1}.</span>
                        <span className="px-2 py-0.5 rounded-md bg-white/5 text-gray-300 text-[10px] font-semibold">
                          {q.section}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Correct (+{q.marks})
                          </span>
                        ) : isSkipped ? (
                          <span className="text-gray-400 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" /> Skipped (0)
                          </span>
                        ) : (
                          <span className="text-red-400 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Incorrect (-{selectedTest.negativeMarking ? q.negativeMarks : 0})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Question text */}
                    <p className="text-sm font-semibold text-white leading-relaxed">{q.question}</p>

                    {q.codeSnippet && (
                      <div className="p-3 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-amber-300 overflow-x-auto">
                        <pre>{q.codeSnippet}</pre>
                      </div>
                    )}

                    {/* Options breakdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, optIdx) => {
                        const isCorrectOption = optIdx === q.correctOptionIndex;
                        const isUserChoice = optIdx === userChoice;

                        let optClass = 'bg-white/5 border-white/5 text-gray-400';
                        if (isCorrectOption) {
                          optClass = 'bg-emerald-500/15 border-emerald-500 text-emerald-200 font-bold';
                        } else if (isUserChoice && !isCorrect) {
                          optClass = 'bg-red-500/15 border-red-500 text-red-200 font-bold';
                        }

                        return (
                          <div key={optIdx} className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${optClass}`}>
                            <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                            {isCorrectOption && <span className="text-[10px] uppercase font-black text-emerald-400">Correct Answer</span>}
                            {isUserChoice && !isCorrect && <span className="text-[10px] uppercase font-black text-red-400">Your Choice</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Accordion Box */}
                    <div className="p-3.5 rounded-xl bg-black/60 border border-amber-400/20 text-xs text-gray-300 space-y-1">
                      <div className="font-bold text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Step-by-step Explanation:</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed pl-5">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-white/10 bg-[#07090E] text-center text-xs text-gray-500">
        Placement & Career MCQ Assessment Engine • Built for Campus Recruitment Preparation
      </footer>
    </div>
  );
}
