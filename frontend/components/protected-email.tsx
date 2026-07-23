'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/** Parts only — full address is assembled in the browser after mount. */
function assembleEmail() {
  const local = ['j', '-', 'car', '33'].join('')
  const domain = ['yandex', '.', 'ru'].join('')
  return `${local}@${domain}`
}

type ProtectedEmailProps = {
  className?: string
  /** Shown until the address is revealed (~1s after mount). */
  label?: string
}

/**
 * Keeps the email out of the initial static HTML.
 * After ~1s shows a normal mailto link with the assembled address.
 */
export function ProtectedEmail({ className, label = 'Написать' }: ProtectedEmailProps) {
  const [email, setEmail] = useState('')

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setEmail(assembleEmail())
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [])

  if (!email) {
    return <span className={cn(className)}>{label}</span>
  }

  return (
    <a href={`mailto:${email}`} className={cn(className)}>
      {email}
    </a>
  )
}
