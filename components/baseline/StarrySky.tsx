// OLG-165, notes 1 and 5. Christina, Nov 14: keep the minimal starry sky
// of the welcome behind every onboarding screen, and let the stars
// twinkle very gently.
//
// One sky, the same stars in the same places on every screen, so nothing
// jumps as the member moves from the welcome to the reveal. It is pinned
// to the window and sits behind the page, so the page scrolls over a sky
// that stays still. A little under half the stars breathe, each on its
// own slow clock, down to a little over a third of its resting light and
// back. Under reduced motion the sky is still.

/** Seeded so the scatter is the same on every visit and every screen. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// The first four draws per star match the welcome's far field of Nov 11,
// so the welcome keeps the sky it had.
const FAR = (() => {
  const r = rng(11);
  const stars = Array.from({ length: 170 }, () => ({ x: r(), y: r(), rad: 0.35 + r() * 0.6, a: 0.12 + Math.pow(r(), 1.6) * 0.45 }));
  const t = rng(29);
  return stars.map((s) => ({
    ...s,
    twinkle: t() < 0.45,
    dur: 4.2 + t() * 4.8, // seconds for one breath
    delay: -t() * 9, // negative, so the sky is already out of step on mount
  }));
})();

const CSS = `
.ol-sky-star{position:absolute;border-radius:9999px;background:#C9CCE6;opacity:var(--a)}
.ol-sky-twinkle{animation:ol-sky-twinkle var(--dur) ease-in-out var(--delay) infinite}
@keyframes ol-sky-twinkle{0%,100%{opacity:var(--a)}50%{opacity:calc(var(--a) * .36)}}
@media (prefers-reduced-motion: reduce){.ol-sky-twinkle{animation:none}}
`;

/**
 * `behind` (the default) sits under everything in the screen that hosts
 * it, which must be its own stacking context (`isolate`). `over` is for a
 * screen that paints its own colored backdrop: the sky goes over that
 * backdrop, and the content after it must be positioned to sit above.
 */
export default function StarrySky({ layer = "behind" }: { layer?: "behind" | "over" }) {
  return (
    <div aria-hidden className={`pointer-events-none fixed inset-0 overflow-hidden ${layer === "behind" ? "-z-10" : ""}`}>
      <style>{CSS}</style>
      {FAR.map((s, i) => (
        <span
          key={i}
          className={s.twinkle ? "ol-sky-star ol-sky-twinkle" : "ol-sky-star"}
          style={
            {
              left: `${(s.x * 100).toFixed(3)}%`,
              top: `${(s.y * 100).toFixed(3)}%`,
              width: `${(s.rad * 2).toFixed(2)}px`,
              height: `${(s.rad * 2).toFixed(2)}px`,
              "--a": s.a.toFixed(3),
              "--dur": `${s.dur.toFixed(2)}s`,
              "--delay": `${s.delay.toFixed(2)}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
