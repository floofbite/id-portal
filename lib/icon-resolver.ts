const DASHBOARD_ICONS_BASE = "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons";
const SELFH_ICONS_BASE = "https://cdn.jsdelivr.net/gh/selfhst/icons";
const ICONIFY_MDI_BASE = "https://api.iconify.design/mdi";
const SIMPLE_ICONS_BASE = "https://cdn.simpleicons.org";

function normalizeIconInput(icon: string): string {
  return icon.trim();
}

function stripExtension(value: string): { name: string; ext?: "svg" | "png" | "webp" } {
  const matched = value.match(/\.(svg|png|webp)$/i);
  if (!matched) {
    return { name: value };
  }

  return {
    name: value.slice(0, -matched[0].length),
    ext: matched[1].toLowerCase() as "svg" | "png" | "webp",
  };
}

function resolveMdiIcon(icon: string): string | null {
  const token = icon.startsWith("mdi:") ? icon.slice(4) : icon.slice(4);
  if (!token) {
    return null;
  }

  const { name } = stripExtension(token);
  return `${ICONIFY_MDI_BASE}/${encodeURIComponent(name)}.svg`;
}

function resolveSimpleIcon(icon: string): string | null {
  const token = icon.startsWith("si:") ? icon.slice(3) : icon.slice(3);
  if (!token) {
    return null;
  }

  const colorMatch = token.match(/-(#?[0-9a-fA-F]{3,8})$/);
  const colorRaw = colorMatch?.[1];
  const baseName = colorRaw ? token.slice(0, -colorMatch[0].length) : token;
  const { name } = stripExtension(baseName);

  if (!name) {
    return null;
  }

  const color = colorRaw?.replace(/^#/, "");
  return color
    ? `${SIMPLE_ICONS_BASE}/${encodeURIComponent(name)}/${encodeURIComponent(color)}`
    : `${SIMPLE_ICONS_BASE}/${encodeURIComponent(name)}`;
}

function resolveSelfhIcon(icon: string): string | null {
  const token = icon.startsWith("sh:")
    ? icon.slice(3)
    : icon.startsWith("sh-")
      ? icon.slice(3)
      : icon.slice(6);

  if (!token) {
    return null;
  }

  const { name, ext } = stripExtension(token);
  const format = ext ?? "png";
  return `${SELFH_ICONS_BASE}/${format}/${encodeURIComponent(name)}.${format}`;
}

function resolveDashboardIcon(icon: string): string {
  const { name, ext } = stripExtension(icon);
  const format = ext ?? "svg";
  return `${DASHBOARD_ICONS_BASE}/${format}/${encodeURIComponent(name)}.${format}`;
}

export function resolveIconSource(icon?: string): string | null {
  if (!icon) {
    return null;
  }

  const normalized = normalizeIconInput(icon);
  if (!normalized) {
    return null;
  }

  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }

  if (normalized.startsWith("/")) {
    return normalized;
  }

  if (normalized.startsWith("mdi:") || normalized.startsWith("mdi-")) {
    return resolveMdiIcon(normalized);
  }

  if (normalized.startsWith("si:") || normalized.startsWith("si-")) {
    return resolveSimpleIcon(normalized);
  }

  if (
    normalized.startsWith("sh:") ||
    normalized.startsWith("sh-") ||
    normalized.startsWith("selfh-")
  ) {
    return resolveSelfhIcon(normalized);
  }

  if (/^[./]/.test(normalized)) {
    return normalized.startsWith("/") ? normalized : `/${normalized.replace(/^\.\//, "")}`;
  }

  return resolveDashboardIcon(normalized);
}
