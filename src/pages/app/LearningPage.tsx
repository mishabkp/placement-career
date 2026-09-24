import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  SmartToy,
  AutoAwesome,
  Bolt,
} from '../../components/icons/StitchIcons';
import {
  Sparkles,
  Mic,
  Send,
  Download,
  Bookmark,
  Layers,
  Cpu,
  Database,
  Globe,
  Play,
  RotateCcw,
  Zap,
  Wrench,
  Building,
  Activity,
  Flame,
  Radio,
  Compass,
} from 'lucide-react';

interface Concept {
  id: string;
  title: string;
  category: string;
  desc: string;
  xp: string;
  icon: any;
  analogy: string;
  steps: string[];
}

interface BranchLearningData {
  categories: string[];
  concepts: Concept[];
  questQuestion: string;
}

const BRANCH_LEARNING_DATA: Record<string, BranchLearningData> = {
  CSE: {
    categories: ['Core CS & OS', 'System Design', 'Data Structures', 'Fullstack Web'],
    questQuestion: '"Can you explain deadlock prevention in just 2 simple sentences?"',
    concepts: [
      {
        id: 'c1',
        title: 'Event Loop in Node.js',
        category: 'Core CS & OS',
        desc: 'Call stack, Libuv thread pool & callbacks',
        xp: '+50 XP',
        icon: RotateCcw,
        analogy:
          'Like a head chef in a busy pizzeria 👨‍🍳. While heavy pizzas bake in the oven (Libuv thread pool), the chef keeps taking counter orders. When ready, the timer rings (callback queue), and the chef serves the pizza immediately!',
        steps: [
          'Call Stack: Synchronous execution runs top to bottom',
          'Libuv Thread Pool: Async I/O (file, network) handed off to 4 background threads',
          'Event Queue: Completed callbacks wait in queue',
          'Event Loop: Continuously pushes waiting callbacks onto empty stack',
        ],
      },
      {
        id: 'c2',
        title: 'Microservices vs Monolith',
        category: 'System Design',
        desc: 'Scalability, blast radius & latency trade-offs',
        xp: '+40 XP',
        icon: Layers,
        analogy:
          'A monolith is like a Swiss Army knife 🔪 (convenient but breaks all at once), while microservices are a modular toolset (each tool independently upgraded or replaced).',
        steps: [
          'Single Codebase: Fast deployment for small teams',
          'Service Boundaries: Domain-Driven Design (DDD) separates databases',
          'API Gateway: Routes client requests and terminates SSL/Auth',
          'Resilience: Bulkheads and circuit breakers prevent cascade failures',
        ],
      },
      {
        id: 'c3',
        title: 'Database Indexing (B-Trees)',
        category: 'Data Structures',
        desc: 'Lookups, disk page I/O & balanced trees',
        xp: '+35 XP',
        icon: Database,
        analogy:
          'Like the thumb index at the edge of a giant printed encyclopedia 📖. Allows you to jump straight to the right section without flipping through every single page sequentially.',
        steps: [
          'Sequential Scan: O(N) requires reading every disk block',
          'B-Tree Search: O(log N) balanced multi-way tree keeps heights small (usually 3-4 levels)',
          'Composite Index: Left-most prefix rule governs query optimization',
        ],
      },
      {
        id: 'c4',
        title: 'JWT & Session Security',
        category: 'Fullstack Web',
        desc: 'Stateless auth, claims & CSRF protection',
        xp: '+30 XP',
        icon: Globe,
        analogy:
          'A digital wristband at an amusement park 🎟️. Encrypted signature verifies your tier access at every ride without the operator calling headquarters each time.',
        steps: [
          'Header & Payload: Base64Url-encoded metadata & user identity claims',
          'Cryptographic Signature: HMAC-SHA256 ensures payload was not tampered with',
          'Storage: HttpOnly SameSite cookies protect against XSS stealing tokens',
        ],
      },
    ],
  },
  ECE: {
    categories: ['VLSI & Digital', 'Embedded & RTOS', 'Protocols & Busses', 'Hardware & PCB'],
    questQuestion: '"Why is a 2-flip-flop synchronizer essential to mitigate metastability in Clock Domain Crossing?"',
    concepts: [
      {
        id: 'ece-c1',
        title: 'Clock Domain Crossing (CDC) & Metastability',
        category: 'VLSI & Digital',
        desc: 'Setup/hold slack, MTBF & synchronizers',
        xp: '+50 XP',
        icon: Cpu,
        analogy:
          'Like trying to jump onto a spinning carousel 🎠 from a stationary platform. If you jump right as a bar sweeps past, you might stumble in an indeterminate state (metastability) before recovering your balance.',
        steps: [
          'Asynchronous Boundary: Signals originating in Domain A arrive arbitrary to Domain B clock edge',
          'Metastability Risk: Setup/hold window violated, output oscillates between 0 and 1',
          '2-FF Synchronizer: First flop catches signal, second flop resolves metastable output into valid digital state',
          'MTBF Calculation: Mean Time Between Failures increased from microseconds to centuries',
        ],
      },
      {
        id: 'ece-c2',
        title: 'Priority Inversion in FreeRTOS',
        category: 'Embedded & RTOS',
        desc: 'Semaphores, priority inheritance & task starving',
        xp: '+45 XP',
        icon: Activity,
        analogy:
          'Like an ambulance (high priority) stuck behind a delivery van (medium priority), because a slow tractor (low priority) is blocking the one-lane bridge that the ambulance needs.',
        steps: [
          'Low-priority task acquires shared mutex/resource',
          'High-priority task preempts and requests the same mutex, entering blocked state',
          'Medium-priority task preempts low-priority task, inadvertently starving the high-priority task',
          'Priority Inheritance: Low-priority task temporarily elevated to high-priority until mutex is released',
        ],
      },
      {
        id: 'ece-c3',
        title: 'I2C vs SPI Bus Protocols',
        category: 'Protocols & Busses',
        desc: 'Speed, wire count, arbitration & addressing',
        xp: '+40 XP',
        icon: Radio,
        analogy:
          'I2C is like a group walkie-talkie channel 📻 (only 2 wires, everyone shares and takes turns calling addresses), while SPI is a private direct telephone line ☎️ (faster, but requires separate chip-select lines for each device).',
        steps: [
          'I2C: 2 wires (SDA, SCL), open-drain with pull-ups, 7/10-bit software addressing up to 3.4 Mbps',
          'SPI: 4 wires (MOSI, MISO, SCK, CS), full-duplex push-pull, speeds exceeding 50 MHz',
          'Trade-off: I2C saves pins on constrained MCUs; SPI provides max throughput for sensors/displays',
        ],
      },
    ],
  },
  MECH: {
    categories: ['GD&T & Design', 'CAE & FEA', 'Manufacturing & CNC', 'Thermal & Fluids'],
    questQuestion: '"Why does Von Mises stress criteria govern ductile yield failure over maximum principal stress?"',
    concepts: [
      {
        id: 'mech-c1',
        title: 'Maximum Material Condition (MMC) in GD&T',
        category: 'GD&T & Design',
        desc: 'Bonus tolerance, pin/hole fit & ASME Y14.5',
        xp: '+50 XP',
        icon: Wrench,
        analogy:
          'Like fitting a suitcase into an airline baggage check frame 🧳. If your suitcase is packed slightly smaller than maximum size, you get "bonus flexibility" in how you tilt or angle it through the slot.',
        steps: [
          'MMC Definition: Feature contains maximum volume of material (largest pin or smallest hole)',
          'Bonus Tolerance: As manufactured size departs from MMC towards LMC, geometric tolerance increases',
          'Functional Gauging: Hard physical gauges can verify parts quickly on the assembly line',
        ],
      },
      {
        id: 'mech-c2',
        title: 'Von Mises Yield Criterion in FEA',
        category: 'CAE & FEA',
        desc: 'Distortion energy, shear yield & safety factor',
        xp: '+45 XP',
        icon: Flame,
        analogy:
          'Like inflating a balloon under water 🎈. Pure uniform hydrostatic pressure compresses the balloon without popping it; it is shear distortion that stretches the rubber until it yields.',
        steps: [
          'Hydrostatic vs Deviatoric Stress: Hydrostatic changes volume; deviatoric causes shear deformation',
          'Distortion Energy Theory: Yielding begins when distortion energy reaches yield strength in simple tension',
          'Validation: Accurately predicts failure in ductile structural steels, aluminum, and titanium',
        ],
      },
      {
        id: 'mech-c3',
        title: 'Adaptive Clearing in CNC Machining',
        category: 'Manufacturing & CNC',
        desc: 'Constant tool engagement, chip thinning & CAM',
        xp: '+40 XP',
        icon: Layers,
        analogy:
          'Like peeling an apple with uniform gentle blade pressure 🍏 instead of jamming the knife into tight corners and snapping the tip.',
        steps: [
          'Constant Radial Engagement: Tool never exceeds set engagement angle (e.g. 15-20%)',
          'High Feed Rates & Full Flute Depth: Spreads heat and wear over the entire cutter length',
          'Cycle Time Reduction: Eliminates sudden shock loads in internal pocket corners',
        ],
      },
    ],
  },
  EEE: {
    categories: ['Power Electronics', 'Motor Drives & FOC', 'PLC & Automation', 'EV & Batteries'],
    questQuestion: '"How do SiC MOSFETs reduce switching losses compared to Silicon IGBTs in 800V EV traction?"',
    concepts: [
      {
        id: 'eee-c1',
        title: 'Field-Oriented Control (FOC) in Motors',
        category: 'Motor Drives & FOC',
        desc: 'Clarke/Park transforms, torque & flux control',
        xp: '+50 XP',
        icon: Zap,
        analogy:
          'Like riding a tandem bicycle 🚲 where you keep your foot pushing perpendicular to the pedals at all times to extract 100% mechanical torque without wasting effort pushing down on dead center.',
        steps: [
          'Clarke Transform: Converts 3-phase stator currents (Ia, Ib, Ic) into 2-phase stationary frame (Ialpha, Ibeta)',
          'Park Transform: Rotates into rotor reference frame (Id, Iq) using rotor encoder angle theta',
          'Decoupled Control: Iq directly controls motor torque, Id controls magnetic field flux',
          'Inverse Transforms & SVPWM: Generate gate drive PWM pulses for the 3-phase inverter',
        ],
      },
      {
        id: 'eee-c2',
        title: 'DC-DC Buck-Boost Dynamics',
        category: 'Power Electronics',
        desc: 'CCM/DCM, inductor sizing & duty cycle',
        xp: '+45 XP',
        icon: Activity,
        analogy:
          'Like a hydraulic hand pump 🚰. When you draw the lever up, you store energy in the chamber (inductor charge); when you push down, you discharge that energy into the tank (output capacitor) at any desired pressure.',
        steps: [
          'Switch ON: Inductor energizes from DC input, diode reverse biased, capacitor feeds load',
          'Switch OFF: Inductor magnetic field collapses, forward-biasing diode to transfer stored energy',
          'Voltage Conversion Ratio: Vout = Vin * (D / (1 - D)), allowing stepping up or down',
        ],
      },
      {
        id: 'eee-c3',
        title: 'Li-ion Battery Cell Balancing',
        category: 'EV & Batteries',
        desc: 'Passive bleed vs active shuttle & BMS',
        xp: '+40 XP',
        icon: Bolt,
        analogy:
          'Like filling a chain of drinking glasses connected by siphons 🥛. If one glass fills faster, passive balancing bleeds off the excess through a tiny spigot so the others can reach full without overflowing.',
        steps: [
          'Cell Imbalance Cause: Manufacturing variances in internal resistance and degradation rates',
          'Passive Balancing: Bleed resistors discharge highest-voltage cells during the final CV charging phase',
          'Active Balancing: Capacitive or inductive shuttles transfer excess energy from high to low cells with >90% efficiency',
        ],
      },
    ],
  },
  CIVIL: {
    categories: ['Structural & IS 456', 'BIM & Coordination', 'Project Planning', 'Geotech & Soil'],
    questQuestion: '"What is the difference between one-way and two-way slab load distribution per IS 456:2000?"',
    concepts: [
      {
        id: 'civil-c1',
        title: 'Limit State Method vs Working Stress',
        category: 'Structural & IS 456',
        desc: 'Partial safety factors, serviceability & IS 456',
        xp: '+50 XP',
        icon: Building,
        analogy:
          'Working Stress is like driving with a strict arbitrary speed governor 🚗 (safe but excessively heavy and expensive), while Limit State tests the true breaking point of each material and applies scientifically calculated safety cushions.',
        steps: [
          'Limit State of Collapse: Flexure, shear, compression, and torsion with load factors (1.5 for DL + LL)',
          'Limit State of Serviceability: Deflection, crack width, and vibration under normal operating conditions',
          'Material Factors: Partial safety factor gamma_m = 1.5 for concrete and 1.15 for high-yield steel',
        ],
      },
      {
        id: 'civil-c2',
        title: 'Clash Detection Matrices in BIM',
        category: 'BIM & Coordination',
        desc: 'Hard clashes, clearances & Navisworks Manage',
        xp: '+45 XP',
        icon: Layers,
        analogy:
          'Like an airport air traffic control radar ✈️. Before planes take off, radar checks 3D corridors to guarantee a plumbing pipe doesn’t fly straight through a structural concrete shear wall.',
        steps: [
          'Model Federation: Architectural, Structural, and MEP IFC/RVT models merged in Navisworks',
          'Hard Clash: Physical geometric intersection (e.g. 300mm HVAC duct intersecting concrete beam)',
          'Soft / Clearance Clash: Insufficient space for insulation, maintenance access, or thermal expansion',
          'Clash Resolution Report: Assigned to discipline lead with grid coordinates and timestamp for signoff',
        ],
      },
      {
        id: 'civil-c3',
        title: 'Critical Path Method (CPM) & Float',
        category: 'Project Planning',
        desc: 'WBS, Total Float vs Free Float & Primavera P6',
        xp: '+40 XP',
        icon: Compass,
        analogy:
          'Like baking a wedding cake 🎂. The sponge baking and cooling is on the critical path (any delay pushes back the entire wedding); folding napkins has 3 hours of "Total Float" and won’t delay the reception.',
        steps: [
          'Forward Pass: Computes Early Start (ES) and Early Finish (EF) of all activities',
          'Backward Pass: Computes Late Start (LS) and Late Finish (LF) based on project deadline',
          'Total Float = LS - ES: Slack time without delaying overall project delivery date',
          'Critical Path: Sequence of connected activities where Total Float equals zero',
        ],
      },
    ],
  },
};

