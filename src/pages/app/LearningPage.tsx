import React, { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '../../components/shared/PageHeader';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/ui/Badge';
import {
  BookOpen,
  Sparkles,
  Send,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';

interface Concept {
  id: string;
  title: string;
  category: string;
  desc: string;
  analogy: string;
  steps: string[];
  interviewAngle?: string;
}

interface BranchLearningData {
  categories: string[];
  concepts: Concept[];
}

const BRANCH_LEARNING_DATA: Record<string, BranchLearningData> = {
  CSE: {
    categories: ['All', 'Core CS & OS', 'System Design', 'Data Structures', 'Fullstack Web'],
    concepts: [
      {
        id: 'c1',
        title: 'Event Loop in Node.js',
        category: 'Core CS & OS',
        desc: 'Call stack, Libuv thread pool & callbacks',
        analogy:
          'Like a head chef in a busy pizzeria 👨‍🍳. While heavy pizzas bake in the oven (Libuv thread pool), the chef keeps taking counter orders. When ready, the timer rings (callback queue), and the chef serves the pizza immediately!',
        steps: [
          'Call Stack: Synchronous execution runs sequentially top to bottom.',
          'Libuv Thread Pool: Async I/O (file, network) handed off to 4 background threads.',
          'Event Queue: Completed callbacks wait in queue.',
          'Event Loop: Continuously checks and pushes waiting callbacks onto the empty stack.',
        ],
        interviewAngle:
          'Recruiters frequently ask how Node.js achieves high concurrency despite being single-threaded, and how process.nextTick() differs from setImmediate().',
      },
      {
        id: 'c2',
        title: 'Microservices vs Monolith',
        category: 'System Design',
        desc: 'Scalability, blast radius & latency trade-offs',
        analogy:
          'A monolith is like a Swiss Army knife 🔪 (convenient but breaks all at once), while microservices are a modular toolset (each tool independently upgraded or replaced).',
        steps: [
          'Single Codebase: Fast deployment and simple debugging for small teams.',
          'Service Boundaries: Domain-Driven Design (DDD) separates databases per service.',
          'API Gateway: Routes client requests and terminates SSL/Auth.',
          'Resilience: Circuit breakers and bulkheads prevent cascade failure.',
        ],
        interviewAngle:
          'Be prepared to justify when NOT to choose microservices (premature optimization, operational complexity, network overhead).',
      },
      {
        id: 'c3',
        title: 'Database Indexing (B-Trees)',
        category: 'Data Structures',
        desc: 'Lookups, disk page I/O & balanced trees',
        analogy:
          'Like the thumb index at the edge of a giant printed encyclopedia 📖. Allows you to jump straight to the right section without flipping through every single page sequentially.',
        steps: [
          'Sequential Scan: O(N) requires reading every disk block sequentially.',
          'B-Tree Search: O(log N) balanced multi-way tree keeps heights small (usually 3-4 levels).',
          'Composite Index: Left-most prefix rule governs query optimization.',
        ],
        interviewAngle:
          'Interviewers often test index selectivity, and why adding too many indexes slows down write operations (INSERT/UPDATE).',
      },
      {
        id: 'c4',
        title: 'JWT & Session Security',
        category: 'Fullstack Web',
        desc: 'Stateless auth, claims & CSRF protection',
        analogy:
          'A digital wristband at an amusement park 🎟️. Encrypted signature verifies your tier access at every ride without the operator calling headquarters each time.',
        steps: [
          'Header & Payload: Base64Url-encoded metadata & user identity claims.',
          'Cryptographic Signature: HMAC-SHA256 ensures payload was not tampered with.',
          'Storage: HttpOnly SameSite cookies protect against XSS stealing tokens.',
        ],
        interviewAngle:
          'Expect questions about JWT revocation (blacklisting in Redis) and the trade-offs between local storage vs HttpOnly cookies.',
      },
    ],
  },
  ECE: {
    categories: ['All', 'VLSI & Digital', 'Embedded & RTOS', 'Protocols & Busses'],
    concepts: [
      {
        id: 'ece-c1',
        title: 'Clock Domain Crossing (CDC) & Metastability',
        category: 'VLSI & Digital',
        desc: 'Setup/hold slack, MTBF & synchronizers',
        analogy:
          'Like trying to jump onto a spinning carousel 🎠 from a stationary platform. If you jump right as a bar sweeps past, you might stumble in an indeterminate state before recovering your balance.',
        steps: [
          'Asynchronous Boundary: Signals originating in Domain A arrive arbitrary to Domain B clock edge.',
          'Metastability Risk: Setup/hold window violated, output oscillates between 0 and 1.',
          '2-FF Synchronizer: First flop catches signal, second flop resolves metastable output into valid digital state.',
        ],
        interviewAngle:
          'Explain why two-flop synchronizers only work for single-bit control signals and what is needed for multi-bit data (Async FIFO or handshake).',
      },
      {
        id: 'ece-c2',
        title: 'Priority Inversion in FreeRTOS',
        category: 'Embedded & RTOS',
        desc: 'Semaphores, priority inheritance & task starving',
        analogy:
          'Like an ambulance (high priority) stuck behind a delivery van (medium priority), because a slow tractor (low priority) is blocking the one-lane bridge that the ambulance needs.',
        steps: [
          'Low-priority task acquires shared mutex/resource.',
          'High-priority task preempts and requests the same mutex, entering blocked state.',
          'Medium-priority task preempts low-priority task, starving the high-priority task.',
          'Priority Inheritance: Low-priority task temporarily elevated to high-priority until mutex is released.',
        ],
        interviewAngle:
          'The classic Mars Pathfinder priority inversion bug is a favorite case study in embedded systems interviews.',
      },
      {
        id: 'ece-c3',
        title: 'I2C vs SPI Bus Protocols',
        category: 'Protocols & Busses',
        desc: 'Speed, wire count, arbitration & addressing',
        analogy:
          'I2C is like a group walkie-talkie channel 📻 (only 2 wires, everyone shares and takes turns calling addresses), while SPI is a private direct telephone line ☎️ (faster, but requires separate chip-select lines for each device).',
        steps: [
          'I2C: 2 wires (SDA, SCL), open-drain with pull-ups, 7/10-bit software addressing up to 3.4 Mbps.',
          'SPI: 4 wires (MOSI, MISO, SCK, CS), full-duplex push-pull, speeds exceeding 50 MHz.',
          'Trade-off: I2C saves pins on constrained MCUs; SPI provides max throughput for sensors/displays.',
        ],
        interviewAngle:
          'Questions typically revolve around bus arbitration, clock stretching, and pull-up resistor sizing in I2C.',
      },
    ],
  },
  MECH: {
    categories: ['All', 'GD&T & Design', 'CAE & FEA', 'Manufacturing & CNC'],
    concepts: [
      {
        id: 'mech-c1',
        title: 'Maximum Material Condition (MMC) in GD&T',
        category: 'GD&T & Design',
        desc: 'Bonus tolerance, pin/hole fit & ASME Y14.5',
        analogy:
          'Like fitting a suitcase into an airline baggage check frame 🧳. If your suitcase is packed slightly smaller than maximum size, you get bonus flexibility in how you tilt or angle it through the slot.',
        steps: [
          'MMC Definition: Feature contains maximum volume of material (largest pin or smallest hole).',
          'Bonus Tolerance: As manufactured size departs from MMC towards LMC, geometric tolerance increases.',
          'Functional Gauging: Hard physical gauges can verify parts quickly on the assembly line.',
        ],
        interviewAngle:
          'Interviewers often ask how MMC reduces manufacturing scrap rates and enables cost-effective go/no-go hard gauging.',
      },
      {
        id: 'mech-c2',
        title: 'Von Mises Yield Criterion in FEA',
        category: 'CAE & FEA',
        desc: 'Distortion energy, shear yield & safety factor',
        analogy:
          'Like inflating a balloon under water 🎈. Pure uniform hydrostatic pressure compresses the balloon without popping it; it is shear distortion that stretches the rubber until it yields.',
        steps: [
          'Hydrostatic vs Deviatoric Stress: Hydrostatic changes volume; deviatoric causes shear deformation.',
          'Distortion Energy Theory: Yielding begins when distortion energy reaches yield strength in simple tension.',
          'Validation: Accurately predicts failure in ductile structural steels, aluminum, and titanium.',
        ],
        interviewAngle:
          'Why is Von Mises criterion appropriate for ductile metals but unsuitable for brittle cast iron (where Rankine/Mohr applies)?',
      },
      {
        id: 'mech-c3',
        title: 'Adaptive Clearing in CNC Machining',
        category: 'Manufacturing & CNC',
        desc: 'Constant tool engagement, chip thinning & CAM',
        analogy:
          'Like peeling an apple with uniform gentle blade pressure 🍏 instead of jamming the knife into tight corners and snapping the tip.',
        steps: [
          'Constant Radial Engagement: Tool never exceeds set engagement angle (e.g. 15-20%).',
          'High Feed Rates & Full Flute Depth: Spreads heat and wear over the entire cutter length.',
          'Cycle Time Reduction: Eliminates sudden shock loads in internal pocket corners.',
        ],
        interviewAngle:
          'Focus on tool deflection reduction, chip thinning compensation, and machine cycle efficiency.',
      },
    ],
  },
  EEE: {
    categories: ['All', 'Power Electronics', 'Motor Drives & FOC', 'EV & Batteries'],
    concepts: [
      {
        id: 'eee-c1',
        title: 'Field-Oriented Control (FOC) in Motors',
        category: 'Motor Drives & FOC',
        desc: 'Clarke/Park transforms, torque & flux control',
        analogy:
          'Like riding a tandem bicycle 🚲 where you keep your foot pushing perpendicular to the pedals at all times to extract 100% mechanical torque without wasting effort pushing down on dead center.',
        steps: [
          'Clarke Transform: Converts 3-phase stator currents into 2-phase stationary frame.',
          'Park Transform: Rotates into rotor reference frame using rotor angle.',
          'Decoupled Control: Iq directly controls motor torque, Id controls magnetic field flux.',
        ],
        interviewAngle:
          'Common in EV powertrain interviews: discuss how field weakening is applied to exceed base motor speed.',
      },
      {
        id: 'eee-c2',
        title: 'DC-DC Buck-Boost Dynamics',
        category: 'Power Electronics',
        desc: 'CCM/DCM, inductor sizing & duty cycle',
        analogy:
          'Like a hydraulic hand pump 🚰. When you draw the lever up, you store energy in the chamber; when you push down, you discharge that energy into the tank at any desired pressure.',
        steps: [
          'Switch ON: Inductor energizes from DC input, diode reverse biased, capacitor feeds load.',
          'Switch OFF: Inductor magnetic field collapses, forward-biasing diode to transfer stored energy.',
          'Voltage Conversion Ratio: Vout = Vin * (D / (1 - D)), allowing stepping up or down.',
        ],
        interviewAngle:
          'Expect derivations of boundary conduction mode (BCM) and criteria for continuous vs discontinuous inductor current.',
      },
    ],
  },
  CIVIL: {
    categories: ['All', 'Structural & IS 456', 'BIM & Coordination', 'Project Planning'],
    concepts: [
      {
        id: 'civil-c1',
        title: 'Limit State Method vs Working Stress',
        category: 'Structural & IS 456',
        desc: 'Partial safety factors, serviceability & IS 456',
        analogy:
          'Working Stress is like driving with a strict arbitrary speed governor 🚗, while Limit State tests the true breaking point of each material and applies scientifically calculated safety cushions.',
        steps: [
          'Limit State of Collapse: Flexure, shear, compression, and torsion with load factors (1.5 for DL + LL).',
          'Limit State of Serviceability: Deflection, crack width, and vibration under normal operating conditions.',
          'Material Factors: Partial safety factor 1.5 for concrete and 1.15 for high-yield steel.',
        ],
        interviewAngle:
          'Why IS 456:2000 shifted to Limit State for reinforced concrete and where Working Stress is still retained (water tanks, retaining walls).',
      },
      {
        id: 'civil-c2',
        title: 'Clash Detection Matrices in BIM',
        category: 'BIM & Coordination',
        desc: 'Hard clashes, clearances & Navisworks Manage',
        analogy:
          'Like an airport air traffic control radar ✈️. Before planes take off, radar checks 3D corridors to guarantee a plumbing pipe doesn’t fly straight through a structural concrete shear wall.',
        steps: [
          'Model Federation: Architectural, Structural, and MEP IFC/RVT models merged in Navisworks.',
          'Hard Clash: Physical geometric intersection (e.g. 300mm HVAC duct intersecting concrete beam).',
          'Clash Resolution Report: Assigned to discipline lead with grid coordinates and timestamp for signoff.',
        ],
        interviewAngle:
          'Discuss how soft clearance clashes prevent maintenance access issues and acoustic bridge vibrations.',
      },
    ],
  },
};

export default function LearningPage() {
  const { studentBranch } = useAuth();
  const branchKey = BRANCH_LEARNING_DATA[studentBranch] ? studentBranch : 'CSE';
  const branchData = useMemo(() => BRANCH_LEARNING_DATA[branchKey] || BRANCH_LEARNING_DATA.CSE, [branchKey]);

  const [activeCategory, setActiveCategory] = useState('All');
  const [activeConcept, setActiveConcept] = useState<Concept>(branchData.concepts[0]);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<
    Array<{ sender: 'ai' | 'user'; text: string; time: string }>
  >([]);

  // Sync when student branch or data changes
  useEffect(() => {
    setActiveCategory('All');
    const firstConcept = branchData.concepts[0];
    setActiveConcept(firstConcept);
    setMessages([
      {
        sender: 'ai',
        text: `Welcome! I'm your AI Learning Assistant for ${studentBranch} Engineering. Tap any concept on the left, or ask any technical doubt below.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [studentBranch, branchData]);

  const filteredConcepts = useMemo(() => {
    if (activeCategory === 'All') return branchData.concepts;
    return branchData.concepts.filter((c) => c.category === activeCategory);
  }, [activeCategory, branchData]);

  const handleSelectConcept = (c: Concept) => {
    setActiveConcept(c);
    setMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: `Explain ${c.title} to me.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        sender: 'ai',
        text: `${c.analogy}\n\nKey Mechanism:\n${c.steps.join('\n')}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSendMessage = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const query = customText || chatInput;
    if (!query.trim()) return;

    setChatInput('');
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: query,
        time,
      },
      {
        sender: 'ai',
        text: `Here is a clear breakdown for "${query}":\n\n1. Core Idea: In technical interviews, always frame this in terms of performance trade-offs (time vs memory, speed vs reliability).\n2. Real-World Context: When applied to ${activeConcept.title}, it ensures deterministic execution and minimal latency.\n3. Pro-Tip: State your assumptions clearly before answering!`,
        time,
      },
    ]);
  };

  return (
    <div className="space-y-6 pb-16 w-full font-sans text-[#1E1C10]">
      {/* Page Header */}
      <PageHeader
        title="AI Learning Assistant"
        description="Master core engineering and placement concepts with clear analogies, step-by-step breakdowns, and instant AI doubt clearing."
        icon={<BookOpen className="h-6 w-6 text-[#726600]" />}
        badge={<Badge variant="default">{studentBranch || 'Core'} Curated</Badge>}
      />

      {/* Main 2-Column Clean Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ─── LEFT COLUMN: Topic Explorer (4 cols) ─── */}
        <aside className="lg:col-span-4 bg-[#FAF3DF] border border-[#CDC7AA]/60 rounded-3xl p-5 shadow-xs space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C775F] block mb-1">
              Curated Topics ({studentBranch})
            </span>
            <h2 className="text-base font-bold text-[#1E1C10] font-heading">
              Key Placement Fundamentals
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 pb-1">
            {branchData.categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#FFE600] text-[#1E1C10] shadow-xs'
                    : 'bg-white border border-[#CDC7AA]/40 text-[#7C775F] hover:bg-[#FAF3DF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Concept List */}
          <div className="space-y-2">
            {filteredConcepts.map((c) => {
              const isSelected = activeConcept.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => handleSelectConcept(c)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-white border-[#FFE600] shadow-xs ring-2 ring-[#FFE600]/30'
                      : 'bg-white/70 border-[#CDC7AA]/40 hover:bg-white hover:border-[#CDC7AA]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C775F]">
                      {c.category}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-[#006B5B] bg-[#00F5D4]/25 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs font-bold text-[#1E1C10]">{c.title}</h3>
                  <p className="text-[11px] text-[#7C775F] mt-0.5 line-clamp-1">{c.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#CDC7AA]/30 text-center">
            <p className="text-[11px] text-[#7C775F]">
              Select any topic above to view its analogy, mechanism, and interview questions.
            </p>
          </div>
        </aside>

        {/* ─── RIGHT COLUMN: Concept Deep-Dive & AI Q&A (8 cols) ─── */}
        <main className="lg:col-span-8 space-y-6">
          {/* Active Concept Explanation Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#CDC7AA]/60 shadow-xs space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6A5F00] bg-[#FFE600]/30 px-2.5 py-0.5 rounded-full">
                  {activeConcept.category}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1E1C10] font-heading mt-2">
                {activeConcept.title}
              </h2>
              <p className="text-xs text-[#7C775F] mt-1">{activeConcept.desc}</p>
            </div>

            {/* Intuitive Analogy Box */}
            <div className="p-4 bg-[#FAF3DF] rounded-2xl border border-[#CDC7AA]/50 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#6A5F00]">
                <Lightbulb className="w-4 h-4" />
                <span>The Simple Real-World Analogy</span>
              </div>
              <p className="text-xs sm:text-sm text-[#1E1C10] leading-relaxed font-medium">
                {activeConcept.analogy}
              </p>
            </div>

            {/* How It Works (Step-by-Step) */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#7C775F]">
                How It Works Under the Hood
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {activeConcept.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAF3DF]/40 rounded-xl border border-[#CDC7AA]/30 flex items-start gap-3 text-xs text-[#1E1C10]"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#FFE600] text-[#1E1C10] font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interview Question Angle */}
            {activeConcept.interviewAngle && (
              <div className="p-3.5 bg-white rounded-2xl border border-[#CDC7AA]/50 text-xs text-[#4B4731] flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-[#006B5B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1E1C10] block mb-0.5">
                    How Interviewers Test This:
                  </strong>
                  <span>{activeConcept.interviewAngle}</span>
                </div>
              </div>
            )}
          </div>

          {/* AI Doubt Clearing & Chat Stream */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#CDC7AA]/60 shadow-xs flex flex-col justify-between min-h-[380px] space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#CDC7AA]/30 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#6A5F00]" />
                  <h3 className="text-sm font-bold text-[#1E1C10]">
                    Ask AI Assistant about {activeConcept.title}
                  </h3>
                </div>
                <span className="text-[11px] text-[#7C775F]">Interactive Tutor</span>
              </div>

              {/* Messages Stream */}
              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      m.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-[#7C775F] mb-1 font-semibold">
                      <span>{m.sender === 'user' ? 'You' : 'AI Assistant'}</span>
                      <span>•</span>
                      <span>{m.time}</span>
                    </div>
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-xl whitespace-pre-line ${
                        m.sender === 'user'
                          ? 'bg-[#FFE600] text-[#1E1C10] font-semibold rounded-tr-xs'
                          : 'bg-[#FAF3DF] text-[#1E1C10] border border-[#CDC7AA]/50 rounded-tl-xs'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="space-y-3 pt-3 border-t border-[#CDC7AA]/30">
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Explain in simpler terms',
                  'What are common interview pitfalls?',
                  'Show a code or diagram example',
                  'What are the trade-offs?',
                ].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSendMessage(undefined, prompt)}
                    className="px-3 py-1 rounded-full bg-[#FAF3DF] hover:bg-[#EEE8D4] text-[#4B4731] hover:text-[#1E1C10] text-[11px] font-bold transition-colors border border-[#CDC7AA]/40 cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={`Ask anything about ${activeConcept.title} or general engineering...`}
                  className="flex-1 px-4 py-2.5 bg-[#FAF3DF]/70 border border-[#CDC7AA]/50 rounded-full text-xs sm:text-sm text-[#1E1C10] placeholder-[#7C775F] focus:outline-none focus:border-[#6A5F00] transition-colors font-medium"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="w-10 h-10 rounded-full bg-[#FFE600] text-[#1E1C10] flex items-center justify-center hover:brightness-105 active:scale-95 transition-all shadow-xs shrink-0 cursor-pointer disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
