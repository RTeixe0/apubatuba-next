type MapaProps = {
  src: string;
};

export function Mapa({ src }: MapaProps) {
  return (
    <section className="scroll-animate py-10 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl text-center font-bold text-[#ffd43b] mb-6">Localização</h2>
      <div className="w-full h-[350px] rounded-xl overflow-hidden shadow-md border border-white/10">
        <iframe
          src={src}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          className="w-full h-full"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
