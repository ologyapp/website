// Site state. "prelaunch" until the Nov 30 go call, then "live".
// Set NEXT_PUBLIC_SITE_STATE in Vercel and redeploy to switch.
export const SITE_LIVE = process.env.NEXT_PUBLIC_SITE_STATE === "live";

export const BETA_URL = "https://beta.ologyapp.com";
