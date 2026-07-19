"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Minus, Plus } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQ[];
}

export const faqsList = [
  {
    id: "faq-1",
    question: "What is an investor timing profile?",
    answer:
      "A behavioral profile drawn from your natal chart and refined by a short questionnaire. It describes how you tend to handle risk, pressure, conviction, and time, and it becomes the lens the rest of Ology reads the market through.",
  },
  {
    id: "faq-2",
    question: "Does Ology predict the market?",
    answer:
      "No. Ology makes no forecasts and no price calls. It maps timing windows, shows what happened in windows like them before, and keeps score alongside your own record. Pattern over prediction.",
  },
  {
    id: "faq-3",
    question: "Is Ology financial advice?",
    answer:
      "No. Ology is not an investment adviser and never recommends trades. It brings context to your decisions and leaves the decisions with you.",
  },
  {
    id: "faq-4",
    question: "What do I need to get my profile?",
    answer:
      "A birth date, time, and place. Birth data is treated as sensitive personal information, encrypted, never shared, and never sold. If you don't know your birth time, simply select 'Unknown'—the engine is designed to handle it.",
  },
  {
    id: "faq-5",
    question: "When does the beta open?",
    answer:
      "Ology beta opens in waves throughout the second half of 2026. Members on the waitlist receive invitations first, with earlier sign-ups getting priority access.",
  },
];

export default function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="flex w-full flex-col gap-5">
      {faqsList.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="
            overflow-hidden
            rounded-[18px]
            border border-white/10
            bg-[rgba(30,37,64,0.35)]
            backdrop-blur-md
            transition-all
            duration-300
            hover:border-white/20
            hover:bg-[rgba(30,37,64,0.42)]
        "
        >
          <AccordionTrigger className="group lg:pt-[25px] lg:pb-[27px] pt-[19px] pb-[19px]  pl-[28px] pr-[33px] hover:no-underline [&>svg]:hidden">
            <div className="flex w-full items-start justify-between gap-8">
              <h3 className="text-left font-Recoleta text-[15px] lg:text-[22.57px] leading-[130%] text-white">
                {item.question}
              </h3>

              <div
                className="
                  flex shrink-0 items-center justify-center
                 
                 
                  transition-all
                  duration-300
              
                "
              >
                <Plus className="h-5 w-5 text-white group-data-[state=open]:hidden cursor-pointer" />

                <Minus className="hidden h-5 w-5 text-white group-data-[state=open]:block cursor-pointer" />
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-7 pb-7">
            <p className="max-w-3xl font-Satoshi text-[18px] leading-8 text-[#F8F7FC]">
              {item.answer}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
