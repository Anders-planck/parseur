/**
 * next-intl Routing Configuration
 *
 * Defines supported locales and routing behavior for internationalization.
 */

import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // Supported locales: English, Italian, French
  locales: ['en', 'it', 'fr'],

  // Default locale when none matches
  defaultLocale: 'en',

  // Locale prefix configuration
  // 'as-needed' omits prefix for default locale (cleaner URLs)
  localePrefix: 'as-needed',
})

// Export types for type safety
export type Locale = (typeof routing.locales)[number]
