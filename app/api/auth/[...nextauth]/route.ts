/**
 * NextAuth.js API Route Handler
 *
 * Handles all authentication routes:
 * - GET  /api/auth/session - Get current session
 * - POST /api/auth/signin  - Sign in
 * - POST /api/auth/signout - Sign out
 * - GET  /api/auth/providers - Get available providers
 * - GET  /api/auth/csrf - Get CSRF token
 */

import { handlers } from '@/lib/auth/config'

/**
 * Export GET and POST handlers from NextAuth
 */
export const { GET, POST } = handlers
