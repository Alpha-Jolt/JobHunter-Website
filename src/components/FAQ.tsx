import { useState } from 'react'

const faqs = [
  {
    q: 'Is JobHunter free to use?',
    a: 'The core job search and application automation features will be free during beta. Skill Development Programs (Phase 3) are paid, with a full refund if you don\'t get placed.',
  },
  {
    q: 'Will the AI fabricate anything on my resume?',
    a: 'Never. The AI curates and reorders your existing resume content to match each job description. It identifies skill gaps but never invents experience, skills, or credentials.',
  },
  {
    q: 'Do applications go out without my approval?',
    a: 'No. Every AI-generated resume variant and cover letter sits in an approval queue. Nothing is sent until you explicitly sign off on it.',
  },
  {
    q: 'Which job boards does JobHunter scrape?',
    a: 'Phase 0 covers Naukri and Indeed. LinkedIn and additional sources are planned for Phase 1. All scraped data stays in your private database — it is never exported.',
  },
  {
    q: 'How does the Skill Development Program work?',
    a: 'Verified working professionals run one-on-one or group sessions tailored to your job requirements or identified skill gaps. If you complete the program and don\'t get placed, your fee is refunded automatically.',
  },
  {
    q: 'Can I become a mentor?',
    a: 'Yes. We\'re onboarding mentors for Phase 3. Head to the For Who page and fill in the mentor interest form — we\'ll reach out with details.',
  },
  {
    q: 'When does JobHunter launch?',
    a: 'We\'re currently in Phase 0 — building and validating the core engine. Join the waitlist to get notified when early access opens.',
  },
  {
    q: 'Is my data safe?',
    a: 'Yes. The scraped job dataset has no external export endpoints. GDPR and India\'s DPDPA consent and deletion workflows are built into the Phase 4 roadmap.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-item" onClick={() => setOpen(!open)} role="button" aria-expanded={open} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}>
      <div className="faq-question">
        <span>{q}</span>
        <span className="faq-chevron" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </div>
      {open && <p className="faq-answer">{a}</p>}
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="section" aria-labelledby="faq-heading">
      <div className="section-inner" style={{ maxWidth: 720 }}>
        <div className="section-label">FAQ</div>
        <h2 className="section-title" id="faq-heading">Frequently asked questions</h2>
        <p className="section-sub" style={{ marginBottom: 48 }}>
          Everything you need to know before joining the waitlist.
        </p>
        <div className="faq-list">
          {faqs.map((item) => <FAQItem key={item.q} {...item} />)}
        </div>
      </div>
    </section>
  )
}
