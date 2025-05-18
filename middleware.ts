import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isNotPublicRoute = createRouteMatcher([
  // "/Admin",
  "/Customer",
  "/Customer/whatsappService",
  // '/(root)/(.*)',
  // '/sign-in(.*)',
  // '/sign-up(.*)',
]);

const isAdminRoute = createRouteMatcher(["/Admin", "/Admin/(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (isNotPublicRoute(request)) {
    await auth.protect();
  }
  if (
    isAdminRoute(request) &&
    (await auth()).sessionClaims?.metadata?.role !== "admin"
  ) {
    // await auth.protect()
    const url = new URL("/sign-in", request.url);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
