"use client";

import { useEffect, useRef, useState } from "react";

// Muted looping video that downloads only when it comes near the viewport.
// A copy hidden by CSS (display none) never intersects, so it never loads.
export default function LazyVideo({
  src,
  className,
  poster,
}: {
  src: string;
  className?: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (active) ref.current?.play().catch(() => {});
  }, [active]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      className={className}
      src={active ? src : undefined}
    />
  );
}
