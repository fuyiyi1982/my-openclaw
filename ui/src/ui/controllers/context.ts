import type { GatewayBrowserClient } from "../gateway.ts";
import type { AgentFileEntry, AgentsFilesGetResult, AgentsFilesListResult, AgentsFilesSetResult } from "../types.ts";

export type ContextState = {
  client: GatewayBrowserClient | null;
  connected: boolean;
  contextLoading: boolean;
  contextError: string | null;
  contextFilesList: AgentsFilesListResult | null;
  contextFileContents: Record<string, string>;
  contextFileDrafts: Record<string, string>;
  contextFileActive: string | null;
  contextFileSaving: boolean;
};

function mergeFileEntry(
  list: AgentsFilesListResult | null,
  entry: AgentFileEntry,
): AgentsFilesListResult | null {
  if (!list) {
    return list;
  }
  const hasEntry = list.files.some((file) => file.name === entry.name);
  const nextFiles = hasEntry
    ? list.files.map((file) => (file.name === entry.name ? entry : file))
    : [...list.files, entry];
  return { ...list, files: nextFiles };
}

export async function loadContextFiles(state: ContextState, agentId: string) {
  if (!state.client || !state.connected || state.contextLoading) {
    return;
  }
  state.contextLoading = true;
  state.contextError = null;
  try {
    const res = await state.client.request<AgentsFilesListResult | null>("agents.files.list", {
      agentId,
    });
    if (res) {
      state.contextFilesList = res;
      if (state.contextFileActive && !res.files.some((file) => file.name === state.contextFileActive)) {
        state.contextFileActive = null;
      }
    }
  } catch (err) {
    state.contextError = String(err);
  } finally {
    state.contextLoading = false;
  }
}

export async function loadContextFileContent(
  state: ContextState,
  agentId: string,
  name: string,
  opts?: { force?: boolean; preserveDraft?: boolean },
) {
  if (!state.client || !state.connected || state.contextLoading) {
    return;
  }
  if (!opts?.force && Object.hasOwn(state.contextFileContents, name)) {
    return;
  }
  state.contextLoading = true;
  state.contextError = null;
  try {
    const res = await state.client.request<AgentsFilesGetResult | null>("agents.files.get", {
      agentId,
      name,
    });
    if (res?.file) {
      const content = res.file.content ?? "";
      const previousBase = state.contextFileContents[name] ?? "";
      const currentDraft = state.contextFileDrafts[name];
      const preserveDraft = opts?.preserveDraft ?? true;
      state.contextFilesList = mergeFileEntry(state.contextFilesList, res.file);
      state.contextFileContents = { ...state.contextFileContents, [name]: content };
      if (!preserveDraft || !Object.hasOwn(state.contextFileDrafts, name) || currentDraft === previousBase) {
        state.contextFileDrafts = { ...state.contextFileDrafts, [name]: content };
      }
    }
  } catch (err) {
    state.contextError = String(err);
  } finally {
    state.contextLoading = false;
  }
}

export async function saveContextFile(
  state: ContextState,
  agentId: string,
  name: string,
  content: string,
) {
  if (!state.client || !state.connected || state.contextFileSaving) {
    return;
  }
  state.contextFileSaving = true;
  state.contextError = null;
  try {
    const res = await state.client.request<AgentsFilesSetResult | null>("agents.files.set", {
      agentId,
      name,
      content,
    });
    if (res?.file) {
      state.contextFilesList = mergeFileEntry(state.contextFilesList, res.file);
      state.contextFileContents = { ...state.contextFileContents, [name]: content };
      state.contextFileDrafts = { ...state.contextFileDrafts, [name]: content };
    }
  } catch (err) {
    state.contextError = String(err);
  } finally {
    state.contextFileSaving = false;
  }
}
