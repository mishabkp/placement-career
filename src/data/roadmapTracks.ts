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
  title: string;
  badge: string;
  description: string;
  estimatedWeeks: number;
  primarySkills: string[];
  milestones: Milestone[];
}

export const CAREER_TRACKS: CareerTrack[] = [
  // 1. FRONTEND ENGINEERING TRACK
  {
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

  // 2. BACKEND ENGINEERING TRACK
  {
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

  // 3. FULLSTACK MERN TRACK
  {
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
];
