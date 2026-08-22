import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["sharp"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.denovamind.com" },
    ],
  },

  // T-F05: /images/* currently ships max-age=0. Give the static brand assets
  // (og-cover.jpg, favicon.ico, apple-icon.png under public/) a one-week
  // browser cache. Metadata routes are also matched by this source pattern;
  // after deploy we verify whether they honor it and adjust if not.
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800" },
        ],
      },
    ];
  },
};

export default nextConfig;
