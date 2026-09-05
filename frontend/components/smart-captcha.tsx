'use client'

import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from 'react'

export const SMARTCAPTCHA_SITEKEY =
  process.env.NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_SITEKEY ??
  'ysc1_yYnIdp3uLqlGPXquayGtaxCEYoVEsMrO1ndeR8JS9aebc2f3'

const SCRIPT_SRC = 'https://smartcaptcha.yandexcloud.net/captcha.js'
const EXECUTE_TIMEOUT_MS = 90_000

type SmartCaptchaApi = {
  render: (container: string | HTMLElement, params: Record<string, unknown>) => number
  execute?: (widgetId?: number) => void
  reset?: (widgetId?: number) => void
  destroy?: (widgetId: number) => void
}

declare global {
  interface Window {
    smartCaptcha?: SmartCaptchaApi
  }
}

let scriptLoading: Promise<void> | null = null

function loadSmartCaptchaScript() {
  if (typeof window === 'undefined') {
    return Promise.resolve()
  }
  if (window.smartCaptcha) {
    return Promise.resolve()
  }
  if (scriptLoading) {
    return scriptLoading
  }

  scriptLoading = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src^="${SCRIPT_SRC}"]`)
    if (existing) {
      if (window.smartCaptcha) {
        resolve()
        return
      }
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('SmartCaptcha script failed')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = `${SCRIPT_SRC}?render=onload`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('SmartCaptcha script failed'))
    document.head.appendChild(script)
  })

  return scriptLoading
}

function waitForSmartCaptcha(timeoutMs = 10000) {
  return new Promise<SmartCaptchaApi>((resolve, reject) => {
    const started = Date.now()
    const tick = () => {
      if (window.smartCaptcha) {
        resolve(window.smartCaptcha)
        return
      }
      if (Date.now() - started > timeoutMs) {
        reject(new Error('SmartCaptcha API timeout'))
        return
      }
      window.setTimeout(tick, 50)
    }
    tick()
  })
}

function readToken(container: HTMLElement | null) {
  if (!container) {
    return ''
  }
  return container.querySelector<HTMLInputElement>('input[name="smart-token"]')?.value ?? ''
}

export type SmartCaptchaHandle = {
  execute: () => Promise<string>
  reset: () => void
}

/**
 * Invisible Yandex SmartCaptcha.
 * @see https://yandex.cloud/ru/docs/smartcaptcha/concepts/invisible-captcha
 */
export const SmartCaptcha = forwardRef<SmartCaptchaHandle>(function SmartCaptcha(_, ref) {
  const rawId = useId()
  const containerId = `captcha-container-${rawId.replace(/:/g, '')}`
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<number | null>(null)
  const pendingRef = useRef<{
    resolve: (token: string) => void
    reject: (error: Error) => void
    timer: number
  } | null>(null)

  const settle = (token: string) => {
    const pending = pendingRef.current
    if (!pending) {
      return
    }
    window.clearTimeout(pending.timer)
    pendingRef.current = null
    if (token) {
      pending.resolve(token)
    } else {
      pending.reject(new Error('captcha failed'))
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    let cancelled = false

    loadSmartCaptchaScript()
      .then(() => waitForSmartCaptcha())
      .then((api) => {
        if (cancelled) {
          return
        }
        widgetIdRef.current = api.render(container, {
          sitekey: SMARTCAPTCHA_SITEKEY,
          hl: 'ru',
          invisible: true,
          hideShield: true,
          callback: (token: string) => settle(token),
          'expired-callback': () => settle(''),
          'error-callback': () => settle(''),
        })
      })
      .catch(() => {
        settle('')
      })

    return () => {
      cancelled = true
      const pending = pendingRef.current
      if (pending) {
        window.clearTimeout(pending.timer)
        pendingRef.current = null
      }
      const widgetId = widgetIdRef.current
      if (widgetId != null) {
        window.smartCaptcha?.reset?.(widgetId)
        window.smartCaptcha?.destroy?.(widgetId)
        widgetIdRef.current = null
      }
    }
  }, [containerId])

  useImperativeHandle(ref, () => ({
    execute: () =>
      new Promise<string>((resolve, reject) => {
        const existing = readToken(containerRef.current)
        if (existing) {
          resolve(existing)
          return
        }

        const widgetId = widgetIdRef.current
        if (widgetId == null || !window.smartCaptcha?.execute) {
          reject(new Error('captcha not ready'))
          return
        }

        if (pendingRef.current) {
          window.clearTimeout(pendingRef.current.timer)
        }

        pendingRef.current = {
          resolve,
          reject,
          timer: window.setTimeout(() => {
            pendingRef.current = null
            reject(new Error('captcha timeout'))
          }, EXECUTE_TIMEOUT_MS),
        }

        window.smartCaptcha.execute(widgetId)
      }),
    reset: () => {
      const widgetId = widgetIdRef.current
      if (widgetId != null) {
        window.smartCaptcha?.reset?.(widgetId)
      }
    },
  }))

  return (
    <div
      ref={containerRef}
      id={containerId}
      className="smart-captcha"
      data-sitekey={SMARTCAPTCHA_SITEKEY}
      data-hl="ru"
      data-invisible="true"
    />
  )
})
