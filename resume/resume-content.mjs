// Single source of truth for all five resume drafts. Facts come from CV - RABARA.docx.
export const C = {
  name: 'Johnrick E. Rabara',
  first: 'Johnrick',
  last: 'Rabara',
  title: 'Full Stack Web Developer',
  subtitle: 'UI/UX Design · Quality Assurance',
  contacts: [
    { k: 'Email', v: 'jrabara101@gmail.com', href: 'mailto:jrabara101@gmail.com' },
    { k: 'Phone', v: '+63 961 790 3841', href: 'tel:+639617903841' },
    { k: 'Portfolio', v: 'jrabara101.vercel.app', href: 'https://jrabara101.vercel.app/' },
    { k: 'LinkedIn', v: 'linkedin.com/in/johnrick-rabara', href: 'https://www.linkedin.com/in/johnrick-rabara/' },
    { k: 'GitHub', v: 'github.com/Jrabara101', href: 'https://github.com/Jrabara101' },
    { k: 'Location', v: 'San Pedro City, Laguna, PH' },
  ],
  summary:
    'Computer Engineering graduate and full-stack developer building FLOW, a finance, logistics, operations and workforce platform, in React and Laravel. Two years of hands-on work across front-end and back-end development, deployment (Cloudways, Vercel, Render) and CI/CD, plus UI design in Figma and manual QA on web and mobile.',
  experience: [
    {
      org: 'PRDGM Mugen Trading Corp',
      role: 'Full Stack Web Developer',
      dates: 'Aug 2025 – Present',
      bullets: [
        'Build <b>FLOW</b>, a single platform for finance, logistics, operations and workforce, in React and Laravel within an Agile Scrum team.',
        'Deploy and maintain it on a Cloudways enterprise server: provisioning, staging-to-production releases, SSL and DNS, and monitoring.',
        'Support clients directly with onboarding and troubleshooting, and ship fixes and enhancements from their feedback.',
        'Design and ship responsive landing pages that support marketing and client acquisition.',
      ],
    },
    {
      org: 'Tech Navy Phil',
      role: 'Full Stack Web Development Intern',
      dates: 'Jun 2025 – Aug 2025',
      bullets: [
        'Built an HRIS to client specifications with a React front end and a Ruby on Rails back end.',
        'Deployed the front end to Vercel and the back end to Render, with CI/CD builds triggered by pushes to main and dev.',
        'Ran the Rails stack in a Linux environment (WSL, Ubuntu).',
      ],
    },
    {
      org: 'Snapp Ventures Inc.',
      role: 'UI/UX Design & Quality Assurance Intern',
      dates: 'Jan 2025 – May 2025',
      bullets: [
        'Designed Figma mockups through client feedback cycles, contributing to a 20% faster design approval turnaround.',
        'Ran manual QA on Android and iOS apps, documenting bugs and usability issues before release.',
        'Deployed and tested websites on Vercel and Netlify with the development team.',
      ],
    },
  ],
  education: {
    school: 'Lyceum of Alabang',
    degree: 'BS Computer Engineering',
    dates: '2021 – 2025',
    note: 'Capstone: IoT sticker vending machine with an Intel NUC, Arduino Uno and a full-stack Python environment.',
  },
  training: [
    { org: 'Rise In × Stellar', name: 'Stellar Journey to Mastery Program', dates: '2026' },
    { org: 'Direcho Trabaho & Coding School', name: 'JavaScript Web Development Bootcamp', dates: '2025' },
    { org: 'Direcho Trabaho & Coding School', name: 'React Framework Bootcamp', dates: '2025' },
    { org: 'Uplift Code Camp × TAHA Foundation', name: 'Front-End Programming Bootcamp', dates: '2025' },
    { org: 'WPH Digital', name: 'Coding Bootcamp (C#, Front End, GenAI)', dates: '2024 – 2025' },
    { org: 'Joysis TVI', name: 'Java Programming NC III (TESDA)', dates: '2024' },
  ],
  certs: [
    { org: 'freeCodeCamp · 2026', name: 'Responsive Web Design (~300 hrs)' },
    { org: 'Ground Gurus · 2025–2026', name: 'Laravel & React · AI Apps with OpenAI & .NET · PHP Core & OOP' },
    { org: 'DICT Region IV-A · 2023', name: 'Web Development (40 hrs) · Web Accessibility Audit' },
    { org: 'Cisco Networking Academy · 2024–2026', name: 'HTML Essentials · C++ Essentials 1–2 · Networking Basics · Intro to Cybersecurity' },
    { org: 'Microsoft Learn · 2025', name: 'Security Operations Analyst' },
    { org: 'DataCamp · 2025', name: 'Python (Intro & Intermediate) · Data Science' },
  ],
  skills: [
    { k: 'Front end', v: 'HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS' },
    { k: 'Back end', v: 'PHP, Laravel, Ruby on Rails, .NET Core, MySQL, Python' },
    { k: 'DevOps', v: 'Cloudways, Vercel, Render, Netlify, Git, GitHub, CI/CD, Linux (WSL, Ubuntu)' },
    { k: 'Design & QA', v: 'Figma, Canva, Adobe Creative Suite, manual QA (web, iOS, Android), Agile Scrum' },
  ],
}
