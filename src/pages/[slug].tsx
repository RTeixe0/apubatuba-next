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

type Props = {
  imovel: Imovel;
};

export default function ApartamentoPage({ imovel }: Props) {
  return (
    <>
      <Header />

      <Hero titulo={imovel.nome} subtitulo={imovel.localizacao} />
      <Carousel
        pasta={imovel.pasta}
        prefixo={imovel.prefixo}
        total={imovel.galeria}
        slug={imovel.slug}
      />
      <section className="details scroll-animate py-10 px-4 max-w-4xl mx-auto flex flex-col gap-6">
        <BadgeGroup
          titulo="🏠 Sobre o apartamento"
          itens={imovel.sobreApartamento}
        />
        <BadgeGroup
          titulo="🏢 Sobre o condomínio"
          itens={imovel.sobreCondominio}
        />
      </section>
      <Gallery
        pasta={imovel.pasta}
        prefixo={imovel.prefixo}
        total={imovel.galeria}
      />
      <Mapa src={imovel.mapa} />
      <BotaoWhats msg={imovel.whatsappMsg} />
      <BackToTop />
      <main className="pb-32"></main>
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
