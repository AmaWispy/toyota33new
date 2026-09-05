import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ChatWidget from '@/components/ChatWidget'
import { YandexMetrika } from '@/components/yandex-metrika'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Тойота33 — профессиональный автосервис во Владимире',
    template: '%s | Тойота33',
  },
  description:
    'Тойота33, Владимир: ремонт и обслуживание японских и европейских автомобилей. ТО, диагностика, трансмиссия, ходовая, кондиционер, шиномонтаж. Более 20 лет опыта, 3 площадки. Онлайн-запись.',
  keywords:
    'автосервис, ремонт авто, Владимир, ТО, диагностика, японские автомобили, Toyota, Honda, Nissan, Тойота33',
  manifest: '/site.webmanifest',
  themeColor: '#E4032E',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/favicon.svg' }],
  },
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
        <ChatWidget />
        <YandexMetrika />
      </body>
    </html>
  )
}
