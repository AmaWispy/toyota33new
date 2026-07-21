import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Контакты и адреса',
  description:
    'Тойота33, Владимир: телефон +7 (904) 9 555 444, email j-car33@yandex.ru. Адрес: Промышленный проезд, 5Б — режим работы и онлайн-запись на ремонт.',
}

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return children
}
