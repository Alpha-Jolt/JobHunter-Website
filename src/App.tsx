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

export type Page = 'home' | 'how-it-works' | 'features' | 'for-who' | 'faq' | 'referral'

/** Sanitize URL param: only accept 6-10 uppercase alphanumeric characters. */
function sanitizeRefCode(raw: string | null): string | null {
  if (!raw) return null
  const upper = raw.trim().toUpperCase()
  return /^[A-Z0-9]{6,10}$/.test(upper) ? upper : null
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
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

  // Side effect: Clean URL if ref code was detected
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (sanitizeRefCode(params.get('ref'))) {
      const cleanUrl = window.location.pathname
      window.history.replaceState({}, '', cleanUrl)
    }
  }, [])

  const navigate = (p: Page) => {
    setPage(p)
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
      {page === 'how-it-works' && <HowItWorks standalone />}
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
