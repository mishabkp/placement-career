import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Eye, EyeOff, GraduationCap, Users, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeRole, setActiveRole] = useState<'student' | 'faculty'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const { login, isLoading, authError, clearAuthError } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLocalError(null);
    clearAuthError();

    if (!email || !password) {
      setLocalError('Please enter your email and password.');
      return;
    }

    try {
      await login(email, password);
      // Navigate based on the role returned from backend
      navigate('/dashboard');
    } catch (err: unknown) {
      // authError is already set by AuthContext
      const msg = err instanceof Error ? err.message : 'Login failed. Please try again.';
      setLocalError(msg);
    }
  };

  const displayError = localError || authError;

  return (
    <div className="w-full max-w-md">
      <div
        className="bg-[#11151D] rounded-3xl border border-gray-800/90 p-8 space-y-6 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.1)]"
      >
        {/* Header */}
        <div className="text-center space-y-1.5">
          <div
            className="mx-auto w-14 h-14 bg-amber-500 border border-amber-400 rounded-2xl flex items-center justify-center mb-4 shadow-glow-sm"
          >
            {activeRole === 'faculty' ? (
              <Users className="h-7 w-7 text-black" />
            ) : (
              <GraduationCap className="h-7 w-7 text-black" />
            )}
          </div>
          <h2 className="text-3xl font-extrabold text-white">Welcome back 👋</h2>
          <p className="text-sm font-medium text-gray-400">
            {activeRole === 'faculty'
              ? 'TPO & Faculty Placement Management'
              : 'Login to continue your career preparation'}
          </p>
        </div>

        {/* ─── ROLE SELECTOR SWITCHER ─── */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#161B25] border border-gray-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveRole('student')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${activeRole === 'student'
                ? 'bg-amber-400 text-black shadow-sm'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student Portal</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveRole('faculty')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${activeRole === 'faculty'
                ? 'bg-amber-400 text-black shadow-sm'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            <Users className="w-4 h-4" />
            <span>Faculty / TPO</span>
          </button>
        </div>

        {/* Error Message */}
        {displayError && (
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{displayError}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <Input
            label={activeRole === 'faculty' ? 'Institutional Email' : 'Student Email'}
            type="email"
            placeholder={activeRole === 'faculty' ? 'tpo.officer@college.edu' : 'student@college.edu'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-amber-400 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            }
          />

          <div className="flex items-center justify-between text-xs pt-0.5 font-medium">
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-700 bg-[#161B25] text-amber-500 focus:ring-amber-500/40 h-4 w-4"
              />
              Remember me
            </label>
            <Link to="#" className="font-semibold text-amber-400 hover:underline">
              Forgot password?
            </Link>
          </div>

          <div className="block pt-1">
            <Button type="submit" fullWidth size="lg" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Logging in...
                </span>
              ) : (
                activeRole === 'faculty' ? 'Login to Faculty / TPO Portal' : 'Login to Student Dashboard'
              )}
            </Button>
          </div>
        </form>

        <p className="text-center text-sm font-medium text-gray-400 pt-2 border-t border-gray-800">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-amber-400 hover:underline">
            Create one free →
          </Link>
        </p>
      </div>
    </div>
  );
}
