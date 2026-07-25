"use client";
import Image from "next/image";
import a1 from "../public/a1.png";
import a2 from "../public/a2.png";
import a3 from "../public/a3.png";
import a4 from "../public/a4.png";
import a5 from "../public/a5.png";
import a6 from "../public/a6.png";

import b1 from "../public/b1.png";
import b2 from "../public/b2.png";
import b3 from "../public/b3.png";
import b4 from "../public/b4.png";
import b5 from "../public/b5.png";
import b6 from "../public/b6.png";

import c1 from "../public/c1.png";
import c2 from "../public/c2.png";
import c3 from "../public/c3.png";
import c4 from "../public/c4.png";
import c5 from "../public/c5.png";
import c6 from "../public/c6.png";

import d1 from "../public/d1.png";
import d2 from "../public/d2.png";
import d3 from "../public/d3.png";
import d4 from "../public/d4.png";
import d5 from "../public/d5.png";
import d6 from "../public/d6.png";

import e1 from "../public/e1.png";
import e2 from "../public/e2.png";
import e3 from "../public/e3.png";
import e4 from "../public/e4.png";
import e5 from "../public/e5.png";
import e6 from "../public/e6.png";
import iphone from "../public/iphoneMockup.svg";
import useReferralCapture from "../hooks/useReferralCapture";
import Cookies from "js-cookie";
import { flushSync } from "react-dom";

import {
  signalAhead,
  cyclesCards,
  confirmedSignals,
  missingLayers,
} from "@/mockData";
import {
  statusOf,
  cardStyle,
  railDotStyle,
  sortedRails,
} from "../components/cardMeta";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CloudDownload,
  Loader2,
  Menu,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { ChevronDownIcon, X } from "lucide-react";
import { Calendar } from "../components/ui/calendar";
import { format } from "date-fns";
import { createPortal } from "react-dom";
import synopsis from "../components/synopsis.json";
import { toPng } from "html-to-image";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
  EffectCoverflow,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

//removed /images
import {
  ZodiacAries,
  ZodiacTaurus,
  ZodiacGemini,
  ZodiacCancer,
  ZodiacLeo,
  ZodiacVirgo,
  ZodiacLibra,
  ZodiacScorpio,
  ZodiacSagittarius,
  ZodiacCapricorn,
  ZodiacAquarius,
  ZodiacPisces,
} from "lucide-react";
import FAQAccordion from "../components/FaqAccordion";
import Link from "next/link";
import CardCarousel from "../components/CardCarousel";

const images = [
  a1,
  a2,
  a3,
  a4,
  a5,
  a6,
  b1,
  b2,
  b3,
  b4,
  b5,
  b6,
  c1,
  c2,
  c3,
  c4,
  c5,
  c6,
  d1,
  d2,
  d3,
  d4,
  d5,
  d6,
  e1,
  e2,
  e3,
  e4,
  e5,
  e6,
];

const mobileImages = [
  a4,
  e2,
  a6,
  b6,
  a1,
  b3,
  e1,
  d4,
  d1,
  e3,
  d2,
  b2,
  c5,
  d6,
  b5,
  c6,
  e4,
  a2,
];

