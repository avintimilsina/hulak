/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
	runtimeCaching,
	disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  productionBrowserSourceMaps: true,
  i18n: {
    locales: ["en","np"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
  }
}

module.exports = module.exports =withPWA(nextConfig);