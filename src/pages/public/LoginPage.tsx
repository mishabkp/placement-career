import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

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
          <h2 className="text-3xl font-extrabold text-white">Welcome back 👋</h2>
          <p className="text-sm font-medium text-gray-400">Login to continue your career preparation</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input label="Email Address" type="email" placeholder="you@example.com" required />
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
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

          <Link to="/dashboard" className="block pt-1">
            <Button type="button" fullWidth size="lg">
              Login to Dashboard
            </Button>
          </Link>

          {/* OR divider */}
          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t border-gray-800" />
            <span className="flex-shrink mx-4 text-xs font-bold text-gray-400 uppercase">or</span>
            <div className="flex-grow border-t border-gray-800" />
          </div>

          <Button variant="secondary" fullWidth className="flex items-center justify-center gap-2.5">
            <svg className="h-4 w-4 text-white" viewBox="0 0 488 512" fill="currentColor">
              <path d="M488 261.8c0-17.8-1.6-35-4.6-51.6H249v97.6h134.3c-5.8 31.5-23.5 58.2-50.1 75.9v63.3h80.9c47.3-43.6 74.9-107.9 74.9-185.2z" />
              <path d="M249 492c67.1 0 123.3-22.2 164.4-60.2l-80.9-63.3c-22.5 15.1-51.3 24-83.5 24-64.1 0-118.5-43.3-138-101.5H27.6v63.8C68.9 435 152.2 492 249 492z" />
              <path d="M111 291.1c-9.7-27.5-9.7-57 0-84.5V143H27.6c-30.5 60.7-30.5 133.8 0 194.5l83.4-46.4z" />
              <path d="M249 100.3c36.5-.6 71.5 13.6 98.1 38.5l73.3-73.3C385.5 21.4 331 0 274 0 152.2 0 68.9 57 27.6 143l83.4 63.6C130.5 143.6 185 100.3 249 100.3z" />
            </svg>
            Continue with Google
          </Button>
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
