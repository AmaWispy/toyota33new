export const BOOKING_LIMITS = {
  name: { min: 2, max: 80 },
  message: { min: 0, max: 1500 },
  partsMessage: { min: 5, max: 1500 },
} as const

const SPAM_MARKERS = ['http', '://', 't.me'] as const

export const SPAM_LINK_ERROR =
  'Ссылки в заявке запрещены. Уберите адреса вида http, t.me и отправьте заявку без них.'

export function containsSpamLinks(...values: Array<string | undefined | null>) {
  const haystack = values.filter(Boolean).join(' ').toLowerCase()
  return SPAM_MARKERS.some((marker) => haystack.includes(marker))
}
