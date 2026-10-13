// All home-page copy lives here so the components stay purely presentational.
// Text is carried over from the previous static site (legacy/index.html).

export const profile = {
  name: 'Johnrick E. Rabara',
  shortName: 'Johnrick Rabara',
  role: 'Shopify & Brand Designer',
  email: 'jrabara101@gmail.com',
  viber: '+63 961 790 3841',
  location: 'San Pedro City, PH',
  timeZone: 'Asia/Manila',
  portrait: { src: '/images/ok.webp', width: 800, height: 798 },
  intro:
    'I design and build Shopify stores and brand identities for growing brands. Most designers hand you a Figma file and wish you luck — I design your brand and your store, then build it myself on Shopify, WordPress, or Laravel, so nothing gets lost between the mockup and launch day.',
  facts: [
    { label: 'Role', value: 'Designer + Developer' },
    { label: 'Specialties', value: 'Brand Identity / Shopify / Landing Pages' },
    { label: 'Location', value: 'San Pedro City, PH' },
    { label: 'Email', value: 'jrabara101@gmail.com', href: 'mailto:jrabara101@gmail.com' },
    { label: 'Viber', value: '+63 961 790 3841' },
  ],
  resume: '/RABARA - RESUME.pdf',
  cv: '/CV - RABARA.pdf',
}

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const services = [
  {
    title: 'Brand Identity',
    price: 'From $250',
    body: 'Logos, colour palettes, typography, and brand kits for new and growing brands — everything you need to look premium from day one.',
    tags: ['Logo Design', 'Brand Guide', 'Packaging'],
  },
  {
    title: 'Shopify Stores',
    price: 'From $1,200',
    body: 'Custom Shopify stores, designed and built by one person — homepage to checkout, mobile-first, and focused on turning visitors into buyers.',
    tags: ['Shopify', 'Store Design', 'Checkout'],
  },
  {
    title: 'Landing Pages',
    price: 'From $500',
    body: 'High-converting pages for product launches and campaigns — designed in Figma, then built responsive on WordPress, Shopify, or custom code.',
    tags: ['Figma', 'WordPress', 'Responsive'],
  },
  {
    title: 'UI Design & Web Apps',
    price: 'Scoped per project',
    body: 'Dashboards and web app interfaces that are easy to use — and because I also build in Laravel and React, designs that actually ship.',
    tags: ['UI/UX', 'Laravel', 'React'],
  },
]

export const stack = [
  { name: 'HTML', icon: '/icons/html.webp' },
  { name: 'CSS3', icon: '/icons/css.webp' },
  { name: 'JavaScript', icon: '/icons/Javascript.webp' },
  { name: 'TypeScript', icon: '/icons/typescript.webp' },
  { name: 'React.js', icon: '/icons/react.webp' },
  { name: 'PHP', icon: '/icons/php.webp' },
  { name: 'Laravel', icon: '/icons/laravel.webp' },
  { name: 'Python', icon: '/icons/python.webp' },
  { name: 'Ruby', icon: '/icons/ruby.webp' },
  { name: 'Go Rails', icon: '/icons/Go_Rails.webp' },
  { name: '.NET Framework', icon: '/icons/Net.webp' },
  { name: 'C Programming', icon: '/icons/C.webp' },
]

export type Experience = {
  role: string
  company: string
  start: string
  end: string
  /** Omit when there's no logo file; the row falls back to a monogram. */
  logo?: string
  bullets: string[]
  caseStudy?: { slug: string; label: string }
}

