import { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '../../components/shared/PageHeader';
import { useAuth } from '../../context/AuthContext';
import {
  Mic,
  SmartToy,
  PlayArrow,
  Timer,
  Insights,
  Groups,
  Close,
  CheckCircle2,
} from '../../components/icons/StitchIcons';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

interface RoleInterviewData {
  title: string;
  category: string;
  questions: string[];
}

const BRANCH_INTERVIEW_DATA: Record<string, RoleInterviewData[]> = {
  CSE: [
    {
      title: 'Fullstack Engineer',
      category: 'Software Engineering',
      questions: [
        'Could you walk me through how you optimize state management in a large-scale React application?',
        'How do you design a database schema for handling millions of concurrent chat messages in PostgreSQL or MongoDB?',
        'Describe a challenging bug you encountered in production and how you methodically resolved it.',
        'Explain the trade-offs between REST, GraphQL, and gRPC in microservice architectures.',
        'Tell me about a time you had a technical disagreement with a teammate and how you reached consensus.',
      ],
    },
    {
      title: 'Backend Systems Engineer',
      category: 'Distributed Systems',
      questions: [
        'How does the Node.js event loop handle asynchronous I/O with Libuv?',
        'Explain B-Tree indexing in relational databases and how composite indexing affects query performance.',
        'What strategies do you use to implement distributed caching and avoid cache stampedes with Redis?',
        'How do you design an idempotent payment processing API to prevent duplicate transactions?',
        'Walk through how Kafka partition rebalancing works and how you prevent consumer lag.',
      ],
    },
    {
      title: 'Frontend Engineer',
      category: 'Client Architecture',
      questions: [
        'How does React 19 reconciliation and the Virtual DOM diffing algorithm function under the hood?',
        'Explain Core Web Vitals (LCP, INP, CLS) and the specific techniques you use to improve them.',
        'How do you implement micro-frontends or module federation in modern enterprise web applications?',
        'What are the performance implications of Server Components versus Client Components in Next.js?',
        'How do you ensure accessibility (WCAG 2.1 AA) and semantic HTML across complex custom widgets?',
      ],
    },
    {
      title: 'Cloud & DevOps Engineer',
      category: 'Infrastructure',
      questions: [
        'Explain the difference between Docker multi-stage builds and traditional container packaging.',
        'How do you architect a high-availability Kubernetes cluster across multiple availability zones?',
        'What is Infrastructure as Code (IaC) and how do you prevent configuration drift using Terraform?',
        'How do you design a zero-downtime blue-green deployment pipeline using GitHub Actions?',
        'Describe how you monitor distributed microservices using Prometheus and Grafana alerting rules.',
      ],
    },
  ],
  ECE: [
    {
      title: 'VLSI & ASIC Design Engineer',
      category: 'Semiconductor & Hardware',
      questions: [
        'Explain Setup Time and Hold Time violations in digital flip-flops and how you fix hold time violations without affecting setup time.',
        'What is the difference between blocking and non-blocking assignments in Verilog, and where should each be used?',
        'Describe the complete ASIC design flow from RTL synthesis to GDSII layout.',
        'How do you design a Finite State Machine (Mealy vs Moore) to detect a specific sequence like "1011"?',
        'What is Clock Domain Crossing (CDC) and how do two-flop synchronizers prevent metastability?',
      ],
    },
    {
      title: 'Embedded Systems & Firmware Engineer',
      category: 'Firmware & Microcontrollers',
      questions: [
        'Compare UART, SPI, and I2C protocols in terms of speed, pin count, master-slave hierarchy, and error detection.',
        'How does FreeRTOS manage task preemption, priority inversion, and what is priority inheritance?',
        'Explain what happens during a microcontroller boot sequence from Reset Vector to main().',
        'How do you handle hardware debouncing and ISR (Interrupt Service Routine) best practices in STM32 ARM Cortex?',
        'What is DMA (Direct Memory Access) and how does it prevent CPU stalling during high-speed ADC transfers?',
      ],
    },
    {
      title: 'IoT Systems Architect',
      category: 'Connected Hardware',
      questions: [
        'Explain MQTT QoS levels (0, 1, 2) and how MQTT keeps bandwidth overhead low compared to HTTP.',
        'How do you secure wireless communication in ESP32/ARM nodes using mTLS and hardware cryptographic accelerators?',
        'What are the trade-offs between BLE, Zigbee, and LoRaWAN for battery-powered sensor nodes?',
        'How do you perform Over-The-Air (OTA) firmware updates safely with dual-partition rollback on ESP32?',
        'Describe edge AI deployment challenges when running TensorFlow Lite Micro on constrained MCUs.',
      ],
    },
  ],
  MECH: [
    {
      title: 'CAD/CAM & Product Design Engineer',
      category: 'Design & Manufacturing',
      questions: [
        'Explain the difference between Maximum Material Condition (MMC) and Least Material Condition (LMC) in GD&T per ASME Y14.5.',
        'How do you select appropriate fillet radii and draft angles for injection-molded or cast mechanical components?',
        'Walk through how you perform a tolerance stack-up analysis using Worst-Case vs RSS (Root Sum Square) methods.',
        'Explain 2D adaptive clearing versus traditional pocketing toolpaths in CNC machining with Fusion 360.',
        'What are the primary considerations when selecting steel alloys (e.g. AISI 1018 vs 4140 vs 304 Stainless) for cyclic fatigue applications?',
      ],
    },
    {
      title: 'CAE & Finite Element Analysis (FEA) Engineer',
      category: 'Structural & Thermal Simulation',
      questions: [
        'What is the difference between hex (brick) and tet (tetrahedral) meshing in ANSYS, and when is each preferred?',
        'Explain Von Mises stress criteria and when it is appropriate for ductile materials versus brittle materials (Rankine/Tresca).',
        'How do you identify and resolve artificial stress singularities at sharp internal re-entrant corners in FEA?',
        'What boundary conditions are required to prevent rigid body motion in a 3D static structural analysis?',
        'Explain modal analysis and how natural frequencies relate to resonance avoidance in rotating machinery.',
      ],
    },
    {
      title: 'Robotics & Mechatronics Engineer',
      category: 'Automation & Kinematics',
      questions: [
        'What is the difference between forward kinematics and inverse kinematics in a 6-DOF industrial robotic arm?',
        'How do PID controller tuning parameters (Kp, Ki, Kd) influence overshoot, rise time, and steady-state error?',
        'Explain the working principle of optical encoders and how quadrature decoding determines rotational direction.',
        'How do pneumatic actuators compare to servo-electric actuators in terms of precision, cycle speed, and payload?',
        'Describe how you interface proximity sensors and load cells with an industrial PLC for pick-and-place automation.',
      ],
    },
  ],
  EEE: [
    {
      title: 'EV Powertrain & Power Electronics Engineer',
      category: 'E-Mobility & Conversion',
      questions: [
        'Derive the duty cycle equation for a DC-DC Buck-Boost converter and explain continuous vs discontinuous conduction mode (CCM vs DCM).',
        'Why are SiC (Silicon Carbide) and GaN MOSFETs preferred over conventional Silicon IGBTs in 800V EV traction inverters?',
        'Explain Field Oriented Control (FOC) for Permanent Magnet Synchronous Motors (PMSM) using Clarke and Park transformations.',
        'How does a Battery Management System (BMS) perform passive cell balancing and what are the drawbacks compared to active balancing?',
        'What methods are used to estimate Battery State of Charge (SoC) accurately under dynamic driving loads?',
      ],
    },
    {
      title: 'Industrial Automation & PLC/SCADA Engineer',
      category: 'Control & Automation',
      questions: [
        'Explain the scan cycle of a Siemens S7 PLC (Read Inputs, Execute Logic, Update Outputs, Diagnostics).',
        'What is the difference between sinking (NPN) and sourcing (PNP) sensor wiring for industrial digital inputs?',
        'How do you configure an interlocked safety circuit with emergency stop relays (Category 4 / SIL 3)?',
        'Explain Modbus RTU vs Modbus TCP protocol frame structures and register addressing conventions.',
        'How do you design alarm priority grouping and trending screens in WinCC SCADA for critical process monitoring?',
      ],
    },
    {
      title: 'Power Systems & Substation Engineer',
      category: 'Transmission & Protection',
      questions: [
        'Explain the working principle of distance protection (Zone 1, 2, 3) for high-voltage transmission lines.',
        'What causes transformer inrush current and how does harmonic restraint prevent false differential relay tripping?',
        'How do you perform load flow and short-circuit fault analysis using ETAP software?',
        'Explain the impact of renewable solar inverter integration on power grid inertia and frequency stability.',
        'What is the purpose of SF6 gas in high-voltage circuit breakers and what are the eco-friendly alternative technologies being adopted?',
      ],
    },
  ],
  CIVIL: [
    {
      title: 'Structural Design Engineer',
      category: 'Structures & Concrete',
      questions: [
        'Explain the fundamental difference between Working Stress Method (WSM) and Limit State Method (LSM) per IS 456:2000.',
        'How do you calculate the earthquake base shear of a multi-storey building using the Equivalent Static Method per IS 1893:2016?',
        'What are the ductile detailing requirements for beam-column joints in earthquake-resistant structures per IS 13920?',
        'How does STAAD.Pro model soil-structure interaction using elastic subgrade reaction (Winkler spring model)?',
        'Explain the difference between one-way slab and two-way slab load distribution mechanisms.',
      ],
    },
    {
      title: 'BIM Coordinator & Modeler',
      category: 'Digital Construction',
      questions: [
        'What are the differences between LOD 100, 200, 300, 400, and 500 in Autodesk Revit BIM execution plans?',
        'How do you set up hard clash and soft clash detection matrices in Autodesk Navisworks Manage?',
        'Explain 4D BIM (scheduling) and 5D BIM (cost integration) workflows in modern construction management.',
        'How do you coordinate MEP routing through structural cast-in penetrations without compromising structural integrity?',
        'Describe the OpenBIM IFC (Industry Foundation Classes) schema and how it facilitates interoperability between diverse software platforms.',
      ],
    },
    {
      title: 'Construction Project Manager & Planner',
      category: 'Planning & Project Controls',
      questions: [
        'Explain the Critical Path Method (CPM) and the mathematical difference between Total Float and Free Float.',
        'How do you compute Cost Performance Index (CPI) and Schedule Performance Index (SPI) in Earned Value Management (EVM)?',
        'What are the trade-offs between project crashing (adding resources) and fast-tracking (parallel activities) to recover a delayed schedule in Primavera P6?',
        'How do you manage resource leveling when equipment or specialized labor exceeds maximum daily availability?',
        'Describe standard quality control tests required for RMC (Ready-Mix Concrete) before pouring on a high-rise construction site.',
      ],
    },
  ],
};

export default function InterviewPage() {
  const { studentBranch } = useAuth();
  const branchKey = BRANCH_INTERVIEW_DATA[studentBranch] ? studentBranch : 'CSE';
  const availableRoles = useMemo(() => BRANCH_INTERVIEW_DATA[branchKey], [branchKey]);

  const [selectedRole, setSelectedRole] = useState<string>(
    () => availableRoles[0]?.title || 'Fullstack Engineer'
  );
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  // Sync role when student switches branch
  useEffect(() => {
    if (availableRoles.length > 0) {
      setSelectedRole(availableRoles[0].title);
    }
  }, [availableRoles]);

  const currentRoleData = useMemo(() => {
    return availableRoles.find((r) => r.title === selectedRole) || availableRoles[0];
  }, [availableRoles, selectedRole]);

  const mockQuestions = currentRoleData.questions;

  const showToast = (msg: string) => {
    setActiveNotification(msg);
    setTimeout(() => setActiveNotification(null), 3000);
  };

  const handleStartSession = () => {
    setCurrentQuestionIndex(0);
    setIsSessionModalOpen(true);
  };

  return (
    <div className="space-y-8 pb-16 w-full font-sans">
      {/* Toast Notification */}
      {activeNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-[#FFE600] px-5 py-3 rounded-2xl shadow-2xl border border-[#FFE600]/40 flex items-center gap-3 animate-bounce">
          <SmartToy className="h-5 w-5 text-[#FFE600]" />
          <span className="text-xs font-bold text-white">{activeNotification}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Mock Interview HQ"
        description="Sharpen your responses, crush tough behavioral questions, and boost your confidence with our friendly AI coach!"
        icon={<Mic className="h-6 w-6 text-[#6A5F00]" />}
        badge={<Badge variant="cyprus">AI Interviewer v2.4</Badge>}
        actions={
          <Button
            variant="primary"
            onClick={handleStartSession}
            className="flex items-center gap-2 !bg-[#FFE600] !text-[#1A1A1A] !border-none !rounded-full font-bold shadow-md hover:scale-105"
          >
            <PlayArrow className="h-4 w-4" />
            Start Quick Mock
          </Button>
        }
      />

      {/* ─── Top Banner Section (Exact Stitch Colors) ─── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 bg-[#FAF3DF] border border-[#CDC7AA]/50 p-6 sm:p-8 rounded-3xl shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 bg-[#26FEDC] text-[#007261] rounded-full text-[10px] uppercase tracking-wider font-extrabold shadow-sm">
              Practice Zone
            </span>
            <span className="text-[#4B4731] text-xs font-semibold">AI Interviewer v2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1E1C10] tracking-tight font-heading">
            Mock Interview HQ 🤖✨
          </h1>
          <p className="text-xs sm:text-sm text-[#4B4731] max-w-xl leading-relaxed">
            Sharpen your responses, crush tough behavioral questions, and boost your confidence with our friendly AI coach!
          </p>
        </div>

        <div className="flex items-center gap-3.5 bg-white p-4 sm:p-5 rounded-3xl border border-[#CDC7AA]/40 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#FFE600] flex items-center justify-center text-[#726600] shadow-sm">
            <SmartToy className="h-7 w-7 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] text-[#7C775F] font-bold uppercase tracking-wider">Overall Readiness</div>
            <div className="text-xl font-black text-[#6A5F00] font-heading">88% (Ready!)</div>
          </div>
        </div>
      </div>

      {/* ─── Main Bento Grid Layout (Stitch Styled) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive 'Start AI Mock Interview' Hero Card (8 cols) */}
        <div className="lg:col-span-8 bg-[#FAF3DF] border border-[#CDC7AA]/50 rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between shadow-sm">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-[#FFE600]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="z-10 max-w-xl mb-6">
            <span className="inline-block bg-[#6A5F00] text-white text-[10px] font-bold px-3 py-1 rounded-full mb-3 shadow-sm">
              ⚡ Instant AI Session
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E1C10] font-heading mb-2">
              Ready for a quick warm-up?
            </h2>
            <p className="text-xs sm:text-sm text-[#4B4731] mb-5 leading-relaxed">
              Select your target role and let our friendly robot interviewer fire real-time behavioral and technical questions at you.
            </p>

            {/* Role selection pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {availableRoles.map((roleObj) => (
                <button
                  key={roleObj.title}
                  type="button"
                  onClick={() => setSelectedRole(roleObj.title)}
                  className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all ${
                    selectedRole === roleObj.title
                      ? 'bg-[#6A5F00] text-white shadow-md'
                      : 'bg-white border border-[#CDC7AA]/40 text-[#1E1C10] hover:bg-[#EEE8D4]'
                  }`}
                >
                  {roleObj.title}
                </button>
              ))}
            </div>
          </div>

          <div className="z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#CDC7AA]/30">
            <div className="flex items-center gap-2 text-xs font-bold text-[#4B4731]">
              <Timer className="h-4 w-4 text-[#006B5B]" />
              <span>Duration: ~20 mins (5 questions)</span>
            </div>
            <button
              onClick={handleStartSession}
              className="px-6 py-3 bg-[#FFE600] text-[#1A1A1A] font-black rounded-full text-xs shadow-[0_4px_14px_rgba(255,230,0,0.45)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlayArrow className="h-4 w-4" />
              Start AI Mock Interview
            </button>
          </div>
        </div>

        {/* Instant Feedback Stats Card (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#CDC7AA]/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-[#1E1C10] font-heading">Feedback Stats</h3>
              <Insights className="h-5 w-5 text-[#006B5B]" />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1 font-bold">
                  <span className="text-[#4B4731]">Clarity & Pacing</span>
                  <span className="text-[#006A6A]">92%</span>
                </div>
                <div className="w-full bg-[#F4EEDA] h-3 rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div className="bg-[#006A6A] h-full rounded-full transition-all duration-1000" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-bold">
                  <span className="text-[#4B4731]">Technical Accuracy</span>
                  <span className="text-[#6A5F00]">85%</span>
                </div>
                <div className="w-full bg-[#F4EEDA] h-3 rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div className="bg-[#6A5F00] h-full rounded-full transition-all duration-1000" style={{ width: '85%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-bold">
                  <span className="text-[#4B4731]">Confidence & Tone</span>
                  <span className="text-[#FF6B6B]">78%</span>
                </div>
                <div className="w-full bg-[#F4EEDA] h-3 rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div className="bg-[#FF6B6B] h-full rounded-full transition-all duration-1000" style={{ width: '78%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 p-4 bg-[#FAF3DF] border-l-4 border-[#FFE600] rounded-2xl">
            <p className="text-xs text-[#1E1C10] leading-relaxed">
              💡 <span className="font-bold text-[#726600]">AI Tip:</span> Try to avoid filler words like "um" and "like". You used only 3 in your last session!
            </p>
          </div>
        </div>
      </div>

      {/* ─── Lower Section: Upcoming Sessions & Score Breakdown ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upcoming Practice Sessions (7 cols) */}
        <div className="lg:col-span-7 bg-[#FAF3DF] border border-[#CDC7AA]/50 rounded-3xl p-6 sm:p-7 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold text-[#1E1C10] font-heading">Upcoming Scheduled Sessions</h3>
            <button
              onClick={() => showToast('Session scheduler opened!')}
              className="text-xs text-[#6A5F00] font-bold hover:underline cursor-pointer"
            >
              Schedule New +
            </button>
          </div>

          <div className="space-y-3">
            {/* Session Item 1 */}
            <div className="flex items-center justify-between p-4 bg-white border border-[#CDC7AA]/40 rounded-2xl hover:border-[#FFE600] transition-all">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#26FEDC]/30 flex items-center justify-center text-[#007261]">
                  <Mic className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1E1C10]">System Design: Scalable Chat</h4>
                  <p className="text-[11px] text-[#7C775F]">Tomorrow, 4:00 PM • AI Peer Match</p>
                </div>
              </div>
              <span className="px-3.5 py-1 bg-[#FFE600] text-[#726600] rounded-full text-[10px] font-black shadow-sm">
                Confirmed
              </span>
            </div>

            {/* Session Item 2 */}
            <div className="flex items-center justify-between p-4 bg-white border border-[#CDC7AA]/40 rounded-2xl hover:border-[#FFE600] transition-all">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#9B5DE5]/20 flex items-center justify-center text-[#9B5DE5]">
                  <Groups className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1E1C10]">Behavioral & Leadership</h4>
                  <p className="text-[11px] text-[#7C775F]">Oct 24, 2:00 PM • Solo AI Bot</p>
                </div>
              </div>
              <span className="px-3.5 py-1 bg-[#EEE8D4] text-[#4B4731] rounded-full text-[10px] font-bold">
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Score Breakdown & Past Performance (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#CDC7AA]/40 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-[#1E1C10] font-heading">Score Breakdown</h3>
              <span className="text-xs text-[#7C775F]">Last 5 Sessions</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-[#FAF3DF] border border-[#CDC7AA]/40 p-4 rounded-2xl text-center">
                <div className="text-2xl sm:text-3xl font-black text-[#6A5F00] font-heading">94/100</div>
                <div className="text-[11px] text-[#4B4731] font-bold mt-1">Top Score</div>
              </div>
              <div className="bg-[#FAF3DF] border border-[#CDC7AA]/40 p-4 rounded-2xl text-center">
                <div className="text-2xl sm:text-3xl font-black text-[#006B5B] font-heading">4.2m</div>
                <div className="text-[11px] text-[#4B4731] font-bold mt-1">Avg Answer Time</div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#4B4731]">
              <div className="flex justify-between py-1.5 border-b border-[#CDC7AA]/20">
                <span>System Design Practice</span>
                <span className="font-bold text-[#1E1C10]">91%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#CDC7AA]/20">
                <span>React State Architectures</span>
                <span className="font-bold text-[#1E1C10]">94%</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Behavioral STAR Method</span>
                <span className="font-bold text-[#1E1C10]">88%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Interactive AI Mock Interview Simulation Modal ─── */}
      {isSessionModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFF9E9] border-2 border-[#CDC7AA] rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B] animate-ping" />
                <h3 className="text-base font-bold text-[#1E1C10] font-heading">
                  AI Mock Interview: {selectedRole}
                </h3>
              </div>
              <button
                onClick={() => setIsSessionModalOpen(false)}
                className="w-9 h-9 rounded-full bg-[#F4EEDA] border border-[#CDC7AA]/50 flex items-center justify-center hover:bg-[#EEE8D4] transition-colors cursor-pointer"
              >
                <Close className="h-4 w-4 text-[#4B4731]" />
              </button>
            </div>

            <div className="bg-[#FFE600]/20 border border-[#FFE600] p-4 rounded-2xl space-y-1">
              <span className="text-[10px] font-black text-[#726600] uppercase tracking-wider">
                Question {currentQuestionIndex + 1} of {mockQuestions.length}
              </span>
              <p className="text-sm font-bold text-[#1E1C10]">
                "{mockQuestions[currentQuestionIndex]}"
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#4B4731]">Your Answer (Speak or Type)</label>
              <textarea
                rows={4}
                placeholder="Structure your answer using Situation, Task, Action, Result (STAR method)..."
                className="w-full bg-[#F4EEDA] border border-[#CDC7AA] rounded-2xl p-3.5 text-xs text-[#1E1C10] focus:outline-none focus:border-[#6A5F00] transition-all font-medium"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#CDC7AA]/30">
              <span className="text-xs text-[#4B4731] flex items-center gap-1 font-semibold">
                <Mic className="h-4 w-4 text-[#006B5B]" /> AI Speech Recognition Active
              </span>
              <div className="flex gap-2">
                {currentQuestionIndex < mockQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    className="bg-[#6A5F00] text-white text-xs font-bold px-4 py-2 rounded-full hover:scale-105 transition-all shadow-md cursor-pointer"
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsSessionModalOpen(false);
                      showToast('Mock Interview finished! Your score is 91/100.');
                    }}
                    className="bg-[#00F5D4] text-[#1A1A1A] text-xs font-black px-5 py-2 rounded-full hover:scale-105 transition-all shadow-md flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Finish & View Rubric
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
