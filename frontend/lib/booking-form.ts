export const BOOKING_LIMITS = {
  name: { min: 2, max: 80 },
  message: { min: 0, max: 1500 },
  partsMessage: { min: 5, max: 1500 },
  email: { max: 255 },
  contactOther: { min: 2, max: 120 },
} as const

export const CONTACT_METHODS = [
  { value: 'phone', label: 'Телефон' },
  { value: 'max', label: 'Макс' },
  { value: 'email', label: 'Email' },
  { value: 'other', label: 'Другое' },
] as const

export type ContactMethod = (typeof CONTACT_METHODS)[number]['value']

export function usesPhoneField(method: ContactMethod) {
  return method === 'phone' || method === 'max'
}

export function contactMethodLabel(method: string) {
  return CONTACT_METHODS.find((item) => item.value === method)?.label ?? 'Телефон'
}

const SPAM_MARKERS = ['http', '://', 't.me'] as const

export const SPAM_LINK_ERROR =
  'Ссылки в заявке запрещены. Уберите адреса вида http, t.me и отправьте заявку без них.'

export function containsSpamLinks(...values: Array<string | undefined | null>) {
  const haystack = values.filter(Boolean).join(' ').toLowerCase()
  return SPAM_MARKERS.some((marker) => haystack.includes(marker))
}
