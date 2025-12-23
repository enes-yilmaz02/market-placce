"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useFavoritesStore } from "@/lib/stores";
import { Icon } from "@/components/atoms";
import { ThemeToggle, LanguageSwitch } from "@/components/molecules";

export function Header() {
  const t = useTranslations("common");
  const locale = useLocale();
  const favoriteCount = useFavoritesStore((state) => state.getFavoriteCount());

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="text-xl font-bold text-primary">
          Pazaryeri
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href={`/${locale}`}
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            {t("home")}
          </Link>
          <Link
            href={`/${locale}/products`}
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            {t("products")}
          </Link>
          <Link
            href={`/${locale}/categories`}
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            {t("categories")}
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Favorites */}
          <Link
            href={`/${locale}/favorites`}
            className="relative p-2 text-foreground transition-colors hover:text-primary"
            aria-label={t("favorites")}
          >
            <Icon name="heart" size={24} />
            {favoriteCount > 0 && (
              <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {favoriteCount}
              </span>
            )}
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Language Switch */}
          <LanguageSwitch />
        </div>
      </nav>
    </header>
  );
}
