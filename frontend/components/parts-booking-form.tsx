'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { PatternFormat } from 'react-number-format'

type FormData = {
  name: string
  phone: string
  message: string
}

export function PartsBookingForm({ className }: { className?: string }) {
  const [form, setForm] = useState<FormData>({ name: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-12 text-center gap-4', className)}>
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-foreground">Заявка принята!</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Ваш запрос на запчасти будет обработан в ближайшее время. Мы свяжемся с вами для уточнения деталей и стоимости.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm text-primary hover:underline mt-2"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-4', className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Имя <span className="text-primary">*</span>
          </label>
          <input
            required
            type="text"
            placeholder="Ваше имя"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-4 py-3 bg-white/10 border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Телефон <span className="text-primary">*</span>
          </label>
          <PatternFormat
            required
            format="+7 (###) ###-##-##"
            mask="_"
            placeholder="+7 (___) ___-__-__"
            value={form.phone}
            onValueChange={(values) => setForm({ ...form, phone: values.value })}
            className="px-4 py-3 bg-white/10 border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Список запчастей / VIN код
        </label>
        <textarea
          rows={4}
          required
          placeholder="Напишите список необходимых запчастей или VIN номер автомобиля для точного подбора..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="px-4 py-3 bg-white/10 border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        * — поля обязательные к заполнению. Заявки обрабатываются в рабочее время Пн–Пт с 8:00 до 18:00.
      </p>
      <button
        type="submit"
        className="w-full py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:bg-primary/90 transition-colors tracking-wide uppercase"
      >
        Заказать запчасти
      </button>
    </form>
  )
}
