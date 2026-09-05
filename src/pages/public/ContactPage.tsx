import { useState } from 'react';
import {
  Send,
  CheckCircle2,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Sparkles,
  ArrowRight,
  School,
  Clock,
} from 'lucide-react';
import { SmartToy, Github, Linkedin } from '../../components/icons/StitchIcons';
import { PublicNavbar } from '../../components/layouts/PublicNavbar';
import { PublicFooter } from '../../components/layouts/PublicFooter';
import { TEAM_MEMBERS } from '../../data/team';

// Card accent color & glassmorphic styles matching Placement Pal theme
const MEMBER_ACCENTS = [
  {
    name: 'Mishab KP',
    primaryColor: '#FFE600',
    darkText: '#6A5F00',
    borderGlow: 'hover:border-[#FFE600] hover:shadow-[0_12px_40px_-10px_rgba(255,230,0,0.5)]',
    badgeBg: 'bg-[#FFE600]/25 text-[#1A1A1A] border-[#FFE600]/50',
    avatarRing: 'from-[#FFE600] via-[#FAF3DF] to-[#FFD000]',
    dotColor: 'bg-[#FFE600]',
    chatBtn: 'bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-md shadow-emerald-500/20',
    callBtn: 'bg-[#FAF3DF] hover:bg-[#FFE600] text-[#1A1A1A] border border-[#CDC7AA]/50',
  },
  {
    name: 'Shareef KC',
    primaryColor: '#00F5D4',
    darkText: '#006B5B',
    borderGlow: 'hover:border-[#00F5D4] hover:shadow-[0_12px_40px_-10px_rgba(0,245,212,0.5)]',
    badgeBg: 'bg-[#00F5D4]/25 text-[#006B5B] border-[#00F5D4]/50',
    avatarRing: 'from-[#00F5D4] via-[#FAF3DF] to-[#00C4A7]',
    dotColor: 'bg-[#00F5D4]',
    chatBtn: 'bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-md shadow-emerald-500/20',
    callBtn: 'bg-[#FAF3DF] hover:bg-[#00F5D4] text-[#1A1A1A] border border-[#CDC7AA]/50',
  },
  {
    name: 'Fina Nargees',
    primaryColor: '#FF6B6B',
    darkText: '#BA1A1A',
    borderGlow: 'hover:border-[#FF6B6B] hover:shadow-[0_12px_40px_-10px_rgba(255,107,107,0.45)]',
    badgeBg: 'bg-[#FFDAD6] text-[#BA1A1A] border-[#FF6B6B]/40',
    avatarRing: 'from-[#FF6B6B] via-[#FAF3DF] to-[#FF8E8E]',
    dotColor: 'bg-[#FF6B6B]',
    chatBtn: 'bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-md shadow-emerald-500/20',
    callBtn: 'bg-[#FAF3DF] hover:bg-[#FFDAD6] text-[#BA1A1A] border border-[#CDC7AA]/50',
  },
  {
    name: 'Vimal KT',
    primaryColor: '#9B5DE5',
    darkText: '#6B21A8',
    borderGlow: 'hover:border-[#9B5DE5] hover:shadow-[0_12px_40px_-10px_rgba(155,93,229,0.45)]',
    badgeBg: 'bg-[#9B5DE5]/20 text-[#6B21A8] border-[#9B5DE5]/40',
    avatarRing: 'from-[#9B5DE5] via-[#FAF3DF] to-[#B388FF]',
    dotColor: 'bg-[#9B5DE5]',
    chatBtn: 'bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-md shadow-emerald-500/20',
    callBtn: 'bg-[#FAF3DF] hover:bg-[#E9D5FF] text-[#6B21A8] border border-[#CDC7AA]/50',
  },
];

