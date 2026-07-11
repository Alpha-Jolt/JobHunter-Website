import { useReveal } from '../hooks/useReveal'

const steps = [
  {
    tag: 'Onboard',
    title: 'Tell us what you want',
    desc: 'A short questionnaire — your skills, target role, location, salary, and experience. It drives everything downstream.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
    ),
  },
  {
    tag: 'Discover',
    title: 'We scrape jobs for you',
    desc: 'A rule-based scraper pulls fresh listings from Naukri and Indeed today (LinkedIn and more in Phase 1). Everything stays in your private database — never exported.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
    ),
  },
  {
    tag: 'Select',
    title: 'Browse and select',
    desc: 'A filterable, searchable list of matched roles. Pick listings one by one or bulk-select the companies you want to target.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></svg>
    ),
  },
  {
    tag: 'Tailor',
    title: 'AI tailors your resume',
    desc: (
      <>
        The AI reads each job description against your resume and reorders your existing
        experience to fit. It curates — it never fabricates.{' '}
        <a href="/features">See what the AI does and doesn&apos;t touch</a>.
      </>
    ),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
    ),
  },
  {
    tag: 'Approve',
    title: 'You approve, we send',
    desc: 'Every draft sits in an approval queue. Nothing goes out without your explicit sign-off. Once you approve, the rule-based sender delivers it.',
    accent: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
    ),
  },
  {
    tag: 'Improve',
    title: 'Track and improve',
    desc: 'Your application history, response rates, and threads are tracked so you can see what is working and sharpen your approach.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></svg>
    ),
  },
]

export default function HowItWorks() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div className="hiw" id="how-it-works" ref={ref}>
      <div className="hiw-head reveal">
        <div className="section-label">How it works</div>
        <h2 className="section-title" id="hiw-heading">
          From signup to sent<br />in six deliberate steps
        </h2>
        <p className="section-sub">
          An automated pipeline with a human approval gate at the one step that matters.
        </p>
      </div>

      <div className="hiw-grid">
        {steps.map((step, i) => (
          <div
            key={step.tag}
            className={`hiw-step reveal${step.accent ? ' accent' : ''}`}
            data-delay={(i % 3) * 80}
          >
            <div className="hiw-step-top">
              <span className="hiw-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="hiw-tag">{step.tag}</span>
            </div>
            <div className="hiw-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
            {i < steps.length - 1 && (i + 1) % 3 !== 0 && (
              <svg className="hiw-connector" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
