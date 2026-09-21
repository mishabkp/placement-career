import { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '../../components/shared/PageHeader';
import { TrendingUp } from '../../components/icons/StitchIcons';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import {
  Code2, Server, Cloud, BrainCircuit,
  CheckCircle2, RotateCcw, ChevronRight, Flame, Star,
  Target, BookOpen, AlertTriangle, TrendingDown,
  Cpu, Cog, Zap, Building2, CircuitBoard, Compass,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

export type EngineeringBranch = 'CSE' | 'ECE' | 'MECH' | 'EEE' | 'CIVIL';

interface Skill {
  id: string;
  name: string;
  category: string;
  benchmark: number; // industry expected %
}

interface Track {
  id: string;
  branch: EngineeringBranch;
  branchLabel: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  skills: Skill[];
}

interface SkillRatings {
  [skillId: string]: number; // 0-4 index → 0=None, 1=Beginner, 2=Familiar, 3=Proficient, 4=Expert
}

const LEVELS = ['None', 'Beginner', 'Familiar', 'Proficient', 'Expert'];
const LEVEL_PCT = [0, 25, 50, 75, 100]; // each level maps to a % value

// ─── Multi-Branch Track Definitions ──────────────────────────────────────────

const TRACKS: Track[] = [
  // ─── CSE / IT Tracks ─────────────────────────────
  {
    id: 'sde',
    branch: 'CSE',
    branchLabel: 'CSE / IT',
    label: 'Software Dev (SDE)',
    icon: <Code2 className="h-6 w-6" />,
    color: '#6A5F00',
    bgColor: '#FFE600',
    skills: [
      { id: 'dsa',        name: 'Data Structures & Algorithms', category: 'Core CS',      benchmark: 80 },
      { id: 'oop',        name: 'OOP & Design Patterns',        category: 'Core CS',      benchmark: 70 },
      { id: 'react',      name: 'React / Frontend',             category: 'Frontend',     benchmark: 75 },
      { id: 'nodejs',     name: 'Node.js / Backend',            category: 'Backend',      benchmark: 70 },
      { id: 'sql',        name: 'SQL & Databases',              category: 'Database',     benchmark: 65 },
      { id: 'sysdesign',  name: 'System Design',               category: 'Architecture', benchmark: 60 },
      { id: 'git',        name: 'Git & Version Control',        category: 'Tools',        benchmark: 75 },
      { id: 'docker',     name: 'Docker / DevOps Basics',       category: 'DevOps',       benchmark: 50 },
    ],
  },
  {
    id: 'data',
    branch: 'CSE',
    branchLabel: 'CSE / IT',
    label: 'Data Science & AI',
    icon: <BrainCircuit className="h-6 w-6" />,
    color: '#006B5B',
    bgColor: '#E6F4F1',
    skills: [
      { id: 'python',     name: 'Python Programming',           category: 'Core',         benchmark: 85 },
      { id: 'stats',      name: 'Statistics & Probability',     category: 'Math',         benchmark: 75 },
      { id: 'pandas',     name: 'Pandas & Data Wrangling',      category: 'Libraries',    benchmark: 80 },
      { id: 'ml',         name: 'ML Algorithms',                category: 'ML',           benchmark: 75 },
      { id: 'sklearn',    name: 'Scikit-learn / PyTorch',       category: 'Libraries',    benchmark: 70 },
      { id: 'sql2',       name: 'SQL for Analytics',            category: 'Database',     benchmark: 65 },
      { id: 'viz',        name: 'Data Visualization',           category: 'Reporting',    benchmark: 60 },
    ],
  },
  {
    id: 'devops',
    branch: 'CSE',
    branchLabel: 'CSE / IT',
    label: 'DevOps & Cloud Systems',
    icon: <Cloud className="h-6 w-6" />,
    color: '#004D88',
    bgColor: '#E8F0FE',
    skills: [
      { id: 'linux',      name: 'Linux & Shell Scripting',      category: 'OS',           benchmark: 80 },
      { id: 'docker2',    name: 'Docker & Containers',          category: 'Container',    benchmark: 85 },
      { id: 'k8s',        name: 'Kubernetes',                   category: 'Orchestration',benchmark: 70 },
      { id: 'cicd',       name: 'CI/CD Pipelines',             category: 'Automation',   benchmark: 75 },
      { id: 'aws',        name: 'AWS / Cloud Architecture',     category: 'Cloud',        benchmark: 70 },
      { id: 'terraform',  name: 'Terraform / IaC',              category: 'IaC',          benchmark: 60 },
    ],
  },

  // ─── ECE Tracks ──────────────────────────────────
  {
    id: 'embedded',
    branch: 'ECE',
    branchLabel: 'Electronics (ECE)',
    label: 'Embedded Systems & IoT',
    icon: <Cpu className="h-6 w-6" />,
    color: '#B45309',
    bgColor: '#FEF3C7',
    skills: [
      { id: 'emb_c',      name: 'Embedded C & C++',             category: 'Firmware',     benchmark: 85 },
      { id: 'arm_mcu',    name: 'ARM Cortex & Microcontrollers', category: 'Hardware',    benchmark: 80 },
      { id: 'comm_proto', name: 'Protocols (I2C, SPI, UART, CAN)', category: 'Interfaces',benchmark: 75 },
      { id: 'rtos',       name: 'FreeRTOS & Concurrency',       category: 'OS',           benchmark: 70 },
      { id: 'pcb_design', name: 'Schematics & PCB Design (KiCad)', category: 'Hardware',  benchmark: 60 },
      { id: 'iot_proto',  name: 'IoT & Wireless (MQTT, BLE, ESP32)', category: 'IoT',    benchmark: 70 },
    ],
  },
  {
    id: 'vlsi',
    branch: 'ECE',
    branchLabel: 'Electronics (ECE)',
    label: 'VLSI & Digital Circuit Design',
    icon: <CircuitBoard className="h-6 w-6" />,
    color: '#4338CA',
    bgColor: '#EEF2FF',
    skills: [
      { id: 'verilog',    name: 'Verilog / SystemVerilog',      category: 'HDL',          benchmark: 85 },
      { id: 'digital_log',name: 'Digital Logic & FSM Design',   category: 'Core Logic',   benchmark: 80 },
      { id: 'fpga',       name: 'FPGA Architecture & Vivado',   category: 'Synthesis',    benchmark: 70 },
      { id: 'cmos',       name: 'CMOS Fundamentals & Layout',   category: 'Physical',     benchmark: 65 },
      { id: 'sta',        name: 'Static Timing Analysis (STA)', category: 'Verification', benchmark: 60 },
      { id: 'comp_arch',  name: 'Computer Architecture & RISC-V', category: 'Architecture',benchmark: 70 },
    ],
  },

  // ─── Mechanical (MECH) Tracks ────────────────────
  {
    id: 'cad_mech',
    branch: 'MECH',
    branchLabel: 'Mechanical (MECH)',
    label: 'CAD/CAM & Product Design',
    icon: <Cog className="h-6 w-6" />,
    color: '#C2410C',
    bgColor: '#FFEDD5',
    skills: [
      { id: 'solidworks', name: 'SolidWorks / 3D Parametric CAD', category: 'Modeling',   benchmark: 85 },
      { id: 'autocad',    name: 'AutoCAD 2D Drafting & Standards', category: 'Drafting',   benchmark: 80 },
      { id: 'gdt',        name: 'Geometric Dimensioning (GD&T)', category: 'Design',     benchmark: 75 },
      { id: 'fea_ansys',  name: 'FEA & Stress Analysis (ANSYS)', category: 'Simulation', benchmark: 70 },
      { id: 'dfm',        name: 'Design for Manufacturing (DFM)', category: 'Production', benchmark: 65 },
      { id: 'materials',  name: 'Materials Science & Metallurgy', category: 'Core Mech',  benchmark: 70 },
    ],
  },
  {
    id: 'robotics',
    branch: 'MECH',
    branchLabel: 'Mechanical (MECH)',
    label: 'Robotics & Mechatronics',
    icon: <Compass className="h-6 w-6" />,
    color: '#0F766E',
    bgColor: '#CCFBF1',
    skills: [
      { id: 'kinematics', name: 'Kinematics & Robot Dynamics',  category: 'Robotics',     benchmark: 80 },
      { id: 'sensors',    name: 'Actuators, Motors & Sensors',  category: 'Hardware',     benchmark: 75 },
      { id: 'ros',        name: 'ROS (Robot Operating System)', category: 'Software',     benchmark: 65 },
      { id: 'plc_mech',   name: 'Industrial Automation & PLC',  category: 'Automation',   benchmark: 70 },
      { id: 'hydraulic',  name: 'Pneumatics & Fluid Power',     category: 'Core Mech',    benchmark: 65 },
    ],
  },

  // ─── Electrical (EEE) Tracks ─────────────────────
  {
    id: 'ev_tech',
    branch: 'EEE',
    branchLabel: 'Electrical (EEE)',
    label: 'EV Powertrain & Battery Systems',
    icon: <Zap className="h-6 w-6" />,
    color: '#15803D',
    bgColor: '#DCFCE7',
    skills: [
      { id: 'bms',        name: 'Battery Management Systems (BMS)', category: 'EV Core',  benchmark: 80 },
      { id: 'power_elec', name: 'Power Electronics (Inverters/Buck)', category: 'Circuits',benchmark: 85 },
      { id: 'motor_drives',name: 'BLDC / PMSM Motor Control',   category: 'Motors',       benchmark: 75 },
      { id: 'matlab',     name: 'MATLAB & Simulink Modeling',   category: 'Simulation',   benchmark: 80 },
      { id: 'ev_charging',name: 'EV Standards & Charging Protocols', category: 'Standards',benchmark: 65 },
    ],
  },
  {
    id: 'power_auto',
    branch: 'EEE',
    branchLabel: 'Electrical (EEE)',
    label: 'Power Systems & Automation',
    icon: <Server className="h-6 w-6" />,
    color: '#1E40AF',
    bgColor: '#DBEAFE',
    skills: [
      { id: 'plc_scada',  name: 'PLC & SCADA Industrial Control',category: 'Automation',  benchmark: 80 },
      { id: 'switchgear', name: 'Switchgear & Power Protection',category: 'Power',        benchmark: 75 },
      { id: 'elec_machines',name: 'Electrical Machines & Transformers', category: 'Machines',benchmark: 80 },
      { id: 'smart_grid', name: 'Smart Grids & Renewable Integration', category: 'Grid',  benchmark: 65 },
      { id: 'circuit_sim',name: 'Circuit Analysis (PSpice / ETAP)', category: 'Analysis', benchmark: 70 },
    ],
  },

  // ─── Civil (CIVIL) Tracks ────────────────────────
  {
    id: 'structural',
    branch: 'CIVIL',
    branchLabel: 'Civil (CIVIL)',
    label: 'Structural BIM & Design',
    icon: <Building2 className="h-6 w-6" />,
    color: '#7C2D12',
    bgColor: '#FFEDD5',
    skills: [
      { id: 'staad_etabs',name: 'STAAD.Pro / ETABS Analysis',   category: 'Structures',   benchmark: 85 },
      { id: 'revit_bim',  name: 'Autodesk Revit BIM Modeling',  category: 'BIM',          benchmark: 80 },
      { id: 'autocad_civ',name: 'AutoCAD Civil 2D/3D',          category: 'Drafting',     benchmark: 85 },
      { id: 'rcc_steel',  name: 'RCC & Steel Structure Design', category: 'Codes (IS 456)',benchmark: 75 },
      { id: 'concrete_tech',name: 'Concrete Mix Design & Testing', category: 'Materials', benchmark: 70 },
    ],
  },
  {
    id: 'survey_mgmt',
    branch: 'CIVIL',
    branchLabel: 'Civil (CIVIL)',
    label: 'Surveying & Project Planning',
    icon: <Compass className="h-6 w-6" />,
    color: '#065F46',
    bgColor: '#D1FAE5',
    skills: [
      { id: 'total_station',name: 'Total Station & GPS Surveying', category: 'Survey',    benchmark: 80 },
      { id: 'gis_mapping',name: 'GIS & Remote Sensing (QGIS)',  category: 'Geomatics',    benchmark: 65 },
      { id: 'cost_estimate',name: 'Quantity Surveying & Estimation', category: 'Costing', benchmark: 80 },
      { id: 'primavera',  name: 'Primavera P6 / MS Project',     category: 'Planning',     benchmark: 70 },
      { id: 'geotech',    name: 'Geotechnical & Soil Mechanics', category: 'Foundation',  benchmark: 70 },
    ],
  },
];

// ─── Comprehensive Multi-Branch Recommendations ──────────────────────────────

const RECOMMENDATIONS: Record<string, string> = {
  // CSE
  dsa:        'Practice LeetCode Medium problems daily — focus on Trees, Graphs & DP',
  oop:        'Build a mini project using SOLID principles and common design patterns',
  react:      'Complete React Hooks deep-dive + build a full CRUD app',
  nodejs:     'Build a REST API with Express + JWT auth + MongoDB',
  sql:        'Practice window functions, joins & query optimization on HackerRank',
  sysdesign:  'Study "Designing Data-Intensive Applications" + watch System Design Primer',
  git:        'Contribute to an open-source project; practice branching strategies',
  docker:     'Containerize a Node.js app and push to Docker Hub',
  python:     'Build end-to-end ML pipeline with Python — data → model → API',
  stats:      'Complete Khan Academy Statistics + work through prob/stats problems',
  pandas:     'Work through 30-days of Pandas challenges on LeetCode',
  ml:         'Implement 5 core ML algorithms from scratch in Python',
  sklearn:    'Build & evaluate 3 models using Scikit-learn on Kaggle datasets',
  sql2:       'Practice GROUP BY aggregations and window functions for analytics',
  viz:        'Create a Tableau or Matplotlib dashboard from a public dataset',
  linux:      'Complete Linux command line challenge on OverTheWire / TryHackMe',
  docker2:    'Build a multi-container app with Docker Compose',
  k8s:        'Deploy an app on minikube; learn pods, deployments & services',
  cicd:       'Set up a GitHub Actions pipeline with build, test & deploy stages',
  aws:        'Get AWS Cloud Practitioner certified — free practice exams available',
  terraform:  'Write Terraform config to provision a VPC + EC2 on AWS',

  // ECE
  emb_c:      'Master pointer arithmetic, bitwise operations, memory layout, and volatile keyword in C',
  arm_mcu:    'Configure STM32 or ESP32 peripherals (GPIO, Timers, ADC) using bare-metal or HAL',
  comm_proto: 'Build an I2C/SPI sensor reader with logic analyzer trace captures for interviews',
  rtos:       'Implement task prioritization, semaphores, and queues using FreeRTOS on an ESP32',
  pcb_design: 'Design a 2-layer buck converter or microcontroller breakout board in KiCad',
  iot_proto:  'Connect an ESP32 sensor to an MQTT broker with TLS encryption and live dashboard',
  verilog:    'Write synthesizable Verilog modules for synchronous FIFO, UART transmitter, and ALUs',
  digital_log:'Practice state machine (Moore/Mealy) minimization, setup/hold time timing budgets',
  fpga:       'Implement and test a 7-segment display driver or VGA signal generator on a Xilinx FPGA',
  cmos:       'Study CMOS inverter characteristics, RC delay models, and stick diagram rules',
  sta:        'Review clock skew, jitter, false paths, and multi-cycle path constraints in STA',
  comp_arch:  'Understand 5-stage RISC-V pipelined architecture, branch hazard resolutions and caches',

  // MECH
  solidworks: 'Complete Certified SolidWorks Associate (CSWA) practice parts and complex assemblies',
  autocad:    'Master 2D drafting with layer standards, section views, and tolerance notations',
  gdt:        'Study ASME Y14.5 standards: datum references, position tolerance, runout, and bonus tolerance',
  fea_ansys:  'Simulate static structural and modal frequency responses for a cantilever beam in ANSYS',
  dfm:        'Learn injection molding drafts, sheet metal bend allowances, and CNC tool clearance rules',
  materials:  'Review iron-carbon equilibrium diagrams, heat treatment cycles, and tensile stress-strain curves',
  kinematics: 'Calculate Forward and Inverse Kinematics using Denavit-Hartenberg (DH) parameters',
  sensors:    'Interface stepper/servo motors and quadrature encoders with microcontrollers',
  ros:        'Set up ROS 2 workspace, publish/subscribe custom topics, and simulate a mobile robot in Gazebo',
  plc_mech:   'Program ladder logic for pneumatic cylinder sequencing in automated assembly lines',
  hydraulic:  'Design hydraulic circuit schematics with directional control and pressure relief valves',

  // EEE
  bms:        'Study State of Charge (SOC) estimation, passive cell balancing, and thermal cutoff circuits',
  power_elec: 'Design and simulate Buck, Boost, and Full-Bridge Inverters with PWM control in MATLAB',
  motor_drives:'Implement Field Oriented Control (FOC) or Space Vector PWM for a 3-phase PMSM motor',
  matlab:     'Build a complete EV powertrain battery-to-wheel simulation model in MATLAB Simulink',
  ev_charging:'Study CCS2, CHAdeMO, and Type-2 AC/DC charging communication protocols',
  plc_scada:  'Configure Siemens or Allen-Bradley PLC tags and create an interactive SCADA monitoring screen',
  switchgear: 'Learn distance, differential, and overcurrent relay coordination for transformer protection',
  elec_machines:'Analyze synchronous generator phasor diagrams, induction motor torque-slip curves',
  smart_grid: 'Understand solar inverter grid synchronization, microgrids, and net-metering standards',
  circuit_sim:'Simulate transient responses and harmonic distortion in power networks using ETAP/PSpice',

  // CIVIL
  staad_etabs:'Model and analyze a G+5 residential building for dead, live, wind, and seismic loads in ETABS',
  revit_bim:  'Generate 3D structural BIM models with automated rebar detailing and clash detection',
  autocad_civ:'Draft building submission plans adhering to local municipal bye-laws and floor area ratios',
  rcc_steel:  'Design singly/doubly reinforced beams, columns, and footings according to IS 456 & IS 800',
  concrete_tech:'Practice M25/M30 concrete mix design calculations with water-cement ratio optimization',
  total_station:'Conduct closed-traverse topographical surveys and benchmark elevation transfer on site',
  gis_mapping:'Perform spatial query analysis and watershed catchment boundary delineation using QGIS',
  cost_estimate:'Prepare detailed Bills of Quantities (BOQ) and rate analysis using CPWD/PWD specifications',
  primavera:  'Generate Critical Path Method (CPM) schedules, Gantt charts, and resource leveling in Primavera',
  geotech:    'Review soil compaction, Terzaghi bearing capacity equations, and retaining wall earth pressure',
};

const STORAGE_KEY = 'skill_gap_data';

// ─── Helper ──────────────────────────────────────────────────────────────────

function getUserPct(rating: number): number {
  return LEVEL_PCT[rating] ?? 0;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: 'Choose Track' },
    { n: 2, label: 'Rate Skills' },
    { n: 3, label: 'View Gap' },
  ];
  return (
    <div className="flex items-center gap-0 w-full max-w-sm mx-auto mb-8">
      {steps.map((s, i) => {
        const done = step > s.n;
        const active = step === s.n;
        return (
          <div key={s.n} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all
                  ${done ? 'bg-[#6A5F00] text-white' : active ? 'bg-[#FFE600] text-[#6A5F00] ring-2 ring-[#FFE600]/60' : 'bg-[#F4EEDA] text-[#7C775F]'}`}
              >
                {done ? <CheckCircle2 className="h-4 w-4" /> : s.n}
              </div>
              <span className={`text-[10px] font-bold whitespace-nowrap ${active ? 'text-[#6A5F00]' : 'text-[#7C775F]'}`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mb-3 ${step > s.n ? 'bg-[#6A5F00]' : 'bg-[#CDC7AA]'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1: Track Selection with Multi-Branch Filtering ───────────────────────

function TrackSelector({
  onSelect,
  initialBranch,
}: {
  onSelect: (track: Track) => void;
  initialBranch: string;
}) {
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<string>(() => {
    // If student has a recognized branch, default to it, else 'All'
    return ['CSE', 'ECE', 'MECH', 'EEE', 'CIVIL'].includes(initialBranch) ? initialBranch : 'All';
  });

  const branchTabs = [
    { id: 'All', label: 'All Disciplines', icon: '🌟' },
    { id: 'CSE', label: 'CSE / IT', icon: '💻' },
    { id: 'ECE', label: 'ECE (Electronics)', icon: '⚡' },
    { id: 'MECH', label: 'MECH (Mechanical)', icon: '⚙️' },
    { id: 'EEE', label: 'EEE (Electrical)', icon: '🔌' },
    { id: 'CIVIL', label: 'Civil Engineering', icon: '🏗️' },
  ];

  const filteredTracks = useMemo(() => {
    if (selectedBranchFilter === 'All') return TRACKS;
    return TRACKS.filter((t) => t.branch === selectedBranchFilter);
  }, [selectedBranchFilter]);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-center">
        <h2 className="text-2xl font-black text-[#1E1C10] font-heading mb-1">
          Select Your Target Specialization Track
        </h2>
        <p className="text-xs sm:text-sm text-[#7C775F]">
          Curated core & software placement tracks across all engineering branches.
        </p>
      </div>

      {/* Branch Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-2xl mx-auto w-full justify-start sm:justify-center">
        {branchTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedBranchFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedBranchFilter === tab.id
                ? 'bg-[#FFE600] text-[#1E1C10] shadow-sm font-black'
                : 'bg-white border border-[#CDC7AA]/40 text-[#7C775F] hover:bg-[#FAF3DF] hover:text-[#1E1C10]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
        {filteredTracks.map((track) => (
          <button
            key={track.id}
            onClick={() => onSelect(track)}
            className="flex items-center gap-4 p-5 bg-white border-2 border-[#CDC7AA]/40 rounded-2xl
                       hover:border-[#FFE600] hover:shadow-md hover:-translate-y-0.5 transition-all text-left group cursor-pointer"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 shadow-sm"
              style={{ backgroundColor: track.bgColor, color: track.color }}
            >
              {track.icon}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C775F] block">
                {track.branchLabel}
              </span>
              <p className="font-black text-[#1E1C10] text-sm truncate">{track.label}</p>
              <p className="text-[11px] text-[#7C775F] mt-0.5">{track.skills.length} core competencies</p>
            </div>
            <ChevronRight className="h-4 w-4 text-[#CDC7AA] group-hover:text-[#6A5F00] group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Step 2: Skill Rating ─────────────────────────────────────────────────────

function SkillRater({
  track,
  ratings,
  onRate,
  onSubmit,
  onBack,
}: {
  track: Track;
  ratings: SkillRatings;
  onRate: (skillId: string, level: number) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const totalSkills = track.skills.length;
  const rated = track.skills.filter((s) => ratings[s.id] !== undefined).length;
  const allRated = rated === totalSkills;

  const LEVEL_COLORS = [
    'bg-[#F0F0F0] text-[#999]',          // None
    'bg-[#FFE6E6] text-[#C0392B]',        // Beginner
    'bg-[#FFF3CD] text-[#856404]',        // Familiar
    'bg-[#D4EDDA] text-[#155724]',        // Proficient
    'bg-[#FFE600] text-[#6A5F00]',        // Expert
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
              style={{ backgroundColor: track.bgColor, color: track.color }}
            >
              {track.icon}
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#7C775F] uppercase block">{track.branchLabel}</span>
              <h2 className="text-xl font-black text-[#1E1C10] font-heading">{track.label}</h2>
            </div>
          </div>
          <p className="text-sm text-[#7C775F]">Rate your confidence in each topic from None to Expert.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#7C775F]">{rated}/{totalSkills} rated</span>
          <div className="w-24 h-2 bg-[#F4EEDA] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FFE600] rounded-full transition-all duration-500"
              style={{ width: `${(rated / totalSkills) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Skill cards */}
      <div className="flex flex-col gap-3">
        {track.skills.map((skill) => {
          const currentLevel = ratings[skill.id] ?? undefined;
          return (
            <div
              key={skill.id}
              className="bg-white border border-[#CDC7AA]/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <div className="flex-1">
                <p className="text-sm font-bold text-[#1E1C10]">{skill.name}</p>
                <p className="text-[11px] text-[#7C775F]">{skill.category}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {LEVELS.map((level, idx) => (
                  <button
                    key={level}
                    onClick={() => onRate(skill.id, idx)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer
                      ${currentLevel === idx
                        ? `${LEVEL_COLORS[idx]} border-transparent scale-105 shadow-sm`
                        : 'bg-[#FAF3DF] text-[#7C775F] border-[#CDC7AA]/40 hover:border-[#FFE600] hover:bg-white'
                      }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="text-sm font-bold text-[#7C775F] hover:text-[#1E1C10] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          ← Change Track
        </button>
        <button
          onClick={onSubmit}
          disabled={!allRated}
          className={`px-6 py-2.5 rounded-full text-sm font-black transition-all
            ${allRated
              ? 'bg-[#FFE600] text-[#6A5F00] hover:scale-105 shadow-md cursor-pointer'
              : 'bg-[#F4EEDA] text-[#CDC7AA] cursor-not-allowed'}`}
        >
          {allRated ? 'Analyze My Placement Readiness →' : `Rate ${totalSkills - rated} more topic${totalSkills - rated !== 1 ? 's' : ''}`}
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Results ──────────────────────────────────────────────────────────

function GapResults({
  track,
  ratings,
  onRetake,
}: {
  track: Track;
  ratings: SkillRatings;
  onRetake: () => void;
}) {
  type SkillResult = {
    skill: Skill;
    userPct: number;
    benchmarkPct: number;
    gap: number;
    status: 'strong' | 'on-track' | 'gap';
  };

  const results: SkillResult[] = track.skills.map((skill) => {
    const userPct = getUserPct(ratings[skill.id] ?? 0);
    const gap = skill.benchmark - userPct;
    const status: SkillResult['status'] =
      gap <= 0 ? 'strong' : gap <= 15 ? 'on-track' : 'gap';
    return { skill, userPct, benchmarkPct: skill.benchmark, gap, status };
  });

  const strong = results.filter((r) => r.status === 'strong');
  const onTrack = results.filter((r) => r.status === 'on-track');
  const gapSkills = results.filter((r) => r.status === 'gap');

  const avgUserPct = Math.round(results.reduce((s, r) => s + r.userPct, 0) / results.length);
  const avgBenchmark = Math.round(results.reduce((s, r) => s + r.benchmarkPct, 0) / results.length);
  const overallMatch = Math.min(100, Math.round((avgUserPct / avgBenchmark) * 100));

  const STATUS_META = {
    strong: {
      label: 'Strong',
      barColor: 'bg-[#16A34A]',
      badgeClass: 'bg-[#D4EDDA] text-[#155724]',
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    },
    'on-track': {
      label: 'On Track',
      barColor: 'bg-[#FFE600]',
      badgeClass: 'bg-[#FFF3CD] text-[#856404]',
      icon: <Flame className="h-3.5 w-3.5" />,
    },
    gap: {
      label: 'Needs Focus',
      barColor: 'bg-[#EF4444]',
      badgeClass: 'bg-[#FFE6E6] text-[#C0392B]',
      icon: <AlertTriangle className="h-3.5 w-3.5" />,
    },
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Top summary row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Overall Match */}
        <div className="bg-white border border-[#CDC7AA]/40 rounded-2xl p-5 flex flex-col items-center text-center">
          <div className="relative w-20 h-20 mb-3">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="#F4EEDA" strokeWidth="8" />
              <circle
                cx="40" cy="40" r="34" fill="none"
                stroke={overallMatch >= 75 ? '#16A34A' : overallMatch >= 50 ? '#FFE600' : '#EF4444'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - overallMatch / 100)}`}
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-black text-[#1E1C10]">
              {overallMatch}%
            </span>
          </div>
          <p className="text-xs font-bold text-[#7C775F]">Core Placement Readiness</p>
          <p className="text-[11px] text-[#7C775F] mt-0.5">{track.label} Benchmark</p>
        </div>

        {/* Counts */}
        <div className="sm:col-span-2 grid grid-cols-3 gap-3">
          <div className="bg-[#D4EDDA] rounded-2xl p-4 flex flex-col items-center text-center">
            <span className="text-2xl font-black text-[#155724]">{strong.length}</span>
            <p className="text-[11px] font-bold text-[#155724] mt-1">Ready</p>
            <CheckCircle2 className="h-4 w-4 text-[#16A34A] mt-1" />
          </div>
          <div className="bg-[#FFF3CD] rounded-2xl p-4 flex flex-col items-center text-center">
            <span className="text-2xl font-black text-[#856404]">{onTrack.length}</span>
            <p className="text-[11px] font-bold text-[#856404] mt-1">On Track</p>
            <Flame className="h-4 w-4 text-[#D97706] mt-1" />
          </div>
          <div className="bg-[#FFE6E6] rounded-2xl p-4 flex flex-col items-center text-center">
            <span className="text-2xl font-black text-[#C0392B]">{gapSkills.length}</span>
            <p className="text-[11px] font-bold text-[#C0392B] mt-1">Gaps to Bridge</p>
            <TrendingDown className="h-4 w-4 text-[#EF4444] mt-1" />
          </div>
        </div>
      </div>

      {/* Skill bars */}
      <div className="bg-white border border-[#CDC7AA]/40 rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-[#1E1C10]">Competency Breakdown vs Cutoff</h3>
          <span className="text-xs font-bold text-[#7C775F]">{track.branchLabel}</span>
        </div>

        <div className="flex flex-col gap-4">
          {results
            .sort((a, b) => b.gap - a.gap)
            .map(({ skill, userPct, benchmarkPct, status }) => {
              const meta = STATUS_META[status];
              return (
                <div key={skill.id} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#1E1C10] flex items-center gap-1.5">
                      {skill.name}
                    </span>
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${meta.badgeClass}`}>
                      {meta.icon}
                      {meta.label}
                    </div>
                  </div>
                  {/* Double bar: benchmark behind, user on top */}
                  <div className="relative w-full h-3.5 bg-[#F4EEDA] rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 h-full bg-[#CDC7AA]/60 rounded-full"
                      style={{ width: `${benchmarkPct}%` }}
                    />
                    <div
                      className={`absolute top-0 h-full rounded-full transition-all duration-1000 ${meta.barColor}`}
                      style={{ width: `${userPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[#7C775F]">
                    <span>Current: {userPct}%</span>
                    <span>Industry Benchmark: {benchmarkPct}%</span>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex items-center gap-4 text-[10px] font-bold text-[#7C775F] pt-1 border-t border-[#F4EEDA]">
          <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded bg-[#CDC7AA]/60 inline-block" /> Recruiter Expectation</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded bg-[#16A34A] inline-block" /> Your Self Rating</span>
        </div>
      </div>

      {/* Priority recommendations */}
      {gapSkills.length > 0 && (
        <div className="bg-white border border-[#CDC7AA]/40 rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-[#6A5F00]" />
            <h3 className="text-base font-black text-[#1E1C10]">Target Action Plan for Campus Drives</h3>
          </div>
          <div className="flex flex-col gap-3">
            {gapSkills
              .sort((a, b) => b.gap - a.gap)
              .slice(0, 4)
              .map(({ skill, gap }) => (
                <div
                  key={skill.id}
                  className="flex items-start gap-3 p-3.5 bg-[#FAF3DF] border border-[#CDC7AA]/40 rounded-xl hover:border-[#FFE600] hover:bg-white transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#FFE600] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <BookOpen className="h-4 w-4 text-[#6A5F00]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-xs font-black text-[#1E1C10]">{skill.name}</p>
                      <span className="text-[10px] font-bold text-[#C0392B] bg-[#FFE6E6] px-1.5 py-0.5 rounded-full">
                        -{gap}% gap
                      </span>
                    </div>
                    <p className="text-[11px] text-[#4B4731] leading-relaxed">
                      {RECOMMENDATIONS[skill.id] ?? 'Focus on fundamental concepts and complete laboratory/hands-on projects.'}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Already strong */}
      {strong.length > 0 && (
        <div className="bg-[#F0FFF4] border border-[#16A34A]/20 rounded-2xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-[#16A34A]" />
            <h4 className="text-sm font-black text-[#155724]">Core Strengths Ready for Technical Interviews</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {strong.map(({ skill }) => (
              <span key={skill.id} className="px-3 py-1 bg-[#D4EDDA] text-[#155724] text-xs font-bold rounded-full">
                ✓ {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Re-take */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-[#7C775F]">Results saved locally for {track.label}.</p>
        <button
          onClick={onRetake}
          className="flex items-center gap-2 px-4 py-2 bg-[#FAF3DF] border border-[#CDC7AA]/40 text-[#6A5F00] text-xs font-bold rounded-full hover:border-[#FFE600] hover:bg-white transition-all cursor-pointer shadow-sm"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Assess Another Discipline
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type Step = 'track' | 'rate' | 'result';

interface SavedState {
  trackId: string;
  ratings: SkillRatings;
  step: Step;
}

export default function SkillGapPage() {
  const { studentBranch } = useAuth();
  const [step, setStep] = useState<Step>('track');
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [ratings, setRatings] = useState<SkillRatings>({});

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: SavedState = JSON.parse(raw);
        const track = TRACKS.find((t) => t.id === saved.trackId);
        if (track) {
          setSelectedTrack(track);
          setRatings(saved.ratings);
          setStep(saved.step);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist whenever state changes
  useEffect(() => {
    if (selectedTrack) {
      const toSave: SavedState = { trackId: selectedTrack.id, ratings, step };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    }
  }, [selectedTrack, ratings, step]);

  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track);
    setRatings({});
    setStep('rate');
  };

  const handleRate = (skillId: string, level: number) => {
    setRatings((prev) => ({ ...prev, [skillId]: level }));
  };

  const handleSubmit = () => setStep('result');

  const handleRetake = () => {
    setStep('track');
    setSelectedTrack(null);
    setRatings({});
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="space-y-6 pb-16 w-full font-sans max-w-3xl mx-auto">
      <PageHeader
        title="Multi-Branch Skill Gap Analyzer"
        description="Benchmark your technical skills against real placement criteria across CSE, ECE, MECH, EEE, and Civil disciplines."
        icon={<TrendingUp className="h-6 w-6 text-[#6A5F00]" />}
        badge={<Badge variant="cyprus">Universal Diagnostics</Badge>}
        actions={
          step !== 'track' && (
            <button
              onClick={handleRetake}
              className="flex items-center gap-1.5 text-xs font-bold text-[#7C775F] hover:text-[#1E1C10] transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Switch Track
            </button>
          )
        }
      />

      {/* Step indicator */}
      <StepIndicator step={step === 'track' ? 1 : step === 'rate' ? 2 : 3} />

      {/* Content panel */}
      <div className="bg-[#FAF3DF]/60 border border-[#CDC7AA]/40 rounded-3xl p-6 sm:p-8 shadow-sm">
        {step === 'track' && (
          <TrackSelector
            onSelect={handleTrackSelect}
            initialBranch={studentBranch}
          />
        )}
        {step === 'rate' && selectedTrack && (
          <SkillRater
            track={selectedTrack}
            ratings={ratings}
            onRate={handleRate}
            onSubmit={handleSubmit}
            onBack={handleRetake}
          />
        )}
        {step === 'result' && selectedTrack && (
          <GapResults
            track={selectedTrack}
            ratings={ratings}
            onRetake={handleRetake}
          />
        )}
      </div>
    </div>
  );
}
