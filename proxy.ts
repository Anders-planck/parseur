/**
 * Next.js 16 Proxy (formerly Middleware)
 *
 * Integrates authentication (NextAuth v5) with internationalization (next-intl)
 * to provide route protection and locale handling.
 *
 * Note: Next.js 16 renamed "middleware" to "proxy" - the functionality remains the same.
 *
 * Route Protection Logic:
 * - Public routes (/, /login, /register): Only accessible when NOT authenticated
 *   → Authenticated users are redirected to /dashboard
 * - Protected routes (/dashboard/**): Only accessible when authenticated
 *   → Unauthenticated users are redirected to /login
 */

import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { auth } from '@/lib/auth/config'
import { routing } from '@/i18n/routing'

/**
 * Define route types for authentication
 */
const publicRoutes = ['/', '/login', '/register']
const protectedRoutes = ['/dashboard']

/**
 * Create next-intl middleware for locale handling
 */
const intlMiddleware = createIntlMiddleware(routing)

/**
 * Check if path matches any of the given route patterns
 */
function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some((route) => {
    if (route === '/') {
      return pathname === '/' || pathname === ''
    }
    return pathname.startsWith(route)
  })
}

/**
 * Remove locale prefix from pathname to get the base path
 */
function getPathnameWithoutLocale(pathname: string): string {
  const locales = routing.locales
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(`/${locale}`.length)
    }
    if (pathname === `/${locale}`) {
      return '/'
    }
  }
  return pathname
}

/**
 * Get locale from pathname or return default
 */
function getLocaleFromPathname(pathname: string): string {
  const locales = routing.locales
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale
    }
  }
  return routing.defaultLocale
}

/**
 * Main proxy function (Next.js 16 terminology, formerly middleware)
 */
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the pathname without locale prefix
  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname)
  const currentLocale = getLocaleFromPathname(pathname)

  // Check authentication status
  const session = await auth()
  const isAuthenticated = !!session?.user

  // Determine if current route is public or protected
  const isPublicRoute = matchesRoute(pathnameWithoutLocale, publicRoutes)
  const isProtectedRoute = matchesRoute(pathnameWithoutLocale, protectedRoutes)

  /**
   * Authentication Logic:
   *
   * 1. If user IS authenticated and tries to access public routes (/, /login, /register)
   *    → Redirect to /dashboard
   */
  if (isAuthenticated && isPublicRoute) {
    const dashboardUrl = new URL(`/${currentLocale}/dashboard`, request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  /**
   * 2. If user is NOT authenticated and tries to access protected routes (/dashboard/**)
   *    → Redirect to /login
   */
  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL(`/${currentLocale}/login`, request.url)
    // Store the original URL to redirect back after login
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  /**
   * 3. For all other cases (API routes, static files, valid routes with correct auth)
   *    → Apply next-intl middleware for locale handling
   */
  return intlMiddleware(request)
}

/**
 * Proxy configuration (Next.js 16)
 *
 * Apply proxy to all routes except:
 * - API routes (/api/**)
 * - Static files (/_next/**)
 * - Image optimization (/_next/image)
 * - Favicon and other static assets
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - API routes
     * - Next.js internals
     * - Static files
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
