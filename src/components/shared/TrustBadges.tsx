import { ShieldCheck, FileLock2, Rocket, Handshake, Globe2 } from "lucide-react";

/**
 * Trust / reassurance badges — risk-reducers shown near conversion points.
 * Reused on the homepage and contact page. Purely presentational.
 */
const BADGES = [
  { icon: Rocket, label: "Free strategy call", sub: "No obligation" },
  { icon: Handshake, label: "No lock-in contracts", sub: "Cancel anytime" },
  { icon: FileLock2, label: "NDA on request", sub: "Your data stays yours" },
  { icon: ShieldCheck, label: "GDPR-ready", sub: "Privacy by design" },
  { icon: Globe2, label: "US · UK · AU · CA · EU", sub: "Global delivery" },
];

export function TrustBadges({ className }: { className?: string }) {
  return (
    <ul
      className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 ${className ?? ""}`}
      aria-label="Why businesses trust QuionAi"
    >
      {BADGES.map(({ icon: Icon, label, sub }) => (
        <li
          key={label}
          className="flex items-center gap-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(15,23,42,0.5)] px-4 py-3"
        >
          <div className="w-9 h-9 rounded-lg grid place-items-center shrink-0 bg-[linear-gradient(135deg,rgba(0,212,255,0.12),rgba(109,93,252,0.08))] border border-[rgba(0,212,255,0.18)]">
            <Icon size={16} className="text-[#00D4FF]" />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-white leading-tight truncate">{label}</p>
            <p className="text-[11px] text-[#475569] leading-tight truncate">{sub}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
