import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Авто33 — Профессиональный автосервис во Владимире',
  description: 'Профессиональный автосервис во Владимире. Ремонт японских и европейских автомобилей: Toyota, Lexus, Honda, Nissan, Mazda и другие. Более 20 лет опыта.',
  keywords: 'автосервис, ремонт авто, Владимир, ТО, диагностика, японские автомобили, Toyota, Honda, Nissan',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={inter.variable} data-scroll-behavior="smooth">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