// Ordered by end date, newest first. Wording mirrors CV - RABARA.docx.
export const experience: Experience[] = [
  {
    role: 'Full Stack Web Developer',
    company: 'PRDGM Mugen Trading Corp',
    start: 'Aug 2025',
    end: 'Present',
    logo: '/images/PRDGM.webp',
    caseStudy: { slug: 'flow', label: 'Read the FLOW case study' },
    bullets: [
      'Build FLOW (Finance, Logistics, Operations, Workforce), a single-platform solution tailored to client requirements across e-commerce, HRIS, operations, and logistics.',
      'Develop prdgmflow across the stack with Laravel, React, and Bootstrap CSS, working in an Agile Scrum process to ship enhancements each phase.',
      'Deploy and maintain the platform on a Cloudways enterprise server, handling server provisioning, CI/CD and staging-to-production releases, SSL and domain setup, and post-deployment monitoring.',
      'Provide direct client support for the websites I build, walking users through onboarding, troubleshooting reported issues, and shipping fixes based on their feedback.',
      'Design and deploy customer-facing landing pages, focusing on responsive layouts, fast load times, and clear calls to action.',
    ],
  },
  {
    role: 'Stellar Journey to Mastery Program',
    company: 'Rise In × Stellar',
    start: 'Jun 2026',
    end: 'Aug 2026',
    caseStudy: { slug: 'word-scramble', label: 'Read the Word Scramble case study' },
    bullets: [
      'Graduated from a three-month Stellar builder program covering Soroban smart contracts in Rust, the Stellar SDK, and wallet integration.',
      'Built Word Scramble, a game with an on-chain leaderboard: scores are written to a Soroban contract, and milestones mint achievement badges through an inter-contract call. Deployed to Stellar Mainnet.',
      'Added a Cloudflare Worker that sponsors account creation and transaction fees, so players never need to hold XLM; the game reached 50+ testnet users.',
    ],
  },
  {
    role: 'JavaScript Web Development Bootcamp',
    company: 'Direcho Trabaho and Coding School',
    start: 'Sep 2025',
    end: 'Nov 2025',
    logo: '/images/React.webp',
    bullets: [
      'Completed an intensive 12-week immersive program focused on full-stack JavaScript development and modern web practices.',
      'Core stack: JavaScript (ES6+), HTML5, CSS3, and Git.',
      'Capstone project: a calculator application implementing full operator logic, responsive design, and DOM manipulation.',
    ],
  },
  {
    role: 'Front-End Programming Bootcamp',
    company: 'TAHA Foundation x Uplift Code Camp',
    start: 'Apr 2025',
    end: 'Oct 2025',
    logo: '/images/Uplift.webp',
    bullets: [
      'Completed hands-on training in front-end development covering HTML, CSS, JavaScript, and the React.js framework.',
      'Built responsive, interactive user interfaces applying modern design principles and accessibility standards.',
      'Presented individual and group projects simulating real-world web applications, demonstrating functional UI, state management, and user experience design.',
      'Gained experience with component-based architecture, React Hooks, and client-side routing using React Router.',
      'Took part in weekly progress updates, peer code reviews, and one-on-one mentorship focused on technical proficiency and problem solving.',
    ],
  },
  {
    role: 'Full Stack Web Development Intern',
    company: 'Tech Navy Phil',
    start: 'Jun 2025',
    end: 'Aug 2025',
    logo: '/images/Tech-Navy.webp',
    bullets: [
      'Developed and deployed a Human Resource Information System (HRIS) built to client specifications using HTML, CSS, JavaScript, React, and Ruby.',
      'Implemented both front-end and back-end components, ensuring a consistent user experience and reliable system behavior.',
      'Deployed full-stack applications with Vercel (front end) and Render (back end), optimizing for performance, scalability, and availability.',
      'Configured CI/CD pipelines by connecting GitHub repositories to automated deployments, using Git webhooks to trigger builds on pushes to the main and dev branches.',
      'Worked in a Linux environment using WSL and Ubuntu to run the Ruby and Rails console and server.',
    ],
  },
  {
    role: 'React Framework Bootcamp',
    company: 'Direcho Trabaho and Coding School',
    start: 'Apr 2025',
    end: 'Jun 2025',
    logo: '/images/React.webp',
    bullets: [
      'Completed mentor-led training in React fundamentals through projects, activities, and bootcamp sessions.',
      'Developed a capstone blog application with Figma mockups over one month of prototyping and development; presented on June 30.',
      'Built multiple React applications using functional components, React Hooks (useState, useEffect), and React Router for client-side navigation.',
      'Created a sample project applying React fundamentals with TypeScript.',
    ],
  },
  {
    role: 'Quality Assurance and UI/UX Design Intern',
    company: 'Snapp Ventures Inc. — Matchmo',
    start: 'Jan 2025',
    end: 'May 2025',
    logo: '/images/Team.webp',
    bullets: [
      'Designed interactive UI mockups in Figma, aligned to client requirements and refined through iterative feedback cycles, contributing to a 20% faster design approval turnaround.',
      'Conducted manual QA testing on Android and iOS applications, identifying bugs and usability issues to ensure cross-platform functionality.',
      'Collaborated with developers and product teams to uphold quality and usability standards across releases.',
      'Deployed and tested websites using Vercel and Netlify, improving deployment efficiency.',
      'Completed the required 300 hours of on-the-job training and presented supporting documentation for academic requirements.',
    ],
  },
  {
    role: 'Coding Bootcamp',
    company: 'WPH Digital Pte Ltd',
    start: 'Nov 2024',
    end: 'Dec 2024',
    logo: '/images/WPH.webp',
    bullets: [
      'Completed 10 working days of C# console development training in Visual Studio, including a Rock Paper Scissors application.',
      'Delivered a capstone to-do task manager implementing the MVC pattern.',
      'Completed 10 days of front-end training in HTML, CSS, and JavaScript fundamentals, and built an interactive quiz application.',
      'Completed additional modules in Generative AI, cybersecurity, and cloud services, for a total of 25 consecutive working days, and passed the final assessment.',
    ],
  },
  {
    role: 'Java Programming NC III',
    company: 'Joysis TVI',
    start: 'Aug 2024',
    end: 'Nov 2024',
    logo: '/images/Joysis.webp',
    bullets: [
      'Built practical object-oriented programming skills in Java, focusing on problem solving, logic building, and application development.',
      'Developed Java programs using control structures, arrays, loops, exception handling, and file I/O.',
      'Built graphical user interface applications with Java Swing and implemented event-driven programming.',
      'Applied core programming concepts in exercises and assessments aligned to TESDA NC III competency standards.',
    ],
  },
]

