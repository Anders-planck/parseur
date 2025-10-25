/**
 * Authentication Type Definitions
 *
 * Extends NextAuth types to include custom user properties
 */

import type { DefaultSession } from 'next-auth'

/**
 * Extend the built-in session types
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string | null
    } & DefaultSession['user']
  }

  interface User {
    id: string
    email: string
    name: string | null
  }

  interface JWT {
    id: string
    email: string
    name: string | null
  }
}

/**
 * User registration input
 */
export interface RegisterInput {
  email: string
  password: string
  name?: string
}

/**
 * Login input
 */
export interface LoginInput {
  email: string
  password: string
}

/**
 * Auth session data
 */
export interface AuthSession {
  user: {
    id: string
    email: string
    name: string | null
  }
}
