export type UiLanguage = "en" | "zh";

type Params = Record<string, string | number>;

type Translations = Record<UiLanguage, Record<string, string>>;

const TRANSLATIONS: Translations = {
  en: {},
  zh: {
    "Gateway Dashboard": "网关控制台",
    "Health": "健康",
    "OK": "正常",
    "Offline": "离线",
    "Resources": "资源",
    "Docs": "文档",
    "Chat": "聊天",
    "Control": "控制",
    "Agent": "代理",
    "Settings": "设置",
    "Theme": "主题",
    "System": "系统",
    "Light": "浅色",
    "Dark": "深色",
    "System theme": "系统主题",
    "Light theme": "浅色主题",
    "Dark theme": "深色主题",
    "Overview": "概览",
    "Channels": "渠道",
    "Instances": "实例",
    "Sessions": "会话",
    "Usage": "用量",
    "Cron Jobs": "定时任务",
    "Skills": "技能",
    "Nodes": "节点",
    "Config": "配置",
    "Debug": "调试",
    "Logs": "日志",
    "Gateway status, entry points, and a fast health read.": "网关状态、入口和快速健康概览。",
    "Manage channels and settings.": "管理渠道与设置。",
    "Presence beacons from connected clients and nodes.": "来自客户端与节点的在线状态信标。",
    "Recent session keys tracked by the gateway.": "网关追踪的近期会话键。",
    "Usage analytics for sessions, models, and costs.": "会话、模型与成本的用量分析。",
    "Automations and schedules running on the gateway.": "网关上的自动化与计划任务。",
    "Manage agent workspaces, tools, and identities.": "管理代理工作区、工具与身份。",
    "Inspect active sessions and adjust per-session defaults.": "查看活跃会话并调整会话默认值。",
    "Schedule wakeups and recurring agent runs.": "安排唤醒与周期性代理运行。",
    "Manage skill availability and API key injection.": "管理技能可用性与 API Key 注入。",
    "Paired devices, capabilities, and command exposure.": "已配对设备、能力与命令暴露。",
    "Direct gateway chat session for quick interventions.": "用于快速介入的网关聊天会话。",
    "Edit ~/.openclaw/openclaw.json safely.": "安全编辑 ~/.openclaw/openclaw.json。",
    "Gateway snapshots, events, and manual RPC calls.": "网关快照、事件与手动 RPC 调用。",
    "Live tail of the gateway file logs.": "实时跟踪网关文件日志。",
    "Manage skills and their status.": "管理技能及其状态。",
    "Control nodes and connected devices.": "管理节点与已连接设备。",
    "Gateway config file editor and validation.": "网关配置编辑与校验。",
    "Debugging and gateway status dumps.": "调试与网关状态导出。",
    "Gateway logs and export.": "网关日志与导出。",
    "Language": "语言",
    "English": "英文",
    "Chinese": "中文",
    "Enabled": "已启用",
    "Disabled": "已禁用",
    "Gateway Access": "网关访问",
    "Where the dashboard connects and how it authenticates.": "控制台连接位置与认证方式。",
    "WebSocket URL": "WebSocket 地址",
    "Gateway Token": "网关令牌",
    "Password (not stored)": "密码（不保存）",
    "Default Session Key": "默认会话键",
    "Connect": "连接",
    "Refresh": "刷新",
    "Click Connect to apply connection changes.": "点击“连接”以应用连接变更。",
    "This gateway requires auth. Add a token or password, then click Connect.": "该网关需要认证。请添加令牌或密码，然后点击“连接”。",
    "open the Control UI": "打开控制台",
    "set token": "设置令牌",
    "Control UI auth docs (opens in new tab)": "控制台认证文档（新标签页打开）",
    "Docs: Control UI auth": "文档：控制台认证",
    "Auth failed. Update the token or password in Control UI settings, then click Connect.": "认证失败。请在控制台设置中更新令牌或密码，然后点击“连接”。",
    "This page is HTTP, so the browser blocks device identity. Use HTTPS (Tailscale Serve) or open": "当前页面为 HTTP，浏览器会阻止设备身份。请使用 HTTPS（Tailscale Serve）或打开",
    "on the gateway host.": "于网关主机上。",
    "If you must stay on HTTP, set": "如果必须使用 HTTP，请设置",
    "token-only": "仅令牌",
    "Tailscale Serve docs (opens in new tab)": "Tailscale Serve 文档（新标签页打开）",
    "Docs: Tailscale Serve": "文档：Tailscale Serve",
    "Insecure HTTP docs (opens in new tab)": "不安全 HTTP 文档（新标签页打开）",
    "Docs: Insecure HTTP": "文档：不安全 HTTP",
    "Snapshot": "快照",
    "Latest gateway handshake information.": "最新的网关握手信息。",
    "Status": "状态",
    "Connected": "已连接",
    "Disconnected": "未连接",
    "Uptime": "运行时长",
    "Tick Interval": "轮询间隔",
    "Last Channels Refresh": "上次刷新渠道",
    "Use Channels to link WhatsApp, Telegram, Discord, Signal, or iMessage.": "通过“渠道”连接 WhatsApp、Telegram、Discord、Signal 或 iMessage。",
    "Cron": "定时任务",
    "Presence beacons in the last 5 minutes.": "过去 5 分钟的在线信标。",
    "Next wake {time}": "下次唤醒 {time}",
    "Session": "会话",
    "Refresh chat data": "刷新聊天数据",
    "Toggle assistant thinking/working output": "切换助手思考/工作输出",
    "Toggle focus mode (hide sidebar + page header)": "切换专注模式（隐藏侧边栏与页眉）",
    "Disabled during onboarding": "引导期间不可用",
    "Loading chat…": "加载聊天中…",
    "Compacting context...": "正在压缩上下文…",
    "Context compacted": "上下文已压缩",
    "Queued ({count})": "队列（{count}）",
    "Image ({count})": "图片（{count}）",
    "Remove queued message": "移除排队消息",
    "New messages": "新消息",
    "Message (↩ to send, Shift+↩ for line breaks, paste images)": "消息（回车发送，Shift+回车换行，可粘贴图片）",
    "Add a message or paste more images...": "添加消息或继续粘贴图片…",
    "Connect to the gateway to start chatting…": "连接到网关后开始聊天…",
    "Exit focus mode": "退出专注模式",
    "Context": "上下文",
    "Tool Output": "工具输出",
    "Long-term memory": "长期记忆",
    "Short-term memory": "短期记忆",
    "User preferences": "用户偏好",
    "Stored in {file}": "存储于 {file}",
    "No context file yet.": "尚未创建上下文文件。",
    "Save": "保存",
    "Saving…": "保存中…",
    "Reset": "重置",
    "Reload": "重新加载",
    "Last updated {time}": "最后更新 {time}",
    "See where tokens go, when sessions spike, and what drives cost.": "查看 Token 去向、会话峰值与成本来源。",
    "Token Usage": "Token 用量",
    "Loading": "加载中",
    "to": "到",
    "Token Estimator": "Token 估算器",
    "Paste text to estimate tokens (approximate tiktoken-style).": "粘贴文本以估算 Token（近似 tiktoken 规则）。",
    "Characters": "字符数",
    "Words": "单词数",
    "CJK chars": "中日韩字符数",
    "Estimated tokens": "估算 Token",
    "Context panel": "上下文面板",
    "No agent resolved for this session.": "未能为该会话解析到代理。"
  },
};

let currentLanguage: UiLanguage = "en";

export function setLanguage(lang: UiLanguage) {
  currentLanguage = lang;
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }
}

export function getLanguage(): UiLanguage {
  return currentLanguage;
}

export function t(key: string, params?: Params): string {
  const table = TRANSLATIONS[currentLanguage] ?? {};
  let text = table[key] ?? key;
  if (params) {
    for (const [paramKey, value] of Object.entries(params)) {
      text = text.replaceAll(`{${paramKey}}`, String(value));
    }
  }
  return text;
}
