import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'cyprus' | 'sand' | 'mint' | 'charcoal' | 'amazon' | 'prime' | 'dark' | 'coral' | 'lavender';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  const variants: Record<string, string> = {
    // Stitch Sunshine Yellow
    default: 'bg-[#FFE600] text-[#726600] font-bold shadow-sm',
    cyprus: 'bg-[#FFE600] text-[#726600] font-bold shadow-sm',
    success: 'bg-[#00F5D4]/25 text-[#006B5B] font-bold border border-[#00F5D4]/40',
    amazon: 'bg-[#FFE600] text-[#726600] font-bold shadow-sm',
    prime: 'bg-[#FFE600] text-[#726600] font-bold shadow-sm',
    mint: 'bg-[#00F5D4]/25 text-[#006B5B] font-bold border border-[#00F5D4]/40',
    coral: 'bg-[#FF6B6B]/20 text-[#BA1A1A] font-bold border border-[#FF6B6B]/30',
    lavender: 'bg-[#9B5DE5]/20 text-[#9B5DE5] font-bold border border-[#9B5DE5]/30',

    // Informational & neutrals
    info: 'bg-[#00FEFF]/20 text-[#006A6A] font-bold border border-[#00FEFF]/40',
    purple: 'bg-[#9B5DE5]/20 text-[#9B5DE5] font-bold border border-[#9B5DE5]/30',
    charcoal: 'bg-[#F4EEDA] text-[#1E1C10] border border-[#CDC7AA] font-bold',
    sand: 'bg-[#FAF3DF] text-[#1E1C10] border border-[#CDC7AA] font-bold',
    dark: 'bg-[#1A1A1A] text-white font-bold',

    // Status
    warning: 'bg-[#FFE600]/40 text-[#726600] font-bold',
    danger: 'bg-[#FF6B6B]/20 text-[#BA1A1A] font-bold border border-[#FF6B6B]/30',
  };

  const sizes: Record<string, string> = {
    sm: 'px-3 py-0.5 text-xs',
    md: 'px-4 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium tracking-normal select-none',
        variants[variant] || variants.default,
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
