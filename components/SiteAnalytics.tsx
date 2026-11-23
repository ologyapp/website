"use client";

import { Analytics } from "@vercel/analytics/next";

// OLG-282. The link to /baseline carries the member's email so the form
// can fill it in. That address never goes to analytics: it is taken out
// of every page view before the view is sent.
export default function SiteAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        try {
          const url = new URL(event.url);
          if (!url.searchParams.has("email")) return event;
          url.searchParams.delete("email");
          return { ...event, url: url.toString() };
        } catch {
          return event;
        }
      }}
    />
  );
}
