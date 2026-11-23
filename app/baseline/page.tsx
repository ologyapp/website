import type { Metadata } from "next";
import BaselineForm from "@/components/baseline/BaselineForm";

// OLG-282. The first wave baseline form. Reached only from the link in a
// first wave email, so it stays out of search and out of the sitemap.
export const metadata: Metadata = {
  title: "Your trading routine | Ology",
  description: "Five short questions before the Ology beta opens.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/baseline" },
};

export default function BaselinePage() {
  return <BaselineForm />;
}
