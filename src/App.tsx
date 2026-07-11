import { useState, useEffect } from 'react'
import posthog from 'posthog-js'
import Nav from './components/Nav'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import ForWho from './components/ForWho'
import Principles from './components/Principles'
import Roadmap from './components/Roadmap'
import FAQ from './components/FAQ'
import About from './components/About'
import Footer from './components/Footer'
import WaitlistModal from './components/WaitlistModal'
import MentorModal from './components/MentorModal'
import Referral from './components/Referral'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import RefundPolicy from './components/RefundPolicy'
import './App.css'

export type Page =
  | 'home' | 'features' | 'for-who' | 'faq' | 'referral' | 'about'
  | 'privacy-policy' | 'terms-of-service' | 'refund-policy'

const VALID_PAGES: Page[] = [
  'home', 'features', 'for-who', 'faq', 'referral', 'about',
  'privacy-policy', 'terms-of-service', 'refund-policy',
]

function normalizePath(raw: string): Page | null {
  let path = raw
  if (path === 'privacy') path = 'privacy-policy'
  if (path === 'terms' || path === 'tos') path = 'terms-of-service'
  if (path === 'refund') path = 'refund-policy'
  return VALID_PAGES.includes(path as Page) ? (path as Page) : null
}

const pageTitles: Record<Page, string> = {
  home: 'JobHunter — Apply Smart, Not Just Fast',
  features: 'Features — JobHunter',
  'for-who': 'Who JobHunter Is For — Students, Grads, Professionals & Mentors',
  faq: 'Frequently Asked Questions — JobHunter',
  referral: 'Refer a Friend, Land Together — JobHunter Referral Program',
  about: 'About JobHunter — Our Story & Brand',
  'privacy-policy': 'Privacy Policy — JobHunter',
  'terms-of-service': 'Terms of Service — JobHunter',
  'refund-policy': 'Refund and Cancellation Policy — JobHunter',
}

