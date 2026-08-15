import { useReveal } from '../hooks/useReveal'

const steps = [
  {
    tag: 'Onboard',
    title: 'Tell us what you want',
    desc: 'Complete a comprehensive onboarding questionnaire where you specify your target roles, required salary, preferred locations, and key skills. JobHunter uses these precise parameters to drive the entire downstream scraping and matching process, ensuring you only see roles you actually want.',
    schemaDesc: 'Complete a short questionnaire detailing your skills, target roles, preferred locations, and salary expectations to configure your job search profile.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
    ),
  },
  {
    tag: 'Discover',
    title: 'We scrape jobs for you',
    desc: 'Our rule-based engine continuously pulls fresh listings from major platforms like Naukri and Indeed (with LinkedIn and more coming in Phase 1). Instead of jumping between multiple tabs, you get a unified feed of opportunities that matches your exact criteria, all stored securely in your private database.',
    schemaDesc: 'Our automated scraper finds relevant job openings on major job boards like Naukri and Indeed and pulls them into your private dashboard.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
    ),
  },
  {
    tag: 'Select',
    title: 'Browse and select roles',
    desc: 'Review your personalized list of scraped jobs in a clean, distraction-free interface. Filter by salary, location, or company size. You can pick listings one by one or bulk-select companies you want to target, putting you in total control of where you apply.',
    schemaDesc: 'Browse through your personalized list of scraped jobs and select the specific roles or companies you want to apply for.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></svg>
    ),
  },
  {
    tag: 'Tailor',
    title: 'AI tailors your resume',
    desc: 'This is where the magic happens. JobHunter’s AI reads the specific job description and dynamically reorders and curates your existing resume lines to highlight the most relevant experience. It strictly curates — it never fabricates or invents credentials.',
    schemaDesc: 'The AI curates and reorders your existing resume lines to highlight the most relevant experience for each specific job description, without fabricating any details.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
    ),
  },
  {
    tag: 'Approve',
    title: 'You approve, we send',
    desc: 'JobHunter is a human-in-the-loop companion, not a blind auto-applier. Every tailored resume and generated cover letter sits in an approval queue for your review. Once you explicitly sign off, our secure system delivers the application directly via your Gmail or Outlook account.',
    schemaDesc: 'Review the tailored resume and AI-generated cover letter in your approval queue. Only after you explicitly approve it will the application be sent via your email.',
    accent: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
    ),
  },
  {
    tag: 'Improve',
    title: 'Track and improve',
    desc: 'Watch your metrics improve over time. JobHunter tracks your application history, response rates, and email threads in one place, allowing you to see what strategies work best and continuously sharpen your job search approach.',
    schemaDesc: 'Track your job application history and response rates within the platform to continuously refine your job search strategy.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></svg>
    ),
  },
]

export default function HowItWorksPage() {
  const ref = useReveal<HTMLDivElement>()

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to use JobHunter as your AI job search companion",
    "description": "Step-by-step guide on how JobHunter discovers jobs, tailors your resume, and prepares applications for your approval.",
    "step": steps.map((s, i) => ({
      "@type": "HowToStep",
      "name": s.title,
      "text": s.schemaDesc,
      "url": `https://myjobhunter.in/how-it-works#step-${i+1}`
    }))
  }

  return (
    <div ref={ref}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <div className="page-header">
        <div className="page-header-inner narrow reveal">
          <div className="page-header-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            Human-in-the-loop Process
          </div>
          <h1 className="section-title">How JobHunter Works</h1>
          <p className="section-sub">
            From signup to sent in six deliberate steps. JobHunter is designed to automate the heavy lifting while keeping you in total control.
          </p>
        </div>
      </div>

      <section className="section page-body" style={{ paddingTop: '2rem' }}>
        <div className="section-inner" style={{ maxWidth: 840, position: 'relative' }}>
          <div className="hiw-list" style={{ position: 'relative', zIndex: 1 }}>
            {steps.map((step, i) => (
              <div 
                key={step.tag} 
                className="hiw-page-step reveal" 
                id={`step-${i+1}`}
                style={{ 
                  display: 'flex', 
                  gap: '32px', 
                  marginBottom: '40px',
                  position: 'relative'
                }}
              >
                <div style={{ flexShrink: 0, position: 'relative', zIndex: 2 }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '50%', 
                    background: step.accent ? 'var(--ember)' : 'var(--paper)', 
                    border: step.accent ? 'none' : '1px solid var(--hairline-strong)',
                    boxShadow: step.accent ? '0 4px 16px rgba(255, 143, 52, 0.3)' : '0 4px 12px rgba(16,16,18,0.05)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: step.accent ? 'var(--paper)' : 'var(--text)',
                    transition: 'transform 0.4s var(--ease), box-shadow 0.4s var(--ease)'
                  }}>
                    {step.icon}
                  </div>
                  {/* Connecting line to the next step */}
                  {i < steps.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      top: '48px',
                      bottom: '-40px', /* Spans exactly the gap to the next step */
                      left: '23.5px', /* Centered under the 48px circle */
                      width: '1px',
                      background: 'var(--hairline-strong)',
                      zIndex: -1
                    }} />
                  )}
                </div>
                
                <div 
                  className={`card ${step.accent ? 'card-orange-hover' : ''}`}
                  style={{ 
                    flex: 1, 
                    padding: '36px',
                    marginTop: '-24px', /* Pull card up to align visually with the circle */
                  }}
                >
                  <span style={{ 
                    display: 'inline-block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px', 
                    fontWeight: 600, 
                    color: step.accent ? 'var(--ember)' : 'var(--text-muted)', 
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '16px'
                  }}>
                    Step {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 style={{ 
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px', 
                    fontWeight: 460, 
                    letterSpacing: '-0.02em',
                    margin: '0 0 16px 0', 
                    color: 'var(--text)' 
                  }}>
                    {step.title}
                  </h2>
                  <p style={{ 
                    color: 'var(--text-muted)', 
                    lineHeight: 1.65, 
                    margin: 0, 
                    fontSize: '16px' 
                  }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-slim">
        <div className="cta-slim-inner reveal">
          <p>Ready to scale your job search with AI?</p>
          <a href="https://app.myjobhunter.in" className="btn btn-ink" style={{ textDecoration: 'none' }}>
            Start Hunting Jobs
          </a>
        </div>
      </section>
    </div>
  )
}
