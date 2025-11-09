import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "One Clash Fighters",
    short_name: "One Clash Fighters",
    description: "Ultimate retro-style fighting game",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#ff6b00",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
