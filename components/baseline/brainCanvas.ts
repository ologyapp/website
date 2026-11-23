"use client";

// OLG-245. The constellation brain's canvas, lifted out of WelcomeIntro
// unchanged so the welcome page and the installed app's opener draw the
// same animation from one place. The stars fly in and form the brain,
// hold while the threads light, then gather into the Ology wordmark.

import { useEffect, useRef, type RefObject } from "react";
import ology from "./OlogyLogo.svg";
import { WELCOME_BRAIN_SIZE, WELCOME_BRAIN_STARS, WELCOME_BRAIN_THREADS } from "./welcomeBrain";

export const BG = "#0D1220";
const LOGO_INK = [232, 233, 243]; // #E8E9F3, the wordmark fill
export const LOGO_W = 138; // resting width, Figma 171:9049
export const LOGO_W_CENTRE = 170; // width while it sits at the centre, Figma 156:644
// Desktop keeps the same proportion between the two, so the rise is the
// same move at a larger size (176 resting, 217 at the centre).
export const LOGO_W_DESK = 176;
export const DESK_QUERY = "(min-width: 768px)";

// The timeline, in ms from the first frame.
// OLG-117, Nov 11. Christina asked for it a touch slower and more
// cinematic, so every beat runs 1.2 times its first cut.
export const T = {
  formSpread: 500, // stars set off over this window
  formDur: 1140, // each star's flight into the brain
  gather: 1980, // stars leave the brain for the wordmark
  gatherSpread: 260,
  gatherDur: 1140,
  logoIn: 2940, // the real wordmark fades in over the gathered stars
  starsOut: 3120,
  starsOutDur: 540,
  rise: 3660, // the wordmark rises to its resting place
  line: 4020, // the line, then the buttons 240ms and 420ms after it
  end: 4980,
};

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

// Seeded so the scatter is the same on every visit.
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

const STARS = (() => {
  const r = rng(117);
  return WELCOME_BRAIN_STARS.map(([x, y, rad, col]) => ({
    bx: x / WELCOME_BRAIN_SIZE[0], // position in the brain, 0 to 1
    by: y / WELCOME_BRAIN_SIZE[1],
    rad,
    col: rgb(col),
    sx: r() * 1.3 - 0.15, // where it flies in from, as a share of the screen
    sy: r() * 1.3 - 0.15,
    delay: r() * T.formSpread,
    psi: r() * Math.PI * 2,
    tx: 0, // its place in the wordmark, set when the gathering starts
    ty: 0,
  }));
})();

/**
 * Draws the brain on the given canvas, sized to the window. When
 * `skipped.current` turns true the canvas clears and stops.
 */
