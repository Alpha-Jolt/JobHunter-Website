const LoopIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
    <path d="M12 6v6l4 2"/>
  </svg>
)

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <path d="m9 11 3 3L22 4"/>
  </svg>
)

const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const LeafIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
)

export default function About() {
  return (
    <section className="section about-page" aria-labelledby="about-heading">
      <div className="section-inner" style={{ maxWidth: 800 }}>
        <div className="section-label">About</div>
        <h1 className="section-title" id="about-heading" style={{ marginBottom: 12 }}>
          About JobHunter
        </h1>
        <p className="section-sub" style={{ maxWidth: '100%', marginBottom: 48 }}>
          We're building an AI-powered human-in-the-loop job acquisition platform that puts you back in control of your career.
        </p>

        {/* ── Mission Section ── */}
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            JobHunter was founded with a simple belief: the job search process should work <em>for you</em>, not the other way around. 
            We combine AI-driven automation with human oversight to help college students, recent graduates, and career changers 
            land meaningful roles without burning out.
          </p>
          <p>
            From multi-source job scraping to intelligent resume tailoring and one-click applications, every feature is designed 
            to scale your job search while keeping you in the driver's seat. Explore our <a href="/features">Features</a> or check the <a href="/faq">FAQ</a> to learn more.
          </p>
        </div>

        {/* ── The Origami Crane Story ── */}
        <div className="about-story">
          <div className="about-story-content">
            <h2>The Story Behind the Origami Crane</h2>
            <p>
              The origami crane is our brand identity — and it's more than just a logo. In Japanese tradition, the crane 
              (<em>orizuru</em>) is a symbol of Faith, Hope, Resilience, and Patience.</p>
            <p><strong>
              Legend says that folding a thousand cranes 
              grants a wish. But more than that, each fold requires precision, intent, and care.
            </strong>
            </p>
            <p>
              That's exactly how we think about your job search. Every application should be crafted with intention — 
              never mass-produced or carelessly sent. The crane represents the <strong>deliberate, thoughtful process </strong> 
              of transforming a flat sheet of paper into something beautiful and purposeful.
            </p>
            <p>
              Just as folding a single crane takes time and skill, landing the right role requires patience and strategy.</p>
            <p> 
              JobHunter doesn't replace that effort — we <strong>Amplify</strong> it. We handle the repetitive folds 
              (scraping, tailoring, submitting) so you can focus on the ones that matter.
            </p>
            <p className="about-story-quote">
              "The crane flies because each fold has meaning. Your next job deserves the same."
            </p>
          </div>
          <div className="about-story-images">
            <div className="about-img-card">
              <img src="/logo.png" alt="JobHunter brand wordmark logo — an origami crane symbol" className="about-logo-img" />
              <span className="about-img-label">Wordmark</span>
            </div>
            <div className="about-img-card">
              <img src="/favicon.png" alt="JobHunter origami crane favicon icon" className="about-favicon-img" />
              <span className="about-img-label">Icon</span>
            </div>
          </div>
        </div>

        {/* ── Values ── */}
        <div className="about-section">
          <h2>Our Core Values</h2>
          <div className="about-values">
            <div className="about-value-item">
              <span className="about-value-icon"><LoopIcon /></span>
              <div>
                <h3>Human-in-the-Loop</h3>
                <p>AI recommends, you decide. Every application goes through your approval before it's sent.</p>
              </div>
            </div>
            <div className="about-value-item">
              <span className="about-value-icon"><CheckCircleIcon /></span>
              <div>
                <h3>Radical Honesty</h3>
                <p>We never fabricate experience. Our AI works only with what's already on your resume.</p>
              </div>
            </div>
            <div className="about-value-item">
              <span className="about-value-icon"><LockIcon /></span>
              <div>
                <h3>Privacy First</h3>
                <p>Your data belongs to you. We're built to comply with GDPR and India's DPDPA from day one.</p>
              </div>
            </div>
            <div className="about-value-item">
              <span className="about-value-icon"><LeafIcon /></span>
              <div>
                <h3>Patience Over Hype</h3>
                <p>We're building in public, phase by phase. No shortcuts, no empty promises.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
