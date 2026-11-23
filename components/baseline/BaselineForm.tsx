"use client";

// OLG-282. Christina, Nov 23. The first wave baseline: five short
// questions answered before a member sees their archetype, built from
// Figma Outreach 260:6 (desktop), 260:118 (phone) and 260:230 (answers
// received).
//
// The page opens the way the beta opens. The constellation brain forms,
// its stars gather into the Ology wordmark at the centre, the wordmark
// rises to the head of the page and the form comes in over the beta's
// starry sky. brainCanvas.ts, welcomeBrain.ts, StarrySky.tsx and
// OlogyLogo.svg are the beta's own files, copied from beta-web unchanged
// (brainCanvas differs only in where it imports the wordmark from), and
// the phases below follow the beta's WelcomeIntro. A tap skips it and
// reduced motion shows the page at once.
//
// The email arrives in the link from the invitation and is taken out of
// the address bar once read. Answers post to the HubSpot form "Ology
// first wave baseline (OLG-282)" and land on the contact. Every question
// is optional; the email is not.

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import ology from "./OlogyLogo.svg";
import StarrySky from "./StarrySky";
import { DESK_QUERY, LOGO_W, LOGO_W_CENTRE, LOGO_W_DESK, T, useBrainCanvas } from "./brainCanvas";

const PAGE_BG = "#151B30"; // the frame fill in Figma 260:6
const REST_W = 96; // the wordmark at the head of the page, Figma 260:6

const HUBSPOT_URL =
  "https://api.hsforms.com/submissions/v3/integration/submit/44639466/1cf0462f-7910-44d1-98d1-f06789f65c27";

const HOW_OFTEN = ["Daily or more", "A few times a week", "A few times a month", "A few times a year", "Not trading yet"];
const WHAT_YOU_TRADE = ["Stocks", "Options", "ETFs and index funds", "Crypto", "Futures", "Forex", "Something else"];
const UNDER_PRESSURE = [
  "Hold and wait",
  "Add to it",
  "Reduce or close it",
  "Step away from the screen",
  "Look for more information",
  "It depends",
];
const THE_JOURNAL = ["Yes", "Probably", "Not sure yet"];

type Phase = "brain" | "logo" | "risen" | "ready";
const ORDER: Phase[] = ["brain", "logo", "risen", "ready"];

const BROW = "font-Satoshi text-[11px] font-medium uppercase leading-[14px] tracking-[0.08em] text-[#9BA3B8]";

function Pill({ label, selected, multi, onClick }: { label: string; selected: boolean; multi: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onClick}
      className="h-[38px] cursor-pointer rounded-full border px-[14px] font-Satoshi text-[13px] leading-5 text-[#EDEDF2] transition-colors hover:border-[rgba(127,168,212,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7FA8D4]"
      style={
        selected
          ? { background: "rgba(127,168,212,0.07)", borderColor: "#7FA8D4" }
          : { background: "#131A2C", borderColor: "#2B3557" }
      }
    >
      {label}
    </button>
  );
}

function Question({
  id,
  brow,
  question,
  help,
  children,
}: {
  id: string;
  brow: string;
  question: string;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <p className={BROW}>{brow}</p>
        <p id={id} className="font-Satoshi text-[16px] font-medium leading-6 text-[#EDEDF2]">
          {question}
        </p>
        {help && <p className="font-Satoshi text-[13px] leading-[1.4] text-[#9BA3B8]">{help}</p>}
      </div>
      {children}
    </div>
  );
}

function Choices({
  labelledBy,
  options,
  value,
  multi = false,
  onChange,
}: {
  labelledBy: string;
  options: string[];
  value: string[];
  multi?: boolean;
  onChange: (next: string[]) => void;
}) {
  const toggle = (option: string) => {
    if (multi) onChange(value.includes(option) ? value.filter((v) => v !== option) : [...value, option]);
    else onChange(value.includes(option) ? [] : [option]);
  };
  return (
    <div role={multi ? "group" : "radiogroup"} aria-labelledby={labelledBy} className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Pill key={option} label={option} multi={multi} selected={value.includes(option)} onClick={() => toggle(option)} />
      ))}
    </div>
  );
}

