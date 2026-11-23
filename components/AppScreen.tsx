import Image from "next/image";

// The hero phone screen (OLG-221, OLG-233). A capture of the live app
// dashboard at 390 wide on Nov 20, 2026, greeting set to a sample name and
// the investor headshot removed. The status bar is drawn here, the app
// header and tab bar stay pinned like the app. The dashboard rests on three
// composed views (greeting, Clarity Index, Watchlist) and glides between
// them, so a card is never cut under the header (OLG-251). Reduced motion
// keeps it still at the top.

function StatusBar() {
  // Placed inside the frame's rounded corners (radius about 98 in these
  // units) and level with the island, like a real status bar (OLG-254).
  return (
    <svg
      viewBox="0 0 390 52"
      className="block h-auto w-full shrink-0"
      aria-hidden
      fill="#F8F7FC"
    >
      <text
        x="88"
        y="35"
        textAnchor="middle"
        fontSize="15"
        fontWeight="600"
        fontFamily="-apple-system, system-ui, sans-serif"
      >
        9:41
      </text>
      {/* Signal */}
      <rect x="272" y="29" width="3" height="5" rx="1" />
      <rect x="277" y="26.5" width="3" height="7.5" rx="1" />
      <rect x="282" y="24" width="3" height="10" rx="1" />
      <rect x="287" y="21.5" width="3" height="12.5" rx="1" />
      {/* Wifi */}
      <path
        d="M297.5 24.6a9.4 9.4 0 0 1 12.8 0M299.9 27.5a5.8 5.8 0 0 1 8 0"
        fill="none"
        stroke="#F8F7FC"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="303.9" cy="31.3" r="1.7" />
      {/* Battery */}
      <rect x="316" y="22.5" width="21" height="11" rx="3.2" fill="none" stroke="#F8F7FC" strokeOpacity="0.45" strokeWidth="1" />
      <rect x="317.8" y="24.3" width="17.4" height="7.4" rx="1.8" />
      <path d="M338.4 26.2v3.6a1.8 1.8 0 0 0 0-3.6Z" fillOpacity="0.45" />
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
          priority
          unoptimized
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
              priority
              unoptimized
              className="block h-auto w-full select-none"
              draggable={false}
            />
          </div>
          {/* Tab bar sits above the home indicator area, clear of the
              rounded corners, like the app on a real phone (OLG-254). */}
          <div className="absolute inset-x-0 bottom-0 bg-[#0E131F] pb-[8.5%]">
            <Image
              src="/hero-dashboard-tabs.webp"
              alt=""
              width={780}
              height={148}
              priority
              unoptimized
              className="block h-auto w-full select-none px-[3%]"
              draggable={false}
            />
            {/* Home indicator, desktop only. At phone size the 3px bar was
                too heavy for the small frame (OLG-286). */}
            <div className="absolute bottom-[2.6%] left-1/2 hidden h-[3px] w-[34%] -translate-x-1/2 rounded-full bg-[#F8F7FC]/70 lg:block" />
          </div>
        </div>
      </div>
    </div>
  );
}
