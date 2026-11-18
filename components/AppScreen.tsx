import Image from "next/image";

// The hero phone screen. A still of the current app dashboard (Beta v.2
// Mobile Dashboard, Figma node 52:93, greeting set to a sample name and the
// last tab labeled OI) that drifts down to the watchlist and back. Status
// bar and tab bar stay pinned like the app. Replaces appflow.mp4 (OLG-221).
// Reduced motion keeps it still at the top.
const SIZES = "(min-width: 1024px) 330px, (min-width: 768px) 130px, 95px";

export default function AppScreen({ className }: { className?: string }) {
  return (
    <div className={`overflow-hidden bg-[#0D1220] ${className ?? ""}`}>
      <div className="flex h-full w-full flex-col">
        <Image
          src="/hero-dashboard-status.webp"
          alt=""
          width={780}
          height={84}
          sizes={SIZES}
          priority
          className="block h-auto w-full shrink-0 select-none"
          draggable={false}
        />
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div className="app-screen-drift absolute inset-x-0 top-0">
            <Image
              src="/hero-dashboard.webp"
              alt="The Ology dashboard, with the daily window, Clarity Index, market mood and watchlist."
              width={780}
              height={3446}
              sizes={SIZES}
              priority
              className="block h-auto w-full select-none"
              draggable={false}
            />
          </div>
          <Image
            src="/hero-dashboard-tabs.webp"
            alt=""
            width={780}
            height={164}
            sizes={SIZES}
            priority
            className="absolute inset-x-0 bottom-0 block h-auto w-full select-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
