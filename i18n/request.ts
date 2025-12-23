import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    messages: (await import(`../public/locales/${locale}.json`)).default,
  };
});
