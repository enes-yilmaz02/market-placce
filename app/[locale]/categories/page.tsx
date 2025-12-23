import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { apiClient } from "@/lib/api/client";
import { MainLayout } from "@/components/templates";
import { CategoryCard } from "@/components/molecules";

export const revalidate = 3600; // Revalidate every hour

async function CategoriesList() {
  const categories = await apiClient.getCategories();

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />
      ))}
    </div>
  );
}

export default async function CategoriesPage() {
  const t = await getTranslations("common");

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{t("categories")}</h1>

        <Suspense fallback={<LoadingSkeleton />}>
          <CategoriesList />
        </Suspense>
      </div>
    </MainLayout>
  );
}
