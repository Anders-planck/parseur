/**
 * Language Switcher Component
 *
 * Allows users to switch between supported locales (en, it, fr).
 * Uses next-intl's navigation for locale-aware routing.
 */

'use client'

import { useParams } from 'next/navigation'
import { useTransition } from 'react'
import { useRouter, usePathname } from '@/i18n/navigation'
import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { routing } from '@/i18n/routing'

const localeNames: Record<string, string> = {
  en: 'English',
  it: 'Italiano',
  fr: 'Français',
}

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const [isPending, startTransition] = useTransition()

  const currentLocale = params.locale as string

  function handleLocaleChange(locale: string) {
    startTransition(() => {
      router.replace(pathname, { locale })
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className="cursor-pointer"
            disabled={locale === currentLocale}
          >
            <span className={locale === currentLocale ? 'font-semibold' : ''}>{localeNames[locale]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
