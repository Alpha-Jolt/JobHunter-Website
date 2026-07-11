import { useFeatureVotes } from '../hooks/useFeatureVotes'
import { useReveal } from '../hooks/useReveal'

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
)
const BotIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
)
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
)
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
)
const BarChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></svg>
)
const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
)
const SmartphoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
)
const GradIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
)
const CardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
)

const phases = [
  {
    num: '0', title: 'Core engine', status: 'In progress', current: true,
    features: [
      { id: 'multi-source-scraper', icon: <SearchIcon />, title: 'Multi-source scraper', desc: 'A rule-based crawler pulls listings from Naukri and Indeed today, with LinkedIn and more in Phase 1. Deduplication and normalization built in.' },
      { id: 'ai-resume-tailoring', icon: <BotIcon />, title: 'AI résumé tailoring', desc: 'Reads each job description against your résumé and reorders your real experience to fit — highlighting what matters, inventing nothing.' },
      { id: 'automated-mail-sender', icon: <MailIcon />, title: 'Automated mail sender', desc: 'Sends approved applications using static, human-written templates. No generative AI touches the send layer.' },
      { id: 'approval-queue', icon: <CheckIcon />, title: 'Approval queue', desc: 'Every draft waits for your sign-off. Nothing is sent without it — you stay in control at every step.' },
    ],
  },
  {
    num: '1', title: 'Platform foundation', status: 'Up next', current: false,
    features: [
      { id: 'application-tracker', icon: <BarChartIcon />, title: 'Application tracker', desc: 'Full thread history, response rates, and outcomes. An integrated mailbox pulls job-related email from your connected account.' },
    ],
  },
  {
    num: '2', title: 'Intelligence layer', status: 'Planned', current: false,
    features: [
      { id: 'scam-detection', icon: <ShieldIcon />, title: 'Scam detection', desc: 'Confidence scoring flags suspicious listings before you see them. Free-webmail HR contacts are treated as low-trust by default.' },
      { id: 'whatsapp-integration', icon: <SmartphoneIcon />, title: 'WhatsApp integration', desc: 'Get notified, reply, and track conversations from WhatsApp — no browser required.' },
    ],
  },
  {
    num: '3', title: 'Skill development & monetisation', status: 'Planned', current: false,
    features: [
      { id: 'skill-developer', icon: <GradIcon />, title: 'Skill developer', desc: 'A paid placement program run by verified professionals. Not placed? Your fee is refunded. Mentor scores are tied to real outcomes.' },
      { id: 'subscriptions-payments', icon: <CardIcon />, title: 'Subscriptions & payments', desc: 'Flexible plans for job seekers. Mentor commission and refund logic is automated — no manual trust required.' },
    ],
  },
]

const ALL_IDS = phases.flatMap((p) => p.features.map((f) => f.id))

interface Props {
  onOpenWaitlist: () => void
}

export default function Features({ onOpenWaitlist }: Props) {
  const { votes, vote } = useFeatureVotes(ALL_IDS)
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      <div className="page-header">
        <div className="page-header-inner reveal">
          <div className="page-header-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            Built in phases · Phase 0 first
          </div>
          <h1 className="section-title" id="features-heading">
            Everything you need to<br />run a serious job search
          </h1>
          <p className="section-sub">
            Core automation first, intelligence and monetisation later.
            Here&apos;s what ships, and in what order.
          </p>
        </div>
      </div>

      <section className="section page-body" aria-labelledby="features-heading">
        <div className="section-inner">
          <div className="feat-phases">
            {phases.map((phase, pi) => (
              <div className={`feat-phase reveal${phase.current ? ' current' : ''}`} key={phase.num} data-delay={pi * 40}>
                <div className="feat-phase-head">
                  <span className="feat-phase-num">Phase {phase.num}</span>
                  <span className="feat-phase-title">{phase.title}</span>
                  <span className={`feat-phase-status${phase.current ? ' current' : ''}`}>
                    <span className="fs-dot" aria-hidden="true" />
                    {phase.status}
                  </span>
                </div>
                <div className={`feat-grid${phase.features.length === 1 ? ' solo' : ''}`}>
                  {phase.features.map((f, fi) => {
                    const v = votes[f.id] ?? { up: 0, down: 0, userVote: null }
                    return (
                      <article className="card feat-card reveal" key={f.id} data-delay={fi * 60}>
                        <div className="feat-card-top">
                          <span className="feat-card-icon">{f.icon}</span>
                          <h3>{f.title}</h3>
                        </div>
                        <p>{f.desc}</p>
                        {!phase.current && (
                          <div className="feat-vote">
                            <button
                              className={`feat-vote-btn${v.userVote === 'up' ? ' voted' : ''}`}
                              onClick={() => vote(f.id, 'up')}
                              aria-label={`Vote up ${f.title}`}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                              {v.up}
                            </button>
                            <span>want this</span>
                          </div>
                        )}
                      </article>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          <p className="feat-vote-hint">Votes help us prioritise what ships next — they don&apos;t change the order things launch.</p>
        </div>
      </section>

      <section className="cta-section" aria-labelledby="features-cta">
        <div className="cta-inner">
          <div className="section-label" style={{ justifyContent: 'center' }}>Early access</div>
          <h2 id="features-cta">Be first in line</h2>
          <p>Get notified when the core engine opens up — no second form, just one click.</p>
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
