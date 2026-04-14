import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PartsBookingForm } from '@/components/parts-booking-form'
import { ChevronRight, PackageCheck, Truck, BadgeCheck, Layers } from 'lucide-react'

const categories = [
  {
    title: 'Фильтры',
    items: ['Масляный фильтр', 'Воздушный фильтр', 'Топливный фильтр', 'Фильтр салона', 'Фильтр АКПП'],
  },
  {
    title: 'Расходные материалы',
    items: ['Масло двигателя (оригинал/Castrol)', 'Антифриз и охлаждающие жидкости', 'Тормозная жидкость', 'Масло для АКПП / вариатора', 'Масло для МКПП'],
  },
  {
    title: 'Тормозная система',
    items: ['Тормозные колодки', 'Тормозные диски', 'Тормозные барабаны', 'Суппорта и цилиндры', 'Тормозные шланги и трубки'],
  },
  {
    title: 'Ходовая часть',
    items: ['Амортизаторы', 'Пружины подвески', 'Шаровые опоры', 'Рычаги подвески', 'Стойки и втулки стабилизатора'],
  },
  {
    title: 'Кузов',
    items: ['Фары и фонари', 'Бамперы', 'Крылья и двери', 'Зеркала', 'Замки и петли'],
  },
  {
    title: 'Двигатель',
    items: ['Свечи зажигания NGK/Denso', 'Ремни ГРМ и навесного', 'Ролики и натяжители', 'Прокладки и сальники', 'Помпа водяного насоса'],
  },
  {
    title: 'Электрика',
    items: ['Аккумуляторы Panasonic/Optima', 'Генераторы и стартеры', 'Датчики (ABS, кислородные)', 'Лампы и предохранители', 'Провода и реле'],
  },
  {
    title: 'Шины и диски',
    items: ['Летние и зимние шины', 'Стальные диски', 'Литые диски', 'Колпаки и гайки', 'Вентили и балансировочные грузы'],
  },
]

const advantages = [
  {
    icon: BadgeCheck,
    title: 'Оригинальные запчасти',
    desc: 'Официальные оригинальные запчасти для японских и европейских автомобилей с гарантией производителя.',
  },
  {
    icon: Layers,
    title: 'Качественные аналоги',
    desc: 'Сертифицированные аналоги ведущих производителей: Denso, Aisin, NSK, Valeo, Bosch, KYB.',
  },
  {
    icon: PackageCheck,
    title: 'Большой склад',
    desc: 'Широкий ассортимент в наличии для наиболее популярных японских и европейских моделей.',
  },
  {
    icon: Truck,
    title: 'Быстрый заказ',
    desc: 'Доставка под заказ в кратчайшие сроки. Работаем с проверенными официальными поставщиками.',
  },
]

export default function SparePartsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/spare-parts.jpg"
            alt="Запчасти для автомобилей"
            fill
            priority
            loading="eager"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Запчасти</span>
          </div>
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3">Оригинал и аналоги</p>
          <h1 className="text-5xl sm:text-6xl font-black text-foreground text-balance max-w-2xl">
            Запасные<br />
            <span className="text-primary">части для авто</span>
          </h1>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv) => (
              <div key={adv.title} className="flex flex-col items-start gap-3">
                <adv.icon className="w-6 h-6 text-primary-foreground/80" />
                <h3 className="font-bold text-primary-foreground">{adv.title}</h3>
                <p className="text-sm text-primary-foreground/70 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">Ассортимент</p>
            <h2 className="text-4xl font-black text-foreground text-balance">Категории запчастей</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="p-6 bg-white/10 border border-border rounded-sm hover:border-primary/40 transition-colors"
              >
                <h3 className="font-bold text-foreground mb-4 pb-3 border-b border-border">{cat.title}</h3>
                <ul className="flex flex-col gap-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info block */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">Наши принципы</p>
              <h2 className="text-4xl font-black text-foreground mb-6 text-balance">
                Качество по честной цене
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Мы формируем склад запасных частей с максимальным удовлетворением запросов по цене и качеству. В наличии и под заказ — широкий выбор для всех популярных японских и европейских автомобилей.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Помимо оригинальных запчастей, мы предлагаем качественные аналоги ведущих мировых производителей, которые соответствуют техническим требованиям производителей автомобилей.
              </p>
              <Link
                href="/contacts#booking"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:bg-primary/90 transition-colors"
              >
                Заказать запчасти
              </Link>
            </div>
            <Image
              src="/images/spare-parts.jpg"
              alt="Склад запчастей"
              width={600}
              height={420}
              className="rounded-sm object-cover w-full"
            />
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="py-20 bg-background" id="booking">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">Заказ</p>
              <h2 className="text-4xl font-black text-foreground mb-4 text-balance">
                Заказать запчасти
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Оставьте заявку с указанием модели автомобиля и нужной запчасти — мы уточним наличие и стоимость.
              </p>
            </div>
            <div className="bg-white/10 border border-border rounded-sm p-8">
              <PartsBookingForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
