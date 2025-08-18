import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/commons/styles/globals.css";
import { PwaMetaTags } from "@/pwa/meta-tags";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Motor",
  description: "Uma plataforma de gerenciamento de veículos.",
  appleWebApp: {
    title: "Motor"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <PwaMetaTags/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-right"/>
      </body>
    </html>
  );
}
