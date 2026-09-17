import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { useAuth } from '../context/AuthContext';

// Public pages
import LandingPage from '../pages/public/LandingPage';
import AboutPage from '../pages/public/AboutPage';
import FeaturesPage from '../pages/public/FeaturesPage';
import ContactPage from '../pages/public/ContactPage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';
import AssessmentPortalPage from '../pages/public/AssessmentPortalPage';

// Authenticated pages
import DashboardPage from '../pages/app/DashboardPage';
import ProfilePage from '../pages/app/ProfilePage';
import ResumePage from '../pages/app/ResumePage';
import CareerRoadmapPage from '../pages/app/CareerRoadmapPage';
import SkillGapPage from '../pages/app/SkillGapPage';
import InterviewPage from '../pages/app/InterviewPage';
import CodingPage from '../pages/app/CodingPage';
import LearningPage from '../pages/app/LearningPage';
import CompanyPrepPage from '../pages/app/CompanyPrepPage';
import FacultyPortalPage from '../pages/app/FacultyPortalPage';
import GithubPage from '../pages/app/GithubPage';
import LinkedinPage from '../pages/app/LinkedinPage';
import JobsPage from '../pages/app/JobsPage';
import ProgressPage from '../pages/app/ProgressPage';
import SettingsPage from '../pages/app/SettingsPage';

// Guard: only users who logged in as Faculty/Admin can access
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { loginedAsAdmin } = useAuth();
  if (!loginedAsAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

export default function AppRouter() {
  return (
    <Routes>
      {/* Landing page with its standalone full layout */}
      <Route path="/" element={<LandingPage />} />

      {/* Standalone marketing & standalone tool pages */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/assessment" element={<AssessmentPortalPage />} />

      {/* Public Auth routes wrapped by centered AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Authenticated routes wrapped by Sidebar + Header AppLayout */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/career-roadmap" element={<CareerRoadmapPage />} />
        <Route path="/skill-gap" element={<SkillGapPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/coding" element={<CodingPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/company-prep" element={<CompanyPrepPage />} />
        <Route
          path="/faculty-portal"
          element={
            <AdminRoute>
              <FacultyPortalPage />
            </AdminRoute>
          }
        />
        <Route path="/github" element={<GithubPage />} />
        <Route path="/linkedin" element={<LinkedinPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* /admin legacy redirect — also guarded */}
        <Route path="/admin" element={<AdminRoute><Navigate to="/faculty-portal" replace /></AdminRoute>} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
