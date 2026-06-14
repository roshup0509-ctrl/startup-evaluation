import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import NotificationBell from "./NotificationBell";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";
import { useSearch } from "@/contexts/SearchContext";

export default function Topbar() {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-6 backdrop-blur">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search evaluations..."
            className="w-full bg-muted/50 pl-9 md:w-[300px] lg:w-[400px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <NotificationBell />
        <ThemeToggle />
        <div className="ml-2 pl-2 border-l border-border">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
