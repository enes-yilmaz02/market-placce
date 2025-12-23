import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { apiClient } from "@/lib/api/client";
import { generateMetadata as genMeta } from "@/lib/utils";
import { MainLayout } from "@/components/templates";
import { ProductGrid } from "@/components/organisms";
import { CategoryCard } from "@/components/molecules";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.home" });

  return genMeta({
    title: t("title"),
    description: t("description"),
    locale,
  });
}

async function FeaturedProducts() {
  const { data: products } = await apiClient.getProducts({ perPage: 8 });

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Featured Products</h2>
      <ProductGrid products={products} />
    </section>
  );
}

async function Categories() {
  const categories = await apiClient.getCategories();
  const topCategories = categories.slice(0, 4);

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Shop by Category</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {topCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4 animate-pulse">
              <div className="aspect-square rounded-lg bg-muted" />
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-4 w-1/2 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <MainLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="rounded-lg bg-gradient-to-r from-primary to-blue-600 p-12 text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Welcome to Pazaryeri
          </h1>
          <p className="text-xl opacity-90">
            Discover amazing products at great prices
          </p>
        </section>

        {/* Categories */}
        <Suspense fallback={<LoadingSkeleton />}>
          <Categories />
        </Suspense>

        {/* Featured Products */}
        <Suspense fallback={<LoadingSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </div>
    </MainLayout>
  );
}
