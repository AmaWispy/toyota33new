'use client'

import { useEffect, useState } from 'react'

const brands = [
  'Toyota', 'Lexus', 'Honda', 'Nissan', 'Mitsubishi',
  'Mazda', 'Subaru', 'Suzuki', 'Ford', 'Hyundai',
  'Kia', 'Renault', 'Volkswagen', 'Skoda',
]

export function BrandsMarquee() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  // Дублируем бренды для бесконечного эффекта
  const displayBrands = [...brands, ...brands, ...brands]

  return (
    <div className="w-full overflow-hidden bg-card border-y border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest text-center mb-8">
          Обслуживаем все популярные марки
        </p>
        
        <div className="relative overflow-hidden">
          {/* Маска слева и справа для плавного исчезновения */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

          {/* Бесконечный слайдер */}
          <style>{`
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-${100 / 3}%);
              }
            }
            .marquee-track {
              display: flex;
              animation: marquee 30s linear infinite;
              width: 300%;
            }
            .marquee-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="marquee-track">
            {displayBrands.map((brand, idx) => (
              <div
                key={`${brand}-${idx}`}
                className="flex-shrink-0 px-3 sm:px-4 lg:px-6 flex items-center justify-center"
              >
                <span className="text-sm sm:text-base lg:text-xl font-bold text-foreground/80 whitespace-nowrap hover:text-foreground transition-colors cursor-default">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
