import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Award, Users, Wrench, ShieldCheck, Clock, ChevronRight, ArrowRight } from 'lucide-react'

const team = [
  {
    name: 'Алексей Морозов',
    role: 'Главный механик',
    exp: '18 лет опыта',
    spec: 'Двигатели и трансмиссии',
  },
  {
    name: 'Дмитрий Власов',
    role: 'Специалист по электрике',
    exp: '12 лет опыта',
    spec: 'Электронные системы, диагностика',
  },
  {
    name: 'Сергей Никитин',
    role: 'Мастер кузовного цеха',
    exp: '15 лет опыта',
    spec: 'Кузовной ремонт, покраска',
  },
  {
    name: 'Олег Степанов',
    role: 'Мастер-приёмщик',
    exp: '10 лет опыта',
    spec: 'Консультации, контроль качества',
  },
]

const milestones = [
  { year: '2003', text: 'Основание компании ЛМС-АВТО как специализированного сервиса японских автомобилей.' },
  { year: '2010', text: 'Открытие второй площадки. Расширение штата до 15 специалистов.' },
  { year: '2016', text: 'Открытие специализированного кузовного цеха с современной покрасочной камерой.' },
  { year: '2020', text: 'Расширение до третьей площадки. Переход на обслуживание всех марок автомобилей.' },
  { year: '2024', text: 'Более 5000 довольных клиентов. Обновление парка диагностического оборудования.' },
]

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

      {/* Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-team.jpg"
            alt="Команда Авто33"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">О нас</span>
          </div>
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3">ЛМС-АВТО с 2003 года</p>
          <h1 className="text-5xl sm:text-6xl font-black text-foreground text-balance max-w-2xl">
            Кто мы <br />
            <span className="text-primary">и что нас отличает</span>
          </h1>
        </div>
      </section>

      {/* Main story */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3">Наша история</p>
              <h2 className="text-4xl font-black text-foreground mb-6 text-balance">
                Из дилерского центра — в независимый сервис
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Компания ЛМС-АВТО основана в 2003 году специалистами с богатым опытом работы в официальных дилерских центрах. Мы ушли, чтобы предложить клиентам то же качество обслуживания — но по честным ценам без дилерских наценок.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Начав как специализированный сервис японских автомобилей, мы постепенно расширили свои компетенции. Сегодня мы работаем с полным спектром японских и европейских марок: Toyota, Lexus, Honda, Nissan, Mitsubishi, Mazda, Subaru, Ford, Volkswagen и многими другими.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Три современные площадки во Владимире позволяют нам обслуживать клиентов оперативно и без очередей. Парк профессионального оборудования регулярно обновляется.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { n: '20+', l: 'Лет на рынке' },
                  { n: '5000+', l: 'Авто в год' },
                  { n: '3', l: 'Площадки' },
                ].map((s) => (
                  <div key={s.n} className="text-center p-4 bg-white/10 border border-border rounded-sm">
                    <div className="text-3xl font-black text-primary">{s.n}</div>
                    <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/service-bay.jpg"
                alt="Наш сервис"
                width={600}
                height={500}
                className="rounded-sm object-cover w-full aspect-[4/3]"
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

      {/* Timeline */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">История</p>
            <h2 className="text-4xl font-black text-foreground text-balance">Вехи развития</h2>
          </div>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-border" />
            <div className="flex flex-col gap-8">
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-8 items-start">
                  <div className="w-16 shrink-0 flex flex-col items-center gap-2">
                    <span className="text-sm font-black text-primary">{m.year}</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background mt-0.5" />
                  </div>
                  <div className="flex-1 pb-8">
                    <p className="text-muted-foreground leading-relaxed text-sm pt-0.5">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">Люди</p>
            <h2 className="text-4xl font-black text-foreground text-balance">Наша команда</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col p-6 bg-white/10 border border-border rounded-sm text-center">
                <div className="w-16 h-16 rounded-full bg-secondary border border-border flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-muted-foreground" />
                </div>
                <h3 className="font-bold text-foreground text-sm">{member.name}</h3>
                <p className="text-xs text-primary font-medium mt-1 mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.exp}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{member.spec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-primary-foreground mb-4 text-balance">
            Готовы доверить нам свой автомобиль?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Записывайтесь на диагностику — первый осмотр бесплатно. Мы оценим состояние автомобиля и дадим честные рекомендации.
          </p>
          <Link
            href="/contacts#booking"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground text-primary font-bold rounded-sm hover:bg-primary-foreground/90 transition-colors"
          >
            Записаться <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
