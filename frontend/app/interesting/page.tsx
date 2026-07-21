import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Интересное',
  description:
    'Интересные работы из повседневной практики автосервиса Тойота33 во Владимире. Скоро здесь появятся кейсы и фото.',
}

export default function InterestingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#030303]">
      <Navbar />

      <main className="flex flex-1 flex-col items-center justify-center px-4 pt-[65px] text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-primary">
          В разработке
        </p>
        <h1 className="max-w-xl text-3xl font-black tracking-tight text-[#f8f8f8] sm:text-4xl">
          Здесь будут появляться интересные работы
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
          Скоро расскажем о нестандартных случаях из нашей повседневной практики — пока страница готовится.
        </p>
      </main>

      <Footer />
    </div>
  )
}
