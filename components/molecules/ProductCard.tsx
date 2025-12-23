"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useFavoritesStore } from "@/lib/stores";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { Button, Image, Badge, Icon } from "@/components/atoms";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("product");
  const locale = useLocale();
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const favorite = isFavorite(product.id);
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <Link href={`/${locale}/products/${product.slug}`} className="block">
        <article className="overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            {primaryImage && (
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt}
                width={primaryImage.width}
                height={primaryImage.height}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            )}

            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 bg-white/90 backdrop-blur-sm hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900"
              onClick={handleFavoriteClick}
              aria-label={favorite ? t("removeFromFavorites") : t("addToFavorites")}
            >
              <Icon name={favorite ? "heart-filled" : "heart"} className="text-red-500" size={20} />
            </Button>

            {/* Stock Badge */}
            {!product.inStock && (
              <Badge variant="danger" className="absolute bottom-2 left-2">
                {t("outOfStock")}
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Category */}
            <p className="mb-1 text-xs text-muted-foreground">{product.category.name}</p>

            {/* Product Name */}
            <h3 className="mb-2 line-clamp-2 text-base font-semibold text-card-foreground">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="mb-2 flex items-center gap-1">
              <Icon name="star-filled" className="text-yellow-500" size={16} />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount} {t("reviews")})
              </span>
            </div>

            {/* Vendor */}
            <p className="mb-3 text-xs text-muted-foreground">
              {t("vendor")}: {product.vendor.name}
              {product.vendor.verified && " ✓"}
            </p>

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">
                {formatCurrency(product.price, product.currency, locale)}
              </span>
              <Button size="sm" variant="primary">
                {t("viewDetails")}
              </Button>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
