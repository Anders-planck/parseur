/**
 * NextAuth.js v5 Configuration
 *
 * Implements credential-based authentication with Prisma adapter
 * for session management and user authentication.
 */

import NextAuth, { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { prisma } from '@/lib/db/prisma'
import { logger } from '@/lib/utils/logger'
import { AuthenticationError } from '@/lib/utils/errors'

/**
 * NextAuth configuration object
 *
 * Note: We use JWT sessions without adapter for credentials provider
 * Database sessions are not compatible with credentials provider
 */
export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          logger.warn('Login attempt with missing credentials')
          throw new AuthenticationError('Email and password are required')
        }

        const email = credentials.email as string
        const password = credentials.password as string

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            createdAt: true,
          },
        })

        if (!user) {
          logger.warn({ email }, 'Login attempt for non-existent user')
          throw new AuthenticationError('Invalid email or password')
        }

        // Verify password
        const isValidPassword = await compare(password, user.password)

        if (!isValidPassword) {
          logger.warn({ userId: user.id, email }, 'Login attempt with invalid password')
          throw new AuthenticationError('Invalid email or password')
        }

        logger.info({ userId: user.id, email }, 'User logged in successfully')

        // Return user object (password excluded)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
  },

  callbacks: {
    async jwt({ token, user }) {
      // Add user ID to token on sign in
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },

    async session({ session, token }) {
      // Add user ID to session
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string | null
      }
      return session
    },

    async authorized({ auth }) {
      // Return true if user is authenticated
      return !!auth
    },
  },

  events: {
    async signIn({ user }) {
      logger.info({ userId: user.id, email: user.email }, 'User signed in')
    },

    async signOut() {
      logger.info('User signed out')
    },
  },

  debug: process.env.NODE_ENV === 'development',
}

/**
 * Export NextAuth handlers and auth utilities
 */
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