export type Credential = {
  issuer: string
  /** One or more course titles from this issuer. */
  titles: string[]
  year: string
  note?: string
  verify?: string
}

// Featured: verifiable, long-form programs. The rest are grouped by issuer.
export const credentials: { featured: Credential[]; more: Credential[] } = {
  featured: [
    {
      issuer: 'freeCodeCamp',
      titles: ['Responsive Web Design'],
      year: 'Sep 2026',
      note: 'Developer Certification · ~300 hours',
      verify: 'https://freecodecamp.org/certification/jrabara/responsive-web-design-v9',
    },
    {
      issuer: 'Rise In × Stellar',
      titles: ['Stellar Journey to Mastery Program'],
      year: 'Jun – Aug 2026',
      note: 'Graduation certificate · Soroban & Rust',
      verify: 'https://www.risein.com/certificates/IwlkUON_',
    },
  ],
  more: [
    {
      issuer: 'Ground Gurus',
      titles: [
        'AI-Powered Applications with OpenAI & .NET',
        'Build Modern Web Applications with Laravel and React',
        'Laravel Fundamentals and Beyond',
        'PHP Core & Object-Oriented Programming',
        'Web Development with React',
        'HTML, CSS & JavaScript for Beginners',
      ],
      year: '2025 – 2026',
      note: '12-hour live technical trainings',
    },
    {
      issuer: 'Cisco Networking Academy',
      titles: ['C++ Essentials 1 & 2', 'HTML Essentials', 'Introduction to Cybersecurity', 'Networking Basics'],
      year: '2024 – 2026',
    },
    {
      issuer: 'DICT',
      titles: [
        'Web Development for Web Developers · 40 hrs',
        'Web Accessibility Audit · 5 days',
        'AI 101: Better Understanding of AI',
        'Ethical Hacking Upskilling',
      ],
      year: '2023 – 2024',
    },
    {
      issuer: 'Microsoft Learn',
      titles: ['Security Operations Analyst'],
      year: '2025',
    },
    {
      issuer: 'DataCamp',
      titles: ['Introduction to Python', 'Intermediate Python', 'Understanding Data Science', 'Understanding Data Visualization'],
      year: '2025',
    },
    {
      issuer: 'WPH Academy',
      titles: ['Generative AI Awareness & Effective Prompting', 'WPH Codecraft', 'WPH Coding Bootcamp'],
      year: '2024 – 2026',
    },
    {
      issuer: 'Direcho Trabaho & Coding School',
      titles: ['Web Development with JavaScript', 'React Web Development Bootcamp'],
      year: '2025',
    },
    {
      issuer: 'TESDA · Joysis TVI',
      titles: ['Java Programming NC III'],
      year: '2024',
    },
  ],
}

