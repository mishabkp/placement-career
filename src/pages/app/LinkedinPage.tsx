import { useState, useEffect, useMemo } from 'react';
import {
  SmartToy,
  AutoAwesome,
  Verified,
  TrendingUp,
  Linkedin,
} from '../../components/icons/StitchIcons';
import {
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Eye,
  Zap,
  TrendingUp as TrendingUpIcon,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeadlineVariation {
  type: string;
  text: string;
  tag: string;
  impact: string;
}

interface BranchLinkedinConfig {
  branchTitle: string;
  keywords: string;
  headlineVariations: HeadlineVariation[];
  autoTweakHeadline: string;
  networkReach: string;
  auditTips: { title: string; desc: string; iconBg: string }[];
}

const BRANCH_LINKEDIN_DATA: Record<string, BranchLinkedinConfig> = {
  CSE: {
    branchTitle: 'Computer Science & Software Engineering',
    keywords: 'React, TypeScript, Node.js, CSE \'26, SDE Intern, Cloud',
    networkReach: '1.4k alumni & tech recruiters',
    headlineVariations: [
      {
        type: 'sde',
        text: "Aspiring Full-Stack Software Engineer | React, TypeScript, Node.js, Python | CSE @ MGM '26 | Open to SDE Internships & Full-Time Roles",
        tag: 'Role Specific (SDE)',
        impact: 'High Technical Impact',
      },
      {
        type: 'cloud',
        text: "Cloud & Distributed Systems Enthusiast | Docker, AWS, Go, Microservices | Top 1% Hackathon Winner | MGM '26",
        tag: 'Cloud & Systems',
        impact: 'Scale & Architecture Driven',
      },
      {
        type: 'dsa',
        text: "Passionate Problem Solver | 400+ LeetCode (Knight) | Full-Stack Developer (MERN) | Seeking SDE '26 Opportunities",
        tag: 'DSA & Algorithms',
        impact: 'Competitive Coding Proof',
      },
    ],
    autoTweakHeadline:
      "High-Performance Full-Stack Engineer | React, TypeScript, Microservices | CSE @ MGM '26 | Building Scalable Cloud Systems",
    auditTips: [
      {
        title: 'Featured GitHub Project Links',
        desc: 'Pin your top 2 full-stack projects with live demo URLs and Clean Architecture READMEs.',
        iconBg: 'bg-[#FFE600]',
      },
      {
        title: 'Technical Skills Endorsements',
        desc: 'Rearrange top 3 endorsed skills to: Data Structures, React, and System Design.',
        iconBg: 'bg-[#00F5D4]',
      },
    ],
  },

  ECE: {
    branchTitle: 'Electronics & Communication Engineering',
    keywords: 'Embedded C, ARM Cortex, Verilog, FreeRTOS, ECE \'26, STM32, VLSI',
    networkReach: '1.1k semiconductor & core electronics recruiters',
    headlineVariations: [
      {
        type: 'embedded',
        text: "Embedded Systems & Firmware Engineer | Embedded C/C++, ARM Cortex, STM32, FreeRTOS | ECE @ MGM '26 | Seeking Core Electronics Roles",
        tag: 'Embedded Systems',
        impact: 'Core Hardware & Firmware',
      },
      {
        type: 'vlsi',
        text: "VLSI & Digital ASIC Design Enthusiast | Verilog HDL, FPGA (Vivado), RTL Synthesis, STA | ECE @ MGM '26",
        tag: 'VLSI & Chip Design',
        impact: 'Silicon & Architecture Focus',
      },
      {
        type: 'iot',
        text: "IoT & Wireless Hardware Developer | KiCad PCB Design, ESP32, MQTT, BLE | Building Smart Connected Devices | MGM '26",
        tag: 'IoT & Hardware',
        impact: 'Hands-on Prototype Driven',
      },
    ],
    autoTweakHeadline:
      "Embedded Systems & Firmware Engineer | C/C++, ARM Cortex, FreeRTOS, KiCad PCB | ECE @ MGM '26 | Building Reliable Hardware Solutions",
    auditTips: [
      {
        title: 'Hardware Portfolio & Schematics',
        desc: 'Feature your KiCad PCB schematics, oscillogram captures, and STM32 firmware repositories.',
        iconBg: 'bg-[#FFE600]',
      },
      {
        title: 'Core ECE Skill Endorsements',
        desc: 'Prioritize top 3 skills: Embedded C, Microcontrollers (ARM), and Digital Electronics.',
        iconBg: 'bg-[#00F5D4]',
      },
    ],
  },

  EEE: {
    branchTitle: 'Electrical & Electronics Engineering',
    keywords: 'Power Systems, MATLAB, Simulink, EV BMS, PLC, EEE \'26, Inverters',
    networkReach: '950+ core energy, power & EV engineering recruiters',
    headlineVariations: [
      {
        type: 'ev',
        text: "Aspiring Electrical & EV Systems Engineer | MATLAB, Simulink, Battery Management (BMS), Power Electronics | EEE @ MGM '26",
        tag: 'EV & Battery Tech',
        impact: 'CleanTech & E-Mobility',
      },
      {
        type: 'automation',
        text: "Industrial Automation & Power Engineer | PLC, SCADA, Switchgear & Relay Protection | EEE @ MGM '26 | Open to GET Roles",
        tag: 'Power & Automation',
        impact: 'Grid & Industrial Control',
      },
      {
        type: 'motors',
        text: "Electrical Engineering Graduate | Motor Drives (BLDC/PMSM), High Voltage Safety, ETAP Simulation | Seeking Core Placements",
        tag: 'Core Machines & Drives',
        impact: 'Simulation & Power Design',
      },
    ],
    autoTweakHeadline:
      "High-Impact Electrical Systems Engineer | MATLAB, Simulink, Power Electronics, BMS | EEE @ MGM '26 | Designing Smart Grid & EV Powertrains",
    auditTips: [
      {
        title: 'Simulink Models & Project Media',
        desc: 'Add video demos or block diagrams of your EV Powertrain simulation or PLC ladder logic projects.',
        iconBg: 'bg-[#FFE600]',
      },
      {
        title: 'Core EEE Skill Endorsements',
        desc: 'Arrange top 3 skills: MATLAB/Simulink, Power Electronics, and PLC/SCADA Automation.',
        iconBg: 'bg-[#00F5D4]',
      },
    ],
  },

  MECH: {
    branchTitle: 'Mechanical Engineering',
    keywords: 'SolidWorks, AutoCAD 3D, GD&T, ANSYS FEA, DFM, MECH \'26, Robotics',
    networkReach: '1.2k automotive, manufacturing & aerospace recruiters',
    headlineVariations: [
      {
        type: 'cad',
        text: "Mechanical Design & Product Development Engineer | SolidWorks, AutoCAD, GD&T, FEA/ANSYS | MECH @ MGM '26 | Seeking Core GET Roles",
        tag: 'CAD & Product Design',
        impact: 'Design for Manufacturing (DFM)',
      },
      {
        type: 'robotics',
        text: "Robotics & Industrial Mechatronics Enthusiast | Kinematics, ROS, Actuators, SolidWorks | MECH @ MGM '26",
        tag: 'Robotics & Automation',
        impact: 'Mechatronics & Dynamics',
      },
      {
        type: 'auto',
        text: "Automotive & Thermal Systems Engineer | Powertrain Analysis, Manufacturing Tech, Materials Science | Seeking Core Placements",
        tag: 'Automotive & Thermal',
        impact: 'Fabrication & Prototyping',
      },
    ],
    autoTweakHeadline:
      "Mechanical Design Engineer | SolidWorks, ANSYS FEA, GD&T, DFM | MECH @ MGM '26 | Delivering Precision Engineered Hardware",
    auditTips: [
      {
        title: 'CAD 3D Model Portfolio',
        desc: 'Include GrabCAD or PDF render links of complex mechanical assemblies and CSWA certifications.',
        iconBg: 'bg-[#FFE600]',
      },
      {
        title: 'Core Mech Skill Endorsements',
        desc: 'Pin top 3 skills: SolidWorks (CAD), GD&T (ASME Y14.5), and Finite Element Analysis (FEA).',
        iconBg: 'bg-[#00F5D4]',
      },
    ],
  },

  CIVIL: {
    branchTitle: 'Civil Engineering',
    keywords: 'STAAD.Pro, Revit BIM, AutoCAD Civil, BOQ, CIVIL \'26, Construction',
    networkReach: '850+ infrastructure, structural & construction recruiters',
    headlineVariations: [
      {
        type: 'bim',
        text: "Structural BIM & Design Engineer | STAAD.Pro, ETABS, Autodesk Revit, AutoCAD Civil | CIVIL @ MGM '26 | Open to Structural Engineering Roles",
        tag: 'Structural BIM & Design',
        impact: 'IS Codes & RCC Modeling',
      },
      {
        type: 'site',
        text: "Civil Site Planning & Quantity Surveying Engineer | Total Station, Primavera P6, BOQ Estimation | MGM '26",
        tag: 'Site & Project Planning',
        impact: 'Costing & Timeline Execution',
      },
      {
        type: 'geo',
        text: "Geotechnical & Construction Quality Engineer | IS 456 RCC Design, Quality Testing (QA/QC), Concrete Tech | Seeking Core Placements",
        tag: 'Construction QA/QC',
        impact: 'Quality & Material Testing',
      },
    ],
    autoTweakHeadline:
      "Structural BIM Engineer | STAAD.Pro, ETABS, Autodesk Revit | CIVIL @ MGM '26 | Engineering Safe & Sustainable Infrastructure",
    auditTips: [
      {
        title: 'Structural BIM Drawings & Submission Sheets',
        desc: 'Feature Revit 3D renders, elevation drawings, and structural load analysis reports.',
        iconBg: 'bg-[#FFE600]',
      },
      {
        title: 'Core Civil Skill Endorsements',
        desc: 'Highlight top 3 skills: STAAD.Pro / ETABS, AutoCAD Civil 3D, and Quantity Estimation.',
        iconBg: 'bg-[#00F5D4]',
      },
    ],
  },
};

export default function LinkedinPage() {
  const { user, studentBranch } = useAuth();

  const config = useMemo(() => {
    return BRANCH_LINKEDIN_DATA[studentBranch] || BRANCH_LINKEDIN_DATA['CSE'];
  }, [studentBranch]);

  const [activeTab, setActiveTab] = useState<string>(config.headlineVariations[0].type);
  const [headline, setHeadline] = useState<string>(config.headlineVariations[0].text);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync headline when student changes branch in header
  useEffect(() => {
    setActiveTab(config.headlineVariations[0].type);
    setHeadline(config.headlineVariations[0].text);
  }, [config]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(headline);
    setCopied(true);
    showToast('Headline copied to clipboard! Ready to paste into LinkedIn.');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAutoTweak = () => {
    setHeadline(config.autoTweakHeadline);
    showToast('✨ Pal-Bot tweaked headline for maximum core recruiter visibility!');
  };

  const handleApplyVariation = (item: HeadlineVariation) => {
    setActiveTab(item.type);
    setHeadline(item.text);
    showToast(`Applied "${item.tag}" headline format!`);
  };

  return (
    <div className="space-y-8 pb-16 w-full font-sans text-[#1E1C10]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-[#FFE600] px-5 py-3 rounded-2xl shadow-2xl border border-[#FFE600]/40 flex items-center gap-3 animate-bounce">
          <SmartToy className="h-5 w-5 text-[#FFE600]" />
          <span className="text-xs font-bold text-white">{toastMessage}</span>
        </div>
      )}

      {/* ─── Top Bar / Status Pill ─── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#7C775F]">
          <span>Dashboard</span>
          <span>&gt;</span>
          <span className="text-[#1E1C10]">LinkedIn Profile Optimizer</span>
          <span className="px-2 py-0.5 rounded-full bg-[#FFE600] text-[#726600] text-[10px] font-black">
            {studentBranch} Discipline
          </span>
        </div>
        <div className="flex items-center gap-2 bg-[#FAF3DF] px-3.5 py-1 rounded-full border border-[#CDC7AA]/30 text-xs font-bold text-[#006B5B]">
          <span className="w-2 h-2 rounded-full bg-[#006B5B] animate-pulse" />
          <span>LinkedIn Sync Status: Active for {studentBranch}</span>
        </div>
      </div>

      {/* ─── Header & Title Area ─── */}
      <div className="relative bg-[#F4EEDA] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#CDC7AA]/40 overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#FFE600]/25 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-[#0077B5] flex items-center justify-center text-white shadow-md shrink-0">
            <Linkedin className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1E1C10] tracking-tight">
                LinkedIn Profile Optimizer
              </h1>
              <span className="px-3 py-1 rounded-full bg-[#FFE600] text-[#726600] font-black text-xs uppercase tracking-wider shadow-sm">
                Recruiter Magnet 🧲
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#4B4731] max-w-2xl font-medium leading-relaxed">
              Tailored for <strong>{config.branchTitle}</strong> placements. Optimize your headline, keyword density, and technical project visibility to attract core recruiters.
            </p>
          </div>
        </div>

        {/* CTA Action Group */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10 shrink-0">
          <button
            onClick={() =>
              document.getElementById('headline-studio')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="flex items-center gap-2 bg-[#FFE600] text-[#1A1A1A] font-bold text-xs px-5 py-3 rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform border border-[#CDC7AA]/40 cursor-pointer"
          >
            <AutoAwesome className="h-4 w-4 text-[#6A5F00]" />
            <span>AI Headline Generator</span>
          </button>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-[#1E1C10] font-bold text-xs px-4 py-3 rounded-full hover:bg-[#FAF3DF] transition-colors shadow-sm border border-[#CDC7AA]/30"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Open LinkedIn</span>
          </a>
        </div>
      </div>

      {/* ─── Top Metric Bento Grid (4 Cards) ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Card 1: Completeness */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7C775F] uppercase tracking-wider">
              Profile Completeness
            </span>
            <Verified className="h-4 w-4 text-[#006B5B]" />
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-heading text-4xl font-black text-[#1E1C10]">92%</span>
            <span className="text-xs font-bold text-[#006B5B]">Top 5% Tier</span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full bg-[#FAF3DF] rounded-full h-2.5 overflow-hidden">
              <div className="bg-[#00F5D4] h-full rounded-full" style={{ width: '92%' }} />
            </div>
            <p className="text-[11px] text-[#4B4731] font-semibold">
              All-Star Badge Active 🏆 ({user.college.split(' ')[0]} Verified)
            </p>
          </div>
        </div>

        {/* Card 2: Search Appearances with Branch Keywords */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7C775F] uppercase tracking-wider">
              Search Appearances
            </span>
            <Eye className="h-4 w-4 text-[#6A5F00]" />
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-heading text-4xl font-black text-[#1E1C10]">
              54 <span className="text-xs font-bold text-[#7C775F]">/ wk</span>
            </span>
            <span className="text-xs font-bold text-[#006B5B] bg-[#00F5D4]/20 px-2 py-0.5 rounded-full">
              +24%
            </span>
          </div>
          <p className="text-[11px] text-[#4B4731] font-semibold line-clamp-2">
            Keywords: {config.keywords}
          </p>
        </div>

        {/* Card 3: Headline Impact */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7C775F] uppercase tracking-wider">
              Headline Impact
            </span>
            <Zap className="h-4 w-4 text-[#6A5F00]" />
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-heading text-4xl font-black text-[#1E1C10]">Strong</span>
            <span className="text-lg">⚡</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex gap-1 h-2">
              <div className="flex-1 bg-[#FFE600] rounded-full" />
              <div className="flex-1 bg-[#FFE600] rounded-full" />
              <div className="flex-1 bg-[#FFE600] rounded-full" />
              <div className="flex-1 bg-[#FAF3DF] rounded-full" />
            </div>
            <p className="text-[11px] text-[#4B4731] font-semibold truncate">
              {studentBranch} role target & core competencies
            </p>
          </div>
        </div>

        {/* Card 4: SSI Score */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7C775F] uppercase tracking-wider">
              Social Selling Index
            </span>
            <TrendingUpIcon className="h-4 w-4 text-[#006B5B]" />
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-heading text-4xl font-black text-[#1E1C10]">81</span>
            <span className="text-xs font-bold text-[#7C775F]">/ 100</span>
            <span className="text-xs font-bold text-[#6A5F00] ml-auto">Top 6%</span>
          </div>
          <p className="text-[11px] text-[#4B4731] font-semibold truncate">
            {config.networkReach}
          </p>
        </div>
      </div>

      {/* ─── Interactive AI Headline & Pitch Studio ─── */}
      <div
        id="headline-studio"
        className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FFE600]" />
            <h2 className="font-heading text-xl font-black text-[#1E1C10]">
              AI Headline & Pitch Studio ({studentBranch})
            </h2>
            <span className="bg-[#6A5F00] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              Branch Optimized
            </span>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center bg-[#FAF3DF] p-1 rounded-full border border-[#CDC7AA]/30 text-xs font-bold flex-wrap gap-1">
            {config.headlineVariations.map((item) => (
              <button
                key={item.type}
                onClick={() => handleApplyVariation(item)}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                  activeTab === item.type
                    ? 'bg-white text-[#1E1C10] shadow-sm font-black'
                    : 'text-[#4B4731] hover:text-[#1E1C10]'
                }`}
              >
                {item.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Active Terminal Box */}
        <div className="relative bg-[#1A1A1A] text-white rounded-2xl p-5 shadow-md flex flex-col gap-3">
          <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F5D4]" />
              <span className="ml-2">headline_{studentBranch.toLowerCase()}.txt</span>
            </div>
            <span>{headline.length} / 220 chars</span>
          </div>

          <textarea
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            rows={3}
            className="w-full bg-transparent text-white font-mono text-xs sm:text-sm font-medium focus:outline-none resize-none leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-700">
            <div className="flex items-center gap-1.5 text-[#00F5D4] text-xs font-semibold">
              <TrendingUp className="h-4 w-4" />
              <span>Predicted Recruiter Click-Through: <strong>+4.5x higher for {studentBranch} campus hiring</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-[#00F5D4]" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>

              <button
                onClick={handleAutoTweak}
                className="flex items-center gap-1.5 bg-[#FFE600] text-[#1A1A1A] text-xs font-bold px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Pal-Bot Auto-Tweak</span>
              </button>
            </div>
          </div>
        </div>

        {/* Alternative Variations */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C775F]">
            Recommended Variations for {studentBranch} Placement Season:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {config.headlineVariations.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FAF3DF]/60 p-4 rounded-2xl flex flex-col justify-between gap-3 border border-[#CDC7AA]/30 hover:bg-[#FAF3DF] transition-colors"
              >
                <p className="text-xs text-[#1E1C10] font-medium leading-relaxed">
                  "{item.text}"
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[#CDC7AA]/20">
                  <span className="text-[11px] font-bold text-[#006B5B]">{item.impact}</span>
                  <button
                    onClick={() => handleApplyVariation(item)}
                    className="bg-white hover:bg-[#FFE600] text-[#1A1A1A] px-3 py-1 rounded-full text-xs font-bold transition-colors border border-[#CDC7AA]/30 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Profile Sections Audit & Branch Tips ─── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-[#6A5F00]" />
            <h2 className="font-heading text-xl font-black text-[#1E1C10]">
              {studentBranch} Recruiter Audit Checklist
            </h2>
          </div>
          <span className="text-xs font-bold text-[#006B5B] bg-[#00F5D4]/20 px-3 py-1 rounded-full">
            Role Alignment Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {config.auditTips.map((tip, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-5 shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl ${tip.iconBg} flex items-center justify-center text-[#1E1C10] font-bold text-xs shadow-xs`}>
                    <Award className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#1E1C10]">{tip.title}</h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00F5D4]/20 text-[#006B5B]">
                  High Impact
                </span>
              </div>
              <p className="text-xs text-[#4B4731] leading-relaxed mt-1">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
