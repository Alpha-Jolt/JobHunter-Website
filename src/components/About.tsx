import { useReveal } from '../hooks/useReveal'

const LoopIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M12 6v6l4 2" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
)

const LockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const LeafIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
)

const values = [
  {
    icon: <LoopIcon />,
    title: 'Human-in-the-Loop',
    desc: 'AI recommends, you decide. Every application goes through your approval before it\u2019s sent.',
  },
  {
    icon: <CheckCircleIcon />,
    title: 'Radical Honesty',
    desc: 'We never fabricate experience. Our AI works only with what\u2019s already on your résumé.',
  },
  {
    icon: <LockIcon />,
    title: 'Privacy First',
    desc: 'Your data belongs to you. We\u2019re built to comply with GDPR and India\u2019s DPDPA from day one.',
  },
  {
    icon: <LeafIcon />,
    title: 'Patience Over Hype',
    desc: 'We\u2019re building in public, phase by phase. No shortcuts, no empty promises.',
  },
]

interface Props {
  onOpenWaitlist: () => void
}

export default function About({ onOpenWaitlist }: Props) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      <div className="page-header">
        <div className="page-header-inner mid reveal">
          <div className="page-header-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            About
          </div>
          <h1 className="section-title" id="about-heading">
            About JobHunter
          </h1>
          <p className="section-sub" style={{ maxWidth: 620 }}>
            We&apos;re building a human-in-the-loop job acquisition platform that puts you back in control of your career.
          </p>
        </div>
      </div>

      <section className="section about-page page-body" aria-labelledby="about-mission-heading">
        <div className="section-inner about-inner">
          <div className="about-section reveal">
            <h2 id="about-mission-heading">Our Mission</h2>
            <p>
              JobHunter was founded with a simple belief: the job search process should work <em>for you</em>, not the other way around.
              We combine automation with human oversight to help college students, recent graduates, and career changers
              land meaningful roles without burning out.
            </p>
            <p>
              From multi-source job scraping to intelligent résumé tailoring and one-click applications, every feature is designed
              to scale your job search while keeping you in the driver&apos;s seat. Explore our{' '}
              <a href="/features">Features</a> or check the <a href="/faq">FAQ</a> to learn more.
            </p>
          </div>

          <div className="about-story reveal" data-delay="60">
            <div className="about-story-content">
              <h2>The Story Behind the Origami Crane</h2>
              <p>
                The origami crane is our brand identity — and it&apos;s more than just a logo. In Japanese tradition, the crane
                (<em>orizuru</em>) is a symbol of Faith, Hope, Resilience, and Patience.
              </p>
              <p>
                <strong>
                  Legend says that folding a thousand cranes grants a wish. But more than that, each fold requires precision, intent, and care.
                </strong>
              </p>
              <p>
                That&apos;s exactly how we think about your job search. Every application should be crafted with intention —
                never mass-produced or carelessly sent. The crane represents the <strong>deliberate, thoughtful process</strong>{' '}
                of transforming a flat sheet of paper into something beautiful and purposeful.
              </p>
              <p>
                Just as folding a single crane takes time and skill, landing the right role requires patience and strategy.
              </p>
              <p>
                JobHunter doesn&apos;t replace that effort — we <strong>amplify</strong> it. We handle the repetitive folds
                (scraping, tailoring, submitting) so you can focus on the ones that matter.
              </p>
              <p className="about-story-quote">
                &ldquo;The crane flies because each fold has meaning. Your next job deserves the same.&rdquo;
              </p>
            </div>
            <div className="about-story-images">
              <div className="about-img-card">
                <img src="/logo.png" alt="JobHunter brand wordmark — an origami crane symbol" className="about-logo-img" />
                <span className="about-img-label">Wordmark</span>
              </div>
              <div className="about-img-card">
                <img src="/favicon.png" alt="JobHunter origami crane icon" className="about-favicon-img" />
                <span className="about-img-label">Icon</span>
              </div>
            </div>
          </div>

          <div className="about-section reveal" data-delay="80">
            <h2 id="about-values-heading">Our Core Values</h2>
            <div className="about-values">
              {values.map((v) => (
                <div className="about-value-item" key={v.title}>
                  <span className="about-value-icon">{v.icon}</span>
                  <div>
                    <h3>{v.title}</h3>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" aria-labelledby="about-cta">
        <div className="cta-inner">
          <div className="section-label" style={{ justifyContent: 'center' }}>Come along</div>
          <h2 id="about-cta">Watch it get built</h2>
          <p>We&apos;ll email you as each phase ships — no fluff, no fake countdowns.</p>
          <div className="cta-actions">
            <button type="button" className="btn btn-ink" onClick={onOpenWaitlist}>
              Join the waitlist
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
