import { useState } from 'react';
import {
  SmartToy,
  TrendingUp,
} from '../../components/icons/StitchIcons';
import {
  ShieldAlert,
  GraduationCap,
  Briefcase,
  Code2,
  Sparkles,
  Download,
  PlusCircle,
  Megaphone,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Brain,
  Building2,
  ArrowRight,
  Star,
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  initials: string;
  dept: string;
  score: number;
  grade: string;
  solved: number;
  track: string;
  status: string;
  statusType: 'success' | 'warning' | 'purple' | 'danger';
  avatarBg: string;
}

const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'Arjun Menon',
    initials: 'AM',
    dept: "B.Tech CSE '26",
    score: 84,
    grade: '84/100 A+',
    solved: 184,
    track: 'Flipkart / Day-1 Track',
    status: 'Tech Screen Passed',
    statusType: 'success',
    avatarBg: 'bg-[#FFE600] text-[#1A1A1A]',
  },
  {
    id: '2',
    name: 'Sneha Roy',
    initials: 'SR',
    dept: "B.Tech ECE '26",
    score: 91,
    grade: '91/100 Elite',
    solved: 240,
    track: 'Google India Drive',
    status: 'Final Round Pending',
    statusType: 'purple',
    avatarBg: 'bg-[#00F5D4] text-[#006B5B]',
  },
  {
    id: '3',
    name: 'Rahul Sharma',
    initials: 'RS',
    dept: "B.Tech CSE '26",
    score: 64,
    grade: '64/100 Needs Coaching',
    solved: 92,
    track: 'Resume ATS Gap (54%)',
    status: '1-on-1 Assigned',
    statusType: 'danger',
    avatarBg: 'bg-[#FFDAD6] text-[#BA1A1A]',
  },
  {
    id: '4',
    name: 'Ananya Nair',
    initials: 'AN',
    dept: "B.Tech CSE '26",
    score: 88,
    grade: '88/100 A+',
    solved: 215,
    track: 'Shortlisted (Razorpay SDE-1)',
    status: 'Mock Speech 92%',
    statusType: 'success',
    avatarBg: 'bg-[#FFE600] text-[#1A1A1A]',
  },
  {
    id: '5',
    name: 'Devadath Pillai',
    initials: 'DP',
    dept: "B.Tech EEE '26",
    score: 78,
    grade: '78/100 B+',
    solved: 142,
    track: 'Texas Instruments Track',
    status: 'Circuit Lab Cleared',
    statusType: 'warning',
    avatarBg: 'bg-[#FAF3DF] text-[#6A5F00]',
  },
];

