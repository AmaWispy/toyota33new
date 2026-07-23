/**
 * Backend base URL for bookings and chat.
 * Prefer NEXT_PUBLIC_API_URL; otherwise resolve by current hostname.
 */
export function getApiBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL
  if (fromEnv) return fromEnv.replace(/\/$/, '')

  if (typeof window === 'undefined') {
    return 'http://localhost:8000'
  }

  const host = window.location.hostname

  if (host === 'toyota33.com' || host === 'www.toyota33.com') {
    return 'https://api.toyota33.com'
  }

  if (host === 'toyota.ameliq.ru') {
    return 'https://toyota-admin.ameliq.ru'
  }

  return 'http://localhost:8000'
}
