import { Suspense } from "react";
import { DashboardClient } from "@/features/dashboard/DashboardClient";

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardClient />
    </Suspense>
  );
}
