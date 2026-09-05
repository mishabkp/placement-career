import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  badge?: ReactNode;
  className?: string;
}

export function PageHeader({ title, description, icon, actions, badge, className }: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6', className)}>
      <div className="flex items-start gap-3.5">
        {icon && (
          <div
            className="p-3 bg-[#FFE600] text-[#726600] rounded-2xl flex-shrink-0 mt-0.5 border border-[#CDC7AA]/70 shadow-sm"
          >
            {icon}
          </div>
        )}
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#1E1C10] tracking-tight">{title}</h1>
            {badge}
          </div>
          {description && (
            <p className="mt-1 text-xs sm:text-sm text-[#4B4731] font-medium max-w-2xl leading-relaxed">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0 mt-2 sm:mt-0">{actions}</div>}
    </div>
  );
}
