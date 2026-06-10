import type { MetadataRoute } from "next";

// PWA / install manifest. Next auto-links this at /manifest.webmanifest and
// pulls icons from public/brand. theme_color = brand primary navy (#071A3D).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Heirmos",
    short_name: "Heirmos",
    description: "여러 AI 가 공유하는 영구 기억",
    start_url: "/",
    display: "standalone",
    background_color: "#050b1a",
    theme_color: "#071A3D",
    icons: [
      {
        src: "/brand/heirmos-favicon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
      {
        src: "/brand/heirmos-favicon-512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "any",
      },
      {
        src: "/brand/heirmos-maskable-512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
    ],
  };
}
