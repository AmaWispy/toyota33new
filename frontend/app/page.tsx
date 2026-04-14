import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { BrandsMarquee } from '@/components/brands-marquee'
import { BookingForm } from '@/components/booking-form'
import {
  Wrench,
  Car,
  Zap,
  ShieldCheck,
  Clock,
  Award,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'

export const metadata: Metadata = {
  description:
    'Компания ЛМС-АВТО: более 20 лет обслуживания японских и европейских автомобилей во Владимире. Сертифицированные специалисты, оригинальные запчасти, честные цены. ТО, диагностика, ремонт. Онлайн-запись.',
}

const services = [
  {
    icon: Wrench,
    title: 'Техническое обслуживание',
    desc: 'Регламентные работы по ТО для любых марок автомобилей — Honda, Nissan, Mitsubishi, Mazda, Ford и другие.',
    href: '/services/maintenance',
  },
  {
    icon: Zap,
    title: 'Диагностика двигателя',
    desc: 'Компьютерная диагностика на специализированном оборудовании для любых марок и моделей авто.',
    href: '/services/engine',
  },
  {
    icon: Car,
    title: 'Ремонт трансмиссии',
    desc: 'КПП, АКПП, робот, вариатор, сцепление, раздаточные коробки и мосты — любые конструкции.',
    href: '/services/transmission',
  },
]

const advantages = [
  { number: '20+', label: 'Лет опыта' },
  { number: '3', label: 'Площадки в городе' },
  { number: '5000+', label: 'Обслуженных авто' },
  { number: '100%', label: 'Гарантия качества' },
]

const whyUs = [
  {
    icon: Award,
    title: 'Опытные специалисты',
    desc: 'Механики с опытом работы в дилерских центрах. Знаем конструктивные особенности каждой марки.',
  },
  {
    icon: ShieldCheck,
    title: 'Оригинальные запчасти',
    desc: 'Широкий склад оригинальных и качественных неоригинальных запчастей для всех марок в наличии.',
  },
  {
    icon: Clock,
    title: 'Соблюдаем сроки',
    desc: 'Мы ценим ваше время и всегда соблюдаем согласованные сроки ремонта.',
  },
  {
    icon: Wrench,
    title: 'Современное оборудование',
    desc: 'Профессиональный инструмент и диагностическое оборудование для работы с любыми автомобилями.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-toyota.jpg"
            alt="Автосервис тойота33"
            fill
            priority
            loading="eager"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/20 border border-primary/30 rounded-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary uppercase tracking-widest">
                Профессиональный автосервис — все марки
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground leading-tight text-balance mb-6">
              Ваш автомобиль
              <br />
              <span className="text-primary">в надёжных</span>
              <br />
              руках
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              Более 20 лет компания ЛМС-АВТО обслуживает японские и европейские автомобили. Сертифицированные специалисты, оригинальные запчасти, честные цены.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contacts#booking"
                prefetch={false}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-sm hover:bg-primary/90 transition-colors"
              >
                Записаться на ремонт
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                prefetch={false}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-border text-foreground font-medium rounded-sm hover:border-primary/50 hover:text-primary transition-colors"
              >
                Все услуги
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Прокрутите</span>
          <div className="w-px h-8 bg-border animate-pulse" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((item) => (
              <div key={item.number} className="text-center">
                <div className="text-4xl font-black text-primary-foreground">{item.number}</div>
                <div className="text-sm font-medium text-primary-foreground/70 mt-1 uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <BrandsMarquee />

      {/* Services */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">Что мы делаем</p>
              <h2 className="text-4xl sm:text-5xl font-black text-foreground text-balance">Наши услуги</h2>
            </div>
            <Link
              href="/services"
              prefetch={false}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Все услуги <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                prefetch={false}
                className="group flex flex-col p-6 bg-white/10 border border-border rounded-sm hover:border-primary/40 transition-all duration-300 hover:bg-white/30"
              >
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-sm mb-5 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-balance">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{service.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Подробнее <ChevronRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">О компании</p>
              <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-6 text-balance">
                Альтернатива дилерскому сервису
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Начав как специализированный сервис Toyota-Lexus, мы расширили компетенции до полного спектра японских и европейских марок. Наши механики прошли обучение в официальных дилерских центрах и знают особенности каждого автомобиля.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Мы предлагаем качество дилерского обслуживания по честным ценам без лишних наценок. Всё оборудование и инструмент соответствуют требованиям производителей.
              </p>
              <Link
                href="/about"
                prefetch={false}
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-semibold text-sm rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Узнать больше о нас <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <Image
                src="/images/service-bay.jpg"
                alt="Автосервис"
                width={600}
                height={450}
                className="rounded-sm object-cover w-full aspect-video"
              />
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-6 py-4 rounded-sm">
                <div className="text-3xl font-black">20+</div>
                <div className="text-xs font-medium uppercase tracking-wider opacity-90">лет опыта</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">Почему выбирают нас</p>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground text-balance">Наши преимущества</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center p-6 bg-white/10 border border-border rounded-sm">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-sm mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-balance">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-24 bg-card border-t border-border" id="booking">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">Запись</p>
              <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-6 text-balance">
                Записаться на ремонт
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Оставьте заявку и мы свяжемся с вами в течение часа. Работаем понедельник–пятница с 8:00 до 18:00.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">1</div>
                  Оставьте заявку с описанием проблемы
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">2</div>
                  Мы свяжемся и согласуем время
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">3</div>
                  Приедьте на сервис и получите результат
                </div>
              </div>
            </div>
            <div className="bg-white/10 border border-border rounded-sm p-8">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
