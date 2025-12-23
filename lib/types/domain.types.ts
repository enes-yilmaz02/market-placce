export type Locale = "tr" | "en";

export interface Theme {
  mode: "light" | "dark";
}

export interface AppConfig {
  defaultLocale: Locale;
  supportedLocales: Locale[];
  apiBaseUrl: string;
  itemsPerPage: number;
}
