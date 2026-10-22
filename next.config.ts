import type { NextConfig } from "next";

// Static export: `next build` writes plain HTML/CSS/JS to `out/`,
// which any web server (nginx in the Dockerfile) can serve.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
