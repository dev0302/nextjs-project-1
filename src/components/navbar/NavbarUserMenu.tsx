// app/components/navbar/NavbarUserMenu.tsx
// CLIENT COMPONENT — only this part is interactive (dropdown toggle + signOut)
// Kept as small as possible — receives username as prop from server

"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut, LayoutDashboard, ChevronDown } from "lucide-react";

interface Props {
  username: string;
}

export default function NavbarUserMenu({ username }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // First letter of username as avatar
  const initial = username?.[0]?.toUpperCase() ?? "U";

  return (
    <div ref={ref} className="relative">

      {/* Trigger button */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 h-8 pl-1.5 pr-3 rounded-xl bg-white/[0.07] border border-white/[0.09] hover:bg-white/[0.11] transition-all duration-150 group"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {/* Avatar circle */}
        <span className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center text-[11px] font-bold text-black shrink-0">
          {initial}
        </span>
        <span className="text-[13px] font-medium text-white/75 group-hover:text-white/95 transition-colors duration-150 max-w-[100px] truncate">
          {username}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-white/35 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-48 bg-[#1c1c1e]/95 border border-white/[0.09] rounded-2xl overflow-hidden backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.6),0_4px_16px_rgba(0,0,0,0.4),inset_0_0_0_0.5px_rgba(255,255,255,0.05)] animate-in fade-in slide-in-from-top-2 duration-150">

          {/* User info header */}
          <div className="px-4 py-3 border-b border-white/[0.07]">
            <p className="text-[13px] font-semibold text-white/85 truncate">@{username}</p>
            <p className="text-[11.5px] text-white/35 mt-0.5">Free plan</p>
          </div>

          {/* Menu items */}
          <div className="p-1.5 flex flex-col gap-0.5">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-white/65 hover:text-white/90 hover:bg-white/[0.07] transition-all duration-100"
            >
              <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
              Dashboard
            </Link>

            {/* Divider */}
            <div className="h-px bg-white/[0.06] my-0.5" />

            <button
              onClick={() => {
                setOpen(false);
                signOut({ callbackUrl: "/sign-in" });
              }}
              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[13px] text-[#ff453a]/80 hover:text-[#ff453a] hover:bg-[#ff453a]/[0.08] transition-all duration-100"
            >
              <LogOut className="w-3.5 h-3.5 shrink-0" />
              Sign out
            </button>
          </div>

        </div>
      )}
    </div>
  );
}