"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Zap } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/ui/GlassCard";
import { useInView } from "@/hooks/useInView";

const conversation = [
  { role: "user",  text: "Hi, I'm interested in automating my lead follow-up process." },
  { role: "ai",    text: "Great! I can help with that. How many leads do you currently receive per month, and what's your average response time?" },
  { role: "user",  text: "About 200 leads/month. We usually respond within 24-48 hours." },
  { role: "ai",    text: "That's a significant opportunity. With AI automation, we can respond in under 60 seconds — 24/7. Our clients typically see a 3x increase in conversion rates with instant follow-up. Shall I outline a custom system for your business?" },
  { role: "user",  text: "Yes, absolutely." },
  { role: "ai",    text: "Perfect. I'll schedule a strategy call with our team. Can you share your calendar availability? We'll map out a full automation blueprint — no obligation." },
];

export function AIDemoSection() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3, once: true });

  useEffect(() => {
    if (!inView) return;

    let current = 0;
    const delays = [500, 1200, 2200, 3200, 4400, 5200];

    const timers = delays.map((delay, i) =>
      setTimeout(() => {
        setVisibleMessages(i + 1);
        current = i + 1;
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <SectionWrapper bg="surface">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: heading */}
          <div>
            <ScrollReveal>
              <SectionLabel>Live Demo</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2
                className="mt-4 font-bold text-white"
                style={{
                  fontSize: "var(--type-h2)",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.02em",
                }}
              >
                See Our{" "}
                <GradientText>AI Systems</GradientText>{" "}
                in Action
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-4 text-[#64748B] leading-relaxed" style={{ fontSize: "var(--type-body-lg)" }}>
                This is a real example of an AI chatbot handling a sales conversation — qualifying
                the lead, answering questions, and booking the next step. Completely automated.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Zap, label: "Responds in under 60 seconds" },
                  { icon: Bot, label: "Trained on your business and products" },
                  { icon: User, label: "Hands off to your team when needed" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)] flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-[#00D4FF]" />
                    </div>
                    <span className="text-sm text-[#94A3B8]">{label}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: chat demo */}
          <ScrollReveal delay={0.15}>
            <div ref={ref}>
              <GlassCard elevated className="p-0 overflow-hidden">
                {/* Chat header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6D5DFC] flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">QuionAi Assistant</p>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                      <span className="text-xs text-[#475569]">Online · AI powered</span>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-5 space-y-4 min-h-[360px] max-h-[400px] overflow-y-auto">
                  <AnimatePresence>
                    {conversation.slice(0, visibleMessages).map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div
                          className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center"
                          style={{
                            background: msg.role === "ai"
                              ? "linear-gradient(135deg, #00D4FF, #6D5DFC)"
                              : "rgba(255,255,255,0.1)",
                          }}
                        >
                          {msg.role === "ai"
                            ? <Bot size={14} className="text-white" />
                            : <User size={14} className="text-[#94A3B8]" />
                          }
                        </div>
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                            msg.role === "user"
                              ? "bg-[rgba(109,93,252,0.2)] text-white rounded-tr-sm"
                              : "bg-[rgba(0,212,255,0.08)] text-[#94A3B8] rounded-tl-sm"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing indicator */}
                  {visibleMessages > 0 && visibleMessages < conversation.length && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6D5DFC] flex items-center justify-center">
                        <Bot size={14} className="text-white" />
                      </div>
                      <div className="bg-[rgba(0,212,255,0.08)] rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input bar */}
                <div className="px-5 py-4 border-t border-[rgba(255,255,255,0.06)]">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                    <p className="text-sm text-[#334155] flex-1">Ask anything about our AI services...</p>
                    <div className="w-7 h-7 rounded-full bg-[#00D4FF] flex items-center justify-center">
                      <Zap size={13} className="text-[#050816]" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
