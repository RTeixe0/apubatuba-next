import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-[#003c63] to-[#00263e] text-[var(--text)] text-center px-4 pt-8 pb-4 shadow-inner scroll-animate">
      <div
        className="border-t border-white/20 w-full mb-6"
        role="presentation"
      />

      <div className="flex flex-wrap justify-center items-center max-w-4xl mx-auto gap-6 pb-6">
        {/* Logo e Slogan */}
        <div className="text-center flex-1 min-w-[250px] text-base">
          <div className="inline-block p-2 rounded-full bg-[radial-gradient(circle_at_center,_#003c63_50%,_transparent_100%)] shadow-[0_0_10px_rgba(0,119,182,0.6)] mb-2">
            <Image
              src="/assets/img/logo.png"
              alt="Logo do ap_ubatuba_gisellypaulogaiotto"
              width={90}
              height={90}
              className="rounded-full mx-auto drop-shadow"
              loading="lazy"
            />
          </div>
          <p className="text-base opacity-85 mt-2 font-medium">
            Hospedagem de qualidade em Ubatuba 🌴
          </p>
        </div>

        {/* Redes sociais */}
        <div className="text-center flex-1 min-w-[250px] text-base">
          <p className="text-base opacity-85 mb-2 font-medium">
            Conecte-se com a gente
          </p>
          <div className="flex justify-center gap-6 mt-2">
            <a
              href="https://www.instagram.com/ap_ubatuba_gisellypaulogaiotto/"
              target="_blank"
              aria-label="Instagram"
            >
              <svg
                className="w-7 h-7 text-[var(--accent)] hover:scale-110 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/gisellypaulo.gaiotto.7/"
              target="_blank"
              aria-label="Facebook"
            >
              <svg
                className="w-7 h-7 text-[var(--accent)] hover:scale-110 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256z"
                />
              </svg>
            </a>
            <a
              href="https://wa.me/5519997341037?text=Ol%C3%A1!%20Seja%20muito%20bem-vindo(a)!%20%F0%9F%98%8A%20Agradecemos%20pelo%20seu%20contato.%20Para%20que%20possamos%20atend%C3%AA-lo(a)%20da%20melhor%20forma,%20poderia,%20por%20gentileza,%20informar%20o%20n%C3%BAmero%20de%20pessoas%20e%20a%20data%20desejada%20para%20a%20sua%20estadia%3F"
              target="_blank"
              aria-label="WhatsApp"
            >
              <svg
                className="w-7 h-7 text-[var(--accent)] hover:scale-110 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                />
              </svg>
            </a>
            <a
              href="https://linktr.ee/ap_ubatuba_gisellypaulogaiotto"
              target="_blank"
              aria-label="Linktree"
            >
              <svg
                className="w-7 h-7 text-[var(--accent)] hover:scale-110 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m13.73635 5.85251 4.00467-4.11665 2.3248 2.3808-4.20064 4.00466h5.9085v3.30473h-5.9365l4.22865 4.10766-2.3248 2.3338L12.0005 12.099l-5.74052 5.76852-2.3248-2.3248 4.22864-4.10766h-5.9375V8.12132h5.9085L3.93417 4.11666l2.3248-2.3808 4.00468 4.11665V0h3.4727zm-3.4727 10.30614h3.4727V24h-3.4727z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="text-sm opacity-80 leading-relaxed mt-6 px-2">
        <address className="not-italic">
          © 2025{" "}
          <span className="font-semibold">ap_ubatuba_gisellypaulogaiotto</span>{" "}
          – CRECI 79.294-F – Praia Grande, Ubatuba/SP
        </address>
        <p className="mt-1">
          Desenvolvido por{" "}
          <a
            href="https://github.com/RTeixe0"
            target="_blank"
            rel="noopener"
            className="font-semibold underline decoration-dotted underline-offset-2 transition-all duration-200 hover:text-[var(--accent)] hover:drop-shadow-[0_0_6px_var(--accent)]"
          >
            Renan Teixeira
          </a>
        </p>
      </div>
    </footer>
  );
}
