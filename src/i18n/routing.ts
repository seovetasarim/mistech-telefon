import type { RoutingConfig } from "next-intl/routing";
import { locales, defaultLocale } from "@/app/i18n";

export const routing = {
  locales,
  defaultLocale,
  localePrefix: "always"
} satisfies RoutingConfig;


