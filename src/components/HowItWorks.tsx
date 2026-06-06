import { useState, useEffect, useRef } from 'react'

const steps = [
  {
    tag: 'Onboard',
    title: 'Tell us what you want',
    desc: 'Fill in a short questionnaire — your skills, target role, location, salary range, and experience level. This drives everything downstream.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    illustration: (
      <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="30" width="200" height="140" rx="12" fill="#fff7f2" stroke="#f2711c" strokeWidth="1.5"/>
        <rect x="60" y="55" width="120" height="10" rx="5" fill="#f2711c" fillOpacity="0.3"/>
        <rect x="60" y="75" width="160" height="8" rx="4" fill="#e9ecef"/>
        <rect x="60" y="91" width="140" height="8" rx="4" fill="#e9ecef"/>
        <rect x="60" y="115" width="80" height="8" rx="4" fill="#e9ecef"/>
        <rect x="60" y="131" width="100" height="8" rx="4" fill="#e9ecef"/>
        <circle cx="218" cy="148" r="14" fill="#f2711c"/>
        <path d="m213 148 3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tag: 'Discover',
    title: 'We scrape jobs for you',
    desc: 'Our engine pulls fresh listings from LinkedIn, Naukri, Indeed, and more. All data stays in your private database — never exported.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    ),
    illustration: (
      <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="140" cy="100" r="60" fill="#fff7f2" stroke="#f2711c" strokeWidth="1.5"/>
        <circle cx="140" cy="100" r="40" fill="none" stroke="#f2711c" strokeWidth="1" strokeDasharray="4 4"/>
        <circle cx="140" cy="100" r="8" fill="#f2711c"/>
        {/* orbiting dots */}
        <circle cx="183" cy="78" r="5" fill="#f2711c" fillOpacity="0.6"/>
        <circle cx="175" cy="130" r="4" fill="#f2711c" fillOpacity="0.4"/>
        <circle cx="100" cy="68" r="4" fill="#f2711c" fillOpacity="0.5"/>
        <circle cx="97" cy="128" r="5" fill="#f2711c" fillOpacity="0.35"/>
        {/* labels */}
        <rect x="188" y="55" width="52" height="16" rx="8" fill="#fff7f2" stroke="#f2711c" strokeWidth="1"/>
        <rect x="191" y="60" width="46" height="6" rx="3" fill="#f2711c" fillOpacity="0.4"/>
        <rect x="56" y="44" width="52" height="16" rx="8" fill="#fff7f2" stroke="#f2711c" strokeWidth="1"/>
        <rect x="59" y="49" width="46" height="6" rx="3" fill="#f2711c" fillOpacity="0.4"/>
      </svg>
    ),
  },
  {
    tag: 'Select',
    title: 'Browse and select',
    desc: 'View a filterable, searchable list of matched jobs. Pick individual listings or bulk-select companies you want to target.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>
      </svg>
    ),
    illustration: (
      <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="25" width="220" height="150" rx="10" fill="#fff7f2" stroke="#f2711c" strokeWidth="1.5"/>
        {/* search bar */}
        <rect x="46" y="42" width="188" height="24" rx="6" fill="white" stroke="#e9ecef" strokeWidth="1"/>
        <circle cx="62" cy="54" r="5" fill="none" stroke="#f2711c" strokeWidth="1.5"/>
        <path d="m66 58 3 3" stroke="#f2711c" strokeWidth="1.5" strokeLinecap="round"/>
        {/* rows */}
        {[80, 104, 128, 152].map((y, i) => (
          <g key={y}>
            <rect x="46" y={y} width="188" height="18" rx="4" fill={i === 1 ? 'rgba(242,113,28,0.08)' : 'white'} stroke={i === 1 ? '#f2711c' : '#e9ecef'} strokeWidth="1"/>
            <rect x="56" y={y + 5} width="60" height="8" rx="3" fill="#e9ecef"/>
            <rect x="124" y={y + 5} width="40" height="8" rx="3" fill="#e9ecef"/>
            {i === 1 && <circle cx="222" cy={y + 9} r="5" fill="#f2711c"/>}
            {i === 1 && <path d={`m219 ${y+9} 2 2 4-4`} stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
          </g>
        ))}
      </svg>
    ),
  },
  {
    tag: 'Tailor',
    title: 'AI tailors your resume',
    desc: 'For each selected job, the AI analyses the description against your resume and produces a tailored variant and cover letter. It curates — never fabricates.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>
      </svg>
    ),
    illustration: (
      <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* two docs side by side with arrow */}
        <rect x="20" y="40" width="90" height="120" rx="8" fill="white" stroke="#e9ecef" strokeWidth="1.5"/>
        <rect x="30" y="58" width="70" height="6" rx="3" fill="#e9ecef"/>
        <rect x="30" y="72" width="55" height="6" rx="3" fill="#e9ecef"/>
        <rect x="30" y="86" width="60" height="6" rx="3" fill="#e9ecef"/>
        <rect x="30" y="100" width="50" height="6" rx="3" fill="#e9ecef"/>
        <rect x="30" y="114" width="65" height="6" rx="3" fill="#e9ecef"/>
        {/* bot circle */}
        <circle cx="140" cy="100" r="22" fill="#f2711c"/>
        <path d="M133 100h14M140 93v14" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="134" cy="97" r="2" fill="#fff"/>
        <circle cx="146" cy="97" r="2" fill="#fff"/>
        {/* arrow */}
        <path d="M162 100h18" stroke="#f2711c" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="m176 95 6 5-6 5" stroke="#f2711c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        {/* tailored doc */}
        <rect x="170" y="40" width="90" height="120" rx="8" fill="#fff7f2" stroke="#f2711c" strokeWidth="1.5"/>
        <rect x="180" y="58" width="70" height="6" rx="3" fill="#f2711c" fillOpacity="0.4"/>
        <rect x="180" y="72" width="55" height="6" rx="3" fill="#f2711c" fillOpacity="0.25"/>
        <rect x="180" y="86" width="60" height="6" rx="3" fill="#e9ecef"/>
        <rect x="180" y="100" width="70" height="6" rx="3" fill="#f2711c" fillOpacity="0.4"/>
        <rect x="180" y="114" width="50" height="6" rx="3" fill="#e9ecef"/>
      </svg>
    ),
  },
  {
    tag: 'Approve',
    title: 'You approve, we send',
    desc: 'Every generated document sits in an approval queue. Nothing moves forward without your explicit sign-off. Once approved, applications go out automatically.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
    ),
    illustration: (
      <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="30" width="180" height="110" rx="10" fill="white" stroke="#e9ecef" strokeWidth="1.5"/>
        <rect x="66" y="50" width="148" height="8" rx="4" fill="#e9ecef"/>
        <rect x="66" y="66" width="110" height="8" rx="4" fill="#e9ecef"/>
        <rect x="66" y="82" width="130" height="8" rx="4" fill="#e9ecef"/>
        {/* approve button */}
        <rect x="66" y="104" width="68" height="22" rx="6" fill="#f2711c"/>
        <path d="m74 115 4 4 9-9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="86" y="110" width="40" height="8" rx="4" fill="#fff" fillOpacity="0.5"/>
        {/* send arrow */}
        <path d="M140 158 q50-20 80-50" stroke="#f2711c" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round"/>
        <path d="m218 109-5 1 2 5" stroke="#f2711c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        {/* envelope */}
        <rect x="200" y="155" width="50" height="36" rx="6" fill="#fff7f2" stroke="#f2711c" strokeWidth="1.5"/>
        <path d="M200 161l25 16 25-16" stroke="#f2711c" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    tag: 'Improve',
    title: 'Track and improve',
    desc: 'Your application history, response rates, and email threads are tracked. Over time, the platform surfaces insights to sharpen your approach.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>
      </svg>
    ),
    illustration: (
      <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="25" width="220" height="150" rx="10" fill="white" stroke="#e9ecef" strokeWidth="1.5"/>
        {/* axes */}
        <line x1="55" y1="155" x2="235" y2="155" stroke="#e9ecef" strokeWidth="1.5"/>
        <line x1="55" y1="55" x2="55" y2="155" stroke="#e9ecef" strokeWidth="1.5"/>
        {/* bars */}
        <rect x="70"  y="125" width="22" height="30" rx="3" fill="#f2711c" fillOpacity="0.3"/>
        <rect x="105" y="110" width="22" height="45" rx="3" fill="#f2711c" fillOpacity="0.4"/>
        <rect x="140" y="90"  width="22" height="65" rx="3" fill="#f2711c" fillOpacity="0.6"/>
        <rect x="175" y="70"  width="22" height="85" rx="3" fill="#f2711c" fillOpacity="0.8"/>
        <rect x="210" y="55"  width="22" height="100" rx="3" fill="#f2711c"/>
        {/* trend line */}
        <polyline points="81,140 116,122 151,102 186,82 221,65" stroke="#f2711c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
]

