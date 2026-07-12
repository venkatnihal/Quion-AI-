import Link from "next/link";
import {
  Zap, Bot, MessageSquare, Phone, Globe, TrendingUp, Share2, PenTool, ArrowRight,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Service } from "@/types";

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Zap, Bot, MessageSquare, Phone, Globe, TrendingUp, Share2, PenTool,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] ?? Zap;

  return (
    <Link href={`/services/${service.slug}`} className="group block h-full">
      <GlassCard
        hoverable
        className="h-full p-8 flex flex-col gap-5"
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(109,93,252,0.15))",
            border: "1px solid rgba(0,212,255,0.2)",
          }}
        >
          <Icon size={22} className="text-[#00D4FF]" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 flex-1">
          <h3
            className="text-lg font-semibold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {service.title}
          </h3>
          <p className="text-sm text-[#64748B] leading-relaxed">
            {service.shortDescription}
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-medium text-[#00D4FF] group/link">
          <span>Explore</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </div>
      </GlassCard>
    </Link>
  );
}
