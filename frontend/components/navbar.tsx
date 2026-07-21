'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/services', label: 'Услуги' },
  { href: '/spare-parts', label: 'Запчасти' },
  { href: '/about', label: 'О нас' },
  { href: '/contacts', label: 'Контакты' },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1a] bg-white/10 backdrop-blur-[12px]">
      <div className="mx-auto flex h-[65px] max-w-[1221px] items-center justify-between px-4 sm:px-6 lg:px-0">
        <Logo className="shrink-0" />

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className={cn(
                  'rounded-[2px] px-3 py-2 text-sm font-medium transition-colors',
                  active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Phone + CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+79049555444"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Phone className="h-4 w-4 text-primary" strokeWidth={1.33} />
            <span className="font-medium">+7 (904) 9 555 444</span>
          </a>
          <Link
            href="/contacts#booking"
            prefetch={false}
            className="rounded-[2px] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Записаться на ремонт
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
          aria-label="Открыть меню"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[#1a1a1a] bg-background/95 backdrop-blur-[12px] lg:hidden">
          <div className="mx-auto flex max-w-[1221px] flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-[2px] px-3 py-3 text-sm font-medium transition-colors',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="mt-2 flex flex-col gap-3 border-t border-border pt-3">
              <a
                href="tel:+79049555444"
                className="flex items-center gap-2 px-3 text-sm font-medium text-foreground"
              >
                <Phone className="h-4 w-4 text-primary" strokeWidth={1.33} />
                +7 (904) 9 555 444
              </a>
              <Link
                href="/contacts#booking"
                prefetch={false}
                onClick={() => setOpen(false)}
                className="mx-3 rounded-[2px] bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
              >
                Записаться на ремонт
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
