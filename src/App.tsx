import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import ForWho from './components/ForWho'
import Principles from './components/Principles'
import Roadmap from './components/Roadmap'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import WaitlistModal from './components/WaitlistModal'
import MentorModal from './components/MentorModal'
import Referral from './components/Referral'
import './App.css'

export type Page = 'home' | 'features' | 'for-who' | 'faq' | 'referral'

const pageTitles: Record<Page, string> = {
  home: 'JobHunter — Land Your Next Job on Autopilot',
  features: 'Automated Job Search Features — JobHunter',
  'for-who': 'Who is JobHunter For? — College Students, Grads & Mentors',
  faq: 'Frequently Asked Questions — JobHunter',
  referral: 'Invite Friends & Earn 20% Off — JobHunter Referral Program',
}

const pageDescriptions: Record<Page, string> = {
  home: 'JobHunter is the intelligent job acquisition platform that automates job discovery, tailors your resume with AI, and sends applications on your behalf.',
  features: 'Explore the key features of JobHunter, including multi-source job scraping, AI resume tailoring, human-in-the-loop approval, and scam detection.',
  'for-who': 'JobHunter is built for college students, recent graduates, and career changers looking to scale their job search, plus active mentoring opportunities.',
  faq: 'Find answers to common questions about JobHunter\'s core engine, AI safety, job boards scraped, data privacy, and the mentoring program.',
  referral: 'Share JobHunter with your network to earn 20% off your subscription and priority cohort access for you and your friends.',
}

/** Sanitize URL param: only accept 6-10 uppercase alphanumeric characters. */
function sanitizeRefCode(raw: string | null): string | null {
  if (!raw) return null
  const upper = raw.trim().toUpperCase()
  return /^[A-Z0-9]{6,10}$/.test(upper) ? upper : null
}

export default function App() {
  const [page, setPage] = useState<Page>(() => {
    if (typeof window === 'undefined') return 'home'
    const params = new URLSearchParams(window.location.search)
    const p = params.get('page') as Page
    if (['home', 'features', 'for-who', 'faq', 'referral'].includes(p)) {
      return p
    }
    return 'home'
  })
  const [isModalOpen, setIsModalOpen] = useState(() => {
    if (typeof window === 'undefined') return false
    const params = new URLSearchParams(window.location.search)
    return !!sanitizeRefCode(params.get('ref'))
  })
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false)
  const [mentorTriggerRect, setMentorTriggerRect] = useState<DOMRect | null>(null)
  const [referralCode] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    const params = new URLSearchParams(window.location.search)
    return sanitizeRefCode(params.get('ref'))
  })

  // Side effect: Clean URL if ref code was detected, preserving other query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (sanitizeRefCode(params.get('ref'))) {
      params.delete('ref')
      const query = params.toString()
      const cleanUrl = window.location.pathname + (query ? `?${query}` : '')
      window.history.replaceState({}, '', cleanUrl)
    }
  }, [])

  // Listen for history popstate events (e.g. back/forward browser buttons)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const p = params.get('page') as Page
      if (['home', 'features', 'for-who', 'faq', 'referral'].includes(p)) {
        setPage(p)
      } else {
        setPage('home')
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Update document title, meta tags, and canonical link dynamically
  useEffect(() => {
    const title = pageTitles[page] || pageTitles.home
    const desc = pageDescriptions[page] || pageDescriptions.home

    // Title
    document.title = title

    // Meta Description
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', desc)
    }

    // Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    const currentUrl = window.location.origin + (page === 'home' ? '' : `${page}`)
    canonical.setAttribute('href', currentUrl)

    // Open Graph / Facebook
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', desc)

    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', currentUrl)

    // Twitter
    const twitterTitle = document.querySelector('meta[property="twitter:title"]')
    if (twitterTitle) twitterTitle.setAttribute('content', title)

    const twitterDesc = document.querySelector('meta[property="twitter:description"]')
    if (twitterDesc) twitterDesc.setAttribute('content', desc)

    const twitterUrl = document.querySelector('meta[property="twitter:url"]')
    if (twitterUrl) twitterUrl.setAttribute('content', currentUrl)
  }, [page])

  const navigate = (p: Page) => {
    setPage(p)
    const newUrl = p === 'home' ? '/' : `${p}`
    window.history.pushState(null, '', newUrl)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenMentorModal = (rect: DOMRect) => {
    setMentorTriggerRect(rect)
    setIsMentorModalOpen(true)
  }

  return (
    <div className="app">
      <Nav current={page} navigate={navigate} onOpenWaitlist={() => setIsModalOpen(true)} />
      {page === 'home' && (
        <>
          <Hero />
          <HowItWorks />
          <Principles />
          <Roadmap />
        </>
      )}
      {page === 'features' && <Features />}
      {page === 'for-who' && <ForWho onOpenMentorModal={handleOpenMentorModal} />}
      {page === 'faq' && <FAQ />}
      {page === 'referral' && <Referral />}
      <Footer navigate={navigate} />

      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        referralCode={referralCode ?? undefined}
      />
      <MentorModal
        isOpen={isMentorModalOpen}
        onClose={() => setIsMentorModalOpen(false)}
        triggerRect={mentorTriggerRect}
      />
    </div>
  )
}
