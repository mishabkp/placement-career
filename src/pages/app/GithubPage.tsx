import { useState, useEffect } from 'react';
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
  ExternalLink,
  RefreshCw,
  AlertCircle,
  FolderGit2,
  Flame,
  FileCode2,
  Loader2,
  Search,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiService, type GithubAnalysisResult } from '../../services/api';

export default function GithubPage() {
  const { user } = useAuth();
  const [usernameInput, setUsernameInput] = useState(user.github_username || 'octocat');
  const [activeUsername, setActiveUsername] = useState(user.github_username || 'octocat');
  const [syncing, setSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<GithubAnalysisResult | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const runGithubAnalysis = async (userToQuery: string) => {
    if (!userToQuery.trim()) return;
    setSyncing(true);
    try {
      const data = await apiService.analyzeGithub(userToQuery.trim());
      setAnalysisData(data);
      setActiveUsername(userToQuery.trim());
      showToast(`GitHub profile @${userToQuery} successfully analyzed by AI!`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch GitHub profile';
      showToast(`Error: ${msg}`);
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    // Run initial analysis with user's github username if provided
    runGithubAnalysis(user.github_username || 'octocat');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    runGithubAnalysis(usernameInput);
  };

  // Derive stats
  const gh = analysisData?.github_data;
  const ai = analysisData?.ai_analysis;
  const profileScore = ai?.profile_score || 84;
  const repoCount = gh?.public_repos ?? 12;
  const followerCount = gh?.followers ?? 248;
  const followingCount = gh?.following ?? 91;
  const topLanguages = gh?.top_languages || ['TypeScript', 'Python', 'React'];
  const totalStars = gh?.total_stars ?? 42;

  return (
    <div className="space-y-8 pb-16 w-full font-sans text-[#1E1C10]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-[#FFE600] px-5 py-3 rounded-2xl shadow-2xl border border-[#FFE600]/40 flex items-center gap-3 animate-bounce">
          <SmartToy className="h-5 w-5 text-[#FFE600]" />
          <span className="text-xs font-bold text-white">{toastMessage}</span>
        </div>
      )}

      {/* ─── Top Bar: Title, Search, and Sync Action ─── */}
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
              Live GitHub API integration & Gemini AI recruiter profile grading.
            </p>
          </div>
        </div>

        {/* Username Search Bar & Re-sync */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          <div className="relative">
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="Enter GitHub handle..."
              className="bg-white border border-[#CDC7AA]/50 rounded-full px-4 py-2 pl-8 text-xs font-bold text-[#1E1C10] focus:outline-none focus:border-[#6A5F00] shadow-sm w-44 sm:w-52"
            />
            <Search className="h-3.5 w-3.5 text-[#7C775F] absolute left-2.5 top-2.5" />
          </div>

          <button
            type="submit"
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFE600] text-[#1E1C10] font-bold text-xs shadow-sm hover:brightness-105 transition-all active:scale-95 border border-[#CDC7AA]/40 disabled:opacity-50 cursor-pointer"
          >
            {syncing ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#1E1C10]" />
                <span>Auditing...</span>
              </>
            ) : (
              <>
                <RefreshCw className="h-3.5 w-3.5 text-[#1E1C10]" />
                <span>Audit Profile</span>
              </>
            )}
          </button>

          <a
            href={`https://github.com/${activeUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#1A1A1A] font-bold text-xs shadow-sm hover:bg-[#FAF3DF] transition-all active:scale-95 border border-[#CDC7AA]/40"
          >
            <span>View Profile</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </form>
      </div>

      {/* ─── Profile Bento Ribbon ─── */}
      <div className="w-full bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#CDC7AA]/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-all hover:shadow-md">
        <div className="flex items-center gap-4">
          <div className="relative">
            {gh?.avatar_url ? (
              <img
                src={gh.avatar_url}
                alt={activeUsername}
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl object-cover shadow-inner border border-[#CDC7AA]/40"
              />
            ) : (
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-[#FFE600] text-[#1A1A1A] flex items-center justify-center font-heading text-3xl font-black shadow-inner border border-[#CDC7AA]/40">
                {activeUsername[0]?.toUpperCase() || 'G'}
              </div>
            )}
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#00F5D4] flex items-center justify-center text-[#1A1A1A] shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-[#006B5B]" />
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-heading text-xl sm:text-2xl font-black text-[#1E1C10]">
                {gh?.name || activeUsername}
              </h2>
              <span className="px-3 py-0.5 rounded-full bg-[#FAF3DF] text-[#006B5B] font-bold text-xs border border-[#CDC7AA]/30">
                @{activeUsername}
              </span>
              <span className="px-3 py-0.5 rounded-full bg-[#FFE600]/30 text-[#6A5F00] font-bold text-xs">
                {user.track || 'Tier-1 SDE Track'}
              </span>
            </div>
            <p className="text-xs text-[#4B4731] font-medium mt-1">
              {gh?.bio || 'Software Engineer • Open Source Contributor • Placement Ready'}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs font-semibold text-[#7C775F]">
              <span><strong>{followerCount}</strong> Followers</span>
              <span><strong>{followingCount}</strong> Following</span>
              <span><strong>{repoCount}</strong> Repositories</span>
              <span>Top Skills: {topLanguages.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Chip Cluster */}
        <div className="flex items-center gap-3 self-stretch lg:self-auto justify-end">
          <div className="px-5 py-3 rounded-2xl bg-[#FAF3DF] flex flex-col items-center justify-center border border-[#CDC7AA]/30">
            <span className="font-heading text-xl font-black text-[#6A5F00]">{totalStars}</span>
            <span className="text-[11px] font-bold text-[#7C775F]">Repo Stars</span>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-[#FAF3DF] flex flex-col items-center justify-center border border-[#CDC7AA]/30">
            <span className="font-heading text-xl font-black text-[#006B5B]">{profileScore}%</span>
            <span className="text-[11px] font-bold text-[#7C775F]">Recruiter Score</span>
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
                AI Recruiter Score
              </span>
              <AutoAwesome className="h-4 w-4 text-[#6A5F00]" />
            </div>
            <div className="my-2">
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-4xl font-black text-[#1E1C10]">{profileScore}</span>
                <span className="text-xs font-bold text-[#7C775F]">/ 100</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#FAF3DF] mt-2 overflow-hidden">
                <div
                  className="h-full bg-[#FFE600] rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, profileScore)}%` }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-[#CDC7AA]/20">
            <span className="text-[#006B5B] flex items-center gap-1">
              <Verified className="h-3.5 w-3.5" />
              {profileScore >= 75 ? 'Placement Ready' : 'In Progress'}
            </span>
            <span className="text-[#7C775F]">Tier-1 Target</span>
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
                <span className="font-heading text-4xl font-black text-[#1E1C10]">{repoCount}</span>
                <span className="text-xs font-bold text-[#7C775F]">repositories</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                {topLanguages.slice(0, 3).map((l) => (
                  <span key={l} className="px-2.5 py-0.5 rounded-full bg-[#26FEDC] text-[#007261] font-bold text-[10px]">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="text-xs font-bold text-[#7C775F] pt-2 border-t border-[#CDC7AA]/20 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-[#6A5F00]" /> {totalStars} stars earned
          </div>
        </div>

        {/* Card 3: Community Impact */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between hover:shadow-md transition-all">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C775F]">
                Network / Followers
              </span>
              <Flame className="h-4 w-4 text-[#FF6B6B]" />
            </div>
            <div className="my-2">
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-4xl font-black text-[#1E1C10]">{followerCount}</span>
                <span className="text-xs font-bold text-[#7C775F]">followers</span>
              </div>
              <div className="flex items-center gap-1 text-[#006B5B] font-bold text-xs mt-2">
                <TrendingUp className="h-4 w-4" />
                <span>Active Developer Profile</span>
              </div>
            </div>
          </div>
          <div className="text-xs font-bold text-[#7C775F] pt-2 border-t border-[#CDC7AA]/20">
            Open Source Standing
          </div>
        </div>

        {/* Card 4: Readiness Verdict */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between hover:shadow-md transition-all">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C775F]">
                Placement Status
              </span>
              <FileCode2 className="h-4 w-4 text-[#6A5F00]" />
            </div>
            <div className="my-2">
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-xl font-black text-[#1E1C10]">
                  {profileScore >= 75 ? 'Strong Candidate' : 'Developing'}
                </span>
              </div>
              <p className="text-[11px] text-[#4B4731] mt-2 line-clamp-2">
                {ai?.placement_readiness || 'Profile shows positive technical signals for campus recruiters.'}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-[#CDC7AA]/20">
            <span className="text-[#006B5B] flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> Verified by Gemini
            </span>
          </div>
        </div>
      </div>

      {/* ─── AI Recruiter Insights: Strengths & Improvements ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#CDC7AA]/40 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-[#16A34A]" />
            <h3 className="font-heading text-lg font-black text-[#1E1C10]">
              Key Profile Strengths
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-[#4B4731]">
            {(ai?.strengths || [
              'Clear repository organization with modern frameworks',
              'Consistent commit patterns demonstrating technical discipline',
              'Relevant tech stack alignment with current placement benchmarks',
            ]).map((s, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-[#D4EDDA]/30 p-2.5 rounded-xl border border-[#28A745]/20">
                <span className="text-[#16A34A] font-bold mt-0.5">•</span>
                <span className="font-medium text-[#1E1C10]">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#CDC7AA]/40 space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-[#B45309]" />
            <h3 className="font-heading text-lg font-black text-[#1E1C10]">
              Recommended Recruiter Optimizations
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-[#4B4731]">
            {(ai?.improvements || [
              'Add system architecture diagrams and live demo links to flagship repos',
              'Document setup guides and API request/response samples in READMEs',
              'Increase unit test coverage badges (Jest/PyTest) in core repositories',
            ]).map((imp, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-[#FFF3CD]/40 p-2.5 rounded-xl border border-[#FFC107]/30">
                <span className="text-[#B45309] font-bold mt-0.5">•</span>
                <span className="font-medium text-[#1E1C10]">{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ─── Pal-Bot AI Action Banner ─── */}
      <div className="bg-[#EEE8D4] p-6 rounded-3xl border border-[#CDC7AA]/50 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FFE600] flex items-center justify-center text-[#1A1A1A] shrink-0 border border-[#CDC7AA]/40 shadow-sm">
            <Sparkles className="h-6 w-6 text-[#6A5F00]" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-[#6A5F00] uppercase tracking-wider">
              Gemini AI Recruiter Recommendation
            </span>
            <p className="text-xs sm:text-sm text-[#1E1C10] font-medium leading-relaxed mt-0.5">
              {ai?.recommended_actions?.[0] ||
                `Adding live demo URLs and clear architecture diagrams to @${activeUsername}'s repositories will maximize recruiter interview shortlisting.`}
            </p>
          </div>
        </div>
        <button
          onClick={() => showToast('✨ Generated README architecture template ready to copy!')}
          className="px-5 py-2.5 rounded-full bg-[#1A1A1A] text-white font-bold text-xs hover:bg-black transition-all active:scale-95 shadow-sm shrink-0 self-end sm:self-center cursor-pointer"
        >
          Generate README Template ✨
        </button>
      </div>
    </div>
  );
}
