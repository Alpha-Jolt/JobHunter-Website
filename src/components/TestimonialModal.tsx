import { useState, useEffect, useRef } from 'react'
import { type TestimonialSource, sourceLabels } from './TestimonialConstants'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function TestimonialModal({ isOpen, onClose }: Props) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [quote, setQuote] = useState('')
  const [source, setSource] = useState<TestimonialSource | ''>('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const closeRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    previouslyFocused.current = document.activeElement as HTMLElement | null
    const t = window.setTimeout(() => closeRef.current?.focus(), 50)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      previouslyFocused.current?.focus?.()
    }
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!source) return // Required
    const name = `${firstName.trim()} ${lastName.trim()}`.trim()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-testimonial`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ name, quote, source }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
        setTimeout(() => {
          onClose()
          setStatus('idle')
          setFirstName('')
          setLastName('')
          setQuote('')
          setSource('')
        }, 2500)
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Failed to submit.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="testimonial-modal-title"
      >
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close modal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>

        <h2 className="modal-title" id="testimonial-modal-title">Got something to say?</h2>
        <p className="modal-desc">
          We read every message. Approved stories will appear on our homepage.
        </p>

        {status === 'success' ? (
          <div className="testimonials-success" style={{ marginTop: '24px' }}>
            <p>Thank you for your feedback. We are reviewing it and it will be posted soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="testimonials-submit-form" style={{ marginTop: '24px' }}>
            <div className="ts-form-row">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
                maxLength={40}
                className="ts-input"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                maxLength={40}
                className="ts-input"
              />
            </div>
            <select 
              value={source} 
              onChange={e => setSource(e.target.value as TestimonialSource)} 
              required 
              className="ts-select"
              style={{ color: source ? 'inherit' : 'var(--text-muted)' }}
            >
              <option value="" disabled>Where did you hear about us?</option>
              {Object.entries(sourceLabels).map(([key, label]) => (
                <option key={key} value={key} style={{ color: 'var(--ink)' }}>{label}</option>
              ))}
            </select>
            <textarea
              placeholder="Your feedback"
              value={quote}
              onChange={e => setQuote(e.target.value)}
              required
              maxLength={500}
              minLength={10}
              className="ts-textarea"
            />
            {errorMsg && <p className="testimonials-error">{errorMsg}</p>}
            <button type="submit" className="btn btn-ink ts-btn" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center' }}>
              {status === 'loading' ? 'Submitting...' : 'Share your story'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
