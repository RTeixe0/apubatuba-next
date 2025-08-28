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
import WeatherCard from "@/components/WeatherCard";
import { OndeEstamos } from "@/components/OndeEstamos";

export default function Home() {
  const listaOrdenada = apartamentos.slice().sort((a, b) => a.ordem - b.ordem);

  return (
    <>
      <Head>
        {/* 🏷️ Título e descrição da página */}
        <title>
          Aluguel de Apartamentos em Ubatuba | Ap Ubatuba Locação Temporada
        </title>
        <meta
          name="description"
          content="Apartamentos para temporada em Ubatuba com vista para o mar. Conforto, segurança e localização excelente na Praia Grande."
        />

        {/* 🤖 SEO técnico */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://apubatubapraiagrande.com.br/" />

        {/* 📱 Ícones para navegador e dispositivos */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="64x64" />
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

        {/* 🌐 Open Graph - Facebook / WhatsApp / LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:title" content="Ap Ubatuba Locação Temporada" />
        <meta
          property="og:description"
          content="Encontre o apartamento ideal para suas férias em Ubatuba. Veja fotos, localizações e reserve direto."
        />
        <meta
          property="og:image"
          content="https://apubatubapraiagrande.com.br/share-card.webp"
        />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:url"
          content="https://apubatubapraiagrande.com.br/"
        />

        {/* 🐦 Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ap Ubatuba Locação Temporada" />
        <meta
          name="twitter:description"
          content="Apartamentos para alugar na Praia Grande em Ubatuba. Conforto, localização e praticidade."
        />
        <meta
          name="twitter:image"
          content="https://apubatubapraiagrande.com.br/share-card.webp"
        />
      </Head>

      <Header />
      <Hero
        titulo="Conheça nossos apartamentos"
        subtitulo="Escolha seu destino ideal e aproveite a melhor estadia em Praia Grande - Ubatuba."
      />
      <div className="px-4 mt-6">
        <WeatherCard />
      </div>

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
                    src={`/assets/img/${ap.pasta}/${ap.prefixo}1.webp`}
                    alt={`Imagem de capa do ${ap.nome}`}
                    width={1200} // largura "máxima" da fonte (arbitrária alta)
                    height={800} // mantenha a proporção (ex.: 3:2, 16:9…)
                    sizes="(max-width: 640px) 100vw,
         (max-width: 1152px) 50vw,
         33vw"
                    quality={75}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
                    priority={index === 0} // só o primeiro card acima da dobra como prioridade
                    fetchPriority="high"
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
      <div className="px-4 mt-6">
        <OndeEstamos />
      </div>
      <BotaoWhats msg="Olá! Seja muito bem-vindo(a)! 😊 Agradecemos pelo seu contato. Para que possamos atendê-lo(a) da melhor forma, poderia, por gentileza, informar o número de pessoas e a data desejada para a sua estadia?" />
      <BackToTop />
      <Footer />
    </>
  );
}
