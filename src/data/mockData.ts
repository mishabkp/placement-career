// ============================================================
// AI Career Coach — Mock Data
// Replace this file with real API/database calls in Phase 2+
// ============================================================

import type { User, SkillItem, RoadmapItem, Challenge, Job, CareerScore, Notification, Achievement, PlacementEvent, StudyPlan, StreakData } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Arjun Menon',
  email: 'arjun.menon@example.com',
  role: 'student',
  college: 'NIT Calicut',
  branch: 'Computer Science & Engineering',
  graduationYear: 2026,
};

export const mockCareerScore: CareerScore = {
  overall: 82,
  resume: 74,
  interview: 68,
  coding: 85,
  skills: 79,
  github: 71,
};

export const mockSkills: SkillItem[] = [
  { name: 'React', level: 78, category: 'Frontend', status: 'strong' },
  { name: 'TypeScript', level: 65, category: 'Frontend', status: 'moderate' },
  { name: 'Node.js', level: 58, category: 'Backend', status: 'moderate' },
  { name: 'Python', level: 72, category: 'General', status: 'strong' },
  { name: 'Docker', level: 35, category: 'DevOps', status: 'weak' },
  { name: 'MongoDB', level: 55, category: 'Database', status: 'moderate' },
  { name: 'SQL', level: 80, category: 'Database', status: 'strong' },
  { name: 'AWS', level: 28, category: 'Cloud', status: 'weak' },
];

export const mockRoadmap: RoadmapItem[] = [
  { id: '1', title: 'JavaScript Fundamentals', status: 'completed', description: 'ES6+, closures, async/await' },
  { id: '2', title: 'React & Ecosystem', status: 'in-progress', description: 'Hooks, Router, State Management' },
  { id: '3', title: 'Node.js & Express', status: 'upcoming', description: 'REST APIs, Middleware, Authentication' },
  { id: '4', title: 'MongoDB & Databases', status: 'upcoming', description: 'Schema design, aggregations' },
  { id: '5', title: 'Full Stack Project', status: 'upcoming', description: 'Build and deploy a complete app' },
];

export const mockDailyChallenge: Challenge = {
  id: 'c1',
  title: "Today's Challenge",
  description: 'Explain the difference between REST and GraphQL. When would you choose one over the other?',
  difficulty: 'medium',
  category: 'System Design',
};

export const mockJobs: Job[] = [
  {
    id: 'j1',
    title: 'Frontend Developer Intern',
    company: 'Zoho Corporation',
    location: 'Chennai / Remote',
    type: 'internship',
    matchScore: 91,
    tags: ['React', 'JavaScript', 'CSS'],
  },
  {
    id: 'j2',
    title: 'Full Stack Developer',
    company: 'Infosys',
    location: 'Bangalore',
    type: 'full-time',
    matchScore: 78,
    tags: ['Node.js', 'React', 'MongoDB'],
  },
  {
    id: 'j3',
    title: 'Backend Engineer',
    company: 'Freshworks',
    location: 'Chennai',
    type: 'full-time',
    matchScore: 72,
    tags: ['Python', 'Django', 'PostgreSQL'],
  },
  {
    id: 'j4',
    title: 'SDE Intern',
    company: 'TCS',
    location: 'Multiple Locations',
    type: 'internship',
    matchScore: 85,
    tags: ['Java', 'Spring Boot', 'SQL'],
  },
  {
    id: 'j5',
    title: 'React Developer',
    company: 'Flipkart',
    location: 'Bangalore / Remote',
    type: 'full-time',
    matchScore: 88,
    tags: ['React', 'TypeScript', 'Redux'],
  },
  {
    id: 'j6',
    title: 'Software Engineer Trainee',
    company: 'Wipro',
    location: 'Hyderabad',
    type: 'full-time',
    matchScore: 69,
    tags: ['Java', 'SQL', 'Agile'],
  },
  {
    id: 'j7',
    title: 'Data Engineer Intern',
    company: 'Swiggy',
    location: 'Bangalore',
    type: 'internship',
    matchScore: 63,
    tags: ['Python', 'Spark', 'AWS'],
  },
  {
    id: 'j8',
    title: 'Cloud & DevOps Intern',
    company: 'Razorpay',
    location: 'Bangalore / Remote',
    type: 'internship',
    matchScore: 55,
    tags: ['AWS', 'Docker', 'Kubernetes'],
  },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', message: 'Your resume score improved by 5 points!', type: 'success', timestamp: '2h ago' },
  { id: 'n2', message: 'New job matches found for your profile.', type: 'info', timestamp: '5h ago' },
  { id: 'n3', message: 'Complete your GitHub profile for better analysis.', type: 'warning', timestamp: '1d ago' },
];

