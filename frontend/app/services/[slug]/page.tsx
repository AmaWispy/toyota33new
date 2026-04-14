import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { BookingForm } from '@/components/booking-form'
import { 
  Wrench, Zap, Settings, Gauge, Thermometer, Disc, 
  ChevronRight, ShieldCheck, Clock, Award, CheckCircle2 
} from 'lucide-react'

const servicesData = {
  maintenance: {
    icon: Wrench,
    title: 'Регламентные работы (ТО)',
    desc: 'Техническое обслуживание для любых марок автомобилей. Используем оригинальные масла, фильтры и расходные материалы.',
    image: '/images/maintenance-detail.jpg',
    items: [
      'ТО-1, ТО-2, ТО-3 и последующие',
      'Замена масла и фильтров',
      'Замена свечей зажигания',
      'Проверка и замена ремней ГРМ',
      'Проверка и регулировка тормозов',
      'Проверка ходовой части',
    ],
    details: 'Регулярное техническое обслуживание — залог долгой и безотказной работы вашего автомобиля. Мы проводим регламентные работы в строгом соответствии с требованиями производителей, используя только проверенные расходные материалы.',
    features: [
      { title: 'Сервисная книжка', desc: 'Отмечаем все выполненные работы, сохраняя историю обслуживания.' },
      { title: 'Контроль жидкостей', desc: 'Проверяем уровень и состояние всех технических жидкостей.' },
      { title: 'Диагностика в подарок', desc: 'При прохождении полного ТО — осмотр ходовой части бесплатно.' }
    ]
  },
  engine: {
    icon: Zap,
    title: 'Двигатель и его системы',
    desc: 'Диагностика, капитальный и текущий ремонт двигателей японских и европейских автомобилей.',
    image: '/images/engine-detail.jpg',
    items: [
      'Компьютерная диагностика',
      'Ремонт головки блока цилиндров',
      'Капитальный ремонт двигателя',
      'Замена прокладок и сальников',
      'Ремонт системы охлаждения',
      'Ремонт топливной системы',
    ],
    details: 'Двигатель — сердце автомобиля. Мы обладаем всем необходимым оборудованием для глубокой диагностики и качественного ремонта силовых агрегатов любой сложности, от замены свечей до полного капитального ремонта.',
    features: [
      { title: 'Эндоскопия', desc: 'Осмотр цилиндров двигателя без разбора для точной оценки состояния.' },
      { title: 'Чистка форсунок', desc: 'Восстановление заводских параметров распыла топлива.' },
      { title: 'Гарантия на работы', desc: 'Предоставляем расширенную гарантию на капитальный ремонт.' }
    ]
  },
  transmission: {
    icon: Settings,
    title: 'Трансмиссия',
    desc: 'Ремонт всех видов трансмиссий: МКПП, АКПП, роботизированные КПП, вариаторы CVT.',
    image: '/images/transmission-detail.jpg',
    items: [
      'Ремонт МКПП',
      'Ремонт АКПП',
      'Ремонт вариатора CVT',
      'Замена сцепления',
      'Ремонт раздаточных коробок',
      'Ремонт карданных валов и мостов',
    ],
    details: 'Мы специализируемся на обслуживании сложных систем трансмиссии. Независимо от типа вашей КПП, наши специалисты проведут точную диагностику и качественное восстановление узла.',
    features: [
      { title: 'Аппаратная замена масла', desc: 'Полная замена жидкости в АКПП и вариаторах.' },
      { title: 'Адаптация КПП', desc: 'Программная настройка работы трансмиссии после ремонта.' },
      { title: 'Запчасти в наличии', desc: 'Основные комплекты сцепления и фильтры всегда на складе.' }
    ]
  },
  chassis: {
    icon: Gauge,
    title: 'Ходовая часть',
    desc: 'Диагностика и ремонт подвески, рулевого управления и тормозной системы.',
    image: '/images/chassis-detail.jpg',
    items: [
      'Замена амортизаторов',
      'Замена шаровых и рычагов',
      'Ремонт рулевой рейки',
      'Замена ступичных подшипников',
      'Ремонт тормозной системы',
      'Компьютерный развал-схождение',
    ],
    details: 'Исправная ходовая часть — это ваша безопасность и комфорт на дороге. Мы проводим тщательную диагностику всех узлов подвески и используем только надежные комплектующие.',
    features: [
      { title: '3D Развал-схождение', desc: 'Высокоточная настройка углов установки колес.' },
      { title: 'Проверка на люфты', desc: 'Использование диагностического оборудования для выявления скрытых проблем.' },
      { title: 'Срочный ремонт', desc: 'Быстрая замена расходников подвески в день обращения.' }
    ]
  },
  ac: {
    icon: Thermometer,
    title: 'Кондиционер',
    desc: 'Диагностика, заправка и ремонт систем кондиционирования и климат-контроля.',
    image: '/images/ac-detail.jpg',
    items: [
      'Диагностика системы',
      'Заправка фреоном',
      'Ремонт компрессора',
      'Замена радиатора кондиционера',
      'Дезинфекция кондиционера',
      'Дезинфекция салона',
    ],
    details: 'Комфортный климат в салоне важен в любое время года. Мы не просто заправляем фреон, но и проверяем систему на герметичность, а также проводим антибактериальную обработку.',
    features: [
      { title: 'Поиск утечек', desc: 'Использование ультрафиолетового детектора для поиска микротрещин.' },
      { title: 'Озонирование', desc: 'Полное удаление неприятных запахов и бактерий из салона.' },
      { title: 'Ремонт трубок', desc: 'Восстановление алюминиевых магистралей системы кондиционирования.' }
    ]
  },
  tires: {
    icon: Disc,
    title: 'Шиномонтаж и балансировка',
    desc: 'Шиномонтаж, балансировка колёс, ремонт шин. Сезонное хранение.',
    image: '/images/tires-detail.jpg',
    items: [
      'Монтаж и демонтаж шин',
      'Балансировка колёс',
      'Ремонт проколов',
      'Замена вентилей',
      'Сезонная замена колёс',
      'Сезонное хранение шин',
    ],
    details: 'Профессиональный шиномонтаж на современном оборудовании. Мы гарантируем точность балансировки и бережное отношение к вашим дискам.',
    features: [
      { title: 'Хранение шин', desc: 'Соблюдение температурного режима и правильного положения.' },
      { title: 'Чистка дисков', desc: 'Обязательная очистка посадочных мест перед балансировкой.' },
      { title: 'Герметизация бортов', desc: 'Использование специальных составов для исключения травления воздуха.' }
    ]
  }
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }))
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const service = servicesData[slug as keyof typeof servicesData]

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-primary transition-colors">Услуги</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{service.title}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary/20 flex items-center justify-center rounded-sm">
              <service.icon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs font-medium text-primary uppercase tracking-widest">Профессиональный сервис</p>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground text-balance max-w-3xl mb-6">
            {service.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {service.desc}
          </p>
        </div>
      </section>

      {/* Details & Items */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Что входит в услугу</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.items.map((item) => (
                  <div key={item} className="flex items-center gap-3 p-4 bg-white/10 border border-border rounded-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm text-foreground/90">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-8 bg-card border border-border rounded-sm">
                <h3 className="text-xl font-bold text-foreground mb-4">Особенности работы</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.details}
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-8 bg-primary rounded-sm text-primary-foreground">
                <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">Почему выбирают нас</h3>
                <div className="space-y-6">
                  {service.features.map((feature) => (
                    <div key={feature.title} className="flex flex-col gap-1">
                      <div className="font-bold flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 opacity-80" />
                        {feature.title}
                      </div>
                      <div className="text-sm opacity-80 leading-relaxed">{feature.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white/10 border border-border rounded-sm flex flex-col items-center text-center gap-2">
                  <Clock className="w-6 h-6 text-primary" />
                  <div className="text-xs font-bold uppercase tracking-widest">Срок исполнения</div>
                  <div className="text-sm text-muted-foreground">от 1 часа</div>
                </div>
                <div className="p-6 bg-white/10 border border-border rounded-sm flex flex-col items-center text-center gap-2">
                  <Award className="w-6 h-6 text-primary" />
                  <div className="text-xs font-bold uppercase tracking-widest">Гарантия</div>
                  <div className="text-sm text-muted-foreground">до 1 года</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-24 bg-card border-t border-border" id="booking">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">Онлайн запись</p>
              <h2 className="text-4xl font-black text-foreground mb-6">
                Запишитесь на<br /> {service.title.toLowerCase()}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Оставьте ваши контактные данные, и наш мастер-приемщик свяжется с вами для уточнения деталей и записи на удобное время.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Бесплатная консультация мастера
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Расчет стоимости запчастей и работ
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Подбор удобного времени заезда
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
