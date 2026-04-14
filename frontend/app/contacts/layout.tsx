import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Контакты и адреса',
  description:
    'Тойота33, Владимир: телефон +7 (904) 9 555 444, WhatsApp, email info@avto33.com. Основная площадка и кузовной цех — адреса, режим работы, онлайн-запись на ремонт.',
}

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return children
}
