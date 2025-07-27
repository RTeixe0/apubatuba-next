import React from "react";

type HeroProps = {
  titulo: string;
  subtitulo: string;
};

export function Hero({ titulo, subtitulo }: HeroProps) {
  return (
    <section className="hero scroll-animate text-center py-10 bg-gradient-to-b from-[#003c63] to-[#00263e]">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#ffd43b]">
          {titulo}
        </h1>
        <p className="text-base md:text-lg text-white mt-2">{subtitulo}</p>
      </div>
    </section>
  );
}
