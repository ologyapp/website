"use client";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";

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
            <h1 className="text-[#F8F7FC] text-center font-Recoleta text-[65px] font-normal leading-[120%]">
              Terms of Service
            </h1>
            <h4 className="text-[#F8F7FC] text-center font-Satoshi text-[22px] font-medium leading-[150%]">
              These terms are the agreement between you and Ology Intelligence,
              Inc. when you use the Ology website, app, and services. By
              creating an account or joining the waitlist, you accept them. They
              are written to be understood, because a term you did not
              understand is a term we should not enforce.
            </h4>
            <p className="text-[#F8F7FC] text-center font-Satoshi text-[22px] font-medium leading-[150%]">
              Effective July 2026
            </p>
          </div>

          <div className="flex flex-col">
            {terms.map((section: any, index) => (
              <div key={section.title}>
                <div className="flex flex-col gap-[30px]">
                  <h3 className="text-[#F8F7FC] font-Recoleta text-[28px] font-medium leading-[22px]">
                    {section.title}
                  </h3>

                  {Array.isArray(section.content) ? (
                    <ul className="flex flex-col gap-[16px]list-disc list-inside">
                      {section.content.map((item: any, i: any) => (
                        <li
                          key={i}
                          className="text-[#F8F7FC] font-Satoshi text-[22px] font-medium leading-[150%]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[#F8F7FC] font-Satoshi text-[22px] font-medium leading-[150%]">
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
                        className="text-[#F8F7FC] font-Satoshi text-[22px] font-medium leading-[150%]"
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

        <footer
          className="
    w-full
    flex
    flex-col
    items-start
    gap-[30px]
    pt-[28px]
    pb-[10px]
    px-[80px]
    z-50!
  "
        >
          <div className="w-full flex justify-between items-center">
            <a href="#hero">
              <div className="flex justify-start items-center gap-5">
                <svg
                  width="20"
                  height="34"
                  viewBox="0 0 20 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.3496 25.2133C4.50781 25.2133 0.760247 20.7516 0.760247 15.7369C0.760247 10.6115 4.65477 6.77663 9.68826 6.77663C15.1994 6.77663 19.0204 10.9802 19.0204 16.1425C19.0204 21.231 15.53 25.2133 10.3496 25.2133ZM10.7905 23.9965C13.6563 23.9965 15.7872 21.3785 15.7872 17.2487C15.7872 12.0864 13.0684 7.99345 9.32085 7.99345C6.19788 7.99345 4.03018 10.5746 4.03018 14.7044C4.03018 19.4242 6.74899 23.9965 10.7905 23.9965Z"
                    fill="#F8F7FC"
                  />
                  <path
                    d="M0.495371 0.0598119C0.885003 -0.131338 1.487 0.138943 2.25581 0.823759C3.02207 1.50631 3.94193 2.59017 4.95557 3.99447C6.98242 6.80247 9.37798 10.8829 11.661 15.5701C13.9441 20.2573 15.6809 24.661 16.6438 27.991C17.1253 29.6564 17.4125 31.0506 17.4785 32.0767C17.5447 33.1062 17.3875 33.749 16.9978 33.9402C16.6082 34.1313 16.0062 33.861 15.2374 33.1762C14.5939 32.603 13.842 31.7467 13.0172 30.6553C12.8599 30.4471 12.7 30.2304 12.5376 30.0055C11.5652 28.6584 10.508 27.0183 9.41899 25.1588H9.80213C11.2132 27.4986 12.5478 29.3986 13.6592 30.6553C14.7814 31.9243 15.6759 32.5373 16.1913 32.2844C17.6546 31.5665 15.5077 24.1415 11.3961 15.7001C7.28449 7.25884 2.76518 0.997758 1.30188 1.71559C0.756021 1.9834 0.712545 3.18459 1.08604 5.02369C1.39058 6.52323 1.97232 8.44689 2.78498 10.6345L2.77393 10.613L2.56112 10.976L2.5565 10.9762C1.84983 9.1567 1.27425 7.47833 0.8494 6.00898C0.751089 5.66897 0.660858 5.34027 0.578977 5.02369C0.259813 3.78968 0.0672037 2.73989 0.0146837 1.92329C-0.0515271 0.893769 0.10574 0.250968 0.495371 0.0598119Z"
                    fill="#F8F7FC"
                  />
                </svg>

                <h4 className="text-[#F8F7FC] text-center font-Satoshi text-[16px] font-medium leading-[140%]">
                  Pattern over prediction.
                </h4>
              </div>
            </a>
            <div className="flex justify-start items-center gap-10 relative -left-10">
              <a href="/privacy-policy">
                <h5 className="text-[#F8F7FC] font-Satoshi text-[16px] font-normal leading-normal">
                  Privacy
                </h5>
              </a>
              <a href="/Terms-of-service">
                <h5 className="text-[#F8F7FC] font-Satoshi text-[16px] font-normal leading-normal">
                  Terms
                </h5>
              </a>

              <a
                href="mailto:hello@ologyapp.com?subject=Ology%20Inquiry"
                target="_blank"
              >
                <h5 className="text-[#F8F7FC] font-Satoshi text-[16px] font-normal leading-normal">
                  Contact
                </h5>
              </a>
            </div>

            <div className="flex justify-start items-center gap-[28px]">
              <a href="https://x.com/OlogyHQ" target="_blank">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.4323 1.81104H20.6412L13.6307 9.82363L21.878 20.727H15.4204L10.3626 14.1141L4.57527 20.727H1.36441L8.86288 12.1566L0.951172 1.81104H7.57271L12.1445 7.8554L17.4323 1.81104ZM16.306 18.8063H18.0841L6.60655 3.63084H4.69846L16.306 18.8063Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="https://www.instagram.com/ologyapp/" target="_blank">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_453_1182)">
                    <path
                      d="M11.4146 2.05553C14.4645 2.05553 14.8256 2.0689 16.0251 2.12241C17.1398 2.17146 17.7417 2.35873 18.143 2.51479C18.6736 2.71989 19.0571 2.96959 19.4539 3.36643C19.8552 3.76772 20.1005 4.14672 20.3056 4.67732C20.4616 5.07862 20.6489 5.68502 20.6979 6.79527C20.7514 7.99916 20.7648 8.36033 20.7648 11.4057C20.7648 14.4556 20.7514 14.8167 20.6979 16.0162C20.6489 17.1309 20.4616 17.7328 20.3056 18.1341C20.1005 18.6647 19.8508 19.0482 19.4539 19.445C19.0526 19.8463 18.6736 20.0915 18.143 20.2966C17.7417 20.4527 17.1353 20.64 16.0251 20.689C14.8212 20.7425 14.46 20.7559 11.4146 20.7559C8.36479 20.7559 8.00362 20.7425 6.80419 20.689C5.68948 20.64 5.08754 20.4527 4.68624 20.2966C4.15564 20.0915 3.77218 19.8418 3.37534 19.445C2.97405 19.0437 2.72881 18.6647 2.5237 18.1341C2.36764 17.7328 2.18037 17.1264 2.13133 16.0162C2.07782 14.8123 2.06444 14.4511 2.06444 11.4057C2.06444 8.35587 2.07782 7.9947 2.13133 6.79527C2.18037 5.68056 2.36764 5.07862 2.5237 4.67732C2.72881 4.14672 2.97851 3.76326 3.37534 3.36643C3.77664 2.96513 4.15564 2.71989 4.68624 2.51479C5.08754 2.35873 5.69394 2.17146 6.80419 2.12241C8.00362 2.0689 8.36479 2.05553 11.4146 2.05553ZM11.4146 0C8.31574 0 7.92782 0.0133765 6.71056 0.0668826C5.49775 0.120389 4.66395 0.316578 3.94162 0.597485C3.18807 0.891768 2.55046 1.27969 1.9173 1.9173C1.27969 2.55046 0.891768 3.18807 0.597485 3.93716C0.316578 4.66395 0.120389 5.49329 0.0668826 6.7061C0.0133765 7.92782 0 8.31574 0 11.4146C0 14.5135 0.0133765 14.9014 0.0668826 16.1187C0.120389 17.3315 0.316578 18.1653 0.597485 18.8877C0.891768 19.6412 1.27969 20.2788 1.9173 20.912C2.55046 21.5451 3.18807 21.9375 3.93716 22.2273C4.66395 22.5082 5.49329 22.7044 6.7061 22.7579C7.92336 22.8114 8.31128 22.8248 11.4102 22.8248C14.5091 22.8248 14.897 22.8114 16.1143 22.7579C17.3271 22.7044 18.1609 22.5082 18.8832 22.2273C19.6323 21.9375 20.2699 21.5451 20.903 20.912C21.5362 20.2788 21.9286 19.6412 22.2184 18.8921C22.4993 18.1653 22.6955 17.336 22.749 16.1232C22.8025 14.9059 22.8159 14.518 22.8159 11.4191C22.8159 8.3202 22.8025 7.93228 22.749 6.71502C22.6955 5.50221 22.4993 4.66841 22.2184 3.94607C21.9375 3.18807 21.5496 2.55046 20.912 1.9173C20.2788 1.28415 19.6412 0.891768 18.8921 0.601944C18.1653 0.321037 17.336 0.124848 16.1232 0.0713415C14.9014 0.0133765 14.5135 0 11.4146 0Z"
                      fill="white"
                    />
                    <path
                      d="M11.4146 5.55127C8.17753 5.55127 5.55127 8.17753 5.55127 11.4146C5.55127 14.6518 8.17753 17.278 11.4146 17.278C14.6518 17.278 17.278 14.6518 17.278 11.4146C17.278 8.17753 14.6518 5.55127 11.4146 5.55127ZM11.4146 15.218C9.31453 15.218 7.61125 13.5148 7.61125 11.4146C7.61125 9.31453 9.31453 7.61125 11.4146 7.61125C13.5148 7.61125 15.218 9.31453 15.218 11.4146C15.218 13.5148 13.5148 15.218 11.4146 15.218Z"
                      fill="white"
                    />
                    <path
                      d="M18.8787 5.31955C18.8787 6.07755 18.2634 6.68842 17.5099 6.68842C16.7519 6.68842 16.141 6.07309 16.141 5.31955C16.141 4.56155 16.7563 3.95068 17.5099 3.95068C18.2634 3.95068 18.8787 4.566 18.8787 5.31955Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_453_1182">
                      <rect width="22.8293" height="22.8293" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/company/ologyapp/"
                target="_blank"
              >
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_453_1183)">
                    <path
                      d="M21.1394 0H1.68544C0.753544 0 0 0.735709 0 1.64531V21.1795C0 22.0891 0.753544 22.8293 1.68544 22.8293H21.1394C22.0713 22.8293 22.8293 22.0891 22.8293 21.184V1.64531C22.8293 0.735709 22.0713 0 21.1394 0ZM6.77298 19.4539H3.38426V8.55652H6.77298V19.4539ZM5.07862 7.07172C3.99066 7.07172 3.11227 6.19333 3.11227 5.10983C3.11227 4.02633 3.99066 3.14794 5.07862 3.14794C6.16212 3.14794 7.04051 4.02633 7.04051 5.10983C7.04051 6.18887 6.16212 7.07172 5.07862 7.07172ZM19.4539 19.4539H16.0697V14.1568C16.0697 12.895 16.0474 11.2675 14.3084 11.2675C12.5472 11.2675 12.2796 12.6453 12.2796 14.0676V19.4539H8.89985V8.55652H12.1459V10.0458H12.1905C12.6408 9.18967 13.7466 8.28453 15.3919 8.28453C18.8208 8.28453 19.4539 10.5407 19.4539 13.4746V19.4539Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_453_1183">
                      <rect width="22.8293" height="22.8293" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
          </div>

          <div className="w-full text-center">
            <p className="text-[#E8E9F3]/30 text-center font-Satoshi text-[16px] font-normal leading-[140%]">
              Ology provides behavioral and timing context for informational
              purposes only and is not an investment adviser. © 2026 Ology
              Intelligence, Inc.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Terms;
