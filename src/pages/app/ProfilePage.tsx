import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SmartToy, Verified } from '../../components/icons/StitchIcons';
import {
  Eye,
  Save,
  Camera,
  Star,
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
  Wand2,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

interface BranchProfileConfig {
  degree: string;
  rollNo: string;
  trackBadge: string;
  targetRole: string;
  defaultBio: string;
  polishedBio: string;
}

const BRANCH_PROFILE_DATA: Record<string, BranchProfileConfig> = {
  CSE: {
    degree: 'B.Tech Computer Science & Engineering',
    rollNo: 'B220541CS',
    trackBadge: 'Full-Stack Track',
    targetRole: 'Full Stack Software Engineer',
    defaultBio:
      'B.Tech CSE student at NIT Calicut, passionate about full-stack development and open source. Exploring React, Node.js, and cloud architectures.',
    polishedBio:
      'Final-year CS student at NIT Calicut specializing in modern web ecosystems, scalable backend microservices, and reactive UIs.',
  },
  ECE: {
    degree: 'B.Tech Electronics & Communication Engineering',
    rollNo: 'B220412EC',
    trackBadge: 'VLSI & Embedded Track',
    targetRole: 'VLSI & Embedded Firmware Engineer',
    defaultBio:
      'B.Tech ECE student at NIT Calicut, passionate about digital VLSI design and embedded firmware. Experienced with Verilog, STM32, and FreeRTOS.',
    polishedBio:
      'Final-year ECE student at NIT Calicut specializing in RTL synthesis, digital logic verification, and low-power embedded firmware.',
  },
  MECH: {
    degree: 'B.Tech Mechanical Engineering',
    rollNo: 'B220308ME',
    trackBadge: 'CAD/CAM & FEA Track',
    targetRole: 'CAD/CAM & Mechanical Design Engineer',
    defaultBio:
      'B.Tech Mechanical student at NIT Calicut, specializing in 3D CAD modeling, FEA simulation, and GD&T.',
    polishedBio:
      'Final-year Mech student at NIT Calicut with proficiency in parametric 3D CAD, nonlinear FEA simulations, and ASME Y14.5 standards.',
  },
  EEE: {
    degree: 'B.Tech Electrical & Electronics Engineering',
    rollNo: 'B220215EE',
    trackBadge: 'EV & Power Systems Track',
    targetRole: 'EV Powertrain & Power Electronics Engineer',
    defaultBio:
      'B.Tech EEE student at NIT Calicut, passionate about EV powertrains and power electronics converters.',
    polishedBio:
      'Final-year EE student at NIT Calicut specializing in EV powertrain design, DC-DC converters, and Field-Oriented Control.',
  },
  CIVIL: {
    degree: 'B.Tech Civil Engineering',
    rollNo: 'B220104CE',
    trackBadge: 'Structural BIM Track',
    targetRole: 'Structural Analysis & BIM Engineer',
    defaultBio:
      'B.Tech Civil student at NIT Calicut, specializing in structural analysis (IS 456), Revit BIM, and Primavera P6.',
    polishedBio:
      'Final-year Civil student at NIT Calicut proficient in limit state design, 3D BIM coordination in Revit/Navisworks, and CPM project controls.',
  },
};

const PROFILE_COMPLETIONS = [
  { label: 'Basic Details', done: true },
  { label: 'Academics', done: true },
  { label: 'Resume / Projects', done: false },
  { label: 'LinkedIn / Socials', done: false },
];

export default function ProfilePage() {
  const { user, studentBranch } = useAuth();
  const profileConfig =
    BRANCH_PROFILE_DATA[studentBranch] || BRANCH_PROFILE_DATA.CSE;

  const [name, setName] = useState(() => user?.name || 'Arjun Menon');
  const [email, setEmail] = useState(
    () => user?.email || 'arjun.menon@example.com'
  );
  const [phone, setPhone] = useState('+91 98470 12345');
  const [college, setCollege] = useState(() => user?.college || 'NIT Calicut');
  const [degree, setDegree] = useState(profileConfig.degree);
  const [rollNo, setRollNo] = useState(profileConfig.rollNo);
  const [gradYear, setGradYear] = useState('2026');
  const [cgpa, setCgpa] = useState('8.6 / 10.0');
  const [bio, setBio] = useState(profileConfig.defaultBio);
  const [isPolishing, setIsPolishing] = useState(false);
  const [targetRole, setTargetRole] = useState(profileConfig.targetRole);
  const [ctcValue, setCtcValue] = useState(12);
  const [locations, setLocations] = useState(['Bangalore', 'Kochi', 'Remote']);
  const [newCity, setNewCity] = useState('');
  const [showAddCity, setShowAddCity] = useState(false);
  const [openToInternship, setOpenToInternship] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setDegree(profileConfig.degree);
    setRollNo(profileConfig.rollNo);
    setBio(profileConfig.defaultBio);
    setTargetRole(profileConfig.targetRole);
    if (user?.name) setName(user.name);
    if (user?.email) setEmail(user.email);
    if (user?.college) setCollege(user.college);
  }, [studentBranch, profileConfig, user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = () => showToast('Profile saved successfully!');

  const handleAiPolish = () => {
    setIsPolishing(true);
    setTimeout(() => {
      setBio(profileConfig.polishedBio);
      setIsPolishing(false);
      showToast('Bio polished with AI!');
    }, 850);
  };

  const completedItems = PROFILE_COMPLETIONS.filter((i) => i.done).length;
  const strengthPercent = Math.round(
    (completedItems / PROFILE_COMPLETIONS.length) * 100
  );

  const inputCls =
    'w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF3DF]/70 text-[#1E1C10] font-medium text-sm border border-[#CDC7AA]/40 focus:bg-white focus:border-[#6A5F00] outline-none transition-colors';

  return (
    <div className="space-y-5 pb-16 w-full font-sans text-[#1E1C10]">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border border-[#FFE600]/40">
          <SmartToy className="h-4 w-4 text-[#FFE600]" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-[#7C775F] uppercase tracking-widest mb-0.5">
            Account
          </p>
          <h1 className="font-heading text-2xl font-black text-[#1A1A1A]">
            Student Profile
          </h1>
          <p className="text-sm text-[#7C775F] mt-0.5">
            Manage your personal, academic, and career info
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => showToast('Public recruiter preview generated!')}
            className="px-4 py-2 rounded-full bg-[#FAF3DF] font-bold text-xs text-[#1E1C10] border border-[#CDC7AA]/40 flex items-center gap-1.5 hover:bg-[#EEE8D4] active:scale-95 transition-all"
          >
            <Eye className="h-3.5 w-3.5 text-[#6A5F00]" />
            Preview
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-xs flex items-center gap-1.5 hover:brightness-105 hover:shadow-md active:scale-95 transition-all"
          >
            <Save className="h-3.5 w-3.5" />
            Save
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Identity */}
        <div className="flex flex-col gap-4">
          {/* Avatar + name card */}
          <div className="bg-white rounded-2xl p-5 border border-[#CDC7AA]/30 shadow-sm flex flex-col items-center text-center gap-3">
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#FFE600] to-[#00F5D4] p-1 shadow-md">
                <div className="w-full h-full rounded-xl bg-[#FFE600] flex items-center justify-center font-heading text-2xl font-black text-[#1A1A1A]">
                  {name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
              </div>
              <button
                type="button"
                onClick={() => showToast('Photo upload opened')}
                className="absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-full bg-[#FFE600] flex items-center justify-center shadow-md border-2 border-white hover:scale-110 active:scale-95 transition-all"
              >
                <Camera className="h-3.5 w-3.5 text-[#1A1A1A]" />
              </button>
            </div>
            <div>
              <div className="flex items-center gap-1.5 justify-center">
                <h2 className="font-heading text-lg font-black text-[#1A1A1A]">
                  {name}
                </h2>
                <Verified className="h-4 w-4 text-[#006B5B]" />
              </div>
              <p className="text-xs text-[#7C775F] mt-0.5">{email}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-1.5">
              <span className="px-2.5 py-1 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-[11px]">
                {studentBranch}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#FAF3DF] text-[#1E1C10] font-bold text-[11px] border border-[#CDC7AA]/30">
                Batch {gradYear}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#9B5DE5]/15 text-[#6B21A8] font-bold text-[11px]">
                {profileConfig.trackBadge}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#006B5B] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#006B5B] animate-ping" />
              Active &middot; {college}
            </div>
          </div>

          {/* Profile Strength */}
          <div className="bg-white rounded-2xl p-4 border border-[#CDC7AA]/30 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-[#6A5F00] fill-[#FFE600]" />
                <span className="font-bold text-sm text-[#1A1A1A]">
                  Profile Strength
                </span>
              </div>
              <span className="font-black text-base text-[#006B5B]">
                {strengthPercent}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#FAF3DF] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FFE600] to-[#006B5B] transition-all duration-700"
                style={{ width: `${strengthPercent}%` }}
              />
            </div>
            <div className="space-y-1.5">
              {PROFILE_COMPLETIONS.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-xs font-medium"
                >
                  {item.done ? (
                    <CheckCircle className="h-3.5 w-3.5 text-[#006B5B]" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 text-[#7C775F]" />
                  )}
                  <span
                    className={item.done ? 'text-[#1A1A1A]' : 'text-[#7C775F]'}
                  >
                    {item.label}
                  </span>
                  {item.done && (
                    <span className="ml-auto text-[#006B5B] font-bold">Done</span>
                  )}
                </div>
              ))}
            </div>
            <div className="text-[11px] text-[#7C775F] p-2.5 bg-[#FAF3DF] rounded-xl border border-[#CDC7AA]/30">
              Sync LinkedIn & GitHub to reach 100% readiness
            </div>
          </div>
        </div>

        {/* Right: Forms */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Academic & Personal */}
          <div className="bg-white rounded-2xl p-5 border border-[#CDC7AA]/30 shadow-sm">
            <h3 className="font-heading text-base font-black text-[#1A1A1A] mb-4">
              Academic & Personal Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {([
                {
                  label: 'Full Name',
                  value: name,
                  setter: setName,
                  icon: <User className="h-4 w-4" />,
                  type: 'text',
                },
                {
                  label: 'Email Address',
                  value: email,
                  setter: setEmail,
                  icon: <Mail className="h-4 w-4" />,
                  type: 'email',
                },
                {
                  label: 'Phone',
                  value: phone,
                  setter: setPhone,
                  icon: <Phone className="h-4 w-4" />,
                  type: 'tel',
                },
                {
                  label: 'College',
                  value: college,
                  setter: setCollege,
                  icon: <Building className="h-4 w-4" />,
                  type: 'text',
                },
                {
                  label: 'Degree & Branch',
                  value: degree,
                  setter: setDegree,
                  icon: <GraduationCap className="h-4 w-4" />,
                  type: 'text',
                },
                {
                  label: 'Roll Number',
                  value: rollNo,
                  setter: setRollNo,
                  icon: <Hash className="h-4 w-4" />,
                  type: 'text',
                },
                {
                  label: 'CGPA',
                  value: cgpa,
                  setter: setCgpa,
                  icon: <Star className="h-4 w-4" />,
                  type: 'text',
                },
              ] as { label: string; value: string; setter: (v: string) => void; icon: React.ReactNode; type: string }[]).map(
                (field) => (
                  <div key={field.label} className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                      {field.label}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C775F]">
                        {field.icon}
                      </span>
                      <input
                        type={field.type}
                        value={field.value}
                        onChange={(e) => field.setter(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                  </div>
                )
              )}
              {/* Grad Year */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                  Graduation Year
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C775F]">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <select
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                    className={inputCls + ' cursor-pointer'}
                  >
                    <option>2025</option>
                    <option>2026</option>
                    <option>2027</option>
                    <option>2028</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Bio + Career Prefs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Bio */}
            <div className="bg-white rounded-2xl p-4 border border-[#CDC7AA]/30 shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#1A1A1A]">Profile Bio</h3>
                <span className="text-[11px] text-[#7C775F]">
                  {bio.length}/280
                </span>
              </div>
              <textarea
                rows={5}
                maxLength={280}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#FAF3DF]/60 text-[#1E1C10] text-xs sm:text-sm resize-none border border-[#CDC7AA]/40 focus:bg-white focus:border-[#6A5F00] outline-none transition-colors leading-relaxed"
              />
              <button
                type="button"
                onClick={handleAiPolish}
                disabled={isPolishing}
                className="self-start px-3.5 py-2 rounded-full bg-[#9B5DE5]/15 text-[#6B21A8] font-bold text-xs flex items-center gap-1.5 hover:bg-[#9B5DE5]/25 active:scale-95 transition-all disabled:opacity-50"
              >
                <Wand2
                  className={`h-3.5 w-3.5 ${isPolishing ? 'animate-spin' : ''}`}
                />
                {isPolishing ? 'Polishing...' : 'AI Polish'}
              </button>
            </div>

            {/* Career Prefs */}
            <div className="bg-white rounded-2xl p-4 border border-[#CDC7AA]/30 shadow-sm flex flex-col gap-4">
              <h3 className="font-bold text-sm text-[#1A1A1A]">
                Career Preferences
              </h3>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                  Target Role
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C775F]">
                    <Briefcase className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <label className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                    Expected CTC
                  </label>
                  <span className="text-xs font-black text-[#006B5B]">
                    {Math.max(6, ctcValue - 4)}&ndash;{ctcValue} LPA
                  </span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={35}
                  step={1}
                  value={ctcValue}
                  onChange={(e) => setCtcValue(Number(e.target.value))}
                  className="w-full accent-[#006B5B] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-[#7C775F] uppercase tracking-wider">
                  Preferred Locations
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {locations.map((loc) => (
                    <span
                      key={loc}
                      className="px-2.5 py-1 rounded-full bg-[#FAF3DF] text-[#1E1C10] font-bold text-[11px] flex items-center gap-1 border border-[#CDC7AA]/30"
                    >
                      {loc}
                      <button
                        type="button"
                        onClick={() =>
                          setLocations((prev) => prev.filter((l) => l !== loc))
                        }
                        className="hover:text-[#BA1A1A]"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {showAddCity ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        placeholder="City..."
                        className="px-2.5 py-1 text-xs rounded-full bg-white border border-[#CDC7AA] outline-none w-20"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            if (
                              newCity.trim() &&
                              !locations.includes(newCity.trim())
                            )
                              setLocations((prev) => [...prev, newCity.trim()]);
                            setNewCity('');
                            setShowAddCity(false);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newCity.trim())
                            setLocations((prev) => [...prev, newCity.trim()]);
                          setNewCity('');
                          setShowAddCity(false);
                        }}
                        className="px-2 py-1 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-xs"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddCity(false)}
                      >
                        <X className="h-3.5 w-3.5 text-[#7C775F]" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowAddCity(true)}
                      className="px-2.5 py-1 rounded-full bg-white text-[#6A5F00] font-bold text-[11px] flex items-center gap-1 border border-[#CDC7AA]/40 hover:bg-[#FAF3DF] transition-colors"
                    >
                      <Plus className="h-3 w-3" /> Add
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF3DF] border border-[#CDC7AA]/30">
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">
                    Open to Internships
                  </p>
                  <p className="text-[11px] text-[#7C775F]">
                    Jan&ndash;Jun 2026 (6 months)
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={openToInternship}
                    onChange={(e) => setOpenToInternship(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-[#E0DAC7] rounded-full peer peer-checked:bg-[#00F5D4] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5 shadow-inner" />
                </label>
              </div>
            </div>
          </div>

          {/* Verification Banner */}
          <div className="bg-[#FAF3DF] rounded-2xl p-4 border border-[#CDC7AA]/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#26FEDC] flex items-center justify-center text-[#007261] shrink-0">
                <Verified className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1A1A1A]">
                  College Verification
                </p>
                <p className="text-[11px] text-[#4B4731]">
                  Verified by TPO &middot; Training & Placement Cell, NITC
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('Certificate downloaded!')}
              className="px-3.5 py-1.5 rounded-full bg-white text-[#1E1C10] font-bold text-xs border border-[#CDC7AA]/40 hover:bg-white/80 active:scale-95 transition-all shrink-0"
            >
              View Cert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
