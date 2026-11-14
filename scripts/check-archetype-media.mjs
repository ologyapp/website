// Fails when any archetype in synopsis.json is missing its reveal media.
// Run with: node scripts/check-archetype-media.mjs
import fs from "fs";
import path from "path";

const root = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const names = Object.keys(
  JSON.parse(fs.readFileSync(path.join(root, "components/synopsis.json"), "utf8")),
);
const missing = [];
for (const name of names) {
  const base = name.replace(/\s+/g, "");
  for (const suffix of [".mp4", "Card.jpg", "Profile.png"]) {
    const f = path.join(root, "public", base + suffix);
    if (!fs.existsSync(f)) missing.push(base + suffix);
  }
}
if (missing.length) {
  console.error(`Missing archetype media (${missing.length}):\n` + missing.join("\n"));
  process.exit(1);
}
console.log(`All ${names.length} archetypes have video, card and profile files.`);
