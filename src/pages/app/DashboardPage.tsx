import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  mockCareerScore,
} from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { CareerQuizSection } from '../../components/sections/CareerQuizSection';
import {
  Map,
  ArrowRight,
  SmartToy,
  Bolt,
  Timer,
  AutoAwesome,
  Description,
  TerminalIcon,
  Campaign,
  Verified,
  CollectionsBookmark,
  History,
  Route,
  TrendingUp,
} from '../../components/icons/StitchIcons';

const QUIZ_DONE_KEY = 'career_quiz_completed';

/* Playful SVG Mascot Sticker from Stitch */
function MascotIllustration() {
  return (
    <svg className="w-full h-full drop-shadow-sm" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Graduation Cap */}
      <path d="M100 24L170 54L100 84L30 54L100 24Z" fill="#7C775F" />
      <path d="M100 32L156 56L100 80L44 56L100 32Z" fill="#9B5DE5" />
      <path d="M154 58V100C154 105 150 110 145 112L100 128L55 112C50 110 46 100 46 100V58" fill="#333123" opacity="0.15" />
      <circle cx="166" cy="100" fill="#FFE600" r="6" />
      <path d="M166 56V94" stroke="#7C775F" strokeLinecap="round" strokeWidth="3" />
      {/* Robot Ears/Antenna */}
      <rect fill="#FF6B6B" height="26" rx="7" width="14" x="36" y="98" />
      <rect fill="#FF6B6B" height="26" rx="7" width="14" x="150" y="98" />
      <circle cx="44" cy="74" fill="#FFE600" r="7" />
      <line stroke="#1A1A1A" strokeWidth="3" x1="44" x2="44" y1="81" y2="98" />
      {/* Robot Head */}
      <rect fill="#FFE600" height="78" rx="34" width="108" x="46" y="74" />
      {/* Eyes & Smile */}
      <path d="M68 112C68 106 74 102 80 102C86 102 92 106 92 112" stroke="#1A1A1A" strokeLinecap="round" strokeWidth="5" />
      <path d="M108 112C108 106 114 102 120 102C126 102 132 106 132 112" stroke="#1A1A1A" strokeLinecap="round" strokeWidth="5" />
      <path d="M90 128C96 134 104 134 110 128" stroke="#1A1A1A" strokeLinecap="round" strokeWidth="4" />
      {/* Cheeks */}
      <circle cx="68" cy="122" fill="#FF6B6B" opacity="0.6" r="5" />
      <circle cx="132" cy="122" fill="#FF6B6B" opacity="0.6" r="5" />
      {/* Collar / Torso */}
      <rect fill="#00F5D4" height="12" rx="6" width="48" x="76" y="152" />
      <path d="M50 166C50 156 62 148 76 148H124C138 148 150 156 150 166V184H50V166Z" fill="#FAF3DF" />
    </svg>
  );
}

/* Circular Score Gauge */
function ScoreGauge({ score }: { score: number }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // ~314
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="#e8e2cf"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="#FFE600"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-4xl font-extrabold text-[#1A1A1A] leading-none">
          {score}
        </span>
        <span className="text-[11px] font-bold text-[#7C775F] tracking-wider mt-0.5">
          / 100 PTS
        </span>
      </div>
    </div>
  );
}

interface BranchBenchmark {
  name: string;
  percent: number;
  color: string;
}

interface BranchRoadmapStep {
  title: string;
  subtitle: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  progress?: number;
}

interface BranchDashboardConfig {
  targetRole: string;
  trackName: string;
  readinessSummary: string;
  benchmarkTitle: string;
  benchmarks: BranchBenchmark[];
  dailyChallenge: {
    difficulty: string;
    title: string;
    description: string;
    peersAnswered: number;
    timeLeft: string;
    xp: number;
  };
  roadmapSnapshot: {
    trackTitle: string;
    steps: BranchRoadmapStep[];
  };
  aiSuggestion: string;
}

