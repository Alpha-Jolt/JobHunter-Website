import { useState, useEffect, useRef, type FormEvent } from 'react'
import posthog from 'posthog-js'

interface Props {
  buttonLabel?: string
  placeholder?: string
  source?: string
  userType?: 'job_seeker' | 'mentor'
  onSuccess?: () => void
  className?: string
  referralCode?: string
  onEmailChange?: (email: string) => void
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
      getResponse: (widgetId: string) => string | undefined
    }
  }
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string
const TURNSTILE_SITE_KEY = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? '1x00000000000000000000AA'
  : (import.meta.env.VITE_TURNSTILE_SITE_KEY as string)

export default function EmailCapture({
  buttonLabel = 'Join Waitlist',
  placeholder = 'Enter your email',
  source = 'generic',
  userType = 'job_seeker',
  onSuccess,
  className,
  referralCode,
  onEmailChange,
}: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  const [throttled, setThrottled] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  const isTurnstileConfigured = Boolean(
    TURNSTILE_SITE_KEY && TURNSTILE_SITE_KEY !== 'your_turnstile_site_key_here'
  )

  const isValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

  useEffect(() => {
    if (!isTurnstileConfigured || !hasInteracted) return

    const scriptId = 'cf-turnstile-script'
    let script = document.getElementById(scriptId) as HTMLScriptElement | null

    const tryRender = () => {
      if (!containerRef.current || widgetIdRef.current) return
      if (window.turnstile) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'light',
          size: 'normal',
        })
      } else {
        setTimeout(tryRender, 200)
      }
    }

    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.addEventListener('load', tryRender)
      document.head.appendChild(script)
    } else {
      tryRender()
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [isTurnstileConfigured, hasInteracted])

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    if (throttled) return
    setThrottled(true)
    setTimeout(() => setThrottled(false), 3000)

    // Ensure Turnstile tries to render if form is submitted
    setHasInteracted(true)

    if (!isValid(email)) {
      setStatus('error')
      setMsg('Please enter a valid email address.')
      return
    }

    let turnstileToken: string | null = null
    if (isTurnstileConfigured) {
      turnstileToken = widgetIdRef.current
        ? (window.turnstile?.getResponse(widgetIdRef.current) ?? null)
        : null

      if (!turnstileToken) {
        setStatus('error')
        setMsg('Please complete the verification challenge.')
        return
      }
    }

    setStatus('loading')

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/submit-waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          email,
          user_type: userType,
          source,
          turnstile_token: turnstileToken ?? 'dev-bypass',
          ...(referralCode ? { referral_code: referralCode } : {}),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setMsg(data.error ?? 'Something went wrong. Please try again.')
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current)
        }
        return
      }

      // Track waitlist signup in PostHog
      try {
        posthog.identify(email)
        posthog.capture('waitlist_signup_submitted', {
          user_type: userType,
          source: source,
          referral_code: referralCode,
        })
      } catch (err) {
        console.error('Failed to capture PostHog event:', err)
      }

      setStatus('success')
      setMsg("You're on the list! We'll reach out when we launch.")
      setEmail('')
      if (onSuccess) onSuccess()
    } catch {
      setStatus('error')
      setMsg('Network error. Please try again.')
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current)
      }
    }
  }

  return (
    <form onSubmit={submit} noValidate className={className}>
      <div className="email-form">
        <input
          type="email"
          className={`email-input${status === 'error' ? ' error' : ''}`}
          placeholder={placeholder}
          value={email}
          onFocus={() => setHasInteracted(true)}
          onChange={(e) => { setHasInteracted(true); setEmail(e.target.value); setStatus('idle'); setMsg(''); onEmailChange?.(e.target.value) }}
          disabled={status === 'loading' || status === 'success'}
          aria-label="Email address"
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === 'loading' || status === 'success' || throttled}
        >
          {status === 'loading' ? 'Joining…' : buttonLabel}
        </button>
      </div>

      {isTurnstileConfigured && (
        <div ref={containerRef} style={{ marginTop: 12 }} />
      )}

      {msg && (
        <p className={`form-msg ${status === 'success' ? 'success' : 'error'}`} role="status">
          {status === 'success' ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          )}
          {msg}
        </p>
      )}
    </form>
  )
}
