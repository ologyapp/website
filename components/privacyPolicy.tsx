"use client";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import Footer from "./Footer";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  return (
    <div className="relative flex flex-col items-center  w-full! p-[40px] ">
      <main className="relative max-w-360 flex flex-col items-center mt-[116px]">
        <div
          className="
                        fixed
                        top-0
                     
                        z-9999
                        w-full
                        max-w-360
                        lg:max-w-245.5
                        xl:max-w-360
                        px-5
                        md:px-10
                        py-6
                        md:py-10
                      "
        >
          <header
            className="
                      flex
                      items-center
                      justify-between
                      // h-[65.771px]
                      p-5
                      rounded-[20px]
                      border
                      border-[#7478895c]
                      bg-[#1e2540]/5
                      backdrop-blur-xl
                      z-30!
                    "
          >
            <div className="flex w-full items-center justify-between p-4 md:px-4 z-50!">
              <a href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="29"
                  viewBox="0 0 101 42"
                  fill="none"
                >
                  <path
                    d="M11.7222 31.8191C5.10567 31.8191 0.861077 26.7657 0.861077 21.0858C0.861077 15.2806 5.27213 10.9372 10.9732 10.9372C17.2153 10.9372 21.5431 15.6983 21.5431 21.5452C21.5431 27.3086 17.5898 31.8191 11.7222 31.8191ZM12.2216 30.4409C15.4675 30.4409 17.8811 27.4757 17.8811 22.7981C17.8811 16.9512 14.8017 12.3154 10.5571 12.3154C7.0199 12.3154 4.56469 15.2389 4.56469 19.9164C4.56469 25.2622 7.64411 30.4409 12.2216 30.4409Z"
                    fill="#F8F7FC"
                  />
                  <path
                    d="M25.3894 31.4015C24.89 31.4015 24.5987 31.1927 24.5987 30.8585V30.7332C24.5987 29.898 26.0552 29.9397 26.0552 28.478V5.00671C26.0552 3.37792 24.5987 3.12733 24.5987 2.50088V2.41735C24.5987 2.08324 24.8068 1.95795 25.1813 1.74913L28.4272 0.162101C29.2595 -0.255537 29.7172 0.203864 29.7172 0.746795V28.478C29.7172 29.9397 31.3402 29.898 31.3402 30.7332V30.8585C31.3402 31.1927 31.0073 31.4015 30.5079 31.4015H25.3894Z"
                    fill="#F8F7FC"
                  />
                  <path
                    d="M45.0863 31.8191C38.4698 31.8191 34.2252 26.7657 34.2252 21.0858C34.2252 15.2806 38.6362 10.9372 44.3373 10.9372C50.5793 10.9372 54.9072 15.6983 54.9072 21.5452C54.9072 27.3086 50.9539 31.8191 45.0863 31.8191ZM45.5857 30.4409C48.8316 30.4409 51.2452 27.4757 51.2452 22.7981C51.2452 16.9512 48.1657 12.3154 43.9211 12.3154C40.384 12.3154 37.9288 15.2389 37.9288 19.9164C37.9288 25.2622 41.0082 30.4409 45.5857 30.4409Z"
                    fill="#F8F7FC"
                  />
                  <path
                    d="M75.6903 11.3548C77.1051 11.3548 77.3548 11.9813 76.8554 12.3989C76.1064 13.1924 74.6915 13.0254 73.4431 13.3595C75.2325 14.6959 76.3561 16.9929 76.3561 19.1229C76.3561 22.5893 74.4418 25.3039 71.3624 26.6404C74.9828 27.4339 76.7722 29.4386 76.7722 31.9026C76.7722 35.7867 72.7357 38.1672 67.1178 38.1672C60.7093 38.1672 57.6299 34.492 57.6299 31.8191C57.6299 30.9838 58.0877 30.2321 59.1696 30.2321C61.7497 30.2321 60.418 36.789 67.3675 36.8308C70.7798 36.8308 73.0686 34.9514 73.0686 32.1532C73.0686 29.4803 71.2792 27.6427 68.4495 27.3921C67.9085 27.4339 67.4091 27.4757 66.8682 27.4757C61.8745 27.4757 57.9628 23.884 57.9628 19.3735C57.9628 14.4871 61.6248 10.9372 67.1595 10.9372C69.9892 10.9372 70.4469 11.3548 75.6903 11.3548ZM67.534 26.0975C70.7382 26.0975 72.7357 23.6334 72.7357 20.4176C72.7357 16.0741 70.1973 12.2736 66.4936 12.2736C63.4975 12.2736 61.5832 14.6959 61.5832 17.87C61.5832 22.3387 64.1633 26.0975 67.534 26.0975Z"
                    fill="#F8F7FC"
                  />
                  <path
                    d="M99.6682 11.3548C100.001 11.3548 100.251 11.5219 100.251 11.856V11.9813C100.251 12.8166 99.1688 12.7748 98.3782 14.5706L90.5132 31.9862C88.8902 35.6614 86.976 40.2554 82.8979 40.2554C79.7768 40.2554 77.7794 38.1672 77.7794 36.5384C77.7794 35.5779 78.362 34.8679 79.3607 34.8679C81.5246 34.8679 80.942 38.7937 83.5221 38.7937C85.3115 38.7937 87.1425 35.8702 88.5989 32.195L80.6091 14.5289C79.7768 12.7748 78.6117 12.8166 78.6117 11.9813V11.856C78.6117 11.5219 78.903 11.3548 79.2359 11.3548H84.6456C84.9786 11.3548 85.2282 11.5636 85.2282 11.856V11.9813C85.2282 12.8166 83.7301 12.7748 84.5208 14.5706L90.5132 28.7286L96.4639 14.9047C97.3794 12.7748 94.8826 12.8166 94.8826 11.9813V11.856C94.8826 11.5636 95.1323 11.3548 95.5068 11.3548H99.6682Z"
                    fill="#F8F7FC"
                  />
                  <path
                    d="M0.561072 3.32952C1.00238 3.11301 1.68422 3.41914 2.555 4.19479C3.42288 4.96786 4.46474 6.19547 5.61282 7.78602C7.90849 10.9664 10.6218 15.5881 13.2076 20.897C15.7935 26.2058 17.7606 31.1935 18.8512 34.9652C19.3966 36.8514 19.7219 38.4306 19.7966 39.5928C19.8716 40.7588 19.6935 41.4869 19.2522 41.7034C18.8109 41.9199 18.1291 41.6138 17.2583 40.8381C16.5294 40.1889 15.6778 39.219 14.7437 37.9828C14.5655 37.7471 14.3844 37.5017 14.2005 37.2469C13.0991 35.7211 11.9016 33.8634 10.6682 31.7574H11.1022C12.7004 34.4075 14.212 36.5595 15.4708 37.9828C16.7419 39.4202 17.755 40.1144 18.3388 39.828C19.9961 39.0149 17.5644 30.6051 12.9075 21.0442C8.25062 11.4833 3.13192 4.39186 1.47455 5.2049C0.856291 5.50823 0.807049 6.86873 1.23008 8.95175C1.57502 10.6502 2.23391 12.829 3.15435 15.3067L3.14183 15.2823L2.90079 15.6936L2.89557 15.6938C2.09517 13.6329 1.44325 11.7319 0.962055 10.0677C0.850705 9.68261 0.748507 9.31032 0.655766 8.95175C0.294271 7.55407 0.0761169 6.36506 0.0166312 5.44015C-0.0583611 4.27408 0.119764 3.54603 0.561072 3.32952Z"
                    fill="#F8F7FC"
                  />
                </svg>
              </a>

              <nav className="hidden md:block">
                <ul className="flex items-around gap-[65px]">
                  {[
                    { label: "Align", id: "align" },
                    { label: "Perform", id: "perform" },
                    { label: "Decode", id: "decode" },
                    { label: "Ask", id: "ask" },
                  ].map((item) => (
                    <li
                      key={item.id}
                      onClick={() =>
                        document.getElementById(item.id)?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        })
                      }
                      className={`
                                  cursor-pointer
                                  text-[17px]
                                  font-Satoshi
                                  font-normal
                                  leading-[150%]
                                  uppercase
                                  transition-colors duration-300
                                  ${
                                    activeSection === item.id
                                      ? "text-[#F8F7FC]"
                                      : "text-[#F8F7FC]/60 hover:text-[#F8F7FC]"
                                  }
                                `}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-[#F8F7FC] cursor-pointer"
                >
                  {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>

              {mobileMenuOpen && (
                <div
                  className="
                              absolute
                              top-full
                              left-0
                              mt-4
                              w-full
                              rounded-[16.912px]
                              border
                              border-[#7478895c]
                              bg-[#1e2540]/90
                              backdrop-blur-xl
                              p-6
                              md:hidden
                              z-50! 
                            "
                >
                  <ul className="flex flex-col gap-6 z-50!">
                    {[
                      { label: "Align", id: "align" },
                      { label: "Perform", id: "perform" },
                      { label: "Decode", id: "decode" },
                      { label: "Ask", id: "ask" },
                    ].map((item) => (
                      <li
                        key={item.id}
                        onClick={(item: any) => {
                          document.getElementById(item.id)?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });

                          setMobileMenuOpen(false);
                        }}
                        className="
                                cursor-pointer
                                text-[#F8F7FC]/80
                                text-[18px]
                                font-Satoshi
                                uppercase
                                hover:text-[#F8F7FC]
                                transition
                              "
                      >
                        {item?.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </header>
        </div>

        <div className="flex flex-col px-12.5 gap-[101px] mb-[101px]">
          <div className="flex flex-col items-center gap-12.5">
            <h1 className="text-[#F8F7FC] text-center font-Recoleta text-[60px] font-normal leading-[120%]">
              Privacy Policy
            </h1>
            <h4 className="text-[#F8F7FC] text-center font-Satoshi text-[18px] font-normal leading-[150%]">
              Ology Intelligence, Inc. operates the Ology website and app. This
              policy explains what we collect, why we collect it, and what we
              will never do with it.
            </h4>
            <p className="text-[#F8F7FC] text-center font-Satoshi text-[18px] font-normal leading-[150%]">
              Effective July 2026{" "}
            </p>
          </div>

          <div className="flex flex-col gap-[30px]">
            {policy.map((section: any, index) => (
              <div key={section.title}>
                <div className="flex flex-col gap-[30px] mb-[20px]">
                  <h3 className="text-[#F8F7FC] font-Recoleta text-[28px] font-normal leading-[22px]">
                    {section.title}
                  </h3>

                  {Array.isArray(section.content) ? (
                    <ul className="flex flex-col gap-[16px] list-disc list-outside ml-5">
                      {section.content.map((item: any, i: any) => (
                        <li
                          key={i}
                          className="text-[#F8F7FC] font-Satoshi text-[18px] font-normal leading-[150%]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[#F8F7FC] font-Satoshi text-[18px] font-normal leading-[150%]">
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
                        className="text-[#F8F7FC] font-Satoshi text-[18px] font-normal leading-[150%]"
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

        <Footer />
      </main>
    </div>
  );
}

export default privacyPolicy;
