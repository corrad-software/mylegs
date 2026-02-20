
export type ResourceType = 'webview' | 'internal_route';

export interface ResourceItem {
  id: string;
  title: string;
  subtitle?: string;
  url?: string;
  type: ResourceType;
  previewText?: string;
  internalRoute?: string;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  description: string;
  moduleLimit: number; // -1 for unlimited
  features: string[];
  colorTheme: 'slate' | 'amber' | 'emerald' | 'purple';
  isDefault?: boolean;
}

export interface User {
  id: string; // Added ID
  email: string;
  password?: string; // Added for mock auth
  name: string;
  tierId: string; // Changed from literal to ID
  role?: 'admin' | 'user';
  joined: string;
  status: 'Active' | 'Inactive';
}

export interface Topic {
  id: string;
  number: number;
  title: string;
  notesUrl: string;
  quizUrl: string;
  gameUrl: string;
  relatedStatuteIds: string[];
  relatedCaseSummaryIds: string[];
}

export interface CaseSummary {
  id: string;
  title: string;
  content: string; // The 2-paragraph summary
}

export interface Statute {
  id: string;
  title: string;
  url: string;
}

export interface ExamResource {
  id: string;
  title: string;
  category: 'Past Year' | 'Model Question' | 'Answer Key';
  year?: string;
  semester?: string;
  url: string;
  topicId?: string; // Optional linkage to specific topic
}

export interface CaseLawProvider {
  id: string;
  name: string;
  url: string;
  logo?: string;
}

export interface ExternalLink {
  id: string;
  title: string;
  category: 'UniSZA' | 'Judiciary' | 'Research';
  url: string;
}
