export interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  rawInput: any[];
  rawExpected: any;
  explanation?: string;
  isHidden?: boolean;
}

export interface VisualStep {
  stepNumber: number;
  description: string;
  arrayState?: (number | string)[];
  activeIndices?: number[];
  secondaryIndices?: number[];
  pointers?: { [key: string]: number | string };
  variables?: { [key: string]: string | number | boolean };
  stackOrMapState?: { key: string; value: string }[] | (string | number)[];
}

export interface CodeChallenge {
  id: string;
  title: string;
  category: string;
  companies: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xp: number;
  solved: boolean;
  desc: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: {
    javascript: string;
    python: string;
    cpp: string;
    java: string;
  };
  solutionCode: {
    javascript: string;
    python: string;
    cpp: string;
    java: string;
  };
  functionName: string;
  testCases: TestCase[];
  visualSteps: VisualStep[];
  aiHints: string[];
  complexity: {
    time: string;
    space: string;
    approach: string;
  };
}

export const CODE_CHALLENGES: CodeChallenge[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    category: 'Arrays & Hashing',
    companies: ['Amazon', 'Google', 'TCS Digital', 'Microsoft'],
    difficulty: 'Easy',
    xp: 50,
    solved: false,
    desc: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 2 + 7 == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
      },
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your logic here
  // Return an array of two indices [i, j]
  
}`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    # Write your logic here
    pass`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your logic here
        return {};
    }
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your logic here
        return new int[0];
    }
}`,
    },
    solutionCode: {
      javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            int diff = target - nums[i];
            if (mp.count(diff)) return {mp[diff], i};
            mp[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            if (map.containsKey(diff)) return new int[] { map.get(diff), i };
            map.put(nums[i], i);
        }
        return new int[0];
    }
}`,
    },
    functionName: 'twoSum',
    testCases: [
      {
        id: 1,
        input: 'nums = [2, 7, 11, 15], target = 9',
        expectedOutput: '[0, 1]',
        rawInput: [[2, 7, 11, 15], 9],
        rawExpected: [0, 1],
      },
      {
        id: 2,
        input: 'nums = [3, 2, 4], target = 6',
        expectedOutput: '[1, 2]',
        rawInput: [[3, 2, 4], 6],
        rawExpected: [1, 2],
      },
      {
        id: 3,
        input: 'nums = [3, 3], target = 6',
        expectedOutput: '[0, 1]',
        rawInput: [[3, 3], 6],
        rawExpected: [0, 1],
      },
    ],
    visualSteps: [
      {
        stepNumber: 1,
        description: 'Initialize empty Hash Map {}. Starting linear scan at index i = 0 (value = 2).',
        arrayState: [2, 7, 11, 15],
        activeIndices: [0],
        pointers: { i: 0 },
        variables: { target: 9, currentVal: 2, complement: '9 - 2 = 7' },
        stackOrMapState: [],
      },
      {
        stepNumber: 2,
        description: 'Complement 7 is NOT in hash map. Storing (key: 2 -> index: 0) in hash map.',
        arrayState: [2, 7, 11, 15],
        activeIndices: [0],
        pointers: { i: 0 },
        variables: { target: 9, complement: 7, found: 'No' },
        stackOrMapState: [{ key: '2', value: 'index: 0' }],
      },
      {
        stepNumber: 3,
        description: 'Advance to index i = 1 (value = 7). Target complement = 9 - 7 = 2.',
        arrayState: [2, 7, 11, 15],
        activeIndices: [1],
        secondaryIndices: [0],
        pointers: { i: 1 },
        variables: { target: 9, currentVal: 7, complement: '9 - 7 = 2' },
        stackOrMapState: [{ key: '2', value: 'index: 0' }],
      },
      {
        stepNumber: 4,
        description: '🎯 Match Found! Complement 2 exists at index 0. Returning pair [0, 1]. Solution complete in O(N)!',
        arrayState: [2, 7, 11, 15],
        activeIndices: [0, 1],
        pointers: { match1: 0, match2: 1 },
        variables: { result: '[0, 1]', status: 'Solved ✅' },
        stackOrMapState: [{ key: '2', value: 'index: 0' }],
      },
    ],
    aiHints: [
      'A brute force O(n^2) approach checks every pair, but we can do much better with a hash map.',
      'As you iterate through the array, calculate complement = target - nums[i] and check if map.has(complement).',
      'Store each number along with its index as you traverse.',
    ],
    complexity: {
      time: 'O(N) — Single pass hash map lookup is O(1) average time.',
      space: 'O(N) — Hash map stores up to N items.',
      approach: 'One-pass Hash Map complement matching.',
    },
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    category: 'Stacks & Queues',
    companies: ['Infosys DSE', 'Amazon', 'Wipro Elite', 'TCS'],
    difficulty: 'Easy',
    xp: 60,
    solved: false,
    desc: "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nOpen brackets must be closed by the same type of brackets in correct order.",
    constraints: [
      '1 <= s.length <= 10^4',
      "s consists of parentheses only '()[]{}'.",
    ],
    examples: [
      {
        input: 's = "()[]{}"',
        output: 'true',
      },
      {
        input: 's = "(]"',
        output: 'false',
      },
    ],
    starterCode: {
      javascript: `function isValid(s) {
  // Write your logic here
  // Return boolean true or false
  
}`,
      python: `def isValid(s: str) -> bool:
    # Write your logic here
    pass`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // Write your logic here
        return false;
    }
};`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Write your logic here
        return false;
    }
}`,
    },
    solutionCode: {
      javascript: `function isValid(s) {
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
      python: `def isValid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> mp = {{')', '('}, {'}', '{'}, {']', '['}};
        for (char c : s) {
            if (mp.count(c)) {
                if (st.empty() || st.top() != mp[c]) return false;
                st.pop();
            } else {
                st.push(c);
            }
        }
        return st.empty();
    }
};`,
      java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
    },
    functionName: 'isValid',
    testCases: [
      {
        id: 1,
        input: 's = "()[]{}"',
        expectedOutput: 'true',
        rawInput: ['()[]{}'],
        rawExpected: true,
      },
      {
        id: 2,
        input: 's = "(]"',
        expectedOutput: 'false',
        rawInput: ['(]'],
        rawExpected: false,
      },
      {
        id: 3,
        input: 's = "([{}])"',
        expectedOutput: 'true',
        rawInput: ['([{}])'],
        rawExpected: true,
      },
    ],
    visualSteps: [
      {
        stepNumber: 1,
        description: "Encountered opening bracket '('. Pushing onto LIFO Stack.",
        arrayState: ['(', '[', '{', '}', ']', ')'],
        activeIndices: [0],
        variables: { char: "'('", action: 'PUSH' },
        stackOrMapState: ['('],
      },
      {
        stepNumber: 2,
        description: "Encountered opening bracket '['. Pushing onto Stack.",
        arrayState: ['(', '[', '{', '}', ']', ')'],
        activeIndices: [1],
        variables: { char: "'['", action: 'PUSH' },
        stackOrMapState: ['(', '['],
      },
      {
        stepNumber: 3,
        description: "Encountered opening bracket '{'. Pushing onto Stack.",
        arrayState: ['(', '[', '{', '}', ']', ')'],
        activeIndices: [2],
        variables: { char: "'{'", action: 'PUSH' },
        stackOrMapState: ['(', '[', '{'],
      },
      {
        stepNumber: 4,
        description: "Encountered closing bracket '}'. Popping top '{' from stack. Matched successfully!",
        arrayState: ['(', '[', '{', '}', ']', ')'],
        activeIndices: [3],
        variables: { char: "'}'", popped: "'{'", match: 'Valid ✅' },
        stackOrMapState: ['(', '['],
      },
      {
        stepNumber: 5,
        description: "All brackets matched. Stack is completely empty. String is Valid!",
        arrayState: ['(', '[', '{', '}', ']', ')'],
        activeIndices: [0, 1, 2, 3, 4, 5],
        variables: { finalResult: 'true', stackSize: 0 },
        stackOrMapState: [],
      },
    ],
    aiHints: [
      'Use a LIFO Stack to track opening brackets.',
      'When you see a closing bracket, verify that the top element of the stack is its counterpart.',
      'At the end of iteration, the stack must be empty.',
    ],
    complexity: {
      time: 'O(N) — Scanning string of length N.',
      space: 'O(N) — Stack capacity.',
      approach: 'Stack-based LIFO matching.',
    },
  },
  {
    id: 'max-subarray',
    title: 'Maximum Subarray (Kadane’s)',
    category: 'Dynamic Programming',
    companies: ['Microsoft', 'Amazon', 'Zoho', 'TCS Digital'],
    difficulty: 'Medium',
    xp: 85,
    solved: false,
    desc: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum (Kadane's Algorithm).",
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
    ],
    examples: [
      {
        input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
        output: '6',
        explanation: 'Subarray [4, -1, 2, 1] has the largest sum 6.',
      },
    ],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  // Write your logic here
  // Return maximum subarray sum
  
}`,
      python: `def maxSubArray(nums: list[int]) -> int:
    # Write your logic here
    pass`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Write your logic here
        return 0;
    }
};`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your logic here
        return 0;
    }
}`,
    },
    solutionCode: {
      javascript: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
      python: `def maxSubArray(nums: list[int]) -> int:
    max_sum = nums[0]
    curr_sum = nums[0]
    for x in nums[1:]:
        curr_sum = max(x, curr_sum + x)
        max_sum = max(max_sum, curr_sum)
    return max_sum`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSum = nums[0], curr = nums[0];
        for (size_t i = 1; i < nums.size(); i++) {
            curr = max(nums[i], curr + nums[i]);
            maxSum = max(maxSum, curr);
        }
        return maxSum;
    }
};`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0], curr = nums[0];
        for (int i = 1; i < nums.length; i++) {
            curr = Math.max(nums[i], curr + nums[i]);
            maxSum = Math.max(maxSum, curr);
        }
        return maxSum;
    }
}`,
    },
    functionName: 'maxSubArray',
    testCases: [
      {
        id: 1,
        input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
        expectedOutput: '6',
        rawInput: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]],
        rawExpected: 6,
      },
      {
        id: 2,
        input: 'nums = [5, 4, -1, 7, 8]',
        expectedOutput: '23',
        rawInput: [[5, 4, -1, 7, 8]],
        rawExpected: 23,
      },
    ],
    visualSteps: [
      {
        stepNumber: 1,
        description: 'Init: currentSum = -2, maxSum = -2.',
        arrayState: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        activeIndices: [0],
        variables: { currentSum: -2, maxSum: -2 },
      },
      {
        stepNumber: 2,
        description: 'At index 1 (val: 1): max(1, -2 + 1) = 1. Dropped negative prefix. maxSum = 1.',
        arrayState: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        activeIndices: [1],
        variables: { currentSum: 1, maxSum: 1 },
      },
      {
        stepNumber: 3,
        description: 'At index 3 (val: 4): Start contiguous chunk. currentSum = 4, maxSum = 4.',
        arrayState: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        activeIndices: [3],
        variables: { currentSum: 4, maxSum: 4 },
      },
      {
        stepNumber: 4,
        description: 'Expanding through [4, -1, 2, 1]. Peak cumulative sum reached = 6! 🏆',
        arrayState: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        activeIndices: [3, 4, 5, 6],
        variables: { currentSum: 6, maxSum: 6, peakSubarray: '[4, -1, 2, 1]' },
      },
    ],
    aiHints: [
      'Decide whether to add nums[i] to currentSum or start fresh from nums[i].',
      'currentSum = Math.max(nums[i], currentSum + nums[i]).',
    ],
    complexity: {
      time: 'O(N) — Single linear scan.',
      space: 'O(1) — Constant extra space.',
      approach: "Kadane's Dynamic Programming Algorithm.",
    },
  },
  {
    id: 'palindrome-number',
    title: 'Palindrome Number',
    category: 'Math & Logic',
    companies: ['TCS NQT', 'Wipro', 'Cognizant', 'Accenture'],
    difficulty: 'Easy',
    xp: 40,
    solved: false,
    desc: 'Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise. (e.g. 121 is palindrome, -121 is not).',
    constraints: ['-2^31 <= x <= 2^31 - 1'],
    examples: [
      {
        input: 'x = 121',
        output: 'true',
      },
      {
        input: 'x = -121',
        output: 'false',
      },
    ],
    starterCode: {
      javascript: `function isPalindrome(x) {
  // Write your logic here
  // Return true if palindrome, false otherwise
  
}`,
      python: `def isPalindrome(x: int) -> bool:
    # Write your logic here
    pass`,
      cpp: `class Solution {
public:
    bool isPalindrome(int x) {
        // Write your logic here
        return false;
    }
};`,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        // Write your logic here
        return false;
    }
}`,
    },
    solutionCode: {
      javascript: `function isPalindrome(x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let reversed = 0, original = x;
  while (x > 0) {
    reversed = reversed * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return original === reversed;
}`,
      python: `def isPalindrome(x: int) -> bool:
    if x < 0 or (x % 10 == 0 and x != 0): return False
    return str(x) == str(x)[::-1]`,
      cpp: `class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        long long rev = 0, orig = x;
        while (x > 0) {
            rev = rev * 10 + (x % 10);
            x /= 10;
        }
        return orig == rev;
    }
};`,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        int rev = 0, orig = x;
        while (x > 0) {
            rev = rev * 10 + (x % 10);
            x /= 10;
        }
        return orig == rev;
    }
}`,
    },
    functionName: 'isPalindrome',
    testCases: [
      {
        id: 1,
        input: 'x = 121',
        expectedOutput: 'true',
        rawInput: [121],
        rawExpected: true,
      },
      {
        id: 2,
        input: 'x = -121',
        expectedOutput: 'false',
        rawInput: [-121],
        rawExpected: false,
      },
    ],
    visualSteps: [
      {
        stepNumber: 1,
        description: 'Input x = 121. Not negative. Extracted rightmost digit: 121 % 10 = 1. reversed = 1.',
        variables: { x: 12, digit: 1, reversed: 1 },
      },
      {
        stepNumber: 2,
        description: 'Extracted next digit: 12 % 10 = 2. reversed = 1 * 10 + 2 = 12.',
        variables: { x: 1, digit: 2, reversed: 12 },
      },
      {
        stepNumber: 3,
        description: 'Extracted final digit: 1 % 10 = 1. reversed = 12 * 10 + 1 = 121.',
        variables: { x: 0, digit: 1, reversed: 121 },
      },
      {
        stepNumber: 4,
        description: 'Reversed 121 == Original 121. Result: true ✅',
        variables: { original: 121, reversed: 121, isMatch: 'true' },
      },
    ],
    aiHints: ['Negative numbers cannot be palindromes.', 'Reverse the number mathematically with % 10 and / 10.'],
    complexity: {
      time: 'O(log10(N))',
      space: 'O(1)',
      approach: 'Mathematical digit reversal',
    },
  },
];
