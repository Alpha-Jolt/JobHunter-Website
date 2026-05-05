import { useEffect, useRef } from 'react'

interface Props {
  standalone?: boolean
}

const steps = [
  {
    title: 'Tell us what you want',
    desc: 'Fill in a short questionnaire — your skills, target role, location, salary range, and experience level. This drives everything downstream.',
  },
  {
    title: 'We scrape jobs for you',
    desc: 'Our engine pulls fresh listings from LinkedIn, Naukri, Indeed, and more. All data stays in your private database — never exported.',
  },
  {
    title: 'Browse and select',
    desc: 'View a filterable, searchable list of matched jobs. Pick individual listings or bulk-select companies you want to target.',
  },
  {
    title: 'AI tailors your resume',
    desc: 'For each selected job, the AI analyses the description against your resume and produces a tailored variant and cover letter. It curates — never fabricates.',
  },
  {
    title: 'You approve, we send',
    desc: 'Every generated document sits in an approval queue. Nothing moves forward without your explicit sign-off. Once approved, applications go out automatically.',
  },
  {
    title: 'Track and improve',
    desc: 'Your application history, response rates, and email threads are tracked. Over time, the platform surfaces insights to sharpen your approach.',
  },
]

export default function HowItWorks({ standalone }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.section-label, .section-title, .section-sub, .hiw-steps, .hiw-step')
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="how-it-works" className="section" aria-labelledby="hiw-heading" ref={sectionRef}>
      {standalone && (
        <div className="page-header" style={{ padding: '64px 24px 0', marginBottom: 0 }}>
          <div className="page-header-inner">
            <div className="section-label animate-in">Process</div>
          </div>
        </div>
      )}
      <div className="section-inner">
        {!standalone && <div className="section-label animate-in">How It Works</div>}
        <h2 className="section-title animate-in" id="hiw-heading">
          From signup to sent application<br />in six steps
        </h2>
        <p className="section-sub animate-in">
          A fully automated pipeline with human approval gates at the only step that matters.
        </p>

        <div className="hiw-steps animate-in" role="list">
          {steps.map((step, i) => (
            <div className="hiw-step" key={step.title} role="listitem">
              <div className="hiw-num" aria-hidden="true">{i + 1}</div>
              <div className="hiw-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
