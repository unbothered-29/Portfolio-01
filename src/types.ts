export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  aspectRatio?: 'landscape' | 'portrait' | 'wide';
  gridSpan: string; // e.g. 'col-span-12 lg:col-span-7'
  image: string;
  altText: string;
  client: string;
  brief: string;
  deliverables: string[];
  challenge: string;
  solution: string;
  gallery: string[];
  liveUrl?: string;
  githubUrl?: string;
  techStack?: string[];
  features?: string[];
}

export interface CapabilityItem {
  id: string;
  name: string;
  description: string;
  deliverables: string[];
}

export interface DesignerMetadata {
  basedIn: string;
  specialty: string;
  experience: string;
  focus: string;
}

export interface EducationInfo {
  institution: string;
  degree: string;
  duration: string;
  cgpa: string;
  coursework: string[];
}

export interface AwardItem {
  title: string;
  detail: string;
  year?: string;
}

export interface CertificationItem {
  name: string;
  duration: string;
  hasCertificate?: boolean;
}

export interface LanguageItem {
  language: string;
  level: string;
}

export interface TechnicalSkillsGroup {
  frontend: string[];
  backend: string[];
  toolsAndCloud: string[];
  concepts: string[];
}

export interface PersonalBitCard {
  id: string;
  category: string;
  title: string;
  statement?: string;
  description?: string;
  items?: string[];
  placeholderNote?: string;
  rotationDeg: number;
  widthClass?: string;
  aspectHint?: string;
  parallaxFactor?: number;
  fileTag?: string;
  layout?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    width: string | number;
    minHeight?: string | number;
    zIndex: number;
    rotation: number;
    initialOffset?: { x: number; y: number };
  };
}

