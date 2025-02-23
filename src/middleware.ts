import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const isAdmin = req.auth?.user?.role === "admin";
  const isAdminAuthPage = req.nextUrl.pathname.startsWith('/admin/login');
  const isAdminDashboardRoute = req.nextUrl.pathname.startsWith('/admin') && !isAdminAuthPage;
  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || 
                    req.nextUrl.pathname.startsWith('/signup');

  // Handle admin auth pages
  if (isAdminAuthPage) {
    if (isAuthenticated && isAdmin) {
      return Response.redirect(new URL('/admin/dashboard', req.url));
    }
    return NextResponse.next();
  }

  // Handle admin dashboard routes
  if (isAdminDashboardRoute) {
    if (!isAuthenticated) {
      return Response.redirect(new URL('/admin/login', req.url));
    }
    if (!isAdmin) {
      return Response.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  }

  // Handle regular auth pages
  if (isAuthPage) {
    if (isAuthenticated) {
      return Response.redirect(new URL(isAdmin ? '/admin/dashboard' : '/dashboard', req.url));
    }
    return NextResponse.next();
  }

  // Handle user dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      return Response.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
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