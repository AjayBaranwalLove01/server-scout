import type { Server, AffectedGroup, SupportGroup, ServerStatus, Priority, YesNo, Essential8 } from "@/types/server";

// Maps a Supabase row (snake_case) → app Server (camelCase)
export function rowToServer(r: any): Server {
  return {
    id: r.id,
    serverName: r.server_name ?? "",
    serialNumber: r.serial_number ?? "",
    ilo: r.ilo ?? "",
    location: r.location ?? "",
    sociAsset: r.soci_asset ?? "",
    pciAsset: r.pci_asset ?? "",
    model: r.model ?? "",
    ipAddress: r.ip_address ?? "",
    os: r.os ?? "",
    osSupportEnds: r.os_support_ends ?? "",
    internetFacing: (r.internet_facing ?? "No") as YesNo,
    status: (r.status ?? "Active") as ServerStatus,
    network: r.network ?? "",
    domain: r.domain ?? "",
    isPatched: (r.is_patched ?? "No") as YesNo,
    essential8: (r.essential8 ?? "ML0") as Essential8,
    buildDate: r.build_date ?? "",
    businessFunction: r.business_function ?? "",
    patchSequence: r.patch_sequence ?? "",
    maintenanceComment: r.maintenance_comment ?? "",
    day: r.day ?? "",
    time: r.time ?? "",
    buildEngineer: r.build_engineer ?? "",
    serverDescription: r.server_description ?? "",
    alive: (r.alive ?? "Yes") as YesNo,
    lastCollated: r.last_collated ?? "",
    priority: (r.priority ?? "Medium") as Priority,
    patchCategory: r.patch_category ?? "",
    notes: r.notes ?? "",
    softwareInstalledUrl: r.software_installed_url ?? "",
    backupDetailsUrl: r.backup_details_url ?? "",
    patchContact: r.patch_contact ?? "",
    patchNotes: r.patch_notes ?? "",
    designEngineer: r.design_engineer ?? "",
    primaryGroupId: r.primary_group_id ?? "",
    affectedGroups: (r.affected_groups ?? []) as AffectedGroup[],
    updatedAt: r.updated_at ?? new Date().toISOString(),
  };
}

// Maps app Server patch (camelCase, partial) → DB row patch (snake_case)
export function patchToRow(p: Partial<Server>): Record<string, any> {
  const map: Record<keyof Server, string> = {
    id: "id",
    serverName: "server_name",
    serialNumber: "serial_number",
    ilo: "ilo",
    location: "location",
    sociAsset: "soci_asset",
    pciAsset: "pci_asset",
    model: "model",
    ipAddress: "ip_address",
    os: "os",
    osSupportEnds: "os_support_ends",
    internetFacing: "internet_facing",
    status: "status",
    network: "network",
    domain: "domain",
    isPatched: "is_patched",
    essential8: "essential8",
    buildDate: "build_date",
    businessFunction: "business_function",
    patchSequence: "patch_sequence",
    maintenanceComment: "maintenance_comment",
    day: "day",
    time: "time",
    buildEngineer: "build_engineer",
    serverDescription: "server_description",
    alive: "alive",
    lastCollated: "last_collated",
    priority: "priority",
    patchCategory: "patch_category",
    notes: "notes",
    softwareInstalledUrl: "software_installed_url",
    backupDetailsUrl: "backup_details_url",
    patchContact: "patch_contact",
    patchNotes: "patch_notes",
    designEngineer: "design_engineer",
    primaryGroupId: "primary_group_id",
    affectedGroups: "affected_groups",
    updatedAt: "updated_at",
  };
  const out: Record<string, any> = {};
  for (const k of Object.keys(p) as (keyof Server)[]) {
    if (k === "updatedAt" || k === "id") continue;
    out[map[k]] = p[k];
  }
  return out;
}

export function rowToGroup(r: any): SupportGroup {
  return { id: r.id, name: r.name, manager: r.manager, members: r.members ?? [] };
}

export function emptyServer(id: string): Server {
  return {
    id,
    serverName: "NEW-SERVER",
    serialNumber: "",
    ilo: "",
    location: "",
    sociAsset: "",
    pciAsset: "",
    model: "",
    ipAddress: "",
    os: "Windows Server 2022",
    osSupportEnds: "",
    internetFacing: "No",
    status: "Active",
    network: "",
    domain: "",
    isPatched: "No",
    essential8: "ML0",
    buildDate: "",
    businessFunction: "",
    patchSequence: "",
    maintenanceComment: "",
    day: "",
    time: "",
    buildEngineer: "",
    serverDescription: "",
    alive: "Yes",
    lastCollated: new Date().toISOString(),
    priority: "Medium",
    patchCategory: "",
    notes: "",
    softwareInstalledUrl: "",
    backupDetailsUrl: "",
    patchContact: "",
    patchNotes: "",
    designEngineer: "",
    primaryGroupId: "",
    affectedGroups: [],
    updatedAt: new Date().toISOString(),
  };
}