export default function LearningPage() {
  const { user, studentBranch } = useAuth();
  const branchKey = BRANCH_LEARNING_DATA[studentBranch] ? studentBranch : 'CSE';
  const branchData = useMemo(() => BRANCH_LEARNING_DATA[branchKey], [branchKey]);

  const [activeCategory, setActiveCategory] = useState(branchData.categories[0]);
  const [activeConcept, setActiveConcept] = useState<Concept>(branchData.concepts[0]);
  const [simStep, setSimStep] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<
    Array<{ sender: 'ai' | 'user'; text: string; time: string }>
  >([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync concepts & categories when student switches branch
  useEffect(() => {
    setActiveCategory(branchData.categories[0]);
    setActiveConcept(branchData.concepts[0]);
    setSimStep(0);
    const firstName = user?.name?.split(' ')[0] || 'Student';
    setMessages([
      {
        sender: 'ai',
        text: `Hello ${firstName}! 🤖 I'm your AI Learning Coach for ${studentBranch} Engineering. What core topic or interview concept would you like to explore today? Tap any topic on the left or type below!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        sender: 'user',
        text: `Can you explain ${branchData.concepts[0].title} in simple terms with an example?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        sender: 'ai',
        text: branchData.concepts[0].analogy,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [studentBranch, branchData, user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectConcept = (c: Concept) => {
    setActiveConcept(c);
    setSimStep(0);
    setMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: `Explain ${c.title} to me.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        sender: 'ai',
        text: c.analogy,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput('');
    setMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: msg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        sender: 'ai',
        text: `🤖 Pal-AI Insight on "${msg}": In technical interviews, start with the core trade-off (time vs memory, consistency vs availability), then give a concrete code example!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
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

      {/* ─── TOP HEADER & STATUS BAR ─── */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#F4EEDA] p-6 sm:p-8 rounded-3xl shadow-sm border border-[#CDC7AA]/40 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-44 h-44 bg-[#FFE600]/25 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-64 -bottom-10 w-36 h-36 bg-[#00F5D4]/20 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-start sm:items-center gap-4 relative z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FFE600] rounded-2xl flex items-center justify-center shadow-md border-2 border-[#FAF3DF] shrink-0">
            <SmartToy className="h-9 w-9 sm:h-11 sm:w-11 text-[#6A5F00]" />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1E1C10] tracking-tight">
                AI Learning Assistant
              </h1>
              <span className="bg-[#FFE600] text-[#1A1A1A] font-bold text-xs px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <AutoAwesome className="h-3.5 w-3.5 text-[#6A5F00]" /> GPT-4o Smart Mentor
              </span>
              <span className="bg-[#26FEDC] text-[#007261] font-bold text-xs px-3 py-1 rounded-full shadow-sm">
                Tier-1 Prep Mode
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#4B4731] font-medium max-w-2xl leading-relaxed">
              Ask doubts, unlock live visual concept simulators, and crack complex {studentBranch} engineering interviews with Pal-Bot!
            </p>
          </div>
        </div>

        {/* Right Badges / Gamified Stats */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full shadow-sm border border-[#CDC7AA]/30">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B] animate-pulse" />
            <span className="text-xs font-bold text-[#1E1C10]">Live Mic Ready</span>
            <Mic className="h-3.5 w-3.5 text-[#FF6B6B]" />
          </div>
          <div className="flex items-center gap-1.5 bg-[#FFE600] text-[#1A1A1A] px-3.5 py-1.5 rounded-full shadow-sm font-bold text-xs border border-[#CDC7AA]/40">
            <Sparkles className="h-3.5 w-3.5 text-[#6A5F00]" />
            <span>4,500 XP</span>
          </div>
        </div>
      </header>

      {/* ─── MAIN 2-COLUMN LAYOUT ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Concept Orbit & Starters (4 cols) */}
        <aside className="xl:col-span-4 flex flex-col gap-5">
          {/* Category Filter Pills */}
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#6A5F00] font-heading font-bold text-base">
                <Sparkles className="h-4 w-4" />
                <span>Concept Orbit ({studentBranch})</span>
              </div>
              <span className="text-[11px] font-bold bg-[#FAF3DF] px-2.5 py-0.5 rounded-full text-[#4B4731]">
                {branchData.concepts.length} Topics
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {branchData.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`py-2 px-3 rounded-full text-xs font-bold transition-all text-center cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#FFE600] text-[#1A1A1A] shadow-sm border border-[#CDC7AA]/40'
                      : 'bg-[#FAF3DF] hover:bg-[#EEE8D4] text-[#4B4731]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Starter Cards */}
            <div className="flex flex-col gap-2 mt-2">
              {branchData.concepts.map((c) => {
                const isSelected = activeConcept.id === c.id;
                const IconComp = c.icon;
                return (
                  <div
                    key={c.id}
                    onClick={() => handleSelectConcept(c)}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl cursor-pointer transition-all duration-200 border ${
                      isSelected
                        ? 'bg-[#FFE600]/25 border-[#6A5F00] shadow-sm translate-x-1'
                        : 'bg-[#FAF3DF]/60 hover:bg-[#FAF3DF] border-[#CDC7AA]/30'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs border border-[#CDC7AA]/30">
                      <IconComp className="h-4 w-4 text-[#6A5F00]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-[#1E1C10] truncate">{c.title}</p>
                        <span className="text-[10px] font-bold text-[#006B5B] bg-[#00F5D4]/20 px-2 py-0.5 rounded-full">
                          {c.xp}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#4B4731] truncate mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pal-Bot Curiosity Quest Card */}
          <div className="bg-gradient-to-br from-[#FFE600] to-[#26FEDC] p-5 rounded-3xl shadow-sm text-[#1A1A1A] border-2 border-[#CDC7AA]/40 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Bolt className="h-5 w-5 text-[#6A5F00]" />
              <span className="font-heading text-sm font-black">Daily Curiosity Quest</span>
            </div>
            <p className="text-xs font-semibold leading-relaxed">
              {branchData.questQuestion}
            </p>
            <div className="flex items-center justify-between bg-white/90 backdrop-blur p-2 rounded-full pl-3.5 shadow-sm">
              <span className="text-xs font-bold text-[#006B5B]">Reward: +50 XP 🏆</span>
              <button
                onClick={() => showToast('Curiosity Quest accepted! Answer in chat.')}
                className="bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold px-3.5 py-1.5 rounded-full transition-transform active:scale-95 shadow-sm"
              >
                Accept Quest
              </button>
            </div>
          </div>

          {/* Quick Session Stats & Cheat Sheet Export */}
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#1E1C10]">Concept Mastery</span>
              <span className="font-extrabold text-[#6A5F00]">85% Understood</span>
            </div>
            <div className="w-full bg-[#FAF3DF] h-3 rounded-full overflow-hidden p-0.5">
              <div className="bg-gradient-to-r from-[#FFE600] to-[#00F5D4] h-full rounded-full w-[85%]" />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                onClick={() => showToast('PDF Cheat Sheet downloaded!')}
                className="flex items-center justify-center gap-1.5 bg-[#FAF3DF] hover:bg-[#EEE8D4] text-[#1E1C10] font-bold text-xs py-2 rounded-full transition-colors border border-[#CDC7AA]/30"
              >
                <Download className="h-3.5 w-3.5" /> PDF Cheat
              </button>
              <button
                onClick={() => showToast('Concept notes saved to your profile!')}
                className="flex items-center justify-center gap-1.5 bg-[#FAF3DF] hover:bg-[#EEE8D4] text-[#1E1C10] font-bold text-xs py-2 rounded-full transition-colors border border-[#CDC7AA]/30"
              >
                <Bookmark className="h-3.5 w-3.5" /> Save Notes
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: Interactive Dialogue & Concept Sandbox (8 cols) */}
        <main className="xl:col-span-8 flex flex-col gap-5">
          {/* Dialogue Container */}
          <section className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between min-h-[580px] gap-5">
            <div className="flex flex-col gap-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${
                    m.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {m.sender === 'ai' && (
                    <div className="w-10 h-10 rounded-2xl bg-[#FFE600] flex items-center justify-center shrink-0 shadow-sm border border-[#CDC7AA]/30">
                      <SmartToy className="h-5 w-5 text-[#6A5F00]" />
                    </div>
                  )}

                  <div className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} max-w-xl`}>
                    <div className="flex items-center gap-2 mb-1 text-[11px] text-[#7C775F] font-semibold">
                      <span>{m.sender === 'user' ? 'You' : 'Pal-Bot Assistant'}</span>
                      <span>{m.time}</span>
                    </div>

                    <div
                      className={`p-4 rounded-2xl leading-relaxed text-xs sm:text-sm font-medium ${
                        m.sender === 'user'
                          ? 'bg-[#FFE600] text-[#1A1A1A] rounded-tr-xs shadow-sm font-semibold'
                          : 'bg-[#1A1A1A] text-white rounded-tl-xs shadow-md'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}

              {/* EMBEDDED INTERACTIVE CARTOON SIMULATOR WIDGET */}
              <div className="bg-[#FAF3DF] rounded-2xl p-5 border border-[#CDC7AA]/40 shadow-inner mt-2 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-[#6A5F00]" />
                    <span className="font-heading text-xs sm:text-sm font-bold text-[#1E1C10]">
                      Interactive Stepper: {activeConcept.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#6A5F00] bg-white px-2.5 py-0.5 rounded-full border border-[#CDC7AA]/30">
                    Step {simStep + 1} of {activeConcept.steps.length}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#CDC7AA]/30">
                  <span className="font-bold text-xs text-[#006B5B] block mb-1">
                    Mechanism Breakdown:
                  </span>
                  <p className="text-xs text-[#1E1C10] font-medium leading-relaxed">
                    {activeConcept.steps[simStep]}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => setSimStep((prev) => Math.max(0, prev - 1))}
                    disabled={simStep === 0}
                    className="px-3.5 py-1.5 rounded-full bg-white text-xs font-bold border border-[#CDC7AA]/40 disabled:opacity-40"
                  >
                    Previous Step
                  </button>
                  <button
                    onClick={() =>
                      setSimStep((prev) => (prev + 1) % activeConcept.steps.length)
                    }
                    className="px-4 py-1.5 rounded-full bg-[#FFE600] text-[#1A1A1A] text-xs font-bold shadow-sm hover:bg-[#DEC800]"
                  >
                    Next Step ⚡
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Input Box */}
            <form onSubmit={handleSendMessage} className="pt-3 border-t border-[#CDC7AA]/30 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask Pal-Bot any doubt (e.g. 'Explain Redis caching strategy')..."
                className="flex-1 px-4 py-3 bg-[#FAF3DF] border border-[#CDC7AA]/40 rounded-full text-xs sm:text-sm text-[#1E1C10] placeholder-[#7C775F] focus:outline-none focus:border-[#6A5F00] font-medium"
              />
              <button
                type="submit"
                className="w-11 h-11 rounded-full bg-[#FFE600] text-[#1A1A1A] flex items-center justify-center hover:bg-[#DEC800] transition-all shadow-md shrink-0 border border-[#CDC7AA]/40 active:scale-95"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
