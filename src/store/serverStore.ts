import { create } from "zustand";
import { initialServers, supportGroups } from "@/data/mockData";
import type { Server, SupportGroup } from "@/types/server";

interface ServerStore {
  servers: Server[];
  groups: SupportGroup[];
  updateServer: (id: string, patch: Partial<Server>) => void;
  bulkUpdate: (updates: Record<string, Partial<Server>>) => void;
}

export const useServerStore = create<ServerStore>((set) => ({
  servers: initialServers,
  groups: supportGroups,
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
