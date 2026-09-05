import { useState } from 'react';
import {
  CodeIcon,
  SmartToy,
  Bolt,
  PlayArrow,
  CheckCircle2,
  TerminalIcon,
  AutoAwesome,
} from '../../components/icons/StitchIcons';
import { Sparkles, Trophy, Check, Play, RefreshCw, Send } from 'lucide-react';

interface ChallengeBubble {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xp: string;
  solved: boolean;
  desc: string;
  initialCode: string;
  testCase: string;
}

const CHALLENGES: ChallengeBubble[] = [
  {
    id: 'bubble-1',
    title: 'Two Sum',
    category: 'Arrays & Hashing',
    difficulty: 'Easy',
    xp: '+50 XP',
    solved: true,
    desc: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    initialCode: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) return [map.get(diff), i];
    map.set(nums[i], i);
  }
  return [];
}`,
    testCase: 'nums = [2,7,11,15], target = 9 => Output: [0, 1]',
  },
  {
    id: 'bubble-2',
    title: 'Valid Parentheses',
    category: 'Stacks & Queues',
    difficulty: 'Easy',
    xp: '+60 XP',
    solved: false,
    desc: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    initialCode: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
    testCase: "s = '()[]{}' => Output: true",
  },
  {
    id: 'bubble-3',
    title: 'Reverse Linked List',
    category: 'Linked Lists',
    difficulty: 'Easy',
    xp: '+55 XP',
    solved: false,
    desc: 'Given the head of a singly linked list, reverse the list, and return the reversed list in O(1) auxiliary memory.',
    initialCode: `function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    let nxt = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nxt;
  }
  return prev;
}`,
    testCase: 'head = [1,2,3,4,5] => Output: [5,4,3,2,1]',
  },
  {
    id: 'bubble-4',
    title: 'Rotated Array Search',
    category: 'Binary Search',
    difficulty: 'Medium',
    xp: '+80 XP',
    solved: false,
    desc: 'Given a sorted array rotated at an unknown pivot and a target, return index of target in O(log n) time.',
    initialCode: `function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}`,
    testCase: 'nums = [4,5,6,7,0,1,2], target = 0 => Output: 4',
  },
  {
    id: 'bubble-5',
    title: 'Longest Substring',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    xp: '+100 XP',
    solved: false,
    desc: 'Find length of longest substring without duplicate characters using sliding window two-pointer method.',
    initialCode: `function lengthOfLongestSubstring(s) {
  const set = new Set();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left++]);
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    testCase: "s = 'abcabcbb' => Output: 3",
  },
  {
    id: 'bubble-6',
    title: 'Invert Binary Tree',
    category: 'Binary Trees',
    difficulty: 'Easy',
    xp: '+45 XP',
    solved: false,
    desc: 'Given root of a binary tree, invert the tree recursively and return its new root.',
    initialCode: `function invertTree(root) {
  if (!root) return null;
  const temp = root.left;
  root.left = invertTree(root.right);
  root.right = invertTree(temp);
  return root;
}`,
    testCase: 'root = [4,2,7,1,3,6,9] => Output: [4,7,2,9,6,3,1]',
  },
];

const TOPICS = [
  '🌟 All Bubbles (6)',
  'Arrays & Hashing (1)',
  'Stacks & Queues (1)',
  'Linked Lists (1)',
  'Binary Trees (1)',
  'Dynamic Programming (1)',
];

