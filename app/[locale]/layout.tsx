/**
 * Locale Layout
 *
 * Wraps all routes with locale-specific context from next-intl.
 * This layout:
 * - Validates the locale parameter
 * - Provides translations to all child components
 * - Returns 404 for invalid locales
 */

import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Toaster } from '@/components/ui/sonner'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

/**
 * Generate static params for all supported locales
 * This enables static generation at build time
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

/**
 * Locale-specific layout
 */
export default async function LocaleLayout({ children, params }: Props) {
  // Await params to get the locale
  const { locale } = await params

  // Ensure that the incoming locale is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Load messages for this locale
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
      <Toaster />
    </NextIntlClientProvider>
  )
}
