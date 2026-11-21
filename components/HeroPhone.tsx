import AppScreen from "./AppScreen";

// The hero phone (OLG-251). One component for every width, kept at the
// frame's own proportions (768 by 1600) so neither the frame nor the screen
// is ever stretched. The screen is placed in percentages of the frame, so
// the phone can be sized by width or by height from outside.
export default function HeroPhone({ className }: { className?: string }) {
  return (
    <div className={`relative aspect-[768/1600] ${className ?? ""}`}>
      <AppScreen className="absolute left-[3.9%] top-[2%] h-[96%] w-[92.2%] rounded-[24%/11.4%]" />
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
