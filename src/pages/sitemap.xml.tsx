// src/pages/sitemap.xml.tsx
import type { GetServerSideProps } from "next";
import { apartamentos } from "@/data/apartamentos";
import type { Imovel } from "@/data/apartamentos";

/** Base SEM barra final */
const BASE_URL = "https://apubatubapraiagrande.com.br";

/** Opcional: alguns imóveis podem ter updatedAt */
type WithUpdatedAt = Imovel & { updatedAt?: string };

/** Escapa caracteres inseguros pra XML */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

type ImageItem = { loc: string; title?: string; caption?: string };

/** Monta um <url> com 0..N <image:image> */
function generateUrlTag(
  loc: string,
  lastmod: string,
  changefreq:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never" = "weekly",
  priority: `${number}` = "0.7",
  images: ImageItem[] = []
): string {
  const imageTags = images
    .map(
      (img) => `
  <image:image>
    <image:loc>${img.loc}</image:loc>
    ${img.title ? `<image:title>${escapeXml(img.title)}</image:title>` : ""}
    ${
      img.caption
        ? `<image:caption>${escapeXml(img.caption)}</image:caption>`
        : ""
    }
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

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const nowIso = new Date().toISOString();
  const urls: string[] = [];

  // Home com a imagem principal (share card)
  urls.push(
    generateUrlTag(`${BASE_URL}`, nowIso, "weekly", "1.0", [
      {
        loc: `${BASE_URL}/share-card.webp`,
        title: "Ap Ubatuba Locação Temporada",
        caption:
          "Apartamentos por temporada em Ubatuba – Praia Grande, conforto e ótima localização.",
      },
    ])
  );

  // Páginas de imóvel com TODAS as imagens da galeria
  for (const ap of apartamentos as WithUpdatedAt[]) {
    const loc = `${BASE_URL}/${ap.slug}`;

    const lastmod = ap.updatedAt
      ? new Date(ap.updatedAt).toISOString()
      : nowIso;

    const total =
      Number.isFinite(ap.galeria) && ap.galeria > 0 ? ap.galeria : 1;

    const images: ImageItem[] = Array.from({ length: total }, (_, i) => {
      const n = i + 1;
      return {
        loc: `${BASE_URL}/assets/img/${ap.pasta}/${ap.prefixo}${n}.webp`,
        title: ap.nome,
        caption: `Fotos do ${ap.nome} em ${ap.localizacao} – imagem ${n}/${total}`,
      };
    });

    urls.push(generateUrlTag(loc, lastmod, "weekly", "0.7", images));
  }

  // XML final
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urls.join("\n")}
</urlset>`.trim();

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function SiteMap() {
  return null; // nada no client
}
