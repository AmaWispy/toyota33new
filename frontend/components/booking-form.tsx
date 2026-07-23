'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { PatternFormat } from 'react-number-format'
import { FormConsent } from '@/components/form-consent'
import { getApiBaseUrl } from '@/lib/api'

type FormData = {
  name: string
  phone: string
  service: string
  message: string
  company_fax: string // Honeypot — must stay empty
}

const emptyForm = (): FormData => ({
  name: '',
  phone: '',
  service: '',
  message: '',
  company_fax: '',
})

export function BookingForm({ className }: { className?: string }) {
  const [form, setForm] = useState<FormData>(emptyForm)
  const [formTs, setFormTs] = useState(() => Math.floor(Date.now() / 1000))
  const [submitted, setSubmitted] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [personalData, setPersonalData] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setFormTs(Math.floor(Date.now() / 1000))
  }, [])

  const resetForm = () => {
    setForm(emptyForm())
    setFormTs(Math.floor(Date.now() / 1000))
    setSubmitted(false)
    setError(null)
    setPrivacy(false)
    setPersonalData(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!privacy || !personalData) {
      setError('Необходимо принять Политику конфиденциальности и дать согласие на обработку персональных данных.')
      return
    }
    setIsLoading(true)
    setError(null)

    const apiUrl = getApiBaseUrl()

    try {
      const response = await fetch(`${apiUrl}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ ...form, form_ts: formTs }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else if (response.status === 429) {
        setError('Слишком много заявок. Попробуйте позже.')
      } else {
        setError('Произошла ошибка при отправке заявки. Попробуйте позже.')
      }
    } catch {
      setError('Ошибка сети. Проверьте подключение.')
    } finally {
      setIsLoading(false)
    }
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
          Ваш запрос будет обработан в течение рабочего дня. Мы свяжемся с вами по телефону.
        </p>
        <button
          onClick={resetForm}
          className="text-sm text-primary hover:underline mt-2"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn('relative flex flex-col gap-4', className)}>
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
            disabled={isLoading}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-4 py-3 bg-white/10 border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
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
            disabled={isLoading}
            onValueChange={(values) => setForm({ ...form, phone: values.value })}
            className="px-4 py-3 bg-white/10 border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Вид работ
        </label>
        <select
          value={form.service}
          disabled={isLoading}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="px-4 py-3 bg-white/10 border border-border rounded-sm text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors [&>option]:bg-[#1a1a1a] [&>option]:text-white disabled:opacity-50"
        >
          <option value="">Выберите услугу...</option>
          <option>Техническое обслуживание (ТО)</option>
          <option>Диагностика двигателя</option>
          <option>Ремонт трансмиссии</option>
          <option>Ремонт ходовой части</option>
          <option>Кузовной ремонт</option>
          <option>Диагностика и заправка кондиционера</option>
          <option>Шиномонтаж и балансировка</option>
          <option>Другое</option>
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Комментарий
        </label>
        <textarea
          rows={3}
          placeholder="Опишите проблему..."
          value={form.message}
          disabled={isLoading}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="px-4 py-3 bg-white/10 border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none disabled:opacity-50"
        />
      </div>

      <FormConsent
        idPrefix="booking"
        privacy={privacy}
        personalData={personalData}
        onPrivacyChange={setPrivacy}
        onPersonalDataChange={setPersonalData}
        disabled={isLoading}
      />

      {/* Honeypot — off-screen, not display:none */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      >
        <label htmlFor="booking-company-fax">Company fax</label>
        <input
          id="booking-company-fax"
          type="text"
          name="company_fax"
          value={form.company_fax}
          onChange={(e) => setForm({ ...form, company_fax: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {error && (
        <p className="text-xs text-red-500 font-medium">
          {error}
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        * — поля обязательные к заполнению. Запрос обрабатывается в течение рабочего дня Пн–Пт с 9:00 до 18:00.
      </p>
      <button
        type="submit"
        disabled={isLoading || !privacy || !personalData}
        className="w-full py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:bg-primary/90 transition-colors tracking-wide uppercase disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading ? 'Отправка...' : 'Записаться на ремонт'}
      </button>
    </form>
  )
}
