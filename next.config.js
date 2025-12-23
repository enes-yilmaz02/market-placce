import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Build sırasında ESLint hatalarını yoksay
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! UYARI !!
    // Projenizde tip hataları olsa bile build almaya devam eder.
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
  },
  // Deneysel özellikleri etkinleştir
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

// nextConfig'i withNextIntl ile sarmalayarak dışa aktarıyoruz
export default withNextIntl(nextConfig);