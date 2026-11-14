import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// The Terms page lives at /Terms-of-service. Send any other casing of that
// path (for example /terms-of-service) to it.
const TERMS = "/Terms-of-service";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.toLowerCase() === TERMS.toLowerCase() && pathname !== TERMS) {
    return NextResponse.redirect(new URL(TERMS, request.url), 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/terms-of-service", "/Terms-of-service", "/TERMS-OF-SERVICE"],
};
