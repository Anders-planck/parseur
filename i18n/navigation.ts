/**
 * next-intl Navigation Utilities
 *
 * Provides locale-aware wrappers around Next.js navigation APIs.
 * These automatically handle locale prefixes in URLs.
 */

import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// Create locale-aware navigation utilities
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
