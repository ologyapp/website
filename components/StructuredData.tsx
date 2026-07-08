export default function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ology Intelligence, Inc.",
    url: "https://ologyapp.com",
    sameAs: [
      "https://x.com/finstrology",
      "https://www.instagram.com/ologyapp",
      "https://www.linkedin.com/company/ology",
    ],
    description:
      "Ology is a market timing platform that synthesizes celestial cycles, behavioral psychology, and live market data into a personalized timing profile.",
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Ology",
    applicationCategory: "FinanceApplication",
    operatingSystem: "iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free beta, waitlist access",
    },
    description:
      "A personalized investor timing profile, a celestial market calendar, and the sentiment and cycle context behind every price move. Pattern over prediction.",
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an investor timing profile?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A behavioral profile drawn from your natal chart and refined by a short questionnaire. It describes how you tend to handle risk, pressure, conviction, and time, and it becomes the lens the rest of Ology reads the market through.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to know astrology to use Ology?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Ology translates celestial cycles into plain market context. If you can read a calendar, you can read Ology.",
        },
      },
      {
        "@type": "Question",
        name: "Does Ology predict the market?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Ology makes no forecasts and no price calls. It maps timing windows, shows what happened in windows like them before, and keeps score alongside your own record. Pattern over prediction.",
        },
      },
      {
        "@type": "Question",
        name: "Is Ology financial advice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Ology is not an investment adviser and never recommends trades. It brings context to your decisions and leaves the decisions with you.",
        },
      },
      {
        "@type": "Question",
        name: "How is Ology different from other market tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most tools measure the market and stop there. Ology adds the layers they leave out, market sentiment, behavioral context, and cycle interpretation, and reads all three through your own profile.",
        },
      },
      {
        "@type": "Question",
        name: "What markets does Ology cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Equities and crypto at launch, with sentiment and volatility context across the broader market.",
        },
      },
      {
        "@type": "Question",
        name: "What do I need to get my profile?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A birth date, time, and place. Birth data is treated as sensitive personal information, encrypted, never shared, never sold. If you don't know your birth time, select unknown. The engine handles it.",
        },
      },
      {
        "@type": "Question",
        name: "When does the beta open?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In waves through the second half of 2026. The waitlist enters first, and the earliest members are seated ahead of everyone who follows.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(software),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faq),
        }}
      />
    </>
  );
}
