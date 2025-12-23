import type { Metadata } from "next";
import type { Product } from "@/lib/types";

interface SEOParams {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  locale?: string;
}

/**
 * Generate metadata for pages
 */
export function generateMetadata(params: SEOParams): Metadata {
  const { title, description, keywords, image, url, locale = "en" } = params;

  return {
    title,
    description,
    keywords: keywords?.join(", "),
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
      url,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

/**
 * Generate product JSON-LD structured data
 */
export function generateProductJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images[0]?.url,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: product.vendor.name,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };
}

/**
 * Generate breadcrumb JSON-LD
 */
export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
