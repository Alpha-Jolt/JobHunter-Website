import React from 'react'
import EmailCapture from './EmailCapture'
import { useReveal } from '../hooks/useReveal'

const GradIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
)
const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" /><path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" /></svg>
)
const BriefcaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
)
const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
)
const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
)

const audiences = [
  { icon: <GradIcon />, title: 'College students', desc: 'Applying for your first role is overwhelming. JobHunter handles the volume so you can focus on interviews, not copy-pasting cover letters.' },
  { icon: <RocketIcon />, title: 'Recent graduates', desc: 'You need to cast a wide net, fast. The scraper finds relevant listings across sources and the AI tailors each application to the role.' },
  { icon: <BriefcaseIcon />, title: 'Unemployed professionals', desc: 'Time is the constraint. JobHunter automates the repetitive parts so your energy goes into networking and preparation.' },
  { icon: <CodeIcon />, title: 'Freelancers', desc: 'Moving to full-time? JobHunter surfaces relevant roles and presents your freelance experience in the clearest light.' },
]

const mentorPoints = [
  'Earn income from one-on-one or group sessions',
  'Scored on student ratings and verified placement rates',
  'Maintain your score and acquire more sessions',
  'Placement-guarantee refunds tied to your performance',
]

interface Props {
  onOpenMentorModal: (rect: DOMRect) => void
  onOpenWaitlist: () => void
}

export default function ForWho({ onOpenMentorModal, onOpenWaitlist }: Props) {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      <div className="page-header">
        <div className="page-header-inner reveal">
          <div className="page-header-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            Job seekers · Mentors welcome
          </div>
          <h1 className="section-title" id="forwho-heading">
            Built for people who are<br />actively job hunting
          </h1>
          <p className="section-sub">
            If you&apos;re short on the tools, time, or guidance to run an effective search — JobHunter is for you.
          </p>
        </div>
      </div>

      <section id="for-who-audience" className="section page-body" aria-labelledby="forwho-heading">
        <div className="section-inner">
          <div className="forWho-grid">
            {audiences.map((a, i) => (
              <article className="card forWho-card reveal" key={a.title} data-delay={i * 70}>
                <div className="forWho-card-num">0{i + 1}</div>
                <div className="forWho-icon-wrap" aria-hidden="true">{a.icon}</div>
                <h2>{a.title}</h2>
                <p>{a.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="for-who-mentor" className="section principles" style={{ borderBottom: 'none' }} aria-labelledby="mentor-heading">
        <div className="section-inner">
          <div className="grid-2 reveal" style={{ alignItems: 'center' }}>
            <div>
              <div className="section-label">For mentors</div>
              <h2 className="section-title" id="mentor-heading">
                Are you an employed professional?
              </h2>
              <p className="section-sub" style={{ marginBottom: 28 }}>
                Teach job seekers in your domain, earn from your sessions, and build a reputation
                backed by verified placement outcomes.
              </p>
              <ul className="mentor-points">
                {mentorPoints.map((p) => (
                  <li key={p}>
                    <span className="mentor-check" aria-hidden="true"><CheckIcon /></span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div
              ref={cardRef}
              className="card card-orange-hover"
              style={{ padding: 36, cursor: 'pointer' }}
              onClick={() => { if (cardRef.current) onOpenMentorModal(cardRef.current.getBoundingClientRect()) }}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && cardRef.current) {
                  e.preventDefault()
                  onOpenMentorModal(cardRef.current.getBoundingClientRect())
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Open mentor application"
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, marginBottom: 10, letterSpacing: '-0.01em' }}>
                Interested in mentoring?
              </h3>
              <p style={{ fontSize: 14.5, marginBottom: 24, color: 'var(--text-muted)' }}>
                We&apos;re onboarding mentors for Phase 3. Leave your email and we&apos;ll reach out with details.
              </p>
              <div style={{ pointerEvents: 'none' }}>
                <EmailCapture buttonLabel="Apply as mentor" placeholder="you@email.com" source="mentor" userType="mentor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" aria-labelledby="forwho-cta">
        <div className="cta-inner">
          <div className="section-label" style={{ justifyContent: 'center' }}>Get started</div>
          <h2 id="forwho-cta">Ready to stop applying manually?</h2>
          <p>We&apos;ll let you know the moment early access opens.</p>
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
