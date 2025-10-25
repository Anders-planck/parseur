/**
 * Dashboard Layout
 *
 * Wraps all dashboard pages with:
 * - Sidebar navigation
 * - Header with breadcrumbs
 * - Theme and language switchers
 */

import { setRequestLocale } from 'next-intl/server'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Providers } from '@/components/providers'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function DashboardLayout({ children, params }: Props) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <Providers>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />

            {/* Spacer */}
            <div className="flex-1" />

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </Providers>
  )
}
