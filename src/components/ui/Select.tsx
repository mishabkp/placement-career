import type { SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}

export function Select({ label, options, error, placeholder, className, id, ...props }: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-[#D8CFBC] mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            'block w-full rounded-lg border border-[#232A38] bg-[#11151D] px-3.5 py-2.5 pr-9 text-sm text-white',
            'appearance-none focus:border-[#B8842A] focus:outline-none focus:ring-1 focus:ring-[#B8842A]/40',
            'disabled:bg-[#0D1117] disabled:text-[#5C5240] disabled:cursor-not-allowed transition-colors',
            error && 'border-rose-500',
            className,
          )}
          {...props}
        >
          {placeholder && <option value="" className="bg-[#11151D] text-[#5C5240]">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#11151D] text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#8A8172]">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
    </div>
  );
}
