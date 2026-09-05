import { useState, useRef, useEffect } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  Target,
  Briefcase,
  GraduationCap,
  Code2,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

/* ──────────────────────────────────────────────────────────
   Quiz Questions — 6 career-identification questions
   ────────────────────────────────────────────────────────── */
const QUIZ_QUESTIONS = [
  {
    id: 'branch',
    icon: <GraduationCap className="h-5 w-5" />,
    label: 'Your Branch',
    question: 'What is your engineering branch or field of study?',
    options: [
      { value: 'cse', label: 'Computer Science & Engineering', emoji: '💻' },
      { value: 'ece', label: 'Electronics & Communication', emoji: '📡' },
      { value: 'mech', label: 'Mechanical Engineering', emoji: '⚙️' },
      { value: 'civil', label: 'Civil Engineering', emoji: '🏗️' },
      { value: 'eee', label: 'Electrical & Electronics', emoji: '⚡' },
      { value: 'other', label: 'Other / MCA / BCA', emoji: '🎓' },
    ],
  },
  {
    id: 'target_role',
    icon: <Target className="h-5 w-5" />,
    label: 'Target Role',
    question: 'Which role are you primarily targeting for placement?',
    options: [
      { value: 'swe', label: 'Software Engineer (SDE)', emoji: '👨‍💻' },
      { value: 'frontend', label: 'Frontend Developer', emoji: '🖥️' },
      { value: 'backend', label: 'Backend Developer', emoji: '🗄️' },
      { value: 'fullstack', label: 'Full Stack Developer', emoji: '🔄' },
      { value: 'data', label: 'Data Scientist / Analyst', emoji: '📊' },
      { value: 'devops', label: 'DevOps / Cloud Engineer', emoji: '☁️' },
    ],
  },
  {
    id: 'experience',
    icon: <Briefcase className="h-5 w-5" />,
    label: 'Experience',
    question: 'What is your current level of practical experience?',
    options: [
      { value: 'none', label: 'No internship yet', emoji: '🌱' },
      { value: 'ongoing', label: 'Currently in an internship', emoji: '🔄' },
      { value: 'one', label: 'Completed 1 internship', emoji: '✅' },
      { value: 'two_plus', label: '2+ internships done', emoji: '🏆' },
      { value: 'project', label: 'Only personal projects', emoji: '🛠️' },
      { value: 'fresher', label: 'Fresher (no experience)', emoji: '📚' },
    ],
  },
  {
    id: 'coding_level',
    icon: <Code2 className="h-5 w-5" />,
    label: 'DSA Level',
    question: 'How comfortable are you with Data Structures & Algorithms?',
    options: [
      { value: 'beginner', label: 'Beginner — just started', emoji: '🌱' },
      { value: 'basics', label: 'Know basics (arrays, strings)', emoji: '📝' },
      { value: 'intermediate', label: 'Intermediate (trees, graphs)', emoji: '🌳' },
      { value: 'advanced', label: 'Advanced (DP, Segment Trees)', emoji: '⚡' },
      { value: 'competitive', label: 'Competitive Programmer', emoji: '🏅' },
      { value: 'not_focused', label: 'Not focusing on DSA', emoji: '🚀' },
    ],
  },
  {
    id: 'target_company',
    icon: <TrendingUp className="h-5 w-5" />,
    label: 'Target Company',
    question: 'What type of company are you aiming for placement?',
    options: [
      { value: 'tier1_product', label: 'Tier-1 Product (Google, Microsoft)', emoji: '🏆' },
      { value: 'top_startup', label: 'Top Startups (Swiggy, Zepto)', emoji: '🦄' },
      { value: 'service_mnc', label: 'Service MNCs (TCS, Infosys)', emoji: '🏢' },
      { value: 'mid_startup', label: 'Mid-stage Startups', emoji: '🚀' },
      { value: 'psu', label: 'PSU / Government', emoji: '🏛️' },
      { value: 'abroad', label: 'Abroad / Research Role', emoji: '🌍' },
    ],
  },
  {
    id: 'placement_timeline',
    icon: <Zap className="h-5 w-5" />,
    label: 'Timeline',
    question: 'When is your college placement / job search happening?',
    options: [
      { value: 'now', label: 'Placement season is NOW', emoji: '🔥' },
      { value: 'months_3', label: 'Within 3 months', emoji: '⏳' },
      { value: 'months_6', label: 'In 6 months', emoji: '📅' },
      { value: 'year_1', label: 'In about 1 year', emoji: '🗓️' },
      { value: 'year_2', label: '2+ years away', emoji: '🌱' },
      { value: 'exploring', label: 'Just exploring options', emoji: '🔍' },
    ],
  },
];

interface CareerQuizSectionProps {
  onComplete: (answers: Record<string, string>) => void;
  isCompleted: boolean;
}

