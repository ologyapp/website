"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";

const COOKIE_NAME = "ology_referral";
export const UTM_COOKIE = "ology_utm";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

export default function useReferralCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Referral, first touch wins.
    const ref = params.get("ref");
    if (ref && !Cookies.get(COOKIE_NAME)) {
      Cookies.set(COOKIE_NAME, ref, { expires: 30, sameSite: "lax" });
    }

    // Campaign tags, first touch wins, passed to HubSpot with the application.
    const utm = new URLSearchParams();
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) utm.set(key, value);
    }
    if ([...utm.keys()].length && !Cookies.get(UTM_COOKIE)) {
      Cookies.set(UTM_COOKIE, utm.toString(), { expires: 30, sameSite: "lax" });
    }
  }, []);
}
