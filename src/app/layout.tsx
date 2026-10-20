import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { AuroraBackground } from "@/components/shared/AuroraBackground";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://newfindmy.local"),
  title: "FindMy | Discover the Best of South Africa",
  description:
    "Discover the best of South Africa with FindMy. Explore local food, travel, services, property, events and cars with a natural search experience.",
  keywords: ["South Africa", "local discovery", "food", "travel", "services", "property", "events", "cars"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FindMy | Discover the Best of South Africa",
    description: "Explore local food, travel, services, property, events and cars across South Africa.",
    url: "/",
    siteName: "FindMy",
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FindMy | Discover South Africa",
    description: "Find local places, services and experiences across South Africa.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="font-sans antialiased min-h-screen flex flex-col bg-transparent text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <AuroraBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
