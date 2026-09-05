import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Input({ label, error, helper, leftIcon, rightIcon, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-[#D8CFBC] mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B8842A]">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            'block w-full rounded-lg border bg-[#11151D] px-4 py-2.5 text-sm',
            'text-white placeholder:text-[#5C5240]',
            'border-[#232A38] focus:border-[#B8842A] focus:outline-none focus:ring-1 focus:ring-[#B8842A]/40',
            'disabled:bg-[#0D1117] disabled:text-[#5C5240] disabled:cursor-not-allowed transition-colors',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8A8172]">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-400 font-medium">{error}</p>}
      {helper && !error && <p className="mt-1.5 text-xs text-[#8A8172]">{helper}</p>}
    </div>
  );
}
