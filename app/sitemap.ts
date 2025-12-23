import { MetadataRoute } from "next";
import { siteConfig } from "@/config/app.config";
import productsData from "@/lib/api/mock/products.json";
import categoriesData from "@/lib/api/mock/categories.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const locales = ["tr", "en"];

  const routes: MetadataRoute.Sitemap = [];

  // Static routes
  const staticPages = ["", "/products", "/categories", "/favorites"];

  locales.forEach((locale) => {
    staticPages.forEach((page) => {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: page === "" ? 1 : 0.8,
      });
    });

    // Product pages
    productsData.data.forEach((product) => {
      routes.push({
        url: `${baseUrl}/${locale}/products/${product.slug}`,
        lastModified: new Date(product.updatedAt),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    });

    // Category pages
    categoriesData.data.forEach((category) => {
      routes.push({
        url: `${baseUrl}/${locale}/categories/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });
  });

  return routes;
}
