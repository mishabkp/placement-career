export interface CompanyQuestion {
  id: string;
  round: 'Online Assessment' | 'Technical Round' | 'Managerial / HR';
  topic: string;
  question: string;
  solutionHint: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface HiringRound {
  step: number;
  title: string;
  type: string;
  duration: string;
  details: string;
  cutoffScore: string;
}

export interface CompanyDrive {
  id: string;
  name: string;
  shortName: string;
  logoBg: string;
  category: 'Mass Recruiter' | 'Product Giant' | 'Top IT Services' | 'FinTech / Startup' | 'Core Engineering';
  roles: { title: string; ctc: string; type: string }[];
  ctcOverview: string;
  driveStatus: 'Registration Open' | 'Upcoming Drive' | 'Completed';
  deadlineDate: string;
  driveDate: string;
  eligibility: {
    minCgpa: number;
    min10thPercent: number;
    min12thPercent: number;
    maxBacklogs: number;
    allowedBranches: string[];
  };
  rounds: HiringRound[];
  questions: CompanyQuestion[];
  quickTips: string[];
  sampleTestId?: string;
}

export const COMPANY_DRIVES_DATA: CompanyDrive[] = [
  {
    id: 'tcs',
    name: 'Tata Consultancy Services (TCS)',
    shortName: 'TCS',
    logoBg: 'from-blue-600 to-indigo-700',
    category: 'Mass Recruiter',
    roles: [
      { title: 'TCS Ninja', ctc: '₹3.6 - ₹4.0 LPA', type: 'Full-time' },
      { title: 'TCS Digital', ctc: '₹7.0 - ₹7.5 LPA', type: 'Full-time' },
      { title: 'TCS Prime', ctc: '₹9.0 - ₹11.5 LPA', type: 'Full-time' }
    ],
    ctcOverview: '₹3.60 - ₹11.50 LPA',
    driveStatus: 'Registration Open',
    deadlineDate: 'October 15, 2026',
    driveDate: 'October 24-26, 2026',
    eligibility: {
      minCgpa: 6.0,
      min10thPercent: 60,
      min12thPercent: 60,
      maxBacklogs: 1,
      allowedBranches: ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil']
    },
    rounds: [
      {
        step: 1,
        title: 'TCS NQT (Foundation + Advanced)',
        type: 'Online Timed Assessment',
        duration: '165 Mins',
        details: 'Numerical Ability, Verbal, Reasoning, followed by Advanced Coding (2 problems in C/C++/Java/Python).',
        cutoffScore: '65% overall'
      },
      {
        step: 2,
        title: 'Technical Interview',
        type: '1-on-1 Virtual / In-Person',
        duration: '30-45 Mins',
        details: 'Core CS subjects (DBMS, OOPs, OS), Final Year Project deep dive, and live coding explanation.',
        cutoffScore: 'Technical Rating >= 7/10'
      },
      {
        step: 3,
        title: 'Managerial & HR Round',
        type: 'Behavioral Assessment',
        duration: '20-30 Mins',
        details: 'Situational questions, adaptability, relocation willingness, and verification of documents.',
        cutoffScore: 'HR Clearance'
      }
    ],
    questions: [
      {
        id: 'tcs-q1',
        round: 'Online Assessment',
        topic: 'Quantitative Aptitude',
        question: 'A shopkeeper gives two successive discounts of 15% and 10% on a marked price of ₹2000. What is the final selling price?',
        solutionHint: 'Effective discount = 15 + 10 - (15*10)/100 = 23.5%. SP = 76.5% of 2000 = ₹1530.',
        difficulty: 'Easy'
      },
      {
        id: 'tcs-q2',
        round: 'Technical Round',
        topic: 'Core CS / DBMS',
        question: 'What is the primary difference between Clustered and Non-Clustered Index in SQL?',
        solutionHint: 'Clustered index determines the physical order of data in the table (only 1 per table). Non-clustered creates a separate logical pointer structure (multiple allowed).',
        difficulty: 'Medium'
      },
      {
        id: 'tcs-q3',
        round: 'Technical Round',
        topic: 'Data Structures / Strings',
        question: 'Find the first non-repeating character in a string with optimal time complexity.',
        solutionHint: 'Use a frequency hash map / array of size 256. Pass 1: count frequencies O(n). Pass 2: find first character with frequency 1. Total time O(n), space O(1).',
        difficulty: 'Easy'
      }
    ],
    quickTips: [
      'Focus on Numerical Ability speed; there is sectional timing in NQT.',
      'Prepare your final year project architecture thoroughly for Technical Round.',
      'Practice basic recursion, string manipulation, and array algorithms.'
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys Limited',
    shortName: 'Infosys',
    logoBg: 'from-sky-600 to-blue-800',
    category: 'Mass Recruiter',
    roles: [
      { title: 'Systems Engineer (SE)', ctc: '₹3.6 - ₹4.0 LPA', type: 'Full-time' },
      { title: 'Specialist Programmer (SP)', ctc: '₹9.5 LPA', type: 'Full-time' },
      { title: 'Digital Specialist Engineer (DSE)', ctc: '₹6.5 LPA', type: 'Full-time' }
    ],
    ctcOverview: '₹3.60 - ₹9.50 LPA',
    driveStatus: 'Upcoming Drive',
    deadlineDate: 'November 05, 2026',
    driveDate: 'November 18, 2026',
    eligibility: {
      minCgpa: 6.5,
      min10thPercent: 60,
      min12thPercent: 60,
      maxBacklogs: 0,
      allowedBranches: ['CSE', 'IT', 'ECE', 'EEE']
    },
    rounds: [
      {
        step: 1,
        title: 'Infosys Online Test (InfyTQ / Campus)',
        type: 'Online Aptitude & Reasoning',
        duration: '100 Mins',
        details: 'Reasoning Ability (15 Qs), Technical Ability (10 Qs), Verbal Ability (20 Qs), Pseudocode (5 Qs), Numerical (10 Qs).',
        cutoffScore: '70% overall'
      },
      {
        step: 2,
        title: 'Technical + HR Combined Interview',
        type: 'Comprehensive Interview',
        duration: '35-50 Mins',
        details: 'Problem solving, OOP concepts, Python/Java basics, resume walkthrough, and behavioral questions.',
        cutoffScore: 'Pass recommendation'
      }
    ],
    questions: [
      {
        id: 'inf-q1',
        round: 'Online Assessment',
        topic: 'Pseudocode / Logic',
        question: 'Identify the output of a nested loop logic calculating bitwise XOR operations across array elements.',
        solutionHint: 'Trace variables step-by-step; remember a XOR a = 0 and a XOR 0 = a.',
        difficulty: 'Medium'
      },
      {
        id: 'inf-q2',
        round: 'Technical Round',
        topic: 'OOP Concepts',
        question: 'Explain Runtime Polymorphism and why virtual destructors are required in C++ / Java design.',
        solutionHint: 'Runtime polymorphism is achieved via method overriding. Virtual destructors ensure child class cleanup runs properly when deleted via base pointer.',
        difficulty: 'Medium'
      }
    ],
    quickTips: [
      'Pseudocode section in Infosys test has high weightage.',
      'Demonstrate clear conceptual knowledge of OOPs and SQL queries.'
    ]
  },
  {
    id: 'zoho',
    name: 'Zoho Corporation',
    shortName: 'Zoho',
    logoBg: 'from-red-600 to-amber-600',
    category: 'Product Giant',
    roles: [
      { title: 'Software Developer', ctc: '₹6.5 - ₹8.5 LPA', type: 'Full-time' },
      { title: 'Member Technical Staff', ctc: '₹10.0 - ₹12.0 LPA', type: 'Full-time' }
    ],
    ctcOverview: '₹6.50 - ₹12.00 LPA',
    driveStatus: 'Registration Open',
    deadlineDate: 'October 28, 2026',
    driveDate: 'November 08-10, 2026',
    eligibility: {
      minCgpa: 0, // No CGPA cutoff!
      min10thPercent: 0,
      min12thPercent: 0,
      maxBacklogs: 2,
      allowedBranches: ['All Engineering Branches & BCA / MCA']
    },
    rounds: [
      {
        step: 1,
        title: 'Round 1: General Aptitude & C/C++ Output',
        type: 'Written / Online MCQ',
        duration: '90 Mins',
        details: 'Tricky C pointers, loops, recursion tracing, and basic quantitative questions.',
        cutoffScore: 'Top 15% batch'
      },
      {
        step: 2,
        title: 'Round 2: Basic Programming (DSA)',
        type: 'Hands-on Coding',
        duration: '120 Mins',
        details: '5 algorithmic and pattern problems without using standard library shortcuts.',
        cutoffScore: 'All 5 test cases passing'
      },
      {
        step: 3,
        title: 'Round 3: Advanced System / App Design',
        type: 'Application Development',
        duration: '150 Mins',
        details: 'Build a mini console/CLI application from scratch (e.g. Railway Reservation, ATM Machine, Snake Game).',
        cutoffScore: 'Functional Modular Code'
      },
      {
        step: 4,
        title: 'Round 4 & 5: Tech + HR Interview',
        type: 'F2F Technical & Fit',
        duration: '45 Mins',
        details: 'Code review of your Round 3 application and problem solving attitude test.',
        cutoffScore: 'Selection'
      }
    ],
    questions: [
      {
        id: 'zoho-q1',
        round: 'Online Assessment',
        topic: 'C Pointers & Storage Classes',
        question: 'What is the output of `char *str = "Zoho"; *(str+1) = \'O\'; printf("%s", str);`?',
        solutionHint: 'Undefined behavior / Segmentation fault because string literals are stored in read-only data segment.',
        difficulty: 'Medium'
      },
      {
        id: 'zoho-q2',
        round: 'Technical Round',
        topic: 'Design / Implementation',
        question: 'Design a console-based Parking Lot Management system supporting different vehicle sizes and hourly fee calculation.',
        solutionHint: 'Use OOP classes: Vehicle, ParkingSpot (Compact/Large/Bike), ParkingLot, Ticket. Maintain available slot count with clean modular methods.',
        difficulty: 'Hard'
      }
    ],
    quickTips: [
      'Zoho doesn’t care about CGPA or branch—pure coding and logic matter.',
      'Master C pointers, recursion, and modular console app design.',
      'Do not use high-level built-in shortcut functions; write clean loops.'
    ]
  },
  {
    id: 'accenture',
    name: 'Accenture India',
    shortName: 'Accenture',
    logoBg: 'from-purple-700 to-indigo-800',
    category: 'Top IT Services',
    roles: [
      { title: 'Associate Software Engineer (ASE)', ctc: '₹4.5 LPA', type: 'Full-time' },
      { title: 'Advanced ASE', ctc: '₹6.5 - ₹7.0 LPA', type: 'Full-time' }
    ],
    ctcOverview: '₹4.50 - ₹7.00 LPA',
    driveStatus: 'Upcoming Drive',
    deadlineDate: 'November 12, 2026',
    driveDate: 'November 22, 2026',
    eligibility: {
      minCgpa: 6.5,
      min10thPercent: 65,
      min12thPercent: 65,
      maxBacklogs: 0,
      allowedBranches: ['CSE', 'IT', 'ECE', 'EEE', 'Circuital']
    },
    rounds: [
      {
        step: 1,
        title: 'Cognitive & Technical Assessment',
        type: 'Online Elimination Test',
        duration: '90 Mins',
        details: 'English Ability, Critical Thinking, Abstract Reasoning, MS Office, Pseudocode, Common Cloud & Security basics.',
        cutoffScore: 'Sectional & Overall Cutoff'
      },
      {
        step: 2,
        title: 'Coding Assessment',
        type: '2 Coding Questions',
        duration: '45 Mins',
        details: 'Array, string, and number theory problem solving in chosen language.',
        cutoffScore: 'At least 1 full + 1 partial'
      },
      {
        step: 3,
        title: 'Communication Assessment & Interview',
        type: 'Voice AI + Video Interview',
        duration: '30 Mins',
        details: 'Automated speech assessment (pronunciation, fluency) followed by technical/learning agility interview.',
        cutoffScore: 'Grade A / Pass'
      }
    ],
    questions: [
      {
        id: 'acc-q1',
        round: 'Online Assessment',
        topic: 'Cloud & Network Fundamentals',
        question: 'What is the main difference between IaaS, PaaS, and SaaS cloud service delivery models?',
        solutionHint: 'IaaS gives raw infrastructure (EC2), PaaS gives runtime environment (Heroku/App Engine), SaaS delivers completed application software (Google Docs).',
        difficulty: 'Easy'
      },
      {
        id: 'acc-q2',
        round: 'Technical Round',
        topic: 'Array Algorithms',
        question: 'Given an array of integers, calculate the maximum difference between any two elements such that larger element appears after the smaller element.',
        solutionHint: 'Keep track of minimum element so far and maximum difference. Single O(n) pass with O(1) space.',
        difficulty: 'Medium'
      }
    ],
    quickTips: [
      'Cloud, Security fundamentals, and MS Office questions are unique to Accenture.',
      'Speak clearly and steadily during the automated voice communication test.'
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon Web Services / Retail',
    shortName: 'Amazon',
    logoBg: 'from-amber-500 to-orange-600',
    category: 'Product Giant',
    roles: [
      { title: 'Software Development Engineer 1 (SDE-1)', ctc: '₹18.0 - ₹28.0 LPA', type: 'Full-time' },
      { title: 'SDE Intern', ctc: '₹80,000 / month', type: 'Internship' }
    ],
    ctcOverview: '₹18.00 - ₹28.00 LPA',
    driveStatus: 'Upcoming Drive',
    deadlineDate: 'December 01, 2026',
    driveDate: 'December 15, 2026',
    eligibility: {
      minCgpa: 7.0,
      min10thPercent: 70,
      min12thPercent: 70,
      maxBacklogs: 0,
      allowedBranches: ['CSE', 'IT', 'ECE', 'Mathematics & Computing']
    },
    rounds: [
      {
        step: 1,
        title: 'Amazon Online Assessment (OA 1 & 2)',
        type: 'Online Platform',
        duration: '120 Mins',
        details: '2 Medium-Hard LeetCode style DSA problems + Amazon Work Style Simulation (Leadership Principles).',
        cutoffScore: 'All Test Cases Passed'
      },
      {
        step: 2,
        title: 'Technical Round 1 (DSA & Coding)',
        type: 'Live Coding Interview',
        duration: '60 Mins',
        details: 'Trees, Graphs, Dynamic Programming, Heaps, and space-time optimization with clean code.',
        cutoffScore: 'Hire recommendation'
      },
      {
        step: 3,
        title: 'Technical Round 2 + Leadership Principles',
        type: 'System Design & Behavioral',
        duration: '60 Mins',
        details: 'Low-Level Design (LLD), OOP design patterns, and Amazon 16 Leadership Principles questions.',
        cutoffScore: 'Bar Raiser Clearance'
      }
    ],
    questions: [
      {
        id: 'amz-q1',
        round: 'Technical Round',
        topic: 'Trees & Graphs',
        question: 'Given a Binary Tree, find the Lowest Common Ancestor (LCA) of two given nodes in O(n) time.',
        solutionHint: 'Use bottom-up DFS recursion. If current root matches p or q, return root. Recurse left and right; if both return non-null, root is LCA.',
        difficulty: 'Medium'
      },
      {
        id: 'amz-q2',
        round: 'Managerial / HR',
        topic: 'Leadership Principle (Customer Obsession)',
        question: 'Tell me about a time when you had to make a tough trade-off between project deadlines and code quality for the end customer.',
        solutionHint: 'Answer using the STAR method (Situation, Task, Action, Result) with measurable customer impact.',
        difficulty: 'Medium'
      }
    ],
    quickTips: [
      'Amazon places 50% weight on Leadership Principles (Customer Obsession, Ownership, Bias for Action).',
      'Always discuss time and space complexity before writing any code.',
      'Master Graphs (BFS/DFS), Binary Trees, and Dynamic Programming.'
    ]
  },
  {
    id: 'ti',
    name: 'Texas Instruments',
    shortName: 'TI',
    logoBg: 'from-red-700 to-rose-900',
    category: 'Core Engineering',
    roles: [
      { title: 'Analog Design Engineer', ctc: '₹18.0 - ₹24.0 LPA', type: 'Full-time' },
      { title: 'Embedded Software Engineer', ctc: '₹15.0 - ₹19.5 LPA', type: 'Full-time' },
      { title: 'Digital Design / VLSI Intern', ctc: '₹14.0 - ₹18.0 LPA', type: 'Full-time' }
    ],
    ctcOverview: '₹14.00 - ₹24.00 LPA',
    driveStatus: 'Registration Open',
    deadlineDate: 'October 30, 2026',
    driveDate: 'November 12-14, 2026',
    eligibility: {
      minCgpa: 7.5,
      min10thPercent: 70,
      min12thPercent: 70,
      maxBacklogs: 0,
      allowedBranches: ['ECE', 'EEE', 'Electronics', 'Electrical']
    },
    rounds: [
      {
        step: 1,
        title: 'TI Online Technical Test',
        type: 'Domain Specific MCQ & Circuit Solving',
        duration: '90 Mins',
        details: 'Op-Amps, RC circuits, Digital Logic, CMOS, Microcontrollers, and C programming fundamentals.',
        cutoffScore: 'Top 10% cutoff'
      },
      {
        step: 2,
        title: 'Core Technical Round 1 (Circuit Analysis)',
        type: '1-on-1 Whiteboard',
        duration: '60 Mins',
        details: 'Live circuit schematic design, small-signal model calculations, and oscilloscope debugging problems.',
        cutoffScore: 'Technical Rating >= 8/10'
      },
      {
        step: 3,
        title: 'Core Technical Round 2 & Fitment',
        type: 'Deep Dive Technical',
        duration: '45 Mins',
        details: 'Lab project implementation, hardware trade-offs, and behavioral questions.',
        cutoffScore: 'Selection'
      }
    ],
    questions: [
      {
        id: 'ti-q1',
        round: 'Online Assessment',
        topic: 'Analog Electronics',
        question: 'What is the unity-gain bandwidth of an operational amplifier with an open-loop gain of 100 dB and a dominant pole at 10 Hz?',
        solutionHint: '100 dB = 10^5 gain. Unity Gain Bandwidth (UGB) = A0 * f0 = 10^5 * 10 Hz = 1 MHz.',
        difficulty: 'Medium'
      },
      {
        id: 'ti-q2',
        round: 'Technical Round',
        topic: 'Embedded C / Microcontrollers',
        question: 'Why is the `volatile` keyword essential in microcontroller interrupt service routines (ISRs)?',
        solutionHint: 'It prevents the compiler from optimizing out memory reads from hardware registers or variables modified asynchronously by ISRs.',
        difficulty: 'Medium'
      }
    ],
    quickTips: [
      'Master RC circuits, pole-zero calculations, and Op-Amp configurations.',
      'Be prepared to derive Bode plots and frequency response on paper.',
      'Strongly brush up on C pointer arithmetic and register manipulation.'
    ]
  },
  {
    id: 'tatamotors',
    name: 'Tata Motors',
    shortName: 'Tata Motors',
    logoBg: 'from-blue-700 to-slate-900',
    category: 'Core Engineering',
    roles: [
      { title: 'Graduate Engineer Trainee (GET)', ctc: '₹6.5 - ₹8.5 LPA', type: 'Full-time' },
      { title: 'EV Powertrain Design Engineer', ctc: '₹8.0 - ₹10.5 LPA', type: 'Full-time' }
    ],
    ctcOverview: '₹6.50 - ₹10.50 LPA',
    driveStatus: 'Registration Open',
    deadlineDate: 'November 10, 2026',
    driveDate: 'November 22, 2026',
    eligibility: {
      minCgpa: 6.5,
      min10thPercent: 65,
      min12thPercent: 65,
      maxBacklogs: 0,
      allowedBranches: ['Mechanical', 'MECH', 'Automobile', 'EEE', 'Electrical']
    },
    rounds: [
      {
        step: 1,
        title: 'Tata Assessment (Core Mechanical / Electrical + Aptitude)',
        type: 'Online Assessment',
        duration: '90 Mins',
        details: 'Thermodynamics, Strength of Materials, CAD/FEA basics, and Automotive Technology fundamentals.',
        cutoffScore: '65% sectional'
      },
      {
        step: 2,
        title: 'Technical Interview (Core Engineering)',
        type: 'Panel Interview',
        duration: '45 Mins',
        details: 'Final year mechanical project, IC engines vs EV powertrains, material selection, and GD&T drawings.',
        cutoffScore: 'Clearance'
      },
      {
        step: 3,
        title: 'HR & Tata Values Culture Fit',
        type: 'Behavioral',
        duration: '30 Mins',
        details: 'Situational teamwork questions, relocation willingness, and Tata Code of Conduct alignment.',
        cutoffScore: 'Final Selection'
      }
    ],
    questions: [
      {
        id: 'tm-q1',
        round: 'Technical Round',
        topic: 'Strength of Materials',
        question: 'Explain the difference between Tresca and Von Mises yield criteria and which is preferred for ductile materials.',
        solutionHint: 'Von Mises is based on shear strain energy and provides closer agreement with experimental results for ductile metals like steel and aluminum.',
        difficulty: 'Medium'
      }
    ],
    quickTips: [
      'Revise GD&T symbols and standard engineering drawing projection rules.',
      'Be clear on your major project: fabrication methodology, load calculations, and design choices.'
    ]
  },
  {
    id: 'lt_construction',
    name: 'L&T Construction',
    shortName: 'L&T',
    logoBg: 'from-amber-600 to-yellow-800',
    category: 'Core Engineering',
    roles: [
      { title: 'Graduate Engineer Trainee (Civil)', ctc: '₹6.2 - ₹7.5 LPA', type: 'Full-time' },
      { title: 'Site Planning & Estimation Engineer', ctc: '₹6.5 - ₹8.0 LPA', type: 'Full-time' }
    ],
    ctcOverview: '₹6.20 - ₹8.00 LPA',
    driveStatus: 'Upcoming Drive',
    deadlineDate: 'November 15, 2026',
    driveDate: 'December 02, 2026',
    eligibility: {
      minCgpa: 6.75,
      min10thPercent: 65,
      min12thPercent: 65,
      maxBacklogs: 0,
      allowedBranches: ['Civil', 'CIVIL', 'Mechanical', 'MECH']
    },
    rounds: [
      {
        step: 1,
        title: 'L&T National Technical Aptitude Test',
        type: 'Online Exam',
        duration: '90 Mins',
        details: 'RCC Design, Soil Mechanics, Surveying, Fluid Mechanics, and Quantitative/Reasoning.',
        cutoffScore: '70% overall'
      },
      {
        step: 2,
        title: 'Technical Interview',
        type: 'Expert Panel',
        duration: '40 Mins',
        details: 'Concrete technology, IS code specifications (IS 456, IS 800), construction methodology, and BIM.',
        cutoffScore: 'Recommended'
      }
    ],
    questions: [
      {
        id: 'lt-q1',
        round: 'Technical Round',
        topic: 'RCC Design & Codes',
        question: 'What is the minimum grade of concrete recommended by IS 456 for reinforced concrete subjected to moderate exposure conditions?',
        solutionHint: 'IS 456 Table 5 specifies M25 for moderate exposure conditions with minimum cement content of 300 kg/m³.',
        difficulty: 'Easy'
      }
    ],
    quickTips: [
      'Know IS 456:2000 clauses thoroughly (cover requirements, minimum reinforcement, deflection limits).',
      'Be ready with site internship experiences and lab testing procedures (Slump test, compressive cube test).'
    ]
  },
  {
    id: 'schneider',
    name: 'Schneider Electric',
    shortName: 'Schneider',
    logoBg: 'from-emerald-600 to-teal-900',
    category: 'Core Engineering',
    roles: [
      { title: 'Power Systems & Automation Engineer', ctc: '₹7.5 - ₹10.0 LPA', type: 'Full-time' },
      { title: 'R&D Firmware & Controls Trainee', ctc: '₹8.5 - ₹11.5 LPA', type: 'Full-time' }
    ],
    ctcOverview: '₹7.50 - ₹11.50 LPA',
    driveStatus: 'Registration Open',
    deadlineDate: 'November 08, 2026',
    driveDate: 'November 20, 2026',
    eligibility: {
      minCgpa: 7.0,
      min10thPercent: 70,
      min12thPercent: 70,
      maxBacklogs: 0,
      allowedBranches: ['EEE', 'Electrical', 'ECE', 'Electronics', 'Instrumentation']
    },
    rounds: [
      {
        step: 1,
        title: 'Schneider Aptitude & Core Electrical Assessment',
        type: 'Online Test',
        duration: '90 Mins',
        details: 'Power systems, circuit breakers, PLC/SCADA logic, power factor correction, and logical reasoning.',
        cutoffScore: 'Top 15%'
      },
      {
        step: 2,
        title: 'Technical Interview',
        type: 'Technical Panel',
        duration: '45 Mins',
        details: 'Switchgear operation, relay coordination, smart energy management, and electrical project review.',
        cutoffScore: 'Clearance'
      }
    ],
    questions: [
      {
        id: 'se-q1',
        round: 'Technical Round',
        topic: 'Power Protection',
        question: 'Explain why SF6 gas is widely preferred in high voltage circuit breakers.',
        solutionHint: 'SF6 has outstanding dielectric strength (2.5x air) and electronegative properties that rapidly extinguish electric arcs.',
        difficulty: 'Medium'
      }
    ],
    quickTips: [
      'Review PLC ladder logic symbols and basic timers/counters.',
      'Understand industrial energy efficiency solutions and substation layouts.'
    ]
  }
];
