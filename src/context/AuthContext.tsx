import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'student' | 'faculty';
export type LoginType = 'student' | 'faculty' | null;

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  track: string;
  college: string;
  initials: string;
  department: string;
}

const STUDENT_USER: AuthUser = {
  id: 'std-arjun-1',
  name: 'Arjun Patel',
  email: 'arjun.patel@mgm.edu',
  role: 'student',
  track: 'Tier-1 SDE Track',
  college: 'MGM College of Engineering',
  initials: 'AP',
  department: "B.Tech CSE '26",
};

const FACULTY_USER: AuthUser = {
  id: 'tpo-rajesh-1',
  name: 'Prof. Rajesh V.',
  email: 'tpo.officer@mgm.edu',
  role: 'faculty',
  track: 'Training & Placement Officer (TPO)',
  college: 'MGM College of Engineering',
  initials: 'RV',
  department: 'TPO Placement Cell',
};

interface AuthContextType {
  role: UserRole;
  user: AuthUser;
  loginedAsAdmin: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isFaculty: boolean;
  isStudent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('placement_pal_user_role');
    return saved === 'faculty' ? 'faculty' : 'student';
  });

  // Track whether the user explicitly logged in as faculty/admin.
  // Students cannot switch to TPO mode unless loginedAsAdmin is true.
  const [loginedAsAdmin, setLoginedAsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('placement_pal_logined_as_admin') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('placement_pal_user_role', role);
  }, [role]);

  const login = (newRole: UserRole) => {
    const isAdmin = newRole === 'faculty';
    setRoleState(newRole);
    setLoginedAsAdmin(isAdmin);
    localStorage.setItem('placement_pal_user_role', newRole);
    localStorage.setItem('placement_pal_logined_as_admin', String(isAdmin));
  };

  const logout = () => {
    setRoleState('student');
    setLoginedAsAdmin(false);
    localStorage.removeItem('placement_pal_user_role');
    localStorage.removeItem('placement_pal_logined_as_admin');
  };

  const switchRole = (newRole: UserRole) => {
    // Only allow role switching if the user logged in as admin
    if (newRole === 'faculty' && !loginedAsAdmin) return;
    setRoleState(newRole);
  };

  const user = role === 'faculty' ? FACULTY_USER : STUDENT_USER;

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
        loginedAsAdmin,
        login,
        logout,
        switchRole,
        isFaculty: role === 'faculty',
        isStudent: role === 'student',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
