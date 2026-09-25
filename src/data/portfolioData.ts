import {
  Project,
  CapabilityItem,
  DesignerMetadata,
  EducationInfo,
  AwardItem,
  CertificationItem,
  LanguageItem,
  TechnicalSkillsGroup,
} from '../types';

export const DESIGNER_NAME = "Jessicaa Chauhan";

export const RESUME_SUMMARY =
  "Dedicated Front-end Web Developer who enjoys turning ideas into functional, polished websites. Skilled in building responsive frontend interfaces with React.js, Next.js, TypeScript, and Tailwind CSS, with strong attention to detail, reusable components, clean design, and user experience.";

export const DESIGNER_METADATA: DesignerMetadata = {
  basedIn: "Mumbai, Maharashtra",
  specialty: "Frontend Web Developer",
  experience: "President @ RGIT FE-SAHYOG",
  focus: "React.js · Next.js · TypeScript · Tailwind CSS",
};

export const CONTACT_INFO = {
  name: "Jessicaa Chauhan",
  location: "Mumbai, Maharashtra, India",
  phone: "+91 8855872136",
  email: "chauhanjessicaa27@gmail.com",
  github: "https://github.com/unbothered-29",
  githubUsername: "unbothered-29",
  linkedin: "https://linkedin.com/in/jessicaachauhan",
  linkedinUsername: "jessicaachauhan",
};

export const EDUCATION_DATA: EducationInfo = {
  institution: "Rajiv Gandhi Institute of Technology (RGIT), Mumbai",
  degree: "Bachelor of Engineering (B.E.) – Artificial Intelligence & Data Science",
  duration: "Sep 2024 – May 2028",
  cgpa: "8.5 CGPA",
  coursework: [
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
    "Object-Oriented Programming",
    "Software Engineering",
  ],
};

export const TECHNICAL_SKILLS_DATA: TechnicalSkillsGroup = {
  frontend: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Tailwind CSS",
  ],
  backend: ["Java", "Spring Boot", "REST APIs", "Kafka", "Microservices"],
  toolsAndCloud: ["Git", "GitHub", "Docker", "Vercel", "AWS"],
  concepts: ["Responsive Design", "Component-Based Architecture"],
};

export const AWARDS_DATA: AwardItem[] = [
  {
    title: "1st Runner Up – Pixel Perfect ’26 Frontend Hackathon",
    detail: "Competed against 80 engineering teams with SPIT Sahyog mobile-first PWA",
    year: "2026",
  },
  {
    title: "Smart India Hackathon (SIH) 2025",
    detail: "Participated in prestigious national-level hackathon solving real-world challenges",
    year: "2025",
  },
  {
    title: "Saksham 26 Fix It",
    detail: "Participated in competitive technical problem-solving and rapid code debugging",
    year: "2026",
  },
  {
    title: "Programmers Date 4.0",
    detail: "Collaborative developer hackathon and algorithmic programming challenge",
    year: "2026",
  },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    name: "The Front-End Web Developer Bootcamp: HTML, CSS, JS & React",
    duration: "11 hrs",
    hasCertificate: true,
  },
  {
    name: "Complete JavaScript, XML, AJAX and React Bootcamp – Hands-On",
    duration: "12.5 hrs",
    hasCertificate: true,
  },
  {
    name: "Practical Next.js & React – Build a real WebApp with Next.js",
    duration: "11 hrs",
    hasCertificate: true,
  },
];

export const LANGUAGES_DATA: LanguageItem[] = [
  { language: "English", level: "Fluent" },
  { language: "Hindi", level: "Native" },
  { language: "Gujarati", level: "Native" },
];

