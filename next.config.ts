import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-tabs",
      "@radix-ui/react-select",
      "@radix-ui/react-slot",
      "@radix-ui/react-switch",
      "@radix-ui/react-slider",
      "@radix-ui/react-avatar",
      "@radix-ui/react-separator",
      "@radix-ui/react-label",
      "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-collapsible",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-radio-group",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-toggle",
      "@radix-ui/react-toggle-group",
      "sonner",
      "class-variance-authority",
      "zustand",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
