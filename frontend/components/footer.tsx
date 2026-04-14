import Link from 'next/link'
import { Phone, MapPin, Clock, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="bg-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" prefetch={false} className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm">
                  <span className="text-primary-foreground font-bold text-sm">33</span>
                </div>
                <div className="leading-tight">
                  <span className="font-bold text-foreground text-sm tracking-wide uppercase">тойота33</span>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Автосервис</p>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Специализированный профессиональный автосервис во Владимире. Ремонт любых марок автомобилей. Более 20 лет опыта.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Навигация</h3>
              <ul className="flex flex-col gap-2">
                {[
                  { href: '/services', label: 'Услуги' },
                  { href: '/spare-parts', label: 'Запчасти' },
                  { href: '/about', label: 'О нас' },
                  { href: '/contacts', label: 'Контакты' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Услуги</h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/services/maintenance', label: 'Техническое обслуживание' },
                { href: '/services/engine', label: 'Диагностика двигателя' },
                { href: '/services/transmission', label: 'Ремонт трансмиссии' },
                { href: '/services/chassis', label: 'Ремонт ходовой части' },
                { href: '/services/ac', label: 'Кондиционер' },
                { href: '/services/tires', label: 'Шиномонтаж' },
              ].map((service) => (
                <li key={service.label}>
                  <Link href={service.href} prefetch={false} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
            </div>

            {/* Contacts */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Контакты</h3>
              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">г. Владимир, ул. 2-й Почаевский пр-зд, д. 20</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <a href="tel:+79049555444" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    +7 (904) 9 555 444
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">Пн–Пт: 8:00–18:00</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a href="mailto:info@avto33.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    info@avto33.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card py-6 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} тойота33 — ЛМС-АВТО. Все права защищены.
          </p>
          <p className="text-xs text-muted-foreground">
            г. Владимир
          </p>
          <p className="text-xs text-muted-foreground">
            Разработка сайта — <a href="https://ameliq.ru" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">ameliq.ru</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
