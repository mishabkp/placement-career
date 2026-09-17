// ============================================================
// AI Career Coach — Shared TypeScript Types
// ============================================================

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'faculty';
  college?: string;
  branch?: string;
  graduationYear?: number;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  group?: string;
}

export interface StatCardData {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0–100
  category: string;
  status: 'strong' | 'moderate' | 'weak';
}

export interface RoadmapItem {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  description?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'remote';
  matchScore: number;
  tags: string[];
}

export interface CareerScore {
  overall: number;
  resume: number;
  interview: number;
  coding: number;
  skills: number;
  github: number;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  timestamp: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji
  category: 'coding' | 'resume' | 'streak' | 'interview' | 'github' | 'general';
  unlocked: boolean;
  unlockedDate?: string;
  xp: number;
}

export interface PlacementEvent {
  id: string;
  company: string;
  logo: string; // emoji or abbr
  date: string;
  daysLeft: number;
  type: 'on-campus' | 'off-campus' | 'hackathon';
  role: string;
  package?: string;
  location: string;
  registered: boolean;
}

export interface StudyTask {
  id: string;
  day: string;
  task: string;
  topic: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface StudyPlan {
  companyName: string;
  driveDate: string;
  daysLeft: number;
  completedTasks: number;
  totalTasks: number;
  tasks: StudyTask[];
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActive: string;
  totalDaysActive: number;
  weekActivity: boolean[]; // 7 days, Sun-Sat
  monthActivity: number[]; // 0-4 intensity per day, last 28 days
}
