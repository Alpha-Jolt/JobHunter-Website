import { useId, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const faqs = [
  { q: 'What is JobHunter?', a: 'JobHunter is an AI-powered, human-in-the-loop job search companion. We automate job discovery, tailor your resume to each role without fabricating experience, and prepare applications for your explicit approval.' },
  { q: 'How does JobHunter find jobs for me?', a: 'JobHunter scrapes relevant job listings from major platforms like Naukri and Indeed. We bring the best opportunities directly to your dashboard so you don\'t have to spend hours searching manually.' },
  { q: 'Does JobHunter automatically apply to jobs?', a: 'No, and this is by design. JobHunter prepares your application, but every resume variant and cover letter sits in an approval queue. Nothing is sent without your explicit sign-off.' },
  { q: 'Does JobHunter customize my resume for every job?', a: 'Yes. The AI analyzes each job description and curates your existing resume content to highlight the most relevant skills and experience. It never fabricates or invents credentials.' },
  { q: 'Does JobHunter write my cover letter?', a: 'Yes. JobHunter generates a personalized cover letter for each role based on your tailored resume and the specific job requirements. You can review and edit it before sending.' },
  { q: 'Can JobHunter apply using my Gmail or Outlook account?', a: 'Yes. Once you approve an application, JobHunter uses a secure bridge to send the email directly from your connected Gmail or Outlook account, so you own the communication thread.' },
  { q: 'How is JobHunter different from LinkedIn or Indeed?', a: 'LinkedIn and Indeed are job boards where you manually search and apply. JobHunter is a job search companion that sits on top of those boards, automating the discovery, tailoring, and drafting process for you.' },
  { q: 'Who is JobHunter built for?', a: 'JobHunter is designed for college students, recent graduates, unemployed professionals, and freelancers who need to scale their job search without losing quality or burning out.' },
  { q: 'Is JobHunter free to use?', a: 'The core job search and application automation is free during beta. Advanced Skill Development Programs (Phase 3) will be paid, with a full refund guarantee if you don\'t get placed.' },
  { q: 'Is JobHunter available outside India?', a: 'While our platform is currently optimized for the Indian job market (covering Naukri and Indeed India), it is not restricted. Job seekers globally can use JobHunter, and we plan to expand coverage to more international job boards soon.' },
  { q: 'Is my data safe?', a: 'Absolutely. The scraped job dataset has no external export endpoints. We are building in public with privacy first, incorporating GDPR and India\'s DPDPA compliance into our roadmap.' },
  { q: 'Can I become a mentor?', a: 'Yes. We\'re onboarding mentors for Phase 3. Head to the For Who page and fill in the mentor form to join our verified professional network.' },
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
