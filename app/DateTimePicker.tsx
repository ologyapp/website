// "use client";

// import * as React from "react";
// import { format } from "date-fns";
// import { ChevronDownIcon } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";

// type Props = {
//   value?: {
//     dob?: string;
//     time?: string;
//   };
//   onChange?: (val: { dob: string; time: string }) => void;
// };

// export function DatePickerTime({ value, onChange }: Props) {
//   const [date, setDate] = React.useState<Date | undefined>(undefined);
//   const [time, setTime] = React.useState<string>("12:00 AM");

//   const [openDate, setOpenDate] = React.useState(false);
//   const [openTime, setOpenTime] = React.useState(false);
//   const [ampm, setAmpm] = React.useState<"AM" | "PM">("AM");

//   // -----------------------------
//   // FIX: proper scroll lock (mobile safe)
//   // -----------------------------
//   React.useEffect(() => {
//     const isOpen = openDate || openTime;

//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//       document.documentElement.style.overflow = "hidden";
//       document.body.style.position = "fixed";
//       document.body.style.width = "100%";
//     } else {
//       document.body.style.overflow = "";
//       document.documentElement.style.overflow = "";
//       document.body.style.position = "";
//       document.body.style.width = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//       document.documentElement.style.overflow = "";
//       document.body.style.position = "";
//       document.body.style.width = "";
//     };
//   }, [openDate, openTime]);

//   // -----------------------------
//   // DATA
//   // -----------------------------
//   const hours = React.useMemo(
//     () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
//     [],
//   );

//   const minutes = React.useMemo(
//     () => Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")),
//     [],
//   );

//   // -----------------------------
//   // SEND DATA
//   // -----------------------------
//   React.useEffect(() => {
//     if (!onChange || !date || !time) return;

//     const [timePart, period] = time.split(" ");
//     const [h, m] = timePart.split(":");

//     let hour = parseInt(h);

//     if (period === "PM" && hour !== 12) hour += 12;
//     if (period === "AM" && hour === 12) hour = 0;

//     onChange({
//       dob: format(date, "yyyy-MM-dd"),
//       time: `${String(hour).padStart(2, "0")}:${m}`,
//     });
//   }, [date, time]);

//   // -----------------------------
//   // HYDRATE
//   // -----------------------------
//   React.useEffect(() => {
//     if (value?.dob) setDate(new Date(value.dob));
//     if (value?.time) setTime(value.time);
//   }, []);

//   const handleScrollSelect = (
//     ref: React.RefObject<HTMLDivElement | null>,
//     items: string[],
//     type: "hour" | "minute" | "ampm",
//   ) => {
//     const el = ref.current;
//     if (!el) return;

//     const children = Array.from(el.children) as HTMLElement[];

//     const containerCenter = el.scrollTop + el.offsetHeight / 2 - 32; // half of spacer (h-16 = 64px)

//     let closestIndex = 0;
//     let closestDistance = Infinity;

//     children.forEach((child, i) => {
//       const childCenter = child.offsetTop + child.offsetHeight / 2;
//       const distance = Math.abs(containerCenter - childCenter);

//       if (distance < closestDistance) {
//         closestDistance = distance;
//         closestIndex = i;
//       }
//     });

//     const value = items[closestIndex];

//     if (type === "hour") {
//       const m = time.split(":")[1]?.split(" ")[0] || "00";
//       setTime(`${value}:${m} ${ampm}`);
//     }

//     if (type === "minute") {
//       const h = time.split(":")[0];
//       setTime(`${h}:${value} ${ampm}`);
//     }

//     if (type === "ampm") {
//       const [h, m] = time.split(":");
//       const minute = m.split(" ")[0];
//       setAmpm(value as "AM" | "PM");
//       setTime(`${h}:${minute} ${value}`);
//     }
//   };

//   const hourRef = React.useRef<HTMLDivElement>(null);
//   const minuteRef = React.useRef<HTMLDivElement>(null);
//   const ampmRef = React.useRef<HTMLDivElement>(null);

//   // -----------------------------
//   // UI
//   // -----------------------------
//   return (
//     <div className="w-full flex flex-col gap-4">
//       {/* DATE */}
//       <button
//         onClick={() => setOpenDate(true)}
//         className="w-full py-4 px-5 border border-[rgba(248,247,252,0.1)] rounded-[10px] text-[#F8F7FC] flex justify-between items-center"
//       >
//         {date ? format(date, "PPP") : "Date of Birth"}
//         <ChevronDownIcon size={16} />
//       </button>

