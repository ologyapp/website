"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Minus, Plus } from "lucide-react";
import { faqsList } from "@/lib/faqs";

export { faqsList };

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQ[];
}



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
          <AccordionTrigger className="group lg:pt-[25px] lg:pb-[27px] pt-[19px] pb-[19px] pl-[24px] pr-[28px] lg:pl-[28px] lg:pr-[33px] hover:no-underline [&>svg]:hidden">
            <div className="flex w-full items-start justify-between gap-8">
              <h3 className="text-left font-Recoleta text-[14px] lg:text-[22.57px] leading-[130%] text-white">
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

          <AccordionContent className="lg:px-7 lg:pb-7 pl-[24px] pr-[28px]">
            <p className="max-w-3xl font-Satoshi text-[11px] lg:text-[18px] lg:leading-8 leading-[18px] tracking-[-0.22px] lg:tracking-normal text-[#F8F7FC]">
              {item.answer}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
