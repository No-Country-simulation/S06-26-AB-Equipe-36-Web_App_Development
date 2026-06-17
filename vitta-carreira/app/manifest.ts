import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vitta Carreira",
    short_name: "Vitta",
    description: "Sua plataforma de orientação de carreira e bem-estar.",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1814",
    theme_color: "#1a1814",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
