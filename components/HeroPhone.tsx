import type { ReactNode } from "react";
import AppScreen from "./AppScreen";

// One phone frame for the whole site (OLG-251, OLG-254, OLG-263). The frame
// art is 768 by 1600. Its screen opening sits at x 33.25 to 735.25 and
// y 36.75 to 1562.75, with continuous (squircle) corners. The screen is
// clipped by phone-screen-mask.png, which is that opening traced from the
// rendered frame and grown 2 units so it tucks under the black border. A CSS
// border radius cannot match those corners, which is what left slivers of
// background showing at the corners before.
export function PhoneFrame({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative aspect-[768/1600] ${className ?? ""}`}>
      <div className="phone-screen absolute inset-0 bg-[#0D1220]">
        <div className="absolute left-[4.33%] top-[2.297%] h-[95.375%] w-[91.406%] overflow-hidden">
          {children}
        </div>
      </div>
      {/* Below desktop width the frame is a flat image of the same art
          (phone-frame.webp, 1536 by 3200, drawn from the SVG). The SVG has
          12 blur filters and 2 masks, and iPhone Safari draws those at low
          resolution when the phone is small, which left jagged corners with
          a pale square behind them (OLG-286). Desktop keeps the SVG. */}
      <picture className="contents">
        <source media="(min-width: 1024px)" srcSet="/iPhone17ProDeepBlue.svg" />
        <img
          src="/phone-frame.webp"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full select-none"
          draggable={false}
        />
      </picture>
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
