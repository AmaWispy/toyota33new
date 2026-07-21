import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageBanner } from '@/components/page-banner'
import { Award, Users, Wrench, ShieldCheck, Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'О компании',
  description:
    'История ЛМС-АВТО и автосервиса Тойота33 во Владимире: от специализации Toyota–Lexus до обслуживания всех марок. Команда, этапы развития, оборудование и подход к ремонту.',
}

const values = [
  { icon: Award, title: 'Экспертиза', desc: 'Наши механики — выпускники официальных дилерских центров с сертификатами производителей.' },
  { icon: ShieldCheck, title: 'Честность', desc: 'Прозрачная диагностика, фотоотчёт о состоянии автомобиля, никаких навязанных работ.' },
  { icon: Clock, title: 'Пунктуальность', desc: 'Всегда соблюдаем согласованные сроки. Если нужно больше времени — предупреждаем заранее.' },
  { icon: Wrench, title: 'Качество', desc: 'Только оригинальные или сертифицированные запчасти. Гарантия на все виды работ.' },
  { icon: Users, title: 'Клиентоориентированность', desc: 'Объясняем простым языком что и почему нужно сделать. Работаем в интересах клиента.' },
  { icon: ShieldCheck, title: 'Гарантия', desc: 'Предоставляем письменную гарантию на все выполненные работы и установленные запчасти.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <PageBanner
        image="/images/about-team.jpg"
        imageAlt="Команда тойота33"
        eyebrow="Тойота33 с 2016 года"
        title={
          <>
            Кто мы
            <br />
            <span className="text-primary">и что нас отличает</span>
          </>
        }
        crumbs={[
          { label: 'Главная', href: '/' },
          { label: 'О нас' },
        ]}
      />

      {/* Main story */}
      <section className="relative overflow-hidden py-24 lg:min-h-[766px] lg:py-[97px]">
        <div className="absolute inset-0 z-0 bg-[#030303]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about-story-bg.svg"
            alt=""
            className="h-full w-full object-cover object-left"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-widest text-primary">Наша история</p>
              <h2 className="text-4xl font-black leading-tight text-balance text-[#eef0f0]">
                Из дилерского центра — в независимый сервис
              </h2>
              <p className="mt-3 leading-relaxed text-white">
                Наша компания основана в 2016 году специалистами с богатым опытом работы в официальных дилерских центрах. Мы ушли, чтобы предложить клиентам то же качество обслуживания — но по честным ценам без дилерских наценок.
              </p>
              <p className="leading-relaxed text-white">
                Начав как специализированный сервис японских автомобилей, мы постепенно расширили свои компетенции. Сегодня мы работаем с полным спектром японских и европейских марок: Toyota, Lexus, Honda, Nissan, Mitsubishi, Mazda, Subaru, Ford, Volkswagen и многими другими.
              </p>
              <p className="mb-5 leading-relaxed text-white">
                Две современные площадки во Владимире позволяют нам обслуживать клиентов оперативно и без очередей.
              </p>
              <div className="flex flex-wrap gap-5">
                <div className="flex h-[90px] min-w-[140px] flex-1 flex-col items-center justify-center rounded-[2px] border border-[#1b1b1b] bg-white px-4 text-center">
                  <div className="text-3xl font-black text-[#070707]">10+</div>
                  <div className="mt-1 text-xs text-[#070707]">Лет на рынке</div>
                </div>
                <div className="flex h-[90px] min-w-[140px] flex-1 flex-col items-center justify-center rounded-[2px] border border-[#1b1b1b] bg-white px-4 text-center">
                  <div className="text-3xl font-black text-[#070707]">5000+</div>
                  <div className="mt-1 text-xs text-[#070707]">Авто в год</div>
                </div>
                <Link
                  href="/interesting"
                  prefetch={false}
                  className="relative h-[90px] w-full shrink-0 rounded-[2px] border border-[#111] transition-colors hover:border-primary/50 sm:w-[241px]"
                >
                  <div className="absolute top-[17px] left-[13px] w-[186px] text-center">
                    <div className="text-[30px] font-black leading-9 text-[#f8f8f8]">Интересное</div>
                  </div>
                  <div className="absolute top-[54px] left-[18px] w-[175px] text-center text-[15px] leading-4 text-[#f8f8f8]">
                    в повседневной работе
                  </div>
                  <ArrowRight className="absolute top-1/2 right-3 h-[25px] w-[25px] -translate-y-1/2 text-white" strokeWidth={1.33} />
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/service-bay.jpg"
                alt="Наш сервис"
                width={576}
                height={432}
                className="aspect-[4/3] w-full rounded-[2px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">Наши принципы</p>
            <h2 className="text-4xl font-black text-foreground text-balance">Ценности компании</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4 p-6 bg-white/10 border border-border rounded-sm">
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-sm shrink-0 mt-0.5">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1.5">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0f0f0f] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-4xl font-black text-balance text-[#f8f8f8]">
            Готовы доверить нам свой автомобиль?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-[#f8f8f8]/80">
            Записывайтесь на диагностику — первый осмотр бесплатно. Мы оценим состояние автомобиля и дадим честные рекомендации.
          </p>
          <Link
            href="/contacts#booking"
            prefetch={false}
            className="inline-flex items-center gap-2 rounded-[2px] bg-primary px-8 py-4 font-bold text-white transition-colors hover:bg-primary/90"
          >
            Записаться <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
