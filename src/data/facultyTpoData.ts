export interface StudentRecord {
  id: string;
  name: string;
  rollNo: string;
  email: string;
  branch: 'CSE' | 'IT' | 'ECE' | 'EEE' | 'MECH' | 'CIVIL';
  cgpa: number;
  tenthPercent: number;
  twelfthPercent: number;
  backlogs: number;
  atsScore: number;
  assessmentScore: number;
  placementStatus: 'Placed' | 'Shortlisted' | 'Ready' | 'Needs Training';
  companyOffer?: {
    company: string;
    packageCtc: string;
    role: string;
  };
  skills: string[];
}

export interface TPODriveAnnouncement {
  id: string;
  companyName: string;
  logoBg: string;
  role: string;
  ctc: string;
  minCgpa: number;
  maxBacklogs: number;
  allowedBranches: string[];
  driveDate: string;
  lastDateToApply: string;
  registeredCount: number;
  status: 'Registration Active' | 'Shortlisting' | 'Completed';
}

export const MOCK_STUDENTS_DATA: StudentRecord[] = [
  {
    id: 'std-1',
    name: 'Arjun Menon',
    rollNo: '22CS042',
    email: 'arjun.menon@college.edu',
    branch: 'CSE',
    cgpa: 8.9,
    tenthPercent: 94,
    twelfthPercent: 92,
    backlogs: 0,
    atsScore: 92,
    assessmentScore: 88,
    placementStatus: 'Placed',
    companyOffer: {
      company: 'Amazon',
      packageCtc: '₹24.0 LPA',
      role: 'SDE-1'
    },
    skills: ['Java', 'React', 'DSA', 'AWS', 'System Design']
  },
  {
    id: 'std-2',
    name: 'Sneha Roy',
    rollNo: '22CS089',
    email: 'sneha.roy@college.edu',
    branch: 'CSE',
    cgpa: 8.4,
    tenthPercent: 88,
    twelfthPercent: 86,
    backlogs: 0,
    atsScore: 86,
    assessmentScore: 82,
    placementStatus: 'Placed',
    companyOffer: {
      company: 'TCS Digital',
      packageCtc: '₹7.5 LPA',
      role: 'Digital Engineer'
    },
    skills: ['Python', 'Django', 'SQL', 'Docker']
  },
  {
    id: 'std-3',
    name: 'Rohan Varma',
    rollNo: '22EC014',
    email: 'rohan.v@college.edu',
    branch: 'ECE',
    cgpa: 7.8,
    tenthPercent: 82,
    twelfthPercent: 80,
    backlogs: 0,
    atsScore: 78,
    assessmentScore: 74,
    placementStatus: 'Shortlisted',
    skills: ['C++', 'Embedded C', 'IoT', 'Python']
  },
  {
    id: 'std-4',
    name: 'Ananya Nair',
    rollNo: '22IT005',
    email: 'ananya.nair@college.edu',
    branch: 'IT',
    cgpa: 9.1,
    tenthPercent: 95,
    twelfthPercent: 94,
    backlogs: 0,
    atsScore: 95,
    assessmentScore: 92,
    placementStatus: 'Placed',
    companyOffer: {
      company: 'Zoho Corp',
      packageCtc: '₹10.5 LPA',
      role: 'MTS'
    },
    skills: ['C', 'Java', 'Full Stack', 'Spring Boot']
  },
  {
    id: 'std-5',
    name: 'Kiran Joseph',
    rollNo: '22CS112',
    email: 'kiran.j@college.edu',
    branch: 'CSE',
    cgpa: 7.2,
    tenthPercent: 78,
    twelfthPercent: 74,
    backlogs: 1,
    atsScore: 72,
    assessmentScore: 68,
    placementStatus: 'Ready',
    skills: ['JavaScript', 'Node.js', 'MongoDB', 'Git']
  },
  {
    id: 'std-6',
    name: 'Deepak Sharma',
    rollNo: '22ME033',
    email: 'deepak.s@college.edu',
    branch: 'MECH',
    cgpa: 6.8,
    tenthPercent: 72,
    twelfthPercent: 70,
    backlogs: 0,
    atsScore: 65,
    assessmentScore: 62,
    placementStatus: 'Needs Training',
    skills: ['AutoCAD', 'Python Basics', 'SolidWorks']
  },
  {
    id: 'std-7',
    name: 'Fathima Zahra',
    rollNo: '22EC055',
    email: 'fathima.z@college.edu',
    branch: 'ECE',
    cgpa: 8.6,
    tenthPercent: 91,
    twelfthPercent: 89,
    backlogs: 0,
    atsScore: 88,
    assessmentScore: 85,
    placementStatus: 'Placed',
    companyOffer: {
      company: 'Accenture',
      packageCtc: '₹6.5 LPA',
      role: 'Adv ASE'
    },
    skills: ['VLSI', 'Verilog', 'Python', 'Cloud Basics']
  },
  {
    id: 'std-8',
    name: 'Rahul Krishnan',
    rollNo: '22EE021',
    email: 'rahul.k@college.edu',
    branch: 'EEE',
    cgpa: 7.4,
    tenthPercent: 80,
    twelfthPercent: 76,
    backlogs: 0,
    atsScore: 75,
    assessmentScore: 70,
    placementStatus: 'Ready',
    skills: ['MATLAB', 'Power Systems', 'C Programming']
  }
];

export const MOCK_TPO_DRIVES: TPODriveAnnouncement[] = [
  {
    id: 'drv-1',
    companyName: 'Tata Consultancy Services (TCS)',
    logoBg: 'from-blue-600 to-indigo-700',
    role: 'TCS Ninja & Digital (Pan-India)',
    ctc: '₹3.6 - ₹7.5 LPA',
    minCgpa: 6.0,
    maxBacklogs: 1,
    allowedBranches: ['CSE', 'IT', 'ECE', 'EEE', 'MECH'],
    driveDate: 'Oct 24, 2026',
    lastDateToApply: 'Oct 15, 2026',
    registeredCount: 148,
    status: 'Registration Active'
  },
  {
    id: 'drv-2',
    companyName: 'Zoho Corporation',
    logoBg: 'from-red-600 to-amber-600',
    role: 'Software Developer',
    ctc: '₹6.5 - ₹10.5 LPA',
    minCgpa: 0,
    maxBacklogs: 2,
    allowedBranches: ['All Engineering Branches'],
    driveDate: 'Nov 08, 2026',
    lastDateToApply: 'Oct 28, 2026',
    registeredCount: 192,
    status: 'Registration Active'
  },
  {
    id: 'drv-3',
    companyName: 'Amazon Web Services',
    logoBg: 'from-amber-500 to-orange-600',
    role: 'SDE-1 (Product Tier)',
    ctc: '₹18.0 - ₹24.0 LPA',
    minCgpa: 7.5,
    maxBacklogs: 0,
    allowedBranches: ['CSE', 'IT', 'ECE'],
    driveDate: 'Dec 15, 2026',
    lastDateToApply: 'Dec 01, 2026',
    registeredCount: 84,
    status: 'Shortlisting'
  }
];