const QUICK_CONTACTS = [
  {
    icon: Mail,
    label: 'Official Project Mail',
    value: 'placementpal@mgmce.ac.in',
    href: 'mailto:placementpal@mgmce.ac.in',
    badge: 'Response in 24h',
    badgeColor: 'bg-[#FFE600]/30 text-[#6A5F00]',
    accent: '#FFE600',
  },
  {
    icon: School,
    label: 'College Department',
    value: 'CSE Dept • MGM College, Valanchery',
    href: 'https://maps.google.com/?q=MGM+College+of+Engineering+Valanchery',
    badge: 'KTU S8 Capstone',
    badgeColor: 'bg-[#00F5D4]/30 text-[#006B5B]',
    accent: '#00F5D4',
  },
  {
    icon: Github,
    label: 'Open Source Codebase',
    value: 'github.com/placement-pal',
    href: 'https://github.com',
    badge: 'MIT License',
    badgeColor: 'bg-[#FAF3DF] text-[#1E1C10]',
    accent: '#1E1C10',
  },
  {
    icon: Linkedin,
    label: 'Placement Cell Network',
    value: 'Placement Pal — Campus 2026',
    href: 'https://linkedin.com',
    badge: 'Connect',
    badgeColor: 'bg-[#9B5DE5]/20 text-[#6B21A8]',
    accent: '#9B5DE5',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FFF9E9] text-[#1E1C10] selection:bg-[#FFE600] selection:text-[#1A1A1A] relative overflow-x-hidden">
      {/* ════ Ambient Floating Frosted Blur Orbs ════ */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 -left-20 w-[550px] h-[550px] bg-[#FFE600]/25 rounded-full blur-[110px]" />
        <div className="absolute top-[35%] -right-20 w-[600px] h-[600px] bg-[#00F5D4]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-[25%] w-[500px] h-[500px] bg-[#FF6B6B]/15 rounded-full blur-[100px]" />
        <div className="absolute top-[60%] left-10 w-[400px] h-[400px] bg-[#9B5DE5]/12 rounded-full blur-[90px]" />
      </div>

      <PublicNavbar />

      <main className="flex-1">
        {/* ══════════════ 1. HERO SECTION ══════════════ */}
        <section className="relative pt-12 pb-10 lg:pt-16 lg:pb-14 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-5">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-white/80 backdrop-blur-xl text-[#1E1C10] border-2 border-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-transform hover:scale-105">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F5D4] animate-ping" />
              <Sparkles className="h-3.5 w-3.5 text-[#6A5F00]" />
              <span className="uppercase tracking-wider font-extrabold text-[#1A1A1A]">
                We're Here For You • 24/7 Response
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[#1E1C10] tracking-tight leading-[1.1]">
              Get in Touch with the{' '}
              <span className="px-3 py-1 bg-[#FFE600] text-[#1A1A1A] rounded-2xl shadow-sm inline-block transform -rotate-1 hover:rotate-0 transition-transform">
                Placement Pal
              </span>{' '}
              Team
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#4B4731] font-medium leading-relaxed max-w-2xl">
              Have questions about features, college recruitment partnerships, or need assistance? Reach out directly to any core team member via WhatsApp or phone call!
            </p>

            {/* Quick Mascot Floating Banner */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/75 backdrop-blur-xl border-2 border-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
              <div className="w-8 h-8 rounded-xl bg-[#FFE600] flex items-center justify-center text-[#1A1A1A] shadow-xs">
                <SmartToy className="h-5 w-5 text-[#1A1A1A]" />
              </div>
              <span className="text-xs font-bold text-[#1E1C10]">
                Pal-Bot Tip: "Click <strong className="text-[#006B5B]">Chat</strong> for instant WhatsApp connection with the team!"
              </span>
            </div>
          </div>
        </section>

        {/* ══════════════ 2. TEAM DIRECT CONTACT CARDS (GLASSMORPHISM) ══════════════ */}
        <section className="py-8 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#CDC7AA]/40">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-[#CDC7AA]/40 text-xs font-black text-[#6A5F00] uppercase tracking-wider mb-2">
                <Phone className="h-3.5 w-3.5 text-[#006B5B]" />
                Direct Team Access
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#1E1C10]">
                Connect with Core Developers
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#4B4731] bg-white/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white shadow-xs">
              <Clock className="h-4 w-4 text-[#006B5B]" />
              <span>Direct WhatsApp &amp; Call Supported</span>
            </div>
          </div>

          {/* 4 Team Member Glass Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, i) => {
              const accent = MEMBER_ACCENTS[i % MEMBER_ACCENTS.length];

              return (
                <div
                  key={member.name}
                  className={`group relative rounded-3xl p-6 sm:p-7 border-2 border-white/80 bg-white/65 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2.5 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,0,0,0.05)] ${accent.borderGlow}`}
                >
                  {/* Subtle inner top glare */}
                  <div className="absolute inset-x-0 top-0 h-28 rounded-t-3xl bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />

                  <div className="relative z-10">
                    {/* Header: Photo + Status */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="relative">
                        <div className={`w-20 h-20 rounded-2xl p-1 bg-gradient-to-tr ${accent.avatarRing} shadow-md`}>
                          <div className="w-full h-full rounded-xl bg-[#FAF3DF] overflow-hidden flex items-center justify-center relative">
                            <span className="font-heading text-2xl font-black text-[#1E1C10]">
                              {member.initial}
                            </span>
                            <img
                              src={member.image}
                              alt={member.name}
                              className="absolute inset-0 w-full h-full object-cover object-top"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                        </div>
                        {/* Live active dot */}
                        <span
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${accent.dotColor} border-2 border-white shadow-md animate-pulse`}
                          title="Online & Ready"
                        />
                      </div>

                      {/* Role Pill */}
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border shadow-2xs uppercase tracking-wider ${accent.badgeBg}`}>
                        {member.role.split(' ')[0]}
                      </span>
                    </div>

                    {/* Name & Role */}
                    <h3 className="font-heading text-xl font-black text-[#1E1C10] group-hover:text-[#006B5B] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-[#6A5F00] mt-0.5">
                      {member.role}
                    </p>
                    <p className="text-[11px] text-[#7C775F] font-semibold mt-1">
                      {member.dept}
                    </p>

                    {/* Phone Pill Container */}
                    <div className="mt-4 p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-[#CDC7AA]/40 shadow-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-[#006B5B]" />
                        <span className="font-mono text-xs font-bold text-[#1E1C10] tracking-tight">
                          {member.phone}
                        </span>
                      </div>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-[#FAF3DF] text-[#6A5F00]">
                        Verified
                      </span>
                    </div>
                  </div>

                  {/* Actions: Direct WhatsApp & Call */}
                  <div className="relative z-10 grid grid-cols-2 gap-2.5 pt-5 mt-4 border-t border-[#CDC7AA]/25">
                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(member.name)},%20I%20came%20across%20Placement%20Pal%20and%20wanted%20to%20connect!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl font-black text-xs transition-transform active:scale-95 ${accent.chatBtn}`}
                      title={`Chat with ${member.name} on WhatsApp`}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Phone Call */}
                    <a
                      href={`tel:${member.phone}`}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl font-bold text-xs transition-all active:scale-95 ${accent.callBtn}`}
                      title={`Call ${member.name} directly`}
                    >
                      <Phone className="h-3.5 w-3.5" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════════ 3. INTERACTIVE CONTACT FORM & INFO BENTO ══════════════ */}
        <section className="py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Info Bento: Channels & Campus (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="rounded-3xl p-8 bg-white/70 backdrop-blur-2xl border-2 border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.05)] flex-1 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF3DF] text-[#6A5F00] font-black text-xs border border-[#CDC7AA]/40 mb-3">
                    <MapPin className="h-3.5 w-3.5" />
                    CAMPUS &amp; CHANNELS
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#1E1C10]">
                    Placement Pal Headquarters
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B4731] font-medium leading-relaxed mt-2 mb-6">
                    Placement Pal is an academic capstone innovation engineered at <strong>MGM College of Engineering and Pharmaceutical Sciences, Valanchery</strong>.
                  </p>

                  {/* Channel Tiles */}
                  <div className="space-y-3">
                    {QUICK_CONTACTS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="group p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#CDC7AA]/40 hover:border-[#FFE600] transition-all flex items-center justify-between shadow-2xs hover:shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#FAF3DF] border border-[#CDC7AA]/40 flex items-center justify-center text-[#1A1A1A] group-hover:scale-110 transition-transform">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#7C775F]">
                                {item.label}
                              </p>
                              <p className="text-xs font-bold text-[#1E1C10] group-hover:text-[#006B5B] transition-colors">
                                {item.value}
                              </p>
                            </div>
                          </div>
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* College Info Callout */}
                <div className="mt-6 p-4 rounded-2xl bg-[#FAF3DF]/90 border border-[#CDC7AA]/40 flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFE600] flex items-center justify-center text-[#1A1A1A] shrink-0 shadow-xs">
                    <School className="h-6 w-6 text-[#1A1A1A]" />
                  </div>
                  <div>
                    <h5 className="font-heading font-black text-xs text-[#1E1C10]">
                      Department of Computer Science &amp; Engineering
                    </h5>
                    <p className="text-[11px] text-[#4B4731] font-semibold">
                      APJ Abdul Kalam Technological University (KTU) • Batch 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Glassmorphism Message Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl p-8 sm:p-10 bg-white/75 backdrop-blur-2xl border-2 border-white shadow-[0_16px_50px_rgba(0,0,0,0.06)] h-full flex flex-col justify-between overflow-hidden">
                {/* Accent glow on top right */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#FFE600]/25 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-[#FAF3DF] text-[#006B5B] font-black text-xs border border-[#CDC7AA]/40 inline-block mb-2">
                        MESSAGE CONCIERGE
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#1E1C10]">
                        Send Us a Direct Message
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4B4731] font-medium mt-1">
                        We respond rapidly to all college placement inquiries and feature requests.
                      </p>
                    </div>
                    <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-[#FFE600] items-center justify-center text-[#1A1A1A] shadow-xs">
                      <Send className="h-6 w-6 text-[#1A1A1A]" />
                    </div>
                  </div>

                  {sent ? (
                    <div className="py-14 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-3xl bg-[#00F5D4]/30 border-2 border-[#00F5D4] text-[#006B5B] flex items-center justify-center shadow-lg animate-bounce">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h4 className="font-heading text-2xl font-black text-[#1E1C10]">
                        Message Delivered Successfully! 🎉
                      </h4>
                      <p className="text-sm text-[#4B4731] max-w-md font-medium">
                        Thank you for contacting Placement Pal. One of our team members (Mishab, Shareef, Fina, or Vimal) will get back to you shortly!
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black text-[#1E1C10] uppercase tracking-wider mb-1.5">
                            Your Name *
                          </label>
                          <input
                            required
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full px-4 py-3 rounded-2xl bg-white/90 border-2 border-[#CDC7AA]/50 focus:border-[#FFE600] focus:ring-2 focus:ring-[#FFE600]/30 outline-none text-sm font-semibold text-[#1E1C10] placeholder-[#7C775F]/60 transition-all shadow-2xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-black text-[#1E1C10] uppercase tracking-wider mb-1.5">
                            Email Address *
                          </label>
                          <input
                            required
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                            placeholder="rahul@college.edu"
                            className="w-full px-4 py-3 rounded-2xl bg-white/90 border-2 border-[#CDC7AA]/50 focus:border-[#FFE600] focus:ring-2 focus:ring-[#FFE600]/30 outline-none text-sm font-semibold text-[#1E1C10] placeholder-[#7C775F]/60 transition-all shadow-2xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-black text-[#1E1C10] uppercase tracking-wider mb-1.5">
                          Subject / Topic
                        </label>
                        <input
                          type="text"
                          value={form.subject}
                          onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                          placeholder="e.g. Placement Cell Demo / Feature Feedback"
                          className="w-full px-4 py-3 rounded-2xl bg-white/90 border-2 border-[#CDC7AA]/50 focus:border-[#FFE600] focus:ring-2 focus:ring-[#FFE600]/30 outline-none text-sm font-semibold text-[#1E1C10] placeholder-[#7C775F]/60 transition-all shadow-2xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-[#1E1C10] uppercase tracking-wider mb-1.5">
                          Your Message *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={form.message}
                          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                          placeholder="Write your thoughts or questions here..."
                          className="w-full px-4 py-3 rounded-2xl bg-white/90 border-2 border-[#CDC7AA]/50 focus:border-[#FFE600] focus:ring-2 focus:ring-[#FFE600]/30 outline-none text-sm font-semibold text-[#1E1C10] placeholder-[#7C775F]/60 transition-all shadow-2xs resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 px-6 rounded-2xl bg-[#FFE600] hover:bg-[#DEC800] text-[#1A1A1A] font-black text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 border border-[#CDC7AA]/40"
                      >
                        <Send className="h-4 w-4 text-[#1A1A1A]" />
                        <span>Send Message to Team</span>
                      </button>
                    </form>
                  )}
                </div>

                <div className="relative z-10 pt-4 mt-6 border-t border-[#CDC7AA]/30 flex flex-wrap items-center justify-between text-xs text-[#7C775F] font-semibold gap-2">
                  <span>🔒 End-to-end direct team delivery</span>
                  <span>Average response time: &lt; 2 hours</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ 4. BOTTOM FLOATING INTERACTIVE BANNER ══════════════ */}
        <section className="py-10 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full">
          <div className="bg-[#1A1A1A] text-white rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-[#FFE600]/40 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="flex items-center gap-4 relative z-10 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#FFE600] text-[#1A1A1A] flex items-center justify-center shrink-0 shadow-md">
                <SmartToy className="h-8 w-8 text-[#1A1A1A]" />
              </div>
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-black text-white">
                  Want to Experience Placement Pal in Action?
                </h3>
                <p className="text-xs sm:text-sm text-[#CDC7AA] font-medium mt-0.5">
                  Explore all 14 intelligent career preparation modules or try the live interactive dashboard.
                </p>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-3 shrink-0">
              <a
                href="/register"
                className="px-6 py-3 rounded-full bg-[#FFE600] hover:bg-[#DEC800] text-[#1A1A1A] font-black text-xs shadow-md transition-transform active:scale-95 flex items-center gap-2"
              >
                <span>Try Demo Free</span>
                <ArrowRight className="h-4 w-4 text-[#1A1A1A]" />
              </a>
              <a
                href="/features"
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10"
              >
                View Features
              </a>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
