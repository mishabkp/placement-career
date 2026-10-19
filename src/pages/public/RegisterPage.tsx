import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Eye, EyeOff, GraduationCap, Users, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const BRANCHES = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [role, setRole] = useState<'student' | 'faculty'>('student');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('CSE');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const { register, isLoading, authError, clearAuthError } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearAuthError();

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setLocalError('Passwords do not match.');
      return;
    }

    try {
      await register(name, email, password, role, college, branch);
      navigate('/dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed.';
      setLocalError(msg);
    }
  };

  const displayError = localError || authError;

  return (
    <div className="w-full max-w-md">
      <div className="bg-[#11151D] rounded-3xl border border-gray-800/90 p-8 space-y-6 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.1)]">
        {/* Header */}
        <div className="text-center space-y-1.5">
          <div className="mx-auto w-14 h-14 bg-amber-500 border border-amber-400 rounded-2xl flex items-center justify-center mb-4 shadow-glow-sm">
            {role === 'faculty' ? <Users className="h-7 w-7 text-black" /> : <GraduationCap className="h-7 w-7 text-black" />}
          </div>
          <h2 className="text-3xl font-extrabold text-white">Create account 🚀</h2>
          <p className="text-sm font-medium text-gray-400">Start your AI-powered career journey today</p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#161B25] border border-gray-800 text-xs font-bold">
          <button type="button" onClick={() => setRole('student')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${role === 'student' ? 'bg-amber-400 text-black shadow-sm' : 'text-gray-400 hover:text-white'}`}>
            <GraduationCap className="w-4 h-4" /><span>Student</span>
          </button>
          <button type="button" onClick={() => setRole('faculty')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${role === 'faculty' ? 'bg-amber-400 text-black shadow-sm' : 'text-gray-400 hover:text-white'}`}>
            <Users className="w-4 h-4" /><span>Faculty / TPO</span>
          </button>
        </div>

        {/* Error */}
        {displayError && (
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{displayError}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleRegister}>
          <Input label="Full Name" type="text" placeholder="Arjun Menon" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Email Address" type="email" placeholder="arjun@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="College Name" type="text" placeholder="MGM College of Engineering" value={college} onChange={(e) => setCollege(e.target.value)} />

          {/* Branch selector — students only */}
          {role === 'student' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Branch</label>
              <div className="flex flex-wrap gap-2">
                {BRANCHES.map((b) => (
                  <button key={b} type="button" onClick={() => setBranch(b)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${branch === b ? 'bg-amber-400 text-black border-amber-400' : 'border-gray-700 text-gray-400 hover:border-amber-500 hover:text-white'}`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Input
            label="Password" type={showPassword ? 'text' : 'password'} placeholder="Min. 6 characters"
            value={password} onChange={(e) => setPassword(e.target.value)} required
            rightIcon={
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-amber-400 focus:outline-none">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            }
          />
          <Input
            label="Confirm Password" type={showConfirm ? 'text' : 'password'} placeholder="Re-enter password"
            value={confirm} onChange={(e) => setConfirm(e.target.value)} required
            rightIcon={
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-amber-400 focus:outline-none">
                {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            }
          />

          {/* Password hints */}
          <div className="flex flex-wrap gap-4 p-3 rounded-xl bg-[#161B25] border border-gray-700/70">
            <div className={`flex items-center gap-1.5 text-xs font-medium ${password.length >= 6 ? 'text-green-400' : 'text-gray-300'}`}>
              <CheckCircle2 className="h-4 w-4" /> Min. 6 chars
            </div>
            <div className={`flex items-center gap-1.5 text-xs font-medium ${password === confirm && confirm.length > 0 ? 'text-green-400' : 'text-gray-300'}`}>
              <CheckCircle2 className="h-4 w-4" /> Passwords match
            </div>
          </div>

          <Button fullWidth size="lg" className="mt-2" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account...
              </span>
            ) : 'Create Account →'}
          </Button>
        </form>

        <p className="text-center text-sm font-medium text-gray-400 pt-2 border-t border-gray-800">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-amber-400 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}
