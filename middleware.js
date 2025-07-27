import { NextResponse } from 'next/server'

export function middleware(request) {
  // Check if the user is authenticated (e.g., by checking a cookie or session)
  const isAuthenticated = request.cookies.get('user') 

  // List of protected routes
  const protectedRoutes = ['/dashboard', '/courses', '/resources', '/settings', '/users']
  const { pathname } = request.nextUrl

  // If the route is protected and user is not authenticated, redirect to login
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/Login', request.url))
  }

  // Allow the request to proceed
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/courses/:path*', '/resources/:path*', '/settings/:path*', '/users/:path*'],
}
