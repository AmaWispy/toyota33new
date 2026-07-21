import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export type PageBannerCrumb = {
  label: string
  href?: string
}

type PageBannerProps = {
  image: string
  imageAlt?: string
  eyebrow: string
  title: React.ReactNode
  description?: string
  crumbs: PageBannerCrumb[]
}

export function PageBanner({
  image,
  imageAlt = '',
  eyebrow,
  title,
  description,
  crumbs,
}: PageBannerProps) {
  return (
    <section className="relative flex min-h-[320px] flex-col justify-end overflow-hidden pt-[65px] sm:min-h-[400px] lg:min-h-[465px]">
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Breadcrumbs — above the white underlay */}
      <div className="relative z-20 px-4 pb-4 sm:px-10 lg:pl-40 lg:pr-8">
        <nav className="flex items-center gap-2 text-sm" aria-label="Хлебные крошки">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1
            return (
              <span key={`${crumb.label}-${i}`} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="h-4 w-4 text-[#717171]" />}
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    prefetch={false}
                    className="text-[#717171] transition-colors hover:text-white"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-[#eef0f0]' : 'text-[#717171]'}>{crumb.label}</span>
                )}
              </span>
            )
          })}
        </nav>
      </div>

      {/* Title block with white underlay from left edge */}
      <div className="relative z-10 min-h-[140px] sm:min-h-[180px] lg:min-h-[206px]">
        <div
          aria-hidden
          className="page-title-bg pointer-events-none absolute inset-y-0 left-0 z-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/page-title-bg.svg"
            alt=""
            className="absolute inset-0 block h-full w-full"
          />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-center gap-3 px-4 py-6 sm:px-10 lg:pl-40 lg:pr-8 lg:py-8">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">{eyebrow}</p>
          <h1 className="max-w-[672px] text-4xl font-black leading-[1.1] tracking-tight text-[#030303] sm:text-5xl lg:text-[56px]">
            {title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-sm leading-relaxed text-[#030303]/80 sm:text-base">{description}</p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
