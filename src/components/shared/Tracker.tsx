"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Fires a lightweight first-party pageview beacon on every navigation. */
export function Tracker() {
  const pathname = usePathname();
  useEffect(() => {
    const payload = JSON.stringify({ type: "pageview", path: pathname, referrer: document.referrer });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
      } else {
        void fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true });
      }
    } catch {
      /* ignore */
    }
  }, [pathname]);
  return null;
}
