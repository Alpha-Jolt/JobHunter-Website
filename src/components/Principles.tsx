const BanIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>
)
const UserCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
)
const CpuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
)
const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
)
const ShieldCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
)
const CoinsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18.06"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>
)

const principles = [
  {
    icon: <BanIcon />,
    title: 'No fabrication',
    desc: 'The AI curates and reorders your existing resume content. It never invents experience, skills, or credentials.',
  },
  {
    icon: <UserCheckIcon />,
    title: 'User approval gates everything',
    desc: 'No resume variant or cover letter is used without your explicit approval. Nothing moves forward without your sign-off.',
  },
  {
    icon: <CpuIcon />,
    title: 'Deterministic where AI isn\'t needed',
    desc: 'The scraper and mail sender are rule-based systems. AI is deliberately confined to the resume curation step.',
  },
  {
    icon: <LockIcon />,
    title: 'Internal data stays internal',
    desc: 'The scraped job dataset has no external export endpoints. Your data is yours.',
  },
  {
    icon: <ShieldCheckIcon />,
    title: 'Compliance by design',
    desc: 'Scam detection, abuse prevention, placement verification, and GDPR/DPDPA workflows are built into the roadmap — not afterthoughts.',
  },
  {
    icon: <CoinsIcon />,
    title: 'Placement guarantee',
    desc: 'If you enroll in a Skill Development Program and don\'t get placed, your fee is refunded. Backed by automated logic, not manual trust.',
  },
]

export default function Principles() {
  return (
    <section id="principles" className="section" style={{ background: 'rgba(108,99,255,0.02)' }} aria-labelledby="principles-heading">
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
              <span className="principle-icon" aria-hidden="true" style={{ color: 'var(--accent)', display: 'flex' }}>{p.icon}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