export function CareerQuizSection({ onComplete, isCompleted }: CareerQuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [showComplete, setShowComplete] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const total = QUIZ_QUESTIONS.length;
  const q = QUIZ_QUESTIONS[currentQuestion];
  const progress = (currentQuestion / total) * 100;
  const isLast = currentQuestion === total - 1;

  // Restore selected option when navigating back/forward
  useEffect(() => {
    const saved = answers[QUIZ_QUESTIONS[currentQuestion].id] ?? null;
    setSelectedOption(saved);
  }, [currentQuestion, answers]);

  const handleSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (!selectedOption) return;
    const updated = { ...answers, [q.id]: selectedOption };
    setAnswers(updated);

    if (isLast) {
      setShowComplete(true);
      setTimeout(() => {
        onComplete(updated);
      }, 1400);
      return;
    }

    setDirection('forward');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuestion((c) => c + 1);
      setIsAnimating(false);
    }, 220);
  };

  const handleBack = () => {
    if (currentQuestion === 0) return;
    setDirection('back');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuestion((c) => c - 1);
      setIsAnimating(false);
    }, 220);
  };

  if (isCompleted) return null;

  if (showComplete) {
    return (
      <div className="w-full rounded-2xl border border-amber-500/40 bg-gradient-to-br from-[#0D1117] via-[#11151D] to-[#0A0F18] p-10 flex flex-col items-center justify-center gap-5 min-h-[260px] relative overflow-hidden shadow-[0_0_60px_rgba(184,132,42,0.18)]">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/15 border border-amber-500/40 animate-pulse">
          <CheckCircle2 className="h-8 w-8 text-amber-400" />
        </div>
        <div className="text-center space-y-1.5">
          <h3 className="text-xl font-extrabold text-white tracking-tight">Profile Identified!</h3>
          <p className="text-sm text-gray-400">Personalizing your career dashboard…</p>
        </div>
        <div className="flex items-center gap-1.5">
          {[0, 0.15, 0.3].map((delay, i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="w-full rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#0D1117] via-[#11151D] to-[#0A0F18] relative overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(184,132,42,0.12)]"
    >
      {/* Ambient decorations */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-amber-500/6 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

      {/* ── Header strip ── */}
      <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-white/5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30">
              <Sparkles className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 leading-none">
                Career Profile Quiz
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">Helps us personalise your dashboard</p>
            </div>
          </div>
          <span className="text-xs font-bold text-white tabular-nums">
            {currentQuestion + 1}
            <span className="text-gray-600 font-normal"> / {total}</span>
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(184,132,42,0.5)]"
            style={{ width: `${Math.max(4, progress)}%` }}
          />
        </div>

        {/* Step pills */}
        <div className="flex items-center gap-1.5 mt-3 flex-wrap">
          {QUIZ_QUESTIONS.map((qItem, idx) => (
            <div
              key={qItem.id}
              className={cn(
                'flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border transition-all duration-300',
                idx < currentQuestion
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : idx === currentQuestion
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    : 'bg-white/[0.03] border-white/[0.08] text-gray-600'
              )}
            >
              {idx < currentQuestion ? (
                <CheckCircle2 className="h-3 w-3 text-amber-400" />
              ) : (
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    idx === currentQuestion ? 'bg-amber-400' : 'bg-gray-600'
                  )}
                />
              )}
              {qItem.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Question body ── */}
      <div className="px-6 sm:px-8 pt-6 pb-4">
        <div
          className="transition-all duration-200"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating
              ? direction === 'forward'
                ? 'translateX(16px)'
                : 'translateX(-16px)'
              : 'translateX(0)',
          }}
        >
          {/* Question header */}
          <div className="flex items-start gap-3 mb-5">
            <span className="mt-0.5 p-2 rounded-xl bg-[#1A1F2E] border border-white/8 text-amber-400 flex-shrink-0">
              {q.icon}
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug tracking-tight">
                {q.question}
              </h3>
              <p className="text-[11px] text-gray-500 mt-1">Select one that best describes you</p>
            </div>
          </div>

          {/* Options grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {q.options.map((opt) => {
              const isSelected = selectedOption === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={cn(
                    'group relative flex flex-col items-start gap-2 p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer',
                    'hover:-translate-y-0.5',
                    isSelected
                      ? 'bg-amber-500/12 border-amber-500/55 shadow-[0_0_18px_rgba(184,132,42,0.2)] ring-1 ring-amber-500/25'
                      : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/15'
                  )}
                >
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                    </div>
                  )}
                  <span className="text-xl leading-none">{opt.emoji}</span>
                  <span
                    className={cn(
                      'text-xs font-semibold leading-snug pr-4 transition-colors',
                      isSelected ? 'text-amber-300' : 'text-gray-300 group-hover:text-white'
                    )}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Footer navigation ── */}
      <div className="px-6 sm:px-8 pb-6 pt-2 flex items-center justify-between gap-4">
        <button
          onClick={handleBack}
          disabled={currentQuestion === 0}
          className={cn(
            'flex items-center gap-1.5 text-xs font-bold transition-all duration-200 px-3 py-2 rounded-lg border select-none',
            currentQuestion === 0
              ? 'text-gray-700 border-transparent cursor-not-allowed'
              : 'text-gray-400 border-white/[0.08] hover:text-white hover:border-white/15 hover:bg-white/5 cursor-pointer'
          )}
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>

        <div className="flex items-center gap-3">
          {!selectedOption && (
            <span className="text-[11px] text-gray-600 hidden sm:block">Select an option to continue</span>
          )}
          <Button
            variant="glow"
            size="sm"
            onClick={handleNext}
            disabled={!selectedOption}
            className={cn(
              'flex items-center gap-1.5 transition-all duration-300',
              !selectedOption ? 'opacity-40 cursor-not-allowed' : ''
            )}
          >
            {isLast ? (
              <>
                <Sparkles className="h-3.5 w-3.5" /> Complete Profile
              </>
            ) : (
              <>
                Next <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Bottom gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
    </div>
  );
}
