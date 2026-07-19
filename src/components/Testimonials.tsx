import { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import TestimonialModal from './TestimonialModal'
import { type TestimonialSource, type Testimonial, sourceLabels } from './TestimonialConstants'

const PHIcon = () => (
  <svg viewBox="0 0 40 40" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
    <path fill="#DA552F" d="M20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0zm0 18h-4v7h-3V11h7c3.866 0 7 3.134 7 7s-3.134 7-7 7zM16 14v4h4c1.657 0 3-1.343 3-3s-1.343-3-3-3h-4z" />
  </svg>
)

const LIIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const IGIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F58529" />
        <stop offset="25%" stopColor="#FEDA77" />
        <stop offset="50%" stopColor="#DD2A7B" />
        <stop offset="75%" stopColor="#8134AF" />
        <stop offset="100%" stopColor="#515BD4" />
      </linearGradient>
    </defs>
    <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const DMIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--ink)" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
  </svg>
)

const YTIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="#FF0000" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 00-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 002.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const ArticleIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--text-muted)" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--ink)" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const RedditIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="#FF4500" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.75-1.64-6.07-1.72.08-1.1.4-3.05 1.52-3.7.72-.4 1.73-.24 3 .5C17.2 6.3 18.46 7.5 20 7.5c1.65 0 3-1.35 3-3s-1.35-3-3-3c-1.38 0-2.54.94-2.88 2.22-1.43-.72-2.64-.8-3.6-.25-1.64.94-1.95 3.47-2 4.55-2.33.08-4.45.7-6.1 1.72C4.86 8.98 3.96 8.5 3 8.5c-1.65 0-3 1.35-3 3 0 1.32.84 2.44 2.05 2.84-.03.22-.05.44-.05.66 0 3.86 4.5 7 10 7s10-3.14 10-7c0-.22-.02-.44-.05-.66 1.2-.4 2.05-1.54 2.05-2.84zM2.3 11.5c0-.94.76-1.7 1.7-1.7.6 0 1.14.32 1.46.8-1.36.97-2.46 2.24-3.15 3.65-.01-.05-.01-.1-.01-.15zm19.4 0c0 .05 0 .1-.01.15-.7-1.4-1.8-2.68-3.16-3.65.32-.48.86-.8 1.46-.8.94 0 1.7.76 1.7 1.7z" />
  </svg>
)

const SourceIcon = ({ source }: { source: TestimonialSource }) => {
  switch (source) {
    case 'ph': return <PHIcon />
    case 'li': return <LIIcon />
    case 'ig': return <IGIcon />
    case 'dm': return <DMIcon />
    case 'yt': return <YTIcon />
    case 'article': return <ArticleIcon />
    case 'x': return <XIcon />
    case 'reddit': return <RedditIcon />
  }
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-quote">
        <span className="testimonial-quote-glyph">"</span>
        <span className="testimonial-quote-text">{t.quote}</span>
      </div>
      <div className="testimonial-attribution">
        <span className="testimonial-name">{t.name}</span>
        <span className={`source-badge source-${t.source}`} data-source={t.source}>
          <SourceIcon source={t.source} />
          {sourceLabels[t.source]}
        </span>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const ref = useReveal<HTMLElement>()

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/testimonials?approved=eq.true&select=*`, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          }
        })
        const data = await res.json()
        if (res.ok && Array.isArray(data)) {
          setTestimonials(data)
        }
      } catch (err) {
        console.error("Failed to load testimonials:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  // Only use marquee if there are enough testimonials to make it look good
  const isScrollable = testimonials.length >= 4
  
  // Only split into two rows if we have at least 6 testimonials, 
  // otherwise they repeat too quickly on the screen.
  const useTwoRows = testimonials.length >= 6

  const half = useTwoRows ? Math.ceil(testimonials.length / 2) : testimonials.length
  const row1 = isScrollable ? testimonials.slice(0, half) : testimonials
  const row2 = isScrollable && useTwoRows ? testimonials.slice(half) : []

  // Create enough clones to fill the screen only if scrollable
  const row1Repeated = isScrollable ? [...row1, ...row1, ...row1, ...row1] : row1
  const row2Repeated = isScrollable ? [...row2, ...row2, ...row2, ...row2] : row2

  return (
    <section className="section testimonials" aria-labelledby="testimonials-heading" ref={ref}>
      <div className="section-inner" style={{ maxWidth: '100%', padding: '0' }}>
        <div className="reveal testimonials-header-wrap" style={{ textAlign: 'center', marginBottom: '48px', padding: '0 24px' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Real voices</div>
          <h2 className="section-title" id="testimonials-heading">
            From people actually hunting
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Early users, waitlisters, and followers — in their own words.
          </p>
        </div>

        {loading ? (
          <div className="testimonials-skeleton">
            <div className="testimonial-card skeleton" />
            <div className="testimonial-card skeleton" />
            <div className="testimonial-card skeleton" />
          </div>
        ) : testimonials.length > 0 ? (
          <div className="testimonials-rows">
            <div className="testimonials-marquee-wrap">
              <div 
                className={`testimonials-track ${isScrollable ? 'marquee-ltr' : ''}`}
                style={!isScrollable ? { width: '100%', justifyContent: 'center', flexWrap: 'wrap' } : undefined}
              >
                {row1Repeated.map((t, i) => <TestimonialCard key={`${t.id}-${i}`} t={t} />)}
              </div>
            </div>
            {isScrollable && row2.length > 0 && (
              <div className="testimonials-marquee-wrap">
                <div className="testimonials-track marquee-rtl" style={{ marginTop: '24px' }}>
                  {row2Repeated.map((t, i) => <TestimonialCard key={`${t.id}-${i}`} t={t} />)}
                </div>
              </div>
            )}
          </div>
        ) : null}

        <div className="reveal" style={{ maxWidth: 780, margin: '64px auto 0', padding: '0 24px', textAlign: 'center' }}>
          <button className="btn-share-story" onClick={() => setIsModalOpen(true)}>
            Share your story
          </button>
        </div>
      </div>
      <TestimonialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
