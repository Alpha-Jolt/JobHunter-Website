const principles = [
  {
    icon: '🚫',
    title: 'No fabrication',
    desc: 'The AI curates and reorders your existing resume content. It never invents experience, skills, or credentials.',
  },
  {
    icon: '✅',
    title: 'User approval gates everything',
    desc: 'No resume variant or cover letter is used without your explicit approval. Nothing moves forward without your sign-off.',
  },
  {
    icon: '⚙️',
    title: 'Deterministic where AI isn\'t needed',
    desc: 'The scraper and mail sender are rule-based systems. AI is deliberately confined to the resume curation step.',
  },
  {
    icon: '🔒',
    title: 'Internal data stays internal',
    desc: 'The scraped job dataset has no external export endpoints. Your data is yours.',
  },
  {
    icon: '🛡️',
    title: 'Compliance by design',
    desc: 'Scam detection, abuse prevention, placement verification, and GDPR/DPDPA workflows are built into the roadmap — not afterthoughts.',
  },
  {
    icon: '💰',
    title: 'Placement guarantee',
    desc: 'If you enroll in a Skill Development Program and don\'t get placed, your fee is refunded. Backed by automated logic, not manual trust.',
  },
]

export default function Principles() {
  return (
    <section className="section" style={{ background: 'rgba(108,99,255,0.02)' }} aria-labelledby="principles-heading">
      <div className="section-inner">
        <div className="section-label">Our Principles</div>
        <h2 className="section-title" id="principles-heading">
          Built on a foundation<br />you can trust
        </h2>
        <p className="section-sub">
          Every design decision traces back to one of these commitments.
        </p>

        <div className="principles-grid">
          {principles.map((p) => (
            <article className="card principle-card" key={p.title}>
              <span className="principle-icon" aria-hidden="true">{p.icon}</span>
              <div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
