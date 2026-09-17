import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'student' | 'faculty';

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

  useEffect(() => {
    localStorage.setItem('placement_pal_user_role', role);
  }, [role]);

  const login = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem('placement_pal_user_role', newRole);
  };

  const logout = () => {
    setRoleState('student');
    localStorage.removeItem('placement_pal_user_role');
  };

  const switchRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const user = role === 'faculty' ? FACULTY_USER : STUDENT_USER;

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
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
