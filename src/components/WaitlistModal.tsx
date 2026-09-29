import { useState, useEffect, useRef } from 'react'
import EmailCapture from './EmailCapture'
import WaitlistSuccessModal from './WaitlistSuccessModal'

interface Props {
  isOpen: boolean
  onClose: () => void
  referralCode?: string
}

export default function WaitlistModal({ isOpen, onClose, referralCode }: Props) {
  const [showSuccess, setShowSuccess] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [referralSource, setReferralSource] = useState('')
  const [referralSourceOther, setReferralSourceOther] = useState('')
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

  const handleSuccess = (email?: string) => {
    if (email) setSubmittedEmail(email)
    onClose()
    // Small delay so the close animation completes before success modal appears
    setTimeout(() => setShowSuccess(true), 120)
  }

  if (!isOpen) return null

  return (
    <>
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
          Successfully Completed Alpha
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
          We&apos;ve successfully completed our Alpha phase with over <strong>100+ early users</strong>.
          <br></br>
          Leave your email and we&apos;ll reach out the moment Beta access opens — no spam, no fake countdowns.
        </p>

        <div className="modal-form-section">
          <label className="modal-label">Email address</label>
          <EmailCapture
            buttonLabel="Join Early Beta Access"
            placeholder="your@email.com"
            onSuccess={handleSuccess}
            onEmailChange={(e) => setSubmittedEmail(e)}
            className="modal-email-capture"
            referralCode={referralCode}
            referralSource={referralSource}
            referralSourceOther={referralSourceOther}
          >
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', marginTop: '2px' }}>
              <label className="modal-label" htmlFor="referral-source-select">How did you hear about us?</label>
              <div className="modal-referral-source-wrapper">
                <select
                  id="referral-source-select"
                  className="modal-referral-source-select"
                  value={referralSource}
                  onChange={(e) => {
                    setReferralSource(e.target.value)
                    if (e.target.value !== 'Other') {
                      setReferralSourceOther('')
                    }
                  }}
                  aria-required="true"
                >
                  <option value="" disabled>-- Select an option --</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Someone told me">Someone told me</option>
                  <option value="Peerlist">Peerlist</option>
                  <option value="Instagram">Instagram</option>
                  <option value="ChatGPT or other AI">ChatGPT or other AI</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="X (Twitter)">X (Twitter)</option>
                  <option value="Product Hunt">Product Hunt</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={`modal-referral-other-wrapper ${referralSource === 'Other' ? 'show' : ''}`}>
                {referralSource === 'Other' && (
                  <input
                    type="text"
                    className="modal-referral-other-input"
                    placeholder="Tell us more (optional)"
                    maxLength={100}
                    value={referralSourceOther}
                    onChange={(e) => setReferralSourceOther(e.target.value)}
                    aria-label="Other referral source"
                  />
                )}
              </div>
            </div>
          </EmailCapture>
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
      </div>
    </div>

    <WaitlistSuccessModal
      isOpen={showSuccess}
      onClose={() => setShowSuccess(false)}
      email={submittedEmail}
    />
    </>
  )
}

