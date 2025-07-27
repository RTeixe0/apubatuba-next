// src/pages/index.tsx
import Head from "next/head";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BotaoWhats } from "@/components/BotaoWhats";
import { BackToTop } from "@/components/BackToTop";
import Link from "next/link";
import Image from "next/image";
import { apartamentos } from "@/data/apartamentos";
import { Hero } from "@/components/Hero";
import { motion } from "framer-motion";

export default function Home() {
  const listaOrdenada = apartamentos.slice().sort((a, b) => a.ordem - b.ordem);

  return (
    <>
      <Head>
        <title>
          Aluguel de Apartamentos em Ubatuba | Ap Ubatuba Locação Temporada
        </title>
        <meta
          name="description"
          content="Apartamentos para temporada em Ubatuba com vista para o mar. Conforto, segurança e localização excelente na Praia Grande."
        />
        <meta property="og:title" content="Ap Ubatuba Locação Temporada" />
        <meta
          property="og:description"
          content="Encontre o apartamento ideal para suas férias em Ubatuba. Veja fotos, localizações e reserve direto."
        />
        <meta property="og:image" content="/assets/img/logo.png" />
        <meta property="og:url" content="https://apubatuba-next.vercel.app/" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://apubatuba-next.vercel.app/" />
      </Head>

      <Header />
      <Hero
        titulo="Conheça nossos apartamentos"
        subtitulo="Escolha seu destino ideal e aproveite a melhor estadia em Praia Grande - Ubatuba."
      />

      <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-4 pt-10">
        <section className="container mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3 scroll-animate max-w-6xl px-2">
          {listaOrdenada.map((ap, index) => (
            <Link
              key={ap.slug}
              href={`/${ap.slug}`}
              className="group block transition-transform duration-300 hover:scale-[1.03]"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className={`relative rounded-2xl overflow-hidden 
      ${
        index < 3
          ? "shadow-[0_0_30px_rgba(255,212,59,0.5),0_10px_45px_rgba(255,212,59,0.3)]"
          : "shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
      }`}
              >
                <div className="relative w-full h-48 md:h-52 lg:h-56">
                  <Image
                    src={`/assets/img/${ap.pasta}/${ap.prefixo}1.jpg`}
                    alt={`Imagem de capa do ${ap.nome}`}
                    width={400}
                    height={240}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
                    priority
                  />
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white px-4 py-3">
                    <h2 className="text-base md:text-lg font-semibold text-white drop-shadow-md">
                      {ap.nome}
                    </h2>
                    <p className="text-xs md:text-sm opacity-90">
                      {ap.localizacao}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </section>
      </main>

      <BotaoWhats msg="Olá! Seja muito bem-vindo(a)! 😊 Agradecemos pelo seu contato. Para que possamos atendê-lo(a) da melhor forma, poderia, por gentileza, informar o número de pessoas e a data desejada para a sua estadia?" />
      <BackToTop />
      <Footer />
    </>
  );
}
