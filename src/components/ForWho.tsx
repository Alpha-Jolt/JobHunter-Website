import EmailCapture from './EmailCapture'

const audiences = [
  {
    emoji: '🎓',
    title: 'College Students',
    desc: 'Applying for your first role is overwhelming. JobHunter handles the volume so you can focus on interviews, not copy-pasting cover letters.',
  },
  {
    emoji: '🚀',
    title: 'Recent Graduates',
    desc: 'You need to cast a wide net fast. Our scraper finds relevant listings across platforms and our AI tailors each application to the role.',
  },
  {
    emoji: '💼',
    title: 'Unemployed Professionals',
    desc: 'Time is money. JobHunter automates the repetitive parts of job hunting so you can spend your energy on networking and preparation.',
  },
  {
    emoji: '🧑‍💻',
    title: 'Freelancers',
    desc: 'Transitioning to full-time? JobHunter bridges the gap — surfacing relevant roles and presenting your freelance experience in the best light.',
  },
]

const mentorPoints = [
  'Earn income from one-on-one or group sessions',
  'Scored on student ratings and verified placement rates',
  '15% monthly commission on earnings',
  'Placement guarantee refunds tied to your performance',
]

export default function ForWho() {
  return (
    <>
      <section className="section" aria-labelledby="forwho-heading">
        <div className="section-inner">
          <div className="section-label">Who It's For</div>
          <h2 className="section-title" id="forwho-heading">
            Built for people who are<br />actively job hunting
          </h2>
          <p className="section-sub">
            If you lack the tools, time, or guidance to run an effective job search — JobHunter is for you.
          </p>

          <div className="forWho-grid">
            {audiences.map((a) => (
              <article className="card forWho-card" key={a.title}>
                <div className="forWho-emoji" aria-hidden="true">{a.emoji}</div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section className="section" aria-labelledby="mentor-heading">
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
                  <li key={p} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--accent)', marginTop: 2 }}>✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card" style={{ padding: 36 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Interested in mentoring?</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
                We're onboarding mentors for Phase 3. Leave your email and we'll reach out with details.
              </p>
              <EmailCapture buttonLabel="Apply as Mentor" placeholder="your@email.com" source="mentor" />
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
