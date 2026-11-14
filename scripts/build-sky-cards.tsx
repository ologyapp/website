// Builds lib/skyCards.json from the sky events file the app reads.
// Run with: npx tsx scripts/build-sky-cards.tsx
// Re-run when a new year's events file lands in data/ (2027 before Jan 1).
import fs from "fs";
import path from "path";
import crypto from "crypto";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as Lucide from "lucide-react";
import * as Planets from "../components/PlanetIcons";
import { cyclesCards } from "../mockData";

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "data");

// Marker glyphs already used on the Align cards, found by content hash.
const hash = (s: string) =>
  crypto.createHash("md5").update(s.replace(/\s+/g, "")).digest("hex").slice(0, 6);
const glyphs: Record<string, string> = {};
for (const c of cyclesCards as { icon: string[] }[]) for (const g of c.icon) glyphs[hash(g)] = g;
const RX = glyphs["8b02fe"]; // retrograde marker
const MARK = glyphs["29e1f3"]; // ingress and eclipse marker
const ECLIPSE = glyphs["90769a"]; // eclipse node
const URANUS = glyphs["c54110"];
if (!RX || !MARK || !ECLIPSE || !URANUS) throw new Error("marker glyph missing");

const planetSvg = (name: string): string => {
  if (name === "Uranus") return URANUS;
  const C = (Planets as Record<string, React.ComponentType | undefined>)[`${name}Icon`];
  if (!C) throw new Error(`no glyph for ${name}`);
  return renderToStaticMarkup(React.createElement(C));
};
const signSvg = (sign: string): string => {
  const C = (Lucide as unknown as Record<string, React.ComponentType<Record<string, unknown>> | undefined>)[`Zodiac${sign}`];
  if (!C) throw new Error(`no glyph for ${sign}`);
  return renderToStaticMarkup(
    React.createElement(C, { size: 13, color: "#F8F7FC", strokeWidth: 1.5 }),
  );
};

type Row = {
  occurs_at_ut: string;
  name: string;
  position: string;
  event_class: string;
  user_facing: string;
  display_copy: string;
};

function parseCsv(text: string): Row[] {
  const lines = text.replace(/\r/g, "").split("\n").filter(Boolean);
  const head = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const cells: string[] = [];
    let cur = "";
    let q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (q && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else q = !q;
      } else if (ch === "," && !q) {
        cells.push(cur);
        cur = "";
      } else cur += ch;
    }
    cells.push(cur);
    return Object.fromEntries(head.map((h, i) => [h, cells[i] ?? ""])) as Row;
  });
}

// Market time zone for card dates.
const etDate = (ut: string) => {
  const d = new Date(ut.replace(" ", "T") + ":00Z");
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
  return parts; // YYYY-MM-DD
};
const display = (iso: string) => {
  const d = new Date(iso + "T12:00:00Z");
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
};
const signOf = (position: string) => position.split(" ")[0];
const STRUCTURAL = new Set(["Saturn", "Uranus", "Neptune", "Pluto"]);
const SKIP = new Set(["Chiron"]);

// Approved card copy that replaces the events file line (Nov 14 ruling).
const OVERRIDE: Record<string, string> = {
  "Saturn Retrograde (R)|2026-07-26":
    "Saturn holds retrograde from July 26 to December 10, its first retrograde spent entirely in Aries in nearly three decades.",
};

const rows = fs
  .readdirSync(dataDir)
  .filter((f) => /^sky-events-\d{4}\.csv$/.test(f))
  .sort()
  .flatMap((f) => parseCsv(fs.readFileSync(path.join(dataDir, f), "utf8")))
  .filter((r) => r.user_facing === "true")
  .sort((a, b) => a.occurs_at_ut.localeCompare(b.occurs_at_ut));

const cards: { date_start: string; date_end: string; [k: string]: unknown }[] = [];

for (const r of rows) {
  const date = etDate(r.occurs_at_ut);
  const sign = signOf(r.position);
  const planet = r.name.split(" ")[0];
  if (SKIP.has(planet)) continue;
  const copy = OVERRIDE[`${r.name}|${date}`] ?? r.display_copy;
  if (!copy) continue;

  if (/Retrograde \(R\)$/.test(r.name)) {
    // Window runs to the matching Direct station, when the file has it.
    const direct = rows.find(
      (x) => x.name === `${planet} Direct` && x.occurs_at_ut > r.occurs_at_ut,
    );
    cards.push({
      date: display(date),
      date_start: date,
      date_end: direct ? etDate(direct.occurs_at_ut) : date,
      read: STRUCTURAL.has(planet) ? "Structural Shift" : "Cyclical Read",
      title: `${planet} retrograde in ${sign}.`,
      content: copy,
      button_text: `${planet} RX ${sign}`.toUpperCase(),
      outcome_tag: null,
      icon: [planetSvg(planet), RX, signSvg(sign)],
      sky: true,
    });
  } else if (r.event_class === "eclipse") {
    const body = /Solar/.test(r.name) ? "Sun" : "Moon";
    cards.push({
      date: display(date),
      date_start: date,
      date_end: date,
      read: "Cyclical Read",
      title: `${r.name}.`,
      content: copy,
      button_text: r.name.replace(" in ", " ").toUpperCase(),
      outcome_tag: null,
      icon: [planetSvg(body), MARK, ECLIPSE],
      sky: true,
    });
  } else if (r.event_class === "lunation") {
    // An eclipse on the same day carries the card.
    if (rows.some((x) => x.event_class === "eclipse" && etDate(x.occurs_at_ut) === date)) continue;
    cards.push({
      date: display(date),
      date_start: date,
      date_end: date,
      read: "Cyclical Read",
      title: `${r.name}.`,
      content: copy,
      button_text: r.name.replace(" in ", " ").toUpperCase(),
      outcome_tag: null,
      icon: [planetSvg("Moon"), signSvg(sign)],
      sky: true,
    });
  } else if (r.event_class === "ingress_outer") {
    cards.push({
      date: display(date),
      date_start: date,
      date_end: date,
      read: STRUCTURAL.has(planet) ? "Structural Shift" : "Cyclical Read",
      title: `${r.name}.`,
      content: copy,
      button_text: r.name.replace(" enters ", " INTO ").toUpperCase(),
      outcome_tag: null,
      icon: [planetSvg(planet), MARK, signSvg(r.name.split(" ").pop() as string)],
      sky: true,
    });
  }
}

// Past cards never show, so they stay out of the page bundle.
const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
const keep = cards.filter((c) => c.date_end >= today);
fs.writeFileSync(path.join(root, "lib", "skyCards.json"), JSON.stringify(keep, null, 1) + "\n");
console.log(`wrote ${keep.length} of ${cards.length} sky cards (date_end on or after ${today})`);
