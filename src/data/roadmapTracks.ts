export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  estimatedHours: number;
}

export interface ResourceLink {
  title: string;
  type: 'Docs' | 'Video' | 'CheatSheet' | 'GitHub';
  url: string;
  free: boolean;
}

export interface MiniProject {
  title: string;
  desc: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Milestone {
  id: string;
  stageNumber: number;
  title: string;
  summary: string;
  status: 'completed' | 'in-progress' | 'locked';
  score?: number;
  subtasks: Subtask[];
  resources: ResourceLink[];
  miniProjects: MiniProject[];
  unlockQuiz: QuizQuestion[];
}

export interface CareerTrack {
  id: string;
  branch: 'CSE' | 'ECE' | 'MECH' | 'EEE' | 'CIVIL' | 'ALL';
  title: string;
  badge: string;
  description: string;
  estimatedWeeks: number;
  primarySkills: string[];
  milestones: Milestone[];
}

export const CAREER_TRACKS: CareerTrack[] = [
  // 1. FRONTEND ENGINEERING TRACK (CSE)
  {
    branch: 'CSE',
    id: 'frontend',
    title: 'Frontend Engineering Track',
    badge: 'Senior Web Wizard',
    description: 'Master modern responsive UIs, React 19, TypeScript, state architectures, and Next.js performance optimizations.',
    estimatedWeeks: 12,
    primarySkills: ['HTML5/CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React 19', 'Next.js 15', 'Tailwind CSS', 'Web Vitals'],
    milestones: [
      {
        id: 'fe-1',
        stageNumber: 1,
        title: 'JavaScript & Web Fundamentals',
        summary: 'Closures, Event Loop, Promises, Async/Await, Prototypes, DOM API and ES2024 features.',
        status: 'completed',
        score: 100,
        subtasks: [
          { id: 'fe-1-1', title: 'Deep dive into JavaScript Execution Context & Call Stack', completed: true, estimatedHours: 4 },
          { id: 'fe-1-2', title: 'Master Closures, Scope Chains & Higher Order Functions', completed: true, estimatedHours: 5 },
          { id: 'fe-1-3', title: 'Asynchronous JS: Event Loop, Microtasks, and Web APIs', completed: true, estimatedHours: 6 },
          { id: 'fe-1-4', title: 'Modern ES6+ Array Methods (map, filter, reduce, flatMap)', completed: true, estimatedHours: 3 },
        ],
        resources: [
          { title: 'MDN Web Docs - JavaScript Guide', type: 'Docs', url: 'https://developer.mozilla.org', free: true },
          { title: 'JavaScript.info Complete Modern Tutorial', type: 'Docs', url: 'https://javascript.info', free: true },
          { title: 'Namaste JavaScript Series by Akshay Saini', type: 'Video', url: 'https://youtube.com', free: true },
        ],
        miniProjects: [
          {
            title: 'Interactive Kanban Board with LocalStorage',
            desc: 'Vanilla JS drag-and-drop task board with column persistence, filtering, and tag management.',
            difficulty: 'Beginner',
            tags: ['DOM API', 'Drag & Drop', 'LocalStorage'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'What is the output of `typeof null` in JavaScript?',
            options: ['"null"', '"object"', '"undefined"', '"number"'],
            correctIndex: 1,
            explanation: 'In JavaScript, `typeof null` is a historical bug that returns "object".',
          },
          {
            id: 2,
            question: 'Which queue handles Promise resolutions in the Event Loop?',
            options: ['Macrotask Queue', 'Microtask Queue', 'Render Queue', 'Call Stack'],
            correctIndex: 1,
            explanation: 'Promises are placed in the Microtask Queue and have higher priority over Macrotasks (like setTimeout).',
          },
        ],
      },
      {
        id: 'fe-2',
        stageNumber: 2,
        title: 'React 19 & State Architecture',
        summary: 'Component lifecycles, Custom Hooks, Context API, Redux Toolkit, Zustand, and React 19 Actions.',
        status: 'in-progress',
        subtasks: [
          { id: 'fe-2-1', title: 'Understand Reconciliation & Virtual DOM Diffing', completed: true, estimatedHours: 4 },
          { id: 'fe-2-2', title: 'Master Core Hooks (useState, useEffect, useMemo, useCallback, useRef)', completed: true, estimatedHours: 6 },
          { id: 'fe-2-3', title: 'Build production Custom Hooks (useDebounce, useFetch, useLocalStorage)', completed: false, estimatedHours: 5 },
          { id: 'fe-2-4', title: 'Global State Management with Zustand & Redux Toolkit Query', completed: false, estimatedHours: 7 },
        ],
        resources: [
          { title: 'Official React 19 Documentation', type: 'Docs', url: 'https://react.dev', free: true },
          { title: 'Zustand State Management Guide', type: 'Docs', url: 'https://github.com/pmndrs/zustand', free: true },
          { title: 'Jack Herrington - React Performance Deep Dive', type: 'Video', url: 'https://youtube.com', free: true },
        ],
        miniProjects: [
          {
            title: 'E-Commerce Marketplace with Cart & Filter System',
            desc: 'Multi-category store with search debouncing, price range filters, persistent cart, and toast notifications.',
            difficulty: 'Intermediate',
            tags: ['React 19', 'Zustand', 'Tailwind CSS'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'When should `useCallback` be used in React?',
            options: [
              'To cache calculated values',
              'To memoize function references passed to optimized child components',
              'To trigger side effects on every render',
              'To replace useState for primitives',
            ],
            correctIndex: 1,
            explanation: '`useCallback` caches function references across re-renders to prevent unnecessary child component rerenders.',
          },
          {
            id: 2,
            question: 'What is the purpose of the dependency array in `useEffect`?',
            options: [
              'Declares variables that trigger the effect when modified',
              'Sets the timeout for the effect in milliseconds',
              'Specifies child component props',
              'Forces automatic garbage collection',
            ],
            correctIndex: 0,
            explanation: 'React compares the values in the dependency array on re-render; if any change, the effect re-runs.',
          },
        ],
      },
      {
        id: 'fe-3',
        stageNumber: 3,
        title: 'Next.js 15 & Fullstack SSR/SSG',
        summary: 'App Router, Server Components (RSC), Server Actions, Dynamic SEO, and Route Handlers.',
        status: 'locked',
        subtasks: [
          { id: 'fe-3-1', title: 'Next.js App Router layout hierarchy & Server vs Client components', completed: false, estimatedHours: 6 },
          { id: 'fe-3-2', title: 'Data Fetching with Server Actions & Suspense streaming', completed: false, estimatedHours: 8 },
          { id: 'fe-3-3', title: 'Authentication with NextAuth.js / Supabase Auth', completed: false, estimatedHours: 7 },
          { id: 'fe-3-4', title: 'Core Web Vitals Optimization (LCP, INP, CLS)', completed: false, estimatedHours: 5 },
        ],
        resources: [
          { title: 'Next.js Official Learn Platform', type: 'Docs', url: 'https://nextjs.org/learn', free: true },
          { title: 'Vercel App Router Cheat Sheet', type: 'CheatSheet', url: 'https://vercel.com', free: true },
        ],
        miniProjects: [
          {
            title: 'Fullstack Dev Community Blog & Discussion Forum',
            desc: 'Markdown blog with server actions for upvoting, commenting, user auth, and dynamic OpenGraph image generator.',
            difficulty: 'Advanced',
            tags: ['Next.js 15', 'Server Actions', 'PostgreSQL', 'Prisma'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'By default, what type of components are created in the Next.js App Router?',
            options: ['Client Components', 'React Server Components (RSC)', 'Static HTML files', 'Web Workers'],
            correctIndex: 1,
            explanation: 'In the Next.js App Router (`app/` directory), components are React Server Components by default unless marked with "use client".',
          },
          {
            id: 2,
            question: 'What directive enables asynchronous Server Actions in Next.js?',
            options: ['"use server"', '"use client"', '"use backend"', '"async action"'],
            correctIndex: 0,
            explanation: 'The `"use server"` directive marks a function or file as a server-side action.',
          },
        ],
      },
      {
        id: 'fe-4',
        stageNumber: 4,
        title: 'Testing, CI/CD & Deployment',
        summary: 'Vitest, React Testing Library, Playwright E2E, GitHub Actions, and Edge deployment.',
        status: 'locked',
        subtasks: [
          { id: 'fe-4-1', title: 'Unit testing React hooks and components with Vitest', completed: false, estimatedHours: 5 },
          { id: 'fe-4-2', title: 'End-to-End testing user checkout flows with Playwright', completed: false, estimatedHours: 6 },
          { id: 'fe-4-3', title: 'GitHub Actions Automated CI pipeline for linting & tests', completed: false, estimatedHours: 4 },
        ],
        resources: [
          { title: 'Testing Library Best Practices Guide', type: 'Docs', url: 'https://testing-library.com', free: true },
          { title: 'Playwright Fast E2E Automation Course', type: 'Video', url: 'https://playwright.dev', free: true },
        ],
        miniProjects: [
          {
            title: 'Automated CI/CD Multi-Zone SaaS Deployment',
            desc: 'Production application with automatic preview branch deployments, coverage reports, and health checks.',
            difficulty: 'Advanced',
            tags: ['Playwright', 'GitHub Actions', 'Vercel Edge'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'What is the guiding principle of React Testing Library?',
            options: [
              'Test implementation details and internal state variables',
              'The more your tests resemble the way your software is used, the more confidence they give',
              'Only test pure functions and redux reducers',
              'Mock all DOM elements with dummy divs',
            ],
            correctIndex: 1,
            explanation: 'RTL emphasizes testing from the user perspective rather than testing internal component state.',
          },
        ],
      },
    ],
  },

  // 2. BACKEND ENGINEERING TRACK (CSE)
  {
    branch: 'CSE',
    id: 'backend',
    title: 'Backend & Cloud Systems Track',
    badge: 'System Architect',
    description: 'Master Node.js/Express, Java Spring Boot, SQL/NoSQL databases, Redis caching, and microservices.',
    estimatedWeeks: 14,
    primarySkills: ['Node.js', 'Express/Fastify', 'Java Spring Boot', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kafka'],
    milestones: [
      {
        id: 'be-1',
        stageNumber: 1,
        title: 'Backend Fundamentals & RESTful APIs',
        summary: 'HTTP protocols, REST design standards, Node.js runtime, asynchronous I/O, and middleware architecture.',
        status: 'completed',
        score: 95,
        subtasks: [
          { id: 'be-1-1', title: 'HTTP status codes, headers, and idempotent request methods', completed: true, estimatedHours: 4 },
          { id: 'be-1-2', title: 'Node.js Streams, Buffers, and Event Emitters', completed: true, estimatedHours: 6 },
          { id: 'be-1-3', title: 'Build Express.js REST API with input validation (Zod/Joi)', completed: true, estimatedHours: 6 },
        ],
        resources: [
          { title: 'Node.js Official Documentation', type: 'Docs', url: 'https://nodejs.org', free: true },
          { title: 'RESTful API Design Best Practices', type: 'Docs', url: 'https://restfulapi.net', free: true },
        ],
        miniProjects: [
          {
            title: 'Role-Based Access Control (RBAC) Auth API',
            desc: 'JWT authentication server with refresh token rotation, password hashing with Argon2, and rate limiting.',
            difficulty: 'Intermediate',
            tags: ['Node.js', 'Express', 'JWT', 'Zod'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'Which HTTP method is idempotent and used to replace an entire resource?',
            options: ['POST', 'PUT', 'PATCH', 'CONNECT'],
            correctIndex: 1,
            explanation: 'PUT is idempotent and replaces the entire target resource with the request payload.',
          },
        ],
      },
      {
        id: 'be-2',
        stageNumber: 2,
        title: 'Databases: PostgreSQL & Redis Caching',
        summary: 'Relational database schema modeling, SQL query indexing, Transactions, and Redis in-memory cache.',
        status: 'in-progress',
        subtasks: [
          { id: 'be-2-1', title: 'Design 3NF Relational Schemas & Foreign Key Constraints', completed: true, estimatedHours: 5 },
          { id: 'be-2-2', title: 'SQL Indexing strategies (B-Tree, Hash, GIN) & EXPLAIN query analysis', completed: false, estimatedHours: 7 },
          { id: 'be-2-3', title: 'Implement Redis Caching Layer for high-read endpoints', completed: false, estimatedHours: 5 },
        ],
        resources: [
          { title: 'Use The Index, Luke (SQL Indexing Guide)', type: 'Docs', url: 'https://use-the-index-luke.com', free: true },
          { title: 'Redis University - Redis for Developers', type: 'Video', url: 'https://university.redis.com', free: true },
        ],
        miniProjects: [
          {
            title: 'High-Throughput URL Shortener with Redis Cache',
            desc: 'PostgreSQL URL shortener handling 10,000 req/sec using Redis LRU caching, analytics tracking, and base62 hashing.',
            difficulty: 'Intermediate',
            tags: ['PostgreSQL', 'Redis', 'Docker'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'What does the ACID property "I" stand for in database transactions?',
            options: ['Integrity', 'Isolation', 'Indexation', 'Idempotence'],
            correctIndex: 1,
            explanation: 'Isolation ensures that concurrent transactions do not interfere with one another.',
          },
        ],
      },
      {
        id: 'be-3',
        stageNumber: 3,
        title: 'Microservices, Docker & Message Queues',
        summary: 'Containerization with Docker, Apache Kafka / RabbitMQ asynchronous event processing, and API Gateways.',
        status: 'locked',
        subtasks: [
          { id: 'be-3-1', title: 'Docker multi-stage builds & docker-compose orchestration', completed: false, estimatedHours: 6 },
          { id: 'be-3-2', title: 'Event-driven architecture with RabbitMQ / Kafka consumers', completed: false, estimatedHours: 8 },
        ],
        resources: [
          { title: 'Docker Getting Started Guide', type: 'Docs', url: 'https://docs.docker.com', free: true },
          { title: 'Kafka in 100 Seconds by Fireship', type: 'Video', url: 'https://youtube.com', free: true },
        ],
        miniProjects: [
          {
            title: 'Asynchronous Video Transcoding & Email Notification Microservice',
            desc: 'Decoupled services communicating over RabbitMQ queues to process background media uploads.',
            difficulty: 'Advanced',
            tags: ['RabbitMQ', 'Docker', 'Microservices'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'What is the primary role of an API Gateway in a microservices system?',
            options: [
              'Single point of entry for client requests, routing, rate limiting, and auth validation',
              'Database table sharding',
              'Generating CSS styles for frontend',
              'Running cron jobs on the client machine',
            ],
            correctIndex: 0,
            explanation: 'API Gateways act as the reverse proxy fronting all client traffic to downstream microservices.',
          },
        ],
      },
    ],
  },

  // 3. FULLSTACK MERN TRACK (CSE)
  {
    branch: 'CSE',
    id: 'fullstack',
    title: 'Fullstack MERN Engineer Track',
    badge: 'Fullstack Pioneer',
    description: 'Build end-to-end web applications with MongoDB, Express, React, and Node.js with secure authentication and payment workflows.',
    estimatedWeeks: 10,
    primarySkills: ['React 19', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Tailwind', 'Stripe API', 'Cloudinary'],
    milestones: [
      {
        id: 'fs-1',
        stageNumber: 1,
        title: 'Fullstack Project Architecture',
        summary: 'Monorepo setup, client-server separation, RESTful conventions, and environment variables security.',
        status: 'completed',
        score: 100,
        subtasks: [
          { id: 'fs-1-1', title: 'Setup Turborepo / Vite + Express monorepo workspace', completed: true, estimatedHours: 3 },
          { id: 'fs-1-2', title: 'Mongoose schema validation & population queries', completed: true, estimatedHours: 5 },
        ],
        resources: [
          { title: 'Mongoose Official Guide', type: 'Docs', url: 'https://mongoosejs.com', free: true },
        ],
        miniProjects: [
          {
            title: 'Real-Time Team Workspace & Chat Hub',
            desc: 'Socket.io powered team chat with channels, file attachments, and live online badges.',
            difficulty: 'Intermediate',
            tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'What protocol enables bidirectional, low-latency real-time communication in fullstack apps?',
            options: ['HTTP/1.1 Polling', 'WebSockets', 'FTP', 'SMTP'],
            correctIndex: 1,
            explanation: 'WebSockets maintain a persistent full-duplex TCP connection between client and server.',
          },
        ],
      },
      {
        id: 'fs-2',
        stageNumber: 2,
        title: 'Payments, Media Uploads & Deployment',
        summary: 'Integrating Stripe checkout, Cloudinary media CDN, and deploying on AWS/Render/Vercel.',
        status: 'in-progress',
        subtasks: [
          { id: 'fs-2-1', title: 'Stripe Webhooks & Checkout Session implementation', completed: false, estimatedHours: 6 },
          { id: 'fs-2-2', title: 'Multer image uploads to Cloudinary storage bucket', completed: false, estimatedHours: 4 },
        ],
        resources: [
          { title: 'Stripe Webhooks Integration Guide', type: 'Docs', url: 'https://stripe.com/docs', free: true },
        ],
        miniProjects: [
          {
            title: 'SaaS Course Marketplace with Subscription Billing',
            desc: 'Complete video course platform with Stripe payments, student progress dashboard, and certificate generation.',
            difficulty: 'Advanced',
            tags: ['Stripe', 'React 19', 'Express', 'MongoDB'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'Why should Stripe payment fulfillment be processed via Webhooks rather than client success URLs?',
            options: [
              'Webhooks are faster than redirect URLs',
              'Client browser redirects can fail, disconnect, or be spoofed; Webhooks guarantee server-to-server confirmation',
              'Stripe charges extra fees for redirect URLs',
              'Webhooks bypass credit card verification',
            ],
            correctIndex: 1,
            explanation: 'Webhooks provide an asynchronous, tamper-proof notification directly from Stripe to your server.',
          },
        ],
      },
    ],
  },

  // 4. ECE — VLSI & EMBEDDED SYSTEMS TRACK
  {
    branch: 'ECE',
    id: 'ece_vlsi',
    title: 'VLSI & Embedded Systems Track',
    badge: 'Chip Design Engineer',
    description: 'Master Verilog/VHDL digital design, FPGA prototyping, ARM Cortex microcontrollers, RTOS, and semiconductor industry placement preparation.',
    estimatedWeeks: 14,
    primarySkills: ['Verilog', 'VHDL', 'FPGA', 'ARM Cortex', 'RTOS', 'C Embedded', 'PCB Design', 'Signal Processing'],
    milestones: [
      {
        id: 'ece-1',
        stageNumber: 1,
        title: 'Digital Logic & Verilog HDL Fundamentals',
        summary: 'Combinational and sequential logic, FSM design, Verilog RTL coding, and simulation with ModelSim/Vivado.',
        status: 'completed',
        score: 88,
        subtasks: [
          { id: 'ece-1-1', title: 'Master Boolean algebra, Karnaugh maps, and logic minimization', completed: true, estimatedHours: 5 },
          { id: 'ece-1-2', title: 'Write synthesizable Verilog for combinational circuits (ALU, MUX, Decoder)', completed: true, estimatedHours: 6 },
          { id: 'ece-1-3', title: 'Design FSMs: Mealy vs Moore machines in Verilog with testbenches', completed: true, estimatedHours: 7 },
          { id: 'ece-1-4', title: 'Simulate and verify designs using ModelSim or Vivado Simulator', completed: false, estimatedHours: 4 },
        ],
        resources: [
          { title: 'NPTEL Digital Circuits & Systems by IIT Kharagpur', type: 'Video', url: 'https://nptel.ac.in', free: true },
          { title: 'Verilog HDL by Samir Palnitkar (Textbook)', type: 'Docs', url: 'https://www.amazon.in', free: false },
          { title: 'FPGA4Student - Verilog Examples', type: 'Docs', url: 'https://www.fpga4student.com', free: true },
        ],
        miniProjects: [
          {
            title: '4-bit ALU with Full Testbench Coverage',
            desc: 'Verilog ALU supporting ADD, SUB, AND, OR, XOR with carry/borrow flags and 100% simulation coverage.',
            difficulty: 'Beginner',
            tags: ['Verilog', 'ALU', 'ModelSim', 'Testbench'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'Which type of logic uses both present inputs and current state to determine output?',
            options: ['Combinational Logic', 'Sequential Logic', 'Boolean Logic', 'Arithmetic Logic'],
            correctIndex: 1,
            explanation: 'Sequential logic uses flip-flops to store state; outputs depend on inputs AND current state.',
          },
          {
            id: 2,
            question: 'What is the difference between blocking (=) and non-blocking (<=) assignments in Verilog?',
            options: [
              'No difference, both are interchangeable',
              'Blocking executes sequentially; non-blocking schedules all RHS evaluations before updating LHS (used in clocked always blocks)',
              'Blocking is for combinational; non-blocking only for simulation',
              'Non-blocking is faster in synthesis',
            ],
            correctIndex: 1,
            explanation: 'Non-blocking (<=) is used in clocked sequential logic to avoid race conditions; all RHS values are sampled before any LHS updates.',
          },
        ],
      },
      {
        id: 'ece-2',
        stageNumber: 2,
        title: 'ARM Cortex Microcontrollers & RTOS',
        summary: 'Bare-metal programming on STM32/ARM Cortex-M, peripheral interfacing (UART, SPI, I2C), and FreeRTOS task scheduling.',
        status: 'in-progress',
        subtasks: [
          { id: 'ece-2-1', title: 'STM32 GPIO, Clock config and CMSIS HAL peripheral drivers', completed: true, estimatedHours: 6 },
          { id: 'ece-2-2', title: 'UART, SPI, I2C protocol implementation on STM32', completed: false, estimatedHours: 7 },
          { id: 'ece-2-3', title: 'FreeRTOS: Tasks, Queues, Semaphores and Priority Scheduling', completed: false, estimatedHours: 8 },
        ],
        resources: [
          { title: 'STM32 HAL Official Reference Manual (ST Microelectronics)', type: 'Docs', url: 'https://www.st.com', free: true },
          { title: 'Embedded Systems with ARM Cortex-M by Jonathan Valvano', type: 'Docs', url: 'https://users.ece.utexas.edu', free: true },
          { title: 'FreeRTOS Official Documentation', type: 'Docs', url: 'https://freertos.org', free: true },
        ],
        miniProjects: [
          {
            title: 'Smart Home Sensor Hub with FreeRTOS',
            desc: 'STM32-based multi-sensor node reading temperature, humidity, and LDR data with UART logging and RTOS task management.',
            difficulty: 'Intermediate',
            tags: ['STM32', 'FreeRTOS', 'I2C', 'UART'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'In FreeRTOS, what mechanism prevents two tasks from simultaneously accessing a shared resource?',
            options: ['Task Delay', 'Mutex / Semaphore', 'Priority Inversion', 'Stack Overflow Guard'],
            correctIndex: 1,
            explanation: 'Mutexes and Semaphores provide mutual exclusion to protect shared resources from concurrent access by multiple tasks.',
          },
        ],
      },
      {
        id: 'ece-3',
        stageNumber: 3,
        title: 'FPGA Prototyping & PCB Design',
        summary: 'Xilinx/Intel FPGA design flow, IP core integration, Altium/KiCad PCB layout, and signal integrity fundamentals.',
        status: 'locked',
        subtasks: [
          { id: 'ece-3-1', title: 'Xilinx Vivado IP Integrator and Block Design flow', completed: false, estimatedHours: 8 },
          { id: 'ece-3-2', title: 'KiCad schematic capture and 2-layer PCB layout with DRC', completed: false, estimatedHours: 7 },
          { id: 'ece-3-3', title: 'Signal integrity: impedance matching, decoupling capacitors, ground planes', completed: false, estimatedHours: 5 },
        ],
        resources: [
          { title: 'Xilinx Vivado Design Suite User Guide', type: 'Docs', url: 'https://www.xilinx.com', free: true },
          { title: 'KiCad PCB Design Tutorial Series', type: 'Video', url: 'https://youtube.com', free: true },
        ],
        miniProjects: [
          {
            title: 'FPGA-Based UART Communication Controller',
            desc: 'Implement a fully verified UART TX/RX controller on Nexys/Basys FPGA board with 9600-115200 baud rate switching.',
            difficulty: 'Advanced',
            tags: ['FPGA', 'Xilinx Vivado', 'UART', 'Verilog'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'What is the primary advantage of using an FPGA over a microcontroller for DSP applications?',
            options: [
              'FPGAs are cheaper to manufacture',
              'FPGAs allow true parallel hardware execution of multiple operations simultaneously',
              'FPGAs have built-in operating systems',
              'FPGAs consume less power than all microcontrollers',
            ],
            correctIndex: 1,
            explanation: 'FPGAs implement logic in reconfigurable hardware, enabling true parallelism unlike sequential microcontroller execution.',
          },
        ],
      },
    ],
  },

  // 5. ECE — IoT & Communication Systems TRACK
  {
    branch: 'ECE',
    id: 'ece_iot',
    title: 'IoT & Communication Systems Track',
    badge: 'IoT Systems Engineer',
    description: 'Build connected IoT systems using ESP32/Raspberry Pi, MQTT, LoRaWAN, and cloud platforms like AWS IoT Core and Azure IoT Hub.',
    estimatedWeeks: 10,
    primarySkills: ['ESP32', 'Raspberry Pi', 'MQTT', 'LoRaWAN', 'AWS IoT', 'Python', 'Node-RED', 'Edge Computing'],
    milestones: [
      {
        id: 'iot-1',
        stageNumber: 1,
        title: 'ESP32 & Wireless Protocol Fundamentals',
        summary: 'ESP32 Wi-Fi/BLE programming, MQTT messaging protocol, and sensor data pipelines to cloud dashboards.',
        status: 'completed',
        score: 92,
        subtasks: [
          { id: 'iot-1-1', title: 'ESP32 Arduino IDE setup, GPIO and analog ADC reading', completed: true, estimatedHours: 3 },
          { id: 'iot-1-2', title: 'MQTT broker setup with Mosquitto and publish/subscribe topics', completed: true, estimatedHours: 5 },
          { id: 'iot-1-3', title: 'Connect ESP32 to AWS IoT Core via MQTT over TLS', completed: false, estimatedHours: 6 },
        ],
        resources: [
          { title: 'ESP32 Arduino Core Documentation', type: 'Docs', url: 'https://docs.espressif.com', free: true },
          { title: 'AWS IoT Core Developer Guide', type: 'Docs', url: 'https://docs.aws.amazon.com/iot', free: true },
        ],
        miniProjects: [
          {
            title: 'Smart Air Quality Monitor with Cloud Dashboard',
            desc: 'ESP32 reads MQ135 CO2 and DHT22 sensors, publishes via MQTT to AWS IoT, visualized on Grafana.',
            difficulty: 'Intermediate',
            tags: ['ESP32', 'MQTT', 'AWS IoT', 'Grafana'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'MQTT uses which communication pattern for IoT messaging?',
            options: ['Request-Response', 'Publish-Subscribe', 'Polling', 'Peer-to-Peer RPC'],
            correctIndex: 1,
            explanation: 'MQTT uses the Publish-Subscribe pattern where devices publish to topics and brokers route messages to all subscribers.',
          },
        ],
      },
      {
        id: 'iot-2',
        stageNumber: 2,
        title: 'Edge Computing & LoRaWAN Networks',
        summary: 'TensorFlow Lite on Raspberry Pi for edge inferencing, LoRa long-range communication, and TTN gateway integration.',
        status: 'in-progress',
        subtasks: [
          { id: 'iot-2-1', title: 'Deploy TFLite model on Raspberry Pi for on-device inference', completed: false, estimatedHours: 7 },
          { id: 'iot-2-2', title: 'LoRa SX1276 module communication and packet framing', completed: false, estimatedHours: 5 },
        ],
        resources: [
          { title: 'TensorFlow Lite for Microcontrollers Guide', type: 'Docs', url: 'https://www.tensorflow.org/lite', free: true },
          { title: 'The Things Network LoRaWAN Documentation', type: 'Docs', url: 'https://www.thethingsnetwork.org', free: true },
        ],
        miniProjects: [
          {
            title: 'Predictive Maintenance System with Edge ML',
            desc: 'Raspberry Pi with vibration sensor runs TFLite anomaly detection model locally — alerts sent via LoRa to gateway.',
            difficulty: 'Advanced',
            tags: ['Raspberry Pi', 'TFLite', 'LoRa', 'Edge AI'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'What is the key advantage of Edge Computing over Cloud-only IoT processing?',
            options: [
              'Edge devices are always more powerful than cloud servers',
              'Reduces latency and bandwidth usage by processing data locally near the source',
              'Edge computing eliminates the need for any cloud infrastructure',
              'Edge devices can store unlimited data',
            ],
            correctIndex: 1,
            explanation: 'Edge computing processes data locally, reducing round-trip latency to cloud and saving bandwidth for time-sensitive applications.',
          },
        ],
      },
    ],
  },

  // 6. MECH — CAD/CAM & Product Design TRACK
  {
    branch: 'MECH',
    id: 'mech_cad',
    title: 'CAD/CAM & Product Design Track',
    badge: 'Product Design Engineer',
    description: 'Master SolidWorks, AutoCAD, CATIA, GD&T tolerancing, FEA simulation with ANSYS, and CNC manufacturing processes for core mechanical placements.',
    estimatedWeeks: 12,
    primarySkills: ['SolidWorks', 'AutoCAD', 'CATIA V5', 'ANSYS', 'GD&T', 'CNC Programming', 'FEA', 'Sheet Metal Design'],
    milestones: [
      {
        id: 'mech-1',
        stageNumber: 1,
        title: 'SolidWorks 3D Modelling & Assembly',
        summary: 'Part modelling with parametric features, assembly constraints, drawing views, and bill of materials generation.',
        status: 'completed',
        score: 90,
        subtasks: [
          { id: 'mech-1-1', title: 'Sketch constraints, dimensions, and fully-defined sketches in SolidWorks', completed: true, estimatedHours: 5 },
          { id: 'mech-1-2', title: 'Boss Extrude, Revolve, Sweep, Loft and shell features', completed: true, estimatedHours: 6 },
          { id: 'mech-1-3', title: 'Top-down assembly with mates: coincident, concentric, distance', completed: true, estimatedHours: 5 },
          { id: 'mech-1-4', title: 'Engineering drawing: section views, GD&T symbols, title block', completed: false, estimatedHours: 4 },
        ],
        resources: [
          { title: 'SolidWorks Official Learning Paths (MySolidWorks)', type: 'Docs', url: 'https://my.solidworks.com', free: true },
          { title: 'NPTEL Product Design and Manufacturing by IIT Roorkee', type: 'Video', url: 'https://nptel.ac.in', free: true },
          { title: 'Engineering Drawing & GD&T Fundamentals by ASME', type: 'Docs', url: 'https://www.asme.org', free: false },
        ],
        miniProjects: [
          {
            title: 'Gear Box Assembly with Interference Check',
            desc: '4-speed gearbox complete assembly in SolidWorks with gear ratio calculations, exploded view, and assembly animation.',
            difficulty: 'Intermediate',
            tags: ['SolidWorks', 'Assembly', 'GD&T', 'BOM'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'In SolidWorks assembly, what does a "Concentric" mate enforce?',
            options: [
              'Two flat faces are coplanar',
              'Two cylindrical or conical faces share the same axis',
              'Two components are fixed at the origin',
              'Two planes are parallel at a defined distance',
            ],
            correctIndex: 1,
            explanation: 'Concentric mate aligns the axes of two cylindrical, conical or spherical entities, commonly used for shaft-hole fitting.',
          },
          {
            id: 2,
            question: 'What does the GD&T symbol ⊙ (circle with a dot) represent?',
            options: ['Flatness', 'Circularity', 'True Position', 'Cylindricity'],
            correctIndex: 1,
            explanation: 'The circularity (roundness) symbol controls how close a cross-section of a cylinder or cone is to a perfect circle.',
          },
        ],
      },
      {
        id: 'mech-2',
        stageNumber: 2,
        title: 'FEA Simulation with ANSYS Workbench',
        summary: 'Static structural, thermal, and modal analysis of components under real-world loading conditions using ANSYS Workbench.',
        status: 'in-progress',
        subtasks: [
          { id: 'mech-2-1', title: 'ANSYS Workbench geometry import, meshing strategies (hex vs tet)', completed: true, estimatedHours: 6 },
          { id: 'mech-2-2', title: 'Static structural analysis: boundary conditions, loads, stress results', completed: false, estimatedHours: 7 },
          { id: 'mech-2-3', title: 'Thermal analysis: heat flux, convection BCs, temperature contours', completed: false, estimatedHours: 6 },
        ],
        resources: [
          { title: 'ANSYS Learning Hub Free Courses', type: 'Video', url: 'https://courses.ansys.com', free: true },
          { title: 'FEA for Engineers by NAFEMS', type: 'Docs', url: 'https://www.nafems.org', free: false },
        ],
        miniProjects: [
          {
            title: 'Cantilever Beam FEA with Experimental Validation',
            desc: 'ANSYS static analysis of a steel cantilever beam under point load, verified against analytical bending formula.',
            difficulty: 'Intermediate',
            tags: ['ANSYS', 'FEA', 'Structural Analysis', 'Meshing'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'In FEA, what is the purpose of mesh refinement in regions of high stress gradient?',
            options: [
              'It reduces total computation time',
              'It improves accuracy by reducing element size where stress changes rapidly',
              'It applies boundary conditions automatically',
              'It converts linear elements to quadratic automatically',
            ],
            correctIndex: 1,
            explanation: 'Finer mesh in high-stress-gradient zones reduces discretization error, giving more accurate stress and deformation results.',
          },
        ],
      },
      {
        id: 'mech-3',
        stageNumber: 3,
        title: 'CNC Programming & Manufacturing Processes',
        summary: 'G-code/M-code CNC milling and turning programming, CAM with Mastercam/Fusion 360, and process planning for production.',
        status: 'locked',
        subtasks: [
          { id: 'mech-3-1', title: 'G-code fundamentals: G00, G01, G02, G03, canned cycles', completed: false, estimatedHours: 5 },
          { id: 'mech-3-2', title: 'Fusion 360 CAM: 2D adaptive clearing and 3D contour toolpaths', completed: false, estimatedHours: 7 },
          { id: 'mech-3-3', title: 'Process planning: manufacturing sequence, tool selection, cutting parameters', completed: false, estimatedHours: 5 },
        ],
        resources: [
          { title: 'Autodesk Fusion 360 CAM Tutorial', type: 'Video', url: 'https://www.autodesk.com', free: true },
          { title: 'CNC Programming Handbook by Peter Smid', type: 'Docs', url: 'https://www.amazon.in', free: false },
        ],
        miniProjects: [
          {
            title: 'Aluminium Bracket CAM-to-CNC Simulation',
            desc: 'Complete Fusion 360 CAM setup for a 3-fixture bracket: toolpath simulation, G-code export, and CNC verification.',
            difficulty: 'Advanced',
            tags: ['Fusion 360', 'CNC', 'G-code', 'CAM'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'In CNC G-code, which code commands a linear interpolation feed move?',
            options: ['G00', 'G01', 'G02', 'G28'],
            correctIndex: 1,
            explanation: 'G01 commands a controlled linear motion at the programmed feed rate — used for cutting operations.',
          },
        ],
      },
    ],
  },

  // 7. EEE — EV Systems & Power Electronics TRACK
  {
    branch: 'EEE',
    id: 'eee_ev',
    title: 'EV Systems & Power Electronics Track',
    badge: 'Power Systems Engineer',
    description: 'Master power electronics (converters, inverters), Battery Management Systems (BMS), electric motor drives, and renewable energy systems for EV and power sector placements.',
    estimatedWeeks: 13,
    primarySkills: ['MATLAB/Simulink', 'Power Converters', 'BMS Design', 'BLDC Motors', 'PLC/SCADA', 'AutoCAD Electrical', 'Protection Relay', 'Renewable Energy'],
    milestones: [
      {
        id: 'eee-1',
        stageNumber: 1,
        title: 'Power Electronics: Converters & Inverters',
        summary: 'DC-DC converters (Buck, Boost, Buck-Boost), AC-DC rectifiers, PWM inverters, and MATLAB/Simulink modelling.',
        status: 'completed',
        score: 85,
        subtasks: [
          { id: 'eee-1-1', title: 'Buck converter design: duty cycle, inductor, capacitor sizing equations', completed: true, estimatedHours: 5 },
          { id: 'eee-1-2', title: 'Boost converter MATLAB Simulink model with PID voltage control loop', completed: true, estimatedHours: 6 },
          { id: 'eee-1-3', title: '3-phase VSI inverter with SPWM modulation for motor drive', completed: false, estimatedHours: 7 },
        ],
        resources: [
          { title: 'Power Electronics by Mohan, Undeland & Robbins (Textbook)', type: 'Docs', url: 'https://www.wiley.com', free: false },
          { title: 'NPTEL Power Electronics by IIT Bombay', type: 'Video', url: 'https://nptel.ac.in', free: true },
          { title: 'MATLAB Simulink Power Systems Toolbox Docs', type: 'Docs', url: 'https://www.mathworks.com', free: true },
        ],
        miniProjects: [
          {
            title: 'Solar MPPT Buck Converter Simulink Model',
            desc: 'Perturb-and-Observe MPPT algorithm controlling a Buck converter to extract maximum power from a PV array model.',
            difficulty: 'Intermediate',
            tags: ['MATLAB', 'Simulink', 'MPPT', 'Solar PV'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'In a Buck (step-down) converter, if input voltage is 24V and duty cycle is 0.5, what is the output voltage?',
            options: ['48V', '24V', '12V', '6V'],
            correctIndex: 2,
            explanation: 'Buck converter output = Vin × D = 24V × 0.5 = 12V. It always steps down the input voltage.',
          },
          {
            id: 2,
            question: 'What does PWM (Pulse Width Modulation) control in a power converter?',
            options: [
              'The switching frequency of the AC supply',
              'The ON-time duty cycle of the switching device to regulate output voltage or current',
              'The number of output voltage levels',
              'The temperature of the power transistor',
            ],
            correctIndex: 1,
            explanation: 'PWM adjusts the duty cycle (ratio of ON-time to total period) to control average power delivered to the load.',
          },
        ],
      },
      {
        id: 'eee-2',
        stageNumber: 2,
        title: 'Battery Management Systems (BMS) & EV Drives',
        summary: 'Li-ion cell chemistry, State-of-Charge (SoC) estimation, BLDC motor control, and CAN bus communication in EV architectures.',
        status: 'in-progress',
        subtasks: [
          { id: 'eee-2-1', title: 'Li-ion cell parameters: C-rate, SoC, SoH, and OCV curve characterization', completed: true, estimatedHours: 5 },
          { id: 'eee-2-2', title: 'Coulomb counting and Extended Kalman Filter SoC estimation in MATLAB', completed: false, estimatedHours: 8 },
          { id: 'eee-2-3', title: 'BLDC motor FOC control: Clarke/Park transforms and PI current loops', completed: false, estimatedHours: 8 },
        ],
        resources: [
          { title: 'Battery University — Li-ion Cell Chemistry Guide', type: 'Docs', url: 'https://batteryuniversity.com', free: true },
          { title: 'Texas Instruments EV BMS Design Reference', type: 'Docs', url: 'https://www.ti.com', free: true },
        ],
        miniProjects: [
          {
            title: 'Li-ion Pack SoC Estimator with Kalman Filter',
            desc: 'MATLAB simulation of a 4S2P Li-ion pack with EKF-based SoC estimation, cell balancing logic, and thermal model.',
            difficulty: 'Advanced',
            tags: ['MATLAB', 'BMS', 'Kalman Filter', 'Li-ion'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'What does State-of-Charge (SoC) represent in a battery management system?',
            options: [
              'The internal resistance of the battery',
              'The remaining charge as a percentage of full capacity',
              'The total lifetime cycles of the cell',
              'The peak current delivery capability',
            ],
            correctIndex: 1,
            explanation: 'SoC indicates how much charge remains (0-100%), similar to a fuel gauge — critical for EV range estimation.',
          },
        ],
      },
      {
        id: 'eee-3',
        stageNumber: 3,
        title: 'PLC/SCADA & Industrial Automation',
        summary: 'Ladder logic programming, HMI design, SCADA system architecture, and power system protection relay coordination.',
        status: 'locked',
        subtasks: [
          { id: 'eee-3-1', title: 'Siemens S7-1200 PLC ladder logic: contacts, coils, timers, counters', completed: false, estimatedHours: 6 },
          { id: 'eee-3-2', title: 'WinCC SCADA HMI design: tags, alarms, and real-time trends', completed: false, estimatedHours: 5 },
          { id: 'eee-3-3', title: 'Overcurrent and Earth Fault protection relay coordination using ETAP', completed: false, estimatedHours: 6 },
        ],
        resources: [
          { title: 'Siemens TIA Portal STEP 7 Programming Guide', type: 'Docs', url: 'https://support.industry.siemens.com', free: true },
          { title: 'NPTEL Industrial Automation & Control by IIT Kharagpur', type: 'Video', url: 'https://nptel.ac.in', free: true },
        ],
        miniProjects: [
          {
            title: 'Conveyor Belt Automation with PLC & HMI',
            desc: 'S7-1200 PLC controls a 3-zone conveyor with proximity sensors, motor drives, fault detection, and WinCC HMI dashboard.',
            difficulty: 'Intermediate',
            tags: ['Siemens PLC', 'SCADA', 'WinCC', 'Ladder Logic'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'In PLC ladder logic, what does a Normally Closed (NC) contact represent?',
            options: [
              'A contact that passes current when its associated bit is TRUE (1)',
              'A contact that passes current when its associated bit is FALSE (0)',
              'A coil that energizes when any input is TRUE',
              'A timer that counts down from a preset value',
            ],
            correctIndex: 1,
            explanation: 'A Normally Closed contact conducts current when the referenced bit is 0 (de-energized) and breaks when it is 1 (energized).',
          },
        ],
      },
    ],
  },

  // 8. CIVIL — Structural BIM & Planning TRACK
  {
    branch: 'CIVIL',
    id: 'civil_structural',
    title: 'Structural Engineering & BIM Track',
    badge: 'Structural BIM Engineer',
    description: 'Master STAAD.Pro/ETABS structural analysis, AutoCAD Civil 3D, Revit BIM modelling, IS code design of RCC/steel structures, and construction project management.',
    estimatedWeeks: 12,
    primarySkills: ['STAAD.Pro', 'ETABS', 'AutoCAD Civil 3D', 'Revit BIM', 'MS Project', 'IS 456', 'IS 800', 'Primavera P6'],
    milestones: [
      {
        id: 'civil-1',
        stageNumber: 1,
        title: 'Structural Analysis with STAAD.Pro',
        summary: 'Beam, column, and frame structural analysis, load combinations per IS 875, deflection checks, and result verification.',
        status: 'completed',
        score: 87,
        subtasks: [
          { id: 'civil-1-1', title: 'STAAD.Pro node geometry, member definition, section properties assignment', completed: true, estimatedHours: 5 },
          { id: 'civil-1-2', title: 'Load cases: DL, LL, Wind (IS 875), Seismic (IS 1893) combination', completed: true, estimatedHours: 6 },
          { id: 'civil-1-3', title: 'Deflection and bending moment envelope extraction and code check', completed: true, estimatedHours: 4 },
          { id: 'civil-1-4', title: 'RCC beam design per IS 456 limit state method (STAAD concrete design)', completed: false, estimatedHours: 6 },
        ],
        resources: [
          { title: 'STAAD.Pro V8i / CONNECT Tutorials by Bentley', type: 'Video', url: 'https://learn.bentley.com', free: true },
          { title: 'IS 456:2000 Plain & Reinforced Concrete Code of Practice', type: 'Docs', url: 'https://www.bis.gov.in', free: false },
          { title: 'NPTEL Structural Analysis by IIT Madras', type: 'Video', url: 'https://nptel.ac.in', free: true },
        ],
        miniProjects: [
          {
            title: 'G+3 RCC Building Frame Analysis & Design',
            desc: 'Complete STAAD.Pro analysis of a 4-storey RCC frame with IS 875 loads, seismic check, beam/column design per IS 456.',
            difficulty: 'Intermediate',
            tags: ['STAAD.Pro', 'RCC Design', 'IS 456', 'Seismic Analysis'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'In IS 456 limit state design, what is the partial safety factor (γf) for Dead Load in the load combination 1.5(DL + LL)?',
            options: ['1.0', '1.2', '1.5', '2.0'],
            correctIndex: 2,
            explanation: 'IS 456 specifies γf = 1.5 for both Dead Load and Live Load in the critical limit state combination 1.5(DL + LL).',
          },
          {
            id: 2,
            question: 'What is the significance of the "effective depth" (d) in RCC beam design?',
            options: [
              'Total depth of the beam section',
              'Distance from extreme compression fibre to centroid of tension steel',
              'Depth of neutral axis from compression face',
              'Depth of cover provided to stirrups',
            ],
            correctIndex: 1,
            explanation: 'Effective depth (d) is the distance from the extreme compression fibre to the centroid of tension reinforcement — the primary lever arm in moment calculations.',
          },
        ],
      },
      {
        id: 'civil-2',
        stageNumber: 2,
        title: 'Revit BIM Modelling & Coordination',
        summary: 'Architectural and structural BIM modelling in Revit, clash detection with Navisworks, and quantity take-off for cost estimation.',
        status: 'in-progress',
        subtasks: [
          { id: 'civil-2-1', title: 'Revit structural model: grids, levels, columns, beams, slabs', completed: true, estimatedHours: 6 },
          { id: 'civil-2-2', title: 'Navisworks clash detection between structural and MEP models', completed: false, estimatedHours: 5 },
          { id: 'civil-2-3', title: 'Revit schedule-based quantity take-off and cost estimation', completed: false, estimatedHours: 5 },
        ],
        resources: [
          { title: 'Autodesk Revit Official Learning Tutorials', type: 'Video', url: 'https://www.autodesk.com/learn', free: true },
          { title: 'BIM Handbook: A Guide to Building Information Modelling', type: 'Docs', url: 'https://www.wiley.com', free: false },
        ],
        miniProjects: [
          {
            title: 'Hospital Building BIM Model with Clash Report',
            desc: 'Full Revit BIM model of a 2-storey hospital, architectural-structural-MEP coordination, Navisworks clash report, and QTO export.',
            difficulty: 'Advanced',
            tags: ['Revit', 'BIM', 'Navisworks', 'Quantity Take-Off'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'What does LOD 300 mean in BIM project delivery standards?',
            options: [
              'Level of Detail 300 means the model has 300 components',
              'Elements are modelled as specific systems with accurate quantity, size, shape, location, and orientation',
              'The model is approved for construction with all shop drawings',
              'As-built model with actual installed conditions',
            ],
            correctIndex: 1,
            explanation: 'LOD 300 (Level of Development) means elements are modelled with sufficient geometric precision for coordination and quantity extraction.',
          },
        ],
      },
      {
        id: 'civil-3',
        stageNumber: 3,
        title: 'Project Planning with Primavera P6 & MS Project',
        summary: 'WBS creation, CPM scheduling, resource levelling, S-curve progress tracking, and construction project cost control.',
        status: 'locked',
        subtasks: [
          { id: 'civil-3-1', title: 'WBS breakdown and activity sequencing with logic links (FS, SS, FF)', completed: false, estimatedHours: 5 },
          { id: 'civil-3-2', title: 'Critical Path Method: float calculation, baseline schedule, and crashing', completed: false, estimatedHours: 6 },
          { id: 'civil-3-3', title: 'Earned Value Management: CPI, SPI, BCWP tracking in Primavera P6', completed: false, estimatedHours: 5 },
        ],
        resources: [
          { title: 'Oracle Primavera P6 EPPM User Guide', type: 'Docs', url: 'https://docs.oracle.com', free: true },
          { title: 'NPTEL Construction Project Management by IIT Delhi', type: 'Video', url: 'https://nptel.ac.in', free: true },
        ],
        miniProjects: [
          {
            title: 'Residential Township Construction Schedule',
            desc: 'Primavera P6 schedule for 200-unit residential project: WBS, 500+ activities, resource histogram, and EVM analysis.',
            difficulty: 'Intermediate',
            tags: ['Primavera P6', 'CPM', 'EVM', 'Construction Management'],
          },
        ],
        unlockQuiz: [
          {
            id: 1,
            question: 'In CPM (Critical Path Method), what does "Total Float" represent?',
            options: [
              'Extra time available without delaying the project end date',
              'Extra time available without delaying the next activity',
              'The duration of the critical path',
              'Time saved by fast-tracking activities',
            ],
            correctIndex: 0,
            explanation: 'Total Float is the amount of time an activity can be delayed without delaying the overall project completion date.',
          },
        ],
      },
    ],
  },
];
