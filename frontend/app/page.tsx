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
    desc: 'КПП, АКПП, робот, вариатор, сцепление, раздаточные коробки, прочие узлы и агрегаты.',
    href: '/services/transmission',
  },
]

const advantages = [
  { number: '10+', label: 'Лет опыта' },
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

      {/* Hero — Page Banner */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[65px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-banner.jpg"
            alt="тойота33 — профессиональный автосервис"
            fill
            priority
            loading="eager"
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 flex w-full flex-1 flex-col justify-between px-4 pb-16 pt-16 sm:px-10 lg:pl-40 lg:pr-8 lg:pb-[120px] lg:pt-[100px]">
          <div className="flex max-w-[760px] flex-col gap-[62px]">
            <div className="inline-flex w-fit items-center gap-2 rounded-[2px] border border-white/30 bg-white/30 px-3 py-[7px]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
              <span className="text-xs font-medium leading-none tracking-wide text-white">
                Профессиональный автосервис — все марки
              </span>
            </div>

            <div className="relative">
              {/* White title underlay — from left page edge */}
              <div
                aria-hidden
                className="hero-title-bg pointer-events-none absolute top-1/2 left-[calc(50%-50vw)] z-0 -translate-y-1/2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-title-bg.png"
                  alt=""
                  className="h-full w-full object-fill object-left"
                />
              </div>
              <h1 className="relative z-10 text-4xl font-black leading-[1.1] tracking-tight text-[#030303] sm:text-5xl lg:text-[72px]">
                <span className="block whitespace-nowrap">Ваш автомобиль</span>
                <span className="block whitespace-nowrap">
                  <span className="text-primary">в надёжных</span> руках
                </span>
              </h1>
            </div>

            <p className="max-w-[535px] text-base leading-relaxed text-white sm:text-lg">
              Более 10 лет мы обслуживаем японские и европейские автомобили. Сертифицированные
              специалисты, оригинальные запчасти, честные цены.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/contacts#booking"
              prefetch={false}
              className="inline-flex h-[54px] items-center gap-2 rounded-[2px] bg-white px-6 text-sm font-semibold text-[#030303] shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-90"
            >
              Записаться на ремонт
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              prefetch={false}
              className="inline-flex h-[54px] items-center gap-2 rounded-[2px] border border-[#1a1a1a] px-6 text-sm font-medium text-[#eef0f0] transition-colors hover:border-white/40 hover:text-white"
            >
              Все услуги
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {advantages.map((item) => (
              <div key={item.number} className="text-center">
                <div className="text-4xl font-black text-black">{item.number}</div>
                <div className="text-sm font-medium text-black/70 mt-1 uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <BrandsMarquee />

      {/* Services */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">Что мы делаем</p>
            <h2 className="text-4xl font-black text-foreground text-balance sm:text-5xl">Наши услуги</h2>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="mb-4 flex justify-end">
              <Link
                href="/services"
                prefetch={false}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Все услуги <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  prefetch={false}
                  className="group flex w-full max-w-sm flex-col items-center rounded-sm border border-border bg-white/10 p-6 text-center transition-all duration-300 hover:border-primary/40 hover:bg-white/30 sm:max-w-none"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-sm bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2 font-bold text-foreground text-balance">{service.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{service.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Подробнее <ChevronRight className="h-3 w-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About — Альтернатива дилерскому сервису */}
      <section className="relative min-h-[520px] overflow-hidden border-y border-[#1a1a1a] bg-[#0f0f0f] lg:min-h-[622px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-banner.jpg"
            alt="Автосервис тойота33"
            fill
            className="object-cover object-left"
            sizes="100vw"
          />
        </div>

        {/* Dark gradient R→L under 1680px — keeps white text readable over the photo */}
        <div
          aria-hidden
          className="about-banner-gradient pointer-events-none absolute inset-0 z-[1]"
        />

        <div className="relative z-10 flex min-h-[520px] w-full flex-col justify-center lg:min-h-[622px] lg:items-end">
          <div className="flex w-full flex-col gap-6 bg-primary px-4 pb-[140px] pt-16 text-right sm:px-10 lg:w-[46%] lg:max-w-[888px] lg:bg-transparent lg:gap-6 lg:py-12 lg:pl-10 lg:pr-40 lg:pb-12">
            <div className="flex flex-col gap-3 lg:pr-0">
              <p className="text-xs font-medium uppercase tracking-widest text-white min-[1680px]:text-[#030303]">
                О компании
              </p>
              <h2 className="text-3xl font-black leading-tight text-white text-balance sm:text-4xl lg:text-5xl">
                Альтернатива дилерскому сервису
              </h2>
            </div>

            <p className="ml-auto max-w-[722px] text-sm leading-relaxed text-white sm:text-base">
              Начав как специализированный сервис Toyota-Lexus, мы расширили компетенции до полного спектра японских и
              европейских марок. Наши механики прошли обучение в официальных дилерских центрах и знают особенности
              каждого автомобиля.
            </p>

            <p className="ml-auto max-w-[642px] text-sm leading-relaxed text-white sm:text-base">
              Мы предлагаем качество дилерского обслуживания по честным ценам без лишних наценок. Всё оборудование и
              инструмент соответствуют требованиям производителей.
            </p>

            <div className="flex justify-end pt-2">
              <Link
                href="/about"
                prefetch={false}
                className="inline-flex h-12 items-center gap-2 rounded-[2px] border border-[#1a1a1a] px-6 text-sm font-semibold text-white transition-colors hover:border-white/40"
              >
                Узнать больше о нас
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 10+ badge */}
        <div className="absolute bottom-0 left-0 z-20 flex h-[116px] w-[172px] flex-col items-center justify-center rounded-tr-[2px] bg-primary text-primary-foreground">
          <div className="text-3xl font-black leading-none">10+</div>
          <div className="mt-1 text-xs font-medium uppercase tracking-wider">лет опыта</div>
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
                Оставьте заявку и мы свяжемся с вами в течение часа. Работаем понедельник–пятница с 9:00 до 18:00.
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
