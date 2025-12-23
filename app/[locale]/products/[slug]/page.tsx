import { Suspense } from "react";
import { notFound } from "next/navigation";
import { apiClient } from "@/lib/api/client";
import { generateMetadata as genMeta, generateProductJsonLd, formatCurrency } from "@/lib/utils";
import { MainLayout } from "@/components/templates";
import { Image, Badge, Icon } from "@/components/atoms";
import productsData from "@/lib/api/mock/products.json";

// SSG: Generate static pages for all products
export async function generateStaticParams() {
  return productsData.data.map((product) => ({
    slug: product.slug,
  }));
}

// ISR: Revalidate every 300 seconds (5 minutes)
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = await apiClient.getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return genMeta({
    title: `${product.name} - Pazaryeri`,
    description: product.description,
    image: product.images[0]?.url,
    locale,
  });
}

async function ProductDetail({ slug, locale }: { slug: string; locale: string }) {
  const product = await apiClient.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateProductJsonLd(product)),
        }}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
            {primaryImage && (
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt}
                width={primaryImage.width}
                height={primaryImage.height}
                priority
              />
            )}
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-square overflow-hidden rounded border border-border"
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={200}
                    height={200}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category & Vendor */}
          <div className="flex items-center gap-2">
            <Badge>{product.category.name}</Badge>
            <span className="text-sm text-muted-foreground">
              by {product.vendor.name}
              {product.vendor.verified && " ✓"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Icon name="star-filled" className="text-yellow-500" size={20} />
              <span className="font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-primary">
            {formatCurrency(product.price, product.currency, locale)}
          </div>

          {/* Stock Status */}
          <div>
            {product.inStock ? (
              <Badge variant="success">In Stock</Badge>
            ) : (
              <Badge variant="danger">Out of Stock</Badge>
            )}
          </div>

          {/* Description */}
          <div>
            <h2 className="mb-2 text-lg font-semibold">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Attributes */}
          {product.attributes.length > 0 && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">Specifications</h2>
              <dl className="space-y-2">
                {product.attributes.map((attr) => (
                  <div key={attr.id} className="flex gap-2">
                    <dt className="font-medium">{attr.name}:</dt>
                    <dd className="text-muted-foreground">{attr.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="aspect-square animate-pulse rounded-lg bg-muted" />
      <div className="space-y-4">
        <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-12 w-32 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  return (
    <MainLayout>
      <Suspense fallback={<LoadingSkeleton />}>
        <ProductDetail slug={slug} locale={locale} />
      </Suspense>
    </MainLayout>
  );
}
