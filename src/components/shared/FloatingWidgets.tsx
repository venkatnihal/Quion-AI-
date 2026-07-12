"use client";

import { usePathname } from "next/navigation";
import { MouseFollowLight } from "@/components/shared/MouseFollowLight";
import { ChatWidget } from "@/components/shared/ChatWidget";
import { MobileStickyCTA } from "@/components/shared/MobileStickyCTA";
import { WhatsAppFloat } from "@/components/shared/WhatsAppFloat";
import { ExitIntent } from "@/components/shared/ExitIntent";
import { Tracker } from "@/components/shared/Tracker";

/**
 * Site-wide floating widgets. Hidden on the /admin CMS so the dashboard stays
 * clean and uncluttered.
 */
export function FloatingWidgets() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <>
      <Tracker />
      <MouseFollowLight />
      <ChatWidget />
      <WhatsAppFloat />
      <MobileStickyCTA />
      <ExitIntent />
    </>
  );
}
