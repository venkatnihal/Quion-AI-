export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: string[];
  process: { step: number; title: string; description: string }[];
  benefits: { label: string; value: string }[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  country: string;
  countryFlag: string;
  quote: string;
  rating: number;
  result: string;
  avatar?: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  country: string;
  countryFlag: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: { label: string; value: string }[];
  testimonial?: string;
  published: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published: string;
  readTime: number;
  coverImage?: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  published: string;
  coverImage?: string;
  authorName?: string;
  /** Portable Text blocks when sourced from Sanity. */
  body?: unknown[] | null;
  /** Plain-text fallback body (paragraphs separated by blank lines). */
  bodyPlain?: string;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  description: string;
  technologies: string[];
  result: string;
  liveUrl?: string;
  image?: string;
  gallery?: string[];
  testimonial?: { quote: string; author: string; role: string };
  year?: string;
  featured?: boolean;
}
