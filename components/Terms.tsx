"use client";
import React from "react";
import Footer from "./Footer";
import SiteHeader from "./SiteHeader";
const terms = [
  {
    title: "The one that matters most",
    content:
      "Ology is not an investment adviser, broker, or financial planner, and nothing in the service is financial, investment, tax, or legal advice. Ology provides behavioral self-knowledge and timing context for informational and educational purposes. We make no forecasts, no price predictions, and no trade recommendations, and nothing in the service should be read as one. Every trading and investment decision you make is yours alone, made at your own risk, and you should consult a licensed professional for advice specific to your situation. Markets involve risk, including the loss of principal, and past patterns, celestial or otherwise, do not determine future outcomes.",
  },

  {
    title: "What Ology is",
    content:
      "Ology generates a behavioral timing profile from your natal chart and a questionnaire, provides a calendar of celestial and market context, offers a journal for your own record, and includes Ology Intelligence (OI), an AI layer that reflects your profile and record back to you. The interpretive framework draws on the astrological tradition. It is a lens for self-understanding, not a scientific instrument, and we do not claim natal astrology has predictive validity for individual outcomes. Our own materials say the same thing.",
  },

  {
    title: "Your account",
    content:
      "You must be at least 18 to use Ology. You are responsible for the accuracy of the information you provide, for keeping your credentials secure, and for activity under your account. One account per person. We may suspend or close accounts that violate these terms, abuse the service, or attempt to misuse OI or the engine.",
  },

  {
    title: "Your content",
    content:
      "Your journal entries, OI conversations, and profile inputs remain yours. You grant us the limited license needed to operate the service, store your content, display it back to you, and use it in aggregated, de-identified form to improve the product, as described in the Privacy Policy. We claim no other rights to it.",
  },

  {
    title: "Our content",
    content:
      "The Ology name, marks, engine, archetype framework, copy, and design are the property of Ology Intelligence, Inc. You may not copy, scrape, resell, reverse engineer, or build competing services from them. Your archetype card is yours to share anywhere, that is what it is for.",
  },

  {
    title: "Ology Intelligence (OI)",
    content:
      "Ology Intelligence (OI) is an AI system. It is designed and constrained never to give trade recommendations or predictions, and it can still be wrong, incomplete, or misread your situation. Do not treat its output as advice of any kind. If OI ever appears to recommend a trade or predict a market, that is a malfunction of the product, not a feature of it, and we ask you to report it to hello@ologyapp.com.",
  },

  {
    title: "Market data",
    content:
      "Market data in the service comes from third-party providers, may be delayed, and is provided as-is. Do not rely on it for time-sensitive trading decisions.",
  },

  {
    title: "Beta terms",
    content:
      "During beta, the service is provided free and as-is, features may change or break, data may be reset with notice, and access may be granted, staged, or withdrawn at our discretion. Beta access is a preview, not a promise of future terms or pricing.",
  },

  {
    title: "Disclaimers and limits",
    content:
      "The service is provided as-is and as-available, without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. To the maximum extent permitted by law, Ology Intelligence, Inc. is not liable for indirect, incidental, special, consequential, or punitive damages, or for trading or investment losses of any kind, and our total liability for any claim is limited to the greater of one hundred dollars or the amount you paid us in the twelve months before the claim. Some jurisdictions do not allow certain limits, so parts of this section may not apply to you.",
  },

  {
    title: "Indemnity",
    content:
      "You agree to indemnify Ology Intelligence, Inc. against claims arising from your violation of these terms or your misuse of the service.",
  },

  {
    title: "Termination",
    content:
      "You can close your account at any time, and deletion of your data follows the Privacy Policy. We can suspend or terminate access for violations of these terms, with notice where practicable.",
  },

  {
    title: "Changes",
    content:
      "If these terms change materially, we will notify you by email or in the app before the change takes effect, and continued use after the effective date is acceptance.",
  },

  {
    title: "Governing law and disputes",
    content:
      "These terms are governed by the laws of the State of Tennessee, without regard to conflict of law rules, and disputes will be resolved in the state or federal courts of Hamilton County, Tennessee.",
  },

  {
    title: "Contact",
    content:
      "Ology Intelligence, Inc., Chattanooga, Tennessee. Privacy requests and questions to hello@ologyapp.com.",
  },
];

function Terms() {

  // inside your component
  return (
    <div className="relative flex w-full flex-col items-center">
      <SiteHeader />
      <main className="site-container relative flex flex-col pt-32 md:pt-40">
        <div className="flex flex-col gap-16 lg:gap-20 mb-[101px]">
          <div className="flex flex-col items-start lg:items-center gap-10 lg:gap-12.5">
            <h1 className="t-h2 text-start lg:text-center">
              Terms of Service
            </h1>
            <h4 className="text-[#F8F7FC] text-start lg:text-center font-Satoshi text-[14px] lg:text-[18px] font-normal leading-[150%]">
              These terms are the agreement between you and Ology Intelligence,
              Inc. when you use the Ology website, app, and services. By
              creating an account or joining the waitlist, you accept them. They
              are written to be understood, because a term you did not
              understand is a term we should not enforce.
            </h4>
            <p className="text-[#F8F7FC] text-center font-Satoshi text-[12px] lg:text-[18px] font-normal leading-[150%]">
              Effective July 2026
            </p>
          </div>

          <div className="flex flex-col">
            {terms.map((section: any, index) => (
              <div key={section.title}>
                <div className="flex flex-col gap-[30px]">
                  <h3 className="text-[#F8F7FC] font-Recoleta text-[20px] lg:text-[24px] font-normal leading-[22px]">
                    {section.title}
                  </h3>

                  {Array.isArray(section.content) ? (
                    <ul className="flex flex-col gap-[16px]list-disc list-outside">
                      {section.content.map((item: any, i: any) => (
                        <li
                          key={i}
                          className="text-[#F8F7FC] font-Satoshi text-[14px] lg:text-[18px] font-normal leading-[150%]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[#F8F7FC] font-Satoshi text-[14px] lg:text-[18px] font-normal leading-[150%]">
                      {section.content}
                    </p>
                  )}

                  {[
                    section.subcontent1,
                    section.subcontent2,
                    section.subcontent3,
                  ]
                    .filter(Boolean)
                    .map((sub, i) => (
                      <p
                        key={i}
                        className="text-[#F8F7FC] font-Satoshi text-[14px] lg:text-[18px] font-normal leading-[150%]"
                      >
                        {sub}
                      </p>
                    ))}
                </div>

                {index !== terms.length - 1 && (
                  <div className="w-full h-px bg-[#7478895c] my-[40px]" />
                )}
              </div>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

export default Terms;
