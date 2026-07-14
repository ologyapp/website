export const READ_HUE = {
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
    .filter((c) => railOf(c, now) === "Ahead")
    .sort((a, b) => a.date_start.localeCompare(b.date_start));
  const record = cards
    .filter((c) => railOf(c, now) === "Record")
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return { ahead, record };
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
