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

export interface PersonalBitCard {
  id: string;
  category: string; // e.g. "01 — CURRENTLY"
  title: string;
  statement?: string;
  description?: string;
  items?: string[];
  placeholderNote?: string;
  rotationDeg: number; // default rotation e.g. -2.5, 0, 2
  widthClass?: string; // custom card sizing
  aspectHint?: string;
  parallaxFactor?: number;
  fileTag?: string; // e.g. "currently.sys", "favorites.log"
  // Freeform editorial layout properties
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
