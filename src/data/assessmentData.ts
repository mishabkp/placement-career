export interface Question {
  id: string;
  section: 'Quantitative' | 'Logical Reasoning' | 'Verbal Ability' | 'Core CS' | 'Web & DSA';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  marks: number;
  negativeMarks: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface AssessmentTest {
  id: string;
  title: string;
  shortDesc: string;
  category: 'All-Rounder' | 'Aptitude' | 'Core CS' | 'Frontend/Fullstack' | 'Company-Specific';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Company Mock';
  durationMinutes: number;
  totalMarks: number;
  passPercentage: number;
  negativeMarking: boolean;
  companyTags: string[];
  bannerImage: string;
  questions: Question[];
}

export const ASSESSMENT_TESTS: AssessmentTest[] = [
  {
    id: 'grand-placement-mock',
    title: 'Grand Campus Placement All-Rounder Mock Test',
    shortDesc: 'Comprehensive 20-question placement simulation covering Quantitative Aptitude, Logical Reasoning, Verbal Ability, and Core Computer Science fundamentals.',
    category: 'All-Rounder',
    difficulty: 'Company Mock',
    durationMinutes: 20,
    totalMarks: 20,
    passPercentage: 65,
    negativeMarking: true,
    companyTags: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant'],
    bannerImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
    questions: [
      {
        id: 'q1',
        section: 'Quantitative',
        question: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?',
        options: ['65 seconds', '89 seconds', '100 seconds', '150 seconds'],
        correctOptionIndex: 1,
        explanation: 'Speed of train = 240 / 24 = 10 m/sec. Total distance to cross platform = 240 + 650 = 890 m. Time required = 890 / 10 = 89 seconds.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Easy'
      },
      {
        id: 'q2',
        section: 'Quantitative',
        question: 'A person incurs a loss of 5% by selling a watch for ₹1140. At what price should the watch be sold to earn 5% profit?',
        options: ['₹1200', '₹1230', '₹1260', '₹1290'],
        correctOptionIndex: 2,
        explanation: 'Let Cost Price (CP) be x. 95% of x = ₹1140 => x = (1140 * 100) / 95 = ₹1200. To earn 5% profit, Selling Price = 105% of ₹1200 = ₹1260.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Medium'
      },
      {
        id: 'q3',
        section: 'Quantitative',
        question: 'Two pipes A and B can fill a tank in 20 minutes and 30 minutes respectively. If both pipes are opened together, the time taken to fill the tank is:',
        options: ['10 minutes', '12 minutes', '15 minutes', '25 minutes'],
        correctOptionIndex: 1,
        explanation: 'Work done in 1 min = (1/20) + (1/30) = (3 + 2)/60 = 5/60 = 1/12. Hence the tank is filled in 12 minutes.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Easy'
      },
      {
        id: 'q4',
        section: 'Quantitative',
        question: 'In how many ways can the letters of the word "LEADER" be arranged?',
        options: ['720', '360', '120', '48'],
        correctOptionIndex: 1,
        explanation: 'The word "LEADER" contains 6 letters with 2 "E"s. Total arrangements = 6! / 2! = 720 / 2 = 360.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Medium'
      },
      {
        id: 'q5',
        section: 'Logical Reasoning',
        question: 'Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?',
        options: ['(1/3)', '(1/8)', '(2/8)', '(1/16)'],
        correctOptionIndex: 1,
        explanation: 'This is a simple division series; each number is one-half of the previous number: (1/4) / 2 = (1/8).',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Easy'
      },
      {
        id: 'q6',
        section: 'Logical Reasoning',
        question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
        options: ['Brother', 'Uncle', 'Cousin', 'Father'],
        correctOptionIndex: 3,
        explanation: 'Mother\'s only son is Suresh himself. So, the boy in the photograph is the son of Suresh. Hence, Suresh is the father.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Medium'
      },
      {
        id: 'q7',
        section: 'Logical Reasoning',
        question: 'Statements: All mangoes are golden in color. No golden-colored things are cheap. Conclusions: 1. All mangoes are cheap. 2. Golden-colored mangoes are not cheap.',
        options: ['Only conclusion 1 follows', 'Only conclusion 2 follows', 'Either 1 or 2 follows', 'Neither 1 nor 2 follows'],
        correctOptionIndex: 1,
        explanation: 'Since all mangoes are golden and no golden things are cheap, all mangoes (which are golden) are not cheap. Conclusion 2 directly follows.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Medium'
      },
      {
        id: 'q8',
        section: 'Verbal Ability',
        question: 'Choose the word that is most nearly opposite in meaning (Antonym) to "TRANSIENT":',
        options: ['Fleeting', 'Permanent', 'Fragile', 'Ephemeral'],
        correctOptionIndex: 1,
        explanation: '"Transient" means lasting only for a short time (temporary). The opposite antonym is "Permanent".',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Easy'
      },
      {
        id: 'q9',
        section: 'Verbal Ability',
        question: 'Fill in the blank with the appropriate preposition: "The candidate was disqualified ______ failing the mandatory background verification."',
        options: ['for', 'from', 'with', 'to'],
        correctOptionIndex: 0,
        explanation: 'The correct idiom is "disqualified for (doing something)" or "disqualified on grounds of". "For" is the correct preposition here.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Easy'
      },
      {
        id: 'q10',
        section: 'Verbal Ability',
        question: 'Spot the error in the sentence: "Neither the manager (A) / nor the employees (B) / was present at (C) / the annual general meeting. (D)"',
        options: ['A', 'B', 'C', 'D'],
        correctOptionIndex: 2,
        explanation: 'In "neither... nor" constructions, the verb agrees with the subject closest to it ("employees", which is plural). Therefore, "was present" should be "were present" (Part C).',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Medium'
      },
      {
        id: 'q11',
        section: 'Core CS',
        question: 'Which of the following scheduling algorithms can cause starvation (indefinite postponement)?',
        options: ['First-Come, First-Served (FCFS)', 'Round Robin (RR)', 'Shortest Job First (SJF / Priority)', 'FIFO'],
        correctOptionIndex: 2,
        explanation: 'Shortest Job First (SJF) and Priority Scheduling can cause starvation if shorter or higher-priority processes continuously arrive in the ready queue.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Medium'
      },
      {
        id: 'q12',
        section: 'Core CS',
        question: 'In Relational Database Management Systems (RDBMS), ACID properties stand for:',
        options: [
          'Atomicity, Consistency, Isolation, Durability',
          'Access, Control, Integrity, Data',
          'Availability, Consistency, Identity, Distribution',
          'Authentication, Concurrency, Isolation, Durability'
        ],
        correctOptionIndex: 0,
        explanation: 'ACID in databases stands for Atomicity, Consistency, Isolation, and Durability to guarantee valid transactions even in the event of errors.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Easy'
      },
      {
        id: 'q13',
        section: 'Core CS',
        question: 'Which protocol operates at the Transport Layer of the OSI model and provides connection-oriented, reliable byte-stream transmission?',
        options: ['UDP', 'IP', 'TCP', 'ICMP'],
        correctOptionIndex: 2,
        explanation: 'TCP (Transmission Control Protocol) is the connection-oriented, reliable transport protocol with error checking and flow control.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Easy'
      },
      {
        id: 'q14',
        section: 'Core CS',
        question: 'In Object-Oriented Programming, Polymorphism achieved through method overriding at runtime is known as:',
        options: ['Static Binding', 'Dynamic / Late Binding', 'Compile-time Polymorphism', 'Encapsulation'],
        correctOptionIndex: 1,
        explanation: 'Method overriding resolved at runtime using virtual tables or dynamic dispatch is called Dynamic / Late Binding.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Medium'
      },
      {
        id: 'q15',
        section: 'Web & DSA',
        question: 'What is the time complexity of searching an element in a balanced Binary Search Tree (such as AVL or Red-Black Tree) with n nodes?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctOptionIndex: 1,
        explanation: 'In a balanced BST, the height of the tree is O(log n), so search, insertion, and deletion operations all take O(log n) time.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Easy'
      },
      {
        id: 'q16',
        section: 'Web & DSA',
        question: 'What will be the output of the following JavaScript code snippet?',
        codeSnippet: `console.log(typeof null);\nconsole.log(typeof NaN);\nconsole.log(1 + '2' + 3);`,
        options: [
          '"null", "number", "6"',
          '"object", "number", "123"',
          '"object", "undefined", "123"',
          '"undefined", "number", "15"'
        ],
        correctOptionIndex: 1,
        explanation: 'In JavaScript: typeof null is "object" (historical quirk), typeof NaN is "number", and 1 + "2" + 3 results in string concatenation "123".',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Medium'
      },
      {
        id: 'q17',
        section: 'Web & DSA',
        question: 'Which Data Structure is primarily used to implement Breadth-First Search (BFS) on graphs and trees?',
        options: ['Stack', 'Queue', 'Priority Queue', 'Array List'],
        correctOptionIndex: 1,
        explanation: 'BFS explores neighbor nodes level-by-level in FIFO order, which is implemented using a Queue data structure.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Easy'
      },
      {
        id: 'q18',
        section: 'Web & DSA',
        question: 'In React, which hook is used to perform side-effects such as data fetching, subscriptions, or manually changing the DOM?',
        options: ['useMemo', 'useState', 'useRef', 'useEffect'],
        correctOptionIndex: 3,
        explanation: 'The useEffect hook lets you perform side effects in functional React components.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Easy'
      },
      {
        id: 'q19',
        section: 'Core CS',
        question: 'What is the minimum number of conditions required simultaneously for a Deadlock to occur in an Operating System?',
        options: ['2 conditions', '3 conditions', '4 conditions (Coffman conditions)', '1 condition'],
        correctOptionIndex: 2,
        explanation: 'All 4 Coffman conditions must hold simultaneously for a deadlock: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Medium'
      },
      {
        id: 'q20',
        section: 'Web & DSA',
        question: 'What is the output of the following C++ code snippet?',
        codeSnippet: `int a = 5;\nint b = a++ + ++a;\ncout << b;`,
        options: ['10', '12', '11', '13'],
        correctOptionIndex: 1,
        explanation: 'Initial a = 5. In "a++", evaluated value is 5 (then a becomes 6). Next "++a" increments a to 7 and evaluates as 7. Thus b = 5 + 7 = 12.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: 'tcs-nqt-aptitude',
    title: 'TCS NQT & Mass Recruiter Aptitude Special',
    shortDesc: 'Focused quantitative and reasoning test matching TCS NQT, Cognizant, and Wipro placement drive test patterns with negative marking.',
    category: 'Aptitude',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    totalMarks: 15,
    passPercentage: 60,
    negativeMarking: true,
    companyTags: ['TCS NQT', 'Wipro Elite', 'Accenture ASE', 'Cognizant GenC'],
    bannerImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    questions: [
      {
        id: 't1',
        section: 'Quantitative',
        question: 'A sum of money at simple interest amounts to ₹815 in 3 years and to ₹854 in 4 years. The sum is:',
        options: ['₹650', '₹690', '₹698', '₹700'],
        correctOptionIndex: 2,
        explanation: 'S.I. for 1 year = ₹(854 - 815) = ₹39. S.I. for 3 years = ₹(39 * 3) = ₹117. Principal = ₹(815 - 117) = ₹698.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Easy'
      },
      {
        id: 't2',
        section: 'Quantitative',
        question: 'A vendor bought toffees at 6 for a rupee. How many for a rupee must he sell to gain 20%?',
        options: ['3', '4', '5', '6'],
        correctOptionIndex: 2,
        explanation: 'CP of 6 toffees = ₹1. CP of 1 toffee = ₹(1/6). Desired SP for 1 toffee = 120% of (1/6) = (6/5) * (1/6) = ₹(1/5). Thus, for ₹1, he must sell 5 toffees.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Medium'
      },
      {
        id: 't3',
        section: 'Logical Reasoning',
        question: 'Find the missing number in the sequence: 4, 9, 25, 49, 121, 169, ?',
        options: ['225', '256', '289', '361'],
        correctOptionIndex: 2,
        explanation: 'The series represents squares of prime numbers: 2^2, 3^2, 5^2, 7^2, 11^2, 13^2, 17^2. 17^2 = 289.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Medium'
      },
      {
        id: 't4',
        section: 'Logical Reasoning',
        question: 'If "CLOUD" is coded as "GPRYH", how is "RAINY" written in that code?',
        options: ['VEMRC', 'UEMRD', 'VERMC', 'UFLRC'],
        correctOptionIndex: 0,
        explanation: 'Each letter is shifted forward by +4 positions: R(+4)=V, A(+4)=E, I(+4)=M, N(+4)=R, Y(+4)=C. Hence "VEMRC".',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Easy'
      },
      {
        id: 't5',
        section: 'Quantitative',
        question: 'What is the probability of getting a sum 9 from two throws of a standard dice?',
        options: ['1/6', '1/8', '1/9', '1/12'],
        correctOptionIndex: 2,
        explanation: 'Total outcomes = 36. Favorable combinations for sum 9: (3,6), (4,5), (5,4), (6,3) = 4 outcomes. Probability = 4 / 36 = 1/9.',
        marks: 1,
        negativeMarks: 0.25,
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'core-cs-fundamentals',
    title: 'Core CS Foundations (OS, DBMS, Networks & OOPs)',
    shortDesc: 'Designed to test fundamental computer science knowledge asked in Technical Round 1 interviews of top software companies.',
    category: 'Core CS',
    difficulty: 'Advanced',
    durationMinutes: 15,
    totalMarks: 10,
    passPercentage: 70,
    negativeMarking: false,
    companyTags: ['Amazon', 'Microsoft', 'Zoho', 'Oracle', 'Cisco'],
    bannerImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    questions: [
      {
        id: 'c1',
        section: 'Core CS',
        question: 'Which normal form eliminates partial dependency on a composite primary key in relational databases?',
        options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)'],
        correctOptionIndex: 1,
        explanation: '2NF requires the table to be in 1NF and that all non-key attributes are fully functionally dependent on the primary key (no partial dependencies).',
        marks: 1,
        negativeMarks: 0,
        difficulty: 'Medium'
      },
      {
        id: 'c2',
        section: 'Core CS',
        question: 'What is the size of an IPv4 address and an IPv6 address in bits?',
        options: ['32 bits and 64 bits', '32 bits and 128 bits', '64 bits and 128 bits', '16 bits and 64 bits'],
        correctOptionIndex: 1,
        explanation: 'IPv4 addresses are 32 bits (4 bytes) long, whereas IPv6 addresses are 128 bits (16 bytes) long.',
        marks: 1,
        negativeMarks: 0,
        difficulty: 'Easy'
      },
      {
        id: 'c3',
        section: 'Core CS',
        question: 'Which page replacement algorithm suffers from Belady\'s Anomaly (where increasing the number of page frames results in an increase in page faults)?',
        options: ['Least Recently Used (LRU)', 'Optimal Page Replacement (OPT)', 'First-In, First-Out (FIFO)', 'Least Frequently Used (LFU)'],
        correctOptionIndex: 2,
        explanation: 'FIFO algorithm suffers from Belady\'s Anomaly. Stack-based algorithms like LRU and Optimal do not suffer from Belady\'s anomaly.',
        marks: 1,
        negativeMarks: 0,
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: 'frontend-react-mastery',
    title: 'Frontend & Full-Stack React / Web Development',
    shortDesc: 'Modern assessment testing TypeScript, React Lifecycle, JavaScript Async/Event loop, CSS Flexbox/Grid, and Web APIs.',
    category: 'Frontend/Fullstack',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    totalMarks: 10,
    passPercentage: 70,
    negativeMarking: false,
    companyTags: ['Startups', 'Product Companies', 'Swiggy', 'Razorpay', 'CRED'],
    bannerImage: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800&auto=format&fit=crop',
    questions: [
      {
        id: 'f1',
        section: 'Web & DSA',
        question: 'What is the purpose of the React "key" prop in lists?',
        options: [
          'To style the list element uniquely',
          'To help React identify which items have changed, been added, or been removed during reconciliation',
          'To bind event listeners directly to DOM nodes',
          'To declare CSS animations'
        ],
        correctOptionIndex: 1,
        explanation: 'Keys help React identify which items have changed, are added, or are removed, giving elements a stable identity across renders.',
        marks: 1,
        negativeMarks: 0,
        difficulty: 'Easy'
      },
      {
        id: 'f2',
        section: 'Web & DSA',
        question: 'Which of the following creates a microtask in the JavaScript event loop?',
        options: ['setTimeout()', 'setInterval()', 'Promise.then() / queueMicrotask()', 'setImmediate()'],
        correctOptionIndex: 2,
        explanation: 'Promises (Promise.then/catch/finally) and queueMicrotask execute in the Microtask queue, which has higher priority than macrotasks (setTimeout).',
        marks: 1,
        negativeMarks: 0,
        difficulty: 'Medium'
      }
    ]
  }
];

export interface PastAssessmentResult {
  id: string;
  testId: string;
  testTitle: string;
  date: string;
  score: number;
  totalMarks: number;
  percentage: number;
  percentile: number;
  passed: boolean;
  timeSpentSeconds: number;
  sectionScores: Record<string, { correct: number; total: number }>;
}

export const MOCK_PAST_RESULTS: PastAssessmentResult[] = [
  {
    id: 'res-1',
    testId: 'grand-placement-mock',
    testTitle: 'Grand Campus Placement All-Rounder Mock Test',
    date: 'Yesterday, 4:30 PM',
    score: 16.75,
    totalMarks: 20,
    percentage: 83.75,
    percentile: 94.2,
    passed: true,
    timeSpentSeconds: 980,
    sectionScores: {
      'Quantitative': { correct: 3, total: 4 },
      'Logical Reasoning': { correct: 3, total: 3 },
      'Verbal Ability': { correct: 2, total: 3 },
      'Core CS': { correct: 4, total: 5 },
      'Web & DSA': { correct: 4, total: 5 }
    }
  },
  {
    id: 'res-2',
    testId: 'tcs-nqt-aptitude',
    testTitle: 'TCS NQT & Mass Recruiter Aptitude Special',
    date: '3 days ago',
    score: 12.5,
    totalMarks: 15,
    percentage: 83.3,
    percentile: 91.5,
    passed: true,
    timeSpentSeconds: 620,
    sectionScores: {
      'Quantitative': { correct: 2, total: 3 },
      'Logical Reasoning': { correct: 2, total: 2 }
    }
  }
];
