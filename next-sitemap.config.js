/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://apubatubapraiagrande.com.br", // domínio correto
  generateRobotsTxt: true,
  sitemapSize: 5000,
  additionalPaths: async (config) => [
    {
      loc: "/", // homepage
      changefreq: "weekly",
      priority: 1.0,
      lastmod: new Date().toISOString(),
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/", // permite indexação total
      },
    ],
  },
};
