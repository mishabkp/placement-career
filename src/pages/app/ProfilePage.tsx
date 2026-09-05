import { useState } from 'react';
import {
  SmartToy,
  Verified,
  CheckCircle2,
} from '../../components/icons/StitchIcons';
import {
  Eye,
  Save,
  Camera,
  School,
  Terminal,
  MapPin,
  Star,
  Clock,
  Sparkles,
  Award,
  User,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Hash,
  Calendar,
  Plus,
  X,
  Briefcase,
  Quote,
  Wand2,
  AlertCircle,
} from 'lucide-react';

export default function ProfilePage() {
  const [name, setName] = useState('Arjun Menon');
  const [email, setEmail] = useState('arjun.menon@example.com');
  const [phone, setPhone] = useState('+91 98470 12345');
  const [college, setCollege] = useState('NIT Calicut');
  const [degree, setDegree] = useState('B.Tech Computer Science & Engineering');
  const [rollNo, setRollNo] = useState('B220541CS');
  const [gradYear, setGradYear] = useState('2026');
  const [cgpa, setCgpa] = useState('8.6 / 10.0');

  // Bio & AI Polish
  const [bio, setBio] = useState(
    'B.Tech CSE student at NIT Calicut, passionate about full-stack development and open source. Currently exploring React, Node.js, and cloud technologies.'
  );
  const [isPolishing, setIsPolishing] = useState(false);

  // Target Roles & CTC
  const [targetRole, setTargetRole] = useState('Full Stack Software Engineer');
  const [ctcValue, setCtcValue] = useState(12);
  const [locations, setLocations] = useState(['Bangalore', 'Kochi', 'Remote / Hybrid']);
  const [newCity, setNewCity] = useState('');
  const [showAddCity, setShowAddCity] = useState(false);
  const [openToInternship, setOpenToInternship] = useState(true);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = () => {
    showToast('🎉 Profile changes saved successfully!');
  };

  const handleAiPolish = () => {
    setIsPolishing(true);
    setTimeout(() => {
      setBio(
        'Final-year Computer Science student at NIT Calicut specializing in modern web ecosystems, scalable backend microservices, and reactive UIs. Driven by engineering rigorous full-stack solutions.'
      );
      setIsPolishing(false);
      showToast('🪄 Bio polished with Pal-Bot AI!');
    }, 850);
  };

  const handleRemoveLocation = (loc: string) => {
    setLocations((prev) => prev.filter((l) => l !== loc));
  };

  const handleAddLocation = () => {
    const trimmed = newCity.trim();
    if (trimmed && !locations.includes(trimmed)) {
      setLocations((prev) => [...prev, trimmed]);
      setNewCity('');
      setShowAddCity(false);
      showToast(`📍 Added ${trimmed} to preferred locations`);
    }
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

      {/* ─── Top Banner / Header Bar ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-[#CDC7AA]/40 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#FFE600]/20 pointer-events-none blur-2xl" />

        <div className="flex items-center gap-4 z-10">
          <div className="relative w-16 h-16 rounded-2xl bg-[#FFE600] flex items-center justify-center text-[#1A1A1A] shadow-md border border-[#CDC7AA]/40 transition-transform hover:scale-105">
            <SmartToy className="h-9 w-9 text-[#1A1A1A]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00F5D4] rounded-full border-2 border-white shadow-xs" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1E1C10] tracking-tight">
                Student Profile
              </h1>
              <span className="px-3 py-1 rounded-full bg-[#FAF3DF] text-[#006B5B] font-bold text-xs uppercase tracking-wider border border-[#CDC7AA]/30">
                Placement 2026
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#4B4731] font-medium mt-0.5">
              Manage your personal details, academic standing, and career targets.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 z-10 self-start md:self-auto flex-wrap">
          <button
            type="button"
            onClick={() => showToast('👁️ Public recruiter preview generated!')}
            className="px-4 py-2.5 rounded-full bg-[#FAF3DF] hover:bg-[#F4EEDA] font-bold text-xs text-[#1E1C10] transition-all flex items-center gap-2 border border-[#CDC7AA]/40 active:scale-95"
          >
            <Eye className="h-4 w-4 text-[#6A5F00]" />
            <span>Preview Public View</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-full bg-[#FFE600] hover:bg-[#DEC800] text-[#1A1A1A] font-extrabold text-xs shadow-md transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 border border-[#CDC7AA]/40 group"
          >
            <span>Save Changes</span>
            <Save className="h-4 w-4 text-[#1A1A1A] transition-transform group-hover:rotate-12" />
          </button>
        </div>
      </div>

      {/* ─── Main Top Grid: Profile & Academic Info ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Student Avatar & Identity (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Identity Card */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-[#CDC7AA]/40 relative flex flex-col items-center text-center">
            {/* Floating Status Pill */}
            <div className="absolute top-6 right-6">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F5D4]/30 text-[#006B5B] font-bold text-xs border border-[#006B5B]/20">
                <span className="w-2 h-2 rounded-full bg-[#006B5B] animate-ping" />
                <span>Active Candidate</span>
              </div>
            </div>

            {/* Avatar Container */}
            <div className="relative mt-2 mb-4 group cursor-pointer">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-[#FFE600] via-[#FAF3DF] to-[#00F5D4] p-1.5 shadow-md">
                <div className="w-full h-full rounded-2xl bg-[#FFE600] flex items-center justify-center font-heading text-4xl font-black text-[#1A1A1A] shadow-inner">
                  AM
                </div>
              </div>
              {/* Upload Overlay Button */}
              <button
                type="button"
                onClick={() => showToast('📸 Photo upload dialog opened.')}
                className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[#FFE600] text-[#1A1A1A] shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-[#CDC7AA]/40"
                title="Change Avatar"
              >
                <Camera className="h-5 w-5 text-[#1A1A1A]" />
              </button>
            </div>

            {/* Student Title */}
            <div className="flex items-center gap-1.5 justify-center">
              <h2 className="font-heading text-xl sm:text-2xl font-black text-[#1E1C10]">
                {name}
              </h2>
              <Verified className="h-5 w-5 text-[#006B5B]" />
            </div>
            <p className="text-xs text-[#7C775F] font-semibold mb-3">{email}</p>

            {/* Chips Row */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
              <span className="px-3 py-1 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-xs border border-[#CDC7AA]/30">
                CSE
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FAF3DF] text-[#1E1C10] font-bold text-xs border border-[#CDC7AA]/30">
                Batch 2026
              </span>
              <span className="px-3 py-1 rounded-full bg-[#9B5DE5]/20 text-[#6B21A8] font-bold text-xs">
                Full-Stack Track
              </span>
            </div>

            {/* University & Location List */}
            <div className="w-full flex flex-col gap-2.5 pt-4 border-t border-[#CDC7AA]/30 bg-[#FAF3DF]/50 p-4 rounded-2xl text-left border border-[#CDC7AA]/20">
              <div className="flex items-center gap-2.5 text-[#1E1C10]">
                <School className="h-4.5 w-4.5 text-[#6A5F00] shrink-0" />
                <span className="text-xs font-bold truncate">NIT Calicut</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#1E1C10]">
                <Terminal className="h-4.5 w-4.5 text-[#006B5B] shrink-0" />
                <span className="text-xs font-medium truncate">B.Tech - Computer Science & Engineering</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#7C775F]">
                <MapPin className="h-4.5 w-4.5 text-[#BA1A1A] shrink-0" />
                <span className="text-xs font-medium truncate">Calicut, Kerala, India</span>
              </div>
            </div>
          </div>

          {/* Profile Strength Card Widget */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-[#6A5F00] fill-[#FFE600]" />
                <span className="font-heading text-base font-black text-[#1E1C10]">Profile Strength</span>
              </div>
              <span className="font-heading text-lg font-black text-[#006B5B]">70%</span>
            </div>

            {/* Progress Track */}
            <div className="w-full h-3 rounded-full bg-[#FAF3DF] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FFE600] via-[#00F5D4] to-[#006B5B] transition-all duration-1000"
                style={{ width: '70%' }}
              />
            </div>

            {/* Step Badges */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-bold">
              <div className="flex items-center gap-1.5 text-[#006B5B]">
                <CheckCircle2 className="h-4 w-4" />
                <span>Basic Details (100%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#006B5B]">
                <CheckCircle2 className="h-4 w-4" />
                <span>Academics (100%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#6A5F00]">
                <Clock className="h-4 w-4" />
                <span>Resume / Projects (85%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#BA1A1A]">
                <AlertCircle className="h-4 w-4" />
                <span>LinkedIn / Socials (0%)</span>
              </div>
            </div>

            {/* Mascot Tip Card */}
            <div className="mt-2 p-3.5 rounded-2xl bg-[#FAF3DF] flex items-center gap-3 border border-[#CDC7AA]/30">
              <div className="w-10 h-10 shrink-0 rounded-2xl bg-[#FFE600] flex items-center justify-center text-[#1A1A1A] shadow-xs">
                <Sparkles className="h-5 w-5 text-[#6A5F00]" />
              </div>
              <p className="text-xs text-[#4B4731] leading-relaxed">
                <strong className="text-[#1E1C10]">Pal-Bot Tip:</strong> Complete your LinkedIn & GitHub sync to hit 100% placement readiness!
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Academic & Personal Form Grid (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#CDC7AA]/20">
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-black text-[#1E1C10]">
                Academic & Personal Details
              </h3>
              <p className="text-xs text-[#4B4731] font-medium mt-0.5">
                Keep your college records accurate for on-campus drives.
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#FAF3DF] flex items-center justify-center border border-[#CDC7AA]/30">
              <Award className="h-5 w-5 text-[#6A5F00]" />
            </div>
          </div>

          {/* Form Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C775F] h-4 w-4" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FAF3DF]/70 text-[#1E1C10] font-semibold text-xs sm:text-sm border border-[#CDC7AA]/40 focus:bg-white focus:border-[#6A5F00] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C775F] h-4 w-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FAF3DF]/70 text-[#1E1C10] font-semibold text-xs sm:text-sm border border-[#CDC7AA]/40 focus:bg-white focus:border-[#6A5F00] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                Phone / WhatsApp
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C775F] h-4 w-4" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FAF3DF]/70 text-[#1E1C10] font-semibold text-xs sm:text-sm border border-[#CDC7AA]/40 focus:bg-white focus:border-[#6A5F00] outline-none transition-colors"
                />
              </div>
            </div>

            {/* College / University */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                College / University
              </label>
              <div className="relative">
                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C775F] h-4 w-4" />
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FAF3DF]/70 text-[#1E1C10] font-semibold text-xs sm:text-sm border border-[#CDC7AA]/40 focus:bg-white focus:border-[#6A5F00] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Degree & Branch */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                Degree & Branch
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C775F] h-4 w-4" />
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FAF3DF]/70 text-[#1E1C10] font-semibold text-xs sm:text-sm border border-[#CDC7AA]/40 focus:bg-white focus:border-[#6A5F00] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Student ID / Roll No */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                Student ID / Roll No
              </label>
              <div className="relative">
                <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C775F] h-4 w-4" />
                <input
                  type="text"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FAF3DF]/70 text-[#1E1C10] font-semibold text-xs sm:text-sm border border-[#CDC7AA]/40 focus:bg-white focus:border-[#6A5F00] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Graduation Year */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                Graduation Year
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C775F] h-4 w-4" />
                <select
                  value={gradYear}
                  onChange={(e) => setGradYear(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FAF3DF]/70 text-[#1E1C10] font-semibold text-xs sm:text-sm border border-[#CDC7AA]/40 focus:bg-white focus:border-[#6A5F00] outline-none transition-colors cursor-pointer"
                >
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </select>
              </div>
            </div>

            {/* Current CGPA */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                  Current CGPA
                </label>
                <span className="px-2 py-0.5 rounded-full bg-[#00F5D4]/30 text-[#006B5B] font-bold text-[10px]">
                  Top 15% Batch
                </span>
              </div>
              <div className="relative">
                <Star className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C775F] h-4 w-4" />
                <input
                  type="text"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FAF3DF]/70 text-[#1E1C10] font-bold text-xs sm:text-sm border border-[#CDC7AA]/40 focus:bg-white focus:border-[#6A5F00] outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* College Verification Status Banner */}
          <div className="mt-2 p-4 rounded-2xl bg-[#FAF3DF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-[#CDC7AA]/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#26FEDC] flex items-center justify-center text-[#007261]">
                <Verified className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#1E1C10]">
                  College Verification Status
                </h4>
                <p className="text-[11px] text-[#4B4731]">
                  Verified by TPO (Training & Placement Cell, NITC)
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('🎓 Official TPO verification certificate downloaded!')}
              className="px-4 py-2 rounded-full bg-white text-[#1E1C10] hover:bg-[#FAF3DF] font-bold text-xs shadow-xs border border-[#CDC7AA]/40 transition-all self-end sm:self-auto"
            >
              View Certificate
            </button>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM SECTION: Career & Placement Preferences ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* CARD 1: Profile Summary / Bio (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Quote className="h-5 w-5 text-[#6A5F00]" />
                <h3 className="font-heading text-base sm:text-lg font-black text-[#1E1C10]">
                  Profile Summary / Bio
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#7C775F] bg-[#FAF3DF] px-2.5 py-0.5 rounded-full border border-[#CDC7AA]/30">
                {bio.length} / 300 chars
              </span>
            </div>

            <div className="relative">
              <textarea
                rows={5}
                maxLength={300}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-4 rounded-2xl bg-[#FAF3DF]/60 text-[#1E1C10] font-medium text-xs sm:text-sm resize-none border border-[#CDC7AA]/40 focus:bg-white focus:border-[#6A5F00] outline-none transition-colors leading-relaxed"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 flex-wrap gap-2">
            <button
              type="button"
              onClick={handleAiPolish}
              disabled={isPolishing}
              className="px-4 py-2 rounded-full bg-[#9B5DE5]/15 hover:bg-[#9B5DE5]/25 text-[#6B21A8] font-bold text-xs flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              <Wand2 className={`h-4 w-4 ${isPolishing ? 'animate-spin' : ''}`} />
              <span>{isPolishing ? 'Polishing with Pal-Bot...' : 'AI Polish with Pal-Bot 🪄'}</span>
            </button>
            <span className="text-[#7C775F] text-[11px] font-medium">Recruiters read this first</span>
          </div>
        </div>

        {/* CARD 2: Target Roles & Placement Preferences (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-[#CDC7AA]/40 flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#CDC7AA]/20 mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-[#006B5B]" />
                <h3 className="font-heading text-base sm:text-lg font-black text-[#1E1C10]">
                  Target Roles & Placement Preferences
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-xs">
                Placement 2026 Ready
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primary Target Role */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                  Primary Target Role
                </label>
                <div className="relative">
                  <Terminal className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C775F] h-4 w-4" />
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FAF3DF]/70 text-[#1E1C10] font-semibold text-xs sm:text-sm border border-[#CDC7AA]/40 focus:bg-white focus:border-[#6A5F00] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Expected Package */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                    Expected CTC Range
                  </label>
                  <span className="text-xs font-black text-[#006B5B]">
                    {Math.max(6, ctcValue - 4)} - {ctcValue} LPA
                  </span>
                </div>
                <div className="flex items-center bg-[#FAF3DF]/70 px-4 py-2.5 rounded-full border border-[#CDC7AA]/40">
                  <input
                    type="range"
                    min="6"
                    max="35"
                    step="1"
                    value={ctcValue}
                    onChange={(e) => setCtcValue(Number(e.target.value))}
                    className="w-full accent-[#006B5B] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Preferred Locations */}
            <div className="flex flex-col gap-2 mt-4">
              <label className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                Preferred Job Locations
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {locations.map((loc) => (
                  <span
                    key={loc}
                    className="px-3.5 py-1.5 rounded-full bg-[#FAF3DF] text-[#1E1C10] font-bold text-xs flex items-center gap-1.5 border border-[#CDC7AA]/30"
                  >
                    <span>📍 {loc}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLocation(loc)}
                      className="hover:text-[#BA1A1A] transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}

                {showAddCity ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder="Enter city..."
                      className="px-3 py-1 text-xs rounded-full bg-white border border-[#CDC7AA] outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddLocation}
                      className="px-3 py-1 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-xs"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddCity(false)}
                      className="text-[#7C775F]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAddCity(true)}
                    className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FAF3DF] text-[#6A5F00] font-bold text-xs flex items-center gap-1 border border-[#CDC7AA]/40 shadow-xs"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add City</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Open to Internships Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF3DF] border border-[#CDC7AA]/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#00F5D4]/30 flex items-center justify-center text-[#006B5B]">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-xs sm:text-sm text-[#1E1C10] block">
                  Open to Pre-Placement Internships?
                </span>
                <span className="text-[11px] text-[#4B4731]">
                  Available for Jan–June 2026 (6 months duration)
                </span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={openToInternship}
                onChange={(e) => setOpenToInternship(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-[#E0DAC7] rounded-full peer peer-checked:bg-[#00F5D4] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-6 shadow-inner" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
