// src/pages/sitemap.xml.tsx
import type { GetServerSideProps } from "next";
import { apartamentos } from "@/data/apartamentos";

const BASE_URL = "https://apubatubapraiagrande.com.br"; 

function generateUrlTag(loc: string, lastmod: string, changefreq = "weekly", priority = "0.7", images?: { loc: string; title?: string; caption?: string }[]) {
  const imageTags = (images ?? [])
    .map(
      (img) => `
  <image:image>
    <image:loc>${img.loc}</image:loc>
    ${img.title ? `<image:title>${escapeXml(img.title)}</image:title>` : ""}
    ${img.caption ? `<image:caption>${escapeXml(img.caption)}</image:caption>` : ""}
  </image:image>`
    )
    .join("");

  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${imageTags}
  </url>`;
}

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const nowIso = new Date().toISOString();

  // Home
  const urls: string[] = [];
  urls.push(
    generateUrlTag(`${BASE_URL}`, nowIso, "weekly", "1.0")
  );

  // Imóveis
  for (const ap of apartamentos) {
    const loc = `${BASE_URL}/${ap.slug}`;
    const imgCover = `${BASE_URL}/assets/img/${ap.pasta}/${ap.prefixo}1.jpg`; 
    urls.push(
      generateUrlTag(loc, nowIso, "weekly", "0.7", [
        { loc: imgCover, title: ap.nome, caption: `Fotos do ${ap.nome} em ${ap.localizacao}` },
      ])
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urls.join("\n")}
</urlset>`.trim();

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function SiteMap() {
  // Não renderiza nada no cliente
  return null;
}
