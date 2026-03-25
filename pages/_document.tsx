import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <meta name="description" content="NextStore - Premium Product Catalog built with Next.js" />
      </Head>
      <body className="antialiased font-['Inter'] selection:bg-blue-100 selection:text-blue-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