const BRANCH_DASHBOARD_DATA: Record<string, BranchDashboardConfig> = {
  CSE: {
    targetRole: 'SDE-1 (Full Stack)',
    trackName: 'Full Stack Web Track',
    readinessSummary: 'You are outperforming 78% of peers in Full Stack roles. Completing your upcoming distributed caching quiz will boost this into the top decile.',
    benchmarkTitle: 'Full Stack Developer Benchmark',
    benchmarks: [
      { name: 'React & State Architecture', percent: 78, color: '#FFE600' },
      { name: 'TypeScript & Strict Mode', percent: 65, color: '#00F5D4' },
      { name: 'Node.js & Express Microservices', percent: 58, color: '#9B5DE5' },
      { name: 'Python Algorithms & DS', percent: 72, color: '#FF6B6B' },
    ],
    dailyChallenge: {
      difficulty: 'Medium',
      title: 'REST vs. GraphQL Architectures',
      description: 'Explain the architectural difference between REST and GraphQL. In what scenario would over-fetching justify switching from REST to GraphQL in high-frequency mobile applications?',
      peersAnswered: 423,
      timeLeft: '5h 22m',
      xp: 50,
    },
    roadmapSnapshot: {
      trackTitle: 'Full Stack Web Architecture',
      steps: [
        { title: 'Core JavaScript Fundamentals', subtitle: 'Event loops, Closures, Async/Await', status: 'completed' },
        { title: 'Modern React Frameworks', subtitle: 'Hooks, Context API, Next.js routing', status: 'completed' },
        { title: 'Backend APIs & Microservices', subtitle: 'Express middleware, JWT Auth, Redis caching', status: 'in-progress', progress: 45 },
        { title: 'Relational Schema & Optimization', subtitle: 'PostgreSQL indexing, query plans', status: 'upcoming' },
        { title: 'Cloud Deployment & CI/CD', subtitle: 'Docker multi-stage, GitHub Actions', status: 'upcoming' },
      ],
    },
    aiSuggestion: 'Your resume is strong, but improving your GitHub README files and live demo links could increase your profile quality by 15%.',
  },
  ECE: {
    targetRole: 'VLSI & Embedded Systems Engineer',
    trackName: 'VLSI & Embedded Systems Track',
    readinessSummary: 'You are outperforming 81% of peers in Hardware & Embedded tracks. Completing your ARM Cortex RTOS assessment will boost your core score into the top 5%.',
    benchmarkTitle: 'VLSI & Embedded Hardware Benchmark',
    benchmarks: [
      { name: 'Verilog RTL & Digital Synthesis', percent: 82, color: '#FFE600' },
      { name: 'ARM Cortex & STM32 Firmware', percent: 75, color: '#00F5D4' },
      { name: 'Communication Protocols (I2C/SPI)', percent: 88, color: '#9B5DE5' },
      { name: 'KiCad PCB Layout & DRC', percent: 64, color: '#FF6B6B' },
    ],
    dailyChallenge: {
      difficulty: 'Hard',
      title: 'Metastability & Clock Domain Crossing',
      description: 'Explain why setup and hold time violations cause metastability in digital flip-flops. How does a 2-flip-flop synchronizer resolve MTBF issues when crossing asynchronous clock boundaries?',
      peersAnswered: 312,
      timeLeft: '4h 10m',
      xp: 60,
    },
    roadmapSnapshot: {
      trackTitle: 'VLSI & Embedded Systems Architecture',
      steps: [
        { title: 'Digital Logic Design & Verilog RTL', subtitle: 'FSMs, Combinational ALU, Testbenches', status: 'completed' },
        { title: 'ARM Microcontroller Peripherals', subtitle: 'STM32 HAL, Clock Config, Timers, Interrupts', status: 'completed' },
        { title: 'FreeRTOS Kernel & Real-Time Tasks', subtitle: 'Semaphores, Priority Inheritance, Queues', status: 'in-progress', progress: 55 },
        { title: 'FPGA Synthesis & Vivado Flow', subtitle: 'Constraints, Timing Closure, Block Design', status: 'upcoming' },
        { title: 'Multilayer PCB Layout with KiCad', subtitle: 'Impedance matching, Ground planes, DRC', status: 'upcoming' },
      ],
    },
    aiSuggestion: 'Adding schematic screenshots and oscilloscope timing captures to your portfolio will greatly impress hardware core recruiters at Qualcomm and TI.',
  },
  MECH: {
    targetRole: 'CAD/CAM & FEA Design Engineer',
    trackName: 'CAD/CAM & Product Design Track',
    readinessSummary: 'You are outperforming 76% of peers in Mechanical Design & Simulation. Completing your ANSYS nonlinear analysis project will place you in the top tier for automotive R&D.',
    benchmarkTitle: 'Mechanical Product Design Benchmark',
    benchmarks: [
      { name: 'SolidWorks 3D CAD Modeling', percent: 85, color: '#FFE600' },
      { name: 'GD&T per ASME Y14.5', percent: 70, color: '#00F5D4' },
      { name: 'ANSYS Workbench FEA Simulation', percent: 62, color: '#9B5DE5' },
      { name: 'Fusion 360 CAM & G-Code', percent: 68, color: '#FF6B6B' },
    ],
    dailyChallenge: {
      difficulty: 'Medium',
      title: 'Von Mises Stress vs. Principal Stress',
      description: 'Explain why Von Mises yield criteria is preferred over Maximum Principal Stress (Rankine) when evaluating ductile materials under multi-axial complex stress states.',
      peersAnswered: 289,
      timeLeft: '6h 45m',
      xp: 50,
    },
    roadmapSnapshot: {
      trackTitle: 'CAD/CAM & Engineering Simulation',
      steps: [
        { title: 'Parametric 3D CAD & Drafting', subtitle: 'Feature trees, Top-down assemblies, BOM', status: 'completed' },
        { title: 'Geometric Dimensioning & Tolerancing', subtitle: 'Datums, Feature control frames, MMC/LMC', status: 'completed' },
        { title: 'ANSYS Structural & Thermal FEA', subtitle: 'Hex meshing, Boundary conditions, Stress singularities', status: 'in-progress', progress: 40 },
        { title: 'CNC Toolpath Generation (CAM)', subtitle: 'Adaptive clearing, Feeds & speeds, G-code', status: 'upcoming' },
        { title: 'Design for Manufacturing (DFMA)', subtitle: 'Injection molding, Sheet metal guidelines', status: 'upcoming' },
      ],
    },
    aiSuggestion: 'Upload your 3D CAD renders and FEA stress contour reports to your portfolio to stand out for core engineering roles at Tata Motors, Mahindra, and L&T.',
  },
  EEE: {
    targetRole: 'EV Powertrain & Power Electronics Engineer',
    trackName: 'EV Systems & Power Electronics Track',
    readinessSummary: 'You are outperforming 79% of peers in Power Systems & EV Engineering. Completing your MATLAB Simulink motor drive model will boost you into the top 10% campus placement band.',
    benchmarkTitle: 'EV & Power Electronics Benchmark',
    benchmarks: [
      { name: 'Power Converters (Buck/Boost/VSI)', percent: 80, color: '#FFE600' },
      { name: 'MATLAB / Simulink Modeling', percent: 74, color: '#00F5D4' },
      { name: 'Motor Drives & FOC Control', percent: 60, color: '#9B5DE5' },
      { name: 'Siemens PLC & SCADA Systems', percent: 66, color: '#FF6B6B' },
    ],
    dailyChallenge: {
      difficulty: 'Hard',
      title: 'FOC Clarke & Park Transformations',
      description: 'Explain how Clarke and Park transformations convert 3-phase AC stator currents into decoupled d-q DC components for independent control of motor torque and flux in electric vehicles.',
      peersAnswered: 245,
      timeLeft: '3h 30m',
      xp: 55,
    },
    roadmapSnapshot: {
      trackTitle: 'EV Powertrain & Industrial Automation',
      steps: [
        { title: 'Power Electronics Converter Design', subtitle: 'Switching devices, Inductor sizing, SPWM', status: 'completed' },
        { title: 'MATLAB Simulink Simulation', subtitle: 'PID feedback loops, THD analysis, Inverters', status: 'completed' },
        { title: 'EV Motor Drives & Vector Control', subtitle: 'PMSM, Inverter switching, FOC transforms', status: 'in-progress', progress: 50 },
        { title: 'Battery Management Systems (BMS)', subtitle: 'Cell balancing, SOC estimation, Protection', status: 'upcoming' },
        { title: 'Siemens S7 PLC & SCADA Systems', subtitle: 'Ladder logic, Industrial networks, WinCC', status: 'upcoming' },
      ],
    },
    aiSuggestion: 'Highlight your MATLAB Simulink inverter simulations and battery thermal management calculations to attract EV leaders like Ola Electric, Ather, and Bosch.',
  },
  CIVIL: {
    targetRole: 'Structural BIM & Planning Engineer',
    trackName: 'Structural Engineering & BIM Track',
    readinessSummary: 'You are outperforming 82% of peers in Structural Design & Project Planning. Completing your seismic detailing model will elevate your profile to top tier for Larsen & Toubro.',
    benchmarkTitle: 'Structural Design & BIM Benchmark',
    benchmarks: [
      { name: 'STAAD.Pro Structural Analysis', percent: 84, color: '#FFE600' },
      { name: 'Autodesk Revit BIM Modeling', percent: 76, color: '#00F5D4' },
      { name: 'IS 456 / IS 1893 Concrete Codes', percent: 78, color: '#9B5DE5' },
      { name: 'Primavera P6 Project Scheduling', percent: 65, color: '#FF6B6B' },
    ],
    dailyChallenge: {
      difficulty: 'Medium',
      title: 'Limit State vs. Working Stress in IS 456',
      description: 'Explain the fundamental design philosophy differences between Limit State Method and Working Stress Method according to IS 456:2000. Why does LSM utilize partial safety factors?',
      peersAnswered: 330,
      timeLeft: '7h 15m',
      xp: 50,
    },
    roadmapSnapshot: {
      trackTitle: 'Structural BIM & Construction Management',
      steps: [
        { title: 'Structural Analysis with STAAD.Pro', subtitle: 'Dead, Live, Wind, Seismic IS 1893 load cases', status: 'completed' },
        { title: 'RCC Design per IS 456:2000', subtitle: 'Limit state flexure, Shear, Ductile detailing', status: 'completed' },
        { title: 'Autodesk Revit Structural BIM', subtitle: '3D analytical model, Clash detection, Schedules', status: 'in-progress', progress: 50 },
        { title: 'Navisworks Clash Matrix & 4D BIM', subtitle: 'Time-liner simulation, Interdisciplinary sync', status: 'upcoming' },
        { title: 'Primavera P6 CPM Project Planning', subtitle: 'WBS, Critical path, EVM S-curves', status: 'upcoming' },
      ],
    },
    aiSuggestion: 'Include your STAAD.Pro bending moment diagrams and Revit 3D structural model sheets to grab the attention of top EPC recruiters at L&T and Shapoorji Pallonji.',
  },
};

