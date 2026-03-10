import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  User,
  Shield,
  Link2,
  Settings,
} from "lucide-react";
import { t, type Language } from "@/lib/i18n";

export interface NavItem {
  href: string;
  title: string;
  titleKey: string;
  icon: LucideIcon;
}

export const mainNavItems: NavItem[] = [
  {
    href: "/dashboard",
    title: "概览",
    titleKey: "nav.dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/profile",
    title: "个人资料",
    titleKey: "nav.profile",
    icon: User,
  },
  {
    href: "/dashboard/security",
    title: "安全设置",
    titleKey: "nav.security",
    icon: Shield,
  },
  {
    href: "/dashboard/connections",
    title: "社交连接",
    titleKey: "nav.connections",
    icon: Link2,
  },
  {
    href: "/dashboard/settings",
    title: "偏好设置",
    titleKey: "nav.settings",
    icon: Settings,
  },
];

export const auxiliaryNavItems: NavItem[] = [
  {
    href: "/portal",
    title: "服务门户",
    titleKey: "nav.portal",
    icon: LayoutDashboard,
  },
];

export function getNavLabel(item: NavItem, language: Language): string {
  return t(item.titleKey, language);
}

export function isNavItemActive(href: string, pathname: string): boolean {
  if (href === "/dashboard") {
    return pathname === href;
  }

  return pathname.startsWith(href);
}
