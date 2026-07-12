import { proofStats } from "@/data/stats";

export function SocialProofBar() {
  // Double for seamless marquee loop
  const doubled = [...proofStats, ...proofStats];

  return (
    <div
      className="bg-[#0A0F1E] border-y border-[rgba(255,255,255,0.04)] py-3.5 overflow-hidden"
      aria-label="QuionAi proof statistics"
    >
      <div className="flex items-center animate-marquee hover:[animation-play-state:paused] whitespace-nowrap select-none">
        {doubled.map((stat, i) => (
          <div
            key={i}
            className="flex items-center shrink-0"
          >
            <div className="flex items-center gap-3 px-8">
              <span className="text-[13px] font-semibold text-white tracking-tight tabular-nums">
                {stat.value}
              </span>
              <span className="text-[11px] text-[#475569] uppercase tracking-[0.08em]">
                {stat.label}
              </span>
            </div>
            <span className="text-[#1E293B] text-xs select-none" aria-hidden>·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
