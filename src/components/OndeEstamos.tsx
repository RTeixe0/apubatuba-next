// src/components/OndeEstamos.tsx
import React from "react";

export function OndeEstamos() {
  const src =
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2093.7427245768736!2d-45.06771494577103!3d-23.47280270571279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1spt-BR!2sbr!4v1756048517670!5m2!1spt-BR!2sbr";

  return (
    <section
      aria-labelledby="onde-estamos-title"
      className="max-w-6xl mx-auto px-2 mt-8"
    >
      <h2
        id="onde-estamos-title"
        className="text-2xl text-center font-bold text-[#ffd43b] mb-6"
      >
        Onde estamos em Ubatuba
      </h2>

      {/* Mobile: mapa mais alto (16/11). Desktop: panorâmico. Sombra/borda só a partir de sm */}
      <div className="rounded-xl sm:rounded-2xl overflow-hidden sm:ring-1 sm:ring-white/10 sm:shadow-[0_8px_25px_rgba(0,0,0,0.25)]">
        <div className="aspect-[14/10] sm:aspect-[16/9] lg:aspect-[28/9]">
          <iframe
            title="Mapa de localização - Praia Grande, Ubatuba"
            src={src}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </div>

    </section>
  );
}
