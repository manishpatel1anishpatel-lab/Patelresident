import { Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const PAGE_TITLES: Record<string, string> = {
  "/": "Hostel Management Dashboard",
  "/residents": "Residents",
  "/residents/add": "Add Resident",
  "/rooms": "Room Management",
  "/payments": "Payment Management",
};

function getTitle(pathname: string): string {
  if (pathname.startsWith("/residents/") && pathname !== "/residents/add") {
    return "Resident Profile";
  }
  return PAGE_TITLES[pathname] ?? "HostelHub";
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        pathname={pathname}
      />

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header
          onMenuToggle={() => setSidebarOpen((v) => !v)}
          title={getTitle(pathname)}
        />
        <main
          className="flex-1 overflow-y-auto bg-background"
          data-ocid="main-content"
        >
          <Outlet />
        </main>
        <footer className="shrink-0 px-6 py-3 bg-muted/40 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