export const learning = [
  {
    name: 'The Odin Project',
    detail: 'Full Stack Ruby on Rails path: Foundations and Ruby courses',
    href: 'https://github.com/Jrabara101/odin-recipes',
    linkLabel: 'First project: Recipes',
  },
  {
    name: 'NextWork',
    detail: 'Guided builds with Claude Code, MCP design-to-code, Claude Artifacts, and Git',
  },
]

export const stats = [
  { value: 157, label: 'Builds deployed' },
  { value: 107, label: '100 Days of Code' },
  { value: 50, label: 'Hands-On season' },
  { value: 365, label: 'UI Challenge' },
]

export type BuildCategory = 'fullstack' | 'frontend' | 'games'

export type Build = {
  title: string
  summary: string
  description: string
  category: BuildCategory
  tech: string[]
  image?: string
  imageBg?: string
  source?: string
  live: string
  internal?: boolean
}

export const buildCategories: { value: 'all' | BuildCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'frontend', label: 'Front End' },
  { value: 'games', label: 'Games' },
]

export const builds: Build[] = [
  {
    title: 'Daily UI Playground',
    summary: 'Nearly a hundred daily interface challenges — forms, checkouts, dashboards and widgets — all live.',
    description:
      'An interactive explorer of my daily UI challenges, ranging from form designs and messaging apps to dashboards and widgets. Search, filter, and preview any build live at desktop, tablet, or phone width.',
    category: 'frontend',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    live: '/playground',
    source: 'https://github.com/Jrabara101',
    internal: true,
  },
  {
    title: 'Word Scramble',
    summary: 'A level-based word puzzle game with live scoring, streak tracking, and progressively harder rounds.',
    description:
      'A retro word puzzle with an on-chain leaderboard on Stellar. Solving a scramble writes your score to a Soroban smart contract, and hitting a milestone mints an achievement badge automatically through an inter-contract call. A fee-sponsorship worker covers account creation and transaction fees, so players never need to hold XLM.',
    category: 'games',
    tech: ['Soroban', 'Rust', 'Stellar SDK', 'JavaScript', 'Cloudflare Workers'],
    image: '/images/word-scramble.png',
    imageBg: '#6b4423',
    source: 'https://github.com/Jrabara101/Stellar-Paradigm',
    live: 'https://word-scramble-v1.surge.sh/',
  },
  {
    title: 'Spark Match',
    summary: 'A 60-second conversational matcher that turns your skills and free time into one real, doable good deed.',
    description:
      'A chat-style matcher built for the DoGoodie $5 Impact Hack. Three questions — your skill, your time, your cause — return one specific volunteering action plus a ready-to-send outreach message, drawn from 25 hand-written match pathways.',
    category: 'fullstack',
    tech: ['React 19', 'TypeScript', 'Vite', 'Cloudflare Pages'],
    image: '/images/spark-match.png',
    imageBg: '#0f2038',
    source: 'https://github.com/Jrabara101/Spark-Match',
    live: 'https://spark-match.pages.dev/',
  },
  {
    title: 'BlindRoute',
    summary: 'A privacy-preserving delivery escrow with a connect, lock, prove, and release flow.',
    description:
      "A privacy-preserving delivery escrow on Midnight. The courier releases the payment by proving in zero knowledge that they know the secret behind an on-chain commitment — the delivery proof, the buyer's address, and both parties' identities never touch the ledger.",
    category: 'fullstack',
    tech: ['Midnight', 'Compact', 'Zero-Knowledge Proofs', 'TypeScript', 'Lace Wallet'],
    image: '/images/blindroute.png',
    imageBg: '#0f2038',
    source: 'https://github.com/Jrabara101/BlindRoute',
    live: 'https://blindroute-web.surge.sh/',
  },
  {
    title: 'Schlitterio',
    summary: 'A snake game where every apple changes the colour of the board as the snake feeds.',
    description:
      'A dynamic and interactive snake game where every feed changes the background colors of the tiles. Uses CSS grid and vanilla JavaScript keyboard controls for seamless playability.',
    category: 'games',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
    image: '/images/snake.webp',
    imageBg: '#f4f7fa',
    source: 'https://github.com/Jrabara101/100-days-of-code',
    live: 'https://100-days-of-code-9ahf.vercel.app/',
  },
  {
    title: 'React Pacman',
    summary: 'Pacman with surprising voice lines every time you get eaten, lose, or win.',
    description:
      'A React-based Pacman game with funny voice feedback triggers. Built on component-based React hooks and state variables, generating responsive pathing.',
    category: 'games',
    tech: ['React.js', 'CSS3', 'HTML5 Audio API', 'Vercel'],
    image: '/images/Pacman.webp',
    imageBg: '#f4f7fa',
    source: 'https://github.com/Jrabara101/100-days-of-code',
    live: 'https://100-days-of-code-2dsrw.vercel.app/',
  },
  {
    title: 'iOS Calculator',
    summary: 'An iOS-style calculator with basic operations and a clean Tailwind UI.',
    description:
      'A clean, pixel-perfect copy of the Apple iOS Calculator, fully responsive and styled with Tailwind CSS. Supports essential arithmetic operations and float inputs.',
    category: 'frontend',
    tech: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Vercel'],
    image: '/images/calculator.webp',
    imageBg: '#f4f7fa',
    source: 'https://github.com/Jrabara101/100-days-of-code',
    live: 'https://100-days-of-code-gdex.vercel.app/',
  },
  {
    title: 'Data Visualization',
    summary: 'Dynamic football stats pulled from RapidAPI and charted with Chart.js.',
    description:
      'An interactive charts interface displaying professional football records. Integrates RapidAPI for live football statistics, parsing data arrays into structured visual graphics via Chart.js.',
    category: 'frontend',
    tech: ['JavaScript', 'RapidAPI', 'Chart.js', 'HTML5', 'Vercel'],
    image: '/images/data.webp',
    imageBg: '#f4f7fa',
    source: 'https://github.com/Jrabara101/fcb-data-visualization',
    live: 'https://fcb-data-visualization.vercel.app/',
  },
  {
    title: 'TodoApp · .NET',
    summary: 'Full CRUD task manager with mark-complete, import/export, and validation — no database.',
    description:
      'Desktop workflow manager built using C# and .NET. Outlines robust CRUD actions, file import-export systems, search filters, and basic validations. Demonstrates object-oriented programming principles.',
    category: 'fullstack',
    tech: ['.NET Framework', 'C#', 'File IO', 'JSON Import/Export', 'Windows Forms'],
    image: '/images/TodoApp.webp',
    imageBg: '#f4f7fa',
    source: 'https://github.com/Jrabara101/TodoApp-.NET-framework.git',
    live: 'https://github.com/Jrabara101/TodoApp-.NET-framework.git',
  },
  {
    title: 'Blog App',
    summary: 'A Next.js blog showcasing CRUD operations for posts and basic user interaction.',
    description:
      'Next.js server-side rendered blogging website. Supports full-stack posting cycles, asynchronous routing, state mutations, and a clean typography grid system.',
    category: 'fullstack',
    tech: ['Next.js', 'React', 'Node.js', 'Vercel', 'CSS Modules'],
    image: '/images/blog-app.webp',
    imageBg: '#f4f7fa',
    source: 'https://github.com/Jrabara101',
    live: 'https://blog-app-next-js-azure.vercel.app/',
  },
  {
    title: 'Neon Estate',
    summary: 'A neon-themed real estate landing page with clear property highlighting.',
    description:
      'A modern, dark-themed real estate layout emphasizing futuristic neon borders and glowing elements. Includes responsive flex grids, smooth transitions, and high-impact CTAs.',
    category: 'frontend',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
    image: '/images/neon-estate.webp',
    imageBg: '#f4f7fa',
    source: 'https://github.com/Jrabara101',
    live: 'https://neon-estate-j8qh.vercel.app/',
  },
  {
    title: 'Surprise Happy Birthday',
    summary: 'An interactive birthday greeting with animations and personalized messages.',
    description:
      'An interactive landing page with customized animations, floating vectors, and background birthday audio. Highlighting front-end UX delight with micro-interactions.',
    category: 'frontend',
    tech: ['HTML5', 'CSS Animations', 'JavaScript', 'Vercel'],
    image: '/images/surprise-happy-birthday.webp',
    imageBg: '#f4f7fa',
    source: 'https://github.com/Jrabara101',
    live: 'https://happy-birthday-zeta-khaki.vercel.app/',
  },
  {
    title: 'Interactive Quiz',
    summary: 'A quiz app with multiple questions, scoring, and dynamic feedback per answer.',
    description:
      'Responsive test-taking interface with active score counters, feedback indicators, and dynamic DOM manipulation.',
    category: 'frontend',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
    image: '/images/interactive-quiz.webp',
    imageBg: '#f4f7fa',
    source: 'https://github.com/Jrabara101/100-days-of-code',
    live: 'https://100-days-of-code-4y1d.vercel.app/',
  },
  {
    title: 'E-commerce App',
    summary: 'A mini storefront with product listing, cart interaction, and checkout layout.',
    description:
      'A React storefront featuring catalog filters, shopping cart aggregates, real-time quantity controls, and custom checkout layouts.',
    category: 'fullstack',
    tech: ['React.js', 'Tailwind CSS', 'Hooks', 'Vercel'],
    image: '/images/ecommerce-app.webp',
    imageBg: '#f4f7fa',
    source: 'https://github.com/Jrabara101/react-e-commerce',
    live: 'https://react-e-commerce-cyan-kappa.vercel.app/',
  },
  {
    title: 'PH Weather Now',
    summary: 'Async JavaScript weather tracker for real-time conditions across the Philippines.',
    description:
      'Real-time weather application connecting to external meteorological JSON endpoints. Fetches temperature, conditions, and icons based on regional lookups with async promise chains.',
    category: 'frontend',
    tech: ['JavaScript Async/Await', 'OpenWeather API', 'CSS3', 'Vercel'],
    image: '/images/ph.webp',
    imageBg: '#f4f7fa',
    source: 'https://github.com/Jrabara101/javascript-async',
    live: 'https://javascript-async-3aab.vercel.app/',
  },
]

