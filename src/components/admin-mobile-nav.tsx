"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  LayoutDashboard,
  ShoppingBag,
  Cake,
  Tag,
  IceCreamCone,
  LogOut,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  LayoutDashboard,
  ShoppingBag,
  Cake,
  Tag,
  IceCreamCone,
};

interface AdminMobileNavProps {
  links: { href: string; label: string; icon: string }[];
  userEmail: string;
}

export function AdminMobileNav({ links, userEmail }: AdminMobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-foreground"
        aria-label="Toggle admin menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Slide-out menu */}
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-border z-50 flex flex-col">
            <div className="flex h-16 items-center justify-between px-4 border-b border-border">
              <span
                className="text-lg font-bold text-rose"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Jessa Cake
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-muted-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
              {links.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-rose-faint hover:text-rose"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-border px-3 py-4">
              <p className="px-3 py-1 text-xs text-muted-foreground truncate">
                {userEmail}
              </p>
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-rose-faint hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
