'use client'

import { PatternFormat } from 'react-number-format'
import {
  BOOKING_LIMITS,
  CONTACT_METHODS,
  type ContactMethod,
  usesPhoneField,
} from '@/lib/booking-form'

const fieldClass =
  'px-4 py-3 bg-white/10 border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50'

type ContactMethodFieldsProps = {
  method: ContactMethod
  phone: string
  email: string
  contactOther: string
  disabled?: boolean
  onMethodChange: (method: ContactMethod) => void
  onPhoneChange: (phone: string) => void
  onEmailChange: (email: string) => void
  onOtherChange: (value: string) => void
}

export function ContactMethodFields({
  method,
  phone,
  email,
  contactOther,
  disabled,
  onMethodChange,
  onPhoneChange,
  onEmailChange,
  onOtherChange,
}: ContactMethodFieldsProps) {
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Удобный способ связи <span className="text-primary">*</span>
        </label>
        <select
          value={method}
          disabled={disabled}
          onChange={(e) => onMethodChange(e.target.value as ContactMethod)}
          className={`${fieldClass} [&>option]:bg-[#1a1a1a] [&>option]:text-white`}
        >
          {CONTACT_METHODS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {usesPhoneField(method) && (
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {method === 'max' ? 'Телефон в Макс' : 'Телефон'} <span className="text-primary">*</span>
          </label>
          <PatternFormat
            required
            format="+7 (###) ###-##-##"
            mask="_"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            disabled={disabled}
            onValueChange={(values) => onPhoneChange(values.value)}
            className={fieldClass}
          />
        </div>
      )}

      {method === 'email' && (
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Email <span className="text-primary">*</span>
          </label>
          <input
            required
            type="email"
            maxLength={BOOKING_LIMITS.email.max}
            placeholder="name@example.com"
            value={email}
            disabled={disabled}
            onChange={(e) => onEmailChange(e.target.value)}
            className={fieldClass}
          />
        </div>
      )}

      {method === 'other' && (
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Как с вами связаться <span className="text-primary">*</span>
          </label>
          <input
            required
            type="text"
            minLength={BOOKING_LIMITS.contactOther.min}
            maxLength={BOOKING_LIMITS.contactOther.max}
            placeholder="Например: Telegram @username"
            value={contactOther}
            disabled={disabled}
            onChange={(e) => onOtherChange(e.target.value)}
            className={fieldClass}
          />
        </div>
      )}
    </>
  )
}