export const mockAIRecommendation = {
  message:
    'Your resume is strong, but improving your GitHub README files could increase your profile quality by 15%. Also consider adding 2–3 projects that demonstrate TypeScript and Docker skills.',
  priority: 'medium' as const,
};

export const mockCodingProblems = [
  { id: 'p1', title: 'Two Sum', difficulty: 'easy', topic: 'Arrays', solved: true },
  { id: 'p2', title: 'Valid Parentheses', difficulty: 'easy', topic: 'Stack', solved: true },
  { id: 'p3', title: 'Merge Two Sorted Lists', difficulty: 'easy', topic: 'Linked List', solved: false },
  { id: 'p4', title: 'Maximum Subarray', difficulty: 'medium', topic: 'Dynamic Programming', solved: false },
  { id: 'p5', title: 'Binary Tree Level Order', difficulty: 'medium', topic: 'Trees', solved: false },
];

export const mockInterviewTopics = [
  { topic: 'Data Structures', questionsAttempted: 12, totalQuestions: 30, score: 74 },
  { topic: 'System Design', questionsAttempted: 4, totalQuestions: 20, score: 60 },
  { topic: 'Behavioural', questionsAttempted: 8, totalQuestions: 15, score: 85 },
  { topic: 'React / Frontend', questionsAttempted: 10, totalQuestions: 25, score: 78 },
];

// ─── GitHub Page Data ───────────────────────────────────────────
// 52 weeks × 7 days contribution data (0 = no commit, 1-4 = intensity)
export const mockGitHubContributions: number[][] = Array.from({ length: 52 }, (_, weekIdx) =>
  Array.from({ length: 7 }, (_, dayIdx) => {
    // Simulate realistic contribution patterns
    const isWeekend = dayIdx === 0 || dayIdx === 6;
    const recentBoost = weekIdx > 44 ? 0.8 : weekIdx > 36 ? 0.6 : 0.4;
    const rand = Math.random();
    if (rand < 0.18 + (isWeekend ? -0.1 : 0)) return 0;
    if (rand < 0.4 + recentBoost * 0.1) return 1;
    if (rand < 0.65 + recentBoost * 0.1) return 2;
    if (rand < 0.85 + recentBoost * 0.05) return 3;
    return 4;
  })
);

export const mockGitHubLanguages = [
  { language: 'TypeScript', percentage: 38, color: '#3178c6' },
  { language: 'JavaScript', percentage: 28, color: '#f7df1e' },
  { language: 'Python', percentage: 18, color: '#3572A5' },
  { language: 'CSS', percentage: 9, color: '#563d7c' },
  { language: 'Other', percentage: 7, color: '#8e8e8e' },
];

export const mockGitHubWeeklyCommits = [
  { week: 'Mar W1', commits: 8 },
  { week: 'Mar W2', commits: 14 },
  { week: 'Mar W3', commits: 5 },
  { week: 'Mar W4', commits: 19 },
  { week: 'Apr W1', commits: 11 },
  { week: 'Apr W2', commits: 23 },
  { week: 'Apr W3', commits: 16 },
  { week: 'Apr W4', commits: 9 },
  { week: 'May W1', commits: 27 },
  { week: 'May W2', commits: 18 },
  { week: 'May W3', commits: 32 },
  { week: 'May W4', commits: 21 },
  { week: 'Jun W1', commits: 15 },
  { week: 'Jun W2', commits: 29 },
  { week: 'Jun W3', commits: 24 },
  { week: 'Jun W4', commits: 38 },
  { week: 'Jul W1', commits: 31 },
  { week: 'Jul W2', commits: 42 },
  { week: 'Jul W3', commits: 28 },
  { week: 'Jul W4', commits: 36 },
  { week: 'Aug W1', commits: 19 },
  { week: 'Aug W2', commits: 45 },
  { week: 'Aug W3', commits: 52 },
  { week: 'Aug W4', commits: 33 },
];

