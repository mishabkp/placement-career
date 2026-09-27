import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockCareerScore } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { CareerQuizSection } from '../../components/sections/CareerQuizSection';
import {
  Map,
  ArrowRight,
  SmartToy,
  Bolt,
  Timer,
  Description,
  TerminalIcon,
  Route,
  TrendingUp,
} from '../../components/icons/StitchIcons';
import { CAREER_TRACKS } from '../../data/roadmapTracks';

const QUIZ_DONE_KEY = 'career_quiz_completed';

const DEFAULT_BRANCH_TRACKS: Record<string, string> = {
  CSE: 'frontend',
  ECE: 'ece_vlsi',
  MECH: 'mech_cad',
  EEE: 'eee_ev',
  CIVIL: 'civil_structural',
};

const BRANCH_DAILY_CHALLENGE: Record<
  string,
  { difficulty: string; title: string; description: string; xp: number }
> = {
  CSE: {
    difficulty: 'Medium',
    title: 'REST vs. GraphQL Architectures',
    description:
      'Explain the architectural difference between REST and GraphQL. When would over-fetching justify switching from REST to GraphQL in high-frequency mobile apps?',
    xp: 50,
  },
  ECE: {
    difficulty: 'Hard',
    title: 'Metastability and Clock Domain Crossing',
    description:
      'Why do setup/hold time violations cause metastability in flip-flops? How does a 2-FF synchronizer resolve MTBF issues across asynchronous clock domains?',
    xp: 60,
  },
  MECH: {
    difficulty: 'Medium',
    title: 'Von Mises vs. Principal Stress',
    description:
      'Why is Von Mises yield criteria preferred over Maximum Principal Stress when evaluating ductile materials under multi-axial stress states?',
    xp: 50,
  },
  EEE: {
    difficulty: 'Hard',
    title: 'FOC Clarke and Park Transformations',
    description:
      'How do Clarke and Park transforms convert 3-phase AC stator currents into d-q DC components for independent control of motor torque and flux in EVs?',
    xp: 55,
  },
  CIVIL: {
    difficulty: 'Medium',
    title: 'Limit State vs. Working Stress (IS 456)',
    description:
      'Explain the design philosophy differences between Limit State Method and Working Stress Method per IS 456:2000. Why does LSM use partial safety factors?',
    xp: 50,
  },
};

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

