"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useFavoritesStore } from "@/lib/stores";
import { apiClient } from "@/lib/api/client";
import type { Product } from "@/lib/types";
import { MainLayout } from "@/components/templates";
import { ProductGrid } from "@/components/organisms";

export default function FavoritesPage() {
  const t = useTranslations("favorites");
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      if (favoriteIds.size === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        const favoriteProducts = await apiClient.getProductsByIds(
          Array.from(favoriteIds)
        );
        setProducts(favoriteProducts);
      } catch (error) {
        console.error("Failed to load favorites:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [favoriteIds]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          {products.length > 0 && (
            <span className="text-muted-foreground">
              {t("count", { count: products.length })}
            </span>
          )}
        </div>

        {products.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <div className="mb-4 text-6xl">❤️</div>
            <h2 className="mb-2 text-xl font-semibold">{t("empty")}</h2>
            <p className="text-muted-foreground">{t("emptyDescription")}</p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </MainLayout>
  );
}
