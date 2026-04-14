'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/services', label: 'Услуги' },
  { href: '/spare-parts', label: 'Запчасти' },
  { href: '/about', label: 'О нас' },
  { href: '/contacts', label: 'Контакты' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" prefetch={false} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm">
              <span className="text-primary-foreground font-bold text-sm">33</span>
            </div>
            <div className="leading-tight">
              <span className="font-bold text-foreground text-sm tracking-wide uppercase">тойота33</span>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Автосервис</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-sm transition-colors',
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Phone + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+79049555444"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span className="font-medium">+7 (904) 9 555 444</span>
            </a>
            <Link
              href="/contacts#booking"
              prefetch={false}
              className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-sm hover:bg-primary/90 transition-colors"
            >
              Записаться на ремонт
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                onClick={() => setOpen(false)}
                className={cn(
                  'px-3 py-3 text-sm font-medium rounded-sm transition-colors',
                  pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border mt-2 flex flex-col gap-3">
              <a
                href="tel:+79049555444"
                className="flex items-center gap-2 text-sm text-foreground font-medium px-3"
              >
                <Phone className="w-4 h-4 text-primary" />
                +7 (904) 9 555 444
              </a>
              <Link
                href="/contacts#booking"
                prefetch={false}
                onClick={() => setOpen(false)}
                className="mx-3 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-sm text-center"
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
