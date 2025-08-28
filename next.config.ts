// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // Pede ao Next para servir AVIF/WebP quando o navegador suportar
    formats: ["image/avif", "image/webp"],

    // (opcional) bom TTL para as versões otimizadas
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 dias

    // (opcional) tamanhos gerados; pode manter os defaults se preferir
    deviceSizes: [320, 640, 768, 1024, 1152, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // (opcional) cache agressivo para assets estáticos do /public/assets
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
