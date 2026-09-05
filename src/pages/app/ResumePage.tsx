import { useState } from 'react';
import {
  Description,
  SmartToy,
  AutoAwesome,
  Verified,
  CheckCircle2,
  Bolt,
} from '../../components/icons/StitchIcons';
import { UploadCloud, Download, RefreshCw, Sparkles, ExternalLink } from 'lucide-react';
import { mockCareerScore } from '../../data/mockData';

export default function ResumePage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReanalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      showToast('Resume re-analyzed! ATS score verified at 74/100.');
    }, 1200);
  };

  const handleAutoFix = () => {
    showToast('✨ Pal-AI generated 3 optimized bullet points using the STAR format!');
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

      {/* ─── Top Header Section ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#F4EEDA] rounded-3xl p-6 sm:p-7 shadow-sm border border-[#CDC7AA]/40">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-10 h-10 rounded-full bg-[#FFE600] flex items-center justify-center text-[#1A1A1A] shadow-sm border border-[#CDC7AA]/40">
              <Description className="h-5 w-5 text-[#6A5F00]" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1E1C10] tracking-tight">
              Resume Analyzer
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#26FEDC] text-[#007261] font-bold text-xs uppercase tracking-wide flex items-center gap-1 shadow-sm">
              <SmartToy className="h-3.5 w-3.5" /> AI Powered
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#4B4731] max-w-2xl font-medium leading-relaxed">
            Upload your resume to get instant ATS score analysis, keyword matching, and AI recommendations tailored for tech placements.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start md:self-center">
          <button
            onClick={() => showToast('Sample ATS-optimized resume downloaded!')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-[#1E1C10] font-bold text-xs hover:bg-[#FAF3DF] transition-all active:scale-95 shadow-sm border border-[#CDC7AA]/40"
          >
            <Download className="h-4 w-4 text-[#6A5F00]" />
            Download Sample Resume
          </button>
        </div>
      </div>

      {/* ─── Interactive Resume Upload / Dropzone Hero Section ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-[#EEE8D4] p-6 sm:p-8 shadow-md border-2 border-[#CDC7AA]/50">
        {/* Playful Background Accents */}
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#FFE600]/30 blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-[#00F5D4]/25 blur-2xl pointer-events-none" />

        <div className="relative flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-white transition-all duration-300 border border-[#CDC7AA]/40 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-[#FFE600] flex items-center justify-center text-[#1A1A1A] mb-4 shadow-md transition-transform duration-300 hover:rotate-6 hover:scale-110 border border-[#CDC7AA]/30">
            <UploadCloud className="h-10 w-10 text-[#6A5F00]" />
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-black text-[#1E1C10] mb-2">
            Upload your resume (PDF or DOCX)
          </h2>
          <p className="text-xs sm:text-sm text-[#4B4731] max-w-md mb-6 font-medium">
            Drag and drop your file here, or browse from your device. Supported formats: PDF, DOCX (Max size: 5MB).
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <label className="cursor-pointer flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-xs sm:text-sm shadow-md hover:bg-[#DEC800] transition-all duration-200 active:scale-95 border border-[#CDC7AA]/40">
              <UploadCloud className="h-4 w-4" />
              Choose Resume File
              <input
                type="file"
                accept=".pdf,.docx,.doc"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    showToast(`Uploaded ${e.target.files[0].name} successfully! Analyzing...`);
                    handleReanalyze();
                  }
                }}
              />
            </label>
            <button
              onClick={handleReanalyze}
              disabled={analyzing}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#FAF3DF] text-[#1E1C10] font-bold text-xs sm:text-sm hover:bg-[#F4EEDA] transition-all duration-200 active:scale-95 shadow-sm border border-[#CDC7AA]/40 disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 text-[#006B5B] ${analyzing ? 'animate-spin' : ''}`} />
              {analyzing ? 'Analyzing...' : 'Re-Analyze Latest'}
            </button>
          </div>

          {/* Scanned Status Badge */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FAF3DF] text-[#4B4731] font-semibold text-xs shadow-sm border border-[#CDC7AA]/30">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F5D4] inline-block animate-pulse" />
            <span>Last scanned: <strong>resume_arjun_v2.pdf</strong> (2 hours ago)</span>
          </div>
        </div>
      </div>

      {/* ─── ATS & Analysis Metric Cards (3 Columns) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: ATS Score */}
        <div className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-[#CDC7AA]/40">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#7C775F] uppercase tracking-wider">ATS Score</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-[11px] shadow-sm">
                Above Average 🚀
              </span>
            </div>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-heading text-4xl sm:text-5xl font-extrabold text-[#1E1C10]">
                {mockCareerScore.resume}
              </span>
              <span className="text-sm font-bold text-[#7C775F]">/ 100</span>
            </div>
            <div className="w-full bg-[#FAF3DF] h-3 rounded-full overflow-hidden mb-2">
              <div
                className="bg-[#FFE600] h-full rounded-full transition-all duration-700"
                style={{ width: `${mockCareerScore.resume}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-[#4B4731] font-medium leading-relaxed mt-2">
            Good ATS compatibility for entry-level SDE roles. Minor layout adjustments recommended.
          </p>
        </div>

        {/* Card 2: Keyword Density */}
        <div className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-[#CDC7AA]/40">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#7C775F] uppercase tracking-wider">Keyword Density</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#26FEDC] text-[#007261] font-bold text-[11px] shadow-sm">
                Top 10% 🎯
              </span>
            </div>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-heading text-4xl sm:text-5xl font-extrabold text-[#006B5B]">88%</span>
            </div>
            <div className="w-full bg-[#FAF3DF] h-3 rounded-full overflow-hidden mb-2">
              <div className="bg-[#00F5D4] h-full rounded-full transition-all duration-700" style={{ width: '88%' }} />
            </div>
          </div>
          <p className="text-xs text-[#4B4731] font-medium leading-relaxed mb-3">
            Matched 14/16 essential CSE technical keywords.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['React', 'Node.js', 'REST', 'Git', 'TypeScript'].map((kw) => (
              <span key={kw} className="px-2.5 py-0.5 rounded-full bg-[#FAF3DF] font-bold text-[11px] text-[#1E1C10] border border-[#CDC7AA]/30">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Card 3: Action Verb Strength */}
        <div className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-[#CDC7AA]/40">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#7C775F] uppercase tracking-wider">Action Verb Strength</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFDAD6] text-[#BA1A1A] font-bold text-[11px] shadow-sm">
                Needs Polish ✏️
              </span>
            </div>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-heading text-4xl sm:text-5xl font-extrabold text-[#FF6B6B]">62%</span>
            </div>
            <div className="w-full bg-[#FAF3DF] h-3 rounded-full overflow-hidden mb-2">
              <div className="bg-[#FF6B6B] h-full rounded-full transition-all duration-700" style={{ width: '62%' }} />
            </div>
          </div>
          <p className="text-xs text-[#4B4731] font-medium leading-relaxed mt-2">
            Consider replacing passive phrases like "assisted with" with quantifiable impact metrics.
          </p>
        </div>
      </div>

      {/* ─── AI Suggestions & Detailed Insights (2 Columns) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: What ATS Loved */}
        <div className="flex flex-col p-6 sm:p-7 rounded-3xl bg-white shadow-sm justify-between gap-5 border border-[#CDC7AA]/40">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#CDC7AA]/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#26FEDC] flex items-center justify-center text-[#007261]">
                  <Verified className="h-4 w-4" />
                </div>
                <h3 className="font-heading text-lg font-black text-[#1E1C10]">What ATS Loved</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#26FEDC] text-[#007261] font-bold text-xs">
                3/3 Rules Passed
              </span>
            </div>

            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF3DF]/70 border border-[#CDC7AA]/30">
                <CheckCircle2 className="h-5 w-5 text-[#006B5B] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1E1C10]">Education Credentials</span>
                  <span className="text-xs text-[#4B4731]">
                    Degree, branch, and CGPA are well-formatted and instantly recognizable by parsers.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF3DF]/70 border border-[#CDC7AA]/30">
                <CheckCircle2 className="h-5 w-5 text-[#006B5B] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1E1C10]">Project Section Alignment</span>
                  <span className="text-xs text-[#4B4731]">
                    Strong emphasis on React, REST APIs, and database technologies matching current SDE job descriptions.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF3DF]/70 border border-[#CDC7AA]/30">
                <CheckCircle2 className="h-5 w-5 text-[#006B5B] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1E1C10]">Clean Single-Column Structure</span>
                  <span className="text-xs text-[#4B4731]">
                    Zero complex multi-column tables or non-standard fonts that obstruct scanning engines.
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-[#CDC7AA]/30 text-xs text-[#4B4731] font-medium">
            <span>No critical formatting defects detected</span>
            <span className="px-3 py-1 rounded-full bg-[#EEE8D4] text-[#1E1C10] font-bold text-[11px]">
              Parser Ready
            </span>
          </div>
        </div>

        {/* Right Column: AI Recommendations & Improvements */}
        <div className="flex flex-col p-6 sm:p-7 rounded-3xl bg-white shadow-sm justify-between gap-5 border border-[#CDC7AA]/40">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#CDC7AA]/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FFE600] flex items-center justify-center text-[#1A1A1A]">
                  <AutoAwesome className="h-4 w-4 text-[#6A5F00]" />
                </div>
                <h3 className="font-heading text-lg font-black text-[#1E1C10]">AI Recommendations</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFDAD6] text-[#BA1A1A] font-bold text-xs">
                3 High Impact Fixes
              </span>
            </div>

            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF3DF]/70 border border-[#CDC7AA]/30">
                <Bolt className="h-5 w-5 text-[#FF6B6B] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1E1C10]">Add Quantifiable Impact</span>
                  <span className="text-xs text-[#4B4731]">
                    Include measurable outcomes, e.g., "reduced latency by 20%" or "served 500+ daily active users".
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF3DF]/70 border border-[#CDC7AA]/30">
                <Sparkles className="h-5 w-5 text-[#6A5F00] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1E1C10]">Cloud Deployment Details</span>
                  <span className="text-xs text-[#4B4731]">
                    Mention hosting/infra tools like Docker, AWS, or Vercel links directly under project titles.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF3DF]/70 border border-[#CDC7AA]/30">
                <ExternalLink className="h-5 w-5 text-[#006B5B] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1E1C10]">Interactive Links & Repos</span>
                  <span className="text-xs text-[#4B4731]">
                    Add live demo links and GitHub repository hyperlinks to validate hands-on execution.
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleAutoFix}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-xs sm:text-sm shadow-md hover:bg-[#DEC800] transition-all duration-200 active:scale-95 border border-[#CDC7AA]/40"
            >
              <Sparkles className="h-4 w-4 text-[#6A5F00]" />
              Auto-Fix with Pal-AI ✨
            </button>
          </div>
        </div>
      </div>

      {/* ─── Mascot Coach Pal-Bot Quick Tip Card ─── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-[#EEE8D4] shadow-sm border border-[#CDC7AA]/50">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#FFE600] flex items-center justify-center text-[#1A1A1A] shadow-sm shrink-0 border border-[#CDC7AA]/40">
            <SmartToy className="h-7 w-7 text-[#6A5F00]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-extrabold text-[#6A5F00] uppercase tracking-wider">
              Pal-Bot Coach Tip
            </span>
            <p className="text-xs sm:text-sm text-[#1E1C10] font-medium leading-relaxed mt-0.5">
              Beep boop! 🤖 Bolster your bullet points with the <strong>STAR format</strong> (Situation, Task, Action, Result) to increase recruiter callback odds by up to 35%!
            </p>
          </div>
        </div>
        <button
          onClick={() => showToast('Opening STAR guide tips...')}
          className="px-5 py-2.5 rounded-full bg-white text-[#1E1C10] font-bold text-xs hover:bg-[#FAF3DF] transition-all active:scale-95 shadow-sm border border-[#CDC7AA]/40 shrink-0 self-end sm:self-center"
        >
          View Guide
        </button>
      </div>
    </div>
  );
}
