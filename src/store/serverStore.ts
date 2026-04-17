import { create } from "zustand";
import { initialServers, supportGroups } from "@/data/mockData";
import type { Server, SupportGroup } from "@/types/server";

export type SearchFilter = "status" | "custom";

interface ServerStore {
  servers: Server[];
  groups: SupportGroup[];
  searchTerm: string;
  searchFilters: SearchFilter[];
  setSearchTerm: (term: string) => void;
  toggleSearchFilter: (filter: SearchFilter) => void;
  setSearchFilters: (filters: SearchFilter[]) => void;
  resetSearch: () => void;
  updateServer: (id: string, patch: Partial<Server>) => void;
  bulkUpdate: (updates: Record<string, Partial<Server>>) => void;
}

export const useServerStore = create<ServerStore>((set) => ({
  servers: initialServers,
  groups: supportGroups,
  searchTerm: "",
  searchFilters: ["status", "custom"],
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSearchFilters: (filters) => set({ searchFilters: filters }),
  toggleSearchFilter: (filter) =>
    set((s) => {
      const has = s.searchFilters.includes(filter);
      const next = has
        ? s.searchFilters.filter((f) => f !== filter)
        : [...s.searchFilters, filter];
      // Always keep at least one filter active
      return { searchFilters: next.length ? next : s.searchFilters };
    }),
  resetSearch: () => set({ searchTerm: "" }),
  updateServer: (id, patch) =>
    set((s) => ({
      servers: s.servers.map((srv) =>
        srv.id === id ? { ...srv, ...patch, updatedAt: new Date().toISOString() } : srv
      ),
    })),
  bulkUpdate: (updates) =>
    set((s) => ({
      servers: s.servers.map((srv) =>
        updates[srv.id]
          ? { ...srv, ...updates[srv.id], updatedAt: new Date().toISOString() }
          : srv
      ),
    })),
}));
