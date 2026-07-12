// Shared homepage-section metadata. Kept in a plain (non-"use client") module
// so it can be imported by BOTH the server homepage and the client
// SectionsManager — importing a const from a client module on the server would
// yield a client-reference proxy, not the real array.

export interface Section {
  id: string;
  label: string;
  visible: boolean;
}

export const DEFAULT_SECTIONS: Section[] = [
  { id: "hero", label: "Hero", visible: true },
  { id: "socialProof", label: "Social Proof + Trust", visible: true },
  { id: "services", label: "Services", visible: true },
  { id: "howItWorks", label: "How It Works", visible: true },
  { id: "results", label: "Results / Stats", visible: true },
  { id: "aiDemo", label: "AI Demo", visible: true },
  { id: "testimonials", label: "Testimonials", visible: true },
  { id: "faq", label: "FAQ", visible: true },
  { id: "connect", label: "Connect / Contact", visible: true },
  { id: "finalCta", label: "Final CTA", visible: true },
];
