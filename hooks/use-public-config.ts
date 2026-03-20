"use client";

import { useFetch } from "@/hooks/use-fetch";
import type { PublicRuntimeConfig } from "@/config/types";

export function usePublicConfig() {
  return useFetch<PublicRuntimeConfig>({
    url: "/me/api/public-config",
    immediate: true,
  });
}
