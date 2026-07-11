import { useState, useEffect, useRef } from 'react'
import EmailCapture from './EmailCapture'

interface Props {
  isOpen: boolean
  onClose: () => void
  referralCode?: string
}

export default function WaitlistModal({ isOpen, onClose, referralCode }: Props) {
  const [showConfetti, setShowConfetti] = useState(false)
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

  const handleSuccess = () => {
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
      onClose()
    }, 2500)
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-modal-title"
      >
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close modal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>

        <div className="modal-badge">
          <span className="hero-badge-dot" aria-hidden="true" />
          Building in public — Phase 1
        </div>

        {referralCode && (
          <div className="modal-referral-banner">
            <span className="modal-referral-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 12 20 22 4 22 4 12" />
                <rect x="2" y="7" width="20" height="5" />
                <line x1="12" y1="22" x2="12" y2="7" />
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
              </svg>
            </span>
            <div>
              <p className="modal-referral-title">You were referred!</p>
              <p className="modal-referral-sub">Code <strong>{referralCode}</strong> — 20% off your first subscription will be applied automatically.</p>
            </div>
          </div>
        )}

        <h2 className="modal-title" id="waitlist-modal-title">Join the waitlist</h2>
        <p className="modal-desc">
          We&apos;re building the core engine in the open. Leave your email and we&apos;ll reach out
          the moment early access opens — no spam, no fake countdowns.
        </p>

        <div className="modal-form-section">
          <label className="modal-label">Email address</label>
          <EmailCapture
            buttonLabel="Get Early Access"
            placeholder="your@email.com"
            onSuccess={handleSuccess}
            className="modal-email-capture"
            referralCode={referralCode}
          />
          {referralCode && (
            <p className="modal-referral-code-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6, verticalAlign: 'middle', marginTop: -2 }}>
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
              Referral code <strong>{referralCode}</strong> will be applied to your signup.
            </p>
          )}
        </div>

        <p className="modal-footer-note">No spam · No credit card · Unsubscribe anytime</p>

        {showConfetti && <ConfettiOverlay />}
      </div>
    </div>
  )
}

function ConfettiOverlay() {
  const [pieces, setPieces] = useState<{ left: string, backgroundColor: string, animationDelay: string, animationDuration: string }[]>([])

  useEffect(() => {
    const generated = [...Array(50)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      backgroundColor: ['#E5510A', '#101012', '#FCFCFC'][i % 3],
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 2}s`,
    }))
    const timer = setTimeout(() => setPieces(generated), 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="confetti-container">
      {pieces.map((style, i) => (
        <div key={i} className="confetti-piece" style={style} />
      ))}
    </div>
  )
}
