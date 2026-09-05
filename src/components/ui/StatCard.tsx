import { cn } from '../../utils/cn';
import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  color?: 'cyprus' | 'mint' | 'green' | 'amber' | 'blue' | 'purple' | 'red';
  className?: string;
}

export function StatCard({
  label,
  value,
  icon,
  change,
  changeType = 'neutral',
  color = 'cyprus',
  className,
}: StatCardProps) {
  const changeColors: Record<string, string> = {
    positive: 'text-[#3FA89B] font-semibold',
    negative: 'text-rose-400 font-semibold',
    neutral: 'text-[#8A8172] font-medium',
  };

  const iconThemes: Record<string, string> = {
    cyprus: 'bg-[#B8842A]/12 text-[#D8AA55] border-[#B8842A]/30',
    mint: 'bg-[#1E7F76]/12 text-[#3FA89B] border-[#1E7F76]/30',
    green: 'bg-[#1E7F76]/12 text-[#3FA89B] border-[#1E7F76]/30',
    amber: 'bg-[#B8842A]/12 text-[#D8AA55] border-[#B8842A]/30',
    blue: 'bg-[#1E7F76]/12 text-[#3FA89B] border-[#1E7F76]/30',
    purple: 'bg-[#6D5AC4]/12 text-[#9E8EE0] border-[#6D5AC4]/30',
    red: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  };

  const glowColors: Record<string, string> = {
    cyprus: 'via-[#B8842A]', mint: 'via-[#1E7F76]', green: 'via-[#1E7F76]',
    amber: 'via-[#B8842A]', blue: 'via-[#1E7F76]', purple: 'via-[#6D5AC4]', red: 'via-rose-400',
  };

  return (
    <div
      className={cn(
        'group glass-frost-hover animate-shimmer-border rounded-xl p-5 transition-all duration-300 relative overflow-hidden',
        className,
      )}
    >
      {/* Top accent line, colored on hover with glow */}
      <div className={cn(
        'absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300',
        glowColors[color] || glowColors.cyprus,
      )} />

      {/* Subtle inner glow orb */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#B8842A]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex items-start justify-between relative z-[1]">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-[#8A8172] uppercase tracking-wider truncate">{label}</p>
          <p className="mt-1.5 text-2xl sm:text-3xl font-stat font-bold text-white tracking-tight">{value}</p>
          {change && (
            <p className={cn('mt-1.5 text-xs', changeColors[changeType])}>
              {changeType === 'positive' && '↑ '}
              {changeType === 'negative' && '↓ '}
              {change}
            </p>
          )}
        </div>
        <div
          className={cn(
            'p-3 rounded-lg flex-shrink-0 ml-4 border backdrop-blur-sm',
            'group-hover:scale-110 group-hover:shadow-lg transition-all duration-300',
            iconThemes[color] || iconThemes.cyprus,
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

