import { GetStaticPaths, GetStaticProps } from "next";
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
import { motion } from "framer-motion";
import Head from "next/head";

type Props = {
  imovel: Imovel;
};

export default function ApartamentoPage({ imovel }: Props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/assets/img/logo.png" type="image/png" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        <title>{imovel.nome} | Ap Ubatuba Locação Temporada</title>
        <meta
          name="description"
          content={`Veja detalhes do ${imovel.nome}, localizado em ${imovel.localizacao}. Acomodações confortáveis para sua estadia em Ubatuba.`}
        />
        <meta property="og:title" content={`${imovel.nome} | Ap Ubatuba`} />
        <meta
          property="og:description"
          content={`Confira fotos e localização do ${imovel.nome} para aluguel de temporada em Ubatuba.`}
        />
        <meta
          property="og:image"
          content={`https://www.apubatubapraiagrande.com.br/assets/img/${imovel.pasta}/${imovel.prefixo}1.jpg`}
        />
        <meta
          property="og:url"
          content={`https://www.apubatubapraiagrande.com.br/${imovel.slug}`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <link
          rel="canonical"
          href={`https://www.apubatubapraiagrande.com.br/${imovel.slug}`}
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
