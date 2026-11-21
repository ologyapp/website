import type { ReactNode } from "react";
import AppScreen from "./AppScreen";

// One phone frame for the whole site (OLG-251, OLG-254). The frame art is
// 768 by 1600 and its screen opening is measured from the SVG itself:
// x 33.2 to 735.2, y 36.7 to 1562.9, corner radius 176. The box keeps that
// ratio at every size, so the frame is never stretched, and the screen sits
// exactly in the opening.
export function PhoneFrame({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative aspect-[768/1600] ${className ?? ""}`}>
      <div className="absolute left-[4.32%] top-[2.29%] h-[95.39%] w-[91.4%] overflow-hidden rounded-[25.1%/11.55%] bg-[#0D1220]">
        {children}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/iPhone17ProDeepBlue.svg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
        draggable={false}
      />
    </div>
  );
}

export default function HeroPhone({ className }: { className?: string }) {
  return (
    <PhoneFrame className={className}>
      <AppScreen className="h-full w-full" />
    </PhoneFrame>
  );
}
