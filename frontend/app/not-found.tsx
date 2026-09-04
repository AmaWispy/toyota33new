import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Страница не найдена',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-[65px] text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-0 h-full w-[42%] -skew-x-12 bg-primary/90"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[8%] top-0 h-full w-3 -skew-x-12 bg-primary"
        />

        <div className="relative z-10 flex max-w-xl flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Ошибка</p>
          <p className="mt-4 text-[96px] font-black leading-none tracking-tight text-foreground sm:text-[140px]">
            404
          </p>
          <h1 className="mt-4 text-2xl font-black text-balance text-foreground sm:text-4xl">
            Страница не найдена
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Такой страницы нет или её перенесли. Вернитесь на главную — там запись на ремонт, услуги и контакты.
          </p>
          <Link
            href="/"
            prefetch={false}
            className="mt-10 inline-flex h-[54px] items-center gap-2 rounded-[2px] bg-primary px-8 text-sm font-semibold uppercase tracking-wide text-primary-foreground shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-colors hover:bg-primary/90"
          >
            На главную
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
