import { useState, useEffect } from 'react'
import EmailCapture from './EmailCapture'

interface Props {
  isOpen: boolean
  onClose: () => void
  referralCode?: string
}

export default function WaitlistModal({ isOpen, onClose, referralCode }: Props) {
  const [showConfetti, setShowConfetti] = useState(false)

  // Simple CSS-based confetti trigger
  const handleSuccess = () => {
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
      onClose()
    }, 2500)
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>

        <div style={{ textAlign: 'center' }}>
          <div className="modal-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            Phase 3 Onboarding is now Open
          </div>
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

        <h2 className="modal-title" style={{ textAlign: 'center' }}>Land Your Next Role Faster</h2>
        <p className="modal-desc" style={{ textAlign: 'center' }}>
          Join 100+ professionals using JobHunter to automate their search and master their interviews.
          Limited spots available for the next placement cohort.
        </p>

        <div className="modal-form-section">
          <label className="modal-label">EMAIL ADDRESS</label>
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

        <div className="modal-progress-wrap">
          <div className="modal-progress-stats">
            <span><strong>121</strong> of 1,000 seats claimed</span>
            <span>879 left</span>
          </div>
          <div className="modal-progress-bar">
            <div className="modal-progress-fill" style={{ width: '12.1%' }}></div>
          </div>
        </div>

        <p className="modal-footer-note">No spam. No credit card. Cancel anytime.</p>

        {showConfetti && <ConfettiOverlay />}
      </div>
    </div>
  )
}

function ConfettiOverlay() {
  const [pieces, setPieces] = useState<{ left: string, backgroundColor: string, animationDelay: string, animationDuration: string }[]>([])

  useEffect(() => {
    const generated = [...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      backgroundColor: ['#f2711c', '#ff8c42', '#fff', '#22c55e'][Math.floor(Math.random() * 4)],
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 2}s`
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

