import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta
          name="google-site-verification"
          content="J3QPGyjzLX5BKieF-b8qE7-_93zc-Mww8Xk-XS0Lssk"
        />

        {/* SEO técnico */}
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#003c63" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="64x64" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
