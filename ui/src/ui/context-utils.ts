import type { AgentsFilesListResult, AgentFileEntry } from "./types.ts";

export type ContextEntry = {
  id: "long-term" | "short-term" | "preferences";
  labelKey: string;
  descriptionKey: string;
  name: string;
  missing: boolean;
  size?: number;
  updatedAtMs?: number;
};

type ContextDefinition = {
  id: ContextEntry["id"];
  labelKey: string;
  descriptionKey: string;
  names: string[];
  defaultName: string;
};

const CONTEXT_DEFINITIONS: ContextDefinition[] = [
  {
    id: "long-term",
    labelKey: "Long-term memory",
    descriptionKey: "Stored in {file}",
    names: ["MEMORY.md", "memory.md"],
    defaultName: "MEMORY.md",
  },
  {
    id: "short-term",
    labelKey: "Short-term memory",
    descriptionKey: "Stored in {file}",
    names: ["HEARTBEAT.md"],
    defaultName: "HEARTBEAT.md",
  },
  {
    id: "preferences",
    labelKey: "User preferences",
    descriptionKey: "Stored in {file}",
    names: ["USER.md"],
    defaultName: "USER.md",
  },
];

function resolveFileEntry(list: AgentsFilesListResult | null, names: string[]): AgentFileEntry | null {
  if (!list) {
    return null;
  }
  for (const name of names) {
    const match = list.files.find((file) => file.name === name);
    if (match) {
      return match;
    }
  }
  return null;
}

export function resolveContextEntries(list: AgentsFilesListResult | null): ContextEntry[] {
  return CONTEXT_DEFINITIONS.map((definition) => {
    const entry = resolveFileEntry(list, definition.names);
    if (entry) {
      return {
        id: definition.id,
        labelKey: definition.labelKey,
        descriptionKey: definition.descriptionKey,
        name: entry.name,
        missing: entry.missing,
        size: entry.size,
        updatedAtMs: entry.updatedAtMs,
      };
    }
    return {
      id: definition.id,
      labelKey: definition.labelKey,
      descriptionKey: definition.descriptionKey,
      name: definition.defaultName,
      missing: true,
    };
  });
}
