import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { FormProvider } from "@/lib/FormContext";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devpage",
  description: "Build and share a sleek, one-page portfolio that connects your projects, skills, and social links effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Devpage" />
        <meta
          property="og:description"
          content="Build and share a sleek, one-page portfolio that connects your projects, skills, and social links effortlessly."
        />
        <meta property="og:image" content="https://www.devpage.in/favicon.ico" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "url": "https://www.devpage.in",
              "logo": "https://www.devpage.in/favicon.ico",
              "name": "Devpage",
            }),
          }}
        />
      </Head>
      <body className={inter.className}>
        <Providers>
          <FormProvider>
            {children}
            <Toaster/>
          </FormProvider>
        </Providers>
      </body>
    </html>
  );
}
