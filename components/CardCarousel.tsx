import { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Mousewheel,
  EffectCoverflow,
  Scrollbar,
} from "swiper/modules";
import { AnimatePresence, motion } from "framer-motion";

import { statusOf, cardStyle, railDotStyle } from "./cardMeta";

function CardCarousel({ items }: { items: any[] }) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const initialIndex = useMemo(() => {
    const idx = items.findIndex((i) => statusOf(i) === "ACTIVE");
    return idx !== -1 ? idx : 0;
  }, [items]);

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  return (
    <div className="relative w-full flex flex-col items-center gap-2 md:gap-8 overflow-hidden">
      <div className="w-full flex items-center gap-2 md:gap-8">
        <div className="flex-1 min-w-0 overflow-hidden flex justify-center">
          <Swiper
            modules={[Navigation, Mousewheel, EffectCoverflow, Scrollbar]}
            slidesPerView="auto"
            centeredSlides
            loop
            initialSlide={initialIndex}
            scrollbar={{ draggable: true, hide: false }}
            spaceBetween={30}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 120,
              scale: 0.9,
              modifier: 1,
              slideShadows: false,
            }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            speed={700}
            freeMode={{ enabled: true, sticky: true }}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 0.5,
              releaseOnEdges: true,
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
            className="pb-8 overflow-visible max-w-[calc(100%)] h-auto flex justify-center"
          >
            {items.map((data, id) => {
              // Computed per card, per render. A window that closes updates itself.
              const status = statusOf(data);
              const style = cardStyle(data.read);

              return (
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
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* dots — Moon Glow only. Color means class (lives on the card), state means shape/size (lives here). */}
      <div className="flex flex-col items-center gap-3 mt-2">
        <div className="flex items-center gap-[10px]">
          {items.map((item, i) => {
            const isActive = i === activeIndex;
            const status = statusOf(item);
            const dot = railDotStyle(status);

            return (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: dot.size,
                  height: dot.size,
                  background: dot.background,
                  border: dot.border,
                  boxSizing: "border-box",
                  opacity: isActive ? 1 : 0.6,
                  boxShadow: isActive
                    ? `0 0 0 3px rgba(248,247,252,0.15)`
                    : "none",
                }}
              />
            );
          })}
        </div>

        {/* active label — ACTIVE / AHEAD / RECORD, printed straight from statusOf() */}
        <div className="h-[16px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="font-Satoshi text-[11px] font-bold tracking-[2px] uppercase whitespace-nowrap"
              style={{ color: "#D8DAE8" }}
            >
              {statusOf(items[activeIndex])}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default CardCarousel;
