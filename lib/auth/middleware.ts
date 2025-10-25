/**
 * Authentication Middleware
 *
 * Provides utilities for protecting routes and checking authentication status
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { AuthorizationError } from '@/lib/utils/errors'
import { logger } from '@/lib/utils/logger'

/**
 * Session type from auth function
 */
type AuthSession = NonNullable<Awaited<ReturnType<typeof auth>>>

/**
 * Protect API routes - require authentication
 *
 * Usage in API routes:
 * ```ts
 * export const GET = requireAuth(async (request, session) => {
 *   // session.user is guaranteed to exist
 *   return NextResponse.json({ userId: session.user.id })
 * })
 * ```
 */
export function requireAuth(
  handler: (request: NextRequest, session: AuthSession) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const session = await auth()

    if (!session || !session.user) {
      logger.warn({ path: request.nextUrl.pathname }, 'Unauthorized access attempt')
      return NextResponse.json(
        { error: { message: 'Authentication required', code: 'UNAUTHORIZED' } },
        { status: 401 }
      )
    }

    // TypeScript now knows session is AuthSession due to the guard above
    return handler(request, session as unknown as AuthSession)
  }
}

/**
 * Get current session or throw error
 *
 * Usage in API routes or Server Components:
 * ```ts
 * const session = await getSessionOrThrow()
 * // session.user is guaranteed to exist
 * ```
 */
export async function getSessionOrThrow() {
  const session = await auth()

  if (!session || !session.user) {
    throw new AuthorizationError('Authentication required')
  }

  return session
}

/**
 * Get current user ID from session
 *
 * Returns user ID or throws error if not authenticated
 */
export async function getCurrentUserId(): Promise<string> {
  const session = await getSessionOrThrow()
  return session.user.id
}

/**
 * Check if user is authenticated
 *
 * Returns true if session exists, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await auth()
  return !!session?.user
}

/**
 * Optional authentication - returns session if exists, null otherwise
 *
 * Useful for routes that work both with and without authentication
 */
export async function getOptionalSession() {
  return auth()
}
