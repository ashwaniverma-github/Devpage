import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { FormProvider } from "@/lib/FormContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devpage",
  description: "Build and share a sleek, one-page portfolio that connects your projects, skills, and social links effortlessly.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Devpage",
    description: "Build and share a sleek, one-page portfolio that connects your projects, skills, and social links effortlessly.",
    images: [
      {
        url: "https://www.devpage.in/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Devpage Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <FormProvider>
            {children}
            <Toaster />
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
          </FormProvider>
        </Providers>
      </body>
    </html>
  );
}
