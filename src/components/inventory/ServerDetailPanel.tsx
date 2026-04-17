import { ReactNode } from "react";
import {
  Server as ServerIcon,
  FileText,
  ShieldCheck,
  Users,
  Save,
  ExternalLink,
  Plus,
  X,
} from "lucide-react";
import type { Server } from "@/types/server";
import { useServerStore } from "@/store/serverStore";
import { InlineText, InlineTextarea, InlineSelect, InlineToggle } from "./InlineEdit";
import { cn } from "@/lib/utils";

function Section({
  title,
  icon,
  children,
  accent = "primary",
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  accent?: "primary" | "accent" | "warning" | "info";
}) {
  const ringColor = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/10 text-accent",
    warning: "bg-warning/10 text-warning",
    info: "bg-info/10 text-info",
  }[accent];

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-3 border-b border-border bg-gradient-surface">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", ringColor)}>
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-foreground tracking-tight">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <div className="text-sm text-foreground">{children}</div>
    </div>
  );
}

export function ServerDetailPanel({
  server,
  stageEdit,
  onSave,
  isDirty,
}: {
  server: Server;
  stageEdit: (patch: Partial<Server>) => void;
  onSave: () => void;
  isDirty: boolean;
}) {
  const groups = useServerStore((s) => s.groups);
  const primaryGroup = groups.find((g) => g.id === server.primaryGroupId);

  const availableForAdd = groups.filter(
    (g) => g.id !== server.primaryGroupId && !server.affectedGroups.some((a) => a.groupId === g.id)
  );

  const addAffected = (groupId: string) => {
    if (!groupId) return;
    stageEdit({
      affectedGroups: [...server.affectedGroups, { groupId, selectedMembers: [] }],
    });
  };

  const removeAffected = (groupId: string) => {
    stageEdit({
      affectedGroups: server.affectedGroups.filter((a) => a.groupId !== groupId),
    });
  };

  const toggleAffectedMember = (groupId: string, member: string) => {
    stageEdit({
      affectedGroups: server.affectedGroups.map((a) =>
        a.groupId === groupId
          ? {
              ...a,
              selectedMembers: a.selectedMembers.includes(member)
                ? a.selectedMembers.filter((m) => m !== member)
                : [...a.selectedMembers, member],
            }
          : a
      ),
    });
  };

  return (
    <div className="p-6 space-y-5">
      {/* Header strip */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Detailed view · {server.id}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Last updated {new Date(server.updatedAt).toLocaleString()}
          </p>
        </div>
        <button
          onClick={onSave}
          disabled={!isDirty}
          className="inline-flex items-center gap-1.5 h-9 px-4 text-sm rounded-md bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors shadow-sm"
        >
          <Save className="w-4 h-4" /> Save server
        </button>
      </div>

      {/* General */}
      <Section title="General" icon={<ServerIcon className="w-4 h-4" />} accent="primary">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
          <Field label="Server Name">
            <InlineText value={server.serverName} onSave={(v) => stageEdit({ serverName: v })} />
          </Field>
          <Field label="Serial Number">
            <InlineText value={server.serialNumber} onSave={(v) => stageEdit({ serialNumber: v })} />
          </Field>
          <Field label="ILO">
            <InlineText value={server.ilo} onSave={(v) => stageEdit({ ilo: v })} />
          </Field>
          <Field label="Location">
            <InlineText value={server.location} onSave={(v) => stageEdit({ location: v })} />
          </Field>
          <Field label="SOCI Asset">
            <InlineText value={server.sociAsset} onSave={(v) => stageEdit({ sociAsset: v })} />
          </Field>
          <Field label="PCI Asset">
            <InlineText value={server.pciAsset} onSave={(v) => stageEdit({ pciAsset: v })} />
          </Field>
          <Field label="Model">
            <InlineText value={server.model} onSave={(v) => stageEdit({ model: v })} />
          </Field>
          <Field label="IP Address">
            <InlineText value={server.ipAddress} onSave={(v) => stageEdit({ ipAddress: v })} />
          </Field>
          <Field label="OS">
            <InlineSelect
              value={server.os}
              onSave={(v) => stageEdit({ os: v })}
              options={[
                "Windows Server 2016",
                "Windows Server 2019",
                "Windows Server 2022",
                "Windows Server 2025",
              ].map((o) => ({ value: o, label: o }))}
            />
          </Field>
          <Field label="OS Support Ends">
            <InlineText
              type="date"
              value={server.osSupportEnds}
              onSave={(v) => stageEdit({ osSupportEnds: v })}
            />
          </Field>
          <Field label="Internet Facing">
            <InlineToggle
              value={server.internetFacing}
              onSave={(v) => stageEdit({ internetFacing: v })}
            />
          </Field>
          <Field label="Status">
            <InlineSelect
              value={server.status}
              onSave={(v) => stageEdit({ status: v as Server["status"] })}
              options={[
                { value: "Active", label: "Active" },
                { value: "Down", label: "Down" },
                { value: "Maintenance", label: "Maintenance" },
              ]}
            />
          </Field>
          <Field label="Network">
            <InlineText value={server.network} onSave={(v) => stageEdit({ network: v })} />
          </Field>
          <Field label="Domain">
            <InlineText value={server.domain} onSave={(v) => stageEdit({ domain: v })} />
          </Field>
          <Field label="Is Patched">
            <InlineToggle value={server.isPatched} onSave={(v) => stageEdit({ isPatched: v })} />
          </Field>
          <Field label="Essential 8">
            <InlineSelect
              value={server.essential8}
              onSave={(v) => stageEdit({ essential8: v as Server["essential8"] })}
              options={["ML0", "ML1", "ML2", "ML3"].map((o) => ({ value: o, label: o }))}
            />
          </Field>
        </div>
      </Section>

      {/* Summary */}
      <Section title="Summary Details" icon={<FileText className="w-4 h-4" />} accent="info">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
          <Field label="Build Date">
            <InlineText type="date" value={server.buildDate} onSave={(v) => stageEdit({ buildDate: v })} />
          </Field>
          <Field label="Business Function">
            <InlineText value={server.businessFunction} onSave={(v) => stageEdit({ businessFunction: v })} />
          </Field>
          <Field label="Patch Sequence">
            <InlineText value={server.patchSequence} onSave={(v) => stageEdit({ patchSequence: v })} />
          </Field>
          <Field label="Day">
            <InlineSelect
              value={server.day}
              onSave={(v) => stageEdit({ day: v })}
              options={["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
                .map((d) => ({ value: d, label: d }))}
            />
          </Field>
          <Field label="Time">
            <InlineText type="time" value={server.time} onSave={(v) => stageEdit({ time: v })} />
          </Field>
          <Field label="Build Engineer">
            <InlineText value={server.buildEngineer} onSave={(v) => stageEdit({ buildEngineer: v })} />
          </Field>
          <Field label="Alive">
            <InlineToggle value={server.alive} onSave={(v) => stageEdit({ alive: v })} />
          </Field>
          <Field label="Priority">
            <InlineSelect
              value={server.priority}
              onSave={(v) => stageEdit({ priority: v as Server["priority"] })}
              options={[
                { value: "High", label: "High" },
                { value: "Medium", label: "Medium" },
                { value: "Low", label: "Low" },
              ]}
            />
          </Field>
          <Field label="Patch Category">
            <InlineSelect
              value={server.patchCategory}
              onSave={(v) => stageEdit({ patchCategory: v })}
              options={["Critical","Important","Standard","Optional"].map((c) => ({ value: c, label: c }))}
            />
          </Field>
          <Field label="Last Collated">
            <span className="font-mono text-xs text-muted-foreground">
              {new Date(server.lastCollated).toLocaleString()}
            </span>
          </Field>
          <Field label="View Software Installed">
            <a href={server.softwareInstalledUrl} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-1 text-accent hover:underline text-sm">
              Open <ExternalLink className="w-3 h-3" />
            </a>
          </Field>
          <Field label="Backup Details">
            <a href={server.backupDetailsUrl} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-1 text-accent hover:underline text-sm">
              Open <ExternalLink className="w-3 h-3" />
            </a>
          </Field>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Maintenance Comment">
            <InlineTextarea value={server.maintenanceComment} onSave={(v) => stageEdit({ maintenanceComment: v })} />
          </Field>
          <Field label="Server Description">
            <InlineTextarea value={server.serverDescription} onSave={(v) => stageEdit({ serverDescription: v })} />
          </Field>
        </div>

        <div className="mt-5">
          <Field label="Notes">
            <InlineTextarea value={server.notes} onSave={(v) => stageEdit({ notes: v })} />
          </Field>
        </div>
      </Section>

      {/* Patching */}
      <Section title="Patching" icon={<ShieldCheck className="w-4 h-4" />} accent="accent">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Patch Contact">
            <InlineText value={server.patchContact} onSave={(v) => stageEdit({ patchContact: v })} />
          </Field>
          <Field label="Design Engineer">
            <InlineText value={server.designEngineer} onSave={(v) => stageEdit({ designEngineer: v })} />
          </Field>
        </div>
        <div className="mt-5">
          <Field label="Patch Notes">
            <InlineTextarea value={server.patchNotes} onSave={(v) => stageEdit({ patchNotes: v })} />
          </Field>
        </div>
      </Section>

      {/* Support Information */}
      <Section title="Support Information" icon={<Users className="w-4 h-4" />} accent="warning">
        <div className="space-y-6">
          {/* Primary group */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Primary Assignee Group
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg bg-accent-soft/40 border border-accent/20">
              <Field label="Currently Assigned Group">
                <select
                  value={server.primaryGroupId}
                  onChange={(e) => stageEdit({ primaryGroupId: e.target.value })}
                  className="h-9 w-full px-2 text-sm rounded-md border border-border bg-card outline-none focus:ring-2 focus:ring-accent/30"
                >
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Team Manager">
                <span className="inline-flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[11px] font-semibold">
                    {primaryGroup?.manager.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <span className="font-medium">{primaryGroup?.manager}</span>
                </span>
              </Field>
              <Field label="Team Members">
                <div className="flex flex-wrap gap-1.5">
                  {primaryGroup?.members.map((m) => (
                    <span key={m} className="px-2 py-0.5 text-xs rounded-full bg-card border border-border text-foreground">
                      {m}
                    </span>
                  ))}
                </div>
              </Field>
            </div>
          </div>

          {/* Affected groups */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Affected Support Groups
              </p>
              <div className="flex items-center gap-2">
                <select
                  defaultValue=""
                  onChange={(e) => { addAffected(e.target.value); e.currentTarget.value = ""; }}
                  className="h-8 px-2 text-xs rounded-md border border-border bg-card outline-none focus:ring-2 focus:ring-accent/30"
                >
                  <option value="" disabled>+ Add available group...</option>
                  {availableForAdd.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {server.affectedGroups.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground py-8 border border-dashed border-border rounded-lg">
                No affected groups. Use the dropdown to add one.
              </div>
            ) : (
              <div className="space-y-3">
                {server.affectedGroups.map((a) => {
                  const g = groups.find((gg) => gg.id === a.groupId);
                  if (!g) return null;
                  return (
                    <div key={a.groupId} className="rounded-lg border border-border bg-card p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">{g.name}</span>
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                              Manager: {g.manager}
                            </span>
                          </div>
                          <div className="mt-3">
                            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-2">
                              Team Members
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {g.members.map((m) => {
                                const selected = a.selectedMembers.includes(m);
                                return (
                                  <button
                                    key={m}
                                    onClick={() => toggleAffectedMember(g.id, m)}
                                    className={cn(
                                      "px-2.5 py-1 text-xs rounded-full border transition-colors flex items-center gap-1",
                                      selected
                                        ? "bg-accent text-accent-foreground border-accent"
                                        : "bg-card text-muted-foreground border-border hover:border-accent hover:text-foreground"
                                    )}
                                  >
                                    {selected && <Plus className="w-3 h-3 rotate-45" />}
                                    {m}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeAffected(g.id)}
                          className="text-muted-foreground hover:text-destructive p-1 rounded hover:bg-destructive/10 transition-colors"
                          title="Remove group"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
