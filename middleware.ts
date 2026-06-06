// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

// NOTE: We intentionally keep middleware lightweight (no Supabase here)
// because @supabase/supabase-js uses Node.js APIs not available in Edge.
// Auth session validation is done in individual route/layout server components.

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read session token cookie (set by Supabase client)
  const hasSession =
    request.cookies.has('sb-access-token') ||
    request.cookies.has('sb-refresh-token') ||
    // @supabase/ssr sets a project-specific cookie
    [...request.cookies.getAll()].some(({ name }) =>
      name.startsWith('sb-') && name.endsWith('-auth-token')
    );

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard') && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(url);
  }

  // Redirect logged-in users away from auth pages
  if (hasSession && (pathname === '/login' || pathname === '/signup')) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|public).*)',
  ],
};