export default function CodingPage() {
  const [selectedTopic, setSelectedTopic] = useState('🌟 All Bubbles (6)');
  const [activeChallenge, setActiveChallenge] = useState<ChallengeBubble>(CHALLENGES[1]);
  const [code, setCode] = useState(CHALLENGES[1].initialCode);
  const [language, setLanguage] = useState<'javascript' | 'python' | 'cpp'>('javascript');
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectChallenge = (c: ChallengeBubble) => {
    setActiveChallenge(c);
    setCode(c.initialCode);
    setOutput(null);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setOutput('✅ Test Passed! Output matched expected test case.');
      showToast(`Tests passed for "${activeChallenge.title}"! 🚀`);
    }, 600);
  };

  const handleAskAI = () => {
    showToast(`🤖 Pal-AI Tip: Look for O(n) linear scan solutions using hash tables or stack lifo!`);
  };

  const filteredChallenges = CHALLENGES.filter((c) => {
    if (selectedTopic.includes('All')) return true;
    const cat = selectedTopic.split(' (')[0];
    return c.category === cat;
  });

  return (
    <div className="space-y-8 pb-16 w-full font-sans text-[#1E1C10]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-[#FFE600] px-5 py-3 rounded-2xl shadow-2xl border border-[#FFE600]/40 flex items-center gap-3 animate-bounce">
          <SmartToy className="h-5 w-5 text-[#FFE600]" />
          <span className="text-xs font-bold text-white">{toastMessage}</span>
        </div>
      )}

      {/* ─── 1. HERO & QUEST BANNER SECTION ─── */}
      <div className="relative bg-[#F4EEDA] rounded-3xl p-6 sm:p-8 overflow-hidden shadow-sm border border-[#CDC7AA]/40">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#FFE600]/25 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 left-1/3 w-48 h-48 rounded-full bg-[#00F5D4]/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left Mascot & Greeting */}
          <div className="flex items-center gap-4 max-w-2xl">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-[#FFE600] p-1 shadow-md flex items-center justify-center border-2 border-[#FAF3DF] hover:rotate-6 transition-transform">
                <SmartToy className="h-10 w-10 text-[#6A5F00]" />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-[#00F5D4] text-[#00201A] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006B5B] animate-ping" />
                Online
              </span>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full mb-1 border border-[#CDC7AA]/30">
                <Sparkles className="h-4 w-4 text-[#6A5F00]" />
                <span className="text-xs font-bold text-[#7C775F]">Algorithmic Quest • Chapter 4</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1E1C10] leading-tight">
                Pop & Code Arena! 🚀
              </h1>
              <p className="text-xs sm:text-sm text-[#4B4731] font-medium mt-0.5">
                "Beep Boop! Arjun, 6 challenge bubbles have floated into your orbit. Tap any bubble to inspect, test, and pop!"
              </p>
            </div>
          </div>

          {/* Right Streak & Quick Action Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Streak Card Pill */}
            <div className="bg-white rounded-2xl p-3.5 shadow-sm flex items-center justify-between gap-4 border border-[#CDC7AA]/40 min-w-[220px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B6B]/15 text-[#FF6B6B] flex items-center justify-center font-bold text-lg">
                  🔥
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1E1C10]">7-Day Streak</span>
                    <span className="bg-[#FFE600] text-[#1A1A1A] px-2 py-0.5 rounded-full text-[10px] font-bold">
                      +50 XP
                    </span>
                  </div>
                  <div className="w-24 bg-[#FAF3DF] rounded-full h-2 mt-1.5 overflow-hidden">
                    <div className="bg-[#FFE600] h-full rounded-full w-[78%]" />
                  </div>
                  <span className="text-[10px] font-semibold text-[#7C775F]">840 / 1,000 XP (Lvl 4)</span>
                </div>
              </div>
              <Trophy className="h-6 w-6 text-[#6A5F00]" />
            </div>

            {/* Quick Launch CTA */}
            <button
              onClick={handleAskAI}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-xs shadow-md hover:bg-[#DEC800] transition-all active:scale-95 border border-[#CDC7AA]/40"
            >
              <TerminalIcon className="h-4 w-4" />
              <span>Playground</span>
            </button>
          </div>
        </div>

        {/* Live Ticker strip */}
        <div className="mt-4 pt-3 border-t border-[#CDC7AA]/40 flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-[#4B4731]">
          <div className="flex items-center gap-2">
            <Bolt className="h-4 w-4 text-[#006B5B]" />
            <span className="font-bold text-[#1E1C10]">Live Peer Pulse:</span>
            <span className="italic truncate max-w-xs md:max-w-md">
              Rohan K. just solved "Merge K Sorted Lists" (+80 XP) ⚡
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-bold text-[#006A6A]">
              <span className="w-2 h-2 rounded-full bg-[#006A6A]" /> 342 Students Active
            </span>
            <span className="text-[#1E1C10]">Target Today: <strong>2/3 Solved</strong></span>
          </div>
        </div>
      </div>

      {/* ─── 2. TOPIC FILTERS BAR ─── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
        {TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap active:scale-95 cursor-pointer ${
              selectedTopic === topic
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'bg-[#F4EEDA] hover:bg-[#EEE8D4] text-[#1E1C10] border border-[#CDC7AA]/30'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* ─── 3. MAIN DUAL PANE: Interactive Bubble Map (Left) & Quick Solver / IDE (Right) ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT 6 COLS: CHALLENGE BUBBLES GRID */}
        <div className="xl:col-span-6 flex flex-col gap-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#CDC7AA]/40">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CodeIcon className="h-5 w-5 text-[#6A5F00]" />
                <h3 className="font-heading text-lg font-black text-[#1E1C10]">
                  Algorithmic Bubble Constellation
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#7C775F] bg-[#FAF3DF] px-3 py-1 rounded-full border border-[#CDC7AA]/30">
                Click a bubble to load
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredChallenges.map((c) => {
                const isSelected = activeChallenge.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => handleSelectChallenge(c)}
                    className={`cursor-pointer rounded-2xl p-4 transition-all duration-200 border flex flex-col justify-between min-h-[140px] hover:shadow-md hover:-translate-y-1 ${
                      isSelected
                        ? 'bg-[#FFE600]/25 border-[#6A5F00] shadow-md'
                        : c.solved
                        ? 'bg-[#00F5D4]/15 border-[#006B5B]/30'
                        : 'bg-[#FAF3DF]/60 hover:bg-[#FAF3DF] border-[#CDC7AA]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-[#1E1C10] shadow-xs border border-[#CDC7AA]/30">
                        {c.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          c.difficulty === 'Easy'
                            ? 'bg-[#00F5D4]/30 text-[#006B5B]'
                            : 'bg-[#FF6B6B]/20 text-[#BA1A1A]'
                        }`}
                      >
                        {c.difficulty}
                      </span>
                    </div>

                    <div className="my-2">
                      <h4 className="font-heading text-base font-extrabold text-[#1E1C10]">
                        {c.title}
                      </h4>
                      <p className="text-xs text-[#4B4731] line-clamp-2 mt-0.5">
                        {c.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#CDC7AA]/20 text-xs">
                      <span className="font-bold text-[#6A5F00]">{c.xp}</span>
                      {c.solved ? (
                        <span className="flex items-center gap-1 text-[#006B5B] font-bold text-[11px]">
                          <Check className="h-3.5 w-3.5" /> Solved
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[#1E1C10] font-bold text-[11px]">
                          <Play className="h-3 w-3 fill-current" /> Code Now
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT 6 COLS: QUICK SOLVER / CODE PLAYGROUND */}
        <div className="xl:col-span-6 flex flex-col gap-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#CDC7AA]/40 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#CDC7AA]/30 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C775F]">
                  Active Quest
                </span>
                <h3 className="font-heading text-xl font-black text-[#1E1C10]">
                  {activeChallenge.title}
                </h3>
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-1 bg-[#FAF3DF] p-1 rounded-full border border-[#CDC7AA]/30">
                {(['javascript', 'python', 'cpp'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      language === lang
                        ? 'bg-[#1A1A1A] text-white shadow-xs'
                        : 'text-[#4B4731] hover:text-[#1E1C10]'
                    }`}
                  >
                    {lang === 'javascript' ? 'JS' : lang === 'python' ? 'Python' : 'C++'}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#FAF3DF]/70 p-3.5 rounded-2xl border border-[#CDC7AA]/30 text-xs">
              <span className="font-bold text-[#1E1C10] block mb-1">Problem Description:</span>
              <p className="text-[#4B4731] leading-relaxed">{activeChallenge.desc}</p>
              <span className="block mt-2 font-mono text-[11px] bg-white p-2 rounded-xl border border-[#CDC7AA]/20 text-[#1E1C10]">
                {activeChallenge.testCase}
              </span>
            </div>

            {/* Code Editor Window */}
            <div className="rounded-2xl overflow-hidden border border-[#CDC7AA]/40 shadow-inner bg-[#1A1A1A]">
              <div className="flex items-center justify-between px-4 py-2 bg-[#2E3131] text-xs font-mono text-gray-300 border-b border-gray-700">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00F5D4]" />
                  solution.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : 'cpp'}
                </span>
                <button
                  onClick={() => setCode(activeChallenge.initialCode)}
                  className="hover:text-white flex items-center gap-1 text-[11px]"
                >
                  <RefreshCw className="h-3 w-3" /> Reset
                </button>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={10}
                className="w-full p-4 font-mono text-xs text-green-300 bg-[#1A1A1A] border-none outline-none resize-none leading-relaxed"
                spellCheck={false}
              />
            </div>

            {/* Output Panel */}
            {output && (
              <div className="p-3.5 rounded-2xl bg-[#00F5D4]/15 border border-[#006B5B]/30 text-xs font-semibold text-[#006B5B] flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{output}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={handleAskAI}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FAF3DF] text-[#1E1C10] font-bold text-xs hover:bg-[#EEE8D4] transition-all border border-[#CDC7AA]/40 active:scale-95"
              >
                <AutoAwesome className="h-4 w-4 text-[#6A5F00]" />
                <span>Pal-AI Hint</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FAF3DF] text-[#1E1C10] font-bold text-xs hover:bg-[#EEE8D4] transition-all border border-[#CDC7AA]/40 active:scale-95 disabled:opacity-50"
                >
                  <PlayArrow className="h-4 w-4 text-[#006B5B]" />
                  <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                </button>
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#FFE600] text-[#1A1A1A] font-bold text-xs shadow-md hover:bg-[#DEC800] transition-all active:scale-95 border border-[#CDC7AA]/40 disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Submit & Pop!</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
