import { useState } from 'react';
import {
  Tune,
  SmartToy,
  Verified,
  CheckCircle2,
} from '../../components/icons/StitchIcons';
import {
  Palette,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Key,
  Shield,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Download,
  AlertTriangle,
  Sliders,
  Check,
  Smartphone,
  Trash2,
  FileJson,
  FileText,
  Plus,
  Link2,
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'appearance' | 'security' | 'notifications' | 'accounts' | 'privacy'>('all');
  const [selectedTheme, setSelectedTheme] = useState<'warm' | 'midnight' | 'adaptive'>('warm');
  const [typeScale, setTypeScale] = useState<'compact' | 'balanced' | 'comfort'>('balanced');
  const [mascotAnim, setMascotAnim] = useState(true);

  // Passwords
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('SuperSecretPassword123');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notification toggles
  const [dailyChallenge, setDailyChallenge] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [campusDrive, setCampusDrive] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [digestChannel, setDigestChannel] = useState('Instant Alerts + Daily Summary');

  // Connected accounts sync state
  const [syncingGh, setSyncingGh] = useState(false);
  const [syncingLc, setSyncingLc] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveAll = () => {
    showToast('✨ Preferences and system settings updated successfully!');
  };

  const handleResetDefaults = () => {
    setSelectedTheme('warm');
    setTypeScale('balanced');
    setMascotAnim(true);
    setDailyChallenge(true);
    setJobAlerts(true);
    setCampusDrive(true);
    setWeeklyDigest(true);
    showToast('🔄 Settings restored to NITC default profile.');
  };

  const handleSyncGithub = () => {
    setSyncingGh(true);
    setTimeout(() => {
      setSyncingGh(false);
      showToast('🐙 GitHub repositories & commit history synced!');
    }, 1200);
  };

  const handleSyncLeetCode = () => {
    setSyncingLc(true);
    setTimeout(() => {
      setSyncingLc(false);
      showToast('⚡ LeetCode rating & solved count updated (1894)!');
    }, 1200);
  };

  const handleExportJson = () => {
    const data = {
      candidate: 'Arjun Menon',
      college: 'NIT Calicut',
      readinessScore: 84,
      githubSynced: true,
      leetcodeRating: 1894,
      exportTimestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'placement-pal-dossier.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('📥 Downloaded raw placement dossier JSON!');
  };

  return (
    <div className="space-y-8 pb-16 w-full font-sans text-[#1E1C10]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-[#FFE600] px-5 py-3.5 rounded-2xl shadow-2xl border border-[#FFE600]/40 flex items-center gap-3 animate-bounce">
          <SmartToy className="h-5 w-5 text-[#FFE600]" />
          <span className="text-xs sm:text-sm font-bold text-white">{toastMessage}</span>
        </div>
      )}

      {/* ─── Reference Visual Ribbon / Top Banner ─── */}
      <div className="w-full overflow-hidden rounded-3xl bg-[#1A1A1A] shadow-md border border-[#CDC7AA]/40 relative">
        <div className="relative w-full p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="px-3 py-1 bg-[#FFE600] text-[#1A1A1A] font-bold text-xs rounded-full inline-flex items-center gap-1.5 shadow-sm">
                <Tune className="h-3.5 w-3.5" />
                <span>System Preferences</span>
              </span>
              <span className="text-[#FAF3DF] text-xs font-semibold flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10">
                <span className="inline-block w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse" />
                Sync Engine v2.4 Active
              </span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Settings & Preferences
            </h1>
            <p className="text-xs sm:text-sm text-[#CDC7AA] font-medium mt-1.5 leading-relaxed">
              Fine-tune your placement intelligence engine, theme ergonomics, authenticated credentials, and notification thresholds.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={handleResetDefaults}
              type="button"
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FFF9E9] font-bold text-xs transition-all border border-white/10 active:scale-95"
            >
              Reset Defaults
            </button>
            <button
              onClick={handleSaveAll}
              type="button"
              className="px-5 py-2.5 rounded-full bg-[#FFE600] hover:bg-[#DEC800] text-[#1A1A1A] font-extrabold text-xs shadow-md flex items-center gap-2 transition-transform active:scale-95"
            >
              <CheckCircle2 className="h-4 w-4 text-[#006B5B]" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Decorative background ambient circles */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#FFE600]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 top-0 w-48 h-48 bg-[#00F5D4]/15 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* ─── Bento Sub-Navigation Bar ─── */}
      <div className="w-full">
        <div className="bg-[#FAF3DF] p-2 rounded-2xl sm:rounded-full border border-[#CDC7AA]/40 shadow-sm flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'all', label: 'All Settings', icon: Sliders },
            { id: 'appearance', label: 'Appearance & Theme', icon: Palette },
            { id: 'security', label: 'General & Security', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'accounts', label: 'Connected Accounts', icon: Link2 },
            { id: 'privacy', label: 'Privacy & Data', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full font-bold text-xs whitespace-nowrap flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'text-[#4B4731] hover:bg-white hover:text-[#1E1C10]'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-[#FFE600]' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Main Bento Grid Content ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Section 1: Appearance & UI Customization */}
        {(activeTab === 'all' || activeTab === 'appearance') && (
          <div className="lg:col-span-12 bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#CDC7AA]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFE600] flex items-center justify-center text-[#1A1A1A] shadow-sm">
                  <Palette className="h-5 w-5 text-[#1A1A1A]" />
                </div>
                <div>
                  <h2 className="font-heading text-lg sm:text-xl font-black text-[#1E1C10]">
                    Appearance & Interaction Style
                  </h2>
                  <p className="text-xs text-[#4B4731] font-medium">
                    Configure visual ergonomics and interactive robot mascot feedback
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#00F5D4]/30 text-[#006B5B] font-bold text-xs border border-[#006B5B]/20">
                Active: Warm Sunshine Yellow
              </span>
            </div>

            {/* Theme Mode Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {/* Card 1: Warm Sunshine */}
              <div
                onClick={() => setSelectedTheme('warm')}
                className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                  selectedTheme === 'warm'
                    ? 'bg-[#FAF3DF] border-[#FFE600] shadow-md ring-2 ring-[#FFE600]'
                    : 'bg-white border-[#CDC7AA]/40 hover:bg-[#FAF3DF]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#FFE600] inline-block shadow-sm" />
                    <span className="w-4 h-4 rounded-full bg-[#1A1A1A] inline-block shadow-sm" />
                    <span className="w-4 h-4 rounded-full bg-[#FFF9E9] inline-block border border-[#CDC7AA]/40 shadow-sm" />
                  </div>
                  {selectedTheme === 'warm' ? (
                    <CheckCircle2 className="h-5 w-5 text-[#006B5B]" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-[#CDC7AA]" />
                  )}
                </div>
                <h3 className="font-heading text-base font-extrabold text-[#1E1C10]">
                  Warm Sunshine
                </h3>
                <p className="text-xs text-[#4B4731] mt-1 leading-relaxed">
                  High readability warm cream canvas with energetic sunshine yellow accents and playful stickers.
                </p>
              </div>

              {/* Card 2: Midnight Cyberpunk */}
              <div
                onClick={() => setSelectedTheme('midnight')}
                className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                  selectedTheme === 'midnight'
                    ? 'bg-[#FAF3DF] border-[#FFE600] shadow-md ring-2 ring-[#FFE600]'
                    : 'bg-white border-[#CDC7AA]/40 hover:bg-[#FAF3DF]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#1A1A1A] inline-block shadow-sm" />
                    <span className="w-4 h-4 rounded-full bg-[#9B5DE5] inline-block shadow-sm" />
                    <span className="w-4 h-4 rounded-full bg-[#00F5D4] inline-block shadow-sm" />
                  </div>
                  {selectedTheme === 'midnight' ? (
                    <CheckCircle2 className="h-5 w-5 text-[#006B5B]" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-[#CDC7AA]" />
                  )}
                </div>
                <h3 className="font-heading text-base font-extrabold text-[#1E1C10]">
                  Midnight Cyberpunk
                </h3>
                <p className="text-xs text-[#4B4731] mt-1 leading-relaxed">
                  Deep obsidian charcoal with vibrant neon green & lavender focus rings for late-night coding.
                </p>
              </div>

              {/* Card 3: System Adaptive */}
              <div
                onClick={() => setSelectedTheme('adaptive')}
                className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                  selectedTheme === 'adaptive'
                    ? 'bg-[#FAF3DF] border-[#FFE600] shadow-md ring-2 ring-[#FFE600]'
                    : 'bg-white border-[#CDC7AA]/40 hover:bg-[#FAF3DF]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#7C775F] inline-block shadow-sm" />
                    <span className="w-4 h-4 rounded-full bg-[#E0DAC7] inline-block shadow-sm" />
                    <span className="w-4 h-4 rounded-full bg-[#DEC800] inline-block shadow-sm" />
                  </div>
                  {selectedTheme === 'adaptive' ? (
                    <CheckCircle2 className="h-5 w-5 text-[#006B5B]" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-[#CDC7AA]" />
                  )}
                </div>
                <h3 className="font-heading text-base font-extrabold text-[#1E1C10]">
                  System Adaptive
                </h3>
                <p className="text-xs text-[#4B4731] mt-1 leading-relaxed">
                  Dynamically synchronizes with your device operating system schedule and ambient light.
                </p>
              </div>
            </div>

            {/* Controls Row: Scale and Mascots */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="bg-[#FAF3DF]/60 p-4 rounded-2xl flex items-center justify-between border border-[#CDC7AA]/30">
                <div>
                  <p className="font-bold text-xs sm:text-sm text-[#1E1C10]">Typography Density</p>
                  <p className="text-[11px] text-[#4B4731]">Adjust interface scale for interview preparation</p>
                </div>
                <div className="inline-flex bg-white p-1 rounded-full border border-[#CDC7AA]/40 shadow-xs">
                  {(['compact', 'balanced', 'comfort'] as const).map((scale) => (
                    <button
                      key={scale}
                      onClick={() => setTypeScale(scale)}
                      className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-all ${
                        typeScale === scale
                          ? 'bg-[#FFE600] text-[#1A1A1A] shadow-xs'
                          : 'text-[#7C775F] hover:text-[#1E1C10]'
                      }`}
                    >
                      {scale}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#FAF3DF]/60 p-4 rounded-2xl flex items-center justify-between border border-[#CDC7AA]/30">
                <div>
                  <p className="font-bold text-xs sm:text-sm text-[#1E1C10]">Pal-Bot Micro Mascot Animations</p>
                  <p className="text-[11px] text-[#4B4731]">Animated stickers for code streaks and score boosts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mascotAnim}
                    onChange={(e) => setMascotAnim(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-[#E8E2CF] peer-focus:outline-none rounded-full peer peer-checked:bg-[#FFE600] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#1A1A1A] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-6" />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Account & Security Form */}
        {(activeTab === 'all' || activeTab === 'security') && (
          <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between gap-5">
            <div>
              <div className="flex items-center gap-3 pb-2 border-b border-[#CDC7AA]/20 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#1A1A1A] flex items-center justify-center text-[#FFE600] shadow-sm">
                  <Lock className="h-5 w-5 text-[#FFE600]" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-black text-[#1E1C10]">
                    Password & Credentials
                  </h2>
                  <p className="text-xs text-[#4B4731] font-medium">
                    Manage authentication tokens and session security
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#4B4731] mb-1.5">
                    Current Master Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-[#FAF3DF]/70 text-[#1E1C10] px-4 py-2.5 rounded-full outline-none text-xs sm:text-sm font-semibold border border-[#CDC7AA]/40 pr-12 focus:bg-white focus:border-[#6A5F00] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-[#7C775F] hover:text-[#1E1C10]"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4B4731] mb-1.5">
                    New Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="password"
                      placeholder="Enter at least 12 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-[#FAF3DF]/70 text-[#1E1C10] px-4 py-2.5 rounded-full outline-none text-xs sm:text-sm font-semibold border border-[#CDC7AA]/40 pr-12 focus:bg-white focus:border-[#6A5F00] transition-colors"
                    />
                    <Key className="absolute right-3.5 h-4 w-4 text-[#7C775F]" />
                  </div>
                  {/* Strength Bar */}
                  <div className="mt-2 bg-[#E8E2CF] rounded-full h-1.5 w-full overflow-hidden flex">
                    <div className="bg-[#00F5D4] w-3/4 h-full" />
                    <div className="bg-[#FFE600] w-1/4 h-full" />
                  </div>
                  <p className="text-[11px] font-bold text-[#006B5B] mt-1 flex items-center gap-1">
                    <Verified className="h-3.5 w-3.5" />
                    Strong • Contains uppercase, numerals & symbols
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4B4731] mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Repeat your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#FAF3DF]/70 text-[#1E1C10] px-4 py-2.5 rounded-full outline-none text-xs sm:text-sm font-semibold border border-[#CDC7AA]/40 focus:bg-white focus:border-[#6A5F00] transition-colors"
                  />
                </div>

                {/* 2FA Sub-Bento Box */}
                <div className="bg-[#FAF3DF]/80 p-4 rounded-2xl flex items-center justify-between border border-[#CDC7AA]/40 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#26FEDC] flex items-center justify-center text-[#007261]">
                      <Smartphone className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-[#1E1C10]">Two-Factor Auth (2FA)</p>
                      <p className="text-[11px] text-[#4B4731]">Authenticator App active (Google Auth)</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('🔒 2FA security settings are active and protected.')}
                    className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FAF3DF] text-[#1E1C10] font-bold text-xs transition-colors border border-[#CDC7AA]/40"
                  >
                    Manage 2FA
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => showToast('✅ Password credentials updated securely!')}
                className="px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-black text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all active:scale-95"
              >
                <Lock className="h-3.5 w-3.5 text-[#FFE600]" />
                Update Security Credentials
              </button>
            </div>
          </div>
        )}

        {/* Section 3: Notification & Placement Alerts */}
        {(activeTab === 'all' || activeTab === 'notifications') && (
          <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between gap-5">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#CDC7AA]/20 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FFE600] flex items-center justify-center text-[#1A1A1A] shadow-sm">
                    <Bell className="h-5 w-5 text-[#1A1A1A]" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-black text-[#1E1C10]">
                      Placement Alerts & Routine
                    </h2>
                    <p className="text-xs text-[#4B4731] font-medium">
                      Stay ahead of hiring drives, cut-offs and daily practice
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FAF3DF] text-[#6A5F00] border border-[#CDC7AA]/30">
                  4 Active Rules
                </span>
              </div>

              <div className="space-y-3">
                {/* Toggle 1 */}
                <div className="bg-[#FAF3DF]/60 p-3.5 rounded-2xl flex items-center justify-between border border-[#CDC7AA]/30">
                  <div className="pr-3">
                    <p className="font-bold text-xs sm:text-sm text-[#1E1C10]">Daily Coding Challenge & Streak</p>
                    <p className="text-[11px] text-[#4B4731]">Reminder triggers daily at 9:00 AM IST</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={dailyChallenge}
                      onChange={(e) => setDailyChallenge(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E8E2CF] rounded-full peer peer-checked:bg-[#FFE600] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#1A1A1A] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                </div>

                {/* Toggle 2 */}
                <div className="bg-[#FAF3DF]/60 p-3.5 rounded-2xl flex items-center justify-between border border-[#CDC7AA]/30">
                  <div className="pr-3">
                    <p className="font-bold text-xs sm:text-sm text-[#1E1C10]">Job Match Alerts (≥ 90% Fit)</p>
                    <p className="text-[11px] text-[#4B4731]">Instant push notifications for matched company postings</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={jobAlerts}
                      onChange={(e) => setJobAlerts(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E8E2CF] rounded-full peer peer-checked:bg-[#FFE600] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#1A1A1A] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                </div>

                {/* Toggle 3 */}
                <div className="bg-[#FAF3DF]/60 p-3.5 rounded-2xl flex items-center justify-between border border-[#CDC7AA]/30">
                  <div className="pr-3">
                    <p className="font-bold text-xs sm:text-sm text-[#1E1C10]">Campus Drive Shortlists & Cut-Offs</p>
                    <p className="text-[11px] text-[#4B4731]">Real-time alerts when your university releases test rosters</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={campusDrive}
                      onChange={(e) => setCampusDrive(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E8E2CF] rounded-full peer peer-checked:bg-[#FFE600] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#1A1A1A] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                </div>

                {/* Toggle 4 */}
                <div className="bg-[#FAF3DF]/60 p-3.5 rounded-2xl flex items-center justify-between border border-[#CDC7AA]/30">
                  <div className="pr-3">
                    <p className="font-bold text-xs sm:text-sm text-[#1E1C10]">Weekly AI Performance Digest</p>
                    <p className="text-[11px] text-[#4B4731]">Every Sunday 7:00 PM summary of strengths & gap reduction</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={weeklyDigest}
                      onChange={(e) => setWeeklyDigest(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E8E2CF] rounded-full peer peer-checked:bg-[#FFE600] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#1A1A1A] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                </div>

                {/* Delivery Channel Dropdown */}
                <div className="bg-[#FAF3DF] p-3.5 rounded-2xl flex items-center justify-between border border-[#CDC7AA]/40">
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-[#1E1C10]">Digest Delivery Channel</p>
                    <p className="text-[11px] text-[#4B4731]">Select delivery rhythm</p>
                  </div>
                  <select
                    value={digestChannel}
                    onChange={(e) => setDigestChannel(e.target.value)}
                    className="bg-white text-[#1E1C10] font-bold text-xs px-4 py-2 rounded-full border border-[#CDC7AA]/40 outline-none cursor-pointer shadow-xs"
                  >
                    <option>Instant Alerts + Daily Summary</option>
                    <option>Weekly Digest Only</option>
                    <option>Urgent Cut-Offs Only</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => showToast('🔔 Notification preferences saved!')}
                className="px-5 py-2.5 rounded-full bg-[#FFE600] text-[#1A1A1A] font-extrabold text-xs shadow-sm hover:bg-[#DEC800] transition-all active:scale-95"
              >
                Apply Notification Rules
              </button>
            </div>
          </div>
        )}

        {/* Section 4: Connected Developer & Platform Profiles */}
        {(activeTab === 'all' || activeTab === 'accounts') && (
          <div className="lg:col-span-12 bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#CDC7AA]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#9B5DE5] flex items-center justify-center text-white shadow-sm">
                  <Link2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-heading text-lg sm:text-xl font-black text-[#1E1C10]">
                    Connected Developer & Platform Profiles
                  </h2>
                  <p className="text-xs text-[#4B4731] font-medium">
                    Feed project repositories, commit streaks, and problem ratings into your Placement AI model
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => showToast('🔗 Open-platform OAuth connector loaded.')}
                className="px-4 py-2 rounded-full bg-[#FAF3DF] hover:bg-[#F4EEDA] text-[#1E1C10] font-bold text-xs flex items-center gap-1.5 border border-[#CDC7AA]/40"
              >
                <Plus className="h-4 w-4 text-[#6A5F00]" />
                <span>Connect New Platform</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* GitHub Card */}
              <div className="bg-[#FAF3DF]/60 hover:bg-[#FAF3DF] p-5 rounded-2xl border border-[#CDC7AA]/40 flex flex-col justify-between transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-xs">
                        GH
                      </span>
                      <span className="font-heading text-base font-extrabold text-[#1E1C10]">
                        GitHub
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#26FEDC] text-[#007261] font-bold text-[10px] flex items-center gap-1">
                      <Check className="h-3 w-3" /> Synced
                    </span>
                  </div>
                  <p className="font-bold text-xs text-[#1E1C10]">@arjunpatel_dev</p>
                  <p className="text-xs text-[#4B4731] mt-1 leading-relaxed">
                    12 public repositories • 595 commits tracked for ATS skills scoring and code audit.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 mt-3 border-t border-[#CDC7AA]/30 text-xs font-bold">
                  <button
                    type="button"
                    onClick={handleSyncGithub}
                    disabled={syncingGh}
                    className="text-[#006B5B] hover:text-[#005144] flex items-center gap-1"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${syncingGh ? 'animate-spin' : ''}`} />
                    {syncingGh ? 'Syncing...' : 'Sync Now'}
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('GitHub account re-authenticated')}
                    className="text-[#BA1A1A] hover:underline"
                  >
                    Disconnect
                  </button>
                </div>
              </div>

              {/* LinkedIn Card */}
              <div className="bg-[#FAF3DF]/60 hover:bg-[#FAF3DF] p-5 rounded-2xl border border-[#CDC7AA]/40 flex flex-col justify-between transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center font-bold text-xs">
                        in
                      </span>
                      <span className="font-heading text-base font-extrabold text-[#1E1C10]">
                        LinkedIn
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#26FEDC] text-[#007261] font-bold text-[10px] flex items-center gap-1">
                      <Check className="h-3 w-3" /> Active
                    </span>
                  </div>
                  <p className="font-bold text-xs text-[#1E1C10]">Arjun Menon</p>
                  <p className="text-xs text-[#4B4731] mt-1 leading-relaxed">
                    Experience, recommendations & verified credentials linked to resume analyzer.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 mt-3 border-t border-[#CDC7AA]/30 text-xs font-bold">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#4B4731] hover:text-[#1E1C10] flex items-center gap-1"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> View Profile
                  </a>
                  <button
                    type="button"
                    onClick={() => showToast('LinkedIn token refreshed successfully!')}
                    className="text-[#6A5F00] hover:underline"
                  >
                    Re-authorize
                  </button>
                </div>
              </div>

              {/* LeetCode Card */}
              <div className="bg-[#FAF3DF]/60 hover:bg-[#FAF3DF] p-5 rounded-2xl border border-[#CDC7AA]/40 flex flex-col justify-between transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-[#FFA116] text-[#1A1A1A] flex items-center justify-center font-bold text-xs">
                        LC
                      </span>
                      <span className="font-heading text-base font-extrabold text-[#1E1C10]">
                        LeetCode
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF3DF] text-[#7C775F] font-bold text-[10px] border border-[#CDC7AA]/30">
                      2h ago
                    </span>
                  </div>
                  <p className="font-bold text-xs text-[#1E1C10]">@arjun_m</p>
                  <p className="text-xs text-[#4B4731] mt-1 leading-relaxed">
                    320 problems solved (45 Hard, 175 Medium). Contest rating 1894 fed into gap analysis.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 mt-3 border-t border-[#CDC7AA]/30 text-xs font-bold">
                  <button
                    type="button"
                    onClick={handleSyncLeetCode}
                    disabled={syncingLc}
                    className="text-[#006B5B] hover:text-[#005144] flex items-center gap-1"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${syncingLc ? 'animate-spin' : ''}`} />
                    {syncingLc ? 'Syncing...' : 'Sync Rating'}
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('LeetCode account disconnected')}
                    className="text-[#BA1A1A] hover:underline"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 5: Data Privacy & Export Placement Dossier */}
        {(activeTab === 'all' || activeTab === 'privacy') && (
          <>
            <div className="lg:col-span-8 bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF3DF] flex items-center justify-center text-[#1E1C10] shadow-sm border border-[#CDC7AA]/30">
                    <Download className="h-5 w-5 text-[#6A5F00]" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-black text-[#1E1C10]">
                      Export Placement Dossier
                    </h2>
                    <p className="text-xs text-[#4B4731]">
                      Download all your AI mock interview transcripts, skill radar snapshots & resume analyses.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="px-5 py-2.5 rounded-full bg-[#FAF3DF] hover:bg-[#F4EEDA] text-[#1E1C10] font-bold text-xs border border-[#CDC7AA]/40 shadow-xs flex items-center gap-2 transition-transform active:scale-95"
                >
                  <FileJson className="h-4 w-4 text-[#006B5B]" />
                  <span>Export Raw JSON (.json)</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast('📄 Preparing compiled PDF Placement Dossier...')}
                  className="px-5 py-2.5 rounded-full bg-[#FAF3DF] hover:bg-[#F4EEDA] text-[#1E1C10] font-bold text-xs border border-[#CDC7AA]/40 shadow-xs flex items-center gap-2 transition-transform active:scale-95"
                >
                  <FileText className="h-4 w-4 text-[#BA1A1A]" />
                  <span>Export Readiness Dossier (.pdf)</span>
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="lg:col-span-4 bg-[#FFDAD6]/60 p-6 sm:p-7 rounded-3xl shadow-sm border border-[#FF6B6B]/40 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-[#BA1A1A]" />
                  <h2 className="font-heading text-lg font-black text-[#BA1A1A]">
                    Danger Zone
                  </h2>
                </div>
                <p className="text-xs text-[#7C2D2D] leading-relaxed">
                  Deactivating removes your candidate profile from ongoing campus matching and stops automated mock reminders.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => showToast('⚠️ Profile deactivation requested. Confirmation email dispatched.')}
                  className="w-full px-5 py-2.5 rounded-full bg-[#BA1A1A] hover:bg-[#93000A] text-white font-bold text-xs shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4 text-white" />
                  <span>Deactivate Candidate Account</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
