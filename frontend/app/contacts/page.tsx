'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageBanner } from '@/components/page-banner'
import { BookingForm } from '@/components/booking-form'
import { Phone, MapPin, Clock, Mail } from 'lucide-react'
import { ProtectedEmail } from '@/components/protected-email'

const MAP_URL = 'https://yandex.ru/maps/-/CTbJnHnC'

const location = {
  name: 'Основная площадка',
  address: 'г. Владимир, ул. Промышленный проезд, 5Б',
  phone: '+7 (904) 9 555 444',
  hours: 'Пн–Пт: 9:00–18:00',
  note: 'Все виды ремонта и ТО',
}

const faq = [
  {
    q: 'Нужна ли запись или можно приехать без записи?',
    a: 'Мы рекомендуем записываться заранее, чтобы мы могли выделить нужного специалиста. Без записи принимаем при наличии свободных мест.',
  },
  {
    q: 'Сколько стоит диагностика?',
    a: 'Первичная диагностика и осмотр автомобиля — бесплатно. Платная компьютерная диагностика проводится при необходимости глубокого анализа систем.',
  },
  {
    q: 'Предоставляете ли вы гарантию на работы?',
    a: 'Да, мы даём письменную гарантию на все виды работ и установленные запчасти. Срок гарантии зависит от типа работ и составляет от 3 до 12 месяцев.',
  },
  {
    q: 'Можно ли приехать с чужими запчастями?',
    a: 'Да, мы устанавливаем запчасти клиента. Однако просим учесть, что гарантия на работу при установке клиентских деталей ограничена.',
  },
  {
    q: 'Как долго длится ремонт?',
    a: 'Зависит от объёма работ. ТО занимает 1–2 часа, средний ремонт — 1–3 дня. Точные сроки согласовываем при приёмке автомобиля.',
  },
]

export default function ContactsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <PageBanner
        image="/images/service-bay.jpg"
        imageAlt="Автосервис тойота33"
        eyebrow="Свяжитесь с нами"
        title={
          <>
            Контакты
            <br />
            <span className="text-primary">и адреса</span>
          </>
        }
        crumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Контакты' },
        ]}
      />

      {/* Quick contacts bar */}
      <section className="bg-primary py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-6 justify-center sm:justify-between items-center">
            <a href="tel:+79049555444" className="flex items-center gap-3 text-primary-foreground hover:text-primary-foreground/80 transition-colors">
              <Phone className="w-5 h-5" />
              <div>
                <div className="text-xs opacity-70 uppercase tracking-wider">Телефон</div>
                <div className="font-bold">+7 (904) 9 555 444</div>
              </div>
            </a>
            <div className="flex items-center gap-3 text-primary-foreground">
              <Mail className="h-5 w-5" />
              <div>
                <div className="text-xs uppercase tracking-wider opacity-70">Email</div>
                <ProtectedEmail className="font-bold" label="Написать" />
              </div>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground">
              <Clock className="w-5 h-5" />
              <div>
                <div className="text-xs opacity-70 uppercase tracking-wider">Режим работы</div>
                <div className="font-bold">Пн–Пт: 9:00–18:00</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">Адреса</p>
            <h2 className="text-4xl font-black text-balance text-foreground">Наши площадки</h2>
          </div>

          <div className="mx-auto max-w-[818px] overflow-hidden rounded-[2px] border border-[#1b1b1b] bg-white/10">
            <div className="flex h-[208px] items-center justify-center border-b border-[#1b1b1b] bg-[#111]">
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 px-4 text-center transition-opacity hover:opacity-80"
              >
                <MapPin className="h-20 w-20 text-primary" strokeWidth={0.75} />
                <p className="text-sm font-medium text-[#eef0f0]">{location.address}</p>
              </a>
            </div>

            <div className="flex flex-col gap-4 p-6">
              <div>
                <h3 className="text-lg font-bold text-[#eef0f0]">{location.name}</h3>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-primary">
                  {location.note}
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm text-[#717171]">{location.address}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <a
                    href="tel:+79049555444"
                    className="text-sm text-[#717171] transition-colors hover:text-foreground"
                  >
                    {location.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm text-[#717171]">{location.hours}</span>
                </li>
              </ul>

              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex w-full items-center justify-center rounded-[2px] bg-primary px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Проложить маршрут
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-card border-y border-border" id="booking">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">Онлайн-запись</p>
              <h2 className="text-4xl font-black text-foreground mb-4 text-balance">
                Записаться на ремонт
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Оставьте заявку — мы перезвоним в течение рабочего дня и согласуем удобное время. Принимаем заявки круглосуточно.
              </p>
              <div className="flex flex-col gap-4 p-6 bg-background border border-border rounded-sm">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Также доступны</p>
                <a href="tel:+79049555444" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                  <div className="w-9 h-9 bg-primary/10 rounded-sm flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Позвонить</div>
                    <div className="text-xs text-muted-foreground">+7 (904) 9 555 444</div>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-foreground">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-primary/10">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <ProtectedEmail className="text-sm font-semibold" label="Написать" />
                    <div className="text-xs text-muted-foreground">Электронная почта</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-secondary border border-border rounded-sm p-8">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">Часто спрашивают</p>
            <h2 className="text-4xl font-black text-foreground text-balance">Вопросы и ответы</h2>
          </div>
          <div className="flex flex-col gap-4">
            {faq.map((item) => (
              <div key={item.q} className="p-6 bg-card border border-border rounded-sm">
                <h3 className="font-bold text-foreground mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
