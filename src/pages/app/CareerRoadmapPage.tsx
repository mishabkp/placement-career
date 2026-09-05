import { useState } from 'react';
import { PageHeader } from '../../components/shared/PageHeader';
import {
  Map, CheckCircle2, ArrowRight,
  Tune, SmartToy, DoneAll, Bolt, Dns, Close
} from '../../components/icons/StitchIcons';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export default function CareerRoadmapPage() {
  const [filter, setFilter] = useState<'all' | 'in-progress'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetRole, setTargetRole] = useState('Senior Frontend Engineer');
  const [selectedStack, setSelectedStack] = useState('React / Next.js');
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setActiveNotification(msg);
    setTimeout(() => setActiveNotification(null), 3000);
  };

  const handleSaveRole = () => {
    setIsModalOpen(false);
    showToast(`Target role updated to "${targetRole}" with ${selectedStack}! Roadmap re-calibrated.`);
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
        title="Career Roadmap"
        description="Your gamified, milestone-driven pathway engineered to guide you from foundational knowledge to senior-level mastery."
        icon={<Map className="h-6 w-6 text-[#6A5F00]" />}
        badge={<Badge variant="cyprus">Frontend Track</Badge>}
        actions={
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 !bg-[#FFE600] !text-[#1A1A1A] !border-none !rounded-full font-bold shadow-md hover:scale-105"
          >
            <Tune className="h-4 w-4" />
            Customize Target Role
          </Button>
        }
      />

      {/* ─── Hero Welcome Banner (Exact Stitch Colors) ─── */}
      <section className="relative overflow-hidden bg-[#FFE600] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border-2 border-[#E7D2A0]">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/30 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-3 z-10 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="bg-[#726600] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Level Up Daily
            </span>
            <span className="text-[#726600]/80 text-xs font-semibold">{targetRole} Track</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#726600] tracking-tight font-heading leading-tight">
            Your Career Roadmap to Senior Web Wizard!
          </h1>
          <p className="text-xs sm:text-sm text-[#726600]/90 leading-relaxed font-medium">
            You're making incredible progress. Only 3 more major quests left before you're interview-ready!
          </p>

          {/* Progress Bar with Glowing Stitch Gradient */}
          <div className="mt-2 flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-bold text-[#726600]">
              <span>Roadmap Completion</span>
              <span className="bg-white px-3 py-0.5 rounded-full text-[#6A5F00] shadow-sm font-bold border border-[#CDC7AA]">
                35%
              </span>
            </div>
            <div className="w-full bg-white/60 h-5 rounded-full p-1 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-[#26FEDC] via-[#00F5D4] to-[#9B5DE5] h-full rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(0,245,212,0.8)]"
                style={{ width: '35%' }}
              />
            </div>
          </div>
        </div>

        {/* Cute Pal-E Mascot Card (Exact Stitch) */}
        <div className="relative z-10 flex flex-col items-center bg-white p-6 rounded-3xl shadow-lg border border-[#CDC7AA]/40 transform rotate-1 hover:rotate-0 transition-transform duration-300 w-full sm:w-64">
          <div className="w-20 h-20 rounded-full bg-[#FAF3DF] border border-[#CDC7AA]/50 flex items-center justify-center relative mb-2 shadow-inner">
            <SmartToy className="h-10 w-10 text-[#6A5F00] animate-bounce" />
          </div>
          <span className="text-base font-extrabold text-[#1E1C10] font-heading">Pal-E Says:</span>
          <span className="text-xs text-[#4B4731] text-center mt-0.5">
            "You're crushing it! Keep that code flowing!"
          </span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-3.5 bg-[#FFE600] text-[#1A1A1A] font-bold text-xs px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Tune className="h-3.5 w-3.5" />
            Customize Target Role
          </button>
        </div>
      </section>

      {/* ─── Interactive Milestone Cards Grid (Stitch Styled) ─── */}
      <section className="space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-xl sm:text-2xl font-black text-[#1E1C10] font-heading">Milestone Quests</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#6A5F00] text-white shadow-md'
                  : 'bg-[#F4EEDA] text-[#1E1C10] hover:bg-[#EEE8D4]'
              }`}
            >
              All Quests
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === 'in-progress'
                  ? 'bg-[#6A5F00] text-white shadow-md'
                  : 'bg-[#F4EEDA] text-[#1E1C10] hover:bg-[#EEE8D4]'
              }`}
            >
              In Progress
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Completed */}
          {filter === 'all' && (
            <div className="bg-[#FAF3DF] border border-[#CDC7AA]/50 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-[#00F5D4]/20 text-[#006B5B] px-3.5 py-1 rounded-bl-2xl text-[10px] font-black uppercase tracking-wider">
                Completed
              </div>
              <div className="flex flex-col gap-2.5 mt-2">
                <div className="w-12 h-12 rounded-full bg-[#00F5D4] flex items-center justify-center text-[#1A1A1A] shadow-sm">
                  <DoneAll className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1E1C10] font-heading mt-1">JavaScript Fundamentals</h3>
                <p className="text-xs text-[#4B4731] leading-relaxed">
                  Mastered closures, async/await, ES6+ features, and DOM manipulation.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between pt-3.5 border-t border-[#CDC7AA]/30">
                <span className="text-xs text-[#006B5B] font-extrabold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#006B5B]" /> 100% Score
                </span>
                <button
                  onClick={() => showToast('Opening JavaScript Fundamentals recap...')}
                  className="text-xs text-[#1E1C10] font-bold underline hover:text-[#6A5F00] transition-colors cursor-pointer"
                >
                  Review
                </button>
              </div>
            </div>
          )}

          {/* Card 2: In Progress (Active Quest - Ring 4 Sunshine Yellow) */}
          <div className="bg-white rounded-3xl p-6 flex flex-col justify-between shadow-xl ring-4 ring-[#FFE600] border border-[#E7D2A0] relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-[#FFE600] text-[#726600] px-4 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-wider">
              Active Quest
            </div>
            <div className="flex flex-col gap-2.5 mt-2">
              <div className="w-12 h-12 rounded-full bg-[#FFE600] flex items-center justify-center text-[#726600] shadow-md">
                <Bolt className="h-6 w-6 fill-current" />
              </div>
              <h3 className="text-lg font-bold text-[#1E1C10] font-heading mt-1">React & Ecosystem</h3>
              <p className="text-xs text-[#4B4731] leading-relaxed">
                Hooks, Redux Toolkit, Next.js routing, and component optimization.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between pt-3.5 border-t border-[#CDC7AA]/30 gap-3">
              <div className="flex-1">
                <div className="w-full bg-[#F4EEDA] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#6A5F00] h-full rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
              <button
                onClick={() => showToast('Continuing React & Ecosystem module!')}
                className="bg-[#6A5F00] text-white text-xs font-bold px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                Continue <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Upcoming (Locked) */}
          {filter === 'all' && (
            <div className="bg-[#FAF3DF] border border-[#CDC7AA]/50 rounded-3xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group opacity-85 hover:opacity-100 transition-opacity">
              <div className="absolute top-0 right-0 bg-[#EEE8D4] text-[#4B4731] px-3.5 py-1 rounded-bl-2xl text-[10px] font-black uppercase tracking-wider">
                Upcoming
              </div>
              <div className="flex flex-col gap-2.5 mt-2">
                <div className="w-12 h-12 rounded-full bg-[#EEE8D4] text-[#4B4731] flex items-center justify-center shadow-sm">
                  <Dns className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1E1C10] font-heading mt-1">Node.js & Express</h3>
                <p className="text-xs text-[#4B4731] leading-relaxed">
                  REST APIs, JWT authentication, MongoDB schemas, and server deployment.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between pt-3.5 border-t border-[#CDC7AA]/30">
                <span className="text-[11px] text-[#7C775F] font-medium">Locked until React is done</span>
                <button
                  onClick={() => showToast('Node.js & Express syllabus preview unlocked.')}
                  className="bg-white border border-[#CDC7AA] hover:bg-[#F4EEDA] text-[#1E1C10] text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  Preview
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── Interactive Target Role Modal (Stitch Styled) ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFF9E9] border-2 border-[#CDC7AA] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#1E1C10] font-heading">Customize Your Target Role</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-full bg-[#F4EEDA] border border-[#CDC7AA]/50 flex items-center justify-center hover:bg-[#EEE8D4] transition-colors cursor-pointer"
              >
                <Close className="h-4 w-4 text-[#4B4731]" />
              </button>
            </div>

            <p className="text-xs text-[#4B4731] leading-relaxed">
              Select your dream position to automatically adjust your roadmap milestones and skill gap metrics.
            </p>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#1E1C10]">Target Job Title</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="bg-[#F4EEDA] border-2 border-[#CDC7AA] rounded-full px-4 py-2.5 text-xs text-[#1E1C10] focus:outline-none focus:border-[#6A5F00] transition-all font-semibold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#1E1C10]">Primary Tech Stack</label>
              <div className="flex flex-wrap gap-2">
                {['React / Next.js', 'Vue / Nuxt', 'Angular', 'Fullstack Node'].map((stack) => (
                  <button
                    key={stack}
                    type="button"
                    onClick={() => setSelectedStack(stack)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${
                      selectedStack === stack
                        ? 'bg-[#FFE600] text-[#726600] shadow-sm'
                        : 'bg-[#F4EEDA] hover:bg-[#EEE8D4] text-[#1E1C10]'
                    }`}
                  >
                    {stack}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2.5 mt-2 pt-3 border-t border-[#CDC7AA]/30">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-[#F4EEDA] hover:bg-[#EEE8D4] text-[#1E1C10] text-xs font-bold px-4 py-2 rounded-full transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveRole}
                className="bg-[#6A5F00] text-white text-xs font-bold px-5 py-2 rounded-full hover:scale-105 transition-all shadow-md cursor-pointer"
              >
                Save & Update Roadmap
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