export const challenges = [
  {
    title: 'UI Challenges — Figma',
    meta: 'Source design file',
    body: 'The working Figma file behind my daily interface studies — wireframes, component states, type and colour explorations, and the high-fidelity mockups I build from.',
    tags: ['Figma', 'Auto Layout', 'Prototyping', 'Design Systems'],
    cta: 'Open Figma file',
    href: 'https://www.figma.com/design/NmiYpQsP2vUiYk0EDp2KXt/UI-Challenges?node-id=0-1&p=f&t=Rk6RcQTEx48VPejJ-0',
  },
  {
    title: '365 UI Challenge',
    meta: 'uichallenges.design / sheeshable',
    body: 'My public profile on the 365 UI Challenge — a daily design prompt tackled and posted, building consistency in layout, hierarchy, and visual detail one interface at a time.',
    tags: ['UI Design', 'Daily Practice', 'Visual Hierarchy'],
    cta: 'View my profile',
    href: 'https://www.uichallenges.design/u/sheeshable',
  },
]

export const testimonials = [
  {
    quote:
      "Johnrick's attention to detail during his QA and UI/UX internship was outstanding. He tracked bugs systematically and ensured our mobile and web interfaces matched our designs precisely.",
    role: 'Product Manager',
    org: 'Snapp Ventures Inc. (Matchmo)',
    initials: 'SV',
  },
  {
    quote:
      'He quickly mastered setting up our Ruby on Rails environment and contributed directly to our HRIS database structures. A reliable and highly proactive team member.',
    role: 'Engineering Lead',
    org: 'Tech Navy Phil',
    initials: 'TN',
  },
  {
    quote:
      'Johnrick demonstrated high initiative in building fullstack .NET apps and collaborative group projects. His rapid learning curve and passion make him a great asset.',
    role: 'Lead Instructor',
    org: 'WPH Coding Bootcamp',
    initials: 'WP',
  },
]

export const socials = [
  { label: 'Email', href: 'mailto:jrabara101@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/johnrick-rabara/' },
  { label: 'GitHub', href: 'https://github.com/Jrabara101' },
  { label: 'GitLab', href: 'https://gitlab.com/jrabara101/' },
  { label: 'Dribbble', href: 'https://dribbble.com/jrabarav2' },
  { label: 'Facebook', href: 'https://www.facebook.com/Jrabaraa/' },
]
