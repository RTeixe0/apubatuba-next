// src/pages/[slug].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { motion } from "framer-motion";

import { Hero } from "@/components/Hero";
import { apartamentos, Imovel } from "@/data/apartamentos";
import { Carousel } from "@/components/Carousel";
import { BadgeGroup } from "@/components/BadgeGroup";
import { Gallery } from "@/components/Gallery";
import { Mapa } from "@/components/Mapa";
import { BotaoWhats } from "@/components/BotaoWhats";
import { BackToTop } from "@/components/BackToTop";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type Props = {
  imovel: Imovel;
};

export default function ApartamentoPage({ imovel }: Props) {
  const canonical = `https://apubatubapraiagrande.com.br/${imovel.slug}`;
  const heroImg = `https://apubatubapraiagrande.com.br/assets/img/${imovel.pasta}/${imovel.prefixo}1.webp`;
  const galleryImages = Array.from({ length: imovel.galeria }).map(
    (_, i) =>
      `https://apubatubapraiagrande.com.br/assets/img/${imovel.pasta}/${
        imovel.prefixo
      }${i + 1}.webp`
  );

  return (
    <>
      <Head>
        {/* 🔍 Favicons e manifest (comum a todos os imóveis) */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="apple-touch-icon"
          href="/favicon-180x180.png"
          sizes="180x180"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#003c63" />

        {/* 🏷️ Título e descrição dinâmicos */}
        <title>{imovel.nome} | Ap Ubatuba Locação Temporada</title>
        <meta
          name="description"
          content={`Veja detalhes do ${imovel.nome}, localizado em ${imovel.localizacao}. Acomodações confortáveis para sua estadia em Ubatuba.`}
        />

        {/* 🧠 SEO técnico */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Miniaturas grandes na SERP */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta
          name="googlebot"
          content="index, follow, max-image-preview:large"
        />
        <link rel="canonical" href={canonical} />

        {/* 🌐 Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:title" content={`${imovel.nome} | Ap Ubatuba`} />
        <meta
          property="og:description"
          content={`Confira fotos e localização do ${imovel.nome} para aluguel de temporada em Ubatuba.`}
        />
        <meta property="og:image" content={heroImg} />
        <meta property="og:image:secure_url" content={heroImg} />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="800" />
        <meta property="og:url" content={canonical} />

        {/* 🐦 Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${imovel.nome} | Ap Ubatuba`} />
        <meta
          name="twitter:description"
          content={`Confira fotos, localização e detalhes do ${imovel.nome} para temporada em Ubatuba.`}
        />
        <meta name="twitter:image" content={heroImg} />
        <meta
          name="twitter:image:alt"
          content={`Foto do ${imovel.nome} em ${imovel.localizacao}`}
        />

        {/* 📚 JSON-LD: Breadcrumbs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Início",
                  item: "https://apubatubapraiagrande.com.br/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: imovel.nome,
                  item: canonical,
                },
              ],
            }),
          }}
        />

        {/* 🏠 JSON-LD: Apartment (principal desta página) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Apartment",
              name: imovel.nome,
              description: `Aluguel por temporada em Ubatuba – ${imovel.localizacao}.`,
              url: canonical,
              image: galleryImages,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ubatuba",
                addressRegion: "SP",
                addressCountry: "BR",
              },
              containedInPlace: {
                "@type": "LodgingBusiness",
                name: "Ap Ubatuba Locação Temporada",
                url: "https://apubatubapraiagrande.com.br/",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Av. Atlântica, Praia Grande",
                  addressLocality: "Ubatuba",
                  addressRegion: "SP",
                  postalCode: "11687-528",
                  addressCountry: "BR",
                },
              },
              mainEntityOfPage: canonical,
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: heroImg,
                width: 1200,
                height: 800,
              },
              thumbnailUrl: heroImg,
              inLanguage: "pt-BR",
            }),
          }}
        />
      </Head>

      <Header />
      <Hero titulo={imovel.nome} subtitulo={imovel.localizacao} />

      {/* Carousel com fade */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Carousel
          pasta={imovel.pasta}
          prefixo={imovel.prefixo}
          total={imovel.galeria}
          slug={imovel.slug}
        />
      </motion.div>

      {/* Badges com fade */}
      <motion.section
        className="details scroll-animate py-10 px-4 max-w-4xl mx-auto flex flex-col gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <BadgeGroup
          titulo="🏠 Sobre o apartamento"
          itens={imovel.sobreApartamento}
        />
        <BadgeGroup
          titulo="🏢 Sobre o condomínio"
          itens={imovel.sobreCondominio}
        />
      </motion.section>

      <Gallery
        pasta={imovel.pasta}
        prefixo={imovel.prefixo}
        total={imovel.galeria}
      />

      {/* Mapa */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Mapa src={imovel.mapa} />
      </motion.div>

      <BotaoWhats msg={imovel.whatsappMsg} />
      <BackToTop />
      <main className="pb-32" />
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = apartamentos.map((ap: Imovel) => ({
    params: { slug: ap.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const imovel = apartamentos.find((ap: Imovel) => ap.slug === params?.slug);

  if (!imovel) {
    return { notFound: true };
  }

  return {
    props: {
      imovel,
    },
  };
};
