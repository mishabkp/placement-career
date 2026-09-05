import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Eye, EyeOff, GraduationCap, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
            <GraduationCap className="h-7 w-7 text-black" />
          </div>
          <h2 className="text-3xl font-extrabold text-white">Create account 🚀</h2>
          <p className="text-sm font-medium text-gray-400">Start your AI-powered career journey today</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input label="Full Name" type="text" placeholder="Arjun Menon" required />
          <Input label="Email Address" type="email" placeholder="arjun@example.com" required />
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Min. 8 characters"
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
          <Input
            label="Confirm Password"
            type={showConfirm ? 'text' : 'password'}
            placeholder="Re-enter password"
            required
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-gray-400 hover:text-amber-400 focus:outline-none"
              >
                {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            }
          />

          {/* Password hints */}
          <div
            className="flex flex-wrap gap-4 p-3 rounded-xl bg-[#161B25] border border-gray-700/70"
          >
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-300">
              <CheckCircle2 className="h-4 w-4 text-amber-400" /> Min. 8 chars
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-300">
              <CheckCircle2 className="h-4 w-4 text-amber-400" /> Uppercase & numbers
            </div>
          </div>

          <Button fullWidth size="lg" className="mt-2">
            Create Account →
          </Button>
        </form>

        <p className="text-center text-sm font-medium text-gray-400 pt-2 border-t border-gray-800">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-amber-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
