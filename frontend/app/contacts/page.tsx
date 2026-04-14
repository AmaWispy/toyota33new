'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { BookingForm } from '@/components/booking-form'
import { Phone, MapPin, Clock, Mail, ChevronRight, MessageCircle } from 'lucide-react'

const locations = [
  {
    name: 'Основная площадка',
    address: 'г. Владимир, ул. 2-й Почаевский пр-зд, д. 20',
    phone: '+7 (904) 9 555 444',
    hours: 'Пн–Пт: 8:00–18:00, Сб: 9:00–15:00',
    note: 'Все виды ремонта и ТО',
    mapSrc: 'https://yandex.ru/map-widget/v1/?ll=40.3736%2C56.1292&z=16&pt=40.3736,56.1292,pm2rdl',
  },
  {
    name: 'Кузовной цех',
    address: 'г. Владимир, ул. Промышленная, д. 14',
    phone: '+7 (904) 955-54-45',
    hours: 'Пн–Пт: 8:00–17:00',
    note: 'Кузовной ремонт и покраска',
    mapSrc: 'https://yandex.ru/map-widget/v1/?ll=40.3736%2C56.1292&z=16&pt=40.3736,56.1292,pm2rdl',
  },
]

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

      {/* Header */}
      <section className="pt-32 pb-16 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Контакты</span>
          </div>
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3">Свяжитесь с нами</p>
          <h1 className="text-5xl sm:text-6xl font-black text-foreground text-balance max-w-2xl">
            Контакты<br />
            <span className="text-primary">и адреса</span>
          </h1>
        </div>
      </section>

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
            <a href="mailto:info@avto33.com" className="flex items-center gap-3 text-primary-foreground hover:text-primary-foreground/80 transition-colors">
              <Mail className="w-5 h-5" />
              <div>
                <div className="text-xs opacity-70 uppercase tracking-wider">Email</div>
                <div className="font-bold">info@avto33.com</div>
              </div>
            </a>
            <div className="flex items-center gap-3 text-primary-foreground">
              <Clock className="w-5 h-5" />
              <div>
                <div className="text-xs opacity-70 uppercase tracking-wider">Режим работы</div>
                <div className="font-bold">Пн–Пт: 8:00–18:00, Сб: 9:00–15:00</div>
              </div>
            </div>
            <a
              href="https://wa.me/79049555444"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary-foreground text-primary font-bold text-sm rounded-sm hover:bg-primary-foreground/90 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">Адреса</p>
            <h2 className="text-4xl font-black text-foreground text-balance">Наши площадки</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {locations.map((loc) => (
              <div key={loc.name} className="flex flex-col bg-white/10 border border-border rounded-sm overflow-hidden">
                <div className="h-52 bg-secondary border-b border-border flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-10 h-10 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground">{loc.address}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{loc.name}</h3>
                    <p className="text-xs text-primary font-medium uppercase tracking-wider mt-0.5">{loc.note}</p>
                  </div>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{loc.address}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-primary shrink-0" />
                      <a href={`tel:${loc.phone.replace(/\D/g, '')}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {loc.phone}
                      </a>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-muted-foreground">{loc.hours}</span>
                    </li>
                  </ul>
                  <a
                    href={`https://yandex.ru/maps/?text=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    Открыть в Яндекс.Картах
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
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
                Оставьте заявку — мы перезвоним в течение часа и согласуем удобное время. Принимаем заявки круглосуточно.
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
                <a
                  href="https://wa.me/79049555444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <div className="w-9 h-9 bg-primary/10 rounded-sm flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">WhatsApp</div>
                    <div className="text-xs text-muted-foreground">Написать в мессенджер</div>
                  </div>
                </a>
                <a href="mailto:info@avto33.com" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                  <div className="w-9 h-9 bg-primary/10 rounded-sm flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Email</div>
                    <div className="text-xs text-muted-foreground">info@avto33.com</div>
                  </div>
                </a>
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
