import { useId, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const faqs = [
  { q: 'What is JobHunter?', a: 'JobHunter is an AI-powered, human-in-the-loop job acquisition platform. We automate job discovery, tailor your resume to each role without fabricating experience, and prepare applications for your explicit approval.' },
  { q: 'Is JobHunter free to use?', a: 'The core job search and application automation is free during beta. Skill Development Programs (Phase 3) are paid — with a full refund if you don\u2019t get placed.' },
  { q: 'Will the AI fabricate anything on my resume?', a: 'Never. The AI curates and reorders your existing resume content to fit each job description. It can flag gaps, but it never invents experience, skills, or credentials.' },
  { q: 'Do applications go out without my approval?', a: 'No. Every AI-generated resume variant and cover letter sits in an approval queue. Nothing is sent until you explicitly sign off on it.' },
  { q: 'Which job boards does JobHunter scrape?', a: 'Phase 1 covers Naukri and Indeed. LinkedIn and additional sources are planned for Phase 1. All scraped data stays in your private database — it is never exported.' },
  { q: 'How does the Skill Development Program work?', a: 'Verified professionals run one-on-one or group sessions tailored to your target roles or identified skill gaps. Complete the program and not get placed? Your fee is refunded automatically.' },
  { q: 'Can I become a mentor?', a: 'Yes. We\u2019re onboarding mentors for Phase 3. Head to the For Who page and fill in the mentor form — we\u2019ll reach out with details.' },
  { q: 'When does JobHunter launch?', a: 'We\u2019re currently in Phase 1 — building and validating the core engine. Join the beta waitlist to get notified when early access opens.' },
  { q: 'Is my data safe?', a: 'Yes. The scraped job dataset has no external export endpoints. GDPR and India\u2019s DPDPA consent and deletion workflows are on the Phase 4 roadmap.' },
  { q: 'Is JobHunter (myjobhunter) restricted to the US?', a: 'No — JobHunter is not restricted to any single country. Our platform is currently optimised for the Indian job market, covering leading job boards like Naukri and Indeed India, making it the go-to AI job application tool for job seekers in India. That said, users from the United States, Canada, Australia, Germany, Spain, and several other countries are already among our most active visitors and early users. Whether you are a global professional targeting Indian companies, a remote-first role, or a multinational firm with operations in India, JobHunter works for you regardless of your location. As we progress through our roadmap, we plan to expand coverage to additional regional job boards and country-specific sources so that every job seeker — wherever they are — can benefit from fully automated, AI-powered job hunting.' },
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
      className={`faq-item${open ? ' open' : ''}`}
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
        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a
            }
          }))
        }) }} />
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
          <div className="faq-list reveal">
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
          <p id="faq-cta">Still deciding? Join the beta waitlist — we&apos;ll reach out when Phase 1 opens.</p>
          <button type="button" className="btn btn-ink" onClick={onOpenWaitlist}>
            Join the waitlist
          </button>
        </div>
      </section>
    </div>
  )
}
