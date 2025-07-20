import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
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
    const src = `/assets/img/${pasta}/${prefixo}${numero}.jpg`;
    return { src, alt: `Imagem ${numero}` };
  });

  return (
    <section className="carousel scroll-animate py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <Swiper
          key={slug} // ✅ forçando reset ao trocar de apê
          modules={[Navigation, Pagination, Autoplay]}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          className="rounded-xl overflow-hidden bg-[#00263e]"
        >
          {imagens.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={img.src}
                alt={img.alt}
                width={900}
                height={600}
                className="w-full h-[450px] object-contain"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
