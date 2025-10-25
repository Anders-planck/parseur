/**
 * next-intl Request Configuration
 *
 * Provides request-scoped configuration for Server Components.
 * This file is automatically loaded by the next-intl plugin.
 */

import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as 'en' | 'it' | 'fr')) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,

    // Optional: Configure time zones, formats, etc.
    timeZone: 'Europe/Rome', // Default time zone
    now: new Date(),

    // Optional: Configure formats for dates, times, numbers
    formats: {
      dateTime: {
        short: {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
        long: {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        },
      },
      number: {
        precise: {
          maximumFractionDigits: 5,
        },
      },
    },
  }
})

// Export formats for type safety
export const formats = {
  dateTime: {
    short: {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    } as const,
    long: {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    } as const,
  },
  number: {
    precise: {
      maximumFractionDigits: 5,
    } as const,
  },
} as const
