import { useState, useEffect, type CSSProperties } from 'react'
import EmailCapture from './EmailCapture'

interface Props {
  isOpen: boolean
  onClose: () => void
  triggerRect: DOMRect | null
}

const ConfettiOverlay = () => {
  const [pieces, setPieces] = useState<{ left: string, backgroundColor: string, animationDelay: string }[]>([])

  useEffect(() => {
    const generated = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      backgroundColor: ['#101012', '#FCFCFC'][Math.floor(Math.random() * 2)],
      animationDelay: `${Math.random() * 2}s`
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

export default function MentorModal({ isOpen, onClose, triggerRect }: Props) {
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSuccess = () => {
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
      onClose()
    }, 2500)
  }

  if (!isOpen) return null

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        backdropFilter: 'blur(20px)',
        '--start-x': triggerRect ? `${triggerRect.left}px` : '50%',
        '--start-y': triggerRect ? `${triggerRect.top}px` : '50%',
        '--start-w': triggerRect ? `${triggerRect.width}px` : '540px',
        '--start-h': triggerRect ? `${triggerRect.height}px` : '300px',
      } as CSSProperties}
    >
      <div
        className="card"
        style={{
          maxWidth: 540,
          width: '90%',
          padding: 48,
          position: 'fixed',
          background: 'var(--ember)',
          color: 'var(--ink)',
          boxShadow: '0 64px 128px -24px rgba(16, 16, 18, 0.5)',
          animation: 'mentorModalGrow 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          zIndex: 1000,
          border: '1px solid rgba(16, 16, 18, 0.15)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
          style={{
            top: 24,
            right: 24,
            background: 'rgba(16, 16, 18, 0.12)',
            backdropFilter: 'blur(8px)',
            color: 'var(--ink)',
            border: '1px solid rgba(16, 16, 18, 0.25)',
            boxShadow: 'none'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, marginBottom: 16, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
          Interested in mentoring?
        </h3>

        <p style={{ color: 'rgba(16, 16, 18, 0.78)', fontSize: 17, marginBottom: 32, lineHeight: 1.6 }}>
          We're onboarding mentors for Phase 3. Leave your email and we'll reach out with details.
        </p>

        <div className="mentor-modal-form-wrap">
          <EmailCapture
            buttonLabel="Apply as Mentor"
            placeholder="your@email.com"
            source="mentor-modal"
            userType="mentor"
            onSuccess={handleSuccess}
          />
        </div>

        {showConfetti && <ConfettiOverlay />}
      </div>
    </div>
  )
}
