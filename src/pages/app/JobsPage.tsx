import React, { useState, useMemo } from 'react';
import {
  Radar,
  Tune,
  Bolt,
  Troubleshoot,
  Verified,
  Payments,
  FilterList,
  NorthEast,
  Bookmark,
  BookmarkCheck,
  SmartToy,
  AutoAwesome,
  CheckCircle2,
  MapPin,
  Calendar,
  Sparkles,
  Close,
} from '../../components/icons/StitchIcons';

interface JobItem {
  id: string;
  title: string;
  company: string;
  shortCode: string;
  brandBg: string;
  brandText: string;
  type: 'fulltime' | 'intern';
  typeLabel: string;
  location: string;
  salary: string;
  postedTime: string;
  matchScore: number;
  skills: string[];
  insight: string;
  insightIcon: 'psychology' | 'verified' | 'star' | 'bolt';
}

const JOBS_DATA: JobItem[] = [
  {
    id: 'job-1',
    title: 'SDE-1 (Full Stack)',
    company: 'Flipkart',
    shortCode: 'FK',
    brandBg: 'bg-[#E66B00]',
    brandText: 'text-white',
    type: 'fulltime',
    typeLabel: 'Full-Time',
    location: 'Bangalore / Remote',
    salary: '₹10–16 LPA',
    postedTime: '1 day ago',
    matchScore: 96,
    skills: ['React', 'TypeScript', 'Redux', 'Node.js'],
    insight: 'Matched from your 88% React proficiency from GitHub + ATS keywords',
    insightIcon: 'psychology',
  },
  {
    id: 'job-2',
    title: 'SDE Intern (Backend Systems)',
    company: 'Zepto',
    shortCode: 'ZP',
    brandBg: 'bg-[#FF6B6B]',
    brandText: 'text-white',
    type: 'intern',
    typeLabel: 'Internship',
    location: 'Mumbai / Remote',
    salary: '₹25,000/mo stipend',
    postedTime: '3 days ago',
    matchScore: 94,
    skills: ['Python', 'FastAPI', 'Redis', 'PostgreSQL'],
    insight: 'Matches Python DSA speed benchmark (Top 6% in College batch)',
    insightIcon: 'bolt',
  },
  {
    id: 'job-3',
    title: 'Frontend Engineering Intern',
    company: 'Swiggy',
    shortCode: 'SW',
    brandBg: 'bg-[#FC8019]',
    brandText: 'text-white',
    type: 'intern',
    typeLabel: 'Internship',
    location: 'Bangalore',
    salary: '₹18,000/mo stipend',
    postedTime: '4 days ago',
    matchScore: 91,
    skills: ['React', 'JavaScript', 'Tailwind CSS'],
    insight: 'Fast-track screening enabled by your UI portfolio component library',
    insightIcon: 'star',
  },
  {
    id: 'job-4',
    title: 'Software Development Engineer - FinTech',
    company: 'Razorpay',
    shortCode: 'RZ',
    brandBg: 'bg-[#0C2340]',
    brandText: 'text-[#26FEDC]',
    type: 'fulltime',
    typeLabel: 'Full-Time',
    location: 'Bengaluru (Hybrid)',
    salary: '₹14–18 LPA',
    postedTime: '2 days ago',
    matchScore: 89,
    skills: ['Node.js', 'Go', 'AWS', 'Microservices'],
    insight: 'Strong alignment with your API design project & Redis caching metrics',
    insightIcon: 'verified',
  },
  {
    id: 'job-5',
    title: 'Frontend Developer Intern',
    company: 'Zoho Corporation',
    shortCode: 'ZO',
    brandBg: 'bg-[#D32F2F]',
    brandText: 'text-white',
    type: 'intern',
    typeLabel: 'Internship',
    location: 'Chennai / Remote',
    salary: '₹15,000/mo stipend',
    postedTime: '2 days ago',
    matchScore: 88,
    skills: ['JavaScript', 'React', 'HTML/CSS', 'Git'],
    insight: 'Perfect match for campus drive eligibility criteria',
    insightIcon: 'verified',
  },
  {
    id: 'job-6',
    title: 'Full Stack Engineer',
    company: 'Freshworks',
    shortCode: 'FW',
    brandBg: 'bg-[#FF9800]',
    brandText: 'text-white',
    type: 'fulltime',
    typeLabel: 'Full-Time',
    location: 'Chennai',
    salary: '₹8–12 LPA',
    postedTime: '1 week ago',
    matchScore: 85,
    skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    insight: 'ATS scanned resume matches 9 out of 10 prerequisite tags',
    insightIcon: 'psychology',
  },
  {
    id: 'job-7',
    title: 'Java Backend Developer',
    company: 'Wipro Digital',
    shortCode: 'WP',
    brandBg: 'bg-[#9B5DE5]',
    brandText: 'text-white',
    type: 'fulltime',
    typeLabel: 'Full-Time',
    location: 'Hyderabad',
    salary: '₹4.5–6 LPA',
    postedTime: '1 week ago',
    matchScore: 82,
    skills: ['Java', 'Spring Boot', 'SQL', 'Agile'],
    insight: 'Core OOP & Database benchmarks verified',
    insightIcon: 'verified',
  },
  {
    id: 'job-8',
    title: 'Associate Software Engineer',
    company: 'Infosys',
    shortCode: 'IN',
    brandBg: 'bg-[#1976D2]',
    brandText: 'text-white',
    type: 'fulltime',
    typeLabel: 'Full-Time',
    location: 'Mysore',
    salary: '₹6–10 LPA',
    postedTime: '5 days ago',
    matchScore: 78,
    skills: ['Python', 'SQL', 'Cloud Basics'],
    insight: 'Aptitude & verbal telemetry passed with distinction',
    insightIcon: 'verified',
  },
];

