import type { Product, Category, PaginatedResponse } from "@/lib/types";
import productsData from "./mock/products.json";
import categoriesData from "./mock/categories.json";

// Simulated API delay
const simulateDelay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * API Client
 * In production, this would make real HTTP requests
 * Currently uses mock JSON data with simulated delays
 */
export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  /**
   * Fetch all products with pagination
   */
  async getProducts(params?: {
    page?: number;
    perPage?: number;
    categorySlug?: string;
  }): Promise<PaginatedResponse<Product>> {
    await simulateDelay();

    const page = params?.page || 1;
    const perPage = params?.perPage || 10;

    let filteredData = productsData.data;

    // Filter by category if provided
    if (params?.categorySlug) {
      filteredData = productsData.data.filter(
        (product) => product.category.slug === params.categorySlug
      );
    }

    // Simulate pagination
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedData = filteredData.slice(start, end);

    return {
      data: paginatedData as Product[],
      meta: {
        total: filteredData.length,
        page,
        perPage,
        totalPages: Math.ceil(filteredData.length / perPage),
      },
    };
  }

  /**
   * Fetch a single product by slug
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    await simulateDelay();

    const product = productsData.data.find((p) => p.slug === slug);
    return (product as Product) || null;
  }

  /**
   * Fetch all categories
   */
  async getCategories(): Promise<Category[]> {
    await simulateDelay();
    return categoriesData.data as Category[];
  }

  /**
   * Fetch a single category by slug
   */
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    await simulateDelay();

    const category = categoriesData.data.find((c) => c.slug === slug);
    return (category as Category) || null;
  }

  /**
   * Fetch products by IDs (useful for favorites)
   */
  async getProductsByIds(ids: string[]): Promise<Product[]> {
    await simulateDelay();

    const products = productsData.data.filter((p) => ids.includes(p.id));
    return products as Product[];
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
