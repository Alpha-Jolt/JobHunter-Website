import type { Page } from '../App'
import EmailCapture from './EmailCapture'

interface Props {
  navigate: (p: Page) => void
}

export default function Hero({ navigate }: Props) {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-inner">
        <div className="hero-badge">
          <span className="hero-badge-dot" aria-hidden="true" />
          Currently in Phase 0 — Core Engine
        </div>

        <h1 id="hero-heading">
          Land your next job<br />
          <em>on autopilot.</em>
        </h1>

        <p className="hero-sub">
          JobHunter scrapes listings, tailors your resume with AI, and sends applications on your behalf —
          with your approval at every step. No fabrication. Ever.
        </p>

        <div className="hero-form-wrap">
          <EmailCapture
            buttonLabel="Get Early Access"
            placeholder="your@email.com"
            source="hero"
          />
          <p className="hero-note">Free during beta · No spam · Unsubscribe anytime</p>
        </div>

        <div className="hero-stats" role="list" aria-label="Platform highlights">
          {[
            { num: '6+', label: 'Job sources scraped' },
            { num: '0', label: 'Fabricated resume lines' },
            { num: '100%', label: 'User-approved sends' },
          ].map(({ num, label }) => (
            <div key={label} role="listitem">
              <div className="hero-stat-num">{num}</div>
              <div className="hero-stat-label">{label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-ghost" onClick={() => navigate('how-it-works')}>
            See how it works →
          </button>
          <button className="btn btn-ghost" onClick={() => navigate('features')}>
            Explore features
          </button>
        </div>
      </div>
    </section>
  )
}
