import Link from 'next/link'
import { Phone, MapPin, Clock, Mail } from 'lucide-react'
import { Logo } from '@/components/logo'

const services = [
  { href: '/services/maintenance', label: 'Техническое обслуживание' },
  { href: '/services', label: 'Текущий ремонт' },
  { href: '/services/engine', label: 'Капитальный ремонт' },
  { href: '/services/engine', label: 'Диагностические работы' },
  { href: '/services/tires', label: 'Шиномонтаж' },
  { href: '/spare-parts', label: 'Подбор и продажа запасных частей' },
]

const MAP_URL = 'https://yandex.ru/maps/-/CTV2bNN9'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="bg-white/10">
        <div className="mx-auto max-w-[1188px] px-4 py-12 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-[146px]">
            {/* Brand */}
            <div className="flex max-w-[274px] flex-col gap-4">
              <Logo />
              <p className="text-sm leading-relaxed text-white">
                Специализированный профессиональный автосервис во Владимире. Ремонт автомобилей любых марок.
              </p>
            </div>

            {/* Services */}
            <div className="flex max-w-[274px] flex-col gap-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white">Услуги</h3>
              <ul className="flex flex-col gap-2">
                {services.map((service) => (
                  <li key={service.label}>
                    <Link
                      href={service.href}
                      prefetch={false}
                      className="text-sm text-white transition-colors hover:text-primary"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts */}
            <div className="flex max-w-[348px] flex-col gap-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white">Контакты</h3>
              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <a
                    href={MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm leading-snug text-white transition-colors hover:text-primary"
                  >
                    г. Владимир, ул. Промышленный проезд 5 Б
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <a
                    href="tel:+79049555444"
                    className="text-sm text-white transition-colors hover:text-primary"
                  >
                    +7 (904) 9 555 444
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm text-white">Пн–Пт: 9:00–18:00</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <a
                    href="mailto:j-car33@yandex.ru"
                    className="text-sm text-white transition-colors hover:text-primary"
                  >
                    j-car33@yandex.ru
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-card py-6">
        <div className="mx-auto flex max-w-[1188px] flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-0">
          <p className="text-xs text-muted-foreground">
            © Тойота33. Все права защищены.
          </p>
          <p className="text-xs text-muted-foreground">г. Владимир</p>
          <p className="text-xs text-muted-foreground">
            Разработано{' '}
            <a
              href="https://ameliq.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              ameliq.ru
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
