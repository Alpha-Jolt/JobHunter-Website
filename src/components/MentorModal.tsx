import { useState } from 'react'
import EmailCapture from './EmailCapture'

interface Props {
  isOpen: boolean
  onClose: () => void
  triggerRect: DOMRect | null
}

const ConfettiOverlay = () => (
  <div className="confetti-container">
    {[...Array(20)].map((_, i) => (
      <div 
        key={i} 
        className="confetti-piece" 
        style={{ 
          left: `${Math.random() * 100}%`, 
          backgroundColor: ['#ffffff', '#ffed94', '#ffd3ba'][Math.floor(Math.random() * 3)],
          animationDelay: `${Math.random() * 2}s`
        }} 
      />
    ))}
  </div>
)

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
      } as any}
    >
      <div 
        className="card" 
        style={{ 
          maxWidth: 540, 
          width: '90%', 
          padding: 48, 
          position: 'fixed',
          background: 'var(--accent)',
          color: '#fff',
          boxShadow: '0 64px 128px -24px rgba(0, 0, 0, 0.5)',
          animation: 'mentorModalGrow 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          zIndex: 1000,
          border: '1px solid rgba(255, 255, 255, 0.2)',
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
            background: 'rgba(255, 255, 255, 0.2)', 
            backdropFilter: 'blur(8px)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>

        <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16, color: '#fff', letterSpacing: '-0.02em' }}>
          Interested in mentoring?
        </h3>
        
        <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 17, marginBottom: 32, lineHeight: 1.6 }}>
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
