import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService, setToken, clearToken, getToken, type AuthUser as ApiAuthUser } from '../services/api';

export type UserRole = 'student' | 'faculty';

// Re-export shape that the rest of the app uses
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  track: string;
  college: string;
  initials: string;
  department: string;
  branch: string;
  github_username?: string;
  linkedin_url?: string;
  skills?: string[];
  target_role?: string;
}

interface AuthContextType {
  role: UserRole;
  user: AuthUser;
  studentBranch: string;
  setStudentBranch: (branch: string) => void;
  loginedAsAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole, college: string, branch: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isFaculty: boolean;
  isStudent: boolean;
  isLoading: boolean;
  authError: string | null;
  clearAuthError: () => void;
}

const BRANCH_TRACKS: Record<string, string> = {
  CSE: 'Tier-1 SDE Track',
  ECE: 'Embedded Systems & VLSI Track',
  EEE: 'EV Systems & Power Tech Track',
  MECH: 'CAD/CAM & Mechatronics Track',
  CIVIL: 'Structural BIM & Planning Track',
};

function toAuthUser(api: ApiAuthUser): AuthUser {
  const initials = api.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return {
    id: String(api.id),
    name: api.name,
    email: api.email,
    role: api.role,
    college: api.college || '',
    branch: api.branch || 'CSE',
    department: api.department || `B.Tech ${api.branch} '26`,
    track: BRANCH_TRACKS[api.branch] || 'Engineering Track',
    initials,
    github_username: api.github_username,
    linkedin_url: api.linkedin_url,
    skills: api.skills,
    target_role: api.target_role,
  };
}

// Fallback guest user shown before auth loads
const GUEST_USER: AuthUser = {
  id: '',
  name: 'Guest',
  email: '',
  role: 'student',
  track: 'Tier-1 SDE Track',
  college: '',
  initials: 'G',
  department: "B.Tech CSE '26",
  branch: 'CSE',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(GUEST_USER);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loginedAsAdmin, setLoginedAsAdmin] = useState(false);
  const [studentBranch, setStudentBranchState] = useState(
    () => localStorage.getItem('pp_branch') || 'CSE'
  );

  // ── On mount: restore session from token ─────────────────────────────────
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    apiService.getMe()
      .then((apiUser) => {
        const u = toAuthUser(apiUser);
        setUser(u);
        setLoginedAsAdmin(u.role === 'faculty');
      })
      .catch(() => {
        clearToken(); // token expired or invalid
      })
      .finally(() => setIsLoading(false));
  }, []);

  const setStudentBranch = (branch: string) => {
    setStudentBranchState(branch);
    localStorage.setItem('pp_branch', branch);
  };

  // ── Login ────────────────────────────────────────────────────────────────
  const login = async (email: string, password: string) => {
    setAuthError(null);
    setIsLoading(true);
    try {
      const data = await apiService.login(email, password);
      setToken(data.access_token);
      const u = toAuthUser(data.user);
      setUser(u);
      setLoginedAsAdmin(u.role === 'faculty');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Login failed';
      setAuthError(msg);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  // ── Register ─────────────────────────────────────────────────────────────
  const register = async (
    name: string, email: string, password: string,
    role: UserRole, college: string, branch: string
  ) => {
    setAuthError(null);
    setIsLoading(true);
    try {
      const data = await apiService.register(name, email, password, role, college, branch);
      setToken(data.access_token);
      const u = toAuthUser(data.user);
      setUser(u);
      setLoginedAsAdmin(u.role === 'faculty');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Registration failed';
      setAuthError(msg);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  // ── Logout ───────────────────────────────────────────────────────────────
  const logout = () => {
    clearToken();
    setUser(GUEST_USER);
    setLoginedAsAdmin(false);
    localStorage.removeItem('pp_branch');
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'faculty' && !loginedAsAdmin) return;
    setUser((prev) => ({ ...prev, role: newRole }));
  };

  const clearAuthError = () => setAuthError(null);

  const role: UserRole = user.role;

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
        studentBranch,
        setStudentBranch,
        loginedAsAdmin,
        login,
        register,
        logout,
        switchRole,
        isFaculty: role === 'faculty',
        isStudent: role === 'student',
        isLoading,
        authError,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
