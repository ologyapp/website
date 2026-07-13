"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";

const COOKIE_NAME = "ology_referral";

export default function useReferralCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");

    // No referral in URL
    if (!ref) return;

    // First touch wins - don't overwrite an existing cookie
    if (!Cookies.get(COOKIE_NAME)) {
      Cookies.set(COOKIE_NAME, ref, {
        expires: 30, // 30 days
        sameSite: "lax",
      });

      console.log("Referral saved:", ref);
    }
  }, []);
}
