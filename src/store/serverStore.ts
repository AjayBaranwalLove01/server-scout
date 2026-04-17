import { create } from "zustand";
import { initialServers, supportGroups } from "@/data/mockData";
import type { Server, SupportGroup } from "@/types/server";

export type SearchMode = "status" | "custom";

interface ServerStore {
  servers: Server[];
  groups: SupportGroup[];
  searchTerm: string;
  searchMode: SearchMode;
  setSearchTerm: (term: string) => void;
  setSearchMode: (mode: SearchMode) => void;
  resetSearch: () => void;
  updateServer: (id: string, patch: Partial<Server>) => void;
  bulkUpdate: (updates: Record<string, Partial<Server>>) => void;
}

export const useServerStore = create<ServerStore>((set) => ({
  servers: initialServers,
  groups: supportGroups,
  searchTerm: "",
  searchMode: "status",
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSearchMode: (mode) => set({ searchMode: mode }),
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
