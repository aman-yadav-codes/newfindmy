import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { GridBackground } from "@/components/shared/GridBackground";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://glass-ui.crenspire.com"),
  title: "Glass UI - Component Library | Apple-Inspired Liquid Glassmorphism",
  description:
    "A modern, high-performance glassmorphic component library inspired by Apple's design language, built with Next.js 16, React 19, Radix UI primitives, and Tailwind CSS v4.",
  keywords: [
    "glassmorphism",
    "glass ui",
    "next.js 16",
    "react 19",
    "tailwind css v4",
    "apple design",
    "liquid glass",
    "radix ui",
    "components",
  ],
  authors: [{ name: "Crenspire Technologies" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Glass UI - Component Library | Liquid Glassmorphism",
    description:
      "A modern, high-performance glassmorphic component library inspired by Apple's design language, built with Next.js 16 and React 19.",
    url: "https://glass-ui.crenspire.com",
    siteName: "Glass UI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glass UI - Component Library",
    description: "Apple-inspired liquid glassmorphic components for React 19 and Next.js 16.",
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
          <GridBackground />
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
