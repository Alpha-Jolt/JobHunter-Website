import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import posthog from 'posthog-js'
import Nav from './components/Nav'
import Hero from './components/Hero'
import FeaturedOn from './components/FeaturedOn'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import ForWho from './components/ForWho'
import Principles from './components/Principles'
import Testimonials from './components/Testimonials'
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
import BlogIndex from './components/blog/BlogIndex'
import BlogPost from './components/blog/BlogPost'
import BlogAdmin from './components/blog/BlogAdmin'
import './App.css'

const pageTitles: Record<string, string> = {
  '/': 'JobHunter — Land Your Next Job on Autopilot',
  '/features': 'Features — JobHunter',
  '/for-who': 'Who JobHunter Is For — Students, Grads, Professionals & Mentors',
  '/faq': 'Frequently Asked Questions — JobHunter',
  '/referral': 'Refer a Friend, Land Together — JobHunter Referral Program',
  '/about': 'About JobHunter — Our Story, Brand & Mission',
  '/privacy-policy': 'Privacy Policy — JobHunter',
  '/terms-of-service': 'Terms of Service — JobHunter',
  '/refund-policy': 'Refund and Cancellation Policy — JobHunter',
  '/blog': 'Blog — JobHunter',
  '/blog/admin': 'Blog Admin — JobHunter',
}

const pageDescriptions: Record<string, string> = {
  '/': 'JobHunter scrapes real openings, tailors your resume to each one, and holds every application behind your approval. Human-in-the-loop, no fabrication. Building in public — Phase 1.',
  '/features': 'Multi-source scraping, AI resume tailoring that never fabricates, a human approval queue, and a rule-based mail sender — built in phases.',
  '/for-who': 'JobHunter is built for college students, recent graduates, unemployed professionals, and freelancers moving to full-time — plus mentors.',
  '/faq': 'Answers on JobHunter\'s core engine, AI safety and no-fabrication policy, which job boards are scraped, data privacy, and the mentoring program.',
  '/referral': 'Refer a friend to JobHunter — you both get 20% off and priority cohort access. No caps, no gimmicks.',
  '/about': 'Learn about JobHunter, our origami crane brand story, mission, and the team behind the AI-powered job acquisition platform.',
  '/privacy-policy': 'Read our privacy policy to understand how we collect, process, and protect your personal data under DPDPA and GDPR.',
  '/terms-of-service': 'Read our terms of service governing your access to and use of the JobHunter platform and automated application services.',
  '/refund-policy': 'Read our refund and cancellation policy to understand terms for subscription cancellations, refunds, billing errors, and consumer rights.',
  '/blog': 'JobHunter Blog — Job search tips, resume advice, career growth articles, and build-in-public updates.',
  '/blog/admin': 'Blog Admin panel.',
}

/** Sanitize URL param: only accept 6-10 uppercase alphanumeric characters. */
function sanitizeRefCode(raw: string | null): string | null {
  if (!raw) return null
  const upper = raw.trim().toUpperCase()
  return /^[A-Z0-9]{6,10}$/.test(upper) ? upper : null
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false)
  const [mentorTriggerRect, setMentorTriggerRect] = useState<DOMRect | null>(null)
  const [referralCode, setReferralCode] = useState<string | null>(null)

  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // SEO & Pageview Tracking
  useEffect(() => {
    // If it's a specific blog post, the BlogPost component will handle its own SEO
    if (location.pathname.startsWith('/blog/') && location.pathname !== '/blog/admin') {
      posthog.capture('$pageview', {
        $current_url: window.location.href,
        page: location.pathname,
      })
      return
    }

    const title = pageTitles[location.pathname] || pageTitles['/']
    const desc = pageDescriptions[location.pathname] || pageDescriptions['/']

    document.title = title

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', desc)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    const currentUrl = 'https://myjobhunter.in' + (location.pathname === '/' ? '' : location.pathname)
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

    posthog.capture('$pageview', {
      $current_url: window.location.href,
      page: location.pathname,
    })
  }, [location.pathname])

  // Handle old ?page= queries for backwards compatibility
  useEffect(() => {
    const pageParam = searchParams.get('page')
    if (pageParam) {
      const cleanPath = pageParam === 'home' ? '/' : `/${pageParam}`
      // Remove page param and navigate
      searchParams.delete('page')
      navigate({ pathname: cleanPath, search: searchParams.toString() }, { replace: true })
    }
  }, [searchParams, navigate])

  // On mount: validate the ?ref= param against DB before using it
  useEffect(() => {
    const rawRef = searchParams.get('ref')
    const sanitizedRef = sanitizeRefCode(rawRef)

    if (rawRef) {
      setSearchParams((prev) => {
        prev.delete('ref')
        return prev
      }, { replace: true })
    }

    if (!sanitizedRef) return

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
            body: JSON.stringify({ referral_code: sanitizedRef }),
          }
        )
        const data = await res.json()
        if (res.ok && data.valid === true) {
          setReferralCode(data.referral_code)
          setIsModalOpen(true)
        }
      } catch {
        // Network error: silently ignore
      }
    }
    validateCode()
  }, [searchParams, setSearchParams]) // run once on param change

  // Anchor click handling isn't needed anymore with react-router-dom <Link>s,
  // but if we have raw HTML content that injects <a> tags, this could be useful.
  // We'll rely on React Router mostly now.

  const handleOpenMentorModal = (rect: DOMRect) => {
    setMentorTriggerRect(rect)
    setIsMentorModalOpen(true)
    posthog.capture('mentor_modal_opened')
  }

  const openWaitlist = () => setIsModalOpen(true)

  return (
    <div className="app">
      <ScrollToTop />
      <Nav onOpenWaitlist={openWaitlist} />

      <main id="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <FeaturedOn />
              <HowItWorks />
              <Principles />
              <Testimonials />
              <Roadmap />
            </>
          } />
          <Route path="/features" element={<Features onOpenWaitlist={openWaitlist} />} />
          <Route path="/for-who" element={<ForWho onOpenMentorModal={handleOpenMentorModal} onOpenWaitlist={openWaitlist} />} />
          <Route path="/faq" element={<FAQ onOpenWaitlist={openWaitlist} />} />
          <Route path="/about" element={<About onOpenWaitlist={openWaitlist} />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/tos" element={<TermsOfService />} />
          <Route path="/refund" element={<RefundPolicy />} />

          {/* Blog Routes */}
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/admin" element={<BlogAdmin />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog/:category/:slug" element={<BlogPost />} />
        </Routes>
      </main>

      <Footer />

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