export default function DashboardPage() {
  const { user, studentBranch } = useAuth();
  const challenge =
    BRANCH_DAILY_CHALLENGE[studentBranch] || BRANCH_DAILY_CHALLENGE.CSE;

  const [quizDone, setQuizDone] = useState<boolean>(
    () => localStorage.getItem(QUIZ_DONE_KEY) === 'true'
  );

  // Real roadmap data from CAREER_TRACKS
  const trackId = DEFAULT_BRANCH_TRACKS[studentBranch] || 'frontend';
  const currentTrack =
    CAREER_TRACKS.find((t) => t.id === trackId) || CAREER_TRACKS[0];
  const milestones = currentTrack?.milestones || [];
  const completedCount = milestones.filter((m) => m.status === 'completed').length;
  const inProgressMilestone = milestones.find((m) => m.status === 'in-progress');
  const overallPercent =
    milestones.length > 0
      ? Math.round((completedCount / milestones.length) * 100)
      : 0;
  const snapshotMilestones = milestones.slice(0, 4);

  const handleQuizComplete = (_answers: Record<string, string>) => {
    localStorage.setItem(QUIZ_DONE_KEY, 'true');
    setQuizDone(true);
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6 pb-16 w-full font-sans text-[#1E1C10]">
      {!quizDone && (
        <div className="bg-white rounded-2xl p-6 border border-[#CDC7AA]/50 shadow-sm">
          <CareerQuizSection
            onComplete={handleQuizComplete}
            isCompleted={quizDone}
          />
        </div>
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
        className={`space-y-6 transition-all duration-500 ${
          !quizDone ? 'opacity-30 pointer-events-none blur-[1px]' : ''
        }`}
      >
        {/* ── 1. Greeting Row ── */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div>
            <p className="text-xs font-bold text-[#7C775F] uppercase tracking-widest mb-0.5">
              Student Dashboard
            </p>
            <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1A1A1A]">
              {greeting}, {user.name.split(' ')[0]} &#128075;
            </h1>
            <p className="text-sm text-[#7C775F] mt-0.5">
              {user.college} &middot; {user.department}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/career-roadmap"
              className="px-4 py-2 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-xs flex items-center gap-1.5 hover:-translate-y-0.5 hover:shadow-md transition-all active:scale-95"
            >
              <Map className="h-3.5 w-3.5" />
              Roadmap
            </Link>
            <Link
              to="/interview"
              className="px-4 py-2 rounded-full bg-white text-[#1A1A1A] font-bold text-xs flex items-center gap-1.5 border border-[#CDC7AA]/50 hover:bg-[#FAF3DF] hover:-translate-y-0.5 transition-all active:scale-95"
            >
              <SmartToy className="h-3.5 w-3.5" />
              Mock Interview
            </Link>
          </div>
        </motion.div>

        {/* ── 2. Stats Strip ── */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            {
              label: 'Career Score',
              value: mockCareerScore.overall,
              unit: '/100',
              color: '#FFE600',
            },
            {
              label: 'Resume Score',
              value: mockCareerScore.resume,
              unit: '/100',
              color: '#9B5DE5',
            },
            {
              label: 'Coding',
              value: mockCareerScore.coding,
              unit: '%',
              color: '#00B89C',
            },
            {
              label: 'Roadmap',
              value: overallPercent,
              unit: '%',
              color: '#FF6B6B',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-4 border border-[#CDC7AA]/30 flex flex-col gap-1 shadow-sm"
            >
              <span className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wide">
                {stat.label}
              </span>
              <div className="flex items-baseline gap-0.5">
                <span
                  className="font-heading text-2xl font-black"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </span>
                <span className="text-xs text-[#7C775F] font-bold">{stat.unit}</span>
              </div>
              <div className="w-full h-1.5 bg-[#FAF3DF] rounded-full overflow-hidden mt-1">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${stat.value}%`,
                    backgroundColor: stat.color,
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── 3. Quick Launch Modules ── */}
        <motion.div variants={fadeUp}>
          <p className="text-xs font-bold text-[#7C775F] uppercase tracking-widest mb-3">
            AI Modules
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              {
                to: '/resume',
                icon: <Description className="h-4 w-4" />,
                label: 'Resume AI',
                sub: 'ATS audit',
                score: `${mockCareerScore.resume}/100`,
                accent: '#FF6B6B',
              },
              {
                to: '/interview',
                icon: <SmartToy className="h-4 w-4" />,
                label: 'AI Interview',
                sub: 'Voice round',
                score: `${mockCareerScore.interview}/100`,
                accent: '#9B5DE5',
              },
              {
                to: '/skill-gap',
                icon: <TrendingUp className="h-4 w-4" />,
                label: 'Skill Gap',
                sub: 'Profile radar',
                score: '92%',
                accent: '#00B89C',
              },
              {
                to: '/career-roadmap',
                icon: <Map className="h-4 w-4" />,
                label: 'Roadmap',
                sub: currentTrack.title,
                score: `${completedCount}/${milestones.length} done`,
                accent: '#6A5F00',
              },
              {
                to: '/coding',
                icon: <TerminalIcon className="h-4 w-4" />,
                label: 'Coding',
                sub: 'DSA practice',
                score: `${mockCareerScore.coding}%`,
                accent: '#6A5F00',
              },
            ].map((mod) => (
              <Link
                key={mod.to}
                to={mod.to}
                className="group flex flex-col gap-2 p-4 bg-white rounded-2xl border border-[#CDC7AA]/30 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${mod.accent}20`,
                    color: mod.accent,
                  }}
                >
                  {mod.icon}
                </div>
                <div>
                  <p className="font-bold text-sm text-[#1A1A1A] group-hover:text-[#6A5F00] transition-colors leading-tight">
                    {mod.label}
                  </p>
                  <p className="text-[11px] text-[#7C775F] truncate">{mod.sub}</p>
                </div>
                <span
                  className="text-[11px] font-bold"
                  style={{ color: mod.accent }}
                >
                  {mod.score}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ── 4. Roadmap Snapshot + Daily Challenge ── */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          {/* Roadmap Snapshot — real data from CAREER_TRACKS */}
          <div className="bg-white rounded-2xl p-5 border border-[#CDC7AA]/30 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                  Active Track
                </p>
                <h3 className="font-heading text-base font-black text-[#1A1A1A] leading-tight">
                  {currentTrack.title}
                </h3>
              </div>
              <Link
                to="/career-roadmap"
                className="w-8 h-8 rounded-xl bg-[#FAF3DF] flex items-center justify-center text-[#6A5F00] hover:bg-[#FFE600] transition-colors"
              >
                <Route className="h-4 w-4" />
              </Link>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#1A1A1A] mb-1.5">
                <span>
                  {completedCount} of {milestones.length} milestones
                </span>
                <span className="text-[#006B5B]">{overallPercent}%</span>
              </div>
              <div className="w-full h-2 bg-[#FAF3DF] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#FFE600] to-[#006B5B] transition-all duration-700"
                  style={{ width: `${overallPercent}%` }}
                />
              </div>
            </div>

            <div className="relative pl-5 space-y-3 before:absolute before:left-2 before:top-1 before:bottom-1 before:w-0.5 before:bg-[#CDC7AA]/50">
              {snapshotMilestones.map((m) => (
                <div key={m.id} className="relative flex flex-col gap-0.5">
                  <div
                    className={`absolute -left-5 top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                      m.status === 'completed'
                        ? 'bg-[#006B5B] text-white'
                        : m.status === 'in-progress'
                        ? 'bg-[#FFE600] text-[#1A1A1A] animate-pulse'
                        : 'bg-[#EEE8D4] text-[#7C775F]'
                    }`}
                  >
                    {m.status === 'completed' ? '✓' : m.stageNumber}
                  </div>
                  <span
                    className={`text-xs font-bold leading-tight ${
                      m.status === 'locked'
                        ? 'text-[#7C775F] opacity-60'
                        : 'text-[#1A1A1A]'
                    }`}
                  >
                    {m.title}
                  </span>
                  {m.status === 'in-progress' && m.subtasks && (
                    <div className="flex items-center gap-1.5">
                      <div className="flex-1 h-1 bg-[#FAF3DF] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FFE600] rounded-full"
                          style={{
                            width: `${Math.round(
                              (m.subtasks.filter((s) => s.completed).length /
                                m.subtasks.length) *
                                100
                            )}%`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-[#6A5F00]">
                        {m.subtasks.filter((s) => s.completed).length}/
                        {m.subtasks.length}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              {milestones.length > 4 && (
                <p className="text-[11px] text-[#7C775F]">
                  +{milestones.length - 4} more milestones
                </p>
              )}
            </div>

            <Link
              to="/career-roadmap"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#FAF3DF] text-[#1A1A1A] font-bold text-xs hover:bg-[#FFE600] transition-colors border border-[#CDC7AA]/30"
            >
              View Full Roadmap <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Daily Challenge */}
          <div className="bg-white rounded-2xl p-5 border border-[#CDC7AA]/30 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                  Today's Challenge
                </p>
                <h3 className="font-heading text-base font-black text-[#1A1A1A] leading-tight">
                  {challenge.title}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-[11px] flex items-center gap-1 shrink-0">
                <Timer className="h-3 w-3" /> {challenge.difficulty}
              </span>
            </div>

            <div className="flex-1 bg-[#FAF3DF] rounded-xl p-4 border border-[#CDC7AA]/30">
              <p className="text-xs sm:text-sm text-[#1A1A1A] leading-relaxed font-medium">
                &quot;{challenge.description}&quot;
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#006B5B]">+{challenge.xp} XP on completion</span>
              <span className="text-[#7C775F]">{studentBranch} track</span>
            </div>

            <Link
              to="/interview"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-sm hover:brightness-105 hover:shadow-md transition-all active:scale-95"
            >
              <Bolt className="h-4 w-4" /> Start Challenge
            </Link>

            {inProgressMilestone && (
              <div className="p-3 rounded-xl bg-[#EEE8D4] border border-[#CDC7AA]/30">
                <p className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wide mb-1">
                  Currently Working On
                </p>
                <p className="text-xs font-bold text-[#1A1A1A]">
                  {inProgressMilestone.title}
                </p>
                <p className="text-[11px] text-[#7C775F] mt-0.5 line-clamp-1">
                  {inProgressMilestone.summary}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
