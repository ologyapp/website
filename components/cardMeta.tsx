import skyCards from "@/lib/skyCards.json";

export const READ_HUE: Record<string, string> = {
  "Cyclical Read": "#E89B7F", // Planetary/Mars Ember
  "Structural Shift": "#7A849A", // Planetary/Saturn Stone
  "Behavioral Divergence": "#9B8FD4", // Planetary/Jupiter Wisdom
};

// Planetary/Moon Glow. Outcome tags and the scroll rail. Never a class color.
export const NEUTRAL = "#D8DAE8";

export function statusOf(card: any, now = new Date()) {
  if (!card || !card.date_start || !card.date_end) return "RECORD";
  const start = new Date(card.date_start + "T00:00:00");
  const end = new Date(card.date_end + "T23:59:59");
  if (now >= start && now <= end) return "ACTIVE";
  if (now < start) return "AHEAD";
  return "RECORD";
}

export function railOf(card: any, now = new Date()) {
  return statusOf(card, now) === "RECORD" ? "Record" : "Ahead";
}

export function sortedRails(cards: any, now = new Date()) {
  const ahead = cards
    .filter((c: any) => railOf(c, now) === "Ahead")
    .sort((a: any, b: any) => a.date_start.localeCompare(b.date_start));
  const record = cards
    .filter((c: any) => railOf(c, now) === "Record")
    .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
  return { ahead, record };
}

// Cycle cards as one timeline for every layout (desktop carousel, phone
// scroll list), left to right in date order. Record cards oldest to newest,
// then what is active today, then what is ahead, soonest first. Each group
// sorts on date_start, the date printed on the card. The view opens on
// today (todayIndex), so earlier record cards sit to the left of it.
export function sortCards(cards: any[], now = new Date()) {
  const byStart = (a: any, b: any) =>
    a.date_start.localeCompare(b.date_start) ||
    a.date_end.localeCompare(b.date_end);
  const record = cards.filter((c: any) => statusOf(c, now) === "RECORD").sort(byStart);
  const active = cards.filter((c: any) => statusOf(c, now) === "ACTIVE").sort(byStart);
  const ahead = cards.filter((c: any) => statusOf(c, now) === "AHEAD").sort(byStart);
  return [...record, ...active, ...ahead];
}

// Where the timeline opens. Among the cards in effect today or still ahead,
// the one whose printed date is nearest today (OLG-285). A long retrograde
// that began months ago no longer holds the opening slot when a new event
// is a day away. Ties go to the earlier card. With nothing in effect or
// ahead, the newest record card.
export function todayIndex(cards: any[], now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  let best = -1;
  let bestGap = Infinity;
  cards.forEach((c: any, i: number) => {
    if (statusOf(c, now) === "RECORD") return;
    const gap = Math.abs(new Date(c.date_start + "T00:00:00").getTime() - today);
    if (gap < bestGap) {
      bestGap = gap;
      best = i;
    }
  });
  return best === -1 ? Math.max(cards.length - 1, 0) : best;
}

// Style. Derived from read and status. No card carries a color.
export function cardStyle(read: any) {
  const hue = READ_HUE[read];
  return {
    dot: { background: hue },
    label: { color: hue },
    button: {
      background: hue + "33",
      border: `1px solid ${hue}66`,
      color: hue,
    },
    outcome: {
      background: "transparent",
      border: `1px solid ${NEUTRAL}40`,
      color: NEUTRAL,
    },
  };
}

// The scroll rail carries no class hue. Color means class. State means shape.
export function railDotStyle(status: any) {
  if (status === "ACTIVE")
    return { size: 16, background: NEUTRAL, border: "none" };
  if (status === "AHEAD")
    return { size: 9, background: NEUTRAL + "73", border: "none" };
  return {
    size: 9,
    background: "transparent",
    border: `1.5px solid ${NEUTRAL}59`,
  };
}

// Sky cards built from the events file the app reads (scripts/build-sky-cards.tsx).
// Shows what is in effect today and the next four ahead, so Align never goes stale.
type SkyCard = { date_start: string; date_end: string } & Record<string, unknown>;

export function liveSkyCards(now: Date | null, ahead = 4) {
  if (!now) return [];
  const cards = skyCards as SkyCard[];
  const active = cards.filter((c) => statusOf(c, now) === "ACTIVE");
  const next = cards
    .filter((c) => statusOf(c, now) === "AHEAD")
    .sort((a, b) => a.date_start.localeCompare(b.date_start))
    .slice(0, ahead);
  return [...active, ...next];
}

// Today's date in market time, for useSyncExternalStore. Null on the server,
// so the first client render matches the server HTML.
export const marketDay = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
export const noopSubscribe = () => () => {};
