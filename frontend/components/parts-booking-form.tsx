'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { PatternFormat } from 'react-number-format'
import { FormConsent } from '@/components/form-consent'
import { getApiBaseUrl } from '@/lib/api'
import {
  BOOKING_LIMITS,
  SPAM_LINK_ERROR,
  containsSpamLinks,
} from '@/lib/booking-form'

type FormData = {
  name: string
  phone: string
  message: string
  company_fax: string // Honeypot — must stay empty
}

const emptyForm = (): FormData => ({
  name: '',
  phone: '',
  message: '',
  company_fax: '',
})

export function PartsBookingForm({ className }: { className?: string }) {
  const [form, setForm] = useState<FormData>(emptyForm)
  const [formTs, setFormTs] = useState(() => Math.floor(Date.now() / 1000))
  const [submitted, setSubmitted] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [personalData, setPersonalData] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const spamDetected = containsSpamLinks(form.name, form.message)

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
    if (form.name.trim().length < BOOKING_LIMITS.name.min) {
      setError(`Укажите имя — минимум ${BOOKING_LIMITS.name.min} символа.`)
      return
    }
    if (form.phone.replace(/\D/g, '').length < 10) {
      setError('Укажите полный номер телефона.')
      return
    }
    if (form.message.trim().length < BOOKING_LIMITS.partsMessage.min) {
      setError(`Опишите запчасти или VIN — минимум ${BOOKING_LIMITS.partsMessage.min} символов.`)
      return
    }
    if (containsSpamLinks(form.name, form.message)) {
      setError(SPAM_LINK_ERROR)
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
        body: JSON.stringify({
          ...form,
          form_ts: formTs,
          service: 'Заказ запчастей',
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else if (response.status === 429) {
        setError('Слишком много заявок. Попробуйте позже.')
      } else {
        const data = await response.json().catch(() => null)
        setError(
          typeof data?.error === 'string'
            ? data.error
            : 'Произошла ошибка при отправке заявки. Попробуйте позже.',
        )
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
          Ваш запрос на запчасти будет обработан в течение рабочего дня. Мы свяжемся с вами для уточнения деталей и стоимости.
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
            minLength={BOOKING_LIMITS.name.min}
            maxLength={BOOKING_LIMITS.name.max}
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
          Список запчастей / VIN код
        </label>
        <textarea
          rows={4}
          required
          minLength={BOOKING_LIMITS.partsMessage.min}
          maxLength={BOOKING_LIMITS.partsMessage.max}
          placeholder="Напишите список необходимых запчастей или VIN номер автомобиля для точного подбора..."
          value={form.message}
          disabled={isLoading}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="px-4 py-3 bg-white/10 border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none disabled:opacity-50"
        />
        <p className="text-right text-[11px] text-muted-foreground">
          {form.message.length}/{BOOKING_LIMITS.partsMessage.max}
        </p>
      </div>

      <FormConsent
        idPrefix="parts"
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
        <label htmlFor="parts-company-fax">Company fax</label>
        <input
          id="parts-company-fax"
          type="text"
          name="company_fax"
          value={form.company_fax}
          onChange={(e) => setForm({ ...form, company_fax: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {spamDetected ? (
        <p className="text-xs font-medium text-red-500">{SPAM_LINK_ERROR}</p>
      ) : error ? (
        <p className="text-xs font-medium text-red-500">{error}</p>
      ) : null}
      <p className="text-xs text-muted-foreground">
        * — поля обязательные к заполнению. Заявки обрабатываются в течение рабочего дня Пн–Пт с 9:00 до 18:00.
      </p>
      <button
        type="submit"
        disabled={isLoading || !privacy || !personalData || spamDetected}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-primary py-3.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? 'Отправка...' : 'Заказать запчасти'}
      </button>
    </form>
  )
}