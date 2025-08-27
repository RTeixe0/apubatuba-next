// src/pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { pageview, trackLinkClick, trackButtonClick } from "@/lib/gtag";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Pageviews do GA4 em mudanças de rota
  useEffect(() => {
    const handleRouteChange = (url: string) => pageview(url);

    // dispara na carga inicial
    pageview(window.location.pathname + window.location.search);

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // Delegação global de cliques (anchors e botões)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;

      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (anchor) {
        trackLinkClick(anchor);
        return;
      }

      const button = target.closest("button") as HTMLButtonElement | null;
      if (button) {
        trackButtonClick(button);
        return;
      }
    };

    // capture:true garante que pegamos o clique antes da navegação
    document.addEventListener("click", handler, { capture: true });
    return () =>
      document.removeEventListener("click", handler, { capture: true });
  }, []);

  return (
    <>
      {/* 🔧 Meta global comum a todas as páginas */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
