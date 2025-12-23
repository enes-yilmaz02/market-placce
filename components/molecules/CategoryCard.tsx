"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import type { Category } from "@/lib/types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/${locale}/categories/${category.slug}`}>
        <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
          <span className="mb-2 text-4xl">{category.icon}</span>
          <h3 className="text-center text-sm font-medium text-card-foreground">
            {category.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
