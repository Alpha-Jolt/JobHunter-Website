import { useState, useEffect, useRef, useCallback, type FormEvent } from 'react'

interface Props {
  buttonLabel?: string
  placeholder?: string
  source?: string
  userType?: 'job_seeker' | 'mentor'
  onSuccess?: () => void
  className?: string
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
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string

export default function EmailCapture({
  buttonLabel = 'Join Waitlist',
  placeholder = 'Enter your email',
  source = 'generic',
  userType = 'job_seeker',
  onSuccess,
  className,
}: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  const [showTurnstile, setShowTurnstile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  const isTurnstileConfigured = Boolean(
    TURNSTILE_SITE_KEY && TURNSTILE_SITE_KEY !== 'your_turnstile_site_key_here'
  )

  const isValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

  const performSubmission = useCallback(async (turnstileToken: string) => {
    setStatus('loading')
    setMsg('')

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
          turnstile_token: turnstileToken,
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

      setStatus('success')
      setMsg("You're on the list! We'll reach out when we launch.")
      setEmail('')
      setShowTurnstile(false)
      if (onSuccess) onSuccess()
    } catch {
      setStatus('error')
      setMsg('Network error. Please try again.')
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current)
      }
    }
  }, [email, userType, source, onSuccess])

  useEffect(() => {
    if (!isTurnstileConfigured || !showTurnstile) return

    const scriptId = 'cf-turnstile-script'
    let script = document.getElementById(scriptId) as HTMLScriptElement | null

    const tryRender = () => {
      if (widgetIdRef.current) return
      
      if (window.turnstile && containerRef.current) {
        try {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: TURNSTILE_SITE_KEY,
            theme: 'light',
            size: 'normal',
            callback: (token: string) => {
              performSubmission(token)
            },
            'error-callback': () => {
              setStatus('error')
              setMsg('Verification failed. Please check your internet connection or try again.')
            },
            'expired-callback': () => {
              setStatus('idle')
              setMsg('Verification expired. Please try again.')
            }
          })
        } catch (err) {
          console.error('Turnstile render error:', err)
          setStatus('error')
          setMsg('Failed to load verification widget.')
        }
      } else {
        setTimeout(tryRender, 100)
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
  }, [isTurnstileConfigured, showTurnstile, performSubmission])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (status === 'loading' || status === 'success') return

    if (!isValid(email)) {
      setStatus('error')
      setMsg('Please enter a valid email address.')
      return
    }

    if (isTurnstileConfigured) {
      if (!showTurnstile) {
        setShowTurnstile(true)
        setMsg('Please complete the verification below.')
        return
      }
      if (!widgetIdRef.current) {
        setMsg('Loading verification...')
      } else {
        setMsg('Please complete the verification below.')
      }
      return
    }

    if (!isTurnstileConfigured) {
      performSubmission('dev-bypass')
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={className}>
      <div className="email-form">
        <input
          type="email"
          className={`email-input${status === 'error' ? ' error' : ''}`}
          placeholder={placeholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status !== 'loading') {
              setStatus('idle')
              setMsg('')
            }
          }}
          disabled={status === 'loading' || status === 'success'}
          aria-label="Email address"
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading' ? 'Joining…' : buttonLabel}
        </button>
      </div>

      {isTurnstileConfigured && showTurnstile && status !== 'success' && (
        <div ref={containerRef} style={{ marginTop: 12, minHeight: '65px' }} />
      )}

      {msg && (
        <p className={`form-msg ${status === 'success' ? 'success' : 'error'}`} role="status">
          {msg}
        </p>
      )}
    </form>
  )
}
