"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react";
import { isSameDay } from "date-fns";

function CalendarDropdown({ options, value, onChange, className }: any) {
  const [open, setOpen] = React.useState(false);
  const [coords, setCoords] = React.useState({ top: 0, left: 0 });
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  // NEW — proves whether this is the same instance or a fresh one
  const instanceId = React.useRef(Math.random().toString(36).slice(2, 8));

  React.useEffect(() => {
    if (!open) return;

    function handleOutside(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;
      const insideTrigger = triggerRef.current?.contains(target);
      const insideList = listRef.current?.contains(target);

      if (insideTrigger || insideList) {
        return;
      }

      setOpen(false);
    }

    const id = window.setTimeout(() => {
      document.addEventListener("mousedown", handleOutside);
      document.addEventListener("touchstart", handleOutside);
    }, 0);

    return () => {
      window.clearTimeout(id);
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [open]);

  // fires on every render — tells you if this component is remounting

  const openMenu = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      setCoords({
        top: rect.bottom + 8,
        left: rect.left + rect.width / 2,
      });
    }

    setOpen((o) => !o);
  };

  const selected = options?.find((o: any) => String(o.value) === String(value));

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          openMenu();
        }}
        className={cn(
          "flex items-center gap-1 text-[#F8F7FC] font-Recoleta text-[19.184px] font-normal",
          "touch-manipulation",
          className,
        )}
      >
        {selected?.label}
        <ChevronDownIcon className="size-3.5 text-white/60" />
      </button>

      {open &&
        createPortal(
          <div
            ref={listRef}
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              transform: "translateX(-50%)",
            }}
            className="z-[9999999] max-h-56 w-28 overflow-y-auto scrollbar-none rounded-xl border border-white/10 bg-[#1a2036] shadow-2xl"
          >
            {options?.map((option: any) => (
              <button
                key={option.value}
                type="button"
                disabled={option.disabled}
                onClick={(e) => {
                  e.stopPropagation();

                  onChange?.({
                    target: { value: String(option.value) },
                  } as React.ChangeEvent<HTMLSelectElement>);
                  setOpen(false);
                }}
                className={cn(
                  "block w-full px-3 py-2 text-left text-base text-white/70 hover:bg-white/10 transition-colors touch-manipulation",
                  String(option.value) === String(value) &&
                    "bg-white/10 text-white font-semibold",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "dropdown",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar w-full bg-transparent p-2 backdrop-blur-none",
        className,
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn(
          "w-full bg-transparent !bg-transparent pb-4",
          defaultClassNames.root,
        ),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row bg-transparent pb-4",
          defaultClassNames.months,
        ),
        month: cn(
          "flex w-full flex-col gap-4 bg-transparent",
          defaultClassNames.month,
        ),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1 pointer-events-none",
          "[&>button]:pointer-events-auto",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-base font-medium",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "relative rounded-(--cell-radius) bg-transparent",
          defaultClassNames.dropdown_root,
        ),
        caption_label: cn(
          "text-[#F8F7FC] text-center font-Recoleta text-[19.184px] font-normal leading-[24.939px] tracking-[-0.004px] not-italic",
          "flex items-center justify-center",
          defaultClassNames.caption_label,
        ),
        weekdays: cn(
          "flex border-t border-[rgba(248,247,252,0.1)] pt-2 mt-2 mb-4",
          defaultClassNames.weekdays,
        ),
        weekday: cn(
          "flex-1 text-center font-Recoleta text-[16px] font-normal leading-none text-[#F8F7FC] gap-8 not-italic mt-4",
          defaultClassNames.weekday,
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          "text-[0.8rem] text-muted-foreground select-none",
          defaultClassNames.week_number,
        ),
        day: cn(
          "group/day relative flex flex-1 aspect-square h-full w-full items-center justify-center rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)"
            : "[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)",
          defaultClassNames.day,
        ),
        range_start: cn(
          "relative isolate z-0 rounded-l-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted",
          defaultClassNames.range_start,
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn(
          "relative isolate z-0 rounded-r-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted",
          defaultClassNames.range_end,
        ),
        today: cn(
          "bg-transparent text-white  rounded-full",
          defaultClassNames.today,
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside,
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled,
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon
                className={cn("size-4 text-white", className)}
                {...props}
              />
            );
          }
          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4 text-white", className)}
                {...props}
              />
            );
          }
          return (
            <ChevronDownIcon
              className={cn("size-4 text-white", className)}
              {...props}
            />
          );
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        Dropdown: CalendarDropdown,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "flex items-center justify-center",
        "w-9 h-9 min-w-9 rounded-full",
        "text-[#F8F7FC] text-center font-Satoshi text-[16px] font-medium leading-none",
        "relative isolate z-10 border-0",
        "hover:bg-white/10",
        "data-[selected-single=true]:bg-white/20 data-[selected-single=true]:text-white",
        "transition-colors",
        "touch-manipulation",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
