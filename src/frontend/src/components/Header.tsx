import { Input } from "@/components/ui/input";
import { Bell, Menu, Search } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onMenuToggle: () => void;
  title?: string;
  onSearch?: (query: string) => void;
}

export default function Header({
  onMenuToggle,
  title = "HostelHub",
  onSearch,
}: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <header
      className="sticky top-0 z-20 flex items-center gap-4 px-4 md:px-6 h-16 bg-card border-b border-border shadow-xs"
      data-ocid="header"
    >
      {/* Hamburger — mobile only */}
      <button
        type="button"
        className="md:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
        onClick={onMenuToggle}
        aria-label="Toggle sidebar"
        data-ocid="header-menu-toggle"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="font-display text-lg font-semibold text-foreground truncate">
          {title}
        </h1>
      </div>

      {/* Search — desktop */}
      <div className="hidden sm:flex items-center relative w-64">
        <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          className="pl-9 h-9 text-sm bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary"
          placeholder="Search residents, rooms…"
          value={searchValue}
          onChange={handleSearch}
          data-ocid="header-search"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="relative p-2 rounded-lg hover:bg-muted transition-smooth"
          aria-label="Notifications"
          data-ocid="header-notifications"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
        </button>
      </div>
    </header>
  );
}
