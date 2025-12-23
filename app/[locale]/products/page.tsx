import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { apiClient } from "@/lib/api/client";
import { generateMetadata as genMeta } from "@/lib/utils";
import { MainLayout } from "@/components/templates";
import { ProductGrid } from "@/components/organisms";

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.products" });

  return genMeta({
    title: t("title"),
    description: t("description"),
    locale,
  });
}

async function ProductsList() {
  const { data: products } = await apiClient.getProducts({ perPage: 12 });

  return <ProductGrid products={products} />;
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="space-y-4 animate-pulse">
          <div className="aspect-square rounded-lg bg-muted" />
          <div className="h-4 w-3/4 rounded bg-muted" />
          <div className="h-4 w-1/2 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

export default async function ProductsPage() {
  const t = await getTranslations("common");

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{t("products")}</h1>
        </div>

        <Suspense fallback={<LoadingSkeleton />}>
          <ProductsList />
        </Suspense>
      </div>
    </MainLayout>
  );
}
