import { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { PageHeader } from '../../components/shared/PageHeader';
import {
  Map,
  CheckCircle2,
  ArrowRight,
  Tune,
  SmartToy,
  DoneAll,
  Bolt,
  Close,
} from '../../components/icons/StitchIcons';
import {
  Sparkles,
  Trophy,
  Lock,
  BookOpen,
  ExternalLink,
  Code2,
  CheckSquare,
  Square,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  CAREER_TRACKS,
  type CareerTrack,
  type Milestone,
} from '../../data/roadmapTracks';

export default function CareerRoadmapPage() {
  const [tracks, setTracks] = useState<CareerTrack[]>(CAREER_TRACKS);
  const [selectedTrackId, setSelectedTrackId] = useState<string>('frontend');
  const [filter, setFilter] = useState<'all' | 'in-progress'>('all');
  
  // Modals & Drawers
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [selectedMilestoneForDrawer, setSelectedMilestoneForDrawer] = useState<Milestone | null>(null);
  const [drawerTab, setDrawerTab] = useState<'checklist' | 'resources' | 'projects'>('checklist');
  
  // Quiz Modal State
  const [activeQuizMilestone, setActiveQuizMilestone] = useState<Milestone | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [questionId: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Customize Role Preferences
  const [targetRole, setTargetRole] = useState('Senior Frontend Engineer');
  const selectedStack = 'React / Next.js';
  const [weeklyHours, setWeeklyHours] = useState('10 hrs/week');

  // Notifications
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setActiveNotification(msg);
    setTimeout(() => setActiveNotification(null), 3500);
  };

  // Get active track
  const currentTrack = useMemo(() => {
    return tracks.find((t) => t.id === selectedTrackId) || tracks[0];
  }, [tracks, selectedTrackId]);

  // Calculate live roadmap completion percentage across all subtasks in current track
  const { totalSubtasks, completedSubtasks, overallProgressPercent } = useMemo(() => {
    let total = 0;
    let completed = 0;
    currentTrack.milestones.forEach((m) => {
      m.subtasks.forEach((st) => {
        total++;
        if (st.completed) completed++;
      });
    });
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return {
      totalSubtasks: total,
      completedSubtasks: completed,
      overallProgressPercent: percent,
    };
  }, [currentTrack]);

  // Toggle Subtask Checkbox
  const handleToggleSubtask = (milestoneId: string, subtaskId: string) => {
    setTracks((prevTracks) =>
      prevTracks.map((t) => {
        if (t.id !== selectedTrackId) return t;
        return {
          ...t,
          milestones: t.milestones.map((m) => {
            if (m.id !== milestoneId) return m;
            const updatedSubtasks = m.subtasks.map((st) =>
              st.id === subtaskId ? { ...st, completed: !st.completed } : st
            );
            const allDone = updatedSubtasks.every((st) => st.completed);
            return {
              ...m,
              subtasks: updatedSubtasks,
              status: allDone ? 'completed' : m.status === 'locked' ? 'locked' : 'in-progress',
            };
          }),
        };
      })
    );

    // Update current selected milestone in drawer if open
    setSelectedMilestoneForDrawer((prev) => {
      if (!prev || prev.id !== milestoneId) return prev;
      const updatedSubtasks = prev.subtasks.map((st) =>
        st.id === subtaskId ? { ...st, completed: !st.completed } : st
      );
      return { ...prev, subtasks: updatedSubtasks };
    });

    showToast('🎯 Progress saved! Roadmap recalibrated.');
  };

  // Save Custom Role Preferences
  const handleSaveRole = () => {
    setIsCustomizeModalOpen(false);
    showToast(`Target role saved as "${targetRole}" with ${selectedStack}! ✨`);
  };

  // Open Quiz Modal for a locked or verification milestone
  const handleStartQuiz = (m: Milestone) => {
    setActiveQuizMilestone(m);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  // Submit Quiz & Unlock Milestone
  const handleSubmitQuiz = () => {
    if (!activeQuizMilestone) return;
    const questions = activeQuizMilestone.unlockQuiz;
    let correct = 0;
    questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });

    setQuizScore(correct);
    setQuizSubmitted(true);

    if (correct >= Math.ceil(questions.length / 2)) {
      // Passed Quiz -> Unlock Milestone
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFE600', '#00F5D4', '#6A5F00'],
        });
      } catch (e) {
        console.log(e);
      }

      setTracks((prevTracks) =>
        prevTracks.map((t) => {
          if (t.id !== selectedTrackId) return t;
          return {
            ...t,
            milestones: t.milestones.map((m) =>
              m.id === activeQuizMilestone.id
                ? { ...m, status: 'in-progress', score: 100 }
                : m
            ),
          };
        })
      );
      showToast(`🎉 Congratulations! Passed quiz with ${correct}/${questions.length}. Milestone unlocked! 🔓`);
    } else {
      showToast(`Review answers and try again to unlock this milestone.`);
    }
  };

  const filteredMilestones = currentTrack.milestones.filter((m) => {
    if (filter === 'all') return true;
    return m.status === 'in-progress';
  });

  return (
    <div className="space-y-8 pb-16 w-full font-sans text-[#1E1C10]">
      {/* Toast Notification */}
      {activeNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-[#FFE600] px-5 py-3.5 rounded-2xl shadow-2xl border border-[#FFE600]/40 flex items-center gap-3 animate-bounce">
          <SmartToy className="h-5 w-5 text-[#FFE600] shrink-0" />
          <span className="text-xs font-bold text-white">{activeNotification}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Interactive Career Roadmap"
        description="Your gamified, milestone-driven pathway engineered to guide you from foundational knowledge to senior-level mastery."
        icon={<Map className="h-6 w-6 text-[#6A5F00]" />}
        badge={<Badge variant="cyprus">{currentTrack.badge}</Badge>}
        actions={
          <Button
            variant="primary"
            onClick={() => setIsCustomizeModalOpen(true)}
            className="flex items-center gap-2 !bg-[#FFE600] !text-[#1A1A1A] !border-none !rounded-full font-bold shadow-md hover:scale-105 cursor-pointer"
          >
            <Tune className="h-4 w-4" />
            Customize Target Role
          </Button>
        }
      />

      {/* ─── 1. CAREER TRACK SWITCHER TABS ─── */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 max-w-full">
        {tracks.map((t) => {
          const isSelected = t.id === selectedTrackId;
          return (
            <button
              key={t.id}
              onClick={() => setSelectedTrackId(t.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 cursor-pointer flex items-center gap-2 border ${
                isSelected
                  ? 'bg-[#1A1A1A] text-[#FFE600] border-[#FFE600]/50 shadow-md ring-2 ring-[#FFE600]/30'
                  : 'bg-[#F4EEDA] hover:bg-[#EEE8D4] text-[#1E1C10] border-[#CDC7AA]/40'
              }`}
            >
              <Code2 className="h-4 w-4" />
              <span>{t.title}</span>
            </button>
          );
        })}
      </div>

      {/* ─── 2. HERO WELCOME BANNER ─── */}
      <section className="relative overflow-hidden bg-[#FFE600] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border-2 border-[#E7D2A0]">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/30 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-3 z-10 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="bg-[#726600] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Level Up Daily
            </span>
            <span className="text-[#726600]/80 text-xs font-semibold">
              {currentTrack.title} ({currentTrack.estimatedWeeks} Weeks)
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#726600] tracking-tight font-heading leading-tight">
            Your Roadmap to {currentTrack.badge}! 🚀
          </h1>
          <p className="text-xs sm:text-sm text-[#726600]/90 leading-relaxed font-medium">
            {currentTrack.description}
          </p>

          {/* Primary Skills Tags */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            {currentTrack.primarySkills.map((sk) => (
              <span
                key={sk}
                className="bg-white/80 text-[#726600] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs border border-[#E7D2A0]"
              >
                {sk}
              </span>
            ))}
          </div>

          {/* Live Progress Bar */}
          <div className="mt-2 flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-bold text-[#726600]">
              <span>Overall Roadmap Completion</span>
              <span className="bg-white px-3 py-0.5 rounded-full text-[#6A5F00] shadow-sm font-bold border border-[#CDC7AA]">
                {overallProgressPercent}% ({completedSubtasks}/{totalSubtasks} Tasks)
              </span>
            </div>
            <div className="w-full bg-white/60 h-5 rounded-full p-1 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-[#26FEDC] via-[#00F5D4] to-[#9B5DE5] h-full rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(0,245,212,0.8)]"
                style={{ width: `${overallProgressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Mascot Card */}
        <div className="relative z-10 flex flex-col items-center bg-white p-6 rounded-3xl shadow-lg border border-[#CDC7AA]/40 transform rotate-1 hover:rotate-0 transition-transform duration-300 w-full sm:w-64">
          <div className="w-20 h-20 rounded-full bg-[#FAF3DF] border border-[#CDC7AA]/50 flex items-center justify-center relative mb-2 shadow-inner">
            <SmartToy className="h-10 w-10 text-[#6A5F00] animate-bounce" />
          </div>
          <span className="text-base font-extrabold text-[#1E1C10] font-heading">Pal-E Mentor:</span>
          <span className="text-xs text-[#4B4731] text-center mt-0.5">
            {overallProgressPercent > 50
              ? '"Awesome pace! You are over halfway to job-readiness!"'
              : '"Complete the checklists and ace the quizzes to unlock next stages!"'}
          </span>
          <button
            onClick={() => setIsCustomizeModalOpen(true)}
            className="mt-3.5 bg-[#FFE600] text-[#1A1A1A] font-bold text-xs px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Tune className="h-3.5 w-3.5" />
            Customize Target Role
          </button>
        </div>
      </section>

      {/* ─── 3. MILESTONE QUESTS CARDS GRID ─── */}
      <section className="space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E1C10] font-heading">
              Milestone Quests ({currentTrack.milestones.length} Stages)
            </h2>
            <p className="text-xs text-[#7C775F] mt-0.5">
              Click on any milestone to open its topic checklist, free resources, and resume projects.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#6A5F00] text-white shadow-md'
                  : 'bg-[#F4EEDA] text-[#1E1C10] hover:bg-[#EEE8D4]'
              }`}
            >
              All Quests ({currentTrack.milestones.length})
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === 'in-progress'
                  ? 'bg-[#6A5F00] text-white shadow-md'
                  : 'bg-[#F4EEDA] text-[#1E1C10] hover:bg-[#EEE8D4]'
              }`}
            >
              In Progress ({currentTrack.milestones.filter((m) => m.status === 'in-progress').length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMilestones.map((m) => {
            const completedCount = m.subtasks.filter((s) => s.completed).length;
            const stagePercent =
              m.subtasks.length > 0 ? Math.round((completedCount / m.subtasks.length) * 100) : 0;

            const isCompleted = m.status === 'completed';
            const isInProgress = m.status === 'in-progress';

            return (
              <div
                key={m.id}
                className={`rounded-3xl p-6 flex flex-col justify-between shadow-sm transition-all relative overflow-hidden group border ${
                  isInProgress
                    ? 'bg-white ring-4 ring-[#FFE600] border-[#E7D2A0] shadow-xl'
                    : isCompleted
                    ? 'bg-[#FAF3DF] border-[#00F5D4]/40 hover:shadow-md'
                    : 'bg-[#FAF3DF]/60 border-[#CDC7AA]/40 opacity-90 hover:opacity-100'
                }`}
              >
                {/* Status Badge Top Right */}
                <div
                  className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-wider ${
                    isCompleted
                      ? 'bg-[#00F5D4]/20 text-[#006B5B]'
                      : isInProgress
                      ? 'bg-[#FFE600] text-[#726600]'
                      : 'bg-[#EEE8D4] text-[#7C775F]'
                  }`}
                >
                  {isCompleted ? 'Completed' : isInProgress ? 'Active Quest' : 'Locked'}
                </div>

                {/* Milestone Info */}
                <div className="flex flex-col gap-3 mt-2">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-[#1A1A1A] shadow-sm ${
                      isCompleted
                        ? 'bg-[#00F5D4] text-[#006B5B]'
                        : isInProgress
                        ? 'bg-[#FFE600] text-[#726600] shadow-md'
                        : 'bg-[#EEE8D4] text-[#7C775F]'
                    }`}
                  >
                    {isCompleted ? (
                      <DoneAll className="h-6 w-6" />
                    ) : isInProgress ? (
                      <Bolt className="h-6 w-6 fill-current" />
                    ) : (
                      <Lock className="h-5 w-5" />
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#7C775F] uppercase tracking-wider block">
                      Stage {m.stageNumber}
                    </span>
                    <h3 className="text-lg font-bold text-[#1E1C10] font-heading mt-0.5">
                      {m.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#4B4731] leading-relaxed line-clamp-2">
                    {m.summary}
                  </p>

                  {/* Checklist Summary */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] font-semibold text-[#7C775F]">
                      <span>Checklist Progress</span>
                      <span>
                        {completedCount}/{m.subtasks.length} ({stagePercent}%)
                      </span>
                    </div>
                    <div className="w-full bg-[#FAF3DF] h-2 rounded-full overflow-hidden border border-[#CDC7AA]/20">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCompleted
                            ? 'bg-[#00F5D4]'
                            : isInProgress
                            ? 'bg-[#6A5F00]'
                            : 'bg-gray-400'
                        }`}
                        style={{ width: `${stagePercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-6 flex items-center justify-between pt-3.5 border-t border-[#CDC7AA]/30 gap-2">
                  {isCompleted ? (
                    <>
                      <span className="text-xs text-[#006B5B] font-extrabold flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-[#006B5B]" /> 100% Mastered
                      </span>
                      <button
                        onClick={() => {
                          setSelectedMilestoneForDrawer(m);
                          setDrawerTab('checklist');
                        }}
                        className="text-xs text-[#1E1C10] font-bold underline hover:text-[#6A5F00] transition-colors cursor-pointer"
                      >
                        Review Syllabus
                      </button>
                    </>
                  ) : isInProgress ? (
                    <>
                      <button
                        onClick={() => {
                          setSelectedMilestoneForDrawer(m);
                          setDrawerTab('checklist');
                        }}
                        className="text-xs font-bold text-[#6A5F00] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <BookOpen className="h-3.5 w-3.5" /> Syllabus
                      </button>
                      <button
                        onClick={() => {
                          setSelectedMilestoneForDrawer(m);
                          setDrawerTab('checklist');
                        }}
                        className="bg-[#6A5F00] text-white text-xs font-bold px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        Continue <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setSelectedMilestoneForDrawer(m);
                          setDrawerTab('resources');
                        }}
                        className="text-xs text-[#7C775F] font-bold hover:underline cursor-pointer"
                      >
                        Preview Topics
                      </button>
                      <button
                        onClick={() => handleStartQuiz(m)}
                        className="bg-[#FFE600] text-[#1A1A1A] text-xs font-bold px-3.5 py-1.5 rounded-full hover:scale-105 transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                      >
                        <Trophy className="h-3.5 w-3.5" /> Unlock Quiz
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── 4. INTERACTIVE SYLLABUS & RESOURCES DRAWER / MODAL (Feature 2 & 3) ─── */}
      {selectedMilestoneForDrawer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="bg-[#FFF9E9] w-full max-w-xl h-full shadow-2xl flex flex-col p-6 sm:p-8 overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-[#CDC7AA]">
            {/* Drawer Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#CDC7AA]/40">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C775F] bg-[#FAF3DF] px-2.5 py-0.5 rounded-full border border-[#CDC7AA]/30">
                    Stage {selectedMilestoneForDrawer.stageNumber}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      selectedMilestoneForDrawer.status === 'completed'
                        ? 'bg-[#00F5D4]/20 text-[#006B5B]'
                        : selectedMilestoneForDrawer.status === 'in-progress'
                        ? 'bg-[#FFE600] text-[#726600]'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {selectedMilestoneForDrawer.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#1E1C10] font-heading">
                  {selectedMilestoneForDrawer.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedMilestoneForDrawer(null)}
                className="w-9 h-9 rounded-full bg-[#F4EEDA] border border-[#CDC7AA]/50 flex items-center justify-center hover:bg-[#EEE8D4] transition-colors cursor-pointer shrink-0"
              >
                <Close className="h-4 w-4 text-[#4B4731]" />
              </button>
            </div>

            {/* Drawer Tab Switcher */}
            <div className="flex items-center gap-2 pt-4 pb-3 border-b border-[#CDC7AA]/30">
              <button
                onClick={() => setDrawerTab('checklist')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  drawerTab === 'checklist'
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'text-[#4B4731] hover:bg-[#FAF3DF]'
                }`}
              >
                <CheckSquare className="h-3.5 w-3.5" />
                Checklist ({selectedMilestoneForDrawer.subtasks.filter((s) => s.completed).length}/
                {selectedMilestoneForDrawer.subtasks.length})
              </button>

              <button
                onClick={() => setDrawerTab('resources')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  drawerTab === 'resources'
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'text-[#4B4731] hover:bg-[#FAF3DF]'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5 text-[#006B5B]" />
                Free Resources ({selectedMilestoneForDrawer.resources.length})
              </button>

              <button
                onClick={() => setDrawerTab('projects')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  drawerTab === 'projects'
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'text-[#4B4731] hover:bg-[#FAF3DF]'
                }`}
              >
                <Code2 className="h-3.5 w-3.5 text-[#6A5F00]" />
                Resume Projects ({selectedMilestoneForDrawer.miniProjects.length})
              </button>
            </div>

            {/* Drawer Body Content */}
            <div className="flex-1 py-4 space-y-4 text-xs overflow-y-auto pr-1">
              {/* 1. CHECKLIST TAB */}
              {drawerTab === 'checklist' && (
                <div className="space-y-3">
                  <div className="bg-[#FFE600]/20 p-3 rounded-2xl border border-[#6A5F00]/30 text-xs text-[#1E1C10] flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#6A5F00] shrink-0" />
                    <span>Tick off subtopics as you learn them to update your roadmap progress!</span>
                  </div>

                  <div className="space-y-2.5">
                    {selectedMilestoneForDrawer.subtasks.map((st) => (
                      <div
                        key={st.id}
                        onClick={() =>
                          handleToggleSubtask(selectedMilestoneForDrawer.id, st.id)
                        }
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                          st.completed
                            ? 'bg-[#00F5D4]/15 border-[#006B5B]/30 text-[#006B5B]'
                            : 'bg-white border-[#CDC7AA]/40 hover:bg-[#FAF3DF] text-[#1E1C10]'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button className="mt-0.5 text-lg">
                            {st.completed ? (
                              <CheckSquare className="h-4 w-4 text-[#006B5B]" />
                            ) : (
                              <Square className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                          <div>
                            <span
                              className={`font-bold block text-xs ${
                                st.completed ? 'line-through text-[#7C775F]' : 'text-[#1E1C10]'
                              }`}
                            >
                              {st.title}
                            </span>
                            <span className="text-[10px] text-[#7C775F] mt-0.5 block">
                              Estimated Study: ~{st.estimatedHours} Hours
                            </span>
                          </div>
                        </div>

                        {st.completed && (
                          <span className="text-[10px] font-bold bg-[#00F5D4] text-[#00201A] px-2 py-0.5 rounded-full shrink-0">
                            +25 XP
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. FREE RESOURCES TAB */}
              {drawerTab === 'resources' && (
                <div className="space-y-3">
                  <p className="text-xs text-[#4B4731]">
                    Curated, 100% free learning materials verified for this milestone:
                  </p>

                  <div className="space-y-2.5">
                    {selectedMilestoneForDrawer.resources.map((res, i) => (
                      <a
                        key={i}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-white p-3.5 rounded-2xl border border-[#CDC7AA]/40 flex items-center justify-between hover:shadow-md hover:border-[#6A5F00] transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#FAF3DF] flex items-center justify-center text-[#6A5F00] font-bold text-xs border border-[#CDC7AA]/30">
                            {res.type === 'Docs' ? '📖' : res.type === 'Video' ? '🎬' : '📝'}
                          </div>
                          <div>
                            <span className="font-bold text-xs text-[#1E1C10] group-hover:text-[#6A5F00] block">
                              {res.title}
                            </span>
                            <span className="text-[10px] text-[#7C775F]">
                              {res.type} • {res.free ? 'Free Tier' : 'Paid'}
                            </span>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-[#6A5F00]" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. RESUME MINI PROJECTS TAB */}
              {drawerTab === 'projects' && (
                <div className="space-y-3">
                  <p className="text-xs text-[#4B4731]">
                    Recommended portfolio projects to build and showcase in your placement resume:
                  </p>

                  <div className="space-y-3">
                    {selectedMilestoneForDrawer.miniProjects.map((proj, i) => (
                      <div
                        key={i}
                        className="bg-white p-4 rounded-2xl border border-[#CDC7AA]/40 space-y-2 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-heading font-extrabold text-sm text-[#1E1C10]">
                            {proj.title}
                          </h4>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              proj.difficulty === 'Beginner'
                                ? 'bg-green-100 text-green-800'
                                : proj.difficulty === 'Intermediate'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {proj.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-[#4B4731] leading-relaxed">{proj.desc}</p>
                        <div className="flex items-center gap-1.5 flex-wrap pt-1">
                          {proj.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[9px] font-bold bg-[#FAF3DF] text-[#7C775F] px-2 py-0.5 rounded-md border border-[#CDC7AA]/30"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-[#CDC7AA]/40 flex justify-end">
              <button
                onClick={() => setSelectedMilestoneForDrawer(null)}
                className="px-5 py-2.5 bg-[#1A1A1A] text-white rounded-full font-bold text-xs hover:bg-black transition-all cursor-pointer"
              >
                Close Syllabus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 5. SKILL VERIFICATION & UNLOCK QUIZ MODAL (Feature 5) ─── */}
      {activeQuizMilestone && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFF9E9] border-2 border-[#CDC7AA] rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-[#CDC7AA]/40 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-[#6A5F00]" />
                <h3 className="text-lg font-black text-[#1E1C10] font-heading">
                  Skill Verification Quiz • {activeQuizMilestone.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveQuizMilestone(null)}
                className="w-8 h-8 rounded-full bg-[#F4EEDA] flex items-center justify-center hover:bg-[#EEE8D4] cursor-pointer"
              >
                <Close className="h-4 w-4 text-[#4B4731]" />
              </button>
            </div>

            <p className="text-xs text-[#4B4731]">
              Score at least 50% on this conceptual checkpoint to unlock this milestone and level up!
            </p>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {activeQuizMilestone.unlockQuiz.map((q, idx) => {
                const selectedOpt = quizAnswers[q.id];
                const isCorrect = selectedOpt === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className="p-4 bg-white rounded-2xl border border-[#CDC7AA]/40 space-y-2 text-xs"
                  >
                    <span className="font-bold text-[#1E1C10] block">
                      Q{idx + 1}. {q.question}
                    </span>

                    <div className="space-y-1.5 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selectedOpt === optIdx;
                        let optionStyle = 'bg-[#FAF3DF]/60 border-[#CDC7AA]/30 text-[#1E1C10]';

                        if (quizSubmitted) {
                          if (optIdx === q.correctIndex) {
                            optionStyle = 'bg-green-100 border-green-500 text-green-900 font-bold';
                          } else if (isChosen && !isCorrect) {
                            optionStyle = 'bg-red-100 border-red-500 text-red-900 line-through';
                          }
                        } else if (isChosen) {
                          optionStyle = 'bg-[#FFE600] border-[#6A5F00] text-[#1A1A1A] font-bold shadow-xs';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() =>
                              setQuizAnswers({ ...quizAnswers, [q.id]: optIdx })
                            }
                            className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${optionStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="p-2.5 rounded-xl bg-[#FAF3DF] text-[11px] text-[#4B4731] border border-[#CDC7AA]/30 mt-2">
                        💡 <strong>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Action Footer */}
            <div className="flex justify-between items-center pt-3 border-t border-[#CDC7AA]/40">
              {quizSubmitted ? (
                <div className="text-xs font-bold text-[#006B5B]">
                  Your Score: {quizScore}/{activeQuizMilestone.unlockQuiz.length}
                </div>
              ) : (
                <span className="text-[11px] text-[#7C775F]">
                  Answer all questions before submitting
                </span>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveQuizMilestone(null)}
                  className="px-4 py-2 bg-[#F4EEDA] text-[#1E1C10] font-bold text-xs rounded-full cursor-pointer hover:bg-[#EEE8D4]"
                >
                  Close
                </button>
                {!quizSubmitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={
                      Object.keys(quizAnswers).length <
                      activeQuizMilestone.unlockQuiz.length
                    }
                    className="px-5 py-2 bg-[#6A5F00] text-white font-bold text-xs rounded-full cursor-pointer hover:scale-105 transition-all shadow-md disabled:opacity-50"
                  >
                    Submit Quiz & Unlock
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveQuizMilestone(null)}
                    className="px-5 py-2 bg-[#00F5D4] text-[#00201A] font-extrabold text-xs rounded-full cursor-pointer shadow-md"
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── 6. CUSTOMIZE TARGET ROLE MODAL ─── */}
      {isCustomizeModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFF9E9] border-2 border-[#CDC7AA] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#1E1C10] font-heading">
                Customize Your Target Career Role
              </h3>
              <button
                onClick={() => setIsCustomizeModalOpen(false)}
                className="w-9 h-9 rounded-full bg-[#F4EEDA] border border-[#CDC7AA]/50 flex items-center justify-center hover:bg-[#EEE8D4] transition-colors cursor-pointer"
              >
                <Close className="h-4 w-4 text-[#4B4731]" />
              </button>
            </div>

            <p className="text-xs text-[#4B4731] leading-relaxed">
              Select your dream position to automatically recalibrate roadmap milestones and weekly schedules.
            </p>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#1E1C10]">Target Job Title</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="bg-[#F4EEDA] border-2 border-[#CDC7AA] rounded-full px-4 py-2.5 text-xs text-[#1E1C10] focus:outline-none focus:border-[#6A5F00] transition-all font-semibold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#1E1C10]">Target Career Track</label>
              <div className="flex flex-wrap gap-2">
                {tracks.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTrackId(t.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${
                      selectedTrackId === t.id
                        ? 'bg-[#FFE600] text-[#726600] shadow-sm'
                        : 'bg-[#F4EEDA] hover:bg-[#EEE8D4] text-[#1E1C10]'
                    }`}
                  >
                    {t.title.split(' Track')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#1E1C10]">Weekly Study Commitment</label>
              <div className="flex gap-2">
                {['5 hrs/week', '10 hrs/week', '20 hrs/week'].map((hrs) => (
                  <button
                    key={hrs}
                    type="button"
                    onClick={() => setWeeklyHours(hrs)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${
                      weeklyHours === hrs
                        ? 'bg-[#1A1A1A] text-[#FFE600]'
                        : 'bg-[#F4EEDA] text-[#1E1C10]'
                    }`}
                  >
                    {hrs}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2.5 mt-2 pt-3 border-t border-[#CDC7AA]/30">
              <button
                type="button"
                onClick={() => setIsCustomizeModalOpen(false)}
                className="bg-[#F4EEDA] hover:bg-[#EEE8D4] text-[#1E1C10] text-xs font-bold px-4 py-2 rounded-full transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveRole}
                className="bg-[#6A5F00] text-white text-xs font-bold px-5 py-2 rounded-full hover:scale-105 transition-all shadow-md cursor-pointer"
              >
                Save & Apply Roadmap
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