export const mockGitHubRepos = [
  {
    id: 'r1',
    name: 'ai-career-coach-frontend',
    description: 'Full-stack career coaching platform built with React, TypeScript and Tailwind CSS.',
    stars: 14,
    forks: 3,
    language: 'TypeScript',
    quality: 'High Quality',
    qualityVariant: 'success' as const,
    topics: ['react', 'typescript', 'tailwind'],
    lastUpdated: '2 days ago',
  },
  {
    id: 'r2',
    name: 'e-commerce-backend-api',
    description: 'Node.js & Express REST API for e-commerce with MongoDB. Missing API docs.',
    stars: 4,
    forks: 1,
    language: 'JavaScript',
    quality: 'Needs README',
    qualityVariant: 'warning' as const,
    topics: ['nodejs', 'express', 'mongodb'],
    lastUpdated: '1 week ago',
  },
  {
    id: 'r3',
    name: 'dsa-solutions',
    description: 'LeetCode and HackerRank solutions categorized by topic and difficulty.',
    stars: 22,
    forks: 8,
    language: 'Python',
    quality: 'High Quality',
    qualityVariant: 'success' as const,
    topics: ['algorithms', 'python', 'leetcode'],
    lastUpdated: '3 days ago',
  },
  {
    id: 'r4',
    name: 'portfolio-website',
    description: 'Personal portfolio website. Needs deployment and mobile responsiveness fix.',
    stars: 7,
    forks: 2,
    language: 'CSS',
    quality: 'Needs Work',
    qualityVariant: 'warning' as const,
    topics: ['html', 'css', 'portfolio'],
    lastUpdated: '3 weeks ago',
  },
  {
    id: 'r5',
    name: 'ml-price-predictor',
    description: 'Housing price prediction using scikit-learn and Pandas. Includes EDA notebook.',
    stars: 9,
    forks: 3,
    language: 'Python',
    quality: 'Good',
    qualityVariant: 'cyprus' as const,
    topics: ['machine-learning', 'python', 'scikit-learn'],
    lastUpdated: '5 days ago',
  },
];

// ─── Skill Gap Radar Data ───────────────────────────────────────
export const mockSkillRadarData = [
  { skill: 'Frontend', you: 78, industry: 85 },
  { skill: 'Backend', you: 58, industry: 80 },
  { skill: 'Database', you: 68, industry: 75 },
  { skill: 'DevOps', you: 32, industry: 65 },
  { skill: 'DSA', you: 72, industry: 80 },
  { skill: 'System Design', you: 45, industry: 70 },
];

export const mockSkillRadarDataML = [
  { skill: 'Python', you: 72, industry: 90 },
  { skill: 'ML/DL', you: 40, industry: 85 },
  { skill: 'Statistics', you: 55, industry: 80 },
  { skill: 'Data Eng', you: 30, industry: 70 },
  { skill: 'Visualization', you: 50, industry: 65 },
  { skill: 'Cloud', you: 28, industry: 75 },
];

export const mockSkillRadarDataBackend = [
  { skill: 'APIs', you: 62, industry: 88 },
  { skill: 'Databases', you: 68, industry: 85 },
  { skill: 'Auth/Security', you: 40, industry: 80 },
  { skill: 'Microservices', you: 30, industry: 70 },
  { skill: 'Testing', you: 45, industry: 75 },
  { skill: 'DevOps', you: 32, industry: 70 },
];

// ─── Achievements / Badges ───────────────────────────────────────
export const mockAchievements: Achievement[] = [
  { id: 'a1', title: 'First Blood', description: 'Solved your first coding problem', icon: '⚔️', category: 'coding', unlocked: true, unlockedDate: 'Mar 12', xp: 50 },
  { id: 'a2', title: 'Resume Pro', description: 'Uploaded and scored your resume', icon: '📄', category: 'resume', unlocked: true, unlockedDate: 'Mar 18', xp: 75 },
  { id: 'a3', title: 'Streak Starter', description: 'Maintained a 7-day streak', icon: '🔥', category: 'streak', unlocked: true, unlockedDate: 'Apr 2', xp: 100 },
  { id: 'a4', title: 'Interview Ready', description: 'Completed 5 mock interviews', icon: '🎤', category: 'interview', unlocked: true, unlockedDate: 'Apr 15', xp: 150 },
  { id: 'a5', title: 'GitHub Star', description: 'Reached 20+ stars on a repository', icon: '⭐', category: 'github', unlocked: true, unlockedDate: 'May 3', xp: 120 },
  { id: 'a6', title: 'Problem Solver', description: 'Solved 10 LeetCode problems', icon: '🧠', category: 'coding', unlocked: true, unlockedDate: 'May 20', xp: 200 },
  { id: 'a7', title: 'Speed Demon', description: 'Solve a problem in under 5 minutes', icon: '⚡', category: 'coding', unlocked: false, xp: 250 },
  { id: 'a8', title: 'Consistency King', description: 'Maintain a 30-day streak', icon: '👑', category: 'streak', unlocked: false, xp: 500 },
  { id: 'a9', title: 'Full Stack Hero', description: 'Score 80+ in all skill categories', icon: '🦸', category: 'general', unlocked: false, xp: 400 },
  { id: 'a10', title: 'Top Ranker', description: 'Reach top 10% on campus leaderboard', icon: '🏆', category: 'general', unlocked: false, xp: 600 },
  { id: 'a11', title: 'ATS Crusher', description: 'Get a resume ATS score above 90', icon: '🎯', category: 'resume', unlocked: false, xp: 300 },
  { id: 'a12', title: 'Open Source Hero', description: 'Make 100+ GitHub contributions in a month', icon: '🌍', category: 'github', unlocked: false, xp: 350 },
];

