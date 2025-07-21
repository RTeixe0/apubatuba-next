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

type Props = {
  imovel: Imovel;
};

export default function ApartamentoPage({ imovel }: Props) {
  return (
    <>
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

      {/* Galeria com animação */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Gallery
          pasta={imovel.pasta}
          prefixo={imovel.prefixo}
          total={imovel.galeria}
        />
      </motion.div>

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
