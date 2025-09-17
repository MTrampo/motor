import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "mt.motor.app",
    lang: "pt-BR",
    name: "Motor",
    short_name: "Motor",
    description: "Uma plataforma de gerenciamento e gestão veicular.",
    start_url: "/",
    background_color: "#00abed",
    theme_color: "#ffffff",
    display: "standalone",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      }
    ]
  }
}