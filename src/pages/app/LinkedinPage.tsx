import { useState } from 'react';
import {
  SmartToy,
  AutoAwesome,
  Verified,
  CheckCircle2,
  TrendingUp,
  Linkedin,
} from '../../components/icons/StitchIcons';
import {
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Eye,
  Zap,
  TrendingUp as TrendingUpIcon,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

const HEADLINE_VARIATIONS = [
  {
    type: 'sde',
    text: "Aspiring Full-Stack Software Engineer | React, TypeScript, Node.js, Python | CSE @ NIT Calicut '26 | Open to SDE Internships & Full-Time Roles",
    tag: 'Role Specific (SDE)',
    impact: 'High Technical Impact',
  },
  {
    type: 'oss',
    text: "Software Engineering Fellow @ OpenCode | Distributed Systems, Go, React | Top 1% Hackathon Winner | NITC '26",
    tag: 'Open Source Focus',
    impact: 'Story & Proof Driven',
  },
  {
    type: 'startup',
    text: "Passionate Problem Solver | 400+ LeetCode (Knight) | Full-Stack Developer (MERN) | Seeking SDE Summer '25 Opportunities",
    tag: 'Startup Hustler',
    impact: 'DSA & Problem Solving',
  },
];

export default function LinkedinPage() {
  const [activeTab, setActiveTab] = useState<'sde' | 'oss' | 'startup'>('sde');
  const [headline, setHeadline] = useState(HEADLINE_VARIATIONS[0].text);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(headline);
    setCopied(true);
    showToast('Headline copied to clipboard! Ready to paste into LinkedIn.');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAutoTweak = () => {
    setHeadline(
      "High-Performance Full-Stack Engineer | React, TypeScript, Microservices | CSE @ NIT Calicut '26 | Building Scalable Cloud Systems"
    );
    showToast('✨ Pal-Bot tweaked headline for 4.2x higher recruiter click-through!');
  };

  const handleApplyVariation = (item: (typeof HEADLINE_VARIATIONS)[0]) => {
    setActiveTab(item.type as any);
    setHeadline(item.text);
    showToast(`Applied "${item.tag}" headline format!`);
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

      {/* ─── Top Bar / Status Pill ─── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#7C775F]">
          <span>Dashboard</span>
          <span>&gt;</span>
          <span className="text-[#1E1C10]">LinkedIn Profile Optimizer</span>
        </div>
        <div className="flex items-center gap-2 bg-[#FAF3DF] px-3.5 py-1 rounded-full border border-[#CDC7AA]/30 text-xs font-bold text-[#006B5B]">
          <span className="w-2 h-2 rounded-full bg-[#006B5B] animate-pulse" />
          <span>LinkedIn Sync Status: Active (18m ago)</span>
        </div>
      </div>

      {/* ─── Header & Title Area ─── */}
      <div className="relative bg-[#F4EEDA] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#CDC7AA]/40 overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#FFE600]/25 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start gap-4 max-w-3xl relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-[#0077B5] text-white flex items-center justify-center shadow-md shrink-0">
            <Linkedin className="h-8 w-8 text-white" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1E1C10] tracking-tight">
                LinkedIn Profile Optimizer
              </h1>
              <span className="bg-[#FFE600] text-[#1A1A1A] font-bold text-xs px-3 py-0.5 rounded-full shadow-sm">
                Recruiter Magnet 🧲
              </span>
              <span className="bg-[#26FEDC] text-[#007261] font-bold text-xs px-3 py-0.5 rounded-full shadow-sm">
                All-Star Ready 🌟
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#4B4731] font-medium leading-relaxed">
              Audit your headline, About summary, experience bullet points, featured artifacts, and recruiter search visibility algorithm.
            </p>
          </div>
        </div>

        {/* CTA Action Group */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10 shrink-0">
          <button
            onClick={() =>
              document.getElementById('headline-studio')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="flex items-center gap-2 bg-[#FFE600] text-[#1A1A1A] font-bold text-xs px-5 py-3 rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform border border-[#CDC7AA]/40 cursor-pointer"
          >
            <AutoAwesome className="h-4 w-4 text-[#6A5F00]" />
            <span>AI Headline Generator</span>
          </button>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-[#1E1C10] font-bold text-xs px-4 py-3 rounded-full hover:bg-[#FAF3DF] transition-colors shadow-sm border border-[#CDC7AA]/30"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Open LinkedIn</span>
          </a>
        </div>
      </div>

      {/* ─── Top Metric Bento Grid (4 Cards) ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Card 1: Completeness */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7C775F] uppercase tracking-wider">
              Profile Completeness
            </span>
            <Verified className="h-4 w-4 text-[#006B5B]" />
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-heading text-4xl font-black text-[#1E1C10]">92%</span>
            <span className="text-xs font-bold text-[#006B5B]">Top 5% Tier</span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full bg-[#FAF3DF] rounded-full h-2.5 overflow-hidden">
              <div className="bg-[#00F5D4] h-full rounded-full" style={{ width: '92%' }} />
            </div>
            <p className="text-[11px] text-[#4B4731] font-semibold">
              All-Star Badge Active 🏆 (NIT Calicut Verified)
            </p>
          </div>
        </div>

        {/* Card 2: Search Appearances */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7C775F] uppercase tracking-wider">
              Search Appearances
            </span>
            <Eye className="h-4 w-4 text-[#6A5F00]" />
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-heading text-4xl font-black text-[#1E1C10]">
              48 <span className="text-xs font-bold text-[#7C775F]">/ wk</span>
            </span>
            <span className="text-xs font-bold text-[#006B5B] bg-[#00F5D4]/20 px-2 py-0.5 rounded-full">
              +18%
            </span>
          </div>
          <p className="text-[11px] text-[#4B4731] font-semibold truncate">
            Keywords: React, TypeScript, CSE '26, SDE Intern
          </p>
        </div>

        {/* Card 3: Headline Impact */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7C775F] uppercase tracking-wider">
              Headline Impact
            </span>
            <Zap className="h-4 w-4 text-[#6A5F00]" />
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-heading text-4xl font-black text-[#1E1C10]">Strong</span>
            <span className="text-lg">⚡</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex gap-1 h-2">
              <div className="flex-1 bg-[#FFE600] rounded-full" />
              <div className="flex-1 bg-[#FFE600] rounded-full" />
              <div className="flex-1 bg-[#FFE600] rounded-full" />
              <div className="flex-1 bg-[#FAF3DF] rounded-full" />
            </div>
            <p className="text-[11px] text-[#4B4731] font-semibold truncate">
              Includes role target, tech stack & proof
            </p>
          </div>
        </div>

        {/* Card 4: SSI Score */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7C775F] uppercase tracking-wider">
              Social Selling Index
            </span>
            <TrendingUpIcon className="h-4 w-4 text-[#006B5B]" />
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-heading text-4xl font-black text-[#1E1C10]">78</span>
            <span className="text-xs font-bold text-[#7C775F]">/ 100</span>
            <span className="text-xs font-bold text-[#6A5F00] ml-auto">Top 8%</span>
          </div>
          <p className="text-[11px] text-[#4B4731] font-semibold">
            Network reach: 1.4k alumni & tech recruiters
          </p>
        </div>
      </div>

      {/* ─── Interactive AI Headline & Pitch Studio ─── */}
      <div
        id="headline-studio"
        className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FFE600]" />
            <h2 className="font-heading text-xl font-black text-[#1E1C10]">
              AI Headline & Pitch Studio
            </h2>
            <span className="bg-[#6A5F00] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              Recommended
            </span>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center bg-[#FAF3DF] p-1 rounded-full border border-[#CDC7AA]/30 text-xs font-bold">
            {HEADLINE_VARIATIONS.map((item) => (
              <button
                key={item.type}
                onClick={() => handleApplyVariation(item)}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                  activeTab === item.type
                    ? 'bg-white text-[#1E1C10] shadow-xs'
                    : 'text-[#4B4731] hover:text-[#1E1C10]'
                }`}
              >
                {item.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Active Terminal Box */}
        <div className="relative bg-[#1A1A1A] text-white rounded-2xl p-5 shadow-md flex flex-col gap-3">
          <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F5D4]" />
              <span className="ml-2">headline_preview.txt</span>
            </div>
            <span>{headline.length} / 220 chars</span>
          </div>

          <textarea
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            rows={3}
            className="w-full bg-transparent text-white font-mono text-xs sm:text-sm font-medium focus:outline-none resize-none leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-700">
            <div className="flex items-center gap-1.5 text-[#00F5D4] text-xs font-semibold">
              <TrendingUp className="h-4 w-4" />
              <span>Predicted Recruiter Click-Through: <strong>+4.2x higher than average student profiles</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-[#00F5D4]" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>

              <button
                onClick={handleAutoTweak}
                className="flex items-center gap-1.5 bg-[#FFE600] text-[#1A1A1A] text-xs font-bold px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Pal-Bot Auto-Tweak</span>
              </button>
            </div>
          </div>
        </div>

        {/* Alternative Variations */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C775F]">
            Instant Alternative Variations:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HEADLINE_VARIATIONS.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FAF3DF]/60 p-4 rounded-2xl flex flex-col justify-between gap-3 border border-[#CDC7AA]/30 hover:bg-[#FAF3DF] transition-colors"
              >
                <p className="text-xs text-[#1E1C10] font-medium leading-relaxed">
                  "{item.text}"
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[#CDC7AA]/20">
                  <span className="text-[11px] font-bold text-[#006B5B]">{item.impact}</span>
                  <button
                    onClick={() => handleApplyVariation(item)}
                    className="bg-white hover:bg-[#FFE600] text-[#1A1A1A] px-3 py-1 rounded-full text-xs font-bold transition-colors border border-[#CDC7AA]/30 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Profile Sections Audit & Checklist ─── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-[#6A5F00]" />
            <h2 className="font-heading text-xl font-black text-[#1E1C10]">
              Profile Sections Deep Audit
            </h2>
          </div>
          <span className="text-xs font-bold text-[#006B5B] bg-[#00F5D4]/20 px-3 py-1 rounded-full">
            4 of 5 components recruiter-ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Item 1 */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-[#006B5B]" />
                <h3 className="font-heading text-base font-extrabold text-[#1E1C10]">
                  Banner & Profile Picture
                </h3>
              </div>
              <span className="text-xs font-bold text-[#006B5B] bg-[#00F5D4]/20 px-2.5 py-0.5 rounded-full">
                98/100
              </span>
            </div>
            <p className="text-xs text-[#4B4731] leading-relaxed">
              Professional front-facing lighting with 60% face fill. Custom NIT Calicut engineering banner uploaded with GitHub/Portfolio handles.
            </p>
          </div>

          {/* Item 2 */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="h-5 w-5 text-[#FF6B6B]" />
                <h3 className="font-heading text-base font-extrabold text-[#1E1C10]">
                  About / Summary Section
                </h3>
              </div>
              <span className="text-xs font-bold text-[#BA1A1A] bg-[#FFDAD6] px-2.5 py-0.5 rounded-full">
                72/100
              </span>
            </div>
            <p className="text-xs text-[#4B4731] leading-relaxed">
              Great technical passion statement, but needs quantifiable metric callouts (e.g. "Solved 400+ problems, built 3 microservice systems").
            </p>
          </div>

          {/* Item 3 */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-[#006B5B]" />
                <h3 className="font-heading text-base font-extrabold text-[#1E1C10]">
                  Featured Projects & Media
                </h3>
              </div>
              <span className="text-xs font-bold text-[#006B5B] bg-[#00F5D4]/20 px-2.5 py-0.5 rounded-full">
                95/100
              </span>
            </div>
            <p className="text-xs text-[#4B4731] leading-relaxed">
              3 featured items linked: GitHub DevConnect repository, LeetCode badge certificate, and interactive portfolio URL.
            </p>
          </div>

          {/* Item 4 */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-[#006B5B]" />
                <h3 className="font-heading text-base font-extrabold text-[#1E1C10]">
                  Skills & Endorsements
                </h3>
              </div>
              <span className="text-xs font-bold text-[#006B5B] bg-[#00F5D4]/20 px-2.5 py-0.5 rounded-full">
                88/100
              </span>
            </div>
            <p className="text-xs text-[#4B4731] leading-relaxed">
              Top 5 core skills pinned: React, TypeScript, Node.js, Data Structures, System Architecture. Received 24 peer endorsements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
