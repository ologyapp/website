import Image from "next/image";

// The hero phone screen (OLG-221, OLG-233). A capture of the live app
// dashboard at 390 wide on Nov 20, 2026, greeting set to a sample name and
// the investor headshot removed. The status bar is drawn here, the app
// header and tab bar stay pinned like the app. The dashboard rests on three
// composed views (greeting, Clarity Index, Watchlist) and glides between
// them, so a card is never cut under the header (OLG-251). Reduced motion
// keeps it still at the top.
const SIZES = "(min-width: 768px) 320px, 260px";

function StatusBar() {
  return (
    <svg
      viewBox="0 0 390 44"
      className="block h-auto w-full shrink-0"
      aria-hidden
      fill="#F8F7FC"
    >
      <text x="42" y="29" fontSize="16" fontWeight="600" fontFamily="-apple-system, system-ui, sans-serif">
        9:41
      </text>
      {/* Signal */}
      <rect x="292" y="22" width="3.5" height="5" rx="1" />
      <rect x="297.5" y="19.5" width="3.5" height="7.5" rx="1" />
      <rect x="303" y="17" width="3.5" height="10" rx="1" />
      <rect x="308.5" y="14.5" width="3.5" height="12.5" rx="1" />
      {/* Wifi */}
      <path
        d="M326 17.2a10.4 10.4 0 0 1 14.2 0M328.6 20.4a6.4 6.4 0 0 1 9 0"
        fill="none"
        stroke="#F8F7FC"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="333.1" cy="24.6" r="1.9" />
      {/* Battery */}
      <rect x="347" y="14.5" width="23" height="12" rx="3.5" fill="none" stroke="#F8F7FC" strokeOpacity="0.45" strokeWidth="1" />
      <rect x="349" y="16.5" width="19" height="8" rx="2" />
      <path d="M371.5 18.6v4a2 2 0 0 0 0-4Z" fillOpacity="0.45" />
    </svg>
  );
}

export default function AppScreen({ className }: { className?: string }) {
  return (
    <div className={`overflow-hidden bg-[#0D1220] ${className ?? ""}`}>
      <div className="flex h-full w-full flex-col">
        <StatusBar />
        <Image
          src="/hero-dashboard-header.webp"
          alt=""
          width={780}
          height={110}
          sizes={SIZES}
          priority
          className="block h-auto w-full shrink-0 select-none"
          draggable={false}
        />
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div className="app-screen-drift absolute inset-x-0 top-0">
            <Image
              src="/hero-dashboard.webp"
              alt="The Ology dashboard, with the day's window, Clarity Index, market mood and watchlist."
              width={780}
              height={3240}
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
            height={148}
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
