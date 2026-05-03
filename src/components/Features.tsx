import EmailCapture from './EmailCapture'

const features = [
  {
    icon: '🔍',
    title: 'Multi-source Scraper',
    desc: 'Pulls listings from LinkedIn, Naukri, Indeed, and more via automated Playwright workflows. Deduplication and normalization built in.',
    tag: 'Phase 0',
  },
  {
    icon: '🤖',
    title: 'AI Resume Tailoring',
    desc: 'Analyses each job description against your resume. Produces a tailored variant that highlights relevant experience — without inventing any.',
    tag: 'Phase 0',
  },
  {
    icon: '📬',
    title: 'Automated Mail Sender',
    desc: 'Sends application emails with approved resume and cover letter attached. Uses static, human-written templates — no generative AI in the send layer.',
    tag: 'Phase 0',
  },
  {
    icon: '✅',
    title: 'Approval Queue',
    desc: 'Every AI-generated document sits in a queue. Nothing is sent without your explicit approval. You stay in control at all times.',
    tag: 'Phase 0',
  },
  {
    icon: '📊',
    title: 'Application Tracker',
    desc: 'Full thread history, response rates, and outcome tracking. Integrated mailbox pulls job-related emails from your connected account.',
    tag: 'Phase 1',
  },
  {
    icon: '🛡️',
    title: 'Scam Detection',
    desc: 'Confidence scoring and non-scam signal analysis flags suspicious listings before you ever see them. Free-webmail HR contacts are low-trust by default.',
    tag: 'Phase 2',
  },
  {
    icon: '📱',
    title: 'WhatsApp Integration',
    desc: 'Manage your application conversations via WhatsApp. Get notified, reply, and track threads without opening a browser.',
    tag: 'Phase 2',
  },
  {
    icon: '🎓',
    title: 'Skill Developer',
    desc: 'Paid placement program run by verified working professionals. If you don\'t get placed, your fee is refunded. Mentor scores are tied to outcomes.',
    tag: 'Phase 3',
  },
  {
    icon: '💳',
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
            {features.map((f) => (
              <article className="card feature-card" key={f.title}>
                <div className="feature-icon" aria-hidden="true">{f.icon}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <h3 className="feature-card h3" style={{ fontSize: 17, fontWeight: 700 }}>{f.title}</h3>
                    <span className="tag">{f.tag}</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </article>
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
