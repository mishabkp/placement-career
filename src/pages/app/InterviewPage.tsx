import { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '../../components/shared/PageHeader';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/ui/Badge';
import {
  Mic,
  Play,
  RotateCcw,
  Sparkles,
  Clock,
  ArrowRight,
  HelpCircle,
  Award,
} from 'lucide-react';

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
        'How do you optimize state management and avoid unnecessary re-renders in a large-scale React application?',
        'Describe how you design a database schema for handling millions of concurrent chat messages in PostgreSQL or MongoDB.',
        'Describe a challenging bug you encountered in production or a project and how you methodically resolved it.',
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
        'How does React reconciliation and the Virtual DOM diffing algorithm function under the hood?',
        'Explain Core Web Vitals (LCP, INP, CLS) and the specific techniques you use to optimize them.',
        'What are the performance implications of Server Components versus Client Components in Next.js?',
        'How do you ensure accessibility (WCAG 2.1 AA) and semantic HTML across complex custom widgets?',
        'Describe your approach to creating reusable, themeable component libraries with TypeScript.',
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
        'What are the primary considerations when selecting steel alloys for cyclic fatigue applications?',
      ],
    },
    {
      title: 'CAE & Finite Element Analysis Engineer',
      category: 'Structural & Simulation',
      questions: [
        'What is the difference between hex (brick) and tet (tetrahedral) meshing in ANSYS, and when is each preferred?',
        'Explain Von Mises stress criteria and when it is appropriate for ductile materials versus brittle materials.',
        'How do you identify and resolve artificial stress singularities at sharp internal re-entrant corners in FEA?',
        'What boundary conditions are required to prevent rigid body motion in a 3D static structural analysis?',
        'Explain modal analysis and how natural frequencies relate to resonance avoidance in rotating machinery.',
      ],
    },
    {
      title: 'Robotics & Automation Engineer',
      category: 'Automation & Kinematics',
      questions: [
        'What is the difference between forward kinematics and inverse kinematics in a 6-DOF industrial robotic arm?',
        'How do PID controller tuning parameters (Kp, Ki, Kd) influence overshoot, rise time, and steady-state error?',
        'Explain the working principle of optical encoders and how quadrature decoding determines rotational direction.',
        'How do pneumatic actuators compare to servo-electric actuators in terms of precision and cycle speed?',
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
        'Why are SiC and GaN MOSFETs preferred over conventional Silicon IGBTs in 800V EV traction inverters?',
        'Explain Field Oriented Control (FOC) for Permanent Magnet Synchronous Motors using Clarke and Park transformations.',
        'How does a Battery Management System (BMS) perform passive cell balancing versus active balancing?',
        'What methods are used to estimate Battery State of Charge (SoC) accurately under dynamic driving loads?',
      ],
    },
    {
      title: 'Industrial Automation & PLC Engineer',
      category: 'Control & Automation',
      questions: [
        'Explain the scan cycle of a Siemens S7 PLC (Read Inputs, Execute Logic, Update Outputs, Diagnostics).',
        'What is the difference between sinking (NPN) and sourcing (PNP) sensor wiring for industrial digital inputs?',
        'How do you configure an interlocked safety circuit with emergency stop relays (Category 4 / SIL 3)?',
        'Explain Modbus RTU vs Modbus TCP protocol frame structures and register addressing conventions.',
        'How do you design alarm priority grouping and trending screens in WinCC SCADA for critical process monitoring?',
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
        'Describe the OpenBIM IFC schema and how it facilitates interoperability between diverse software platforms.',
      ],
    },
  ],
};

interface QuestionFeedback {
  score: number;
  strengths: string[];
  improvement: string;
}

