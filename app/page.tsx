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
import { signalAhead, confirmedSignals, missingLayers } from "@/mockData";
import { ArrowRight, CloudDownload, Loader2, Menu } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { ChevronDownIcon, X } from "lucide-react";
import { Calendar } from "../components/ui/calendar";
import { format } from "date-fns";
import { createPortal } from "react-dom";
import synopsis from "../components/synopsis.json";
import { toPng } from "html-to-image";

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

const renderCards = (items: any[]) => (
  <div className="flex flex-col md:flex-row justify-start items-center gap-[47.447px] w-full overflow-x-auto flex-nowrap no-scrollbar">
    {items.map((data, id) => (
      <div
        key={id}
        className="
    flex shrink-0 w-[375px] h-auto md:w-[599px] md:h-[400px]
    p-[22px] md:p-[31px] flex-col
    justify-between
    rounded-[16.912px]
    gap-auto
    bg-[rgba(30,37,64,0.3)]
    backdrop-blur-sm border border-white/10
    overflow-hidden
  "
      >
        <div className="w-full flex justify-between items-center ">
          <h1 className="text-[#F8F7FC] font-Satoshi text-[12.638px] font-bold leading-[120%] tracking-[2.148px] uppercase">
            {data.date}
          </h1>

          <div className="flex justify-start items-center gap-[12.55px]">
            <div
              className="w-[21.96px] h-[21.96px] rounded-full flex justify-center items-center"
              style={{ backgroundColor: data.buttonColor }}
            >
              <div
                className="w-[14.64px] h-[14.64px] rounded-full"
                style={{ backgroundColor: data.statusColor }}
              />
            </div>

            <p className="text-[#F8F7FC] font-Satoshi text-[12.638px] font-normal leading-[120%] tracking-[2.148px] uppercase">
              {data.signal}
            </p>
          </div>
        </div>

        <div className="gap-[31.38px] flex flex-col mt-6 md:mt-0">
          <h2 className="text-[#F8F7FC] font-Recoleta text-[25.105px] font-normal leading-[130%]">
            {data.title}
          </h2>

          <p className="text-[#F8F7FC] font-Satoshi text-[18.829px] font-normal leading-[150%]">
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
            className="flex gap-[20.2px] py-[15px] lg:py-[25.408px] px-[12px] lg:px-[15.88px] rounded-[16.16px]"
            style={{ backgroundColor: data.buttonColor }}
          >
            <span className="text-center justify-center text-slate-50 text-[15.154px] font-bold font-Satoshi uppercase leading-6">
              {data.button_text}
            </span>
          </button>

          <div className="flex flex-col items-center justify-between gap-[17.26px]">
            {data.status && data.status == "UPCOMING" && (
              <p
                className="font-Satoshi text-[12.638px] font-bold leading-[120%] tracking-[2.148px] uppercase"
                style={{ color: data.statusColor }}
              >
                {data.status}
              </p>
            )}

            <div className="flex gap-2 text-white">
              {data.icon.map((svg: any, i: any) => (
                <div
                  key={i}
                  className="w-[22px] h-[22px] flex items-center justify-center text-white"
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

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
  const [formatted, setFormatted] = React.useState<{
    dob: string;
    time: string;
  } | null>(null);

  const [aheadOpen, setAheadOpen] = useState(true);
  const [recordOpen, setRecordOpen] = useState(true);

  const cardRef = useRef<HTMLDivElement>(null);

  const [showNatalForm, setShowNatalForm] = useState(false);
  const [errMsg, setErrMsg] = useState("");

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

  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const cols = 6;
  const rows = 5;

  const [LINES, setLINES] = useState(16);

  useEffect(() => {
    const updateLines = () => {
      setLINES(window.innerWidth < 720 ? 6 : 16);
    };

    updateLines(); // run on mount

    window.addEventListener("resize", updateLines);

    return () => window.removeEventListener("resize", updateLines);
  }, []);

  const activeLines = useMemo(() => {
    return Array.from({ length: LINES }).map(() => Math.random() > 0.7);
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

    setShowSpinner(true);

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
        }),
      });

      const result = await res.json();
      console.log("astro result", result);
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

  console.log("astroSigns", astroSigns);

  const getCardBg = (type: string) => {
    if (!type) return "/StatBox.png";

    const fileName = type.replace(/\s+/g, "") + ".mp4";
    console.log("Calibrated Maverick", `/${fileName}`);
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

  useEffect(() => {
    mouseX.set(mousePosition.x);
    mouseY.set(mousePosition.y);
  }, [mousePosition]);

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

  return (
    <div
      className="flex flex-col scroll-smooth relative cursor-pointer mb-0! overflow-x-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-[9999]! mix-blend-screen"
        style={{
          background: useMotionTemplate`
      radial-gradient(
        75px circle at ${mousePosition.x}px ${mousePosition.y}px,
        rgba(210, 255, 240, 0.22),
        rgba(180, 235, 255, 0.12),
        transparent 70%
      )
    `,
        }}
      />
      <div className="fixed inset-0 z-0! overflow-hidden pointer-events-none bg-[#0d1220]"></div>
      {/* HERO SECTION */}
      <section className="relative min-h-screen h-auto  z-50!">
        <div className="absolute inset-0 bg-[#0d1220]" />

        <div
          className="absolute inset-0 w-full h-screen overflow-hidden flex items-center justify-center"
          style={{ perspective: "2600px" }}
        >
          {/* FLOWER SYSTEM */}
          <div
            className="absolute inset-0 grid grid-cols-6 grid-rows-5 w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {images.slice(0, 30).map((img, index) => {
              const cols = 6;
              const rows = 5;

              const col = index % cols;
              const row = Math.floor(index / cols);

              const u = col / (cols - 1);
              const v = row / (rows - 1);

              const theta = (u - 0.5) * Math.PI * 1.65;

              const phi = (v - 0.5) * Math.PI * 1.08;

              const radius = 240;

              const sphereX = Math.sin(theta) * Math.cos(phi) * radius;

              const sphereY = Math.sin(phi) * radius;

              const sphereZ = Math.cos(theta) * Math.cos(phi) * radius;

              const depth = (sphereZ + radius) / (radius * 2);

              const curveScale = 0.38 + depth * 0.12;

              const opacity = 0.08 + depth * 0.95;

              const rotateY = Math.sin(theta) * 68;

              const rotateX = -Math.sin(phi) * 30;

              const compression = 0.96;

              const startX = sphereX * compression;

              const startY = sphereY * compression;

              const zStart = (sphereZ - radius) * 1.4;

              const bloom = 1 + (1 - depth) * 0.55;

              return (
                <motion.div
                  key={index}
                  className="
            relative
            min-w-0
            min-h-0
            overflow-hidden
          "
                  initial={{
                    x: startX,
                    y: startY,

                    z: zStart,

                    scale: curveScale * bloom,

                    rotateY,
                    rotateX,

                    opacity: 0,

                    filter: "blur(12px)",
                  }}
                  animate={{
                    x: 0,
                    y: 0,

                    z: 0,

                    scale: 1,

                    rotateY: 0,
                    rotateX: 0,

                    opacity: 1,

                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 2,
                    delay: 3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* TILE */}
                  <div
                    className="
              relative
              w-full
              h-full
              scale-[1]
            "
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      priority
                      className="
                object-cover
                scale-[1.03]
                pointer-events-none
                select-none
              "
                    />

                    <div
                      className="
                absolute
                inset-0
                bg-gradient-to-br
                from-white/10
                via-transparent
                to-black/40
              "
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <>
          <div className="absolute inset-0 z-10 bg-[rgba(17,17,17,0.75)]" />

          <motion.div
            initial={{
              opacity: 0,
              backdropFilter: "blur(1px)",
            }}
            animate={{
              opacity: 1,
              backdropFilter: "blur(4px)",
            }}
            transition={{
              duration: 2,
              delay: 3, // starts after 2 seconds
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 z-10 bg-transparent"
          />
        </>

        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-5 md:px-10 py-6 md:py-10 ">
          <motion.header
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 2,
              delay: 2.5,
            }}
            className="
                  flex
                  items-center
                  justify-between
                  h-[65.771px]
                  px-[20px]
                  md:px-[30px]
                  py-[10px]
                  rounded-[16.912px]
                  border
                  border-[#7478895c]
                  bg-[#1e2540]/30
                  backdrop-blur-xl
                "
          >
            <div className="flex w-full items-center justify-between py-4 px-2 md:px-6 z-50">
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

              {/* <nav className="hidden md:block">
                <ul className="flex items-center gap-[65px]">
                  {["Align", "Decode", "Perform"].map((item) => (
                    <li
                      key={item}
                      className="
                            cursor-pointer
                            text-[#F8F7FC]/60
                            text-[25px]
                            font-Satoshi
                            font-normal
                            leading-[150%]
                            uppercase
                            hover:text-[#F8F7FC]
                            transition
                          "
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </nav> */}

              {/* Desktop Nav */}
              <nav className="hidden md:block">
                <ul className="flex items-center gap-[65px]">
                  {["Align", "Decode", "Perform"].map((item) => (
                    <li
                      key={item}
                      className="
          cursor-pointer
          text-[#F8F7FC]/60
          text-[25px]
          font-Satoshi
          font-normal
          leading-[150%]
          uppercase
          hover:text-[#F8F7FC]
          transition
        "
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Hamburger */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-[#F8F7FC] cursor-pointer"
                >
                  {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>

              {/* Mobile Menu */}
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
                    {["Align", "Decode", "Perform"].map((item) => (
                      <li
                        key={item}
                        onClick={() => setMobileMenuOpen(false)}
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
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.header>

          {/* <motion.div
            initial={{ opacity: 1, scale: 4 }}
            animate={{ opacity: 0, scale: 4 }}
            transition={{
              duration: 3,
              delay: 2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="101"
              height="42"
              viewBox="0 0 101 42"
              fill="none"
            >
              {[
                "M11.7222 31.8191C5.10567 31.8191 0.861077 26.7657 0.861077 21.0858C0.861077 15.2806 5.27213 10.9372 10.9732 10.9372C17.2153 10.9372 21.5431 15.6983 21.5431 21.5452C21.5431 27.3086 17.5898 31.8191 11.7222 31.8191Z",

                "M25.3894 31.4015C24.89 31.4015 24.5987 31.1927 24.5987 30.8585V2.50088C24.5987 2.08324 24.8068 1.95795 25.1813 1.74913L28.4272 0.162101C29.2595 -0.255537 29.7172 0.203864 29.7172 0.746795V30.7332C29.7172 31.1927 30.0079 31.4015 30.5079 31.4015H25.3894Z",

                "M45.0863 31.8191C38.4698 31.8191 34.2252 26.7657 34.2252 21.0858C34.2252 15.2806 38.6362 10.9372 44.3373 10.9372C50.5793 10.9372 54.9072 15.6983 54.9072 21.5452C54.9072 27.3086 50.9539 31.8191 45.0863 31.8191Z",

                "M75.6903 11.3548C77.1051 11.3548 77.3548 11.9813 76.8554 12.3989C76.1064 13.1924 74.6915 13.0254 73.4431 13.3595C75.2325 14.6959 76.3561 16.9929 76.3561 19.1229C76.3561 22.5893 74.4418 25.3039 71.3624 26.6404C74.9828 27.4339 76.7722 29.4386 76.7722 31.9026C76.7722 35.7867 72.7357 38.1672 67.1178 38.1672C60.7093 38.1672 57.6299 34.492 57.6299 31.8191C57.6299 30.9838 58.0877 30.2321 59.1696 30.2321C61.7497 30.2321 60.418 36.789 67.3675 36.8308C70.7798 36.8308 73.0686 34.9514 73.0686 32.1532C73.0686 29.4803 71.2792 27.6427 68.4495 27.3921C67.9085 27.4339 67.4091 27.4757 66.8682 27.4757C61.8745 27.4757 57.9628 23.884 57.9628 19.3735C57.9628 14.4871 61.6248 10.9372 67.1595 10.9372Z",

                "M99.6682 11.3548C100.001 11.3548 100.251 11.5219 100.251 11.856V11.9813C100.251 12.8166 99.1688 12.7748 98.3782 14.5706L90.5132 31.9862C88.8902 35.6614 86.976 40.2554 82.8979 40.2554C79.7768 40.2554 77.7794 38.1672 77.7794 36.5384C77.7794 35.5779 78.362 34.8679 79.3607 34.8679C81.5246 34.8679 80.942 38.7937 83.5221 38.7937C85.3115 38.7937 87.1425 35.8702 88.5989 32.195L80.6091 14.5289C79.7768 12.7748 78.6117 12.8166 78.6117 11.9813V11.856C78.6117 11.5219 78.903 11.3548 79.2359 11.3548H84.6456C84.9786 11.3548 85.2282 11.5636 85.2282 11.856V11.9813C85.2282 12.8166 83.7301 12.7748 84.5208 14.5706L90.5132 28.7286L96.4639 14.9047C97.3794 12.7748 94.8826 12.8166 94.8826 11.9813V11.856C94.8826 11.5636 95.1323 11.3548 95.5068 11.3548H99.6682Z",
              ].map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="#F8F7FC"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{
                    pathLength: 0,
                    opacity: 1,
                  }}
                  animate={{
                    pathLength: 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1.4,
                    delay: i * 0.25,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </svg>
          </motion.div> */}

          <div className="px-0 md:px-5 flex flex-col lg:flex-row justify-between items-start gap-10 pt-20 md:pt-24 mt-10">
            <motion.div
              initial={{
                opacity: 0,
                scale: 2,
                y: 600,
                x: -420,
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
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="z-0!"
                >
                  <Image
                    src={iphone}
                    alt=""
                    className="
                block
                w-[120px]
                md:w-[160px]
                h-auto
                object-contain z-0!
        "
                  />
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                x: -400,
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
              className="w-full lg:w-[80%] flex flex-col gap-[50px]"
            >
              <div className="flex flex-col gap-[40px] md:gap-[60px] text-center md:text-left">
                <h1 className="text-[#F8F7FC] text-[44px] md:text-[75px] font-normal leading-[115%]">
                  Timing Intelligence for Modern Investors
                </h1>

                <p className="text-[#F8F7FC] text-[18px] md:text-[26px] font-normal leading-[140%] max-w-[800px] font-Satoshi">
                  Ology is a market timing platform that synthesizes celestial
                  cycles, behavioral psychology, and live market data into a
                  personalized timing profile. Active traders and investors use
                  it to recognize patterns and time entries with context.
                </p>
              </div>

              <button
                type="button"
                className="
                      cursor-pointer
                      inline-flex
                       flex
                       w-auto
                        md:w-[480px]
                        h-[56px]
                        px-[30px]
                        py-[20px]
                        justify-center
                        items-center

                        rounded-[16.912px]

                        bg-[rgba(30,37,64,0.30)]
                      border
                      border-white/10
                      backdrop-blur-xl
                      hover:bg-white/10
                      transition-all
                      duration-500
                    "
              >
                {" "}
                <span className="hidden md:block text-[#F8F7FC] font-Satoshi text-[18px] md:text-[22px] font-medium leading-[150%] tracking-[1.32px] uppercase">
                  Check your Timing Alignment
                </span>
                <span className="md:hidden text-[#F8F7FC] font-Satoshi text-[18px] md:text-[22px] font-medium leading-[150%] tracking-[1.32px] uppercase">
                  Check your Alignment
                </span>
              </button>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                scale: 2,
                y: 600,
                x: -420,
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
                  <Image
                    src={iphone}
                    alt=""
                    className="block w-[320px] md:w-[360px] h-auto object-contain"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* normal section */}
      <section className="z-50!">
        {/* NORMAL SECTION */}
        <section className=" w-full min-h-screen flex flex-col items-center gap-25 px-5 py-25!">
          <h1 className="text-[#F8F7FC] text-center font-Recoleta text-[36px] md:text-[71.111px] font-normal leading-[120%]">
            Signal Alignment
          </h1>

          <div className="flex justify-start items-center gap-[47.447px] w-full overflow-x-auto flex-nowrap no-scrollbar">
            <div className="flex flex-col gap-10 w-full">
              {/* AHEAD */}
              <div className="w-full">
                <button
                  onClick={() => setAheadOpen(!aheadOpen)}
                  className="cursor-pointer w-auto flex items-center justify-start py-4 gap-4 text-[#F8F7FC] font-Recoleta text-[25.1px] font-medium leading-[130%] tracking-[-0.005px]"
                >
                  <div className="flex items-center gap-4">
                    <h2 className="text-white text-[24px] font-Recoleta">
                      Ahead
                    </h2>

                    {/* <span className="text-white/50 font-Satoshi">
                      ({signalAhead.length})
                    </span> */}
                  </div>

                  <svg
                    className={`transition-transform duration-300 ${
                      aheadOpen ? "rotate-180" : ""
                    }`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M5 8L10 13L15 8"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {aheadOpen && renderCards(signalAhead)}
              </div>

              {/* RECORD */}
              <div className="w-full">
                <button
                  onClick={() => setRecordOpen(!recordOpen)}
                  className="cursor-pointer w-auto flex items-center justify-start py-4 gap-4 text-[#F8F7FC] font-Recoleta text-[25.1px] font-medium leading-[130%] tracking-[-0.005px]"
                >
                  <div className="flex items-center gap-4">
                    <h2 className="text-white text-[24px] font-Recoleta">
                      Record
                    </h2>

                    {/* <span className="text-white/50 font-Satoshi">
                      ({confirmedSignals.length})
                    </span> */}
                  </div>

                  <svg
                    className={`transition-transform duration-300 ${
                      recordOpen ? "rotate-180" : ""
                    }`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M5 8L10 13L15 8"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {recordOpen && renderCards(confirmedSignals)}
              </div>
            </div>
          </div>
        </section>

        {/* COSMIC RHYTHM */}

        <section className="relative w-full flex flex-col md:flex-row justify-between items-center py-40.25 px-5">
          <div className="flex-1 min-w-0 flex flex-col items-center md:items-start gap-[28.75px] z-20 px-4 md:px-0">
            <h1 className="text-[#F8F7FC] font-Recoleta text-[38px] md:text-[71.111px] font-normal leading-[120%]">
              Celestial Rhythm for Human Decisions
            </h1>

            <div
              id="archetype-form"
              className="flex w-[360px] md:w-auto  flex-col justify-start items-start gap-14.5 min-h-[107.29px] p-[40px_31.381px]
      rounded-[16.912px] bg-[rgba(30,37,64,0.3)] backdrop-blur-sm border border-white/10"
            >
              <div className="flex flex-col gap-[32.71px]">
                {!showNatalForm ? (
                  <>
                    <h1 className="text-[#F8F7FC] font-Recoleta text-[35px] font-normal leading-[150%]">
                      Discover your investor timing profile
                    </h1>
                    <h3 className="text-[#F8F7FC] font-Satoshi text-[21.74px] font-light leading-[120%]">
                      Generate your behavioral market profile and secure early
                      access.
                    </h3>
                  </>
                ) : (
                  <>
                    <h1 className="text-[#F8F7FC] font-Recoleta text-[35px] font-normal leading-[150%]">
                      Hi, {names.split("")}.
                    </h1>
                    <h3 className="text-[#F8F7FC] font-Satoshi text-[21.74px] font-light leading-[120%]">
                      Add your birth details. This is what maps your chart to a
                      timing profile.
                    </h3>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-14.5 w-full">
                {!showNatalForm && (
                  <div className="w-full! flex gap-6.5 items-start md:items-end flex-col md:flex-row">
                    <div className="flex flex-col gap-[26.5px] flex-1 w-full! ">
                      <label className="text-[#F8F7FC] font-Satoshi text-[15.925px] font-normal leading-[25.48px] tracking-[2.389px] uppercase">
                        Full Name
                      </label>

                      <input
                        className="w-full h-[50.959px] px-[21.233px] py-[16.986px] rounded-[10.616px] border border-[rgba(248,247,252,0.1)] outline-none"
                        value={names}
                        onChange={(e: any) => setNames(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-[26.5px] flex-1 w-full!">
                      <label className="text-[#F8F7FC] font-Satoshi text-[15.925px] font-normal leading-[25.48px] tracking-[2.389px] uppercase">
                        Email
                      </label>

                      <input
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                        className="w-full h-[50.959px] px-[21.233px] py-[16.986px] rounded-[10.616px] border border-[rgba(248,247,252,0.1)] outline-none"
                      />
                    </div>

                    {!showNatalForm && (
                      <div
                        onClick={() => {
                          if (names != "" && email != "") {
                            setShowNatalForm(true);
                            setErrMsg("");
                          } else {
                            setTimeout(() => {
                              setErrMsg("Please fill out your name and email");
                            }, 5000);
                          }
                        }}
                        className="cursor-pointer mb-2 flex w-[30.638px] h-[30.638px] p-[9.937px_8.695px_10.701px_7.867px] justify-center items-center aspect-square rounded-[53.748px] bg-[rgba(127,168,212,0.1)]"
                      >
                        <ArrowRight />
                      </div>
                    )}
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
                            className="w-full py-4 px-5 border border-[rgba(248,247,252,0.1)] rounded-[10px] text-[#F8F7FC] flex justify-between items-center"
                          >
                            {date ? format(date, "PPP") : "Date of Birth"}
                            <ChevronDownIcon size={16} />
                          </button>
                        </div>

                        <div className="flex flex-col gap-[26.5px] flex-1 w-full!">
                          <label className="text-[#F8F7FC] font-Satoshi text-[13.801px] font-normal leading-[25.48px] tracking-[2.07px] uppercase">
                            birth time
                          </label>
                          <button
                            type="button"
                            onClick={() => setOpenTime(true)}
                            className="w-full py-4 px-5 border border-[rgba(248,247,252,0.1)] rounded-[10px] text-[#F8F7FC] flex justify-between items-center"
                          >
                            {time || "Time of Birth"}
                            <ChevronDownIcon size={16} />
                          </button>
                        </div>

                        <div className="flex flex-col gap-[26.5px] flex-1 w-full!">
                          <label className="text-[#F8F7FC] font-Satoshi text-[13.801px] font-normal leading-[25.48px] tracking-[2.07px] uppercase">
                            Birth Location
                          </label>

                          <div className="relative w-full">
                            <input
                              ref={inputRef}
                              autoComplete="off"
                              spellCheck={false}
                              placeholder="Location of Birth"
                              value={data.location || ""}
                              onChange={(e) => handleChange(e.target.value)}
                              onFocus={() => setShowDropdown(true)}
                              className="py-4 px-5 w-full rounded-[10px] border border-[rgba(248,247,252,0.1)] text-start font-Satoshi text-[#F8F7FC] text-base font-normal tracking-[1.95px] placeholder:text-[#F8F7FC]"
                            />

                            {showDropdown && suggestions.length > 0 && (
                              <div className="absolute top-full left-0 w-full bg-[#1c1c2c] border border-[rgba(248,247,252,0.1)] rounded-[10px] z-50 max-h-[calc(100vh-150px)] overflow-auto mt-1">
                                {suggestions.map((s) => (
                                  <div
                                    key={s.place_id}
                                    className="px-4 py-2 cursor-pointer hover:bg-[#2a2a40]"
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
                                          console.log(lat, lng);
                                          setData({
                                            ...data,
                                            location: s.description,
                                            lat,
                                            lng,
                                          });
                                        },
                                      );

                                      setShowDropdown(false);
                                    }}
                                  >
                                    {s.description}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            handleSubmitForm();
                          }}
                          className="cursor-pointer mb-2 flex w-[30.638px] h-[30.638px] p-[9.937px_8.695px_10.701px_7.867px] justify-center items-center aspect-square rounded-[53.748px] bg-[rgba(127,168,212,0.1)]"
                        >
                          <ArrowRight />
                        </button>

                        {openDate &&
                          createPortal(
                            <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
                              {/* Backdrop */}
                              <div
                                className="absolute inset-0 bg-black/10 backdrop-blur-md"
                                onClick={() => setOpenDate(false)}
                              />

                              {/* Modal */}
                              <div
                                className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#131827]/95 backdrop-blur-2xl p-6 shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {/* Close */}
                                <button
                                  type="button"
                                  onClick={() => setOpenDate(false)}
                                  className="absolute right-4 top-4 text-white/60 hover:text-white"
                                >
                                  {/* <X size={20} /> */}
                                </button>

                                {/* <h3 className="mb-4 text-center text-lg font-semibold text-white">
                                Select Date of Birth
                              </h3> */}

                                <div className="flex justify-center">
                                  <Calendar
                                    mode="single"
                                    selected={date as Date}
                                    captionLayout="dropdown"
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
                            <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
                              {/* Backdrop */}
                              <div
                                className="absolute inset-0 bg-black/10 backdrop-blur-md"
                                onClick={() => setOpenTime(false)}
                              />

                              {/* Modal */}
                              <div
                                className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#131827]/95 backdrop-blur-2xl p-6 shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {/* Close */}
                                <button
                                  type="button"
                                  onClick={() => setOpenTime(false)}
                                  className="absolute right-4 top-4 text-white/60 hover:text-white"
                                >
                                  {/* <X size={20} /> */}
                                </button>

                                <h3 className="mb-6 text-center text-lg font-semibold text-white">
                                  Select Birth Time
                                </h3>

                                <div className="relative flex h-52 overflow-hidden">
                                  {/* Selection Area */}
                                  <div className="absolute left-0 right-0 top-1/2 h-12 -translate-y-1/2 rounded-xl bg-white/5 pointer-events-none" />

                                  {/* HOURS */}
                                  <div
                                    className="flex-1 overflow-y-auto scrollbar-none text-center snap-y snap-mandatory"
                                    ref={hourRef}
                                    onScroll={() =>
                                      handleScrollSelect(hourRef, hours, "hour")
                                    }
                                  >
                                    <div className="h-20" />

                                    {hours.map((h) => (
                                      <div
                                        key={h}
                                        onClick={() => {
                                          const m =
                                            time.split(":")[1]?.split(" ")[0] ||
                                            "00";
                                          setTime(`${h}:${m} ${ampm}`);
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

                                  {/* MINUTES */}
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

                                    {minutes.map((m) => (
                                      <div
                                        key={m}
                                        onClick={() => {
                                          const h = time.split(":")[0];
                                          setTime(`${h}:${m} ${ampm}`);
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

                                  {/* AM PM */}
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

                                    {["AM", "PM"].map((p) => (
                                      <div
                                        key={p}
                                        onClick={() => {
                                          setAmpm(p as "AM" | "PM");
                                          const [h, m] = time.split(":");
                                          const minute = m.split(" ")[0];
                                          setTime(`${h}:${minute} ${p}`);
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

          <div className="relative shrink-0 w-[320px] h-[760px] mt-20">
            {/* VIDEO */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="
    absolute
    top-[2%]
    left-[5%]
    w-[90%]
    h-[82%]
    object-cover
    rounded-[24px]
  "
            >
              <source src={"/archetypereel2.mp4"} type="video/mp4" />
            </video>

            {/* IPHONE FRAME */}
            <img
              src="/iphone-frame.png"
              alt=""
              className="relative z-10 w-full"
            />
          </div>

          {/* GRID LINES */}
          <div className="absolute inset-0 flex">
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
          </div>
        </section>

        <section className=" w-full min-h-screen flex flex-col items-center gap-25 px-4 md:px-5 py-25!">
          <h1 className="text-[#F8F7FC] text-center font-Recoleta text-[38px] md:text-[71.111px] font-normal leading-[120%]">
            The Missing Layer in Modern Market Tools
          </h1>

          <div className="w-full flex flex-col md:flex-row justify-between items-center no-scrollbar gap-8">
            {missingLayers.map((data, id) => (
              <div
                key={id}
                className="flex w-[382px] md:w-[488px] p-[31.381px] flex-col justify-center items-start gap-[31.381px] self-stretch
    rounded-[16.912px] bg-[rgba(30,37,64,0.3)] backdrop-blur-sm border border-white/10"
              >
                <h1 className="text-[#F8F7FC] font-Satoshi text-[20.477px] font-normal leading-[120%] tracking-[3.481px] uppercase">
                  {data.heading}
                </h1>

                <img src={data.imgPath} />
                <div className="flex flex-col gap-10">
                  <h1 className="text-[#F8F7FC] font-[Recoleta] text-[30px] font-normal leading-[150%]">
                    {data.title}
                  </h1>

                  <p className="text-[#F8F7FC] font-[Satoshi] text-[20px] font-normal leading-[150%]">
                    {data.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative w-screen left-1/2 -translate-x-1/2 min-h-screen flex flex-col items-center gap-25 px-5 py-61.25! overflow-hidden">
          <div className="flex justify-center items-center w-full z-50!">
            <div className="flex flex-col gap-25 items-center max-w-[1241px]">
              <h1 className="text-[#F8F7FC] font-Recoleta text-center text-[40px] md:text-[75.785px] font-normal leading-[120%]">
                Ancient Patterns. Modern Lens.
              </h1>

              <p className="text-[#F8F7FC] font-Satoshi text-[18px] md:text-[26.643px] font-normal leading-[140%] text-center">
                Ology delivers personalized timing guidance by aligning your
                chart, collective sentiment, and live market conditions into
                clear daily signals designed to support real decision-making.
              </p>

              <button
                type="button"
                className="flex w-auto h-[56px] px-[30px] py-[20px] justify-between items-center
    rounded-[16.912px] bg-[rgba(30,37,64,0.3)] backdrop-blur-sm border border-white/10 cursor-pointer"
              >
                <a
                  href="#archetype-form"
                  className="text-[#F8F7FC] font-Satoshi text-[15px] md:text-[22px] font-medium leading-[150%] tracking-[1.32px] uppercase text-center"
                >
                  REQUEST EARLY ACCESS
                </a>
              </button>
            </div>
          </div>

          <>
            <div className="absolute inset-0 z-10 bg-[rgba(17,17,17,0.75)]" />

            <motion.div
              initial={{
                opacity: 0,
                backdropFilter: "blur(1px)",
              }}
              animate={{
                opacity: 1,
                backdropFilter: "blur(4px)",
              }}
              transition={{
                duration: 2,
                delay: 3, // starts after 2 seconds
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 z-10 bg-transparent"
            />
          </>

          <div
            className="absolute inset-0 grid grid-cols-6 grid-rows-5 w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {images.slice(0, 30).map((img, index) => {
              const cols = 6;
              const rows = 5;

              const col = index % cols;
              const row = Math.floor(index / cols);

              /* ===================================================== */
              /* 🌍 NORMALIZED GRID */
              /* ===================================================== */

              const u = col / (cols - 1);
              const v = row / (rows - 1);

              /* ===================================================== */
              /* 🌍 FULL SPHERE WRAP */
              /* ===================================================== */

              const theta = (u - 0.5) * Math.PI * 1.65;

              const phi = (v - 0.5) * Math.PI * 1.08;

              /* ===================================================== */
              /* 🌍 SMALLER GLOBE */
              /* ===================================================== */

              const radius = 240;

              /* ===================================================== */
              /* 🌍 TRUE SPHERE */
              /* ===================================================== */

              const sphereX = Math.sin(theta) * Math.cos(phi) * radius;

              const sphereY = Math.sin(phi) * radius;

              const sphereZ = Math.cos(theta) * Math.cos(phi) * radius;

              /* ===================================================== */
              /* 🌍 DEPTH */
              /* ===================================================== */

              const depth = (sphereZ + radius) / (radius * 2);

              /* ===================================================== */
              /* 🌍 MORE SPHERICAL SCALE */
              /* ===================================================== */

              const curveScale = 0.38 + depth * 0.12;

              /* ===================================================== */
              /* 🌍 FADE BACKSIDE */
              /* ===================================================== */

              const opacity = 0.08 + depth * 0.95;

              /* ===================================================== */
              /* 🌍 STRONG GLOBE ROTATION */
              /* ===================================================== */

              const rotateY = Math.sin(theta) * 68;

              const rotateX = -Math.sin(phi) * 30;

              /* ===================================================== */
              /* 🌍 TIGHT SPHERE */
              /* ===================================================== */

              const compression = 0.96;

              const startX = sphereX * compression;

              const startY = sphereY * compression;

              /* ===================================================== */
              /* 🌍 DEEPER SPHERE DEPTH */
              /* ===================================================== */

              const zStart = (sphereZ - radius) * 1.4;

              /* ===================================================== */
              /* 🌸 BLOOM */
              /* ===================================================== */

              const bloom = 1 + (1 - depth) * 0.55;

              return (
                <motion.div
                  key={index}
                  className="
            relative
            min-w-0
            min-h-0
            overflow-hidden
          "
                  initial={{
                    x: startX,
                    y: startY,

                    z: zStart,

                    scale: curveScale * bloom,

                    rotateY,
                    rotateX,

                    opacity: 0,

                    filter: "blur(12px)",
                  }}
                  animate={{
                    x: 0,
                    y: 0,

                    z: 0,

                    scale: 1,

                    rotateY: 0,
                    rotateX: 0,

                    opacity: 1,

                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 2,
                    delay: 3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* TILE */}
                  <div
                    className="
              relative
              w-full
              h-full
              scale-[1]
            "
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      priority
                      className="
                object-cover
                scale-[1.03]
                pointer-events-none
                select-none
              "
                    />

                    {/* CINEMATIC DEPTH */}
                    <div
                      className="
                absolute
                inset-0
                bg-gradient-to-br
                from-white/10
                via-transparent
                to-black/40
              "
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </section>

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

      {showModal && (
        <div className="">
          createPortal(
          <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/10 backdrop-blur-md"
              onClick={() => setOpenTime(false)}
            />

            {/* Modal */}
            <div
              ref={cardRef}
              className="relative flex w-[945.24px] max-w-full min-h-[107.29px] h-auto p-12.5 md:p-12.5 p-5 flex-col items-center gap-12.5 md:gap-12.5 gap-6 rounded-[16.912px] border border-white/50 bg-cover bg-center bg-no-repeat bg-lightgray overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                src={getCardBg(cardType)}
                className="absolute inset-0 w-full h-full object-cover rounded-[16.912px]"
              />

              {/* Close */}
              {!isDownloading && (
                <div className="flex justify-start items-center gap-2 absolute top-4 right-4">
                  <div className="relative group">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(!showModal);
                        setShowNatalForm(false);
                        setNames("");
                        setEmail("");
                      }}
                      className="text-white/60 hover:text-white cursor-pointer"
                    >
                      <X size={20} />
                    </button>

                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white font-Satoshi">
                      Close
                    </div>
                  </div>

                  <div className="relative group">
                    <button
                      type="button"
                      onClick={() => handleDownload()}
                      className="text-white/60 hover:text-white cursor-pointer"
                    >
                      <CloudDownload size={20} />
                    </button>

                    <div className="font-Satoshi absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white">
                      Download image
                    </div>
                  </div>
                </div>
              )}

              {/* TOP SECTION */}
              <div className="flex flex-col md:flex-row w-full justify-start items-start md:items-center z-20 gap-6 md:gap-20">
                {/* LEFT */}
                <div className="flex flex-col basis-full md:basis-[40%]">
                  <p className="mb-[36.54px] flex w-auto h-[22.84px] flex-col justify-center text-[#F8F7FC] font-Recoleta text-[22px] md:text-[35px] font-normal leading-[150%]">
                    {archetype && archetype}
                  </p>

                  <p className="text-[#F8F7FC] font-Satoshi text-[16px] md:text-[23px] font-normal leading-[120%]">
                    {tagline && tagline}
                  </p>
                </div>

                {/* RIGHT */}
                <h2 className="text-[#F8F7FC] font-Satoshi text-[16px] md:text-[20px] font-normal leading-[150%] basis-full md:basis-[60%]">
                  {synopsisText && synopsisText}
                </h2>
              </div>

              {/* ASTRO ROW */}
              <div className="flex flex-wrap md:flex-nowrap items-start gap-3 md:gap-6 w-full z-20">
                <div className="flex flex-1 min-w-[140px] items-center justify-center gap-[9.691px] p-[11.3px] rounded-[19.381px] border border-[rgba(197,209,224,0.20)] bg-[rgba(21,27,48,0.30)]">
                  <p className="text-[#F8F7FC] font-Satoshi text-[13px] md:text-[15px] font-bold leading-[150%] flex items-center flex-nowrap">
                    {SunIcon && <SunIcon size={16} />} &nbsp; Sun in{" "}
                    {astroSigns?.sun}
                  </p>
                </div>

                <div className="flex flex-1 min-w-[140px] items-center justify-center gap-[9.691px] p-[11.3px] rounded-[19.381px] border border-[rgba(197,209,224,0.20)] bg-[rgba(21,27,48,0.30)]">
                  <p className="text-[#F8F7FC] font-Satoshi text-[13px] md:text-[15px] font-bold leading-[150%] flex items-center flex-nowrap">
                    {MoonIcon && <MoonIcon size={16} />} &nbsp; Moon in{" "}
                    {astroSigns?.moon}
                  </p>
                </div>

                <div className="flex flex-1 min-w-[140px] items-center justify-center gap-[9.691px] p-[11.3px] rounded-[19.381px] border border-[rgba(197,209,224,0.20)] bg-[rgba(21,27,48,0.30)]">
                  <p className="text-[#F8F7FC] font-Satoshi text-[13px] md:text-[15px] font-bold leading-[150%] flex items-center flex-nowrap">
                    {MarsIcon && <MarsIcon size={16} />} &nbsp; Mars in{" "}
                    {astroSigns?.mars}
                  </p>
                </div>

                <div className="flex flex-1 min-w-[140px] items-center justify-center gap-[9.691px] p-[11.3px] rounded-[19.381px] border border-[rgba(197,209,224,0.20)] bg-[rgba(21,27,48,0.30)]">
                  <p className="text-[#F8F7FC] font-Satoshi text-[13px] md:text-[15px] font-bold leading-[150%] flex items-center flex-nowrap">
                    {SaturnIcon && <SaturnIcon size={16} />} &nbsp; Saturn in{" "}
                    {astroSigns?.saturn}
                  </p>
                </div>
              </div>

              {/* DIVIDER */}
              <div className="flex w-full z-20">
                <div className="w-full h-px bg-[rgba(197,209,224,0.5)]" />
              </div>

              {/* CARDS */}
              <div className="flex flex-col md:flex-row items-start gap-5 self-stretch w-full z-20">
                <div className="flex flex-1 flex-col gap-5 p-[20.67px] rounded-[20.666px] border border-[rgba(197,209,224,0.5)] bg-[rgba(165,196,211,0.03)]">
                  <p className="text-[#F8F7FC] font-Recoleta text-[18px] md:text-[20px]">
                    Best Market Conditions
                  </p>

                  <div className="flex flex-col gap-2">
                    {bestMarketConditions?.map((con: any) => (
                      <p className="text-[#F8F7FC] text-[13px] md:text-[14px]">
                        ✦ {con}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-5 p-[20.67px] rounded-[20.666px] border border-[rgba(197,209,224,0.5)] bg-[rgba(165,196,211,0.03)]">
                  <p className="text-[#F8F7FC] font-Recoleta text-[18px] md:text-[20px]">
                    Shadow
                  </p>

                  <p className="text-[#F8F7FC] text-[13px] md:text-[14px]">
                    {ShadowText}
                  </p>
                </div>
              </div>

              {/* FOOTER TEXT */}
              <div className="text-[#F8F7FC] font-Satoshi text-[14px] md:text-[20px] text-center z-20">
                You’re on the list. Your full Trade DNA opens when we launch.
              </div>
            </div>
          </div>
          , document.body, )
        </div>
      )}
    </div>
  );
}
