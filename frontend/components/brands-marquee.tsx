'use client'

const brands = [
  'Toyota',
  'Lexus',
  'Honda',
  'Nissan',
  'Mitsubishi',
  'Mazda',
  'Subaru',
  'Suzuki',
  'Ford',
  'Hyundai',
  'Kia',
  'Renault',
  'Volkswagen',
  'Skoda',
]

function BrandRow({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {brands.map((brand) => (
        <div
          key={brand}
          className="flex shrink-0 items-center justify-center px-3 sm:px-4 lg:px-6"
        >
          <span className="cursor-default whitespace-nowrap text-sm font-bold text-foreground/80 transition-colors hover:text-foreground sm:text-base lg:text-xl">
            {brand}
          </span>
        </div>
      ))}
    </div>
  )
}

export function BrandsMarquee() {
  return (
    <div className="w-full overflow-hidden border-y border-border bg-card py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Обслуживаем все популярные марки
        </p>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-12 bg-gradient-to-r from-card to-transparent" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-12 bg-gradient-to-l from-card to-transparent" />

          {/* Два одинаковых ряда: сдвиг ровно на 50% = бесшовный цикл */}
          <div className="brands-marquee-track flex w-max">
            <BrandRow />
            <BrandRow ariaHidden />
          </div>
        </div>
      </div>
    </div>
  )
}
