"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV } from "@/lib/cms/nav";
import { can, type Role } from "@/lib/rbac";
import { Icon } from "@/components/admin/Icon";

export function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = NAV.filter((i) => !i.cap || can(role, i.cap));
  const groups = Array.from(new Set(items.map((i) => i.group)));

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed left-3 top-3 z-50 rounded-lg border border-white/10 bg-[#0F172A] p-2 text-white lg:hidden"
        aria-label="Toggle menu"
      >
        <Icon name="Menu" size={18} />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/10 bg-[#0B1120] transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#6D5DFC]" />
          <div>
            <p className="text-sm font-semibold text-white leading-none">QuionAi</p>
            <p className="text-[10px] uppercase tracking-wider text-[#64748B]">CMS</p>
          </div>
        </div>

        <nav className="h-[calc(100vh-4rem)] overflow-y-auto px-3 py-4">
          {groups.map((group) => (
            <div key={group} className="mb-4">
              <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#475569]">
                {group}
              </p>
              {items
                .filter((i) => i.group === group)
                .map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                        active
                          ? "bg-gradient-to-r from-[#00D4FF]/15 to-[#6D5DFC]/15 text-white ring-1 ring-inset ring-[#00D4FF]/30"
                          : "text-[#94A3B8] hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon name={item.icon} size={17} className={active ? "text-[#00D4FF]" : ""} />
                      {item.label}
                    </Link>
                  );
                })}
            </div>
          ))}
        </nav>
      </aside>

      {open && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />
      )}
    </>
  );
}
