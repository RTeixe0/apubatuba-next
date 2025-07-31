/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.apubatubapraiagrande.com.br",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  // 👇 Adiciona manualmente a homepage
  additionalPaths: async (config) => [
    {
      loc: "/", // homepage
      changefreq: "weekly",
      priority: 1.0,
      lastmod: new Date().toISOString(),
    },
  ],
};
