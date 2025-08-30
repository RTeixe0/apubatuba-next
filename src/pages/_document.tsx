// src/pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

const GA_ID = "G-DX787P6VLW";

export default function Document() {
  return (
    <Html lang="pt-BR" dir="ltr">
      <Head>
        {/* 🧠 SEO técnico e acessibilidade */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Dica explícita para miniaturas grandes na SERP */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta
          name="googlebot"
          content="index, follow, max-image-preview:large"
        />
        <meta name="theme-color" content="#003c63" />
        <meta name="color-scheme" content="light dark" />
        <meta
          name="format-detection"
          content="telephone=no,address=no,email=no"
        />
        <meta name="referrer" content="origin-when-cross-origin" />

        {/* 📱 Favicons e PWA */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
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

        {/* ⚡ Hints de performance */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* 📈 Google Analytics 4 */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `,
          }}
        />

        {/* 🏷️ JSON-LD: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Ap Ubatuba Locação Temporada",
              url: "https://apubatubapraiagrande.com.br/",
              logo: "https://apubatubapraiagrande.com.br/favicon-180x180.png",
              image: ["https://apubatubapraiagrande.com.br/share-card.webp"],
              sameAs: [
                "https://www.instagram.com/ap_ubatuba_gisellypaulogaiotto/",
                "https://www.facebook.com/gisellypaulo.gaiotto.7/",
                "https://linktr.ee/ap_ubatuba_gisellypaulogaiotto",
              ],
            }),
          }}
        />

        {/* 🏷️ JSON-LD: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Ap Ubatuba",
              url: "https://apubatubapraiagrande.com.br/",
              inLanguage: "pt-BR",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://apubatubapraiagrande.com.br/?s={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* 🏷️ JSON-LD: LodgingBusiness (negócio principal do site) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: "Ap Ubatuba Locação Temporada",
              alternateName: "Ap Ubatuba",
              url: "https://apubatubapraiagrande.com.br/",
              logo: "https://apubatubapraiagrande.com.br/favicon-180x180.png",
              image: ["https://apubatubapraiagrande.com.br/share-card.webp"],
              photo: ["https://apubatubapraiagrande.com.br/share-card.webp"],
              areaServed: "Ubatuba, SP, Brasil",
              sameAs: [
                "https://www.instagram.com/ap_ubatuba_gisellypaulogaiotto/",
                "https://www.facebook.com/gisellypaulo.gaiotto.7/",
                "https://linktr.ee/ap_ubatuba_gisellypaulogaiotto",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  telephone: "+55 19 99734-1037",
                  availableLanguage: ["pt-BR"],
                  areaServed: "Ubatuba, SP, Brasil",
                  url: "https://api.whatsapp.com/send/?phone=5519997341037&text=Ol%C3%A1%21+Seja+muito+bem-vindo%28a%29%21+%EF%BF%BD+Agradecemos+pelo+seu+contato.+Para+que+possamos+atend%C3%AA-lo%28a%29+da+melhor+forma%2C+poderia%2C+por+gentileza%2C+informar+o+n%C3%BAmero+de+pessoas+e+a+data+desejada+para+a+sua+estadia%3F&type=phone_number&app_absent=0",
                },
              ],
            }),
          }}
        />
      </Head>

      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
