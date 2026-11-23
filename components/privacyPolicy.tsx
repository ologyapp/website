"use client";
import React from "react";
import Footer from "./Footer";
import SiteHeader from "./SiteHeader";

const policy = [
  {
    title: "The short version",
    content:
      "We collect what the product needs and nothing else. Your birth data is treated as sensitive personal information, encrypted, never shared, and never sold. We do not sell any personal data, we do not run ads, and we are not in the data business. We are in the self-knowledge business, and that only works if your information stays yours.",
  },

  {
    title: "What we collect",
    content: [
      "Waitlist and account information. Your name and email address when you join the waitlist or create an account, and a password when accounts open.",
      "Birth data. Your birth date, birth time, and birth place, provided by you to generate your timing profile. If your birth time is unknown, we record that instead. Birth data is the most sensitive thing you give us and it is handled under the strictest rules in this policy.",
      "Profile results. The archetype and behavioral profile our engine derives from your birth data, stored so your profile does not need to be recomputed.",
      "Journal entries. Trades, notes, and reflections you choose to log. Your journal exists for you. We read it in aggregate to improve the product, never to profile you individually for any purpose outside the product.",
      "OI conversations. Messages you exchange with Ology Intelligence (OI), retained to provide the service and reviewed in limited form for safety and quality of OI's guardrails.",
      "Usage information. Standard technical data such as device type, app version, and interaction events, used to keep the product working and improve it.",
    ],
  },

  {
    title: "What we do with it",
    content:
      "We use your information to run the product. Generating your profile, showing your calendar and market context, keeping your journal, powering OI, and sending the emails you signed up for. We use aggregated, de-identified information to understand how the product performs and to improve the engine. Aggregated means your individual data is not identifiable in it.",
  },

  {
    title: "What we never do",
    content:
      "We never sell personal data. We never share your birth data with anyone. We never use your journal or OI conversations for advertising. We never make your individual information available to data brokers, advertisers, or market participants. There are no advertisements in Ology.",
  },

  {
    title: "Who touches your data",
    content:
      "A small set of service providers process data on our behalf, under contracts that limit their use of it to providing their service to us. Our email and waitlist platform processes names and emails. Our hosting providers process data as part of running the application. Our AI service provider processes OI conversations to generate responses. Market data vendors provide us market information and receive nothing about you. We do not permit any provider to use your personal data for their own purposes.",
    subcontent1:
      "We will disclose information if the law genuinely requires it, and if that ever happens we will disclose the minimum required.",
  },

  {
    title: "How we protect it",
    content:
      "Data is encrypted in transit and at rest. Birth data is stored encrypted and access to it is restricted to what the engine needs to run. We limit internal access to personal data to the people who need it to operate the product, which today is a team you can count on one hand.",
  },

  {
    title: "Cookies and tracking",
    content:
      "The website uses cookies and similar technologies. Our email and waitlist platform sets cookies so the signup form works and so the emails you asked for fire at the right moments. We use basic analytics to understand how the site performs. We do not use advertising cookies and we do not participate in ad networks.",
    subcontent1:
      "When you share your archetype card, your share link carries an identifier so that signups arriving through it credit you in the beta line. That attribution is used to order beta access and to measure how sharing performs in aggregate. It is never sold, and it is not used to profile you beyond your own referral count.",
    subcontent2:
      "Some browsers send Do Not Track signals. There is no accepted standard for honoring them, so we do not respond to them, but since we run no advertising trackers, there is little for the signal to switch off.",
  },

  {
    title: "Where data is processed",
    content:
      "We are a United States company and data is processed in the United States by us and the providers named above. If you use Ology from outside the United States, your information will be transferred to and processed in the United States.",
  },

  {
    title: "Your choices and rights",
    content:
      "You can request a copy of your data, correct it, or delete your account and the data with it, by contacting us at the address below. Deleting your account deletes your birth data, profile, journal, and OI history from production systems, with removal from backups following on our backup cycle. You can unsubscribe from emails with one click at any time. Depending on where you live, you may have additional rights under your state or national privacy laws, and we will honor requests under them.",
  },

  {
    title: "Age",
    content:
      "Ology is for adults. The product is not directed to anyone under 18, and we do not knowingly collect personal information from anyone under 18. If we learn we have, we will delete it.",
  },

  {
    title: "Retention",
    content:
      "We keep your information while your account is active and for a limited period afterward as required for legal and operational purposes, then delete it. Waitlist information for people who never open an account is retained only as long as the waitlist program runs.",
  },

  {
    title: "Changes",
    content:
      "If this policy changes in a way that matters, we will tell you by email or in the app before the change takes effect, and the current version will always live at this page with its effective date.",
  },

  {
    title: "Contact",
    content:
      "Ology Intelligence, Inc., Chattanooga, Tennessee. Privacy requests and questions to hello@ologyapp.com.",
  },
];

function privacyPolicy() {
  return (
    <div className="relative flex w-full flex-col items-center">
      <SiteHeader />
      <main className="site-container relative flex flex-col pt-32 md:pt-40">
        <div className="flex flex-col gap-16 lg:gap-20 mb-[101px]">
          <div className="flex flex-col items-start lg:items-center gap-10 lg:gap-12.5">
            <h1 className="t-h2 text-start lg:text-center">
              Privacy Policy
            </h1>
            <h4 className="text-[#F8F7FC] text-start lg:text-center font-Satoshi text-[14px] lg:text-[18px] font-normal leading-[150%]">
              Ology Intelligence, Inc. operates the Ology website and app. This
              policy explains what we collect, why we collect it, and what we
              will never do with it.
            </h4>
            <p className="text-[#F8F7FC] text-center font-Satoshi text-[12px] lg:text-[18px] font-normal leading-[150%]">
              Effective July 2026{" "}
            </p>
          </div>

          <div className="flex flex-col gap-[30px]">
            {policy.map((section: any, index) => (
              <div key={section.title}>
                <div className="flex flex-col gap-[30px] mb-[20px]">
                  <h3 className="text-[#F8F7FC] font-Recoleta text-[20px] lg:text-[24px] font-normal leading-[22px]">
                    {section.title}
                  </h3>

                  {Array.isArray(section.content) ? (
                    <ul className="flex flex-col gap-[16px] list-disc list-outside ml-5">
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

                {index !== policy.length - 1 && (
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

export default privacyPolicy;