export default function DashboardPage() {
  const { user, studentBranch } = useAuth();
  const branchData = BRANCH_DASHBOARD_DATA[studentBranch] || BRANCH_DASHBOARD_DATA.CSE;
  const [quizDone, setQuizDone] = useState<boolean>(() => {
    return localStorage.getItem(QUIZ_DONE_KEY) === 'true';
  });
  const [isLoading, setIsLoading] = useState(true);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate data loading for skeleton
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (quizDone && dashboardRef.current && !isLoading) {
      setTimeout(() => {
        dashboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [quizDone, isLoading]);

  const handleQuizComplete = (_answers: Record<string, string>) => {
    localStorage.setItem(QUIZ_DONE_KEY, 'true');
    setQuizDone(true);
  };

  return (
    <div className="space-y-8 pb-16 w-full font-sans text-[#1E1C10]">
      {/* ─── Eyebrow Section Tag ─── */}
      <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-[#6A5F00]">
        <span className="w-6 h-[2px] bg-[#6A5F00] rounded-full inline-block" />
        STUDENT COMMAND CENTER
      </div>

      {/* ─── Career Profile Quiz (shown before rest of dashboard) ─── */}
      {!quizDone && (
        <div className="bg-white rounded-3xl p-6 border-2 border-[#CDC7AA]/50 shadow-md">
          <CareerQuizSection
            onComplete={handleQuizComplete}
            isCompleted={quizDone}
          />
        </div>
      )}

      {/* ─── Main Dashboard Container ─── */}
      <motion.div
        ref={dashboardRef}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        className={`space-y-8 transition-all duration-700 ${
          !quizDone ? 'opacity-30 pointer-events-none select-none blur-[1px]' : 'opacity-100 pointer-events-auto blur-0'
        }`}
      >
        {isLoading ? (
          <div className="space-y-8">
            <div className="w-full h-48 rounded-3xl bg-slate-200 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-36 rounded-2xl bg-slate-200 animate-pulse" />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 h-96 rounded-3xl bg-slate-200 animate-pulse" />
              <div className="lg:col-span-5 h-96 rounded-3xl bg-slate-200 animate-pulse" />
            </div>
          </div>
        ) : (
          <>
            {/* ─── 1. TOP COMMAND CENTER / HERO BANNER (Stitch Vibrant Yellow) ─── */}
            <motion.section 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="relative w-full rounded-3xl bg-gradient-to-r from-[#FFE600] via-[#FAF3DF] to-[#F4EEDA] p-6 sm:p-8 lg:p-10 overflow-hidden shadow-lg border-2 border-[#E7D2A0]"
            >
          {/* Ambient Blurred Auras */}
          <div className="absolute -right-8 -bottom-10 w-64 h-64 bg-[#00F5D4]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -top-12 right-48 w-44 h-44 bg-[#9B5DE5]/15 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Greeting & Info */}
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#1A1A1A] font-bold text-xs shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#006B5B] animate-ping" />
                  Engineering Placement Hub
                </span>
                <span className="px-3 py-1 rounded-full bg-[#EEE8D4] text-[#4B4731] font-semibold text-xs">
                  {user.college} • {user.department}
                </span>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-[#1A1A1A] tracking-tight flex items-center gap-2 mt-1">
                Good morning, {user.name} <span className="inline-block animate-bounce">👋</span>
              </h1>

              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-3.5 py-1 rounded-full w-fit mt-1 shadow-sm border border-[#CDC7AA]/30">
                <TrendingUp className="h-4 w-4 text-[#006B5B]" />
                <p className="text-xs sm:text-sm text-[#1A1A1A] font-medium">
                  Your career readiness score increased by <strong className="text-[#006B5B] font-bold">+4 points</strong> this week!
                </p>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <Link
                  to="/career-roadmap"
                  className="px-5 py-3 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all active:scale-95 duration-200 border border-[#CDC7AA]/40"
                >
                  <span>Explore Roadmap</span>
                  <span>🚀</span>
                </Link>
                <Link
                  to="/interview"
                  className="px-5 py-3 rounded-full bg-white text-[#1A1A1A] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm hover:bg-[#FAF3DF] hover:-translate-y-1 transition-all active:scale-95 duration-200 border border-[#CDC7AA]/30"
                >
                  <span>Start Mock Interview</span>
                  <span>🎙️</span>
                </Link>
              </div>
            </div>

            {/* Mascot Card & Visual Sticker (Placement AI Pal) */}
            <div className="relative flex items-center justify-center self-center lg:self-auto shrink-0 pr-2">
              <div className="w-36 h-36 lg:w-44 lg:h-44 rounded-full bg-white flex items-center justify-center p-3 shadow-xl relative hover:rotate-3 transition-transform duration-300 border-2 border-[#FAF3DF]">
                <MascotIllustration />
                <div className="absolute -bottom-2 bg-[#1A1A1A] text-[#FFF9E9] font-bold text-[11px] px-3 py-0.5 rounded-full shadow">
                  Placement AI Pal
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─── 2. QUICK-LAUNCH MODULES GRID (5 Cards) ─── */}
        <motion.section 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#6A5F00]" />
              <h2 className="font-heading text-lg sm:text-xl font-black text-[#1A1A1A]">Core AI Modules</h2>
            </div>
            <span className="text-xs font-semibold text-[#7C775F]">Real-time status sync</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Module 1: Resume AI */}
            <Link
              to="/resume"
              className="group relative flex flex-col p-4 sm:p-5 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-[#CDC7AA]/40"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-[#FF6B6B]/20 text-[#FF6B6B] flex items-center justify-center">
                  <Description className="h-5 w-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B6B]/15 text-[#1A1A1A] font-bold text-[11px]">
                  ATS Audit
                </span>
              </div>
              <span className="font-heading text-base font-extrabold text-[#1A1A1A] group-hover:text-[#6A5F00] transition-colors">
                Resume AI
              </span>
              <p className="text-xs text-[#7C775F] mt-0.5">Parser & gap scoring</p>
              <div className="mt-4 pt-2 flex items-center justify-between bg-[#FAF3DF] px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-[#7C775F]">Score</span>
                <span className="text-xs font-bold text-[#1A1A1A]">{mockCareerScore.resume}/100</span>
              </div>
            </Link>

            {/* Module 2: AI Interview */}
            <Link
              to="/interview"
              className="group relative flex flex-col p-4 sm:p-5 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-[#CDC7AA]/40"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-[#9B5DE5]/20 text-[#9B5DE5] flex items-center justify-center">
                  <SmartToy className="h-5 w-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#9B5DE5]/15 text-[#1A1A1A] font-bold text-[11px]">
                  Voice Agent
                </span>
              </div>
              <span className="font-heading text-base font-extrabold text-[#1A1A1A] group-hover:text-[#6A5F00] transition-colors">
                AI Interview
              </span>
              <p className="text-xs text-[#7C775F] mt-0.5">Behavioral & tech round</p>
              <div className="mt-4 pt-2 flex items-center justify-between bg-[#FAF3DF] px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-[#7C775F]">Avg Score</span>
                <span className="text-xs font-bold text-[#1A1A1A]">{mockCareerScore.interview}/100</span>
              </div>
            </Link>

            {/* Module 3: Skill Gap */}
            <Link
              to="/skill-gap"
              className="group relative flex flex-col p-4 sm:p-5 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-[#CDC7AA]/40"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-[#00F5D4]/30 text-[#006B5B] flex items-center justify-center">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#00F5D4]/25 text-[#006B5B] font-bold text-[11px]">
                  Target Match
                </span>
              </div>
              <span className="font-heading text-base font-extrabold text-[#1A1A1A] group-hover:text-[#6A5F00] transition-colors">
                Skill Gap
              </span>
              <p className="text-xs text-[#7C775F] mt-0.5">Job profile radar</p>
              <div className="mt-4 pt-2 flex items-center justify-between bg-[#FAF3DF] px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-[#7C775F]">Benchmark</span>
                <span className="text-xs font-bold text-[#006B5B]">92%</span>
              </div>
            </Link>

            {/* Module 4: Career Roadmap */}
            <Link
              to="/career-roadmap"
              className="group relative flex flex-col p-4 sm:p-5 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-[#CDC7AA]/40"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-[#FFE600] text-[#1A1A1A] flex items-center justify-center">
                  <Map className="h-5 w-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFE600]/40 text-[#1A1A1A] font-bold text-[11px]">
                  Active
                </span>
              </div>
              <span className="font-heading text-base font-extrabold text-[#1A1A1A] group-hover:text-[#6A5F00] transition-colors">
                Roadmap
              </span>
              <p className="text-xs text-[#7C775F] mt-0.5">{branchData.trackName}</p>
              <div className="mt-4 pt-2 flex items-center justify-between bg-[#FAF3DF] px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-[#7C775F]">Progress</span>
                <span className="text-xs font-bold text-[#1A1A1A]">Step 3 of 5</span>
              </div>
            </Link>

            {/* Module 5: Coding Coach */}
            <Link
              to="/coding"
              className="group relative flex flex-col p-4 sm:p-5 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-[#CDC7AA]/40"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-[#6A5F00]/20 text-[#6A5F00] flex items-center justify-center">
                  <TerminalIcon className="h-5 w-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#6A5F00]/15 text-[#6A5F00] font-bold text-[11px]">
                  DSA Practice
                </span>
              </div>
              <span className="font-heading text-base font-extrabold text-[#1A1A1A] group-hover:text-[#6A5F00] transition-colors">
                Coding Coach
              </span>
              <p className="text-xs text-[#7C775F] mt-0.5">Algorithmic tests</p>
              <div className="mt-4 pt-2 flex items-center justify-between bg-[#FAF3DF] px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-[#7C775F]">Accuracy</span>
                <span className="text-xs font-bold text-[#1A1A1A]">{mockCareerScore.coding}%</span>
              </div>
            </Link>
          </div>
        </motion.section>

        {/* ─── 3. TWO-COLUMN ANALYTICS & ACTIVITY SECTION (7 cols + 5 cols) ─── */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* LEFT COLUMN: Career Readiness, Match Benchmarks & Priority Action (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Readiness Ring & Benchmark Overview Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                    Placement Preparedness
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-black text-[#1A1A1A]">
                    Career Readiness Score
                  </h3>
                </div>
                <Link
                  to="/progress"
                  className="text-xs font-bold text-[#6A5F00] flex items-center gap-1 hover:underline"
                >
                  Detailed Breakdown
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Score Meter & Context */}
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#FAF3DF]/70 p-5 rounded-2xl border border-[#CDC7AA]/30">
                <ScoreGauge score={mockCareerScore.overall} />

                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-[#26FEDC] text-[#007261] font-bold text-xs">
                      Tier-1 Ready
                    </span>
                    <span className="text-xs text-[#7C775F] font-semibold">Target role: {branchData.targetRole}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#1A1A1A] leading-relaxed font-medium">
                    {branchData.readinessSummary}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-bold mt-1">
                    <span className="flex items-center gap-1 text-[#006B5B]">
                      <Verified className="h-4 w-4" /> Profile Verified
                    </span>
                    <span className="flex items-center gap-1 text-[#7C775F]">
                      <History className="h-4 w-4" /> Updated 2h ago
                    </span>
                  </div>
                </div>
              </div>

              {/* Target Tech Benchmarks Progress Bars */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading text-sm sm:text-base font-bold text-[#1A1A1A]">
                    {branchData.benchmarkTitle}
                  </h4>
                  <span className="text-xs text-[#7C775F] font-semibold">{branchData.benchmarks.length} key competencies</span>
                </div>

                <div className="space-y-3">
                  {branchData.benchmarks.map((b) => (
                    <div key={b.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-[#1A1A1A]">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                          {b.name}
                        </span>
                        <span className="text-[#7C775F]">{b.percent}%</span>
                      </div>
                      <div className="w-full h-3 bg-[#FAF3DF] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${b.percent}%`, backgroundColor: b.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Priority Recommendation Banner */}
            <div className="bg-[#EEE8D4] rounded-3xl p-5 sm:p-6 shadow-sm border border-[#CDC7AA]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FFE600] text-[#1A1A1A] flex items-center justify-center shrink-0 shadow-sm border border-[#CDC7AA]/40">
                  <AutoAwesome className="h-6 w-6 text-[#6A5F00]" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B6B] text-white font-bold text-[10px]">
                      High Priority
                    </span>
                    <span className="text-xs font-semibold text-[#7C775F]">AI Coach Suggestion ({studentBranch})</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1A1A1A] font-medium leading-relaxed">
                    {branchData.aiSuggestion}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <Link
                  to="/github"
                  className="px-4 py-2 rounded-full bg-[#1A1A1A] text-white font-bold text-xs hover:bg-black transition-all active:scale-95 shadow-sm"
                >
                  Audit GitHub Portfolio
                </Link>
                <Link
                  to="/resume"
                  className="px-4 py-2 rounded-full bg-white text-[#1A1A1A] font-bold text-xs hover:bg-[#FAF3DF] transition-all active:scale-95 border border-[#CDC7AA]/40"
                >
                  Scan Again
                </Link>
              </div>
            </div>

            {/* Recent Placement Assets & Reports Gallery */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CollectionsBookmark className="h-5 w-5 text-[#6A5F00]" />
                  <h4 className="font-heading text-base font-extrabold text-[#1A1A1A]">
                    Recent Placement Assets & Reports
                  </h4>
                </div>
                <span className="text-xs text-[#7C775F] font-medium">Synched with NITC drive</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  to="/progress"
                  className="group relative rounded-2xl overflow-hidden bg-[#FAF3DF] aspect-video shadow-sm hover:shadow-md transition-all border border-[#CDC7AA]/30"
                >
                  <img
                    alt="Platform Overview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-white font-bold text-xs">System Evaluation</span>
                  </div>
                </Link>

                <Link
                  to="/coding"
                  className="group relative rounded-2xl overflow-hidden bg-[#FAF3DF] aspect-video shadow-sm hover:shadow-md transition-all border border-[#CDC7AA]/30"
                >
                  <img
                    alt="Technical Assessments"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-white font-bold text-xs">DSA Scorecards</span>
                  </div>
                </Link>

                <Link
                  to="/interview"
                  className="group relative rounded-2xl overflow-hidden bg-[#FAF3DF] aspect-video shadow-sm hover:shadow-md transition-all border border-[#CDC7AA]/30"
                >
                  <img
                    alt="Mock Interview Feed"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-white font-bold text-xs">Voice Transcript Log</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Daily Challenge & Roadmap Timeline (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Daily Challenge Card */}
            <div className="relative bg-gradient-to-br from-white to-[#FAF3DF] rounded-3xl p-6 sm:p-7 shadow-sm border border-[#CDC7AA]/40 overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-xs flex items-center gap-1.5 shadow-sm">
                  <Timer className="h-3.5 w-3.5" />
                  Daily Challenge ({branchData.dailyChallenge.difficulty})
                </span>
                <span className="text-xs font-bold text-[#6A5F00]">+{branchData.dailyChallenge.xp} XP</span>
              </div>

              <h3 className="font-heading text-lg font-black text-[#1A1A1A] mt-2">
                {branchData.dailyChallenge.title}
              </h3>

              <div className="bg-white p-4 rounded-2xl mt-3 border border-[#CDC7AA]/30 shadow-inner">
                <p className="text-xs sm:text-sm text-[#1A1A1A] leading-relaxed font-medium">
                  "{branchData.dailyChallenge.description}"
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 text-xs font-bold">
                <span className="text-[#006B5B] flex items-center gap-1">
                  👥 {branchData.dailyChallenge.peersAnswered} peers answered
                </span>
                <span className="text-[#FF6B6B]">Ends in {branchData.dailyChallenge.timeLeft}</span>
              </div>

              <Link
                to="/interview"
                className="w-full mt-4 py-3 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all border border-[#CDC7AA]/40"
              >
                <Bolt className="h-4 w-4" />
                <span>Start Today's Challenge</span>
              </Link>
            </div>

            {/* Active Career Milestone Stepper Timeline */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                    Roadmap Snapshot
                  </span>
                  <h3 className="font-heading text-base sm:text-lg font-black text-[#1A1A1A]">
                    {branchData.roadmapSnapshot.trackTitle}
                  </h3>
                </div>
                <span className="w-8 h-8 rounded-full bg-[#FAF3DF] flex items-center justify-center text-[#6A5F00]">
                  <Route className="h-4 w-4" />
                </span>
              </div>

              {/* Stepper Timeline */}
              <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#CDC7AA]/60">
                {branchData.roadmapSnapshot.steps.map((step, idx) => {
                  if (step.status === 'completed') {
                    return (
                      <div key={idx} className="relative">
                        <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#006B5B] flex items-center justify-center text-white shadow-sm text-[11px]">
                          ✓
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[#1A1A1A]">{step.title}</span>
                          <span className="text-[11px] text-[#7C775F]">{step.subtitle}</span>
                          <span className="text-[10px] font-bold text-[#006B5B] mt-0.5">Completed 100%</span>
                        </div>
                      </div>
                    );
                  }
                  if (step.status === 'in-progress') {
                    return (
                      <div key={idx} className="relative">
                        <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#FFE600] flex items-center justify-center text-[#1A1A1A] shadow-md animate-pulse text-[11px]">
                          ▶
                        </div>
                        <div className="bg-[#FAF3DF] p-3 rounded-xl flex flex-col gap-1 border border-[#CDC7AA]/40">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold text-[#1A1A1A]">{step.title}</span>
                            <span className="px-2 py-0.5 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-[10px]">
                              In Progress
                            </span>
                          </div>
                          <span className="text-[11px] text-[#7C775F]">{step.subtitle}</span>
                          <div className="w-full bg-white rounded-full h-2 mt-1 overflow-hidden">
                            <div className="bg-[#6A5F00] h-2 rounded-full" style={{ width: `${step.progress || 50}%` }} />
                          </div>
                          <span className="text-[10px] font-bold text-[#1A1A1A] text-right">{step.progress || 50}% done</span>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className="relative">
                      <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#EEE8D4] flex items-center justify-center text-[#7C775F] text-[10px]">
                        •
                      </div>
                      <div className="flex flex-col opacity-70">
                        <span className="text-xs font-bold text-[#1A1A1A]">{step.title}</span>
                        <span className="text-[11px] text-[#7C775F]">{step.subtitle}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link
                to="/career-roadmap"
                className="w-full py-2.5 rounded-full bg-[#FAF3DF] text-[#1A1A1A] font-bold text-xs flex items-center justify-center gap-1 hover:bg-[#EEE8D4] transition-colors border border-[#CDC7AA]/30"
              >
                <span>View Full Roadmap</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Campus Placement Drive / Campus Buzz */}
            <div className="bg-[#F4EEDA] rounded-2xl p-4 border border-[#CDC7AA]/40 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00F5D4]/40 flex items-center justify-center text-[#006B5B]">
                  <Campaign className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1A1A1A]">Campus Placement Drive</span>
                  <span className="text-[11px] text-[#7C775F]">Oracle & Cisco visiting in 14 days</span>
                </div>
              </div>
              <Link
                to="/jobs"
                className="px-3.5 py-1.5 rounded-full bg-white text-[#1A1A1A] font-bold text-xs shadow-sm hover:bg-[#FAF3DF] transition-colors border border-[#CDC7AA]/30"
              >
                View JDs
              </Link>
            </div>
          </div>
        </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