const pageDescriptions: Record<Page, string> = {
  home: 'JobHunter scrapes real openings, tailors your resume to each one, and holds every application behind your approval. Human-in-the-loop, no fabrication. Building in public — Phase 1.',
  features: 'Multi-source scraping, AI resume tailoring that never fabricates, a human approval queue, and a rule-based mail sender — built in phases.',
  'for-who': 'JobHunter is built for college students, recent graduates, unemployed professionals, and freelancers moving to full-time — plus mentors.',
  faq: 'Answers on JobHunter\'s core engine, AI safety and no-fabrication policy, which job boards are scraped, data privacy, and the mentoring program.',
  referral: 'Refer a friend to JobHunter — you both get 20% off and priority cohort access. No caps, no gimmicks.',
  about: 'Learn about JobHunter, our origami crane brand story, mission, and the team behind the AI-powered job acquisition platform.',
  'privacy-policy': 'Read our privacy policy to understand how we collect, process, and protect your personal data under DPDPA and GDPR.',
  'terms-of-service': 'Read our terms of service governing your access to and use of the JobHunter platform and automated application services.',
  'refund-policy': 'Read our refund and cancellation policy to understand terms for subscription cancellations, refunds, billing errors, and consumer rights.',
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
    let path = window.location.pathname
      .replace(/^\/|\/$/g, '')
      .replace(/^JobHunter-Website\/?/, '')
    return normalizePath(path) ?? (() => {
      const params = new URLSearchParams(window.location.search)
      return normalizePath(params.get('page') || '') ?? 'home'
    })()
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false)
  const [mentorTriggerRect, setMentorTriggerRect] = useState<DOMRect | null>(null)
  // null = not yet validated/no code, 'CODE' = verified against DB
  const [referralCode, setReferralCode] = useState<string | null>(null)

  // On mount: validate the ?ref= param against DB before using it
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const raw = sanitizeRefCode(params.get('ref'))

    // Strip the param from the URL immediately regardless of validity
    if (params.get('ref')) {
      params.delete('ref')
      const query = params.toString()
      const cleanUrl = window.location.pathname + (query ? `?${query}` : '')
      window.history.replaceState({}, '', cleanUrl)
    }

    if (!raw) return  // No ref param or failed format check

    // Validate against DB — only open modal + apply code if found
    const validateCode = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/validate-referral-code`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ referral_code: raw }),
          }
        )
        const data = await res.json()
        if (res.ok && data.valid === true) {
          setReferralCode(data.referral_code as string)
          setIsModalOpen(true)
        }
        // Not valid/not found: silently ignore — no modal, no code applied
      } catch {
        // Network error: silently ignore
      }
    }

    validateCode()
  }, [])

  const navigate = (p: Page) => {
    setPage(p)
    const isSubdir = window.location.pathname.startsWith('/JobHunter-Website')
    const prefix = isSubdir ? '/JobHunter-Website' : ''
    const newUrl = p === 'home' ? `${prefix}/` : `${prefix}/${p}`
    window.history.pushState(null, '', newUrl)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
        .replace(/^\/|\/$/g, '')
        .replace(/^JobHunter-Website\/?/, '')
      const fromPath = normalizePath(path)
      if (fromPath) {
        setPage(fromPath)
        return
      }
      const params = new URLSearchParams(window.location.search)
      setPage(normalizePath(params.get('page') || '') ?? 'home')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      if (!anchor) return
      if (anchor.target === '_blank' || anchor.hostname !== window.location.hostname) return

      const href = anchor.getAttribute('href')
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        const path = href
          .replace(/^\/|\/$/g, '')
          .replace(/^JobHunter-Website\/?/, '')
        const targetPage = normalizePath(path === '' ? 'home' : path)
        if (targetPage) {
          e.preventDefault()
          navigate(targetPage)
        }
      }
    }
    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  useEffect(() => {
    const title = pageTitles[page] || pageTitles.home
    const desc = pageDescriptions[page] || pageDescriptions.home

    document.title = title

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', desc)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    const currentUrl = 'https://myjobhunter.in' + (page === 'home' ? '' : `/${page}`)
    canonical.setAttribute('href', currentUrl)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', desc)
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', currentUrl)

    const twitterTitle = document.querySelector('meta[property="twitter:title"]')
    if (twitterTitle) twitterTitle.setAttribute('content', title)
    const twitterDesc = document.querySelector('meta[property="twitter:description"]')
    if (twitterDesc) twitterDesc.setAttribute('content', desc)
    const twitterUrl = document.querySelector('meta[property="twitter:url"]')
    if (twitterUrl) twitterUrl.setAttribute('content', currentUrl)
  }, [page])

  useEffect(() => {
    posthog.capture('$pageview', {
      $current_url: window.location.href,
      page: page,
    })
  }, [page])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const pageParam = params.get('page')
    if (pageParam) {
      params.delete('page')
      const query = params.toString()
      const isSubdir = window.location.pathname.startsWith('/JobHunter-Website')
      const prefix = isSubdir ? '/JobHunter-Website' : ''
      const cleanPath = normalizePath(pageParam)
      const newPath = cleanPath === 'home' ? `${prefix}/` : `${prefix}/${cleanPath}`
      const cleanUrl = newPath + (query ? `?${query}` : '')
      window.location.replace(cleanUrl)
    }
  }, [])



  const handleOpenMentorModal = (rect: DOMRect) => {
    setMentorTriggerRect(rect)
    setIsMentorModalOpen(true)
    posthog.capture('mentor_modal_opened')
  }

  const openWaitlist = () => setIsModalOpen(true)

  return (
    <div className="app">
      <Nav current={page} navigate={navigate} onOpenWaitlist={openWaitlist} />
      <main id="main-content">
        {page === 'home' && (
          <>
            <Hero />
            <HowItWorks />
            <Principles />
            <Roadmap />
          </>
        )}
        {page === 'features' && <Features onOpenWaitlist={openWaitlist} />}
        {page === 'for-who' && (
          <ForWho onOpenMentorModal={handleOpenMentorModal} onOpenWaitlist={openWaitlist} />
        )}
        {page === 'faq' && <FAQ onOpenWaitlist={openWaitlist} />}
        {page === 'about' && <About onOpenWaitlist={openWaitlist} />}
        {page === 'referral' && <Referral />}
        {page === 'privacy-policy' && <PrivacyPolicy />}
        {page === 'terms-of-service' && <TermsOfService />}
        {page === 'refund-policy' && <RefundPolicy />}
      </main>
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
