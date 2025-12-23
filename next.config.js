import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
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