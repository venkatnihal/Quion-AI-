import {
  SITE_URL,
  SITE_NAME,
  CONTACT_EMAIL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  WHATSAPP_NUMBER,
} from "./constants";

const DESCRIPTION =
  "QuionAi is a specialist AI automation team helping small and medium businesses in the US, UK, Australia, and Canada automate operations, improve lead management, and scale efficiently.";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    description: DESCRIPTION,
    logo: `${SITE_URL}/images/logo/quionai-icon.svg`,
    image: `${SITE_URL}/images/logo/quionai-icon.svg`,
    email: CONTACT_EMAIL,
    telephone: `+${WHATSAPP_NUMBER}`,
    priceRange: "$$",
    sameAs: [LINKEDIN_URL, INSTAGRAM_URL],
    areaServed: ["US", "GB", "AU", "CA", "EU"],
    serviceType: "AI Automation",
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 5, maxValue: 10 },
    foundingLocation: { "@type": "Place", name: "India" },
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: CONTACT_EMAIL,
        telephone: `+${WHATSAPP_NUMBER}`,
        availableLanguage: ["English"],
        areaServed: ["US", "GB", "AU", "CA", "EU"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DESCRIPTION,
  };
}

export function serviceSchema(name: string, description: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    url: `${SITE_URL}/services/${slug}`,
    areaServed: ["US", "GB", "AU", "CA"],
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}
