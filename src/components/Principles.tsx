import { useState, useEffect } from 'react'

const BanIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></svg>
)
const UserCheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" /></svg>
)
const CpuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" rx="1" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" /></svg>
)
const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
)
const ShieldCheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
)
const CoinsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18.06" /><path d="M7 6h1v4" /><path d="m16.71 13.88.7.71-2.82 2.82" /></svg>
)

const principles = [
  {
    icon: <BanIcon />,
    title: 'No fabrication',
    desc: 'The AI curates and reorders your existing resume content. It never invents experience, skills, or credentials.',
    image: '/spinning_carousel/1_No_Fabrication.png',
    alt: 'JobHunter commitment: No Fabrication — AI curates your existing resume content, never invents skills or experience',
  },
  {
    icon: <UserCheckIcon />,
    title: 'You approve everything',
    desc: 'No resume variant or cover letter is sent without your explicit sign-off. Nothing moves forward without you.',
    image: '/spinning_carousel/2_You_Approve_Everything.png',
    alt: 'JobHunter commitment: You Approve Everything — no resume or cover letter is sent without your explicit sign-off',
  },
  {
    icon: <CpuIcon />,
    title: 'Deterministic by default',
    desc: 'The scraper and mail sender are rule-based systems. AI is confined to the one step it belongs in — resume tailoring.',
    image: '/spinning_carousel/3_Deterministic_By_Default.png',
    alt: 'JobHunter commitment: Deterministic by Default — scraper and mail sender are rule-based; AI is confined to resume tailoring',
  },
  {
    icon: <LockIcon />,
    title: 'Your data stays yours',
    desc: 'The scraped job dataset has no external export endpoints. It is private by default, not by policy.',
    image: '/spinning_carousel/4_Your_Data_Stays_Yours.png',
    alt: 'JobHunter commitment: Your Data Stays Yours — scraped job dataset has no external export endpoints, private by default',
  },
  {
    icon: <ShieldCheckIcon />,
    title: 'Compliance by design',
    desc: 'Scam detection, abuse prevention, placement verification, and GDPR / DPDPA workflows are on the roadmap — not afterthoughts.',
    image: '/spinning_carousel/5_Compliance_By_Design.png',
    alt: 'JobHunter commitment: Compliance by Design — scam detection, GDPR and DPDPA workflows built in, not bolted on',
  },
  {
    icon: <CoinsIcon />,
    title: 'Placement guarantee',
    desc: 'Enroll in a Skill Development Program and not get placed? Your fee is refunded — enforced by logic, not by trust.',
    image: '/spinning_carousel/6_Placement_Guarantee.png',
    alt: 'JobHunter commitment: Placement Guarantee — enroll in a Skill Development Program, not placed, fee is refunded',
  },
]

export default function Principles() {
  const [activeIndex, setActiveIndex] = useState(0)

  const advance = () => setActiveIndex((i) => (i + 1) % principles.length)
  const retreat = () => setActiveIndex((i) => (i - 1 + principles.length) % principles.length)
  const goTo = (index: number) => setActiveIndex(index)

  useEffect(() => {
    const reduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reduced) return

    const timer = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % principles.length)
    }, 3500)

    return () => window.clearInterval(timer)
  }, [])

  const handleNext = () => { advance() }
  const handlePrev = () => { retreat() }

  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "JobHunter's Six Core Commitments",
    "description": "The rules JobHunter is built around — from no fabrication to a placement guarantee.",
    "itemListElement": principles.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": p.title,
      "description": p.desc
    }))
  }

  // To map physical DOM order to logical visual order for the carousel
  const getRelativePosition = (index: number) => {
    const len = principles.length
    let diff = index - activeIndex
    if (diff < -2) diff += len
    if (diff > 3) diff -= len
    // Keep diff between -2 and 3. In a 6-item carousel:
    // active is 0
    // next is 1
    // far next is 2
    // far far next is 3 (hidden at back)
    // prev is -1
    // far prev is -2
    return diff
  }

  return (
    <section
      id="principles"
      className="section principles-carousel"
      aria-labelledby="principles-heading"
    >
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="section-inner prc-inner">

        {/* LEFT: CONTENT PANEL */}
        <div className="prc-content" aria-live="polite">
          <div className="section-label">What we commit to</div>
          <h2 className="section-title" id="principles-heading">
            <span style={{ whiteSpace: 'nowrap' }}>Six commitments,</span><br />not six features
          </h2>

          <div className="prc-content-viewport">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className={`prc-slide ${i === activeIndex ? 'active' : ''}`}
                aria-hidden={i !== activeIndex}
              >
                <div className="prc-badge">
                  <span className="prc-icon" aria-hidden="true">{p.icon}</span>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="prc-controls">
            <button className="prc-nav-btn" onClick={handlePrev} aria-label="Previous commitment">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>

            <div className="prc-dots" role="tablist">
              {principles.map((p, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Go to commitment ${i + 1}: ${p.title}`}
                  className={`prc-dot ${i === activeIndex ? 'active' : ''}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>

            <button className="prc-nav-btn" onClick={handleNext} aria-label="Next commitment">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>

        {/* RIGHT: 3D CAROUSEL */}
        <div className="prc-stage" aria-hidden="true">
          <div className="prc-track">
            {principles.map((p, i) => {
              const pos = getRelativePosition(i)
              // Only render visible items plus one off-screen for transition buffer to save DOM elements
              // We'll just render all 6 since the list is small enough.
              return (
                <figure
                  key={p.title}
                  className="prc-card"
                  data-pos={pos}
                  onClick={() => pos !== 0 && goTo(i)}
                  style={{ cursor: pos !== 0 ? 'pointer' : 'default' }}
                >
                  <img
                    src={p.image}
                    alt={p.alt}
                    width="600"
                    height="400"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                    decoding="async"
                  />
                  <figcaption className="sr-only">{p.title}</figcaption>
                </figure>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
