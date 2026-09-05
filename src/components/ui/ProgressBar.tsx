import { cn } from '../../utils/cn';

interface ProgressBarProps {
  value: number;
  color?: 'cyprus' | 'mint' | 'green' | 'amber' | 'red' | 'blue' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  color = 'cyprus',
  size = 'md',
  showLabel = false,
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  const fillGradients: Record<string, string> = {
    cyprus: 'bg-gradient-to-r from-[#96691F] via-[#B8842A] to-[#D8AA55]',
    mint: 'bg-gradient-to-r from-[#14665E] via-[#1E7F76] to-[#3FA89B]',
    green: 'bg-gradient-to-r from-[#14665E] via-[#1E7F76] to-[#3FA89B]',
    amber: 'bg-gradient-to-r from-[#96691F] via-[#B8842A] to-[#D8AA55]',
    red: 'bg-gradient-to-r from-rose-700 via-rose-500 to-rose-400',
    blue: 'bg-gradient-to-r from-[#14665E] via-[#1E7F76] to-[#3FA89B]',
    purple: 'bg-gradient-to-r from-[#4C3FA0] via-[#6D5AC4] to-[#9E8EE0]',
  };

  const sizes: Record<string, string> = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-medium text-[#74695A]">Progress</span>
          <span className="text-xs font-bold font-mono text-[#B8842A]">{clamped}%</span>
        </div>
      )}
      <div
        className={cn('w-full rounded-full overflow-hidden glass-track', sizes[size])}
      >
        <div
          className={cn(
            fillGradients[color] || fillGradients.cyprus,
            sizes[size],
            'rounded-full transition-all duration-700 ease-out fill-shine relative',
          )}
          style={{ width: `${clamped}%` }}
        >
          {/* Glow tip */}
          {clamped > 5 && (
            <div className="absolute right-0 top-0 bottom-0 w-3 rounded-full fill-glow-tip" />
          )}
        </div>
      </div>
    </div>
  );
}

