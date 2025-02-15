import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  // Skip middleware for API routes
  if (req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const isAuthenticated = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || 
                    req.nextUrl.pathname.startsWith('/signup');

  if (isAuthPage) {
    if (isAuthenticated) {
      return Response.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated && req.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
});

// Remove middleware from auth endpoints
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 