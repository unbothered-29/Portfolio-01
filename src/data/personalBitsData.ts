import { PersonalBitCard } from "../types";

export const PERSONAL_BITS_INTRO = {
  sectionNumber: "04 / BEYOND THE WORK",
  title: "Some Bits of Me",
  subtitle: "Some things about me that don't fit neatly into a portfolio.",
  centralPhraseLine1: "SOME BITS",
  centralPhraseLine2: "OF ME",
};

export const PERSONAL_BITS_DATA: PersonalBitCard[] = [
  // 1. Medium Landscape Card (Top-Left) - Decreased size, movable
  {
    id: "currently",
    category: "01 — CURRENTLY",
    title: "Leadership & Creative Systems",
    description:
      "Leading executive operations for 30+ members at RGIT FE-SAHYOG, shaping visual brand narratives for young travel communities at Roamevo, and refining human-centric interface engineering.",
    placeholderNote: "[Editable: Add what you are currently learning, exploring, or working toward]",
    rotationDeg: -1.8,
    widthClass: "w-full max-w-[290px]",
    parallaxFactor: 0.016,
    layout: {
      top: "8%",
      left: "5%",
      width: 290,
      minHeight: 195,
      zIndex: 12,
      rotation: -1.8,
      initialOffset: { x: -20, y: -15 },
    },
  },
  // 2. Statement Card (Top-Right) - Decreased size, movable
  {
    id: "beyond-the-screen",
    category: "02 — BEYOND THE SCREEN",
    title: "Stepping Away",
    description:
      "Outside the code editor and Figma frames, I curate detailed travel routes, explore architectural environments, and observe how typography guides humans through physical spaces.",
    statement: "\"Observing how light, spatial geometry, and print typography interact in the physical world.\"",
    placeholderNote: "[Editable: Add your activities outside of digital work]",
    rotationDeg: 1.4,
    widthClass: "w-full max-w-[325px]",
    parallaxFactor: 0.02,
    layout: {
      top: "9%",
      right: "6%",
      width: 325,
      minHeight: 215,
      zIndex: 14,
      rotation: 1.4,
      initialOffset: { x: 25, y: -15 },
    },
  },
  // 3. List Card (Mid-Left) - Decreased size, movable
  {
    id: "i-like",
    category: "03 — I LIKE",
    title: "Quiet Favorites",
    items: [
      "Travel & Group Expeditions",
      "Kinetic Typography & Neue Haas Grotesk",
      "Mathematical Spacing & Clean Rhythms",
      "Physics-Grounded 60fps Transitions",
      "[Add your favorite coffee order or ritual]",
      "[Add your favorite ambient playlists]",
    ],
    placeholderNote: "[Editable: Tailor with your daily favorites]",
    rotationDeg: 1.6,
    widthClass: "w-full max-w-[260px]",
    parallaxFactor: -0.018,
    layout: {
      top: "44%",
      left: "4%",
      width: 260,
      minHeight: 235,
      zIndex: 22,
      rotation: 1.6,
      initialOffset: { x: -15, y: 15 },
    },
  },
  // 4. Small Compact Fact Card (Mid-Right) - Decreased size, movable
  {
    id: "fun-fact",
    category: "04 — FUN FACT",
    title: "To The Exact Chair",
    description:
      "\"Google Maps ends at the gate — we take you to the chair.\" When building campus navigation, I mapped weighted node graphs down to individual 6th-floor laboratory desks.",
    placeholderNote: "[Editable: Replace with another personal quirk or memory]",
    rotationDeg: -1.6,
    widthClass: "w-full max-w-[225px]",
    parallaxFactor: -0.014,
    layout: {
      top: "47%",
      right: "5%",
      width: 225,
      minHeight: 155,
      zIndex: 18,
      rotation: -1.6,
      initialOffset: { x: 20, y: 10 },
    },
  },
  // 5. Quote Card (Bottom-Center/Left) - Decreased size, movable
  {
    id: "my-approach",
    category: "05 — MY APPROACH",
    title: "Natural, Quiet & Enduring",
    statement:
      "\"Translating complex ideas into clear visual systems with mathematical rigor and aesthetic warmth.\"",
    description:
      "I believe great design never shouts. It earns trust by behaving quietly, respecting user time, and feeling effortless beneath the fingertips.",
    rotationDeg: -1.0,
    widthClass: "w-full max-w-[310px]",
    parallaxFactor: 0.012,
    layout: {
      bottom: "6%",
      left: "26%",
      width: 310,
      minHeight: 155,
      zIndex: 15,
      rotation: -1.0,
      initialOffset: { x: -10, y: 20 },
    },
  },
  // 6. Curiosity Card (Bottom-Right) - Decreased size, movable
  {
    id: "currently-exploring",
    category: "06 — CURRENTLY EXPLORING",
    title: "Curiosities on My Radar",
    items: [
      "AI Vision Pipelines & Schedule Parsers",
      "A* Indoor Graph Pathfinding",
      "GSAP Motion Systems & Inertia Scrolling",
      "Liquid Glass & Atmospheric Light Reflections",
      "[Add emerging frameworks or creative topics]",
    ],
    placeholderNote: "[Editable: Keep synced with technical curiosities]",
    rotationDeg: 2.0,
    widthClass: "w-full max-w-[255px]",
    parallaxFactor: -0.02,
    layout: {
      bottom: "6%",
      right: "8%",
      width: 255,
      minHeight: 190,
      zIndex: 16,
      rotation: 2.0,
      initialOffset: { x: 15, y: 20 },
    },
  },
];
