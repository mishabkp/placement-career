import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-12 px-6', className)}>
      {icon && (
        <div
          className="mb-4 p-4 bg-[#FBF3E1] rounded-xl text-[#B8842A] border border-[#E7D2A0]"
        >
          {icon}
        </div>
      )}
      <h3 className="text-base font-display font-semibold text-[#1A1712]">{title}</h3>
      {description && (
        <p className="mt-1.5 text-xs sm:text-sm text-[#74695A] max-w-sm leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

