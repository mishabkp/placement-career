const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// ── Token helpers ─────────────────────────────────────────────────────────────
export const getToken = (): string | null => localStorage.getItem('pp_token');
export const setToken = (t: string)       => localStorage.setItem('pp_token', t);
export const clearToken = ()              => localStorage.removeItem('pp_token');

const authHeaders = () => ({
  'Content-Type': 'application/json',
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
});

// ── Auth Interfaces ───────────────────────────────────────────────────────────
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'faculty';
  college: string;
  branch: string;
  department: string;
  target_role: string;
  github_username: string;
  linkedin_url: string;
  skills: string[];
}

export interface AuthResponse {
  access_token: string;
  user: AuthUser;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface ChatResponse {
  reply: string;
  suggestions: string[];
}

export interface ResumeParseResult {
  filename: string;
  pages: number;
  word_count: number;
  ats_score: number;
  detected_sections: string[];
  detected_skills: string[];
  preview_text: string;
  full_text: string;
  status: string;
}

export interface ResumeAnalysisResult {
  overall_score: number;
  section_scores: {
    experience: number;
    education: number;
    skills: number;
    projects: number;
    formatting: number;
  };
  strengths: string[];
  improvements: string[];
  ats_keywords_missing: string[];
  summary: string;
}

export interface SkillGapRoadmapItem {
  week: string;
  focus: string;
  resources: string[];
}

export interface SkillGapAnalysisResult {
  match_percentage: number;
  missing_skills: string[];
  priority_skills: string[];
  existing_relevant_skills: string[];
  estimated_weeks: number;
  roadmap: SkillGapRoadmapItem[];
  placement_tip: string;
}

export interface GithubAnalysisResult {
  username: string;
  github_data: {
    name: string | null;
    bio: string | null;
    public_repos: number;
    followers: number;
    following: number;
    avatar_url: string;
    html_url: string;
    top_languages: string[];
    total_stars: number;
  };
  ai_analysis: {
    profile_score: number;
    strengths: string[];
    improvements: string[];
    primary_languages: string[];
    placement_readiness: string;
    recommended_actions: string[];
  };
}

export const apiService = {
  /** Health check */
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/health/`, { method: 'GET' });
      return res.ok;
    } catch {
      return false;
    }
  },

  // ── Auth ────────────────────────────────────────────────────────────────────

  /** Register new user */
  async register(name: string, email: string, password: string, role: 'student' | 'faculty' = 'student', college = '', branch = 'CSE'): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role, college, branch }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Registration failed');
    }
    return res.json();
  },

  /** Login user */
  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Invalid email or password');
    }
    return res.json();
  },

  /** Get current logged-in user */
  async getMe(): Promise<AuthUser> {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
  },

  /** Update profile */
  async updateProfile(data: Partial<AuthUser>): Promise<AuthUser> {
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Profile update failed');
    return res.json();
  },

  // ── AI Chat ─────────────────────────────────────────────────────────────────

  async chat(message: string, history: ChatMessage[] = [], context: 'interview' | 'resume' | 'career' = 'interview'): Promise<ChatResponse> {
    const res = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ message, history, context }),
    });
    if (!res.ok) throw new Error(`AI Chat failed: ${res.statusText}`);
    return res.json();
  },

  // ── Resume ──────────────────────────────────────────────────────────────────

  async parseResume(file: File): Promise<ResumeParseResult> {
    const formData = new FormData();
    formData.append('file', file);
    const token = getToken();
    const res = await fetch(`${API_BASE_URL}/resume/parse`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    if (!res.ok) throw new Error(`Resume parsing failed: ${res.statusText}`);
    return res.json();
  },

  async analyzeResume(resumeText: string, targetRole = 'Software Engineer'): Promise<ResumeAnalysisResult> {
    const res = await fetch(`${API_BASE_URL}/resume/analyze`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ resume_text: resumeText, target_role: targetRole }),
    });
    if (!res.ok) throw new Error(`Resume analysis failed: ${res.statusText}`);
    return res.json();
  },

  // ── Skill Gap ───────────────────────────────────────────────────────────────

  async analyzeSkillGap(currentSkills: string[], targetRole: string, experienceLevel = 'fresher'): Promise<SkillGapAnalysisResult> {
    const res = await fetch(`${API_BASE_URL}/skill-gap/analyze`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ current_skills: currentSkills, target_role: targetRole, experience_level: experienceLevel }),
    });
    if (!res.ok) throw new Error(`Skill gap analysis failed: ${res.statusText}`);
    return res.json();
  },

  // ── GitHub ──────────────────────────────────────────────────────────────────

  async analyzeGithub(username: string): Promise<GithubAnalysisResult> {
    const res = await fetch(`${API_BASE_URL}/github/analyze`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ username }),
    });
    if (!res.ok) throw new Error(`GitHub analysis failed: ${res.statusText}`);
    return res.json();
  },
};