// ─── Placement Calendar Events ───────────────────────────────────
export const mockPlacementEvents: PlacementEvent[] = [
  { id: 'e1', company: 'TCS', logo: '🔷', date: 'Sep 5, 2026', daysLeft: 12, type: 'on-campus', role: 'Software Engineer Trainee', package: '7 LPA', location: 'NIT Calicut', registered: true },
  { id: 'e2', company: 'Infosys', logo: '🟢', date: 'Sep 12, 2026', daysLeft: 19, type: 'on-campus', role: 'Systems Engineer', package: '6.5 LPA', location: 'NIT Calicut', registered: false },
  { id: 'e3', company: 'Zoho', logo: '🟠', date: 'Sep 20, 2026', daysLeft: 27, type: 'on-campus', role: 'Software Developer', package: '10 LPA', location: 'NIT Calicut', registered: false },
  { id: 'e4', company: 'Wipro', logo: '🔵', date: 'Oct 2, 2026', daysLeft: 39, type: 'on-campus', role: 'Project Engineer', package: '6 LPA', location: 'NIT Calicut', registered: false },
  { id: 'e5', company: 'HackWithIndia', logo: '💡', date: 'Sep 8, 2026', daysLeft: 15, type: 'hackathon', role: 'Participant', location: 'Online', registered: true },
  { id: 'e6', company: 'Freshworks', logo: '🟣', date: 'Oct 15, 2026', daysLeft: 52, type: 'off-campus', role: 'Junior Developer', package: '12 LPA', location: 'Chennai / Remote', registered: false },
];

// ─── Study Planner ───────────────────────────────────────────────
export const mockStudyPlan: StudyPlan = {
  companyName: 'TCS',
  driveDate: 'Sep 5, 2026',
  daysLeft: 12,
  completedTasks: 5,
  totalTasks: 14,
  tasks: [
    { id: 't1', day: 'Day 1', task: 'Revise Arrays & Strings', topic: 'DSA', completed: true, priority: 'high' },
    { id: 't2', day: 'Day 2', task: 'Practice Linked Lists', topic: 'DSA', completed: true, priority: 'high' },
    { id: 't3', day: 'Day 3', task: 'Stacks, Queues & Recursion', topic: 'DSA', completed: true, priority: 'high' },
    { id: 't4', day: 'Day 4', task: 'Trees & Binary Search', topic: 'DSA', completed: true, priority: 'medium' },
    { id: 't5', day: 'Day 5', task: 'Update Resume & ATS Check', topic: 'Resume', completed: true, priority: 'high' },
    { id: 't6', day: 'Day 6', task: 'Dynamic Programming basics', topic: 'DSA', completed: false, priority: 'high' },
    { id: 't7', day: 'Day 7', task: 'Mock Interview Round 1', topic: 'Interview', completed: false, priority: 'high' },
    { id: 't8', day: 'Day 8', task: 'Graphs & BFS/DFS', topic: 'DSA', completed: false, priority: 'medium' },
    { id: 't9', day: 'Day 9', task: 'SQL & Database queries', topic: 'Technical', completed: false, priority: 'medium' },
    { id: 't10', day: 'Day 10', task: 'OOPs concepts revision', topic: 'Technical', completed: false, priority: 'high' },
    { id: 't11', day: 'Day 11', task: 'Mock Interview Round 2', topic: 'Interview', completed: false, priority: 'high' },
    { id: 't12', day: 'Day 12', task: 'HR questions practice', topic: 'Interview', completed: false, priority: 'medium' },
    { id: 't13', day: 'Day 13', task: 'Final resume review', topic: 'Resume', completed: false, priority: 'medium' },
    { id: 't14', day: 'Day 14', task: 'Rest & confidence building', topic: 'General', completed: false, priority: 'low' },
  ],
};

// ─── Streak Data ─────────────────────────────────────────────────
export const mockStreakData: StreakData = {
  currentStreak: 12,
  longestStreak: 21,
  lastActive: 'Today',
  totalDaysActive: 87,
  weekActivity: [true, true, true, false, true, true, true], // Sun-Sat
  monthActivity: [
    // last 28 days (0=none, 1=low, 2=medium, 3=high, 4=max)
    0, 1, 2, 0, 3, 2, 1,
    0, 0, 2, 3, 4, 3, 2,
    1, 2, 3, 2, 0, 1, 2,
    3, 4, 3, 2, 4, 3, 4,
  ],
};

