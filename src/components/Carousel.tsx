import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

type CarouselProps = {
  pasta: string;
  prefixo: string;
  total: number;
  slug: string; // ✅ novo
};

export function Carousel({ pasta, prefixo, total, slug }: CarouselProps) {
  const imagens = Array.from({ length: total }, (_, i) => {
    const numero = i + 1;
    const src = `/assets/img/${pasta}/${prefixo}${numero}.webp`;
    return { src, alt: `Imagem ${numero}` };
  });

  return (
    <section className="carousel scroll-animate py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <Swiper
          key={slug}
          modules={[Navigation, Autoplay]}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          className="rounded-xl overflow-hidden"
        >
          {imagens.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full aspect-[16/9]">
                {" "}
                {/* controla o tamanho com proporção */}
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 900px"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
