import { useState, type FormEvent } from 'react'

interface Props {
  buttonLabel?: string
  placeholder?: string
  source?: string
}

export default function EmailCapture({
  buttonLabel = 'Join Waitlist',
  placeholder = 'Enter your email',
  source = 'generic',
}: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const isValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!isValid(email)) {
      setStatus('error')
      setMsg('Please enter a valid email address.')
      return
    }
    setStatus('loading')
    // Simulate API call — replace with real endpoint when backend is ready
    await new Promise((r) => setTimeout(r, 900))
    console.log('Waitlist signup:', { email, source })
    setStatus('success')
    setMsg("You're on the list! We'll reach out when we launch.")
    setEmail('')
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="email-form">
        <input
          type="email"
          className={`email-input${status === 'error' ? ' error' : ''}`}
          placeholder={placeholder}
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus('idle'); setMsg('') }}
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
      {msg && (
        <p className={`form-msg ${status === 'success' ? 'success' : 'error'}`} role="status">
          {msg}
        </p>
      )}
    </form>
  )
}
