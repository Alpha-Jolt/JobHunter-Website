import EmailCapture from './EmailCapture'

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
)
const BotIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
)
const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
)
const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
)
const BarChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
)
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
)
const SmartphoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
)
const GradIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
)
const CardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
)

const features = [
  {
    icon: <SearchIcon />,
    title: 'Multi-source Scraper',
    desc: 'Pulls listings from LinkedIn, Naukri, Indeed, and more via automated Playwright workflows. Deduplication and normalization built in.',
    tag: 'Phase 0',
  },
  {
    icon: <BotIcon />,
    title: 'AI Resume Tailoring',
    desc: 'Analyses each job description against your resume. Produces a tailored variant that highlights relevant experience — without inventing any.',
    tag: 'Phase 0',
  },
  {
    icon: <MailIcon />,
    title: 'Automated Mail Sender',
    desc: 'Sends application emails with approved resume and cover letter attached. Uses static, human-written templates — no generative AI in the send layer.',
    tag: 'Phase 0',
  },
  {
    icon: <CheckIcon />,
    title: 'Approval Queue',
    desc: 'Every AI-generated document sits in a queue. Nothing is sent without your explicit approval. You stay in control at all times.',
    tag: 'Phase 0',
  },
  {
    icon: <BarChartIcon />,
    title: 'Application Tracker',
    desc: 'Full thread history, response rates, and outcome tracking. Integrated mailbox pulls job-related emails from your connected account.',
    tag: 'Phase 1',
  },
  {
    icon: <ShieldIcon />,
    title: 'Scam Detection',
    desc: 'Confidence scoring and non-scam signal analysis flags suspicious listings before you ever see them. Free-webmail HR contacts are low-trust by default.',
    tag: 'Phase 2',
  },
  {
    icon: <SmartphoneIcon />,
    title: 'WhatsApp Integration',
    desc: 'Manage your application conversations via WhatsApp. Get notified, reply, and track threads without opening a browser.',
    tag: 'Phase 2',
  },
  {
    icon: <GradIcon />,
    title: 'Skill Developer',
    desc: 'Paid placement program run by verified working professionals. If you don\'t get placed, your fee is refunded. Mentor scores are tied to outcomes.',
    tag: 'Phase 3',
  },
  {
    icon: <CardIcon />,
    title: 'Subscriptions & Payments',
    desc: 'Flexible plans for job seekers. Mentor commission and refund logic is automated — no manual trust required.',
    tag: 'Phase 3',
  },
]

export default function Features() {
  return (
    <>
      <section className="section" aria-labelledby="features-heading">
        <div className="section-inner">
          <div className="section-label">Features</div>
          <h2 className="section-title" id="features-heading">
            Everything you need to<br />run a serious job search
          </h2>
          <p className="section-sub">
            Built in phases — core automation first, intelligence and monetisation later.
          </p>

          <div className="grid-3" style={{ marginTop: 48 }}>
            {features.map((f) => {
              const phaseNum = f.tag.split(' ')[1];
              return (
                <article className={`card feature-card phase-${phaseNum}`} key={f.title}>
                  <span className="tag">{f.tag}</span>
                  <div className="feature-icon" aria-hidden="true" style={{ display: 'flex' }}>{f.icon}</div>
                  <div>
                    <h3 className="feature-card h3" style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </article>
              );
            })}
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
