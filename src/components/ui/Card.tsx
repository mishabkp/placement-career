import { cn } from '../../utils/cn';
import type { CSSProperties, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  variant?: 'default' | 'cyprus' | 'sand' | 'glass' | 'dark' | 'frost';
  style?: CSSProperties;
}

export function Card({ children, className, padding = 'md', hover = true, variant = 'default', style }: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const variants = {
    // Stitch Theme: Clean, warm cream panels, rounded-3xl with subtle warm borders
    default: 'bg-white border border-[#CDC7AA]/40 text-[#1E1C10] shadow-sm',
    glass: 'bg-white/85 backdrop-blur-md border border-[#CDC7AA]/50 text-[#1E1C10] shadow-sm',
    cyprus: 'bg-[#FAF3DF] border border-[#CDC7AA]/50 text-[#1E1C10] shadow-sm',
    sand: 'bg-[#FAF3DF] border border-[#CDC7AA]/50 text-[#1E1C10] shadow-sm',
    frost: 'bg-white border border-[#CDC7AA]/40 text-[#1E1C10] shadow-sm',
    dark: 'bg-[#1A1A1A] border border-[#333] text-white shadow-md',
  };

  return (
    <div
      className={cn(
        'rounded-3xl transition-all duration-300 relative overflow-hidden',
        variants[variant],
        paddings[padding],
        hover && 'hover:-translate-y-1 hover:shadow-card-hover hover:border-[#FFE600]',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
