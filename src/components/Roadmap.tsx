import EmailCapture from './EmailCapture'
import { useReveal } from '../hooks/useReveal'

const phases = [
  { phase: 'Phase 1', focus: 'Core MVP engine', detail: 'Scraper + AI Resume Optimization + Mail Bridge', status: 'Live', current: false },
  {
    phase: 'Phase 1', focus: 'Platform foundation', detail: 'Cross-platform app, Anti-Fabrication Layer, Notification', status: 'In progress', current: true
  },
  { phase: 'Phase 2', focus: 'Intelligence layer', detail: 'Confidence scoring, scam detection, analytics, WhatsApp', status: 'Planned', current: false },
  { phase: 'Phase 3', focus: 'Skill development & monetisation', detail: 'Program portal, mentor sessions, payments, subscriptions', status: 'Planned', current: false },
  { phase: 'Phase 4', focus: 'Scale, compliance & partnerships', detail: 'Placement verification, GDPR / DPDPA, abuse prevention, integrations', status: 'Planned', current: false },
]

export default function Roadmap() {
  const ref = useReveal<HTMLElement>()
  return (
    <>
      <section id="roadmap" className="section roadmap" aria-labelledby="roadmap-heading" ref={ref}>
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">The build</div>
            <h2 className="section-title" id="roadmap-heading">
              2026 phases, built in public
            </h2>
            <p className="section-sub">
              We&apos;re in Phase 1 — proving the core job-to-application loop works before shipping any
              user-facing product. Here&apos;s the whole plan, in order.
            </p>
          </div>

          <div className="roadmap-list" role="table" aria-label="Development roadmap">
            {phases.map((p, i) => (
              <div
                className={`roadmap-row reveal${p.current ? ' current' : ''}`}
                role="row"
                key={p.phase}
                data-delay={i * 50}
              >
                <div className="roadmap-phase" role="cell">{p.phase}</div>
                <div className="roadmap-focus" role="cell">{p.focus}</div>
                <div className="roadmap-detail" role="cell">{p.detail}</div>
                <div className={`roadmap-status${p.current ? ' current' : ''}${(p.status === 'Completed' || p.status === 'Live') ? ' completed' : ''}`} role="cell">
                  <span className="rs-dot" aria-hidden="true" />
                  {p.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" aria-labelledby="roadmap-cta">
        <div className="cta-inner">
          <div className="section-label" style={{ justifyContent: 'center' }}>Stay in the loop</div>
          <h2 id="roadmap-cta">Follow the build</h2>
          <p>Join the waitlist and we&apos;ll email you as each phase ships. No fluff, no fake countdowns.</p>
          <div className="cta-form-wrap">
            <EmailCapture buttonLabel="Join the waitlist" source="roadmap-cta" />
          </div>
        </div>
      </section>
    </>
  )
}
