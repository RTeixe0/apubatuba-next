import Masonry from "react-masonry-css";
import { useState, useMemo } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

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

  const breakpointColumnsObj = {
    default: 3,
    1024: 3,
    768: 2,
    500: 1,
  };

  return (
    <section className="scroll-animate py-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl text-center font-bold text-[#ffd43b] mb-6">
        Galeria de Fotos
      </h2>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4"
        columnClassName="space-y-4"
      >
        {slides.map((img, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className="cursor-zoom-in overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={600}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
              className="w-full h-auto object-cover rounded"
              placeholder="empty"
            />
          </div>
        ))}
      </Masonry>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Zoom]}
      />
    </section>
  );
}
