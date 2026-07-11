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
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
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
import React, { useEffect, useMemo, useRef, useState } from "react";

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
    className="w-full flex justify-center"
  >
    {children}
  </motion.section>
);

const renderCards = (items: any[]) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative w-full flex items-center gap-2 md:gap-8 overflow-hidden ">
      {/* <button
        ref={prevRef}
        className="cursor-pointer shrink-0 z-30 flex h-[30.6px] w-[30.6px] items-center justify-center rounded-full bg-[rgba(127,168,212,0.10)] backdrop-blur transition"
      >
        <ArrowLeft className="text-white" size={22} />
      </button> */}
      <div className="flex-1 min-w-0 overflow-hidden flex justify-center">
        <Swiper
          modules={[Navigation, Mousewheel, EffectCoverflow, Scrollbar]}
          slidesPerView="auto"
          centeredSlides
          loop
          scrollbar={{
            draggable: true,
            hide: false,
          }}
          spaceBetween={30}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            scale: 0.9, // side slides scale
            modifier: 1,
            slideShadows: false,
          }}
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          speed={700}
          freeMode={{
            enabled: true,
            sticky: true,
          }}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 0.5,
            releaseOnEdges: true,
          }}
          className="pb-8 overflow-visible max-w-[calc(100%)] h-auto flex justify-center"
        >
          {items.map((data, id) => (
            <SwiperSlide key={id} className="!w-[360px] md:!w-[465px] ">
              <div
                className="
  swiper-card
  relative
  flex h-auto md:h-[313px]
  p-[22px] md:p-[27.23px]
  flex-col justify-between
  rounded-[16.912px]

  bg-[rgba(30,37,64,0.24)]

  backdrop-blur-[2px]

  border-[0.5px] border-white/20

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
                      style={{ backgroundColor: data.buttonColor }}
                    >
                      <div
                        className="w-[14.64px] h-[14.64px] rounded-full"
                        style={{ backgroundColor: data.statusColor }}
                      />
                    </div>

                    <p className="text-[#F8F7FC] font-Satoshi text-[10.13px] font-normal leading-[120%] tracking-[2.148px] uppercase">
                      {data.signal}
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
                    style={{ backgroundColor: data.buttonColor }}
                  >
                    <span className="text-center justify-center text-slate-50 text-[12.148px] font-bold font-Satoshi uppercase leading-6">
                      {data.button_text}
                    </span>
                  </button>

                  <div className="flex flex-col items-start justify-between gap-[17.26px]">
                    {data.status && data.status == "UPCOMING" && (
                      <p
                        className="font-Satoshi text-[10.13px] font-bold leading-[120%] tracking-[2.148px] uppercase"
                        style={{ color: data.statusColor }}
                      >
                        {data.status}
                      </p>
                    )}

                    <div className="flex text-white items-center gap-[14.5px]">
                      {data.icon.map((svg: any, i: number) => {
                        if (i !== 1) {
                          return (
                            <div
                              key={i}
                              className="w-[22.586px] h-[22.586px] flex items-center justify-center text-white"
                              dangerouslySetInnerHTML={{ __html: svg }}
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* <button
        ref={prevRef}
        className="cursor-pointer shrink-0 z-30 flex h-[30.6px] w-[30.6px] items-center justify-center rounded-full bg-[rgba(127,168,212,0.10)] backdrop-blur transition"
      >
        <ArrowRight className="text-white" size={22} />
      </button> */}
    </div>
  );
};

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

  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
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
    const sections = ["align", "decode", "perform"];

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

  // Fade out fast over a very light first scroll — no blur
  const opacity = useTransform(scrollY, [0, 120], [1, 0]);

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

        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-9999! mix-blend-screen"
        style={{
          background: useMotionTemplate`
          radial-gradient(
            80px circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(210, 255, 240, 0.1),
            rgba(180, 235, 255, 0.04),
            transparent 90%
          )
        `,
        }}
      />

      <div className="fixed inset-0 z-0! overflow-hidden pointer-events-none bg-[#0d1220]"></div>

      <div className="absolute inset-x-0 top-0 bottom-0 z-25 pointer-events-none">
        {Array.from({ length: BLOCKS }).map((_, block) => (
          <div
            key={block}
            className="absolute left-0 right-0 flex h-[830vh] lg:h-[300vh]"
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
                      {/* Tail */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 w-px h-20"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.35), transparent)",
                        }}
                      />

                      {/* Rounded droplet head */}
                      {/* <div className="absolute left-1/2 top-[19px] -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" /> */}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative h-screen w-full! flex flex-col items-center! z-40! "
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
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-10 lg:grid-cols-6 lg:grid-rows-5 w-full h-full">
              {images.slice(0, 30).map((img, index) => {
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
                    initial={{
                      opacity: 0,
                      scale: 1,
                      filter: "blur(1px)",
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
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
              className="absolute inset-0 z-10 bg-[rgba(17,17,17,0.75)]"
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
                className="z-50! absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center scale-[2.5] text-[#F8F7FC] pointer-events-none select-none"
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

          <div className=" relative z-20 max-w-360 lg:max-w-245.5 xl:max-w-360 w-full px-5 md:px-14 py-6 md:py-10 gap-15 flex flex-col items-center">
            <div
              className="
                fixed
                top-0
             
                z-9999
                w-full
                max-w-360
                lg:max-w-245.5
                xl:max-w-360
                px-5
                md:px-10
                py-6
                md:py-10
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
              // h-[65.771px]
              p-5
              rounded-[20px]
              border
              border-[#7478895c]
              bg-[#1e2540]/5
              backdrop-blur-xl
              z-30!
            "
              >
                <div className="flex w-full items-center justify-between p-4 md:px-4 z-50!">
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

                  <nav className="hidden md:block">
                    <ul className="flex items-around gap-[65px]">
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
                      className="text-[#F8F7FC] cursor-pointer"
                    >
                      {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
                            onClick={(item: any) => {
                              document.getElementById(item.id)?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });

                              setMobileMenuOpen(false);
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

            <div className=" w-full! px-0 xl:px-4.5 flex flex-col lg:flex-row justify-between items-center gap-10 pt-20 md:pt-24 mt-15">
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
                    <div className="relative w-26.25 md:w-[160px]">
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
                className="w-full xl:w-[100%] flex flex-col gap-15 items-center lg:items-start -mt-5 lg:mt-30"
              >
                <div className="flex flex-col gap-[40px] md:gap-[60px] text-center md:text-left">
                  <h1 className="text-[#F8F7FC] text-[36px] md:text-[65px] font-normal leading-[115%]">
                    Timing Intelligence for Modern Investors
                  </h1>

                  <p className="text-[#F8F7FC] text-[18px] md:text-[24px] font-normal leading-[140%] max-w-[800px] font-Satoshi">
                    Ology is a market timing platform that synthesizes celestial
                    cycles, behavioral psychology, and live market data into a
                    personalized timing profile. Active traders and investors
                    use it to recognize patterns and time entries with context.
                  </p>
                </div>

                <button
                  type="button"
                  className="
                      cursor-pointer
                      inline-flex
                      flex
                      w-auto
                      p-[16px]
                      justify-center
                      items-center
                      rounded-[20px]
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
                  <a href="#archetype-form">
                    <span className=" text-[#F8F7FC] font-Satoshi text-[16px] lg:text-[18px] md:text-[17.47px] font-medium leading-[150%] tracking-[0.349px] uppercase">
                      Access the Beta
                    </span>
                  </a>
                </button>
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
                lg:max-w-245.5
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
              // h-[65.771px]
              p-5
              rounded-[20px]
              border
              border-[#7478895c]
              bg-[#1e2540]/5
              backdrop-blur-xl
              z-30!
            "
          >
            <div className="flex w-full items-center justify-between p-4 md:px-4 z-50!">
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
                  className="text-[#F8F7FC] cursor-pointer"
                >
                  {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
        <section className="relative z-30! w-full max-w-360! lg:max-w-237.5! xl:max-w-360! mx-auto px-8 flex flex-col items-center! justify-evenly">
          <SectionReveal>
            <div ref={sectionRef} className="relative w-full! lg:h-[150vh]">
              <div
                id="align"
                className=" relative xl:sticky xl:top-20 w-full flex flex-col items-center justify-start gap-[120px] xl:gap-8 lg:gap-2 md:px-2.5 xl:px-12.5 py-15! h-auto"
              >
                <div className="flex flex-col gap-[30px] mt-20">
                  <h2 className="text-[#F8F7FC] text-center font-Recoleta text-[36px] md:text-[60px] font-normal leading-[120%]">
                    Where Cycles Meet the Tape
                  </h2>

                  <h4 className="text-[#F8F7FC] text-center font-Satoshi text-[22px] md:text-[22px] font-normal leading-[120%]">
                    Major market moments have long clustered around measurable
                    celestial alignments. Ology keeps that record in real time.
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
                    {renderCards(signalAhead)}
                  </div>
                </motion.div>

                <div className="hidden lg:block xl:hidden w-full! gap-7.5">
                  <motion.div className="w-full! flex justify-around max-h-[100vh] overflow-y-auto  flex-wrap gap-[20px] mt-40 xl:mt-0">
                    {signalAhead.map((data, id) => (
                      <div
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
                              style={{ backgroundColor: data.buttonColor }}
                            >
                              <div
                                className="w-[14.64px] h-[14.64px] rounded-full"
                                style={{ backgroundColor: data.statusColor }}
                              />
                            </div>

                            <p className="text-[#F8F7FC] font-Satoshi text-[10.13px] font-normal leading-[120%] tracking-[2.148px] uppercase">
                              {data.signal}
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
                            style={{ backgroundColor: data.buttonColor }}
                          >
                            <span className="text-center justify-center text-slate-50 text-[12.148px] font-bold font-Satoshi uppercase leading-6">
                              {data.button_text}
                            </span>
                          </button>

                          <div className="flex flex-col items-start justify-between gap-[17.26px]">
                            {data.status && data.status == "UPCOMING" && (
                              <p
                                className="font-Satoshi text-[10.13px] font-bold leading-[120%] tracking-[2.148px] uppercase"
                                style={{ color: data.statusColor }}
                              >
                                {data.status}
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
                    ))}
                  </motion.div>
                </div>

                <div className="relative block lg:hidden w-full! gap-7.5">
                  <motion.div className="w-full! flex justify-around max-h-auto lg:max-h-[75vh] overflow-y-auto  flex-wrap gap-[20px] sm:mt-40  xl:mt-0">
                    {signalAhead.map((data, id) => (
                      <div
                        className="
                            
                                relative
                                flex h-auto lg:h-[343px] w-[415px] max-w-[415px]
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
                              style={{ backgroundColor: data.buttonColor }}
                            >
                              <div
                                className="w-[14.64px] h-[14.64px] rounded-full"
                                style={{ backgroundColor: data.statusColor }}
                              />
                            </div>

                            <p className="text-[#F8F7FC] font-Satoshi text-[10.13px] font-normal leading-[120%] tracking-[2.148px] uppercase">
                              {data.signal}
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
                            style={{ backgroundColor: data.buttonColor }}
                          >
                            <span className="text-center justify-center text-slate-50 text-[12.148px] font-bold font-Satoshi uppercase leading-6">
                              {data.button_text}
                            </span>
                          </button>

                          <div className="flex flex-col items-start justify-between gap-[17.26px]">
                            {data.status && data.status == "UPCOMING" && (
                              <p
                                className="font-Satoshi text-[10.13px] font-bold leading-[120%] tracking-[2.148px] uppercase"
                                style={{ color: data.statusColor }}
                              >
                                {data.status}
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
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* COSMIC RHYTHM */}
          <SectionReveal>
            <div className="relative w-full h-screen lg:h-[100vh] xl:h-[150vh]">
              <div
                id="perform"
                ref={formRef}
                className="relative xl:sticky xl:top-5 w-full flex flex-col xl:flex-row justify-center xl:justify-between h-[100vh] items-center py-40.25 md:px-[50px]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 80 }}
                  animate={
                    showForm ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }
                  }
                  transition={{ duration: 0.3 }}
                  id="archetype-form"
                  className="hidden xl:block flex-1 min-w-0 flex flex-col items-center md:items-start gap-30! z-20 px-4 md:px-0 max-w-225"
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
                      p-[18px_31.381px]

                      rounded-[16.912px]

                      bg-[rgba(30,37,64,0.24)]
                      backdrop-blur-[2px]

                      border border-white/20

                      overflow-hidden
                      transition-all duration-500
                      mt-18

                    "
                  >
                    <div className="flex flex-col gap-[16.71px] -mt-2">
                      {!showNatalForm ? (
                        <>
                          <h3 className="text-[#F8F7FC] font-Recoleta text-[20px] lg:text-[28px] font-normal leading-[150%]">
                            Discover your investor timing profile
                          </h3>
                          {/* <h3 className="text-[#F8F7FC] font-Satoshi text-[17.5px] font-light leading-[120%]">
                            Generate your behavioral market profile and claim
                            your spot.
                          </h3> */}
                        </>
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
                          <div className="flex flex-col gap-[26.5px] flex-1 w-full! ">
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
                              value={email}
                              onChange={(e: any) => setEmail(e.target.value)}
                              className="w-full h-[50.959px] font-Satoshi px-[21.233px] py-[16.986px] rounded-[10.616px] border border-[rgba(248,247,252,0.1)] outline-none"
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
                                  className="w-full py-4 px-5 border border-[rgba(248,247,252,0.1)] rounded-[10px]  font-Satoshi text-[#F8F7FC]/40 font-normal text-[13.801px] leading-[25.48px] tracking-[2.07px] uppercase flex justify-between items-center"
                                >
                                  {date
                                    ? format(date, "PPP")
                                    : "( MM / DD / YYYY )"}
                                  {/* <ChevronDownIcon size={16} /> */}
                                </button>
                              </div>

                              <div className="flex flex-col gap-[26.5px] flex-1 w-full!">
                                <label className="text-[#F8F7FC] font-Satoshi text-[13.801px] font-normal leading-[25.48px] tracking-[2.07px] uppercase">
                                  birth time
                                </label>
                                <button
                                  type="button"
                                  onClick={() => setOpenTime(true)}
                                  className="w-full py-4 px-5 border border-[rgba(248,247,252,0.1)] rounded-[10px] font-Satoshi text-[#F8F7FC]/40 font-normal text-[13.801px] leading-[25.48px] tracking-[2.07px] uppercase flex justify-between items-center"
                                >
                                  {time || "Select"}
                                  {/* <ChevronDownIcon size={16} /> */}
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
                                    placeholder="SELECT"
                                    value={data.location || ""}
                                    onChange={(e) =>
                                      handleChange(e.target.value)
                                    }
                                    onFocus={() => setShowDropdown(true)}
                                    className="py-4 px-5 w-full placeholder:font-Satoshi placeholder:text-[#F8F7FC]/40 placeholder:font-normal placeholder:text-[13.801px] placeholder:leading-[25.48px] placeholder:tracking-[2.07px] placeholder:uppercase rounded-[10px] border border-[rgba(248,247,252,0.1)] text-start font-Satoshi text-[#F8F7FC] text-base font-normal tracking-[1.95px] placeholder:text-[#F8F7FC]"
                                  />

                                  {showDropdown && suggestions.length > 0 && (
                                    <div className="font-Satoshi absolute top-full left-0 w-full bg-[#1c1c2c] border border-[rgba(248,247,252,0.1)] rounded-[10px] z-50 max-h-[calc(100vh-150px)] overflow-auto mt-1">
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
                                  <div className="fixed inset-0 z-999999 flex items-center justify-center p-4">
                                    {/* Backdrop */}
                                    <div
                                      className="absolute inset-0 bg-black/10 backdrop-blur-md"
                                      onClick={() => setOpenDate(false)}
                                    />

                                    {/* Modal */}
                                    <div
                                      className="font-Satoshi relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#131827]/95 backdrop-blur-2xl p-6 shadow-2xl"
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
                                  <div className="font-Satoshi fixed inset-0 z-[999999] flex items-center justify-center p-4">
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

                <motion.div
                  id="archetype-form"
                  className="block relative xl:hidden flex-1 min-w-0 sm:flex flex-col items-center md:items-start gap-18! z-20 px-4 md:px-0 max-w-225 mt-20"
                >
                  <h3 className="text-[#F8F7FC] font-Recoleta text-[38px] md:text-[60px] font-normal leading-[120%] md-w-[600px]">
                    Access the Beta
                  </h3>

                  <motion.div
                    className="
                      relative
                      flex w-90 h-auto lg:h-[300px] md:w-[800px]
                      flex-col justify-evenly items-start
                      p-[18px_31.381px]

                      rounded-[16.912px]

                      bg-[rgba(30,37,64,0.24)]
                      backdrop-blur-[2px]

                      border border-white/20

                      overflow-hidden
                      transition-all duration-500
                      mt-10
                    "
                  >
                    <div className="flex flex-col gap-[16.71px] -mt-2">
                      {!showNatalForm ? (
                        <>
                          <h3 className="text-[#F8F7FC] font-Recoleta text-[20px] lg:text-[28px] font-normal leading-[150%]">
                            Discover your investor timing profile
                          </h3>
                          {/* <h3 className="text-[#F8F7FC] font-Satoshi text-[17.5px] font-light leading-[120%]">
                            Generate your behavioral market profile and claim
                            your spot.
                          </h3> */}
                        </>
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
                          <div className="flex flex-col gap-[26.5px] flex-1 w-full! ">
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
                              value={email}
                              onChange={(e: any) => setEmail(e.target.value)}
                              className="w-full h-[50.959px] font-Satoshi px-[21.233px] py-[16.986px] rounded-[10.616px] border border-[rgba(248,247,252,0.1)] outline-none"
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
                                  className="w-full py-4 px-5 border border-[rgba(248,247,252,0.1)] rounded-[10px]  font-Satoshi text-[#F8F7FC]/40 font-normal text-[13.801px] leading-[25.48px] tracking-[2.07px] uppercase flex justify-between items-center"
                                >
                                  {date
                                    ? format(date, "PPP")
                                    : "( MM / DD / YYYY )"}
                                  {/* <ChevronDownIcon size={16} /> */}
                                </button>
                              </div>

                              <div className="flex flex-col gap-[26.5px] flex-1 w-full!">
                                <label className="text-[#F8F7FC] font-Satoshi text-[13.801px] font-normal leading-[25.48px] tracking-[2.07px] uppercase">
                                  birth time
                                </label>
                                <button
                                  type="button"
                                  onClick={() => setOpenTime(true)}
                                  className="w-full py-4 px-5 border border-[rgba(248,247,252,0.1)] rounded-[10px] font-Satoshi text-[#F8F7FC]/40 font-normal text-[13.801px] leading-[25.48px] tracking-[2.07px] uppercase flex justify-between items-center"
                                >
                                  {time || "Select"}
                                  {/* <ChevronDownIcon size={16} /> */}
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
                                    placeholder="SELECT"
                                    value={data.location || ""}
                                    onChange={(e) =>
                                      handleChange(e.target.value)
                                    }
                                    onFocus={() => setShowDropdown(true)}
                                    className="py-4 px-5 w-full placeholder:font-Satoshi placeholder:text-[#F8F7FC]/40 placeholder:font-normal placeholder:text-[13.801px] placeholder:leading-[25.48px] placeholder:tracking-[2.07px] placeholder:uppercase rounded-[10px] border border-[rgba(248,247,252,0.1)] text-start font-Satoshi text-[#F8F7FC] text-base font-normal tracking-[1.95px] placeholder:text-[#F8F7FC]"
                                  />

                                  {showDropdown && suggestions.length > 0 && (
                                    <div className="font-Satoshi absolute top-full left-0 w-full bg-[#1c1c2c] border border-[rgba(248,247,252,0.1)] rounded-[10px] z-50 max-h-[calc(100vh-150px)] overflow-auto mt-1">
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
                                  <div className="fixed inset-0 z-999999 flex items-center justify-center p-4">
                                    {/* Backdrop */}
                                    <div
                                      className="absolute inset-0 bg-black/10 backdrop-blur-md"
                                      onClick={() => setOpenDate(false)}
                                    />

                                    {/* Modal */}
                                    <div
                                      className="font-Satoshi relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#131827]/95 backdrop-blur-2xl p-6 shadow-2xl"
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
                                  <div className="font-Satoshi fixed inset-0 z-[999999] flex items-center justify-center p-4">
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

                <div className="hidden lg:block relative shrink-0 lg:w-90.25 lg:h-182.5 mt-5 lg:mt-20">
                  {/* VIDEO */}
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

                  {/* IPHONE FRAME */}
                  <img
                    src={phoneMock}
                    alt=""
                    className="relative z-30! w-95.25 h-182.5!"
                  />
                </div>

                <div className="block lg:hidden relative shrink-0 w-26.25 mt-10">
                  {/* VIDEO */}
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

                  {/* IPHONE FRAME */}
                  <img
                    src={phoneMock}
                    alt=""
                    className="relative z-20 w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="relative w-full sm:h-auto lg:h-[150vh]">
              <div
                id="decode"
                ref={layerRef}
                className="sticky top-30 w-full min-h-screen h-auto flex flex-col items-center gap-[60px] xl:px-12.5 md:px-12.5 py-25! "
              >
                <div className="flex flex-col gap-[30px]">
                  <h2 className="text-[#F8F7FC] text-center font-Recoleta text-[38px] md:text-[60px] font-normal leading-[120%]">
                    The Missing Layer in Modern Market Tools
                  </h2>

                  <h4 className="text-[#F8F7FC] text-center font-Satoshi text-[22px] md:text-[22px] font-normal leading-[120%]">
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
                      p-[31.381px]

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

                <motion.div className="block flex lg:hidden w-full flex-col items-center gap-4 ">
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
                      p-[31.381px]

                      rounded-[16.912px]

                      bg-[rgba(30,37,64,0.24)]
                      backdrop-blur-[2px]

                    border border-white/20
                      shadow-inner

                      overflow-hidden
                      transition-all duration-500

                    "
                      >
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
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="relative w-full sm:h-auto lg:h-[150vh]">
              <div
                id="ask"
                ref={faqsRef}
                className="sticky top-30 w-full min-h-screen h-auto flex justify-between items-center gap-[60px] xl:px-12.5 md:px-12.5 py-25! "
              >
                <div className="flex flex-col gap-[30px]">
                  <h2 className="text-[#F8F7FC] text-start font-Recoleta text-[38px] md:text-[60px] font-normal leading-[120%]">
                    FAQs
                  </h2>

                  <h4 className="text-[#F8F7FC] text-start font-Satoshi text-[22px] md:text-[22px] font-normal leading-[120%]">
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
                  className="w-full flex flex-col gap-4 items-center mt-8"
                >
                  <FAQAccordion />
                </motion.div>
              </div>
            </div>
          </SectionReveal>

          <motion.section
            className="relative w-screen min-h-screen overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 w-full h-screen overflow-hidden flex items-center justify-center"
              style={{ perspective: "2600px" }}
            >
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-10 lg:grid-cols-6 lg:grid-rows-5 w-full h-full">
                {images.slice(0, 30).map((img, index) => {
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
                      initial={{
                        opacity: 0,
                        scale: 1,
                        filter: "blur(1px)",
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                      }}
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
                          alt="grid image"
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

            <motion.div
              className="relative z-10 flex min-h-screen w-full items-center justify-center px-5 py-61.25"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 1.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex max-w-[1241px] flex-col items-center gap-25">
                <h2 className="text-center font-Recoleta text-[40px] font-normal leading-[120%] text-[#F8F7FC] md:text-[65px]">
                  Ancient Patterns. Modern Lens.
                </h2>

                <p className="text-center font-Satoshi text-[18px] font-normal leading-[140%] text-[#F8F7FC] md:text-[24px]">
                  Ology aligns your birth chart, collective sentiment, and live
                  market conditions into a single personalized timing layer. It
                  brings context to real decisions and leaves the decisions
                  where they belong, with you.
                </p>

                <button
                  type="button"
                  className="inline-flex w-auto cursor-pointer items-center justify-center rounded-[20px] border border-white/10 bg-[rgba(30,37,64,0.30)] p-[16px] backdrop-blur-xl transition-all duration-500 hover:bg-white/10"
                >
                  <a
                    href="#archetype-form"
                    className="font-Satoshi font-medium uppercase leading-[150%] tracking-[0.349px] text-[#F8F7FC] text-[17.47px]"
                  >
                    REQUEST EARLY ACCESS
                  </a>
                </button>
              </div>
            </motion.div>

            <div
              className="
              w-full
            absolute
            bottom-10
            left-0
            flex
            w-[1633px]
            flex-col
            items-start
            gap-[30px]
            pt-[28px]
          
            pb-[10px]
            px-[80px]
            z-50!
            flex flex-col
          
            "
            >
              <div className="w-full flex justify-between items-center">
                <a href="#hero">
                  <div className="flex justify-start items-center gap-5">
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

                    <h4 className="text-[#F8F7FC] text-center font-Satoshi text-[16px] font-medium leading-[140%]">
                      Pattern over prediction.
                    </h4>
                  </div>
                </a>
                <div className="flex justify-start items-center gap-10">
                  <h5 className="text-[#F8F7FC] font-Satoshi text-[16px] font-normal leading-normal">
                    Privacy
                  </h5>
                  <h5 className="text-[#F8F7FC] font-Satoshi text-[16px] font-normal leading-normal">
                    Terms
                  </h5>

                  <a
                    href="mailto:hello@ologyapp.com?subject=Ology%20Inquiry"
                    target="_blank"
                  >
                    <h5 className="text-[#F8F7FC] font-Satoshi text-[16px] font-normal leading-normal">
                      Contact
                    </h5>
                  </a>
                </div>

                <div className="flex justify-start items-center gap-[28px]">
                  <a href="https://x.com/OlogyHQ" target="_blank">
                    <svg
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.4323 1.81104H20.6412L13.6307 9.82363L21.878 20.727H15.4204L10.3626 14.1141L4.57527 20.727H1.36441L8.86288 12.1566L0.951172 1.81104H7.57271L12.1445 7.8554L17.4323 1.81104ZM16.306 18.8063H18.0841L6.60655 3.63084H4.69846L16.306 18.8063Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/ologyapp/" target="_blank">
                    <svg
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_453_1182)">
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
                          <rect width="22.8293" height="22.8293" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>

                  <a
                    href="https://www.linkedin.com/company/ologyapp/"
                    target="_blank"
                  >
                    <svg
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_453_1183)">
                        <path
                          d="M21.1394 0H1.68544C0.753544 0 0 0.735709 0 1.64531V21.1795C0 22.0891 0.753544 22.8293 1.68544 22.8293H21.1394C22.0713 22.8293 22.8293 22.0891 22.8293 21.184V1.64531C22.8293 0.735709 22.0713 0 21.1394 0ZM6.77298 19.4539H3.38426V8.55652H6.77298V19.4539ZM5.07862 7.07172C3.99066 7.07172 3.11227 6.19333 3.11227 5.10983C3.11227 4.02633 3.99066 3.14794 5.07862 3.14794C6.16212 3.14794 7.04051 4.02633 7.04051 5.10983C7.04051 6.18887 6.16212 7.07172 5.07862 7.07172ZM19.4539 19.4539H16.0697V14.1568C16.0697 12.895 16.0474 11.2675 14.3084 11.2675C12.5472 11.2675 12.2796 12.6453 12.2796 14.0676V19.4539H8.89985V8.55652H12.1459V10.0458H12.1905C12.6408 9.18967 13.7466 8.28453 15.3919 8.28453C18.8208 8.28453 19.4539 10.5407 19.4539 13.4746V19.4539Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_453_1183">
                          <rect width="22.8293" height="22.8293" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="w-full text-center">
                <p className="text-[#E8E9F3]/30 text-center font-Satoshi text-[16px] font-normal leading-[140%]">
                  Ology provides behavioral and timing context for informational
                  purposes only and is not an investment adviser. © 2026 Ology
                  Intelligence, Inc.
                </p>
              </div>
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
              className="absolute inset-0 bg-[#070B16]/60"
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
                      className="text-white/60 hover:text-white cursor-pointer"
                    >
                      <X size={20} />
                    </button>

                    {/* <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white font-Satoshi">
                      Close
                    </div> */}
                  </div>

                  <div className="relative group">
                    <button
                      type="button"
                      onClick={() => handleDownload()}
                      className="text-white/60 hover:text-white cursor-pointer"
                    >
                      <CloudDownload size={20} />
                    </button>

                    {/* <div className="font-Satoshi absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white">
                      Download image
                    </div> */}
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
                <div className="flex flex-1 flex-col gap-5 p-[20.67px] rounded-[20.666px] border border-[rgba(197,209,224,0.5)] bg-[rgba(165,196,211,0.03)] ">
                  <p className="text-[#F8F7FC] font-Recoleta text-[18px] md:text-[20px]">
                    Best Market Conditions
                  </p>

                  <div className="flex flex-col gap-2 h-[80px]">
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

                  <p className="text-[#F8F7FC] text-[13px] md:text-[14px] h-[80px]">
                    {ShadowText}
                  </p>
                </div>
              </div>

              {/* DIVIDER */}
              <div className="flex w-full z-20">
                <div className="w-full h-px bg-[rgba(197,209,224,0.5)]" />
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
