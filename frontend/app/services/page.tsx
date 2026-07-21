import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageBanner } from '@/components/page-banner'
import { BookingForm } from '@/components/booking-form'
import {
  Wrench,
  Zap,
  Settings,
  Gauge,
  Thermometer,
  Disc,
  ChevronRight,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Услуги',
  description:
    'Полный спектр работ Тойота33, Владимир: ТО, двигатель и диагностика, трансмиссия, ходовая, кондиционер, шиномонтаж. Оригинальные запчасти, гарантия, онлайн-запись.',
}

const serviceCategories = [
  {
    slug: 'maintenance',
    icon: Wrench,
    title: 'Регламентные работы (ТО)',
    desc: 'Техническое обслуживание любых марок автомобилей. Используем оригинальные и качественные альтернативные масла, фильтры и расходные материалы. Выдаём сервисную книжку.',
    items: [
      'ТО-1, ТО-2, ТО-3 и последующие',
      'Замена масла и фильтров',
      'Замена свечей зажигания',
      'Проверка и замена ремней ГРМ',
      'Проверка и обслуживание тормозной системы',
      'Проверка ходовой части',
    ],
  },
  {
    slug: 'engine',
    icon: Zap,
    title: 'Двигатель и его системы',
    desc: 'Диагностика, капитальный и текущий ремонт двигателей японских и европейских автомобилей. Специализированное компьютерное оборудование позволяет точно определить неисправность.',
    items: [
      'Компьютерная диагностика',
      'Ремонт головки блока цилиндров',
      'Капитальный ремонт двигателя',
      'Замена прокладок и сальников',
      'Ремонт системы охлаждения',
      'Ремонт топливной системы',
    ],
  },
  {
    slug: 'transmission',
    icon: Settings,
    title: 'Трансмиссия',
    desc: 'Ремонт всех видов трансмиссий: МКПП, АКПП, роботизированные КПП, вариаторы CVT, полный привод 4WD/AWD. Работаем со всеми марками.',
    items: [
      'Ремонт МКПП',
      'Ремонт АКПП',
      'Ремонт вариатора CVT',
      'Замена сцепления',
      'Ремонт раздаточных коробок',
      'Ремонт карданных валов и мостов',
    ],
  },
  {
    slug: 'chassis',
    icon: Gauge,
    title: 'Ходовая часть',
    desc: 'Диагностика и ремонт подвески, рулевого управления и тормозной системы.',
    items: [
      'Замена амортизаторов',
      'Замена шаровых и рычагов',
      'Ремонт рулевой рейки',
      'Замена ступичных подшипников',
      'Ремонт тормозной системы',
    ],
  },
  {
    slug: 'ac',
    icon: Thermometer,
    title: 'Кондиционер',
    desc: 'Диагностика, заправка и ремонт систем кондиционирования и климат-контроля. Дезинфекция системы кондиционирования и салона автомобиля.',
    items: [
      'Диагностика системы',
      'Заправка фреоном',
      'Замена радиатора кондиционера',
      'Дезинфекция кондиционера',
      'Дезинфекция салона',
    ],
  },
  {
    slug: 'tires',
    icon: Disc,
    title: 'Шиномонтаж и балансировка',
    desc: 'Шиномонтаж, балансировка колёс, ремонт шин.',
    items: [
      'Монтаж и демонтаж шин',
      'Балансировка колёс',
      'Ремонт проколов',
      'Замена вентилей',
      'Сезонная замена колёс',
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <PageBanner
        image="/images/diagnostics.jpg"
        imageAlt="Диагностика автомобиля"
        eyebrow="Все марки автомобилей"
        title={
          <>
            Все виды
            <br />
            <span className="text-primary">ремонта и ТО</span>
          </>
        }
        crumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Услуги' },
        ]}
      />

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {serviceCategories.map((cat) => (
              <Link
                key={cat.title}
                href={`/services/${cat.slug}`}
                prefetch={false}
                className="flex flex-col p-8 bg-white/10 border border-border rounded-sm hover:border-primary/40 transition-colors group"
              >
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-sm shrink-0 group-hover:bg-primary/20 transition-colors">
                    <cat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{cat.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cat.desc}</p>
                  </div>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center gap-1 text-xs font-medium text-primary">
                  Подробнее <ChevronRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="py-20 bg-card border-t border-border" id="booking">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">Запись</p>
              <h2 className="text-4xl font-black text-foreground mb-4 text-balance">
                Записаться на сервис
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Оставьте заявку — мы перезвоним в течение часа и согласуем удобное время.
              </p>
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
