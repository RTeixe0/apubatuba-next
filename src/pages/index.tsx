// src/pages/index.tsx
import Head from "next/head";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BotaoWhats } from "@/components/BotaoWhats";
import { BackToTop } from "@/components/BackToTop";
import Link from "next/link";
import { apartamentos, Imovel } from "@/data/apartamentos";

type Props = {
  imovel: Imovel;
};

export default function Home({ imovel }: Props) {
  // Ordenar os apartamentos pela propriedade 'ordem'
  const listaOrdenada = apartamentos.slice().sort((a, b) => a.ordem - b.ordem);

  return (
    <>
      <Head>
        <title>Sol & Mar Locação Temporada</title>
        <meta
          name="description"
          content="Aluguel de apartamentos incríveis em Ubatuba com vista para o mar e conforto garantido. Conheça os imóveis disponíveis!"
        />
      </Head>
      <Header />
      <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-10 px-4">
        <section className="container mx-auto max-w-4xl text-center scroll-animate">
          <h1 className="text-3xl font-bold text-[var(--accent)] mb-4">
            Conheça nossos apartamentos
          </h1>
          <p className="text-base opacity-80 mb-10">
            Escolha seu destino ideal e aproveite a melhor estadia em Ubatuba.
          </p>
        </section>

        <section className="container mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 scroll-animate max-w-6xl">
          {listaOrdenada.map((ap) => (
            <Link
              key={ap.slug}
              href={`/${ap.slug}`}
              className="bg-white/5 rounded-xl shadow-md hover:scale-[1.02] transition-transform p-4 flex flex-col items-center text-center border border-white/10"
            >
              <img
                src={`/assets/img/${ap.pasta}/${ap.prefixo}1.jpg`}
                alt={`Imagem de capa do ${ap.nome}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold text-[var(--accent)]">
                {ap.nome}
              </h2>
              <p className="text-sm text-[var(--text)] opacity-70 mt-1">
                {ap.localizacao}
              </p>
            </Link>
          ))}
        </section>
      </main>
      <BackToTop />
      <Footer />
    </>
  );
}
