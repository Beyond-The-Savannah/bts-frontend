
// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const isNotPublicRoute = createRouteMatcher(["/Customer","/Customer/whatsappService",]);

// const isAdminRoute = createRouteMatcher(["/Admin", "/Admin/(.*)"]);

// export default clerkMiddleware(async (auth, request) => {

//   if (isNotPublicRoute(request)) {await auth.protect();}
//   if (isAdminRoute(request) && (await auth()).sessionClaims?.metadata?.role !== "admin") {
//     const url = new URL("/sign-in", request.url);
//     return NextResponse.redirect(url);
//   }
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };


import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isNotPublicRoute = createRouteMatcher(["/Customer(.*)","/Admin(.*)",]);
const isAdminRoute = createRouteMatcher([ "/Admin/(.*)"]);
const isCustomerRoute = createRouteMatcher([ "/Customer/(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const{pathname}=request.nextUrl
  // Get auth info once
  const authResult = await auth();
  const{userId}=authResult
  const userRole = authResult.sessionClaims?.metadata?.role;
  
  // Protect non-public routes
  if (isNotPublicRoute(request)) {
    await auth.protect();
  }

  // Handle admin routes
  if (isAdminRoute(request)) {
    if (userRole !== "admin") {
      // Non-admin trying to access admin routes - redirect to sign-in
      // const url = new URL("/sign-in", request.url);
        const url = new URL("/Customer", request.url);
      return NextResponse.redirect(url);
    }
    // Admin user is already on admin route - let them through
    return NextResponse.next();
  }

  // Handle customer routes
  // Both admin and regular users can access customer routes
   if (isCustomerRoute(request)) {
    return NextResponse.next();
  }
  
  // If user just signed in and is on sign-in page, redirect based on role
  if (pathname === "/sign-in" && userId && userRole) {
    if (userRole === "admin") {
      const url = new URL("/Admin", request.url);
      return NextResponse.redirect(url);
    } else {
      const url = new URL("/Customer", request.url);
      return NextResponse.redirect(url);
    }
  }

  
  // Allow other requests to proceed
    return NextResponse.next();

});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
