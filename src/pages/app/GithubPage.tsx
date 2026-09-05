import { useState } from 'react';
import {
  SmartToy,
  AutoAwesome,
  Verified,
  CheckCircle2,
  TrendingUp,
  Github,
} from '../../components/icons/StitchIcons';
import {
  Star,
  GitFork,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  FolderGit2,
  Flame,
  FileCode2,
} from 'lucide-react';
import { mockUser } from '../../data/mockData';

export default function GithubPage() {
  const [syncing, setSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      showToast('GitHub data successfully synchronized with NITC drive!');
    }, 1200);
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

      {/* ─── Top Bar: Title, Badge, and Sync Action ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-[#FFE600] flex items-center justify-center shadow-md border border-[#CDC7AA]/40 transition-transform hover:scale-105">
            <Github className="h-8 w-8 text-[#1A1A1A]" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1E1C10] tracking-tight">
                GitHub Profile Analyzer
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-xs shadow-sm border border-[#CDC7AA]/30">
                <span>AI Code Audit</span>
                <span>🐙</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#4B4731] font-medium mt-0.5">
              Analyze commit patterns, repository quality, code documentation, and open source readiness.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-[#1E1C10] font-bold text-xs shadow-sm hover:bg-[#FAF3DF] transition-all active:scale-95 border border-[#CDC7AA]/40 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 text-[#006B5B] ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Syncing...' : 'Re-sync GitHub'}</span>
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-xs shadow-md hover:bg-[#DEC800] transition-all active:scale-95 border border-[#CDC7AA]/40"
          >
            <span>View on GitHub</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* ─── Student Profile Bento Ribbon ─── */}
      <div className="w-full bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#CDC7AA]/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-all hover:shadow-md">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-[#FFE600] text-[#1A1A1A] flex items-center justify-center font-heading text-3xl font-black shadow-inner border border-[#CDC7AA]/40">
              A
            </div>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#00F5D4] flex items-center justify-center text-[#1A1A1A] shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-[#006B5B]" />
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-heading text-xl sm:text-2xl font-black text-[#1E1C10]">
                {mockUser.name}
              </h2>
              <span className="px-3 py-0.5 rounded-full bg-[#FAF3DF] text-[#006B5B] font-bold text-xs border border-[#CDC7AA]/30">
                Verified NIT Calicut
              </span>
              <span className="px-3 py-0.5 rounded-full bg-[#FFE600]/30 text-[#6A5F00] font-bold text-xs">
                Tier-1 SDE Track
              </span>
            </div>
            <p className="text-xs text-[#4B4731] font-medium mt-1">
              Full Stack Developer • Distributed Systems & Open Source Contributor • @arjunpatel_dev
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs font-semibold text-[#7C775F]">
              <span><strong>248</strong> Followers</span>
              <span><strong>91</strong> Following</span>
              <span><strong>12</strong> Repositories</span>
              <span>Kerala, India</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Chip Cluster */}
        <div className="flex items-center gap-3 self-stretch lg:self-auto justify-end">
          <div className="px-5 py-3 rounded-2xl bg-[#FAF3DF] flex flex-col items-center justify-center border border-[#CDC7AA]/30">
            <span className="font-heading text-xl font-black text-[#6A5F00]">595</span>
            <span className="text-[11px] font-bold text-[#7C775F]">Yearly Commits</span>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-[#FAF3DF] flex flex-col items-center justify-center border border-[#CDC7AA]/30">
            <span className="font-heading text-xl font-black text-[#006B5B]">94%</span>
            <span className="text-[11px] font-bold text-[#7C775F]">Code Hygiene</span>
          </div>
        </div>
      </div>

      {/* ─── Core Metric Cards (4-Column Bento) ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Profile Strength */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between hover:shadow-md transition-all">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C775F]">
                Profile Strength
              </span>
              <AutoAwesome className="h-4 w-4 text-[#6A5F00]" />
            </div>
            <div className="my-2">
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-4xl font-black text-[#1E1C10]">84</span>
                <span className="text-xs font-bold text-[#7C775F]">/ 100</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#FAF3DF] mt-2 overflow-hidden">
                <div className="h-full bg-[#FFE600] rounded-full transition-all duration-1000" style={{ width: '84%' }} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-[#CDC7AA]/20">
            <span className="text-[#006B5B] flex items-center gap-1">
              <Verified className="h-3.5 w-3.5" /> Recruiter-Ready
            </span>
            <span className="text-[#7C775F]">Top 10% Batch</span>
          </div>
        </div>

        {/* Card 2: Public Repos */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between hover:shadow-md transition-all">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C775F]">
                Public Repos
              </span>
              <FolderGit2 className="h-4 w-4 text-[#006B5B]" />
            </div>
            <div className="my-2">
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-4xl font-black text-[#1E1C10]">12</span>
                <span className="text-xs font-bold text-[#7C775F]">total repos</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#26FEDC] text-[#007261] font-bold text-[10px]">
                  5 Flagship
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAF3DF] text-[#4B4731] font-bold text-[10px]">
                  7 Labs
                </span>
              </div>
            </div>
          </div>
          <div className="text-xs font-bold text-[#7C775F] pt-2 border-t border-[#CDC7AA]/20 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-[#6A5F00]" /> 5 featured projects audited
          </div>
        </div>

        {/* Card 3: Total Commits */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between hover:shadow-md transition-all">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C775F]">
                Total Commits
              </span>
              <Flame className="h-4 w-4 text-[#FF6B6B]" />
            </div>
            <div className="my-2">
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-4xl font-black text-[#1E1C10]">595</span>
                <span className="text-xs font-bold text-[#7C775F]">this year</span>
              </div>
              <div className="flex items-center gap-1 text-[#006B5B] font-bold text-xs mt-2">
                <TrendingUp className="h-4 w-4" />
                <span>+34% vs peer benchmark</span>
              </div>
            </div>
          </div>
          <div className="text-xs font-bold text-[#7C775F] pt-2 border-t border-[#CDC7AA]/20">
            High consistency streak 🔥
          </div>
        </div>

        {/* Card 4: README Quality */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between hover:shadow-md transition-all">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C775F]">
                README Quality
              </span>
              <FileCode2 className="h-4 w-4 text-[#FF6B6B]" />
            </div>
            <div className="my-2">
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-4xl font-black text-[#1E1C10]">68</span>
                <span className="text-xs font-bold text-[#7C775F]">/ 100</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#FAF3DF] mt-2 overflow-hidden">
                <div className="h-full bg-[#FF6B6B] rounded-full transition-all duration-1000" style={{ width: '68%' }} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-[#CDC7AA]/20">
            <span className="text-[#BA1A1A] flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> Needs Diagrams
            </span>
            <span className="text-[#7C775F]">2 Missing Docs</span>
          </div>
        </div>
      </div>

      {/* ─── Flagship Repositories Grid ─── */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-xl font-black text-[#1E1C10]">
              Audited Flagship Repositories
            </h3>
            <p className="text-xs text-[#4B4731] mt-0.5">
              Code analysis based on CI/CD pipelines, documentation, and test coverage
            </p>
          </div>
          <span className="text-xs font-bold text-[#6A5F00] bg-[#FFE600]/30 px-3 py-1 rounded-full">
            3 Audited
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              name: 'devconnect-microservices',
              desc: 'High-throughput social platform backend built on Node.js, RabbitMQ, and Redis with Docker Compose.',
              stars: 42,
              forks: 14,
              lang: 'TypeScript',
              health: '92/100',
              status: 'Excellent',
            },
            {
              name: 'cloud-native-k8s-pipeline',
              desc: 'GitOps deployment pipeline for multi-cluster Kubernetes deployment using ArgoCD & Terraform.',
              stars: 28,
              forks: 7,
              lang: 'Go',
              health: '86/100',
              status: 'Great',
            },
            {
              name: 'algo-visualizer-canvas',
              desc: 'Interactive 60FPS browser DSA visualizer using HTML5 Canvas, React, and Web Workers.',
              stars: 65,
              forks: 21,
              lang: 'React / JS',
              health: '78/100',
              status: 'Needs Tests',
            },
          ].map((repo) => (
            <div
              key={repo.name}
              className="p-5 rounded-2xl bg-[#FAF3DF]/60 hover:bg-[#FAF3DF] border border-[#CDC7AA]/40 flex flex-col justify-between transition-all duration-200 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white text-[#1E1C10] font-bold text-[10px] border border-[#CDC7AA]/30">
                    {repo.lang}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      repo.status === 'Excellent'
                        ? 'bg-[#00F5D4]/30 text-[#006B5B]'
                        : repo.status === 'Great'
                        ? 'bg-[#FFE600]/40 text-[#6A5F00]'
                        : 'bg-[#FFDAD6] text-[#BA1A1A]'
                    }`}
                  >
                    {repo.status}
                  </span>
                </div>

                <h4 className="font-heading text-base font-extrabold text-[#1E1C10]">
                  {repo.name}
                </h4>
                <p className="text-xs text-[#4B4731] line-clamp-3 mt-1 leading-relaxed">
                  {repo.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#CDC7AA]/30 flex items-center justify-between text-xs font-bold text-[#7C775F]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-[#6A5F00]" /> {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3.5 w-3.5" /> {repo.forks}
                  </span>
                </div>
                <span className="text-[#1E1C10] font-extrabold">{repo.health}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Pal-Bot AI Suggestions Banner ─── */}
      <div className="bg-[#EEE8D4] p-6 rounded-3xl border border-[#CDC7AA]/50 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FFE600] flex items-center justify-center text-[#1A1A1A] shrink-0 border border-[#CDC7AA]/40 shadow-sm">
            <SmartToy className="h-6 w-6 text-[#6A5F00]" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-[#6A5F00] uppercase tracking-wider">
              Pal-Bot GitHub Auditor
            </span>
            <p className="text-xs sm:text-sm text-[#1E1C10] font-medium leading-relaxed mt-0.5">
              Adding system architecture diagrams to <strong>devconnect-microservices</strong> and unit tests to <strong>algo-visualizer</strong> will raise your recruiter score to <strong>90+ Tier-1</strong>.
            </p>
          </div>
        </div>
        <button
          onClick={() => showToast('✨ Generated Mermaid architecture template for README!')}
          className="px-5 py-2.5 rounded-full bg-[#1A1A1A] text-white font-bold text-xs hover:bg-black transition-all active:scale-95 shadow-sm shrink-0 self-end sm:self-center"
        >
          Generate Diagrams ✨
        </button>
      </div>
    </div>
  );
}
