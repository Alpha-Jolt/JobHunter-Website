import React from 'react'
import EmailCapture from './EmailCapture'

const GradIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
)
const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" /><path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" /></svg>
)
const BriefcaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
)
const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
)
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
)

const audiences = [
  {
    icon: <GradIcon />,
    title: 'College Students',
    desc: 'Applying for your first role is overwhelming. JobHunter handles the volume so you can focus on interviews, not copy-pasting cover letters.',
  },
  {
    icon: <RocketIcon />,
    title: 'Recent Graduates',
    desc: 'You need to cast a wide net fast. Our scraper finds relevant listings across platforms and our AI tailors each application to the role.',
  },
  {
    icon: <BriefcaseIcon />,
    title: 'Unemployed Professionals',
    desc: 'Time is money. JobHunter automates the repetitive parts of job hunting so you can spend your energy on networking and preparation.',
  },
  {
    icon: <CodeIcon />,
    title: 'Freelancers',
    desc: 'Transitioning to full-time? JobHunter bridges the gap — surfacing relevant roles and presenting your freelance experience in the best light.',
  },
]

const mentorPoints = [
  'Earn income from one-on-one or group sessions',
  'Scored on student ratings and verified placement rates',
  'Maintain score and aqcuire more sessions',
  'Placement guarantee refunds tied to your performance',
]

interface Props {
  onOpenMentorModal: (rect: DOMRect) => void
}

export default function ForWho({ onOpenMentorModal }: Props) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <section id="for-who-audience" className="section" aria-labelledby="forwho-heading">
        <div className="section-inner">
          <div className="section-label">Who It's For</div>
          <h1 className="section-title" id="forwho-heading">
            Built for people who are<br />actively job hunting
          </h1>
          <p className="section-sub">
            If you lack the tools, time, or guidance to run an effective job search — JobHunter is for you.
          </p>

          <div className="forWho-grid">
            {audiences.map((a) => (
              <article className="card forWho-card" key={a.title}>
                <div className="forWho-icon-wrap" aria-hidden="true">
                  {a.icon}
                </div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section id="for-who-mentor" className="section" aria-labelledby="mentor-heading">
        <div className="section-inner">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div className="section-label">Mentors</div>
              <h2 className="section-title" id="mentor-heading">
                Are you an employed professional?
              </h2>
              <p className="section-sub" style={{ marginBottom: 28 }}>
                Join as a mentor. Teach job seekers in your domain, earn income from sessions,
                and build a reputation backed by verified placement outcomes.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {mentorPoints.map((p) => (
                  <li key={p} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 15, color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--accent)', display: 'flex' }}><CheckIcon /></span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div
              ref={cardRef}
              className="card card-orange-hover"
              style={{ padding: 36, cursor: 'pointer' }}
              onClick={() => {
                if (cardRef.current) {
                  onOpenMentorModal(cardRef.current.getBoundingClientRect());
                }
              }}
            >
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Interested in mentoring?</h3>
              <p style={{ fontSize: 14, marginBottom: 24 }}>
                We're onboarding mentors for Phase 3. Leave your email and we'll reach out with details.
              </p>
              <div style={{ pointerEvents: 'none' }}>
                <EmailCapture buttonLabel="Apply as Mentor" placeholder="your@email.com" source="mentor" userType="mentor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" aria-labelledby="forwho-cta">
        <div className="cta-inner">
          <h2 id="forwho-cta">Ready to stop applying manually?</h2>
          <p>Join the waitlist. We'll notify you the moment early access opens.</p>
          <div className="cta-form-wrap">
            <EmailCapture buttonLabel="Get Early Access" source="forwho-cta" />
          </div>
        </div>
      </section>
    </>
  )
}