//       {/* TIME */}
//       <button
//         onClick={() => setOpenTime(true)}
//         className="w-full py-4 px-5 border border-[rgba(248,247,252,0.1)] rounded-[10px] text-[#F8F7FC] flex justify-between items-center"
//       >
//         {time || "Time of Birth"}
//         <ChevronDownIcon size={16} />
//       </button>

//       {/* ================= DATE MODAL ================= */}
//       {openDate && (
//         <div className="fixed inset-0 z-[999] flex items-center justify-center">
//           <div
//             className="absolute inset-0 bg-black/70 backdrop-blur-sm"
//             onClick={() => setOpenDate(false)}
//           />

//           <div className="relative z-10 bg-[#131827] border border-white/10 rounded-2xl p-4">
//             <Calendar
//               mode="single"
//               selected={date}
//               captionLayout="dropdown"
//               onSelect={(d) => {
//                 if (!d) return;
//                 setDate(d);
//                 setOpenDate(false);
//               }}
//             />
//           </div>
//         </div>
//       )}

//       {/* ================= TIME MODAL ================= */}
//       {openTime && (
//         <div className="fixed inset-0 z-[999] flex items-center justify-center">
//           <div
//             className="absolute inset-0 bg-black/70 backdrop-blur-sm"
//             onClick={() => setOpenTime(false)}
//           />

//           <div className="relative z-10 w-[90%] max-w-sm p-4 bg-[#1E254C4D] backdrop-blur-xl border border-white/10 rounded-2xl">
//             {/* HEADER */}
//             <div className="flex justify-between mb-3 text-white">
//               <span>Birth Time</span>
//               <button onClick={() => setOpenTime(false)}>Done</button>
//             </div>

//             {/* PICKER */}
//             <div className="relative flex h-44 rounded-xl overflow-hidden">
//               {/* highlight bar */}
//               <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-10 bg-white/10 border-y border-white/10 pointer-events-none" />

//               {/* HOURS */}
//               <div
//                 className="flex-1 overflow-y-auto text-center snap-y snap-mandatory"
//                 ref={hourRef}
//                 onScroll={() => handleScrollSelect(hourRef, hours, "hour")}
//               >
//                 {/* TOP SPACER */}
//                 <div className="h-16" />

//                 {hours.map((h) => (
//                   <div
//                     key={h}
//                     onClick={() => {
//                       const m = time.split(":")[1]?.split(" ")[0] || "00";
//                       setTime(`${h}:${m} ${ampm}`);
//                     }}
//                     className={`scroll-item h-10 flex items-center justify-center  snap-center cursor-pointer ${
//                       time.startsWith(h)
//                         ? "text-white font-semibold"
//                         : "text-white/40"
//                     }`}
//                   >
//                     {h}
//                   </div>
//                 ))}

//                 {/* BOTTOM SPACER */}
//                 <div className="h-16" />
//               </div>
//               {/* MINUTES */}
//               <div
//                 className="flex-1 overflow-y-auto text-center border-x border-white/10 snap-y snap-mandatory"
//                 ref={minuteRef}
//                 onScroll={() =>
//                   handleScrollSelect(minuteRef, minutes, "minute")
//                 }
//               >
//                 <div className="h-16" />

//                 {minutes.map((m) => (
//                   <div
//                     key={m}
//                     onClick={() => {
//                       const h = time.split(":")[0];
//                       setTime(`${h}:${m} ${ampm}`);
//                     }}
//                     className={`scroll-item h-10 flex items-center justify-center snap-center cursor-pointer ${
//                       time.includes(`:${m}`)
//                         ? "text-white font-semibold"
//                         : "text-white/40"
//                     }`}
//                   >
//                     {m}
//                   </div>
//                 ))}

//                 <div className="h-16" />
//               </div>

//               {/* AM/PM */}
//               <div
//                 className="flex-1 overflow-y-auto text-center snap-y snap-mandatory"
//                 ref={ampmRef}
//                 onScroll={() =>
//                   handleScrollSelect(ampmRef, ["AM", "PM"], "ampm")
//                 }
//               >
//                 <div className="h-16" />

