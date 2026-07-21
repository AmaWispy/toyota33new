import Image from 'next/image'
import Link from 'next/link'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      prefetch={false}
      className={className}
      aria-label="тойота33 — на главную"
    >
      <Image
        src="/logo.svg"
        alt="тойота33"
        width={151}
        height={22}
        className="h-[21px] w-auto"
        priority
      />
    </Link>
  )
}
