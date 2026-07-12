"use client";
import { useMemo, useState, useEffect } from "react";
import { Search, X, ArrowUpRight, ExternalLink, Check, Quote } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { PortfolioProject } from "@/types";

/** Deterministic brand gradient per card (no external images required). */
const COVERS = [
  "linear-gradient(135deg,#0F172A 0%,#00D4FF22 55%,#6D5DFC33 100%)",
  "linear-gradient(135deg,#0F172A 0%,#6D5DFC33 55%,#00D4FF22 100%)",
  "linear-gradient(135deg,#050816 0%,#0F172A 50%,#00D4FF1f 100%)",
];

export function PortfolioGrid({
  projects,
  industries,
}: {
  projects: PortfolioProject[];
  industries: string[];
}) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<string>("All");
  const [active, setActive] = useState<PortfolioProject | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesIndustry = industry === "All" || p.industry === industry;
      if (!matchesIndustry) return false;
      if (!q) return true;
      const haystack = [p.title, p.client, p.industry, ...p.services, ...p.technologies]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [projects, query, industry]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-5 mb-10">
        <div className="relative max-w-md mx-auto w-full">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#475569]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, clients, tech…"
            aria-label="Search portfolio"
            className="w-full rounded-full bg-[rgba(15,23,42,0.8)] border border-[rgba(255,255,255,0.08)] text-white placeholder:text-[#475569] pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[rgba(0,212,255,0.4)] focus:shadow-[0_0_0_3px_rgba(0,212,255,0.1)] transition-all"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {["All", ...industries].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setIndustry(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                industry === cat
                  ? "bg-[#00D4FF] text-[#050816] border-[#00D4FF]"
                  : "bg-transparent text-[#94A3B8] border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,212,255,0.4)] hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-[#64748B] py-16">
          No projects match your search. Try a different keyword or filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => setActive(p)}
              className="group text-left block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816] rounded-2xl"
            >
              <GlassCard hoverable className="h-full flex flex-col overflow-hidden p-0">
                {/* Cover */}
                <div
                  className="relative h-40 flex items-end p-5"
                  style={
                    p.image
                      ? { backgroundImage: `url(${p.image})`, backgroundSize: "cover", backgroundPosition: "center" }
                      : { background: COVERS[i % COVERS.length] }
                  }
                >
                  {!p.image && (
                    <span
                      className="absolute top-4 right-4 text-5xl font-bold opacity-20"
                      style={{ fontFamily: "var(--font-display)", color: "#00D4FF" }}
                    >
                      {p.client.charAt(0)}
                    </span>
                  )}
                  <Badge variant="brand">{p.industry}</Badge>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div>
                    <p className="text-xs text-[#475569] mb-1">{p.client}</p>
                    <h2 className="text-lg font-semibold text-white leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                      {p.title}
                    </h2>
                  </div>
                  <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2 flex-1">{p.result}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.services.slice(0, 2).map((s) => (
                      <span key={s} className="text-[11px] text-[#94A3B8] px-2 py-0.5 rounded-full border border-[rgba(255,255,255,0.08)]">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#00D4FF] pt-1">
                    View project
                    <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </GlassCard>
            </button>
          ))}
        </div>
      )}

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: PortfolioProject; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — project details`}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(2,4,12,0.8)] backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
      />
      <div className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl border border-[rgba(0,212,255,0.2)] bg-[#0F172A] shadow-[0_30px_120px_rgba(0,0,0,0.6)] animate-[scaleIn_0.24s_cubic-bezier(0.16,1,0.3,1)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 grid place-items-center rounded-full bg-[rgba(2,4,12,0.5)] text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]"
        >
          <X size={18} />
        </button>

        <div className="h-28 bg-[linear-gradient(135deg,#050816,#0F172A_60%,#00D4FF1f)]" />

        <div className="p-7 sm:p-8 -mt-8">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="brand">{project.industry}</Badge>
            {project.year && <span className="text-xs text-[#475569]">{project.year}</span>}
          </div>
          <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>
            {project.title}
          </h3>
          <p className="text-sm text-[#64748B] mb-6">{project.client}</p>

          <p className="text-[#AEBACD] leading-relaxed mb-6">{project.description}</p>

          {/* Result highlight */}
          <div className="rounded-xl border border-[rgba(0,212,255,0.15)] bg-[rgba(0,212,255,0.05)] p-5 mb-6">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#00D4FF] mb-1.5">Result</p>
            <p className="text-white font-medium">{project.result}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#475569] mb-2.5">Services</p>
              <ul className="space-y-1.5">
                {project.services.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-[#AEBACD]">
                    <Check size={14} className="text-[#00D4FF] shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#475569] mb-2.5">Technologies</p>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span key={t} className="text-xs text-[#94A3B8] px-2.5 py-1 rounded-full border border-[rgba(255,255,255,0.08)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {project.testimonial && (
            <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(15,23,42,0.6)] p-5 mb-6">
              <Quote size={18} className="text-[#6D5DFC] mb-2" />
              <p className="text-sm text-[#AEBACD] italic leading-relaxed mb-3">
                &ldquo;{project.testimonial.quote}&rdquo;
              </p>
              <p className="text-xs text-white font-medium">
                {project.testimonial.author}
                <span className="text-[#475569] font-normal"> — {project.testimonial.role}</span>
              </p>
            </div>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#00D4FF] text-[#050816] font-semibold px-6 py-3 text-sm hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] active:scale-95 transition-all"
            >
              <ExternalLink size={15} /> Visit Live Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
