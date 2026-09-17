import { useState, useMemo } from 'react';
import {
  GraduationCap, Users, Building2, TrendingUp,
  Download, Plus, Search,
  Award, Send
} from 'lucide-react';
import {
  MOCK_STUDENTS_DATA,
  MOCK_TPO_DRIVES,
  type TPODriveAnnouncement
} from '../../data/facultyTpoData';

export default function FacultyPortalPage() {
  const [activeTab, setActiveTab] = useState<'students' | 'drives' | 'analytics'>('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [cgpaMin, setCgpaMin] = useState<number>(6.0);
  const [maxBacklogsAllowed, setMaxBacklogsAllowed] = useState<number>(1);

  // Drives state
  const [drivesList, setDrivesList] = useState<TPODriveAnnouncement[]>(MOCK_TPO_DRIVES);
  const [isAddDriveOpen, setIsAddDriveOpen] = useState(false);
  const [newDriveCompany, setNewDriveCompany] = useState('');
  const [newDriveRole, setNewDriveRole] = useState('');
  const [newDriveCtc, setNewDriveCtc] = useState('');
  const [newDriveDate, setNewDriveDate] = useState('');

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filtered students for shortlisting
  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS_DATA.filter((std) => {
      const matchSearch =
        std.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        std.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        std.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchBranch = branchFilter === 'All' || std.branch === branchFilter;
      const matchStatus = statusFilter === 'All' || std.placementStatus === statusFilter;
      const matchCgpa = std.cgpa >= cgpaMin;
      const matchBacklogs = std.backlogs <= maxBacklogsAllowed;

      return matchSearch && matchBranch && matchStatus && matchCgpa && matchBacklogs;
    });
  }, [searchQuery, branchFilter, statusFilter, cgpaMin, maxBacklogsAllowed]);

  // Overall batch statistics
  const batchStats = useMemo(() => {
    const total = MOCK_STUDENTS_DATA.length;
    const placed = MOCK_STUDENTS_DATA.filter((s) => s.placementStatus === 'Placed').length;
    const shortlisted = MOCK_STUDENTS_DATA.filter((s) => s.placementStatus === 'Shortlisted').length;
    const ready = MOCK_STUDENTS_DATA.filter((s) => s.placementStatus === 'Ready').length;
    const avgCgpa = (MOCK_STUDENTS_DATA.reduce((acc, s) => acc + s.cgpa, 0) / total).toFixed(2);
    const avgAssessment = Math.round(MOCK_STUDENTS_DATA.reduce((acc, s) => acc + s.assessmentScore, 0) / total);

    return {
      total,
      placed,
      shortlisted,
      ready,
      placedPercentage: Math.round((placed / total) * 100),
      avgCgpa,
      avgAssessment,
    };
  }, []);

  const handleExportCsv = () => {
    // Generate simple CSV text
    const headers = 'Roll No,Name,Branch,CGPA,10th %,12th %,Backlogs,ATS Score,Assessment Score,Status,Company\n';
    const rows = filteredStudents
      .map(
        (s) =>
          `"${s.rollNo}","${s.name}","${s.branch}",${s.cgpa},${s.tenthPercent},${s.twelfthPercent},${s.backlogs},${s.atsScore},${s.assessmentScore},"${s.placementStatus}","${s.companyOffer?.company || 'None'}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `TPO_Shortlist_${branchFilter}_CGPA_${cgpaMin}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`✓ Exported ${filteredStudents.length} student records as CSV.`);
  };

  const handleNotifyStudents = () => {
    showToast(`📢 Sent drive invitation notifications to ${filteredStudents.length} eligible students.`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDriveCompany || !newDriveRole) return;

    const newDrive: TPODriveAnnouncement = {
      id: `drv-${Date.now()}`,
      companyName: newDriveCompany,
      logoBg: 'from-emerald-600 to-teal-700',
      role: newDriveRole,
      ctc: newDriveCtc || '₹6.0 - ₹8.0 LPA',
      minCgpa: 6.5,
      maxBacklogs: 0,
      allowedBranches: ['CSE', 'IT', 'ECE'],
      driveDate: newDriveDate || 'Dec 05, 2026',
      lastDateToApply: 'Nov 25, 2026',
      registeredCount: 0,
      status: 'Registration Active',
    };

    setDrivesList([newDrive, ...drivesList]);
    setIsAddDriveOpen(false);
    setNewDriveCompany('');
    setNewDriveRole('');
    setNewDriveCtc('');
    setNewDriveDate('');
    showToast(`✓ Published campus drive for ${newDrive.companyName}`);
  };

  return (
    <div className="space-y-8 animate-fade-in text-[#1E1C10]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#1E1C10] text-[#FFF9E9] text-xs font-bold shadow-2xl flex items-center gap-2 border border-[#FFE600]/30 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─── 1. TPO FACULTY HEADER ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#CDC7AA]/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF3DF] border border-[#CDC7AA]/50 text-xs font-bold text-[#726600] uppercase tracking-wider mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Training & Placement Cell (TPO)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E1C10] tracking-tight">
            Faculty & Placement Management Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#4B4731] mt-1 font-normal">
            Manage student eligibility, publish upcoming recruitment drives, export shortlists, and monitor batch readiness.
          </p>
        </div>

        {/* Quick Action Button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAddDriveOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFE600] hover:bg-[#F2DA00] text-[#1E1C10] font-bold text-xs shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 text-[#726600]" />
            <span>Post New Drive</span>
          </button>
        </div>
      </div>

      {/* ─── 2. BATCH METRICS CARDS ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-[#FAF3DF] border border-[#CDC7AA]/50 space-y-1.5">
          <div className="flex items-center justify-between text-[#4B4731]">
            <span className="text-xs font-bold uppercase tracking-wider">Placement Rate</span>
            <TrendingUp className="w-4 h-4 text-[#726600]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#1E1C10] font-mono">
            {batchStats.placedPercentage}%
          </div>
          <div className="text-[11px] text-[#726600] font-semibold">
            {batchStats.placed} of {batchStats.total} Students Placed
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[#FAF3DF] border border-[#CDC7AA]/50 space-y-1.5">
          <div className="flex items-center justify-between text-[#4B4731]">
            <span className="text-xs font-bold uppercase tracking-wider">Average CGPA</span>
            <Award className="w-4 h-4 text-[#726600]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#1E1C10] font-mono">
            {batchStats.avgCgpa}
          </div>
          <div className="text-[11px] text-[#4B4731] font-medium">Batch Academic Standard</div>
        </div>

        <div className="p-5 rounded-3xl bg-[#FAF3DF] border border-[#CDC7AA]/50 space-y-1.5">
          <div className="flex items-center justify-between text-[#4B4731]">
            <span className="text-xs font-bold uppercase tracking-wider">Active Drives</span>
            <Building2 className="w-4 h-4 text-[#726600]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#1E1C10] font-mono">
            {drivesList.length}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold">TCS, Amazon, Zoho Open</div>
        </div>

        <div className="p-5 rounded-3xl bg-[#FAF3DF] border border-[#CDC7AA]/50 space-y-1.5">
          <div className="flex items-center justify-between text-[#4B4731]">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Assessment</span>
            <Users className="w-4 h-4 text-[#726600]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#726600] font-mono">
            {batchStats.avgAssessment}%
          </div>
          <div className="text-[11px] text-[#4B4731] font-medium">Aptitude & Technical MCQ</div>
        </div>
      </div>

      {/* ─── 3. TAB CONTROLS ─── */}
      <div className="flex items-center border-b border-[#CDC7AA]/40 gap-2 pb-1 overflow-x-auto">
        {[
          { id: 'students', label: 'Student Directory & Shortlisting' },
          { id: 'drives', label: `Drive Announcements (${drivesList.length})` },
          { id: 'analytics', label: 'Department Analytics' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-[#1E1C10] text-[#FFF9E9] shadow-sm'
                : 'bg-[#FAF3DF] text-[#4B4731] hover:bg-[#EEE8D4] hover:text-[#1E1C10] border border-[#CDC7AA]/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── 4. TAB 1: STUDENT DIRECTORY & LIVE SHORTLISTING ENGINE ─── */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          {/* Live Filter Toolbar */}
          <div className="p-5 rounded-3xl bg-[#FAF3DF] border border-[#CDC7AA]/50 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <h3 className="text-sm font-extrabold text-[#1E1C10]">
                Eligibility Criteria & Shortlist Filter
              </h3>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCsv}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#EEE8D4] text-[#1E1C10] border border-[#CDC7AA]/60 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-[#726600]" />
                  <span>Export Shortlist (CSV)</span>
                </button>

                <button
                  onClick={handleNotifyStudents}
                  className="px-3.5 py-1.5 rounded-xl bg-[#1E1C10] hover:bg-[#322E1A] text-[#FFF9E9] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-[#FFE600]" />
                  <span>Notify ({filteredStudents.length})</span>
                </button>
              </div>
            </div>

            {/* Filter Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#4B4731] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, roll no..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#FFF9E9] border border-[#CDC7AA] text-xs text-[#1E1C10] focus:outline-none focus:border-[#726600]"
                />
              </div>

              {/* Branch Filter */}
              <div>
                <select
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-[#FFF9E9] border border-[#CDC7AA] text-xs font-semibold text-[#1E1C10] focus:outline-none"
                >
                  <option value="All">All Branches</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                </select>
              </div>

              {/* Placement Status */}
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-[#FFF9E9] border border-[#CDC7AA] text-xs font-semibold text-[#1E1C10] focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Placed">Placed</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Ready">Ready</option>
                  <option value="Needs Training">Needs Training</option>
                </select>
              </div>

              {/* Min CGPA Slider */}
              <div className="p-2 rounded-xl bg-[#FFF9E9] border border-[#CDC7AA] flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-[#4B4731]">Min CGPA:</span>
                <input
                  type="range"
                  min="5.0"
                  max="9.0"
                  step="0.5"
                  value={cgpaMin}
                  onChange={(e) => setCgpaMin(parseFloat(e.target.value))}
                  className="w-20 accent-[#726600]"
                />
                <span className="font-mono text-xs font-bold text-[#726600]">{cgpaMin}</span>
              </div>

              {/* Max Backlogs */}
              <div>
                <select
                  value={maxBacklogsAllowed}
                  onChange={(e) => setMaxBacklogsAllowed(parseInt(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-xl bg-[#FFF9E9] border border-[#CDC7AA] text-xs font-semibold text-[#1E1C10] focus:outline-none"
                >
                  <option value="0">0 Backlogs (Strict)</option>
                  <option value="1">Max 1 Backlog</option>
                  <option value="2">Max 2 Backlogs</option>
                </select>
              </div>
            </div>
          </div>

          {/* Student Table */}
          <div className="rounded-3xl bg-[#FAF3DF] border border-[#CDC7AA]/50 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-[#CDC7AA]/40 flex items-center justify-between text-xs font-bold text-[#4B4731]">
              <span>Showing {filteredStudents.length} Matching Candidates</span>
              <span className="text-[#726600]">Sorted by CGPA (High to Low)</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#EEE8D4]/60 text-[#4B4731] font-bold border-b border-[#CDC7AA]/40 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-3">Branch</th>
                    <th className="py-3 px-3">CGPA</th>
                    <th className="py-3 px-3">10th / 12th</th>
                    <th className="py-3 px-3">Backlogs</th>
                    <th className="py-3 px-3">ATS Score</th>
                    <th className="py-3 px-3">Assessment</th>
                    <th className="py-3 px-4">Placement Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#CDC7AA]/30 font-medium">
                  {filteredStudents.map((std) => (
                    <tr key={std.id} className="hover:bg-white/50 transition-colors">
                      {/* Name & Roll */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#1E1C10]">{std.name}</div>
                        <div className="text-[10px] text-[#4B4731] font-mono">{std.rollNo}</div>
                      </td>

                      {/* Branch */}
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-[#EEE8D4] text-[#726600] font-bold text-[10px]">
                          {std.branch}
                        </span>
                      </td>

                      {/* CGPA */}
                      <td className="py-3 px-3 font-mono font-bold text-[#1E1C10]">
                        {std.cgpa}
                      </td>

                      {/* 10th / 12th */}
                      <td className="py-3 px-3 text-[#4B4731] font-mono">
                        {std.tenthPercent}% / {std.twelfthPercent}%
                      </td>

                      {/* Backlogs */}
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          std.backlogs === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {std.backlogs}
                        </span>
                      </td>

                      {/* ATS Score */}
                      <td className="py-3 px-3 font-mono font-bold text-[#726600]">
                        {std.atsScore}/100
                      </td>

                      {/* Assessment */}
                      <td className="py-3 px-3 font-mono font-bold text-teal-800">
                        {std.assessmentScore}%
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        {std.placementStatus === 'Placed' ? (
                          <div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                              Placed ({std.companyOffer?.company})
                            </span>
                            <div className="text-[10px] text-[#726600] font-bold mt-0.5 font-mono">
                              {std.companyOffer?.packageCtc}
                            </div>
                          </div>
                        ) : std.placementStatus === 'Shortlisted' ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-300">
                            Shortlisted
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#EEE8D4] text-[#4B4731]">
                            {std.placementStatus}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ─── 5. TAB 2: DRIVE ANNOUNCEMENT MANAGER ─── */}
      {activeTab === 'drives' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drivesList.map((drv) => (
              <div
                key={drv.id}
                className="p-5 rounded-3xl bg-[#FAF3DF] border border-[#CDC7AA]/50 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {drv.status}
                    </span>
                    <span className="text-[11px] font-mono text-[#726600] font-bold">{drv.ctc}</span>
                  </div>

                  <h4 className="text-base font-bold text-[#1E1C10]">{drv.companyName}</h4>
                  <p className="text-xs text-[#4B4731] font-medium mt-0.5">{drv.role}</p>

                  <div className="mt-3 pt-3 border-t border-[#CDC7AA]/30 space-y-1 text-xs text-[#4B4731]">
                    <div>Drive Date: <strong className="text-[#1E1C10]">{drv.driveDate}</strong></div>
                    <div>Apply Deadline: <strong className="text-[#1E1C10]">{drv.lastDateToApply}</strong></div>
                    <div>Min CGPA: <strong>{drv.minCgpa > 0 ? drv.minCgpa : 'Open'}</strong></div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/70 border border-[#CDC7AA]/40 flex items-center justify-between text-xs">
                  <span className="font-medium text-[#4B4731]">Students Registered:</span>
                  <span className="font-mono font-bold text-[#726600]">{drv.registeredCount} Applicants</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── 6. TAB 3: DEPARTMENT ANALYTICS ─── */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-[#FAF3DF] border border-[#CDC7AA]/50 space-y-4">
            <h4 className="text-sm font-bold text-[#1E1C10]">Branch-wise Placement Statistics</h4>
            <div className="space-y-3 text-xs">
              {[
                { branch: 'Computer Science (CSE)', placed: 88, color: 'bg-emerald-500' },
                { branch: 'Information Tech (IT)', placed: 82, color: 'bg-teal-500' },
                { branch: 'Electronics (ECE)', placed: 74, color: 'bg-amber-500' },
                { branch: 'Electrical (EEE)', placed: 65, color: 'bg-indigo-500' },
                { branch: 'Mechanical (MECH)', placed: 58, color: 'bg-orange-500' },
              ].map((b) => (
                <div key={b.branch} className="space-y-1">
                  <div className="flex items-center justify-between font-semibold text-[#1E1C10]">
                    <span>{b.branch}</span>
                    <span className="font-mono text-[#726600]">{b.placed}% Placed</span>
                  </div>
                  <div className="w-full bg-[#EEE8D4] h-2 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.placed}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF3DF] border border-[#CDC7AA]/50 space-y-4">
            <h4 className="text-sm font-bold text-[#1E1C10]">Top Recruiters & Packages</h4>
            <div className="space-y-2.5 text-xs">
              {[
                { company: 'Amazon Web Services', offers: 6, maxCtc: '₹24.0 LPA' },
                { company: 'Zoho Corporation', offers: 14, maxCtc: '₹10.5 LPA' },
                { company: 'Tata Consultancy Services', offers: 42, maxCtc: '₹7.5 LPA' },
                { company: 'Accenture India', offers: 28, maxCtc: '₹6.5 LPA' },
                { company: 'Infosys Limited', offers: 35, maxCtc: '₹9.5 LPA' },
              ].map((rec) => (
                <div key={rec.company} className="p-3 rounded-2xl bg-white/70 border border-[#CDC7AA]/40 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#1E1C10]">{rec.company}</div>
                    <div className="text-[10px] text-[#4B4731]">{rec.offers} Selected Offers</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-[#726600]">{rec.maxCtc}</div>
                    <div className="text-[10px] text-emerald-700 font-semibold">Verified</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── 7. POST NEW DRIVE MODAL ─── */}
      {isAddDriveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="max-w-md w-full rounded-3xl bg-[#FFF9E9] border border-[#CDC7AA] p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#CDC7AA]/40">
              <h3 className="text-base font-extrabold text-[#1E1C10]">Announce Campus Placement Drive</h3>
              <button
                onClick={() => setIsAddDriveOpen(false)}
                className="w-7 h-7 rounded-full bg-[#EEE8D4] text-xs font-bold text-[#1E1C10] flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDrive} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#4B4731] mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={newDriveCompany}
                  onChange={(e) => setNewDriveCompany(e.target.value)}
                  placeholder="e.g. Cisco Systems, Swiggy"
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF3DF] border border-[#CDC7AA] text-xs text-[#1E1C10] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#4B4731] mb-1">Job Role</label>
                <input
                  type="text"
                  required
                  value={newDriveRole}
                  onChange={(e) => setNewDriveRole(e.target.value)}
                  placeholder="e.g. Software Engineer (Grad)"
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF3DF] border border-[#CDC7AA] text-xs text-[#1E1C10] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#4B4731] mb-1">Package (CTC)</label>
                  <input
                    type="text"
                    value={newDriveCtc}
                    onChange={(e) => setNewDriveCtc(e.target.value)}
                    placeholder="e.g. ₹8.5 - ₹12.0 LPA"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF3DF] border border-[#CDC7AA] text-xs text-[#1E1C10] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#4B4731] mb-1">Drive Date</label>
                  <input
                    type="text"
                    value={newDriveDate}
                    onChange={(e) => setNewDriveDate(e.target.value)}
                    placeholder="e.g. Dec 10, 2026"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF3DF] border border-[#CDC7AA] text-xs text-[#1E1C10] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddDriveOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#EEE8D4] text-[#1E1C10] font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#FFE600] text-[#1E1C10] font-bold text-xs hover:bg-[#F2DA00]"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
