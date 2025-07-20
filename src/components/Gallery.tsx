import Image from "next/image";
import { useState, useMemo } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


type GalleryProps = {
  pasta: string;
  prefixo: string;
  total: number;
};

export function Gallery({ pasta, prefixo, total }: GalleryProps) {
  const [index, setIndex] = useState(-1);

  const slides = useMemo(
    () =>
      Array.from({ length: total }, (_, i) => ({
        src: `/assets/img/${pasta}/${prefixo}${i + 1}.jpg`,
        alt: `Foto ${i + 1}`,
      })),
    [pasta, prefixo, total]
  );

  return (
    <section className="scroll-animate py-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl text-center font-bold text-[#ffd43b] mb-6">
        Galeria de Fotos
      </h2>
      <div className="columns-1 sm:columns-2 md:columns-3 gap-3 space-y-3">
        {slides.map((img, i) => (
          <div
            key={i}
            className="w-full break-inside-avoid overflow-hidden rounded-lg cursor-zoom-in"
            onClick={() => setIndex(i)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </section>
  );
}
