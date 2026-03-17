import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Cake,
  Tag,
  IceCreamCone,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminMobileNav } from "@/components/admin-mobile-nav";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/orders", label: "Orders", icon: "ShoppingBag" },
  { href: "/admin/products", label: "Products", icon: "Cake" },
  { href: "/admin/categories", label: "Categories", icon: "Tag" },
  { href: "/admin/flavors", label: "Flavors", icon: "IceCreamCone" },
];

const iconMap: Record<string, React.ComponentType<any>> = {
  LayoutDashboard,
  ShoppingBag,
  Cake,
  Tag,
  IceCreamCone,
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-64 flex-col border-r border-sidebar-border bg-sidebar">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <Image
            src="/logo.jpg"
            alt="Jessa Cakes"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span
            className="text-lg font-bold text-rose"
            style={{ fontFamily: "var(--font-accent)" }}
          >
            Jessa Cakes
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                {Icon && <Icon className="h-4 w-4" />}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border px-3 py-4">
          <div className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground">
            <span className="truncate">{user.email}</span>
          </div>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-white px-4 md:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile menu */}
            <AdminMobileNav
              links={sidebarLinks}
              userEmail={user.email || ""}
            />
            <div className="md:hidden flex items-center gap-2">
              <Image
                src="/logo.jpg"
                alt="Jessa Cakes"
                width={28}
                height={28}
                className="rounded-full"
              />
              <span className="text-sm font-bold text-rose">Admin</span>
            </div>
            <div className="hidden md:block">
              <h2 className="text-sm font-medium text-muted-foreground">
                Admin Dashboard
              </h2>
            </div>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">
            {user.email}
          </span>
        </header>

        {/* Content */}
        <main className="flex-1 bg-muted p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
