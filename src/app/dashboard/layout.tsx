import type { Metadata } from "next";
import { DashboardShell } from "@/features/dashboard/DashboardShell";

export const metadata: Metadata = {
  title: "Travel Taxonomy Dashboard | FindMy",
  description:
    "Manage travel classification, top-level categories, subtypes, business features, and room attributes.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
