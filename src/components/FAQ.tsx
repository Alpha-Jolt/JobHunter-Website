import { useId, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const faqs = [
  { q: 'Is JobHunter free to use?', a: 'The core job search and application automation is free during beta. Skill Development Programs (Phase 3) are paid — with a full refund if you don\u2019t get placed.' },
  { q: 'Will the AI fabricate anything on my résumé?', a: 'Never. The AI curates and reorders your existing résumé content to fit each job description. It can flag gaps, but it never invents experience, skills, or credentials.' },
  { q: 'Do applications go out without my approval?', a: 'No. Every AI-generated résumé variant and cover letter sits in an approval queue. Nothing is sent until you explicitly sign off on it.' },
  { q: 'Which job boards does JobHunter scrape?', a: 'Phase 0 covers Naukri and Indeed. LinkedIn and additional sources are planned for Phase 1. All scraped data stays in your private database — it is never exported.' },
  { q: 'How does the Skill Development Program work?', a: 'Verified professionals run one-on-one or group sessions tailored to your target roles or identified skill gaps. Complete the program and not get placed? Your fee is refunded automatically.' },
  { q: 'Can I become a mentor?', a: 'Yes. We\u2019re onboarding mentors for Phase 3. Head to the For Who page and fill in the mentor form — we\u2019ll reach out with details.' },
  { q: 'When does JobHunter launch?', a: 'We\u2019re currently in Phase 0 — building and validating the core engine. Join the waitlist to get notified when early access opens.' },
  { q: 'Is my data safe?', a: 'Yes. The scraped job dataset has no external export endpoints. GDPR and India\u2019s DPDPA consent and deletion workflows are on the Phase 4 roadmap.' },
]

function FAQItem({
  q, a, open, onToggle, id,
}: {
  q: string
  a: string
  open: boolean
  onToggle: () => void
  id: string
}) {
  const panelId = `${id}-panel`
  const buttonId = `${id}-button`
  return (
    <div
      className={`faq-item reveal${open ? ' open' : ''}`}
      onClick={onToggle}
      role="button"
      aria-expanded={open}
      aria-controls={panelId}
      id={buttonId}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
    >
      <div className="faq-question">
        <span>{q}</span>
        <span className="faq-toggle" aria-hidden="true" />
      </div>
      <div className="faq-answer-wrap" id={panelId} role="region" aria-labelledby={buttonId} aria-hidden={!open}>
        <p className="faq-answer">{a}</p>
      </div>
    </div>
  )
}

interface Props {
  onOpenWaitlist: () => void
}

export default function FAQ({ onOpenWaitlist }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const baseId = useId()
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      <div className="page-header">
        <div className="page-header-inner narrow reveal">
          <div className="page-header-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            Straight answers
          </div>
          <h1 className="section-title" id="faq-heading">Frequently asked questions</h1>
          <p className="section-sub">Everything worth knowing before you join the waitlist.</p>
        </div>
      </div>
      <section id="faq" className="section page-body" aria-labelledby="faq-heading">
        <div className="section-inner" style={{ maxWidth: 780 }}>
          <div className="faq-list">
            {faqs.map((item, i) => (
              <FAQItem
                key={item.q}
                {...item}
                id={`${baseId}-${i}`}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-slim" aria-labelledby="faq-cta">
        <div className="cta-slim-inner reveal">
          <p id="faq-cta">Still deciding? Join the waitlist — we&apos;ll reach out when Phase 0 opens.</p>
          <button type="button" className="btn btn-ink" onClick={onOpenWaitlist}>
            Join the waitlist
          </button>
        </div>
      </section>
    </div>
  )
}
