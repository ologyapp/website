"use client";

import { MotionConfig } from "framer-motion";

// Honors the visitor's reduced motion setting for every animation on the site.
export default function MotionPrefs({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
