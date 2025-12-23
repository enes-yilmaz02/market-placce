import { Suspense } from "react";
import { notFound } from "next/navigation";
import { apiClient } from "@/lib/api/client";
import { MainLayout } from "@/components/templates";
import { ProductGrid } from "@/components/organisms";
import categoriesData from "@/lib/api/mock/categories.json";

// SSG: Generate static pages for all categories
export async function generateStaticParams() {
  return categoriesData.data.map((category) => ({
    slug: category.slug,
  }));
}

export const revalidate = 300; // ISR: Revalidate every 5 minutes

async function CategoryProducts({ slug }: { slug: string }) {
  const category = await apiClient.getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const { data: products } = await apiClient.getProducts({ categorySlug: slug });

  return (
    <>
      <div className="mb-8">
        <div className="mb-2 text-5xl">{category.icon}</div>
        <h1 className="text-3xl font-bold">{category.name}</h1>
      </div>

      <ProductGrid products={products} />
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-12 w-48 animate-pulse rounded bg-muted" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4 animate-pulse">
            <div className="aspect-square rounded-lg bg-muted" />
            <div className="h-4 w-3/4 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <MainLayout>
      <Suspense fallback={<LoadingSkeleton />}>
        <CategoryProducts slug={slug} />
      </Suspense>
    </MainLayout>
  );
}
