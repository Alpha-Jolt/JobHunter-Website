import { useState } from 'react'
import EmailCapture from './EmailCapture'
import { useFeatureVotes } from '../hooks/useFeatureVotes'

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
)
const BotIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
)
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
)
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
)
const BarChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
)
const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
)
const SmartphoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
)
const GradIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
)
const CardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
)

const phases = [
  {
    label: 'Phase 0', title: 'Core MVP', status: 'In Progress', statusClass: 'status-active', num: '0',
    features: [
      { id: 'multi-source-scraper',    icon: <SearchIcon />, title: 'Multi-source Scraper',    desc: 'Pulls listings from LinkedIn, Naukri, Indeed, and more via automated workflows. Deduplication and normalization built in.' },
      { id: 'ai-resume-tailoring',     icon: <BotIcon />,    title: 'AI Resume Tailoring',     desc: 'Analyses each job description against your resume. Produces a tailored variant that highlights relevant experience — without inventing any.' },
      { id: 'automated-mail-sender',   icon: <MailIcon />,   title: 'Automated Mail Sender',   desc: 'Sends application emails with approved resume and cover letter attached. Uses static, human-written templates — no generative AI in the send layer.' },
      { id: 'approval-queue',          icon: <CheckIcon />,  title: 'Approval Queue',          desc: 'Every AI-generated document sits in a queue. Nothing is sent without your explicit approval. You stay in control at all times.' },
    ],
  },
  {
    label: 'Phase 1', title: 'Platform Foundation', status: 'Up Next', statusClass: 'status-next', num: '1',
    features: [
      { id: 'application-tracker', icon: <BarChartIcon />, title: 'Application Tracker', desc: 'Full thread history, response rates, and outcome tracking. Integrated mailbox pulls job-related emails from your connected account.' },
    ],
  },
  {
    label: 'Phase 2', title: 'Intelligence Layer', status: 'Planned', statusClass: 'status-planned', num: '2',
    features: [
      { id: 'scam-detection',       icon: <ShieldIcon />,     title: 'Scam Detection',       desc: 'Confidence scoring and non-scam signal analysis flags suspicious listings before you ever see them. Free-webmail HR contacts are low-trust by default.' },
      { id: 'whatsapp-integration', icon: <SmartphoneIcon />, title: 'WhatsApp Integration', desc: 'Manage your application conversations via WhatsApp. Get notified, reply, and track threads without opening a browser.' },
    ],
  },
  {
    label: 'Phase 3', title: 'Skill Dev & Monetisation', status: 'Planned', statusClass: 'status-planned', num: '3',
    features: [
      { id: 'skill-developer',         icon: <GradIcon />, title: 'Skill Developer',         desc: "Paid placement program run by verified working professionals. If you don't get placed, your fee is refunded. Mentor scores are tied to outcomes." },
      { id: 'subscriptions-payments',  icon: <CardIcon />, title: 'Subscriptions & Payments', desc: 'Flexible plans for job seekers. Mentor commission and refund logic is automated — no manual trust required.' },
    ],
  },
]

const ALL_IDS = phases.flatMap((p) => p.features.map((f) => f.id))

function KanbanCard({
  id, icon, title, desc, phaseNum, voteState, onVote,
}: {
  id: string; icon: React.ReactNode; title: string; desc: string
  phaseNum: string
  voteState: { up: number; down: number; userVote: 'up' | 'down' | null }
  onVote: (id: string, dir: 'up' | 'down') => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <article className={`kanban-card phase-${phaseNum}${open ? ' expanded' : ''}`}>
      <div
        className="kanban-card-header"
        onClick={() => setOpen(!open)}
        role="button"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
      >
        <span className="kanban-card-icon">{icon}</span>
        <span className="kanban-card-title">{title}</span>
        <svg className={`kanban-chevron${open ? ' open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>

      {open && <p className="kanban-card-desc">{desc}</p>}

      <div className="kanban-card-votes" onClick={(e) => e.stopPropagation()}>
        <button
          className={`vote-btn vote-up${voteState.userVote === 'up' ? ' voted' : ''}`}
          onClick={() => onVote(id, 'up')}
          aria-label="Upvote"
          title="Want this"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
          <span>{voteState.up}</span>
        </button>
        <button
          className={`vote-btn vote-down${voteState.userVote === 'down' ? ' voted' : ''}`}
          onClick={() => onVote(id, 'down')}
          aria-label="Downvote"
          title="Not needed"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
          <span>{voteState.down}</span>
        </button>
      </div>
    </article>
  )
}

export default function Features() {
  const { votes, vote } = useFeatureVotes(ALL_IDS)

  return (
    <>
      <section id="features" className="section" aria-labelledby="features-heading">
        <div className="section-inner">
          <div className="section-label">Features</div>
          <h2 className="section-title" id="features-heading">
            Everything you need to<br />run a serious job search
          </h2>
          <p className="section-sub">
            Built in phases — core automation first, intelligence and monetisation later.
          </p>

          <div className="kanban-board">
            {phases.map((phase) => (
              <div key={phase.num} className={`kanban-col phase-${phase.num}`}>
                <div className="kanban-col-header">
                  <div className="kanban-col-meta">
                    <span className="kanban-col-label">{phase.label}</span>
                    <span className={`status-badge ${phase.statusClass}`}>{phase.status}</span>
                  </div>
                  <h3 className="kanban-col-title">{phase.title}</h3>
                </div>
                <div className="kanban-cards">
                  {phase.features.map((f) => (
                    <KanbanCard
                      key={f.id}
                      id={f.id}
                      icon={f.icon}
                      title={f.title}
                      desc={f.desc}
                      phaseNum={phase.num}
                      voteState={votes[f.id] ?? { up: 0, down: 0, userVote: null }}
                      onVote={vote}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" aria-labelledby="features-cta">
        <div className="cta-inner">
          <h2 id="features-cta">Be first in line</h2>
          <p>We're building in public. Join the waitlist and get early access when we launch.</p>
          <div className="cta-form-wrap">
            <EmailCapture buttonLabel="Join Waitlist" source="features-cta" />
          </div>
        </div>
      </section>
    </>
  )
}
