import { PersonalBitCard } from "../types";

export const PERSONAL_BITS_INTRO = {
  sectionNumber: "04 / BEYOND THE WORK",
  title: "Some Bits of Me",
  subtitle: "Some things about me that don't fit neatly into a portfolio.",
  centralPhraseLine1: "SOME BITS",
  centralPhraseLine2: "OF ME",
};

export const PERSONAL_BITS_DATA: PersonalBitCard[] = [
  // 1. Medium Landscape Card (Top-Left)
  {
    id: "currently",
    category: "01 — CURRENTLY",
    title: "Leadership & Creative Systems",
    description:
      "Leading executive operations for 30+ members at RGIT FE-SAHYOG, shaping visual brand narratives for young travel communities at Roamevo, and refining human-centric interface engineering.",
    rotationDeg: -1.8,
    widthClass: "w-full max-w-[325px]",
    parallaxFactor: 0.016,
    layout: {
      top: "10%",
      left: "5%",
      width: 325,
      minHeight: 200,
      zIndex: 12,
      rotation: -1.8,
      initialOffset: { x: -15, y: -10 },
    },
  },
  // 2. Statement Card (Top-Right)
  {
    id: "beyond-the-screen",
    category: "02 — BEYOND THE SCREEN",
    title: "Stepping Away",
    description:
      "Outside the code editor and Figma frames, I curate detailed travel routes, explore architectural environments, and observe how typography guides humans through physical spaces.",
    statement: "\"Observing how light, spatial geometry, and print typography interact in the physical world.\"",
    rotationDeg: 1.4,
    widthClass: "w-full max-w-[345px]",
    parallaxFactor: 0.02,
    layout: {
      top: "10%",
      right: "5%",
      width: 345,
      minHeight: 215,
      zIndex: 14,
      rotation: 1.4,
      initialOffset: { x: 15, y: -10 },
    },
  },
  // 3. List Card (Bottom-Left)
  {
    id: "i-like",
    category: "03 — I LIKE",
    title: "Quiet Favorites",
    items: [
      "Travel & Group Expeditions",
      "Kinetic Typography & Neue Haas Grotesk",
      "Mathematical Spacing & Clean Rhythms",
      "Physics-Grounded 60fps Transitions",
      "Cold Brew Coffee & Late-Night Coding Flow",
    ],
    rotationDeg: 1.6,
    widthClass: "w-full max-w-[300px]",
    parallaxFactor: -0.018,
    layout: {
      bottom: "8%",
      left: "5%",
      width: 300,
      minHeight: 210,
      zIndex: 22,
      rotation: 1.6,
      initialOffset: { x: -15, y: 15 },
    },
  },
  // 4. Small Compact Fact Card (Bottom-Right)
  {
    id: "fun-fact",
    category: "04 — FUN FACT",
    title: "To The Exact Chair",
    description:
      "\"Google Maps ends at the gate — we take you to the chair.\" When building campus navigation, I mapped weighted node graphs down to individual 6th-floor laboratory desks.",
    rotationDeg: -1.6,
    widthClass: "w-full max-w-[310px]",
    parallaxFactor: -0.014,
    layout: {
      bottom: "8%",
      right: "5%",
      width: 310,
      minHeight: 180,
      zIndex: 18,
      rotation: -1.6,
      initialOffset: { x: 15, y: 15 },
    },
  },
];
