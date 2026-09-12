import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import { 
  LayoutDashboard, User, FileText, Mic, Code2, 
  Map, TrendingUp, GitBranch, Globe, Search 
} from 'lucide-react';
import { cn } from '../../utils/cn';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 sm:pt-32">
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={() => setOpen(false)} 
      />
      
      <Command 
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-[#CDC7AA]/50 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center border-b border-[#CDC7AA]/30 px-3">
          <Search className="h-5 w-5 shrink-0 text-[#7C775F]" />
          <Command.Input 
            className="flex h-12 w-full rounded-md bg-transparent px-3 py-3 text-sm outline-none placeholder:text-[#7C775F] text-[#1E1C10]" 
            placeholder="Search functionality or pages..." 
            autoFocus
          />
        </div>
        
        <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
          <Command.Empty className="py-6 text-center text-sm text-[#7C775F]">
            No results found.
          </Command.Empty>
          
          <Command.Group heading="General" className="px-2 py-1.5 text-xs font-semibold text-[#7C775F]">
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/dashboard'))}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-xl px-2 py-2.5 text-sm font-medium text-[#1E1C10]",
                "hover:bg-[#FAF3DF] aria-selected:bg-[#FAF3DF]"
              )}
            >
              <LayoutDashboard className="h-4 w-4 text-[#6A5F00]" />
              Dashboard
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/profile'))}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-xl px-2 py-2.5 text-sm font-medium text-[#1E1C10]",
                "hover:bg-[#FAF3DF] aria-selected:bg-[#FAF3DF]"
              )}
            >
              <User className="h-4 w-4 text-[#6A5F00]" />
              Profile
            </Command.Item>
          </Command.Group>
          
          <Command.Group heading="Career & Preparation" className="px-2 py-1.5 text-xs font-semibold text-[#7C775F]">
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/career-roadmap'))}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-xl px-2 py-2.5 text-sm font-medium text-[#1E1C10]",
                "hover:bg-[#FAF3DF] aria-selected:bg-[#FAF3DF]"
              )}
            >
              <Map className="h-4 w-4 text-[#006B5B]" />
              Career Roadmap
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/skill-gap'))}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-xl px-2 py-2.5 text-sm font-medium text-[#1E1C10]",
                "hover:bg-[#FAF3DF] aria-selected:bg-[#FAF3DF]"
              )}
            >
              <TrendingUp className="h-4 w-4 text-[#006B5B]" />
              Skill Gap
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/resume'))}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-xl px-2 py-2.5 text-sm font-medium text-[#1E1C10]",
                "hover:bg-[#FAF3DF] aria-selected:bg-[#FAF3DF]"
              )}
            >
              <FileText className="h-4 w-4 text-[#FF6B6B]" />
              Resume Analyzer
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/interview'))}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-xl px-2 py-2.5 text-sm font-medium text-[#1E1C10]",
                "hover:bg-[#FAF3DF] aria-selected:bg-[#FAF3DF]"
              )}
            >
              <Mic className="h-4 w-4 text-[#9B5DE5]" />
              AI Interview
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/coding'))}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-xl px-2 py-2.5 text-sm font-medium text-[#1E1C10]",
                "hover:bg-[#FAF3DF] aria-selected:bg-[#FAF3DF]"
              )}
            >
              <Code2 className="h-4 w-4 text-[#6A5F00]" />
              Coding Practice
            </Command.Item>
          </Command.Group>
          
          <Command.Group heading="Analyzers" className="px-2 py-1.5 text-xs font-semibold text-[#7C775F]">
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/github'))}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-xl px-2 py-2.5 text-sm font-medium text-[#1E1C10]",
                "hover:bg-[#FAF3DF] aria-selected:bg-[#FAF3DF]"
              )}
            >
              <GitBranch className="h-4 w-4 text-[#1A1A1A]" />
              GitHub Analyzer
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/linkedin'))}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-xl px-2 py-2.5 text-sm font-medium text-[#1E1C10]",
                "hover:bg-[#FAF3DF] aria-selected:bg-[#FAF3DF]"
              )}
            >
              <Globe className="h-4 w-4 text-[#0077b5]" />
              LinkedIn Analyzer
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}

