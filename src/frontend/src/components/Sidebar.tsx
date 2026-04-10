import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  CreditCard,
  Home,
  LayoutDashboard,
  Users,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Residents", icon: Users, to: "/residents" },
  { label: "Rooms", icon: Building2, to: "/rooms" },
  { label: "Payments", icon: CreditCard, to: "/payments" },
];

export default function Sidebar({ isOpen, onClose, pathname }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
          onKeyUp={(e) => e.key === "Escape" && onClose()}
          role="presentation"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 z-40 flex flex-col",
          "bg-[oklch(var(--sidebar))] text-[oklch(var(--sidebar-foreground))]",
          "border-r border-[oklch(var(--sidebar-border))]",
          "transition-transform duration-300 ease-in-out",
          "md:translate-x-0 md:static md:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
        data-ocid="sidebar"
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-[oklch(var(--sidebar-border))]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[oklch(var(--sidebar-primary))] flex items-center justify-center">
              <Home className="w-4 h-4 text-[oklch(var(--sidebar-primary-foreground))]" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight text-[oklch(var(--sidebar-foreground))]">
              HostelHub
            </span>
          </div>
          <button
            type="button"
            className="md:hidden p-1 rounded hover:bg-[oklch(var(--sidebar-accent))] transition-smooth"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4 text-[oklch(var(--sidebar-foreground))]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1" data-ocid="sidebar-nav">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest text-[oklch(var(--sidebar-foreground)/0.4)]">
            Main Menu
          </p>
          {NAV_ITEMS.map(({ label, icon: Icon, to }) => {
            const isActive =
              to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                data-ocid={`nav-${label.toLowerCase()}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-[oklch(var(--sidebar-primary)/0.15)] text-[oklch(var(--sidebar-primary))] border-l-2 border-[oklch(var(--sidebar-primary))]"
                    : "text-[oklch(var(--sidebar-foreground)/0.7)] hover:bg-[oklch(var(--sidebar-accent))] hover:text-[oklch(var(--sidebar-accent-foreground))]",
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[oklch(var(--sidebar-border))]">
          <p className="text-xs text-[oklch(var(--sidebar-foreground)/0.35)] leading-relaxed">
            © {new Date().getFullYear()} HostelHub
          </p>
        </div>
      </aside>
    </>
  );
}
