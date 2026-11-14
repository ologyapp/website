import { SITE_LIVE } from "@/lib/site";

// One list for the page and for search metadata (StructuredData).
export const faqsList = [
  {
    id: "faq-1",
    question: "What is a timing profile?",
    answer:
      "It starts with your archetype, one of fifteen, read from your birth chart. Your Trade DNA then describes how you tend to handle risk, pressure, conviction, discipline, and time horizon. Ology reads the market through that profile.",
  },
  {
    id: "faq-2",
    question: "Does Ology tell me what to buy or sell?",
    answer:
      "No. Ology makes no price calls and names no trades. It describes the timing climate, the market context, and your own record, and leaves every decision with you.",
  },
  {
    id: "faq-3",
    question: "Is Ology financial advice?",
    answer:
      "No. Ology Intelligence, Inc. is not an investment adviser, and nothing in Ology is financial advice.",
  },
  {
    id: "faq-4",
    question: "What do I need to get my profile?",
    answer:
      "Your birth date, time, and place. If you don't know your birth time, choose unknown and Ology still reads your archetype. Birth data is handled as sensitive personal information under our Privacy Policy.",
  },
  {
    id: "faq-5",
    question: "How do I get in?",
    answer: SITE_LIVE
      ? "The beta is open by invitation, in small waves. Apply on this page and we write to you when your invitation is ready. If you have an invitation, sign in at beta.ologyapp.com."
      : "Apply on this page. The beta opens in small waves, a first batch of 25 and then a full wave of 150. We write to you when your invitation is ready.",
  },
];
