import { useState, useEffect, useRef } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  email?: string
}

function ConfettiOverlay() {
  const [pieces, setPieces] = useState<
    {
      left: string
      backgroundColor: string
      animationDelay: string
      animationDuration: string
      width: string
      height: string
      borderRadius: string
    }[]
  >([])

  useEffect(() => {
    const colors = ['#E5510A', '#ff8f34', '#101012', '#FCFCFC', '#ffb347']
    const shapes = [
      { w: '6px', h: '10px', r: '1px' },
      { w: '8px', h: '8px', r: '50%' },
      { w: '10px', h: '5px', r: '2px' },
    ]
    const generated = [...Array(70)].map((_, i) => {
      const shape = shapes[i % shapes.length]
      return {
        left: `${Math.random() * 100}%`,
        backgroundColor: colors[i % colors.length],
        animationDelay: `${Math.random() * 1.5}s`,
        animationDuration: `${2.2 + Math.random() * 2}s`,
        width: shape.w,
        height: shape.h,
        borderRadius: shape.r,
      }
    })
    const timer = setTimeout(() => setPieces(generated), 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10001,
        overflow: 'hidden',
      }}
    >
      {pieces.map((style, i) => (
        <div key={i} className="confetti-piece" style={style} />
      ))}
    </div>
  )
}

export default function WaitlistSuccessModal({ isOpen, onClose, email }: Props) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [checkVisible, setCheckVisible] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      setShowConfetti(false)
      setCheckVisible(false)
      return
    }

    previouslyFocused.current = document.activeElement as HTMLElement | null
    const t1 = window.setTimeout(() => closeRef.current?.focus(), 50)
    const t2 = window.setTimeout(() => setShowConfetti(true), 80)
    const t3 = window.setTimeout(() => setCheckVisible(true), 200)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
      document.removeEventListener('keydown', onKey)
      previouslyFocused.current?.focus?.()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {showConfetti && <ConfettiOverlay />}

      <div
        className="modal-overlay"
        onClick={onClose}
        role="presentation"
        style={{ zIndex: 10000 }}
      >
        <div
          className="success-modal-content"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
        >
          {/* Close button */}
          <button
            ref={closeRef}
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>

          {/* Animated check ring */}
          <div className={`success-check-ring ${checkVisible ? 'visible' : ''}`} aria-hidden="true">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>

          {/* Headline */}
          <h2 className="success-modal-title" id="success-modal-title">
            You're on the list.
          </h2>

          <p className="success-modal-sub">
            We'll reach out the moment Beta opens — no spam, no fake countdowns.
            {email && (
              <>
                {' '}Invitation will be sent to{' '}
                <strong className="success-modal-email">{email}</strong>.
              </>
            )}
          </p>

          {/* What to expect strip */}
          <div className="success-expect-strip">
            <div className="success-expect-item">
              <span className="success-expect-icon" aria-hidden="true">📬</span>
              <span>Early access invite</span>
            </div>
            <div className="success-expect-divider" aria-hidden="true" />
            <div className="success-expect-item">
              <span className="success-expect-icon" aria-hidden="true">🎯</span>
              <span>Priority onboarding</span>
            </div>
            <div className="success-expect-divider" aria-hidden="true" />
            <div className="success-expect-item">
              <span className="success-expect-icon" aria-hidden="true">🔒</span>
              <span>No spam, ever</span>
            </div>
          </div>

          {/* CTA */}
          <button className="btn btn-primary success-modal-cta" onClick={onClose}>
            Got it, thanks!
          </button>

          <p className="success-modal-footer">
            Spread the word — tell a friend who's job hunting.
          </p>
        </div>
      </div>
    </>
  )
}
