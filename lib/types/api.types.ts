// Based on https://api.meshur.co/docs API structure

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  images: ProductImage[];
  category: Category;
  vendor: Vendor;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  attributes: ProductAttribute[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  isPrimary: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  icon?: string;
  order: number;
}

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  rating: number;
  verified: boolean;
}

export interface ProductAttribute {
  id: string;
  name: string;
  value: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
