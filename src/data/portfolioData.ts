import { Project, CapabilityItem, DesignerMetadata } from '../types';

export const DESIGNER_NAME = "Jessicaa Chauhan";

export const DESIGNER_METADATA: DesignerMetadata = {
  basedIn: "Manila",
  specialty: "Digital Design",
  experience: "7+ Years",
  focus: "Brand / UI / Art Direction",
};

export const PROJECTS: Project[] = [
  {
    id: "roamevo",
    title: "Roamevo",
    category: "Travel & Tour Web Platform",
    year: "2026",
    gridSpan: "col-span-12 lg:col-span-7",
    aspectRatio: "landscape",
    image: "https://res.cloudinary.com/av9pwzc8/image/upload/v1789919814/roamevo_gcy8mq.png",
    altText: "Roamevo Premium Travel and Tour Operating Platform Interface",
    client: "Roamevo Private Limited",
    brief: "A premium, community-focused travel and tour operating web platform built to curate unforgettable group expeditions and backpacking trips for young adults, college groups, and solo travelers around three core pillars: Roam, Experience, and Evolve.",
    deliverables: ["Frontend Architecture", "UI/UX Design", "Performance Optimization", "Mobile-First Experience"],
    challenge: "Delivering an immersive, high-impact travel discovery experience with dynamic background video reels, destination deep-dives, and rapid trip filtering while maintaining instant perceived performance, skeleton loading states, and fluid mobile responsiveness.",
    solution: "Engineered a high-performance web platform built with React 19, Vite, Tailwind CSS v4, and Motion. Integrated dynamic hero video loops, custom skeleton loaders for discovery grids, dedicated destination spotlights (Himachal, Kedarnath, Ladakh, Spiti Valley), an interactive 'Vibe Check' video reels gallery, an authentic review carousel, and a touch-optimized mobile drawer experience.",
    techStack: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Motion", "React Router v7", "Lucide React"],
    features: [
      "Immersive Landing Page with dynamic background video loops and conversion-focused search interface",
      "Performance-Optimized UX featuring custom skeleton loaders for discovery grids",
      "Destination Spotlights for premier locations (Himachal Pradesh, Kedarnath, Ladakh, Spiti Valley)",
      "Upcoming Group Trips showcase with pricing, duration, difficulty levels, and booking flows",
      "The 'Vibe Check' interactive horizontal scrolling short-form video reels gallery",
      "Authentic Traveler Reviews carousel and expandable accordion FAQ section",
      "Mobile-First Experience with custom sidebar drawer navigation and touch-friendly carousels"
    ],
    gallery: [
      "https://res.cloudinary.com/av9pwzc8/image/upload/v1789919814/roamevo_gcy8mq.png",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1400&auto=format&fit=crop"
    ],
    liveUrl: "https://roamevo.com"
  },
  {
    id: "spit-sahyog",
    title: "SPIT Sahyog",
    category: "Smart Campus Navigation & PWA",
    year: "2026",
    gridSpan: "col-span-12 lg:col-span-5",
    aspectRatio: "portrait",
    image: "https://res.cloudinary.com/av9pwzc8/image/upload/v1789919814/spit_qzyedx.png",
    altText: "SPIT Sahyog Smart Campus Navigation and Discovery PWA Interface",
    client: "Sardar Patel Institute of Technology",
    brief: "\"Google Maps ends at the gate. We take you to the chair.\" An offline-first mobile Progressive Web App (PWA) designed to solve the \"Last Mile\" indoor navigation gap within the SPIT campus, seamlessly guiding students, faculty, and visitors directly to specific classrooms, laboratories, or amenities—even without internet connectivity.",
    deliverables: ["A* Pathfinding Engine", "Indoor Vector Mapping", "Offline-First PWA", "Fuse.js Search", "Maintenance Portal"],
    challenge: "Standard outdoor GPS guides users to building entrances but fails completely indoors. Finding 'Lab 604' on the 6th floor is confusing due to scattered physical notice boards, legacy portals, and spotty basement/elevator WiFi connectivity.",
    solution: "Engineered an offline-first PWA built with React 18, Leaflet.js, and Zustand backed by an IndexedDB (Dexie.js) datastore. Implemented an A* (A-Star) graph pathfinding algorithm across campus nodes, an automated outdoor GPS to indoor SVG ImageOverlay handover, regex-powered natural language floor filtering, real-time Haversine distance/walk-time calculations, and crowdsourced photo maintenance reporting with administrative status workflows.",
    techStack: ["React 18", "TypeScript", "Vite", "Leaflet.js", "Zustand", "Dexie.js (IndexedDB)", "Fuse.js", "Tailwind CSS", "PWA"],
    features: [
      "A* (A-Star) Pathfinding Algorithm modeling campus as a weighted node graph to calculate true walkable shortest paths",
      "Hybrid Outdoor-Indoor Handover automatically switching from GPS coordinates to custom SVG floor plan overlays",
      "Offline-First Architecture caching complete campus POIs, maps, and search history locally with Dexie.js",
      "Regex & Fuse.js Smart Search parsing natural language queries (e.g., '3rd floor labs') with fuzzy typo tolerance",
      "Real-Time Haversine Distance Engine displaying instant meter distance and walking duration cards",
      "Crowdsourced Infrastructure Reporting with Base64 photo capture and administrative resolution tracking",
      "Mobile-First Ergonomics featuring bottom-sheet thumb navigation and an installable PWA manifest"
    ],
    gallery: [
      "https://res.cloudinary.com/av9pwzc8/image/upload/v1789919814/spit_qzyedx.png",
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop"
    ],
    liveUrl: "https://spitsahyog.web.app"
  },
  {
    id: "attendance-tracker",
    title: "Attendance Tracker",
    category: "AI Productivity & Analytics",
    year: "2026",
    gridSpan: "col-span-12 lg:col-span-5",
    aspectRatio: "portrait",
    image: "https://res.cloudinary.com/av9pwzc8/image/upload/v1789919813/attendance_track_svjrlb.png",
    altText: "College Attendance Tracker with Gemini Vision AI Interface",
    client: "Academic Engineering Project",
    brief: "A smart, subject-wise attendance tracking web platform for college students. Students upload a photo or screenshot of their timetable and let Google Gemini AI extract their schedule automatically—then track daily attendance, monitor percentages against goal thresholds, and calculate safe skips.",
    deliverables: ["Gemini AI Vision Pipeline", "Full-Stack Express API", "Attendance Forecasting", "Timetable OCR Engine", "Modern Dark UI"],
    challenge: "Manually inputting complicated weekly college schedules across lectures, laboratory practicals, divisions, and batches is tedious and prone to errors. Students also struggle to calculate exactly how upcoming absences will affect the mandatory 75% attendance threshold.",
    solution: "Built a full-stack web application powered by React 19, Vite 6, Tailwind CSS 4, and an Express Node.js backend. Integrated the Google Gemini API (@google/genai) and client-side Tesseract.js OCR to automatically parse timetable screenshots or generate synthetic schedules. Implemented real-time goal tracking (calculating exact classes needed or safely skippable to maintain 75%), separate lecture vs. practical weighting, daily notes, and friction-free profile authentication.",
    techStack: ["React 19", "TypeScript", "Vite 6", "Express.js", "Google Gemini API", "Tailwind CSS 4", "Motion", "Tesseract.js", "date-fns"],
    features: [
      "AI-Powered Timetable Import via Google Gemini Vision extracting subjects, faculty, and time slots automatically",
      "Synthetic Timetable Generator creating realistic schedules on demand by branch, semester, and year",
      "Real-Time Goal Tracker calculating whether attendance is safe or at-risk and projecting exact classes required for 75%",
      "Semester-Aware Weighting separating lecture hours from laboratory practical sessions",
      "Single-Tap Daily Logging for Attended, Skipped, and Cancelled lectures",
      "Contextual Calendar Notes enabling students to attach study reminders to specific dates",
      "Modern Dark Mode UI built with Tailwind CSS and Radix-inspired accessible primitives"
    ],
    gallery: [
      "https://res.cloudinary.com/av9pwzc8/image/upload/v1789919813/attendance_track_svjrlb.png",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop"
    ],
    liveUrl: "https://attendance-tracker-ai.web.app",
    githubUrl: "https://github.com/unbothered-29/Attendance-Tracker.git"
  },
  {
    id: "sundown-studio",
    title: "Sundown Studio",
    category: "Creative Studio & Motion System",
    year: "2026",
    gridSpan: "col-span-12 lg:col-span-7",
    aspectRatio: "landscape",
    image: "https://res.cloudinary.com/av9pwzc8/image/upload/v1789919813/html-js_hk3ass.png",
    altText: "Sundown Studio High-Craft Frontend Clone and Motion System Interface",
    client: "Design & Creative Engineering Clone",
    brief: "A pixel-perfect frontend clone of the award-winning Sundown Studio website, built with vanilla HTML, CSS, and JavaScript. Replicates the studio's multi-page layout, inertia-based smooth scrolling, cursor-tracking hover previews, dynamic interactive design tabs, and typographic design system in Neue Haas Grotesk.",
    deliverables: ["Inertia Smooth Scroll", "Cursor-Tracking Hover Preview", "GSAP & ScrollTrigger", "Interactive Design Tabs", "Liquid Fluid Blobs"],
    challenge: "Faithfully reconstructing award-winning kinetic typography, inertia scrolling, and real-time mouse-tracking image portals using pure vanilla JavaScript without bulky frameworks, while achieving seamless 60fps animations, organic liquid CSS blob morphing, and a fixed footer scroll-reveal depth.",
    solution: "Engineered a performant vanilla frontend using GSAP 3, ScrollTrigger, Locomotive Scroll, and Swiper.js. Implemented an infinite CSS @keyframes text marquee without JavaScript overhead, dynamic cursor-following project preview portals (#fixed-img) using pointer-events-free mouse tracking, interactive non-reloading design/project/execution tabs via data attributes, fluid CSS gooey blur filters, and a multi-weight Neue Haas Grotesk typographic hierarchy.",
    techStack: ["HTML5", "CSS3", "JavaScript (Vanilla)", "GSAP 3", "ScrollTrigger", "Locomotive Scroll", "Swiper.js", "Vercel"],
    features: [
      "Locomotive Scroll integration providing silky inertia-based smooth scrolling across page containers",
      "Mouse-Tracking Project Preview where a floating image portal follows the cursor in real time",
      "Hover-Reveal Project List with dynamic orange overlay animations and data-image extraction",
      "Interactive Process Tabs switching image and narrative copy dynamically without page reloads",
      "Infinite Keyframe Marquee engineered with pure CSS without JavaScript overhead",
      "Organic Liquid Glowing Blobs with CSS filter blur and skew morphing keyframes",
      "Fixed Footer Scroll Reveal utilizing viewport depth spacers and 23vw display typography"
    ],
    gallery: [
      "https://res.cloudinary.com/av9pwzc8/image/upload/v1789919813/html-js_hk3ass.png",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
    ],
    liveUrl: "https://sundown-studio-unbothered.vercel.app/"
  }
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: "art-direction",
    name: "Art Direction",
    description: "Curating photographic direction, color harmonies, lighting, and spatial styling to establish cohesive emotional gravity.",
    deliverables: ["Visual Concepts", "Photoshoot Treatment", "Style Frames", "Editorial Guidelines"]
  },
  {
    id: "brand-identity",
    name: "Brand Identity",
    description: "Building timeless visual identities, bespoke marks, typographic pairings, and scalable design token systems.",
    deliverables: ["Logotypes & Marks", "Brand Guidelines", "Design Tokens", "Collateral Systems"]
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    description: "Architecting human-centric interfaces with obsessive attention to micro-spacing, typography, states, and accessibility.",
    deliverables: ["Wireframes & Flows", "High-Fidelity UI", "Interactive Prototypes", "Component Libraries"]
  },
  {
    id: "motion-design",
    name: "Motion Design",
    description: "Crafting fluid, meaningful transitions and physics-grounded micro-animations that make digital software feel alive.",
    deliverables: ["Interface Choreography", "State Transitions", "Interactive Physics", "Lottie / Code Specs"]
  },
  {
    id: "creative-strategy",
    name: "Creative Strategy",
    description: "Positioning digital products through sharp market analysis, editorial narrative, and structured design roadmaps.",
    deliverables: ["Brand Narrative", "Competitive Audits", "Information Architecture", "Design Principles"]
  },
  {
    id: "digital-experiences",
    name: "Digital Experiences",
    description: "Designing end-to-end immersive web experiences with glassmorphic depth, atmospheric light, and responsive fluidity.",
    deliverables: ["Web Platforms", "Spatial Experiences", "Creative Portfolios", "Interactive Case Studies"]
  }
];

export const SOCIAL_LINKS = [
  { name: "Email", label: "chauhanjessicaa27@gmail.com", href: "mailto:chauhanjessicaa27@gmail.com" },
  { name: "LinkedIn", label: "linkedin.com/in/jessicaachauhan", href: "https://linkedin.com" },
  { name: "Twitter / X", label: "@jessicaachauhan", href: "https://x.com" },
  { name: "ReadCV", label: "read.cv/jessicaa", href: "https://read.cv" },
  { name: "Instagram", label: "@jessicaa.design", href: "https://instagram.com" }
];
