"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { BookingButton } from "@/components/shared/Booking";
import { WHATSAPP_LINK_PREFILLED } from "@/lib/constants";

export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[450] lg:hidden"
          style={{
            background: "rgba(5,8,22,0.95)",
            borderTop: "1px solid rgba(0,212,255,0.15)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <div className="flex items-center gap-2.5 px-4 py-3">
            <BookingButton size="md" className="flex-1">
              Book a Free Consultation
            </BookingButton>
            <a
              href={WHATSAPP_LINK_PREFILLED}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "#25D366" }}
            >
              <MessageCircle size={20} className="text-white" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