const SectionReveal = ({ children }: { children: React.ReactNode }) => (
  <motion.section
    initial={{
      opacity: 0,
      y: 32,
      scale: 0.985,
    }}
    whileInView={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    viewport={{
      once: true,
      amount: 0.2,
    }}
    transition={{
      type: "spring",
      stiffness: 70,
      damping: 22,
      mass: 1,
    }}
    className="relative w-full flex justify-center"
  >
    {children}
  </motion.section>
);

function getTemporalState(status?: string): "past" | "current" | "future" {
  if (status === "ACTIVE") return "current";
  if (status === "COMING" || status === "UPCOMING") return "future";
  return "past"; // RECORD, or anything else
}

function getStatusColor(state: "past" | "current" | "future") {
  switch (state) {
    case "current":
      return "#7DD3C0"; // live — teal
    case "future":
      return "#E89B7F"; // upcoming — amber
    case "past":
      return "rgba(248, 247, 252, 0.45)"; // dimmed neutral
  }
}

function MouseTracker({ onMove }: { onMove: (x: number, y: number) => void }) {
  useEffect(() => {
    const handler = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [onMove]);
  return null;
}

export default function Home() {
  const [isLocked, setIsLocked] = useState(false);
  const [data, setData] = useState<any>({});
  const [date, setDate] = React.useState<Date | null>(null);
  const [time, setTime] = React.useState("");
  const [showModal, setShowModal] = useState(false);
  const [openDate, setOpenDate] = React.useState(false);
  const [openTime, setOpenTime] = React.useState(false);
  const [ampm, setAmpm] = React.useState<"AM" | "PM">("AM");
  const [showSpinner, setShowSpinner] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [referralLink, setReferralLink] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [formatted, setFormatted] = React.useState<{
    dob: string;
    time: string;
  } | null>(null);

  const [openLocation, setOpenLocation] = useState(false);

  const [timeUnknown, setTimeUnknown] = useState(false);

  const [visibleCount, setVisibleCount] = useState(18);
  const CARDS_PER_LOAD = 3;
  const INITIAL_COUNT = 3;
  const visibleCards = cyclesCards.slice(0, visibleCount);
  const hasMore = visibleCount < cyclesCards.length;
  const isExpanded = visibleCount >= cyclesCards.length;
  const shouldShowToggle = cyclesCards.length > INITIAL_COUNT;

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      // slight delay so the DOM/sections have mounted before we try to scroll
      const timeout = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, []);

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const cardScrollRef = useRef<HTMLDivElement>(null);

  const handleCardScroll = () => {
    if (!cardScrollRef.current) return;
    const { scrollLeft, clientWidth } = cardScrollRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveCardIndex(index);
  };

  // Reset active index if visibleCards shrinks (e.g. "Show Fewer")
  useEffect(() => {
    if (activeCardIndex > visibleCards.length - 1) {
      setActiveCardIndex(0);
      cardScrollRef.current?.scrollTo({ left: 0 });
    }
  }, [visibleCards.length, activeCardIndex]);

  const [copied, setCopied] = useState(false);

  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");

  const [isLg, setIsLg] = useState(false);

  const phoneMock = "/iPhone17ProDeepBlue.svg";

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    const update = () => setIsLg(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  const [aheadOpen, setAheadOpen] = useState(true);
  const [recordOpen, setRecordOpen] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const [showNatalForm, setShowNatalForm] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const ITEM_HEIGHT = 48; // h-12

  useReferralCapture();

  async function submitWaitlist() {
    if (!names || !email || !formatted) {
      return { success: false, error: "Name and email are required" };
    }

    const referredBy = Cookies.get("ology_referral") || "";

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/waitlist`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            names,
            email,
            dob: formatted?.dob,
            referredBy,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || "Something went wrong");
      }

      return data; // { success: true, message: "Added to waitlist" }
    } catch (err: any) {
      console.error("Waitlist submit failed:", err);
      return { success: false, error: err.message };
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000); // Revert after ~2 seconds
    } catch (error) {
      console.error("Failed to copy referral link:", error);
    }
  };

  //   referralCode,
  // archetype,
  // imageUrl,

  const [showLogoOnModal, setShowLogoOnModal] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);
  const [hideDivider, setHideDivider] = useState(false);
  const [hideFooterLogo, setHideFooterLogo] = useState(false);

  // Waits for the browser to actually paint the current DOM state
  // before continuing — two rAFs is the reliable way to do this.

  function waitForPaint() {
    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => resolve());
      });
    });
  }

  // Helper: converts any image URL to a data URL using a canvas (bypasses html-to-image's internal fetch entirely)
  async function imageUrlToDataUrl(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new window.Image(); // explicitly native, not next/image
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  const [posterDataSrc, setPosterDataSrc] = useState<string | null>(null);

  // const handleShare = async () => {
  //   if (!cardRef.current) return;
  //   const shareText = `${archetype}. That is what Ology read in my chart. Run yours.`;

  //   try {
  //     setIsDownloading(true);

  //     const posterUrl = getCardPoster(cardType);
  //     const dataSrc = await imageUrlToDataUrl(posterUrl);

  //     flushSync(() => {
  //       setPosterDataSrc(dataSrc); // React now owns this
  //       setShowLogoOnModal(true);
  //       setHideFooter(true);
  //       setHideDivider(true);
  //       setHideFooterLogo(true);
  //     });
  //     await waitForPaint();

  //     const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });

  //     const blob = await (await fetch(dataUrl)).blob();
  //     const file = new File([blob], `${names}-${archetype}-card.png`, {
  //       type: "image/png",
  //     });

  //     if (navigator.share && navigator.canShare?.({ files: [file] })) {
  //       await navigator.share({
  //         title: "My Ology",
  //         text: shareText,
  //         url: referralLink,
  //         files: [file],
  //       });
  //       return;
  //     }

  //     const link = document.createElement("a");
  //     link.download = `${names}-${archetype}-card.png`;
  //     link.href = dataUrl;
  //     link.click();
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setPosterDataSrc(null);
  //     setShowLogoOnModal(false);
  //     setHideFooter(false);
  //     setHideDivider(false);
  //     setHideFooterLogo(false);
  //     setIsDownloading(false);
  //   }
  // };

  // Pre-generate ahead of time (e.g. in a useEffect when showModal becomes true,
  // or right after handleSubmitForm's fetch resolves)
  const [preGeneratedFile, setPreGeneratedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!showModal || !cardRef.current) return;

    (async () => {
      flushSync(() => {
        setShowLogoOnModal(true);
        setHideFooter(true);
        setHideDivider(true);
        setHideFooterLogo(true);
      });
      await waitForPaint();

      const dataUrl = await toPng(cardRef.current!, { pixelRatio: 2 });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `${names}-${archetype}-card.png`, {
        type: "image/png",
      });
      setPreGeneratedFile(file);

      setShowLogoOnModal(false);
      setHideFooter(false);
      setHideDivider(false);
      setHideFooterLogo(false);
    })();
  }, [showModal]);

  // Tap handler is now synchronous and instant
  const handleShare = () => {
    if (!preGeneratedFile) return; // not ready yet — disable button or show spinner until it is

    const shareText = `${archetype}. That is what Ology read in my chart. Run yours.`;

    if (
      navigator.share &&
      navigator.canShare?.({ files: [preGeneratedFile] })
    ) {
      navigator
        .share({
          title: "My Ology",
          text: `${shareText}\n${referralLink}`,
          files: [preGeneratedFile],
        })
        .catch((err) => {
          if (err?.name !== "AbortError") console.error(err);
        });
      return;
    }

    const link = document.createElement("a");
    link.download = `${names}-${archetype}-card.png`;
    link.href = URL.createObjectURL(preGeneratedFile);
    link.click();
  };
  const scrollToItem = (
    ref: React.RefObject<HTMLDivElement | null>,
    index: number,
  ) => {
    if (!ref.current) return;

    ref.current.scrollTo({
      top: index * ITEM_HEIGHT,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    if (!date || !time) return;

    const [timePart, period] = time.split(" ");
    const [h, m] = timePart.split(":");

    let hour = parseInt(h);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    const result = {
      dob: format(date, "yyyy-MM-dd"),
      time: `${String(hour).padStart(2, "0")}:${m}`,
    };

    setFormatted(result);

    console.log("formatted", result);
  }, [date, time]);

  // -----------------------------
  // FIX: proper scroll lock (mobile safe)
  // -----------------------------
  React.useEffect(() => {
    document.body.style.overflow = openDate || openTime ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [openDate, openTime]);

  // -----------------------------
  // DATA
  // -----------------------------
  const hours = React.useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
    [],
  );

  const minutes = React.useMemo(
    () => Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")),
    [],
  );

  const handleScrollSelect = (
    ref: React.RefObject<HTMLDivElement | null>,
    items: string[],
    type: "hour" | "minute" | "ampm",
  ) => {
    const el = ref.current;
    if (!el) return;

    const children = Array.from(el.children) as HTMLElement[];

    const containerCenter = el.scrollTop + el.offsetHeight / 2 - 32; // half of spacer (h-16 = 64px)

    let closestIndex = 0;
    let closestDistance = Infinity;

    children.forEach((child, i) => {
      const childCenter = child.offsetTop + child.offsetHeight / 2;
      const distance = Math.abs(containerCenter - childCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    const value = items[closestIndex];

    if (type === "hour") {
      const m = time.split(":")[1]?.split(" ")[0] || "00";
      setTime(`${value}:${m} ${ampm}`);
    }

    if (type === "minute") {
      const h = time.split(":")[0];
      setTime(`${h}:${value} ${ampm}`);
    }

    if (type === "ampm") {
      const [h, m] = time.split(":");
      const minute = m.split(" ")[0];
      setAmpm(value as "AM" | "PM");
      setTime(`${h}:${minute} ${value}`);
    }
  };

  const hourRef = React.useRef<HTMLDivElement>(null);
  const minuteRef = React.useRef<HTMLDivElement>(null);
  const ampmRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setIsLocked(true);
    }, 2000); // match intro duration

    return () => clearTimeout(t);
  }, []);

  const [unknownTime, setUnknownTime] = useState(false);
  const canProceed =
    formatted?.dob && data.lat && data.lng && (unknownTime || formatted.time);

  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Optional: close input if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        if (!data.time) setShowInput(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [data.time]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [tier, setTier] = useState(1);

  useEffect(() => {
    setOptions({
      key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    });

    importLibrary("places").then(() => {
      setGoogleLoaded(true);
    });
  }, []);

  const handleChange = (value: string) => {
    setData({ ...data, location: value });

    if (!value || !googleLoaded) {
      setSuggestions([]);
      return;
    }

    const service = new (
      window as any
    ).google.maps.places.AutocompleteService();

    console.log("service", service);

    service.getPlacePredictions({ input: value }, (predictions: any[]) => {
      setSuggestions(predictions || []);
    });

    setShowDropdown(true);
  };

  const [loading, setLoading] = useState(false);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const cols = 6;
  const rows = 5;

  const [LINES, setLINES] = useState(11);

  useEffect(() => {
    const updateLines = () => {
      setLINES(window.innerWidth < 720 ? 6 : 11);
    };

    updateLines(); // run on mount

    window.addEventListener("resize", updateLines);

    return () => window.removeEventListener("resize", updateLines);
  }, []);

  const activeLines = useMemo(() => {
    return Array.from({ length: LINES }).map(() => Math.random() > 0.4);
  }, []);

  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("astroResult");

    if (saved) {
      setResult(JSON.parse(saved));
    }
  }, []);

  const handleSubmitForm = async () => {
    if (!canProceed || loading) return;

    // Force iOS to release any lingering zoom/scroll from a focused input
    (document.activeElement as HTMLElement | null)?.blur();

    setShowSpinner(true);

    submitWaitlist();

    try {
      setLoading(true);
      console.log(formatted?.dob, formatted?.time, data.lat, data.lng);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/astro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dob: formatted?.dob,
          time: "12:00",
          lat: data.lat,
          lng: data.lng,
          tier: 1,
          email,
        }),
      });

      const result = await res.json();
      console.log("astro result", result);
      const referralLink = `${window.location.origin}?ref=${result?.referralCode}`;
      setReferralLink(referralLink);

      setReferralCode(result?.referralCode);
      //  downloadExcel(result);
      if (typeof window !== "undefined") {
        localStorage.setItem("astroResult", JSON.stringify(result));
      }

      localStorage.setItem("astroResult", JSON.stringify(result));

      // 🔥 triggers UI update in same tab
      window.dispatchEvent(new Event("astroResultUpdated"));

      setData((prev: any) => ({
        ...prev,
        astroResult: result,
      }));

      setShowModal(!showModal);

      // onNext();
    } catch (err) {
      console.error("Astro API error:", err);
      setShowSpinner(false);
    } finally {
      setLoading(false);
      setShowSpinner(false);
    }
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };

  const astro = {
    sun: data?.astroResult?.archetypeData?.header.sun?.sign?.toLowerCase(),
    moon: data?.astroResult?.archetypeData?.header.moon?.sign?.toLowerCase(),
    rising:
      data?.astroResult?.archetypeData?.header.rising?.sign?.toLowerCase(),
  };

  const archetype = data?.astroResult?.archetypeData?.archetype;
  const Strategy = data?.astroResult?.archetypeData?.summary;
  const tagline = data?.astroResult?.archetypeData?.tagline;
  const bestMarketConditions =
    data?.astroResult?.archetypeData["best_conditions"];
  const copy = data?.astroResult?.copy;
  const dnaMap = data?.astroResult?.archetypeData?.dna;
  const topArchetype = data?.astroResult?.archetypeData?.archetype;
  const description = data?.astroResult?.archetypeData?.summary;
  const cardType = data?.astroResult?.archetypeData?.archetype;

  const synopsisText = synopsis[archetype as keyof typeof synopsis]?.Synopsis;
  const ShadowText = synopsis[archetype as keyof typeof synopsis]?.Shadow;
  // const userName = userInfo?.name;

  const astroSigns = {
    sun: data?.astroResult?.archetypeData?.header?.sun?.sign,
    moon: data?.astroResult?.archetypeData?.header?.moon?.sign,
    rising: data?.astroResult?.archetypeData?.header?.rising?.sign,
    mars: data?.astroResult?.archetypeData?.header?.mars?.sign,
    saturn: data?.astroResult?.archetypeData?.header?.saturn?.sign,
  };

  const getCardBg = (type: string) => {
    if (!type) return "/StatBox.png";

    const fileName = type.replace(/\s+/g, "") + ".mp4";
    console.log("Calibrated Maverick", `/${fileName}`);
    return `/${fileName}`;
  };

  const getCardPoster = (type: string) => {
    if (!type) return "/StatBox.png";

    const fileName = type.replace(/\s+/g, "") + "Card.jpg";
    console.log("fileName", fileName);
    return `/${fileName}`;
  };

  const zodiacIcons = {
    Aries: ZodiacAries,
    Taurus: ZodiacTaurus,
    Gemini: ZodiacGemini,
    Cancer: ZodiacCancer,
    Leo: ZodiacLeo,
    Virgo: ZodiacVirgo,
    Libra: ZodiacLibra,
    Scorpio: ZodiacScorpio,
    Sagittarius: ZodiacSagittarius,
    Capricorn: ZodiacCapricorn,
    Aquarius: ZodiacAquarius,
    Pisces: ZodiacPisces,
  };

  const SunIcon = astroSigns?.sun
    ? zodiacIcons[astroSigns.sun as keyof typeof zodiacIcons]
    : null;

  const MoonIcon = astroSigns?.moon
    ? zodiacIcons[astroSigns.moon as keyof typeof zodiacIcons]
    : null;

  const MarsIcon = astroSigns?.mars
    ? zodiacIcons[astroSigns.mars as keyof typeof zodiacIcons]
    : null;

  const SaturnIcon = astroSigns?.saturn
    ? zodiacIcons[astroSigns.saturn as keyof typeof zodiacIcons]
    : null;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 600,
    damping: 100,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 600,
    damping: 100,
  });

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setIsDownloading(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `${names}  ${archetype}-card.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsDownloading(false);
      setShowNatalForm(false);
      setNames("");
      setEmail("");
    }
  };

  const [activeSection, setActiveSection] = useState("");
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 20) {
        setHasScrolled(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["align", "decode", "perform", "ask"];

    const observer = new IntersectionObserver(
      (entries) => {
        if (!hasScrolled) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hasScrolled]);

  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const heroRef = useRef(null);
  const { scrollY } = useScroll(); // whole-page scroll, not section-relative

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const opacity = useTransform(scrollY, [0, isMobile ? 1000 : 120], [1, 0]);

  // Fade out fast over a very light first scroll — no blur
  // const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  //pin section to top

  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);

  // Tracks scroll progress while this (taller) section moves through viewport

  const cardsRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const [showCards, setShowCards] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  const [showFaqs, setShowFaqs] = useState(false);

  const BLOCKS = 5; // 0,100,200,300,400vh

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();

      // Trigger when the bottom reaches 80% of the viewport height
      setShowCards(rect.bottom <= window.innerHeight * 1.2);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  useLayoutEffect(() => {
    if (showDropdown && suggestions.length > 0 && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [showDropdown, suggestions]);

  useEffect(() => {
    const onScroll = () => {
      // Don't activate on mobile/tablet
      if (window.innerWidth < 800) {
        setShowForm(false);
        return;
      }

      if (!formRef.current) return;

      const rect = formRef.current.getBoundingClientRect();

      setShowForm(rect.bottom <= window.innerHeight * 1.2);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!layerRef.current) return;

      const rect = layerRef.current.getBoundingClientRect();

      // Trigger when the bottom reaches 80% of the viewport height
      setShowLayers(rect.bottom <= window.innerHeight * 1.2);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!faqsRef.current) return;

      const rect = faqsRef.current.getBoundingClientRect();

      // Trigger when the bottom reaches 80% of the viewport height
      setShowFaqs(rect.bottom <= window.innerHeight * 1.2);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      id="hero"
      className="flex flex-col scroll-smooth relative cursor-pointer mb-0! w-full!"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
    >
      <motion.div
        className="hidden lg:block pointer-events-none absolute inset-0 z-9999! mix-blend-screen"
        style={{
          background: useMotionTemplate`
      radial-gradient(
        80px circle at ${smoothX}px ${smoothY}px,
        rgba(210, 255, 240, 0.1),
        rgba(180, 235, 255, 0.04),
        transparent 90%
      )
    `,
        }}
      />

      <div className="fixed inset-0 z-0! overflow-hidden pointer-events-none bg-[#0d1220]"></div>

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative h-dvh w-full! flex flex-col items-center! z-40! "
      >
        <motion.div
          style={{ opacity }}
          className="w-full! flex justify-center px-8"
        >
          <div className="absolute inset-0 bg-[#0d1220]" />

          <div
            className="absolute inset-0 w-full h-screen overflow-hidden flex items-center justify-center"
            style={{ perspective: "2600px" }}
          >
            {/* Mobile grid - 3 cols x 10 rows, fixed 342px row height */}
            <div
              className="grid grid-cols-3 lg:hidden w-full h-screen"
              style={{ gridTemplateRows: "repeat(6, 1fr)" }}
            >
              {mobileImages.map((img, index) => {
                const cols = 3;
                const col = index % cols;
                const row = Math.floor(index / cols);

                const baseDelay = 1;
                const staggerStep = 0.045;
                const order = row + col;
                const itemDelay = baseDelay + order * staggerStep;

                return (
                  <motion.div
                    key={index}
                    className="relative w-full h-full overflow-hidden"
                    initial={{ opacity: 0, scale: 1, filter: "blur(1px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: 1.4,
                      delay: itemDelay,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity, filter",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={img}
                        alt=""
                        fill
                        priority
                        sizes="33vw"
                        className="object-cover pointer-events-none select-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/40" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop grid - 6 cols x 5 rows, fills parent height */}
            <div className="absolute inset-0 hidden lg:grid lg:grid-cols-6 lg:grid-rows-5 w-full h-full">
              {images.map((img, index) => {
                const cols = 6;
                const col = index % cols;
                const row = Math.floor(index / cols);

                const baseDelay = 1;
                const staggerStep = 0.045;
                const order = row + col;
                const itemDelay = baseDelay + order * staggerStep;

                return (
                  <motion.div
                    key={index}
                    className="relative min-w-0 min-h-0 overflow-hidden"
                    initial={{ opacity: 0, scale: 1, filter: "blur(1px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: 1.4,
                      delay: itemDelay,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity, filter",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="relative w-full h-full scale-[1]">
                      <Image
                        src={img}
                        alt=""
                        fill
                        priority
                        sizes="17vw"
                        className="object-cover scale-[1.03] pointer-events-none select-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/40" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <>
            <motion.div
              className="absolute inset-0 z-10 bg-[rgba(16,21,36,0.85)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 2,
                duration: 0.5,
                ease: "easeOut",
              }}
            />

            <motion.div
              initial={{
                opacity: 0,
                backdropFilter: "blur(1px)",
              }}
              animate={{
                opacity: 1,
                backdropFilter: "blur(16px)",
              }}
              transition={{
                duration: 2,
                delay: 3, // starts after 2 seconds
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 z-10 bg-transparent"
            />
          </>

          <AnimatePresence>
            {showLogo && (
              <motion.div
                className="z-50! absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+5em)] sm:-translate-y-1/2 flex items-center justify-center scale-[2.5] text-[#F8F7FC] pointer-events-none select-none"
                initial={{
                  opacity: 0,
                  scale: 1.1,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="101"
                  height="40"
                  viewBox="0 0 101 42"
                  fill="none"
                >
                  <path
                    d="M11.7222 31.8191C5.10567 31.8191 0.861077 26.7657 0.861077 21.0858C0.861077 15.2806 5.27213 10.9372 10.9732 10.9372C17.2153 10.9372 21.5431 15.6983 21.5431 21.5452C21.5431 27.3086 17.5898 31.8191 11.7222 31.8191ZM12.2216 30.4409C15.4675 30.4409 17.8811 27.4757 17.8811 22.7981C17.8811 16.9512 14.8017 12.3154 10.5571 12.3154C7.0199 12.3154 4.56469 15.2389 4.56469 19.9164C4.56469 25.2622 7.64411 30.4409 12.2216 30.4409Z"
                    fill="#F8F7FC"
                  />
                  <path
                    d="M25.3894 31.4015C24.89 31.4015 24.5987 31.1927 24.5987 30.8585V30.7332C24.5987 29.898 26.0552 29.9397 26.0552 28.478V5.00671C26.0552 3.37792 24.5987 3.12733 24.5987 2.50088V2.41735C24.5987 2.08324 24.8068 1.95795 25.1813 1.74913L28.4272 0.162101C29.2595 -0.255537 29.7172 0.203864 29.7172 0.746795V28.478C29.7172 29.9397 31.3402 29.898 31.3402 30.7332V30.8585C31.3402 31.1927 31.0073 31.4015 30.5079 31.4015H25.3894Z"
                    fill="#F8F7FC"
                  />
                  <path
                    d="M45.0863 31.8191C38.4698 31.8191 34.2252 26.7657 34.2252 21.0858C34.2252 15.2806 38.6362 10.9372 44.3373 10.9372C50.5793 10.9372 54.9072 15.6983 54.9072 21.5452C54.9072 27.3086 50.9539 31.8191 45.0863 31.8191ZM45.5857 30.4409C48.8316 30.4409 51.2452 27.4757 51.2452 22.7981C51.2452 16.9512 48.1657 12.3154 43.9211 12.3154C40.384 12.3154 37.9288 15.2389 37.9288 19.9164C37.9288 25.2622 41.0082 30.4409 45.5857 30.4409Z"
                    fill="#F8F7FC"
                  />
                  <path
                    d="M75.6903 11.3548C77.1051 11.3548 77.3548 11.9813 76.8554 12.3989C76.1064 13.1924 74.6915 13.0254 73.4431 13.3595C75.2325 14.6959 76.3561 16.9929 76.3561 19.1229C76.3561 22.5893 74.4418 25.3039 71.3624 26.6404C74.9828 27.4339 76.7722 29.4386 76.7722 31.9026C76.7722 35.7867 72.7357 38.1672 67.1178 38.1672C60.7093 38.1672 57.6299 34.492 57.6299 31.8191C57.6299 30.9838 58.0877 30.2321 59.1696 30.2321C61.7497 30.2321 60.418 36.789 67.3675 36.8308C70.7798 36.8308 73.0686 34.9514 73.0686 32.1532C73.0686 29.4803 71.2792 27.6427 68.4495 27.3921C67.9085 27.4339 67.4091 27.4757 66.8682 27.4757C61.8745 27.4757 57.9628 23.884 57.9628 19.3735C57.9628 14.4871 61.6248 10.9372 67.1595 10.9372C69.9892 10.9372 70.4469 11.3548 75.6903 11.3548ZM67.534 26.0975C70.7382 26.0975 72.7357 23.6334 72.7357 20.4176C72.7357 16.0741 70.1973 12.2736 66.4936 12.2736C63.4975 12.2736 61.5832 14.6959 61.5832 17.87C61.5832 22.3387 64.1633 26.0975 67.534 26.0975Z"
                    fill="#F8F7FC"
                  />
                  <path
                    d="M99.6682 11.3548C100.001 11.3548 100.251 11.5219 100.251 11.856V11.9813C100.251 12.8166 99.1688 12.7748 98.3782 14.5706L90.5132 31.9862C88.8902 35.6614 86.976 40.2554 82.8979 40.2554C79.7768 40.2554 77.7794 38.1672 77.7794 36.5384C77.7794 35.5779 78.362 34.8679 79.3607 34.8679C81.5246 34.8679 80.942 38.7937 83.5221 38.7937C85.3115 38.7937 87.1425 35.8702 88.5989 32.195L80.6091 14.5289C79.7768 12.7748 78.6117 12.8166 78.6117 11.9813V11.856C78.6117 11.5219 78.903 11.3548 79.2359 11.3548H84.6456C84.9786 11.3548 85.2282 11.5636 85.2282 11.856V11.9813C85.2282 12.8166 83.7301 12.7748 84.5208 14.5706L90.5132 28.7286L96.4639 14.9047C97.3794 12.7748 94.8826 12.8166 94.8826 11.9813V11.856C94.8826 11.5636 95.1323 11.3548 95.5068 11.3548H99.6682Z"
                    fill="#F8F7FC"
                  />
                  <path
                    d="M0.561072 3.32952C1.00238 3.11301 1.68422 3.41914 2.555 4.19479C3.42288 4.96786 4.46474 6.19547 5.61282 7.78602C7.90849 10.9664 10.6218 15.5881 13.2076 20.897C15.7935 26.2058 17.7606 31.1935 18.8512 34.9652C19.3966 36.8514 19.7219 38.4306 19.7966 39.5928C19.8716 40.7588 19.6935 41.4869 19.2522 41.7034C18.8109 41.9199 18.1291 41.6138 17.2583 40.8381C16.5294 40.1889 15.6778 39.219 14.7437 37.9828C14.5655 37.7471 14.3844 37.5017 14.2005 37.2469C13.0991 35.7211 11.9016 33.8634 10.6682 31.7574H11.1022C12.7004 34.4075 14.212 36.5595 15.4708 37.9828C16.7419 39.4202 17.755 40.1144 18.3388 39.828C19.9961 39.0149 17.5644 30.6051 12.9075 21.0442C8.25062 11.4833 3.13192 4.39186 1.47455 5.2049C0.856291 5.50823 0.807049 6.86873 1.23008 8.95175C1.57502 10.6502 2.23391 12.829 3.15435 15.3067L3.14183 15.2823L2.90079 15.6936L2.89557 15.6938C2.09517 13.6329 1.44325 11.7319 0.962055 10.0677C0.850705 9.68261 0.748507 9.31032 0.655766 8.95175C0.294271 7.55407 0.0761169 6.36506 0.0166312 5.44015C-0.0583611 4.27408 0.119764 3.54603 0.561072 3.32952Z"
                    fill="#F8F7FC"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          <div className=" relative z-20 max-w-360  xl:max-w-360 w-full px-0 md:px-2 xl:px-14 py-6 md:py-10 gap-15 flex flex-col items-center">
            {/* Mockup on mobile */}
            <div className=" w-full! px-0 xl:px-4.5 flex flex-col lg:flex-row justify-between items-center gap-5 md:gap-10 pt-20 md:pt-24 mt-10 md:mt-15">
              <motion.div
                className="
                relative
                w-full
                lg:w-[60%]
                flex
                justify-center
                lg:justify-end
                items-center
                lg:-top-24
                self-start
                overflow-visible
                block
                md:hidden
                z-0
              "
              >
                <div
                  className="
                relative
                lg:absolute
                flex
                justify-center
                lg:justify-end
                w-full
                overflow-visible
                z-0!
              "
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: [0, -10, 0],
                    }}
                    transition={{
                      opacity: {
                        delay: 3,
                        duration: 0.5,
                      },
                      y: {
                        delay: 3,
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <div className="relative w-[117.211px] md:w-[160px]">
                      {/* Video */}
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="
                        absolute
                        top-[2.25%]
                        left-[4.4%]
                        w-[92%]
                        h-[95.4%]
                        object-cover
                        rounded-[16px]
                        z-10
                      "
                      >
                        <source src="/appflow.mp4" type="video/mp4" />
                      </video>

                      {/* Phone frame */}
                      <img
                        src={phoneMock}
                        alt=""
                        className="relative z-20 w-full h-auto pointer-events-none"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 3,
                  delay: 3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full xl:w-[100%] flex flex-col gap-[52px] md:gap-[52px] items-center lg:items-start mt-2 lg:mt-30 max-md:[@supports(-webkit-hyphens:none)]:gap-[40px]"
              >
                <div className="flex flex-col gap-[30px] md:gap-[60px] text-center md:text-left max-md:[@supports(-webkit-hyphens:none)]:gap-[20px]">
                  <h1 className="text-[#F8F7FC] text-[32px] md:text-[65px] font-normal leading-[115%] font-Recoleta">
                    Timing Intelligence for Modern Investors
                  </h1>

                  <p className="text-[#F8F7FC] text-[18px] md:text-[24px] font-normal leading-[140%] max-w-full lg:max-w-[800px] font-Satoshi">
                    Ology is a market timing platform that synthesizes celestial
                    cycles, behavioral psychology, and live market data into a
                    personalized timing profile. Active traders and investors
                    use it to recognize patterns and time entries with context.
                  </p>
                </div>
                <Link href="#archetype-form">
                  <button
                    type="button"
                    className="
                    cursor-pointer
                    inline-flex
                    flex
                    w-auto
                    py-[14.73px]
                      px-[18px]
                    justify-center
                    items-center
                    rounded-[20px]
                    bg-gradient-to-b
                    from-white/10
                    to-[rgba(30,37,64,0.15)]
                    border
                    border-white/20
                    backdrop-blur-xl
                    backdrop-saturate-150
                    shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.15)]
                    hover:bg-white/10
                    hover:border-white/30
                    transition-all
                    duration-500
                  "
                  >
                    {" "}
                    <span className=" text-[#F8F7FC] font-Satoshi text-[16px] lg:text-[18px] md:text-[17.47px] font-medium leading-[150%] tracking-[0.349px] uppercase">
                      Access the Beta
                    </span>
                  </button>
                </Link>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  x: 0,
                }}
                transition={{
                  duration: 3,
                  delay: 3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                relative
                w-full
                lg:w-[60%]
                flex
                justify-center
                lg:justify-end
                lg:-top-24
                z-20
                self-start
                overflow-visible
                hidden lg:block
              "
              >
                <div className="relative lg:absolute z-50 flex justify-center lg:justify-end w-full overflow-visible">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="relative shrink-0 w-90.25 h-182.5 mt-20">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="
                        absolute
                        top-[2.25%]
                        left-[5.2%]
                        w-[89.5%]
                        h-174.5
                        object-cover
                        rounded-[24px]
                        z-30!
                    "
                      >
                        <source src={"/appflow.mp4"} type="video/mp4" />
                      </video>

                      <img
                        src={phoneMock}
                        alt=""
                        className="relative z-40! w-95.25 h-182.5!"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* header */}
        <div
          className="
                fixed
                top-0
                z-9999
                w-full!
                max-w-360
              
                xl:max-w-360
                px-5
                md:px-10
                py-6
                md:py-10
               mx-auto!
               
              "
        >
          <motion.header
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 3.5,
              duration: 0.8,
              ease: "easeOut",
            }}
            className="
              flex
              items-center
              justify-between
          
              px-4
              lg:px-5
              py-1
              lg:py-2
              rounded-[20px]
              border
              border-[#7478895c]
              bg-[#1e2540]/5
              backdrop-blur-xl
              z-30!
            "
          >
            <div className="flex w-full items-center justify-between px-0 lg:px-4 lg:py-2 py-1 md:px-4 z-50!">
              <Link href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="29"
                  viewBox="0 0 101 42"
                  fill="none"
                >
                  <path
                    d="M11.7222 31.8191C5.10567 31.8191 0.861077 26.7657 0.861077 21.0858C0.861077 15.2806 5.27213 10.9372 10.9732 10.9372C17.2153 10.9372 21.5431 15.6983 21.5431 21.5452C21.5431 27.3086 17.5898 31.8191 11.7222 31.8191ZM12.2216 30.4409C15.4675 30.4409 17.8811 27.4757 17.8811 22.7981C17.8811 16.9512 14.8017 12.3154 10.5571 12.3154C7.0199 12.3154 4.56469 15.2389 4.56469 19.9164C4.56469 25.2622 7.64411 30.4409 12.2216 30.4409Z"
                    fill="#F8F7FC"
                  />
                  <path
                    d="M25.3894 31.4015C24.89 31.4015 24.5987 31.1927 24.5987 30.8585V30.7332C24.5987 29.898 26.0552 29.9397 26.0552 28.478V5.00671C26.0552 3.37792 24.5987 3.12733 24.5987 2.50088V2.41735C24.5987 2.08324 24.8068 1.95795 25.1813 1.74913L28.4272 0.162101C29.2595 -0.255537 29.7172 0.203864 29.7172 0.746795V28.478C29.7172 29.9397 31.3402 29.898 31.3402 30.7332V30.8585C31.3402 31.1927 31.0073 31.4015 30.5079 31.4015H25.3894Z"
                    fill="#F8F7FC"
                  />
                  <path
                    d="M45.0863 31.8191C38.4698 31.8191 34.2252 26.7657 34.2252 21.0858C34.2252 15.2806 38.6362 10.9372 44.3373 10.9372C50.5793 10.9372 54.9072 15.6983 54.9072 21.5452C54.9072 27.3086 50.9539 31.8191 45.0863 31.8191ZM45.5857 30.4409C48.8316 30.4409 51.2452 27.4757 51.2452 22.7981C51.2452 16.9512 48.1657 12.3154 43.9211 12.3154C40.384 12.3154 37.9288 15.2389 37.9288 19.9164C37.9288 25.2622 41.0082 30.4409 45.5857 30.4409Z"
                    fill="#F8F7FC"
                  />
                  <path
                    d="M75.6903 11.3548C77.1051 11.3548 77.3548 11.9813 76.8554 12.3989C76.1064 13.1924 74.6915 13.0254 73.4431 13.3595C75.2325 14.6959 76.3561 16.9929 76.3561 19.1229C76.3561 22.5893 74.4418 25.3039 71.3624 26.6404C74.9828 27.4339 76.7722 29.4386 76.7722 31.9026C76.7722 35.7867 72.7357 38.1672 67.1178 38.1672C60.7093 38.1672 57.6299 34.492 57.6299 31.8191C57.6299 30.9838 58.0877 30.2321 59.1696 30.2321C61.7497 30.2321 60.418 36.789 67.3675 36.8308C70.7798 36.8308 73.0686 34.9514 73.0686 32.1532C73.0686 29.4803 71.2792 27.6427 68.4495 27.3921C67.9085 27.4339 67.4091 27.4757 66.8682 27.4757C61.8745 27.4757 57.9628 23.884 57.9628 19.3735C57.9628 14.4871 61.6248 10.9372 67.1595 10.9372C69.9892 10.9372 70.4469 11.3548 75.6903 11.3548ZM67.534 26.0975C70.7382 26.0975 72.7357 23.6334 72.7357 20.4176C72.7357 16.0741 70.1973 12.2736 66.4936 12.2736C63.4975 12.2736 61.5832 14.6959 61.5832 17.87C61.5832 22.3387 64.1633 26.0975 67.534 26.0975Z"
                    fill="#F8F7FC"
                  />
                  <path
                    d="M99.6682 11.3548C100.001 11.3548 100.251 11.5219 100.251 11.856V11.9813C100.251 12.8166 99.1688 12.7748 98.3782 14.5706L90.5132 31.9862C88.8902 35.6614 86.976 40.2554 82.8979 40.2554C79.7768 40.2554 77.7794 38.1672 77.7794 36.5384C77.7794 35.5779 78.362 34.8679 79.3607 34.8679C81.5246 34.8679 80.942 38.7937 83.5221 38.7937C85.3115 38.7937 87.1425 35.8702 88.5989 32.195L80.6091 14.5289C79.7768 12.7748 78.6117 12.8166 78.6117 11.9813V11.856C78.6117 11.5219 78.903 11.3548 79.2359 11.3548H84.6456C84.9786 11.3548 85.2282 11.5636 85.2282 11.856V11.9813C85.2282 12.8166 83.7301 12.7748 84.5208 14.5706L90.5132 28.7286L96.4639 14.9047C97.3794 12.7748 94.8826 12.8166 94.8826 11.9813V11.856C94.8826 11.5636 95.1323 11.3548 95.5068 11.3548H99.6682Z"
                    fill="#F8F7FC"
                  />
                  <path
                    d="M0.561072 3.32952C1.00238 3.11301 1.68422 3.41914 2.555 4.19479C3.42288 4.96786 4.46474 6.19547 5.61282 7.78602C7.90849 10.9664 10.6218 15.5881 13.2076 20.897C15.7935 26.2058 17.7606 31.1935 18.8512 34.9652C19.3966 36.8514 19.7219 38.4306 19.7966 39.5928C19.8716 40.7588 19.6935 41.4869 19.2522 41.7034C18.8109 41.9199 18.1291 41.6138 17.2583 40.8381C16.5294 40.1889 15.6778 39.219 14.7437 37.9828C14.5655 37.7471 14.3844 37.5017 14.2005 37.2469C13.0991 35.7211 11.9016 33.8634 10.6682 31.7574H11.1022C12.7004 34.4075 14.212 36.5595 15.4708 37.9828C16.7419 39.4202 17.755 40.1144 18.3388 39.828C19.9961 39.0149 17.5644 30.6051 12.9075 21.0442C8.25062 11.4833 3.13192 4.39186 1.47455 5.2049C0.856291 5.50823 0.807049 6.86873 1.23008 8.95175C1.57502 10.6502 2.23391 12.829 3.15435 15.3067L3.14183 15.2823L2.90079 15.6936L2.89557 15.6938C2.09517 13.6329 1.44325 11.7319 0.962055 10.0677C0.850705 9.68261 0.748507 9.31032 0.655766 8.95175C0.294271 7.55407 0.0761169 6.36506 0.0166312 5.44015C-0.0583611 4.27408 0.119764 3.54603 0.561072 3.32952Z"
                    fill="#F8F7FC"
                  />
                </svg>
              </Link>
              <nav className="hidden md:block">
                <ul className="flex items-center gap-[65px]">
                  {[
                    { label: "Align", id: "align" },
                    { label: "Perform", id: "perform" },
                    { label: "Decode", id: "decode" },
                    { label: "Ask", id: "ask" },
                  ].map((item) => (
                    <li
                      key={item.id}
                      onClick={() =>
                        document.getElementById(item.id)?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        })
                      }
                      className={`
                          cursor-pointer
                          text-[17px]
                          font-Satoshi
                          font-normal
                          leading-[150%]
                          uppercase
                          transition-colors duration-300
                          ${
                            activeSection === item.id
                              ? "text-[#F8F7FC]"
                              : "text-[#F8F7FC]/60 hover:text-[#F8F7FC]"
                          }
                        `}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-[#F8F7FC] cursor-pointer mt-2"
                >
                  {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>

              {mobileMenuOpen && (
                <div
                  className="
                      absolute
                      top-full
                      left-0
                      mt-4
                      w-full
                      rounded-[16.912px]
                      border
                      border-[#7478895c]
                      bg-[#1e2540]/90
                      backdrop-blur-xl
                      p-6
                      md:hidden
                      z-50! 
                    "
                >
                  <ul className="flex flex-col gap-6 z-50!">
                    {[
                      { label: "Align", id: "align" },
                      { label: "Perform", id: "perform" },
                      { label: "Decode", id: "decode" },
                      { label: "Ask", id: "ask" },
                    ].map((item) => (
                      <li
                        key={item.id}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          document.getElementById(item.id)?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }}
                        className="
                        cursor-pointer
                        text-[#F8F7FC]/80
                        text-[18px]
                        font-Satoshi
                        uppercase
                        hover:text-[#F8F7FC]
                        transition
                      "
                      >
                        {item?.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.header>
        </div>
      </section>

      {/* normal section */}
      <main className="flex justify-center ">
        <section className="relative z-30! w-full max-w-360! xl:max-w-360! mx-auto px-8 flex flex-col items-center! justify-between">
          <SectionReveal>
            <div ref={sectionRef} className="relative w-full! lg:h-[150vh]">
              <div
                id="align"
                className=" relative xl:sticky xl:top-20 w-full flex flex-col items-center justify-start gap-[52px] lg:gap-[120px] xl:gap-8 lg:gap-2 md:px-2.5 xl:px-12.5 py-15! h-auto"
              >
                <div className="flex flex-col gap-7.5 mt-20 ">
                  <h2 className="text-[#F8F7FC] text-center font-Recoleta text-[32px] md:text-[60px] font-normal leading-[120%]">
                    Where Cycles
                    <br className="md:hidden" /> Meet the Tape
                  </h2>

                  <h4 className="text-[#F8F7FC] text-center font-Satoshi text-[17.5px] md:text-[22px] font-normal leading-[120%]">
                    Major market moments have long clustered
                    <br className="md:hidden" /> around measurable celestial
                    alignments.
                    <br className="md:hidden" /> Ology keeps that record in real
                    time.
                  </h4>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 80 }}
                  animate={
                    showCards ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }
                  }
                  transition={{ duration: 0.3 }}
                  className="hidden xl:block flex justify-start items-center gap-[47.447px] w-full overflow-x-auto flex-nowrap no-scrollbar h-[450px] mt-8"
                >
                  {/* AHEAD */}
                  <div className=" flex flex-col w-full gap-[30px]">
                    <CardCarousel items={cyclesCards} />
                  </div>
                </motion.div>

                <div className="hidden lg:block xl:hidden w-full! gap-7.5">
                  <motion.div className="w-full! flex justify-around max-h-[100vh] overflow-y-auto  flex-wrap gap-[20px] mt-40 xl:mt-0">
                    {cyclesCards.map((data, id) => {
                      const status = statusOf(data);
                      const style = cardStyle(data.read);

                      return (
                        <div
                          key={id}
                          className="
                            
                                relative
                                flex h-[343px] w-[415px] max-w-[415px]
                                p-5.5 md:p-[27.23px]
                                flex-col justify-between
                                rounded-[16.912px]
                  
                                bg-[rgba(30,37,64,0.24)]
                  
                                backdrop-blur-[2px]
                  
                                border border-white/20
                  
                                overflow-hidden
                                transition-all duration-500
                  
                              
                              "
                        >
                          <div className="w-full flex justify-between items-center ">
                            <h3 className="text-[#F8F7FC] font-Satoshi text-[12.638px] font-bold leading-[120%] tracking-[2.148px] uppercase">
                              {data.date}
                            </h3>

                            <div className="flex justify-start items-center gap-[12.55px]">
                              <div
                                className="w-[21.96px] h-[21.96px] rounded-full flex justify-center items-center"
                                style={style.button}
                              >
                                <div
                                  className="w-[14.64px] h-[14.64px] rounded-full"
                                  style={{ background: style.dot.background }}
                                />
                              </div>

                              <p className="text-[#F8F7FC] font-Satoshi text-[10.13px] font-normal leading-[120%] tracking-[2.148px] uppercase">
                                {data.read}
                              </p>
                            </div>
                          </div>

                          <div className="gap-[31.38px] flex flex-col mt-6 md:mt-3">
                            <h2 className="text-[#F8F7FC] font-Recoleta text-[20.124px] font-normal leading-[130%]">
                              {data.title}
                            </h2>

                            <p className="text-[#F8F7FC] font-Satoshi text-[15.093px] font-normal leading-[150%] -mt-4">
                              {data.content}
                            </p>
                          </div>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="537"
                            height="1"
                            viewBox="0 0 537 1"
                            fill="none"
                            className="mt-4 md:mt-0"
                          >
                            <path
                              d="M-1.52588e-05 0.484375L536.619 0.484375"
                              stroke="#6C8BA4"
                              strokeOpacity="0.1"
                              strokeWidth="0.968858"
                            />
                          </svg>

                          <div className="w-full flex justify-between items-center py-[6.6px] mt-4 md:mt-0 gap-4 lg:gap-auto">
                            <button
                              type="button"
                              className="flex gap-[20.2px] py-3 lg:py-[14.408px] px-3 lg:px-[15.88px] rounded-[16.16px]"
                              style={style.button}
                            >
                              <span className="text-center justify-center text-slate-50 text-[12.148px] font-bold font-Satoshi uppercase leading-6">
                                {data.button_text}
                              </span>
                            </button>

                            <div className="flex flex-col items-end justify-between gap-[17.26px]">
                              {/* outcome_tag — Moon Glow only, mono, letter-spaced caps, never a class color. Renders nothing when null. */}
                              {data.outcome_tag && (
                                <p
                                  className="font-mono text-[10.13px] font-normal leading-[120%] tracking-[2.148px] uppercase px-2 py-[2px] rounded-[4px]"
                                  style={style.outcome}
                                >
                                  {data.outcome_tag}
                                </p>
                              )}

                              <div className="flex text-white items-center gap-[14.5px]">
                                {data.icon.map((svg: any, i: number) => {
                                  if (i !== 1) {
                                    return (
                                      <div
                                        key={i}
                                        className="w-[22.586px] h-[22.586px] flex items-center justify-center text-white"
                                        dangerouslySetInnerHTML={{
                                          __html: svg,
                                        }}
                                      />
                                    );
                                  }

                                  return (
                                    <div
                                      key={i}
                                      className="w-[12.8px] h-[12.4px] flex items-center justify-center text-white"
                                      dangerouslySetInnerHTML={{ __html: svg }}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>

                <div className="relative block lg:hidden w-full! gap-7.5 flex flex-col items-center">
                  <motion.div
                    ref={cardScrollRef}
                    onScroll={handleCardScroll}
                    className="w-full! flex overflow-x-auto snap-x snap-mandatory scrollbar-none max-h-auto lg:max-h-[75vh] gap-[20px] sm:mt-40 xl:mt-0"
                  >
                    {visibleCards.map((data, id) => {
                      const status = statusOf(data);
                      const style = cardStyle(data.read);

                      return (
                        <div
                          key={id}
                          className="
                        relative
                        flex h-auto md:h-[313px]
                        w-full shrink-0 snap-center
                        p-[22px] md:p-[27.23px]
                        flex-col justify-between

                        bg-[#0D1220]/95
                        rounded-[9.757px]
                        border-[0.61px] border-[#2A2933]
                        backdrop-blur-xl

                        overflow-hidden
                        transition-all duration-500
                        z-30
                      "
                        >
                          <div className="w-full flex justify-between items-center ">
                            <h3 className="text-[#8B8996] font-Satoshi text-[12.638px] font-bold leading-[120%] tracking-[2.148px] uppercase">
                              {data.date}
                            </h3>

                            <div className="flex justify-start items-center gap-[8px]">
                              <div
                                className="w-[16.96px] h-[16.96px] rounded-full flex justify-center items-center"
                                style={style.button}
                              >
                                <div
                                  className="w-[10.64px] h-[10.64px] rounded-full"
                                  style={{ background: style.dot.background }}
                                />
                              </div>

                              <p className="text-[#F8F7FC] font-Satoshi text-[7.92px] font-normal leading-[120%] tracking-[2.148px] uppercase">
                                {data.read}
                              </p>
                            </div>
                          </div>

                          <div className="gap-[31.38px] flex flex-col mt-6 md:mt-3">
                            <h2 className="text-[#F8F7FC] font-Recoleta text-[14.29px] font-normal leading-[130%]">
                              {data.title}
                            </h2>

                            <p className="text-[#F8F7FC] font-Satoshi text-[12.757px] font-normal leading-[150%] -mt-4">
                              {data.content}
                            </p>
                          </div>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="537"
                            height="1"
                            viewBox="0 0 537 1"
                            fill="none"
                            className="mt-4 md:mt-0"
                          >
                            <path
                              d="M-1.52588e-05 0.484375L536.619 0.484375"
                              stroke="#6C8BA4"
                              strokeOpacity="0.1"
                              strokeWidth="0.968858"
                            />
                          </svg>

                          <div className="w-full flex justify-between items-center py-[6.6px] mt-4 md:mt-0 gap-4 lg:gap-auto">
                            <button
                              type="button"
                              className="flex gap-[20.2px] py-[7.318px] lg:py-[14.408px] px-[12.192px] lg:px-[15.88px] rounded-[6.098px]"
                              style={style.button}
                            >
                              <span className="text-center justify-center text-slate-50 text-[7.927px] font-bold font-Satoshi uppercase leading-6">
                                {data.button_text}
                              </span>
                            </button>

                            <div className="flex flex-col items-end justify-between gap-[17.26px]">
                              {data.outcome_tag && (
                                <p
                                  className="font-mono text-[10.13px] font-normal leading-[120%] tracking-[2.148px] uppercase px-2 py-[2px] rounded-[4px]"
                                  style={style.outcome}
                                >
                                  {data.outcome_tag}
                                </p>
                              )}

                              <div className="flex text-white items-center gap-[14.5px]">
                                {data.icon.map((svg: any, i: number) => {
                                  if (i !== 1) {
                                    return (
                                      <div
                                        key={i}
                                        className="w-[22.586px] h-[22.586px] flex items-center justify-center text-white"
                                        dangerouslySetInnerHTML={{
                                          __html: svg,
                                        }}
                                      />
                                    );
                                  }

                                  return (
                                    <div
                                      key={i}
                                      className="w-[12.8px] h-[12.4px] flex items-center justify-center text-white"
                                      dangerouslySetInnerHTML={{ __html: svg }}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>

                  {/* Dot indicator pill */}
                  <div className="flex justify-center">
                    <div
                      className="inline-flex items-start"
                      style={{
                        height: "20px",
                        padding: "4px 4px 4px 5px",
                        gap: "3px",
                        borderRadius: "23px",
                        background: "rgba(92, 92, 92, 0.60)",
                      }}
                    >
                      {visibleCards.map((_, id) => (
                        <div
                          key={id}
                          className="h-[12px] w-[12px]"
                          style={
                            id === activeCardIndex
                              ? { borderRadius: "12px", background: "#D9D9D9" }
                              : {
                                  borderRadius: "12px",
                                  border: "1px solid #D9D9D9",
                                }
                          }
                        />
                      ))}
                    </div>
                  </div>

                  {/* active label — ACTIVE / AHEAD / RECORD, printed straight from statusOf() */}
                  <div className="h-[16px] relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={activeCardIndex}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="font-Satoshi text-[11px] font-bold tracking-[2px] uppercase whitespace-nowrap"
                        style={{ color: "#D8DAE8" }}
                      >
                        {statusOf(visibleCards[activeCardIndex])}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {/* Index counter e.g. 1/18 */}
                  <p className="text-[#F8F7FC] font-Satoshi text-[10.485px] tracking-[2px]">
                    {activeCardIndex + 1} // {visibleCards.length}
                  </p>

                  {/* counter + show more */}
                  {/* <div className="w-full flex flex-col items-center gap-4 mt-8">
                    <p className="text-[#F8F7FC]/60 font-Satoshi text-[13px] tracking-[2px] uppercase">
                      Showing {visibleCards.length} of {cyclesCards.length}{" "}
                      alignments
                    </p>

                    {shouldShowToggle && (
                      <button
                        type="button"
                        onClick={() =>
                          setVisibleCount(
                            isExpanded ? INITIAL_COUNT : cyclesCards.length,
                          )
                        }
                        className="flex items-center gap-2 px-6 py-3 rounded-[16.16px] border border-white/20 bg-[rgba(127,168,212,0.1)] text-[#F8F7FC] font-Satoshi text-[12.148px] font-bold uppercase tracking-[1px] transition-colors hover:bg-[rgba(127,168,212,0.2)]"
                      >
                        {isExpanded ? "Show Fewer" : "View the full record"}
                        {isExpanded ? (
                          <ArrowUp size={16} />
                        ) : (
                          <ArrowDown size={16} />
                        )}
                      </button>
                    )}
                  </div> */}
                </div>
              </div>

              {/* line here */}

              <div className="absolute top-0 left-1/2 right-1/2 -mx-[50vw] w-screen h-full z-25 pointer-events-none overflow-hidden">
                {Array.from({ length: BLOCKS }).map((_, block) => (
                  <div
                    key={block}
                    className="absolute left-0 right-0 flex h-full"
                    style={{ top: `${block * 100}vh` }}
                  >
                    {Array.from({ length: LINES }).map((_, i) => {
                      const isActive = activeLines[i];

                      return (
                        <div key={i} className="relative flex-1">
                          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/4" />

                          {isActive && (
                            <motion.div
                              className="absolute left-1/2 top-0 -translate-x-1/2"
                              animate={{
                                y: ["-15vh", "115vh"],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 10 + (i % 3),
                                repeat: Infinity,
                                ease: "linear",
                                delay: block * 0.8 + i * 0.35,
                              }}
                            >
                              <div
                                className="absolute left-1/2 -translate-x-1/2 w-px h-20"
                                style={{
                                  background:
                                    "linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.35), transparent)",
                                }}
                              />
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* COSMIC RHYTHM */}
          <section className="relative w-full flex justify-center">
            <div className="relative w-full min-h-[100dvh] lg:h-[100vh] xl:h-[150vh]">
              <div
                id="perform"
                ref={formRef}
                className="relative xl:sticky xl:top-5 w-full flex flex-col xl:flex-row justify-center xl:justify-between min-h-[100dvh] xl:h-[100vh] items-center py-16 md:py-24 xl:py-40.25 md:px-[50px]"
              >
                {/* DESKTOP FORM (xl+) */}
                <motion.div
                  initial={{ opacity: 0, y: 80 }}
                  animate={
                    showForm ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }
                  }
                  transition={{ duration: 0.3 }}
                  id="archetype-form"
                  className="x hidden xl:block flex-1 min-w-0 flex flex-col items-center md:items-start gap-30! z-20 px-4 md:px-0 max-w-360"
                >
                  <div className="flex flex-col gap-[30px]">
                    <h2 className="text-[#F8F7FC] font-Recoleta text-[38px] md:text-[60px] font-normal leading-[120%] md-w-[600px]">
                      Access the Beta
                    </h2>

                    <h4 className="text-[#F8F7FC] text-start font-Satoshi text-[22px] md:text-[22px] font-normal leading-[120%]">
                      Generate your behavioral market profile and claim your
                      spot.
                    </h4>
                  </div>

                  <motion.div
                    className="
            relative
            flex w-90 h-auto lg:max-h-[300px] md:w-[800px]
            flex-col justify-evenly items-start
            p-[31.381px]
            rounded-[16.912px]
            bg-[rgba(30,37,64,0.24)]
            backdrop-blur-[2px]
            border border-white/20
            overflow-hidden
            transition-all duration-500
            mt-18
            z-50!
          "
                  >
                    <div className="flex flex-col gap-[16.71px] -mt-2">
                      {!showNatalForm ? (
                        <h3 className="text-[#F8F7FC] font-Recoleta text-[20px] lg:text-[28px] font-normal leading-[150%]">
                          Discover your investor timing profile
                        </h3>
                      ) : (
                        <>
                          <h3 className="text-[#F8F7FC] font-Recoleta text-[28px] font-normal leading-[150%]">
                            Hi, {names.split("")}.
                          </h3>
                          <h3 className="text-[#F8F7FC] font-Satoshi text-[17.5px] font-light leading-[120%]">
                            Add your birth details. This is what maps your chart
                            to a timing profile.
                          </h3>
                        </>
                      )}
                    </div>

                    <div className="flex flex-col w-full mt-10">
                      {!showNatalForm && (
                        <div className="w-full! flex gap-6.5 items-start md:items-end flex-col md:flex-row">
                          <div className="flex flex-col gap-[26.5px] flex-1 w-full!">
                            <label className="text-[#F8F7FC] font-Satoshi text-[15.925px] font-normal leading-[25.48px] tracking-[2.389px] uppercase">
                              Full Name
                            </label>
                            <input
                              className="w-full h-[50.959px] font-Satoshi px-[21.233px] py-[16.986px] rounded-[10.616px] border border-[rgba(248,247,252,0.1)] outline-none"
                              value={names}
                              onChange={(e: any) => setNames(e.target.value)}
                            />
                          </div>

                          <div className="flex flex-col gap-[26.5px] flex-1 w-full!">
                            <label className="text-[#F8F7FC] font-Satoshi text-[15.925px] font-normal leading-[25.48px] tracking-[2.389px] uppercase">
                              Email
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e: any) => setEmail(e.target.value)}
                              className="w-full h-[50.959px] font-Satoshi px-[21.233px] py-[16.986px] rounded-[10.616px] border border-[rgba(248,247,252,0.1)] outline-none"
                            />
                          </div>

                          <div
                            onClick={() => {
                              if (names != "" && email != "") {
                                setShowNatalForm(true);
                                setErrMsg("");
                              } else {
                                setTimeout(() => {
                                  setErrMsg(
                                    "Please fill out your name and email",
                                  );
                                }, 5000);
                              }
                            }}
                            className="cursor-pointer mb-2 flex w-[30.638px] h-[30.638px] p-[9.937px_8.695px_10.701px_7.867px] justify-center items-center aspect-square rounded-[53.748px] bg-[rgba(127,168,212,0.1)]"
                          >
                            <ArrowRight />
                          </div>
                        </div>
                      )}

                      {errMsg && (
                        <p className="text-[#F8F7FC] font-[Satoshi] text-[16px] font-normal leading-[150%]">
                          {errMsg}
                        </p>
                      )}

                      <div className="flex gap-6.5 w-full items-end">
                        <AnimatePresence>
                          {showNatalForm && (
                            <motion.div
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 12 }}
                              transition={{ duration: 0.25 }}
                              className="w-full flex gap-4 items-start md:items-end flex-col md:flex-row"
                            >
                              <div className="flex flex-col gap-[26.5px] flex-1 w-full!">
                                <label className="text-[#F8F7FC] font-Satoshi text-[13.801px] font-normal leading-[25.48px] tracking-[2.07px] uppercase">
                                  birth date
                                </label>
                                <button
                                  type="button"
                                  onClick={() => setOpenDate(true)}
                                  className="w-full py-4 px-5 border border-[rgba(248,247,252,0.1)] rounded-[10px] font-Satoshi text-[#F8F7FC]/40 font-normal text-base leading-[25.48px] tracking-[2.07px] uppercase flex justify-between items-center"
                                >
                                  {date ? (
                                    format(date, "MMM d, yyyy")
                                  ) : (
                                    <>birth date</>
                                  )}
                                </button>
                              </div>

                              <div className="flex flex-col gap-[26.5px] flex-1 w-full!">
                                <label className="text-[#F8F7FC] font-Satoshi text-[13.801px] font-normal leading-[25.48px] tracking-[2.07px] uppercase">
                                  birth time
                                </label>
                                <button
                                  type="button"
                                  onClick={() => setOpenTime(true)}
                                  className="w-full py-4 px-5 border border-[rgba(248,247,252,0.1)] rounded-[10px] font-Satoshi text-[#F8F7FC]/40 font-normal text-base leading-[25.48px] tracking-[2.07px] uppercase flex justify-between items-center"
                                >
                                  {time || "( HH : MM  AM/PM )"}
                                </button>
                              </div>

                              {/* TRIGGER — replaces the old inline input */}
                              <div className="flex flex-col gap-[26.5px] flex-1 w-full!">
                                {/* <label className="text-[#F8F7FC] font-Satoshi text-[13.801px] font-normal leading-[25.48px] tracking-[2.07px] uppercase">
                                  Birth Location
                                </label> */}
                                <button
                                  type="button"
                                  onClick={() => setOpenLocation(true)}
                                  className="touch-manipulation w-full py-4 px-5 border border-[rgba(248,247,252,0.1)] rounded-[10px] font-Satoshi font-normal text-base leading-[25.48px] tracking-[2.07px] uppercase flex justify-between items-center text-center"
                                >
                                  <span
                                    className={
                                      data.location
                                        ? "text-[#F8F7FC]/40"
                                        : "text-[#F8F7FC]/40"
                                    }
                                  >
                                    {data.location || "( CITY, COUNTRY )"}
                                  </span>
                                </button>
                              </div>

                              {/* MODAL — input + suggestions live here now */}
                              {openLocation &&
                                createPortal(
                                  <div className="font-Satoshi fixed inset-0 z-50! flex items-center justify-center p-4">
                                    <div
                                      className="absolute inset-0 bg-black/10 backdrop-blur-md"
                                      onClick={() => setOpenLocation(false)}
                                    />
                                    <div
                                      className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#131827]/95 backdrop-blur-2xl p-6 shadow-2xl"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <button
                                        type="button"
                                        onClick={() => setOpenLocation(false)}
                                        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                      >
                                        <X className="size-4" />
                                      </button>

                                      <h3 className="mb-4 text-center font-Recoleta text-lg font-normal text-white">
                                        Birth Location
                                      </h3>

                                      <input
                                        ref={inputRef}
                                        autoFocus
                                        autoComplete="off"
                                        spellCheck={false}
                                        placeholder="( CITY, COUNTRY )"
                                        value={data.location || ""}
                                        onChange={(e) =>
                                          handleChange(e.target.value)
                                        }
                                        className="py-4 px-5 w-full rounded-[10px] border border-[rgba(248,247,252,0.1)] text-start font-Satoshi text-[#F8F7FC] text-[16px] font-normal tracking-[1.95px] placeholder:text-[#F8F7FC]/40 placeholder:uppercase"
                                      />

                                      {suggestions.length > 0 && (
                                        <div className="mt-2 font-Satoshi rounded-[10px] max-h-[40vh] overflow-auto">
                                          {suggestions.map((s) => (
                                            <div
                                              key={s.place_id}
                                              className="px-4 py-3 cursor-pointer hover:bg-[#2a2a40] text-white/90"
                                              onMouseDown={(e) => {
                                                e.preventDefault();
                                                const placesService = new (
                                                  window as any
                                                ).google.maps.places.PlacesService(
                                                  document.createElement("div"),
                                                );
                                                placesService.getDetails(
                                                  { placeId: s.place_id },
                                                  (place: any) => {
                                                    const lat =
                                                      place.geometry.location.lat();
                                                    const lng =
                                                      place.geometry.location.lng();
                                                    setData({
                                                      ...data,
                                                      location: s.description,
                                                      lat,
                                                      lng,
                                                    });
                                                  },
                                                );
                                                setOpenLocation(false);
                                              }}
                                            >
                                              {s.description}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>,
                                  document.body,
                                )}

                              <button
                                onClick={() => handleSubmitForm()}
                                className="cursor-pointer mb-2 flex w-[30.638px] h-[30.638px] p-[9.937px_8.695px_10.701px_7.867px] justify-center items-center aspect-square rounded-[53.748px] bg-[rgba(127,168,212,0.1)]"
                              >
                                <ArrowRight />
                              </button>

                              {openDate &&
                                createPortal(
                                  <div className="fixed inset-0 z-50! flex items-center justify-center p-4">
                                    <div
                                      className="absolute inset-0 bg-black/10 backdrop-blur-md"
                                      onClick={() => setOpenDate(false)}
                                    />
                                    <div
                                      className="relative z-10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {/* blur/bg layer — isolated, no interactive elements inside */}
                                      <div className="absolute inset-0 -z-10 rounded-3xl border border-white/10 bg-[#131827]/95 backdrop-blur-2xl" />

                                      {/* content layer — no filter ancestor, native select works on iOS */}
                                      <div className="font-Satoshi p-6">
                                        <button
                                          type="button"
                                          onClick={() => setOpenDate(false)}
                                          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                        >
                                          <X className="size-4" />
                                        </button>

                                        <div className="flex justify-center">
                                          <Calendar
                                            mode="single"
                                            selected={date as Date}
                                            captionLayout="dropdown"
                                            required
                                            onSelect={(d) => {
                                              if (!d) return;
                                              setDate(d);
                                              setOpenDate(false);
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>,
                                  document.body,
                                )}

                              {openTime &&
                                createPortal(
                                  <div className="font-Satoshi fixed inset-0 z-50! flex items-center justify-center p-4">
                                    <div
                                      className="absolute inset-0 bg-black/10"
                                      onClick={() => setOpenTime(false)}
                                    />
                                    <div
                                      className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#131827]/95 backdrop-blur-2xl p-6 shadow-2xl"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <button
                                        type="button"
                                        onClick={() => setOpenTime(false)}
                                        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                      >
                                        <X className="size-4" />
                                      </button>

                                      <h3 className="mb-4 text-center font-Recoleta text-lg font-normal text-white">
                                        Select Birth Time
                                      </h3>

                                      {/* Time unknown checkbox */}
                                      <label className="mb-4 flex items-center justify-center gap-2 cursor-pointer select-none">
                                        <input
                                          type="checkbox"
                                          checked={timeUnknown}
                                          onChange={(e) => {
                                            const checked = e.target.checked;
                                            setTimeUnknown(checked);
                                            if (checked) {
                                              setTime("12:00 PM");
                                              setAmpm("PM");
                                            }
                                          }}
                                          className="size-4 rounded border-white/20 bg-white/5 accent-white/80 cursor-pointer"
                                        />
                                        <span className="text-base text-white/70 font-Satoshi">
                                          I don&apos;t know my birth time
                                        </span>
                                      </label>

                                      <div
                                        className={`relative flex h-52 overflow-hidden transition-opacity ${
                                          timeUnknown
                                            ? "opacity-30 pointer-events-none"
                                            : "opacity-100"
                                        }`}
                                      >
                                        <div className="absolute left-0 right-0 top-1/2 h-12 -translate-y-1/2 rounded-xl bg-white/5 pointer-events-none" />

                                        <div
                                          className="flex-1 overflow-y-auto scrollbar-none text-center snap-y snap-mandatory"
                                          ref={hourRef}
                                          onScroll={() =>
                                            handleScrollSelect(
                                              hourRef,
                                              hours,
                                              "hour",
                                            )
                                          }
                                        >
                                          <div className="h-20" />
                                          {hours.map((h, index) => (
                                            <div
                                              key={h}
                                              onClick={() => {
                                                const m =
                                                  time
                                                    .split(":")[1]
                                                    ?.split(" ")[0] || "00";
                                                setTime(`${h}:${m} ${ampm}`);
                                                scrollToItem(hourRef, index);
                                              }}
                                              className={`h-12 flex items-center justify-center snap-center cursor-pointer transition ${
                                                time.startsWith(h)
                                                  ? "text-white font-semibold text-lg"
                                                  : "text-white/40"
                                              }`}
                                            >
                                              {h}
                                            </div>
                                          ))}
                                          <div className="h-20" />
                                        </div>

                                        <div
                                          className="flex-1 overflow-y-auto scrollbar-none text-center snap-y snap-mandatory"
                                          ref={minuteRef}
                                          onScroll={() =>
                                            handleScrollSelect(
                                              minuteRef,
                                              minutes,
                                              "minute",
                                            )
                                          }
                                        >
                                          <div className="h-20" />
                                          {minutes.map((m, index) => (
                                            <div
                                              key={m}
                                              onClick={() => {
                                                const h = time.split(":")[0];
                                                setTime(`${h}:${m} ${ampm}`);
                                                scrollToItem(minuteRef, index);
                                              }}
                                              className={`h-12 flex items-center justify-center snap-center cursor-pointer transition ${
                                                time.includes(`:${m}`)
                                                  ? "text-white font-semibold text-lg"
                                                  : "text-white/40"
                                              }`}
                                            >
                                              {m}
                                            </div>
                                          ))}
                                          <div className="h-20" />
                                        </div>

                                        <div
                                          className="flex-1 overflow-y-auto scrollbar-none text-center snap-y snap-mandatory"
                                          ref={ampmRef}
                                          onScroll={() =>
                                            handleScrollSelect(
                                              ampmRef,
                                              ["AM", "PM"],
                                              "ampm",
                                            )
                                          }
                                        >
                                          <div className="h-20" />
                                          {["AM", "PM"].map((p, index) => (
                                            <div
                                              key={p}
                                              onClick={() => {
                                                setAmpm(p as "AM" | "PM");
                                                const [h, m] = time.split(":");
                                                const minute = m.split(" ")[0];
                                                setTime(`${h}:${minute} ${p}`);
                                                scrollToItem(ampmRef, index);
                                              }}
                                              className={`h-12 flex items-center justify-center snap-center cursor-pointer transition ${
                                                ampm === p
                                                  ? "text-white font-semibold text-lg"
                                                  : "text-white/40"
                                              }`}
                                            >
                                              {p}
                                            </div>
                                          ))}
                                          <div className="h-20" />
                                        </div>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() => setOpenTime(false)}
                                        className="mt-6 w-full rounded-xl bg-white/10 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
                                      >
                                        Done
                                      </button>
                                    </div>
                                  </div>,
                                  document.body,
                                )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* MOBILE / TABLET FORM (< xl) */}
                <div
                  id="archetype-form"
                  className="block flex relative xl:hidden z-50! flex-1 min-w-0 flex-col items-center md:items-start gap-[52px] md:gap-18! z-20 px-1 md:px-0 max-w-auto mt-10 md:mt-20"
                >
                  <div className="flex flex-col items-center gap-[30px]">
                    <h3 className="text-[#F8F7FC] font-Recoleta text-[32px] sm:text-[38px] md:text-[60px] font-normal leading-[120%] md-w-[600px] text-center md:text-start">
                      Access the Beta
                    </h3>

                    <h4 className="text-[#F8F7FC] text-center font-Satoshi text-[18.204px] md:text-[22px] font-normal leading-[120%]">
                      Generate your behavioral market profile and claim your
                      spot.
                    </h4>
                  </div>

                  {/* MOBILE PHONE MOCKUP */}
                  <div className="block lg:hidden relative shrink-0 w-[91.08px] sm:w-52">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="
                      absolute
                      top-[2.2%]
                      left-[5.5%]
                      w-[89%]
                      h-[95.5%]
                      object-cover
                      rounded-[14px]
                      z-10
                    "
                    >
                      <source src="/archetypereel2.mp4" type="video/mp4" />
                    </video>

                    <img
                      src={phoneMock}
                      alt=""
                      className="relative z-20 w-full h-auto"
                    />
                  </div>

                  <div
                    className="
                          relative
                          flex w-[345px] h-auto lg:h-[300px]
                          flex-col justify-evenly items-start
                          p-[23.12px] 
                          rounded-[16.912px]
                          bg-[rgba(1,1,1,0)]
                          backdrop-blur-[6px]
                          border border-white/20
                          overflow-visible
                          transition-all duration-500
                  
                        "
                  >
                    <div className="flex flex-col gap-[16.71px] "></div>

                    <div className="flex flex-col w-full">
                      {!showNatalForm && (
                        <div className="w-full! flex gap-2.5 items-center md:items-end flex-col md:flex-row justify-between">
                          <div className="flex flex-col gap-[26.5px] flex-1 w-full!">
                            <input
                              className="w-full h-[50.959px] font-Satoshi px-[21.233px] py-[16.986px] rounded-[10.616px] placeholder:text-base sm:placeholder:text-[12px] text-base sm:text-[12px] border border-[rgba(248,247,252,0.1)] outline-none text-center placeholder:text-center text-[#F8F7FC] placeholder:text-[#F8F7FC]/40 placeholder:font-Satoshi placeholder:tracking-[2.07px] placeholder:uppercase"
                              value={names}
                              placeholder="FULL NAME"
                              onChange={(e: any) => setNames(e.target.value)}
                            />
                          </div>

                          <div className="flex flex-col gap-[26.5px] flex-1 w-full!">
                            <input
                              value={email}
                              placeholder="EMAIL ADDRESS"
                              onChange={(e: any) => setEmail(e.target.value)}
                              className="w-full h-[50.959px] font-Satoshi px-[21.233px] py-[16.986px] rounded-[10.616px] placeholder:text-base sm:placeholder:text-[12px] text-base sm:text-[12px] border border-[rgba(248,247,252,0.1)] outline-none text-center placeholder:text-center text-[#F8F7FC] placeholder:text-[#F8F7FC]/40 placeholder:font-Satoshi placeholder:tracking-[2.07px] placeholder:uppercase"
                            />
                          </div>

                          <div
                            onClick={() => {
                              if (names != "" && email != "") {
                                setShowNatalForm(true);
                                setErrMsg("");
                              } else {
                                setTimeout(() => {
                                  setErrMsg(
                                    "Please fill out your name and email",
                                  );
                                }, 5000);
                              }
                            }}
                            className="cursor-pointer flex w-[22.578px] h-[22.538px]  justify-center items-center aspect-square rounded-[53.748px] bg-[rgba(127,168,212,0.1)]"
                          >
                            <ArrowRight size={12} />
                          </div>
                        </div>
                      )}

                      {errMsg && (
                        <p className="text-[#F8F7FC] font-[Satoshi] text-[16px] font-normal leading-[150%]">
                          {errMsg}
                        </p>
                      )}

                      <div className="flex gap-6.5 w-full items-end">
                        <AnimatePresence>
                          {showNatalForm && (
                            <motion.div
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 12 }}
                              transition={{ duration: 0.25 }}
                              className="w-full flex gap-4 items-center md:items-end flex-col md:flex-row"
                            >
                              <div className="flex justify-between items-center w-full gap-2">
                                <div className="flex flex-col gap-[26.5px] flex-1 w-full!">
                                  {/* <label className="text-[#F8F7FC] font-Satoshi text-[13.801px] font-normal leading-[25.48px] tracking-[2.07px] uppercase">
                                  birth date
                                </label> */}

                                  <button
                                    type="button"
                                    onClick={() => setOpenDate(true)}
                                    className="text-center w-full py-4 px-2 border border-[rgba(248,247,252,0.1)] rounded-[10px] font-Satoshi text-[#F8F7FC]/40 font-normal placeholder:text-[11px] text-[11px] leading-[25.48px] tracking-[2.07px] uppercase flex justify-center items-center"
                                  >
                                    {date ? (
                                      format(date, "MMM d, yyyy")
                                    ) : (
                                      <>birth date</>
                                    )}
                                  </button>
                                </div>

                                <div className="flex flex-col gap-[26.5px] flex-1 w-full!">
                                  {/* <label className="text-[#F8F7FC] font-Satoshi text-[13.801px] font-normal leading-[25.48px] tracking-[2.07px] uppercase">
                                  birth time
                                </label> */}
                                  <button
                                    type="button"
                                    onClick={() => setOpenTime(true)}
                                    className="w-full py-4 px-2 border border-[rgba(248,247,252,0.1)] rounded-[10px] font-Satoshi text-[#F8F7FC]/40 font-normal placeholder:text-[11px] text-[11px] leading-[25.48px] tracking-[2.07px] uppercase flex justify-center items-center"
                                  >
                                    {time || <>birth time</>}
                                  </button>
                                </div>
                              </div>

                              {/* TRIGGER — replaces the old inline input */}
                              <div className="flex flex-col gap-[26.5px] flex-1 w-full!">
                                {/* <label className="text-[#F8F7FC] font-Satoshi text-[13.801px] font-normal leading-[25.48px] tracking-[2.07px] uppercase">
                                  Birth Location
                                </label> */}
                                <button
                                  type="button"
                                  onClick={() => setOpenLocation(true)}
                                  className="touch-manipulation w-full py-4 px-5 border border-[rgba(248,247,252,0.1)] rounded-[10px] font-Satoshi font-normal text-[11px] leading-[25.48px] tracking-[2.07px] uppercase flex justify-center items-center text-center"
                                >
                                  <span
                                    className={
                                      data.location
                                        ? "text-[#F8F7FC]/40"
                                        : "text-[#F8F7FC]/40"
                                    }
                                  >
                                    {data.location ||
                                      "BIRTH LOCATION ( CITY, COUNTRY )"}
                                  </span>
                                </button>
                              </div>

                              {/* MODAL — input + suggestions live here now */}
                              {openLocation &&
                                createPortal(
                                  <div className="font-Satoshi fixed inset-0 z-50! flex items-center justify-center p-4">
                                    <div
                                      className="absolute inset-0 bg-black/10 backdrop-blur-md"
                                      onClick={() => setOpenLocation(false)}
                                    />
                                    <div
                                      className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#131827]/95 backdrop-blur-2xl p-6 shadow-2xl"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <button
                                        type="button"
                                        onClick={() => setOpenLocation(false)}
                                        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                      >
                                        <X className="size-4" />
                                      </button>

                                      <h3 className="mb-4 text-center font-Recoleta text-lg font-normal text-white">
                                        Birth Location
                                      </h3>

                                      <input
                                        ref={inputRef}
                                        autoFocus
                                        autoComplete="off"
                                        spellCheck={false}
                                        placeholder="( CITY, COUNTRY )"
                                        value={data.location || ""}
                                        onChange={(e) =>
                                          handleChange(e.target.value)
                                        }
                                        className="py-4 px-5 w-full rounded-[10px] border border-[rgba(248,247,252,0.1)] text-start font-Satoshi text-[#F8F7FC] text-[16px] font-normal tracking-[1.95px] placeholder:text-[#F8F7FC]/40 placeholder:uppercase"
                                      />

                                      {suggestions.length > 0 && (
                                        <div className="mt-2 font-Satoshi rounded-[10px] max-h-[40vh] overflow-auto">
                                          {suggestions.map((s) => (
                                            <div
                                              key={s.place_id}
                                              className="px-4 py-3 cursor-pointer hover:bg-[#2a2a40] text-white/90"
                                              onMouseDown={(e) => {
                                                e.preventDefault();
                                                const placesService = new (
                                                  window as any
                                                ).google.maps.places.PlacesService(
                                                  document.createElement("div"),
                                                );
                                                placesService.getDetails(
                                                  { placeId: s.place_id },
                                                  (place: any) => {
                                                    const lat =
                                                      place.geometry.location.lat();
                                                    const lng =
                                                      place.geometry.location.lng();
                                                    setData({
                                                      ...data,
                                                      location: s.description,
                                                      lat,
                                                      lng,
                                                    });
                                                  },
                                                );
                                                setOpenLocation(false);
                                              }}
                                            >
                                              {s.description}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>,
                                  document.body,
                                )}

                              <button
                                onClick={() => handleSubmitForm()}
                                className="cursor-pointer mb-2 flex w-[30.638px] h-[30.638px] p-[9.937px_8.695px_10.701px_7.867px] justify-center items-center aspect-square rounded-[53.748px] bg-[rgba(127,168,212,0.1)]"
                              >
                                <ArrowRight />
                              </button>

                              {openDate &&
                                createPortal(
                                  <div
                                    className="fixed inset-0 z-50! flex items-center justify-center p-4"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div
                                      className="absolute inset-0 bg-black/10 backdrop-blur-md"
                                      onClick={() => setOpenDate(false)}
                                    />
                                    <div
                                      className="font-Satoshi relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#131827]/95 backdrop-blur-2xl p-6 shadow-2xl"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <div className="flex justify-center">
                                        <Calendar
                                          mode="single"
                                          selected={date as Date}
                                          captionLayout="dropdown"
                                          required
                                          onSelect={(d) => {
                                            if (!d) return;
                                            setDate(d);
                                            setOpenDate(false);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>,
                                  document.body,
                                )}

                              {openTime &&
                                createPortal(
                                  <div className="font-Satoshi fixed inset-0 z-50! flex items-center justify-center p-4">
                                    <div
                                      className="absolute inset-0 bg-black/10"
                                      onClick={() => setOpenTime(false)}
                                    />
                                    <div
                                      className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#131827]/95 backdrop-blur-2xl p-6 shadow-2xl"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <button
                                        type="button"
                                        onClick={() => setOpenTime(false)}
                                        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                      >
                                        <X className="size-4" />
                                      </button>

                                      <h3 className="mb-4 text-center font-Recoleta text-lg font-normal text-white">
                                        Select Birth Time
                                      </h3>

                                      {/* Time unknown checkbox */}
                                      <label className="mb-4 flex items-center justify-center gap-2 cursor-pointer select-none">
                                        <input
                                          type="checkbox"
                                          checked={timeUnknown}
                                          onChange={(e) => {
                                            const checked = e.target.checked;
                                            setTimeUnknown(checked);
                                            if (checked) {
                                              setTime("12:00 PM");
                                              setAmpm("PM");
                                            }
                                          }}
                                          className="size-4 rounded border-white/20 bg-white/5 accent-white/80 cursor-pointer"
                                        />
                                        <span className="text-base text-white/70 font-Satoshi">
                                          I don&apos;t know my birth time
                                        </span>
                                      </label>

                                      <div
                                        className={`relative flex h-52 overflow-hidden transition-opacity ${
                                          timeUnknown
                                            ? "opacity-30 pointer-events-none"
                                            : "opacity-100"
                                        }`}
                                      >
                                        <div className="absolute left-0 right-0 top-1/2 h-12 -translate-y-1/2 rounded-xl bg-white/5 pointer-events-none" />

                                        <div
                                          className="flex-1 overflow-y-auto scrollbar-none text-center snap-y snap-mandatory"
                                          ref={hourRef}
                                          onScroll={() =>
                                            handleScrollSelect(
                                              hourRef,
                                              hours,
                                              "hour",
                                            )
                                          }
                                        >
                                          <div className="h-20" />
                                          {hours.map((h, index) => (
                                            <div
                                              key={h}
                                              onClick={() => {
                                                const m =
                                                  time
                                                    .split(":")[1]
                                                    ?.split(" ")[0] || "00";
                                                setTime(`${h}:${m} ${ampm}`);
                                                scrollToItem(hourRef, index);
                                              }}
                                              className={`h-12 flex items-center justify-center snap-center cursor-pointer transition ${
                                                time.startsWith(h)
                                                  ? "text-white font-semibold text-lg"
                                                  : "text-white/40"
                                              }`}
                                            >
                                              {h}
                                            </div>
                                          ))}
                                          <div className="h-20" />
                                        </div>

                                        <div
                                          className="flex-1 overflow-y-auto scrollbar-none text-center snap-y snap-mandatory"
                                          ref={minuteRef}
                                          onScroll={() =>
                                            handleScrollSelect(
                                              minuteRef,
                                              minutes,
                                              "minute",
                                            )
                                          }
                                        >
                                          <div className="h-20" />
                                          {minutes.map((m, index) => (
                                            <div
                                              key={m}
                                              onClick={() => {
                                                const h = time.split(":")[0];
                                                setTime(`${h}:${m} ${ampm}`);
                                                scrollToItem(minuteRef, index);
                                              }}
                                              className={`h-12 flex items-center justify-center snap-center cursor-pointer transition ${
                                                time.includes(`:${m}`)
                                                  ? "text-white font-semibold text-lg"
                                                  : "text-white/40"
                                              }`}
                                            >
                                              {m}
                                            </div>
                                          ))}
                                          <div className="h-20" />
                                        </div>

                                        <div
                                          className="flex-1 overflow-y-auto scrollbar-none text-center snap-y snap-mandatory"
                                          ref={ampmRef}
                                          onScroll={() =>
                                            handleScrollSelect(
                                              ampmRef,
                                              ["AM", "PM"],
                                              "ampm",
                                            )
                                          }
                                        >
                                          <div className="h-20" />
                                          {["AM", "PM"].map((p, index) => (
                                            <div
                                              key={p}
                                              onClick={() => {
                                                setAmpm(p as "AM" | "PM");
                                                const [h, m] = time.split(":");
                                                const minute = m.split(" ")[0];
                                                setTime(`${h}:${minute} ${p}`);
                                                scrollToItem(ampmRef, index);
                                              }}
                                              className={`h-12 flex items-center justify-center snap-center cursor-pointer transition ${
                                                ampm === p
                                                  ? "text-white font-semibold text-lg"
                                                  : "text-white/40"
                                              }`}
                                            >
                                              {p}
                                            </div>
                                          ))}
                                          <div className="h-20" />
                                        </div>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() => setOpenTime(false)}
                                        className="mt-6 w-full rounded-xl bg-white/10 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
                                      >
                                        Done
                                      </button>
                                    </div>
                                  </div>,
                                  document.body,
                                )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DESKTOP PHONE MOCKUP */}
                <div className="hidden lg:block relative shrink-0 lg:w-90.25 lg:h-182.5 mt-5 lg:mt-20">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="
            absolute
            top-[2.25%]
            left-[5.3%]
            lg:w-[89%]
            lg:h-174
            object-cover
            rounded-[24px]
            z-30!
          "
                  >
                    <source src={"/archetypereel2.mp4"} type="video/mp4" />
                  </video>

                  <img
                    src={phoneMock}
                    alt=""
                    className="relative z-30! w-95.25 h-182.5!"
                  />
                </div>
              </div>

              <div className="block lg:hidden absolute top-0 left-1/2 right-1/2 -mx-[50vw] w-screen h-full z-25 pointer-events-none overflow-hidden">
                {Array.from({ length: BLOCKS }).map((_, block) => (
                  <div
                    key={block}
                    className="absolute left-0 right-0 flex h-full"
                    style={{ top: `${block * 100}vh` }}
                  >
                    {Array.from({ length: LINES }).map((_, i) => {
                      const isActive = activeLines[i];

                      return (
                        <div key={i} className="relative flex-1">
                          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/4" />

                          {isActive && (
                            <motion.div
                              className="absolute left-1/2 top-0 -translate-x-1/2"
                              animate={{
                                y: ["-15vh", "115vh"],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 10 + (i % 3),
                                repeat: Infinity,
                                ease: "linear",
                                delay: block * 0.8 + i * 0.35,
                              }}
                            >
                              <div
                                className="absolute left-1/2 -translate-x-1/2 w-px h-20"
                                style={{
                                  background:
                                    "linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.35), transparent)",
                                }}
                              />
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <SectionReveal>
            <div className="relative w-full sm:h-auto lg:h-[150vh]">
              <div
                id="decode"
                ref={layerRef}
                className="sticky top-30 w-full min-h-screen h-auto flex flex-col items-center gap-[52px] xl:px-12.5 md:px-12.5 py-25! "
              >
                <div className="flex flex-col gap-[30px]">
                  <h2 className="text-[#F8F7FC] text-center font-Recoleta text-[32px] md:text-[60px] font-normal leading-[120%]">
                    The Missing Layer in Modern Market Tools
                  </h2>

                  <h4 className="hidden lg:block text-[#F8F7FC] text-center font-Satoshi text-[22px] md:text-[22px] font-normal leading-[120%]">
                    Modern platforms measure everything about the market and
                    almost nothing about the forces moving through it.
                  </h4>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 80 }}
                  animate={
                    showLayers ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }
                  }
                  transition={{ duration: 0.3 }}
                  className="hidden w-full xl:flex lg:flex-wrap xl:flex-nowrap lg:gap-2 items-center xl:justify-between md:justify-evenly mt-8"
                >
                  {missingLayers.map((data, id) => (
                    <React.Fragment key={id}>
                      {/* Card */}
                      <div
                        className="
                        relative
                        xl:w-130 lg:w-100
                        flex
                        flex-col
                        gap-[31.381px]
                        p-[27.09px]
                        rounded-[16.912px]
                        bg-[rgba(30,37,64,0.24)]
                        backdrop-blur-[2px]
                        border border-white/20
                        shadow-inner
                        overflow-hidden
                        transition-all duration-500
                      "
                      >
                        <div className="flex justify-center">
                          <h4 className="text-[#F8F7FC] text-center font-Satoshi text-[12px] font-bold leading-[140%] tabular-nums uppercase">
                            {data.heading}
                          </h4>
                        </div>
                        <img src={data.imgPath} />

                        <div className="flex flex-col gap-4 items-center">
                          <h3 className="text-[#F8F7FC] font-[Recoleta] text-[24px] text-center leading-[150%]">
                            {data.title}
                          </h3>

                          <p className="text-[#F8F7FC] font-Satoshi text-[13.06px] text-center leading-[150%]">
                            {data.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Divider */}
                      {id < missingLayers.length - 1 && (
                        <div className="hidden xl:block flex justify-center items-center px-6 shrink-0">
                          <svg
                            width="31"
                            height="47"
                            viewBox="0 0 31 47"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              y="8.28125"
                              width="30.6382"
                              height="30"
                              rx="15"
                              fill="#7FA8D4"
                              fillOpacity="0.1"
                            />
                            <path
                              d="M11.0478 22.9958L14.7883 22.9958L14.7883 19.2553L15.8473 19.2553L15.8473 22.9958L19.5878 22.9958L19.5878 24.0548L15.8473 24.0548L15.8473 27.8124L14.7883 27.8124L14.7883 24.0548L11.0478 24.0548L11.0478 22.9958Z"
                              fill="white"
                              fillOpacity="0.8"
                            />
                          </svg>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </motion.div>

                <>
                  {/* Scrollable cards - mobile only */}
                  <motion.div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex lg:hidden w-full snap-x snap-mandatory overflow-x-auto gap-4 scrollbar-none"
                  >
                    {missingLayers.map((data, id) => (
                      <div
                        key={id}
                        className="
            relative
            w-full
            shrink-0
            snap-center
            flex
            flex-col
            gap-[31.381px]
            p-[22px]
            rounded-[16.912px]
            bg-[rgba(30,37,64,0.15)]
            backdrop-blur-[2px]
            border border-white/20
            shadow-inner
            overflow-hidden
            transition-all duration-500
          "
                      >
                        <div className="flex justify-center">
                          <h4 className="text-[#F8F7FC] text-center font-Satoshi text-[6px] font-bold leading-[140%] tabular-nums uppercase">
                            {data.heading}
                          </h4>
                        </div>
                        <img src={data.imgPath} />

                        <div className="flex flex-col gap-4 items-center">
                          <h3 className="text-[#F8F7FC] font-[Recoleta] text-[24px] text-center leading-[150%]">
                            {data.title}
                          </h3>

                          <p className="text-[#F8F7FC] font-Satoshi text-[13.06px] text-center leading-[150%]">
                            {data.subtitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Dot indicator pill - mobile only */}
                  <div className="flex lg:hidden justify-center -mt-2">
                    <div
                      className="inline-flex items-start"
                      style={{
                        height: "20px",
                        padding: "4px 4px 4px 5px",
                        gap: "12px",
                        borderRadius: "23px",
                        background: "rgba(92, 92, 92, 0.60)",
                      }}
                    >
                      {missingLayers.map((_, id) => (
                        <div
                          key={id}
                          className="h-[12px] w-[12px]"
                          style={
                            id === activeIndex
                              ? {
                                  borderRadius: "12px",
                                  background: "#D9D9D9",
                                }
                              : {
                                  borderRadius: "12px",
                                  border: "1px solid #D9D9D9",
                                }
                          }
                        />
                      ))}
                    </div>
                  </div>
                </>

                {/* <div className="absolute inset-0 flex ">
              {Array.from({ length: LINES }).map((_, i) => {
                const isActive = activeLines[i];

                return (
                  <div key={i} className="relative flex-1">
                    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />

                    {isActive && (
                      <motion.div
                        className="absolute left-1/2 top-0 h-22.5 w-px -translate-x-1/2"
                        style={{
                          background:
                            "linear-gradient(to bottom, transparent, rgba(255,255,255,1), transparent)",
                        }}
                        animate={{
                          y: ["-20vh", "120vh"],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 4 + (i % 3),
                          repeat: Infinity,
                          ease: "linear",
                          delay: i * 0.4,
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div> */}
              </div>
              {/* line here */}

              <div className="absolute top-0 left-1/2 right-1/2 -mx-[50vw] w-screen h-full z-25 pointer-events-none overflow-hidden">
                {Array.from({ length: BLOCKS }).map((_, block) => (
                  <div
                    key={block}
                    className="absolute left-0 right-0 flex h-full"
                    style={{ top: `${block * 100}vh` }}
                  >
                    {Array.from({ length: LINES }).map((_, i) => {
                      const isActive = activeLines[i];

                      return (
                        <div key={i} className="relative flex-1">
                          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/4" />

                          {isActive && (
                            <motion.div
                              className="absolute left-1/2 top-0 -translate-x-1/2"
                              animate={{
                                y: ["-15vh", "115vh"],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 10 + (i % 3),
                                repeat: Infinity,
                                ease: "linear",
                                delay: block * 0.8 + i * 0.35,
                              }}
                            >
                              <div
                                className="absolute left-1/2 -translate-x-1/2 w-px h-20"
                                style={{
                                  background:
                                    "linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.35), transparent)",
                                }}
                              />
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="relative w-full sm:h-auto lg:h-[150vh] xl:-mt-60 lg:mt-10">
              <div
                id="ask"
                ref={faqsRef}
                className="sticky top-10 w-full min-h-screen h-auto flex xl:flex-row flex-col lg:justify-between justify-start items-center lg:gap-[60px] gap-[52px] xl:px-12.5 md:px-12.5 py-25!"
              >
                <div className="flex flex-col gap-[30px] items-center xl:items-start">
                  <h2 className="text-[#F8F7FC] text-start font-Recoleta text-[32px] md:text-[60px] font-normal leading-[120%]">
                    FAQs
                  </h2>

                  <h4 className="text-[#F8F7FC] font-Satoshi text-[16.204px] md:text-[22px] font-normal leading-[140%] text-center xl:text-start">
                    Plain answers on the profile, the method, and what Ology
                    will never do. No astrology knowledge required.
                  </h4>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 80 }}
                  animate={
                    showFaqs ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }
                  }
                  transition={{ duration: 0.3 }}
                  className="hidden xl:block w-full flex flex-col gap-4 items-center mt-1 lg:mt-8"
                >
                  <FAQAccordion />
                </motion.div>

                <div className="block xl:hidden w-full flex flex-col gap-4 items-center z-50!">
                  <FAQAccordion />
                </div>
              </div>

              <div className="block lg:hidden absolute top-0 left-1/2 right-1/2 -mx-[50vw] w-screen h-full z-25 pointer-events-none overflow-hidden">
                {Array.from({ length: BLOCKS }).map((_, block) => (
                  <div
                    key={block}
                    className="absolute left-0 right-0 flex h-full"
                    style={{ top: `${block * 100}vh` }}
                  >
                    {Array.from({ length: LINES }).map((_, i) => {
                      const isActive = activeLines[i];

                      return (
                        <div key={i} className="relative flex-1">
                          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/4" />

                          {isActive && (
                            <motion.div
                              className="absolute left-1/2 top-0 -translate-x-1/2"
                              animate={{
                                y: ["-15vh", "115vh"],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 10 + (i % 3),
                                repeat: Infinity,
                                ease: "linear",
                                delay: block * 0.8 + i * 0.35,
                              }}
                            >
                              <div
                                className="absolute left-1/2 -translate-x-1/2 w-px h-20"
                                style={{
                                  background:
                                    "linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.35), transparent)",
                                }}
                              />
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <motion.section
            className="relative w-screen min-h-screen h-auto overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 w-full h-screen overflow-hidden flex items-center justify-center"
              style={{ perspective: "2600px" }}
            >
              {/* Mobile grid - 3 cols x 10 rows, fixed 342px row height */}
              <div
                className="grid grid-cols-3 lg:hidden w-full h-screen"
                style={{ gridTemplateRows: "repeat(6, 1fr)" }}
              >
                {mobileImages.map((img, index) => {
                  const cols = 3;
                  const col = index % cols;
                  const row = Math.floor(index / cols);

                  const baseDelay = 1;
                  const staggerStep = 0.045;
                  const order = row + col;
                  const itemDelay = baseDelay + order * staggerStep;

                  return (
                    <motion.div
                      key={index}
                      className="relative w-full h-full overflow-hidden"
                      initial={{ opacity: 0, scale: 1, filter: "blur(1px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      transition={{
                        duration: 1.4,
                        delay: itemDelay,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                        willChange: "transform, opacity, filter",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={img}
                          alt=""
                          fill
                          priority
                          sizes="33vw"
                          className="object-cover pointer-events-none select-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/40" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Desktop grid - 6 cols x 5 rows, fills parent height */}
              <div className="absolute inset-0 hidden lg:grid lg:grid-cols-6 lg:grid-rows-5 w-full h-full">
                {images.map((img, index) => {
                  const cols = 6;
                  const col = index % cols;
                  const row = Math.floor(index / cols);

                  const baseDelay = 1;
                  const staggerStep = 0.045;
                  const order = row + col;
                  const itemDelay = baseDelay + order * staggerStep;

                  return (
                    <motion.div
                      key={index}
                      className="relative min-w-0 min-h-0 overflow-hidden"
                      initial={{ opacity: 0, scale: 1, filter: "blur(1px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      transition={{
                        duration: 1.4,
                        delay: itemDelay,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                        willChange: "transform, opacity, filter",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <div className="relative w-full h-full scale-[1]">
                        <Image
                          src={img}
                          alt=""
                          fill
                          priority
                          sizes="17vw"
                          className="object-cover scale-[1.03] pointer-events-none select-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/40" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <div className="flex flex-col items-center justify-start lg:justify-between gap-20 lg:gap-20! pt-40 lg:pt-24 w-auto h-[40vh] lg:h-[85vh]">
              <motion.div
                className="relative z-10 mt-10 lg:mt-30 flex min-h-fit w-full xl:items-center items-start justify-center px-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  delay: 1.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex max-w-335 flex-col items-center xl:gap-25 gap-13">
                  <div className="flex flex-col gap-[30px]">
                    <h2 className="text-center font-Recoleta text-[32px] lg:text-[60px] font-normal leading-[120%] text-[#F8F7FC] md:text-[65px]">
                      Ancient Patterns. <br className="block lg:hidden" />{" "}
                      Modern Lens.
                    </h2>

                    <p className="text-center font-Satoshi text-[18px] lg:text-[22px] font-normal leading-[140%] text-[#F8F7FC] md:text-[24px]">
                      Ology aligns your birth chart, collective sentiment, and
                      live market conditions into a single personalized timing
                      layer. It brings context to real decisions and leaves the
                      decisions where they belong, with you.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="
                  cursor-pointer
                  inline-flex
                  flex
                  w-auto
                  py-[14.73px]
                px-[18px]
                  justify-center
                  items-center
                  rounded-[20px]
                  bg-gradient-to-b
                  from-white/10
                  to-[rgba(30,37,64,0.15)]
                  border
                  border-white/20
                  backdrop-blur-xl
                  backdrop-saturate-150
                  shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.15)]
                  hover:bg-white/10
                  hover:border-white/30
                  transition-all
                  duration-500
                "
                  >
                    <Link
                      href="#archetype-form"
                      className="hidden lg:block font-Satoshi font-medium uppercase leading-[150%] tracking-[0.349px] text-[#F8F7FC] text-[12.87px] lg:text-[17.47px]"
                    >
                      REQUEST EARLY ACCESS
                    </Link>

                    <Link
                      href="#archetype-form"
                      className="block lg:hidden font-Satoshi font-medium uppercase leading-[150%] tracking-[0.349px] text-[#F8F7FC] text-[12.87px] lg:text-[17.47px]"
                    >
                      Access the Beta
                    </Link>
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  delay: 1.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
             
              
              w-full
           
              gap-[30px]
              pt-[28px]
              lg:absolute
              pb-[10px]
              lg:px-[80px]
              px-[22px]
              z-50!
              -mt-10
              lg:bottom-10
              flex flex-col items-center!
              
          
            "
              >
                <div className="w-full flex flex-col xl:flex-row gap-4 xl:gap-0 justify-between items-center xl:mt-0">
                  <Link href="#hero">
                    <div className="flex justify-start items-center gap-5">
                      <div className="hidden lg:block">
                        <svg
                          width="20"
                          height="34"
                          viewBox="0 0 20 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.3496 25.2133C4.50781 25.2133 0.760247 20.7516 0.760247 15.7369C0.760247 10.6115 4.65477 6.77663 9.68826 6.77663C15.1994 6.77663 19.0204 10.9802 19.0204 16.1425C19.0204 21.231 15.53 25.2133 10.3496 25.2133ZM10.7905 23.9965C13.6563 23.9965 15.7872 21.3785 15.7872 17.2487C15.7872 12.0864 13.0684 7.99345 9.32085 7.99345C6.19788 7.99345 4.03018 10.5746 4.03018 14.7044C4.03018 19.4242 6.74899 23.9965 10.7905 23.9965Z"
                            fill="#F8F7FC"
                          />
                          <path
                            d="M0.495371 0.0598119C0.885003 -0.131338 1.487 0.138943 2.25581 0.823759C3.02207 1.50631 3.94193 2.59017 4.95557 3.99447C6.98242 6.80247 9.37798 10.8829 11.661 15.5701C13.9441 20.2573 15.6809 24.661 16.6438 27.991C17.1253 29.6564 17.4125 31.0506 17.4785 32.0767C17.5447 33.1062 17.3875 33.749 16.9978 33.9402C16.6082 34.1313 16.0062 33.861 15.2374 33.1762C14.5939 32.603 13.842 31.7467 13.0172 30.6553C12.8599 30.4471 12.7 30.2304 12.5376 30.0055C11.5652 28.6584 10.508 27.0183 9.41899 25.1588H9.80213C11.2132 27.4986 12.5478 29.3986 13.6592 30.6553C14.7814 31.9243 15.6759 32.5373 16.1913 32.2844C17.6546 31.5665 15.5077 24.1415 11.3961 15.7001C7.28449 7.25884 2.76518 0.997758 1.30188 1.71559C0.756021 1.9834 0.712545 3.18459 1.08604 5.02369C1.39058 6.52323 1.97232 8.44689 2.78498 10.6345L2.77393 10.613L2.56112 10.976L2.5565 10.9762C1.84983 9.1567 1.27425 7.47833 0.8494 6.00898C0.751089 5.66897 0.660858 5.34027 0.578977 5.02369C0.259813 3.78968 0.0672037 2.73989 0.0146837 1.92329C-0.0515271 0.893769 0.10574 0.250968 0.495371 0.0598119Z"
                            fill="#F8F7FC"
                          />
                        </svg>
                      </div>

                      <h4 className="text-[#F8F7FC] text-center font-Satoshi text-[11.787px] lg:text-[16px] font-medium leading-[140%]">
                        Pattern over prediction.
                      </h4>
                    </div>
                  </Link>
                  <div className="flex justify-start items-center gap-10 relative xl:-left-10">
                    <Link href="/privacy-policy">
                      <h5 className="text-[#F8F7FC] font-Satoshi text-[11.787px] lg:text-[16px] font-normal leading-normal">
                        Privacy
                      </h5>
                    </Link>
                    <Link href="/Terms-of-service">
                      <h5 className="text-[#F8F7FC] font-Satoshi text-[11.787px] lg:text-[16px] font-normal leading-normal">
                        Terms
                      </h5>
                    </Link>

                    <Link
                      href="mailto:hello@ologyapp.com?subject=Ology%20Inquiry"
                      target="_blank"
                    >
                      <h5 className="text-[#F8F7FC] font-Satoshi text-[11.787px] lg:text-[16px] font-normal leading-normal">
                        Contact
                      </h5>
                    </Link>
                  </div>

                  <div className="flex justify-start items-center gap-[28px]">
                    <Link href="https://x.com/OlogyHQ" target="_blank">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 23 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.4323 1.81104H20.6412L13.6307 9.82363L21.878 20.727H15.4204L10.3626 14.1141L4.57527 20.727H1.36441L8.86288 12.1566L0.951172 1.81104H7.57271L12.1445 7.8554L17.4323 1.81104ZM16.306 18.8063H18.0841L6.60655 3.63084H4.69846L16.306 18.8063Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                    <Link
                      href="https://www.instagram.com/ologyapp/"
                      target="_blank"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 23 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_453_1182)">
                          <path
                            d="M11.4146 2.05553C14.4645 2.05553 14.8256 2.0689 16.0251 2.12241C17.1398 2.17146 17.7417 2.35873 18.143 2.51479C18.6736 2.71989 19.0571 2.96959 19.4539 3.36643C19.8552 3.76772 20.1005 4.14672 20.3056 4.67732C20.4616 5.07862 20.6489 5.68502 20.6979 6.79527C20.7514 7.99916 20.7648 8.36033 20.7648 11.4057C20.7648 14.4556 20.7514 14.8167 20.6979 16.0162C20.6489 17.1309 20.4616 17.7328 20.3056 18.1341C20.1005 18.6647 19.8508 19.0482 19.4539 19.445C19.0526 19.8463 18.6736 20.0915 18.143 20.2966C17.7417 20.4527 17.1353 20.64 16.0251 20.689C14.8212 20.7425 14.46 20.7559 11.4146 20.7559C8.36479 20.7559 8.00362 20.7425 6.80419 20.689C5.68948 20.64 5.08754 20.4527 4.68624 20.2966C4.15564 20.0915 3.77218 19.8418 3.37534 19.445C2.97405 19.0437 2.72881 18.6647 2.5237 18.1341C2.36764 17.7328 2.18037 17.1264 2.13133 16.0162C2.07782 14.8123 2.06444 14.4511 2.06444 11.4057C2.06444 8.35587 2.07782 7.9947 2.13133 6.79527C2.18037 5.68056 2.36764 5.07862 2.5237 4.67732C2.72881 4.14672 2.97851 3.76326 3.37534 3.36643C3.77664 2.96513 4.15564 2.71989 4.68624 2.51479C5.08754 2.35873 5.69394 2.17146 6.80419 2.12241C8.00362 2.0689 8.36479 2.05553 11.4146 2.05553ZM11.4146 0C8.31574 0 7.92782 0.0133765 6.71056 0.0668826C5.49775 0.120389 4.66395 0.316578 3.94162 0.597485C3.18807 0.891768 2.55046 1.27969 1.9173 1.9173C1.27969 2.55046 0.891768 3.18807 0.597485 3.93716C0.316578 4.66395 0.120389 5.49329 0.0668826 6.7061C0.0133765 7.92782 0 8.31574 0 11.4146C0 14.5135 0.0133765 14.9014 0.0668826 16.1187C0.120389 17.3315 0.316578 18.1653 0.597485 18.8877C0.891768 19.6412 1.27969 20.2788 1.9173 20.912C2.55046 21.5451 3.18807 21.9375 3.93716 22.2273C4.66395 22.5082 5.49329 22.7044 6.7061 22.7579C7.92336 22.8114 8.31128 22.8248 11.4102 22.8248C14.5091 22.8248 14.897 22.8114 16.1143 22.7579C17.3271 22.7044 18.1609 22.5082 18.8832 22.2273C19.6323 21.9375 20.2699 21.5451 20.903 20.912C21.5362 20.2788 21.9286 19.6412 22.2184 18.8921C22.4993 18.1653 22.6955 17.336 22.749 16.1232C22.8025 14.9059 22.8159 14.518 22.8159 11.4191C22.8159 8.3202 22.8025 7.93228 22.749 6.71502C22.6955 5.50221 22.4993 4.66841 22.2184 3.94607C21.9375 3.18807 21.5496 2.55046 20.912 1.9173C20.2788 1.28415 19.6412 0.891768 18.8921 0.601944C18.1653 0.321037 17.336 0.124848 16.1232 0.0713415C14.9014 0.0133765 14.5135 0 11.4146 0Z"
                            fill="white"
                          />
                          <path
                            d="M11.4146 5.55127C8.17753 5.55127 5.55127 8.17753 5.55127 11.4146C5.55127 14.6518 8.17753 17.278 11.4146 17.278C14.6518 17.278 17.278 14.6518 17.278 11.4146C17.278 8.17753 14.6518 5.55127 11.4146 5.55127ZM11.4146 15.218C9.31453 15.218 7.61125 13.5148 7.61125 11.4146C7.61125 9.31453 9.31453 7.61125 11.4146 7.61125C13.5148 7.61125 15.218 9.31453 15.218 11.4146C15.218 13.5148 13.5148 15.218 11.4146 15.218Z"
                            fill="white"
                          />
                          <path
                            d="M18.8787 5.31955C18.8787 6.07755 18.2634 6.68842 17.5099 6.68842C16.7519 6.68842 16.141 6.07309 16.141 5.31955C16.141 4.56155 16.7563 3.95068 17.5099 3.95068C18.2634 3.95068 18.8787 4.566 18.8787 5.31955Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_453_1182">
                            <rect
                              width="22.8293"
                              height="22.8293"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </Link>
                    <a
                      href="https://www.linkedin.com/company/ologyapp/"
                      target="_blank"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 23 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_453_1183)">
                          <path
                            d="M21.1394 0H1.68544C0.753544 0 0 0.735709 0 1.64531V21.1795C0 22.0891 0.753544 22.8293 1.68544 22.8293H21.1394C22.0713 22.8293 22.8293 22.0891 22.8293 21.184V1.64531C22.8293 0.735709 22.0713 0 21.1394 0ZM6.77298 19.4539H3.38426V8.55652H6.77298V19.4539ZM5.07862 7.07172C3.99066 7.07172 3.11227 6.19333 3.11227 5.10983C3.11227 4.02633 3.99066 3.14794 5.07862 3.14794C6.16212 3.14794 7.04051 4.02633 7.04051 5.10983C7.04051 6.18887 6.16212 7.07172 5.07862 7.07172ZM19.4539 19.4539H16.0697V14.1568C16.0697 12.895 16.0474 11.2675 14.3084 11.2675C12.5472 11.2675 12.2796 12.6453 12.2796 14.0676V19.4539H8.89985V8.55652H12.1459V10.0458H12.1905C12.6408 9.18967 13.7466 8.28453 15.3919 8.28453C18.8208 8.28453 19.4539 10.5407 19.4539 13.4746V19.4539Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_453_1183">
                            <rect
                              width="22.8293"
                              height="22.8293"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="w-full text-center">
                  <p className="text-[#E8E9F3]/30 text-center font-Satoshi text-[11.787px] lg:text-[16px] font-normal leading-[140%]">
                    Ology provides behavioral and timing context for
                    informational purposes only and is not an investment
                    adviser. © 2026 Ology Intelligence, Inc.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Dark overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 1.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 bg-[rgba(16,21,36,0.85)]"
            />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 1.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 backdrop-blur-lg pointer-events-none"
            />
          </motion.section>
        </section>
      </main>

      {showSpinner && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-md" />

          {/* Spinner */}
          <div className="relative z-10 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
        </div>
      )}

      <div
        className="absolute inset-0 bg-black/10 backdrop-blur-md"
        onClick={() => setOpenTime(false)}
      />

      {showModal &&
        createPortal(
          <div className="fixed inset-0 z-[999999] flex items-center justify-center px-2  lg:p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/10 backdrop-blur-md"
              onClick={() => setOpenTime(false)}
            />

            {/* Modal */}
            <div
              ref={cardRef}
              className="relative flex w-[945.24px] max-w-full min-h-[107.29px] h-auto px-6 py-7 md:p-12.5 flex-col items-center gap-6 md:gap-12.5 rounded-[16.912px] border border-white/50 bg-cover bg-center bg-no-repeat bg-lightgray overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {!showLogoOnModal && (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src={getCardBg(cardType)}
                  className="absolute inset-0 w-full h-full object-cover rounded-[16.912px]"
                />
              )}

              <img
                src={getCardPoster(cardType)}
                alt=""
                onError={(e) => {
                  console.error("Poster failed to load:", e.currentTarget.src);
                }}
                className={`absolute inset-0 w-full h-full object-cover rounded-[16.912px] ${
                  showLogoOnModal ? "block" : "hidden"
                }`}
              />

              <div className="absolute inset-0 rounded-[16.912px] bg-black/45 z-10" />

              {/* Close */}
              {!isDownloading && (
                <div className="flex justify-start items-center gap-2 absolute top-4 right-4 z-50">
                  <div className="relative group">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(!showModal);
                        setShowNatalForm(false);
                        setNames("");
                        setEmail("");
                      }}
                      className="text-white/60 hover:text-white cursor-pointer touch-manipulation"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="relative group"></div>
                </div>
              )}

              {/* TOP SECTION */}
              <div className="flex flex-col md:flex-row w-full justify-start items-center md:items-center z-20 gap-6 md:gap-20">
                {/* LEFT */}
                <div className="flex flex-col items-center md:items-start basis-full lg:basis-[40%] gap-2">
                  <div className="mb-4">
                    {showLogoOnModal && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="70"
                        height="29"
                        viewBox="0 0 101 42"
                        fill="none"
                      >
                        <path
                          d="M11.7222 31.8191C5.10567 31.8191 0.861077 26.7657 0.861077 21.0858C0.861077 15.2806 5.27213 10.9372 10.9732 10.9372C17.2153 10.9372 21.5431 15.6983 21.5431 21.5452C21.5431 27.3086 17.5898 31.8191 11.7222 31.8191ZM12.2216 30.4409C15.4675 30.4409 17.8811 27.4757 17.8811 22.7981C17.8811 16.9512 14.8017 12.3154 10.5571 12.3154C7.0199 12.3154 4.56469 15.2389 4.56469 19.9164C4.56469 25.2622 7.64411 30.4409 12.2216 30.4409Z"
                          fill="#F8F7FC"
                        />
                        <path
                          d="M25.3894 31.4015C24.89 31.4015 24.5987 31.1927 24.5987 30.8585V30.7332C24.5987 29.898 26.0552 29.9397 26.0552 28.478V5.00671C26.0552 3.37792 24.5987 3.12733 24.5987 2.50088V2.41735C24.5987 2.08324 24.8068 1.95795 25.1813 1.74913L28.4272 0.162101C29.2595 -0.255537 29.7172 0.203864 29.7172 0.746795V28.478C29.7172 29.9397 31.3402 29.898 31.3402 30.7332V30.8585C31.3402 31.1927 31.0073 31.4015 30.5079 31.4015H25.3894Z"
                          fill="#F8F7FC"
                        />
                        <path
                          d="M45.0863 31.8191C38.4698 31.8191 34.2252 26.7657 34.2252 21.0858C34.2252 15.2806 38.6362 10.9372 44.3373 10.9372C50.5793 10.9372 54.9072 15.6983 54.9072 21.5452C54.9072 27.3086 50.9539 31.8191 45.0863 31.8191ZM45.5857 30.4409C48.8316 30.4409 51.2452 27.4757 51.2452 22.7981C51.2452 16.9512 48.1657 12.3154 43.9211 12.3154C40.384 12.3154 37.9288 15.2389 37.9288 19.9164C37.9288 25.2622 41.0082 30.4409 45.5857 30.4409Z"
                          fill="#F8F7FC"
                        />
                        <path
                          d="M75.6903 11.3548C77.1051 11.3548 77.3548 11.9813 76.8554 12.3989C76.1064 13.1924 74.6915 13.0254 73.4431 13.3595C75.2325 14.6959 76.3561 16.9929 76.3561 19.1229C76.3561 22.5893 74.4418 25.3039 71.3624 26.6404C74.9828 27.4339 76.7722 29.4386 76.7722 31.9026C76.7722 35.7867 72.7357 38.1672 67.1178 38.1672C60.7093 38.1672 57.6299 34.492 57.6299 31.8191C57.6299 30.9838 58.0877 30.2321 59.1696 30.2321C61.7497 30.2321 60.418 36.789 67.3675 36.8308C70.7798 36.8308 73.0686 34.9514 73.0686 32.1532C73.0686 29.4803 71.2792 27.6427 68.4495 27.3921C67.9085 27.4339 67.4091 27.4757 66.8682 27.4757C61.8745 27.4757 57.9628 23.884 57.9628 19.3735C57.9628 14.4871 61.6248 10.9372 67.1595 10.9372C69.9892 10.9372 70.4469 11.3548 75.6903 11.3548ZM67.534 26.0975C70.7382 26.0975 72.7357 23.6334 72.7357 20.4176C72.7357 16.0741 70.1973 12.2736 66.4936 12.2736C63.4975 12.2736 61.5832 14.6959 61.5832 17.87C61.5832 22.3387 64.1633 26.0975 67.534 26.0975Z"
                          fill="#F8F7FC"
                        />
                        <path
                          d="M99.6682 11.3548C100.001 11.3548 100.251 11.5219 100.251 11.856V11.9813C100.251 12.8166 99.1688 12.7748 98.3782 14.5706L90.5132 31.9862C88.8902 35.6614 86.976 40.2554 82.8979 40.2554C79.7768 40.2554 77.7794 38.1672 77.7794 36.5384C77.7794 35.5779 78.362 34.8679 79.3607 34.8679C81.5246 34.8679 80.942 38.7937 83.5221 38.7937C85.3115 38.7937 87.1425 35.8702 88.5989 32.195L80.6091 14.5289C79.7768 12.7748 78.6117 12.8166 78.6117 11.9813V11.856C78.6117 11.5219 78.903 11.3548 79.2359 11.3548H84.6456C84.9786 11.3548 85.2282 11.5636 85.2282 11.856V11.9813C85.2282 12.8166 83.7301 12.7748 84.5208 14.5706L90.5132 28.7286L96.4639 14.9047C97.3794 12.7748 94.8826 12.8166 94.8826 11.9813V11.856C94.8826 11.5636 95.1323 11.3548 95.5068 11.3548H99.6682Z"
                          fill="#F8F7FC"
                        />
                        <path
                          d="M0.561072 3.32952C1.00238 3.11301 1.68422 3.41914 2.555 4.19479C3.42288 4.96786 4.46474 6.19547 5.61282 7.78602C7.90849 10.9664 10.6218 15.5881 13.2076 20.897C15.7935 26.2058 17.7606 31.1935 18.8512 34.9652C19.3966 36.8514 19.7219 38.4306 19.7966 39.5928C19.8716 40.7588 19.6935 41.4869 19.2522 41.7034C18.8109 41.9199 18.1291 41.6138 17.2583 40.8381C16.5294 40.1889 15.6778 39.219 14.7437 37.9828C14.5655 37.7471 14.3844 37.5017 14.2005 37.2469C13.0991 35.7211 11.9016 33.8634 10.6682 31.7574H11.1022C12.7004 34.4075 14.212 36.5595 15.4708 37.9828C16.7419 39.4202 17.755 40.1144 18.3388 39.828C19.9961 39.0149 17.5644 30.6051 12.9075 21.0442C8.25062 11.4833 3.13192 4.39186 1.47455 5.2049C0.856291 5.50823 0.807049 6.86873 1.23008 8.95175C1.57502 10.6502 2.23391 12.829 3.15435 15.3067L3.14183 15.2823L2.90079 15.6936L2.89557 15.6938C2.09517 13.6329 1.44325 11.7319 0.962055 10.0677C0.850705 9.68261 0.748507 9.31032 0.655766 8.95175C0.294271 7.55407 0.0761169 6.36506 0.0166312 5.44015C-0.0583611 4.27408 0.119764 3.54603 0.561072 3.32952Z"
                          fill="#F8F7FC"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="lg:mb-[36.54px] text-center md:text-left flex w-auto h-auto md:h-[22.84px] flex-col justify-center items-center md:items-start text-[#F8F7FC] font-Recoleta text-[26px] md:text-[35px] font-normal leading-[150%]">
                    {archetype && archetype}
                  </p>

                  <p className="text-[#F8F7FC] text-center md:text-left font-Satoshi text-[13px] md:text-[23px] font-normal leading-[120%]">
                    {tagline && tagline}
                  </p>
                </div>

                {/* RIGHT */}
                <h2 className="text-[#F8F7FC] font-Satoshi text-[13px] text-center md:text-left md:text-[20px] font-normal leading-[150%] basis-full md:basis-[60%]">
                  {synopsisText && synopsisText}
                </h2>
              </div>

              {/* ASTRO ROW — 2x2 grid on mobile, single row on desktop */}
              <div className="grid grid-cols-2 md:flex md:flex-nowrap items-stretch md:items-start gap-3 md:gap-6 w-full z-20">
                <div className="flex w-full min-w-0 md:flex-1 md:min-w-[140px] items-center justify-center gap-[9.691px] px-[10px] py-[11px] lg:p-[11.3px] rounded-[19.381px] border border-[rgba(197,209,224,0.20)] bg-[rgba(21,27,48,0.30)]">
                  <p className="text-[#F8F7FC] font-Satoshi text-[10px] md:text-[15px] font-bold leading-[150%] flex items-center flex-nowrap">
                    {SunIcon && <SunIcon size={16} />} &nbsp; Sun in{" "}
                    {astroSigns?.sun}
                  </p>
                </div>

                <div className="flex w-full min-w-0 md:flex-1 md:min-w-[140px] items-center justify-center gap-[9.691px] px-[10px] py-[11px] lg:p-[11.3px] rounded-[19.381px] border border-[rgba(197,209,224,0.20)] bg-[rgba(21,27,48,0.30)]">
                  <p className="text-[#F8F7FC] font-Satoshi text-[10px] md:text-[15px] font-bold leading-[150%] flex items-center flex-nowrap">
                    {MoonIcon && <MoonIcon size={16} />} &nbsp; Moon in{" "}
                    {astroSigns?.moon}
                  </p>
                </div>

                <div className="flex w-full min-w-0 md:flex-1 md:min-w-[140px] items-center justify-center gap-[9.691px] px-[10px] py-[11px] lg:p-[11.3px] rounded-[19.381px] border border-[rgba(197,209,224,0.20)] bg-[rgba(21,27,48,0.30)]">
                  <p className="text-[#F8F7FC] font-Satoshi text-[10px] md:text-[15px] font-bold leading-[150%] flex items-center flex-nowrap">
                    {MarsIcon && <MarsIcon size={16} />} &nbsp; Mars in{" "}
                    {astroSigns?.mars}
                  </p>
                </div>

                <div className="flex w-full min-w-0 md:flex-1 md:min-w-[140px] items-center justify-center gap-[9.691px] px-[10px] py-[11px] lg:p-[11.3px] rounded-[19.381px] border border-[rgba(197,209,224,0.20)] bg-[rgba(21,27,48,0.30)]">
                  <p className="text-[#F8F7FC] font-Satoshi text-[10px] md:text-[15px] font-bold leading-[150%] flex items-center flex-nowrap">
                    {SaturnIcon && <SaturnIcon size={16} />} &nbsp; Saturn in{" "}
                    {astroSigns?.saturn}
                  </p>
                </div>
              </div>

              {/* DIVIDER */}
              <div className="hidden lg:block flex w-full z-20">
                <div className="w-full h-px bg-[rgba(197,209,224,0.5)]" />
              </div>

              {/* CARDS — 2 cols full width on mobile, side-by-side on desktop */}
              <div className="grid grid-cols-1 md:flex md:flex-row items-start gap-3 md:gap-5 self-stretch w-full z-20">
                <div className="flex flex-row md:flex-col items-center md:items-stretch gap-4 md:gap-5 p-[14px] md:p-[20.67px] rounded-[20.666px] border border-[rgba(197,209,224,0.5)] bg-[rgba(165,196,211,0.03)] md:flex-1">
                  <p className="text-[#F8F7FC] font-Recoleta text-[12px] md:text-[20px] shrink-0 basis-[23%] md:basis-auto">
                    Best Market Conditions
                  </p>

                  <div className="flex flex-col gap-2 h-auto md:h-[80px] flex-1">
                    {bestMarketConditions?.map((con: any) => (
                      <p className="text-[#F8F7FC] text-[9.5px] md:text-[14px] font-Satoshi">
                        ✦ {con}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-stretch gap-4 md:gap-5 p-[14px] md:p-[20.67px] rounded-[20.666px] border border-[rgba(197,209,224,0.5)] bg-[rgba(165,196,211,0.03)] md:flex-1">
                  <p className="text-[#F8F7FC] font-Recoleta text-[12px] md:text-[20px] shrink-0 basis-[23%] md:basis-auto">
                    Shadow
                  </p>

                  <p className="text-[#F8F7FC] text-[9.5px] md:text-[14px] h-auto md:h-[80px] flex-1 font-Satoshi">
                    {ShadowText}
                  </p>
                </div>
              </div>

              {/* DIVIDER */}
              {!hideDivider && (
                <div className="flex w-full z-20">
                  <div className="w-full h-px bg-[rgba(197,209,224,0.5)]" />
                </div>
              )}

              {/* FOOTER section — stacked/centered on mobile, row on desktop */}
              {!hideFooter && (
                <div className="relative z-20 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 w-full h-auto">
                  <div className="flex flex-col lg:gap-4 items-center md:items-start text-center md:text-left">
                    <p className="font-Satoshi text-[12px] lg:text-[20px] font-normal leading-[140%] tracking-normal">
                      You're on the list.{" "}
                    </p>
                    <p className="font-Satoshi text-[12px] lg:text-[20px] font-normal leading-[140%] tracking-normal">
                      Your full Trade DNA opens when we launch.
                    </p>
                  </div>
                  <div className="flex flex-col gap-[11px] items-center md:items-end">
                    <div className="hidden lg:flex justify-center md:justify-start gap-4">
                      <button
                        onClick={handleShare}
                        className="touch-manipulation flex h-[44.287px] items-center gap-[9px] cursor-pointer rounded-[14.421px] border border-[rgba(197,209,224,0.5)] bg-[rgba(30,37,64,0.30)] p-[17.054px]"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_490_777)">
                            <path
                              d="M9.66659 7.33387C9.28854 7.33418 8.91625 7.42647 8.58184 7.60278C8.24743 7.77909 7.96093 8.03412 7.74709 8.34587L4.49259 6.87637C4.72374 6.31818 4.72464 5.69121 4.49509 5.13237L7.74509 3.65537C8.06202 4.11375 8.53275 4.44335 9.07189 4.58439C9.61102 4.72543 10.1828 4.66857 10.6836 4.42412C11.1844 4.17967 11.5811 3.76382 11.8015 3.252C12.022 2.74019 12.0517 2.1663 11.8853 1.63445C11.7189 1.10261 11.3673 0.648016 10.8945 0.353145C10.4216 0.0582749 9.85868 -0.0573459 9.30786 0.0272559C8.75704 0.111858 8.25479 0.391078 7.89221 0.814269C7.52962 1.23746 7.33072 1.77659 7.33159 2.33387C7.33371 2.46577 7.34709 2.59725 7.37159 2.72687L3.91659 4.29687C3.58476 3.98598 3.16934 3.77879 2.72138 3.70075C2.27341 3.62271 1.8124 3.67723 1.39499 3.8576C0.977583 4.03797 0.621951 4.33634 0.371786 4.71605C0.121622 5.09576 -0.0121789 5.54028 -0.013178 5.99499C-0.014177 6.4497 0.117669 6.89481 0.366163 7.27561C0.614656 7.65642 0.968974 7.95635 1.38559 8.13856C1.8022 8.32076 2.26296 8.3773 2.71127 8.30123C3.15957 8.22516 3.5759 8.0198 3.90909 7.71037L7.37309 9.27437C7.34903 9.40388 7.33582 9.53517 7.33359 9.66687C7.33349 10.1284 7.47028 10.5797 7.72665 10.9635C7.98302 11.3473 8.34745 11.6465 8.77387 11.8231C9.20028 11.9998 9.66951 12.0461 10.1222 11.9561C10.5749 11.866 10.9907 11.6438 11.3171 11.3174C11.6435 10.991 11.8658 10.5752 11.9558 10.1225C12.0458 9.66979 11.9995 9.20056 11.8229 8.77415C11.6462 8.34773 11.347 7.9833 10.9632 7.72693C10.5794 7.47056 10.1282 7.33377 9.66659 7.33387V7.33387ZM9.66659 1.00037C9.93035 1.00027 10.1882 1.07839 10.4076 1.22486C10.6269 1.37133 10.7979 1.57956 10.8989 1.82321C10.9999 2.06687 11.0264 2.33501 10.975 2.59371C10.9236 2.85242 10.7967 3.09007 10.6102 3.27662C10.4237 3.46316 10.1861 3.59021 9.92743 3.64171C9.66874 3.6932 9.40059 3.66682 9.1569 3.56591C8.9132 3.46499 8.70491 3.29408 8.55836 3.07477C8.41181 2.85547 8.33359 2.59763 8.33359 2.33387C8.33385 1.98037 8.47436 1.64142 8.72428 1.39141C8.97419 1.1414 9.31309 1.00077 9.66659 1.00037V1.00037ZM2.33359 7.33387C2.06983 7.33397 1.81196 7.25584 1.5926 7.10938C1.37324 6.96291 1.20224 6.75468 1.10124 6.51102C1.00023 6.26737 0.973753 5.99923 1.02515 5.74052C1.07655 5.48182 1.20351 5.24416 1.38998 5.05762C1.57646 4.87107 1.81406 4.74402 2.07275 4.69253C2.33144 4.64103 2.59959 4.66741 2.84328 4.76833C3.08698 4.86924 3.29527 5.04016 3.44182 5.25946C3.58837 5.47877 3.66659 5.73661 3.66659 6.00037C3.66619 6.35383 3.52564 6.6927 3.27575 6.94268C3.02587 7.19266 2.68705 7.33334 2.33359 7.33387ZM9.66659 11.0004C9.40285 11.0004 9.14503 10.9222 8.92574 10.7756C8.70644 10.6291 8.53552 10.4208 8.4346 10.1772C8.33367 9.93351 8.30726 9.66539 8.35871 9.40672C8.41016 9.14804 8.53717 8.91044 8.72366 8.72394C8.91015 8.53745 9.14776 8.41045 9.40644 8.35899C9.66511 8.30754 9.93323 8.33395 10.1769 8.43488C10.4206 8.53581 10.6288 8.70672 10.7754 8.92602C10.9219 9.14531 11.0001 9.40313 11.0001 9.66687C10.9998 10.0205 10.8592 10.3595 10.6092 10.6095C10.3592 10.8595 10.0202 11.0001 9.66659 11.0004V11.0004Z"
                              fill="#E8E9F3"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_490_777">
                              <rect width="14" height="14" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <p className="font-satoshi text-[14.9px] font-medium leading-[150%] tracking-[0.02em] text-center uppercase">
                          Share{" "}
                        </p>
                      </button>

                      <button
                        onClick={handleCopy}
                        className="touch-manipulation flex h-[44.287px] items-center gap-[9px] cursor-pointer rounded-[14.421px] border border-[rgba(197,209,224,0.5)] bg-[rgba(30,37,64,0.30)] p-[17.054px]"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_490_772)">
                            <path
                              d="M6.92263 8.63347L5.29163 10.2645C4.81809 10.7253 4.18214 10.9813 3.52136 10.9768C2.86058 10.9724 2.22811 10.708 1.76079 10.2408C1.29347 9.77362 1.02888 9.14123 1.02426 8.48045C1.01965 7.81967 1.27538 7.18364 1.73613 6.70997L3.36713 5.07748C3.46089 4.98366 3.51353 4.85644 3.51348 4.7238C3.51344 4.59117 3.4607 4.46398 3.36688 4.37023C3.27306 4.27647 3.14584 4.22383 3.01321 4.22388C2.88057 4.22392 2.75339 4.27666 2.65963 4.37048L1.02913 6.00297C0.370268 6.66217 0.000253965 7.5561 0.000488393 8.4881C0.00072282 9.42011 0.371187 10.3139 1.03038 10.9727C1.68958 11.6316 2.58351 12.0016 3.51552 12.0014C4.44753 12.0011 5.34127 11.6307 6.00013 10.9715L7.63113 9.34047C7.72221 9.24617 7.77261 9.11987 7.77147 8.98877C7.77033 8.85767 7.71775 8.73226 7.62504 8.63956C7.53234 8.54686 7.40693 8.49427 7.27583 8.49313C7.14474 8.49199 7.01843 8.54239 6.92413 8.63347H6.92263Z"
                              fill="#E8E9F3"
                            />
                            <path
                              d="M10.9722 1.03076C10.6469 0.703164 10.2597 0.443396 9.83326 0.266504C9.40678 0.0896132 8.94944 -0.000884087 8.48773 0.000256461C8.02627 -0.000969404 7.56914 0.0892955 7.14277 0.265832C6.71641 0.442369 6.32926 0.701675 6.00373 1.02876L4.37023 2.66026C4.27641 2.75401 4.22368 2.8812 4.22363 3.01383C4.22359 3.14647 4.27623 3.27369 4.36998 3.36751C4.46374 3.46133 4.59092 3.51406 4.72356 3.51411C4.85619 3.51415 4.98341 3.46151 5.07723 3.36776L6.70973 1.73676C6.94251 1.50258 7.21943 1.31691 7.52445 1.19049C7.82948 1.06406 8.15655 0.999407 8.48673 1.00026C8.98387 1.00042 9.46979 1.14797 9.88308 1.42426C10.2964 1.70054 10.6185 2.09315 10.8086 2.55247C10.9988 3.01178 11.0486 3.51717 10.9516 4.00475C10.8546 4.49232 10.6152 4.9402 10.2637 5.29176L8.63273 6.92276C8.53891 7.01658 8.48621 7.14383 8.48621 7.27651C8.48621 7.40919 8.53891 7.53644 8.63273 7.63026C8.72655 7.72408 8.8538 7.77679 8.98648 7.77679C9.11917 7.77679 9.24641 7.72408 9.34023 7.63026L10.9712 6.00026C11.6293 5.34081 11.9989 4.44731 11.9991 3.51571C11.9993 2.58412 11.63 1.69047 10.9722 1.03076Z"
                              fill="#E8E9F3"
                            />
                            <path
                              d="M7.14679 4.14646L4.14678 7.14645C4.09903 7.19258 4.06094 7.24775 4.03473 7.30875C4.00853 7.36975 3.99474 7.43536 3.99416 7.50175C3.99358 7.56814 4.00623 7.63398 4.03137 7.69543C4.05651 7.75688 4.09364 7.8127 4.14059 7.85965C4.18753 7.9066 4.24336 7.94372 4.30481 7.96886C4.36626 7.994 4.4321 8.00665 4.49849 8.00608C4.56487 8.0055 4.63048 7.99171 4.69149 7.9655C4.75249 7.9393 4.80766 7.90121 4.85378 7.85345L7.85379 4.85346C7.94486 4.75916 7.99526 4.63286 7.99412 4.50176C7.99298 4.37066 7.9404 4.24525 7.84769 4.15255C7.75499 4.05985 7.62958 4.00726 7.49849 4.00612C7.36739 4.00498 7.24109 4.05538 7.14679 4.14646Z"
                              fill="#E8E9F3"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_490_772">
                              <rect width="14" height="14" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <p className="font-satoshi text-[14.9px] font-medium leading-[150%] tracking-[0.02em] text-center uppercase">
                          {copied ? "COPIED!" : "COPY LINK"}{" "}
                        </p>
                      </button>
                    </div>

                    <div className="lg:hidden flex justify-center md:justify-start gap-4 w-full!">
                      <button
                        onClick={handleShare}
                        className="touch-manipulation w-[136px] flex flex-1 items-center justify-center gap-[8px] rounded-[13px] bg-[rgba(30,37,64,0.30)] px-4.5 py-3.5"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_490_777)">
                            <path
                              d="M9.66659 7.33387C9.28854 7.33418 8.91625 7.42647 8.58184 7.60278C8.24743 7.77909 7.96093 8.03412 7.74709 8.34587L4.49259 6.87637C4.72374 6.31818 4.72464 5.69121 4.49509 5.13237L7.74509 3.65537C8.06202 4.11375 8.53275 4.44335 9.07189 4.58439C9.61102 4.72543 10.1828 4.66857 10.6836 4.42412C11.1844 4.17967 11.5811 3.76382 11.8015 3.252C12.022 2.74019 12.0517 2.1663 11.8853 1.63445C11.7189 1.10261 11.3673 0.648016 10.8945 0.353145C10.4216 0.0582749 9.85868 -0.0573459 9.30786 0.0272559C8.75704 0.111858 8.25479 0.391078 7.89221 0.814269C7.52962 1.23746 7.33072 1.77659 7.33159 2.33387C7.33371 2.46577 7.34709 2.59725 7.37159 2.72687L3.91659 4.29687C3.58476 3.98598 3.16934 3.77879 2.72138 3.70075C2.27341 3.62271 1.8124 3.67723 1.39499 3.8576C0.977583 4.03797 0.621951 4.33634 0.371786 4.71605C0.121622 5.09576 -0.0121789 5.54028 -0.013178 5.99499C-0.014177 6.4497 0.117669 6.89481 0.366163 7.27561C0.614656 7.65642 0.968974 7.95635 1.38559 8.13856C1.8022 8.32076 2.26296 8.3773 2.71127 8.30123C3.15957 8.22516 3.5759 8.0198 3.90909 7.71037L7.37309 9.27437C7.34903 9.40388 7.33582 9.53517 7.33359 9.66687C7.33349 10.1284 7.47028 10.5797 7.72665 10.9635C7.98302 11.3473 8.34745 11.6465 8.77387 11.8231C9.20028 11.9998 9.66951 12.0461 10.1222 11.9561C10.5749 11.866 10.9907 11.6438 11.3171 11.3174C11.6435 10.991 11.8658 10.5752 11.9558 10.1225C12.0458 9.66979 11.9995 9.20056 11.8229 8.77415C11.6462 8.34773 11.347 7.9833 10.9632 7.72693C10.5794 7.47056 10.1282 7.33377 9.66659 7.33387V7.33387ZM9.66659 1.00037C9.93035 1.00027 10.1882 1.07839 10.4076 1.22486C10.6269 1.37133 10.7979 1.57956 10.8989 1.82321C10.9999 2.06687 11.0264 2.33501 10.975 2.59371C10.9236 2.85242 10.7967 3.09007 10.6102 3.27662C10.4237 3.46316 10.1861 3.59021 9.92743 3.64171C9.66874 3.6932 9.40059 3.66682 9.1569 3.56591C8.9132 3.46499 8.70491 3.29408 8.55836 3.07477C8.41181 2.85547 8.33359 2.59763 8.33359 2.33387C8.33385 1.98037 8.47436 1.64142 8.72428 1.39141C8.97419 1.1414 9.31309 1.00077 9.66659 1.00037V1.00037ZM2.33359 7.33387C2.06983 7.33397 1.81196 7.25584 1.5926 7.10938C1.37324 6.96291 1.20224 6.75468 1.10124 6.51102C1.00023 6.26737 0.973753 5.99923 1.02515 5.74052C1.07655 5.48182 1.20351 5.24416 1.38998 5.05762C1.57646 4.87107 1.81406 4.74402 2.07275 4.69253C2.33144 4.64103 2.59959 4.66741 2.84328 4.76833C3.08698 4.86924 3.29527 5.04016 3.44182 5.25946C3.58837 5.47877 3.66659 5.73661 3.66659 6.00037C3.66619 6.35383 3.52564 6.6927 3.27575 6.94268C3.02587 7.19266 2.68705 7.33334 2.33359 7.33387ZM9.66659 11.0004C9.40285 11.0004 9.14503 10.9222 8.92574 10.7756C8.70644 10.6291 8.53552 10.4208 8.4346 10.1772C8.33367 9.93351 8.30726 9.66539 8.35871 9.40672C8.41016 9.14804 8.53717 8.91044 8.72366 8.72394C8.91015 8.53745 9.14776 8.41045 9.40644 8.35899C9.66511 8.30754 9.93323 8.33395 10.1769 8.43488C10.4206 8.53581 10.6288 8.70672 10.7754 8.92602C10.9219 9.14531 11.0001 9.40313 11.0001 9.66687C10.9998 10.0205 10.8592 10.3595 10.6092 10.6095C10.3592 10.8595 10.0202 11.0001 9.66659 11.0004V11.0004Z"
                              fill="#E8E9F3"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_490_777">
                              <rect width="14" height="14" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <p className="font-Satoshi text-[12px] lg:text-[14.9px] font-medium leading-[150%] tracking-[0.02em] text-center uppercase">
                          Share{" "}
                        </p>
                      </button>

                      <button
                        onClick={handleCopy}
                        className="touch-manipulation w-[136px] flex flex-1 items-center justify-center gap-[8px] rounded-[13px] bg-[rgba(30,37,64,0.30)] px-4.5 py-3.5"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_490_772)">
                            <path
                              d="M6.92263 8.63347L5.29163 10.2645C4.81809 10.7253 4.18214 10.9813 3.52136 10.9768C2.86058 10.9724 2.22811 10.708 1.76079 10.2408C1.29347 9.77362 1.02888 9.14123 1.02426 8.48045C1.01965 7.81967 1.27538 7.18364 1.73613 6.70997L3.36713 5.07748C3.46089 4.98366 3.51353 4.85644 3.51348 4.7238C3.51344 4.59117 3.4607 4.46398 3.36688 4.37023C3.27306 4.27647 3.14584 4.22383 3.01321 4.22388C2.88057 4.22392 2.75339 4.27666 2.65963 4.37048L1.02913 6.00297C0.370268 6.66217 0.000253965 7.5561 0.000488393 8.4881C0.00072282 9.42011 0.371187 10.3139 1.03038 10.9727C1.68958 11.6316 2.58351 12.0016 3.51552 12.0014C4.44753 12.0011 5.34127 11.6307 6.00013 10.9715L7.63113 9.34047C7.72221 9.24617 7.77261 9.11987 7.77147 8.98877C7.77033 8.85767 7.71775 8.73226 7.62504 8.63956C7.53234 8.54686 7.40693 8.49427 7.27583 8.49313C7.14474 8.49199 7.01843 8.54239 6.92413 8.63347H6.92263Z"
                              fill="#E8E9F3"
                            />
                            <path
                              d="M10.9722 1.03076C10.6469 0.703164 10.2597 0.443396 9.83326 0.266504C9.40678 0.0896132 8.94944 -0.000884087 8.48773 0.000256461C8.02627 -0.000969404 7.56914 0.0892955 7.14277 0.265832C6.71641 0.442369 6.32926 0.701675 6.00373 1.02876L4.37023 2.66026C4.27641 2.75401 4.22368 2.8812 4.22363 3.01383C4.22359 3.14647 4.27623 3.27369 4.36998 3.36751C4.46374 3.46133 4.59092 3.51406 4.72356 3.51411C4.85619 3.51415 4.98341 3.46151 5.07723 3.36776L6.70973 1.73676C6.94251 1.50258 7.21943 1.31691 7.52445 1.19049C7.82948 1.06406 8.15655 0.999407 8.48673 1.00026C8.98387 1.00042 9.46979 1.14797 9.88308 1.42426C10.2964 1.70054 10.6185 2.09315 10.8086 2.55247C10.9988 3.01178 11.0486 3.51717 10.9516 4.00475C10.8546 4.49232 10.6152 4.9402 10.2637 5.29176L8.63273 6.92276C8.53891 7.01658 8.48621 7.14383 8.48621 7.27651C8.48621 7.40919 8.53891 7.53644 8.63273 7.63026C8.72655 7.72408 8.8538 7.77679 8.98648 7.77679C9.11917 7.77679 9.24641 7.72408 9.34023 7.63026L10.9712 6.00026C11.6293 5.34081 11.9989 4.44731 11.9991 3.51571C11.9993 2.58412 11.63 1.69047 10.9722 1.03076Z"
                              fill="#E8E9F3"
                            />
                            <path
                              d="M7.14679 4.14646L4.14678 7.14645C4.09903 7.19258 4.06094 7.24775 4.03473 7.30875C4.00853 7.36975 3.99474 7.43536 3.99416 7.50175C3.99358 7.56814 4.00623 7.63398 4.03137 7.69543C4.05651 7.75688 4.09364 7.8127 4.14059 7.85965C4.18753 7.9066 4.24336 7.94372 4.30481 7.96886C4.36626 7.994 4.4321 8.00665 4.49849 8.00608C4.56487 8.0055 4.63048 7.99171 4.69149 7.9655C4.75249 7.9393 4.80766 7.90121 4.85378 7.85345L7.85379 4.85346C7.94486 4.75916 7.99526 4.63286 7.99412 4.50176C7.99298 4.37066 7.9404 4.24525 7.84769 4.15255C7.75499 4.05985 7.62958 4.00726 7.49849 4.00612C7.36739 4.00498 7.24109 4.05538 7.14679 4.14646Z"
                              fill="#E8E9F3"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_490_772">
                              <rect width="14" height="14" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <p className="font-Satoshi text-[12px] lg:text-[14.9px] font-medium leading-[150%] tracking-[0.02em] text-center uppercase">
                          {copied ? "COPIED!" : "COPY LINK"}{" "}
                        </p>
                      </button>
                    </div>
                    <p className="font-Satoshi text-[10px] font-normal leading-[140%] tracking-[0.01em] text-center">
                      Every friend who joins through your link moves you up.
                    </p>
                  </div>
                </div>
              )}

              {hideFooterLogo && (
                <div className="w-full flex justify-center text-center z-30!">
                  <p className="text-[#F8F7FC] font-Recoleta text-[18px]">
                    ologyapp.com
                  </p>
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
