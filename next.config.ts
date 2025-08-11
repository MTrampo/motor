import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'brimages.copart.com.br',
        port: '',
        pathname: '/Repository/**',
      },
      // Se você tiver outros domínios de imagem, adicione-os aqui
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.outrodomio.com.br',
      // },
    ],
  },
};

export default nextConfig;
