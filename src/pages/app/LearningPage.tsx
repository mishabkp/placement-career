import { useState } from 'react';
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
} from 'lucide-react';

interface Concept {
  id: string;
  title: string;
  category: string;
  desc: string;
  xp: string;
  icon: typeof Cpu;
  analogy: string;
  steps: string[];
}

const CONCEPTS: Concept[] = [
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
];

export default function LearningPage() {
  const [activeCategory, setActiveCategory] = useState('Core CS & OS');
  const [activeConcept, setActiveConcept] = useState<Concept>(CONCEPTS[0]);
  const [simStep, setSimStep] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<
    Array<{ sender: 'ai' | 'user'; text: string; time: string }>
  >([
    {
      sender: 'ai',
      text: "Hello Arjun! 🤖 I'm your AI Learning Coach. What concept or technology would you like to explore today? Tap any topic on the left or type below!",
      time: '10:42 AM',
    },
    {
      sender: 'user',
      text: 'Can you explain the event loop in Node.js in simple terms with an example?',
      time: '10:43 AM',
    },
    {
      sender: 'ai',
      text: CONCEPTS[0].analogy,
      time: '10:44 AM',
    },
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
              Ask doubts, unlock live visual concept simulators, and crack complex CS engineering interviews with Pal-Bot!
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
                <span>Concept Orbit</span>
              </div>
              <span className="text-[11px] font-bold bg-[#FAF3DF] px-2.5 py-0.5 rounded-full text-[#4B4731]">
                {CONCEPTS.length} Topics
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {['Core CS & OS', 'System Design', 'Data Structures', 'Fullstack Web'].map((cat) => (
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
              {CONCEPTS.map((c) => {
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
              "Can you explain <strong>deadlock prevention</strong> in just 2 simple sentences?"
            </p>
            <div className="flex items-center justify-between bg-white/90 backdrop-blur p-2 rounded-full pl-3.5 shadow-sm">
              <span className="text-xs font-bold text-[#006B5B]">Reward: +50 XP 🏆</span>
              <button
                onClick={() => showToast('Deadlock Quest accepted! Answer in chat.')}
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
