import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, Search, CheckCircle2, XCircle, ArrowRight,
  Calendar, Award, Sparkles, ChevronRight,
  FileCheck, BookOpen, Layers, Check,
  GraduationCap
} from 'lucide-react';
import { COMPANY_DRIVES_DATA, type CompanyDrive } from '../../data/companyDrivesData';

export default function CompanyPrepPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCompany, setActiveCompany] = useState<CompanyDrive>(COMPANY_DRIVES_DATA[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'rounds' | 'eligibility' | 'questions' | 'tips'>('rounds');

  // Student eligibility check inputs
  const [studentCgpa, setStudentCgpa] = useState<number>(7.5);
  const [student10th, setStudent10th] = useState<number>(82);
  const [student12th, setStudent12th] = useState<number>(80);
  const [studentBacklogs, setStudentBacklogs] = useState<number>(0);

  // Registered state (mock registration)
  const [registeredDrives, setRegisteredDrives] = useState<Record<string, boolean>>({});

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    return COMPANY_DRIVES_DATA.filter((comp) => {
      const matchCat =
        selectedCategory === 'All' ||
        (selectedCategory === 'Open Drives' ? comp.driveStatus === 'Registration Open' : comp.category === selectedCategory);
      const matchSearch =
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.roles.some((r) => r.title.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Eligibility evaluation logic
  const eligibilityResult = useMemo(() => {
    const el = activeCompany.eligibility;
    const cgpaOk = studentCgpa >= el.minCgpa;
    const tenthOk = student10th >= el.min10thPercent;
    const twelfthOk = student12th >= el.min12thPercent;
    const backlogOk = studentBacklogs <= el.maxBacklogs;
    const isOverallEligible = cgpaOk && tenthOk && twelfthOk && backlogOk;

    return {
      cgpaOk,
      tenthOk,
      twelfthOk,
      backlogOk,
      isOverallEligible,
    };
  }, [activeCompany, studentCgpa, student10th, student12th, studentBacklogs]);

  const handleOpenKit = (comp: CompanyDrive) => {
    setActiveCompany(comp);
    setIsDetailOpen(true);
    setActiveTab('rounds');
  };

  const handleToggleRegister = (compCityId: string) => {
    setRegisteredDrives((prev) => ({
      ...prev,
      [compCityId]: !prev[compCityId],
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in text-[#1E1C10]">
      {/* ─── 1. MINIMAL CLEAN HEADER ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#CDC7AA]/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF3DF] border border-[#CDC7AA]/50 text-xs font-bold text-[#726600] uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Placement Preparation Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E1C10] tracking-tight">
            Company Placement Drives & Prep Kits
          </h1>
          <p className="text-xs sm:text-sm text-[#4B4731] mt-1 font-normal">
            Hiring patterns, eligibility criteria calculators, round blueprints, and actual interview archives.
          </p>
        </div>

        {/* Quick Link to Assessment */}
        <Link
          to="/assessment"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FFE600] hover:bg-[#F2DA00] text-[#1E1C10] font-bold text-xs shadow-sm hover:shadow transition-all self-start md:self-auto"
        >
          <Award className="w-4 h-4 text-[#726600]" />
          <span>Practice Online Mock Tests</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* ─── 2. SEARCH & MINIMAL CATEGORY PILLS ─── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Open Drives', 'Mass Recruiter', 'Product Giant', 'Top IT Services'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1E1C10] text-[#FFF9E9] shadow-sm'
                  : 'bg-[#FAF3DF] text-[#4B4731] hover:text-[#1E1C10] hover:bg-[#EEE8D4] border border-[#CDC7AA]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Clean Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#4B4731] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company or role..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#FAF3DF] border border-[#CDC7AA]/60 text-xs text-[#1E1C10] placeholder-[#4B4731]/70 focus:outline-none focus:border-[#726600] focus:bg-[#FFF9E9] transition-all"
          />
        </div>
      </div>

      {/* ─── 3. MINIMAL COMPANY CARDS GRID ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCompanies.map((comp) => {
          const isRegistered = registeredDrives[comp.id];

          return (
            <div
              key={comp.id}
              className="group rounded-3xl bg-[#FAF3DF] border border-[#CDC7AA]/50 hover:border-[#726600]/60 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div>
                {/* Header: Company Initials Badge + Status Pill */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${comp.logoBg} flex items-center justify-center text-white font-black text-sm shadow-sm`}>
                    {comp.shortName.slice(0, 3)}
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    comp.driveStatus === 'Registration Open'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {comp.driveStatus}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#1E1C10] group-hover:text-[#726600] transition-colors">
                  {comp.name}
                </h3>

                <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-[#4B4731]">
                  <span className="px-2 py-0.5 rounded-md bg-[#EEE8D4] border border-[#CDC7AA]/30 text-[11px]">
                    {comp.category}
                  </span>
                  <span>•</span>
                  <span className="font-mono text-[#726600] font-bold">{comp.ctcOverview}</span>
                </div>

                {/* Roles list */}
                <div className="mt-4 pt-3 border-t border-[#CDC7AA]/30 space-y-1.5 text-xs">
                  <div className="text-[11px] font-bold text-[#4B4731] uppercase tracking-wider">Hiring Roles</div>
                  <div className="flex flex-wrap gap-1.5">
                    {comp.roles.map((r) => (
                      <span key={r.title} className="px-2 py-0.5 rounded-lg bg-white/70 border border-[#CDC7AA]/40 text-[11px] text-[#1E1C10] font-medium">
                        {r.title} ({r.ctc})
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key metadata */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-medium text-[#4B4731]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#726600]" />
                    <span>Drive: {comp.driveDate.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#726600]" />
                    <span>Min CGPA: {comp.eligibility.minCgpa > 0 ? `${comp.eligibility.minCgpa}` : 'No Cutoff'}</span>
                  </div>
                </div>
              </div>

              {/* Card Bottom CTA */}
              <div className="mt-6 pt-4 border-t border-[#CDC7AA]/30 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleToggleRegister(comp.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    isRegistered
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'text-[#4B4731] hover:text-[#1E1C10] hover:bg-[#EEE8D4]'
                  }`}
                >
                  {isRegistered ? <Check className="w-3.5 h-3.5" /> : null}
                  <span>{isRegistered ? 'Registered' : 'Bookmark Drive'}</span>
                </button>

                <button
                  onClick={() => handleOpenKit(comp)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#1E1C10] hover:bg-[#322E1A] text-[#FFF9E9] font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
                >
                  <span>Prep Kit</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── 4. INTERACTIVE PREP KIT DRAWER / MODAL ─── */}
      {isDetailOpen && activeCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="max-w-3xl w-full max-h-[90vh] bg-[#FFF9E9] rounded-3xl border border-[#CDC7AA] shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-[#FAF3DF] border-b border-[#CDC7AA]/50 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${activeCompany.logoBg} flex items-center justify-center text-white font-black text-base shadow-sm shrink-0`}>
                  {activeCompany.shortName.slice(0, 3)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-extrabold text-[#1E1C10]">{activeCompany.name}</h2>
                    <span className="px-2 py-0.5 rounded-md bg-[#FFE600] text-[#726600] text-[10px] font-black uppercase">
                      {activeCompany.category}
                    </span>
                  </div>
                  <div className="text-xs text-[#4B4731] mt-0.5 flex items-center gap-3 font-medium">
                    <span>Package: <strong className="text-[#726600]">{activeCompany.ctcOverview}</strong></span>
                    <span>•</span>
                    <span>Deadline: <strong>{activeCompany.deadlineDate}</strong></span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsDetailOpen(false)}
                className="w-8 h-8 rounded-full bg-[#EEE8D4] hover:bg-[#E3DCB8] text-[#1E1C10] flex items-center justify-center text-sm font-bold transition-colors shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Modal Tab Buttons */}
            <div className="flex items-center border-b border-[#CDC7AA]/40 px-5 sm:px-6 bg-[#FAF3DF]/60 overflow-x-auto">
              {[
                { id: 'rounds', label: 'Hiring Blueprint', icon: <Layers className="w-3.5 h-3.5" /> },
                { id: 'eligibility', label: 'Eligibility Calculator', icon: <FileCheck className="w-3.5 h-3.5" /> },
                { id: 'questions', label: 'Past Interview Questions', icon: <BookOpen className="w-3.5 h-3.5" /> },
                { id: 'tips', label: 'Preparation Checklist', icon: <Sparkles className="w-3.5 h-3.5" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#726600] text-[#726600] bg-[#FFF9E9]'
                      : 'border-transparent text-[#4B4731] hover:text-[#1E1C10]'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
              {/* TAB 1: HIRING BLUEPRINT */}
              {activeTab === 'rounds' && (
                <div className="space-y-4">
                  <div className="text-xs text-[#4B4731] font-medium">
                    Official round-by-round selection workflow and qualifying benchmarks:
                  </div>

                  <div className="space-y-3">
                    {activeCompany.rounds.map((rnd) => (
                      <div
                        key={rnd.step}
                        className="p-4 rounded-2xl bg-[#FAF3DF] border border-[#CDC7AA]/50 space-y-2 relative"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#1E1C10] text-[#FFF9E9] flex items-center justify-center font-bold text-xs font-mono">
                              {rnd.step}
                            </span>
                            <h4 className="text-sm font-bold text-[#1E1C10]">{rnd.title}</h4>
                          </div>
                          <span className="text-[11px] font-mono text-[#726600] font-semibold bg-[#FFE600]/30 px-2 py-0.5 rounded">
                            {rnd.duration}
                          </span>
                        </div>

                        <p className="text-xs text-[#4B4731] leading-relaxed pl-8">
                          {rnd.details}
                        </p>

                        <div className="pl-8 pt-1 text-[11px] text-[#726600] font-bold flex items-center gap-1.5">
                          <span>Target Cut-off:</span>
                          <span className="text-[#1E1C10] font-semibold">{rnd.cutoffScore}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: ELIGIBILITY CALCULATOR */}
              {activeTab === 'eligibility' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-[#FAF3DF] border border-[#CDC7AA]/50 space-y-4">
                    <h4 className="text-sm font-extrabold text-[#1E1C10]">Test Your Drive Eligibility</h4>
                    <p className="text-xs text-[#4B4731]">
                      Enter your academic scores to evaluate immediate eligibility against {activeCompany.shortName} criteria.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#4B4731] mb-1">Current CGPA</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={studentCgpa}
                          onChange={(e) => setStudentCgpa(parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-1.5 rounded-xl bg-[#FFF9E9] border border-[#CDC7AA] text-xs font-mono font-bold text-[#1E1C10]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#4B4731] mb-1">10th Mark (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={student10th}
                          onChange={(e) => setStudent10th(parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-1.5 rounded-xl bg-[#FFF9E9] border border-[#CDC7AA] text-xs font-mono font-bold text-[#1E1C10]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#4B4731] mb-1">12th Mark (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={student12th}
                          onChange={(e) => setStudent12th(parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-1.5 rounded-xl bg-[#FFF9E9] border border-[#CDC7AA] text-xs font-mono font-bold text-[#1E1C10]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#4B4731] mb-1">Active Backlogs</label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={studentBacklogs}
                          onChange={(e) => setStudentBacklogs(parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-1.5 rounded-xl bg-[#FFF9E9] border border-[#CDC7AA] text-xs font-mono font-bold text-[#1E1C10]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Result Box */}
                  <div className={`p-4 rounded-2xl border ${
                    eligibilityResult.isOverallEligible
                      ? 'bg-emerald-50 border-emerald-300'
                      : 'bg-amber-50 border-amber-300'
                  } space-y-3`}>
                    <div className="flex items-center gap-2">
                      {eligibilityResult.isOverallEligible ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-amber-600" />
                      )}
                      <h5 className="text-sm font-bold text-[#1E1C10]">
                        {eligibilityResult.isOverallEligible
                          ? `You are 100% Eligible for ${activeCompany.shortName} Placement Drive!`
                          : `Criteria Gap Detected for ${activeCompany.shortName}`}
                      </h5>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className={`p-2 rounded-xl border ${eligibilityResult.cgpaOk ? 'bg-emerald-100/50 border-emerald-200 text-emerald-900' : 'bg-red-100/50 border-red-200 text-red-900'}`}>
                        CGPA: {eligibilityResult.cgpaOk ? 'Met ✓' : `Req >= ${activeCompany.eligibility.minCgpa}`}
                      </div>
                      <div className={`p-2 rounded-xl border ${eligibilityResult.tenthOk ? 'bg-emerald-100/50 border-emerald-200 text-emerald-900' : 'bg-red-100/50 border-red-200 text-red-900'}`}>
                        10th: {eligibilityResult.tenthOk ? 'Met ✓' : `Req >= ${activeCompany.eligibility.min10thPercent}%`}
                      </div>
                      <div className={`p-2 rounded-xl border ${eligibilityResult.twelfthOk ? 'bg-emerald-100/50 border-emerald-200 text-emerald-900' : 'bg-red-100/50 border-red-200 text-red-900'}`}>
                        12th: {eligibilityResult.twelfthOk ? 'Met ✓' : `Req >= ${activeCompany.eligibility.min12thPercent}%`}
                      </div>
                      <div className={`p-2 rounded-xl border ${eligibilityResult.backlogOk ? 'bg-emerald-100/50 border-emerald-200 text-emerald-900' : 'bg-red-100/50 border-red-200 text-red-900'}`}>
                        Backlogs: {eligibilityResult.backlogOk ? 'Met ✓' : `Max ${activeCompany.eligibility.maxBacklogs}`}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PAST QUESTIONS */}
              {activeTab === 'questions' && (
                <div className="space-y-3">
                  <div className="text-xs text-[#4B4731] font-medium">
                    Actual interview and assessment questions asked in recent {activeCompany.shortName} hiring drives:
                  </div>

                  {activeCompany.questions.map((q) => (
                    <div key={q.id} className="p-4 rounded-2xl bg-[#FAF3DF] border border-[#CDC7AA]/50 space-y-2">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="px-2 py-0.5 rounded bg-[#EEE8D4] text-[#726600] font-bold text-[10px] uppercase">
                          {q.round} • {q.topic}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white text-[#4B4731] font-semibold text-[10px] border border-[#CDC7AA]/40">
                          {q.difficulty}
                        </span>
                      </div>

                      <h5 className="text-sm font-bold text-[#1E1C10]">{q.question}</h5>

                      <div className="p-3 rounded-xl bg-white/80 border border-[#CDC7AA]/40 text-xs text-[#4B4731] leading-relaxed">
                        <strong className="text-[#726600] block mb-0.5">Solution Approach / Derivation:</strong>
                        {q.solutionHint}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: PREPARATION CHECKLIST & TIPS */}
              {activeTab === 'tips' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#FAF3DF] border border-[#CDC7AA]/50 space-y-2">
                    <h5 className="text-sm font-bold text-[#1E1C10]">Recommended Pro Strategy</h5>
                    <ul className="space-y-2 text-xs text-[#4B4731] list-disc list-inside">
                      {activeCompany.quickTips.map((tip, idx) => (
                        <li key={idx} className="leading-relaxed">{tip}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Practice CTA */}
                  <div className="p-4 rounded-2xl bg-[#1E1C10] text-[#FFF9E9] flex items-center justify-between gap-4">
                    <div>
                      <h6 className="text-sm font-bold text-[#FFE600]">Practice Timed Mock Test</h6>
                      <p className="text-xs text-gray-300 mt-0.5">Solve company-pattern aptitude and core CS questions online</p>
                    </div>
                    <Link
                      to="/assessment"
                      className="px-4 py-2 rounded-xl bg-[#FFE600] text-[#1E1C10] text-xs font-bold hover:bg-[#F2DA00] shrink-0"
                    >
                      Start Assessment
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#FAF3DF] border-t border-[#CDC7AA]/50 flex items-center justify-between gap-3">
              <div className="text-xs text-[#4B4731] font-medium">
                Drive Date: <strong>{activeCompany.driveDate}</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#EEE8D4] text-[#1E1C10] text-xs font-bold border border-[#CDC7AA]/60"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleToggleRegister(activeCompany.id);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    registeredDrives[activeCompany.id]
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#FFE600] hover:bg-[#F2DA00] text-[#1E1C10]'
                  }`}
                >
                  {registeredDrives[activeCompany.id] ? 'Registered ✓' : 'Register for Drive'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
