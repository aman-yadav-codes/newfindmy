"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type { MobileFilterDrawer as MobileFilterDrawerComponent } from "./MobileFilterDrawer";

export const LazyMobileFilterDrawer = dynamic(
  () => import("./MobileFilterDrawer").then((mod) => mod.MobileFilterDrawer),
  { ssr: false }
);

export type LazyMobileFilterDrawerProps = ComponentProps<typeof MobileFilterDrawerComponent>;
