import { useState, useEffect } from 'react'
import EmailCapture from './EmailCapture'
import ReferralCodeDisplay from './ReferralCodeDisplay'
import { useReveal } from '../hooks/useReveal'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string

interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
    title: '20% Off — On Us',
    description: 'Give your network an exclusive 20% discount on their first subscription and unlock priority placement access for you both.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
        <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
      </svg>
    ),
    title: 'Priority Cohort Access',
    description: 'Referred users jump the queue and receive early cohort invitations before the general public.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Build Your Network',
    description: 'Every referral strengthens your professional circle — and moves everyone you invite closer to a real offer.',
  },
]

function ConfettiOverlay() {
  const [pieces, setPieces] = useState<{ left: string, backgroundColor: string, animationDelay: string, animationDuration: string }[]>([])

  useEffect(() => {
    const generated = [...Array(60)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      backgroundColor: ['#E5510A', '#101012', '#FCFCFC'][i % 3],
      animationDelay: `${Math.random() * 1.5}s`,
      animationDuration: `${2.5 + Math.random() * 2}s`,
    }))
    const timer = setTimeout(() => setPieces(generated), 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="confetti-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
      {pieces.map((style, i) => (
        <div key={i} className="confetti-piece" style={style} />
      ))}
    </div>
  )
}

export default function Referral() {
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [currentEmail, setCurrentEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  // Show blurred preview before email submission
  const PLACEHOLDER_CODE = 'XXXXXXXX'

  // Track if the EmailCapture has succeeded
  const handleSuccess = () => {
    // After joining waitlist, auto-generate the referral code
    generateCode(currentEmail)
  }

  const generateCode = async (email: string) => {
    if (!email || loading) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/generate-referral-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        // If email not on waitlist yet, show a helpful message
        setError(data.error ?? 'Failed to generate your referral code. Please try again.')
      } else {
        setReferralCode(data.referral_code)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Also allow fetching code for existing waitlist members
  const handleGetCode = async () => {
    if (!currentEmail) {
      setError('Please enter your email address first.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentEmail)) {
      setError('Please enter a valid email address.')
      return
    }
    await generateCode(currentEmail)
  }

  // Scroll to top on mount
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [])
  const ref = useReveal<HTMLElement>()

  return (
    <main ref={ref}>
      {showConfetti && <ConfettiOverlay />}

      <section className="ref-top-section section">
        <div className="section-inner ref-top-inner">
          <div className="ref-hero-content reveal">
            <div className="ref-hero-badge">
              <span className="hero-badge-dot" />
              Referral program — live
            </div>
            <h1 className="ref-hero-title">
              Share JobHunter,<br />
              <em>land together.</em>
            </h1>
            <p className="ref-hero-sub">
              Invite a friend or colleague. You both get 20% off and priority access to the
              next cohort. No caps, no gimmicks.
            </p>
          </div>

          <div className="ref-get-code-content reveal" data-delay="80">
            <div className="ref-get-code-header">
              <h2 className="ref-form-title-top">Get Your Referral Code</h2>
              <p className="ref-form-sub-top">
                Already on the waitlist? Enter your email to reveal your link.
                New here? Join first — your code is instant.
              </p>
            </div>

            <div className="ref-code-card card">
              {!referralCode ? (
                <>
                  <div className="ref-preview-wrap">
                    <p className="ref-preview-label">YOUR REFERRAL CODE</p>
                    <ReferralCodeDisplay code={PLACEHOLDER_CODE} blurred />
                  </div>

                  <div className="ref-form-section">
                    <p className="ref-form-label">EMAIL ADDRESS</p>
                    <EmailCapture
                      buttonLabel="Join & Get My Code"
                      placeholder="your@email.com"
                      source="referral-page"
                      onSuccess={handleSuccess}
                      onEmailChange={setCurrentEmail}
                      className="ref-email-capture"
                    />

                    <div className="ref-existing-divider">
                      <span>Already on the waitlist?</span>
                    </div>
                    <button
                      className="btn btn-ghost ref-existing-btn"
                      onClick={handleGetCode}
                      disabled={loading}
                      id="get-existing-code-btn"
                    >
                      {loading ? 'Generating…' : 'Reveal My Referral Code →'}
                    </button>

                    {error && (
                      <p className="form-msg error" role="alert">{error}</p>
                    )}
                  </div>
                </>
              ) : (
                <div className="ref-success-wrap">
                  <div className="ref-success-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Your code is ready!
                  </div>
                  <p className="ref-success-sub">Share this code or link with anyone you&apos;d like to refer.</p>
                  <p className="ref-preview-label">YOUR REFERRAL CODE</p>
                  <ReferralCodeDisplay code={referralCode} blurred={false} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="reveal">
            <p className="section-label">Why refer</p>
            <h2 className="section-title">What you&apos;ll both get</h2>
            <p className="section-sub">A referral isn&apos;t just a discount — it&apos;s an advantage for everyone in your network.</p>
          </div>

          <div className="ref-benefits-grid">
            {benefits.map((b, i) => (
              <div key={b.title} className="ref-benefit-card card reveal" data-delay={i * 70}>
                <div className="ref-benefit-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="reveal">
            <p className="section-label">Four steps</p>
            <h2 className="section-title">How referrals work</h2>
          </div>

          <div className="ref-steps-flow">
            {[
              { num: '01', title: 'Get your code', desc: 'Enter your email above to generate your unique 8-character referral code.' },
              { num: '02', title: 'Share the link', desc: 'Send your personalised link or code to friends, colleagues, or your network.' },
              { num: '03', title: 'They sign up', desc: 'Your link opens the waitlist with your code already filled in for them.' },
              { num: '04', title: 'Everyone benefits', desc: 'You both get 20% off the first subscription and priority cohort access.' },
            ].map((step, i) => (
              <div key={step.num} className="ref-step-flow reveal" data-delay={i * 60}>
                <span className="ref-step-flow-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
