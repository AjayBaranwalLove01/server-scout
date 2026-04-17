import { Search, X, ChevronDown } from "lucide-react";
import { useServerStore, type SearchMode } from "@/store/serverStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const STATUS_SUGGESTIONS = ["Active", "Down", "Maintenance", "Patched", "Unpatched"];

const MODE_LABEL: Record<SearchMode, string> = {
  status: "Status",
  custom: "Custom Fields",
};

export function QuickSearch() {
  const { searchTerm, searchMode, setSearchTerm, setSearchMode, resetSearch } =
    useServerStore();

  const placeholder =
    searchMode === "status"
      ? "Filter by status: Active, Down, Patched..."
      : "Search name, IP, serial, contact, domain...";

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-2xl">
      <div className="flex items-stretch gap-2">
        {/* Search input */}
        <div
          className={cn(
            "flex items-center gap-2 h-10 px-3 rounded-md bg-muted/40 border border-border flex-1 transition-all",
            "focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 focus-within:bg-card"
          )}
        >
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            list={searchMode === "status" ? "status-suggestions" : undefined}
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground min-w-0"
          />
          {searchMode === "status" && (
            <datalist id="status-suggestions">
              {STATUS_SUGGESTIONS.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          )}
          {searchTerm && (
            <button
              onClick={resetSearch}
              aria-label="Clear search"
              className="w-5 h-5 rounded-sm hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Search In dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "inline-flex items-center gap-2 h-10 px-3 rounded-md border border-border bg-card text-sm font-medium",
                "hover:bg-muted transition-colors whitespace-nowrap"
              )}
            >
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Search In
              </span>
              <span className="text-foreground">{MODE_LABEL[searchMode]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
              Search Mode
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setSearchMode("status")}
              className={cn(searchMode === "status" && "bg-accent/10 text-accent")}
            >
              <div className="flex flex-col">
                <span className="font-medium">Status</span>
                <span className="text-[11px] text-muted-foreground">
                  Active · Down · Patched
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSearchMode("custom")}
              className={cn(searchMode === "custom" && "bg-accent/10 text-accent")}
            >
              <div className="flex flex-col">
                <span className="font-medium">Custom Fields</span>
                <span className="text-[11px] text-muted-foreground">
                  Name, IP, serial, contact, domain
                </span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Active filter indicator */}
      {searchTerm && (
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground pl-1">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Searching in: {MODE_LABEL[searchMode]}
          </span>
          <span>
            Query: <span className="font-mono text-foreground">"{searchTerm}"</span>
          </span>
          <button
            onClick={resetSearch}
            className="ml-auto hover:text-foreground transition-colors underline-offset-2 hover:underline"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
