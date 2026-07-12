"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQItem } from "@/types";

interface AccordionProps {
  items: FAQItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "rounded-xl border transition-colors duration-300",
            openIndex === i
              ? "border-[rgba(0,212,255,0.3)] bg-[rgba(15,23,42,0.8)]"
              : "border-[rgba(255,255,255,0.06)] bg-[rgba(15,23,42,0.4)]"
          )}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-5 text-left"
            aria-expanded={openIndex === i}
          >
            <span className="text-[1.0625rem] font-medium text-white pr-4">
              {item.question}
            </span>
            <span className="shrink-0 text-[#00D4FF]">
              {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
            </span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-5 text-[#94A3B8] leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
