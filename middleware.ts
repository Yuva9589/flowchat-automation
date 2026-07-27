import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Ye routes login required hain
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",   // /dashboard aur uske sab sub-pages
  "/settings(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Static files aur images exclude
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};