export default function AdminPage() {
  const [filterType, setFilterType] = useState<'all' | 'tier1' | 'needsCoach'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<'all' | 'cse' | 'ece'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Drives status
  const [approvedDrives, setApprovedDrives] = useState<Record<string, boolean>>({});

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApproveDrive = (driveId: string, company: string) => {
    setApprovedDrives((prev) => ({ ...prev, [driveId]: true }));
    showToast(`✅ ${company} campus hiring drive cleared & published to student board!`);
  };

  const handleRunAudit = (candidateName: string) => {
    showToast(`⚡ Pal-Bot triggered re-audit for ${candidateName}`);
  };

  const handleBroadcast = () => {
    showToast('📢 Broadcast notification dispatched to 1,248 candidates!');
  };

  const handleExportAudit = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Name,Dept,ReadinessScore,Solved,Status\n' +
      INITIAL_CANDIDATES.map(
        (c) => `"${c.name}","${c.dept}",${c.score},${c.solved},"${c.status}"`
      ).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'nitc_placement_audit_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📊 Exported placement audit roster (.csv)!');
  };

  // Filter candidates
  const filteredCandidates = INITIAL_CANDIDATES.filter((c) => {
    if (filterType === 'tier1' && c.score < 85) return false;
    if (filterType === 'needsCoach' && c.score >= 75) return false;
    if (selectedDept === 'cse' && !c.dept.includes('CSE')) return false;
    if (selectedDept === 'ece' && !c.dept.includes('ECE')) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.dept.toLowerCase().includes(q) ||
        c.track.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16 w-full font-sans text-[#1E1C10]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-[#FFE600] px-5 py-3.5 rounded-2xl shadow-2xl border border-[#FFE600]/40 flex items-center gap-3 animate-bounce">
          <SmartToy className="h-5 w-5 text-[#FFE600]" />
          <span className="text-xs sm:text-sm font-bold text-white">{toastMessage}</span>
        </div>
      )}

      {/* ─── Top Header & Admin Command Bar ─── */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FFE600] flex items-center justify-center text-[#1A1A1A] shadow-md shrink-0 border border-[#CDC7AA]/40 transition-transform hover:scale-105">
            <ShieldAlert className="h-8 w-8 text-[#1A1A1A]" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1E1C10] tracking-tight">
                Admin Control Center
              </h1>
              <span className="px-3 py-1 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-xs shadow-sm border border-[#CDC7AA]/30 flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-[#1A1A1A]" />
                Super Admin Level 3
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FAF3DF] text-[#006B5B] font-bold text-xs flex items-center gap-1.5 border border-[#CDC7AA]/30">
                <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse" />
                Live Telemetry
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#4B4731] font-medium max-w-3xl leading-relaxed">
              Calibrate university placement readiness, monitor real-time AI mock audits, manage curriculum question sets, and orchestrate top recruiter drives.
            </p>
          </div>
        </div>

        {/* Quick Action Bar */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={handleExportAudit}
            className="px-4 py-2.5 rounded-full bg-white text-[#1E1C10] font-bold text-xs shadow-sm hover:bg-[#FAF3DF] transition-all flex items-center gap-2 border border-[#CDC7AA]/40 active:scale-95"
          >
            <Download className="h-4 w-4 text-[#006B5B]" />
            <span>Export Audit (.csv)</span>
          </button>
          <button
            type="button"
            onClick={() => showToast('✨ Opened question bank editor modal')}
            className="px-5 py-2.5 rounded-full bg-[#FFE600] text-[#1A1A1A] font-extrabold text-xs shadow-md hover:bg-[#DEC800] transition-all flex items-center gap-2 border border-[#CDC7AA]/40 active:scale-95"
          >
            <PlusCircle className="h-4 w-4 text-[#1A1A1A]" />
            <span>+ New Coding Challenge</span>
          </button>
        </div>
      </div>

      {/* ─── High-Impact KPI Bento Grid ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Metric 1: Students Enrolled */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#CDC7AA]/40 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs font-bold text-[#7C775F] uppercase tracking-wider">
                  Students Enrolled
                </span>
                <div className="font-heading text-3xl font-black text-[#1E1C10] mt-1">1,248</div>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-[#FAF3DF] text-[#6A5F00] flex items-center justify-center border border-[#CDC7AA]/30">
                <GraduationCap className="h-6 w-6 text-[#6A5F00]" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs font-bold pt-1">
              <span className="flex items-center gap-1 text-[#006B5B]">
                <TrendingUp className="h-3.5 w-3.5" /> +14% this month
              </span>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-[#FFE600] border-2 border-white flex items-center justify-center text-[10px] font-bold">
                  A
                </div>
                <div className="w-6 h-6 rounded-full bg-[#00F5D4] border-2 border-white flex items-center justify-center text-[10px] font-bold">
                  S
                </div>
                <div className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white border-2 border-white flex items-center justify-center text-[9px] font-bold">
                  +92
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#FAF3DF] h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-[#FFE600] h-full rounded-full" style={{ width: '88%' }} />
          </div>
        </div>

        {/* Metric 2: Active Drives */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#CDC7AA]/40 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs font-bold text-[#7C775F] uppercase tracking-wider">
                  Active Recruiter Drives
                </span>
                <div className="font-heading text-3xl font-black text-[#1E1C10] mt-1">38 Drives</div>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-[#FAF3DF] text-[#006B5B] flex items-center justify-center border border-[#CDC7AA]/30">
                <Briefcase className="h-6 w-6 text-[#006B5B]" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs font-bold pt-1">
              <span className="text-[#4B4731]">Avg CTC Offered</span>
              <span className="text-[#1E1C10] bg-[#FAF3DF] px-2.5 py-0.5 rounded-full border border-[#CDC7AA]/30">
                ₹14.8 LPA
              </span>
            </div>
          </div>
          <div className="text-xs font-bold text-[#006B5B] mt-4 flex items-center gap-1 pt-2 border-t border-[#CDC7AA]/20">
            <Star className="h-3.5 w-3.5 fill-[#006B5B]" />
            <span>14 Day-1 Dream Offers Pending</span>
          </div>
        </div>

        {/* Metric 3: Coding Challenges */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#CDC7AA]/40 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs font-bold text-[#7C775F] uppercase tracking-wider">
                  Coding Challenges
                </span>
                <div className="font-heading text-3xl font-black text-[#1E1C10] mt-1">480+ Sets</div>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-[#FAF3DF] text-[#9B5DE5] flex items-center justify-center border border-[#CDC7AA]/30">
                <Code2 className="h-6 w-6 text-[#9B5DE5]" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs font-bold pt-1">
              <span className="text-[#4B4731]">12 core topics</span>
              <span className="text-[#006B5B]">94.2% Passed</span>
            </div>
          </div>
          <div className="w-full bg-[#FAF3DF] h-2 rounded-full mt-4 overflow-hidden flex">
            <div className="bg-[#00F5D4] h-full" style={{ width: '60%' }} />
            <div className="bg-[#FFE600] h-full" style={{ width: '25%' }} />
            <div className="bg-[#FF6B6B] h-full" style={{ width: '15%' }} />
          </div>
        </div>

        {/* Metric 4: AI Evaluations */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#CDC7AA]/40 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs font-bold text-[#7C775F] uppercase tracking-wider">
                  AI Mock & Resume Audits
                </span>
                <div className="font-heading text-3xl font-black text-[#1E1C10] mt-1">3,820 Runs</div>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-[#FAF3DF] text-[#FF6B6B] flex items-center justify-center border border-[#CDC7AA]/30">
                <Sparkles className="h-6 w-6 text-[#FF6B6B]" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs font-bold pt-1">
              <span className="text-[#4B4731]">Latency per interview</span>
              <span className="text-[#1E1C10]">320ms</span>
            </div>
          </div>
          <div className="text-xs font-bold text-[#006B5B] mt-4 flex items-center gap-1.5 pt-2 border-t border-[#CDC7AA]/20">
            <span className="w-2 h-2 rounded-full bg-[#00F5D4]" />
            <span>99.4% Pipeline Uptime</span>
          </div>
        </div>
      </div>

      {/* ─── AI Placement Ops Callout Banner ─── */}
      <div className="bg-[#1A1A1A] text-white rounded-3xl p-6 sm:p-7 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden border border-[#CDC7AA]/40">
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-[#FFE600] text-[#1A1A1A] flex items-center justify-center shrink-0 shadow-sm">
            <SmartToy className="h-7 w-7 text-[#1A1A1A]" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-bold text-xs uppercase tracking-wider text-[#FFE600]">
                Pal-Bot Admin Copilot
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[#00F5D4] text-[11px] font-bold">
                Batch Intel 2026
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#CDC7AA] max-w-2xl leading-relaxed">
              CSE 2026 Batch is outpacing the 2025 cohort by <strong className="text-white">+16% in Dynamic Programming</strong>! 42 candidates crossed the 85+ Readiness threshold this week.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10 self-end lg:self-auto">
          <button
            type="button"
            onClick={handleBroadcast}
            className="px-5 py-2.5 rounded-full bg-[#FFE600] text-[#1A1A1A] font-extrabold text-xs hover:bg-[#DEC800] transition-all flex items-center gap-2 shadow-sm active:scale-95"
          >
            <Megaphone className="h-4 w-4 text-[#1A1A1A]" />
            <span>Broadcast Batch Reminder</span>
          </button>
        </div>

        {/* Decorative background ambient glow */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#FFE600]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ─── Main Split Control Section ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left 2 Cols: Candidate Readiness Roster */}
        <div className="xl:col-span-2 bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-xl font-black text-[#1E1C10]">
                Candidate Readiness Roster
              </h2>
              <p className="text-xs text-[#4B4731] font-medium mt-0.5">
                Live tracking of final year placement profiles and test milestones
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center p-1 bg-[#FAF3DF] rounded-full border border-[#CDC7AA]/30 gap-1 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-full font-bold text-xs transition-all ${
                  filterType === 'all'
                    ? 'bg-[#FFE600] text-[#1A1A1A] shadow-xs'
                    : 'text-[#7C775F] hover:text-[#1E1C10]'
                }`}
              >
                All (1,248)
              </button>
              <button
                type="button"
                onClick={() => setFilterType('tier1')}
                className={`px-3 py-1.5 rounded-full font-bold text-xs transition-all ${
                  filterType === 'tier1'
                    ? 'bg-[#FFE600] text-[#1A1A1A] shadow-xs'
                    : 'text-[#7C775F] hover:text-[#1E1C10]'
                }`}
              >
                Tier-1 Ready (142)
              </button>
              <button
                type="button"
                onClick={() => setFilterType('needsCoach')}
                className={`px-3 py-1.5 rounded-full font-bold text-xs transition-all ${
                  filterType === 'needsCoach'
                    ? 'bg-[#FFE600] text-[#1A1A1A] shadow-xs'
                    : 'text-[#7C775F] hover:text-[#1E1C10]'
                }`}
              >
                Needs Coach (38)
              </button>
            </div>
          </div>

          {/* Quick Search & Department Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF3DF]/70 p-3 rounded-2xl border border-[#CDC7AA]/30">
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-full flex-1 min-w-[200px] border border-[#CDC7AA]/30">
              <Search className="h-4 w-4 text-[#7C775F]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name, branch, target company..."
                className="bg-transparent border-none outline-none text-xs font-semibold w-full text-[#1E1C10] placeholder:text-[#7C775F]"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap text-xs font-bold">
              <span className="text-[#7C775F]">Dept:</span>
              <button
                type="button"
                onClick={() => setSelectedDept(selectedDept === 'cse' ? 'all' : 'cse')}
                className={`px-3 py-1 rounded-full border transition-all ${
                  selectedDept === 'cse'
                    ? 'bg-[#1A1A1A] text-white border-transparent'
                    : 'bg-white text-[#1E1C10] border-[#CDC7AA]/40 hover:bg-[#FAF3DF]'
                }`}
              >
                CSE & ISE
              </button>
              <button
                type="button"
                onClick={() => setSelectedDept(selectedDept === 'ece' ? 'all' : 'ece')}
                className={`px-3 py-1 rounded-full border transition-all ${
                  selectedDept === 'ece'
                    ? 'bg-[#1A1A1A] text-white border-transparent'
                    : 'bg-white text-[#1E1C10] border-[#CDC7AA]/40 hover:bg-[#FAF3DF]'
                }`}
              >
                ECE
              </button>
              <span className="px-2.5 py-1 rounded-full bg-[#FFE600]/40 text-[#1A1A1A] font-extrabold border border-[#CDC7AA]/30">
                CGPA ≥ 8.0
              </span>
            </div>
          </div>

          {/* Candidates Rows */}
          <div className="space-y-3">
            {filteredCandidates.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-[#FAF3DF]/50 hover:bg-[#FAF3DF] border border-[#CDC7AA]/30 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-heading text-base font-black shrink-0 shadow-xs ${c.avatarBg}`}
                  >
                    {c.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading text-sm sm:text-base font-extrabold text-[#1E1C10]">
                        {c.name}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white text-[#4B4731] font-bold text-[10px] border border-[#CDC7AA]/30">
                        {c.dept}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          c.score >= 85
                            ? 'bg-[#00F5D4]/30 text-[#006B5B]'
                            : c.score >= 75
                            ? 'bg-[#FFE600]/40 text-[#6A5F00]'
                            : 'bg-[#FFDAD6] text-[#BA1A1A]'
                        }`}
                      >
                        {c.grade}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#4B4731] font-medium mt-1 flex-wrap">
                      <span className="flex items-center gap-1 font-bold text-[#1E1C10]">
                        <Code2 className="h-3.5 w-3.5 text-[#006B5B]" /> {c.solved} Solved
                      </span>
                      <span>•</span>
                      <span>{c.track}</span>
                      <span>•</span>
                      <span
                        className={`font-bold ${
                          c.statusType === 'success'
                            ? 'text-[#006B5B]'
                            : c.statusType === 'purple'
                            ? 'text-[#9B5DE5]'
                            : c.statusType === 'danger'
                            ? 'text-[#BA1A1A]'
                            : 'text-[#6A5F00]'
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => showToast(`👤 Opening verified portfolio dossier for ${c.name}`)}
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-[#FAF3DF] transition-colors border border-[#CDC7AA]/40 shadow-xs"
                    title="View Portfolio"
                  >
                    <Eye className="h-4 w-4 text-[#4B4731]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRunAudit(c.name)}
                    className="px-3.5 py-1.5 rounded-full bg-[#FFE600] hover:bg-[#DEC800] text-[#1A1A1A] font-extrabold text-xs shadow-xs transition-transform active:scale-95"
                  >
                    Run Audit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-2 text-xs font-bold text-[#7C775F] border-t border-[#CDC7AA]/20">
            <span>Showing {filteredCandidates.length} of 1,248 final-year candidates</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="w-7 h-7 rounded-full bg-[#FAF3DF] flex items-center justify-center hover:bg-[#F4EEDA] text-[#1E1C10]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-2 text-[#1E1C10]">Page 1 of 312</span>
              <button
                type="button"
                className="w-7 h-7 rounded-full bg-[#FAF3DF] flex items-center justify-center hover:bg-[#F4EEDA] text-[#1E1C10]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Question Bank Health & Company Pipeline */}
        <div className="flex flex-col gap-6">
          {/* Question Bank Health */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-black text-[#1E1C10]">
                  Question Bank Health
                </h3>
                <p className="text-xs text-[#4B4731]">Topic distribution & test coverage</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#FFE600] flex items-center justify-center text-[#1A1A1A] shadow-xs">
                <Brain className="h-5 w-5 text-[#1A1A1A]" />
              </div>
            </div>

            {/* Topic Bars */}
            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-[#1E1C10]">Dynamic Programming & Graphs</span>
                  <span className="text-[#7C775F]">128 Qs</span>
                </div>
                <div className="w-full bg-[#FAF3DF] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#00F5D4] h-full rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-[#1E1C10]">System Design & Cloud Basics</span>
                  <span className="text-[#7C775F]">86 Qs</span>
                </div>
                <div className="w-full bg-[#FAF3DF] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#FFE600] h-full rounded-full" style={{ width: '68%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-[#1E1C10]">SQL & Database Optimization</span>
                  <span className="text-[#7C775F]">94 Qs</span>
                </div>
                <div className="w-full bg-[#FAF3DF] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#9B5DE5] h-full rounded-full" style={{ width: '76%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-[#1E1C10]">Fullstack React & Node.js</span>
                  <span className="text-[#7C775F]">112 Qs</span>
                </div>
                <div className="w-full bg-[#FAF3DF] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#FF6B6B] h-full rounded-full" style={{ width: '90%' }} />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => showToast('✨ Pal-Bot synthesized 10 new campus questions for DP!')}
              className="w-full py-2.5 mt-2 rounded-full bg-[#FAF3DF] hover:bg-[#F4EEDA] text-[#1E1C10] font-bold text-xs transition-all flex items-center justify-center gap-2 border border-[#CDC7AA]/40 active:scale-95"
            >
              <Sparkles className="h-4 w-4 text-[#6A5F00]" />
              <span>Generate 10 AI Questions</span>
            </button>
          </div>

          {/* Recruiter Drive Approvals */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-4 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-black text-[#1E1C10]">
                  Recruiter Drive Pipeline
                </h3>
                <p className="text-xs text-[#4B4731]">3 drives requiring admin clearance</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#FAF3DF] flex items-center justify-center text-[#006B5B] border border-[#CDC7AA]/30">
                <Building2 className="h-5 w-5 text-[#006B5B]" />
              </div>
            </div>

            <div className="space-y-3 pt-1">
              {/* Drive 1: Atlassian */}
              <div className="p-3.5 bg-[#FAF3DF]/60 rounded-2xl flex items-center justify-between gap-3 border border-[#CDC7AA]/30">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-[#1E1C10]">Atlassian India</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#FFE600] text-[#1A1A1A] font-black text-[10px]">
                      ₹28 LPA
                    </span>
                  </div>
                  <span className="text-[11px] text-[#4B4731] font-medium">Online Assessment • Oct 28</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleApproveDrive('atlassian', 'Atlassian')}
                  className={`px-3 py-1.5 rounded-full font-bold text-xs shadow-xs transition-all ${
                    approvedDrives['atlassian']
                      ? 'bg-[#00F5D4]/30 text-[#006B5B]'
                      : 'bg-[#00F5D4] text-[#005144] hover:brightness-95'
                  }`}
                >
                  {approvedDrives['atlassian'] ? 'Approved' : 'Approve'}
                </button>
              </div>

              {/* Drive 2: PhonePe */}
              <div className="p-3.5 bg-[#FAF3DF]/60 rounded-2xl flex items-center justify-between gap-3 border border-[#CDC7AA]/30">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-[#1E1C10]">PhonePe Campus Blitz</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#FAF3DF] text-[#1A1A1A] font-black text-[10px] border border-[#CDC7AA]/30">
                      ₹22 LPA
                    </span>
                  </div>
                  <span className="text-[11px] text-[#4B4731] font-medium">Coding Slot Request • Nov 02</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleApproveDrive('phonepe', 'PhonePe')}
                  className={`px-3 py-1.5 rounded-full font-bold text-xs shadow-xs transition-all ${
                    approvedDrives['phonepe']
                      ? 'bg-[#00F5D4]/30 text-[#006B5B]'
                      : 'bg-[#00F5D4] text-[#005144] hover:brightness-95'
                  }`}
                >
                  {approvedDrives['phonepe'] ? 'Approved' : 'Approve'}
                </button>
              </div>

              {/* Drive 3: Cisco */}
              <div className="p-3.5 bg-[#FAF3DF]/60 rounded-2xl flex items-center justify-between gap-3 border border-[#CDC7AA]/30">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-[#1E1C10]">Cisco Core Network</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#FAF3DF] text-[#1A1A1A] font-black text-[10px] border border-[#CDC7AA]/30">
                      ₹16 LPA
                    </span>
                  </div>
                  <span className="text-[11px] text-[#4B4731] font-medium">Criteria Calibration • Nov 05</span>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('🔎 Opening Cisco placement drive criteria checklist')}
                  className="px-3 py-1.5 rounded-full bg-white text-[#1E1C10] font-bold text-xs hover:bg-[#FAF3DF] border border-[#CDC7AA]/40 transition-all"
                >
                  Review
                </button>
              </div>
            </div>

            <div className="mt-auto pt-3 border-t border-[#CDC7AA]/20">
              <button
                type="button"
                onClick={() => showToast('📋 Opening full schedule of 38 university recruiter drives')}
                className="text-xs font-bold text-[#6A5F00] flex items-center gap-1 hover:underline"
              >
                <span>View All 38 Scheduled Placement Drives</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