export default function InterviewPage() {
  const { studentBranch } = useAuth();
  const branchKey = BRANCH_INTERVIEW_DATA[studentBranch] ? studentBranch : 'CSE';
  const availableRoles = useMemo(() => BRANCH_INTERVIEW_DATA[branchKey] || BRANCH_INTERVIEW_DATA.CSE, [branchKey]);

  const [selectedRole, setSelectedRole] = useState<string>(() => availableRoles[0]?.title || 'Fullstack Engineer');
  const [interviewType, setInterviewType] = useState<'technical' | 'behavioral'>('technical');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<QuestionFeedback | null>(null);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [answersSubmitted, setAnswersSubmitted] = useState<number>(0);

  // Sync selected role when branch changes
  useEffect(() => {
    if (availableRoles.length > 0 && !availableRoles.some((r) => r.title === selectedRole)) {
      setSelectedRole(availableRoles[0].title);
    }
  }, [availableRoles, selectedRole]);

  const currentRoleData = useMemo(() => {
    return availableRoles.find((r) => r.title === selectedRole) || availableRoles[0];
  }, [availableRoles, selectedRole]);

  const questions = currentRoleData.questions;

  const handleStartInterview = () => {
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setFeedback(null);
    setAnswersSubmitted(0);
    setSessionCompleted(false);
    setShowHint(false);
    setIsSessionActive(true);
  };

  const handleSpeechToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate real-time dictation after 1.5 seconds if speech is empty
      setTimeout(() => {
        setUserAnswer((prev) =>
          prev
            ? prev + ' In addition, I consider the scalability trade-offs and edge cases early in the design.'
            : 'To approach this problem, I would first break it down into the core data models and requirements. For example, ensuring proper indexing and caching strategies to minimize latency...'
        );
        setIsRecording(false);
      }, 2000);
    } else {
      setIsRecording(false);
    }
  };

  const handleSubmitAnswer = () => {
    // Generate helpful, concise AI evaluation based on length and content
    const length = userAnswer.trim().length;
    const score = length > 120 ? 9.0 : length > 50 ? 8.0 : 7.0;

    setFeedback({
      score,
      strengths: [
        'Structured thought process and clear technical terminology.',
        'Directly addressed the core architectural requirement.',
      ],
      improvement:
        'Consider mentioning concrete error handling or performance trade-offs (e.g. time vs space complexity).',
    });
    setAnswersSubmitted((prev) => prev + 1);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer('');
      setFeedback(null);
      setShowHint(false);
    } else {
      setSessionCompleted(true);
    }
  };

  const handleExitSession = () => {
    setIsSessionActive(false);
    setSessionCompleted(false);
  };

  return (
    <div className="space-y-6 pb-16 w-full font-sans">
      {/* Page Header */}
      <PageHeader
        title="AI Mock Interview"
        description="Practice branch-tailored technical and behavioral interview questions with instant, structured AI evaluation."
        icon={<Mic className="h-6 w-6 text-[#726600]" />}
        badge={<Badge variant="default">{studentBranch || 'Engineering'} Track</Badge>}
        actions={
          !isSessionActive && (
            <button
              onClick={handleStartInterview}
              className="px-5 py-2.5 bg-[#FFE600] text-[#1E1C10] font-bold text-xs rounded-full shadow-sm hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Start Mock Interview
            </button>
          )
        }
      />

      {/* ─── CASE 1: ACTIVE INTERVIEW SESSION ─── */}
      {isSessionActive ? (
        <div className="bg-[#FAF3DF] border border-[#CDC7AA]/60 rounded-3xl p-6 sm:p-8 shadow-xs animate-fadeIn space-y-6">
          {sessionCompleted ? (
            /* Completion Card */
            <div className="text-center py-8 max-w-lg mx-auto space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#FFE600] text-[#1E1C10] flex items-center justify-center mx-auto shadow-sm">
                <Award className="w-8 h-8 text-[#6A5F00]" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7C775F]">
                  Session Complete
                </span>
                <h2 className="text-2xl font-black text-[#1E1C10] font-heading mt-1">
                  Great Practice Session!
                </h2>
                <p className="text-xs text-[#4B4731] mt-1">
                  You completed the interview for <strong className="text-[#1E1C10]">{selectedRole}</strong>.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-2xl border border-[#CDC7AA]/50 text-center">
                <div>
                  <span className="text-[10px] text-[#7C775F] font-bold uppercase block">Overall Score</span>
                  <span className="text-xl font-black text-[#006B5B] block mt-0.5">86 / 100</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7C775F] font-bold uppercase block">Questions</span>
                  <span className="text-xl font-black text-[#1E1C10] block mt-0.5">
                    {answersSubmitted} / {questions.length}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7C775F] font-bold uppercase block">Confidence</span>
                  <span className="text-xl font-black text-[#6A5F00] block mt-0.5">Strong</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleStartInterview}
                  className="px-5 py-2.5 bg-[#FFE600] text-[#1E1C10] text-xs font-bold rounded-full shadow-sm hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Practice Again
                </button>
                <button
                  onClick={handleExitSession}
                  className="px-5 py-2.5 bg-white border border-[#CDC7AA]/60 text-[#1E1C10] text-xs font-bold rounded-full shadow-xs hover:bg-[#FAF3DF] transition-all cursor-pointer"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          ) : (
            /* Active Question Flow */
            <>
              {/* Stepper Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#CDC7AA]/40">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#6A5F00] bg-[#FFE600]/40 px-3 py-1 rounded-full">
                    {selectedRole}
                  </span>
                  <span className="text-xs text-[#7C775F] font-medium">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {questions.map((_, i) => (
                      <span
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          i === currentQuestionIndex
                            ? 'bg-[#6A5F00] scale-125'
                            : i < currentQuestionIndex
                            ? 'bg-[#006B5B]'
                            : 'bg-[#CDC7AA]/50'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleExitSession}
                    className="text-xs text-[#7C775F] hover:text-[#1E1C10] font-bold ml-2 cursor-pointer"
                  >
                    Exit
                  </button>
                </div>
              </div>

              {/* Question Text Box */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#CDC7AA]/50 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C775F]">
                    {currentRoleData.category}
                  </span>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs text-[#6A5F00] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    {showHint ? 'Hide Answering Tip' : 'Answering Tip'}
                  </button>
                </div>

                <p className="text-base sm:text-lg font-bold text-[#1E1C10] leading-snug">
                  "{questions[currentQuestionIndex]}"
                </p>

                {showHint && (
                  <div className="p-3 bg-[#FAF3DF] rounded-xl border border-[#CDC7AA]/40 text-xs text-[#4B4731] leading-relaxed">
                    <strong className="text-[#1E1C10]">Guidance:</strong> Start with a clear definition, walk through your practical approach step-by-step, and conclude with the trade-offs or a project example.
                  </div>
                )}
              </div>

              {/* User Answer Textarea */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1E1C10]">
                    Your Response:
                  </label>
                  <button
                    type="button"
                    onClick={handleSpeechToggle}
                    className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isRecording
                        ? 'bg-[#FF6B6B] text-white animate-pulse'
                        : 'bg-white border border-[#CDC7AA]/50 text-[#1E1C10] hover:bg-[#FAF3DF]'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    {isRecording ? 'Listening...' : 'Voice Dictate'}
                  </button>
                </div>

                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={feedback !== null}
                  rows={4}
                  placeholder="Type or voice-dictate your response here..."
                  className="w-full bg-white border border-[#CDC7AA]/60 rounded-2xl p-4 text-xs sm:text-sm text-[#1E1C10] focus:outline-none focus:border-[#6A5F00] transition-colors leading-relaxed placeholder-[#7C775F] disabled:bg-[#FAF3DF]/60"
                />
              </div>

              {/* AI Feedback Card (when submitted) */}
              {feedback && (
                <div className="p-5 bg-white rounded-2xl border-2 border-[#FFE600] shadow-sm space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#6A5F00]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1E1C10]">
                        AI Assessment
                      </span>
                    </div>
                    <span className="text-xs font-black text-[#006B5B] bg-[#00F5D4]/25 px-2.5 py-0.5 rounded-full">
                      Score: {feedback.score} / 10
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="text-[#006B5B] font-medium">
                      <strong className="text-[#1E1C10]">Strengths:</strong>
                      <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-[#4B4731]">
                        {feedback.strengths.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-[#4B4731] pt-1 border-t border-[#CDC7AA]/30">
                      <strong className="text-[#B45309]">Improvement Suggestion:</strong> {feedback.improvement}
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="text-xs font-bold text-[#7C775F] hover:text-[#1E1C10] cursor-pointer"
                >
                  {feedback ? 'Skip Evaluation' : 'Skip Question →'}
                </button>

                <div className="flex items-center gap-2">
                  {!feedback ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={!userAnswer.trim()}
                      className="px-5 py-2.5 bg-[#FFE600] text-[#1E1C10] text-xs font-bold rounded-full shadow-sm hover:brightness-105 transition-all cursor-pointer disabled:opacity-50"
                    >
                      Submit for AI Review
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2.5 bg-[#1E1C10] text-white text-xs font-bold rounded-full shadow-sm hover:bg-black transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        /* ─── CASE 2: DASHBOARD & SETUP VIEW (Clean & Minimal) ─── */
        <div className="space-y-6">
          {/* Main Setup Card */}
          <div className="bg-[#FAF3DF] border border-[#CDC7AA]/60 rounded-3xl p-6 sm:p-7 shadow-xs">
            <div className="max-w-2xl mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6A5F00] block mb-1">
                Configure Your Session
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1E1C10] font-heading mb-2">
                Select Your Target Role & Focus Area
              </h2>
              <p className="text-xs sm:text-sm text-[#4B4731]">
                Questions are calibrated specifically for {studentBranch} campus hiring assessments.
              </p>
            </div>

            {/* Role Selection Pills */}
            <div className="space-y-2 mb-5">
              <label className="text-xs font-bold text-[#1E1C10] block">Specialization Track:</label>
              <div className="flex flex-wrap gap-2">
                {availableRoles.map((roleObj) => (
                  <button
                    key={roleObj.title}
                    type="button"
                    onClick={() => setSelectedRole(roleObj.title)}
                    className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all ${
                      selectedRole === roleObj.title
                        ? 'bg-[#FFE600] text-[#1E1C10] shadow-sm font-black'
                        : 'bg-white border border-[#CDC7AA]/50 text-[#4B4731] hover:bg-[#FAF3DF]'
                    }`}
                  >
                    {roleObj.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Interview Type Selector */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-[#1E1C10] block">Question Focus:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
                <button
                  type="button"
                  onClick={() => setInterviewType('technical')}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    interviewType === 'technical'
                      ? 'bg-white border-[#FFE600] ring-2 ring-[#FFE600]/40 shadow-xs'
                      : 'bg-white/60 border-[#CDC7AA]/40 hover:bg-white'
                  }`}
                >
                  <p className="text-xs font-bold text-[#1E1C10]">Technical & Architecture</p>
                  <p className="text-[11px] text-[#7C775F] mt-0.5">
                    Core principles, system design, and implementation trade-offs.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setInterviewType('behavioral')}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    interviewType === 'behavioral'
                      ? 'bg-white border-[#FFE600] ring-2 ring-[#FFE600]/40 shadow-xs'
                      : 'bg-white/60 border-[#CDC7AA]/40 hover:bg-white'
                  }`}
                >
                  <p className="text-xs font-bold text-[#1E1C10]">Behavioral (STAR Method)</p>
                  <p className="text-[11px] text-[#7C775F] mt-0.5">
                    Teamwork, conflict resolution, and project leadership.
                  </p>
                </button>
              </div>
            </div>

            {/* Launch Banner */}
            <div className="pt-4 border-t border-[#CDC7AA]/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#7C775F]">
                <Clock className="w-4 h-4 text-[#6A5F00]" />
                <span>5 Questions • Instant AI Rubric • Approx. 15 mins</span>
              </div>

              <button
                onClick={handleStartInterview}
                className="px-6 py-3 bg-[#FFE600] text-[#1E1C10] font-black rounded-full text-xs shadow-sm hover:brightness-105 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="h-4 w-4 fill-current" />
                Start Mock Interview Session
              </button>
            </div>
          </div>

          {/* 3 Preparation Principles (Clean & Educational) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#CDC7AA]/50 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-[#FAF3DF] flex items-center justify-center text-[#6A5F00] font-bold text-xs mb-3">
                01
              </div>
              <h3 className="text-xs font-bold text-[#1E1C10] uppercase tracking-wide">
                Structure Before Details
              </h3>
              <p className="text-xs text-[#4B4731] mt-1 leading-relaxed">
                State your high-level approach first. Interviewers want to verify your problem breakdown before deep-diving into syntax.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#CDC7AA]/50 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-[#FAF3DF] flex items-center justify-center text-[#006B5B] font-bold text-xs mb-3">
                02
              </div>
              <h3 className="text-xs font-bold text-[#1E1C10] uppercase tracking-wide">
                Use the STAR Framework
              </h3>
              <p className="text-xs text-[#4B4731] mt-1 leading-relaxed">
                Frame project challenges as Situation, Task, Action, and Result with quantifiable outcomes.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#CDC7AA]/50 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-[#FAF3DF] flex items-center justify-center text-[#B45309] font-bold text-xs mb-3">
                03
              </div>
              <h3 className="text-xs font-bold text-[#1E1C10] uppercase tracking-wide">
                Discuss Trade-Offs
              </h3>
              <p className="text-xs text-[#4B4731] mt-1 leading-relaxed">
                Highlight why you chose a specific data structure or design pattern over plausible alternatives.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
