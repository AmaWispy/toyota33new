'use client'

import Link from 'next/link'

type FormConsentProps = {
  privacy: boolean
  personalData: boolean
  onPrivacyChange: (checked: boolean) => void
  onPersonalDataChange: (checked: boolean) => void
  disabled?: boolean
  idPrefix?: string
}

export function FormConsent({
  privacy,
  personalData,
  onPrivacyChange,
  onPersonalDataChange,
  disabled,
  idPrefix = 'form',
}: FormConsentProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-snug text-muted-foreground">
        <input
          id={`${idPrefix}-privacy`}
          type="checkbox"
          required
          checked={privacy}
          disabled={disabled}
          onChange={(e) => onPrivacyChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
        />
        <span>
          Я ознакомлен(-а) с{' '}
          <Link
            href="/privacy"
            prefetch={false}
            target="_blank"
            className="text-primary underline-offset-2 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            Политикой конфиденциальности
          </Link>
          <span className="text-primary"> *</span>
        </span>
      </label>

      <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-snug text-muted-foreground">
        <input
          id={`${idPrefix}-personal-data`}
          type="checkbox"
          required
          checked={personalData}
          disabled={disabled}
          onChange={(e) => onPersonalDataChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
        />
        <span>
          Я даю согласие на{' '}
          <Link
            href="/personal-data"
            prefetch={false}
            target="_blank"
            className="text-primary underline-offset-2 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            обработку персональных данных
          </Link>
          <span className="text-primary"> *</span>
        </span>
      </label>

      <p className="text-xs leading-snug text-muted-foreground/80">
        Формы защищены{' '}
        <a
          href="https://yandex.ru/legal/smartcaptcha_notice"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline-offset-2 hover:underline"
        >
          Yandex SmartCaptcha
        </a>
      </p>
    </div>
  )
}
