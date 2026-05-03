import EmailCapture from './EmailCapture'

const phases = [
  {
    phase: 'Phase 0',
    focus: 'Core MVP Engine',
    detail: 'Scraper + AI Resume Builder + Mail Sender, no UI',
    status: 'active' as const,
  },
  {
    phase: 'Phase 1',
    focus: 'Platform Foundation',
    detail: 'Cross-platform frontend, onboarding, viewer, mailbox',
    status: 'next' as const,
  },
  {
    phase: 'Phase 2',
    focus: 'Intelligence Layer',
    detail: 'Confidence scoring, scam detection, analytics, WhatsApp',
    status: 'planned' as const,
  },
  {
    phase: 'Phase 3',
    focus: 'Skill Development & Monetisation',
    detail: 'Program portal, mentor sessions, payments, subscriptions',
    status: 'planned' as const,
  },
  {
    phase: 'Phase 4',
    focus: 'Scale, Compliance & Partnerships',
    detail: 'Placement verification, GDPR/DPDPA, abuse prevention, integrations',
    status: 'planned' as const,
  },
]

const statusLabel: Record<string, React.ReactNode> = {
  active: (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
      In Progress
    </span>
  ),
  next: (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff952cff' }} />
      Up Next
    </span>
  ),
  planned: 'Planned',
}

export default function Roadmap() {
  return (
    <>
      <section className="section" aria-labelledby="roadmap-heading">
        <div className="section-inner">
          <div className="section-label">Roadmap</div>
          <h2 className="section-title" id="roadmap-heading">
            Five phases to a<br />complete platform
          </h2>
          <p className="section-sub">
            We're currently in Phase 0 — proving the core job-to-application loop works before building any user-facing product.
          </p>

          <div style={{ overflowX: 'auto', marginTop: 40 }}>
            <table className="roadmap-table" aria-label="Development roadmap">
              <thead>
                <tr>
                  <th>Phase</th>
                  <th>Focus</th>
                  <th>What's included</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {phases.map((p) => (
                  <tr key={p.phase}>
                    <td className="roadmap-phase">{p.phase}</td>
                    <td style={{ fontWeight: 600 }}>{p.focus}</td>
                    <td className="roadmap-focus">{p.detail}</td>
                    <td>
                      <span className={`status-badge status-${p.status}`}>
                        {statusLabel[p.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="cta-section" aria-labelledby="roadmap-cta">
        <div className="cta-inner">
          <h2 id="roadmap-cta">Follow the build</h2>
          <p>
            We're building in public. Join the waitlist to get updates as each phase ships.
          </p>
          <div className="cta-form-wrap">
            <EmailCapture buttonLabel="Join Waitlist" source="roadmap-cta" />
          </div>
        </div>
      </section>
    </>
  )
}
