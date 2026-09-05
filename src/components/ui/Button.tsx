import { cn } from '../../utils/cn';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'white' | 'charcoal' | 'glow' | 'blue' | 'dark' | 'teal';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

  const variants: Record<string, string> = {
    // Stitch Sunshine Yellow primary button
    primary: cn(
      'bg-[#FFE600] text-[#1A1A1A] border border-[#E7D2A0]',
      'shadow-[0_4px_14px_rgba(255,230,0,0.4)]',
      'hover:bg-[#FDD835] hover:scale-105 active:scale-95',
    ),
    glow: cn(
      'bg-[#FFE600] text-[#1A1A1A] border border-[#E7D2A0]',
      'shadow-[0_4px_14px_rgba(255,230,0,0.5)]',
      'hover:scale-105 active:scale-95',
    ),
    blue: cn(
      'bg-[#FFE600] text-[#1A1A1A] border border-[#E7D2A0]',
      'shadow-[0_4px_14px_rgba(255,230,0,0.4)]',
      'hover:scale-105 active:scale-95',
    ),
    secondary: cn(
      'bg-[#F4EEDA] text-[#1E1C10] border border-[#CDC7AA]',
      'hover:bg-[#EEE8D4] hover:scale-102 active:scale-98',
    ),
    teal: cn(
      'bg-[#00F5D4] text-[#1A1A1A] border border-[#00DFBC]',
      'shadow-sm hover:scale-105 active:scale-95',
    ),
    dark: cn(
      'bg-[#6A5F00] text-white border-none',
      'shadow-sm hover:bg-[#504700] hover:scale-105 active:scale-95',
    ),
    charcoal: cn(
      'bg-[#1A1A1A] text-white border-none',
      'shadow-sm hover:bg-black hover:scale-105 active:scale-95',
    ),
    outline: cn(
      'bg-transparent text-[#1E1C10] border-2 border-[#CDC7AA]',
      'hover:bg-[#FAF3DF] active:scale-98',
    ),
    ghost: cn(
      'bg-transparent text-[#4B4731]',
      'hover:bg-[#F4EEDA] hover:text-[#1E1C10]',
    ),
    white: cn(
      'bg-white text-[#1E1C10] border border-[#CDC7AA]',
      'shadow-sm hover:bg-[#FAF3DF]',
    ),
    danger: cn(
      'bg-[#FF6B6B] text-white shadow-sm',
      'hover:bg-[#E05353] active:scale-95',
    ),
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2 text-xs sm:text-sm',
    lg: 'px-6 py-2.5 text-sm sm:text-base',
  };

  return (
    <button
      className={cn(
        base,
        variants[variant] || variants.primary,
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : null}
      {children}
    </button>
  );
}
