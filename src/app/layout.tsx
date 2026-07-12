import type { Metadata } from "next";
import { spaceGrotesk, inter, jetbrainsMono } from "@/lib/fonts";
import { FloatingWidgets } from "@/components/shared/FloatingWidgets";
import { organizationSchema } from "@/lib/schema";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "QuionAi — AI Automation for Small & Medium Businesses",
    template: "%s | QuionAi",
  },
  description:
    "QuionAi is a specialist AI automation team helping businesses in the US, UK, Australia, and Canada automate operations, improve lead management, and scale efficiently.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://quionai.com"),
  keywords: [
    "AI automation",
    "AI agents",
    "AI chatbot",
    "business automation",
    "lead automation",
    "QuionAi",
  ],
  authors: [{ name: "QuionAi" }],
  creator: "QuionAi",
  robots: { index: true, follow: true },
  icons: {
    icon: "/images/logo/quionai-icon.svg",
    apple: "/images/logo/quionai-icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "QuionAi",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* Organization / LocalBusiness structured data (site-wide) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        {children}
        <FloatingWidgets />
      </body>
    </html>
  );
}
