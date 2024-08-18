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
            <Toaster/>
          </FormProvider>
        </Providers>
      </body>
    </html>
  );
}