export const PROJECTS: Project[] = [
  {
    id: "spit-sahyog",
    title: "SPIT Sahyog",
    category: "Smart Campus Navigation & PWA",
    year: "2026",
    gridSpan: "col-span-12 lg:col-span-7",
    aspectRatio: "landscape",
    image: "https://res.cloudinary.com/av9pwzc8/image/upload/v1789919814/spit_qzyedx.png",
    altText: "SPIT Sahyog Smart Campus Navigation and Discovery PWA Interface",
    client: "Sardar Patel Institute of Technology · Pixel Perfect ’26 (1st Runner Up)",
    brief: "A mobile-first Progressive Web App (PWA) for campus navigation, combining interactive Leaflet maps with custom SVG floor plans to guide students, faculty, and visitors directly to classrooms, laboratories, and facilities even with limited connectivity.",
    deliverables: [
      "Mobile-First PWA",
      "Interactive Leaflet Maps",
      "Custom SVG Floor Plans",
      "Fuzzy Search (Fuse.js)",
      "IndexedDB Offline Caching",
      "Zustand State Management",
    ],
    challenge: "Standard GPS ends at the entrance gate. Locating specific classrooms, labs, and faculty rooms across multiple floors is challenging due to inconsistent connectivity and scattered physical notices.",
    solution: "Developed a mobile-first Progressive Web App combining interactive Leaflet maps with custom SVG floor plans to guide users to classrooms, labs, and facilities. Implemented fuzzy search, floor-based filtering, offline data caching with IndexedDB, and Zustand state management for reliable navigation with limited connectivity. Won 1st Runner Up at the Pixel-Perfect Hackathon 2026 out of 80 teams.",
    techStack: [
      "React.js",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Leaflet.js",
      "Zustand",
      "IndexedDB (Dexie.js)",
      "PWA",
    ],
    features: [
      "Developed a mobile-first Progressive Web App for campus navigation combining interactive Leaflet maps with custom SVG floor plans",
      "Guides users directly to classrooms, labs, and campus facilities with pinpoint accuracy",
      "Implemented fuzzy search and floor-based filtering for instant room discovery",
      "Offline data caching with IndexedDB ensuring uninterrupted navigation even with spotty connectivity",
      "Zustand state management for lightweight, responsive client state across search and floor views",
      "Built reusable responsive React components and touch-friendly interfaces optimized for mobile devices",
      "Won 1st Runner Up at the Pixel-Perfect Hackathon 2026 against 80 teams",
    ],
    gallery: [
      "https://res.cloudinary.com/av9pwzc8/image/upload/v1789919814/spit_qzyedx.png",
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop",
    ],
    liveUrl: "https://spit-sahyog.vercel.app",
    githubUrl: "https://github.com/unbothered-29",
  },
  {
    id: "attendance-tracker",
    title: "Smart Attendance Tracker & AI Timetable Manager",
    category: "AI Academic Management & Analytics",
    year: "2026",
    gridSpan: "col-span-12 lg:col-span-5",
    aspectRatio: "portrait",
    image: "https://res.cloudinary.com/av9pwzc8/image/upload/v1789919813/attendance_track_svjrlb.png",
    altText: "Smart Attendance Tracker & AI Timetable Manager with Gemini Vision",
    client: "Academic Engineering Platform",
    brief: "A full-stack attendance platform supporting timetable processing, division and lab-batch scheduling, and attendance analytics powered by Google Gemini Vision.",
    deliverables: [
      "Full-Stack Web App",
      "Google Gemini Vision OCR",
      "Division & Lab-Batch Scheduling",
      "Attendance Forecasting",
      "Bunk Planning Engine",
      "Firebase Auth & Firestore",
    ],
    challenge: "Manually tracking semester attendance across lectures, practical lab batches, divisions, and varied holiday schedules is tedious and error-prone.",
    solution: "Built a full-stack attendance platform supporting timetable processing, division and lab-batch scheduling, and attendance analytics. Integrated Google Gemini Vision to extract structured timetable data from uploaded images and automatically generate academic schedules. Engineered attendance forecasting and bunk planning with Firebase Auth/Firestore, accounting for holidays and lecture/practical schedules.",
    techStack: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Firebase Auth",
      "Firestore",
      "Google Gemini AI (Vision)",
      "Express.js",
    ],
    features: [
      "Full-stack attendance platform supporting timetable processing and attendance analytics",
      "Division and lab-batch scheduling supporting complex college timetables",
      "Integrated Google Gemini Vision to extract structured timetable data directly from uploaded screenshots",
      "Automatically generates full weekly academic schedules from parsed images",
      "Engineered attendance forecasting and bunk planning to calculate safe skips while maintaining 75% criteria",
      "Firebase Authentication and cloud Firestore synchronization across devices",
      "Accounts for public holidays, semester calendars, and lecture vs. practical weighting",
    ],
    gallery: [
      "https://res.cloudinary.com/av9pwzc8/image/upload/v1789919813/attendance_track_svjrlb.png",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop",
    ],
    liveUrl: "https://attendance-jess.vercel.app",
    githubUrl: "https://github.com/unbothered-29/Attendance-Tracker.git",
  },
  {
    id: "roamevo",
    title: "Roamevo",
    category: "Travel & Tour Web Platform",
    year: "2026",
    gridSpan: "col-span-12 lg:col-span-5",
    aspectRatio: "portrait",
    image: "https://res.cloudinary.com/av9pwzc8/image/upload/v1789919814/roamevo_gcy8mq.png",
    altText: "Roamevo Premium Travel and Tour Operating Platform Interface",
    client: "Roamevo Private Limited",
    brief: "A premium, community-focused travel and tour operating web platform built to curate group expeditions and backpacking trips for young travelers around Roam, Experience, and Evolve.",
    deliverables: [
      "Frontend Architecture",
      "10+ Curated Itineraries",
      "Promotional Collateral",
      "Marketing Campaigns",
    ],
    challenge: "Creating an engaging travel discovery platform that pairs itinerary planning with brand marketing and promotional collateral.",
    solution: "Designed 10+ trip itineraries and coordinated content delivery aligned with founder expectations. Created marketing collateral including flyers, banners, posters, and Instagram posts for promotions. Collaborated with the team to develop and execute campaigns improving content consistency and audience engagement.",
    techStack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS v4",
      "Motion",
      "Content Strategy",
    ],
    features: [
      "Designed 10+ trip itineraries and coordinated content delivery aligned with founder expectations",
      "Created marketing collateral including flyers, banners, posters, and Instagram posts for company promotions",
      "Collaborated with the team to develop and execute promotional campaigns, improving content consistency and engagement",
      "Interactive destination spotlights for Himachal, Kedarnath, Ladakh, and Spiti Valley",
      "Performance-optimized frontend with custom skeleton loaders and mobile-first drawer navigation",
    ],
    gallery: [
      "https://res.cloudinary.com/av9pwzc8/image/upload/v1789919814/roamevo_gcy8mq.png",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1400&auto=format&fit=crop",
    ],
    liveUrl: "https://roamevo.com",
  },
  {
    id: "sundown-studio",
    title: "Sundown Studio",
    category: "Creative Frontend & Motion",
    year: "2026",
    gridSpan: "col-span-12 lg:col-span-7",
    aspectRatio: "landscape",
    image: "https://res.cloudinary.com/av9pwzc8/image/upload/v1789919813/html-js_hk3ass.png",
    altText: "Sundown Studio High-Craft Frontend Clone and Motion System Interface",
    client: "Creative Engineering Demonstration",
    brief: "A high-craft frontend clone of Sundown Studio, built with vanilla HTML5, CSS3, and JavaScript, demonstrating precision motion choreography, cursor-tracking hover portals, and fluid scrolling.",
    deliverables: [
      "Inertia Smooth Scroll",
      "Cursor-Tracking Hover Previews",
      "GSAP 3 & ScrollTrigger",
      "Interactive Tabs",
      "Fluid Blob Animations",
    ],
    challenge: "Reconstructing intricate kinetic typography, inertia scrolling, and real-time mouse-tracking image portals using pure vanilla JavaScript without heavy frameworks.",
    solution: "Engineered a performant vanilla frontend using GSAP 3, ScrollTrigger, Locomotive Scroll, and Swiper.js with 60fps animations and custom CSS gooey filters.",
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "GSAP 3",
      "ScrollTrigger",
      "Locomotive Scroll",
      "Vercel",
    ],
    features: [
      "Smooth inertia-based scrolling using Locomotive Scroll integration",
      "Dynamic cursor-following project preview portals in real time",
      "Interactive process tabs switching image and narrative copy dynamically",
      "Infinite keyframe marquee engineered with pure CSS",
      "Fluid gooey blobs with CSS filter blur and keyframe morphing",
    ],
    gallery: [
      "https://res.cloudinary.com/av9pwzc8/image/upload/v1789919813/html-js_hk3ass.png",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    ],
    liveUrl: "https://sundown-studio-unbothered.vercel.app/",
    githubUrl: "https://github.com/unbothered-29",
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: "frontend-architecture",
    name: "Frontend Development",
    description: "Building responsive, accessible web applications with React.js, Next.js, TypeScript, and modern component architectures.",
    deliverables: ["React & Next.js Apps", "Responsive Layouts", "Reusable Design Systems", "State Management (Zustand)"],
  },
  {
    id: "ai-integrations",
    name: "AI & Full-Stack Systems",
    description: "Integrating modern AI capabilities (Google Gemini Vision) with backend REST APIs and cloud databases like Firebase.",
    deliverables: ["Gemini Vision OCR", "Firebase Auth & Firestore", "REST APIs & Java Spring Boot", "Predictive Analytics"],
  },
  {
    id: "pwa-mapping",
    name: "PWAs & Interactive Maps",
    description: "Developing offline-first Progressive Web Apps with IndexedDB local caching, vector SVG floor plans, and Leaflet.js indoor mapping.",
    deliverables: ["Offline Caching (IndexedDB)", "Interactive Leaflet Maps", "SVG Floor Plans", "Touch-Optimized UI"],
  },
  {
    id: "creative-direction",
    name: "Content & Team Leadership",
    description: "Guiding student engineering committees and curating marketing collateral, promotional campaigns, and brand storytelling.",
    deliverables: ["Organizational Governance", "Event Execution", "Promotional Collateral", "Itinerary Curation"],
  },
];

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    label: "github.com/unbothered-29",
    href: "https://github.com/unbothered-29",
  },
  {
    name: "LinkedIn",
    label: "linkedin.com/in/jessicaachauhan",
    href: "https://linkedin.com/in/jessicaachauhan",
  },
  {
    name: "Email",
    label: "chauhanjessicaa27@gmail.com",
    href: "mailto:chauhanjessicaa27@gmail.com",
  },
  {
    name: "Phone",
    label: "+91 8855872136",
    href: "tel:+918855872136",
  },
];
