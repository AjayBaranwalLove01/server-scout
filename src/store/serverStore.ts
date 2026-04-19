import { create } from "zustand";
import { supabase } from "@/integrations/supabase/client";
import { rowToServer, rowToGroup, patchToRow, emptyServer } from "@/lib/serverMapper";
import type { Server, SupportGroup } from "@/types/server";

export type SearchFilter = "status" | "custom";

interface ServerStore {
  servers: Server[];
  groups: SupportGroup[];
  loading: boolean;
  loaded: boolean;
  error: string | null;

  searchTerm: string;
  searchFilters: SearchFilter[];

  // search
  setSearchTerm: (term: string) => void;
  toggleSearchFilter: (filter: SearchFilter) => void;
  setSearchFilters: (filters: SearchFilter[]) => void;
  resetSearch: () => void;

  // data ops
  fetchAll: () => Promise<void>;
  updateServer: (id: string, patch: Partial<Server>) => Promise<void>;
  bulkUpdate: (updates: Record<string, Partial<Server>>) => Promise<void>;
  createServer: () => Promise<Server | null>;
  deleteServer: (id: string) => Promise<void>;
}

export const useServerStore = create<ServerStore>((set, get) => ({
  servers: [],
  groups: [],
  loading: false,
  loaded: false,
  error: null,

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
      return { searchFilters: next.length ? next : s.searchFilters };
    }),
  resetSearch: () => set({ searchTerm: "" }),

  fetchAll: async () => {
    set({ loading: true, error: null });
    const [serversRes, groupsRes] = await Promise.all([
      supabase.from("servers").select("*").order("server_name", { ascending: true }),
      supabase.from("support_groups").select("*").order("name", { ascending: true }),
    ]);
    if (serversRes.error || groupsRes.error) {
      set({
        loading: false,
        loaded: true,
        error: serversRes.error?.message || groupsRes.error?.message || "Load failed",
      });
      return;
    }
    set({
      servers: (serversRes.data ?? []).map(rowToServer),
      groups: (groupsRes.data ?? []).map(rowToGroup),
      loading: false,
      loaded: true,
      error: null,
    });
  },

  updateServer: async (id, patch) => {
    const row = patchToRow(patch);
    const { data, error } = await supabase
      .from("servers")
      .update(row as never)
      .eq("id", id)
      .select()
      .single();
    if (error) {
      set({ error: error.message });
      throw error;
    }
    if (data) {
      const updated = rowToServer(data);
      set((s) => ({
        servers: s.servers.map((srv) => (srv.id === id ? updated : srv)),
      }));
    }
  },

  bulkUpdate: async (updates) => {
    const ids = Object.keys(updates);
    await Promise.all(ids.map((id) => get().updateServer(id, updates[id])));
  },

  createServer: async () => {
    const id = `srv-${Date.now().toString(36)}`;
    const draft = emptyServer(id);
    const row = { id, ...patchToRow(draft) };
    const { data, error } = await supabase
      .from("servers")
      .insert(row as never)
      .select()
      .single();
    if (error) {
      set({ error: error.message });
      throw error;
    }
    const created = rowToServer(data);
    set((s) => ({ servers: [created, ...s.servers] }));
    return created;
  },

  deleteServer: async (id) => {
    const { error } = await supabase.from("servers").delete().eq("id", id);
    if (error) {
      set({ error: error.message });
      throw error;
    }
    set((s) => ({ servers: s.servers.filter((srv) => srv.id !== id) }));
  },
}));
