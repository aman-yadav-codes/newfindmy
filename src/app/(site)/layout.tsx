import type { ReactNode } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
