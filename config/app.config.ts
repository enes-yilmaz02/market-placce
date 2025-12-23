import type { AppConfig } from "@/lib/types";

export const appConfig: AppConfig = {
  defaultLocale: "tr",
  supportedLocales: ["tr", "en"],
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "",
  itemsPerPage: 12,
};

export const siteConfig = {
  name: "Pazaryeri",
  description: "Modern e-commerce marketplace",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};