export function useBrainCanvas(canvasRef: RefObject<HTMLCanvasElement | null>, skipped: RefObject<boolean>) {
  const logoPoints = useRef<[number, number][] | null>(null);

  // Sample the wordmark into points the stars can settle on.
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      const centre = window.matchMedia(DESK_QUERY).matches ? Math.round((LOGO_W_DESK * LOGO_W_CENTRE) / LOGO_W) : LOGO_W_CENTRE;
      const w = centre * 2;
      const h = Math.round((w * img.naturalHeight) / img.naturalWidth);
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const g = c.getContext("2d", { willReadFrequently: true });
      if (!g) return;
      g.drawImage(img, 0, 0, w, h);
      const data = g.getImageData(0, 0, w, h).data;
      const pts: [number, number][] = [];
      for (let y = 0; y < h; y += 2)
        for (let x = 0; x < w; x += 2) if (data[(y * w + x) * 4 + 3] > 140) pts.push([x / 2 - w / 4, y / 2 - h / 4]);
      logoPoints.current = pts;
    };
    img.src = (ology as { src: string }).src;
  }, []);

  // The canvas: far stars always, the brain and its gathering until the end.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let raf = 0;
    let t0 = 0;
    let assigned = false;
    let W = 0;
    let H = 0;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const assign = (scale: number, ox: number) => {
      const pts = logoPoints.current;
      const cx = W / 2;
      const cy = H / 2;
      if (!pts || pts.length === 0) {
        STARS.forEach((s) => ((s.tx = cx), (s.ty = cy)));
      } else {
        // Left of the brain gathers into the left of the word, right into
        // the right, so the stars sweep in rather than cross.
        const r = rng(7);
        const pick = Array.from({ length: STARS.length }, (_, i) => pts[Math.floor(((i + r()) * pts.length) / STARS.length)]);
        pick.sort((a, b) => a[0] - b[0]);
        const order = STARS.map((s, i) => [ox + s.bx * WELCOME_BRAIN_SIZE[0] * scale, i] as const).sort((a, b) => a[0] - b[0]);
        order.forEach(([, i], k) => {
          STARS[i].tx = cx + pick[k][0] + (r() - 0.5) * 0.8;
          STARS[i].ty = cy + pick[k][1] + (r() - 0.5) * 0.8;
        });
      }
      assigned = true;
    };


    const frame = (now: number) => {
      if (!t0) t0 = now;
      const t = skipped.current ? T.end : now - t0;
      ctx.clearRect(0, 0, W, H);

      if (t < T.starsOut + T.starsOutDur) {
        // The brain, sized and placed as in Figma 156:634.
        const scale = Math.min((W * 0.79) / WELCOME_BRAIN_SIZE[0], (H * 0.53) / WELCOME_BRAIN_SIZE[1]);
        const ox = W / 2 - (WELCOME_BRAIN_SIZE[0] * scale) / 2;
        const oy = H * 0.47 - (WELCOME_BRAIN_SIZE[1] * scale) / 2;
        if (t >= T.gather && !assigned) assign(scale, ox);
        const out = 1 - clamp((t - T.starsOut) / T.starsOutDur);
        const px = new Float32Array(STARS.length * 2);

        for (let i = 0; i < STARS.length; i++) {
          const s = STARS[i];
          const bx = ox + s.bx * WELCOME_BRAIN_SIZE[0] * scale;
          const by = oy + s.by * WELCOME_BRAIN_SIZE[1] * scale;
          const p = easeOut(clamp((t - s.delay) / T.formDur));
          let x = s.sx * W + (bx - s.sx * W) * p;
          let y = s.sy * H + (by - s.sy * H) * p;
          let q = 0;
          if (assigned) {
            q = easeInOut(clamp((t - T.gather - s.by * T.gatherSpread) / T.gatherDur));
            x += (s.tx - x) * q;
            y += (s.ty - y) * q;
          }
          px[i * 2] = x;
          px[i * 2 + 1] = y;
        }

        // Threads, while the brain holds.
        const thr = clamp((t - 1080) / 600) * (1 - clamp((t - T.gather) / 310)) * 0.38;
        if (thr > 0.005) {
          ctx.lineWidth = 0.6;
          ctx.lineCap = "round";
          for (const [a, b] of WELCOME_BRAIN_THREADS) {
            const ca = STARS[a].col;
            const cb = STARS[b].col;
            ctx.strokeStyle = `rgba(${(ca[0] + cb[0]) / 2 * 0.6 + 100},${(ca[1] + cb[1]) / 2 * 0.6 + 100},${(ca[2] + cb[2]) / 2 * 0.6 + 100},${thr})`;
            ctx.beginPath();
            ctx.moveTo(px[a * 2], px[a * 2 + 1]);
            ctx.lineTo(px[b * 2], px[b * 2 + 1]);
            ctx.stroke();
          }
        }

        // Stars: a soft halo and a sharp core, drifting to white as they
        // become the wordmark.
        for (let i = 0; i < STARS.length; i++) {
          const s = STARS[i];
          const p = easeOut(clamp((t - s.delay) / T.formDur));
          const q = assigned ? easeInOut(clamp((t - T.gather - s.by * T.gatherSpread) / T.gatherDur)) : 0;
          const tw = 0.82 + 0.18 * Math.sin(t * 0.0034 + s.psi);
          const a = p * tw * out;
          if (a < 0.01) continue;
          const rad = (s.rad * scale * 1.05) * (1 - q) + 0.85 * q;
          const c = s.col.map((v, k) => Math.round(v + (LOGO_INK[k] - v) * q));
          const x = px[i * 2];
          const y = px[i * 2 + 1];
          ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${a * 0.16 * (1 - 0.6 * q)})`;
          ctx.beginPath();
          ctx.arc(x, y, rad * 2.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${a})`;
          ctx.beginPath();
          ctx.arc(x, y, rad, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (t < T.end) raf = requestAnimationFrame(frame);
    };

    const restart = () => {
      cancelAnimationFrame(raf);
      size();
      raf = requestAnimationFrame(frame);
    };
    size();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", restart);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", restart);
    };
  }, [canvasRef, skipped]);
}
