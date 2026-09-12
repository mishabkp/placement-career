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
  // 1. Two Sum
  {
    id: 'two-sum',
    title: 'Two Sum',
    category: 'Arrays & Hashing',
    companies: ['Amazon', 'Google', 'TCS Digital', 'Microsoft'],
    difficulty: 'Easy',
    xp: 50,
    solved: false,
    desc: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution.',
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', 'Only one valid answer exists.'],
    examples: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]' },
      { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]' },
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {\n  // Write your logic here\n  // Return [i, j]\n}`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:\n    # Write your logic here\n    pass`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write logic\n        return {};\n    }\n};`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write logic\n        return new int[0];\n    }\n}`,
    },
    solutionCode: {
      javascript: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        for (int i = 0; i < nums.size(); i++) {\n            int diff = target - nums[i];\n            if (mp.count(diff)) return {mp[diff], i};\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        HashMap<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) return new int[] { map.get(diff), i };\n            map.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}`,
    },
    functionName: 'twoSum',
    testCases: [
      { id: 1, input: 'nums = [2, 7, 11, 15], target = 9', expectedOutput: '[0, 1]', rawInput: [[2, 7, 11, 15], 9], rawExpected: [0, 1] },
      { id: 2, input: 'nums = [3, 2, 4], target = 6', expectedOutput: '[1, 2]', rawInput: [[3, 2, 4], 6], rawExpected: [1, 2] },
      { id: 3, input: 'nums = [3, 3], target = 6', expectedOutput: '[0, 1]', rawInput: [[3, 3], 6], rawExpected: [0, 1] },
    ],
    visualSteps: [
      { stepNumber: 1, description: 'Init Map {}. Inspect index 0 (val: 2). Complement = 7.', arrayState: [2, 7, 11, 15], activeIndices: [0], variables: { target: 9, complement: 7 } },
      { stepNumber: 2, description: 'Match! Index 1 has 7. Map contains 2 -> [0, 1].', arrayState: [2, 7, 11, 15], activeIndices: [0, 1], variables: { result: '[0, 1]' } },
    ],
    aiHints: ['Use a hash map for O(1) complement lookups.'],
    complexity: { time: 'O(N)', space: 'O(N)', approach: 'One-pass Hash Map complement matching.' },
  },

  // 2. Valid Parentheses
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    category: 'Stacks & Queues',
    companies: ['Infosys DSE', 'Amazon', 'Wipro Elite', 'TCS'],
    difficulty: 'Easy',
    xp: 60,
    solved: false,
    desc: "Given a string `s` containing just characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.",
    constraints: ['1 <= s.length <= 10^4'],
    examples: [
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    starterCode: {
      javascript: `function isValid(s) {\n  // Write logic here\n  // Return boolean\n}`,
      python: `def isValid(s: str) -> bool:\n    # Write logic\n    pass`,
      cpp: `class Solution {\npublic:\n    bool isValid(string s) {\n        return false;\n    }\n};`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        return false;\n    }\n}`,
    },
    solutionCode: {
      javascript: `function isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for (const char of s) {\n    if (char in map) {\n      if (stack.pop() !== map[char]) return false;\n    } else {\n      stack.push(char);\n    }\n  }\n  return stack.length === 0;\n}`,
      python: `def isValid(s: str) -> bool:\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else '#'\n            if mapping[char] != top: return False\n        else:\n            stack.append(char)\n    return not stack`,
      cpp: `class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        unordered_map<char, char> mp = {{')', '('}, {'}', '{'}, {']', '['}};\n        for (char c : s) {\n            if (mp.count(c)) {\n                if (st.empty() || st.top() != mp[c]) return false;\n                st.pop();\n            } else st.push(c);\n        }\n        return st.empty();\n    }\n};`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}`,
    },
    functionName: 'isValid',
    testCases: [
      { id: 1, input: 's = "()[]{}"', expectedOutput: 'true', rawInput: ['()[]{}'], rawExpected: true },
      { id: 2, input: 's = "(]"', expectedOutput: 'false', rawInput: ['(]'], rawExpected: false },
      { id: 3, input: 's = "([{}])"', expectedOutput: 'true', rawInput: ['([{}])'], rawExpected: true },
    ],
    visualSteps: [
      { stepNumber: 1, description: "Push opening brackets into LIFO Stack.", arrayState: ['(', '{', '}', ')'], stackOrMapState: ['(', '{'] },
      { stepNumber: 2, description: "Closing bracket '}' pops '{'. Stack empty = true.", arrayState: ['(', '{', '}', ')'], stackOrMapState: [] },
    ],
    aiHints: ['Use a LIFO Stack.'],
    complexity: { time: 'O(N)', space: 'O(N)', approach: 'Stack bracket pairing.' },
  },

  // 3. Reverse String
  {
    id: 'reverse-string',
    title: 'Reverse String',
    category: 'Two Pointers',
    companies: ['TCS NQT', 'Cognizant', 'Infosys', 'Capgemini'],
    difficulty: 'Easy',
    xp: 45,
    solved: false,
    desc: 'Write a function that reverses an array of characters in-place using O(1) extra memory.',
    constraints: ['1 <= s.length <= 10^5'],
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
    ],
    starterCode: {
      javascript: `function reverseString(s) {\n  // Modify and return s\n}`,
      python: `def reverseString(s: list[str]) -> list[str]:\n    # Modify in-place\n    return s`,
      cpp: `class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n    }\n};`,
      java: `class Solution {\n    public void reverseString(char[] s) {\n    }\n}`,
    },
    solutionCode: {
      javascript: `function reverseString(s) {\n  let l = 0, r = s.length - 1;\n  while (l < r) {\n    const temp = s[l];\n    s[l] = s[r];\n    s[r] = temp;\n    l++; r--;\n  }\n  return s;\n}`,
      python: `def reverseString(s: list[str]) -> list[str]:\n    l, r = 0, len(s) - 1\n    while l < r:\n        s[l], s[r] = s[r], s[l]\n        l += 1\n        r -= 1\n    return s`,
      cpp: `class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        int l = 0, r = s.size() - 1;\n        while (l < r) swap(s[l++], s[r--]);\n    }\n};`,
      java: `class Solution {\n    public void reverseString(char[] s) {\n        int l = 0, r = s.length - 1;\n        while (l < r) {\n            char temp = s[l];\n            s[l++] = s[r];\n            s[r--] = temp;\n        }\n    }\n}`,
    },
    functionName: 'reverseString',
    testCases: [
      { id: 1, input: 's = ["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]', rawInput: [['h', 'e', 'l', 'l', 'o']], rawExpected: ['o', 'l', 'l', 'e', 'h'] },
      { id: 2, input: 's = ["H","a","n","n","a","h"]', expectedOutput: '["h","a","n","n","a","H"]', rawInput: [['H', 'a', 'n', 'n', 'a', 'h']], rawExpected: ['h', 'a', 'n', 'n', 'a', 'H'] },
    ],
    visualSteps: [
      { stepNumber: 1, description: 'Swap leftmost and rightmost characters.', arrayState: ['h', 'e', 'l', 'l', 'o'], activeIndices: [0, 4] },
      { stepNumber: 2, description: 'Converge inward: Swap index 1 and 3.', arrayState: ['o', 'e', 'l', 'l', 'h'], activeIndices: [1, 3] },
    ],
    aiHints: ['Use two pointers converging from both ends.'],
    complexity: { time: 'O(N)', space: 'O(1)', approach: 'Two-pointer swap.' },
  },

  // 4. Palindrome Number
  {
    id: 'palindrome-number',
    title: 'Palindrome Number',
    category: 'Math & Logic',
    companies: ['TCS NQT', 'Wipro', 'Cognizant', 'Accenture'],
    difficulty: 'Easy',
    xp: 40,
    solved: false,
    desc: 'Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.',
    constraints: ['-2^31 <= x <= 2^31 - 1'],
    examples: [
      { input: 'x = 121', output: 'true' },
      { input: 'x = -121', output: 'false' },
    ],
    starterCode: {
      javascript: `function isPalindrome(x) {\n  // Return true or false\n}`,
      python: `def isPalindrome(x: int) -> bool:\n    pass`,
      cpp: `class Solution {\npublic:\n    bool isPalindrome(int x) {\n        return false;\n    }\n};`,
      java: `class Solution {\n    public boolean isPalindrome(int x) {\n        return false;\n    }\n}`,
    },
    solutionCode: {
      javascript: `function isPalindrome(x) {\n  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;\n  let rev = 0, orig = x;\n  while (x > 0) {\n    rev = rev * 10 + (x % 10);\n    x = Math.floor(x / 10);\n  }\n  return orig === rev;\n}`,
      python: `def isPalindrome(x: int) -> bool:\n    if x < 0 or (x % 10 == 0 and x != 0): return False\n    return str(x) == str(x)[::-1]`,
      cpp: `class Solution {\npublic:\n    bool isPalindrome(int x) {\n        if (x < 0 || (x % 10 == 0 && x != 0)) return false;\n        long long rev = 0, orig = x;\n        while (x > 0) {\n            rev = rev * 10 + (x % 10);\n            x /= 10;\n        }\n        return orig == rev;\n    }\n};`,
      java: `class Solution {\n    public boolean isPalindrome(int x) {\n        if (x < 0 || (x % 10 == 0 && x != 0)) return false;\n        int rev = 0, orig = x;\n        while (x > 0) {\n            rev = rev * 10 + (x % 10);\n            x /= 10;\n        }\n        return orig == rev;\n    }\n}`,
    },
    functionName: 'isPalindrome',
    testCases: [
      { id: 1, input: 'x = 121', expectedOutput: 'true', rawInput: [121], rawExpected: true },
      { id: 2, input: 'x = -121', expectedOutput: 'false', rawInput: [-121], rawExpected: false },
      { id: 3, input: 'x = 10', expectedOutput: 'false', rawInput: [10], rawExpected: false },
    ],
    visualSteps: [
      { stepNumber: 1, description: 'Extract rightmost digits using % 10 and construct reversed integer.', variables: { x: 121, rev: 121, match: 'true' } },
    ],
    aiHints: ['Negative numbers cannot be palindromes.'],
    complexity: { time: 'O(log10(N))', space: 'O(1)', approach: 'Mathematical digit reversal.' },
  },

  // 5. Maximum Subarray (Kadane's)
  {
    id: 'max-subarray',
    title: 'Maximum Subarray (Kadane’s)',
    category: 'Dynamic Programming',
    companies: ['Microsoft', 'Amazon', 'Zoho', 'TCS Digital'],
    difficulty: 'Medium',
    xp: 85,
    solved: false,
    desc: "Given an integer array `nums`, find the contiguous subarray with the largest sum and return its sum.",
    constraints: ['1 <= nums.length <= 10^5'],
    examples: [
      { input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]', output: '6' },
    ],
    starterCode: {
      javascript: `function maxSubArray(nums) {\n  // Return max sum\n}`,
      python: `def maxSubArray(nums: list[int]) -> int:\n    pass`,
      cpp: `class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        return 0;\n    }\n}`,
    },
    solutionCode: {
      javascript: `function maxSubArray(nums) {\n  let maxSum = nums[0], curr = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    curr = Math.max(nums[i], curr + nums[i]);\n    maxSum = Math.max(maxSum, curr);\n  }\n  return maxSum;\n}`,
      python: `def maxSubArray(nums: list[int]) -> int:\n    max_s = nums[0]\n    curr = nums[0]\n    for x in nums[1:]:\n        curr = max(x, curr + x)\n        max_s = max(max_s, curr)\n    return max_s`,
      cpp: `class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        int maxSum = nums[0], curr = nums[0];\n        for (size_t i = 1; i < nums.size(); i++) {\n            curr = max(nums[i], curr + nums[i]);\n            maxSum = max(maxSum, curr);\n        }\n        return maxSum;\n    }\n};`,
      java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        int maxSum = nums[0], curr = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            curr = Math.max(nums[i], curr + nums[i]);\n            maxSum = Math.max(maxSum, curr);\n        }\n        return maxSum;\n    }\n}`,
    },
    functionName: 'maxSubArray',
    testCases: [
      { id: 1, input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]', expectedOutput: '6', rawInput: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], rawExpected: 6 },
      { id: 2, input: 'nums = [5, 4, -1, 7, 8]', expectedOutput: '23', rawInput: [[5, 4, -1, 7, 8]], rawExpected: 23 },
    ],
    visualSteps: [
      { stepNumber: 1, description: 'Kadane algorithm greedily drops negative prefixes.', arrayState: [4, -1, 2, 1], activeIndices: [0, 1, 2, 3], variables: { maxSum: 6 } },
    ],
    aiHints: ['curr = Math.max(nums[i], curr + nums[i]).'],
    complexity: { time: 'O(N)', space: 'O(1)', approach: "Kadane's DP algorithm." },
  },

  // 6. FizzBuzz
  {
    id: 'fizz-buzz',
    title: 'FizzBuzz Challenge',
    category: 'Math & Logic',
    companies: ['TCS', 'Infosys', 'Wipro', 'Accenture'],
    difficulty: 'Easy',
    xp: 35,
    solved: false,
    desc: 'Given an integer `n`, return a string array `answer` where:\n`answer[i] == "FizzBuzz"` if i is divisible by 3 and 5.\n`answer[i] == "Fizz"` if i is divisible by 3.\n`answer[i] == "Buzz"` if i is divisible by 5.\n`answer[i] == i` otherwise.',
    constraints: ['1 <= n <= 10^4'],
    examples: [
      { input: 'n = 5', output: '["1","2","Fizz","4","Buzz"]' },
    ],
    starterCode: {
      javascript: `function fizzBuzz(n) {\n  // Return string array\n}`,
      python: `def fizzBuzz(n: int) -> list[str]:\n    pass`,
      cpp: `class Solution {\npublic:\n    vector<string> fizzBuzz(int n) {\n        return {};\n    }\n};`,
      java: `class Solution {\n    public List<String> fizzBuzz(int n) {\n        return new ArrayList<>();\n    }\n}`,
    },
    solutionCode: {
      javascript: `function fizzBuzz(n) {\n  const res = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) res.push("FizzBuzz");\n    else if (i % 3 === 0) res.push("Fizz");\n    else if (i % 5 === 0) res.push("Buzz");\n    else res.push(String(i));\n  }\n  return res;\n}`,
      python: `def fizzBuzz(n: int) -> list[str]:\n    res = []\n    for i in range(1, n + 1):\n        if i % 15 == 0: res.append("FizzBuzz")\n        elif i % 3 == 0: res.append("Fizz")\n        elif i % 5 == 0: res.append("Buzz")\n        else: res.append(str(i))\n    return res`,
      cpp: `class Solution {\npublic:\n    vector<string> fizzBuzz(int n) {\n        vector<string> res;\n        for (int i = 1; i <= n; i++) {\n            if (i % 15 == 0) res.push_back("FizzBuzz");\n            else if (i % 3 == 0) res.push_back("Fizz");\n            else if (i % 5 == 0) res.push_back("Buzz");\n            else res.push_back(to_string(i));\n        }\n        return res;\n    }\n};`,
      java: `class Solution {\n    public List<String> fizzBuzz(int n) {\n        List<String> res = new ArrayList<>();\n        for (int i = 1; i <= n; i++) {\n            if (i % 15 == 0) res.add("FizzBuzz");\n            else if (i % 3 == 0) res.add("Fizz");\n            else if (i % 5 == 0) res.add("Buzz");\n            else res.add(String.valueOf(i));\n        }\n        return res;\n    }\n}`,
    },
    functionName: 'fizzBuzz',
    testCases: [
      { id: 1, input: 'n = 5', expectedOutput: '["1","2","Fizz","4","Buzz"]', rawInput: [5], rawExpected: ["1","2","Fizz","4","Buzz"] },
      { id: 2, input: 'n = 3', expectedOutput: '["1","2","Fizz"]', rawInput: [3], rawExpected: ["1","2","Fizz"] },
    ],
    visualSteps: [
      { stepNumber: 1, description: 'Loop 1 to n. Modulo 15 triggers FizzBuzz.', variables: { current: 15, tag: 'FizzBuzz' } },
    ],
    aiHints: ['Check % 15 before % 3 and % 5.'],
    complexity: { time: 'O(N)', space: 'O(N)', approach: 'Sequential Modulo Testing.' },
  },

  // 7. Contains Duplicate
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    category: 'Arrays & Hashing',
    companies: ['Amazon', 'Microsoft', 'Zoho', 'Google'],
    difficulty: 'Easy',
    xp: 40,
    solved: false,
    desc: 'Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.',
    constraints: ['1 <= nums.length <= 10^5'],
    examples: [
      { input: 'nums = [1, 2, 3, 1]', output: 'true' },
      { input: 'nums = [1, 2, 3, 4]', output: 'false' },
    ],
    starterCode: {
      javascript: `function containsDuplicate(nums) {\n  // Return true if duplicate exists\n}`,
      python: `def containsDuplicate(nums: list[int]) -> bool:\n    pass`,
      cpp: `class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        return false;\n    }\n};`,
      java: `class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        return false;\n    }\n}`,
    },
    solutionCode: {
      javascript: `function containsDuplicate(nums) {\n  const set = new Set();\n  for (const n of nums) {\n    if (set.has(n)) return true;\n    set.add(n);\n  }\n  return false;\n}`,
      python: `def containsDuplicate(nums: list[int]) -> bool:\n    return len(nums) != len(set(nums))`,
      cpp: `class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        unordered_set<int> st;\n        for (int n : nums) {\n            if (st.count(n)) return true;\n            st.insert(n);\n        }\n        return false;\n    }\n};`,
      java: `class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        HashSet<Integer> set = new HashSet<>();\n        for (int n : nums) {\n            if (set.contains(n)) return true;\n            set.add(n);\n        }\n        return false;\n    }\n}`,
    },
    functionName: 'containsDuplicate',
    testCases: [
      { id: 1, input: 'nums = [1, 2, 3, 1]', expectedOutput: 'true', rawInput: [[1, 2, 3, 1]], rawExpected: true },
      { id: 2, input: 'nums = [1, 2, 3, 4]', expectedOutput: 'false', rawInput: [[1, 2, 3, 4]], rawExpected: false },
    ],
    visualSteps: [
      { stepNumber: 1, description: 'Store elements in a Set. Return true upon seeing existing value.', arrayState: [1, 2, 3, 1], activeIndices: [0, 3] },
    ],
    aiHints: ['Use a Set to achieve O(N) lookup.'],
    complexity: { time: 'O(N)', space: 'O(N)', approach: 'HashSet lookups.' },
  },

  // 8. Single Number (Bit Manipulation)
  {
    id: 'single-number',
    title: 'Single Number',
    category: 'Bit Manipulation',
    companies: ['Amazon', 'Infosys SP', 'TCS Digital', 'Microsoft'],
    difficulty: 'Easy',
    xp: 55,
    solved: false,
    desc: 'Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one in O(N) time and O(1) space.',
    constraints: ['1 <= nums.length <= 3 * 10^4'],
    examples: [
      { input: 'nums = [2, 2, 1]', output: '1' },
      { input: 'nums = [4, 1, 2, 1, 2]', output: '4' },
    ],
    starterCode: {
      javascript: `function singleNumber(nums) {\n  // Return unique element in O(1) space\n}`,
      python: `def singleNumber(nums: list[int]) -> int:\n    pass`,
      cpp: `class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int singleNumber(int[] nums) {\n        return 0;\n    }\n}`,
    },
    solutionCode: {
      javascript: `function singleNumber(nums) {\n  let xor = 0;\n  for (const n of nums) {\n    xor ^= n;\n  }\n  return xor;\n}`,
      python: `def singleNumber(nums: list[int]) -> int:\n    res = 0\n    for n in nums:\n        res ^= n\n    return res`,
      cpp: `class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        int res = 0;\n        for (int n : nums) res ^= n;\n        return res;\n    }\n};`,
      java: `class Solution {\n    public int singleNumber(int[] nums) {\n        int res = 0;\n        for (int n : nums) res ^= n;\n        return res;\n    }\n}`,
    },
    functionName: 'singleNumber',
    testCases: [
      { id: 1, input: 'nums = [2, 2, 1]', expectedOutput: '1', rawInput: [[2, 2, 1]], rawExpected: 1 },
      { id: 2, input: 'nums = [4, 1, 2, 1, 2]', expectedOutput: '4', rawInput: [[4, 1, 2, 1, 2]], rawExpected: 4 },
    ],
    visualSteps: [
      { stepNumber: 1, description: 'Bitwise XOR cancels duplicates (A ^ A = 0). Remaining value is the single number.', variables: { finalXOR: 4 } },
    ],
    aiHints: ['XOR of any number with itself is 0.'],
    complexity: { time: 'O(N)', space: 'O(1)', approach: 'Bitwise XOR Accumulator.' },
  },

  // 9. Best Time to Buy and Sell Stock
  {
    id: 'best-time-stock',
    title: 'Best Time to Buy and Sell Stock',
    category: 'Greedy & Arrays',
    companies: ['Amazon', 'Google', 'Flipkart', 'TCS'],
    difficulty: 'Easy',
    xp: 65,
    solved: false,
    desc: 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day. Return the maximum profit you can achieve.',
    constraints: ['1 <= prices.length <= 10^5'],
    examples: [
      { input: 'prices = [7, 1, 5, 3, 6, 4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 5.' },
      { input: 'prices = [7, 6, 4, 3, 1]', output: '0' },
    ],
    starterCode: {
      javascript: `function maxProfit(prices) {\n  // Return max profit\n}`,
      python: `def maxProfit(prices: list[int]) -> int:\n    pass`,
      cpp: `class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int maxProfit(int[] prices) {\n        return 0;\n    }\n}`,
    },
    solutionCode: {
      javascript: `function maxProfit(prices) {\n  let minPrice = Infinity, maxProfit = 0;\n  for (const p of prices) {\n    if (p < minPrice) minPrice = p;\n    else maxProfit = Math.max(maxProfit, p - minPrice);\n  }\n  return maxProfit;\n}`,
      python: `def maxProfit(prices: list[int]) -> int:\n    min_p, max_p = float('inf'), 0\n    for p in prices:\n        if p < min_p: min_p = p\n        else: max_p = max(max_p, p - min_p)\n    return max_p`,
      cpp: `class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        int minP = INT_MAX, maxP = 0;\n        for (int p : prices) {\n            minP = min(minP, p);\n            maxP = max(maxP, p - minP);\n        }\n        return maxP;\n    }\n};`,
      java: `class Solution {\n    public int maxProfit(int[] prices) {\n        int minP = Integer.MAX_VALUE, maxP = 0;\n        for (int p : prices) {\n            if (p < minP) minP = p;\n            else maxP = Math.max(maxP, p - minP);\n        }\n        return maxP;\n    }\n}`,
    },
    functionName: 'maxProfit',
    testCases: [
      { id: 1, input: 'prices = [7, 1, 5, 3, 6, 4]', expectedOutput: '5', rawInput: [[7, 1, 5, 3, 6, 4]], rawExpected: 5 },
      { id: 2, input: 'prices = [7, 6, 4, 3, 1]', expectedOutput: '0', rawInput: [[7, 6, 4, 3, 1]], rawExpected: 0 },
    ],
    visualSteps: [
      { stepNumber: 1, description: 'Track minimum price so far (1) and max profit difference (6 - 1 = 5).', arrayState: [7, 1, 5, 3, 6, 4], activeIndices: [1, 4], variables: { minPrice: 1, maxProfit: 5 } },
    ],
    aiHints: ['Track minimum buying price as you iterate.'],
    complexity: { time: 'O(N)', space: 'O(1)', approach: 'One-pass Greedy minimum tracker.' },
  },

  // 10. Valid Anagram
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    category: 'Strings & Hash Map',
    companies: ['Amazon', 'Infosys', 'Wipro', 'Cognizant'],
    difficulty: 'Easy',
    xp: 45,
    solved: false,
    desc: 'Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.',
    constraints: ['1 <= s.length, t.length <= 5 * 10^4'],
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' },
    ],
    starterCode: {
      javascript: `function isAnagram(s, t) {\n  // Return true or false\n}`,
      python: `def isAnagram(s: str, t: str) -> bool:\n    pass`,
      cpp: `class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        return false;\n    }\n};`,
      java: `class Solution {\n    public boolean isAnagram(String s, String t) {\n        return false;\n    }\n}`,
    },
    solutionCode: {
      javascript: `function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  for (const c of s) count[c] = (count[c] || 0) + 1;\n  for (const c of t) {\n    if (!count[c]) return false;\n    count[c]--;\n  }\n  return true;\n}`,
      python: `def isAnagram(s: str, t: str) -> bool:\n    if len(s) != len(t): return False\n    return sorted(s) == sorted(t)`,
      cpp: `class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        if (s.size() != t.size()) return false;\n        int count[26] = {0};\n        for (char c : s) count[c - 'a']++;\n        for (char c : t) if (--count[c - 'a'] < 0) return false;\n        return true;\n    }\n};`,
      java: `class Solution {\n    public boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] count = new int[26];\n        for (char c : s.toCharArray()) count[c - 'a']++;\n        for (char c : t.toCharArray()) if (--count[c - 'a'] < 0) return false;\n        return true;\n    }\n}`,
    },
    functionName: 'isAnagram',
    testCases: [
      { id: 1, input: 's = "anagram", t = "nagaram"', expectedOutput: 'true', rawInput: ['anagram', 'nagaram'], rawExpected: true },
      { id: 2, input: 's = "rat", t = "car"', expectedOutput: 'false', rawInput: ['rat', 'car'], rawExpected: false },
    ],
    visualSteps: [
      { stepNumber: 1, description: 'Frequency map tallies counts of characters from both strings.', variables: { match: 'true' } },
    ],
    aiHints: ['Count character frequencies using an array or map.'],
    complexity: { time: 'O(N)', space: 'O(1) (26 alphabet chars)', approach: 'Character Frequency Array.' },
  },

  // 11. Climbing Stairs
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs (DP)',
    category: 'Dynamic Programming',
    companies: ['Amazon', 'Google', 'TCS Digital', 'Zoho'],
    difficulty: 'Easy',
    xp: 50,
    solved: false,
    desc: 'You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    constraints: ['1 <= n <= 45'],
    examples: [
      { input: 'n = 2', output: '2', explanation: '1+1 or 2' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, or 2+1' },
    ],
    starterCode: {
      javascript: `function climbStairs(n) {\n  // Return number of distinct ways\n}`,
      python: `def climbStairs(n: int) -> int:\n    pass`,
      cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int climbStairs(int n) {\n        return 0;\n    }\n}`,
    },
    solutionCode: {
      javascript: `function climbStairs(n) {\n  if (n <= 2) return n;\n  let prev2 = 1, prev1 = 2;\n  for (let i = 3; i <= n; i++) {\n    const curr = prev1 + prev2;\n    prev2 = prev1;\n    prev1 = curr;\n  }\n  return prev1;\n}`,
      python: `def climbStairs(n: int) -> int:\n    if n <= 2: return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b`,
      cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int c = a + b;\n            a = b;\n            b = c;\n        }\n        return b;\n    }\n};`,
      java: `class Solution {\n    public int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int c = a + b;\n            a = b;\n            b = c;\n        }\n        return b;\n    }\n}`,
    },
    functionName: 'climbStairs',
    testCases: [
      { id: 1, input: 'n = 2', expectedOutput: '2', rawInput: [2], rawExpected: 2 },
      { id: 2, input: 'n = 3', expectedOutput: '3', rawInput: [3], rawExpected: 3 },
      { id: 3, input: 'n = 5', expectedOutput: '8', rawInput: [5], rawExpected: 8 },
    ],
    visualSteps: [
      { stepNumber: 1, description: 'Ways(N) = Ways(N-1) + Ways(N-2). Exactly follows Fibonacci recurrence.', variables: { n: 5, ways: 8 } },
    ],
    aiHints: ['Ways(n) is the sum of ways to step from (n-1) and (n-2).'],
    complexity: { time: 'O(N)', space: 'O(1)', approach: 'Bottom-up DP with constant space.' },
  },

  // 12. Move Zeroes
  {
    id: 'move-zeroes',
    title: 'Move Zeroes In-Place',
    category: 'Two Pointers',
    companies: ['Amazon', 'Facebook', 'Microsoft', 'TCS'],
    difficulty: 'Easy',
    xp: 45,
    solved: false,
    desc: 'Given an integer array `nums`, move all `0`s to the end of it while maintaining the relative order of the non-zero elements in-place.',
    constraints: ['1 <= nums.length <= 10^4'],
    examples: [
      { input: 'nums = [0, 1, 0, 3, 12]', output: '[1, 3, 12, 0, 0]' },
    ],
    starterCode: {
      javascript: `function moveZeroes(nums) {\n  // Modify and return nums\n}`,
      python: `def moveZeroes(nums: list[int]) -> list[int]:\n    return nums`,
      cpp: `class Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n    }\n};`,
      java: `class Solution {\n    public void moveZeroes(int[] nums) {\n    }\n}`,
    },
    solutionCode: {
      javascript: `function moveZeroes(nums) {\n  let insertPos = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] !== 0) {\n      const temp = nums[insertPos];\n      nums[insertPos] = nums[i];\n      nums[i] = temp;\n      insertPos++;\n    }\n  }\n  return nums;\n}`,
      python: `def moveZeroes(nums: list[int]) -> list[int]:\n    pos = 0\n    for i in range(len(nums)):\n        if nums[i] != 0:\n            nums[pos], nums[i] = nums[i], nums[pos]\n            pos += 1\n    return nums`,
      cpp: `class Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        int pos = 0;\n        for (int i = 0; i < nums.size(); i++) {\n            if (nums[i] != 0) swap(nums[pos++], nums[i]);\n        }\n    }\n};`,
      java: `class Solution {\n    public void moveZeroes(int[] nums) {\n        int pos = 0;\n        for (int i = 0; i < nums.length; i++) {\n            if (nums[i] != 0) {\n                int temp = nums[pos];\n                nums[pos++] = nums[i];\n                nums[i] = temp;\n            }\n        }\n    }\n}`,
    },
    functionName: 'moveZeroes',
    testCases: [
      { id: 1, input: 'nums = [0, 1, 0, 3, 12]', expectedOutput: '[1, 3, 12, 0, 0]', rawInput: [[0, 1, 0, 3, 12]], rawExpected: [1, 3, 12, 0, 0] },
      { id: 2, input: 'nums = [0]', expectedOutput: '[0]', rawInput: [[0]], rawExpected: [0] },
    ],
    visualSteps: [
      { stepNumber: 1, description: 'Shift non-zero items forward using insert index pointer.', arrayState: [1, 3, 12, 0, 0] },
    ],
    aiHints: ['Use a pointer to track the next index for non-zero elements.'],
    complexity: { time: 'O(N)', space: 'O(1)', approach: 'Two-pointer partition swap.' },
  },

  // 13. Missing Number
  {
    id: 'missing-number',
    title: 'Missing Number',
    category: 'Bit Manipulation',
    companies: ['Amazon', 'Microsoft', 'TCS', 'Wipro'],
    difficulty: 'Easy',
    xp: 40,
    solved: false,
    desc: 'Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.',
    constraints: ['n == nums.length', '1 <= n <= 10^4'],
    examples: [
      { input: 'nums = [3, 0, 1]', output: '2' },
      { input: 'nums = [0, 1]', output: '2' },
    ],
    starterCode: {
      javascript: `function missingNumber(nums) {\n  // Return missing number\n}`,
      python: `def missingNumber(nums: list[int]) -> int:\n    pass`,
      cpp: `class Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int missingNumber(int[] nums) {\n        return 0;\n    }\n}`,
    },
    solutionCode: {
      javascript: `function missingNumber(nums) {\n  const n = nums.length;\n  const expectedSum = (n * (n + 1)) / 2;\n  const actualSum = nums.reduce((a, b) => a + b, 0);\n  return expectedSum - actualSum;\n}`,
      python: `def missingNumber(nums: list[int]) -> int:\n    n = len(nums)\n    return (n * (n + 1)) // 2 - sum(nums)`,
      cpp: `class Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        int n = nums.size();\n        int sum = (n * (n + 1)) / 2;\n        for (int x : nums) sum -= x;\n        return sum;\n    }\n};`,
      java: `class Solution {\n    public int missingNumber(int[] nums) {\n        int n = nums.length;\n        int sum = (n * (n + 1)) / 2;\n        for (int x : nums) sum -= x;\n        return sum;\n    }\n}`,
    },
    functionName: 'missingNumber',
    testCases: [
      { id: 1, input: 'nums = [3, 0, 1]', expectedOutput: '2', rawInput: [[3, 0, 1]], rawExpected: 2 },
      { id: 2, input: 'nums = [0, 1]', expectedOutput: '2', rawInput: [[0, 1]], rawExpected: 2 },
      { id: 3, input: 'nums = [9,6,4,2,3,5,7,0,1]', expectedOutput: '8', rawInput: [[9,6,4,2,3,5,7,0,1]], rawExpected: 8 },
    ],
    visualSteps: [
      { stepNumber: 1, description: 'Sum of 0..n is n*(n+1)/2. ExpectedSum - ActualSum = Missing value.', variables: { missing: 2 } },
    ],
    aiHints: ['Use Gauss formula: n * (n + 1) / 2.'],
    complexity: { time: 'O(N)', space: 'O(1)', approach: "Gauss arithmetic summation difference." },
  },

  // 14. Binary Search / Find Minimum
  {
    id: 'binary-search',
    title: 'Binary Search (O(log N))',
    category: 'Binary Search',
    companies: ['Google', 'Amazon', 'Microsoft', 'TCS Digital'],
    difficulty: 'Easy',
    xp: 60,
    solved: false,
    desc: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If target exists, return its index. Otherwise, return -1.',
    constraints: ['1 <= nums.length <= 10^4', 'All integers in nums are unique.'],
    examples: [
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9', output: '4' },
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2', output: '-1' },
    ],
    starterCode: {
      javascript: `function search(nums, target) {\n  // Return index or -1\n}`,
      python: `def search(nums: list[int], target: int) -> int:\n    pass`,
      cpp: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        return -1;\n    }\n};`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        return -1;\n    }\n}`,
    },
    solutionCode: {
      javascript: `function search(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    const mid = Math.floor((l + r) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) l = mid + 1;\n    else r = mid - 1;\n  }\n  return -1;\n}`,
      python: `def search(nums: list[int], target: int) -> int:\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target: return mid\n        if nums[mid] < target: l = mid + 1\n        else: r = mid - 1\n    return -1`,
      cpp: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int l = 0, r = nums.size() - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n};`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n}`,
    },
    functionName: 'search',
    testCases: [
      { id: 1, input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9', expectedOutput: '4', rawInput: [[-1, 0, 3, 5, 9, 12], 9], rawExpected: 4 },
      { id: 2, input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2', expectedOutput: '-1', rawInput: [[-1, 0, 3, 5, 9, 12], 2], rawExpected: -1 },
    ],
    visualSteps: [
      { stepNumber: 1, description: 'Halve the search space repeatedly using middle index pivot.', arrayState: [-1, 0, 3, 5, 9, 12], activeIndices: [4], variables: { target: 9, foundAt: 4 } },
    ],
    aiHints: ['mid = Math.floor((l + r) / 2).'],
    complexity: { time: 'O(log N)', space: 'O(1)', approach: 'Divide and conquer binary search.' },
  },

  // 15. Merge Sorted Arrays
  {
    id: 'merge-sorted-array',
    title: 'Merge Sorted Array',
    category: 'Two Pointers',
    companies: ['Amazon', 'Facebook', 'Microsoft', 'Cognizant'],
    difficulty: 'Easy',
    xp: 55,
    solved: false,
    desc: 'You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order. Merge `nums2` into `nums1` as one sorted array and return the result.',
    constraints: ['nums1.length == m + n', 'nums2.length == n'],
    examples: [
      { input: 'nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3', output: '[1, 2, 2, 3, 5, 6]' },
    ],
    starterCode: {
      javascript: `function merge(nums1, m, nums2, n) {\n  // Merge nums2 into nums1 and return nums1\n}`,
      python: `def merge(nums1: list[int], m: int, nums2: list[int], n: int) -> list[int]:\n    return nums1`,
      cpp: `class Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n    }\n};`,
      java: `class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n    }\n}`,
    },
    solutionCode: {
      javascript: `function merge(nums1, m, nums2, n) {\n  let p1 = m - 1, p2 = n - 1, p = m + n - 1;\n  while (p2 >= 0) {\n    if (p1 >= 0 && nums1[p1] > nums2[p2]) {\n      nums1[p] = nums1[p1--];\n    } else {\n      nums1[p] = nums2[p2--];\n    }\n    p--;\n  }\n  return nums1;\n}`,
      python: `def merge(nums1: list[int], m: int, nums2: list[int], n: int) -> list[int]:\n    p1, p2, p = m - 1, n - 1, m + n - 1\n    while p2 >= 0:\n        if p1 >= 0 and nums1[p1] > nums2[p2]:\n            nums1[p] = nums1[p1]\n            p1 -= 1\n        else:\n            nums1[p] = nums2[p2]\n            p2 -= 1\n        p -= 1\n    return nums1`,
      cpp: `class Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        int p1 = m - 1, p2 = n - 1, p = m + n - 1;\n        while (p2 >= 0) {\n            if (p1 >= 0 && nums1[p1] > nums2[p2]) nums1[p--] = nums1[p1--];\n            else nums1[p--] = nums2[p2--];\n        }\n    }\n};`,
      java: `class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        int p1 = m - 1, p2 = n - 1, p = m + n - 1;\n        while (p2 >= 0) {\n            if (p1 >= 0 && nums1[p1] > nums2[p2]) nums1[p--] = nums1[p1--];\n            else nums1[p--] = nums2[p2--];\n        }\n    }\n}`,
    },
    functionName: 'merge',
    testCases: [
      { id: 1, input: 'nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3', expectedOutput: '[1, 2, 2, 3, 5, 6]', rawInput: [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3], rawExpected: [1, 2, 2, 3, 5, 6] },
    ],
    visualSteps: [
      { stepNumber: 1, description: 'Merge backwards from the end of nums1 to prevent overwriting existing elements.', arrayState: [1, 2, 2, 3, 5, 6] },
    ],
    aiHints: ['Fill from the back (largest elements first).'],
    complexity: { time: 'O(M + N)', space: 'O(1)', approach: 'Three-pointer backward placement.' },
  },

  // 16. Longest Substring Without Repeating Characters
  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating',
    category: 'Sliding Window',
    companies: ['Amazon', 'Google', 'Microsoft', 'Zoho'],
    difficulty: 'Medium',
    xp: 95,
    solved: false,
    desc: 'Given a string `s`, find the length of the longest substring without duplicate characters using sliding window.',
    constraints: ['0 <= s.length <= 5 * 10^4'],
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with length 3.' },
      { input: 's = "bbbbb"', output: '1' },
    ],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {\n  // Return max length\n}`,
      python: `def lengthOfLongestSubstring(s: str) -> int:\n    pass`,
      cpp: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        return 0;\n    }\n}`,
    },
    solutionCode: {
      javascript: `function lengthOfLongestSubstring(s) {\n  const set = new Set();\n  let left = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    while (set.has(s[right])) {\n      set.delete(s[left++]);\n    }\n    set.add(s[right]);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}`,
      python: `def lengthOfLongestSubstring(s: str) -> int:\n    char_set = set()\n    left, max_len = 0, 0\n    for right in range(len(s)):\n        while s[right] in char_set:\n            char_set.remove(s[left])\n            left += 1\n        char_set.add(s[right])\n        max_len = max(max_len, right - left + 1)\n    return max_len`,
      cpp: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_set<char> st;\n        int left = 0, maxLen = 0;\n        for (int right = 0; right < s.size(); right++) {\n            while (st.count(s[right])) st.erase(s[left++]);\n            st.insert(s[right]);\n            maxLen = max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n};`,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        HashSet<Character> set = new HashSet<>();\n        int left = 0, maxLen = 0;\n        for (int right = 0; right < s.length(); right++) {\n            while (set.contains(s.charAt(right))) set.remove(s.charAt(left++));\n            set.add(s.charAt(right));\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n}`,
    },
    functionName: 'lengthOfLongestSubstring',
    testCases: [
      { id: 1, input: 's = "abcabcbb"', expectedOutput: '3', rawInput: ['abcabcbb'], rawExpected: 3 },
      { id: 2, input: 's = "bbbbb"', expectedOutput: '1', rawInput: ['bbbbb'], rawExpected: 1 },
      { id: 3, input: 's = "pwwkew"', expectedOutput: '3', rawInput: ['pwwkew'], rawExpected: 3 },
    ],
    visualSteps: [
      { stepNumber: 1, description: 'Sliding window expands on right and contracts on left upon duplicate collision.', variables: { maxLen: 3 } },
    ],
    aiHints: ['Use a Set to maintain distinct window elements.'],
    complexity: { time: 'O(N)', space: 'O(min(N, M))', approach: 'Sliding window with dynamic set eviction.' },
  },
];
