"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Send, Bot, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/constants";

type Step = "welcome" | "topic" | "detail" | "capture" | "done";

interface Message {
  role: "bot" | "user";
  text: string;
}

const TOPICS = [
  { id: "automate", label: "Automate my operations" },
  { id: "leads", label: "Improve lead follow-up" },
  { id: "chatbot", label: "Set up an AI chatbot" },
  { id: "website", label: "Build or improve my website" },
  { id: "call", label: "Speak to the team directly" },
];

const TOPIC_RESPONSES: Record<string, string> = {
  automate:
    "Great choice. Automation typically saves our clients 10–20 hours per week. What kind of tasks are you spending the most time on — reporting, emails, data entry, or something else?",
  leads:
    "This is one of the highest-impact areas we work in. Businesses often lose leads simply because they don't follow up fast enough. Are leads coming in through your website, social media, or elsewhere?",
  chatbot:
    "A well-built chatbot can handle FAQs, qualify leads, and book appointments 24/7. What's your main goal — support, lead capture, or booking?",
  website:
    "We build conversion-focused websites that are fast and clean. Are you starting from scratch, or looking to improve an existing site?",
  call:
    "Perfect. The quickest way is to book a free 30-minute strategy call — no commitment, just a conversation about your business.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Show attention bubble after 8s
  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 8000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openChat = () => {
    setShowBubble(false);
    setOpen(true);
    if (messages.length === 0) {
      setMessages([
        {
          role: "bot",
          text: "Hi there! 👋 I'm QuionAi's assistant. I can help you understand how AI automation might work for your business. What are you looking to achieve?",
        },
      ]);
      setStep("topic");
    }
  };

  const addBot = (text: string) =>
    setMessages((prev) => [...prev, { role: "bot", text }]);
  const addUser = (text: string) =>
    setMessages((prev) => [...prev, { role: "user", text }]);

  const handleTopicSelect = (topic: typeof TOPICS[0]) => {
    setSelectedTopic(topic.id);
    addUser(topic.label);
    setTimeout(() => {
      addBot(TOPIC_RESPONSES[topic.id]);
      if (topic.id === "call") {
        setTimeout(() => {
          addBot("You can book directly here, or share your email and we'll reach out within 4 hours.");
          setStep("capture");
        }, 800);
      } else {
        setStep("detail");
      }
    }, 400);
  };

  const handleDetailSubmit = async () => {
    if (!input.trim()) return;
    const userText = input;
    addUser(userText);
    setInput("");

    // Ask the live AI assistant (uses the CMS system prompt + knowledge base).
    // Falls back to the guided reply if the model isn't reachable.
    try {
      const history = [...messages, { role: "user" as const, text: userText }].map((m) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.text,
      }));
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = (await res.json().catch(() => ({}))) as { reply?: string };
      if (data.reply) {
        addBot(data.reply);
        setTimeout(() => {
          addBot("If you'd like tailored next steps, share your email and we'll follow up within 4 hours — or book a free call directly.");
          setStep("capture");
        }, 600);
        return;
      }
    } catch {
      /* fall through to guided reply */
    }

    addBot(
      "That's helpful, thank you. The best next step is a quick 30-minute call with our team — completely free. Would you like to share your email so we can follow up, or book directly?"
    );
    setStep("capture");
  };

  const handleCaptureSubmit = () => {
    if (!email.trim()) return;
    addUser(`${name ? name + " — " : ""}${email}`);

    // Persist the chat lead (stores in Supabase + emails the team via Resend).
    const topic = TOPICS.find((t) => t.id === selectedTopic)?.label;
    void fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        service: topic,
        message: messages.filter((m) => m.role === "user").map((m) => m.text).join(" | "),
        subject: "AI chat lead",
        from_name: "Chat Widget",
      }),
    }).catch(() => {});

    setTimeout(() => {
      addBot(
        `Thanks${name ? `, ${name}` : ""}! We'll be in touch at ${email} within 4 hours. You can also book a call immediately if you prefer — it's free.`
      );
      setStep("done");
    }, 400);
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-[500] flex flex-col items-end gap-3">
        {/* Attention bubble */}
        <AnimatePresence>
          {showBubble && !open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative"
            >
              <div
                className="rounded-2xl rounded-br-sm px-4 py-2.5 text-sm text-white max-w-[200px] shadow-lg"
                style={{ background: "rgba(15,23,42,0.95)", border: "1px solid rgba(0,212,255,0.2)" }}
              >
                Got questions? I can help. 👋
              </div>
              <button
                onClick={() => setShowBubble(false)}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#0F172A] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#64748B] hover:text-white"
                aria-label="Dismiss"
              >
                <X size={10} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat toggle button */}
        <motion.button
          onClick={() => (open ? setOpen(false) : openChat())}
          aria-label={open ? "Close chat" : "Open AI assistant"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
          )}
          style={{
            background: open
              ? "rgba(5,8,22,0.9)"
              : "linear-gradient(135deg, #00D4FF, #6D5DFC)",
            border: open ? "1px solid rgba(0,212,255,0.3)" : "none",
            boxShadow: open
              ? "0 4px 20px rgba(0,0,0,0.4)"
              : "0 0 30px rgba(0,212,255,0.35)",
          }}
        >
          {open ? (
            <X size={20} className="text-[#94A3B8]" />
          ) : (
            <MessageSquare size={20} className="text-white" />
          )}
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-[499] w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{
              background: "rgba(10,15,30,0.97)",
              border: "1px solid rgba(0,212,255,0.15)",
              maxHeight: "min(520px, calc(100vh - 120px))",
            }}
            role="dialog"
            aria-label="QuionAi chat assistant"
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(255,255,255,0.06)] shrink-0"
              style={{ background: "rgba(15,23,42,0.8)" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #00D4FF, #6D5DFC)" }}
              >
                <Bot size={16} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white leading-tight">QuionAi Assistant</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                  <span className="text-[11px] text-[#475569]">Online · Typically replies in minutes</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                    style={{
                      background:
                        msg.role === "bot"
                          ? "linear-gradient(135deg, #00D4FF, #6D5DFC)"
                          : "rgba(255,255,255,0.08)",
                    }}
                  >
                    {msg.role === "bot" ? (
                      <Bot size={13} className="text-white" />
                    ) : (
                      <User size={13} className="text-[#94A3B8]" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                      msg.role === "bot"
                        ? "bg-[rgba(0,212,255,0.07)] text-[#94A3B8] rounded-tl-sm"
                        : "bg-[rgba(109,93,252,0.2)] text-white rounded-tr-sm"
                    )}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Topic chips */}
              {step === "topic" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col gap-2 ml-9"
                >
                  {TOPICS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleTopicSelect(t)}
                      className="text-left px-3.5 py-2 rounded-xl text-[13px] font-medium text-[#00D4FF] border border-[rgba(0,212,255,0.25)] hover:bg-[rgba(0,212,255,0.08)] hover:border-[rgba(0,212,255,0.5)] transition-all duration-150"
                    >
                      {t.label}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Done state CTAs */}
              {step === "done" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-2 ml-9"
                >
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-[#050816] bg-[#00D4FF] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all"
                  >
                    Get Free Consultation
                    <ArrowRight size={13} />
                  </a>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            {(step === "detail" || step === "capture") && (
              <div className="px-4 py-3 border-t border-[rgba(255,255,255,0.05)] shrink-0">
                {step === "capture" && (
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-[rgba(15,23,42,0.8)] border border-[rgba(255,255,255,0.07)] text-white text-[13px] placeholder:text-[#334155] focus:outline-none focus:border-[rgba(0,212,255,0.4)] transition-colors"
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type={step === "capture" ? "email" : "text"}
                    placeholder={
                      step === "capture"
                        ? "Your email address *"
                        : "Type your reply..."
                    }
                    value={step === "capture" ? email : input}
                    onChange={(e) =>
                      step === "capture"
                        ? setEmail(e.target.value)
                        : setInput(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        step === "capture"
                          ? handleCaptureSubmit()
                          : handleDetailSubmit();
                      }
                    }}
                    className="flex-1 px-3 py-2.5 rounded-xl bg-[rgba(15,23,42,0.8)] border border-[rgba(255,255,255,0.07)] text-white text-[13px] placeholder:text-[#334155] focus:outline-none focus:border-[rgba(0,212,255,0.4)] transition-colors"
                  />
                  <button
                    onClick={step === "capture" ? handleCaptureSubmit : handleDetailSubmit}
                    disabled={step === "capture" ? !email.trim() : !input.trim()}
                    aria-label="Send message"
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#00D4FF] text-[#050816] disabled:opacity-40 disabled:pointer-events-none hover:shadow-[0_0_16px_rgba(0,212,255,0.4)] transition-all"
                  >
                    <Send size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* Powered by note */}
            <div className="px-4 pb-3 pt-1 shrink-0">
              <p className="text-[10px] text-[#1E293B] text-center">
                Powered by QuionAi · Real team, real answers
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
