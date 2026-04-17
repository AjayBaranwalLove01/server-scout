import { Bell, Search } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-16 shrink-0 bg-card border-b border-border flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground tracking-tight">
          Windows Server Inventory
        </h1>
        <p className="text-xs text-muted-foreground">
          Manage and audit your Windows fleet
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 h-9 px-3 rounded-md bg-muted/60 border border-border w-72">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Quick search..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
          <kbd className="hidden lg:inline text-[10px] font-mono text-muted-foreground border border-border px-1.5 py-0.5 rounded">
            ⌘K
          </kbd>
        </div>

        <button className="relative w-9 h-9 rounded-md hover:bg-muted flex items-center justify-center transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-accent" />
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
            AO
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-medium text-foreground">Admin Ops</p>
            <p className="text-[11px] text-muted-foreground">admin@corp</p>
          </div>
        </div>
      </div>
    </header>
  );
}
