/**
 * Root Layout
 *
 * This is the absolute root layout that wraps the entire application.
 * It only provides the basic HTML structure and theme management.
 * Locale-specific layouts are in app/[locale]/layout.tsx
 */

import type { Metadata } from 'next'
import { Merriweather, Oxanium } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const geistSans = Oxanium({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Merriweather({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Smart Document Parser',
  description: 'Intelligent document parsing platform with LLM-powered extraction',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
