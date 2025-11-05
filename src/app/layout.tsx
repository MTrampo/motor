import type { Metadata } from "next";
import { inter, lexend } from "@/commons/styles/fonts";
import "@/commons/styles/globals.css";
import { PwaMetaTags } from "@/pwa/meta-tags";
import { Toaster } from "@/components/ui/sonner";
import UserProvider from "@/contexts/user";

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
        className={`${inter.variable} ${lexend.variable} antialiased`}
      >
        <UserProvider>
          {children}
        </UserProvider>
        <Toaster richColors position="top-right"/>
      </body>
    </html>
  );
}
