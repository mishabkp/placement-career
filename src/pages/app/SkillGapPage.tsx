import { useState } from 'react';
import { PageHeader } from '../../components/shared/PageHeader';
import {
  TrendingUp,
  Psychology,
  CodeIcon,
  Dns,
  Web,
  Storage,
  SmartToy,
  ArrowRight,
} from '../../components/icons/StitchIcons';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { mockSkillRadarData } from '../../data/mockData';

export default function SkillGapPage() {
  const [activeNotification, setActiveNotification] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<string[]>([
    "Beep boop! 🤖 I'm Pal-Bot. Your React & DSA skills are in great shape! Ask me anything about System Design or Node.js to close your remaining 22% gap."
  ]);

  const showToast = (msg: string) => {
    setActiveNotification(msg);
    setTimeout(() => setActiveNotification(null), 3000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages((prev) => [
      ...prev,
      `You: ${userMsg}`,
      `Pal-Bot: Great question about "${userMsg}"! Focus on master-slave replication and write-through caching to pass Tier-1 interviews.`
    ]);
    setChatInput('');
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
        title="Skill Gap Analyzer"
        description="Pinpoint missing technical competencies, compare against real-time industry benchmarks, and accelerate your placement readiness."
        icon={<TrendingUp className="h-6 w-6 text-[#6A5F00]" />}
        badge={<Badge variant="cyprus">Diagnostic Center</Badge>}
        actions={
          <Button
            variant="primary"
            onClick={() => showToast('AI Skill Boost initialized! 3 priority modules loaded.')}
            className="flex items-center gap-2 !bg-[#FFE600] !text-[#1A1A1A] !border-none !rounded-full font-bold shadow-md hover:scale-105"
          >
            <Psychology className="h-4 w-4" />
            AI Skill Boost
          </Button>
        }
      />

      {/* ─── Top Banner / Intro (Exact Stitch Colors) ─── */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 bg-[#FAF3DF] border border-[#CDC7AA]/50 p-6 sm:p-8 rounded-3xl shadow-sm">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-black text-[#6A5F00] uppercase tracking-wider">
            Diagnostic Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E1C10] tracking-tight font-heading">
            Skill Gap Analysis: SDE-1 Track
          </h1>
          <p className="text-xs sm:text-sm text-[#4B4731] max-w-2xl leading-relaxed">
            Compare your current technical DNA against top-tier Software Engineer requirements. Pinpoint missing competencies and boost them instantly with AI guidance.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="bg-[#FFE600] px-4 py-2.5 rounded-full flex items-center gap-2 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#726600] animate-pulse" />
            <span className="text-xs font-black text-[#726600]">Overall Match: 78%</span>
          </div>
          <button
            onClick={() => showToast('AI Skill Boost prioritized 2 System Design exercises.')}
            className="bg-[#FFE600] text-[#1A1A1A] hover:bg-[#FDD835] text-xs font-extrabold px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(255,230,0,0.4)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Psychology className="h-4 w-4" />
            AI Skill Boost
          </button>
        </div>
      </div>

      {/* ─── Main Grid Layout (Stitch Styled) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Skill Breakdown & Radar representation */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Core Competency Breakdown Card */}
          <div className="bg-white border border-[#CDC7AA]/40 p-6 sm:p-7 rounded-3xl shadow-sm flex flex-col gap-5">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h2 className="text-xl font-bold text-[#1E1C10] font-heading">Core Competency Breakdown</h2>
              <span className="text-xs font-semibold text-[#7C775F]">Target: SDE-1 Benchmark</span>
            </div>

            <div className="flex flex-col gap-4">
              {/* Skill 1: DSA */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-[#1E1C10]">
                    <CodeIcon className="h-4 w-4 text-[#6A5F00]" />
                    Data Structures & Algorithms
                  </span>
                  <span className="text-[#6A5F00] font-mono">85% / 90%</span>
                </div>
                <div className="w-full bg-[#F4EEDA] h-3.5 rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div className="bg-[#6A5F00] h-full rounded-full transition-all duration-1000" style={{ width: '85%' }} />
                </div>
              </div>

              {/* Skill 2: System Design */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-[#1E1C10]">
                    <Dns className="h-4 w-4 text-[#006B5B]" />
                    System Design & Architecture
                  </span>
                  <span className="text-[#006B5B] font-mono">60% / 80%</span>
                </div>
                <div className="w-full bg-[#F4EEDA] h-3.5 rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div className="bg-[#006B5B] h-full rounded-full transition-all duration-1000" style={{ width: '60%' }} />
                </div>
              </div>

              {/* Skill 3: React / Frontend */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-[#1E1C10]">
                    <Web className="h-4 w-4 text-[#9B5DE5]" />
                    React & Modern Frontend
                  </span>
                  <span className="text-[#9B5DE5] font-mono">92% / 85%</span>
                </div>
                <div className="w-full bg-[#F4EEDA] h-3.5 rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div className="bg-[#9B5DE5] h-full rounded-full transition-all duration-1000" style={{ width: '92%' }} />
                </div>
              </div>

              {/* Skill 4: Node / Backend */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-[#1E1C10]">
                    <Storage className="h-4 w-4 text-[#006A6A]" />
                    Node.js & Databases
                  </span>
                  <span className="text-[#006A6A] font-mono">70% / 80%</span>
                </div>
                <div className="w-full bg-[#F4EEDA] h-3.5 rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div className="bg-[#006A6A] h-full rounded-full transition-all duration-1000" style={{ width: '70%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Radar Simulation Card */}
          <div className="bg-[#FAF3DF] border border-[#CDC7AA]/50 p-6 sm:p-7 rounded-3xl shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 flex flex-col gap-3">
              <h3 className="text-lg font-bold text-[#1E1C10] font-heading">Skill Equilibrium Polygon</h3>
              <p className="text-xs text-[#4B4731] leading-relaxed">
                Your profile exhibits a strong frontend tilt with solid algorithmic grounding. Closing the System Design gap will unlock Tier-1 product company interviews.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3.5 py-1 bg-[#FFE600] text-[#726600] text-xs font-bold rounded-full shadow-sm">
                  DSA: Good
                </span>
                <span className="px-3.5 py-1 bg-[#FF6B6B]/20 text-[#BA1A1A] border border-[#FF6B6B]/30 text-xs font-bold rounded-full">
                  System Design: Needs Focus
                </span>
              </div>
            </div>

            {/* Radar Chart Styled with Stitch Colors */}
            <div className="w-64 h-60 relative flex items-center justify-center shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={mockSkillRadarData}>
                  <PolarGrid stroke="#CDC7AA" strokeDasharray="3 3" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#4B4731', fontSize: 10, fontWeight: 700 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Target Benchmark" dataKey="benchmark" stroke="#6A5F00" fill="#6A5F00" fillOpacity={0.12} strokeWidth={2} />
                  <Radar name="Your Score" dataKey="user" stroke="#00F5D4" fill="#00F5D4" fillOpacity={0.35} strokeWidth={2.5} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Robot Mascot Tips & Actionable Boosters */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Mascot Tip Card (Stitch Sunshine Yellow) */}
          <div className="bg-[#FFE600] border-2 border-[#E7D2A0] p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col gap-4 text-[#726600]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#6A5F00] shadow-sm">
                <SmartToy className="h-7 w-7" />
              </div>
              <div>
                <h4 className="text-base font-black text-[#726600] font-heading">Pal-Bot's Quick Tip</h4>
                <span className="text-xs text-[#726600]/80 font-bold">AI Mentor Active</span>
              </div>
            </div>

            <p className="text-xs text-[#726600] bg-white/75 border border-white/80 p-4 rounded-2xl leading-relaxed shadow-sm font-medium">
              "Beep boop! 🤖 Your React score is stellar, but interviewers might drill down on Node.js clustering and database indexing. Tackle the 3 recommended modules below to level up!"
            </p>

            <button
              onClick={() => setChatOpen(!chatOpen)}
              className="bg-white text-[#1E1C10] font-extrabold text-xs py-2.5 px-5 rounded-full self-start hover:bg-[#FFF9E9] transition-all shadow-md cursor-pointer"
            >
              {chatOpen ? 'Hide Pal-Bot Chat' : 'Chat with Pal-Bot'}
            </button>

            {/* Quick Interactive Chat Drawer */}
            {chatOpen && (
              <div className="mt-2 bg-white border border-[#CDC7AA] p-3.5 rounded-2xl space-y-2.5 animate-in fade-in duration-150">
                <div className="max-h-40 overflow-y-auto space-y-2 text-xs text-[#1E1C10]">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-2.5 rounded-xl ${
                        msg.startsWith('You:')
                          ? 'bg-[#FFE600]/30 text-[#726600] font-bold ml-4 text-right'
                          : 'bg-[#FAF3DF] text-[#1E1C10] mr-4'
                      }`}
                    >
                      {msg}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask Pal-Bot a question..."
                    className="flex-1 bg-[#FAF3DF] border border-[#CDC7AA] rounded-full px-3.5 py-1.5 text-xs text-[#1E1C10] focus:outline-none focus:border-[#6A5F00]"
                  />
                  <button
                    type="submit"
                    className="bg-[#6A5F00] text-white text-xs font-bold px-4 py-1.5 rounded-full hover:bg-black cursor-pointer"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Actionable Recommended Boost Modules */}
          <div className="bg-white border border-[#CDC7AA]/40 p-6 rounded-3xl shadow-sm flex flex-col gap-4">
            <h3 className="text-lg font-bold text-[#1E1C10] font-heading">Recommended Boost Modules</h3>
            <div className="flex flex-col gap-3">
              {[
                {
                  title: 'Distributed Cache Systems',
                  desc: 'System Design • 45 mins',
                  icon: <Dns className="h-5 w-5 text-[#006A6A]" />,
                  bg: 'bg-[#00FEFF]/20 border-[#00FEFF]/40',
                },
                {
                  title: 'Advanced SQL Indexing',
                  desc: 'Node & Backend • 30 mins',
                  icon: <Storage className="h-5 w-5 text-[#007261]" />,
                  bg: 'bg-[#26FEDC]/20 border-[#26FEDC]/40',
                },
                {
                  title: 'Redis Pub/Sub Architecture',
                  desc: 'Distributed Systems • 40 mins',
                  icon: <Web className="h-5 w-5 text-[#9B5DE5]" />,
                  bg: 'bg-[#9B5DE5]/20 border-[#9B5DE5]/40',
                },
              ].map((mod) => (
                <div
                  key={mod.title}
                  onClick={() => showToast(`Enrolled in "${mod.title}" module!`)}
                  className="flex items-center justify-between p-3.5 bg-[#FAF3DF] border border-[#CDC7AA]/40 rounded-2xl hover:bg-white hover:border-[#FFE600] hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${mod.bg}`}>
                      {mod.icon}
                    </div>
                    <div>
                      <h5 className="text-xs font-extrabold text-[#1E1C10] group-hover:text-[#6A5F00] transition-colors">
                        {mod.title}
                      </h5>
                      <span className="text-[11px] text-[#7C775F]">{mod.desc}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#7C775F] group-hover:text-[#6A5F00] group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