const STEP_HEIGHT = 320

export default function HowItWorks() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const clickRef = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (clickRef.current || !sectionRef.current) return
      const scrolled = -sectionRef.current.getBoundingClientRect().top
      if (scrolled < 0) return
      setActive(Math.min(steps.length - 1, Math.floor(scrolled / STEP_HEIGHT)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (i: number) => {
    if (!sectionRef.current) return
    clickRef.current = true
    setActive(i)
    window.scrollTo({ top: sectionRef.current.offsetTop + i * STEP_HEIGHT + 1, behavior: 'smooth' })
    setTimeout(() => { clickRef.current = false }, 900)
  }

  return (
    <div ref={sectionRef} style={{ height: `calc(100vh + ${steps.length * STEP_HEIGHT}px)` }} id="how-it-works">
      <div className="hiw-sticky">
        <div className="section-inner">
          <div className="section-label">How It Works</div>
          <h2 className="section-title" id="hiw-heading">
            From signup to sent application<br />in 6 simple steps
          </h2>
          <p className="section-sub">
            A fully automated pipeline with human approval gates at the only step that matters.
          </p>

          <div className="hiw-stepper" role="tablist">
            {steps.map((step, i) => (
              <button
                key={step.tag}
                className={`hiw-step-btn${active === i ? ' active' : ''}${i < active ? ' done' : ''}`}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={active === i}
              >
                <span className="hiw-step-circle">
                  {i < active
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    : <span>{i + 1}</span>}
                </span>
                <span className="hiw-step-label">{step.tag}</span>
              </button>
            ))}
          </div>

          <div className="hiw-detail" role="tabpanel" key={active}>
            <div className="hiw-detail-left">
              <div className="hiw-detail-icon">{steps[active].icon}</div>
              <h3 className="hiw-detail-title">{steps[active].title}</h3>
              <p className="hiw-detail-desc">{steps[active].desc}</p>

            </div>
            <div className="hiw-detail-illustration" aria-hidden="true">
              {steps[active].illustration}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