type FilterType = 'all' | 'high' | 'fulltime' | 'intern' | 'remote';

export const JobsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(['job-1']));
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobItem | null>(null);
  const [syncNotice, setSyncNotice] = useState(false);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleApply = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAppliedIds((prev) => new Set([...prev, id]));
  };

  const handleAutoApplyAll = () => {
    const topThree = JOBS_DATA.slice(0, 3).map((j) => j.id);
    setAppliedIds((prev) => new Set([...prev, ...topThree]));
  };

  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      // Filter tab
      if (activeFilter === 'high' && job.matchScore < 90) return false;
      if (activeFilter === 'fulltime' && job.type !== 'fulltime') return false;
      if (activeFilter === 'intern' && job.type !== 'intern') return false;
      if (activeFilter === 'remote' && !job.location.toLowerCase().includes('remote')) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const textMatch =
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q) ||
          job.skills.some((s) => s.toLowerCase().includes(q));
        if (!textMatch) return false;
      }

      return true;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Hero / Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FFE600] text-[#1E1C10] flex items-center justify-center shadow-[0_8px_20px_rgba(255,230,0,0.35)] shrink-0 transform -rotate-1 hover:rotate-2 transition-transform duration-300">
            <Radar className="w-9 h-9" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-extrabold text-[#1E1C10] tracking-tight">AI Job Matcher</h1>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E8E2CF] text-[#1E1C10] text-xs font-bold shadow-sm">
                <span>Tier-1 Auto-Match</span>
                <span>🎯</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#26FEDC] text-[#007261] text-xs font-bold shadow-sm">
                <span>94% Profile Synergy</span>
                <span>✨</span>
              </span>
            </div>
            <p className="text-sm text-[#4B4731] max-w-2xl font-medium">
              Curated tech opportunities tailored to your ATS resume score, verified GitHub repositories, and coding benchmark telemetry.
            </p>
          </div>
        </div>

        {/* Top Action CTA Cluster */}
        <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
          <button
            onClick={() => setActiveFilter('high')}
            className="px-5 py-2.5 rounded-full bg-[#EEE8D4] text-[#1E1C10] text-sm font-bold hover:bg-[#E8E2CF] transition-all shadow-sm flex items-center gap-2 active:scale-95"
          >
            <Tune className="w-4 h-4" />
            <span>Match Preferences</span>
          </button>
          <button
            onClick={handleAutoApplyAll}
            className="px-5 py-2.5 rounded-full bg-[#FFE600] text-[#1E1C10] text-sm font-bold hover:brightness-105 transition-all shadow-[0_6px_16px_rgba(255,230,0,0.4)] flex items-center gap-2 active:scale-95"
          >
            <Bolt className="w-4 h-4 fill-current" />
            <span>Quick Auto-Apply (Top 3)</span>
          </button>
        </div>
      </div>

      {/* Bento Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#FFFFFF] rounded-2xl p-4 border border-[#E8E2CF] shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#00F5D4]/20 text-[#006B5B] flex items-center justify-center shrink-0">
            <Troubleshoot className="w-6 h-6" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-[#7C775F]">Daily Scanned Roles</span>
            <span className="text-2xl font-bold text-[#1E1C10]">1,420+</span>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl p-4 border border-[#E8E2CF] shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#FFE600]/30 text-[#6A5F00] flex items-center justify-center shrink-0">
            <Verified className="w-6 h-6 text-[#6A5F00]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-[#7C775F]">Best Fit Match</span>
            <span className="text-sm font-bold text-[#1E1C10] truncate">Flipkart • SDE-1 (96%)</span>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl p-4 border border-[#E8E2CF] shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#9B5DE5]/15 text-[#9B5DE5] flex items-center justify-center shrink-0">
            <Payments className="w-6 h-6" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-[#7C775F]">Avg Package Synergy</span>
            <span className="text-2xl font-bold text-[#1E1C10]">₹12.4 LPA</span>
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-[#FFFFFF] rounded-3xl p-3 border border-[#E8E2CF] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
              activeFilter === 'all'
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-[#F4EEDA] text-[#4B4731] hover:text-[#1E1C10]'
            }`}
          >
            All Matches ({JOBS_DATA.length})
          </button>
          <button
            onClick={() => setActiveFilter('high')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
              activeFilter === 'high'
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-[#F4EEDA] text-[#4B4731] hover:text-[#1E1C10]'
            }`}
          >
            90%+ Synergy ({JOBS_DATA.filter((j) => j.matchScore >= 90).length})
          </button>
          <button
            onClick={() => setActiveFilter('fulltime')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
              activeFilter === 'fulltime'
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-[#F4EEDA] text-[#4B4731] hover:text-[#1E1C10]'
            }`}
          >
            Full-Time ({JOBS_DATA.filter((j) => j.type === 'fulltime').length})
          </button>
          <button
            onClick={() => setActiveFilter('intern')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
              activeFilter === 'intern'
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-[#F4EEDA] text-[#4B4731] hover:text-[#1E1C10]'
            }`}
          >
            Internships ({JOBS_DATA.filter((j) => j.type === 'intern').length})
          </button>
          <button
            onClick={() => setActiveFilter('remote')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
              activeFilter === 'remote'
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-[#F4EEDA] text-[#4B4731] hover:text-[#1E1C10]'
            }`}
          >
            Remote / Hybrid ({JOBS_DATA.filter((j) => j.location.toLowerCase().includes('remote')).length})
          </button>
        </div>

        {/* Search Input Inside Toolbar */}
        <div className="flex items-center bg-[#FAF3DF] rounded-full px-4 py-2 w-full lg:w-96 border border-[#E8E2CF]">
          <FilterList className="w-4 h-4 text-[#7C775F] mr-2 shrink-0" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs w-full text-[#1E1C10] placeholder:text-[#7C775F]"
            placeholder="Search by role, stack (React, Python)..."
            type="text"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-[#7C775F] hover:text-[#1E1C10]">
              <Close className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Job Cards Feed */}
      <div className="flex flex-col gap-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E2CF]">
            <Radar className="w-12 h-12 text-[#7C775F] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#1E1C10]">No opportunities matched your criteria</h3>
            <p className="text-sm text-[#4B4731] mt-1">Try resetting the filter pills or broadening your search terms.</p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#FFE600] rounded-full text-xs font-bold text-[#1E1C10]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const isBookmarked = bookmarkedIds.has(job.id);
            const isApplied = appliedIds.has(job.id);

            return (
              <article
                key={job.id}
                onClick={() => setSelectedJobForModal(job)}
                className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#E8E2CF] shadow-sm hover:shadow-md hover:border-[#CDC7AA] transition-all duration-200 flex flex-col gap-3 relative group cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Company Identity & Meta */}
                  <div className="flex items-start gap-4 min-w-0">
                    <div
                      className={`w-14 h-14 rounded-2xl ${job.brandBg} ${job.brandText} flex items-center justify-center font-extrabold text-lg shrink-0 shadow-md`}
                    >
                      {job.shortCode}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-lg font-bold text-[#1E1C10] group-hover:text-[#6A5F00] transition-colors">
                          {job.title}
                        </h2>
                        <span className="text-sm text-[#4B4731] font-medium">· {job.company}</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            job.type === 'intern'
                              ? 'bg-[#FFE600] text-[#1E1C10]'
                              : 'bg-[#EEE8D4] text-[#4B4731]'
                          }`}
                        >
                          {job.typeLabel}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#4B4731] mt-1.5 font-medium">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-500" />
                          {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Payments className="w-3.5 h-3.5 text-[#006B5B]" />
                          {job.salary}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#7C775F]" />
                          {job.postedTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Radial Gauge & Actions */}
                  <div className="flex items-center gap-4 justify-between md:justify-end shrink-0">
                    {/* Circular Match Gauge */}
                    <div className="flex items-center gap-2">
                      <AutoAwesome className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-[#EEE8D4] stroke-current"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeWidth="3.5"
                          />
                          <path
                            className={`${
                              job.matchScore >= 90 ? 'text-[#FFE600]' : 'text-amber-500'
                            } stroke-current`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeDasharray={`${job.matchScore}, 100`}
                            strokeLinecap="round"
                            strokeWidth="3.5"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-xs font-bold text-[#1E1C10] leading-none">
                            {job.matchScore}%
                          </span>
                          <span className="text-[9px] text-[#7C775F] leading-none font-bold">Match</span>
                        </div>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => toggleBookmark(job.id, e)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 border ${
                          isBookmarked
                            ? 'bg-[#FFE600]/30 border-[#FFE600] text-amber-600'
                            : 'bg-[#F4EEDA] border-[#E8E2CF] text-[#4B4731] hover:bg-[#EEE8D4]'
                        }`}
                        title="Bookmark job"
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-5 h-5 fill-current" />
                        ) : (
                          <Bookmark className="w-5 h-5" />
                        )}
                      </button>

                      <button
                        onClick={(e) => handleApply(job.id, e)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1 active:scale-95 ${
                          isApplied
                            ? 'bg-[#00F5D4] text-[#004F50]'
                            : 'bg-[#FFE600] text-[#1E1C10] hover:brightness-105 shadow-[0_4px_12px_rgba(255,230,0,0.35)]'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Applied!</span>
                          </>
                        ) : (
                          <>
                            <span>Apply Now</span>
                            <NorthEast className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Skills Chips & Synergy Insights Pill */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#F4EEDA]">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {job.skills.map((skill, i) => (
                      <span
                        key={i}
                        className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                          i < 3
                            ? 'bg-[#1A1A1A] text-white'
                            : 'bg-[#EEE8D4] text-[#1E1C10]'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="text-[#4B4731] text-xs flex items-center gap-1.5 bg-[#FAF3DF] px-3 py-1 rounded-full border border-[#E8E2CF] font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-[#006B5B] shrink-0" />
                    <span>{job.insight}</span>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Interactive Floating Pal-Bot Match Advisor */}
      <aside className="sticky bottom-6 z-30 bg-[#FFFFFF]/95 backdrop-blur-md rounded-3xl p-4 border border-[#E8E2CF] shadow-[0_12px_32px_rgba(30,28,16,0.12)] flex flex-col md:flex-row items-center justify-between gap-4 transform hover:-translate-y-0.5 transition-all duration-300">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-[#00F5D4] text-[#1E1C10] flex items-center justify-center shrink-0 shadow-md transform rotate-3">
            <SmartToy className="w-7 h-7" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1 text-xs text-[#006B5B] font-bold">
              <span>Pal-Bot Career Insight</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <p className="text-xs text-[#1E1C10] truncate md:text-wrap font-medium">
              Tip: Updating your LeetCode binary tree rank can unlock{' '}
              <strong className="text-[#1E1C10] font-bold">4 more Tier-1 SDE roles</strong> in Bangalore!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <button
            onClick={() => setActiveFilter('high')}
            className="px-4 py-2 rounded-full bg-[#EEE8D4] text-[#1E1C10] text-xs font-bold hover:bg-[#E8E2CF] transition-colors shadow-sm"
          >
            Salary Benchmark
          </button>
          <button
            onClick={() => {
              setSyncNotice(true);
              setTimeout(() => setSyncNotice(false), 3000);
            }}
            className="px-4 py-2 rounded-full bg-[#FFE600] text-[#1E1C10] text-xs hover:brightness-105 transition-colors shadow-sm flex items-center gap-1.5 font-bold"
          >
            <Bolt className="w-4 h-4 fill-current" />
            <span>{syncNotice ? 'Synced!' : 'Sync LeetCode'}</span>
          </button>
        </div>
      </aside>

      {/* Job Details Modal */}
      {selectedJobForModal && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedJobForModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 border-2 border-[#CDC7AA] max-w-xl w-full shadow-2xl space-y-4 animate-scaleUp"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-14 h-14 rounded-2xl ${selectedJobForModal.brandBg} ${selectedJobForModal.brandText} flex items-center justify-center font-extrabold text-xl shadow`}
                >
                  {selectedJobForModal.shortCode}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#1E1C10]">{selectedJobForModal.title}</h3>
                  <p className="text-sm font-semibold text-[#4B4731]">
                    {selectedJobForModal.company} • {selectedJobForModal.location}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedJobForModal(null)}
                className="w-8 h-8 rounded-full bg-[#FAF3DF] hover:bg-[#EEE8D4] flex items-center justify-center text-[#4B4731]"
              >
                <Close className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#FAF3DF] p-3.5 rounded-2xl border border-[#E8E2CF] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#7C775F] font-bold block">Synergy Match</span>
                <span className="text-xl font-extrabold text-[#6A5F00]">
                  {selectedJobForModal.matchScore}% Match
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#7C775F] font-bold block">Package</span>
                <span className="text-lg font-extrabold text-[#1E1C10]">{selectedJobForModal.salary}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#7C775F] uppercase tracking-wider mb-2">
                Required Technical Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedJobForModal.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-[#1A1A1A] text-white text-xs font-bold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#7C775F] uppercase tracking-wider mb-1">
                AI Pal Recommendation Insight
              </h4>
              <p className="text-xs text-[#4B4731] bg-[#FFF9E9] p-3 rounded-xl border border-[#E8E2CF]">
                {selectedJobForModal.insight}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedJobForModal(null)}
                className="px-4 py-2 rounded-full bg-[#FAF3DF] text-[#4B4731] text-xs font-bold hover:bg-[#EEE8D4]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setAppliedIds((prev) => new Set([...prev, selectedJobForModal.id]));
                  setSelectedJobForModal(null);
                }}
                className="px-5 py-2.5 rounded-full bg-[#FFE600] text-[#1E1C10] text-xs font-bold hover:brightness-105 shadow-[0_4px_12px_rgba(255,230,0,0.35)]"
              >
                {appliedIds.has(selectedJobForModal.id) ? 'Already Applied' : 'Confirm Application'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
