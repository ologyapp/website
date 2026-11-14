import { faqsList } from "@/lib/faqs";

export default function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ology Intelligence, Inc.",
    url: "https://ologyapp.com",
    sameAs: [
      "https://x.com/OlogyHQ",
      "https://www.instagram.com/ologyapp",
      "https://www.linkedin.com/company/ologyapp",
    ],
    description:
      "Ology is a behavioral timing engine for markets. It reads your Trade DNA against the current sky, market context, and your own record.",
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Ology",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free beta, by invitation",
    },
    description:
      "A personal archetype and Trade DNA, a daily timing read, a calendar of the sky beside the market, and a journal for your own record.",
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsList.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
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