const Hairline = () => <div aria-hidden className="h-px w-full bg-[#2B3557]" />;

export default function BaselineForm() {
  // The opening, as in the beta's WelcomeIntro.
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("brain");
  // lift: px from the resting wordmark down to the centre. scale: its size
  // there, the size the stars gather into. instant: start at the end.
  const [start, setStart] = useState<{ lift: number; scale: number; instant: boolean } | null>(null);
  const skipped = useRef(false);

  const finish = useCallback(() => {
    skipped.current = true;
    setPhase("ready");
  }, []);

  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => {
      let reduced = false;
      try {
        reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      } catch {}
      if (reduced) {
        skipped.current = true;
        setStart({ lift: 0, scale: 1, instant: true });
        setPhase("ready");
        return;
      }
      const b = logoRef.current?.getBoundingClientRect();
      const centre = window.matchMedia(DESK_QUERY).matches
        ? Math.round((LOGO_W_DESK * LOGO_W_CENTRE) / LOGO_W)
        : LOGO_W_CENTRE;
      setStart({
        lift: b ? window.innerHeight / 2 - (b.top + b.height / 2) : 0,
        scale: centre / REST_W,
        instant: false,
      });
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!start || start.instant) return;
    const ids = [
      window.setTimeout(() => setPhase("logo"), T.logoIn),
      window.setTimeout(() => setPhase("risen"), T.rise),
      window.setTimeout(finish, T.line),
    ];
    return () => ids.forEach(clearTimeout);
  }, [start, finish]);

  useBrainCanvas(canvasRef, skipped);

  // The page holds still while the opening plays.
  const ready = phase === "ready";
  useEffect(() => {
    if (ready) return;
    const root = document.documentElement;
    const before = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = before;
    };
  }, [ready]);

  const at = (p: Phase) => ORDER.indexOf(phase) >= ORDER.indexOf(p);
  const shown = (delay = 0): React.CSSProperties => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "none" : "translateY(10px)",
    transition: start?.instant
      ? "none"
      : `opacity 720ms ease-out ${delay}ms, transform 840ms cubic-bezier(0.2,0.7,0.2,1) ${delay}ms`,
    pointerEvents: ready ? "auto" : "none",
  });
  const centred = start !== null && !at("risen");

  // The form.
  const [email, setEmail] = useState("");
  const [howOften, setHowOften] = useState<string[]>([]);
  const [whatYouTrade, setWhatYouTrade] = useState<string[]>([]);
  const [underPressure, setUnderPressure] = useState<string[]>([]);
  const [yourPlan, setYourPlan] = useState("");
  const [theJournal, setTheJournal] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  // A message about what is missing goes away as soon as something is given.
  const answered = (set: (next: string[]) => void) => (next: string[]) => {
    set(next);
    setError("");
  };

  // The invitation's link carries the email. Read it once, then take it
  // out of the address bar so it is not copied, shared or logged from here.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const url = new URL(window.location.href);
        const fromLink = url.searchParams.get("email");
        if (!fromLink) return;
        setEmail(fromLink);
        url.searchParams.delete("email");
        window.history.replaceState(null, "", url.pathname + url.search + url.hash);
      } catch {}
    });
    return () => cancelAnimationFrame(id);
  }, []);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    const mail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      setError("Enter the email address your invitation was sent to.");
      return;
    }
    const answers = [
      { name: "baseline_q1_how_often", value: howOften.join(", ") },
      { name: "baseline_q2_what_you_trade", value: whatYouTrade.join(", ") },
      { name: "baseline_q3_under_pressure", value: underPressure.join(", ") },
      { name: "baseline_q4_your_plan", value: yourPlan.trim() },
      { name: "baseline_q5_the_journal", value: theJournal.join(", ") },
    ].filter((a) => a.value);
    if (answers.length === 0) {
      setError("Answer at least one question before sending.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch(HUBSPOT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [{ name: "email", value: mail }, ...answers],
          // No tracking cookie is sent, so the answers attach to the contact
          // with this email and to no one else who used this browser.
          context: { pageUri: `${window.location.origin}/baseline`, pageName: "Ology first wave baseline" },
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setDone(true);
      window.scrollTo({ top: 0 });
    } catch (err) {
      console.error("Baseline form:", err);
      setError("Your answers did not send. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main
      className="relative isolate w-full flex-1"
      style={{ background: PAGE_BG, minHeight: "100dvh" }}
      onPointerDown={() => !ready && finish()}
    >
      <StarrySky />
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-10 h-full w-full" />

      <div className="relative mx-auto flex w-full flex-col items-center gap-6 px-4 pb-12 pt-8 md:gap-7 md:px-6 md:pb-24 md:pt-12">
        <div
          ref={logoRef}
          style={{
            opacity: start && at("logo") ? 1 : 0,
            transform: centred ? `translateY(${start.lift}px) scale(${start.scale})` : "none",
            transition: start?.instant ? "none" : "opacity 660ms ease-out, transform 780ms cubic-bezier(0.65,0,0.35,1)",
          }}
        >
          <Image src={ology} alt="Ology" width={REST_W} height={40} priority className="block h-auto w-[96px]" />
        </div>

        {done ? (
          <>
            <div className="flex w-full max-w-[520px] flex-col items-center gap-2 text-center" style={shown()}>
              <p className={BROW}>Answers received</p>
              <h1 className="font-Recoleta text-[28px] font-normal leading-[36px] text-[#EDEDF2] md:text-[34px] md:leading-[42px]">
                Thank you.
                <br />
                Your baseline is saved.
              </h1>
              <p className="font-Satoshi text-[14px] leading-[1.4] text-[#9BA3B8]">
                Your invite code arrives by email on the morning of November 30, before the market opens, with a link
                to create your account.
              </p>
            </div>

            <div
              className="flex w-full max-w-[520px] flex-col items-center gap-[14px] rounded-2xl border border-[#2B3557] bg-[#131A2C] p-5 text-center md:p-7"
              style={shown()}
            >
              <div className="flex flex-col items-center gap-2">
                <p className={BROW}>Before you sign up</p>
                <h2 className="font-Recoleta text-[24px] font-normal leading-[30px] text-[#EDEDF2]">
                  Have your birth details ready.
                </h2>
              </div>
              <p className="font-Satoshi text-[14px] leading-[1.4] text-[#EDEDF2]">
                Your birth date, birth time, and birthplace. Ology uses them to calculate your chart and resolve your
                archetype.
              </p>
              <Hairline />
              <p className="font-Satoshi text-[13px] leading-[1.4] text-[#9BA3B8]">
                If you don’t know your birth time, you can still sign up. Ology reads your chart at noon.
              </p>
            </div>

            <div className="flex flex-col items-center gap-0.5 text-center" style={shown()}>
              <p className="font-Recoleta text-[19px] leading-7 text-[#EDEDF2]">Christina Ervin</p>
              <p className="font-Satoshi text-[13px] leading-[1.4] text-[#9BA3B8]">Founder, Ology</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex w-full max-w-[560px] flex-col items-center gap-2 text-center" style={shown()}>
              <p className={BROW}>Secure your access to the beta</p>
              <h1 className="font-Recoleta text-[28px] font-normal leading-[36px] text-[#EDEDF2] md:text-[34px] md:leading-[42px]">
                Your trading routine,
                <br />
                in your own words.
              </h1>
              {/* The phone frame keeps the two lines of context; the desktop frame does not. */}
              <p className="font-Satoshi text-[14px] leading-[1.4] text-[#9BA3B8] md:hidden">
                Five short questions, about two minutes. Your answers are saved before you see your trader archetype on
                November 30, so you can compare the two later.
              </p>
              <p className="font-Satoshi text-[14px] font-medium leading-[1.4] text-[#EDEDF2]">
                Please answer by Friday, November 27.
              </p>
            </div>

            <form
              onSubmit={send}
              noValidate
              className="flex w-full max-w-[640px] flex-col gap-[26px] rounded-2xl border border-[#2B3557] bg-[#131A2C] p-5 md:gap-7 md:p-7"
              style={shown(240)}
            >
              <label className="flex flex-col gap-1.5 rounded-xl border border-[#2B3557] bg-[#0F1526] px-4 py-3 transition-colors focus-within:border-[#7FA8D4] md:items-center">
                <span className={BROW}>Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@example.com"
                  className="w-full bg-transparent font-Satoshi text-[16px] leading-6 text-[#EDEDF2] outline-none placeholder:text-[#7A849A] md:text-center"
                />
              </label>

              <Hairline />

              <Question id="baseline-q1" brow="01 · How often" question="How often do you buy or sell with your own money?">
                <Choices labelledBy="baseline-q1" options={HOW_OFTEN} value={howOften} onChange={answered(setHowOften)} />
              </Question>

              <Question id="baseline-q2" brow="02 · What you trade · Choose any" question="What do you trade or invest in?">
                <Choices labelledBy="baseline-q2" options={WHAT_YOU_TRADE} value={whatYouTrade} multi onChange={answered(setWhatYouTrade)} />
              </Question>

              <Question
                id="baseline-q3"
                brow="03 · Under pressure"
                question="When a position moves against you, what do you usually do first?"
              >
                <Choices labelledBy="baseline-q3" options={UNDER_PRESSURE} value={underPressure} onChange={answered(setUnderPressure)} />
              </Question>

              <Question
                id="baseline-q4"
                brow="04 · Your plan"
                question="What tends to pull you away from your trading plan?"
                help="A sentence is enough. If you don’t trade from a plan, say so."
              >
                <textarea
                  aria-labelledby="baseline-q4"
                  name="your-plan"
                  value={yourPlan}
                  onChange={(e) => {
                    setYourPlan(e.target.value);
                    setError("");
                  }}
                  maxLength={600}
                  placeholder="In your own words"
                  className="min-h-[84px] w-full resize-y rounded-xl border border-[#2B3557] bg-[#0F1526] p-[14px] font-Satoshi text-[16px] leading-[1.4] text-[#EDEDF2] outline-none transition-colors placeholder:text-[#7A849A] focus:border-[#7FA8D4] md:p-4 md:text-[14px]"
                />
              </Question>

              <Question
                id="baseline-q5"
                brow="05 · The journal"
                question="Could you log three short journal entries a week for your first four weeks?"
                help="Each one takes about a minute. The record is what makes your patterns visible."
              >
                <Choices labelledBy="baseline-q5" options={THE_JOURNAL} value={theJournal} onChange={answered(setTheJournal)} />
              </Question>

              <Hairline />

              <div className="flex flex-col items-center gap-3">
                {error && (
                  <p role="alert" className="font-Satoshi text-[13px] leading-[1.4] text-[#D66B7E]">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="flex h-12 w-full cursor-pointer items-center justify-center rounded-full bg-[#7FA8D4] font-Satoshi text-[13px] font-medium leading-5 text-[#0D1220] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7FA8D4] disabled:cursor-default disabled:opacity-60"
                >
                  {sending ? "Sending" : "Send my answers"}
                </button>
                <p className="text-center font-Satoshi text-[12px] leading-[1.4] text-[#7A849A]">
                  Your invite code arrives by email on November 30, before the market opens.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
