"use client";

import { useState, useEffect, useRef, type RefObject } from "react";
import dynamic from "next/dynamic";

const DynamicVariants = dynamic(
  () =>
    import("@/components/custom/InteractiveVariantsSection").then(
      (m) => m.InteractiveVariantsSection
    ),
  { ssr: false }
);

const DynamicDemos = dynamic(
  () =>
    import("@/components/custom/InteractiveDemoSection").then(
      (m) => m.InteractiveDemoSection
    ),
  { ssr: false }
);

function useNearViewport(ref: RefObject<HTMLDivElement | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return visible;
}

export function InteractiveVariantsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldRender = useNearViewport(containerRef);

  return (
    <div ref={containerRef} className="min-h-[300px]">
      {shouldRender ? (
        <DynamicVariants />
      ) : (
        <div
          className="max-w-3xl mx-auto h-64 glass-bg rounded-xl border border-[var(--glass-border)] opacity-60"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export function InteractiveDemoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldRender = useNearViewport(containerRef);

  return (
    <div ref={containerRef} className="min-h-[160px]">
      {shouldRender ? (
        <DynamicDemos />
      ) : (
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-bg rounded-lg h-24 border border-[var(--glass-border)] opacity-60"
              aria-hidden="true"
            />
          ))}
        </div>
      )}
    </div>
  );
}