//                 {["AM", "PM"].map((p) => (
//                   <div
//                     key={p}
//                     onClick={() => {
//                       setAmpm(p as "AM" | "PM");
//                       const [h, m] = time.split(":");
//                       const minute = m.split(" ")[0];
//                       setTime(`${h}:${minute} ${p}`);
//                     }}
//                     className={`scroll-item h-10 flex items-center justify-center snap-center cursor-pointer ${
//                       ampm === p ? "text-white font-semibold" : "text-white/40"
//                     }`}
//                   >
//                     {p}
//                   </div>
//                 ))}

//                 <div className="h-16" />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

type Props = {
  value?: {
    dob?: string;
    time?: string;
  };
  onChange?: (val: { dob: string; time: string }) => void;
};

export function DatePickerTime({ value, onChange }: Props) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [time, setTime] = React.useState<string>("12:00 AM");

  const [openDate, setOpenDate] = React.useState(false);
  const [openTime, setOpenTime] = React.useState(false);
  const [ampm, setAmpm] = React.useState<"AM" | "PM">("AM");

  React.useEffect(() => {
    const isOpen = openDate || openTime;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [openDate, openTime]);

  const hours = React.useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
    [],
  );

  const minutes = React.useMemo(
    () => Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")),
    [],
  );

  React.useEffect(() => {
    if (!onChange || !date || !time) return;

    const [timePart, period] = time.split(" ");
    const [h, m] = timePart.split(":");

    let hour = parseInt(h);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    onChange({
      dob: format(date, "yyyy-MM-dd"),
      time: `${String(hour).padStart(2, "0")}:${m}`,
    });
  }, [date, time]);

  React.useEffect(() => {
    if (value?.dob) setDate(new Date(value.dob));
    if (value?.time) setTime(value.time);
  }, []);

  const hourRef = React.useRef<HTMLDivElement>(null);
  const minuteRef = React.useRef<HTMLDivElement>(null);
  const ampmRef = React.useRef<HTMLDivElement>(null);

  // ── NEW: scroll a column so the item at `index` lands in the spotlight ──
  const scrollToCenter = (
    ref: React.RefObject<HTMLDivElement | null>,
    index: number,
  ) => {
    const el = ref.current;
    if (!el) return;

    const itemHeight = 40;
    const spacerHeight = 64;
    const containerCenter = el.offsetHeight / 2;
    const itemCenter = spacerHeight + index * itemHeight + itemHeight / 2;

    // Direct assignment — no smooth, no browser API, just works
    el.scrollTop = itemCenter - containerCenter;
  };

  const handleScrollSelect = (
    ref: React.RefObject<HTMLDivElement | null>,
    items: string[],
    type: "hour" | "minute" | "ampm",
  ) => {
    const el = ref.current;
    if (!el) return;

    const children = Array.from(el.children) as HTMLElement[];
    const containerCenter = el.scrollTop + el.offsetHeight / 2 - 32;

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

    const val = items[closestIndex];

    if (type === "hour") {
      const m = time.split(":")[1]?.split(" ")[0] || "00";
      setTime(`${val}:${m} ${ampm}`);
    }

    if (type === "minute") {
      const h = time.split(":")[0];
      setTime(`${h}:${val} ${ampm}`);
    }

    if (type === "ampm") {
      const [h, m] = time.split(":");
      const minute = m.split(" ")[0];
      setAmpm(val as "AM" | "PM");
      setTime(`${h}:${minute} ${val}`);
    }
  };

  // ── Scroll all columns to their current value when the modal opens ──
  const initScrollPositions = React.useCallback(() => {
    const [timePart, period] = time.split(" ");
    const [h, m] = timePart.split(":");

    const hIdx = hours.indexOf(h);
    const mIdx = minutes.indexOf(m);
    const aIdx = ["AM", "PM"].indexOf(period ?? ampm);

    if (hIdx !== -1) scrollToCenter(hourRef, hIdx);
    if (mIdx !== -1) scrollToCenter(minuteRef, mIdx);
    if (aIdx !== -1) scrollToCenter(ampmRef, aIdx);
  }, [time, ampm, hours, minutes]);

  React.useEffect(() => {
    if (openTime) {
      setTimeout(initScrollPositions, 150); // was 50, bump to 150
    }
  }, [openTime]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* DATE */}
      <button
        onClick={() => setOpenDate(true)}
        className="w-full py-4 px-5 border border-[rgba(248,247,252,0.1)] rounded-[10px] text-[#F8F7FC] flex justify-between items-center"
      >
        {date ? format(date, "PPP") : "Date of Birth"}
        <ChevronDownIcon size={16} />
      </button>

      {/* TIME */}
      <button
        onClick={() => setOpenTime(true)}
        className="w-full py-4 px-5 border border-[rgba(248,247,252,0.1)] rounded-[10px] text-[#F8F7FC] flex justify-between items-center"
      >
        {time || "Time of Birth"}
        <ChevronDownIcon size={16} />
      </button>

      {/* ================= DATE MODAL ================= */}
      {openDate && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpenDate(false)}
          />
          <div className="relative z-10 bg-[#131827] border border-white/10 rounded-2xl p-4">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(d) => {
                if (!d) return;
                setDate(d);
                setOpenDate(false);
              }}
            />
          </div>
        </div>
      )}

      {/* ================= TIME MODAL ================= */}
      {openTime && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpenTime(false)}
          />

          <div className="relative z-10 w-[90%] max-w-sm p-4 bg-[#1E254C4D] backdrop-blur-xl border border-white/10 rounded-2xl">
            {/* HEADER */}
            <div className="flex justify-between mb-3 text-white">
              <span>Birth Time</span>
              <button onClick={() => setOpenTime(false)}>Done</button>
            </div>

            {/* PICKER */}
            <div className="relative flex h-44 rounded-xl overflow-hidden">
              {/* highlight bar */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-10 bg-white/10 border-y border-white/10 pointer-events-none" />

              {/* HOURS */}
              <div
                className="flex-1 overflow-y-auto text-center snap-y snap-mandatory"
                ref={hourRef}
                onScroll={() => handleScrollSelect(hourRef, hours, "hour")}
              >
                <div className="h-16" />
                {hours.map((h, idx) => (
                  <div
                    key={h}
                    onClick={() => {
                      const m = time.split(":")[1]?.split(" ")[0] || "00";
                      setTime(`${h}:${m} ${ampm}`);
                      scrollToCenter(hourRef, idx);
                    }}
                    className={`scroll-item h-10 flex items-center justify-center snap-center cursor-pointer ${
                      time.startsWith(h)
                        ? "text-white font-semibold"
                        : "text-white/40"
                    }`}
                  >
                    {h}
                  </div>
                ))}
                <div className="h-16" />
              </div>

              {/* MINUTES */}
              <div
                className="flex-1 overflow-y-auto text-center border-x border-white/10 snap-y snap-mandatory"
                ref={minuteRef}
                onScroll={() =>
                  handleScrollSelect(minuteRef, minutes, "minute")
                }
              >
                <div className="h-16" />
                {minutes.map((m, idx) => (
                  <div
                    key={m}
                    onClick={() => {
                      const h = time.split(":")[0];
                      setTime(`${h}:${m} ${ampm}`);
                      scrollToCenter(minuteRef, idx);
                    }}
                    className={`scroll-item h-10 flex items-center justify-center snap-center cursor-pointer ${
                      time.includes(`:${m}`)
                        ? "text-white font-semibold"
                        : "text-white/40"
                    }`}
                  >
                    {m}
                  </div>
                ))}
                <div className="h-16" />
              </div>

              {/* AM/PM */}
              <div
                className="flex-1 overflow-y-auto text-center snap-y snap-mandatory"
                ref={ampmRef}
                onScroll={() =>
                  handleScrollSelect(ampmRef, ["AM", "PM"], "ampm")
                }
              >
                <div className="h-16" />
                {["AM", "PM"].map((p, idx) => (
                  <div
                    key={p}
                    onClick={() => {
                      setAmpm(p as "AM" | "PM");
                      const [h, m] = time.split(":");
                      const minute = m.split(" ")[0];
                      setTime(`${h}:${minute} ${p}`);
                      scrollToCenter(ampmRef, idx);
                    }}
                    className={`scroll-item h-10 flex items-center justify-center snap-center cursor-pointer ${
                      ampm === p ? "text-white font-semibold" : "text-white/40"
                    }`}
                  >
                    {p}
                  </div>
                ))}
                <div className="h-16" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
