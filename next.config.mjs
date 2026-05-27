/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Had s-ster kay-goul l-Vercel t-jahal l-errors d TypeScript f l-Build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Had s-ster kay-goul l-Vercel t-jahal l-errors d ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;